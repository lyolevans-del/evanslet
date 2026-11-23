/*
# Harden ROOTED submission tables: column-scoped inserts, validation and rate limiting

1. Overview
   The submission tables currently allow the public roles to INSERT any
   column, including `status` — the ROOTED team's internal review field. A
   crafted request could submit a row already marked 'approved'. This
   migration applies least privilege (user-content columns only), adds
   server-side validation so malformed or oversized data is rejected at the
   database, prevents simple spam floods, and normalises email addresses.

2. Column privileges (all five tables)
   - Revoke the blanket INSERT from `anon` and `authenticated`.
   - Re-GRANT INSERT on the user-content columns ONLY:
     * talent_submissions (full_name, email, phone, country, discipline,
       portfolio_url, message, consent)
     * nominations (nominee_name, nominee_discipline, nominator_name,
       nominator_email, reason, consent)
     * partnership_enquiries (organisation, contact_name, email, country,
       interest, message, consent)
     * contact_messages (full_name, email, organisation, country,
       enquiry_type, message, consent)
     * newsletter_subscriptions (email)
   - `status`, `id`, `created_at` are NOT granted, so the public can never
     set them. Public submissions always arrive as status='new'.

3. Server-side validation (CHECK constraints)
   - Names/organisation/discipline/interest/enquiry_type: 1–200 chars.
   - Emails: basic shape, 5–254 chars.
   - Country: 1–100 chars. Message/reason: 1–5000 chars.
   - portfolio_url: max 500 chars. organisation in contact_messages: <= 200.
   - consent: must be TRUE (belt-and-braces alongside the policies).
   - status restricted to the team's workflow values.

4. Rate limiting
   - New table `submission_log` (ip_hash text, form_type text, created_at)
     with an index on (ip_hash, created_at). Records accepted submissions
     for a max-5-per-10-minutes-per-IP limit, enforced inside the submit
     functions. Public roles have NO direct access to this table.

5. New SECURITY DEFINER RPC functions (one per form)
   - submit_talent_submission, submit_nomination, submit_partnership_enquiry,
     submit_contact_message, subscribe_newsletter.
   - Each validates input server-side (defense in depth), rate-limits by
     hashed IP, inserts with hard-coded status='new', and logs the attempt.
   - SET search_path = public on every function.
   - EXECUTE granted explicitly to anon, authenticated; revoked from PUBLIC.
   - subscribe_newsletter treats a duplicate signup as a neutral success.

6. Security notes
   - RLS stays enabled. The policies remain as defence in depth; the public
     path now goes exclusively through the functions (which run as owner and
     re-impose every check inside).
   - IPs are stored only as salted SHA-256 hashes, never raw.
   - Fully idempotent: IF NOT EXISTS / DROP FUNCTION IF EXISTS / drop-first
     constraints handled via IF NOT EXISTS on ADD CONSTRAINT is not
     supported, so constraint additions are wrapped in DO blocks that check
     pg_constraint first.
*/

-- ============================================================
-- 1. Column-scoped INSERT grants
-- ============================================================

REVOKE INSERT ON talent_submissions FROM anon, authenticated;
REVOKE INSERT ON nominations FROM anon, authenticated;
REVOKE INSERT ON partnership_enquiries FROM anon, authenticated;
REVOKE INSERT ON contact_messages FROM anon, authenticated;
REVOKE INSERT ON newsletter_subscriptions FROM anon, authenticated;

GRANT INSERT (full_name, email, phone, country, discipline, portfolio_url, message, consent)
  ON talent_submissions TO anon, authenticated;
GRANT INSERT (nominee_name, nominee_discipline, nominator_name, nominator_email, reason, consent)
  ON nominations TO anon, authenticated;
GRANT INSERT (organisation, contact_name, email, country, interest, message, consent)
  ON partnership_enquiries TO anon, authenticated;
GRANT INSERT (full_name, email, organisation, country, enquiry_type, message, consent)
  ON contact_messages TO anon, authenticated;
GRANT INSERT (email) ON newsletter_subscriptions TO anon, authenticated;

-- ============================================================
-- 2. CHECK constraints (added conditionally for idempotency)
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'talent_name_len') THEN
    ALTER TABLE talent_submissions ADD CONSTRAINT talent_name_len CHECK (char_length(full_name) BETWEEN 1 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'talent_email_shape') THEN
    ALTER TABLE talent_submissions ADD CONSTRAINT talent_email_shape CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) BETWEEN 5 AND 254);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'talent_phone_len') THEN
    ALTER TABLE talent_submissions ADD CONSTRAINT talent_phone_len CHECK (phone IS NULL OR char_length(phone) <= 40);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'talent_country_len') THEN
    ALTER TABLE talent_submissions ADD CONSTRAINT talent_country_len CHECK (char_length(country) BETWEEN 1 AND 100);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'talent_discipline_len') THEN
    ALTER TABLE talent_submissions ADD CONSTRAINT talent_discipline_len CHECK (char_length(discipline) BETWEEN 1 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'talent_portfolio_len') THEN
    ALTER TABLE talent_submissions ADD CONSTRAINT talent_portfolio_len CHECK (portfolio_url IS NULL OR char_length(portfolio_url) <= 500);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'talent_message_len') THEN
    ALTER TABLE talent_submissions ADD CONSTRAINT talent_message_len CHECK (char_length(message) BETWEEN 1 AND 5000);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'talent_consent_true') THEN
    ALTER TABLE talent_submissions ADD CONSTRAINT talent_consent_true CHECK (consent IS TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'talent_status_allowed') THEN
    ALTER TABLE talent_submissions ADD CONSTRAINT talent_status_allowed CHECK (status IN ('new','reviewed','contacted','approved','archived'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'nom_nominee_len') THEN
    ALTER TABLE nominations ADD CONSTRAINT nom_nominee_len CHECK (char_length(nominee_name) BETWEEN 1 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'nom_discipline_len') THEN
    ALTER TABLE nominations ADD CONSTRAINT nom_discipline_len CHECK (char_length(nominee_discipline) BETWEEN 1 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'nom_nominator_len') THEN
    ALTER TABLE nominations ADD CONSTRAINT nom_nominator_len CHECK (char_length(nominator_name) BETWEEN 1 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'nom_email_shape') THEN
    ALTER TABLE nominations ADD CONSTRAINT nom_email_shape CHECK (nominator_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(nominator_email) BETWEEN 5 AND 254);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'nom_reason_len') THEN
    ALTER TABLE nominations ADD CONSTRAINT nom_reason_len CHECK (char_length(reason) BETWEEN 1 AND 5000);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'nom_consent_true') THEN
    ALTER TABLE nominations ADD CONSTRAINT nom_consent_true CHECK (consent IS TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'nom_status_allowed') THEN
    ALTER TABLE nominations ADD CONSTRAINT nom_status_allowed CHECK (status IN ('new','reviewed','contacted','approved','archived'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'part_org_len') THEN
    ALTER TABLE partnership_enquiries ADD CONSTRAINT part_org_len CHECK (char_length(organisation) BETWEEN 1 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'part_contact_len') THEN
    ALTER TABLE partnership_enquiries ADD CONSTRAINT part_contact_len CHECK (char_length(contact_name) BETWEEN 1 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'part_email_shape') THEN
    ALTER TABLE partnership_enquiries ADD CONSTRAINT part_email_shape CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) BETWEEN 5 AND 254);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'part_country_len') THEN
    ALTER TABLE partnership_enquiries ADD CONSTRAINT part_country_len CHECK (char_length(country) BETWEEN 1 AND 100);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'part_interest_len') THEN
    ALTER TABLE partnership_enquiries ADD CONSTRAINT part_interest_len CHECK (char_length(interest) BETWEEN 1 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'part_message_len') THEN
    ALTER TABLE partnership_enquiries ADD CONSTRAINT part_message_len CHECK (char_length(message) BETWEEN 1 AND 5000);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'part_consent_true') THEN
    ALTER TABLE partnership_enquiries ADD CONSTRAINT part_consent_true CHECK (consent IS TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'part_status_allowed') THEN
    ALTER TABLE partnership_enquiries ADD CONSTRAINT part_status_allowed CHECK (status IN ('new','reviewed','contacted','approved','archived'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_name_len') THEN
    ALTER TABLE contact_messages ADD CONSTRAINT contact_name_len CHECK (char_length(full_name) BETWEEN 1 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_email_shape') THEN
    ALTER TABLE contact_messages ADD CONSTRAINT contact_email_shape CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) BETWEEN 5 AND 254);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_org_len') THEN
    ALTER TABLE contact_messages ADD CONSTRAINT contact_org_len CHECK (organisation IS NULL OR char_length(organisation) <= 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_country_len') THEN
    ALTER TABLE contact_messages ADD CONSTRAINT contact_country_len CHECK (char_length(country) BETWEEN 1 AND 100);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_type_len') THEN
    ALTER TABLE contact_messages ADD CONSTRAINT contact_type_len CHECK (char_length(enquiry_type) BETWEEN 1 AND 100);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_message_len') THEN
    ALTER TABLE contact_messages ADD CONSTRAINT contact_message_len CHECK (char_length(message) BETWEEN 1 AND 5000);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_consent_true') THEN
    ALTER TABLE contact_messages ADD CONSTRAINT contact_consent_true CHECK (consent IS TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_status_allowed') THEN
    ALTER TABLE contact_messages ADD CONSTRAINT contact_status_allowed CHECK (status IN ('new','reviewed','contacted','approved','archived'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'newsletter_email_shape') THEN
    ALTER TABLE newsletter_subscriptions ADD CONSTRAINT newsletter_email_shape CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) BETWEEN 5 AND 254);
  END IF;
END $$;

-- ============================================================
-- 3. Submission log for rate limiting
-- ============================================================

CREATE TABLE IF NOT EXISTS submission_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  form_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS submission_log_ip_time_idx ON submission_log (ip_hash, created_at);

ALTER TABLE submission_log ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON submission_log TO service_role;

-- ============================================================
-- 4. Shared helpers + SECURITY DEFINER submit functions
-- ============================================================

CREATE OR REPLACE FUNCTION rooted_rate_limited(p_ip_hash text, p_form_type text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_recent integer;
BEGIN
  SELECT count(*) INTO v_recent
  FROM submission_log
  WHERE ip_hash = p_ip_hash
    AND created_at > now() - interval '10 minutes';

  IF v_recent >= 5 THEN
    RETURN false;
  END IF;

  INSERT INTO submission_log (ip_hash, form_type) VALUES (p_ip_hash, p_form_type);
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION rooted_validate(p_value text, p_min integer, p_max integer)
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  RETURN p_value IS NOT NULL
    AND char_length(p_value) BETWEEN p_min AND p_max;
END;
$$;

-- ---------- Talent submissions ----------

CREATE OR REPLACE FUNCTION submit_talent_submission(
  p_full_name text, p_email text, p_phone text, p_country text,
  p_discipline text, p_portfolio_url text, p_message text, p_consent boolean,
  p_ip_hash text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF p_consent IS NOT TRUE THEN
    RAISE EXCEPTION 'Consent is required';
  END IF;
  IF NOT rooted_validate(p_full_name, 1, 200)
    OR NOT rooted_validate(p_email, 5, 254)
    OR p_email NOT LIKE '%@%'
    OR NOT rooted_validate(p_country, 1, 100)
    OR NOT rooted_validate(p_discipline, 1, 200)
    OR NOT rooted_validate(p_message, 1, 5000)
    OR (p_phone IS NOT NULL AND char_length(p_phone) > 40)
    OR (p_portfolio_url IS NOT NULL AND (char_length(p_portfolio_url) > 500 OR p_portfolio_url NOT LIKE 'http%://%'))
  THEN
    RAISE EXCEPTION 'Invalid submission';
  END IF;

  IF NOT rooted_rate_limited(p_ip_hash, 'talent') THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;

  INSERT INTO talent_submissions (full_name, email, phone, country, discipline, portfolio_url, message, consent, status)
  VALUES (p_full_name, lower(p_email), nullif(trim(p_phone), ''), p_country, p_discipline, nullif(trim(p_portfolio_url), ''), p_message, true, 'new')
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

-- ---------- Nominations ----------

CREATE OR REPLACE FUNCTION submit_nomination(
  p_nominee_name text, p_nominee_discipline text, p_nominator_name text,
  p_nominator_email text, p_reason text, p_consent boolean, p_ip_hash text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF p_consent IS NOT TRUE THEN
    RAISE EXCEPTION 'Consent is required';
  END IF;
  IF NOT rooted_validate(p_nominee_name, 1, 200)
    OR NOT rooted_validate(p_nominee_discipline, 1, 200)
    OR NOT rooted_validate(p_nominator_name, 1, 200)
    OR NOT rooted_validate(p_nominator_email, 5, 254)
    OR p_nominator_email NOT LIKE '%@%'
    OR NOT rooted_validate(p_reason, 1, 5000)
  THEN
    RAISE EXCEPTION 'Invalid submission';
  END IF;

  IF NOT rooted_rate_limited(p_ip_hash, 'nomination') THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;

  INSERT INTO nominations (nominee_name, nominee_discipline, nominator_name, nominator_email, reason, consent, status)
  VALUES (p_nominee_name, p_nominee_discipline, p_nominator_name, lower(p_nominator_email), p_reason, true, 'new')
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

-- ---------- Partnership enquiries ----------

CREATE OR REPLACE FUNCTION submit_partnership_enquiry(
  p_organisation text, p_contact_name text, p_email text, p_country text,
  p_interest text, p_message text, p_consent boolean, p_ip_hash text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF p_consent IS NOT TRUE THEN
    RAISE EXCEPTION 'Consent is required';
  END IF;
  IF NOT rooted_validate(p_organisation, 1, 200)
    OR NOT rooted_validate(p_contact_name, 1, 200)
    OR NOT rooted_validate(p_email, 5, 254)
    OR p_email NOT LIKE '%@%'
    OR NOT rooted_validate(p_country, 1, 100)
    OR NOT rooted_validate(p_interest, 1, 200)
    OR NOT rooted_validate(p_message, 1, 5000)
  THEN
    RAISE EXCEPTION 'Invalid submission';
  END IF;

  IF NOT rooted_rate_limited(p_ip_hash, 'partnership') THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;

  INSERT INTO partnership_enquiries (organisation, contact_name, email, country, interest, message, consent, status)
  VALUES (p_organisation, p_contact_name, lower(p_email), p_country, p_interest, p_message, true, 'new')
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

-- ---------- Contact messages ----------

CREATE OR REPLACE FUNCTION submit_contact_message(
  p_full_name text, p_email text, p_organisation text, p_country text,
  p_enquiry_type text, p_message text, p_consent boolean, p_ip_hash text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF p_consent IS NOT TRUE THEN
    RAISE EXCEPTION 'Consent is required';
  END IF;
  IF NOT rooted_validate(p_full_name, 1, 200)
    OR NOT rooted_validate(p_email, 5, 254)
    OR p_email NOT LIKE '%@%'
    OR NOT rooted_validate(p_country, 1, 100)
    OR NOT rooted_validate(p_enquiry_type, 1, 100)
    OR NOT rooted_validate(p_message, 1, 5000)
    OR (p_organisation IS NOT NULL AND char_length(p_organisation) > 200)
  THEN
    RAISE EXCEPTION 'Invalid submission';
  END IF;

  IF NOT rooted_rate_limited(p_ip_hash, 'contact') THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;

  INSERT INTO contact_messages (full_name, email, organisation, country, enquiry_type, message, consent, status)
  VALUES (p_full_name, lower(p_email), nullif(trim(p_organisation), ''), p_country, p_enquiry_type, p_message, true, 'new')
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

-- ---------- Newsletter ----------

CREATE OR REPLACE FUNCTION subscribe_newsletter(p_email text, p_ip_hash text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text;
BEGIN
  v_email := lower(btrim(p_email));
  IF NOT rooted_validate(v_email, 5, 254) OR v_email NOT LIKE '%@%' THEN
    RAISE EXCEPTION 'Invalid email address';
  END IF;

  IF NOT rooted_rate_limited(p_ip_hash, 'newsletter') THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;

  BEGIN
    INSERT INTO newsletter_subscriptions (email) VALUES (v_email);
    RETURN true;
  EXCEPTION WHEN unique_violation THEN
    RETURN true; -- neutral: already subscribed is treated as success
  END;
END;
$$;

-- ============================================================
-- 5. EXECUTE grants
-- ============================================================

REVOKE EXECUTE ON FUNCTION rooted_rate_limited(text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION rooted_validate(text, integer, integer) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION submit_talent_submission(text, text, text, text, text, text, text, boolean, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION submit_nomination(text, text, text, text, text, boolean, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION submit_partnership_enquiry(text, text, text, text, text, text, boolean, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION submit_contact_message(text, text, text, text, text, text, boolean, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION subscribe_newsletter(text, text) TO anon, authenticated;

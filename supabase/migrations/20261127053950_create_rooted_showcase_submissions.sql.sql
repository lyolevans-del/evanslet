/*
# ROOTED Showcase — member creative-work submissions

1. Overview
   A new section, "ROOTED Showcase", where registered members upload and
   share their creative work (video, artwork, photography, advertisement,
   music, fashion design, creative project, other talent). Visitors can
   browse a modern gallery of approved pieces; members submit through a
   consent-gated, content-reviewed form. Submissions are reviewed by the
   ROOTED team before they appear publicly.

2. New Tables
   - `showcase_submissions`
     * `id`                uuid primary key (gen_random_uuid())
     * `creator_name`      text 1–200 chars — display name shown on the piece
     * `creator_handle`    text nullable, 1–60 chars — optional @handle
     * `email`             text 5–254 chars, valid shape — contact for review
     * `country`           text 1–100 chars
     * `category`          text 1–60 chars — one of the allowed categories
     * `title`             text 1–200 chars
     * `description`       text 1–2000 chars — member's description of the work
     * `media_url`         text nullable, ≤500 chars, http(s) URL — optional
       link to the work (video, portfolio, track). When null, the gallery
       card shows a branded gradient placeholder.
     * `cover_color`       text nullable, 1–40 chars — optional accent color
       hint for the gradient placeholder (e.g. "amber","rose","teal").
     * `consent`           boolean, must be TRUE — member confirms they own
       the content and consent to ROOTED reviewing and, if approved,
       publicly displaying it.
     * `status`            text default 'new' — team review workflow:
       'new' | 'reviewed' | 'approved' | 'rejected' | 'archived'.
       Only 'approved' rows are shown in the public gallery.
     * `created_at`        timestamptz default now()
   - No `user_id` / auth dependency: the site has no sign-in, so this is a
     single-tenant submission table, mirroring `talent_submissions`.

3. New View
   - `showcase_gallery` — a `security_invoker` view that exposes ONLY the
     columns safe for the public (no email, no status, no consent) for rows
     with `status = 'approved'`. The anon-key frontend reads from this view
     to render the gallery.

4. Security
   - RLS enabled on `showcase_submissions`. The public cannot read it
     directly: all SELECT/UPDATE/DELETE revoked from anon, authenticated.
   - INSERT granted to anon, authenticated on user-content columns ONLY:
     creator_name, creator_handle, email, country, category, title,
     description, media_url, cover_color, consent. status/id/created_at
     are NOT granted, so a crafted request can never self-approve.
   - SELECT granted on the `showcase_gallery` VIEW to anon, authenticated.
   - A SECURITY DEFINER RPC `submit_showcase_submission` validates every
     field server-side, enforces consent=TRUE, rate-limits via the existing
     `submission_log` table (max 5 / 10 min / IP, form_type='showcase'),
     and inserts with a hard-coded status='new'. EXECUTE granted to
     anon, authenticated; revoked from PUBLIC.
   - The team uses the service_role (bypasses RLS) to review and set
     status='approved'.

5. Notes
   - Idempotent: CREATE TABLE IF NOT EXISTS, DROP POLICY IF EXISTS before
     CREATE POLICY, DO blocks for conditional constraint additions.
   - No BEGIN/COMMIT — wrapped by apply_migration.
*/

-- ============================================================
-- 1. Table
-- ============================================================

CREATE TABLE IF NOT EXISTS showcase_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_name text NOT NULL,
  creator_handle text,
  email text NOT NULL,
  country text NOT NULL,
  category text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  media_url text,
  cover_color text,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE showcase_submissions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 2. CHECK constraints (conditional for idempotency)
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'showcase_creator_name_len') THEN
    ALTER TABLE showcase_submissions ADD CONSTRAINT showcase_creator_name_len
      CHECK (char_length(creator_name) BETWEEN 1 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'showcase_handle_len') THEN
    ALTER TABLE showcase_submissions ADD CONSTRAINT showcase_handle_len
      CHECK (creator_handle IS NULL OR char_length(creator_handle) BETWEEN 1 AND 60);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'showcase_email_shape') THEN
    ALTER TABLE showcase_submissions ADD CONSTRAINT showcase_email_shape
      CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) BETWEEN 5 AND 254);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'showcase_country_len') THEN
    ALTER TABLE showcase_submissions ADD CONSTRAINT showcase_country_len
      CHECK (char_length(country) BETWEEN 1 AND 100);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'showcase_category_allowed') THEN
    ALTER TABLE showcase_submissions ADD CONSTRAINT showcase_category_allowed
      CHECK (category IN ('Video','Artwork','Photography','Advertising','Music','Fashion','Creative Project','Other'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'showcase_title_len') THEN
    ALTER TABLE showcase_submissions ADD CONSTRAINT showcase_title_len
      CHECK (char_length(title) BETWEEN 1 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'showcase_description_len') THEN
    ALTER TABLE showcase_submissions ADD CONSTRAINT showcase_description_len
      CHECK (char_length(description) BETWEEN 1 AND 2000);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'showcase_media_url_len') THEN
    ALTER TABLE showcase_submissions ADD CONSTRAINT showcase_media_url_len
      CHECK (media_url IS NULL OR (char_length(media_url) <= 500 AND media_url ~* '^https?://'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'showcase_cover_color_len') THEN
    ALTER TABLE showcase_submissions ADD CONSTRAINT showcase_cover_color_len
      CHECK (cover_color IS NULL OR char_length(cover_color) BETWEEN 1 AND 40);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'showcase_consent_true') THEN
    ALTER TABLE showcase_submissions ADD CONSTRAINT showcase_consent_true
      CHECK (consent IS TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'showcase_status_allowed') THEN
    ALTER TABLE showcase_submissions ADD CONSTRAINT showcase_status_allowed
      CHECK (status IN ('new','reviewed','approved','rejected','archived'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS showcase_submissions_status_created_idx
  ON showcase_submissions (status, created_at DESC);

-- ============================================================
-- 3. Public gallery view (security_invoker, approved only)
-- ============================================================

CREATE OR REPLACE VIEW showcase_gallery AS
SELECT
  id,
  creator_name,
  creator_handle,
  country,
  category,
  title,
  description,
  media_url,
  cover_color,
  created_at
FROM showcase_submissions
WHERE status = 'approved';

ALTER VIEW showcase_gallery SET (security_invoker = true);

GRANT SELECT ON showcase_gallery TO anon, authenticated;

-- ============================================================
-- 4. Grants on the base table (INSERT only, user columns only)
-- ============================================================

REVOKE SELECT, UPDATE, DELETE ON showcase_submissions FROM anon, authenticated;

GRANT INSERT (creator_name, creator_handle, email, country, category, title, description, media_url, cover_color, consent)
  ON showcase_submissions TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON showcase_submissions TO service_role;

-- ============================================================
-- 5. RLS policies (defence in depth — inserts go via the RPC)
-- ============================================================

DROP POLICY IF EXISTS "showcase_insert_anon" ON showcase_submissions;
CREATE POLICY "showcase_insert_anon"
ON showcase_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies: public roles cannot read or modify
-- the base table; they read the `showcase_gallery` view instead.

-- ============================================================
-- 6. SECURITY DEFINER submit function
-- ============================================================

CREATE OR REPLACE FUNCTION submit_showcase_submission(
  p_creator_name text,
  p_creator_handle text,
  p_email text,
  p_country text,
  p_category text,
  p_title text,
  p_description text,
  p_media_url text,
  p_cover_color text,
  p_consent boolean,
  p_ip_hash text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
  v_category text;
BEGIN
  IF p_consent IS NOT TRUE THEN
    RAISE EXCEPTION 'Consent is required';
  END IF;

  v_category := p_category;
  IF NOT rooted_validate(p_creator_name, 1, 200)
    OR NOT rooted_validate(p_email, 5, 254)
    OR p_email NOT LIKE '%@%'
    OR NOT rooted_validate(p_country, 1, 100)
    OR NOT rooted_validate(p_category, 1, 60)
    OR NOT rooted_validate(p_title, 1, 200)
    OR NOT rooted_validate(p_description, 1, 2000)
    OR (p_creator_handle IS NOT NULL AND (char_length(p_creator_handle) < 1 OR char_length(p_creator_handle) > 60))
    OR (p_media_url IS NOT NULL AND (char_length(p_media_url) > 500 OR p_media_url NOT LIKE 'http%://%'))
    OR (p_cover_color IS NOT NULL AND (char_length(p_cover_color) < 1 OR char_length(p_cover_color) > 40))
    OR v_category NOT IN ('Video','Artwork','Photography','Advertising','Music','Fashion','Creative Project','Other')
  THEN
    RAISE EXCEPTION 'Invalid submission';
  END IF;

  IF NOT rooted_rate_limited(p_ip_hash, 'showcase') THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;

  INSERT INTO showcase_submissions (
    creator_name, creator_handle, email, country, category, title,
    description, media_url, cover_color, consent, status
  )
  VALUES (
    p_creator_name,
    nullif(trim(p_creator_handle), ''),
    lower(p_email),
    p_country,
    p_category,
    p_title,
    p_description,
    nullif(trim(p_media_url), ''),
    nullif(trim(p_cover_color), ''),
    true,
    'new'
  )
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

-- EXECUTE grants
REVOKE EXECUTE ON FUNCTION submit_showcase_submission(text, text, text, text, text, text, text, text, text, boolean, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION submit_showcase_submission(text, text, text, text, text, text, text, text, text, boolean, text) TO anon, authenticated;

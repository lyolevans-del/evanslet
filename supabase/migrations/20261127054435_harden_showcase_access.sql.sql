/*
# Harden ROOTED Showcase access (security fix-up)

1. Overview
   The initial showcase migration left two gaps that the security posture
   audit surfaced:
     a. The `showcase_gallery` view inherited full INSERT/UPDATE/DELETE
        from the base table and now exposes those verbs to anon and
        authenticated. A view meant for public reading should only grant
        SELECT.
     b. `submission_log` shows SELECT/INSERT/UPDATE/DELETE granted to
        anon and authenticated (it should be service_role only — the
        rate-limit functions run as SECURITY DEFINER owner and bypass
        RLS, so the public never needs direct access).
     c. `showcase_submissions` reports insertable_columns "all" for
        anon/authenticated, meaning the public could INSERT the `status`
        column directly and self-approve. This migration re-scopes the
        INSERT grant to the user-content columns only.

2. Changes
   - Revoke ALL on `showcase_gallery` from anon, authenticated, then
     GRANT SELECT only — so the public can read approved pieces and
     nothing else.
   - Revoke ALL on `submission_log` from anon, authenticated.
     (service_role keeps full access from the earlier migration.)
   - Revoke INSERT on `showcase_submissions` from anon, authenticated
     and re-grant INSERT on the user-content columns ONLY:
     creator_name, creator_handle, email, country, category, title,
     description, media_url, cover_color, consent. status, id and
     created_at are NOT granted, so the public cannot set status.

3. Security
   - No policy changes. RLS stays enabled everywhere.
   - The public path is unchanged: reads go through the
     showcase_gallery view (now SELECT-only); writes go through the
     submit_showcase_submission SECURITY DEFINER RPC, which hard-codes
     status='new'.
   - Fully idempotent (REVOKE is safe to repeat, GRANT is additive but
     harmless to repeat at column scope).
*/

-- View: SELECT only for the public
REVOKE ALL ON showcase_gallery FROM anon, authenticated;
GRANT SELECT ON showcase_gallery TO anon, authenticated;

-- submission_log: service_role only (already granted elsewhere)
REVOKE ALL ON submission_log FROM anon, authenticated;

-- Base table: re-scope INSERT to user-content columns only
REVOKE INSERT ON showcase_submissions FROM anon, authenticated;
GRANT INSERT (creator_name, creator_handle, email, country, category, title, description, media_url, cover_color, consent)
  ON showcase_submissions TO anon, authenticated;

/*
# Tighten grants on submission tables to INSERT-only for public roles

1. Overview
   The initial migration accidentally left SELECT, UPDATE and DELETE
   privileges available to `anon` and `authenticated` on the five public
   submission tables (they were reported in the privilege audit even though
   RLS blocks reads). This migration revokes those privileges so the public
   roles can only INSERT — least privilege.

2. Modified Tables
   - `talent_submissions`, `nominations`, `partnership_enquiries`,
     `contact_messages`, `newsletter_subscriptions`:
     revoke SELECT, UPDATE, DELETE from `anon` and `authenticated`.
     INSERT grants and the INSERT-only policies remain unchanged.

3. Security
   - No policy changes. RLS stays enabled. The public can still submit
     forms; they still cannot read or modify any rows.

4. Notes
   - `service_role` keeps full access for the ROOTED team's tooling.
*/

REVOKE SELECT, UPDATE, DELETE ON talent_submissions, nominations, partnership_enquiries, contact_messages, newsletter_subscriptions FROM anon, authenticated;

# Project memory

## Product intent & audience

- Showcase/gallery application where users submit creative work for team review before public display.
- Visitors view approved pieces; submitters send content through a reviewed form.
- Review gate is core: nothing appears publicly until approved by the team.

## Brand personality & voice

- Professional but visually distinctive — "beautiful, not cookie cutter," production-worthy.
- Communication is transparent about infrastructure issues (e.g. photo service downtime) and security findings.

## Visual design & UX direction

- Gallery covers use branded gradient placeholders when photo service is unavailable; designed to swap in real photography later without layout disruption.
- Uses JSX + Tailwind CSS, shadcn/ui components, Lucide React icons (per template defaults).
- Next.js App Router; Server Components used by default, `"use client"` added only where hooks are needed.

## Decisions, constraints & rationale

- **Backend**: Supabase-style auth model (anon/authenticated/service_role roles, RLS, `security_invoker` views).
- **Gallery view**: must be SELECT-only for public roles. `security_invoker` views auto-inherit base-table grants, which previously leaked INSERT/UPDATE/DELETE — fixed by revoking.
- **`submission_log` (rate-limit table)**: service_role only; no public access.
- **`showcase_submissions` INSERT grants**: column-scoped to user-content columns only (creator_name, creator_handle, email, country, category, title, description, media_url, cover_color, consent). Protected columns (`status`, `id`, `created_at`) are not publicly insertable — prevents bypassing the review gate.
- REFERENCES privilege on protected columns retained (harmless FK metadata).
- Build verified passing after security hardening.
- Authoritative global instructions live in `.bolt/prompt` (design philosophy, client directive, template stack).

## Open questions & assumptions

- Photo/stock-image service availability is intermittent; real imagery integration deferred until it recovers.
- Posture-reporting tool may only show table-level grants, not column-level — column privileges must be checked directly when verifying.
- Assumption: gradient placeholders are acceptable for production until photo service returns.
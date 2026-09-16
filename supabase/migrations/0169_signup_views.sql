-- =============================================================================
-- OakTend - record three sign-up views the founder created live (0169)
-- ALREADY APPLIED LIVE. Landen created these three views by hand in the
-- Supabase SQL editor on 2026-09-15 and 2026-09-16. This file is not a change
-- to the live database - it exists so the repo's migration history matches
-- what the live database already has. It is idempotent (CREATE OR REPLACE,
-- plain REVOKE) and safe to re-run or to paste again with no effect.
--
-- WHAT THESE ARE. Three read-only reporting views over public.users, all
-- SERVICE ROLE ONLY, dashboard use:
--
--   public.curtis_signups       one partner's sign-ups (campaign_code = 'curtis')
--   public.partner_signups      every partner's sign-ups, one row per account
--   public.signups_by_source    every account, campaign or not ('direct' when null)
--
-- These sit alongside the two views migration 0166 already created
-- (campaign_signups_by_month, campaign_upgrades_by_month). 0166's views are
-- monthly roll-ups for a commission conversation; the three views here are
-- per-account lists for a quick look in the SQL editor. Same underlying
-- columns (public.users.campaign_code, campaign_recorded_at - see 0166 for
-- why those columns exist and not users.referral_code / users.referred_by),
-- same access model, no new columns, no new tables.
--
-- NOT security_invoker. Left at the default (security_invoker = false, i.e.
-- the view runs with its OWNER's privileges), which is what lets it read
-- across public.users despite the "users self select" RLS policy. That is
-- safe here ONLY because of the REVOKE below: no role that could be a browser
-- session is permitted to select from any of these views, so the only caller
-- that can reach them is the service role (and the SQL editor, which runs as
-- postgres).
--
-- SPELLED OUT because Supabase's default privileges in the public schema
-- grant SELECT on new objects to anon and authenticated automatically: a view
-- created here WILL be world-readable through PostgREST unless the grant is
-- taken back. The REVOKE below is the actual access control, not decoration.
--
-- Idempotent: CREATE OR REPLACE VIEW for all three, plain REVOKE (a no-op to
-- re-run since neither anon nor authenticated is ever granted access).
-- =============================================================================

-- ---- One partner's sign-ups, most recent first -----------------------------
create or replace view public.curtis_signups as
  select
    full_name,
    email,
    campaign_recorded_at as signed_up
  from public.users
  where campaign_code = 'curtis'
  order by campaign_recorded_at desc;

comment on view public.curtis_signups is
  'Sign-up reporting (0169, founder-created live 2026-09-15/16). Accounts '
  'attributed to the ''curtis'' partner code, most recent first. Reads '
  'public.users.campaign_code / campaign_recorded_at (0166). SERVICE ROLE '
  'ONLY - anon and authenticated are revoked explicitly. See docs/REFERRALS.md.';

-- ---- Every partner's sign-ups, one row per attributed account --------------
create or replace view public.partner_signups as
  select
    campaign_code as partner,
    full_name,
    email,
    campaign_recorded_at as signed_up
  from public.users
  where campaign_code is not null
  order by campaign_code, campaign_recorded_at desc;

comment on view public.partner_signups is
  'Sign-up reporting (0169, founder-created live 2026-09-15/16). Every '
  'account with a partner/campaign attribution, one row per account, grouped '
  'by partner. Reads public.users.campaign_code / campaign_recorded_at '
  '(0166). SERVICE ROLE ONLY - anon and authenticated are revoked explicitly. '
  'See docs/REFERRALS.md.';

-- ---- Every account, campaign or not -----------------------------------------
-- source is 'direct' for the overwhelming majority of accounts (no campaign
-- code), same coalesce the app itself would use - there is no third bucket.
create or replace view public.signups_by_source as
  select
    coalesce(campaign_code, 'direct') as source,
    full_name,
    email,
    created_at as signed_up
  from public.users
  order by created_at desc;

comment on view public.signups_by_source is
  'Sign-up reporting (0169, founder-created live 2026-09-15/16). Every '
  'account, labeled by attribution source (''direct'' when '
  'public.users.campaign_code is null). SERVICE ROLE ONLY - anon and '
  'authenticated are revoked explicitly. See docs/REFERRALS.md.';

revoke all on public.curtis_signups, public.partner_signups, public.signups_by_source
  from anon, authenticated;


-- =============================================================================
-- RISK / VERIFICATION NOTES
--
-- 1. This file changes nothing live - the three views already exist, created
--    by hand on 2026-09-15 and 2026-09-16. It is here so a fresh database
--    built from supabase/migrations/ ends up with the same three views the
--    live project already has.
--
-- 2. Verify none of the three is readable by a browser role (expect ZERO
--    rows):
--      select table_name, grantee, privilege_type
--        from information_schema.table_privileges
--       where table_schema = 'public'
--         and table_name in ('curtis_signups', 'partner_signups',
--                             'signups_by_source')
--         and grantee in ('anon', 'authenticated');
--
-- 3. Verify they answer:
--      select * from public.curtis_signups limit 5;
--      select * from public.partner_signups limit 5;
--      select * from public.signups_by_source limit 5;
-- =============================================================================

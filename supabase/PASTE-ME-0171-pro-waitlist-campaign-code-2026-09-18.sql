-- =============================================================================
-- PASTE-ME-0171-pro-waitlist-campaign-code-2026-09-18.sql   (built 2026-09-18)
-- One migration: 0171, partner/campaign attribution on public.pro_waitlist.
-- Live is expected to be through 0169 (PASTE-ME-ALL-PENDING-2026-09-16.sql).
--
-- Paste the WHOLE file into the Supabase SQL editor and run it once. Every
-- statement is idempotent, so running it twice is a no-op, not an error. If a
-- section raises, read the message, fix the cause, and re-run the whole file.
--
-- WHAT IT DOES. Adds ONE nullable column, public.pro_waitlist.campaign_code,
-- with the same shape CHECK public.users.campaign_code carries (0166). No new
-- table, no new policy, no new grant, no index, no backfill.
--
-- WHY. 0166 stamps users.campaign_code at sign-up so a partner deal can be
-- settled from the account row months later. A contractor who follows a
-- partner's /go/<code> link during HOMEOWNER PREVIEW cannot create an account
-- at all - the pro side is a closed door and the only thing they can do is
-- leave an email on the waitlist (0168). Without this column that referral is
-- attributed to nobody, and by the time the pro side opens the 30-day cookie
-- is long gone. With it, the code rides on the waitlist row, and the moment
-- that person creates an account the app copies it onto users.campaign_code
-- (matched on lower(email)) if the account has no code of its own yet.
-- Landen addendum 4, section 2.
--
-- NO DEPLOY-ORDER REQUIREMENT, in either direction. The app's insert retries
-- once WITHOUT campaign_code if the column is missing (isMissingSchemaError,
-- src/lib/dbErrors.ts), so a deploy that lands before this paste still
-- captures every waitlist email; and the column sitting here unwritten before
-- the deploy lands changes nothing. Paste it whenever.
--
-- STILL SERVICE ROLE ONLY. public.pro_waitlist keeps exactly the access model
-- 0168 gave it: RLS on, zero policies, anon and authenticated revoked. This
-- file does not touch any of that - it only adds a column - and the VERIFY
-- block at the bottom re-checks it anyway, because the table holds
-- contractors' email addresses.
--
-- TO READ THE ATTRIBUTED WAITLIST afterwards:
--   select email, trade, city, source, campaign_code, created_at
--     from public.pro_waitlist
--    where campaign_code is not null
--    order by created_at desc;
-- =============================================================================

-- ---- PRECHECK: the table this file alters must already exist ----------------
-- 0168 is what creates public.pro_waitlist. ALTER TABLE cannot create it, so
-- without that file this paste has nothing to add a column to. Refuse and name
-- what to run first rather than failing halfway with a bare "relation does not
-- exist".
do $$
begin
  if not exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'pro_waitlist'
  ) then
    raise exception 'PRECHECK: public.pro_waitlist is missing, so migration 0168 has not been applied to this database. Run supabase/PASTE-ME-0168-pro-waitlist-2026-09-12.sql FIRST, then this file. NOTHING WAS CHANGED.';
  end if;
end
$$;


-- =============================================================================
-- public.pro_waitlist.campaign_code
-- =============================================================================
-- Body identical to supabase/migrations/0171_pro_waitlist_campaign_code.sql.
alter table public.pro_waitlist
  add column if not exists campaign_code text;

-- ADD CONSTRAINT has no IF NOT EXISTS in PostgreSQL, so it is guarded by hand
-- rather than left to fail the whole paste on a re-run. The expression is
-- copied from users_campaign_code_shape (0166) character for character, so the
-- two attribution columns cannot drift apart. It mirrors CAMPAIGN_CODE_RE in
-- src/lib/campaigns.ts and is a backstop, not the real gate: the app only ever
-- writes a code that survived lookupCampaign().
do $$
begin
  if not exists (
    select 1
      from pg_constraint
     where conrelid = 'public.pro_waitlist'::regclass
       and conname  = 'pro_waitlist_campaign_code_shape'
  ) then
    alter table public.pro_waitlist
      add constraint pro_waitlist_campaign_code_shape
      check (campaign_code is null or campaign_code ~ '^[a-z0-9-]{2,32}$');
  end if;
end
$$;

comment on column public.pro_waitlist.campaign_code is
  'Partner/campaign attribution for a contractor who joined the waitlist '
  'through a /go/<code> link while the pro side was closed. Written once by '
  'joinProWaitlistAction (src/app/pros/actions.ts) from the oaktend_campaign '
  'cookie, validated against the frozen allowlist in src/lib/campaigns.ts. '
  'Null for the overwhelming majority of rows. When the waitlisted contractor '
  'later creates an account, src/lib/waitlistAttribution.ts copies this onto '
  'public.users.campaign_code (0166) if that is still null - matched on '
  'lower(email), first code wins. created_at is the recorded-at timestamp; '
  'there is deliberately no second one. Service role only, like the rest of '
  'the table.';


-- ---- VERIFY -----------------------------------------------------------------
-- select column_name, data_type, is_nullable
--   from information_schema.columns
--  where table_schema = 'public' and table_name = 'pro_waitlist'
--    and column_name = 'campaign_code';
-- -- expect one row: text, YES.
--
-- select conname from pg_constraint
--  where conrelid = 'public.pro_waitlist'::regclass
--    and conname = 'pro_waitlist_campaign_code_shape';
-- -- expect one row.
--
-- select grantee, privilege_type from information_schema.role_table_grants
--  where table_schema = 'public' and table_name = 'pro_waitlist'
--    and grantee in ('anon', 'authenticated');
-- -- expect zero rows: adding a column must not have handed anything out.
--
-- select count(*) from pg_policies
--  where schemaname = 'public' and tablename = 'pro_waitlist';
-- -- expect 0 (service-role only, unchanged from 0168).
--
-- select email, trade, city, source, campaign_code, created_at
--   from public.pro_waitlist
--  where campaign_code is not null
--  order by created_at desc;
-- -- the attributed waitlist. Zero rows until a contractor follows a partner
-- -- link and leaves an email; that is correct, not a failure.

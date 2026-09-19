-- =============================================================================
-- OakTend - partner/campaign attribution on the pro waitlist (0171)
-- RUN THIS AGAINST THE LIVE DATABASE (Supabase SQL editor).
-- Run it AFTER 0168, which creates public.pro_waitlist (the PRECHECK in the
-- paste file refuses to run without it).
--
-- WHY. 0166 stamps public.users.campaign_code at sign-up, so a partner deal can
-- be settled months later from the account row rather than from a pruned
-- analytics stream. The pro side has no account row to stamp: while preview
-- mode is on (src/lib/previewMode.ts) a contractor who follows /go/<code>-pro
-- cannot create an account at all - the only thing they can do is leave an
-- email on public.pro_waitlist (0168). Without this column, every contractor a
-- partner sends during preview is attributed to nobody, and the attribution is
-- gone for good: the 30-day cookie has lapsed long before the pro side opens.
--
-- So the code rides along on the waitlist row, and when that person finally
-- creates an account, src/lib/waitlistAttribution.ts copies it onto
-- users.campaign_code (matched on the email, case-insensitively) if - and only
-- if - the account has no code of its own yet. Landen addendum 4, section 2.
--
-- WHAT IS ALLOWED IN THE COLUMN. The CHECK is 0166's expression verbatim, so
-- the two attribution columns cannot drift apart: it mirrors CAMPAIGN_CODE_RE
-- (src/lib/campaigns.ts), ^[a-z0-9-]{2,32}$. As in 0166 it is a backstop and
-- not the real gate - joinProWaitlistAction (src/app/pros/actions.ts) only ever
-- writes a code that survived lookupCampaign(), i.e. one present in the frozen
-- CAMPAIGN_CODES map. The CHECK exists so a hand-written UPDATE in the SQL
-- editor still cannot put free text in a column that gets grouped by.
--
-- NO campaign_recorded_at TWIN, unlike 0166. public.pro_waitlist already has
-- created_at, the row is written once (the action does a plain insert and
-- swallows the duplicate), and the code is set in that same insert - so
-- created_at IS the moment the code was recorded. A second timestamp would
-- only be a copy of it that could later disagree.
--
-- FIRST CODE WINS, and it falls out of the existing design rather than needing
-- a filter here: joinProWaitlistAction inserts and swallows the 23505 raised by
-- the pro_waitlist_email_uidx unique index, so a repeat signup never updates
-- the stored row at all. The copy-over onto public.users is filtered on
-- `campaign_code is null` exactly like 0166's write.
--
-- NO NEW POLICIES AND NO GRANTS. public.pro_waitlist stays what 0168 made it:
-- RLS on, zero policies, anon and authenticated revoked, service role only.
-- This file adds a column to that table and changes nothing about who can
-- reach it. The column holds no personal data - it names a marketing source.
--
-- Idempotent: ADD COLUMN IF NOT EXISTS and a guarded ADD CONSTRAINT. Safe to
-- re-run.
-- =============================================================================

alter table public.pro_waitlist
  add column if not exists campaign_code text;

-- ADD CONSTRAINT has no IF NOT EXISTS in PostgreSQL, so it is guarded by hand
-- rather than left to fail the whole paste on a re-run. The expression is
-- copied from users_campaign_code_shape (0166) character for character.
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

-- NO INDEX. 0166 indexes users.campaign_code because the partner views group
-- millions of account rows by it; this table is a preview-window email capture
-- read by one back-office page (src/app/(app)/backoffice/partners/page.tsx) and
-- one per-email lookup at sign-up, which already has the unique email index.

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


-- =============================================================================
-- RISK / VERIFICATION NOTES
--
-- 1. Nothing here backfills. Any waitlist row written before this file was
--    pasted has campaign_code null, even if that contractor did arrive through
--    a partner link. There is no record to backfill it from.
--
-- 2. The app tolerates this file NOT being pasted, in both directions. The
--    insert in joinProWaitlistAction retries once WITHOUT campaign_code when
--    the first attempt comes back as a missing-schema error (src/lib/
--    dbErrors.ts isMissingSchemaError), so a deploy that lands before this
--    paste still captures the email. The copy-over and the back-office page
--    treat a missing column as "no attribution" and carry on. So there is no
--    deploy-order requirement between the app and this migration.
--
-- 3. Verify the column (expect one row, is_nullable = YES):
--      select column_name, data_type, is_nullable
--        from information_schema.columns
--       where table_schema = 'public' and table_name = 'pro_waitlist'
--         and column_name = 'campaign_code';
--
-- 4. Verify the CHECK refuses junk. Expect the first to raise 23514 and the
--    second to succeed; both are rolled back:
--      begin;
--        update public.pro_waitlist set campaign_code = 'NOT A CODE'
--         where id = (select id from public.pro_waitlist limit 1);
--      rollback;
--      begin;
--        update public.pro_waitlist set campaign_code = 'curtis-pro'
--         where id = (select id from public.pro_waitlist limit 1);
--      rollback;
--
-- 5. Verify the table is still service-role only - adding a column must not
--    have handed anything out (expect ZERO rows):
--      select grantee, privilege_type from information_schema.role_table_grants
--       where table_schema = 'public' and table_name = 'pro_waitlist'
--         and grantee in ('anon', 'authenticated');
--
-- 6. Read the attributed waitlist:
--      select email, trade, city, source, campaign_code, created_at
--        from public.pro_waitlist
--       where campaign_code is not null
--       order by created_at desc;
-- =============================================================================

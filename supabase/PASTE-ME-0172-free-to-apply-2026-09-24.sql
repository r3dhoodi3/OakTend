-- =============================================================================
-- PASTE-ME-0172-free-to-apply-2026-09-24.sql   (built 2026-09-24)
-- Live-paste copy of migration 0172 (free_to_apply). Run this whole file in the
-- Supabase SQL editor against the live database. Below the PRECHECK it is byte
-- for byte supabase/migrations/0172_free_to_apply.sql.
--
-- WHAT IT DOES. Makes applying to a job and unlocking a direct request FREE, in
-- the database, which is the last place still charging for them. The money
-- model became a 5% cut of a paid invoice on 2026-09-12 (Stripe Connect, 0164)
-- and every customer-facing surface has said so for weeks, but apply_to_lead()
-- still debited the prepaid wallet and refused when the balance was short.
--
-- WHY IT MUST GO FIRST. The wallet UI (the deposit form, the balance tile, the
-- billing page) is being removed in the same wave. If that lands before this,
-- a pro cannot apply at all: the function still demands a balance and there is
-- no longer any way to add one.
--
-- WHAT IT DOES NOT DO. Nothing is dropped and no row is written. wallets,
-- wallet_transactions, bonus_grants and the pricing functions all stay exactly
-- as they are, so every historical charge remains auditable - a pro who paid
-- $50 in August still shows $50. Both functions are CREATE OR REPLACE with the
-- same signature, so the EXECUTE grants to `authenticated` are preserved and
-- the file is safe to re-run.
--
-- EVERY GUARD SURVIVES. The bodies were produced by deleting the money blocks
-- from the live definitions, not retyped: the chargeback freeze (0132), the
-- Orange County and launch-city gates (0087/0124), the idempotent
-- already-applied return, the big-job insurance gate (0153), the relationship
-- rule (0060), the SEC-1 self-apply guard (0161), the internal-accounts guard
-- (0165) and the block check (0138) are all present, in the same order, with
-- the same raise texts the server actions match on.
--
-- APPLY ORDER: 0165 -> 0170 -> 0171 -> this file.
-- =============================================================================

-- ---- PRECHECK: refuse to run against a database that is not ready ----------
-- Both functions are re-created below from the 0170 / 0165 bodies minus the
-- money. If live is BEHIND those, pasting this would silently roll back the
-- guards they added, so each is fingerprinted first and nothing is applied
-- unless every check passes.
do $precheck$
begin
  if not exists (
    select 1 from pg_proc
    where proname = 'apply_to_lead' and pronamespace = 'public'::regnamespace
  ) then
    raise exception 'PRECHECK: public.apply_to_lead() does not exist. This database is far behind (it is created in 0012). Nothing was changed.';
  end if;
  if not exists (
    select 1 from pg_proc
    where proname = 'unlock_direct_request' and pronamespace = 'public'::regnamespace
  ) then
    raise exception 'PRECHECK: public.unlock_direct_request() does not exist (migration 0104). Nothing was changed.';
  end if;
  -- 0165's internal-accounts guard must already be in BOTH bodies, or the
  -- versions below (which carry it) would be replacing something newer than
  -- what they were derived from.
  if not exists (
    select 1 from pg_proc
    where proname = 'apply_to_lead' and pronamespace = 'public'::regnamespace
      and prosrc like '%internal_account%'
  ) then
    raise exception 'PRECHECK: public.apply_to_lead() is not on 0165''s body (no internal-accounts guard). Apply 0165, then 0170, before this file. Nothing was changed.';
  end if;
  if not exists (
    select 1 from pg_proc
    where proname = 'unlock_direct_request' and pronamespace = 'public'::regnamespace
      and prosrc like '%internal_account%'
  ) then
    raise exception 'PRECHECK: public.unlock_direct_request() is not on 0165''s body (no internal-accounts guard). Apply 0165 before this file. Nothing was changed.';
  end if;
  -- 0170 removed the 3-applicant cap. If it is still live, this file would put
  -- it back by replacing apply_to_lead with a body that never had it.
  if exists (
    select 1 from pg_proc
    where proname = 'apply_to_lead' and pronamespace = 'public'::regnamespace
      and prosrc like '%Job is full%'
  ) then
    raise exception 'PRECHECK: public.apply_to_lead() still carries the 3-applicant cap, so migration 0170 has not been applied. Run PASTE-ME-0170 first, then this file. Nothing was changed.';
  end if;
end
$precheck$;


-- 0172_free_to_apply.sql
--
-- APPLYING IS FREE, AND SO IS UNLOCKING A DIRECT REQUEST.
--
-- The money model changed on 2026-09-12: OakTend takes 5% of a paid invoice
-- through Stripe Connect (migration 0164), and a pro pays nothing up front.
-- Everything customer-facing has said so for weeks - /pros, the onboarding
-- wizard ("No per-lead fees, no wallet") and HelpView - but the DATABASE still
-- charged. apply_to_lead() debited the per-category fee from the prepaid
-- wallet and returned false when the balance was short; unlock_direct_request()
-- did the same. The retirement so far (RETIRED_PRO_PROGRAMS_PAUSED, 2026-09-15)
-- only silenced the refund crons.
--
-- That gap is why the pro-side copy could not simply be swept: "Confirm and
-- pay $50" was accurate. This migration is what makes the promise true, and it
-- has to land BEFORE the wallet UI is removed - delete the deposit form while
-- these functions still charge and a pro cannot apply at all, with no way to
-- fund the balance that refuses them.
--
-- WHAT CHANGES, in both functions: the pricing block, the wallet lock, the
-- bonus-grant FIFO drain, the balance check, the debit and the
-- wallet_transactions ledger row all come out. Applications are recorded with
-- fee_cents 0 (and no discount_kind, since there is no price to discount).
--
-- WHAT DOES NOT CHANGE: every guard, byte for byte. The bodies below were
-- produced by deleting from the live definitions (apply_to_lead from 0170,
-- unlock_direct_request from 0165), not retyped, so the chargeback freeze
-- (0132), the Orange County gate (0087), the category check, the idempotent
-- already-applied return, the big-job insurance gate (0153), the launch-city
-- gate (0124), the one-live-lead relationship rule (0060), the SEC-1
-- self-apply guard (0161), the internal-accounts pairing guard (0165) and the
-- block check (0138) are all still here, in the same order, with the same
-- messages the server actions match on.
--
-- THE CHARGEBACK FREEZE IS KEPT ON PURPOSE even though no money moves here any
-- more. Its comment still describes wallet top-ups, which is the history of
-- why it exists; what it does today is refuse leads to an account with an
-- unresolved dispute, and that is worth keeping on its own merits.
--
-- NOTHING IS DROPPED. public.wallets, public.wallet_transactions,
-- public.bonus_grants and the pricing functions (pro_lead_fee_cents,
-- major_lead_price_cents, lead_aging_pct) all stay exactly as they are. Every
-- historical row keeps what it really recorded - a pro who paid $50 in August
-- still shows $50 - and any deposit ever taken stays auditable. These two
-- functions simply stop writing to any of it.
--
-- REVERSIBLE by re-running 0170's and 0165's copies of these functions.
--
-- Live is expected to be through 0171.
-- =============================================================================

create or replace function public.apply_to_lead(p_lead uuid, p_message text)
returns boolean language plpgsql security definer set search_path = public as $$
declare
  v_contractor uuid; v_cats text[]; v_oc boolean;
  v_launch_cities text[]; v_lead_city text;
  v_lead_contractor uuid; v_status text; v_category text;
  v_property uuid; v_owner uuid;
  -- payout_amount and created_at are still read off the lead (the select
  -- below is unchanged), they simply no longer price anything.
  v_payout numeric; v_created timestamptz;
  -- 0153: this pro's insurance expiry (compliance calendar, 0051), for the
  -- big-job gate below.
  v_insurance_expires date;
begin
  perform set_config('hearth.lead_write', 'on', true);

  -- 0153: insurance_expires rides the contractors select this function
  -- already makes, so the gate costs no extra query.
  select id, categories, serves_orange_county, launch_cities, insurance_expires
    into v_contractor, v_cats, v_oc, v_launch_cities, v_insurance_expires
    from contractors where user_id = auth.uid();
  if v_contractor is null then raise exception 'Not a contractor'; end if;

  -- 0132: an open payment dispute freezes spending. has_open_chargeback() is
  -- true only while this pro's account carries an uncleared abuse_flags row of
  -- kind 'chargeback' (written by the Stripe webhook on
  -- charge.dispute.created). Placed here, immediately after the contractor
  -- resolves and BEFORE the job is read, before any wallet lock, and before a
  -- single cent moves: a pro who has charged back a wallet top-up is spending
  -- money the platform has already lost, and the wallet balance still says it
  -- is there. Cleared by setting abuse_flags.cleared_at (service role only), so
  -- a dispute that is won or withdrawn unfreezes the account without erasing
  -- that it happened.
  if public.has_open_chargeback(v_contractor) then
    raise exception 'There is an unresolved payment dispute on your account. Contact support.';
  end if;

  -- 0087 fix (MED): reproduce open_jobs_for_me()'s hard Orange County launch
  -- gate here too, so a pro who never confirmed serves_orange_county can't
  -- bypass the board by applying directly against a leaked/guessed lead id.
  if not coalesce(v_oc, false) then
    raise exception 'Confirm the cities you serve in your profile before applying to jobs';
  end if;

  -- payout_amount and created_at used to price the lead (0031 aging, 0149
  -- membership); nothing prices anything now, and they are left in the select
  -- only so this read stays the shape every other guard was reviewed against.
  -- FOR UPDATE stays (0170): it is the same row lock choose_applicant() takes
  -- before it assigns a job, so the assigned / status reads just below are
  -- trustworthy and a pro cannot take a lead in the instant the homeowner is
  -- picking somebody else.
  select contractor_id, status, category, property_id, payout_amount, created_at
    into v_lead_contractor, v_status, v_category, v_property, v_payout, v_created
    from contractor_leads where id = p_lead
    for update;
  if v_category is null then raise exception 'Job not found'; end if;

  if v_lead_contractor is not null then return false; end if;  -- already assigned
  if v_status <> 'new' then return false; end if;              -- not open
  if v_cats is not null and not (v_category = any (v_cats)) then
    raise exception 'Job is not in your categories';
  end if;
  if exists (
    select 1 from lead_applications
    where lead_id = p_lead and contractor_id = v_contractor
  ) then
    return true;  -- idempotent: already applied
  end if;

  -- 0153: big jobs need current insurance on file. The three categories are
  -- the major tier (mirror LEAD_FEES in src/lib/constants.ts and
  -- major_lead_price_cents, 0113); the date rule mirrors hasCurrentInsurance
  -- in src/lib/insuranceGate.ts (a date today or later passes, nothing on
  -- file or a past date fails). Deliberately AFTER the idempotent
  -- already-applied return above - a pro who already paid for this lead keeps
  -- the honest `true` on a retry even if their insurance lapsed since (same
  -- reasoning as 0124's launch-city gate placement) - and BEFORE any wallet
  -- read or write, so a refused apply moves no money. The raise text is what
  -- applyToJobAction matches on (isInsuranceGateSqlError) to show the
  -- friendly message; keep it stable.
  if v_category in ('roof', 'structural', 'remodeling')
     and (v_insurance_expires is null or v_insurance_expires < current_date) then
    raise exception 'Insurance required for big jobs';
  end if;

  -- 0124: the per-city half of the launch gate, mirroring the identical line
  -- open_jobs_for_me() filters the board on. Deliberately AFTER the
  -- already-applied idempotent return above: a pro who paid for this lead and
  -- later narrowed their launch_cities still gets the honest `true` on a
  -- retry, never a geography error for a job they already hold. Still before
  -- any money moves or any row is written.
  select public.launch_city_for_zip(p.zip) into v_lead_city
    from properties p where p.id = v_property;
  if v_lead_city is null or not (v_lead_city = any (coalesce(v_launch_cities, '{}'))) then
    raise exception 'This job is outside the cities you serve. Update your service area in your profile.';
  end if;

  -- One live lead per relationship (0060's rule): refuse when the pro already
  -- has an active job (not closed/lost) in this category on a property with
  -- the same owner. Closed/lost jobs never block, so rehires and repeat
  -- business stay wide open.
  select pr.user_id into v_owner from properties pr where pr.id = v_property;

  -- 0161 SEC-1: a dual-side account (homeowner AND pro on the same auth user)
  -- must not be able to pay to apply to its own posted job. Placed
  -- immediately after v_owner resolves - the earliest point this function
  -- knows who the property owner is - and before the block check, before
  -- any wallet read, and before any row is written, so a refused self-apply
  -- moves no money. Raised text is matched by applyToJobAction in
  -- src/app/pro/actions.ts for a friendly message; this SQL raise is the
  -- real enforcement (see this file's header for why it must live here and
  -- not only in the server action).
  if v_owner is not null and v_owner = auth.uid() then
    raise exception 'You cannot apply to your own job.';
  end if;

  -- 0165 internal accounts: an internal (team test) pro and a real homeowner
  -- must never transact, in either direction. open_jobs_for_me no longer
  -- lists the pairing; this is the backstop for a direct PostgREST call with
  -- a guessed or leaked lead id. Same placement reasoning as the SEC-1 guard
  -- directly above: before the block check, before any wallet read, before
  -- any write, so a refused apply moves no money. The message is deliberately
  -- the same vague wording 0138 uses for blocks so it cannot be used to probe
  -- which accounts are internal; HINT carries the machine marker.
  if public.is_internal_user(v_owner)
     is distinct from public.is_internal_contractor(v_contractor) then
    raise exception 'This job is not available to you.'
      using hint = 'internal_account';
  end if;

  -- 0138: a block between these two people. Symmetric, and worded without
  -- saying which side blocked whom - the pro must not be able to use this
  -- error to learn that a particular homeowner blocked them. Placed on the
  -- first line that knows who the homeowner is, and still before every wallet
  -- read, every debit, and every insert.
  if v_owner is not null and public.blocked_between(auth.uid(), v_owner) then
    raise exception 'This job is not available to you.';
  end if;

  if v_owner is not null and exists (
    select 1
    from contractor_leads active
    join properties ap on ap.id = active.property_id
    where active.contractor_id = v_contractor
      and active.category = v_category
      and active.status not in ('closed', 'lost')
      and ap.user_id = v_owner
  ) then
    raise exception 'Already working with this homeowner';
  end if;

  -- 0170: the applicant cap that stood here is gone. A job never fills, so
  -- nothing between the relationship rule above and the insert below refuses
  -- an application for being late.

  -- fee_cents 0 and no discount_kind: applying is free, so there is no
  -- price to record and nothing for a discount to have been applied to. The
  -- column stays (every historical row keeps what it was really charged).
  insert into lead_applications (lead_id, contractor_id, message, status, fee_cents, discount_kind)
    values (p_lead, v_contractor, nullif(btrim(p_message), ''), 'applied', 0, null);

  return true;
end; $$;

create or replace function public.unlock_direct_request(p_lead uuid)
returns boolean language plpgsql security definer set search_path = public as $$
declare
  v_contractor uuid;
  v_direct_to uuid; v_lead_contractor uuid; v_status text; v_category text;
  v_declined timestamptz; v_unlocked timestamptz; v_price bigint;
  -- 0153: this pro's insurance expiry (compliance calendar, 0051), for the
  -- big-job gate below.
  v_insurance_expires date;
  -- 0165: the homeowner behind this request, for the internal-accounts guard.
  v_owner uuid;
begin
  -- Privileged flag: the contractor_leads_locked trigger (0077, latest body
  -- 0088) strips any client write to contractor_id/paid/paid_at/status unless
  -- this session flag is set, exactly as apply_to_lead/choose_applicant do
  -- (0087). Without it, the final assignment UPDATE below would be silently
  -- reverted after the wallet was already debited. Must be the FIRST statement.
  perform set_config('hearth.lead_write', 'on', true);

  -- 0153: insurance_expires rides the contractors select this function
  -- already makes, so the gate costs no extra query.
  select id, insurance_expires into v_contractor, v_insurance_expires
    from contractors where user_id = auth.uid();
  if v_contractor is null then raise exception 'Not a contractor'; end if;

  -- 0132: an open payment dispute freezes spending. has_open_chargeback() is
  -- true only while this pro's account carries an uncleared abuse_flags row of
  -- kind 'chargeback' (written by the Stripe webhook on
  -- charge.dispute.created). Placed here, immediately after the contractor
  -- resolves and BEFORE the job is read, before any wallet lock, and before a
  -- single cent moves: a pro who has charged back a wallet top-up is spending
  -- money the platform has already lost, and the wallet balance still says it
  -- is there. Cleared by setting abuse_flags.cleared_at (service role only), so
  -- a dispute that is won or withdrawn unfreezes the account without erasing
  -- that it happened.
  if public.has_open_chargeback(v_contractor) then
    raise exception 'There is an unresolved payment dispute on your account. Contact support.';
  end if;

  -- Lock the lead and price the fee from its age, same as apply_to_lead.
  -- 0113: category is read too, so the intro price below can tell whether
  -- this is a major-tier request.
  select direct_to, contractor_id, status, category,
         direct_declined_at, direct_unlocked_at,
         public.lead_fee_cents(payout_amount, created_at)
    into v_direct_to, v_lead_contractor, v_status, v_category,
         v_declined, v_unlocked, v_price
    from contractor_leads where id = p_lead
    for update;
  if v_direct_to is null then raise exception 'Not a direct request'; end if;
  if v_direct_to <> v_contractor then raise exception 'Not your request'; end if;

  -- Already unlocked: by me -> idempotent success; otherwise impossible.
  if v_lead_contractor is not null then
    if v_lead_contractor = v_contractor then return true; end if;
    raise exception 'Request already assigned';
  end if;
  if v_declined is not null then raise exception 'Request was declined'; end if;
  if v_status <> 'new' then raise exception 'Request no longer available'; end if;

  -- 0153: big jobs need current insurance on file, same gate and same raise
  -- text as apply_to_lead's (see Part 1 for the full reasoning). Placed after
  -- the idempotent already-unlocked return above - a pro who already paid for
  -- this request keeps the honest `true` on a retry - and before the block
  -- check, the wallet, and every write, so a refused unlock moves no money.
  if v_category in ('roof', 'structural', 'remodeling')
     and (v_insurance_expires is null or v_insurance_expires < current_date) then
    raise exception 'Insurance required for big jobs';
  end if;

  -- 0140: a block between these two people. Same predicate as apply_to_lead's
  -- gate (0138), same wording, same reason: symmetric, and it must not tell
  -- the pro which side blocked whom. This is the third and last place a pro
  -- spends wallet money - the job board (open_jobs_for_me) and apply_to_lead
  -- were closed in 0138; this was the one left open. Placed after every
  -- existing "is this request even available" check and before
  -- get_or_create_wallet, so it costs nothing extra and still refuses before
  -- any wallet is touched.
  if exists (
    select 1
    from contractor_leads l
    join properties pr on pr.id = l.property_id
    where l.id = p_lead
      and public.blocked_between(auth.uid(), pr.user_id)
  ) then
    raise exception 'This job is not available to you.';
  end if;

  -- 0165 internal accounts: an internal (team test) pro and a real homeowner
  -- must never transact, in either direction - same rule and same wording as
  -- apply_to_lead's guard. my_direct_requests no longer lists the pairing and
  -- requestProAction refuses to create it, so this is the backstop for a row
  -- that predates the flag or a direct PostgREST call. Placed alongside the
  -- block check above, still before get_or_create_wallet, so a refused unlock
  -- moves no money.
  select pr.user_id into v_owner
    from contractor_leads l
    join properties pr on pr.id = l.property_id
   where l.id = p_lead;
  if public.is_internal_user(v_owner)
     is distinct from public.is_internal_contractor(v_contractor) then
    raise exception 'This job is not available to you.'
      using hint = 'internal_account';
  end if;

  -- History row for the unlock (also the row ghost_refund_direct marks).
  -- fee_cents 0: unlocking is free now, like applying.
  insert into lead_applications (lead_id, contractor_id, message, status, fee_cents)
    values (p_lead, v_contractor, null, 'chosen', 0);

  -- Assign + open chat: contractor_id set is what unlocks contact and messages.
  update contractor_leads
     set contractor_id = v_contractor, status = 'accepted',
         paid = true, paid_at = now(), direct_unlocked_at = now()
   where id = p_lead;

  return true;
end; $$;

comment on function public.apply_to_lead(uuid, text) is
  'Records an application (0012, latest body 0172). Applying is FREE as of '
  '0172 - the wallet charge, the bonus drain and the ledger row are gone and '
  'fee_cents is written as 0. Every guard from 0132/0087/0153/0124/0060/0161/'
  '0165/0138 is unchanged, and 0170''s removal of the 3-applicant cap stands.';

comment on function public.unlock_direct_request(uuid) is
  'Unlocks a direct request and opens the chat (latest body 0172). Free as of '
  '0172, matching apply_to_lead: no wallet lock, no debit, no ledger row, '
  'fee_cents 0. The insurance, block and internal-account guards are '
  'unchanged.';

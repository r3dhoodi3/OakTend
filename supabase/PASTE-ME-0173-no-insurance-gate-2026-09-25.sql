-- =============================================================================
-- PASTE-ME-0173-no-insurance-gate-2026-09-25.sql   (built 2026-09-25)
-- Live-paste copy of migration 0173 (no_insurance_gate). Run this whole file in
-- the Supabase SQL editor. Below the PRECHECK it is byte for byte
-- supabase/migrations/0173_no_insurance_gate.sql.
--
-- WHAT IT DOES. Removes the big-job insurance refusal from apply_to_lead and
-- unlock_direct_request. A pro can now apply to a roof, structural or
-- remodeling job without an insurance date on file. See the migration header
-- for why: the date is self-typed and was never verified, California does not
-- require the coverage for most licence types, and the gate contradicted the
-- site's own "we don't vet" wording.
--
-- ORDER MATTERS. This file carries 0172's bodies minus the gate. If 0172 has
-- not been applied, pasting this would silently REINSTATE the per-lead wallet
-- charge that 0172 removed. The PRECHECK refuses in that case and changes
-- nothing.
--
-- WHAT IT DOES NOT DO. No column is dropped: insurance_expires,
-- insurance_carrier and insurance_doc_path all stay, the compliance calendar
-- still reminds a pro to renew, and the homeowner now SEES the expiry on the
-- applicant card. CREATE OR REPLACE with the same signatures, so the EXECUTE
-- grants are preserved and the file is safe to re-run.
--
-- APPLY ORDER: 0165 -> 0170 -> 0171 -> 0172 -> this file.
-- =============================================================================

do $precheck$
begin
  if not exists (
    select 1 from pg_proc
    where proname = 'apply_to_lead' and pronamespace = 'public'::regnamespace
  ) then
    raise exception 'PRECHECK: public.apply_to_lead() does not exist. Nothing was changed.';
  end if;
  -- 0172 must already be live, or this file would put the wallet charge back.
  -- MATCH THE CALL, NOT THE WORDS: pg_proc.prosrc includes comments, and 0172
  -- leaves "get_or_create_wallet" sitting in two comments inside
  -- unlock_direct_request. Testing for the bare name therefore refused a
  -- database that was correctly migrated (seen live 2026-09-25). The
  -- assignment only ever appears as code.
  if exists (
    select 1 from pg_proc
    where proname = 'apply_to_lead' and pronamespace = 'public'::regnamespace
      and prosrc like '%v_wallet := get_or_create_wallet%'
  ) then
    raise exception 'PRECHECK: public.apply_to_lead() still charges the wallet, so migration 0172 has not been applied. Run PASTE-ME-0172-free-to-apply-2026-09-24.sql FIRST - pasting this now would reinstate the per-lead fee. NOTHING WAS CHANGED.';
  end if;
  if exists (
    select 1 from pg_proc
    where proname = 'unlock_direct_request' and pronamespace = 'public'::regnamespace
      and prosrc like '%v_wallet := get_or_create_wallet%'
  ) then
    raise exception 'PRECHECK: public.unlock_direct_request() still charges the wallet (migration 0172 not applied). Run PASTE-ME-0172 first. NOTHING WAS CHANGED.';
  end if;
  -- 0165's internal-accounts guard must be in both bodies, as with 0172.
  if not exists (
    select 1 from pg_proc
    where proname = 'apply_to_lead' and pronamespace = 'public'::regnamespace
      and prosrc like '%internal_account%'
  ) then
    raise exception 'PRECHECK: public.apply_to_lead() is not on 0165''s body (no internal-accounts guard). Nothing was changed.';
  end if;
end
$precheck$;


-- 0173_no_insurance_gate.sql
--
-- THE BIG-JOB INSURANCE GATE COMES OUT.
--
-- Migration 0153 refused an application (and a direct-request unlock) for the
-- three major-tier categories - roof, structural, remodeling - unless the
-- contractor's insurance_expires was a date today or later.
--
-- WHY IT GOES. It never verified anything. insurance_expires is a date the
-- contractor types into a form field (src/app/pro/profile/actions.ts, which
-- validates only that it parses as a date); nothing contacts a carrier and
-- nothing compares it to the uploaded document. So the gate asked "did this
-- pro type a future date into a box" while creating the impression that
-- OakTend had checked coverage - which is the worst of both: no protection,
-- and an implied assurance the product never made good on.
--
-- It is also stricter than the state. California's CSLB does not require
-- general liability for most licence types (an LLC needs $1M; workers' comp
-- only with employees), so the gate turned away legitimate licensed
-- contractors over a standard nobody else applies.
--
-- And it contradicted OakTend's own words. The landing page has always said:
-- "we don't vet or guarantee their work, so check their license at
-- cslb.ca.gov and ask for proof of insurance before you hire."
--
-- WHAT REPLACES IT: disclosure, not a gate. The expiry and carrier are still
-- collected, and are now shown to the HOMEOWNER on the applicant card -
-- "Insurance on file: <carrier>, expires <date>" or "No insurance on file" -
-- each labelled as provided by the pro and not verified by OakTend. The
-- decision moves to the person carrying the risk, at the moment they choose,
-- which is the only point where it can actually change anything.
--
-- WHAT DOES NOT CHANGE: every other guard, byte for byte. These bodies were
-- produced by deleting the gate from 0172's definitions, not retyped, so the
-- chargeback freeze (0132), the Orange County and launch-city gates
-- (0087/0124), the idempotent already-applied return, the relationship rule
-- (0060), the SEC-1 self-apply guard (0161), the internal-accounts guard
-- (0165) and the block checks (0138/0140) are all still here, in the same
-- order, with the same raise texts the server actions match on.
--
-- Nothing is dropped: contractors.insurance_expires, insurance_carrier and
-- insurance_doc_path all stay, and the compliance calendar that reminds a pro
-- to renew is untouched. Only the refusal is gone.
--
-- Live is expected to be through 0172.
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
begin
  perform set_config('hearth.lead_write', 'on', true);

  select id, categories, serves_orange_county, launch_cities
    into v_contractor, v_cats, v_oc, v_launch_cities
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

  -- The big-job insurance gate (0153) stood here: roof / structural /
  -- remodeling refused unless insurance_expires was a date today or later.
  -- Removed 2026-09-25. It never verified anything - insurance_expires is a
  -- date the contractor types into a form (pro/profile/actions.ts), with no
  -- carrier check and nothing comparing it to the uploaded document - so it
  -- gated on "did this pro type a future date", while creating the
  -- impression OakTend had verified coverage. California does not require
  -- general liability for most CSLB licence types either, so it also turned
  -- away legitimate licensed contractors.
  --
  -- The date is still collected and is now SHOWN TO THE HOMEOWNER on the
  -- applicant card, labelled as provided by the pro and unverified, so the
  -- person carrying the risk decides. See 0173's header.
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
  -- 0165: the homeowner behind this request, for the internal-accounts guard.
  v_owner uuid;
begin
  -- Privileged flag: the contractor_leads_locked trigger (0077, latest body
  -- 0088) strips any client write to contractor_id/paid/paid_at/status unless
  -- this session flag is set, exactly as apply_to_lead/choose_applicant do
  -- (0087). Without it, the final assignment UPDATE below would be silently
  -- reverted after the wallet was already debited. Must be the FIRST statement.
  perform set_config('hearth.lead_write', 'on', true);

  select id into v_contractor
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

  -- The big-job insurance gate (0153) stood here: roof / structural /
  -- remodeling refused unless insurance_expires was a date today or later.
  -- Removed 2026-09-25. It never verified anything - insurance_expires is a
  -- date the contractor types into a form (pro/profile/actions.ts), with no
  -- carrier check and nothing comparing it to the uploaded document - so it
  -- gated on "did this pro type a future date", while creating the
  -- impression OakTend had verified coverage. California does not require
  -- general liability for most CSLB licence types either, so it also turned
  -- away legitimate licensed contractors.
  --
  -- The date is still collected and is now SHOWN TO THE HOMEOWNER on the
  -- applicant card, labelled as provided by the pro and unverified, so the
  -- person carrying the risk decides. See 0173's header.
  -- 0140: a block between these two people. Same predicate as apply_to_lead's
  -- gate (0138), same wording, same reason: symmetric, and it must not tell
  -- the pro which side blocked whom. This was the third and last place a
  -- pro spent wallet money - the job board (open_jobs_for_me) and
  -- apply_to_lead were closed in 0138; this was the one left open. Nothing
  -- spends anything here now (0172), but the check stays exactly where it
  -- was: a blocked pair must not be able to open a chat either.
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
  -- block check above, before anything is written.
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
  'Records an application (0012, latest body 0173). Free since 0172; the '
  'big-job insurance gate came out in 0173 - it gated on a self-typed date '
  'and implied a check OakTend never made. Every other guard is unchanged.';

comment on function public.unlock_direct_request(uuid) is
  'Unlocks a direct request and opens the chat (latest body 0173). Free since '
  '0172, insurance gate removed in 0173, every other guard unchanged.';

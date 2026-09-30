-- =============================================================================
-- OakTend - close a job when its invoice is paid (0175)
-- RUN THIS AGAINST THE LIVE DATABASE (Supabase SQL editor).
--
-- WHY THIS EXISTS. Payment-flow step 9: when Stripe reports an invoice paid,
-- the job it belongs to moves to Complete ("closed", the status the pro's own
-- Won button sets). The Connect webhook does that write with the service-role
-- client - and the service role is NOT a party to the lead. 0087's status
-- guard in enforce_contractor_leads_locked() reverts any status change from a
-- non-party unless the write is privileged (the oaktend.lead_write flag), so a
-- plain UPDATE from the webhook would be silently undone and the job would
-- sit at Hired forever with a paid invoice on it.
--
-- WHAT IT ADDS. One SECURITY DEFINER function, service_role only, that flips
-- the flag and closes the lead - and refuses unless every fact lines up:
--   * the invoice row exists and its status is 'paid' (the webhook writes
--     that first, from Stripe's own event; this function never trusts a
--     caller's claim that money moved)
--   * the invoice is the FULL amount or the remaining BALANCE - a paid deposit
--     or change order leaves the job open, because work is still owed
--   * the lead is 'accepted' (hired) and assigned to the SAME contractor the
--     invoice belongs to
-- Anything else returns false and changes nothing, so the webhook cannot be
-- used to close an arbitrary job even with a valid signature. closed_at is
-- derived by the trigger (0088), exactly as when a pro marks a job Won.
--
-- WHAT IT DOES NOT DO. No money moves, no notification, no review ask; the
-- webhook handles those in TypeScript after this returns true. Safe to re-run.
-- =============================================================================

create or replace function public.close_lead_on_payment(p_invoice uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lead uuid;
  v_contractor uuid;
  v_status text;
  v_kind text;
  v_lead_status text;
  v_lead_contractor uuid;
begin
  select lead_id, contractor_id, status, kind
    into v_lead, v_contractor, v_status, v_kind
    from public.invoices
   where id = p_invoice;

  if v_lead is null then
    return false;
  end if;
  if v_status is distinct from 'paid' then
    return false;
  end if;
  if v_kind not in ('full', 'balance') then
    return false;
  end if;

  select status, contractor_id
    into v_lead_status, v_lead_contractor
    from public.contractor_leads
   where id = v_lead
     for update;

  if v_lead_status is distinct from 'accepted'
     or v_lead_contractor is null
     or v_lead_contractor is distinct from v_contractor then
    return false;
  end if;

  -- Transaction-local, same as every other privileged lead writer.
  perform set_config('oaktend.lead_write', 'on', true);

  update public.contractor_leads
     set status = 'closed'
   where id = v_lead
     and status = 'accepted';

  return found;
end;
$$;

revoke all on function public.close_lead_on_payment(uuid) from public, anon, authenticated;
grant execute on function public.close_lead_on_payment(uuid) to service_role;

comment on function public.close_lead_on_payment(uuid) is
  'Moves a hired lead to closed (Complete) once its FULL or BALANCE invoice is '
  'paid. Service role only (the Connect webhook). Refuses unless the invoice '
  'row is already paid, is full/balance, and the lead is accepted and assigned '
  'to that invoice''s contractor. Sets oaktend.lead_write so 0087''s non-party '
  'status guard lets the write through; closed_at is derived by the trigger.';

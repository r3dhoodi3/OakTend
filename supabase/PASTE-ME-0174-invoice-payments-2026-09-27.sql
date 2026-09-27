-- =============================================================================
-- PASTE-ME-0174-invoice-payments-2026-09-27.sql   (built 2026-09-27)
-- Live-paste copy of migration 0174 (invoice_payments). Run this whole file in
-- the Supabase SQL editor. Below the PRECHECK it is byte for byte
-- supabase/migrations/0174_invoice_payments.sql.
--
-- WHAT IT DOES. Gives public.invoices the columns the payment flow reads and
-- writes (frozen fee, Stripe ids, settlement, refunds), widens status to
-- paid / refunded / disputed, relaxes the 0064 signature constraint so a
-- signed invoice can become paid, and stamps lead_quotes.accepted_at by
-- trigger. It also REPLACES 0064's table-level INSERT grant on invoices with
-- a column list, so no browser session can ever write a fee - only
-- service_role can. Read the migration header for the reasoning.
--
-- WHAT IT DOES NOT DO. No money moves. No row changes status. Nothing in the
-- app reads the new columns until the Phase 1 send action ships, and that
-- action tolerates these columns being absent (isMissingSchemaError) the same
-- way /pro/payouts tolerates 0164 being absent - so pasting this before or
-- after the deploy are both safe.
--
-- APPLY ORDER: 0164 -> 0172 -> 0173 -> this file. Safe to re-run.
-- =============================================================================

do $precheck$
begin
  if not exists (
    select 1 from pg_tables where schemaname = 'public' and tablename = 'invoices'
  ) then
    raise exception 'PRECHECK: public.invoices does not exist (migration 0064). Nothing was changed.';
  end if;
  if not exists (
    select 1 from pg_tables where schemaname = 'public' and tablename = 'lead_quotes'
  ) then
    raise exception 'PRECHECK: public.lead_quotes does not exist (migration 0056). Nothing was changed.';
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'invoices'
      and policyname = 'invoices contractor insert'
  ) then
    raise exception 'PRECHECK: the 0064 insert policy on public.invoices is missing, so the column-level INSERT grant below would be the only guard on inserts. Re-apply 0064 first. Nothing was changed.';
  end if;
  -- 0164 must be live: the send action reads stripe_account_id off contractors
  -- and every row this file adds is meaningless without a connected account.
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'contractors'
      and column_name = 'stripe_account_id'
  ) then
    raise exception 'PRECHECK: contractors.stripe_account_id is missing (migration 0164). Paste PASTE-ME-0164 first. Nothing was changed.';
  end if;
end
$precheck$;

-- =============================================================================
-- OakTend - invoices carry the payment (0174)
-- RUN THIS AGAINST THE LIVE DATABASE (Supabase SQL editor).
--
-- WHY THIS EXISTS. Decided 2026-09-26: an invoice a pro sends from the chat
-- becomes a Stripe Invoice on the pro's own connected (Express) account, with
-- OakTend's cut attached as application_fee_amount - 5% of the total, 3% for
-- an active Pro member, $15 minimum, $1,000 cap, per invoice. Stripe delivers
-- it and collects; the Connect webhook settles it. The invoices table (0064)
-- knows only sent -> signed / void and nothing about money. This file adds
-- what the flow reads and writes, and nothing the flow does not need.
--
-- WHAT IT ADDS to public.invoices (all nullable or defaulted; no backfill):
--   quote_id, kind, memo, due_at                what was sent
--   fee_rate_bps, fee_cents, livemode           the fee, FROZEN at send
--   stripe_customer_id, stripe_invoice_id,
--   hosted_invoice_url                          delivery
--   stripe_payment_intent_id,
--   stripe_application_fee_id,
--   amount_paid_cents, paid_at                  settlement
--   refunded_cents, fee_refunded_cents          refunds
-- and to public.lead_quotes: accepted_at, stamped by a trigger the moment
-- status becomes 'accepted' - the agreement the invoice pre-fills from.
--
-- THE RULE THIS FILE KEEPS: A BROWSER SESSION CAN NEVER WRITE A FEE. 0064
-- granted table-level INSERT on invoices to `authenticated`. With the columns
-- below, that grant would let a pro's own session insert a row with
-- fee_cents = 0 and RLS would wave it through (the insert policy checks
-- ownership, not amounts). So this file REPLACES the table-level INSERT with
-- a column-level one naming only what a pro types - the 0064 set plus
-- quote_id, kind, memo, due_at - and every money and Stripe column is
-- therefore writable by service_role alone. The send action computes the fee
-- on the server and inserts with the admin client; the webhook writes
-- settlement the same way. The 0064 UPDATE grant (status, signature fields,
-- updated_at) is unchanged: a pro can still void, a homeowner can still sign,
-- and neither can touch a cent.
--
-- SELECT stays table-level (0064), so both sides can read a row they are
-- allowed to see, fee columns included. The homeowner's UI never renders a
-- fee line; that is a product rule, not a data rule, and it is fine: the fee
-- comes out of the pro's side of the charge and is not the homeowner's cost.
--
-- STATUS after this file:
--   sent -> paid       (webhook, invoice.paid)
--   sent -> signed     (homeowner, 0064)      signed -> paid (webhook)
--   sent -> void       (contractor, 0064)
--   paid -> refunded   (webhook, charge.refunded)
--   paid -> disputed   (webhook, charge.dispute.created)
-- 0064's signature constraint said "the three signature fields are set IF AND
-- ONLY IF status = 'signed'", which would refuse to move a signed invoice to
-- paid. Relaxed to: status = 'signed' REQUIRES all three; the three are
-- all-or-nothing whatever the status.
--
-- Safe to re-run.
-- =============================================================================

-- ---- invoices: what was sent -------------------------------------------------
alter table public.invoices
  add column if not exists quote_id uuid references public.lead_quotes(id) on delete set null;
alter table public.invoices
  add column if not exists kind text not null default 'full';
alter table public.invoices
  add column if not exists memo text;
alter table public.invoices
  add column if not exists due_at timestamptz;

alter table public.invoices drop constraint if exists invoices_kind_check;
alter table public.invoices
  add constraint invoices_kind_check
  check (kind in ('full', 'deposit', 'change_order', 'balance'));

alter table public.invoices drop constraint if exists invoices_memo_length;
alter table public.invoices
  add constraint invoices_memo_length check (memo is null or length(memo) <= 500);

-- ---- invoices: the fee, frozen at send --------------------------------------
alter table public.invoices
  add column if not exists fee_rate_bps integer;
alter table public.invoices
  add column if not exists fee_cents integer;
alter table public.invoices
  add column if not exists livemode boolean;

alter table public.invoices drop constraint if exists invoices_fee_rate_bps_check;
alter table public.invoices
  add constraint invoices_fee_rate_bps_check
  check (fee_rate_bps is null or (fee_rate_bps >= 0 and fee_rate_bps <= 10000));

alter table public.invoices drop constraint if exists invoices_fee_cents_check;
alter table public.invoices
  add constraint invoices_fee_cents_check
  check (fee_cents is null or (fee_cents >= 0 and fee_cents <= total_cents));

-- ---- invoices: delivery ------------------------------------------------------
alter table public.invoices
  add column if not exists stripe_customer_id text;
alter table public.invoices
  add column if not exists stripe_invoice_id text;
alter table public.invoices
  add column if not exists hosted_invoice_url text;

create unique index if not exists invoices_stripe_invoice_idx
  on public.invoices (stripe_invoice_id) where stripe_invoice_id is not null;

-- ---- invoices: settlement and refunds ---------------------------------------
alter table public.invoices
  add column if not exists stripe_payment_intent_id text;
alter table public.invoices
  add column if not exists stripe_application_fee_id text;
alter table public.invoices
  add column if not exists amount_paid_cents integer;
alter table public.invoices
  add column if not exists paid_at timestamptz;
alter table public.invoices
  add column if not exists refunded_cents integer not null default 0;
alter table public.invoices
  add column if not exists fee_refunded_cents integer not null default 0;

create unique index if not exists invoices_stripe_payment_intent_idx
  on public.invoices (stripe_payment_intent_id) where stripe_payment_intent_id is not null;

alter table public.invoices drop constraint if exists invoices_refunds_check;
alter table public.invoices
  add constraint invoices_refunds_check
  check (refunded_cents >= 0 and fee_refunded_cents >= 0);

-- ---- invoices: status and the signature constraint --------------------------
alter table public.invoices drop constraint if exists invoices_status_check;
alter table public.invoices
  add constraint invoices_status_check
  check (status in ('sent', 'signed', 'void', 'paid', 'refunded', 'disputed'));

alter table public.invoices drop constraint if exists invoices_signature_consistent;
alter table public.invoices
  add constraint invoices_signature_consistent check (
    (status <> 'signed'
      or (signed_at is not null and signed_by is not null and signature_method is not null))
    and ((signed_at is null) = (signed_by is null))
    and ((signed_at is null) = (signature_method is null))
  );

comment on column public.invoices.fee_rate_bps is
  'OakTend''s cut in basis points, FROZEN when the invoice is sent: 500, or '
  '300 for a pro whose Pro membership was in a PAID period at that moment. '
  'Never recomputed; a membership starting or lapsing later changes nothing.';
comment on column public.invoices.fee_cents is
  'fee_rate_bps x total_cents, then $15 minimum and $1,000 cap, never above '
  'total_cents. Exactly what Stripe is told to take as application_fee_amount. '
  'Written by service_role only (see the INSERT grant below).';
comment on column public.invoices.stripe_invoice_id is
  'The Stripe Invoice on the PRO''s connected account. Null means delivery '
  'failed and the pro can retry; the row is still a chat invoice either way.';
comment on column public.invoices.livemode is
  'Stripe livemode of the invoice. Test-mode rows (internal accounts on the '
  'test site, which shares this database) never count in revenue.';

-- ---- grants: money columns are service_role only ----------------------------
-- Replaces 0064's table-level INSERT with a column list. RLS (0064's insert
-- policy) still pins lead/contractor/property ownership on every insert.
revoke insert on public.invoices from authenticated;
grant insert (
  lead_id, contractor_id, property_id, line_items, subtotal_cents, total_cents,
  quote_id, kind, memo, due_at
) on public.invoices to authenticated;

-- ---- lead_quotes: the agreement moment --------------------------------------
alter table public.lead_quotes
  add column if not exists accepted_at timestamptz;

comment on column public.lead_quotes.accepted_at is
  'Stamped by trigger when status first becomes ''accepted''. The price of '
  'record: the invoice pre-fills from it, and if a job is paid outside the '
  'app it is the number the fee is based on.';

create or replace function public.lead_quotes_stamp_accepted()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'accepted' and old.status is distinct from 'accepted' then
    new.accepted_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists lead_quotes_stamp_accepted on public.lead_quotes;
create trigger lead_quotes_stamp_accepted
  before update on public.lead_quotes
  for each row execute function public.lead_quotes_stamp_accepted();

-- Quotes already accepted before this file: their updated_at is the moment
-- the status flipped (0056 grants update on status and updated_at only), so
-- it is the honest backfill.
update public.lead_quotes
  set accepted_at = updated_at
  where status = 'accepted' and accepted_at is null;

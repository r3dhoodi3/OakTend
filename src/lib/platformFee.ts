// OakTend's cut of an invoice, and what the pro is left with.
//
// THE ONE PLACE THE RATE LIVES. Decided 2026-09-26: 5% of each invoice paid
// through OakTend, 3% for a pro whose Pro membership is in a PAID period,
// $15 minimum and $1,000 cap, all per invoice. Stripe never decides any of
// this - on a Connect direct charge the platform sets application_fee_amount,
// so whatever this module returns is what Stripe takes. The send action calls
// it once, writes the result onto the invoices row (fee_rate_bps, fee_cents,
// migration 0174), and everything downstream - the pro's preview, the Stripe
// invoice, the webhook, a card-on-file charge - reads the frozen row value.
// Nothing recomputes.
//
// Pure on purpose: no auth, no Supabase, no Stripe, no "server-only". Whether
// a pro IS a member is the caller's question (hasActivePaidProPlan in
// src/lib/subscription.ts); this module only turns that answer into cents,
// which is what makes every edge below unit-testable.

export const STANDARD_FEE_BPS = 500;
export const MEMBER_FEE_BPS = 300;
export const FEE_MIN_CENTS = 1_500;
export const FEE_CAP_CENTS = 100_000;

export type FeeRateBps = typeof STANDARD_FEE_BPS | typeof MEMBER_FEE_BPS;

/** 300 for a paid Pro member, 500 for everyone else. A trial is not a member. */
export function feeRateBpsFor(paidMember: boolean): FeeRateBps {
  return paidMember ? MEMBER_FEE_BPS : STANDARD_FEE_BPS;
}

/**
 * The fee in cents for one invoice: rate x total, rounded to the cent, then
 * the $15 floor and the $1,000 ceiling. Never more than the invoice itself -
 * Stripe rejects an application fee above the charge, and a $10 invoice
 * costing $15 is nonsense either way. (Nobody invoices $10; the guard is so
 * the number is always valid, not because the case is expected.)
 */
export function platformFeeCents(totalCents: number, rateBps: number): number {
  if (!Number.isFinite(totalCents) || totalCents <= 0) return 0;
  const raw = Math.round((totalCents * rateBps) / 10_000);
  const clamped = Math.min(Math.max(raw, FEE_MIN_CENTS), FEE_CAP_CENTS);
  return Math.min(clamped, Math.round(totalCents));
}

export type PlatformFee = { rateBps: FeeRateBps; feeCents: number };

/** Rate and fee together, so a caller cannot freeze one without the other. */
export function platformFeeFor(totalCents: number, paidMember: boolean): PlatformFee {
  const rateBps = feeRateBpsFor(paidMember);
  return { rateBps, feeCents: platformFeeCents(totalCents, rateBps) };
}

// ---- Stripe's side, for the preview only ------------------------------------
//
// On a direct charge the PRO pays Stripe's processing, deducted from the same
// charge as OakTend's fee. The preview must show it or "You receive about $X"
// is a lie the first payout corrects. These are Stripe's published US rates
// as of 2026-09; they are an ESTIMATE for the preview and are never written
// anywhere or used to compute what Stripe is told to take. If Stripe changes
// its pricing, this is the only place to touch.

export type PaymentMethodEstimate = "card" | "us_bank_account";

const CARD_BPS = 290;
const CARD_FIXED_CENTS = 30;
const ACH_BPS = 80;
const ACH_CAP_CENTS = 500;
const INVOICING_BPS = 40;
const INVOICING_CAP_CENTS = 200;

/** Stripe processing for one payment method, before the invoicing fee. */
export function stripeProcessingEstimateCents(
  totalCents: number,
  method: PaymentMethodEstimate
): number {
  if (!Number.isFinite(totalCents) || totalCents <= 0) return 0;
  if (method === "us_bank_account") {
    return Math.min(Math.round((totalCents * ACH_BPS) / 10_000), ACH_CAP_CENTS);
  }
  return Math.round((totalCents * CARD_BPS) / 10_000) + CARD_FIXED_CENTS;
}

/** Stripe Invoicing's per-paid-invoice fee: 0.4%, capped at $2. */
export function stripeInvoicingEstimateCents(totalCents: number): number {
  if (!Number.isFinite(totalCents) || totalCents <= 0) return 0;
  return Math.min(Math.round((totalCents * INVOICING_BPS) / 10_000), INVOICING_CAP_CENTS);
}

export type ProReceivesEstimate = {
  totalCents: number;
  platformFeeCents: number;
  stripeProcessingCents: number;
  stripeInvoicingCents: number;
  /** total - platform fee - Stripe processing - Stripe invoicing, never below 0. */
  receivesCents: number;
};

/**
 * Everything the preview panel prints, for one payment method. The platform
 * fee is passed in (already frozen or about to be), never recomputed here.
 */
export function proReceivesEstimate(
  totalCents: number,
  platformFeeCents: number,
  method: PaymentMethodEstimate
): ProReceivesEstimate {
  const stripeProcessingCents = stripeProcessingEstimateCents(totalCents, method);
  const stripeInvoicingCents = stripeInvoicingEstimateCents(totalCents);
  const receivesCents = Math.max(
    0,
    totalCents - platformFeeCents - stripeProcessingCents - stripeInvoicingCents
  );
  return {
    totalCents,
    platformFeeCents,
    stripeProcessingCents,
    stripeInvoicingCents,
    receivesCents,
  };
}

/** "5%" / "3%", for copy. */
export function feeRateLabel(rateBps: number): string {
  return `${(rateBps / 100).toString().replace(/\.0$/, "")}%`;
}

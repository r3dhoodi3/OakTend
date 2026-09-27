// Whether a pro may send an invoice right now, and what to tell them if not.
//
// Pure on purpose - no auth, no Supabase, no Stripe - so the rule is one
// function the send action and the chat UI both call, and a test can pin it.
// The two facts it needs (is the connected account ready, is the licence
// CSLB-verified) are looked up by the caller.
//
// THE TWO GATES, from the 2026-09-25 payment-flow doc:
//   payouts  - every invoice needs a live Stripe Connect account, whatever the
//              amount. No cash-only lane. canSendInvoices() in
//              src/lib/connectStatus.ts is the readiness rule.
//   licence  - a job at or above $1,000 needs a licence OakTend actually
//              verified with the CSLB (license_verified_status = 'verified',
//              src/lib/cslb.ts). The self-typed insurance date stopped being a
//              gate in 0173; this one stays because it is a real check.
//
// The order matters: a pro with no payouts is told about payouts first, since
// that blocks every invoice, not just big ones.

export const LICENCE_GATE_CENTS = 100_000;

export type InvoiceSendBlock = "payouts" | "licence";

export function invoiceSendBlock(input: {
  connectReady: boolean;
  licenceVerified: boolean;
  totalCents: number;
}): InvoiceSendBlock | null {
  if (!input.connectReady) return "payouts";
  if (input.totalCents >= LICENCE_GATE_CENTS && !input.licenceVerified) return "licence";
  return null;
}

// What the composer says for each block. `href` is where the fix lives.
export const INVOICE_BLOCK_COPY: Record<
  InvoiceSendBlock,
  { title: string; body: string; cta: string; href: string }
> = {
  payouts: {
    title: "Finish setting up where you get paid",
    body: "Invoices are paid through Stripe straight to your bank. Takes about 3 minutes; OakTend never sees your bank details.",
    cta: "Set up payouts",
    href: "/pro/payouts",
  },
  licence: {
    title: "Invoices of $1,000 or more need a verified licence",
    body: "Add your CSLB licence number on your profile and OakTend checks it with the state. Smaller invoices can go out now.",
    cta: "Verify your licence",
    href: "/pro/profile",
  },
};

// What the send action hands back to the composer. `void` on the legacy path
// is still accepted by the caller so an older client keeps working.
export type InvoiceSendOutcome =
  | {
      ok: true;
      // False when the row saved but Stripe could not create the hosted
      // invoice - the pro sees "Retry delivery" on the card.
      delivered: boolean;
    }
  | {
      ok: false;
      reason: InvoiceSendBlock | "preview" | "invalid" | "limit" | "failed";
    };

export const INVOICE_KINDS = ["full", "deposit", "change_order", "balance"] as const;
export type InvoiceKind = (typeof INVOICE_KINDS)[number];

export const INVOICE_KIND_LABEL: Record<InvoiceKind, string> = {
  full: "Full amount",
  deposit: "Deposit",
  change_order: "Change order",
  balance: "Remaining balance",
};

export function isInvoiceKind(value: unknown): value is InvoiceKind {
  return typeof value === "string" && (INVOICE_KINDS as readonly string[]).includes(value);
}

// Due-date choices the composer offers. Stripe reminds 3 days before, on the
// day and 3 days after whichever one is picked.
export const INVOICE_DUE_DAYS = [3, 7, 14, 30] as const;
export const INVOICE_DUE_DAYS_DEFAULT = 7;

export function parseDueDays(value: unknown): number {
  const n = Number(value);
  return (INVOICE_DUE_DAYS as readonly number[]).includes(n) ? n : INVOICE_DUE_DAYS_DEFAULT;
}

export const INVOICE_MEMO_MAX = 500;

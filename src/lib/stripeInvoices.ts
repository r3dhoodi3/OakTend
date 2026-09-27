// Build-time guard: this module drives the Stripe secret key, so importing it
// from a Client Component must fail the build rather than ship the key.
import "server-only";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

// A Stripe Invoice on the PRO's connected account, with OakTend's cut riding
// on it. This is the delivery half of "Send invoice" (payment-flow page,
// step 7); the fee was decided and frozen before this module is called.
//
// WHY STRIPE INVOICING AND NOT OUR OWN PAY SCREEN. Express accounts have no
// invoice editor in their own dashboard, so the only way a pro invoices
// through Stripe is this call - and this call always carries
// application_fee_amount. Stripe emails the invoice in the pro's name with a
// hosted page (card, Apple Pay, Google Pay, and bank debit where the account
// has it), sends the reminders, issues the receipt, and no card number ever
// touches an OakTend page.
//
// EVERY CALL IS MADE AS THE CONNECTED ACCOUNT (the stripeAccount request
// option), never on the platform: the customer, the invoice, the items all
// live on the pro's account, which is what makes the charge a direct charge
// and puts Stripe's processing fee on the pro's side, as the payment-flow doc
// says. The one thing that is the platform's is the application fee, and
// Stripe moves that across on payment.
//
// IDEMPOTENT END TO END. Every request carries a key derived from OUR invoice
// row id, so a retry after a half-finished send (network drop between create
// and finalize, say) reuses the same customer, the same draft and the same
// items rather than making a second invoice the homeowner could pay twice.
// "Retry delivery" on the card is literally this function called again.
//
// NEVER THROWS. Returns { ok: false } with a log line instead, because the
// caller has already saved the invoice row and posted it to the chat: a
// failure here means "the pay link is missing, try again", not "the invoice
// was lost". In preview mode the stripe proxy throws on first touch, and that
// lands here as the same { ok: false }.

export type HostedInvoiceLineItem = { description: string; amount_cents: number };

export type HostedInvoiceInput = {
  stripeAccountId: string;
  customer: {
    /** A customer already created on this connected account for this homeowner. */
    id: string | null;
    email: string | null;
    name: string | null;
  };
  lineItems: HostedInvoiceLineItem[];
  /** Exactly invoices.fee_cents - what Stripe is told to take. */
  feeCents: number;
  daysUntilDue: number;
  memo: string | null;
  metadata: Record<string, string>;
  /** Our invoices.id. Every Stripe request key is derived from it. */
  invoiceRowId: string;
};

export type HostedInvoiceResult =
  | {
      ok: true;
      customerId: string;
      invoiceId: string;
      hostedUrl: string | null;
      livemode: boolean;
      /** False when finalize worked but Stripe's own email could not be sent. */
      emailed: boolean;
    }
  | { ok: false; error: string };

function keyFor(rowId: string, step: string): string {
  return `oaktend-invoice:${rowId}:${step}`;
}

function describe(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

export async function createHostedInvoice(
  input: HostedInvoiceInput
): Promise<HostedInvoiceResult> {
  const account = { stripeAccount: input.stripeAccountId };
  try {
    // 1. The homeowner as a customer on the pro's account. Reused across the
    //    invoices this pro sends this homeowner, so their Stripe view shows
    //    one customer, not one per invoice.
    let customerId = input.customer.id;
    if (!customerId) {
      const customer = await stripe.customers.create(
        {
          email: input.customer.email ?? undefined,
          name: input.customer.name ?? undefined,
          metadata: input.metadata,
        },
        { ...account, idempotencyKey: keyFor(input.invoiceRowId, "customer") }
      );
      customerId = customer.id;
    }

    // 2. The draft, with the fee on it. pending_invoice_items_behavior:
    //    'exclude' so a stray pending item on the customer (there should never
    //    be one, but Stripe's default would sweep it in) cannot change the
    //    total the pro saw.
    const params: Stripe.InvoiceCreateParams = {
      customer: customerId,
      collection_method: "send_invoice",
      days_until_due: input.daysUntilDue,
      application_fee_amount: input.feeCents,
      pending_invoice_items_behavior: "exclude",
      auto_advance: false,
      metadata: input.metadata,
    };
    if (input.memo) params.description = input.memo;
    const draft = await stripe.invoices.create(params, {
      ...account,
      idempotencyKey: keyFor(input.invoiceRowId, "invoice"),
    });

    // 3. The lines, in the order the pro typed them.
    for (let i = 0; i < input.lineItems.length; i++) {
      const li = input.lineItems[i];
      await stripe.invoiceItems.create(
        {
          customer: customerId,
          invoice: draft.id,
          amount: li.amount_cents,
          currency: "usd",
          description: li.description,
        },
        { ...account, idempotencyKey: keyFor(input.invoiceRowId, `item:${i}`) }
      );
    }

    // 4. Finalize: the hosted page and the invoice number exist from here.
    const finalized = await stripe.invoices.finalizeInvoice(
      draft.id,
      { auto_advance: false },
      { ...account, idempotencyKey: keyFor(input.invoiceRowId, "finalize") }
    );

    // 5. Stripe's email, in the pro's name. Best-effort: the hosted page is
    //    already live, and the caller falls back to OakTend's own email with
    //    the link when this fails.
    let emailed = false;
    try {
      await stripe.invoices.sendInvoice(finalized.id, {}, account);
      emailed = true;
    } catch (err) {
      console.error(
        `stripeInvoices: sendInvoice failed for ${finalized.id} on ${input.stripeAccountId}:`,
        describe(err)
      );
    }

    return {
      ok: true,
      customerId,
      invoiceId: finalized.id,
      hostedUrl: finalized.hosted_invoice_url ?? null,
      livemode: finalized.livemode,
      emailed,
    };
  } catch (err) {
    console.error(
      `stripeInvoices: createHostedInvoice failed for row ${input.invoiceRowId} on ${input.stripeAccountId}:`,
      describe(err)
    );
    return { ok: false, error: describe(err) };
  }
}

/** Ask Stripe to email the invoice again. Never throws. */
export async function resendHostedInvoice(
  stripeAccountId: string,
  stripeInvoiceId: string
): Promise<boolean> {
  try {
    await stripe.invoices.sendInvoice(stripeInvoiceId, {}, { stripeAccount: stripeAccountId });
    return true;
  } catch (err) {
    console.error(
      `stripeInvoices: resend failed for ${stripeInvoiceId} on ${stripeAccountId}:`,
      describe(err)
    );
    return false;
  }
}

/**
 * Void the hosted invoice so its pay link stops working. Never throws; a
 * false here means our row is void but Stripe's copy may still be open, which
 * the log line is for. Stripe refuses to void a paid invoice, and so do we
 * (the 0064 policy only lets a 'sent' row move to void).
 */
export async function voidHostedInvoice(
  stripeAccountId: string,
  stripeInvoiceId: string
): Promise<boolean> {
  try {
    await stripe.invoices.voidInvoice(stripeInvoiceId, {}, { stripeAccount: stripeAccountId });
    return true;
  } catch (err) {
    console.error(
      `stripeInvoices: void failed for ${stripeInvoiceId} on ${stripeAccountId}:`,
      describe(err)
    );
    return false;
  }
}

// Build-time guard: this module drives the Stripe secret key and the
// service-role Supabase client, so importing it from a Client Component must
// fail the build rather than ship either one.
import "server-only";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNotification } from "@/lib/notify";
import { requestReviewForWonLead } from "@/lib/reviewRequest";
import { formatUSDCents } from "@/lib/quotes";
import { jobUpdateUrl } from "@/lib/jobUpdates";

// What happens to OUR invoice row when Stripe reports on the hosted invoice
// that was sent on the pro's connected account. Payment-flow page, step 9.
//
// THE ONE RULE: SETTLEMENT IS WEBHOOK-ONLY AND IDEMPOTENT ON OUR ROW. Nothing
// in the app marks an invoice paid because a browser said so; only a Stripe
// event, signed against the Connect secret, reaches this module. And every
// write here is conditioned on the row's CURRENT status, so a redelivered
// event, a retry after a half-finished run, or the same invoice reported twice
// lands exactly once. There is no event-id claim on the paid path on purpose:
// a claim-first pattern would swallow a delivery whose handler then failed,
// and a lost settlement is worse than a repeated no-op.
//
// STRIPE IS THE AUTHORITY ON MONEY; OUR ROW IS THE AUTHORITY FOR THE APP. When
// the two disagree (Stripe says $1,000 was paid, our row says the invoice was
// $900), the webhook wins: the row records what actually cleared and the
// mismatch is logged for the back office. It never refuses a real payment.
//
// NEVER THROWS ON A NOTIFICATION. Money-record writes propagate their error
// so the route answers 500 and Stripe redelivers; everything after the row is
// paid (notifications, closing the job, the review ask) is best-effort.

type SettleResult =
  | { handled: true; duplicate: boolean }
  | { handled: false; reason: "no_row" | "wrong_account" | "no_schema" };

// The slice of Stripe's Invoice this module reads. Typed loosely on purpose:
// the webhook hands over event.data.object, whose shape follows the account's
// API version, and both the current `payments` list and the legacy top-level
// `payment_intent` are understood.
type StripeInvoiceLike = {
  id: string;
  amount_paid?: number | null;
  application_fee_amount?: number | null;
  livemode?: boolean;
  number?: string | null;
  status_transitions?: { paid_at?: number | null; voided_at?: number | null } | null;
  payments?: { data?: Array<{ payment?: { payment_intent?: string | { id: string } | null } }> } | null;
  payment_intent?: string | { id: string } | null;
  metadata?: Record<string, string> | null;
};

type InvoiceRow = {
  id: string;
  lead_id: string;
  contractor_id: string;
  property_id: string;
  total_cents: number;
  fee_cents: number | null;
  kind: string | null;
  status: string;
  number?: string | null;
};

function idOf(v: string | { id: string } | null | undefined): string | null {
  if (!v) return null;
  return typeof v === "string" ? v : v.id ?? null;
}

function describe(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function paymentIntentIdFrom(invoice: StripeInvoiceLike): string | null {
  const fromPayments = invoice.payments?.data?.[0]?.payment?.payment_intent;
  return idOf(fromPayments) ?? idOf(invoice.payment_intent);
}

/**
 * The PaymentIntent and the application fee behind a paid invoice. The event
 * payload usually carries the intent; the fee id lives on the charge, one
 * retrieve away. Both best-effort: settlement records what it can and the
 * back office can reconcile the rest from Stripe.
 */
async function lookupSettlementIds(
  stripeAccountId: string,
  invoice: StripeInvoiceLike
): Promise<{ paymentIntentId: string | null; applicationFeeId: string | null }> {
  let paymentIntentId = paymentIntentIdFrom(invoice);
  try {
    if (!paymentIntentId) {
      const full = (await stripe.invoices.retrieve(
        invoice.id,
        { expand: ["payments"] },
        { stripeAccount: stripeAccountId }
      )) as unknown as StripeInvoiceLike;
      paymentIntentId = paymentIntentIdFrom(full);
    }
    if (!paymentIntentId) return { paymentIntentId: null, applicationFeeId: null };
    const intent = await stripe.paymentIntents.retrieve(
      paymentIntentId,
      { expand: ["latest_charge"] },
      { stripeAccount: stripeAccountId }
    );
    const charge = intent.latest_charge;
    const applicationFeeId =
      charge && typeof charge === "object" ? idOf(charge.application_fee) : null;
    return { paymentIntentId, applicationFeeId };
  } catch (err) {
    console.error(
      `invoiceSettlement: settlement id lookup failed for ${invoice.id} on ${stripeAccountId}:`,
      describe(err)
    );
    return { paymentIntentId, applicationFeeId: null };
  }
}

/** Our row for a Stripe invoice id, checked against the account that sent the event. */
async function rowFor(
  admin: ReturnType<typeof createAdminClient>,
  stripeAccountId: string,
  stripeInvoiceId: string
): Promise<{ row: InvoiceRow | null; reason?: "no_row" | "wrong_account" | "no_schema" }> {
  const { data, error } = await admin
    .from("invoices")
    .select("id, lead_id, contractor_id, property_id, total_cents, fee_cents, kind, status")
    .eq("stripe_invoice_id", stripeInvoiceId)
    .maybeSingle();
  if (error) {
    // 42703: the live database has not run 0174. Nothing to settle against.
    if (error.code === "42703" || error.code === "PGRST204") return { row: null, reason: "no_schema" };
    throw new Error(`invoices read failed: ${error.message}`);
  }
  if (!data) return { row: null, reason: "no_row" };
  const row = data as InvoiceRow;

  // The invoice must belong to the account the event came from. A valid
  // signature already proves the event is Stripe's; this proves it is about
  // the pro whose row it would settle.
  const { data: contractor } = await (admin.from("contractors") as any)
    .select("stripe_account_id")
    .eq("id", row.contractor_id)
    .maybeSingle();
  if (contractor?.stripe_account_id !== stripeAccountId) {
    console.error(
      `invoiceSettlement: ${stripeInvoiceId} belongs to contractor ${row.contractor_id} on ${contractor?.stripe_account_id ?? "(none)"}, but the event came from ${stripeAccountId}. Refused.`
    );
    return { row: null, reason: "wrong_account" };
  }
  return { row };
}

/** The homeowner behind a lead's property, with the contact details a notification needs. */
async function ownerFor(
  admin: ReturnType<typeof createAdminClient>,
  propertyId: string
): Promise<{ id: string; email: string | null; phone: string | null; sms_consent: boolean | null } | null> {
  const { data: property } = await admin
    .from("properties")
    .select("user_id")
    .eq("id", propertyId)
    .maybeSingle();
  if (!property?.user_id) return null;
  const { data: user } = await admin
    .from("users")
    .select("email, phone, sms_consent")
    .eq("id", property.user_id)
    .maybeSingle();
  return {
    id: property.user_id,
    email: user?.email ?? null,
    phone: user?.phone ?? null,
    sms_consent: user?.sms_consent ?? null,
  };
}

async function proFor(
  admin: ReturnType<typeof createAdminClient>,
  contractorId: string
): Promise<{ user_id: string | null; name: string | null; email: string | null; phone: string | null; sms_consent: boolean | null } | null> {
  const { data: contractor } = await (admin.from("contractors") as any)
    .select("user_id, name")
    .eq("id", contractorId)
    .maybeSingle();
  if (!contractor) return null;
  let email: string | null = null;
  let phone: string | null = null;
  let sms_consent: boolean | null = null;
  if (contractor.user_id) {
    const { data: user } = await admin
      .from("users")
      .select("email, phone, sms_consent")
      .eq("id", contractor.user_id)
      .maybeSingle();
    email = user?.email ?? null;
    phone = user?.phone ?? null;
    sms_consent = user?.sms_consent ?? null;
  }
  return { user_id: contractor.user_id ?? null, name: contractor.name ?? null, email, phone, sms_consent };
}

/**
 * invoice.paid on the Connect endpoint. Records the settlement on our row
 * (once), tells both sides, closes the job when the invoice was the full
 * amount or the balance, and asks the homeowner for a review.
 */
export async function settleInvoicePaid(input: {
  stripeAccountId: string;
  invoice: StripeInvoiceLike;
}): Promise<SettleResult> {
  const admin = createAdminClient();
  const { row, reason } = await rowFor(admin, input.stripeAccountId, input.invoice.id);
  if (!row) return { handled: false, reason: reason ?? "no_row" };

  // Already settled: a redelivery, or the same invoice reported through two
  // event types. Nothing to do, and nothing to notify again.
  if (row.status !== "sent" && row.status !== "signed") {
    return { handled: true, duplicate: true };
  }

  const amountPaid = Number(input.invoice.amount_paid ?? 0);
  const paidAtSeconds = input.invoice.status_transitions?.paid_at;
  const paidAt = paidAtSeconds ? new Date(paidAtSeconds * 1000) : new Date();
  const { paymentIntentId, applicationFeeId } = await lookupSettlementIds(
    input.stripeAccountId,
    input.invoice
  );

  // Stripe and our row disagreeing is worth a line in the log, never a
  // refusal: the money already moved, and the row records what cleared.
  if (amountPaid !== row.total_cents) {
    console.error(
      `invoiceSettlement: MISMATCH on ${row.id} (${input.invoice.id}): Stripe amount_paid ${amountPaid}, row total_cents ${row.total_cents}`
    );
  }
  if (
    row.fee_cents != null &&
    input.invoice.application_fee_amount != null &&
    input.invoice.application_fee_amount !== row.fee_cents
  ) {
    console.error(
      `invoiceSettlement: FEE MISMATCH on ${row.id} (${input.invoice.id}): Stripe application_fee_amount ${input.invoice.application_fee_amount}, row fee_cents ${row.fee_cents}`
    );
  }

  // The settlement write. The status filter is the idempotency: two
  // concurrent deliveries both read 'sent' above, only one of them matches
  // here, and the other returns as a duplicate.
  const { data: settled, error } = await admin
    .from("invoices")
    .update({
      status: "paid",
      paid_at: paidAt.toISOString(),
      amount_paid_cents: amountPaid,
      stripe_payment_intent_id: paymentIntentId,
      stripe_application_fee_id: applicationFeeId,
      livemode: input.invoice.livemode ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", row.id)
    .in("status", ["sent", "signed"])
    .select("id")
    .maybeSingle();
  if (error) throw new Error(`invoice settle write failed: ${error.message}`);
  if (!settled) return { handled: true, duplicate: true };

  // ---- everything below is best-effort ------------------------------------
  const amountText = formatUSDCents(amountPaid || row.total_cents);
  const [owner, pro] = await Promise.all([
    ownerFor(admin, row.property_id).catch(() => null),
    proFor(admin, row.contractor_id).catch(() => null),
  ]);
  const proName = pro?.name?.trim() || "your pro";

  // The pro: money is on its way. Email and push; SMS is kept for things that
  // cannot wait, and a payout notice can.
  if (pro?.user_id) {
    try {
      await sendNotification(admin, {
        userId: pro.user_id,
        kind: "invoice_paid",
        title: `Paid: ${amountText}`,
        body: "The homeowner paid your invoice through OakTend. Stripe pays it out to your bank in about two business days.",
        url: `/pro/chats?lead=${row.lead_id}`,
        email: pro.email,
        phone: null,
        smsConsent: false,
      });
    } catch (err) {
      console.error("invoiceSettlement: pro notification:", describe(err));
    }
  }

  // The homeowner: a receipt in the app and by email. Stripe's hosted page
  // has the PDF; this is the line in their own history.
  if (owner) {
    try {
      const when = paidAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      await sendNotification(admin, {
        userId: owner.id,
        kind: "invoice_paid",
        title: `Receipt: ${amountText} paid to ${proName}`,
        body: `Paid ${when} through OakTend${input.invoice.number ? ` · invoice ${input.invoice.number}` : ""}. Your receipt and PDF are on the invoice in the chat.`,
        url: jobUpdateUrl(row.lead_id),
        email: owner.email,
        phone: null,
        smsConsent: false,
      });
    } catch (err) {
      console.error("invoiceSettlement: homeowner receipt:", describe(err));
    }
  }

  // The job. A full or balance payment means the work is paid for: the lead
  // moves to Complete (closed) through the privileged RPC (0175), which
  // re-checks every fact against the row before it writes. A deposit or a
  // change order leaves the job open. Either way, a full or balance payment
  // through OakTend is the moment to ask for the review - whatever the pro's
  // membership says, because "paid through OakTend" is what the review will
  // be marked as.
  const completes = row.kind === "full" || row.kind === "balance";
  if (completes) {
    try {
      const { error: rpcErr } = await admin.rpc("close_lead_on_payment", {
        p_invoice: row.id,
      });
      if (rpcErr) {
        // 42883: 0175 not pasted yet. The invoice is paid either way; the pro
        // can still mark the job Won by hand.
        console.error("invoiceSettlement: close_lead_on_payment:", rpcErr.message);
      }
    } catch (err) {
      console.error("invoiceSettlement: close_lead_on_payment threw:", describe(err));
    }
    await requestReviewForWonLead({
      leadId: row.lead_id,
      contractorUserId: pro?.user_id ?? null,
      businessName: pro?.name ?? null,
    });
  }

  return { handled: true, duplicate: false };
}

/**
 * invoice.payment_failed: the homeowner's payment attempt did not go through.
 * The invoice stays open (Stripe keeps the hosted page live and retries
 * automatic collection where it applies); the pro just needs to know.
 */
export async function noteInvoicePaymentFailed(input: {
  stripeAccountId: string;
  invoice: StripeInvoiceLike;
}): Promise<SettleResult> {
  const admin = createAdminClient();
  const { row, reason } = await rowFor(admin, input.stripeAccountId, input.invoice.id);
  if (!row) return { handled: false, reason: reason ?? "no_row" };
  if (row.status !== "sent" && row.status !== "signed") {
    return { handled: true, duplicate: true };
  }
  const pro = await proFor(admin, row.contractor_id).catch(() => null);
  if (pro?.user_id) {
    try {
      await sendNotification(admin, {
        userId: pro.user_id,
        kind: "invoice_payment_failed",
        title: `Payment didn't go through: ${formatUSDCents(row.total_cents)}`,
        body: "The homeowner's payment on your invoice was declined. The pay link still works - they can try another card or pay by bank.",
        url: `/pro/chats?lead=${row.lead_id}`,
        email: pro.email,
        phone: null,
        smsConsent: false,
      });
    } catch (err) {
      console.error("invoiceSettlement: payment-failed notification:", describe(err));
    }
  }
  return { handled: true, duplicate: false };
}

/**
 * invoice.voided from Stripe's side. Our own Void button already voids the
 * row before it voids the hosted invoice, so this is the other direction:
 * keep the row honest when the pro (or Stripe) voided it elsewhere.
 */
export async function noteInvoiceVoided(input: {
  stripeAccountId: string;
  invoice: StripeInvoiceLike;
}): Promise<SettleResult> {
  const admin = createAdminClient();
  const { row, reason } = await rowFor(admin, input.stripeAccountId, input.invoice.id);
  if (!row) return { handled: false, reason: reason ?? "no_row" };
  if (row.status !== "sent" && row.status !== "signed") {
    return { handled: true, duplicate: true };
  }
  const { error } = await admin
    .from("invoices")
    .update({ status: "void", updated_at: new Date().toISOString() })
    .eq("id", row.id)
    .in("status", ["sent", "signed"]);
  if (error) throw new Error(`invoice void write failed: ${error.message}`);
  return { handled: true, duplicate: false };
}

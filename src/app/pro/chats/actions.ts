"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNotification } from "@/lib/notify";
import { getCurrentContractor } from "@/lib/contractor";
import { dollarsToCents, formatUSDCents } from "@/lib/quotes";
import { assertProSideOpen } from "@/lib/previewModeServer";
import type { QuoteLineItem, InvoiceLineItem } from "@/lib/database.types";
import { hasActivePaidProPlan } from "@/lib/subscription";
import { readConnectRow } from "@/lib/stripeConnect";
import { canSendInvoices } from "@/lib/connectStatus";
import { platformFeeFor } from "@/lib/platformFee";
import {
  invoiceSendBlock,
  isInvoiceKind,
  parseDueDays,
  INVOICE_DUE_DAYS_DEFAULT,
  INVOICE_MEMO_MAX,
  type InvoiceSendOutcome,
} from "@/lib/invoiceGate";
import {
  createHostedInvoice,
  resendHostedInvoice,
  voidHostedInvoice,
} from "@/lib/stripeInvoices";
import { isMissingSchemaError } from "@/lib/dbErrors";
import { isHomeownerPreview } from "@/lib/previewMode";

const MAX_LINE_ITEMS = 20;
const MAX_LABEL = 80;
const MAX_NOTE = 1000;

// Quotes and invoices both notify the homeowner (email and SMS included), so
// an unthrottled loop is a way to use OakTend to spam someone who once posted a
// job. One shared budget across both, keyed on the contractor rather than the
// user, so a pro can't split the same burst between the two composers. Same
// fixed-window limiter (migration 0068) and same fail-open posture as the rest
// of the app: only an explicit `allowed === false` blocks, so a limiter outage
// never stops a pro quoting real work.
// The homeowner as the invoice actions read them off users: what Stripe
// needs for the customer, what the notification needs for its channels.
type OwnerRow = {
  email: string | null;
  phone: string | null;
  full_name: string | null;
  sms_consent: boolean | null;
  notification_prefs: { pro_messages?: boolean } | null;
};

const SEND_LIMIT = 20;
const SEND_WINDOW_SECONDS = 3600;

async function sendBudgetExhausted(contractorId: string): Promise<boolean> {
  const admin = createAdminClient();
  const { data: allowed } = await admin.rpc("rate_limit_hit", {
    p_bucket: `quote:${contractorId}`,
    p_limit: SEND_LIMIT,
    p_window_seconds: SEND_WINDOW_SECONDS,
  });
  return allowed === false;
}

// A pro composes and sends a structured quote inside a lead's chat thread.
// Inserts the lead_quotes row plus a plain companion message ("Sent a quote:
// $X total") in the same messages table everything else already reads, so
// unread badges, notifiers, and the applicant-nudge cron need no changes.
export async function sendQuoteAction(formData: FormData) {
  // PREVIEW MODE (guardrail A2): the contractor side is closed, and a "use
  // server" action is a public POST endpoint that the closed shell does not
  // cover. Internal accounts pass. Constant `true` outside preview. See
  // src/lib/previewModeServer.ts.
  await assertProSideOpen();

  const contractor = await getCurrentContractor();
  if (!contractor) return;

  const leadId = String(formData.get("lead_id") || "");
  if (!leadId) return;

  const supabase = await createClient();

  // The lead must really be one of this contractor's own jobs. The id
  // arrives as client input, so re check here rather than trust it, same
  // pattern as trackLeadAction in pro/crm/actions.ts. RLS backs this too.
  const { data: ownLead } = await supabase
    .from("contractor_leads")
    .select("id")
    .eq("id", leadId)
    .eq("contractor_id", contractor.id)
    .maybeSingle();
  if (!ownLead) return;

  const labels = formData.getAll("label").map((v) => String(v).trim());
  const amounts = formData.getAll("amount").map((v) => String(v));
  const note =
    String(formData.get("note") || "")
      .trim()
      .slice(0, MAX_NOTE) || null;

  // Dollar-to-cents conversion happens exactly once, here, per line item.
  // The total is a sum of those already-converted cents, never a separate
  // re-parse of the typed strings.
  const lineItems: QuoteLineItem[] = [];
  for (let i = 0; i < labels.length && lineItems.length < MAX_LINE_ITEMS; i++) {
    const label = labels[i].slice(0, MAX_LABEL);
    const cents = dollarsToCents(amounts[i] ?? "");
    if (!label || cents === null || cents <= 0) continue;
    lineItems.push({ label, amount_cents: cents });
  }
  if (lineItems.length === 0) return;

  const totalCents = lineItems.reduce((sum, li) => sum + li.amount_cents, 0);
  if (totalCents <= 0) return;

  // Charge the shared send budget only now, immediately before the insert -
  // after the cheap ownership and line-item checks have already passed. Spent
  // any earlier (before parsing), a pro whose form failed validation would
  // burn a slot for a quote that was never going to send. Returning silently
  // is the file's existing failure shape: LeadChat confirms a send by looking
  // for the new row and shows "The quote could not be sent. Please try again."
  // when it doesn't appear, keeping everything the pro typed.
  if (await sendBudgetExhausted(contractor.id)) return;

  const { data: quote, error } = await supabase
    .from("lead_quotes")
    .insert({
      lead_id: leadId,
      contractor_id: contractor.id,
      total_cents: totalCents,
      line_items: lineItems,
      note,
    })
    .select("id")
    .single();
  if (error || !quote) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Companion plain message: this is what every existing unread badge,
  // notifier, and the applicant-nudge cron already read off `messages`.
  await supabase.from("messages").insert({
    lead_id: leadId,
    sender_role: "contractor",
    sender_id: user?.id ?? null,
    body: `Sent a quote: ${formatUSDCents(totalCents)} total`,
  });

  // Tell the homeowner a quote came in. Best-effort: a notification hiccup
  // should never undo a quote that already saved.
  try {
    const { data: lead } = await supabase
      .from("contractor_leads")
      .select("property_id")
      .eq("id", leadId)
      .maybeSingle();
    if (lead?.property_id) {
      const { data: property } = await supabase
        .from("properties")
        .select("user_id")
        .eq("id", lead.property_id)
        .maybeSingle();
      if (property?.user_id) {
        const admin = createAdminClient();
        // "Messages from pros" (pro_messages) gates the email/SMS channels
        // only, never the in-app row: an unset pref reads as enabled, same
        // default as the notification settings form.
        const { data: owner } = await admin
          .from("users")
          .select("email, phone, sms_consent, notification_prefs")
          .eq("id", property.user_id)
          .maybeSingle();
        const wantsProMessages = owner?.notification_prefs?.pro_messages ?? true;
        await sendNotification(admin, {
          userId: property.user_id,
          kind: "quote_sent",
          title: `${contractor.name} sent you a quote`,
          body: `${formatUSDCents(totalCents)} total. Check the chat to see the details.`,
          url: `/chats?lead=${leadId}`,
          email: wantsProMessages ? owner?.email ?? null : null,
          phone: wantsProMessages ? owner?.phone ?? null : null,
          smsConsent: wantsProMessages ? owner?.sms_consent === true : false,
        });
      }
    }
  } catch (err) {
    console.error(
      "quote sent notification:",
      err instanceof Error ? err.message : err
    );
  }

  revalidatePath("/pro/chats");
  revalidatePath("/chats");
}

// A pro withdraws their own quote. RLS also enforces contractor_id ownership
// and the sent -> withdrawn only transition; the .eq() chain here is a
// friendly no-op guard, not the only line of defense.
export async function withdrawQuoteAction(formData: FormData) {
  // PREVIEW MODE (A2). See sendQuoteAction.
  await assertProSideOpen();

  const contractor = await getCurrentContractor();
  if (!contractor) return;

  const quoteId = String(formData.get("quote_id") || "");
  if (!quoteId) return;

  const supabase = await createClient();
  const { data: quote } = await supabase
    .from("lead_quotes")
    .update({ status: "withdrawn", updated_at: new Date().toISOString() })
    .eq("id", quoteId)
    .eq("contractor_id", contractor.id)
    .eq("status", "sent")
    .select("lead_id")
    .maybeSingle();
  if (!quote) return;

  revalidatePath("/pro/chats");
  revalidatePath("/chats");
}

// A pro sends an invoice inside a lead's chat thread once a price is agreed.
// Same shape as sendQuoteAction - the invoices row plus a plain companion
// message - and then what is new since 0174: the fee is decided and FROZEN on
// the row, and a Stripe Invoice is created on the pro's connected account so
// the homeowner can pay it (src/lib/stripeInvoices.ts; payment-flow page,
// steps 6 and 7).
//
// ORDER OF OPERATIONS, and why:
//   1. gates (payouts ready; verified licence at >= $1,000) - before anything
//      saves, so a blocked pro is told why and nothing half-happens
//   2. the fee, once (src/lib/platformFee.ts), from whether the membership
//      is in a PAID period right now
//   3. insert with the ADMIN client - 0174 took the fee columns away from
//      browser sessions on purpose, and the ownership check above is exactly
//      what the RLS insert policy would have done
//   4. Stripe delivery, best-effort - a failure leaves the row without a
//      Stripe id and the pro sees "Retry delivery" on the card
//   5. companion message + homeowner notification, carrying the pay link when
//      there is one
// Returns an outcome the composer reads. The legacy silent `void` is gone.
export async function createInvoiceAction(
  formData: FormData
): Promise<InvoiceSendOutcome> {
  // PREVIEW MODE (A2). See sendQuoteAction.
  await assertProSideOpen();

  const contractor = await getCurrentContractor();
  if (!contractor) return { ok: false, reason: "failed" };

  const leadId = String(formData.get("lead_id") || "");
  if (!leadId) return { ok: false, reason: "invalid" };

  const supabase = await createClient();

  // The lead must really be one of this contractor's own jobs. The id
  // arrives as client input, so re check here rather than trust it, same
  // pattern as sendQuoteAction above. This is the ownership check the admin
  // insert below relies on.
  const { data: ownLead } = await supabase
    .from("contractor_leads")
    .select("id, property_id")
    .eq("id", leadId)
    .eq("contractor_id", contractor.id)
    .maybeSingle();
  if (!ownLead) return { ok: false, reason: "invalid" };

  const descriptions = formData.getAll("description").map((v) => String(v).trim());
  const amounts = formData.getAll("amount").map((v) => String(v));

  // Dollar-to-cents conversion happens exactly once, here, per line item.
  // subtotal/total are a sum of those already-converted cents, never a
  // separate re-parse of the typed strings. subtotal and total are equal
  // today (no discount/tax line yet); the columns are kept separate in the
  // schema for that future without a migration.
  const lineItems: InvoiceLineItem[] = [];
  for (let i = 0; i < descriptions.length && lineItems.length < MAX_LINE_ITEMS; i++) {
    const description = descriptions[i].slice(0, MAX_LABEL);
    const cents = dollarsToCents(amounts[i] ?? "");
    if (!description || cents === null || cents <= 0) continue;
    lineItems.push({ description, amount_cents: cents });
  }
  if (lineItems.length === 0) return { ok: false, reason: "invalid" };

  const totalCents = lineItems.reduce((sum, li) => sum + li.amount_cents, 0);
  if (totalCents <= 0) return { ok: false, reason: "invalid" };

  // The rest of the composer. Every field has a safe default, so an older
  // client that posts only line items still sends a full-amount invoice due
  // in a week.
  const kindRaw = formData.get("kind");
  const kind = isInvoiceKind(kindRaw) ? kindRaw : "full";
  const dueDays = parseDueDays(formData.get("due_days"));
  const memo =
    String(formData.get("memo") || "")
      .trim()
      .slice(0, INVOICE_MEMO_MAX) || null;

  // The accepted quote this invoice was pre-filled from, if the composer
  // said so. Only a quote on THIS lead, by THIS contractor, that the
  // homeowner actually accepted counts; anything else is dropped silently
  // rather than failing the send, because the quote link is a record, not a
  // condition.
  let quoteId: string | null = null;
  const quoteRaw = String(formData.get("quote_id") || "");
  if (quoteRaw) {
    const { data: quote } = await supabase
      .from("lead_quotes")
      .select("id")
      .eq("id", quoteRaw)
      .eq("lead_id", leadId)
      .eq("contractor_id", contractor.id)
      .eq("status", "accepted")
      .maybeSingle();
    if (quote) quoteId = quote.id;
  }

  // ---- 1. gates ------------------------------------------------------------
  const connect = await readConnectRow(contractor.id);
  const block = invoiceSendBlock({
    connectReady: canSendInvoices(connect.row),
    licenceVerified: contractor.license_verified_status === "verified",
    totalCents,
  });
  if (block) return { ok: false, reason: block };
  const stripeAccountId = connect.row?.stripe_account_id ?? null;

  // Charge the shared send budget only now, immediately before the insert -
  // after the cheap ownership, line-item and gate checks. Shares
  // sendQuoteAction's budget.
  if (await sendBudgetExhausted(contractor.id)) return { ok: false, reason: "limit" };

  // ---- 2. the fee, frozen -------------------------------------------------
  // A trial is not a paid period: hasActivePaidProPlan is status = 'active'
  // only, the same rule the lead discount used to follow.
  const paidMember = await hasActivePaidProPlan();
  const fee = platformFeeFor(totalCents, paidMember);
  const dueAt = new Date(Date.now() + dueDays * 86_400_000).toISOString();

  // ---- 3. the row (admin client) ------------------------------------------
  const admin = createAdminClient();
  let invoiceId: string | null = null;
  // True when the live database has not run 0174 yet: the row is saved the
  // 0064 way (no fee, no Stripe) and the invoice is a chat invoice exactly as
  // before. Same posture /pro/payouts takes for 0164.
  let legacyRow = false;
  {
    const { data, error } = await admin
      .from("invoices")
      .insert({
        lead_id: leadId,
        contractor_id: contractor.id,
        property_id: ownLead.property_id,
        line_items: lineItems,
        subtotal_cents: totalCents,
        total_cents: totalCents,
        kind,
        memo,
        due_at: dueAt,
        quote_id: quoteId,
        fee_rate_bps: fee.rateBps,
        fee_cents: fee.feeCents,
      })
      .select("id")
      .single();
    if (error && isMissingSchemaError(error)) {
      legacyRow = true;
      const legacy = await admin
        .from("invoices")
        .insert({
          lead_id: leadId,
          contractor_id: contractor.id,
          property_id: ownLead.property_id,
          line_items: lineItems,
          subtotal_cents: totalCents,
          total_cents: totalCents,
        })
        .select("id")
        .single();
      if (legacy.error || !legacy.data) return { ok: false, reason: "failed" };
      invoiceId = legacy.data.id;
    } else if (error || !data) {
      console.error("createInvoiceAction insert failed:", error?.message ?? error);
      return { ok: false, reason: "failed" };
    } else {
      invoiceId = data.id;
    }
  }

  // The homeowner: needed by Stripe (customer) and by the notification. One
  // read, reused. Best-effort - a missing owner row means no delivery and no
  // notification, never a failed send.
  let ownerUserId: string | null = null;
  let owner: OwnerRow | null = null;
  try {
    const { data: property } = await admin
      .from("properties")
      .select("user_id")
      .eq("id", ownLead.property_id)
      .maybeSingle();
    ownerUserId = property?.user_id ?? null;
    if (ownerUserId) {
      const { data } = await admin
        .from("users")
        .select("email, phone, full_name, sms_consent, notification_prefs")
        .eq("id", ownerUserId)
        .maybeSingle();
      owner = (data as OwnerRow | null) ?? null;
    }
  } catch (err) {
    console.error("createInvoiceAction owner lookup:", err instanceof Error ? err.message : err);
  }

  // ---- 4. Stripe delivery, best-effort ------------------------------------
  // Not in preview mode (guardrail A2/C1: nothing may reach Stripe), not on a
  // legacy row (nowhere to store the ids), and only with a connected account
  // (the payouts gate above guarantees one, but the type does not).
  let delivered = false;
  let hostedUrl: string | null = null;
  let stripeEmailed = false;
  if (!legacyRow && stripeAccountId && !isHomeownerPreview()) {
    // The same homeowner on the same pro's account is one Stripe customer,
    // not one per invoice: reuse the id the last delivered invoice stored.
    let existingCustomerId: string | null = null;
    try {
      const { data: prior } = await admin
        .from("invoices")
        .select("stripe_customer_id")
        .eq("contractor_id", contractor.id)
        .eq("property_id", ownLead.property_id)
        .not("stripe_customer_id", "is", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      existingCustomerId = prior?.stripe_customer_id ?? null;
    } catch {
      // A failed lookup just means a fresh customer. Harmless.
    }

    const result = await createHostedInvoice({
      stripeAccountId,
      customer: {
        id: existingCustomerId,
        email: owner?.email ?? null,
        name: owner?.full_name ?? null,
      },
      lineItems,
      feeCents: fee.feeCents,
      daysUntilDue: dueDays,
      memo,
      metadata: {
        oaktend_invoice_id: invoiceId,
        oaktend_lead_id: leadId,
        oaktend_contractor_id: contractor.id,
        ...(ownerUserId ? { oaktend_homeowner_user_id: ownerUserId } : {}),
      },
      invoiceRowId: invoiceId,
    });
    if (result.ok) {
      const { error: storeErr } = await admin
        .from("invoices")
        .update({
          stripe_customer_id: result.customerId,
          stripe_invoice_id: result.invoiceId,
          hosted_invoice_url: result.hostedUrl,
          livemode: result.livemode,
        })
        .eq("id", invoiceId);
      if (storeErr) {
        // The Stripe invoice exists and the row does not know. The
        // idempotency keys mean "Retry delivery" re-attaches the SAME Stripe
        // invoice rather than making a second one, so this is recoverable.
        console.error(
          `createInvoiceAction: Stripe invoice ${result.invoiceId} created but row ${invoiceId} not updated:`,
          storeErr.message
        );
      } else {
        delivered = true;
        hostedUrl = result.hostedUrl;
        stripeEmailed = result.emailed;
      }
    }
  }

  // ---- 5. the chat and the homeowner --------------------------------------
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Companion plain message: this is what every existing unread badge and
  // notifier already reads off `messages`. LeadChat keys off the "Sent an
  // invoice:" prefix; keep it.
  await supabase.from("messages").insert({
    lead_id: leadId,
    sender_role: "contractor",
    sender_id: user?.id ?? null,
    body: `Sent an invoice: ${formatUSDCents(totalCents)} total`,
  });

  // Tell the homeowner. When Stripe already emailed the invoice (in the pro's
  // name, with the pay button and the PDF) OakTend sends push and in-app
  // only - one invoice email, not two. When it did not, OakTend's email
  // carries the pay link instead. SMS is not used for invoices either way;
  // it is kept for things that cannot wait.
  if (ownerUserId) {
    try {
      // "Messages from pros" (pro_messages) gates the email channel only,
      // never the in-app row: an unset pref reads as enabled.
      const wantsProMessages = owner?.notification_prefs?.pro_messages ?? true;
      await sendNotification(admin, {
        userId: ownerUserId,
        kind: "invoice_sent",
        title: `${contractor.name} sent you an invoice`,
        body: hostedUrl
          ? `${formatUSDCents(totalCents)} total. Pay online: ${hostedUrl}`
          : `${formatUSDCents(totalCents)} total. Check the chat to review.`,
        url: `/chats?lead=${leadId}`,
        email: !stripeEmailed && wantsProMessages ? owner?.email ?? null : null,
        phone: null,
        smsConsent: false,
      });
    } catch (err) {
      console.error(
        "invoice sent notification:",
        err instanceof Error ? err.message : err
      );
    }
  }

  revalidatePath("/pro/chats");
  revalidatePath("/chats");
  return { ok: true, delivered };
}

// "Resend email" on a delivered invoice, and "Retry delivery" on one that
// never reached Stripe. Same idempotency keys as the original send, so a
// retry re-attaches the Stripe invoice a half-finished send already created
// rather than minting a second pay link.
export async function resendInvoiceAction(
  formData: FormData
): Promise<InvoiceSendOutcome> {
  // PREVIEW MODE (A2). See sendQuoteAction.
  await assertProSideOpen();
  if (isHomeownerPreview()) return { ok: false, reason: "preview" };

  const contractor = await getCurrentContractor();
  if (!contractor) return { ok: false, reason: "failed" };

  const invoiceId = String(formData.get("invoice_id") || "");
  if (!invoiceId) return { ok: false, reason: "invalid" };

  const admin = createAdminClient();
  const { data: row, error } = await admin
    .from("invoices")
    .select(
      "id, lead_id, property_id, line_items, total_cents, fee_cents, memo, due_at, status, stripe_invoice_id, stripe_customer_id"
    )
    .eq("id", invoiceId)
    .eq("contractor_id", contractor.id)
    .maybeSingle();
  if (error || !row) return { ok: false, reason: "failed" };
  if (row.status !== "sent" && row.status !== "signed") {
    return { ok: false, reason: "invalid" };
  }

  const connect = await readConnectRow(contractor.id);
  const stripeAccountId = connect.row?.stripe_account_id ?? null;
  if (!stripeAccountId || !canSendInvoices(connect.row)) {
    return { ok: false, reason: "payouts" };
  }

  // Already on Stripe: just ask for the email again.
  if (row.stripe_invoice_id) {
    const sent = await resendHostedInvoice(stripeAccountId, row.stripe_invoice_id);
    return sent ? { ok: true, delivered: true } : { ok: false, reason: "failed" };
  }

  // Never delivered. A row from before 0174 has no frozen fee and is a chat
  // invoice for good; there is nothing honest to attach to it.
  if (row.fee_cents == null) return { ok: false, reason: "invalid" };

  let ownerUserId: string | null = null;
  let owner: { email: string | null; full_name: string | null } | null = null;
  try {
    const { data: property } = await admin
      .from("properties")
      .select("user_id")
      .eq("id", row.property_id)
      .maybeSingle();
    ownerUserId = property?.user_id ?? null;
    if (ownerUserId) {
      const { data } = await admin
        .from("users")
        .select("email, full_name")
        .eq("id", ownerUserId)
        .maybeSingle();
      owner = data ?? null;
    }
  } catch {
    // Delivery still works without a name or email; Stripe just cannot mail
    // it, and the pro has the link to share.
  }

  // Days left until the due date the pro chose, never less than one.
  const daysUntilDue = row.due_at
    ? Math.max(1, Math.ceil((new Date(row.due_at).getTime() - Date.now()) / 86_400_000))
    : INVOICE_DUE_DAYS_DEFAULT;

  const result = await createHostedInvoice({
    stripeAccountId,
    customer: {
      id: row.stripe_customer_id ?? null,
      email: owner?.email ?? null,
      name: owner?.full_name ?? null,
    },
    lineItems: row.line_items as InvoiceLineItem[],
    feeCents: row.fee_cents,
    daysUntilDue,
    memo: row.memo ?? null,
    metadata: {
      oaktend_invoice_id: row.id,
      oaktend_lead_id: row.lead_id,
      oaktend_contractor_id: contractor.id,
      ...(ownerUserId ? { oaktend_homeowner_user_id: ownerUserId } : {}),
    },
    invoiceRowId: row.id,
  });
  if (!result.ok) return { ok: false, reason: "failed" };

  const { error: storeErr } = await admin
    .from("invoices")
    .update({
      stripe_customer_id: result.customerId,
      stripe_invoice_id: result.invoiceId,
      hosted_invoice_url: result.hostedUrl,
      livemode: result.livemode,
    })
    .eq("id", row.id);
  if (storeErr) {
    console.error(
      `resendInvoiceAction: Stripe invoice ${result.invoiceId} created but row ${row.id} not updated:`,
      storeErr.message
    );
    return { ok: false, reason: "failed" };
  }

  revalidatePath("/pro/chats");
  revalidatePath("/chats");
  return { ok: true, delivered: true };
}

// A pro voids their own unsigned invoice. RLS also enforces contractor_id
// ownership and the sent -> void only transition; the .eq() chain here is a
// friendly no-op guard, not the only line of defense.
export async function voidInvoiceAction(formData: FormData) {
  // PREVIEW MODE (A2). See sendQuoteAction.
  await assertProSideOpen();

  const contractor = await getCurrentContractor();
  if (!contractor) return;

  const invoiceId = String(formData.get("invoice_id") || "");
  if (!invoiceId) return;

  const supabase = await createClient();
  const { data: invoice } = await supabase
    .from("invoices")
    .update({ status: "void", updated_at: new Date().toISOString() })
    .eq("id", invoiceId)
    .eq("contractor_id", contractor.id)
    .eq("status", "sent")
    .select("lead_id")
    .maybeSingle();
  if (!invoice) return;

  // Our row is void; now the pay link. Best-effort, and tolerant of a
  // database without 0174 (the select fails, there is nothing to void). A
  // failure here is logged by voidHostedInvoice: the row is void either way,
  // and a homeowner who pays a link we could not close is settled by the
  // webhook like any other payment, then refunded by hand.
  if (!isHomeownerPreview()) {
    try {
      const admin = createAdminClient();
      const { data: row } = await admin
        .from("invoices")
        .select("stripe_invoice_id")
        .eq("id", invoiceId)
        .maybeSingle();
      if (row?.stripe_invoice_id) {
        const connect = await readConnectRow(contractor.id);
        const stripeAccountId = connect.row?.stripe_account_id ?? null;
        if (stripeAccountId) {
          await voidHostedInvoice(stripeAccountId, row.stripe_invoice_id);
        }
      }
    } catch (err) {
      console.error("voidInvoiceAction: Stripe void skipped:", err instanceof Error ? err.message : err);
    }
  }

  revalidatePath("/pro/chats");
  revalidatePath("/chats");
}

import { beforeEach, describe, expect, it, vi } from "vitest";

// Settlement is where a Stripe event becomes "paid" on our row. Pinned here:
// the write is conditioned on the row's status (so a redelivery is a no-op),
// the row must belong to the account the event came from, both sides are told
// exactly once, the job closes only for a full/balance invoice, and the review
// ask goes out whatever the pro's membership says.

vi.mock("server-only", () => ({}));

const ROW = {
  id: "inv-row-1",
  lead_id: "lead-1",
  contractor_id: "c-1",
  property_id: "prop-1",
  total_cents: 100_000,
  fee_cents: 5_000,
  kind: "full" as string,
  status: "sent" as string,
};

let row: typeof ROW | null = { ...ROW };
let contractorAccount: string | null = "acct_pro";
let updateMatches = true;

const updates: Array<{ table: string; payload: Record<string, unknown>; filters: unknown[] }> = [];
const rpc = vi.fn(
  async (..._a: unknown[]): Promise<{ data: unknown; error: { message: string } | null }> => ({
    data: true,
    error: null,
  })
);
const sendNotification = vi.fn(async (..._a: unknown[]) => true);
const requestReviewForWonLead = vi.fn(async (..._a: unknown[]) => {});
const invoicesRetrieve = vi.fn();
const paymentIntentsRetrieve = vi.fn();

vi.mock("@/lib/notify", () => ({
  sendNotification: (...a: unknown[]) => sendNotification(...a),
}));
vi.mock("@/lib/reviewRequest", () => ({
  requestReviewForWonLead: (...a: unknown[]) => requestReviewForWonLead(...a),
}));
vi.mock("@/lib/stripe", () => ({
  stripe: {
    invoices: { retrieve: (...a: unknown[]) => invoicesRetrieve(...a) },
    paymentIntents: { retrieve: (...a: unknown[]) => paymentIntentsRetrieve(...a) },
  },
}));

function chain(table: string) {
  const filters: unknown[] = [];
  let op = "select";
  let payload: Record<string, unknown> | null = null;
  const c: Record<string, unknown> = {};
  for (const m of ["select", "eq", "in", "maybeSingle", "update", "limit"]) {
    c[m] = (...args: unknown[]) => {
      if (m === "update") {
        op = "update";
        payload = args[0] as Record<string, unknown>;
      } else if (m === "eq" || m === "in") {
        filters.push({ [m]: args });
      }
      return c;
    };
  }
  c.then = (res: (v: unknown) => unknown, rej?: (e: unknown) => unknown) => {
    let out: unknown;
    if (table === "invoices" && op === "update") {
      updates.push({ table, payload: payload!, filters });
      out = { data: updateMatches ? { id: ROW.id } : null, error: null };
    } else if (table === "invoices") {
      out = { data: row, error: null };
    } else if (table === "contractors") {
      out = { data: { stripe_account_id: contractorAccount, user_id: "u-pro", name: "Oak & Sons" }, error: null };
    } else if (table === "properties") {
      out = { data: { user_id: "u-owner" }, error: null };
    } else if (table === "users") {
      out = { data: { email: "x@y.z", phone: "+15555550100", sms_consent: true }, error: null };
    } else {
      out = { data: null, error: { message: `unexpected table ${table}` } };
    }
    return Promise.resolve(out).then(res, rej);
  };
  return c;
}

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    from: (table: string) => chain(table),
    rpc: (...a: unknown[]) => rpc(...(a as [])),
  }),
}));

import { noteInvoicePaymentFailed, noteInvoiceVoided, settleInvoicePaid } from "./invoiceSettlement";

const PAID_EVENT_INVOICE = {
  id: "in_1",
  amount_paid: 100_000,
  application_fee_amount: 5_000,
  livemode: false,
  number: "OAK-0001",
  status_transitions: { paid_at: 1_790_000_000, voided_at: null },
  payments: { data: [{ payment: { payment_intent: "pi_1" } }] },
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  row = { ...ROW };
  contractorAccount = "acct_pro";
  updateMatches = true;
  updates.length = 0;
  paymentIntentsRetrieve.mockResolvedValue({
    id: "pi_1",
    latest_charge: { id: "ch_1", application_fee: "fee_1" },
  });
});

describe("settleInvoicePaid", () => {
  it("records what Stripe cleared, conditioned on the row still being open", async () => {
    const r = await settleInvoicePaid({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(r).toEqual({ handled: true, duplicate: false });
    expect(updates).toHaveLength(1);
    expect(updates[0].payload).toMatchObject({
      status: "paid",
      amount_paid_cents: 100_000,
      stripe_payment_intent_id: "pi_1",
      stripe_application_fee_id: "fee_1",
      livemode: false,
      paid_at: new Date(1_790_000_000 * 1000).toISOString(),
    });
    // the idempotency: only a sent/signed row can become paid
    expect(updates[0].filters).toContainEqual({ in: ["status", ["sent", "signed"]] });
    // every Stripe read was made AS the connected account
    expect(paymentIntentsRetrieve.mock.calls[0][2]).toEqual({ stripeAccount: "acct_pro" });
  });

  it("tells both sides once - the pro's payout notice and the homeowner's receipt - never by SMS", async () => {
    await settleInvoicePaid({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(sendNotification).toHaveBeenCalledTimes(2);
    const kinds = sendNotification.mock.calls.map((c) => (c[1] as { kind: string; userId: string; phone: unknown }));
    expect(kinds.map((k) => k.kind)).toEqual(["invoice_paid", "invoice_paid"]);
    expect(kinds.map((k) => k.userId)).toEqual(["u-pro", "u-owner"]);
    expect(kinds.every((k) => k.phone === null)).toBe(true);
    const receipt = sendNotification.mock.calls[1][1] as { title: string; body: string; url: string };
    expect(receipt.title).toBe("Receipt: $1,000 paid to Oak & Sons");
    expect(receipt.body).toContain("OAK-0001");
    expect(receipt.url).toBe("/contractors/jobs?job=lead-1");
  });

  it("a full invoice closes the job through the RPC and asks for the review", async () => {
    await settleInvoicePaid({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(rpc).toHaveBeenCalledWith("close_lead_on_payment", { p_invoice: ROW.id });
    expect(requestReviewForWonLead).toHaveBeenCalledWith({
      leadId: "lead-1",
      contractorUserId: "u-pro",
      businessName: "Oak & Sons",
    });
  });

  it("a paid deposit or change order records the money but leaves the job open", async () => {
    for (const kind of ["deposit", "change_order"]) {
      vi.clearAllMocks();
      updates.length = 0;
      row = { ...ROW, kind };
      const r = await settleInvoicePaid({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
      expect(r).toEqual({ handled: true, duplicate: false });
      expect(updates[0].payload.status).toBe("paid");
      expect(rpc).not.toHaveBeenCalled();
      expect(requestReviewForWonLead).not.toHaveBeenCalled();
    }
  });

  it("a redelivery of a settled invoice is a no-op: no write, no second notification", async () => {
    row = { ...ROW, status: "paid" };
    const r = await settleInvoicePaid({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(r).toEqual({ handled: true, duplicate: true });
    expect(updates).toEqual([]);
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("two concurrent deliveries: the one whose write matched no row is the duplicate", async () => {
    updateMatches = false;
    const r = await settleInvoicePaid({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(r).toEqual({ handled: true, duplicate: true });
    expect(sendNotification).not.toHaveBeenCalled();
    expect(rpc).not.toHaveBeenCalled();
  });

  it("refuses an invoice whose row belongs to a different connected account", async () => {
    contractorAccount = "acct_other";
    const r = await settleInvoicePaid({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(r).toEqual({ handled: false, reason: "wrong_account" });
    expect(updates).toEqual([]);
  });

  it("an invoice we never sent is not ours", async () => {
    row = null;
    const r = await settleInvoicePaid({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(r).toEqual({ handled: false, reason: "no_row" });
  });

  it("a mismatch with Stripe is logged, and the row records what actually cleared", async () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => {});
    await settleInvoicePaid({
      stripeAccountId: "acct_pro",
      invoice: { ...PAID_EVENT_INVOICE, amount_paid: 90_000, application_fee_amount: 4_500 },
    });
    expect(updates[0].payload.amount_paid_cents).toBe(90_000);
    const lines = logged.mock.calls.map((c) => String(c[0]));
    expect(lines.some((l) => l.includes("MISMATCH") && l.includes("90000"))).toBe(true);
    expect(lines.some((l) => l.includes("FEE MISMATCH"))).toBe(true);
  });

  it("falls back to retrieving the invoice when the event carries no payment", async () => {
    invoicesRetrieve.mockResolvedValueOnce({
      id: "in_1",
      payments: { data: [{ payment: { payment_intent: { id: "pi_expanded" } } }] },
    });
    await settleInvoicePaid({
      stripeAccountId: "acct_pro",
      invoice: { ...PAID_EVENT_INVOICE, payments: null },
    });
    expect(invoicesRetrieve).toHaveBeenCalledWith(
      "in_1",
      { expand: ["payments"] },
      { stripeAccount: "acct_pro" }
    );
    expect(updates[0].payload.stripe_payment_intent_id).toBe("pi_expanded");
  });

  it("a failed id lookup still settles - the ids are best-effort, the money is not", async () => {
    paymentIntentsRetrieve.mockRejectedValueOnce(new Error("stripe down"));
    const r = await settleInvoicePaid({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(r).toEqual({ handled: true, duplicate: false });
    expect(updates[0].payload).toMatchObject({
      status: "paid",
      stripe_payment_intent_id: "pi_1",
      stripe_application_fee_id: null,
    });
  });

  it("a missing RPC (0175 not pasted) is logged, the payment and the review ask still stand", async () => {
    rpc.mockResolvedValueOnce({ data: null, error: { message: "function close_lead_on_payment(uuid) does not exist" } });
    const r = await settleInvoicePaid({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(r).toEqual({ handled: true, duplicate: false });
    expect(requestReviewForWonLead).toHaveBeenCalledTimes(1);
  });
});

describe("payment failed and voided", () => {
  it("payment_failed tells the pro and changes nothing on the row", async () => {
    const r = await noteInvoicePaymentFailed({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(r).toEqual({ handled: true, duplicate: false });
    expect(updates).toEqual([]);
    expect(sendNotification).toHaveBeenCalledTimes(1);
    const n = sendNotification.mock.calls[0][1] as { kind: string; userId: string };
    expect(n.kind).toBe("invoice_payment_failed");
    expect(n.userId).toBe("u-pro");
  });

  it("payment_failed on an already-paid row is ignored", async () => {
    row = { ...ROW, status: "paid" };
    const r = await noteInvoicePaymentFailed({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(r).toEqual({ handled: true, duplicate: true });
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("voided from Stripe's side voids an open row, never a paid one", async () => {
    let r = await noteInvoiceVoided({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(r).toEqual({ handled: true, duplicate: false });
    expect(updates[0].payload.status).toBe("void");
    expect(updates[0].filters).toContainEqual({ in: ["status", ["sent", "signed"]] });
    updates.length = 0;
    row = { ...ROW, status: "paid" };
    r = await noteInvoiceVoided({ stripeAccountId: "acct_pro", invoice: PAID_EVENT_INVOICE });
    expect(r).toEqual({ handled: true, duplicate: true });
    expect(updates).toEqual([]);
  });
});

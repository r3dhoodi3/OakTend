import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("server-only", () => ({}));

const customersCreate = vi.fn();
const invoicesCreate = vi.fn();
const invoiceItemsCreate = vi.fn();
const finalizeInvoice = vi.fn();
const sendInvoice = vi.fn();
const voidInvoice = vi.fn();

vi.mock("@/lib/stripe", () => ({
  stripe: {
    customers: { create: (...a: unknown[]) => customersCreate(...a) },
    invoices: {
      create: (...a: unknown[]) => invoicesCreate(...a),
      finalizeInvoice: (...a: unknown[]) => finalizeInvoice(...a),
      sendInvoice: (...a: unknown[]) => sendInvoice(...a),
      voidInvoice: (...a: unknown[]) => voidInvoice(...a),
    },
    invoiceItems: { create: (...a: unknown[]) => invoiceItemsCreate(...a) },
  },
}));

import { createHostedInvoice, resendHostedInvoice, voidHostedInvoice } from "./stripeInvoices";

const ACCT = "acct_pro123";
const ROW = "11111111-2222-3333-4444-555555555555";

function baseInput(overrides: Partial<Parameters<typeof createHostedInvoice>[0]> = {}) {
  return {
    stripeAccountId: ACCT,
    customer: { id: null, email: "owner@example.com", name: "Pat Owner" },
    lineItems: [
      { description: "Labor", amount_cents: 80_000 },
      { description: "Materials", amount_cents: 20_000 },
    ],
    feeCents: 5_000,
    daysUntilDue: 7,
    memo: "Thanks for having us out",
    metadata: { oaktend_invoice_id: ROW, oaktend_lead_id: "lead1", oaktend_contractor_id: "c1" },
    invoiceRowId: ROW,
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  customersCreate.mockResolvedValue({ id: "cus_new" });
  invoicesCreate.mockResolvedValue({ id: "in_draft" });
  invoiceItemsCreate.mockResolvedValue({ id: "ii_x" });
  finalizeInvoice.mockResolvedValue({
    id: "in_draft",
    hosted_invoice_url: "https://invoice.stripe.com/i/acct_pro123/test_abc",
    livemode: false,
  });
  sendInvoice.mockResolvedValue({ id: "in_draft" });
  voidInvoice.mockResolvedValue({ id: "in_draft", status: "void" });
});

describe("createHostedInvoice", () => {
  it("makes every call AS the connected account, with the fee on the invoice", async () => {
    const r = await createHostedInvoice(baseInput());
    expect(r).toEqual({
      ok: true,
      customerId: "cus_new",
      invoiceId: "in_draft",
      hostedUrl: "https://invoice.stripe.com/i/acct_pro123/test_abc",
      livemode: false,
      emailed: true,
    });

    // Direct charge: everything lives on the pro's account.
    for (const call of [
      ...customersCreate.mock.calls,
      ...invoicesCreate.mock.calls,
      ...invoiceItemsCreate.mock.calls,
      ...finalizeInvoice.mock.calls,
      ...sendInvoice.mock.calls,
    ]) {
      const opts = call[call.length - 1] as { stripeAccount?: string };
      expect(opts.stripeAccount).toBe(ACCT);
    }

    const [params] = invoicesCreate.mock.calls[0] as [Record<string, unknown>];
    expect(params.application_fee_amount).toBe(5_000);
    expect(params.collection_method).toBe("send_invoice");
    expect(params.days_until_due).toBe(7);
    expect(params.pending_invoice_items_behavior).toBe("exclude");
    expect(params.auto_advance).toBe(false);
    expect(params.description).toBe("Thanks for having us out");
    expect(params.customer).toBe("cus_new");
  });

  it("puts every line on the draft, in order, in cents", () => {
    return createHostedInvoice(baseInput()).then(() => {
      expect(invoiceItemsCreate).toHaveBeenCalledTimes(2);
      const [first] = invoiceItemsCreate.mock.calls[0] as [Record<string, unknown>];
      const [second] = invoiceItemsCreate.mock.calls[1] as [Record<string, unknown>];
      expect(first).toMatchObject({
        customer: "cus_new",
        invoice: "in_draft",
        amount: 80_000,
        currency: "usd",
        description: "Labor",
      });
      expect(second).toMatchObject({ amount: 20_000, description: "Materials" });
    });
  });

  it("derives every idempotency key from OUR row id, so a retry reuses the same objects", async () => {
    await createHostedInvoice(baseInput());
    const keys = [
      customersCreate.mock.calls[0][1],
      invoicesCreate.mock.calls[0][1],
      invoiceItemsCreate.mock.calls[0][1],
      invoiceItemsCreate.mock.calls[1][1],
      finalizeInvoice.mock.calls[0][2],
    ].map((o) => (o as { idempotencyKey: string }).idempotencyKey);
    expect(keys).toEqual([
      `oaktend-invoice:${ROW}:customer`,
      `oaktend-invoice:${ROW}:invoice`,
      `oaktend-invoice:${ROW}:item:0`,
      `oaktend-invoice:${ROW}:item:1`,
      `oaktend-invoice:${ROW}:finalize`,
    ]);
  });

  it("reuses a customer the pro already has for this homeowner", async () => {
    const r = await createHostedInvoice(
      baseInput({ customer: { id: "cus_existing", email: "x@y.z", name: null } })
    );
    expect(customersCreate).not.toHaveBeenCalled();
    expect(r.ok && r.customerId).toBe("cus_existing");
    const [params] = invoicesCreate.mock.calls[0] as [Record<string, unknown>];
    expect(params.customer).toBe("cus_existing");
  });

  it("omits the memo when there is none", async () => {
    await createHostedInvoice(baseInput({ memo: null }));
    const [params] = invoicesCreate.mock.calls[0] as [Record<string, unknown>];
    expect("description" in params).toBe(false);
  });

  it("a failed Stripe email still returns the live hosted page, flagged", async () => {
    sendInvoice.mockRejectedValueOnce(new Error("no email on customer"));
    const r = await createHostedInvoice(baseInput({ customer: { id: null, email: null, name: null } }));
    expect(r.ok).toBe(true);
    expect(r.ok && r.emailed).toBe(false);
    expect(r.ok && r.hostedUrl).toContain("invoice.stripe.com");
  });

  it("never throws: a Stripe failure before finalize is { ok: false }", async () => {
    invoicesCreate.mockRejectedValueOnce(new Error("Stripe is disabled in preview mode"));
    const r = await createHostedInvoice(baseInput());
    expect(r).toEqual({ ok: false, error: "Stripe is disabled in preview mode" });
    expect(finalizeInvoice).not.toHaveBeenCalled();
    expect(sendInvoice).not.toHaveBeenCalled();
  });
});

describe("resend and void", () => {
  it("resend asks Stripe to email again, as the connected account", async () => {
    expect(await resendHostedInvoice(ACCT, "in_1")).toBe(true);
    expect(sendInvoice).toHaveBeenCalledWith("in_1", {}, { stripeAccount: ACCT });
    sendInvoice.mockRejectedValueOnce(new Error("nope"));
    expect(await resendHostedInvoice(ACCT, "in_1")).toBe(false);
  });

  it("void closes the pay link, and reports a refusal instead of throwing", async () => {
    expect(await voidHostedInvoice(ACCT, "in_1")).toBe(true);
    expect(voidInvoice).toHaveBeenCalledWith("in_1", {}, { stripeAccount: ACCT });
    voidInvoice.mockRejectedValueOnce(new Error("already paid"));
    expect(await voidHostedInvoice(ACCT, "in_1")).toBe(false);
  });
});

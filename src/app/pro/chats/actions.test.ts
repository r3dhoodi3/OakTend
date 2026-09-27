import { beforeEach, describe, expect, it, vi } from "vitest";

// createInvoiceAction is where the money model becomes a row: the gates run
// before anything saves, the fee is decided once and frozen, the insert goes
// through the admin client (0174 took the fee columns away from browser
// sessions), and Stripe delivery is best-effort. Each of those is pinned here
// with the collaborators mocked at the module boundary, the same way
// src/app/(app)/contractors/actions.test.ts does for postJobAction.

vi.mock("server-only", () => ({}));

const CONTRACTOR = {
  id: "c-1",
  user_id: "u-pro",
  name: "Oak & Sons Roofing",
  license_verified_status: "verified" as string,
};
const LEAD = { id: "lead-1", property_id: "prop-1" };
const ROW_ID = "inv-row-1";

let contractor: typeof CONTRACTOR | null = CONTRACTOR;
let connectStatus: "ready" | "not_started" = "ready";
let paidMember = false;
let preview = false;
let insertError: { code?: string; message: string } | null = null;

// Everything written through the admin client, in order.
const adminWrites: Array<{ table: string; op: string; payload: unknown }> = [];
const sendNotification = vi.fn(async (..._args: unknown[]) => true);
const createHostedInvoice = vi.fn();
const rateLimitHit = vi.fn(async () => ({ data: true, error: null }));

vi.mock("@/lib/contractor", () => ({
  getCurrentContractor: vi.fn(async () => contractor),
}));
vi.mock("@/lib/previewModeServer", () => ({ assertProSideOpen: vi.fn(async () => {}) }));
vi.mock("@/lib/previewMode", () => ({ isHomeownerPreview: vi.fn(() => preview) }));
vi.mock("@/lib/subscription", () => ({
  hasActivePaidProPlan: vi.fn(async () => paidMember),
}));
vi.mock("@/lib/stripeConnect", () => ({
  readConnectRow: vi.fn(async () => ({
    status: connectStatus,
    row: {
      stripe_account_id: "acct_pro",
      stripe_charges_enabled: connectStatus === "ready",
      stripe_payouts_enabled: connectStatus === "ready",
      stripe_details_submitted: connectStatus === "ready",
      stripe_requirements_currently_due: [],
      stripe_disabled_reason: null,
      stripe_account_synced_at: null,
    },
  })),
}));
vi.mock("@/lib/stripeInvoices", () => ({
  createHostedInvoice: (...a: unknown[]) => createHostedInvoice(...a),
  resendHostedInvoice: vi.fn(async () => true),
  voidHostedInvoice: vi.fn(async () => true),
}));
vi.mock("@/lib/notify", () => ({
  sendNotification: (...a: unknown[]) => sendNotification(...(a as [])),
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

// A supabase query chain: every method returns the chain, awaiting it yields
// the result decided by which operation was called first.
function chain(
  table: string,
  decide: (op: string, payload: unknown) => unknown,
  sink?: typeof adminWrites
) {
  // "insert" or "update" if either was called on this chain, else "select".
  let op = "select";
  let payload: unknown = null;
  const c: Record<string, unknown> = {};
  for (const m of [
    "select", "eq", "not", "order", "limit", "maybeSingle", "single", "insert", "update", "in",
  ]) {
    c[m] = (...args: unknown[]) => {
      if (m === "insert" || m === "update") {
        op = m;
        payload = args[0];
        if (sink) sink.push({ table, op: m, payload: args[0] });
      }
      return c;
    };
  }
  c.then = (res: (v: unknown) => unknown, rej?: (e: unknown) => unknown) =>
    Promise.resolve(decide(op, payload)).then(res, rej);
  return c;
}

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    auth: { getUser: async () => ({ data: { user: { id: "u-pro" } } }) },
    from: (table: string) =>
      chain(table, (op) => {
        if (table === "contractor_leads") return { data: LEAD, error: null };
        if (table === "lead_quotes") return { data: { id: "q-1" }, error: null };
        if (table === "messages" && op === "insert") return { data: null, error: null };
        throw new Error(`user client must not touch "${table}" (${op})`);
      }),
  })),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: vi.fn(() => ({
    rpc: (...a: unknown[]) => rateLimitHit(...(a as [])),
    from: (table: string) =>
      chain(
        table,
        (op) => {
          if (table === "invoices" && op === "insert") {
            // A configured insert error fires once; the legacy retry succeeds.
            if (insertError) {
              const error = insertError;
              insertError = null;
              return { data: null, error };
            }
            return { data: { id: ROW_ID }, error: null };
          }
          if (table === "invoices" && op === "update") return { data: null, error: null };
          if (table === "invoices") return { data: null, error: null }; // prior customer lookup
          if (table === "properties") return { data: { user_id: "u-owner" }, error: null };
          if (table === "users") {
            return {
              data: {
                email: "owner@example.com",
                phone: "+15555550100",
                full_name: "Pat Owner",
                sms_consent: true,
                notification_prefs: null,
              },
              error: null,
            };
          }
          throw new Error(`admin client must not touch "${table}" (${op})`);
        },
        adminWrites
      ),
  })),
}));

import { createInvoiceAction } from "./actions";

function form(lines: Array<[string, string]>, extra: Record<string, string> = {}) {
  const fd = new FormData();
  fd.set("lead_id", LEAD.id);
  for (const [d, a] of lines) {
    fd.append("description", d);
    fd.append("amount", a);
  }
  for (const [k, v] of Object.entries(extra)) fd.set(k, v);
  return fd;
}

function insertPayload() {
  const w = adminWrites.find((x) => x.table === "invoices" && x.op === "insert");
  return w?.payload as Record<string, unknown> | undefined;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  contractor = { ...CONTRACTOR };
  connectStatus = "ready";
  paidMember = false;
  preview = false;
  insertError = null;
  adminWrites.length = 0;
  createHostedInvoice.mockResolvedValue({
    ok: true,
    customerId: "cus_1",
    invoiceId: "in_1",
    hostedUrl: "https://invoice.stripe.com/i/acct_pro/x",
    livemode: false,
    emailed: true,
  });
});

describe("gates run before anything saves", () => {
  it("no connected account: blocked, nothing inserted, Stripe untouched", async () => {
    connectStatus = "not_started";
    const r = await createInvoiceAction(form([["Labor", "500"]]));
    expect(r).toEqual({ ok: false, reason: "payouts" });
    expect(adminWrites).toEqual([]);
    expect(createHostedInvoice).not.toHaveBeenCalled();
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("$1,000 and up needs a CSLB-verified licence; $999.99 does not", async () => {
    contractor = { ...CONTRACTOR, license_verified_status: "pending" };
    expect(await createInvoiceAction(form([["Roof", "1000"]]))).toEqual({
      ok: false,
      reason: "licence",
    });
    expect(adminWrites).toEqual([]);
    const r = await createInvoiceAction(form([["Roof", "999.99"]]));
    expect(r).toEqual({ ok: true, delivered: true });
  });

  it("the shared send budget is charged after the gates, and a no means no", async () => {
    rateLimitHit.mockResolvedValueOnce({ data: false, error: null });
    expect(await createInvoiceAction(form([["Labor", "500"]]))).toEqual({
      ok: false,
      reason: "limit",
    });
    expect(adminWrites).toEqual([]);
  });
});

describe("the fee is frozen on the row, by the admin client", () => {
  it("standard: 500 bps, $50 on $1,000", async () => {
    await createInvoiceAction(form([["Labor", "800"], ["Materials", "200"]]));
    expect(insertPayload()).toMatchObject({
      lead_id: LEAD.id,
      contractor_id: CONTRACTOR.id,
      property_id: LEAD.property_id,
      total_cents: 100_000,
      fee_rate_bps: 500,
      fee_cents: 5_000,
      kind: "full",
      quote_id: null,
    });
  });

  it("paid member: 300 bps, $30 on $1,000, and the minimum still applies", async () => {
    paidMember = true;
    await createInvoiceAction(form([["Labor", "1000"]]));
    expect(insertPayload()).toMatchObject({ fee_rate_bps: 300, fee_cents: 3_000 });
    adminWrites.length = 0;
    await createInvoiceAction(form([["Deposit", "200"]], { kind: "deposit" }));
    expect(insertPayload()).toMatchObject({ fee_rate_bps: 300, fee_cents: 1_500, kind: "deposit" });
  });

  it("composer fields land, and an accepted quote on this lead is linked", async () => {
    await createInvoiceAction(
      form([["Labor", "500"]], {
        kind: "change_order",
        due_days: "14",
        memo: "  Extra flashing around the chimney  ",
        quote_id: "q-1",
      })
    );
    const p = insertPayload()!;
    expect(p.kind).toBe("change_order");
    expect(p.memo).toBe("Extra flashing around the chimney");
    expect(p.quote_id).toBe("q-1");
    const due = new Date(p.due_at as string).getTime() - Date.now();
    expect(due).toBeGreaterThan(13.9 * 86_400_000);
    expect(due).toBeLessThan(14.1 * 86_400_000);
  });

  it("unknown kind and off-list due days fall back rather than fail", async () => {
    const r = await createInvoiceAction(
      form([["Labor", "500"]], { kind: "refund", due_days: "5" })
    );
    expect(r.ok).toBe(true);
    const p = insertPayload()!;
    expect(p.kind).toBe("full");
    const due = new Date(p.due_at as string).getTime() - Date.now();
    expect(due).toBeGreaterThan(6.9 * 86_400_000);
    expect(due).toBeLessThan(7.1 * 86_400_000);
  });
});

describe("Stripe delivery", () => {
  it("hands Stripe exactly the frozen fee, as the connected account, keyed on our row", async () => {
    await createInvoiceAction(form([["Labor", "1000"]]));
    expect(createHostedInvoice).toHaveBeenCalledTimes(1);
    const input = createHostedInvoice.mock.calls[0][0] as Record<string, unknown>;
    expect(input).toMatchObject({
      stripeAccountId: "acct_pro",
      feeCents: 5_000,
      daysUntilDue: 7,
      invoiceRowId: ROW_ID,
      customer: { id: null, email: "owner@example.com", name: "Pat Owner" },
    });
    expect((input.metadata as Record<string, string>).oaktend_invoice_id).toBe(ROW_ID);
    // and the ids are stored on the row
    const upd = adminWrites.find((w) => w.table === "invoices" && w.op === "update");
    expect(upd?.payload).toMatchObject({
      stripe_invoice_id: "in_1",
      hosted_invoice_url: "https://invoice.stripe.com/i/acct_pro/x",
      livemode: false,
    });
  });

  it("when Stripe emailed it, OakTend sends push and in-app only - never a second email, never SMS", async () => {
    await createInvoiceAction(form([["Labor", "1000"]]));
    expect(sendNotification).toHaveBeenCalledTimes(1);
    const input = sendNotification.mock.calls[0][1] as Record<string, unknown>;
    expect(input.userId).toBe("u-owner");
    expect(input.kind).toBe("invoice_sent");
    expect(input.email).toBeNull();
    expect(input.phone).toBeNull();
    expect(String(input.body)).toContain("https://invoice.stripe.com/i/acct_pro/x");
  });

  it("when Stripe could not email, OakTend's email carries the pay link", async () => {
    createHostedInvoice.mockResolvedValueOnce({
      ok: true,
      customerId: "cus_1",
      invoiceId: "in_1",
      hostedUrl: "https://invoice.stripe.com/i/acct_pro/x",
      livemode: false,
      emailed: false,
    });
    await createInvoiceAction(form([["Labor", "1000"]]));
    const input = sendNotification.mock.calls[0][1] as Record<string, unknown>;
    expect(input.email).toBe("owner@example.com");
    expect(String(input.body)).toContain("Pay online:");
  });

  it("a Stripe failure keeps the row, reports delivered: false, and the notice has no link", async () => {
    createHostedInvoice.mockResolvedValueOnce({ ok: false, error: "boom" });
    const r = await createInvoiceAction(form([["Labor", "1000"]]));
    expect(r).toEqual({ ok: true, delivered: false });
    expect(insertPayload()).toBeTruthy();
    expect(adminWrites.some((w) => w.op === "update")).toBe(false);
    const input = sendNotification.mock.calls[0][1] as Record<string, unknown>;
    expect(String(input.body)).not.toContain("http");
    expect(input.email).toBe("owner@example.com");
  });

  it("preview mode saves the chat invoice and never reaches Stripe", async () => {
    preview = true;
    const r = await createInvoiceAction(form([["Labor", "1000"]]));
    expect(r).toEqual({ ok: true, delivered: false });
    expect(createHostedInvoice).not.toHaveBeenCalled();
    expect(insertPayload()).toMatchObject({ fee_cents: 5_000 });
  });

  it("a database without 0174 falls back to the 0064 row and skips Stripe", async () => {
    insertError = { code: "42703", message: 'column "fee_cents" does not exist' };
    let calls = 0;
    // First insert fails with the schema error, the legacy retry succeeds.
    createHostedInvoice.mockImplementation(async () => {
      calls++;
      return { ok: false, error: "should not be called" };
    });
    const r = await createInvoiceAction(form([["Labor", "1000"]]));
    // Both inserts are recorded; the second carries no fee columns.
    const inserts = adminWrites.filter((w) => w.table === "invoices" && w.op === "insert");
    expect(inserts).toHaveLength(2);
    expect(inserts[1].payload).not.toHaveProperty("fee_cents");
    expect(calls).toBe(0);
    expect(r).toEqual({ ok: true, delivered: false });
  });
});

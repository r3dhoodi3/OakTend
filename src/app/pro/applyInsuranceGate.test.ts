import { beforeEach, describe, expect, it, vi } from "vitest";

// The action file now imports src/lib/previewModeServer.ts (the homeowner
// preview's pro-side guard), which carries "server-only" - a package with no
// Node resolution outside the Next build. Stubbed the same way every other
// server-module test in this repo does it.
vi.mock("server-only", () => ({}));

// Big-job insurance gate (migration 0153), action level: applying to (or
// unlocking) a major-tier lead without current insurance on file is refused
// with the specific friendly message BEFORE the charge RPC is ever called,
// and light-tier leads stay ungated. The SQL twin of this gate is pinned in
// src/lib/insuranceGate.test.ts; these tests drive the actions themselves
// with the same module-mock harness src/app/pro/actions.test.ts uses.

class RedirectSignal extends Error {
  constructor(public path: string) {
    super(`REDIRECT:${path}`);
  }
}

const sessionUser = { id: "user-1", email: "pro@example.com", user_metadata: {} };

// The contractor assertContractor() resolves. insurance_expires is what each
// test varies.
let contractor: Record<string, unknown>;
// The contractor_leads row the admin pre-check reads (category decides the
// tier). Null data plus an error simulates a failed pre-read.
let leadRow: Record<string, unknown> | null;
let leadReadError: { code: string; message: string } | null;
// Every rpc() call the actions make, so the tests can assert the charge RPC
// was (or was never) reached.
let rpcCalls: Array<{ name: string; args: unknown }>;
// What rpc() should answer for the charge functions.
let rpcResult: { data: unknown; error: { message: string } | null };

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    auth: { getUser: async () => ({ data: { user: sessionUser } }) },
    rpc: vi.fn(async (name: string, args: unknown) => {
      rpcCalls.push({ name, args });
      // my_applications feeds the stale-price guard; these tests never post
      // fee_cents, so it is not reached, but answer it harmlessly anyway.
      if (name === "my_applications") return { data: [], error: null };
      return rpcResult;
    }),
  })),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: vi.fn(() => ({
    from: (table: string) => ({
      select: () => {
        const chain: any = {
          eq: () => chain,
          maybeSingle: async () => {
            if (table === "contractor_leads") {
              return { data: leadRow, error: leadReadError };
            }
            // lead_applications: the replay guard (no existing application)
            // and the receipt read (no fee row is fine, the receipt omits
            // the amount).
            return { data: null, error: null };
          },
        };
        return chain;
      },
      insert: async () => ({ error: null }),
    }),
  })),
}));

vi.mock("@/lib/contractor", () => ({
  getCurrentContractor: vi.fn(async () => contractor),
  countPaidLeadApplications: vi.fn(),
}));

vi.mock("@/lib/flash", () => ({ setFlash: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/headers", () => ({
  headers: vi.fn(async () => ({ get: () => null })),
}));
vi.mock("next/navigation", () => ({
  redirect: vi.fn((path: string) => {
    throw new RedirectSignal(path);
  }),
}));
vi.mock("@/lib/notify", () => ({ sendNotification: vi.fn() }));
vi.mock("@/lib/leadPricing", () => ({
  bestLeadDiscount: vi.fn(() => ({ fee: 99, off: 0, kind: null })),
}));
vi.mock("@/lib/subscription", () => ({
  hasProPlan: vi.fn(async () => false),
  hasActivePaidProPlan: vi.fn(async () => false),
}));
vi.mock("@/lib/reviewRequest", () => ({ requestReviewForWonLead: vi.fn() }));
vi.mock("@/lib/cslb", () => ({ lookupCslbLicense: vi.fn() }));
vi.mock("@/lib/licenseMatch", () => ({
  licenseDigits: vi.fn(),
  licenseNameMatches: vi.fn(),
}));
vi.mock("@/lib/checkr", () => ({ createCandidateAndInvite: vi.fn() }));
vi.mock("@/lib/activeJobConflicts", () => ({
  findActiveJobConflicts: vi.fn(async () => new Map()),
}));
vi.mock("@/lib/risk/signals", () => ({ recordSignal: vi.fn(async () => {}) }));
vi.mock("@/app/(auth)/recordTermsAcceptance", () => ({
  recordTermsAcceptance: vi.fn(),
}));
vi.mock("@/lib/trackServer", () => ({ trackServerEvent: vi.fn() }));
// Stripe Connect (2026-09-12): actions.ts now reaches the Express-account
// helper, which imports "server-only". Nothing in this file's flows touches
// it; mocked for the same reason every other dependency above is.
vi.mock("@/lib/stripeConnect", () => ({
  ensureConnectAccount: vi.fn(async () => ({ accountId: "acct_test" })),
}));
vi.mock("next/server", () => ({ after: vi.fn() }));

import { applyToJobAction, unlockDirectRequestAction } from "./actions";
import { setFlash } from "@/lib/flash";
import { INSURANCE_REQUIRED_MESSAGE } from "@/lib/insuranceGate";

const FUTURE = "2099-01-01";
const PAST = "2001-01-01";

function applyForm(): FormData {
  const f = new FormData();
  f.set("id", "0b0b0b0b-0b0b-0b0b-0b0b-0b0b0b0b0b0b");
  return f;
}

function chargeRpcCalls(): string[] {
  return rpcCalls
    .map((c) => c.name)
    .filter((n) => n === "apply_to_lead" || n === "unlock_direct_request");
}

beforeEach(() => {
  contractor = {
    id: "contractor-1",
    user_id: "user-1",
    name: "Ivy Roofing",
    serves_orange_county: true,
    insurance_expires: null,
  };
  leadRow = {
    owner_closed_at: null,
    direct_unlocked_at: null,
    payout_amount: 99,
    created_at: new Date().toISOString(),
    category: "roof",
  };
  leadReadError = null;
  rpcCalls = [];
  rpcResult = { data: true, error: null };
  vi.mocked(setFlash).mockClear();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

// This file used to prove the gate REFUSED: major tier with no insurance, or
// an expired date, never reached the RPC. Migration 0173 removed the gate -
// it read a date the contractor typed themselves, so it implied a check
// OakTend never made, and it was stricter than CSLB, which does not require
// the coverage for most licence types. The homeowner is shown what is on file
// on the applicant card instead and decides for themselves.
//
// So the same four cases are pinned inverted: every one of them now reaches
// the RPC. If a gate is ever reintroduced anywhere in this path, these fail.
describe("applyToJobAction: insurance never blocks an apply", () => {
  for (const [label, expires] of [
    ["nothing on file", null],
    ["an expired policy", PAST],
    ["a current policy", FUTURE],
  ] as const) {
    it(`a major-tier job goes through with ${label}`, async () => {
      contractor.insurance_expires = expires;
      await applyToJobAction(applyForm());
      expect(chargeRpcCalls()).toEqual(["apply_to_lead"]);
      expect(setFlash).toHaveBeenCalledWith(
        expect.stringContaining("Applied."),
        "success"
      );
    });
  }

  it("a light-tier job is unaffected, as it always was", async () => {
    contractor.insurance_expires = null;
    leadRow = { ...leadRow, category: "cleaning" };
    await applyToJobAction(applyForm());
    expect(chargeRpcCalls()).toEqual(["apply_to_lead"]);
  });
});

describe("unlockDirectRequestAction: insurance never blocks an unlock", () => {
  for (const [label, expires] of [
    ["nothing on file", null],
    ["a current policy", FUTURE],
  ] as const) {
    it(`a major-tier direct request proceeds with ${label}`, async () => {
      contractor.insurance_expires = expires;
      // A successful unlock ends in a redirect into the new chat, which the
      // next/navigation mock throws - so reaching the throw IS the pass.
      await expect(
        unlockDirectRequestAction(applyForm())
      ).rejects.toThrow(/REDIRECT:/);
      expect(chargeRpcCalls()).toEqual(["unlock_direct_request"]);
    });
  }
});

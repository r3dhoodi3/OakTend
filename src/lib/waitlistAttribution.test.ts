import { describe, it, expect, vi, beforeEach } from "vitest";

// copyWaitlistCampaignCode: the second half of partner attribution for the pro
// side (migrations 0168 + 0171 + 0166). A contractor who followed a partner's
// /go/<code> link while the pro side was closed could not create an account, so
// the code was parked on their pro_waitlist row; this is what moves it onto the
// account when they finally sign up, months after the cookie expired.
//
// TWO PROPERTIES THIS FILE PINS:
//   * FIRST CODE WINS. The UPDATE is filtered on `campaign_code is null`, in
//     the database, not in a read-then-write here - so the assertions look for
//     that filter on the query rather than for a value afterwards.
//   * IT NEVER COSTS A SIGN-UP. A missing column, a missing table, a DB blip:
//     all of them answer null and none of them throws.

vi.mock("server-only", () => ({}));

const USER_ID = "11111111-2222-4333-8444-555555555555";

type UpdateCall = {
  values: Record<string, unknown>;
  eq: Array<[string, unknown]>;
  is: Array<[string, unknown]>;
};

let waitlistRows: Record<string, unknown>[] = [];
let waitlistError: { code?: string; message?: string } | null = null;
let usersUpdateError: { code?: string; message?: string } | null = null;
let usersUpdates: UpdateCall[] = [];
let ilikeCalls: Array<[string, string]> = [];
let notCalls: Array<[string, string, unknown]> = [];

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    from: (table: string) => {
      if (table === "pro_waitlist") {
        const chain: Record<string, unknown> = {
          select: () => chain,
          ilike: (column: string, pattern: string) => {
            ilikeCalls.push([column, pattern]);
            return chain;
          },
          not: (column: string, operator: string, value: unknown) => {
            notCalls.push([column, operator, value]);
            return chain;
          },
          limit: async () => ({ data: waitlistRows, error: waitlistError }),
        };
        return chain;
      }
      if (table === "users") {
        return {
          update: (values: Record<string, unknown>) => {
            const call: UpdateCall = { values, eq: [], is: [] };
            usersUpdates.push(call);
            // .eq() keeps chaining; .is() is the last link in the real call and
            // is what gets awaited, so it resolves.
            const chain = {
              eq: (column: string, value: unknown) => {
                call.eq.push([column, value]);
                return chain;
              },
              is: (column: string, value: unknown) => {
                call.is.push([column, value]);
                return Promise.resolve({ error: usersUpdateError });
              },
            };
            return chain;
          },
        };
      }
      throw new Error(`unexpected table "${table}"`);
    },
  }),
}));

import { copyWaitlistCampaignCode } from "./waitlistAttribution";

beforeEach(() => {
  waitlistRows = [];
  waitlistError = null;
  usersUpdateError = null;
  usersUpdates = [];
  ilikeCalls = [];
  notCalls = [];
});

describe("copyWaitlistCampaignCode", () => {
  it("copies a known code onto the account, filtered on campaign_code is null", async () => {
    waitlistRows = [{ email: "sam@example.com", campaign_code: "curtis-pro" }];

    const copied = await copyWaitlistCampaignCode(USER_ID, "sam@example.com");

    expect(copied).toBe("curtis-pro");
    expect(usersUpdates).toHaveLength(1);
    expect(usersUpdates[0].values.campaign_code).toBe("curtis-pro");
    // Written in the same statement as the code, exactly as the cookie path
    // does it, so the two can never disagree about when attribution happened.
    expect(
      Number.isFinite(
        Date.parse(usersUpdates[0].values.campaign_recorded_at as string)
      )
    ).toBe(true);
    expect(usersUpdates[0].eq).toEqual([["id", USER_ID]]);
    // THE GUARANTEE: first code wins, enforced by the query.
    expect(usersUpdates[0].is).toEqual([["campaign_code", null]]);
    // Only rows that actually carry a code are asked for.
    expect(notCalls).toEqual([["campaign_code", "is", null]]);
  });

  // pro_waitlist stores the address as typed and dedupes on lower(email), so
  // "Sam@Example.com" on the waitlist is the same contractor as the account
  // that signs up as "sam@example.com".
  it("matches the email case-insensitively", async () => {
    waitlistRows = [{ email: "Sam@Example.com", campaign_code: "ethan-pro" }];
    expect(await copyWaitlistCampaignCode(USER_ID, "  sam@example.com  ")).toBe(
      "ethan-pro"
    );
    expect(usersUpdates).toHaveLength(1);
  });

  it("writes nothing when no waitlist row carries a code for this email", async () => {
    waitlistRows = [];
    expect(await copyWaitlistCampaignCode(USER_ID, "sam@example.com")).toBeNull();
    expect(usersUpdates).toHaveLength(0);
  });

  // The pattern is deliberately loose (PostgREST reads "*" as "%"), so the
  // exact comparison is redone in TypeScript. A near-miss must not inherit
  // somebody else's partner.
  it("escapes LIKE metacharacters and still requires an exact match", async () => {
    waitlistRows = [{ email: "samXother@example.com", campaign_code: "curtis" }];

    expect(
      await copyWaitlistCampaignCode(USER_ID, "sam_other@example.com")
    ).toBeNull();
    expect(usersUpdates).toHaveLength(0);
    expect(ilikeCalls[0]).toEqual(["email", "sam\\_other@example.com"]);
  });

  // The CHECK constraint only guarantees the shape of the stored value. This
  // one is about to be grouped by in a partner report, so it is re-checked
  // against the frozen allowlist the same way the sign-up path re-checks the
  // cookie.
  it("refuses a stored code that is not on the allowlist", async () => {
    waitlistRows = [{ email: "sam@example.com", campaign_code: "not-a-real-code" }];
    expect(await copyWaitlistCampaignCode(USER_ID, "sam@example.com")).toBeNull();
    expect(usersUpdates).toHaveLength(0);
  });

  it("does not query at all without an email", async () => {
    expect(await copyWaitlistCampaignCode(USER_ID, null)).toBeNull();
    expect(await copyWaitlistCampaignCode(USER_ID, "   ")).toBeNull();
    expect(ilikeCalls).toHaveLength(0);
    expect(usersUpdates).toHaveLength(0);
  });

  // 0171 is pasted by hand, so the column is missing for a while. That must
  // read as "no attribution", never as a failed sign-up.
  it("survives migration 0171 not being pasted yet", async () => {
    waitlistError = {
      code: "42703",
      message: "column pro_waitlist.campaign_code does not exist",
    };
    await expect(
      copyWaitlistCampaignCode(USER_ID, "sam@example.com")
    ).resolves.toBeNull();
    expect(usersUpdates).toHaveLength(0);
  });

  it("survives migration 0166 not being pasted yet", async () => {
    waitlistRows = [{ email: "sam@example.com", campaign_code: "curtis-pro" }];
    usersUpdateError = {
      code: "PGRST204",
      message: "Could not find the 'campaign_code' column of 'users'",
    };
    await expect(
      copyWaitlistCampaignCode(USER_ID, "sam@example.com")
    ).resolves.toBeNull();
    // The statement was still issued - it is the database that refused it.
    expect(usersUpdates).toHaveLength(1);
  });

  it("never throws on a real database failure", async () => {
    waitlistRows = [{ email: "sam@example.com", campaign_code: "curtis-pro" }];
    usersUpdateError = {
      code: "57014",
      message: "canceling statement due to statement timeout",
    };
    await expect(
      copyWaitlistCampaignCode(USER_ID, "sam@example.com")
    ).resolves.toBeNull();
  });
});

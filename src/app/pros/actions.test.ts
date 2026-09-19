import { describe, it, expect, vi, beforeEach } from "vitest";

// joinProWaitlistAction: the only thing a contractor can do while the pro side
// is closed (guardrail A1). Driven for real against a fake admin client.
//
// THE PROPERTY THIS FILE EXISTS TO PIN: the action must never reveal whether
// an email was already on the list. A "you're already signed up" message turns
// a public, unauthenticated form into an oracle answering "is this contractor
// with OakTend?" for any address somebody cares to type. Every non-validation
// outcome - new row, duplicate, honeypot, even a DB error - returns the same
// { ok: true }.

vi.mock("server-only", () => ({}));

let headerBag = new Map<string, string>();
// The /go/<code> attribution cookie (src/lib/campaigns.ts). Hard-coded by name
// rather than imported, because a vi.mock factory is hoisted above the imports;
// the name is pinned by its own assertion in the attribution block below, so
// the two cannot drift.
let cookieValue: string | null = null;
vi.mock("next/headers", () => ({
  headers: async () => ({ get: (k: string) => headerBag.get(k) ?? null }),
  cookies: async () => ({
    get: (name: string) =>
      name === "oaktend_campaign" && cookieValue !== null
        ? { value: cookieValue }
        : undefined,
  }),
}));

// What the fake database does on the next insert.
let rateLimitAllowed: boolean | null = true;
let insertError: { code?: string; message?: string } | null = null;
// Errors handed back one per insert ATTEMPT, in order, before falling back to
// insertError. Lets a test fail only the first attempt, which is the whole
// point of the missing-column retry below.
let insertErrorQueue: ({ code?: string; message?: string } | null)[] = [];
// Every attempted row, failures included. `inserted` holds only the ones that
// actually landed.
const insertAttempts: Record<string, unknown>[] = [];
const inserted: Record<string, unknown>[] = [];
const rateLimitCalls: { bucket: string; limit: number }[] = [];

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    rpc: async (fn: string, args: Record<string, unknown>) => {
      if (fn === "rate_limit_hit") {
        rateLimitCalls.push({
          bucket: String(args.p_bucket),
          limit: Number(args.p_limit),
        });
        return { data: rateLimitAllowed, error: null };
      }
      return { data: null, error: null };
    },
    from: () => ({
      insert: async (row: Record<string, unknown>) => {
        insertAttempts.push(row);
        const error = insertErrorQueue.length
          ? insertErrorQueue.shift()
          : insertError;
        if (error) return { error };
        inserted.push(row);
        return { error: null };
      },
    }),
  }),
}));

import { CAMPAIGN_COOKIE } from "@/lib/campaigns";
import { joinProWaitlistAction } from "./actions";

function form(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

beforeEach(() => {
  headerBag = new Map([["x-vercel-forwarded-for", "203.0.113.9"]]);
  cookieValue = null;
  rateLimitAllowed = true;
  insertError = null;
  insertErrorQueue = [];
  insertAttempts.length = 0;
  inserted.length = 0;
  rateLimitCalls.length = 0;
});

describe("joinProWaitlistAction: validation", () => {
  it.each(["", "nope", "@example.com", "sam@", "sam @example.com", "sam@example"])(
    "refuses %o without touching the database",
    async (email) => {
      const res = await joinProWaitlistAction(form({ email }));
      expect(res.ok).toBe(false);
      expect(inserted).toHaveLength(0);
    }
  );

  it("accepts a normal address", async () => {
    const res = await joinProWaitlistAction(
      form({ email: "sam@example.com", trade: "roof", city: "Irvine" })
    );
    expect(res.ok).toBe(true);
    expect(inserted[0]).toMatchObject({
      email: "sam@example.com",
      trade: "roof",
      city: "Irvine",
    });
  });

  // The select only offers JOB_CATEGORIES, so anything else is a forged or
  // stale submit - dropped rather than refused, because the email is the part
  // worth keeping.
  it("drops an unrecognised trade but keeps the signup", async () => {
    const res = await joinProWaitlistAction(
      form({ email: "sam@example.com", trade: "smuggling" })
    );
    expect(res.ok).toBe(true);
    expect(inserted[0]).toMatchObject({ email: "sam@example.com", trade: null });
  });

  it("caps the city rather than refusing a long one", async () => {
    await joinProWaitlistAction(
      form({ email: "sam@example.com", city: "x".repeat(500) })
    );
    expect(String(inserted[0].city)).toHaveLength(80);
  });

  it("records which closed door the signup came through", async () => {
    await joinProWaitlistAction(
      form({ email: "sam@example.com", source: "pro-shell" })
    );
    expect(inserted[0]).toMatchObject({ source: "pro-shell" });
  });

  it("refuses a request with no FormData at all", async () => {
    const res = await joinProWaitlistAction(
      undefined as unknown as FormData
    );
    expect(res.ok).toBe(false);
    expect(inserted).toHaveLength(0);
  });
});

describe("joinProWaitlistAction: abuse defenses", () => {
  it("rate-limits per IP, on its own bucket, before writing", async () => {
    rateLimitAllowed = false;
    const res = await joinProWaitlistAction(form({ email: "sam@example.com" }));

    expect(res.ok).toBe(false);
    expect(inserted).toHaveLength(0);
    expect(rateLimitCalls[0].bucket).toBe("pro_waitlist:203.0.113.9");
  });

  // A missing IP must not invent a shared bucket silently; it gets its own
  // named one, exactly as the contact form does.
  it("still keys a bucket when no IP header is present", async () => {
    headerBag = new Map();
    await joinProWaitlistAction(form({ email: "sam@example.com" }));
    expect(rateLimitCalls[0].bucket).toBe("pro_waitlist:unknown");
  });

  // Fails OPEN on an RPC hiccup: an outage must not eat a real signup.
  it("lets the signup through when the limiter itself is unreadable", async () => {
    rateLimitAllowed = null;
    const res = await joinProWaitlistAction(form({ email: "sam@example.com" }));
    expect(res.ok).toBe(true);
    expect(inserted).toHaveLength(1);
  });

  it("pretends the honeypot submit worked and stores nothing", async () => {
    const res = await joinProWaitlistAction(
      form({ email: "bot@example.com", company_website: "http://spam" })
    );
    expect(res.ok).toBe(true);
    expect(inserted).toHaveLength(0);
    // Not even a rate-limit slot is burned on a bot.
    expect(rateLimitCalls).toHaveLength(0);
  });
});

describe("joinProWaitlistAction never reveals a duplicate", () => {
  it("answers a unique-violation exactly like a fresh signup", async () => {
    const fresh = await joinProWaitlistAction(form({ email: "sam@example.com" }));

    insertError = { code: "23505", message: "duplicate key value" };
    const repeat = await joinProWaitlistAction(form({ email: "sam@example.com" }));

    expect(repeat).toEqual(fresh);
    expect(repeat.ok).toBe(true);
  });

  // A genuine DB failure is ours to notice in the logs, not theirs to retry
  // into - and surfacing it would be the same oracle by another route.
  it("answers a real insert failure the same way too", async () => {
    insertError = { code: "08006", message: "connection failure" };
    const res = await joinProWaitlistAction(form({ email: "sam@example.com" }));
    expect(res.ok).toBe(true);
  });
});

// Partner attribution on the waitlist row (migration 0171). A contractor who
// followed a partner's /go/<code> link during preview cannot create an account
// at all, so this row is the only place that referral can be recorded - and by
// the time the pro side opens, the 30-day cookie is long gone.
describe("joinProWaitlistAction: partner attribution", () => {
  it("stores the code from the campaign cookie", async () => {
    // The cookie mock keys off this literal; if the constant ever moves, this
    // assertion fails before the misleading ones below do.
    expect(CAMPAIGN_COOKIE).toBe("oaktend_campaign");

    cookieValue = "curtis-pro";
    await joinProWaitlistAction(form({ email: "sam@example.com" }));
    expect(inserted[0]).toMatchObject({
      email: "sam@example.com",
      campaign_code: "curtis-pro",
    });
  });

  it("stores null when there is no cookie", async () => {
    await joinProWaitlistAction(form({ email: "sam@example.com" }));
    expect(inserted[0]).toMatchObject({ campaign_code: null });
  });

  // Same rule the users.campaign_code path applies: well-formed but not on the
  // frozen allowlist is not a code, and an ill-formed value never was. Neither
  // costs the signup - the email is the part worth keeping.
  it.each(["not-a-real-code", "CURTIS", "curtis!", "c", ""])(
    "stores null for the cookie value %o",
    async (bad) => {
      cookieValue = bad;
      await joinProWaitlistAction(form({ email: "sam@example.com" }));
      expect(inserted[0]).toMatchObject({
        email: "sam@example.com",
        campaign_code: null,
      });
    }
  );

  // DEPLOY-ORDER SAFETY: this code can ship before 0171 is pasted by hand. An
  // attribution field must never be what loses a real contractor's signup.
  it("retries without the column when 0171 has not been pasted yet", async () => {
    insertErrorQueue = [
      {
        code: "PGRST204",
        message:
          "Could not find the 'campaign_code' column of 'pro_waitlist' in the schema cache",
      },
    ];
    cookieValue = "curtis-pro";

    const res = await joinProWaitlistAction(
      form({ email: "sam@example.com", trade: "roof" })
    );

    expect(res.ok).toBe(true);
    expect(insertAttempts).toHaveLength(2);
    expect(insertAttempts[0]).toMatchObject({ campaign_code: "curtis-pro" });
    // The retry drops the column entirely rather than sending it as null,
    // which would fail in exactly the same way.
    expect(inserted).toHaveLength(1);
    expect(inserted[0]).toMatchObject({ email: "sam@example.com", trade: "roof" });
    expect("campaign_code" in inserted[0]).toBe(false);
  });

  // Once, never in a loop: a second failure is a real one, and the visitor
  // still sees the same sentence either way.
  it("retries exactly once", async () => {
    insertError = { code: "PGRST204", message: "schema cache" };
    const res = await joinProWaitlistAction(form({ email: "sam@example.com" }));
    expect(res.ok).toBe(true);
    expect(insertAttempts).toHaveLength(2);
    expect(inserted).toHaveLength(0);
  });

  // A duplicate is NOT a missing column, so it must not trigger the retry -
  // that would insert a second time and defeat the whole dedup story.
  it("does not retry a duplicate", async () => {
    insertError = { code: "23505", message: "duplicate key value" };
    const res = await joinProWaitlistAction(form({ email: "sam@example.com" }));
    expect(res.ok).toBe(true);
    expect(insertAttempts).toHaveLength(1);
  });
});

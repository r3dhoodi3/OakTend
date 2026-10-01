import { beforeEach, describe, expect, it, vi } from "vitest";

// Household invites (owner feedback 2026-09-27, items 22-26).
//
// redeemHouseholdInviteAction is the ONLY path from a QR token to a
// membership. What is pinned down here:
//   - a failed redemption never sets the active home or clears anything, it
//     just goes back to the join page with the reason;
//   - a successful one lands the person in the home the DATABASE named, never
//     a property id from the form;
//   - signed out, nothing is attempted.
// mintHouseholdQrTokenAction's cleanup must only sweep EXPIRED tokens, so a
// second tab can't kill the code still showing in the first (item 23), and
// the code lasts 10 minutes (item 24).

type Row = Record<string, unknown>;

class RedirectSignal extends Error {
  constructor(public url: string) {
    super(`redirect:${url}`);
  }
}

let sessionUser: { id: string; email?: string; user_metadata?: Row } | null = {
  id: "user-joiner",
  email: "joiner@example.com",
};
let rpcResult: { data: unknown; error: unknown } = { data: null, error: null };
let rpcCalls: Array<{ fn: string; args: Row }> = [];
const cookieSets: Array<{ name: string; value: string }> = [];
const cookieDeletes: string[] = [];
const flashes: string[] = [];
let ownerRow: Row | null = { id: "home-1", user_id: "user-owner" };
let deleteFilters: Array<[string, string, unknown]> = [];
let insertedToken: Row | null = null;
let openInvite: { inGrace: boolean } | null = null;
let graceKeyRow: { data: Row | null; error: unknown } = { data: null, error: null };
let graceSelects = 0;

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw new RedirectSignal(url);
  },
}));
vi.mock("next/headers", () => ({
  cookies: async () => ({
    set: (name: string, value: string) => cookieSets.push({ name, value }),
    delete: (name: string) => cookieDeletes.push(name),
    get: () => undefined,
  }),
  headers: async () => new Map([["host", "oaktend.test"]]),
}));
vi.mock("next/server", () => ({ after: (fn: () => unknown) => fn() }));
vi.mock("@/lib/flash", () => ({
  setFlash: async (message: string) => {
    flashes.push(message);
  },
}));
vi.mock("@/lib/notify", () => ({ sendEmailToAddress: vi.fn(async () => true) }));
vi.mock("@/lib/householdInviteOpen", () => ({
  openHouseholdInvite: async () => openInvite,
}));
vi.mock("@/lib/requestOrigin", () => ({
  requestOriginFromHeaders: async () => "https://oaktend.test",
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    auth: { getUser: async () => ({ data: { user: sessionUser } }) },
    rpc: async (fn: string, args: Row) => {
      rpcCalls.push({ fn, args });
      return rpcResult;
    },
    from: (_table: string) => ({
      select: () => ({
        eq: () => ({ maybeSingle: async () => ({ data: ownerRow, error: null }) }),
      }),
    }),
  })),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: vi.fn(() => ({
    rpc: async () => ({ data: true }),
    from: (_table: string) => ({
      delete: () => {
        const chain = {
          eq: (col: string, val: unknown) => {
            deleteFilters.push(["eq", col, val]);
            return chain;
          },
          lte: (col: string, val: unknown) => {
            deleteFilters.push(["lte", col, val]);
            return Promise.resolve({ error: null });
          },
          gt: (col: string, val: unknown) => {
            deleteFilters.push(["gt", col, val]);
            return Promise.resolve({ error: null });
          },
          or: (expr: string) => {
            deleteFilters.push(["or", expr, null]);
            return Promise.resolve({ error: null });
          },
        };
        return chain;
      },
      select: (cols: string) => ({
        eq: () => ({
          maybeSingle: async () => {
            if (cols === "grace_key") graceSelects++;
            return graceKeyRow;
          },
        }),
      }),
      insert: (values: Row) => {
        insertedToken = values;
        return {
          select: () => ({
            single: async () => ({
              data: {
                token: "11111111-1111-4111-8111-111111111111",
                expires_at: values.expires_at,
              },
              error: null,
            }),
          }),
        };
      },
    }),
  })),
}));

const TOKEN = "22222222-2222-4222-8222-222222222222";

function form(values: Row): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(values)) fd.set(k, String(v));
  return fd;
}

async function run(fn: () => Promise<unknown>): Promise<string | null> {
  try {
    await fn();
    return null;
  } catch (e) {
    if (e instanceof RedirectSignal) return e.url;
    throw e;
  }
}

beforeEach(() => {
  sessionUser = { id: "user-joiner", email: "joiner@example.com" };
  rpcResult = { data: null, error: null };
  rpcCalls = [];
  cookieSets.length = 0;
  cookieDeletes.length = 0;
  flashes.length = 0;
  ownerRow = { id: "home-1", user_id: "user-owner" };
  deleteFilters = [];
  insertedToken = null;
  openInvite = null;
  graceKeyRow = { data: null, error: null };
  graceSelects = 0;
});

describe("redeemHouseholdInviteAction", () => {
  it("an expired or invalid code grants nothing and sets no home", async () => {
    const { redeemHouseholdInviteAction } = await import("./actions");
    rpcResult = {
      data: [{ ok: false, property_id: null, reason: "invalid_or_expired" }],
      error: null,
    };
    const url = await run(() =>
      redeemHouseholdInviteAction(form({ token: TOKEN }))
    );
    expect(url).toBe(`/join/household/${TOKEN}?failed=invalid_or_expired`);
    expect(cookieSets).toEqual([]);
    expect(flashes).toEqual([]);
  });

  it("an RPC error is reported as an error, not as success", async () => {
    const { redeemHouseholdInviteAction } = await import("./actions");
    rpcResult = { data: null, error: { message: "boom" } };
    const url = await run(() =>
      redeemHouseholdInviteAction(form({ token: TOKEN }))
    );
    expect(url).toBe(`/join/household/${TOKEN}?failed=error`);
    expect(cookieSets).toEqual([]);
  });

  it("an unknown failure reason is normalised, never echoed", async () => {
    const { redeemHouseholdInviteAction } = await import("./actions");
    rpcResult = {
      data: [{ ok: false, property_id: null, reason: "<script>" }],
      error: null,
    };
    const url = await run(() =>
      redeemHouseholdInviteAction(form({ token: TOKEN }))
    );
    expect(url).toBe(`/join/household/${TOKEN}?failed=invalid_or_expired`);
  });

  it("success lands in the home the database named, ignoring the form", async () => {
    const { redeemHouseholdInviteAction } = await import("./actions");
    rpcResult = {
      data: [{ ok: true, property_id: "home-from-db", reason: "joined" }],
      error: null,
    };
    const url = await run(() =>
      redeemHouseholdInviteAction(
        form({ token: TOKEN, property_id: "home-from-browser" })
      )
    );
    expect(url).toBe("/dashboard");
    expect(rpcCalls).toEqual([
      { fn: "redeem_household_invite_token", args: { p_token: TOKEN } },
    ]);
    expect(cookieSets).toEqual([
      { name: "oaktend_active_home", value: "home-from-db" },
    ]);
    expect(cookieDeletes).toContain("oaktend_pending_join");
  });

  it("inside the 10 minutes: no grace key is read or passed", async () => {
    const { redeemHouseholdInviteAction } = await import("./actions");
    openInvite = { inGrace: false };
    rpcResult = {
      data: [{ ok: true, property_id: "home-from-db", reason: "joined" }],
      error: null,
    };
    await run(() => redeemHouseholdInviteAction(form({ token: TOKEN })));
    expect(graceSelects).toBe(0);
    expect(rpcCalls).toEqual([
      { fn: "redeem_household_invite_token", args: { p_token: TOKEN } },
    ]);
  });

  it("past the 10 minutes without this browser's proof: no grace key, so the database says expired", async () => {
    const { redeemHouseholdInviteAction } = await import("./actions");
    openInvite = null;
    graceKeyRow = { data: { grace_key: "33333333-3333-4333-8333-333333333333" }, error: null };
    rpcResult = {
      data: [{ ok: false, property_id: null, reason: "invalid_or_expired" }],
      error: null,
    };
    const url = await run(() =>
      redeemHouseholdInviteAction(form({ token: TOKEN, p_grace_key: "x" }))
    );
    expect(graceSelects).toBe(0);
    expect(rpcCalls).toEqual([
      { fn: "redeem_household_invite_token", args: { p_token: TOKEN } },
    ]);
    expect(url).toBe(`/join/household/${TOKEN}?failed=invalid_or_expired`);
  });

  it("finish-joining time for the browser that opened it in time: passes the server-held grace key", async () => {
    const { redeemHouseholdInviteAction } = await import("./actions");
    openInvite = { inGrace: true };
    graceKeyRow = { data: { grace_key: "33333333-3333-4333-8333-333333333333" }, error: null };
    rpcResult = {
      data: [{ ok: true, property_id: "home-from-db", reason: "joined" }],
      error: null,
    };
    await run(() => redeemHouseholdInviteAction(form({ token: TOKEN })));
    expect(rpcCalls).toEqual([
      {
        fn: "redeem_household_invite_token",
        args: {
          p_token: TOKEN,
          p_grace_key: "33333333-3333-4333-8333-333333333333",
        },
      },
    ]);
  });

  it("before migration 0176 (grace_key unreadable): falls back to the plain 10 minute call", async () => {
    const { redeemHouseholdInviteAction } = await import("./actions");
    openInvite = { inGrace: true };
    graceKeyRow = { data: null, error: { code: "42703" } };
    rpcResult = {
      data: [{ ok: false, property_id: null, reason: "invalid_or_expired" }],
      error: null,
    };
    await run(() => redeemHouseholdInviteAction(form({ token: TOKEN })));
    expect(rpcCalls).toEqual([
      { fn: "redeem_household_invite_token", args: { p_token: TOKEN } },
    ]);
  });

  it("signed out: sends to sign in and calls nothing", async () => {
    const { redeemHouseholdInviteAction } = await import("./actions");
    sessionUser = null;
    const url = await run(() =>
      redeemHouseholdInviteAction(form({ token: TOKEN }))
    );
    expect(url).toBe(
      `/signin?next=${encodeURIComponent(`/join/household/${TOKEN}`)}`
    );
    expect(rpcCalls).toEqual([]);
  });

  it("a malformed token never reaches the database", async () => {
    const { redeemHouseholdInviteAction } = await import("./actions");
    const url = await run(() =>
      redeemHouseholdInviteAction(form({ token: "not-a-token" }))
    );
    expect(url).toBe("/join/household/invalid");
    expect(rpcCalls).toEqual([]);
  });
});

describe("mintHouseholdQrTokenAction", () => {
  it("lasts 10 minutes and only sweeps codes whose finish-joining time is over", async () => {
    const { mintHouseholdQrTokenAction } = await import("./actions");
    sessionUser = { id: "user-owner" };
    const before = Date.now();
    const result = await mintHouseholdQrTokenAction("home-1");
    expect(result.ok).toBe(true);
    const expires = new Date(String(insertedToken?.expires_at)).getTime();
    expect(expires - before).toBeGreaterThanOrEqual(10 * 60 * 1000 - 1000);
    expect(expires - before).toBeLessThanOrEqual(10 * 60 * 1000 + 1000);
    // Only expired rows: an lte on expires_at, and never the old
    // "scanned_at is null" sweep that deleted live codes.
    const sweep = deleteFilters.find(([op, col]) => op === "lte" && col === "expires_at");
    expect(sweep).toBeTruthy();
    const sweepMs = new Date(String(sweep?.[2])).getTime();
    expect(before - sweepMs).toBeGreaterThanOrEqual(30 * 60 * 1000 - 1000);
    expect(before - sweepMs).toBeLessThanOrEqual(30 * 60 * 1000 + 1000);
    expect(deleteFilters.some(([op]) => op === "or")).toBe(false);
    // The mount mint cancels nothing.
    expect(deleteFilters.some(([, col]) => col === "token")).toBe(false);
  });

  it("New code cancels only the owner's own shown code, and only while it is live", async () => {
    const { mintHouseholdQrTokenAction } = await import("./actions");
    sessionUser = { id: "user-owner" };
    const OLD = "44444444-4444-4444-8444-444444444444";
    const result = await mintHouseholdQrTokenAction("home-1", OLD.toUpperCase());
    expect(result.ok).toBe(true);
    const ops = deleteFilters.map(
      ([op, col, val]) => `${op}:${col}:${op === "gt" ? "now" : String(val)}`
    );
    expect(ops).toContain(`eq:token:${OLD}`);
    expect(ops).toContain("eq:created_by:user-owner");
    expect(ops).toContain("eq:property_id:home-1");
    expect(ops).toContain("gt:expires_at:now");
  });

  it("a junk replaceToken cancels nothing", async () => {
    const { mintHouseholdQrTokenAction } = await import("./actions");
    sessionUser = { id: "user-owner" };
    await mintHouseholdQrTokenAction("home-1", "*,1=1");
    expect(deleteFilters.some(([, col]) => col === "token")).toBe(false);
  });

  it("refuses a home the caller does not own", async () => {
    const { mintHouseholdQrTokenAction } = await import("./actions");
    sessionUser = { id: "user-member" };
    const result = await mintHouseholdQrTokenAction("home-1");
    expect(result.ok).toBe(false);
    expect(insertedToken).toBeNull();
  });
});

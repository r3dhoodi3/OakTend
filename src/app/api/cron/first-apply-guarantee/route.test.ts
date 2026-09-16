import type { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendNotification } from "@/lib/notify";

// The first-application guarantee refunds a retired per-lead apply fee, so
// this cron is paused behind RETIRED_PRO_PROGRAMS_PAUSED
// (src/lib/retiredProPrograms.ts) as of 2026-09-15. The schedule in
// vercel.json is untouched; the handler itself returns early. These tests
// cover both the paused path (today's default) and the unpaused path (the
// pre-existing scan, once the success-fee rebuild ships and the flag flips
// back to false).

let paused = true;

vi.mock("@/lib/retiredProPrograms", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/lib/retiredProPrograms")>();
  return {
    ...actual,
    get RETIRED_PRO_PROGRAMS_PAUSED() {
      return paused;
    },
  };
});

let adminTouched = false;

// A generic "nothing to find" admin client: every query chain resolves to an
// empty result with no error, regardless of which methods are chained or in
// what order, since the thenable is on the chain object itself. Good enough
// to prove the unpaused path falls through into its real (pre-existing, and
// otherwise untested) empty-run branch without throwing.
function emptyFakeAdmin() {
  function chain(): Record<string, unknown> {
    const api: Record<string, unknown> = {};
    const self = () => api;
    Object.assign(api, {
      select: self,
      is: self,
      eq: self,
      neq: self,
      gt: self,
      lte: self,
      gte: self,
      not: self,
      like: self,
      order: self,
      in: self,
      range: self,
      limit: self,
      maybeSingle: () => Promise.resolve({ data: null, error: null }),
      then: (resolve: (v: unknown) => unknown, reject: (e: unknown) => unknown) =>
        Promise.resolve({ data: [], error: null }).then(resolve, reject),
    });
    return api;
  }
  return {
    from: () => {
      adminTouched = true;
      return chain();
    },
    rpc: () => {
      adminTouched = true;
      return Promise.resolve({ data: null, error: null });
    },
  };
}

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => emptyFakeAdmin(),
}));

vi.mock("@/lib/notify", () => ({ sendNotification: vi.fn(async () => true) }));
const notify = vi.mocked(sendNotification);

function req(headers: Record<string, string> = {}) {
  return {
    headers: { get: (key: string) => headers[key.toLowerCase()] ?? null },
  } as unknown as NextRequest;
}
function authed() {
  return req({ authorization: "Bearer cron-secret-value" });
}

const ORIGINAL_SECRET = process.env.CRON_SECRET;

beforeEach(() => {
  paused = true;
  adminTouched = false;
  notify.mockClear();
  process.env.CRON_SECRET = "cron-secret-value";
});

afterEach(() => {
  if (ORIGINAL_SECRET === undefined) delete process.env.CRON_SECRET;
  else process.env.CRON_SECRET = ORIGINAL_SECRET;
  vi.restoreAllMocks();
});

describe("first-apply-guarantee cron while RETIRED_PRO_PROGRAMS_PAUSED is true", () => {
  it("still 401s an unauthenticated caller before the pause check runs", async () => {
    const { GET } = await import("./route");
    const res = await GET(req());
    expect(res.status).toBe(401);
    expect(adminTouched).toBe(false);
  });

  it("skips the scan and returns the paused-skip shape, touching no DB", async () => {
    const { GET } = await import("./route");
    const res = await GET(authed());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({
      ok: true,
      skipped: "retired_program_paused",
      program: "first-apply-guarantee",
    });
    expect(adminTouched).toBe(false);
    expect(notify).not.toHaveBeenCalled();
  });
});

describe("first-apply-guarantee cron once unpaused", () => {
  it("falls through to the real scan instead of the skip shape", async () => {
    paused = false;
    const { GET } = await import("./route");
    const res = await GET(authed());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).not.toHaveProperty("skipped");
    expect(body).toEqual({ checked: 0, granted: 0 });
    expect(adminTouched).toBe(true);
  });
});

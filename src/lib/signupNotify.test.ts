import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("server-only", () => ({}));

const afterMock = vi.fn((fn: () => unknown) => {
  void fn();
});
vi.mock("next/server", () => ({ after: (fn: () => unknown) => afterMock(fn) }));

const deliverMock = vi.fn<(to: string, subject: string, text: string) => Promise<boolean>>();
vi.mock("@/lib/notify", () => ({
  deliverPlainEmail: (to: string, subject: string, text: string) =>
    deliverMock(to, subject, text),
}));

let internal = false;
vi.mock("@/lib/internalAccounts", () => ({
  isInternalUser: async () => internal,
}));

// rate_limit_hit: answers per bucket from this map (default allowed).
let claimAnswers: Record<string, boolean> = {};
let claimCalls: string[] = [];
let rpcError: { message: string } | null = null;
let adminCalls = 0;
vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => {
    adminCalls += 1;
    return {
      rpc: async (_fn: string, args: { p_bucket: string }) => {
        claimCalls.push(args.p_bucket);
        if (rpcError) return { data: null, error: rpcError };
        return { data: claimAnswers[args.p_bucket] ?? true, error: null };
      },
      from: (table: string) => {
        const api: Record<string, unknown> = {};
        const chain = () => api;
        Object.assign(api, {
          select: (_c: string, opts?: { head?: boolean }) => {
            if (table === "users" && opts?.head) {
              return Promise.resolve({ count: 116, error: null });
            }
            return api;
          },
          eq: chain,
          not: chain,
          limit: chain,
          maybeSingle: async () => ({ data: { city: "Fountain Valley" }, error: null }),
        });
        return api;
      },
    };
  },
}));

import {
  buildSignupNotifyMessage,
  firstNameFrom,
  notifyOwnerOfSignup,
  ownerNotifyAddress,
  scheduleOwnerSignupNotify,
  signupMethodLabel,
} from "./signupNotify";

const NOW = Date.parse("2026-09-27T22:42:00Z");

function freshUser(overrides: Record<string, unknown> = {}) {
  return {
    id: "11111111-1111-1111-1111-111111111111",
    created_at: new Date(NOW - 60_000).toISOString(),
    email: "maria.secret@example.com",
    phone: "+17145550123",
    app_metadata: { provider: "google" },
    user_metadata: {
      full_name: "Maria Lopez Garcia",
      email: "maria.secret@example.com",
      address: "123 Main St",
    },
    ...overrides,
  };
}

beforeEach(() => {
  vi.stubEnv("OWNER_NOTIFY_EMAIL", "hello@oaktend.com");
  vi.stubEnv("OUTBOUND_DISABLED", "");
  deliverMock.mockReset();
  deliverMock.mockResolvedValue(true);
  afterMock.mockClear();
  internal = false;
  claimAnswers = {};
  claimCalls = [];
  rpcError = null;
  adminCalls = 0;
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("buildSignupNotifyMessage", () => {
  it("builds the subject and body from the six allowed fields", () => {
    const { subject, text } = buildSignupNotifyMessage({
      accountType: "homeowner",
      firstName: "Maria",
      city: "Fountain Valley",
      method: "Google",
      at: new Date(NOW),
      totalSignups: 116,
    });
    expect(subject).toBe("New OakTend signup: Homeowner in Fountain Valley");
    expect(text).toContain("Account type: Homeowner");
    expect(text).toContain("First name: Maria");
    expect(text).toContain("City: Fountain Valley");
    expect(text).toContain("Signed up with: Google");
    expect(text).toContain("When: Sep 27, 2026, 3:42 PM PDT");
    expect(text).toContain("Total accounts so far: 116");
  });

  it("falls back to placeholders and drops the city from the subject", () => {
    const { subject, text } = buildSignupNotifyMessage({
      accountType: "pro",
      firstName: null,
      city: null,
      method: "Email and password",
      at: new Date(NOW),
      totalSignups: null,
    });
    expect(subject).toBe("New OakTend signup: Pro");
    expect(text).toContain("First name: No name yet");
    expect(text).toContain("City: not set yet");
    expect(text).not.toContain("Total accounts");
  });

  it("strips CR/LF so a city cannot inject a header", () => {
    const { subject } = buildSignupNotifyMessage({
      accountType: "homeowner",
      firstName: "A",
      city: "Irvine\r\nBcc: x@y.com",
      method: "Apple",
      at: new Date(NOW),
      totalSignups: 1,
    });
    expect(subject).not.toMatch(/[\r\n]/);
  });

  it("never uses an em dash", () => {
    const { subject, text } = buildSignupNotifyMessage({
      accountType: "pro",
      firstName: "Sam",
      city: "Irvine",
      method: "Apple",
      at: new Date(NOW),
      totalSignups: 3,
    });
    expect(subject + text).not.toContain(String.fromCharCode(0x2014));
  });
});

describe("helpers", () => {
  it("keeps only the first word of a name and ignores email-looking values", () => {
    expect(firstNameFrom({ full_name: "Maria Lopez Garcia" })).toBe("Maria");
    expect(firstNameFrom({ name: "someone@example.com" })).toBeNull();
    expect(firstNameFrom({ role: "homeowner" })).toBeNull();
    expect(firstNameFrom(null)).toBeNull();
  });

  it("labels the sign-in method", () => {
    expect(signupMethodLabel("email")).toBe("Email and password");
    expect(signupMethodLabel("google")).toBe("Google");
    expect(signupMethodLabel("apple")).toBe("Apple");
    expect(signupMethodLabel(undefined)).toBe("Other");
  });

  it("rejects an OWNER_NOTIFY_EMAIL that is not one plain address", () => {
    vi.stubEnv("OWNER_NOTIFY_EMAIL", "a@b.com\r\nBcc: c@d.com");
    expect(ownerNotifyAddress()).toBeNull();
    vi.stubEnv("OWNER_NOTIFY_EMAIL", " hello@oaktend.com ");
    expect(ownerNotifyAddress()).toBe("hello@oaktend.com");
  });
});

describe("notifyOwnerOfSignup", () => {
  it("sends only minimal fields, never email, phone or address", async () => {
    const ok = await notifyOwnerOfSignup(freshUser(), "homeowner", NOW);
    expect(ok).toBe(true);
    expect(deliverMock).toHaveBeenCalledTimes(1);
    const [to, subject, text] = deliverMock.mock.calls[0];
    expect(to).toBe("hello@oaktend.com");
    expect(subject).toBe("New OakTend signup: Homeowner in Fountain Valley");
    const all = subject + text;
    expect(all).not.toContain("maria.secret");
    expect(all).not.toContain("example.com");
    expect(all).not.toContain("5550123");
    expect(all).not.toContain("Main St");
    expect(all).not.toContain("Lopez");
    expect(all).not.toContain("11111111");
  });

  it("does nothing, and reads nothing, when OWNER_NOTIFY_EMAIL is unset", async () => {
    vi.stubEnv("OWNER_NOTIFY_EMAIL", "");
    const ok = await notifyOwnerOfSignup(freshUser(), "pro", NOW);
    expect(ok).toBe(false);
    expect(deliverMock).not.toHaveBeenCalled();
    expect(adminCalls).toBe(0);
  });

  it("schedule is a no-op when OWNER_NOTIFY_EMAIL is unset", () => {
    vi.stubEnv("OWNER_NOTIFY_EMAIL", "");
    scheduleOwnerSignupNotify(freshUser(), "homeowner");
    expect(afterMock).not.toHaveBeenCalled();
  });

  it("does not throw when the provider fails or fetch rejects", async () => {
    deliverMock.mockResolvedValueOnce(false);
    await expect(notifyOwnerOfSignup(freshUser(), "homeowner", NOW)).resolves.toBe(false);
    deliverMock.mockRejectedValueOnce(new Error("network down"));
    await expect(notifyOwnerOfSignup(freshUser(), "homeowner", NOW)).resolves.toBe(false);
  });

  it("does not throw when the database throws", async () => {
    rpcError = { message: "boom" };
    await expect(notifyOwnerOfSignup(freshUser(), "homeowner", NOW)).resolves.toBe(false);
    expect(deliverMock).not.toHaveBeenCalled();
  });

  it("skips an account that is not a fresh signup", async () => {
    const old = freshUser({ created_at: new Date(NOW - 2 * 60 * 60 * 1000).toISOString() });
    expect(await notifyOwnerOfSignup(old, "pro", NOW)).toBe(false);
    expect(claimCalls).toHaveLength(0);
    expect(deliverMock).not.toHaveBeenCalled();
  });

  it("sends once per account: a second call loses the claim", async () => {
    const bucket = "signup-notify:11111111-1111-1111-1111-111111111111";
    expect(await notifyOwnerOfSignup(freshUser(), "homeowner", NOW)).toBe(true);
    claimAnswers[bucket] = false;
    expect(await notifyOwnerOfSignup(freshUser(), "homeowner", NOW)).toBe(false);
    expect(deliverMock).toHaveBeenCalledTimes(1);
  });

  it("skips internal accounts, the kill switch and the hourly cap", async () => {
    internal = true;
    expect(await notifyOwnerOfSignup(freshUser(), "homeowner", NOW)).toBe(false);
    internal = false;

    vi.stubEnv("OUTBOUND_DISABLED", "1");
    expect(await notifyOwnerOfSignup(freshUser(), "homeowner", NOW)).toBe(false);
    vi.stubEnv("OUTBOUND_DISABLED", "");

    claimAnswers["signup-notify:all"] = false;
    expect(await notifyOwnerOfSignup(freshUser(), "homeowner", NOW)).toBe(false);
    expect(deliverMock).not.toHaveBeenCalled();
  });

  it("schedules through after() and never throws into the caller", () => {
    afterMock.mockImplementationOnce(() => {
      throw new Error("outside request scope");
    });
    expect(() => scheduleOwnerSignupNotify(freshUser(), "pro")).not.toThrow();
    scheduleOwnerSignupNotify(freshUser(), "pro");
    expect(afterMock).toHaveBeenCalledTimes(2);
  });
});

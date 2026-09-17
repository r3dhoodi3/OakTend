import { describe, it, expect, vi, afterEach } from "vitest";

// setPreferredSideAction in preview: "Switch to your pro account" (the profile
// menu in either nav) is a pro-side door, and it closes with the rest of them.
//
// The thing being pinned is not just the redirect - it is that NOTHING IS
// WRITTEN. A stamp of role=contractor on an account that cannot open the
// contractor side is exactly how the trap would have survived the preview:
// every landing after it, /signin and "/" included, resolves off that stamp.

vi.mock("server-only", () => ({}));

class RedirectError extends Error {
  constructor(readonly url: string) {
    super(`NEXT_REDIRECT:${url}`);
  }
}
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw new RedirectError(url);
  },
}));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

// The real previewModeServer and the real action; only the session, the row
// lookups, the admin client and the flash are stubbed.
//
// signedIn is what the gate now turns on: in preview the pro side is shut to
// the public and open to any signed-in account, so `signedIn: false` is the
// blocked viewer (isProSideOpenForViewer reads getVerifiedUser, which is
// stubbed separately from the Supabase client below - that is how the blocked
// path can be exercised on an action that has already re-authed).
async function load(opts: {
  signedIn?: boolean;
  hasPro?: boolean;
  hasHome?: boolean;
}) {
  vi.resetModules();

  const flashes: Array<{ message: string; kind?: string }> = [];
  const stamped: Array<{ userId: string; meta: unknown }> = [];
  let refreshed = 0;

  vi.doMock("@/lib/flash", () => ({
    setFlash: async (message: string, kind?: string) => {
      flashes.push({ message, kind });
    },
  }));
  vi.doMock("@/lib/supabase/server", () => ({
    createClient: async () => ({
      auth: {
        getUser: async () => ({
          data: { user: { id: "u1", user_metadata: { role: "homeowner" } } },
        }),
        refreshSession: async () => {
          refreshed += 1;
          return { error: null };
        },
      },
    }),
  }));
  vi.doMock("@/lib/supabase/admin", () => ({
    createAdminClient: () => ({
      auth: {
        admin: {
          updateUserById: async (userId: string, attrs: unknown) => {
            stamped.push({ userId, meta: attrs });
            return { error: null };
          },
        },
      },
    }),
  }));
  vi.doMock("@/lib/contractor", () => ({
    getSides: async () => ({
      hasPro: opts.hasPro ?? true,
      hasHome: opts.hasHome ?? true,
      preferred: "homeowner",
      checked: true,
    }),
    // previewModeServer imports landingFor from here; the blocked path never
    // reaches it, and the open path below does not call it either.
    landingFor: () => "/pro",
  }));
  vi.doMock("@/lib/auth", () => ({
    getVerifiedUser: async () => ((opts.signedIn ?? true) ? { id: "u1" } : null),
  }));

  const { setPreferredSideAction } = await import("@/lib/sideActions");
  return { setPreferredSideAction, flashes, stamped, refresh: () => refreshed };
}

function form(side: string): FormData {
  const fd = new FormData();
  fd.set("side", side);
  return fd;
}

describe("setPreferredSideAction in preview", () => {
  it("refuses the switch to contractor without writing the preference", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const { setPreferredSideAction, flashes, stamped, refresh } = await load({
      signedIn: false,
      hasPro: true,
      hasHome: true,
    });
    // A genuinely dual-sided account: it HAS the pro side, so nothing but the
    // preview stands between it and the stamp. A viewer the pro side is shut
    // to is sent to the public coming-soon door (/pros, waitlist form + a way
    // back), not toasted on the dashboard, and no flash is queued for a later
    // page.
    await expect(setPreferredSideAction(form("contractor"))).rejects.toThrow(
      "NEXT_REDIRECT:/pros"
    );

    expect(stamped).toEqual([]);
    expect(refresh()).toBe(0);
    expect(flashes).toEqual([]);
  });

  it("still lets the switch back to homeowner through", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const { setPreferredSideAction, stamped } = await load({
      hasPro: true,
      hasHome: true,
    });

    // preferred is "homeowner" already, so this is the skip-the-write branch -
    // the point is only that the preview gate does not stand in its way.
    await expect(setPreferredSideAction(form("homeowner"))).rejects.toThrow(
      "NEXT_REDIRECT:/dashboard"
    );
    expect(stamped).toEqual([]);
  });

  it("lets any signed-in account switch to the pro side in preview", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const { setPreferredSideAction, stamped, flashes } = await load({
      signedIn: true,
      hasPro: true,
      hasHome: true,
    });

    await expect(setPreferredSideAction(form("contractor"))).rejects.toThrow(
      "NEXT_REDIRECT:/pro"
    );
    expect(stamped).toHaveLength(1);
    expect(flashes).toEqual([]);
  });

  it("outside preview the switch to contractor is untouched", async () => {
    const { setPreferredSideAction, stamped, flashes } = await load({
      hasPro: true,
      hasHome: true,
    });

    await expect(setPreferredSideAction(form("contractor"))).rejects.toThrow(
      "NEXT_REDIRECT:/pro"
    );
    expect(stamped).toHaveLength(1);
    expect(flashes).toEqual([]);
  });
});

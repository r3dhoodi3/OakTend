import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

// This route's redirect used to hand decision.redirect straight to the
// browser with zero awareness of preview mode (resolveAuthRole is a pure,
// no-imports function by design). A pro-only account the preview shuts out
// signing in with Apple/Google landed on /pro, whose OWN layout then swapped in
// ProsComingSoon - the founder's report
// (apple-signin-coming-soon-2026-09-16.md). The fix checks isProPath(target)
// + isProSideOpenForViewer() right here, the same gate pro/layout.tsx and
// previewAwareLanding() already apply to every other entry point, so the
// account lands on the homeowner side directly instead of detouring through
// the coming-soon page.

let exchangeError: { message: string } | null = null;
let sessionUser: { id: string; user_metadata: Record<string, unknown> } | null =
  null;
let refreshCalls = 0;
let updateUserCalls: Array<{ id: string; metadata: Record<string, unknown> }> =
  [];

vi.mock("server-only", () => ({}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({
    auth: {
      exchangeCodeForSession: async () => ({
        data: { user: sessionUser },
        error: exchangeError,
      }),
      refreshSession: async () => {
        refreshCalls++;
        return { error: null };
      },
    },
  }),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    auth: {
      admin: {
        updateUserById: async (id: string, patch: { user_metadata: Record<string, unknown> }) => {
          updateUserCalls.push({ id, metadata: patch.user_metadata });
          return { error: null };
        },
      },
    },
  }),
}));

vi.mock("@/lib/requestOrigin", () => ({
  requestOrigin: () => "https://oaktend.test",
}));

vi.mock("@/app/(auth)/recordTermsAcceptance", () => ({
  recordTermsAcceptance: async () => {},
}));

// Route-level integration, not roleRouting.ts's own pure-function tests
// (src/lib/roleRouting.test.ts pins resolveAuthRole itself), so the real
// resolveAuthRole is used here to get a real /pro-vs-/dashboard decision out
// of realistic row combinations - only the preview gate below is stubbed.
let contractorRow = false;
let propertyRow = false;
vi.mock("@/lib/contractor", async () => {
  const actual = await vi.importActual<typeof import("@/lib/roleRouting")>(
    "@/lib/roleRouting"
  );
  return {
    isProPath: actual.isProPath,
    isFirstHomeSetupPath: actual.isFirstHomeSetupPath,
    resolveAuthRole: actual.resolveAuthRole,
    contractorRowExists: async () => contractorRow,
    propertyRowExists: async () => propertyRow,
  };
});

let proSideOpen = false;
vi.mock("@/lib/previewModeServer", () => ({
  isProSideOpenForViewer: async () => proSideOpen,
  homeownerLanding: (sides: { hasHome: boolean }) =>
    sides.hasHome ? "/dashboard" : "/onboarding",
}));

import { GET } from "./route";

function callbackRequest(query = ""): NextRequest {
  return new Request(
    `https://oaktend.test/auth/callback?code=abc${query}`
  ) as unknown as NextRequest;
}

function locationOf(response: Response): string {
  return response.headers.get("location") ?? "";
}

beforeEach(() => {
  exchangeError = null;
  refreshCalls = 0;
  updateUserCalls = [];
  contractorRow = false;
  propertyRow = false;
  proSideOpen = false;
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("preview-mode-aware OAuth callback redirect", () => {
  it("sends a pro-only account to onboarding (no home) instead of /pro when preview is on", async () => {
    sessionUser = {
      id: "u-pro-only",
      user_metadata: { role: "contractor" },
    };
    contractorRow = true;
    propertyRow = false;
    proSideOpen = false;

    const res = await GET(callbackRequest());
    expect(locationOf(res)).toBe("https://oaktend.test/onboarding");
  });

  it("sends a pro-with-a-home account to /dashboard, not /pro, when its own preference points at /pro", async () => {
    // hasContractorRow AND hasPropertyRow both true (hasBothSides), with
    // next=/pro so resolveAuthRole leaves the redirect at /pro untouched
    // (no side-correction applies to a dual-side account) - this is the one
    // shape that reaches the new preview check with hasPropertyRow true, so
    // homeownerLanding({ hasHome: true }) is what has to answer, not the
    // no-home branch the other tests exercise.
    sessionUser = {
      id: "u-pro-with-home",
      user_metadata: { role: "contractor" },
    };
    contractorRow = true;
    propertyRow = true;
    proSideOpen = false;

    const res = await GET(callbackRequest("&next=%2Fpro"));
    expect(locationOf(res)).toBe("https://oaktend.test/dashboard");
  });

  it("still sends a pro-only account the preview lets through to /pro", async () => {
    sessionUser = {
      id: "u-open-pro",
      user_metadata: { role: "contractor" },
    };
    contractorRow = true;
    propertyRow = false;
    // isProSideOpenForViewer() answers true for any signed-in account during
    // preview; anonymous visitors get the coming-soon door.
    proSideOpen = true;

    const res = await GET(callbackRequest());
    expect(locationOf(res)).toBe("https://oaktend.test/pro");
  });

  it("leaves a dual-side account on the homeowner side, same as before preview existed", async () => {
    sessionUser = {
      id: "u-dual-side",
      user_metadata: { role: "contractor" },
    };
    contractorRow = true;
    propertyRow = true;
    proSideOpen = false;

    // hasBothSides means resolveAuthRole never rewrites `next`; the default
    // `next` (no ?next= sent) is /dashboard, which is not under /pro, so the
    // new preview check never even triggers - this pins that it stays inert.
    const res = await GET(callbackRequest());
    expect(locationOf(res)).toBe("https://oaktend.test/dashboard");
  });

  it("routes a pro-only account straight to /pro when preview is off, unchanged from before", async () => {
    sessionUser = {
      id: "u-pro-only-no-preview",
      user_metadata: { role: "contractor" },
    };
    contractorRow = true;
    propertyRow = false;
    proSideOpen = true; // isProSideOpenForViewer() short-circuits to true when the flag is off

    const res = await GET(callbackRequest());
    expect(locationOf(res)).toBe("https://oaktend.test/pro");
  });
});

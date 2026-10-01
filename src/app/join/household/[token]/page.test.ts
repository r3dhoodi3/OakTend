import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Source test (the page needs a real request context to render). The security
// fix for owner feedback item 25: rendering the join page must never redeem
// the token. Before, the GET itself called redeem_household_invite_token(), so
// a reload of a page that had just said "this code isn't working" could hand
// out access. Joining is now an explicit POST.
const page = readFileSync(
  fileURLToPath(new URL("./page.tsx", import.meta.url)),
  "utf8"
);

describe("join page is read only", () => {
  it("never calls the redeem RPC while rendering", () => {
    expect(page).not.toContain('rpc("redeem_household_invite_token"');
    expect(page).not.toContain(".rpc(");
  });
  it("joins only through the explicit form action", () => {
    expect(page).toContain("action={redeemHouseholdInviteAction}");
    expect(page).toContain("Join this home");
  });
  it("checks the code is still usable by this browser before offering the button", () => {
    expect(page).toContain("openHouseholdInvite(token)");
    expect(page).toContain("if (!invite) return <InvalidState />;");
  });
  it("opening the page never moves a code's expiry", () => {
    expect(page).not.toContain(".update(");
    expect(page).not.toContain("expires_at:");
  });
});

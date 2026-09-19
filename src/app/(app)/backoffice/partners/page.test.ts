import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

// Source test, the same pattern as src/app/(app)/account/household/page.test.ts
// and src/app/pro/crm/page.test.ts: this page pulls in getVerifiedUser ->
// createClient at module scope and throws the moment it is imported outside a
// real server component render.
//
// WHAT IS WORTH PINNING HERE is not the markup, it is the gate. Everything this
// page reads goes through the service-role client, which bypasses RLS - other
// people's names and email addresses, and a list of contractors' emails. If the
// gate ever moves below the admin client, or softens from notFound() to a
// redirect, this file should fail.
function src(rel: string): string {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

const page = src("./page.tsx");

describe("backoffice/partners: the gate", () => {
  it("answers 404 for anyone who is not an internal account", () => {
    expect(page).toContain(
      "if (!user || !(await isInternalUser(user.id))) notFound();"
    );
    // A 404, never a redirect: a redirect to /signin or /dashboard confirms
    // the page exists, and this one is deliberately not advertised.
    expect(page).not.toContain("redirect(");
  });

  it("does not build the admin client until the gate has passed", () => {
    const gate = page.indexOf("isInternalUser(user.id)");
    const admin = page.indexOf("createAdminClient()");
    expect(gate).toBeGreaterThan(-1);
    expect(admin).toBeGreaterThan(gate);
  });

  it("re-verifies the session rather than reading it off the cookie", () => {
    expect(page).toContain("await getVerifiedUser()");
  });

  it("is never rendered ahead of time or indexed", () => {
    expect(page).toContain('export const dynamic = "force-dynamic"');
    expect(page).toContain("robots: { index: false, follow: false }");
  });

  // 0171 is pasted by hand, so pro_waitlist.campaign_code is missing for a
  // while. The page must still render the account half.
  it("tolerates the waitlist column not existing yet", () => {
    expect(page).toContain("isMissingSchemaError(waitlistError)");
  });

  // Phone width: the two tables are the only things here that can be wider
  // than the screen, and each sits in its own scroller.
  it("keeps every table inside a horizontal scroller", () => {
    const tables = page.match(/<table/g) ?? [];
    const scrollers = page.match(/overflow-x-auto/g) ?? [];
    expect(tables.length).toBeGreaterThan(0);
    expect(scrollers).toHaveLength(tables.length);
  });
});

describe("backoffice/partners: not linked from anywhere", () => {
  it("has no nav entry", () => {
    // The page's existence is not advertised, so the one link it carries is
    // its own way OUT, back to /dashboard.
    for (const rel of ["../../../../components/Nav.tsx", "../../../../components/ProNav.tsx"]) {
      expect(src(rel)).not.toContain("backoffice");
    }
  });
});

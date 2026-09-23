import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

// Source test, the same pattern (and the same reasoning) as the sibling
// ../partners/page.test.ts: these files pull in getVerifiedUser ->
// createClient at module scope and throw the moment they are imported outside
// a real server component render.
//
// WHAT IS WORTH PINNING is the gate, on BOTH files. The page reads every
// homeowner's name, address, email and phone through the service-role client,
// and the action writes a notification into somebody else's account. A server
// action is a public endpoint: the form sitting behind a 404 protects nothing
// on its own, so the action carries its own copy of the gate and this file
// fails if either one moves or softens.
function src(rel: string): string {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

const page = src("./page.tsx");
const actions = src("./actions.ts");

describe("backoffice/jobs: the gate", () => {
  it("answers 404 on the page for anyone who is not an internal account", () => {
    expect(page).toContain(
      "if (!user || !(await isInternalUser(user.id))) notFound();"
    );
    // A 404, never a redirect: a redirect confirms the page exists, and this
    // one is deliberately not advertised.
    expect(page).not.toContain("redirect(");
  });

  it("gates the action too, not just the page that links to it", () => {
    expect(actions).toContain(
      "if (!user || !(await isInternalUser(user.id))) notFound();"
    );
  });

  it("does not build the admin client until the gate has passed", () => {
    for (const file of [page, actions]) {
      const gate = file.indexOf("isInternalUser(user.id)");
      const admin = file.indexOf("createAdminClient()");
      expect(gate).toBeGreaterThan(-1);
      expect(admin).toBeGreaterThan(gate);
    }
  });

  it("re-verifies the session rather than reading it off the cookie", () => {
    expect(page).toContain("await getVerifiedUser()");
    expect(actions).toContain("await getVerifiedUser()");
  });

  it("is never rendered ahead of time or indexed", () => {
    expect(page).toContain('export const dynamic = "force-dynamic"');
    expect(page).toContain("robots: { index: false, follow: false }");
  });
});

describe("backoffice/jobs: the update reaches the right person", () => {
  // contractor_leads.homeowner_email is contact detail typed on a form, not an
  // identity. The notification has to be addressed by properties.user_id, or a
  // typo on a posting silently sends somebody else's job update into an
  // account that happens to match.
  it("addresses the notification by the home's owner, not the typed email", () => {
    expect(actions).toContain('.from("properties")');
    expect(actions).toContain("userId: property.user_id");
  });

  // TCPA: consent is recorded per ACCOUNT (users.sms_consent, migration
  // 0073). contractor_leads.homeowner_phone is a number typed into a job form
  // by somebody who consented to nothing, so texting it because it happens to
  // be on the posting is exactly the exposure the gate exists to prevent.
  it("texts the account's number and consent, never the one typed on the job", () => {
    expect(actions).toContain("phone: owner?.phone ?? null");
    expect(actions).toContain("smsConsent: owner?.sms_consent ?? null");
    // The column is named in a comment explaining why it is NOT used; what
    // must never appear is it being handed over as the destination.
    expect(actions).not.toContain("phone: lead.homeowner_phone");
  });

  it("refuses a blank update and a lead id that isn't one", () => {
    expect(actions).toContain("normalizeJobUpdate(");
    expect(actions).toContain("if (!/^[0-9a-f-]{36}$/i.test(leadId)) notFound();");
  });

  // The homeowner's own card reads these rows, so a sent update that doesn't
  // revalidate /contractors is invisible there until something else does.
  it("revalidates the homeowner's page as well as this one", () => {
    expect(actions).toContain('revalidatePath("/contractors")');
    expect(actions).toContain('revalidatePath("/backoffice/jobs")');
  });
});

describe("backoffice/jobs: not linked from anywhere", () => {
  it("has no nav entry", () => {
    for (const rel of [
      "../../../../components/Nav.tsx",
      "../../../../components/ProNav.tsx",
    ]) {
      expect(src(rel)).not.toContain("backoffice");
    }
  });
});

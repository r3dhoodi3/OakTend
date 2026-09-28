import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

// Source test, same reason src/app/pro/crm/page.test.ts is one: this page
// pulls in getVerifiedUser -> createClient at module scope and throws the
// moment it is imported outside a real server component render.
function src(rel: string): string {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

const page = src("./page.tsx");

// Owner feedback 2026-09-27: the explainer was cut to two short lines, but it
// must still say plainly that a member sees the money pages (legal review
// N-114) and that Plus carries with the home (hasPlus() in
// src/lib/subscription.ts).
describe("household: explainer stays honest after the cut", () => {
  it("names the money pages and the Plus rule", () => {
    expect(page).toContain("Members see everything for this home");
    expect(page).toContain("home value,");
    expect(page).toContain("mortgage, taxes");
    expect(page).toContain("you have Plus, they get it on this home too");
    expect(page).not.toContain("Plus is personal");
  });
});

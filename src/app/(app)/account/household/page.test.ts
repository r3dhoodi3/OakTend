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

// RB wave (2026-08-30, CR4#7): the household card names the caretaking case
// (a parent's home, a managed rental) explicitly, since that's the one part
// of household sharing that creates a genuinely new account rather than a
// second login inside one that already exists.
describe("household: names the caretaking use case", () => {
  it("keeps the new copy line alongside the existing explainer paragraphs", () => {
    expect(page).toContain(
      "Managing a parent&apos;s home or a rental? Add them so you both see"
    );
    // Still there: the existing lines this one was added next to, not a
    // replacement for them.
    // Reworded 2026-09-20 (legal review N-114): the card now says plainly
    // that a member also sees the money pages, and the Plus line matches
    // hasPlus() in src/lib/subscription.ts (Plus carries with the home).
    expect(page).toContain("A member sees everything you see for this home");
    expect(page).toContain("the money pages (home value, purchase price, mortgage balance,");
    expect(page).toContain("If the owner has Plus, members get Plus features on this home");
    expect(page).not.toContain("Plus is personal");
  });
});

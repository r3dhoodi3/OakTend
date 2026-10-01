import { describe, expect, it } from "vitest";
import { householdInviteSubject, safeInviterName } from "./householdInviteEmail";

describe("safeInviterName", () => {
  it("keeps an ordinary name", () => {
    expect(safeInviterName("  Maria  Lopez ")).toBe("Maria Lopez");
    expect(safeInviterName("John Smith Jr.")).toBe("John Smith Jr.");
  });

  it("drops a name that carries a link", () => {
    expect(safeInviterName("Verify at oaktend-help.com")).toBeNull();
    expect(safeInviterName("https://evil.example")).toBeNull();
    expect(safeInviterName("go to www.evil")).toBeNull();
    expect(safeInviterName("Reset at oaktend.support")).toBeNull();
    expect(safeInviterName("evil.me")).toBeNull();
    expect(safeInviterName("mail help@evil")).toBeNull();
    expect(safeInviterName("J.R. Smith")).toBe("J.R. Smith");
  });

  it("flattens line breaks so the name cannot add lines to the email", () => {
    expect(safeInviterName("Ann\nYour account is locked")).toBe(
      "Ann Your account is locked"
    );
  });

  it("drops an over-long name and empty values", () => {
    expect(safeInviterName("a".repeat(61))).toBeNull();
    expect(safeInviterName("   ")).toBeNull();
    expect(safeInviterName(null)).toBeNull();
  });

  it("falls back to the generic subject when the name is dropped", () => {
    expect(householdInviteSubject(safeInviterName("x.com"))).toBe(
      "You're invited to a home on OakTend"
    );
  });
});

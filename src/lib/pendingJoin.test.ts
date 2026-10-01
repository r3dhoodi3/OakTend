import { describe, expect, it } from "vitest";
import { isInviteToken, joinTokenFromPath } from "./pendingJoin";
import { QR_TOKEN_LIFETIME_SECONDS, formatCountdown } from "./householdQr";
import { householdInviteSubject, householdInviteText } from "./householdInviteEmail";

const T = "0f8fad5b-d9cb-469f-a165-70867728950e";

describe("joinTokenFromPath", () => {
  it("reads the token off a join path", () => {
    expect(joinTokenFromPath(`/join/household/${T}`)).toBe(T);
    expect(joinTokenFromPath(`/join/household/${T.toUpperCase()}/`)).toBe(T);
  });
  it("ignores anything else", () => {
    expect(joinTokenFromPath("/join/household/invalid")).toBeNull();
    expect(joinTokenFromPath(`/join/household/${T}/extra`)).toBeNull();
    expect(joinTokenFromPath("/join/invite")).toBeNull();
    expect(joinTokenFromPath(`/onboarding/${T}`)).toBeNull();
  });
  it("isInviteToken only accepts uuids", () => {
    expect(isInviteToken(T)).toBe(true);
    expect(isInviteToken("x")).toBe(false);
    expect(isInviteToken(undefined)).toBe(false);
  });
});

describe("household QR timing", () => {
  it("codes last 10 minutes", () => {
    expect(QR_TOKEN_LIFETIME_SECONDS).toBe(600);
  });
  it("formats the countdown", () => {
    expect(formatCountdown(600)).toBe("10:00");
    expect(formatCountdown(65.9)).toBe("1:05");
    expect(formatCountdown(-3)).toBe("0:00");
  });
});

describe("household invite email", () => {
  it("names the inviter and links to the invite page", () => {
    const text = householdInviteText({
      inviterName: "Sam",
      inviterEmail: "sam@example.com",
      inviteeEmail: "pat@example.com",
      link: "https://oaktend.com/join/invite",
    });
    expect(householdInviteSubject("Sam")).toBe("Sam invited you to their home on OakTend");
    expect(text).toContain("Sam (sam@example.com) invited you");
    expect(text).toContain("https://oaktend.com/join/invite");
    expect(text).toContain("pat@example.com");
    expect(text).not.toMatch(/—/);
  });
});

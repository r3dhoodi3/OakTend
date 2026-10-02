import { describe, it, expect } from "vitest";
import {
  hasBrowserPrivacySignal,
  hasSessionCookie,
  normalizeGaPath,
  safeCampaignQuery,
  safeReferrer,
  validMeasurementId,
} from "./googleAnalytics";

describe("validMeasurementId", () => {
  it("accepts only GA4 ids", () => {
    expect(validMeasurementId("G-TEST00000")).toBe("G-TEST00000");
    expect(validMeasurementId(" g-abc1234 ")).toBe("G-ABC1234");
    expect(validMeasurementId(undefined)).toBeNull();
    expect(validMeasurementId("")).toBeNull();
    expect(validMeasurementId("UA-12345-1")).toBeNull();
    expect(validMeasurementId('G-1234"><script>')).toBeNull();
  });
});

describe("normalizeGaPath", () => {
  it("allows public marketing and legal pages", () => {
    for (const p of [
      "/",
      "/pros",
      "/pricing",
      "/guides",
      "/guides/roof-replacement-cost",
      "/oc/irvine",
      "/privacy",
      "/cookies",
      "/homeowner-signup",
    ]) {
      expect(normalizeGaPath(p)).toBe(p);
    }
    expect(normalizeGaPath("/pros/")).toBe("/pros");
  });

  it("refuses the signed-in app, auth flows, invites and redirects", () => {
    for (const p of [
      "/dashboard",
      "/account/privacy",
      "/chats",
      "/pro",
      "/pro/leads",
      "/signin",
      "/reset-password",
      "/verify",
      "/auth/callback",
      "/join/invite",
      "/join/household",
      "/open",
      "/welcome",
      "/onboarding",
      "/unsubscribe",
      "/go/ABC123",
      "/api/track",
      "/value",
      "/home-details",
      "/backoffice",
      "/ocean",
    ]) {
      expect(normalizeGaPath(p)).toBeNull();
    }
  });

  it("replaces a pro page id and strips queries and odd characters", () => {
    expect(normalizeGaPath("/p/abc-123")).toBe("/p/[id]");
    expect(normalizeGaPath("/pricing?email=a@b.com")).toBe("/pricing");
    expect(normalizeGaPath("/guides/123%20Main%20St")).toBeNull();
    expect(normalizeGaPath(null)).toBeNull();
  });
});

describe("safeCampaignQuery", () => {
  it("keeps clean utm tags only", () => {
    expect(
      safeCampaignQuery("?utm_source=nextdoor&email=a%40b.com&code=XYZ")
    ).toBe("?utm_source=nextdoor");
    expect(safeCampaignQuery("?utm_campaign=123 Main St")).toBe("");
    expect(safeCampaignQuery("")).toBe("");
  });
});

describe("safeReferrer", () => {
  const origin = "https://oaktend.com";
  it("reduces other sites to their origin", () => {
    expect(
      safeReferrer("https://www.google.com/search?q=my+address", origin)
    ).toBe("https://www.google.com/");
  });
  it("normalizes our own pages and hides app pages", () => {
    expect(safeReferrer("https://oaktend.com/p/xyz?x=1", origin)).toBe(
      "https://oaktend.com/p/[id]"
    );
    expect(safeReferrer("https://oaktend.com/dashboard", origin)).toBe(
      "https://oaktend.com/"
    );
    expect(safeReferrer("", origin)).toBe("");
  });
});

describe("hasBrowserPrivacySignal", () => {
  it("reads GPC and Do Not Track", () => {
    expect(hasBrowserPrivacySignal({ globalPrivacyControl: true }, {})).toBe(true);
    expect(hasBrowserPrivacySignal({ doNotTrack: "1" }, {})).toBe(true);
    expect(hasBrowserPrivacySignal({}, { doNotTrack: "1" })).toBe(true);
    expect(hasBrowserPrivacySignal({ doNotTrack: "0" }, {})).toBe(false);
    expect(hasBrowserPrivacySignal(undefined, undefined)).toBe(false);
  });
});

describe("hasSessionCookie", () => {
  it("spots a Supabase session cookie, chunked or not", () => {
    expect(hasSessionCookie("a=1; sb-abc-auth-token=xyz")).toBe(true);
    expect(hasSessionCookie("sb-abc-auth-token.0=xyz")).toBe(true);
    expect(hasSessionCookie("oaktend-theme=dark; _ga=1")).toBe(false);
    expect(hasSessionCookie("")).toBe(false);
  });
});

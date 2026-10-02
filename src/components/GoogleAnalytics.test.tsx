// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, cleanup, act } from "@testing-library/react";

let mockPath = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPath,
}));

let mockNative = false;
vi.mock("@/lib/platform", () => ({
  isNativeApp: () => mockNative,
}));

import GoogleAnalytics, { __resetGoogleAnalyticsForTests } from "./GoogleAnalytics";
import { writeAnalyticsConsent } from "@/lib/googleAnalytics";

// The four promises the legal pages make about Google Analytics, pinned:
// nothing without an id, nothing before consent, loads after "Allow", and
// Global Privacy Control (or Do Not Track) blocks it even after "Allow".

const ID = "G-TEST00000";
const CONSENT_KEY = "oaktend_analytics_consent";

type W = Window & { dataLayer?: unknown[]; gtag?: unknown; [k: string]: unknown };

function gaScript() {
  return document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
}

function calls(): unknown[][] {
  const dl = ((window as unknown as W).dataLayer ?? []) as ArrayLike<unknown>[];
  return dl.map((a) => Array.from(a));
}

function pageViews(): Record<string, unknown>[] {
  return calls()
    .filter((a) => a[0] === "event" && a[1] === "page_view")
    .map((a) => a[2] as Record<string, unknown>);
}

function setNav(prop: string, value: unknown) {
  Object.defineProperty(window.navigator, prop, { value, configurable: true });
}

beforeEach(() => {
  window.localStorage.clear();
  mockPath = "/";
  __resetGoogleAnalyticsForTests();
});

afterEach(() => {
  cleanup();
  document.querySelectorAll("script").forEach((s) => s.remove());
  const w = window as unknown as W;
  delete w.dataLayer;
  delete w.gtag;
  delete w[`ga-disable-${ID}`];
  setNav("globalPrivacyControl", undefined);
  setNav("doNotTrack", null);
  mockNative = false;
  document.cookie = "sb-testref-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  window.history.replaceState(null, "", "/");
  document.title = "";
});

describe("GoogleAnalytics", () => {
  it("loads nothing without a measurement id, even with consent", () => {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    render(<GoogleAnalytics measurementId={undefined} />);
    render(<GoogleAnalytics measurementId="not-an-id" />);
    expect(gaScript()).toBeNull();
    expect((window as unknown as W).gtag).toBeUndefined();
  });

  it("loads nothing before the visitor chooses", () => {
    render(<GoogleAnalytics measurementId={ID} />);
    expect(gaScript()).toBeNull();
    expect((window as unknown as W).gtag).toBeUndefined();
  });

  it("loads nothing after 'Only necessary'", () => {
    window.localStorage.setItem(CONSENT_KEY, "denied");
    render(<GoogleAnalytics measurementId={ID} />);
    expect(gaScript()).toBeNull();
  });

  it("loads after Allow, with ad features off and consent defaults denied", () => {
    render(<GoogleAnalytics measurementId={ID} />);
    expect(gaScript()).toBeNull();
    act(() => writeAnalyticsConsent("granted"));
    expect(gaScript()).not.toBeNull();
    expect(gaScript()!.getAttribute("src")).toBe(
      `https://www.googletagmanager.com/gtag/js?id=${ID}`
    );
    const all = calls();
    const def = all.find((c) => c[0] === "consent" && c[1] === "default");
    expect(def?.[2]).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    const update = all.find((c) => c[0] === "consent" && c[1] === "update");
    expect(update?.[2]).toEqual({ analytics_storage: "granted" });
    const config = all.find((c) => c[0] === "config");
    expect(config?.[2]).toMatchObject({
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    expect(pageViews()).toHaveLength(1);
    expect(pageViews()[0]).toMatchObject({
      page_location: `${window.location.origin}/`,
    });
  });

  it("is blocked by Global Privacy Control even after Allow", () => {
    setNav("globalPrivacyControl", true);
    window.localStorage.setItem(CONSENT_KEY, "granted");
    render(<GoogleAnalytics measurementId={ID} />);
    expect(gaScript()).toBeNull();
    expect(pageViews()).toHaveLength(0);
  });

  it("is blocked by Do Not Track even after Allow", () => {
    setNav("doNotTrack", "1");
    window.localStorage.setItem(CONSENT_KEY, "granted");
    render(<GoogleAnalytics measurementId={ID} />);
    expect(gaScript()).toBeNull();
  });

  it("never loads on signed-in app pages, and switches off when navigating into one", () => {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    mockPath = "/dashboard";
    const r = render(<GoogleAnalytics measurementId={ID} />);
    expect(gaScript()).toBeNull();

    mockPath = "/guides/roof-replacement-cost";
    r.rerender(<GoogleAnalytics measurementId={ID} />);
    expect(gaScript()).not.toBeNull();
    expect(pageViews()).toHaveLength(1);

    mockPath = "/account/privacy";
    r.rerender(<GoogleAnalytics measurementId={ID} />);
    expect((window as unknown as W)[`ga-disable-${ID}`]).toBe(true);
    expect(pageViews()).toHaveLength(1);
  });

  it("sends a pro page as /p/[id], never the real id", () => {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    mockPath = "/p/3f2a9c1e-1111-2222-3333-444455556666";
    render(<GoogleAnalytics measurementId={ID} />);
    expect(pageViews()[0]).toMatchObject({
      page_location: `${window.location.origin}/p/[id]`,
      page_title: "Pro page",
    });
  });

  it("turns off and clears _ga cookies when the visitor revokes", () => {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    render(<GoogleAnalytics measurementId={ID} />);
    document.cookie = "_ga=GA1.1.123.456; path=/";
    document.cookie = "_ga_TEST00000=GS1.1.1; path=/";
    act(() => writeAnalyticsConsent("denied"));
    expect((window as unknown as W)[`ga-disable-${ID}`]).toBe(true);
    expect(document.cookie).not.toMatch(/_ga/);
  });

  it("sets the scrubbed location, referrer and title globally before any event", () => {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    mockPath = "/homeowner-signup";
    window.history.replaceState(
      null,
      "",
      "/homeowner-signup?next=/join/household/TESTTOKEN&ref=TESTREF&utm_source=nextdoor"
    );
    render(<GoogleAnalytics measurementId={ID} />);
    const all = calls();
    const firstEvent = all.findIndex((c) => c[0] === "event");
    const firstPageSet = all.findIndex(
      (c) => c[0] === "set" && typeof c[1] === "object" && c[1] !== null
    );
    expect(firstPageSet).toBeGreaterThanOrEqual(0);
    expect(firstPageSet).toBeLessThan(firstEvent);
    // The config call carries them too, so gtag.js's own first hits use them.
    const configIdx = all.findIndex((c) => c[0] === "config");
    expect(firstPageSet).toBeLessThan(configIdx);
    expect(all[firstPageSet][1]).toMatchObject({
      page_location: `${window.location.origin}/homeowner-signup?utm_source=nextdoor`,
    });
    expect(all[configIdx][2]).toMatchObject({
      page_location: `${window.location.origin}/homeowner-signup?utm_source=nextdoor`,
    });
    // Nothing anywhere in the dataLayer carries the token or the ref code.
    const dump = JSON.stringify(all);
    expect(dump).not.toContain("TESTTOKEN");
    expect(dump).not.toContain("TESTREF");
    expect(dump).not.toContain("/join/");
  });

  it("never sends a pro's id or business name, even on the next page", () => {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    mockPath = "/p/PROID123";
    document.title = "Acme Plumbing | OakTend";
    const r = render(<GoogleAnalytics measurementId={ID} />);
    // Client-side navigation away while the old title is still showing.
    mockPath = "/pricing";
    r.rerender(<GoogleAnalytics measurementId={ID} />);
    const dump = JSON.stringify(calls());
    expect(dump).not.toContain("PROID123");
    expect(dump).not.toContain("Acme");
    expect(pageViews()[1]).toMatchObject({ page_title: "/pricing" });
  });

  it("is off for a browser holding a sign-in session, even after Allow", () => {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    document.cookie = "sb-testref-auth-token=x; path=/";
    render(<GoogleAnalytics measurementId={ID} />);
    expect(gaScript()).toBeNull();
    expect(pageViews()).toHaveLength(0);
  });

  it("switches off when the visitor signs in partway through a visit", () => {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    mockPath = "/pricing";
    const r = render(<GoogleAnalytics measurementId={ID} />);
    expect(pageViews()).toHaveLength(1);
    document.cookie = "sb-testref-auth-token=x; path=/";
    mockPath = "/guides";
    r.rerender(<GoogleAnalytics measurementId={ID} />);
    expect((window as unknown as W)[`ga-disable-${ID}`]).toBe(true);
    expect(pageViews()).toHaveLength(1);
  });

  it("is off inside the iOS/Android app shell, even after Allow", () => {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    mockNative = true;
    render(<GoogleAnalytics measurementId={ID} />);
    expect(gaScript()).toBeNull();
  });
});

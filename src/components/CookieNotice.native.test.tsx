// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

let mockNative = false;
vi.mock("@/lib/platform", () => ({
  isNativeApp: () => mockNative,
}));
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import CookieNotice from "./CookieNotice";
import GoogleAnalytics from "./GoogleAnalytics";

// Inside the iOS/Android app shell there is no cookie card and Google
// Analytics never loads (2026-10-02). In a browser tab both behave exactly as
// before; the browser side is pinned in CookieNotice.test.tsx and
// GoogleAnalytics.test.tsx, and the first test here re-checks it next to the
// native case so a regression in the gate shows up as a pair.

const ID = "G-TEST00000";
const CONSENT_KEY = "oaktend_analytics_consent";

function gaScript() {
  return document.querySelector('script[src*="googletagmanager.com"]');
}

beforeEach(() => {
  window.localStorage.clear();
  mockNative = false;
});

afterEach(() => {
  cleanup();
  document.querySelectorAll("script").forEach((s) => s.remove());
  const w = window as unknown as Record<string, unknown>;
  delete w.dataLayer;
  delete w.gtag;
  delete w[`ga-disable-${ID}`];
});

describe("CookieNotice in the app shell", () => {
  it("still shows in a normal browser", () => {
    const { container } = render(<CookieNotice />);
    expect(container.querySelector('[aria-label="Cookie notice"]')).not.toBeNull();
  });

  it("still asks about Google Analytics in a normal browser", () => {
    const { getByRole } = render(<CookieNotice gaEnabled />);
    expect(getByRole("button", { name: "Allow analytics" })).toBeInTheDocument();
  });

  it("renders nothing inside the shell (informational mode)", () => {
    mockNative = true;
    const { container } = render(<CookieNotice />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing inside the shell, even with a GA id configured", () => {
    mockNative = true;
    const { container } = render(<CookieNotice gaEnabled />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("GoogleAnalytics in the app shell", () => {
  it("never injects the gtag script or defines gtag, even after Allow", () => {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    mockNative = true;
    render(<GoogleAnalytics measurementId={ID} />);
    expect(gaScript()).toBeNull();
    expect((window as unknown as { gtag?: unknown }).gtag).toBeUndefined();
  });

  it("does inject it in a browser after Allow (control)", () => {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    render(<GoogleAnalytics measurementId={ID} />);
    expect(gaScript()).not.toBeNull();
  });
});

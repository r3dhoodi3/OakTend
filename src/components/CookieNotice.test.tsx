// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import CookieNotice from "./CookieNotice";

// The informational cookie card. Mirrors PreviewNotice.test.tsx, minus the
// flag: this one has no environment switch - it is shown to everybody once,
// on every surface, because it states a fact about the product rather than a
// temporary state.
//
// Three things matter and are pinned here: it shows on a first visit,
// dismissing it sticks across a remount, and a browser with storage blocked
// still gets a working card rather than a crash.
//
// Without a GA id there is no "reject" path and nothing waits on the card. With
// one (the second describe block) it becomes a real, symmetric choice about
// Google Analytics; see the header comment in CookieNotice.tsx.

const DISMISSED_KEY = "oaktend_cookie_notice_dismissed";
const TEXT =
  "We use cookies for sign-in, security, and fraud prevention. No ad cookies.";

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("CookieNotice", () => {
  it("shows on a first visit, with the link to the full notice", () => {
    render(<CookieNotice />);
    expect(screen.getByText(TEXT)).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Cookie notice" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cookie notice" })).toHaveAttribute(
      "href",
      "/cookies"
    );
  });

  it("clears the mobile tab bar rather than sitting on top of it", () => {
    render(<CookieNotice />);
    // Below lg both shells pin a fixed 3.5rem + safe-area bottom nav; the card
    // has to start above it and only fall back to bottom-4 from lg up.
    const card = screen.getByRole("region", { name: "Cookie notice" });
    expect(card).toHaveClass(
      "fixed",
      "z-40",
      "bottom-[calc(3.5rem_+_env(safe-area-inset-bottom)_+_1rem)]",
      "lg:bottom-4"
    );
  });

  it("hides on dismiss and remembers it across a remount", () => {
    const first = render(<CookieNotice />);
    fireEvent.click(screen.getByRole("button", { name: "Got it" }));
    expect(screen.queryByText(TEXT)).not.toBeInTheDocument();
    expect(window.localStorage.getItem(DISMISSED_KEY)).toBe("1");

    // A remount is what a navigation looks like to this component.
    first.unmount();
    render(<CookieNotice />);
    expect(screen.queryByText(TEXT)).not.toBeInTheDocument();
  });

  it("stays hidden for a browser that already carries the flag", () => {
    window.localStorage.setItem(DISMISSED_KEY, "1");
    render(<CookieNotice />);
    expect(screen.queryByText(TEXT)).not.toBeInTheDocument();
  });

  // Private windows and "block site data" make localStorage throw on ACCESS,
  // not return null. The card must still work - and the safe direction to fail
  // is telling somebody what cookies we set, not hiding it because a flag
  // could not be read.
  it("still shows when reading storage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<CookieNotice />);
    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });

  it("still dismisses for this view when writing storage throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<CookieNotice />);
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: "Got it" }))
    ).not.toThrow();
    expect(screen.queryByText(TEXT)).not.toBeInTheDocument();
  });
});

// GA mode: only when a GA4 id is configured (layout passes gaEnabled). The
// informational card above is unchanged without it.
describe("CookieNotice with Google Analytics configured", () => {
  const CONSENT_KEY = "oaktend_analytics_consent";

  afterEach(() => {
    Object.defineProperty(window.navigator, "globalPrivacyControl", {
      value: undefined,
      configurable: true,
    });
  });

  it("asks with two equal buttons and remembers 'Only necessary'", () => {
    const first = render(<CookieNotice gaEnabled />);
    const no = screen.getByRole("button", { name: "Only necessary" });
    const yes = screen.getByRole("button", { name: "Allow analytics" });
    // Same classes: saying no is exactly as easy as saying yes.
    expect(no.className).toBe(yes.className);
    expect(screen.getByText(/Google Analytics cookies on our public pages/)).toBeInTheDocument();
    fireEvent.click(no);
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("denied");
    expect(screen.queryByRole("region", { name: "Cookie notice" })).not.toBeInTheDocument();
    first.unmount();
    render(<CookieNotice gaEnabled />);
    expect(screen.queryByRole("region", { name: "Cookie notice" })).not.toBeInTheDocument();
  });

  it("stores 'granted' on Allow analytics", () => {
    render(<CookieNotice gaEnabled />);
    fireEvent.click(screen.getByRole("button", { name: "Allow analytics" }));
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("granted");
  });

  it("asks people who only dismissed the older informational card", () => {
    window.localStorage.setItem(DISMISSED_KEY, "1");
    render(<CookieNotice gaEnabled />);
    expect(screen.getByRole("button", { name: "Allow analytics" })).toBeInTheDocument();
  });

  it("does not ask when the browser sends Global Privacy Control", () => {
    Object.defineProperty(window.navigator, "globalPrivacyControl", {
      value: true,
      configurable: true,
    });
    render(<CookieNotice gaEnabled />);
    expect(screen.queryByRole("button", { name: "Allow analytics" })).not.toBeInTheDocument();
    expect(screen.getByText(/privacy signal is on/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Got it" })).toBeInTheDocument();
  });

  it("does not ask a signed-in browser, and links the privacy policy when it asks", () => {
    const first = render(<CookieNotice gaEnabled />);
    expect(screen.getByRole("link", { name: "Privacy policy" })).toHaveAttribute(
      "href",
      "/privacy"
    );
    first.unmount();
    document.cookie = "sb-testref-auth-token=x; path=/";
    render(<CookieNotice gaEnabled />);
    expect(screen.queryByRole("button", { name: "Allow analytics" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Got it" })).toBeInTheDocument();
    document.cookie = "sb-testref-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  });
});

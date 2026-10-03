"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  type AnalyticsConsent,
  hasBrowserPrivacySignal,
  readAnalyticsConsent,
  writeAnalyticsConsent,
} from "@/lib/googleAnalytics";
import { isGaBlockedContext } from "@/lib/gaContext";
import { isNativeApp } from "@/lib/platform";

// The one-time cookie notice, mounted once in the ROOT layout
// (src/app/layout.tsx) so every surface shows it exactly once - marketing
// pages, the homeowner app, the pro app and the closed-door pro page alike.
//
// TWO MODES, picked by `gaEnabled` (true only when
// NEXT_PUBLIC_GA_MEASUREMENT_ID holds a real GA4 id, see
// src/lib/googleAnalytics.ts):
//
// 1. gaEnabled false: INFORMATIONAL, NOT A CONSENT GATE. Every cookie OakTend
//    sets is first-party and functional, and the host's page-view counter is
//    cookieless, so there is nothing to choose. The card only tells you, and
//    goes away. Offering a toggle here would imply a choice with nothing on
//    the other side of it.
//
// 2. gaEnabled true: A REAL CHOICE for Google Analytics, which does set
//    cookies. Nothing from Google loads until "Allow analytics" is tapped
//    (src/components/GoogleAnalytics.tsx). The two buttons are styled the
//    same on purpose: California's rules on consent (CCPA regulations,
//    section 7004) ask for symmetry, so "no" must be as easy as "yes". A
//    browser that sends Global Privacy Control or Do Not Track gets the
//    informational card with one extra sentence instead: the signal already
//    answered the question, so we do not ask it.
//
// The functional-cookie sentence is the same in both modes, and the legal
// pages (src/content/legal/cookies.md, privacy.md) describe both.
//
// Modelled on PreviewNotice.tsx, including the starts-hidden-then-appears
// pattern and the try/catch discipline around storage; see the notes on each
// below.
const DISMISSED_KEY = "oaktend_cookie_notice_dismissed";

const FUNCTIONAL_TEXT =
  "We use cookies for sign-in, security, and fraud prevention. No ad cookies.";

type Mode = "info" | "signal" | "choice";

export default function CookieNotice({
  gaEnabled = false,
}: {
  gaEnabled?: boolean;
}) {
  // STARTS HIDDEN, then appears if the mount check says it should - same
  // reasoning as PreviewNotice: visibility depends on localStorage, which only
  // exists in the browser, so the server HTML cannot know the answer.
  // Rendering it and removing it would flash the card at everyone who already
  // dismissed it, on every navigation in the app.
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    // Inside the iOS/Android app shell: no card at all (2026-10-02). An app
    // does not show a web cookie bar, Google Analytics never runs in the
    // shell (GoogleAnalytics.tsx, isGaBlockedContext), and OakTend's own
    // cookies are first-party and functional, so there is nothing to ask and
    // nothing new to tell. The Cookie and Tracking Notice stays reachable
    // from the privacy policy and Your Privacy Choices. Browser tabs are
    // unchanged.
    if (isNativeApp()) return;
    // Signed in, or inside the iOS/Android app shell: Google Analytics never
    // runs there (GoogleAnalytics.tsx), so there is nothing to ask. Those
    // visitors get the plain informational card.
    const blocked = gaEnabled && isGaBlockedContext();
    if (gaEnabled && !blocked && !hasBrowserPrivacySignal()) {
      // Someone who already chose (here or on /cookies or /privacy-choices)
      // is not asked again. Everyone else is asked, including people who
      // dismissed the older informational card: that card never asked about
      // Google Analytics, so dismissing it was not an answer.
      if (readAnalyticsConsent() !== null) return;
      setMode("choice");
      return;
    }
    try {
      if (window.localStorage.getItem(DISMISSED_KEY) === "1") return;
    } catch {
      // Storage blocked (private window, cookies-and-site-data off). Show the
      // card: the safe direction to fail is TELLING somebody what cookies we
      // set, not hiding it because we could not read a flag.
    }
    setMode(gaEnabled && !blocked ? "signal" : "info");
  }, [gaEnabled]);

  function dismiss() {
    setMode(null);
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Worst case it comes back on the next load. Never a crash: this is a
      // notice, and a notice must not be able to take the page down.
    }
  }

  function choose(value: AnalyticsConsent) {
    writeAnalyticsConsent(value);
    dismiss();
  }

  if (mode === null) return null;

  return (
    <div
      // role="region", not "dialog" or "alertdialog": nothing is modal, focus
      // is not trapped, and the page behind stays fully usable.
      role="region"
      aria-label="Cookie notice"
      // Small floating card, bottom-right on desktop and a full-width strip
      // inside the 1rem gutters on a phone.
      //
      // THE BOTTOM OFFSET CLEARS THE MOBILE TAB BAR. Below lg both app shells
      // pin a fixed bottom nav that is 3.5rem of content plus the safe-area
      // inset (Nav.tsx and ProNav.tsx: `pb-[env(safe-area-inset-bottom)]` on a
      // `fixed inset-x-0 bottom-0` bar), and pro/layout.tsx's footer already
      // uses this exact expression to get out of its way. A plain bottom-4
      // would put this card on top of the tab bar on every phone. From lg up
      // the bar is gone (lg:hidden) and the card drops back to bottom-4.
      // Underscores, not spaces, inside the arbitrary value - Tailwind's
      // arbitrary-value syntax cannot contain literal spaces.
      className="fixed left-4 right-4 z-40 bottom-[calc(3.5rem_+_env(safe-area-inset-bottom)_+_1rem)] rounded-xl border border-stone-200 bg-white p-4 shadow-menu lg:bottom-4 sm:left-auto sm:right-6 sm:max-w-sm dark:border-white/10 dark:bg-stone-900"
    >
      <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        {FUNCTIONAL_TEXT}
        {mode === "choice" &&
          " If you allow it, we also use Google Analytics cookies on our public pages to see which pages help people. Never for ads."}
        {mode === "signal" &&
          " Your browser's privacy signal is on, so we keep Google Analytics off."}
      </p>
      {mode === "choice" ? (
        <>
          {/* Two equal buttons, same style and size, so saying no is as easy
              as saying yes. .btn already pins them to the 44px thumb floor;
              flex-1 splits the row evenly at every width. */}
          <div className="mt-3 flex gap-3">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="btn-secondary flex-1"
            >
              Only necessary
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="btn-secondary flex-1"
            >
              Allow analytics
            </button>
          </div>
          {/* Both notices one tap away at the point of the choice: the
              privacy policy holds the notice at collection. */}
          <div className="mt-2 flex flex-wrap gap-x-5">
            <Link
              href="/cookies"
              className="inline-flex min-h-11 items-center text-sm font-medium text-stone-600 underline hover:text-stone-700 dark:text-stone-300 dark:hover:text-stone-200"
            >
              Cookie notice
            </Link>
            <Link
              href="/privacy"
              className="inline-flex min-h-11 items-center text-sm font-medium text-stone-600 underline hover:text-stone-700 dark:text-stone-300 dark:hover:text-stone-200"
            >
              Privacy policy
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-3 flex items-center justify-between gap-3">
          <Link
            href="/cookies"
            className="text-sm font-medium text-stone-600 underline hover:text-stone-700 max-sm:inline-flex max-sm:min-h-11 max-sm:items-center dark:text-stone-300 dark:hover:text-stone-200"
          >
            Cookie notice
          </Link>
          {/* Plain .btn-primary, with no min-h of its own: .btn (globals.css)
              already pins every button in the app to min-h-[44px], the thumb
              floor this card needs on a phone, at every width. shrink-0 so the
              label never wraps next to the link on a narrow screen. */}
          <button type="button" onClick={dismiss} className="btn-primary shrink-0">
            Got it
          </button>
        </div>
      )}
    </div>
  );
}

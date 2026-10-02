"use client";

import { useEffect, useState } from "react";
import {
  ANALYTICS_CONSENT_EVENT,
  type AnalyticsConsent,
  hasBrowserPrivacySignal,
  readAnalyticsConsent,
  writeAnalyticsConsent,
} from "@/lib/googleAnalytics";

// The "change it later" control for Google Analytics, shown on /cookies and
// /privacy-choices. Only mounted when a measurement id is configured (see
// those pages): without one there is nothing to switch.
//
// Renders phrasing content only (spans and a button, no divs), because
// /cookies places it inside LegalDocument's `notice` paragraph.
export default function AnalyticsPreference() {
  // Starts unknown so the server HTML never claims a state it cannot know.
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [signal, setSignal] = useState(false);

  useEffect(() => {
    setConsent(readAnalyticsConsent());
    setSignal(hasBrowserPrivacySignal());
    setReady(true);
    function onCustom() {
      setConsent(readAnalyticsConsent());
    }
    window.addEventListener(ANALYTICS_CONSENT_EVENT, onCustom);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, onCustom);
  }, []);

  function choose(value: AnalyticsConsent) {
    writeAnalyticsConsent(value);
    setConsent(value);
  }

  if (!ready) {
    return (
      <span className="block text-sm text-stone-600 dark:text-stone-300" aria-busy="true">
        Checking your analytics setting...
      </span>
    );
  }

  if (signal) {
    return (
      <span className="block text-sm leading-relaxed" role="status">
        Analytics is off. Your browser sends a Global Privacy Control or Do Not Track
        signal, so we do not load Google Analytics on this browser.
      </span>
    );
  }

  const on = consent === "granted";
  return (
    <span className="flex flex-wrap items-center justify-between gap-3">
      <span className="text-sm leading-relaxed" role="status">
        {on
          ? "Analytics is on. You allowed Google Analytics cookies on our public pages."
          : "Analytics is off. We do not load Google Analytics on this browser."}
      </span>
      <button
        type="button"
        onClick={() => choose(on ? "denied" : "granted")}
        className="btn-secondary shrink-0"
      >
        {on ? "Turn off analytics" : "Allow analytics"}
      </button>
    </span>
  );
}

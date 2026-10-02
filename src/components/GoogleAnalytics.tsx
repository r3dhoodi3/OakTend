"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_CONSENT_KEY,
  GA_COOKIE_EXPIRES_SECONDS,
  type AnalyticsConsent,
  clearGaCookies,
  hasBrowserPrivacySignal,
  normalizeGaPath,
  readAnalyticsConsent,
  safeCampaignQuery,
  safeReferrer,
  validMeasurementId,
} from "@/lib/googleAnalytics";
import { isGaBlockedContext } from "@/lib/gaContext";

// Google Analytics 4 loader, mounted once in the root layout. The rules it
// follows are listed at the top of src/lib/googleAnalytics.ts. In short: it
// renders nothing and loads nothing unless a measurement id is configured,
// the visitor tapped "Allow analytics", the browser sends no GPC or Do Not
// Track signal, the browser holds no sign-in session, it is not the
// iOS/Android app shell, AND the current page is a public marketing page.
//
// WHY A HAND-ROLLED <script> AND NOT next/script: the tag must be injectable
// at an arbitrary moment (the instant someone taps Allow, possibly on their
// tenth page), must never be injected on most routes, and has to be switched
// back off on a revoke. next/script renders on mount and offers no unload, and
// its behavior under jsdom makes the consent tests below brittle. Building the
// dataLayer/gtag stub in bundled code also means no inline script is needed.

type Gtag = (...args: unknown[]) => void;
type GaWindow = Window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
  [disableFlag: `ga-disable-${string}`]: boolean | undefined;
};

const SCRIPT_ID = "oaktend-ga4";

// Module scope so it survives remounts: the previous page we reported, used
// as page_referrer on the next client-side navigation.
let lastLocation: string | null = null;
// Whether the last page we reported was a pro's page. On a client-side
// navigation away from one, document.title can still hold the pro's business
// name for a moment, so the next page's title falls back to its path.
let lastWasProPage = false;

type Scrubbed = { page_location: string; page_referrer: string; page_title: string };

function ensureGtag(id: string, page: Scrubbed): Gtag {
  const w = window as unknown as GaWindow;
  if (w.gtag && document.getElementById(SCRIPT_ID)) return w.gtag;
  w.dataLayer = w.dataLayer || [];
  const gtag: Gtag = function gtag() {
    // gtag.js requires the real `arguments` object, not an array copy.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag = gtag;

  // Consent Mode v2: everything denied by default. Only analytics_storage is
  // ever granted, and only because the visitor allowed it.
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  gtag("set", "ads_data_redaction", true);
  gtag("set", "allow_google_signals", false);
  gtag("set", "allow_ad_personalization_signals", false);
  // The cleaned page fields, set globally BEFORE the config call so even the
  // very first hits gtag.js sends on its own (session_start, first_visit,
  // user_engagement, any Enhanced Measurement event) carry them instead of
  // the raw browser URL, title and referrer.
  gtag("set", page);
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("js", new Date());
  gtag("config", id, {
    // Page views are sent by hand below, with a cleaned-up URL.
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...page,
    cookie_expires: GA_COOKIE_EXPIRES_SECONDS,
    cookie_flags: window.location.protocol === "https:" ? "SameSite=Lax;Secure" : "SameSite=Lax",
  });

  if (!document.getElementById(SCRIPT_ID)) {
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
  }
  return gtag;
}

function turnOff(id: string): void {
  const w = window as unknown as GaWindow;
  // Google's documented kill switch: gtag sends nothing for this id while set.
  w[`ga-disable-${id}`] = true;
  if (w.gtag) {
    w.gtag("consent", "update", { analytics_storage: "denied" });
  }
  clearGaCookies();
}

export default function GoogleAnalytics({
  measurementId,
}: {
  measurementId?: string | null;
}) {
  const id = validMeasurementId(measurementId);
  const pathname = usePathname();
  // null until the mount check runs: the server cannot know the choice, and
  // "not known yet" must mean "off".
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [signal, setSignal] = useState(false);
  // False until the stored choice has been read. The first render always has
  // consent === null, and acting on that would delete an allowed visitor's
  // _ga cookie on every full page load, making each visit a new visitor.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setConsent(readAnalyticsConsent());
    setSignal(hasBrowserPrivacySignal());
    setLoaded(true);
    function onChange() {
      setConsent(readAnalyticsConsent());
    }
    function onCustom(e: Event) {
      const v = (e as CustomEvent<AnalyticsConsent>).detail;
      setConsent(v === "granted" || v === "denied" ? v : readAnalyticsConsent());
    }
    function onStorage(e: StorageEvent) {
      if (e.key === null || e.key === ANALYTICS_CONSENT_KEY) onChange();
    }
    window.addEventListener(ANALYTICS_CONSENT_EVENT, onCustom);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, [id]);

  useEffect(() => {
    if (!id || !loaded) return;
    const w = window as unknown as GaWindow;
    const allowed = consent === "granted" && !signal;
    // Signed in (any session cookie) or inside the iOS/Android app shell:
    // never, whatever the stored choice. Checked on every navigation, so a
    // sign-in partway through a visit switches it off from the next page.
    const blocked = isGaBlockedContext();
    if (!allowed || blocked) {
      // Clears any _ga cookie left over (for example from an earlier "allow"
      // whose stored choice was since cleared) and, if gtag ever loaded in
      // this page's life, switches it off.
      turnOff(id);
      return;
    }
    const path = normalizeGaPath(pathname);
    // Off on every page that is not a public marketing page, including after
    // a client-side navigation from one into the app.
    w[`ga-disable-${id}`] = path === null;
    if (path === null) return;

    const origin = window.location.origin;
    const isProPage = path === "/p/[id]";
    const page: Scrubbed = {
      page_location: `${origin}${path}${safeCampaignQuery(window.location.search)}`,
      page_referrer: lastLocation ?? safeReferrer(document.referrer, origin),
      // A pro page's title carries the business name; send the template.
      page_title: isProPage ? "Pro page" : lastWasProPage ? path : document.title,
    };
    const gtag = ensureGtag(id, page);
    // Re-set on every page so every later hit on this page uses these values.
    gtag("set", page);
    gtag("event", "page_view", { send_to: id, ...page });
    lastLocation = `${origin}${path}`;
    lastWasProPage = isProPage;
  }, [id, loaded, consent, signal, pathname]);

  return null;
}

// Test-only reset of module state.
export function __resetGoogleAnalyticsForTests(): void {
  lastLocation = null;
  lastWasProPage = false;
}

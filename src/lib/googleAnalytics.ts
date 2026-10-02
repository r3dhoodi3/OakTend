// Google Analytics 4, privacy-safe. Everything here is pure or browser-only
// helpers used by src/components/GoogleAnalytics.tsx (the loader),
// src/components/CookieNotice.tsx (the banner) and
// src/components/AnalyticsPreference.tsx (the "change it later" control on
// /cookies and /privacy-choices).
//
// THE RULES THIS FILE ENFORCES, and the legal pages promise:
//   1. Inert unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set to a real "G-..." id.
//   2. Nothing from Google loads until the visitor taps "Allow analytics".
//      Consent Mode v2 defaults are all denied; only analytics_storage is ever
//      granted. The ad signals stay denied forever.
//   3. Global Privacy Control or Do Not Track in the browser is an opt-out
//      that wins over a stored "allow".
//   4. Public marketing pages only. Nothing inside the signed-in app, the
//      auth flows, invites, or any route that could carry a token or an
//      address is ever sent. See GA_TRACKED_EXACT / GA_TRACKED_PREFIXES.
//   5. No query strings (except clean utm_* campaign tags), no hashes, no
//      user id, no email, no address. Dynamic segments are replaced with a
//      placeholder before anything leaves the browser. The cleaned location,
//      referrer and title are applied with gtag("set") so EVERY hit carries
//      them (session_start, user_engagement, any Enhanced Measurement event),
//      not just the page_view we send by hand.
//   6. Never for a browser that holds a sign-in session, and never inside the
//      iOS/Android app shell. See isGaBlockedContext.

import { hasAuthCookie } from "@/lib/authCookie";

export type AnalyticsConsent = "granted" | "denied";

export const ANALYTICS_CONSENT_KEY = "oaktend_analytics_consent";
// Same-tab broadcast so the loader reacts the moment the banner or the
// preference control changes the choice. Other tabs hear the "storage" event.
export const ANALYTICS_CONSENT_EVENT = "oaktend:analytics-consent";

// 13 months, in seconds. Shorter than Google's 2-year default; the cookie
// notice states this number, so change both together.
export const GA_COOKIE_EXPIRES_SECONDS = 60 * 60 * 24 * 395;

const MEASUREMENT_ID_RE = /^G-[A-Z0-9]{4,20}$/;

/** The configured id, or null when it is unset or not a well-formed GA4 id. */
export function validMeasurementId(raw: string | null | undefined): string | null {
  const id = (raw ?? "").trim().toUpperCase();
  return MEASUREMENT_ID_RE.test(id) ? id : null;
}

/** Read at build time (NEXT_PUBLIC_ is inlined). Null means GA is off. */
export function gaMeasurementIdFromEnv(): string | null {
  return validMeasurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const v = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    // Storage blocked: treat as "no choice yet", which means analytics off.
    return null;
  }
}

export function writeAnalyticsConsent(value: AnalyticsConsent): void {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    // Storage blocked: the choice still applies to this page view through
    // the event below, it just will not be remembered.
  }
  try {
    window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: value }));
  } catch {
    // Never let a preference write take the page down.
  }
}

type PrivacyNavigator = {
  globalPrivacyControl?: boolean;
  doNotTrack?: string | null;
  msDoNotTrack?: string | null;
};

/** True when the browser sends Global Privacy Control or Do Not Track. */
export function hasBrowserPrivacySignal(
  nav: PrivacyNavigator | undefined = typeof navigator === "undefined"
    ? undefined
    : (navigator as unknown as PrivacyNavigator),
  win: { doNotTrack?: string | null } | undefined = typeof window === "undefined"
    ? undefined
    : (window as unknown as { doNotTrack?: string | null })
): boolean {
  if (!nav) return false;
  if (nav.globalPrivacyControl === true) return true;
  if (nav.doNotTrack === "1" || nav.doNotTrack === "yes") return true;
  if (nav.msDoNotTrack === "1") return true;
  if (win?.doNotTrack === "1") return true;
  return false;
}

// Public marketing and legal pages. Exact paths only unless listed as a
// prefix below. Deliberately NOT here: everything in the (app) route group,
// /pro (the pro app; /pros is the public landing page), /signin,
// /reset-password, /verify, /auth, /join (invite tokens), /open, /welcome,
// /onboarding, /unsubscribe, /go (referral redirects) and /api.
const GA_TRACKED_EXACT = new Set<string>([
  "/",
  "/pros",
  "/pricing",
  "/about",
  "/contact",
  "/home-maintenance-app",
  "/emergency-help",
  "/fountain-valley",
  "/huntington-beach",
  "/oc",
  "/guides",
  "/homeowner-signup",
  "/contractor-signup",
  "/privacy",
  "/privacy-choices",
  "/terms",
  "/pro-terms",
  "/pro-data-addendum",
  "/cookies",
  "/subprocessors",
  "/billing",
  "/sms-terms",
  "/ai-disclosure",
  "/accessibility",
  "/dmca",
  "/guidelines",
  "/security",
  "/law-enforcement",
]);

// Static content trees. Every page under these is the same for every visitor.
const GA_TRACKED_PREFIXES = ["/guides/", "/oc/", "/pricing/", "/emergency-help/"];

// A pro's public page, /p/<id>. Tracked, but the id never leaves the browser.
const PRO_PAGE_RE = /^\/p\/[^/]+\/?$/;

function trimTrailingSlash(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

/**
 * The path as GA may see it, or null when this page must never be sent.
 * Strips any query or hash defensively even though usePathname has none.
 */
export function normalizeGaPath(pathname: string | null | undefined): string | null {
  if (!pathname) return null;
  const bare = pathname.split(/[?#]/)[0] ?? "";
  if (!bare.startsWith("/")) return null;
  const path = trimTrailingSlash(bare);
  if (PRO_PAGE_RE.test(path)) return "/p/[id]";
  if (GA_TRACKED_EXACT.has(path)) return path;
  if (GA_TRACKED_PREFIXES.some((p) => path.startsWith(p))) {
    // Only plain slug segments. Anything odd (encoded characters, an "@",
    // digits that look like a street number plus a street) is not a page we
    // publish, so it is not sent.
    return /^[a-z0-9/-]+$/.test(path) ? path : null;
  }
  return null;
}

export function isGaTrackedPath(pathname: string | null | undefined): boolean {
  return normalizeGaPath(pathname) !== null;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

/** Keeps only clean utm_* campaign tags; every other query parameter is dropped. */
export function safeCampaignQuery(search: string | null | undefined): string {
  if (!search) return "";
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search);
  } catch {
    return "";
  }
  const kept = new URLSearchParams();
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v && /^[A-Za-z0-9._-]{1,100}$/.test(v)) kept.set(key, v);
  }
  const out = kept.toString();
  return out ? `?${out}` : "";
}

/**
 * The referrer as GA may see it: our own pages normalized (or reduced to the
 * bare origin when the page is not one we track), any other site reduced to
 * its origin, so a search query or a token in someone else's URL never rides
 * along.
 */
export function safeReferrer(referrer: string | null | undefined, ownOrigin: string): string {
  if (!referrer) return "";
  let url: URL;
  try {
    url = new URL(referrer);
  } catch {
    return "";
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return "";
  if (url.origin === ownOrigin) {
    const path = normalizeGaPath(url.pathname);
    return path ? `${url.origin}${path}` : `${url.origin}/`;
  }
  return `${url.origin}/`;
}

/** Deletes Google Analytics cookies (_ga, _ga_<id>) on this host and its parents. */
export function clearGaCookies(): void {
  if (typeof document === "undefined") return;
  let names: string[] = [];
  try {
    names = document.cookie
      .split(";")
      .map((c) => c.split("=")[0]?.trim() ?? "")
      .filter((n) => n === "_ga" || n.startsWith("_ga_") || n === "_gid" || n === "_gat");
  } catch {
    return;
  }
  if (names.length === 0) return;
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains: (string | null)[] = [null];
  for (let i = 0; i < parts.length - 1; i++) {
    domains.push(parts.slice(i).join("."));
  }
  for (const name of names) {
    for (const domain of domains) {
      const domainPart = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}`;
    }
  }
}

/** Cookie names from a document.cookie string. */
function cookieNames(cookieString: string): { name: string }[] {
  return cookieString
    .split(";")
    .map((c) => ({ name: c.split("=")[0]?.trim() ?? "" }))
    .filter((c) => c.name !== "");
}

/**
 * True when this browser holds a Supabase session cookie (any
 * sb-<ref>-auth-token, readable by page script because @supabase/ssr does not
 * mark it httpOnly). Used only in the conservative direction: any session
 * cookie at all, even an expired one, keeps Google Analytics off.
 */
export function hasSessionCookie(cookieString: string | null | undefined): boolean {
  if (!cookieString) return false;
  return hasAuthCookie(cookieNames(cookieString));
}

"use client";

import { isNativeApp } from "@/lib/platform";
import { hasSessionCookie } from "@/lib/googleAnalytics";

// Kept apart from src/lib/googleAnalytics.ts because src/lib/platform.ts is a
// client module, and googleAnalytics.ts is also imported by server components
// (the root layout and /cookies read the measurement id there).

/**
 * Contexts where Google Analytics never runs and the banner does not ask about
 * it: the Capacitor iOS/Android app shell, and any browser holding a sign-in
 * session cookie. Re-checked on every navigation, so signing in turns it off.
 */
export function isGaBlockedContext(): boolean {
  if (typeof window === "undefined") return true;
  if (isNativeApp()) return true;
  try {
    return hasSessionCookie(document.cookie);
  } catch {
    return true;
  }
}

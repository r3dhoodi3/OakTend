import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import AnalyticsPreference from "@/components/AnalyticsPreference";
import { gaMeasurementIdFromEnv } from "@/lib/googleAnalytics";

// Public top-level page, same pattern as src/app/terms/page.tsx: see
// src/lib/supabase/middleware.ts for the allowlist entry and
// src/app/sitemap.ts for the sitemap entry. Content lives in
// src/content/legal/cookies.md, rendered by LegalDocument.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Cookie and Tracking Notice",
  description:
    "The first-party cookies OakTend sets, the optional Google Analytics cookies and how to turn them off, and what's kept only in your browser's local storage. No ad trackers.",
  alternates: {
    canonical: `${SITE_URL}/cookies`,
  },
};

export default function CookiesPage() {
  // The analytics on/off control sits right under the title, so "how do I
  // change my answer" is answered before the reader scrolls. Only when GA is
  // configured: without an id there is nothing to switch.
  return (
    <LegalDocument
      slug="cookies"
      notice={gaMeasurementIdFromEnv() ? <AnalyticsPreference /> : undefined}
    />
  );
}

import type { Metadata } from "next";
import CityLandingPage, {
  buildCityServiceJsonLd,
  cityPageCopy,
} from "@/components/CityLandingPage";
import { cityMetaTitle, getCityContent } from "@/content/cities";

// Top-level city landing page for local SEO ("home maintenance Fountain
// Valley" type queries) and as the link target for Nextdoor/chamber
// citations. Follows the same public-page pattern as src/app/guides/: see
// src/lib/supabase/middleware.ts for the allowlist entry and
// src/app/sitemap.ts for the sitemap entry. Shell and value props live in
// CityLandingPage (shared with /huntington-beach); only the housing-stock
// paragraph is city-specific.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker). Nothing in this page or in CityLandingPage reads
// cookies(), headers(), searchParams or the database any more: the
// session-aware header and hero CTAs moved to the browser
// (src/components/SessionCta.tsx), as did the closing GuideCta, so this page
// is prerendered once and served from the edge cache. As on /pricing, the
// explicit revalidate is a marker rather than a requirement - it makes the
// static intent visible in `next build` output and gives a future data read
// ISR instead of silently dropping the route back to per-request rendering.
// Anything added here that reads cookies()/headers()/searchParams undoes it.
export const revalidate = 3600;

// Title and description come from cityPageCopy (src/components/
// CityLandingPage.tsx), the same function the page body reads its h1 from, so
// the tab, the search snippet, the share cards and the headline all say one
// thing. It is also where the preview-mode wording lives: during the preview
// these stop promising available pros (src/lib/previewMode.ts).
const COPY = cityPageCopy("Fountain Valley");
const CANONICAL = `${SITE_URL}/fountain-valley`;

// Real, sourced local content for this city when it exists
// (src/content/cities). Undefined is a supported state, not a bug: the
// page then renders the hand-written paragraph below exactly as it did
// before the content module existed.
const CONTENT = getCityContent("fountain-valley");

// A researched city describes itself in its own words; those descriptions
// are local facts only and say nothing about pros, so they are safe with the
// preview flag on or off. One constant so the search snippet and both share
// cards cannot drift apart.
const DESCRIPTION = CONTENT?.metaDescription ?? COPY.description;

// Same rule for the title: the city's own metaTitle when it has one, otherwise
// the shared COPY.title. Used for the tab and both share cards.
const TITLE = cityMetaTitle("fountain-valley", COPY.title);

export const metadata: Metadata = {
  // The root layout's title template appends "| OakTend"; don't repeat it here.
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  // This page had no openGraph/twitter block at all, so a link to it in a
  // text message, a Nextdoor post or a chamber listing fell back to the root
  // layout's generic site-wide card - the same preview for all 36 city pages.
  // Same shape /pricing and the guides use.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "OakTend",
    type: "website",
    locale: "en_US",
    // og:image is NOT set here on purpose. Next's file convention already
    // supplies one: src/app/opengraph-image.tsx is the root segment's image
    // and nested segments inherit it, with the content-hashed URL Next
    // generates at build time. Hard-coding "/opengraph-image" here would
    // override that with a path that is not what the route is actually
    // served at.
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const HOUSING_PARAGRAPH =
  "Fountain Valley is mostly single-family tract homes built in the 1960s and 1970s, so a lot of the housing stock is now 50-plus years old, with original plumbing runs and systems well into or past their expected lifespan.";

export default function FountainValleyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCityServiceJsonLd("Fountain Valley", SITE_URL, "/fountain-valley")
          ).replace(/</g, "\\u003c"),
        }}
      />
      {/* The FAQPage markup lives next to the FAQ itself, and the
          BreadcrumbList next to the visible trail, both inside
          CityLandingPage. */}
      <CityLandingPage
        city="Fountain Valley"
        path="/fountain-valley"
        housingParagraph={HOUSING_PARAGRAPH}
        content={CONTENT}
      />
    </>
  );
}

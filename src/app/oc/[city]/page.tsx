import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityLandingPage, {
  buildCityServiceJsonLd,
  cityPageCopy,
} from "@/components/CityLandingPage";
import { LAUNCH_CITY_NAMES } from "@/lib/serviceArea";

// Generic city landing page for every Orange County launch city EXCEPT
// Fountain Valley and Huntington Beach, which keep their own hand-written
// pages (src/app/fountain-valley, src/app/huntington-beach) with a
// city-specific housing-stock paragraph. Those two were the marketing launch
// order, never a product boundary (founder rule, 2026-09-16) - this route
// gives the other 34 cities/communities in LAUNCH_CITY_NAMES
// (src/lib/serviceArea.ts) the same real page, with one honest paragraph
// about Orange County housing stock in general rather than an invented fact
// about any one city. Shell and value props are the same CityLandingPage
// component the two hand-written pages use, so all three families of city
// pages can never structurally drift apart.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Must not shadow the two hand-written pages, or the same city would answer
// at two different URLs with two different paragraphs.
const HAND_WRITTEN_CITIES = new Set(["Fountain Valley", "Huntington Beach"]);

function slugFor(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-");
}

// Every OC city name is plain ASCII words (see src/lib/serviceArea.test.ts),
// so a lowercase-and-hyphenate slug round-trips cleanly with no collisions -
// verified again by generateStaticParams below being 1:1 with this list.
const DYNAMIC_CITIES = LAUNCH_CITY_NAMES.filter(
  (city) => !HAND_WRITTEN_CITIES.has(city)
);

const CITY_BY_SLUG = new Map(
  DYNAMIC_CITIES.map((city) => [slugFor(city), city])
);

// One honest, county-wide paragraph rather than a per-city fact this team
// has not verified. Same two themes the hand-written pages use (inland tract
// age, coastal wear), stated generally instead of pinned to one city's
// history.
const HOUSING_PARAGRAPH =
  "Orange County's housing stock splits two ways: a lot of inland tract housing built in the 1950s through 1970s, now with original plumbing, electrical, and roofing well into or past their expected lifespan, and homes nearer the coast that face extra wear on paint, metal fixtures, and roofing from salt air on top of their age. Either way, what to check first depends on how old your home is and how close it sits to the water.";

// STATIC. Same reasoning as /fountain-valley and /huntington-beach: nothing
// here reads cookies(), headers(), searchParams, or the database - the
// session-aware header and CTAs live in SessionCta.tsx - so every one of the
// 34 pages below prerenders once and serves from the edge cache.
export const revalidate = 3600;

export function generateStaticParams() {
  return DYNAMIC_CITIES.map((city) => ({ city: slugFor(city) }));
}

export async function generateMetadata(props: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await props.params;
  const city = CITY_BY_SLUG.get(slug);
  if (!city) return {};
  // Same cityPageCopy() the page body reads its h1 from, and the same one the
  // two hand-written city pages use - so all 36 pages say one thing, and the
  // preview-mode wording (src/lib/previewMode.ts) applies to all 36 at once
  // instead of being re-typed per route.
  const copy = cityPageCopy(city);
  const canonical = `${SITE_URL}/oc/${slug}`;
  return {
    // The root layout's title template appends "| OakTend"; don't repeat it.
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
    },
    // These 34 pages had no openGraph/twitter block, so every one of them
    // shared the root layout's generic site-wide share card. Same shape
    // /pricing and the guides use.
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: canonical,
      siteName: "OakTend",
      type: "website",
      locale: "en_US",
      // og:image is NOT set here on purpose - see the note on
      // src/app/fountain-valley/page.tsx. Next's file convention inherits
      // src/app/opengraph-image.tsx down to this segment with the
      // content-hashed URL it actually serves.
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function DynamicCityPage(props: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await props.params;
  const city = CITY_BY_SLUG.get(slug);
  if (!city) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCityServiceJsonLd(city, SITE_URL, `/oc/${slug}`)
          ).replace(/</g, "\\u003c"),
        }}
      />
      <CityLandingPage city={city} housingParagraph={HOUSING_PARAGRAPH} />
    </>
  );
}

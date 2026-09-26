// The shape of a real, sourced city landing page.
//
// WHY THIS EXISTS. The 36 city pages (src/app/fountain-valley,
// src/app/huntington-beach, and the 34 under src/app/oc/[city]) all render
// src/components/CityLandingPage.tsx with one swapped paragraph. An SEO audit
// (OakTend-marketing/reports-2026-09-16/seo-audit-2026-09-16.md) called that
// what it is: a doorway-page pattern, 36 pages acting as one page in disguise.
// The fix is not fewer pages or thinner pages, it is substantively different,
// locally sourced content per city.
//
// THE RULE THIS TYPE ENFORCES BY SHAPE: every fact carries its own source URL.
// There is no free-text field on this type where an unsourced statistic can
// hide. If a number cannot be cited, it does not go on the page; the honest
// alternative ("this is the same across all of Orange County") is written out
// in prose instead of a fake local variation. See section 2 of
// OakTend-marketing/reports-2026-09-16/seo-research-city-pages.md.
//
// Cities WITHOUT an entry keep rendering exactly what they render today. The
// component takes content as an optional prop precisely so the cities that
// have not been researched yet are untouched until they are. (All 36 launch
// names have an entry as of the fourth wave, 2026-09-20; the prop stays
// optional for any name added to the launch list later.)

// How close the city sits to the water, which decides what maintenance advice
// is honest there. Coastal cities get salt-air wear; inland and foothill
// cities get heat and Santa Ana wind instead. Never claim both.
export type CityExposure = "coastal" | "near-coastal" | "inland" | "foothill";

// One citable claim. sourceLabel is what the reader sees ("Census QuickFacts",
// "City of Santa Ana"), sourceUrl is where it came from. Both required: a fact
// with no source is the thing this whole module exists to prevent.
export type Fact = {
  text: string;
  sourceUrl: string;
  sourceLabel: string;
};

export type CityContent = {
  // Display name, exactly as it appears in LAUNCH_CITY_NAMES
  // (src/lib/serviceArea.ts).
  name: string;
  // Lowercased, spaces to hyphens. Same rule as slugFor() in
  // src/app/oc/[city]/page.tsx, and the key this entry sits under in
  // ./index.ts.
  slug: string;
  // 2 to 4 sentences, unique to this city. Replaces the shared housing-stock
  // paragraph in the hero. This is the paragraph that has to be impossible to
  // rewrite for a different city by swapping the name.
  intro: string;
  // Unique, under 160 characters, no city-name-swap templating.
  metaDescription: string;
  // The page's <title> (also the OG and Twitter title). Optional: a city
  // without one keeps the shared title from src/lib/cityCopy.ts. Leads with
  // the city name and the real local hook, local facts only (no word about
  // pros, so it is safe with the preview flag on or off), and at most 50
  // characters because the root layout appends " | OakTend".
  metaTitle?: string;

  population: {
    value: string;
    asOf: string;
    sourceUrl: string;
    // What the reader sees on the source link. Optional: when absent the page
    // says "U.S. Census Bureau", which is only truthful for a census.gov URL.
    // A city that links to Census Reporter or another republisher of Census
    // data has to say so here.
    sourceLabel?: string;
  };

  homes: {
    exposure: CityExposure;
    medianYearBuilt?: string;
    // Where medianYearBuilt came from (ACS table B25035 in practice). Optional
    // so older entries still compile, but a printed year with no source under
    // it is the thing this module exists to prevent, so set it whenever
    // medianYearBuilt is set.
    medianYearBuiltSource?: { sourceUrl: string; sourceLabel: string };
    facts: Fact[];
  };

  neighborhoods: {
    // Real names locals use, not invented real-estate marketing labels.
    names: string[];
    note: string;
    sourceUrl: string;
  };

  water: {
    utility: string;
    utilityUrl: string;
    summary: string;
    sourceUrl: string;
    // Label for the source link. Optional: when absent the page says "Water
    // quality report", so set this whenever sourceUrl is anything other than
    // an actual water quality report.
    sourceLabel?: string;
  };

  permits: {
    office: string;
    portalUrl: string;
    summary: string;
    sourceUrl: string;
  };

  // Wildfire zone, Mello-Roos, flood, liquefaction, soil. May be empty for a
  // city where none of it is true; an empty list is better than an invented
  // hazard.
  hazards: Fact[];

  // 2 to 4, matched to this city's actual profile rather than a fixed four:
  // the Orange County maintenance checklist everywhere, plus the 2 or 3 guides the
  // city's housing age, water and exposure actually call for. hrefs must
  // resolve to a real folder under src/app/guides.
  guides: { href: string; title: string; blurb: string }[];

  // 2 to 4 slugs of cities that genuinely border this one or sit next door
  // (hub-and-spoke internal linking). cities.test.ts checks that every slug is
  // a launch city and that every city is linked from at least one neighbor.
  neighbors: string[];

  // 4 to 6. Real questions, honest answers, marked up as FAQPage JSON-LD.
  faq: { q: string; a: string }[];

  // When the facts above were last checked against their sources.
  updated: string;
};

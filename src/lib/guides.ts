// THE ONE SOURCE OF TRUTH FOR GUIDE DATES.
//
// Three places need to agree on when a guide was published and when it last
// really changed:
//
//   1. the Article JSON-LD on the guide itself
//      (src/components/GuideArticleJsonLd.tsx),
//   2. the <lastmod> the sitemap emits for that URL (src/app/sitemap.ts),
//   3. anything that ever shows a visible "Updated" line on a guide.
//
// A date that disagrees between those three is worse than no date at all:
// Google treats a lastmod it can't corroborate against the page as noise and
// starts ignoring the whole sitemap's dates. So they all read this map.
//
// HARD-CODED, NOT COMPUTED. The honest source for "when did this content
// change" is git history, but a build cannot shell out to git (Vercel builds
// from a shallow clone, and a sitemap route would be running `git log` per
// request). So the dates below were read out of git once, by hand, and
// written down:
//
//   datePublished  git log --diff-filter=A --format=%cs -- <guide path>
//   dateModified   git log -1 --format=%cs -- <guide path>
//
// WHEN YOU EDIT A GUIDE: bump its dateModified here in the same change, but
// only if the words actually changed. A refactor, a class rename, or a
// dependency bump is not a content change, and claiming it is teaches
// crawlers to distrust every date on the site.
//
// WHEN YOU ADD A GUIDE: add it to GUIDE_PATHS below, to GUIDES in
// src/app/guides/page.tsx, and to this map. src/lib/guides.test.ts fails if
// any of the three drifts from the others.
//
// %cs (committer date, short) is deliberate: it is the date in the repo's own
// history, already in the YYYY-MM-DD shape schema.org and the sitemap spec
// both accept, with no timezone to get wrong.

export type GuideDates = {
  /** ISO YYYY-MM-DD. The commit that first added the page. */
  datePublished: string;
  /** ISO YYYY-MM-DD. The last commit that changed its words. */
  dateModified: string;
};

// Every URL under /guides that the sitemap lists, in the order it lists them.
// The index first, then the 12 guides in the order GUIDES renders them on
// src/app/guides/page.tsx.
export const GUIDE_PATHS = [
  "/guides",
  "/guides/water-heater-replacement-cost",
  "/guides/hvac-replacement-cost",
  "/guides/roof-replacement-cost",
  "/guides/electrical-panel-upgrade-cost",
  "/guides/kitchen-remodel-cost",
  "/guides/bathroom-remodel-cost",
  "/guides/adu-cost",
  "/guides/slab-leak-signs",
  "/guides/home-maintenance-schedule",
  "/guides/is-my-contractor-quote-fair",
  "/guides/contractor-deposit-rules-california",
  "/guides/socal-home-maintenance-calendar",
  "/guides/permits-orange-county",
  "/guides/hard-water-orange-county",
  "/guides/slab-leak-repair-orange-county",
  "/guides/repipe-orange-county",
  "/guides/termites-orange-county",
  "/guides/santa-ana-wind-wildfire-home-prep",
  "/guides/new-homeowner-first-year-orange-county",
  "/guides/orange-county-home-maintenance-checklist",
] as const;

// The short link text for each guide, for anywhere that links to guides from
// outside the index: the landing page's guide list, the /oc hub, and the
// related-guides block on every guide (src/components/GuideRelated.tsx). Same
// titles the index cards use (GUIDES in src/app/guides/page.tsx), and
// src/lib/guides.test.ts fails if the two drift or a guide is missing here.
// "/guides" itself is not in this map: it is the index, not a guide.
export const GUIDE_TITLES: Record<string, string> = {
  "/guides/water-heater-replacement-cost": "Water heater replacement cost",
  "/guides/hvac-replacement-cost": "HVAC replacement cost",
  "/guides/roof-replacement-cost": "Roof replacement cost",
  "/guides/electrical-panel-upgrade-cost": "Electrical panel upgrade cost",
  "/guides/kitchen-remodel-cost": "Kitchen remodel cost",
  "/guides/bathroom-remodel-cost": "Bathroom remodel cost",
  "/guides/adu-cost": "ADU cost",
  "/guides/slab-leak-signs": "Slab leak signs",
  "/guides/home-maintenance-schedule": "Home maintenance schedule",
  "/guides/is-my-contractor-quote-fair": "Is my contractor's quote fair?",
  "/guides/contractor-deposit-rules-california":
    "How much can a contractor ask for up front?",
  "/guides/socal-home-maintenance-calendar": "SoCal home maintenance calendar",
  "/guides/permits-orange-county": "Building permits in Orange County",
  "/guides/hard-water-orange-county": "Hard water in Orange County",
  "/guides/slab-leak-repair-orange-county": "Slab leak repair in Orange County",
  "/guides/repipe-orange-county": "Repiping a house in Orange County",
  "/guides/termites-orange-county": "Termites in Orange County",
  "/guides/santa-ana-wind-wildfire-home-prep":
    "Santa Ana wind and wildfire prep",
  "/guides/new-homeowner-first-year-orange-county": "New homeowner checklist",
  "/guides/orange-county-home-maintenance-checklist":
    "Orange County home maintenance checklist",
};

// The guides as { href, title } in GUIDE_PATHS order, index excluded.
export const GUIDE_LINKS: { href: string; title: string }[] = GUIDE_PATHS.filter(
  (path) => path !== "/guides"
).map((path) => ({ href: path, title: GUIDE_TITLES[path] }));

// "/guides" is in here too, even though the index is a list rather than an
// Article: the sitemap needs a lastmod for it like every other URL, and its
// own page file has a real history to read one from. Nothing renders Article
// JSON-LD for it.
export const GUIDE_DATES: Record<string, GuideDates> = {
  "/guides": { datePublished: "2026-07-07", dateModified: "2026-09-21" },
  "/guides/water-heater-replacement-cost": {
    datePublished: "2026-07-07",
    dateModified: "2026-09-21",
  },
  "/guides/hvac-replacement-cost": {
    datePublished: "2026-07-07",
    dateModified: "2026-09-21",
  },
  "/guides/roof-replacement-cost": {
    datePublished: "2026-07-25",
    dateModified: "2026-09-21",
  },
  "/guides/electrical-panel-upgrade-cost": {
    datePublished: "2026-07-25",
    dateModified: "2026-09-21",
  },
  "/guides/kitchen-remodel-cost": {
    datePublished: "2026-07-25",
    dateModified: "2026-09-21",
  },
  "/guides/bathroom-remodel-cost": {
    datePublished: "2026-07-25",
    dateModified: "2026-09-21",
  },
  "/guides/adu-cost": {
    datePublished: "2026-07-25",
    dateModified: "2026-09-21",
  },
  "/guides/slab-leak-signs": {
    datePublished: "2026-07-07",
    dateModified: "2026-09-21",
  },
  "/guides/home-maintenance-schedule": {
    datePublished: "2026-07-07",
    dateModified: "2026-09-21",
  },
  "/guides/is-my-contractor-quote-fair": {
    datePublished: "2026-07-07",
    dateModified: "2026-09-21",
  },
  "/guides/contractor-deposit-rules-california": {
    datePublished: "2026-07-25",
    dateModified: "2026-09-21",
  },
  "/guides/socal-home-maintenance-calendar": {
    datePublished: "2026-07-07",
    dateModified: "2026-09-21",
  },
  "/guides/permits-orange-county": {
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  "/guides/hard-water-orange-county": {
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  "/guides/slab-leak-repair-orange-county": {
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  "/guides/repipe-orange-county": {
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  "/guides/termites-orange-county": {
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  "/guides/santa-ana-wind-wildfire-home-prep": {
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  "/guides/new-homeowner-first-year-orange-county": {
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  "/guides/orange-county-home-maintenance-checklist": {
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
};

// Dates for one guide path, or null if it has none. Null rather than a
// fallback to today's date on purpose: a caller that cannot find a real date
// should omit the field (an absent lastmod is a crawler's cue to work it out
// itself; a wrong one is a lie it will eventually stop believing).
export function guideDates(path: string): GuideDates | null {
  return GUIDE_DATES[path] ?? null;
}

// The Article node for one guide. Kept here rather than in the component so
// the shape is testable without a DOM, and so the date fields can't be wired
// to anything but the map above.
//
// author AND publisher both point at the same Organization node the root
// layout already emits (src/app/layout.tsx, @id <site>#organization): OakTend
// writes these guides itself, there is no per-guide byline, and inventing one
// would be worse than being honest that the company is the author. The @id
// reference means this does not become a second, competing description of the
// business - it points at the one that already exists.
export function buildGuideArticleJsonLd({
  path,
  headline,
  description,
  siteUrl,
}: {
  path: string;
  headline: string;
  description: string;
  siteUrl: string;
}): Record<string, unknown> | null {
  const dates = guideDates(path);
  if (!dates) return null;
  const url = `${siteUrl}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished: dates.datePublished,
    dateModified: dates.dateModified,
    author: {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "OakTend",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "OakTend",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon-512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
}

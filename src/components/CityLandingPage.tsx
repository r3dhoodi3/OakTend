import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import Logo from "@/components/Logo";
import SessionCta from "@/components/SessionCta";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import type { CityContent, CityExposure } from "@/content/cities/types";
import { LAUNCH_AREA_LABEL, LAUNCH_CITY_NAMES } from "@/lib/serviceArea";
import { cityPageCopy } from "@/lib/cityCopy";
import {
  isHomeownerPreview,
  PREVIEW_CITY_PROS_CARD_BODY,
  PREVIEW_CITY_PROS_CARD_TITLE,
} from "@/lib/previewMode";
import { ClipboardList, MessageSquare, Wrench, Gift } from "lucide-react";

// Shared shell for the two city landing pages (src/app/fountain-valley,
// src/app/huntington-beach): same structure and same value-prop cards, only
// the housing-stock paragraph and city name differ. Kept as one component
// rather than duplicated JSX so the two pages can't drift out of sync, the
// same way GuideCta is shared across the /guides pages.
//
// Schema.org: Service, not LocalBusiness. OakTend is an online service with
// no physical storefront in either city (the pros it connects homeowners to
// are the local businesses); claiming LocalBusiness here would be the same
// kind of overreach the /p/[id] pro pages explicitly avoid for a pro's own
// site. Service + areaServed is the honest match for "software available to
// homeowners in this city."
//
// Session-aware header/hero CTA: same reasoning as src/app/guides/layout.tsx
// - a signed-in visitor shouldn't be pitched "get started free" again.
//
// BOTH CITY PAGES ARE NOW STATIC. This component used to call
// supabase.auth.getUser() here, and <GuideCta /> below read the session again,
// which is what kept /fountain-valley and /huntington-beach off static
// generation. The old note in this spot named the fix - "a small client
// component that resolves the session in the browser and renders the CTA, used
// here and in GuideCta" - and that component now exists
// (src/components/SessionCta.tsx, which GuideCta shares). Both CTAs below are
// it, nothing in this tree reads cookies() or the session, and the two pages
// carry `export const revalidate`.
//
// The trade, stated plainly and argued in SessionCta.tsx: a signed-in visitor
// sees "Get started free" until hydration swaps it. In exchange these two
// pages ship from the CDN instead of waking a serverless function and waiting
// on a Supabase auth round trip before the first byte.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// The title/description/headline the three city routes share live in
// src/lib/cityCopy.ts (pure strings, unit-tested against both settings of the
// preview flag). Re-exported here so the page files can keep importing
// everything city-page-shaped from one module.
export { cityPageCopy };

function valueCards(): {
  icon: typeof ClipboardList;
  title: string;
  body: string;
}[] {
  const preview = isHomeownerPreview();
  return [
    {
      icon: ClipboardList,
      title: "A maintenance plan built around your home",
      body: "OakTend turns your home's age, systems, and history into a plan of what to check and when, not a generic checklist.",
    },
    {
      icon: MessageSquare,
      title: "Ask OakTend anything about your house",
      body: "Get answers about your systems, their ages, and what's likely to need attention next, any time.",
    },
    // The only card that changes. "every pro who applies shows up in one
    // place" describes a pro network that is closed right now; the preview
    // version describes what actually happens instead. Same icon, same card,
    // same position, so the grid is unchanged either way.
    preview
      ? {
          icon: Wrench,
          title: PREVIEW_CITY_PROS_CARD_TITLE,
          body: PREVIEW_CITY_PROS_CARD_BODY,
        }
      : {
          icon: Wrench,
          title: "Local pros, no bidding war",
          body: "When a pro lists a California license, we check it against the state's public CSLB database and show the result. Every pro who applies shows up in one place, so you compare and choose instead of sorting through a pile of quotes.",
        },
    {
      icon: Gift,
      title: "Free to start",
      body: "Free during our preview, no card needed.",
    },
  ];
}

const GUIDE_LINKS = [
  {
    href: "/guides/slab-leak-signs",
    title: "Slab leak signs",
    blurb: "How to spot one early in an older slab-foundation home.",
  },
  {
    href: "/guides/socal-home-maintenance-calendar",
    title: "SoCal home maintenance calendar",
    blurb: "A month-by-month calendar built for the coastal SoCal climate.",
  },
  {
    href: "/guides/water-heater-replacement-cost",
    title: "Water heater replacement cost",
    blurb: "Typical price range and when a repair is the smarter call.",
  },
  {
    href: "/guides/hvac-replacement-cost",
    title: "HVAC replacement cost",
    blurb: "Typical price range and central AC vs. heat pump.",
  },
];

export function buildCityServiceJsonLd(city: string, siteUrl: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Home maintenance management",
    provider: {
      "@type": "Organization",
      name: "OakTend",
      url: siteUrl,
    },
    areaServed: {
      "@type": "City",
      name: `${city}, California`,
    },
    url: `${siteUrl}${path}`,
  };
}

// FAQPage for the per-city FAQ block. Rendered by this component rather than
// by the page files, next to the visible questions it describes: the markup
// and the words on the page have to say the same thing, and keeping them in
// one file is how they stay that way. Only emitted when a city actually has
// content, so the template cities (the ones with no researched entry yet)
// carry no FAQ markup for an FAQ they do not show.
export function buildCityFaqJsonLd(content: CityContent) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

// BreadcrumbList is NOT built here. Every city page, researched or not, already
// gets one from the <BreadcrumbJsonLd> beside the visible "OakTend / Orange
// County / City" trail in the component below, and a second list from the page
// files would hand a crawler two competing trails for one URL.

// One sentence about what the city's position on the map means for a house
// there. Not sourced because it is a geographic classification, not a
// statistic - and deliberately free of invented precision (no corrosion
// percentages, no wind speeds), which is the line section 2 of the research
// brief draws.
const EXPOSURE_SENTENCE: Record<CityExposure, (city: string) => string> = {
  coastal: (city) =>
    `${city} sits directly on the coast, so salt air is part of the maintenance picture: paint, metal fixtures, roof flashing, and outdoor HVAC equipment wear faster here than the same parts do a few miles inland.`,
  "near-coastal": (city) =>
    `${city} sits close enough to the water to get marine air most mornings, so exterior finishes and outdoor metal age faster than they would inland, though not as fast as they do right on the sand.`,
  inland: (city) =>
    `${city} is inland with no direct salt-air exposure, which means hotter summer afternoons and more Santa Ana wind than the coastal cities get, and none of the coastal corrosion problems.`,
  foothill: (city) =>
    `${city} runs up into the foothills, so parts of the city take more heat, more wind funneled through the canyons, and more wildfire exposure than the flat parts of the county.`,
};

// Fountain Valley and Huntington Beach have their own top-level routes
// (src/app/fountain-valley, src/app/huntington-beach); everyone else lives
// under /oc/<slug>. Same split src/app/sitemap.ts makes, for the same reason.
const TOP_LEVEL_CITY_SLUGS = new Set(["fountain-valley", "huntington-beach"]);

function cityHref(slug: string): string {
  return TOP_LEVEL_CITY_SLUGS.has(slug) ? `/${slug}` : `/oc/${slug}`;
}

// Display name for a neighbor slug, read back out of LAUNCH_CITY_NAMES rather
// than title-cased from the slug, so "La Habra" and "Rancho Santa Margarita"
// come out the way the rest of the product writes them. An unknown slug falls
// back to the slug itself, and cities.test.ts makes sure that never happens.
function cityNameForSlug(slug: string): string {
  return (
    LAUNCH_CITY_NAMES.find(
      (name) => name.toLowerCase().replace(/\s+/g, "-") === slug
    ) ?? slug
  );
}

// A small, honest citation link. nofollow because these are references, not
// endorsements, and OakTend should not be passing ranking signal to a city
// portal or a data aggregator just for citing it.
function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener"
      className="underline decoration-stone-300 underline-offset-2 hover:text-bark-700 dark:decoration-white/20 dark:hover:text-stone-300"
    >
      {label}
    </a>
  );
}

// One fact with its source under it. Used for both homes.facts and hazards,
// which are the same shape and deserve the same treatment.
function FactCard({
  text,
  sourceUrl,
  sourceLabel,
}: {
  text: string;
  sourceUrl: string;
  sourceLabel: string;
}) {
  return (
    <li className="card">
      <p className="text-sm text-stone-600 dark:text-stone-300">{text}</p>
      <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
        Source: <SourceLink href={sourceUrl} label={sourceLabel} />
      </p>
    </li>
  );
}

const SECTION_HEADING =
  "text-center text-xl font-semibold text-stone-900 dark:text-stone-100";

export default function CityLandingPage({
  city,
  path,
  housingParagraph,
  content,
}: {
  city: string;
  // The page's own route ("/fountain-valley", "/oc/irvine"): the breadcrumb
  // list's last item needs the page's URL.
  path: string;
  housingParagraph: string;
  // Absent for the cities that have no researched content yet: this
  // component then renders exactly what it rendered before the content module
  // existed, which src/components/CityLandingPage.test.tsx pins to a snapshot
  // taken before that change.
  content?: CityContent;
}) {
  const copy = cityPageCopy(city);
  const VALUE = valueCards();
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 pt-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100"
        >
          <Logo className="h-6 w-6 text-bark-700 dark:text-stone-400" /> OakTend
        </Link>
        <SessionCta signedOutHref="/homeowner-signup" />
      </header>

      <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
        {/* Breadcrumb trail. Not the shared <Breadcrumbs> component: that one
            separates with a chevron and starts at "Home", and these pages
            wanted plain "/" separators and the brand name, which is also what
            Google renders in a result's breadcrumb line.

            "Orange County" links to the county hub (src/app/oc/page.tsx),
            which lists every city by area. It was plain text while /oc was a
            404; the hub exists now, so the crumb is a real way up a level for
            a reader and a crawler both.

            Small, muted, one line: same text-sm stone-500 the site uses for
            every secondary link (see the guides footer), so it sits above the
            hero without competing with it at any width. */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-stone-500 dark:text-stone-400">
          <Link
            href="/"
            className="hover:text-bark-700 hover:underline dark:hover:text-stone-300"
          >
            OakTend
          </Link>
          <span aria-hidden="true"> / </span>
          <Link
            href="/oc"
            className="hover:text-bark-700 hover:underline dark:hover:text-stone-300"
          >
            Orange County
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-stone-700 dark:text-stone-300">
            {city}
          </span>
        </nav>
        {/* Matching BreadcrumbList. The last item carries no URL, the same
            current-page-has-no-item convention the guides' trails use. */}
        <BreadcrumbJsonLd
          items={[
            { name: "OakTend", href: "/" },
            { name: "Orange County", href: "/oc" },
            { name: city, href: path },
          ]}
          siteUrl={SITE_URL}
        />

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
            {copy.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-stone-600 dark:text-stone-300">
            {content?.intro ?? housingParagraph}
          </p>
          {/* This is a per-city page, so say out loud that the city is not the
              whole service area. OakTend serves the entire county, and a reader
              who landed here from a city search should not conclude the
              neighboring town is unserved. */}
          <p className="mx-auto mt-3 max-w-xl text-sm text-stone-500 dark:text-stone-400">
            OakTend serves {LAUNCH_AREA_LABEL}, California, not just {city}.
          </p>
          <SessionCta
            signedOutHref="/homeowner-signup"
            className="btn-primary mt-6 px-6 py-3 text-base shadow-md"
          />
        </div>

        <section className="mt-14">
          <h2 className="text-center text-xl font-semibold text-stone-900 dark:text-stone-100">
            What OakTend does
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {VALUE.map((v) => (
              <div key={v.title} className="card">
                <div className="icon-chip" aria-hidden>
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-stone-900 dark:text-stone-100">
                  {v.title}
                </h3>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Everything from here to the guides list exists only for a city with
            real, sourced content. A city without an entry renders nothing at
            all here, which is what keeps every non-researched page
            byte-identical to what it shipped before this module existed. */}
        {content && (
          <>
            <section className="mt-14">
              <h2 className={SECTION_HEADING}>
                {city}&apos;s homes, at a glance
              </h2>
              <div className="card mt-6">
                <p className="text-sm text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    Population:
                  </span>{" "}
                  {content.population.value} ({content.population.asOf}).{" "}
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Source:{" "}
                    <SourceLink
                      href={content.population.sourceUrl}
                      label={
                        content.population.sourceLabel ?? "U.S. Census Bureau"
                      }
                    />
                  </span>
                </p>
                {content.homes.medianYearBuilt && (
                  <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      Median year built:
                    </span>{" "}
                    {content.homes.medianYearBuilt}
                    {content.homes.medianYearBuiltSource && (
                      <>
                        .{" "}
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          Source:{" "}
                          <SourceLink
                            href={content.homes.medianYearBuiltSource.sourceUrl}
                            label={
                              content.homes.medianYearBuiltSource.sourceLabel
                            }
                          />
                        </span>
                      </>
                    )}
                  </p>
                )}
                <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
                  {EXPOSURE_SENTENCE[content.homes.exposure](city)}
                </p>
              </div>
              <ul className="mt-4 space-y-3">
                {content.homes.facts.map((fact) => (
                  <FactCard
                    key={fact.text}
                    text={fact.text}
                    sourceUrl={fact.sourceUrl}
                    sourceLabel={fact.sourceLabel}
                  />
                ))}
              </ul>
            </section>

            <section className="mt-14">
              <h2 className={SECTION_HEADING}>Real neighborhoods in {city}</h2>
              <div className="card mt-6">
                <ul className="flex flex-wrap gap-2">
                  {content.neighborhoods.names.map((name) => (
                    <li
                      key={name}
                      className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 dark:border-white/10 dark:text-stone-300"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-stone-600 dark:text-stone-300">
                  {content.neighborhoods.note}
                </p>
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                  Source:{" "}
                  <SourceLink
                    href={content.neighborhoods.sourceUrl}
                    label="Neighborhood reference"
                  />
                </p>
              </div>
            </section>

            <section className="mt-14">
              <h2 className={SECTION_HEADING}>
                Water, permits, and local rules in {city}
              </h2>
              <div className="card mt-6">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  Water
                </h3>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
                  {content.water.summary}
                </p>
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                  <SourceLink
                    href={content.water.utilityUrl}
                    label={content.water.utility}
                  />
                  {" · Source: "}
                  <SourceLink
                    href={content.water.sourceUrl}
                    label={content.water.sourceLabel ?? "Water quality report"}
                  />
                </p>
              </div>
              <div className="card mt-3">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  Permits
                </h3>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
                  {content.permits.summary}
                </p>
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                  <SourceLink
                    href={content.permits.portalUrl}
                    label={`${content.permits.office} permit portal`}
                  />
                  {" · Source: "}
                  <SourceLink
                    href={content.permits.sourceUrl}
                    label="City building division"
                  />
                </p>
              </div>
              {content.hazards.length > 0 && (
                <ul className="mt-3 space-y-3">
                  {content.hazards.map((hazard) => (
                    <FactCard
                      key={hazard.text}
                      text={hazard.text}
                      sourceUrl={hazard.sourceUrl}
                      sourceLabel={hazard.sourceLabel}
                    />
                  ))}
                </ul>
              )}
            </section>
          </>
        )}

        <section className="mt-14">
          <h2 className="text-center text-xl font-semibold text-stone-900 dark:text-stone-100">
            Guides for {city} homeowners
          </h2>
          <ul className="mt-6 space-y-3">
            {(content?.guides ?? GUIDE_LINKS).map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="card block transition hover:border-bark-500 hover:shadow-md"
                >
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">{g.title}</h3>
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{g.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {content && (
          <>
            <section className="mt-14">
              <h2 className={SECTION_HEADING}>Nearby cities</h2>
              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                {content.neighbors.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={cityHref(slug)}
                      className="inline-block rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-600 transition hover:border-bark-500 hover:text-bark-700 dark:border-white/10 dark:text-stone-300 dark:hover:text-stone-300"
                    >
                      {cityNameForSlug(slug)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14">
              <h2 className={SECTION_HEADING}>
                Questions from {city} homeowners
              </h2>
              {/* Plain, expanded text rather than an accordion: an answer a
                  reader has to click to see is an answer a crawler reads as
                  hidden, and these are short enough that hiding them buys
                  nothing. */}
              <div className="mt-6 space-y-3">
                {content.faq.map((item) => (
                  <div key={item.q} className="card">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                      {item.q}
                    </h3>
                    <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-stone-500 dark:text-stone-400">
                Local facts on this page last checked {content.updated}.
              </p>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(buildCityFaqJsonLd(content)).replace(
                    /</g,
                    "\\u003c"
                  ),
                }}
              />
            </section>
          </>
        )}

        <GuideCta />
      </main>

      <footer className="mx-auto max-w-2xl border-t border-stone-200 px-6 py-6 text-center dark:border-white/10">
        <p className="inline-flex w-full items-center justify-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <Logo className="h-4 w-4 text-bark-700 dark:text-stone-400" /> OakTend · Your home looked after
        </p>
        <p className="mt-2 text-xs">
          <Link
            href="/guides"
            className="text-stone-500 hover:text-bark-700 hover:underline dark:text-stone-400 dark:hover:text-stone-300"
          >
            All guides
          </Link>
        </p>
      </footer>
    </div>
  );
}

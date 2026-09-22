import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import Logo from "@/components/Logo";
import SessionCta from "@/components/SessionCta";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import { GUIDE_TITLES } from "@/lib/guides";
import { OC_REGIONS, cityPath } from "@/lib/ocRegions";
import { CATEGORY_SENTENCE } from "@/lib/siteMetadata";

// The Orange County hub: one page above the 36 city pages.
//
// 34 pages live under /oc/<city> and until now /oc itself was a 404, so the
// "Orange County" crumb on every city page could not be a link and nothing on
// the site gathered the cities in one place. This page is that place: every
// city grouped by area, with a short note on what homes in each area tend to
// need, and links to the guides written for local conditions.
//
// WHAT THE COPY MAY SAY. General, well-known facts about when each part of
// the county was built and what coastal air and the local seasons do to a
// house. No statistics, no prices, no per-city claims this team has not
// researched: the researched city pages are where city-level detail belongs.
// And, like every public page during the preview, no promise of pros, quotes,
// bookings or payments.
//
// STATIC. Nothing here reads cookies(), headers(), searchParams or the
// database (the session-aware CTAs resolve in the browser, see
// src/components/SessionCta.tsx), so it prerenders once. Same marker the city
// pages and /guides carry.
export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const CANONICAL = `${SITE_URL}/oc`;

// `absolute` so the title reads as written rather than gaining a second
// "| OakTend" from the root layout's template.
const TITLE = "Home maintenance in Orange County, CA: all 36 cities | OakTend";
const SHARE_TITLE = "Home maintenance in Orange County, CA: all 36 cities";
const DESCRIPTION =
  "What Orange County homes need, area by area: older north and central county tracts, coastal salt air, newer south county communities. Links to all 36 city pages and our local guides.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "OakTend",
    type: "website",
    locale: "en_US",
    // og:image is inherited from src/app/opengraph-image.tsx by Next's file
    // convention, the same as the city pages.
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: DESCRIPTION,
  },
};

// One short, honest paragraph per area. Keyed by the region ids in
// src/lib/ocRegions.ts.
const REGION_NOTES: Record<string, string> = {
  north:
    "North county grew fastest in the 1950s and 1960s, so much of its housing is single-story tract homes on concrete slabs that are now well over 50 years old. At that age the original parts are the story: water pipes that run under the slab, electrical panels sized for a time before central air and car chargers, and roofs on their second or third covering. If you own one, find out what has been replaced and what is still original.",
  central:
    "The middle of the county is a mix. Santa Ana, Orange and Tustin have some of the county's oldest neighborhoods, with homes from before the Second World War, next to postwar tracts in Garden Grove, Westminster and Fountain Valley. Irvine is the exception: it was planned and built from the 1970s on, so its homes are newer and most belong to a homeowners association. Older homes here share north county's list. In a newer home, the first big replacements are usually the water heater and the air conditioner, long before the roof.",
  coastal:
    "Salt air is hard on a house. Close to the water, paint, exterior metal, window and door hardware, garage door parts and outdoor air conditioner coils wear out sooner than the same parts a few miles inland. Coastal homes do better with regular rinsing, earlier repainting, and a yearly look at anything metal. Drywood termites are common in coastal Southern California too, so a regular termite inspection is worth keeping on the calendar.",
  south:
    "South county is the newest part of Orange County. Most of Mission Viejo, Laguna Niguel, Aliso Viejo, Rancho Santa Margarita and Ladera Ranch was built as planned communities from the late 1960s through the 2000s. San Juan Capistrano is the exception, with some of the oldest buildings in the county. Many south county homes have tile roofs and belong to an association that handles part of the outside upkeep, so check your association's rules to see what is yours to maintain.",
};

// The five guides written most directly for local conditions, in the order a
// homeowner is likely to want them.
const LOCAL_GUIDES = [
  "/guides/socal-home-maintenance-calendar",
  "/guides/slab-leak-signs",
  "/guides/roof-replacement-cost",
  "/guides/adu-cost",
  "/guides/contractor-deposit-rules-california",
];

const ALL_CITIES = OC_REGIONS.flatMap((region) => region.cities);

// ItemList of the city pages, in the order they appear on the page.
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Orange County cities covered by OakTend",
  numberOfItems: ALL_CITIES.length,
  itemListElement: ALL_CITIES.map((city, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${city}, CA`,
    url: `${SITE_URL}${cityPath(city)}`,
  })),
};

const linkClass =
  "text-bark-700 underline hover:no-underline dark:text-stone-300";

export default function OrangeCountyHub() {
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

      <main id="main" className="mx-auto max-w-2xl px-6 pb-16 pt-10">
        {/* Same plain "/" trail the city pages use, one level shorter. */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-stone-500 dark:text-stone-400"
        >
          <Link
            href="/"
            className="hover:text-bark-700 hover:underline max-sm:inline-flex max-sm:min-h-11 max-sm:items-center dark:hover:text-stone-300"
          >
            OakTend
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-stone-700 dark:text-stone-300">
            Orange County
          </span>
        </nav>
        <BreadcrumbJsonLd
          items={[{ name: "OakTend", href: "/" }, { name: "Orange County", href: CANONICAL }]}
          siteUrl={SITE_URL}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100 [text-wrap:balance]">
          Home maintenance for Orange County homeowners
        </h1>
        <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-300">
          Orange County is 34 cities and a handful of unincorporated
          communities, and their homes were not all built at the same time or
          for the same weather. What your home needs depends mostly on two
          things: when it was built and how close it sits to the ocean. This
          page groups all {ALL_CITIES.length} places OakTend covers by area,
          with a short note on what homeowners in each one tend to deal with.
        </p>
        <p className="mt-3 leading-relaxed text-stone-600 dark:text-stone-300">
          {CATEGORY_SENTENCE} Add your home once and it builds a plan around
          its age and systems.
        </p>
        <SessionCta
          signedOutHref="/homeowner-signup"
          className="btn-primary mt-6 px-6 py-3 text-base shadow-md"
        />

        {OC_REGIONS.map((region) => (
          <section key={region.id} id={region.id} className="mt-12">
            <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
              {region.name}
            </h2>
            <p className="mt-2 leading-relaxed text-stone-600 dark:text-stone-300">
              {REGION_NOTES[region.id]}
            </p>
            {/* Two columns at every width: city names are short, and one
                column of 44px rows would make the phone page very long. */}
            <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
              {region.cities.map((city) => (
                <li key={city}>
                  <Link
                    href={cityPath(city)}
                    className="flex min-h-11 items-center text-sm font-medium text-bark-700 hover:underline sm:min-h-0 sm:py-1.5 dark:text-stone-300"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            Two seasons every Orange County home shares
          </h2>
          <p className="mt-2 leading-relaxed text-stone-600 dark:text-stone-300">
            Santa Ana winds usually arrive in the fall. That is the time to
            clear dry leaves and debris from around the house and to check
            that roof tiles, fence panels and gates are secure. Most of the
            year&apos;s rain falls between late fall and early spring, so
            gutters, roof flashing and yard drains are best checked before the
            first storm. Our{" "}
            <Link
              href="/guides/socal-home-maintenance-calendar"
              className={linkClass}
            >
              month-by-month calendar
            </Link>{" "}
            lays out the whole year.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            Guides written for local homes
          </h2>
          <ul className="mt-4 space-y-1">
            {LOCAL_GUIDES.map((href) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex min-h-11 items-center text-sm font-medium text-bark-700 hover:underline sm:min-h-0 sm:py-1.5 dark:text-stone-300"
                >
                  {GUIDE_TITLES[href]}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
            <Link href="/guides" className={linkClass}>
              See all guides
            </Link>
          </p>
        </section>

        <GuideCta />
      </main>

      <footer className="mx-auto max-w-2xl border-t border-stone-200 px-6 py-6 text-center dark:border-white/10">
        <p className="inline-flex w-full items-center justify-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <Logo className="h-4 w-4 text-bark-700 dark:text-stone-400" /> OakTend · Your home, looked after
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

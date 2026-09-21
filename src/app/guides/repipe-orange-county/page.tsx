import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide. NO PRICES ON PURPOSE: we found no government source or
// regional cost survey that states an Orange County repipe price with a year,
// so the page explains what a bid is built from instead.
// The copper vs PEX section is a plain description of how the two jobs differ
// on site. It states no lifespans, no code section numbers and no approval
// history, because we could not open the California Plumbing Code text or a
// Building Standards Commission page on 2026-09-21; the reader is told to
// confirm the material with their city's building division, which is the
// body that actually approves it on the permit.
// Sourced facts (opened 2026-09-21, links in GUIDE_SOURCES,
// src/lib/guideExtras.ts): Fountain Valley and Santa Ana repipe permits, Yorba
// Linda plumbing exemptions, Garden Grove permit FAQ, Health and Safety Code
// 13113.7, CSLB bid, contract and license pages, EPA RRP rule, USGS on scale,
// and the 2006 PEX design guide hosted on huduser.gov (written by the NAHB
// Research Center for HUD's PATH program and two plastic pipe trade groups,
// which the page says plainly).
//
// No FAQPage or HowTo JSON-LD on purpose: the questions are visible headings
// only. Article and BreadcrumbList are the only structured data here.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker). Nothing in this page or in src/app/guides/layout.tsx
// reads cookies(), headers(), searchParams or the database: the session-aware
// CTA moved to the browser (src/components/SessionCta.tsx), so this page is
// prerendered once and served from the edge cache. As on /pricing, the
// explicit revalidate is a marker rather than a requirement - it makes the
// static intent visible in `next build` output and gives a future data read
// ISR instead of silently dropping the route back to per-request rendering.
// Anything added here that reads cookies()/headers()/searchParams undoes it.
export const revalidate = 3600;

// Title/description held once so metadata.title, openGraph, and twitter
// can't drift from each other; the OG image at ./opengraph-image.tsx keeps
// its own literal copy of the title (see that file's comment for why).
const TITLE = "Repiping a house in Orange County: copper vs PEX";
const DESCRIPTION =
  "When a whole-house repipe makes sense in Orange County, how copper and PEX compare, what the permit and inspections involve, and what drives the price.";
const CANONICAL = `${SITE_URL}/guides/repipe-orange-county`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "OakTend",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RepipeOrangeCountyGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/repipe-orange-county"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      {/* Breadcrumb replaces the old "All guides" back link: it still links
          back to /guides, and adds the Home > Guides context the bare back
          link didn't have. Don't render both. */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Repiping a house in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Repiping a house in Orange County" },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Repiping a house in Orange County: copper vs PEX
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/repipe-orange-county" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Written for Orange County homeowners deciding whether to replace their
        water supply lines. No prices are quoted here on purpose. General
        information, not plumbing or legal advice.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          The short answer
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          Repipe when the pipe is failing, not when one joint did
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          A second slab leak, pinhole leaks in more than one place, or old
          galvanized steel lines are the usual reasons. Copper and PEX are
          both common here. The bigger differences between bids are what they
          include: drywall, paint, the permit and how many days you are
          without water.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When does a whole-house repipe make sense?
          </h2>
          <p className="mt-2 leading-relaxed">
            A repipe replaces the hot and cold water supply lines from where
            the water enters the house to every fixture. It does not touch
            drains or the sewer line, which are a separate system and a
            separate job. It starts to make sense when repairs stop being
            one-offs:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>A second slab leak.</strong> In the county&apos;s 1960s and
              1970s tract homes the copper supply lines were often run through
              the slab. One leak can be bad luck. Two suggests the rest of
              the pipe is the same age and in the same condition. Our{" "}
              <Link href="/guides/slab-leak-repair-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
                slab leak repair guide
              </Link>{" "}
              compares a repipe with a spot repair or a reroute.
            </li>
            <li>
              <strong>Pinhole leaks in walls or the attic</strong> in more
              than one place over a few years.
            </li>
            <li>
              <strong>Galvanized steel supply lines</strong> in an older
              house, showing up as rusty water when a tap first opens and
              pressure that has faded over the years.
            </li>
            <li>
              <strong>A remodel that already opens the walls.</strong> The
              drywall work is a large share of a repipe, so doing it while
              walls are open is the cheapest time it will ever be.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            It does not make sense just because a house is old. Pipe that is
            not leaking, holds pressure and runs clear can be left alone and
            watched.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Copper or PEX: how do they compare?
          </h2>
          <p className="mt-2 leading-relaxed">
            Both are used for repipes across Orange County, and the
            difference you will notice first is the job, not the water.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Copper</h3>
          <p className="mt-2 leading-relaxed">
            Rigid pipe, cut to length and soldered at every joint and turn.
            It is the material most local houses already have, so plumbers,
            inspectors and buyers all know it. It costs more in material and
            takes more labor, and rigid pipe generally means more and larger
            openings in drywall to get it around framing.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">PEX</h3>
          <p className="mt-2 leading-relaxed">
            Flexible plastic tubing that comes in long coils. A design guide
            prepared for HUD&apos;s housing technology program and the plastic
            pipe industry, hosted by HUD, describes the practical
            differences: it bends around obstructions, which cuts down on
            fittings, it is joined with mechanical fittings instead of solder
            and flame, and it does not pit or corrode. The same guide is
            clear about the weak point, which is sunlight. It says PEX should
            not be installed outdoors unless it is buried or properly
            protected from UV, and that each manufacturer publishes a maximum
            exposure limit. So any run outside the wall needs to be covered
            or switched to another material. Fittings and installation
            methods vary by brand, which is one more reason to use an
            installer who does this every week.
          </p>
          <p className="mt-2 leading-relaxed">
            What to ask for either one: the exact product and type, written
            into the contract; how the stubs at each fixture and the water
            heater connections will be done; and whether the city you live
            in has any local conditions on the material. Your building
            division approves the material on the permit, so that is the
            place to confirm it, not a sales brochure. Whatever goes in the
            walls, the water stays hard. As the U.S. Geological Survey notes,
            heated hard water leaves calcium carbonate scale that can clog
            pipes, and our{" "}
            <Link href="/guides/hard-water-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              hard water guide
            </Link>{" "}
            covers what to do about that.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Do I need a permit to repipe a house?
          </h2>
          <p className="mt-2 leading-relaxed">
            Yes in the cities we checked. Fountain Valley lists a residential
            repipe among its expedited permits, and Santa Ana lists
            residential repipes on its same-day express permit list, which
            means no plan check, not no permit. Yorba Linda&apos;s published
            exemptions draw the line the way the state plumbing code does:
            stopping or repairing a leak is exempt, but removing a concealed
            pipe and replacing it with new material is new work that needs a
            permit and an inspection.
          </p>
          <p className="mt-2 leading-relaxed">
            The inspection is the part that protects you. The inspector sees
            the new piping while the walls are still open, before anything is
            patched. A contractor who wants to close the walls the same day
            they finish, with no inspection, is telling you there is no
            permit.
          </p>
          <p className="mt-2 leading-relaxed">
            Two things the permit brings with it. Under Health and Safety
            Code section 13113.7, when a permit is issued for work over
            $1,000, the city cannot sign off until the home has approved
            smoke alarms, so check yours before the final. And Garden Grove&apos;s
            building division gives the practical reason to have the
            contractor pull the permit instead of you: the contractor then
            keeps the responsibility to call for and pass every inspection.
            Our{" "}
            <Link href="/guides/permits-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              Orange County permit guide
            </Link>{" "}
            shows how cities differ.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What affects the cost of a repipe?
          </h2>
          <p className="mt-2 leading-relaxed">
            We do not print a price range, because we could not find a
            reliable published figure for Orange County. Bids are built from
            these pieces, and you can ask about each one:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Fixture count.</strong> Most repipe bids start from the
              number of fixtures: each sink, toilet, tub, shower, hose bib,
              the water heater, the washer and the fridge line.
            </li>
            <li>
              <strong>Stories and access.</strong> A single-story house with
              a walkable attic is the simple case. Two stories, low-slope
              roofs with no attic, and slab-only routes all add labor.
            </li>
            <li>
              <strong>Material.</strong> Copper costs more than PEX in both
              pipe and labor.
            </li>
            <li>
              <strong>Patching.</strong> The biggest swing between bids. Some
              include drywall patch, texture and paint. Some stop at the
              plumbing and leave you with open holes. Tile, plaster and
              wallpaper cost more to put back than painted drywall.
            </li>
            <li>
              <strong>Extras while the water is off.</strong> New shutoff
              valves at each fixture, a new main shutoff and a pressure
              regulator are commonly offered. Ask for them as separate line
              items.
            </li>
            <li>
              <strong>Permit and inspections.</strong> Should be in the bid,
              by name.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            The Contractors State License Board says to get at least three
            written bids based on identical scope, and not to automatically
            accept the lowest. For a repipe, identical scope means the same
            material, the same fixture list and the same answer on
            patching. Our guide on{" "}
            <Link href="/guides/is-my-contractor-quote-fair" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              reading a contractor&apos;s quote
            </Link>{" "}
            goes line by line.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps the bids, the permit, the inspection sign-off and
            the warranty for a job like this in your home&apos;s record, dated,
            so you can find them when you sell or when something leaks.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Keep your home&apos;s repair record, free
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What should the contract and the week look like?
          </h2>
          <p className="mt-2 leading-relaxed">
            The Contractors State License Board says a contract should detail
            the work, the price, when payments will be made, who gets the
            building permits and when the job will be finished, and must
            identify the contractor with an address and license number. For
            plumbing that license is the C-36 classification. California
            also caps the down payment on a home improvement contract, which
            our{" "}
            <Link href="/guides/contractor-deposit-rules-california" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              deposit rules guide
            </Link>{" "}
            explains.
          </p>
          <p className="mt-2 leading-relaxed">
            Ask how long the water will be off each day and whether it will
            be back on each night. Ask who protects floors and furniture and
            who hauls debris. If the house was built before 1978, ask about
            lead paint: the EPA&apos;s renovation rule requires anyone paid to
            disturb painted surfaces in pre-1978 homes to be certified and
            trained in lead-safe work practices. When the job is done, walk
            every fixture, hot and cold, and look at the meter with
            everything off.
          </p>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            City pages:{" "}
            <Link href="/oc/santa-ana" className="text-bark-700 hover:underline dark:text-stone-300">Santa Ana</Link>,{" "}
            <Link href="/fountain-valley" className="text-bark-700 hover:underline dark:text-stone-300">Fountain Valley</Link>,{" "}
            <Link href="/oc/fullerton" className="text-bark-700 hover:underline dark:text-stone-300">Fullerton</Link>,{" "}
            <Link href="/oc/orange" className="text-bark-700 hover:underline dark:text-stone-300">Orange</Link> and{" "}
            <Link href="/oc/buena-park" className="text-bark-700 hover:underline dark:text-stone-300">Buena Park</Link>, or every city on
            the <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">Orange County hub</Link>.
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            As of September 2026. We describe how these jobs usually go, not
            what your city&apos;s code requires: permit rules and approved
            materials are decided by your building division. This is general
            information, not plumbing or legal advice.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/repipe-orange-county" />

      <GuideCta />
    </main>
  );
}

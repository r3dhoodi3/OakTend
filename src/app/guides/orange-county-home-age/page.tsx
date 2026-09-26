import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";
import OcHomeAgeTable from "@/components/OcHomeAgeTable";
import {
  OC_HOME_AGE_CITIES,
  OC_HOME_AGE_COUNTY,
  formatShare,
} from "@/lib/ocHomeAge";

// Public data page: how old Orange County's housing is, for all 34 cities and
// the county, from Census table B25034 (year structure built) and B25035
// (median year built), ACS 5-year 2020-2024. The rows, and exactly how each
// share was summed, live in src/lib/ocHomeAge.ts. Built to be the page other
// people link to when they need the number, so every figure is one a reader
// can re-derive from the Census Reporter links in GUIDE_SOURCES.
//
// The era notes state only what the named rule or agency says: aluminum
// branch wiring from CPSC Publication 516, the asbestos presumption from
// Cal/OSHA 8 CCR 1529, the pre-1978 lead rule from EPA, the raised-foundation
// retrofit from the California Residential Mitigation Program, and the cast
// iron drain life from InterNACHI's chart (a trade association, named as
// such). No primary source was found for when galvanized water pipe stopped
// being used in Orange County or how long it lasts, so the page says that
// instead of printing a date.
//
// No FAQPage or HowTo JSON-LD, like the other Orange County guides: the
// questions are visible headings. Article and BreadcrumbList only, and no
// Dataset node. The pro side is closed, so nothing here offers to find, match
// or book anyone.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker), same as every other guide: nothing here reads
// cookies(), headers(), searchParams or the database.
export const revalidate = 3600;

// Title/description held once so metadata.title, openGraph, and twitter
// can't drift from each other; the OG image at ./opengraph-image.tsx keeps
// its own literal copy of the title. 32 characters, so the full
// "<title> | OakTend" stays under 50.
const TITLE = "How old are Orange County homes?";
const DESCRIPTION =
  "Share of homes built before 1980 and median year built for all 34 Orange County cities, from Census data, and what each era means for maintenance.";
const CANONICAL = `${SITE_URL}/guides/orange-county-home-age`;

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

const linkClass =
  "text-bark-700 underline hover:no-underline dark:text-stone-300";

const OLDEST = OC_HOME_AGE_CITIES[0];
const NEWEST = OC_HOME_AGE_CITIES[OC_HOME_AGE_CITIES.length - 1];

export default function OrangeCountyHomeAgeGuide() {
  const county = OC_HOME_AGE_COUNTY;
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/orange-county-home-age"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "How old are Orange County homes?" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "How old are Orange County homes?", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        How old are Orange County homes?
      </h1>
      <GuideMeta path="/guides/orange-county-home-age" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Census Bureau estimates for the county and all 34 of its cities, plus
        what the age of a house tends to mean for the work it needs.
      </p>

      {/* Hero figure: the one number most people came for. */}
      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-6 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          Orange County housing built before 1980
        </p>
        <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-100">
          {formatShare(county.pre1980)}%
        </p>
        <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          The median home was built in {county.medianYear}, and only{" "}
          {formatShare(county.since2000)}% were built in 2000 or later. U.S.
          Census Bureau, American Community Survey 5-year estimates for 2020
          to 2024, read on September 26, 2026.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How old are the homes in each Orange County city?
          </h2>
          <p className="mt-2 leading-relaxed">
            Oldest first. &quot;Built before 1980&quot; is our sum of the
            1979-and-earlier rows of Census table B25034, the year each
            structure was built. The plus or minus figure is our approximate
            margin of error for that share, worked out from the Census
            Bureau&apos;s published margins. Median year built is the Census
            Bureau&apos;s own figure, from table B25035. Every row counts all
            housing units, owned and rented, houses and apartments.
          </p>
          <OcHomeAgeTable />
          <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
            Source: the Census tables above, through Census Reporter.
            Incorporated cities only; unincorporated communities such as
            Ladera Ranch are left out. You are welcome to cite this table;
            please link back to this page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Which Orange County cities have the oldest and newest homes?
          </h2>
          <p className="mt-2 leading-relaxed">
            Most of the oldest housing is in north and west county cities,
            plus a few coastal and retirement communities. {OLDEST.name} tops
            the list at{" "}
            {formatShare(OLDEST.pre1980)}% built before 1980, followed by{" "}
            <Link href="/oc/seal-beach" className={linkClass}>
              Seal Beach
            </Link>{" "}
            and{" "}
            <Link href="/fountain-valley" className={linkClass}>
              Fountain Valley
            </Link>
            , where more than four in five homes predate 1980.{" "}
            <Link href="/oc/garden-grove" className={linkClass}>
              Garden Grove
            </Link>{" "}
            and Buena Park have the earliest median year built of any city
            with more than 20,000 homes: 1965.
          </p>
          <p className="mt-2 leading-relaxed">
            The newest housing is in the planned communities of south county.
            In {NEWEST.name} and Aliso Viejo, about one home in twenty was
            built before 1980.{" "}
            <Link href="/oc/irvine" className={linkClass}>
              Irvine
            </Link>{" "}
            is the only city where more than half of all housing units were
            built in 2000 or later, and its median home dates from 2002.{" "}
            <Link href="/huntington-beach" className={linkClass}>
              Huntington Beach
            </Link>{" "}
            and{" "}
            <Link href="/oc/anaheim" className={linkClass}>
              Anaheim
            </Link>
            , two of the county&apos;s four largest cities by housing units,
            both sit above the county figure, at about two thirds built before
            1980.
          </p>
          <p className="mt-2 leading-relaxed">
            A city figure is an average across very different streets. A
            1960s tract and a 2015 infill project can sit a block apart, so
            the year on your own property record matters more than your
            city&apos;s row.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What does the age of a home mean for maintenance?
          </h2>
          <p className="mt-2 leading-relaxed">
            Build year is a clue, not a diagnosis. Houses get rewired,
            repiped and remodeled, so treat each of these as a question to ask
            about your house.
          </p>
          <ul className="mt-3 space-y-3">
            <li className="rounded-xl border border-stone-200 p-4 leading-relaxed dark:border-white/10">
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                Older homes: drains and water lines
              </p>
              <p className="mt-1 text-sm">
                If your drains are cast iron, know their age. InterNACHI, a
                home inspectors&apos; association, puts the
                typical life of cast iron waste pipe at about 60 years above
                ground and 50 to 60 years below ground, and says its chart is a
                general guideline, not a guarantee. Some older homes also have
                galvanized steel water pipe; we found no official source for
                when Orange County builders stopped using it or how long it
                lasts, so ask an inspector what your supply lines are made of.
                Our{" "}
                <Link href="/guides/repipe-orange-county" className={linkClass}>
                  repiping guide
                </Link>{" "}
                and{" "}
                <Link href="/guides/slab-leak-signs" className={linkClass}>
                  slab leak signs
                </Link>{" "}
                cover what to watch for.
              </p>
            </li>
            <li className="rounded-xl border border-stone-200 p-4 leading-relaxed dark:border-white/10">
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                1965 to the mid 1970s: aluminum wiring
              </p>
              <p className="mt-1 text-sm">
                The U.S. Consumer Product Safety Commission says homes built
                before 1965 are unlikely to have aluminum branch circuit
                wiring, and that wiring installed between 1965 and the mid
                1970s may be aluminum. In a survey for the CPSC, homes built
                before 1972 and wired with aluminum were 55 times more likely
                than copper-wired homes to have at least one outlet connection
                reach fire hazard conditions. The CPSC also says failing
                aluminum connections seldom give easy warning signs, so have a
                licensed electrician look. More in our{" "}
                <Link href="/guides/electrical-panel-upgrade-cost" className={linkClass}>
                  electrical panel guide
                </Link>
                .
              </p>
            </li>
            <li className="rounded-xl border border-stone-200 p-4 leading-relaxed dark:border-white/10">
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                Built before 1978: lead paint
              </p>
              <p className="mt-1 text-sm">
                The EPA&apos;s Renovation, Repair and Painting rule says anyone
                paid to do work that disturbs painted surfaces in a home built
                before 1978 must be certified, and their workers trained in
                lead-safe practices. Ask for the firm&apos;s certification
                before the work starts.
              </p>
            </li>
            <li className="rounded-xl border border-stone-200 p-4 leading-relaxed dark:border-white/10">
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                Built in 1980 or earlier: presumed asbestos
              </p>
              <p className="mt-1 text-sm">
                Under California&apos;s construction asbestos rule, Title 8
                section 1529, thermal system insulation and surfacing material
                in a building constructed no later than 1980 is presumed to
                contain asbestos unless testing shows otherwise. Surfacing
                material includes sprayed or troweled-on finishes such as
                acoustical plaster on ceilings. Test before a remodel disturbs
                it. Note that this rule reaches one year past the table&apos;s
                &quot;before 1980&quot; line, so a 1980 house is covered too.
                Our{" "}
                <Link href="/guides/kitchen-remodel-cost" className={linkClass}>
                  kitchen
                </Link>{" "}
                and{" "}
                <Link href="/guides/bathroom-remodel-cost" className={linkClass}>
                  bathroom
                </Link>{" "}
                remodel guides cover what that adds to a project.
              </p>
            </li>
            <li className="rounded-xl border border-stone-200 p-4 leading-relaxed dark:border-white/10">
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                Built before 1980 on a raised foundation: earthquake retrofit
              </p>
              <p className="mt-1 text-sm">
                The California Residential Mitigation Program&apos;s Earthquake
                Brace + Bolt grants are only for wood-framed homes built before
                1980 on a raised foundation, in the ZIP codes the program
                lists. Our{" "}
                <Link href="/guides/earthquake-retrofit-orange-county" className={linkClass}>
                  earthquake retrofit guide
                </Link>{" "}
                covers the grant and the work.
              </p>
            </li>
          </ul>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps the year your home was built next to the age of each
            system, so the reminders you get fit your house rather than an
            average one.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Add your home, free
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How accurate are these numbers?
          </h2>
          <p className="mt-2 leading-relaxed">
            They are estimates from a survey, not a count. The Census Bureau
            says all American Community Survey figures are estimates because
            they come from a sample, and it publishes a margin of error with
            each one at a 90 percent confidence level. For big cities the
            margin on the pre-1980 share is small: plus or minus{" "}
            {formatShare(county.pre1980Moe)} points for the county and under
            one point for Irvine. For the smallest cities it is wide. Villa
            Park, with under 2,000 homes, carries about plus or minus 11
            points, so two small cities a few points apart may not really
            differ.
          </p>
          <p className="mt-2 leading-relaxed">
            The figures describe 2020 to 2024 as a five-year period, not any
            single year. The Census Bureau
            advises against comparing 5-year periods that overlap, so do not
            set this table against the 2019 to 2023 release to measure change.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What should I check first in an older Orange County home?
          </h2>
          <p className="mt-2 leading-relaxed">
            Start with the systems that fail expensively or quietly: the
            electrical panel and wiring, the water heater, the supply pipes
            and drains, and the roof. Our{" "}
            <Link href="/guides/orange-county-home-maintenance-checklist" className={linkClass}>
              Orange County maintenance checklist
            </Link>{" "}
            puts them on a month by month calendar, and the{" "}
            <Link href="/guides/new-homeowner-first-year-orange-county" className={linkClass}>
              new homeowner checklist
            </Link>{" "}
            covers what to find in your first week. Before any remodel on a
            pre-1980 house, read our{" "}
            <Link href="/guides/permits-orange-county" className={linkClass}>
              permits guide
            </Link>
            , since testing and lead-safe work add steps. Local notes for
            every city are on the{" "}
            <Link href="/oc" className={linkClass}>
              Orange County hub
            </Link>
            .
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            The pre-1980 share, the 2000-or-later share and their margins are
            our own sums of the published Census rows. This is general
            information, not an inspection, legal or safety advice for your
            home.
          </p>
        </section>
      </div>

      {/* Sources, related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/orange-county-home-age" />

      <GuideCta />
    </main>
  );
}

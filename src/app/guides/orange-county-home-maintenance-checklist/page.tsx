import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide: the Orange County checklist. It sits beside two older
// guides and must not contradict them: cadences match
// src/app/guides/home-maintenance-schedule/page.tsx (filter monthly, water
// heater flush yearly, HVAC service yearly, gutters before rain) and the month
// placement matches src/app/guides/socal-home-maintenance-calendar/page.tsx
// (wind prep in September, rain prep in October and November, HVAC tune-up in
// April, termite watch in late summer). What this page adds is the Orange
// County layer: who publishes what locally (OCFA, the water districts, city
// sandbag programs) and links to the county-specific guides.
// Sourced facts (opened 2026-09-21, links in GUIDE_SOURCES,
// src/lib/guideExtras.ts): NWS glossary (Santa Ana wind), OCFA (alarms,
// sandbags, red flag guidance, vents), ENERGY STAR (filters, pre-season
// check-ups), UC IPM (swarm timing), USGS (scale), City of Tustin (flushing,
// sandbags), IRWD (monthly watering guide), Health and Safety Code 19211.
// The marine layer section is plain description with no figures: we found no
// official page to cite for it, and the page makes no measurable claim.
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
const TITLE = "Orange County home maintenance checklist by month";
const DESCRIPTION =
  "A month by month home maintenance checklist for Orange County: Santa Ana winds, first rains, marine layer, hard water, termites and earthquake basics.";
const CANONICAL = `${SITE_URL}/guides/orange-county-home-maintenance-checklist`;

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

// One to three jobs a month, so the list gets done. Anything with a safety or
// code angle is explained, with its source, in the sections below the grid.
const MONTHS: { month: string; focus: string; tasks: string[] }[] = [
  {
    month: "January",
    focus: "Rain watch",
    tasks: [
      "After each storm, check ceilings, the attic and around windows for new stains",
      "Test smoke and carbon monoxide alarms",
      "Look at the base of the water heater for rust or a puddle",
    ],
  },
  {
    month: "February",
    focus: "Storm follow-up",
    tasks: [
      "Walk the roof line from the ground for slipped tiles or lifted shingles",
      "Clear yard drains and downspout outlets again",
      "File the Homeowners' Exemption by February 15 if you bought last year",
    ],
  },
  {
    month: "March",
    focus: "Spring reset",
    tasks: [
      "Reset the sprinkler timer for spring and check for broken heads",
      "Walk the outside for cracked caulk, peeling paint and stucco cracks",
      "Watch for subterranean termite swarms on warm days after rain",
    ],
  },
  {
    month: "April",
    focus: "Ahead of the heat",
    tasks: [
      "Book the air conditioner's yearly check-up before contractors get busy",
      "Clean the dryer vent",
      "Soak faucet aerators and shower heads in vinegar to clear scale",
    ],
  },
  {
    month: "May",
    focus: "May gray",
    tasks: [
      "Near the coast, rinse salt and grime off windows, screens and outdoor metal",
      "Check hose bibs and the irrigation valve box for drips",
      "Touch up exterior paint and sealant where bare wood shows",
    ],
  },
  {
    month: "June",
    focus: "Heat is close",
    tasks: [
      "Start checking the HVAC filter every month",
      "Make sure attic vents are clear, and note the screen size for fire season",
      "Raise sprinkler run times only as far as the plants need",
    ],
  },
  {
    month: "July",
    focus: "Peak AC",
    tasks: [
      "Check the HVAC filter",
      "Watch the water bill and the floor for slab leak signs",
      "Look for drywood termite pellets under eaves and window sills",
    ],
  },
  {
    month: "August",
    focus: "Termite swarm watch",
    tasks: [
      "Check the HVAC filter",
      "Watch for daytime termite swarmers and discarded wings",
      "Trim dead wood out of trees before wind season",
    ],
  },
  {
    month: "September",
    focus: "Santa Ana wind prep",
    tasks: [
      "Clean the roof and gutters of leaves and needles",
      "Clear the first 5 feet around the house of dead plants and stored wood",
      "Fix loose tiles, fence sections and gate latches",
    ],
  },
  {
    month: "October",
    focus: "Wind season, rain prep",
    tasks: [
      "Know your Red Flag Warning routine and sign up for outage alerts",
      "Check roof flashing and sealant while it is dry",
      "Turn the sprinkler timer down for fall",
    ],
  },
  {
    month: "November",
    focus: "First rain",
    tasks: [
      "Clear yard drains, and pick up sandbags if your lot takes runoff",
      "Flush the tank water heater",
      "Check weatherstripping, and that soil still slopes away from the house",
    ],
  },
  {
    month: "December",
    focus: "Close out the year",
    tasks: [
      "Test alarms again and check the manufacture date on each one",
      "Check the water heater's earthquake straps",
      "Update your home inventory with photos, and file the year's receipts",
    ],
  },
];

export default function OrangeCountyHomeMaintenanceChecklistGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/orange-county-home-maintenance-checklist"
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
          { label: "Orange County home maintenance checklist" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Orange County home maintenance checklist", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Orange County home maintenance checklist by month
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/orange-county-home-maintenance-checklist" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Written for Orange County homeowners. There is no snow to plan around
        here, so the year is built on four local things instead: Santa Ana
        winds, the first rains, the marine layer and hard water. General
        information, not professional advice for your home.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {MONTHS.map((m) => (
          <section key={m.month} className="card">
            <div className="flex items-baseline justify-between">
              <h2 className="font-semibold text-stone-900 dark:text-stone-100">{m.month}</h2>
              <span className="text-xs font-medium text-bark-700 dark:text-stone-300">
                {m.focus}
              </span>
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700 dark:text-stone-300">
              {m.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Why does Orange County need its own checklist?
          </h2>
          <p className="mt-2 leading-relaxed">
            Most checklists were written for places with basements and
            frozen pipes. What wears out an Orange County house is a dry
            wind in fall, a short wet season that arrives all at once, damp
            salty mornings near the coast, and mineral-heavy water all year.
            The months above are arranged around those four, plus termites
            and earthquakes. For how often to do each job in general, our{" "}
            <Link href="/guides/home-maintenance-schedule" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              home maintenance schedule
            </Link>{" "}
            has it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What should I do before Santa Ana winds?
          </h2>
          <p className="mt-2 leading-relaxed">
            The National Weather Service describes a Santa Ana wind as strong,
            hot, dust-bearing wind that descends to the coast from the inland
            deserts. September is the month to get ahead of it. The Orange
            County Fire Authority (OCFA) warns that flying embers destroy
            homes miles from wildland areas, and its advice starts small:
            clean leaves and needles out of rain gutters, clear dead plants
            and debris from the first 5 feet around the house, and look at
            your attic and foundation vents. OCFA says most homes have
            1/4-inch vent screens, which let embers through, and recommends
            1/8-inch metal mesh.
          </p>
          <p className="mt-2 leading-relaxed">
            The rest is ordinary wind sense: fix loose tiles and fence
            sections and take dead limbs out of trees. On a Red Flag Warning
            day, OCFA says to do
            any yard work that needs a motor before 10 a.m. and never when
            the wind is blowing. Our{" "}
            <Link href="/guides/santa-ana-wind-wildfire-home-prep" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              Santa Ana wind and wildfire prep guide
            </Link>{" "}
            goes through defensible space and the rest of the house.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What should I do before the first rain?
          </h2>
          <p className="mt-2 leading-relaxed">
            Months of dust and leaves sit on the roof and in the drains, and
            the first real storm finds every weak spot at once. Do the dry
            work in October and November: gutters, yard drains, roof flashing
            and the grading next to the foundation.
          </p>
          <p className="mt-2 leading-relaxed">
            If your lot takes runoff from a slope or the street, find your
            sandbags before you need them. OCFA says most of its fire
            stations have empty sandbags available and some have sand as
            well, and asks residents to bring a shovel. Some cities run their
            own programs: Tustin, for example, offers residents free
            fill-your-own sandbags at its maintenance yard and at
            neighborhood self-serve sites. Check your city&apos;s public works
            page before the forecast turns.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What does the marine layer do to a house?
          </h2>
          <p className="mt-2 leading-relaxed">
            The Weather Service&apos;s term is a marine push: ocean air moving in,
            much cooler and much more humid. In late spring and early summer
            it is a regular visitor in the coastal cities. For a house that
            means surfaces that stay damp until midday and, close to the
            beach, salt in that dampness. Paint, window tracks, door
            hardware, light fixtures, garage door springs and the outdoor
            half of the air conditioner all show it first.
          </p>
          <p className="mt-2 leading-relaxed">
            The habit that helps is cheap: rinse outdoor metal, screens and
            windows with fresh water, keep exterior paint and sealant intact,
            and look at the fasteners on gates and railings once a year.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How does hard water change the routine?
          </h2>
          <p className="mt-2 leading-relaxed">
            It adds three jobs. The U.S. Geological Survey explains that when
            hard water is heated, as in a water heater, calcium carbonate
            scale forms, and that scale can shorten equipment life, raise
            heating costs and clog pipes. So flush a tank water heater once
            a year, following the owner&apos;s guide, which is also what the City
            of Tustin&apos;s water division tells its customers. Descale a
            tankless heater on the maker&apos;s schedule. And soak aerators and
            shower heads in vinegar when the flow drops. How hard your water
            is depends on your provider, and our{" "}
            <Link href="/guides/hard-water-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              hard water guide
            </Link>{" "}
            lists the figures by district.
          </p>
          <p className="mt-2 leading-relaxed">
            Outdoors, water cost is the driver. Irvine Ranch Water District
            publishes a month by month watering guide, and the pattern
            holds countywide: run times come down in fall, stay low through
            the wet months, and come back up in spring.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend turns a list like this into a plan for your own house.
            Add your home once, and it tracks what is due, reminds you, and
            keeps the dates, photos and receipts together.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Build your home&apos;s checklist, free
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What about air filters, alarms, termites and earthquakes?
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>HVAC.</strong> ENERGY STAR says to inspect, clean or
              change air filters once a month, and to have the cooling
              system checked in spring and the heating system in fall,
              before contractors get busy.
            </li>
            <li>
              <strong>Alarms.</strong> OCFA says to test smoke alarms once a
              month, replace the battery every six months, and replace the
              whole alarm every 10 years.
            </li>
            <li>
              <strong>Termites.</strong> The University of California&apos;s pest
              program says drywood termite swarmers fly during the day in
              summer and fall, and the common subterranean species swarms on
              clear afternoons after a soaking rain in spring or fall. Those
              are the weeks to look. Our{" "}
              <Link href="/guides/termites-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
                Orange County termite guide
              </Link>{" "}
              covers what to do if you find them.
            </li>
            <li>
              <strong>Earthquakes.</strong> California Health and Safety Code
              section 19211 requires residential water heaters to be braced,
              anchored or strapped. Straps loosen and get removed during
              repairs, so look once a year.
            </li>
          </ul>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            Local notes by city:{" "}
            <Link href="/oc/anaheim" className="text-bark-700 hover:underline dark:text-stone-300">Anaheim</Link>,{" "}
            <Link href="/oc/irvine" className="text-bark-700 hover:underline dark:text-stone-300">Irvine</Link>,{" "}
            <Link href="/huntington-beach" className="text-bark-700 hover:underline dark:text-stone-300">Huntington Beach</Link>,{" "}
            <Link href="/oc/santa-ana" className="text-bark-700 hover:underline dark:text-stone-300">Santa Ana</Link>,{" "}
            <Link href="/oc/mission-viejo" className="text-bark-700 hover:underline dark:text-stone-300">Mission Viejo</Link> and{" "}
            <Link href="/oc/fullerton" className="text-bark-700 hover:underline dark:text-stone-300">Fullerton</Link>, or every city on the{" "}
            <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">Orange County hub</Link>. For a coast-focused
            version of the year, see our{" "}
            <Link href="/guides/socal-home-maintenance-calendar" className="text-bark-700 hover:underline dark:text-stone-300">
              Southern California maintenance calendar
            </Link>
            .
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            As of September 2026. Months are a guide, not a rule: the first
            rain and the first wind event move around from year to year. This
            is general information, not professional, legal or safety advice.
            Follow your appliance manuals and your local fire department&apos;s
            instructions.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/orange-county-home-maintenance-checklist" />

      <GuideCta />
    </main>
  );
}

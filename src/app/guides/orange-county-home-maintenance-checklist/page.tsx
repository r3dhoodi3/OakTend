import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";
import { GUIDE_TITLES } from "@/lib/guides";

// Public SEO guide and THE maintenance hub. Since 2026-09-25 it is the one
// page for Orange County home maintenance: the two older overlapping guides,
// /guides/home-maintenance-schedule (how often) and
// /guides/socal-home-maintenance-calendar (month by month), were merged into
// it and now 308 here (next.config.mjs redirects). Their useful, sourced
// content lives below: the cadence table came from the schedule, the salt air
// figures and several month tasks from the calendar. Link here, never to the
// old URLs.
//
// Sourced facts (links and the statement each supports are in GUIDE_SOURCES,
// src/lib/guideExtras.ts): NOAA NCEI 1991-2020 monthly normals for John Wayne
// Airport (rain by month, fetched 2026-09-25), NWS climate bulletin (Santa Ana
// events most common October to March), NWS glossary (Santa Ana wind, marine
// push), OCFA (sandbags, alarms), FEMA TB 8 (salt spray), ENERGY STAR
// (filters, check-ups), IRWD (hard water, yearly flush, watering guide), City
// of Tustin (sandbags), UC IPM (swarm timing), OC Assessor (Homeowners'
// Exemption).
// Trimmed 2026-09-26 so each fact lives on one page: embers, vent screens and
// Red Flag Warning rules are on the wildfire guide, scale on the hard water
// guide, Brace + Bolt on the earthquake retrofit guide. Link, don't restate.
// The marine layer section is plain description with no figures beyond the
// NWS definition.
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
// 40 characters, so with the layout's " | OakTend" it is 50.
const TITLE = "Orange County home maintenance checklist";
const DESCRIPTION =
  "Orange County home maintenance checklist, month by month: when rain and Santa Ana winds arrive, how often to do each job, and salt air and hard water care.";
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

const linkClass =
  "text-bark-700 underline hover:no-underline dark:text-stone-300";

// Three jobs a month, so the list gets done, and one line on why the month
// is the right one. Every figure in a `why` line is in GUIDE_SOURCES.
const MONTHS: { month: string; focus: string; tasks: string[]; why: string }[] = [
  {
    month: "January",
    focus: "Rain watch",
    tasks: [
      "After each storm, check ceilings, the attic and around windows for new stains",
      "Test smoke and carbon monoxide alarms",
      "Look at the base of the water heater for rust or a puddle",
    ],
    why: "January averages about 2.6 inches of rain at John Wayne Airport. A stain found now is cheap to trace.",
  },
  {
    month: "February",
    focus: "Storm follow-up",
    tasks: [
      "Walk the roof line from the ground for slipped tiles or lifted shingles",
      "Clear yard drains and downspout outlets again",
      "File the Homeowners' Exemption by February 15 if you bought last year",
    ],
    why: "February is the wettest month on the 1991 to 2020 normals, also about 2.6 inches.",
  },
  {
    month: "March",
    focus: "Spring reset",
    tasks: [
      "Reset the sprinkler timer for spring and check for broken heads",
      "Walk the outside for cracked caulk, peeling paint and stucco cracks",
      "Watch for subterranean termite swarms on warm days after rain",
    ],
    why: "Rain tapers off: about 1.6 inches in March, half an inch in April. Finish storm repairs now.",
  },
  {
    month: "April",
    focus: "Ahead of the heat",
    tasks: [
      "Book the air conditioner's yearly check-up before contractors get busy",
      "Clean the dryer vent",
      "Soak faucet aerators and shower heads in vinegar to clear scale",
    ],
    why: "The first hot days come after April, so a system checked now is ready for them.",
  },
  {
    month: "May",
    focus: "May gray",
    tasks: [
      "Near the coast, rinse salt and grime off windows, screens and outdoor metal",
      "Check hose bibs and the irrigation valve box for drips",
      "Touch up exterior paint and sealant where bare wood shows",
    ],
    why: "Damp mornings near the beach carry salt, and salt speeds up corrosion of outdoor metal.",
  },
  {
    month: "June",
    focus: "Heat is close",
    tasks: [
      "Start checking the HVAC filter every month",
      "Make sure attic vents are clear, and note the screen size for fire season",
      "Raise sprinkler run times only as far as the plants need",
    ],
    why: "June, July and August together average less than a tenth of an inch of rain. Dry months are for outside work.",
  },
  {
    month: "July",
    focus: "Peak AC",
    tasks: [
      "Check the HVAC filter",
      "Watch the water bill and the floor for slab leak signs, like a warm spot",
      "Look for drywood termite pellets under eaves and window sills",
    ],
    why: "Drywood termite swarmers fly during the day in summer and fall.",
  },
  {
    month: "August",
    focus: "Termite swarm watch",
    tasks: [
      "Check the HVAC filter",
      "Watch for daytime termite swarmers and discarded wings on sills",
      "Trim dead wood out of trees before wind season",
    ],
    why: "A small pile of wings on a sill is the clearest sign a swarm was termites, not ants.",
  },
  {
    month: "September",
    focus: "Santa Ana wind prep",
    tasks: [
      "Clean the roof and gutters of leaves and needles",
      "Clear the first 5 feet around the house of dead plants and stored wood",
      "Fix loose tiles, fence sections and gate latches, and plan where patio furniture goes on windy days",
    ],
    why: "Santa Ana winds are most common from October on, so September is the month to get ahead.",
  },
  {
    month: "October",
    focus: "Wind season, rain prep",
    tasks: [
      "Know your Red Flag Warning routine and sign up for outage alerts",
      "Check roof flashing and sealant while it is dry",
      "Turn the sprinkler timer down for fall",
    ],
    why: "Rain comes back slowly: about half an inch in October, 0.8 inch in November and 2 inches in December.",
  },
  {
    month: "November",
    focus: "First rain",
    tasks: [
      "Clear yard drains, and pick up sandbags if your lot takes runoff",
      "Flush the tank water heater",
      "Check weatherstripping, and that soil still slopes away from the house",
    ],
    why: "Subterranean termites can swarm on a clear afternoon after a soaking fall rain.",
  },
  {
    month: "December",
    focus: "Close out the year",
    tasks: [
      "Test alarms again and check the manufacture date on each one",
      "Check the water heater's earthquake straps",
      "Update your home inventory with photos, and file the year's receipts",
    ],
    why: "In an older house on a raised foundation, also see the earthquake retrofit note below.",
  },
];

// How often, for the jobs where a published source gives an interval. The
// rest are placed by month in the calendar above instead of being given an
// interval nobody publishes.
const CADENCE: { task: string; when: string }[] = [
  {
    task: "HVAC air filter",
    when: "Check once a month. Change it when it looks dirty, and at least every 3 months.",
  },
  {
    task: "AC and heating check-ups",
    when: "Cooling in spring, heating in fall, before contractors get busy.",
  },
  {
    task: "Smoke alarms",
    when: "Test once a month. Replace a replaceable battery every six months, and the whole alarm every 10 years.",
  },
  {
    task: "Tank water heater",
    when: "Flush once a year, following the owner's guide.",
  },
  {
    task: "Tankless water heater",
    when: "Descale on the maker's schedule. Hard water is a reason to stay on it.",
  },
  {
    task: "Gutters and roof",
    when: "Clear leaves and needles before wind season, and check flashing before the first rain.",
  },
  {
    task: "Sprinkler timer",
    when: "Adjust by season: down in fall, low through the wet months, back up in spring.",
  },
];

// Every system guide, so the hub is the one page that reaches all of them.
// Link text comes from GUIDE_TITLES, the same titles the guides index shows.
const SYSTEM_GUIDES: { href: string; note: string }[] = [
  { href: "/guides/water-heater-replacement-cost", note: "age, warning signs and replacement cost" },
  { href: "/guides/hard-water-orange-county", note: "hardness by water provider and what it does" },
  { href: "/guides/slab-leak-signs", note: "how to spot a leak under the floor early" },
  { href: "/guides/slab-leak-repair-orange-county", note: "spot repair, reroute or repipe" },
  { href: "/guides/repipe-orange-county", note: "when a whole-house repipe makes sense" },
  { href: "/guides/sewer-line-orange-county", note: "who owns the pipe to the street, and repairs" },
  { href: "/guides/hvac-replacement-cost", note: "repair or replace, and what it costs" },
  { href: "/guides/roof-replacement-cost", note: "lifespan by material and replacement cost" },
  { href: "/guides/electrical-panel-upgrade-cost", note: "older panels and what an upgrade involves" },
  { href: "/guides/termites-orange-county", note: "drywood vs subterranean, and treatment" },
  { href: "/guides/santa-ana-wind-wildfire-home-prep", note: "defensible space, vents and red flag days" },
  { href: "/guides/earthquake-retrofit-orange-county", note: "bolting and bracing older raised-foundation houses" },
  { href: "/guides/permits-orange-county", note: "which jobs need a permit" },
  { href: "/guides/new-homeowner-first-year-orange-county", note: "your first week, month and year" },
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
        Orange County home maintenance checklist, month by month
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/orange-county-home-maintenance-checklist" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        There is no snow to plan around here, so the year is built on four
        local things: Santa Ana winds, the first rains, the marine layer and
        hard water. General information, not professional advice for your
        home.
      </p>

      <section className="mt-8 text-stone-700 dark:text-stone-300">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
          When the weather turns here
        </h2>
        <p className="mt-2 leading-relaxed">
          On NOAA&apos;s 1991 to 2020 normals, John Wayne Airport gets about
          11.2 inches of rain a year, and close to 9 of those inches fall from
          December through March. Santa Ana wind events, the dry offshore
          winds that drive fire season, are most common from October through
          March, according to a National Weather Service climate bulletin, and
          raise the wildfire risk most when they come during or soon after
          the summer dry season. So outside work goes in the dry months, wind
          prep in September, and rain prep in October and November.
        </p>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {MONTHS.map((m) => (
          <section key={m.month} className="card">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h2 className="font-semibold text-stone-900 dark:text-stone-100">{m.month}</h2>
              <span className="text-xs font-medium text-bark-700 dark:text-stone-300">
                {m.focus}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
              {m.why}
            </p>
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
            How often should each job happen?
          </h2>
          <p className="mt-2 leading-relaxed">
            The calendar says when; this says how often. The filter and
            check-up intervals are ENERGY STAR&apos;s, the alarm schedule is the
            Orange County Fire Authority&apos;s, and the yearly flush is what
            the Irvine Ranch Water District recommends for hard water.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-stone-200 dark:border-white/10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-stone-50 text-left dark:bg-stone-800">
                  <th className="px-3 py-2.5 font-semibold text-stone-700 sm:px-4 dark:text-stone-300">
                    Job
                  </th>
                  <th className="px-3 py-2.5 font-semibold text-stone-700 sm:px-4 dark:text-stone-300">
                    How often
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-white/10">
                {CADENCE.map((row) => (
                  <tr key={row.task}>
                    <td className="w-[38%] px-3 py-2.5 align-top font-medium text-stone-900 sm:px-4 dark:text-stone-100">
                      {row.task}
                    </td>
                    <td className="px-3 py-2.5 align-top text-stone-600 sm:px-4 dark:text-stone-400">
                      {row.when}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What should I do before Santa Ana winds?
          </h2>
          <p className="mt-2 leading-relaxed">
            The National Weather Service describes a Santa Ana wind as strong,
            hot, dust-bearing wind that descends to the coast from the inland
            deserts. The August and September tasks above are the start: gutters, the
            first 5 feet around the house, loose tiles and fences, and dead
            limbs. Our{" "}
            <Link href="/guides/santa-ana-wind-wildfire-home-prep" className={linkClass}>
              Santa Ana wind and wildfire prep guide
            </Link>{" "}
            covers embers, vent screens, defensible space and what to do on a
            Red Flag Warning day.
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
            and the grading next to the foundation, which should slope away
            from the house so water drains off instead of pooling.
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
            What do the marine layer and salt air do to a house?
          </h2>
          <p className="mt-2 leading-relaxed">
            The Weather Service&apos;s term is a marine push: ocean air moving in,
            much cooler and much more humid. In late spring and early summer
            it is a regular visitor in the coastal cities. For a house that
            means surfaces that stay damp until midday and, close to the
            beach, salt in that dampness. A FEMA technical bulletin says salt
            spray carried by onshore winds significantly speeds up the
            corrosion of metal. It is heaviest near the surf, drops off over
            the first 300 to 3,000 feet from the shoreline, and has been
            measured as far as 5 to 10 miles inland.
            Paint, window tracks, door hardware, light fixtures, garage door
            springs and the outdoor half of the air conditioner all show it
            first.
          </p>
          <p className="mt-2 leading-relaxed">
            The habit that helps is cheap: rinse outdoor metal, screens and
            windows with fresh water, keep exterior paint and sealant intact,
            and look at the fasteners on gates and railings once a year. In a
            beach city, look over gutters, flashing and the AC condenser more
            often than the calendar above says.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How does hard water change the routine?
          </h2>
          <p className="mt-2 leading-relaxed">
            It adds three jobs. The Irvine Ranch Water District says the water
            it imports from the Colorado River and Northern California is
            typically hard, and recommends flushing the water heater once a
            year. Descale a tankless heater on the maker&apos;s schedule, and
            soak aerators and shower heads in vinegar when the flow drops. Our{" "}
            <Link href="/guides/hard-water-orange-county" className={linkClass}>
              hard water guide
            </Link>{" "}
            explains what scale does and lists hardness by provider.
          </p>
          <p className="mt-2 leading-relaxed">
            Outdoors, water cost is the driver. Irvine Ranch Water District
            publishes a month by month watering guide, and the pattern
            holds countywide: run times come down in fall, stay low through
            the wet months, and come back up in spring. Water rebates are in
            our{" "}
            <Link href="/guides/orange-county-home-rebates-2026" className={linkClass}>
              Orange County home rebates guide
            </Link>
            .
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
            What about termites and earthquakes?
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Termites.</strong> The swarm months are in the calendar
              above. Our{" "}
              <Link href="/guides/termites-orange-county" className={linkClass}>
                Orange County termite guide
              </Link>{" "}
              covers what to do if you find them.
            </li>
            <li>
              <strong>Earthquakes.</strong> Water heater straps loosen and get
              removed during repairs, so look once a year. If the house is
              older and sits on a raised foundation, our{" "}
              <Link href="/guides/earthquake-retrofit-orange-county" className={linkClass}>
                earthquake retrofit guide
              </Link>{" "}
              covers the Brace + Bolt grant and the work, and{" "}
              <Link href="/guides/orange-county-home-age" className={linkClass}>
                how old Orange County homes are
              </Link>{" "}
              shows the housing age in your city.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Guides for each system in your home
          </h2>
          <p className="mt-2 leading-relaxed">
            When a job on the list turns into a question, these go deeper.
          </p>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed">
            {SYSTEM_GUIDES.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="font-medium text-bark-700 underline hover:no-underline dark:text-stone-300">
                  {GUIDE_TITLES[g.href]}
                </Link>
                <span className="text-stone-600 dark:text-stone-300">: {g.note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-stone-600 dark:text-stone-300">
            Local notes by city:{" "}
            <Link href="/oc/anaheim" className="text-bark-700 hover:underline dark:text-stone-300">Anaheim</Link>,{" "}
            <Link href="/oc/irvine" className="text-bark-700 hover:underline dark:text-stone-300">Irvine</Link>,{" "}
            <Link href="/huntington-beach" className="text-bark-700 hover:underline dark:text-stone-300">Huntington Beach</Link>,{" "}
            <Link href="/oc/newport-beach" className="text-bark-700 hover:underline dark:text-stone-300">Newport Beach</Link>,{" "}
            <Link href="/oc/santa-ana" className="text-bark-700 hover:underline dark:text-stone-300">Santa Ana</Link>,{" "}
            <Link href="/oc/mission-viejo" className="text-bark-700 hover:underline dark:text-stone-300">Mission Viejo</Link>,{" "}
            <Link href="/oc/lake-forest" className="text-bark-700 hover:underline dark:text-stone-300">Lake Forest</Link>,{" "}
            <Link href="/oc/san-clemente" className="text-bark-700 hover:underline dark:text-stone-300">San Clemente</Link> and{" "}
            <Link href="/oc/fullerton" className="text-bark-700 hover:underline dark:text-stone-300">Fullerton</Link>, or every city on the{" "}
            <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">Orange County hub</Link>.
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
            As of September 2026. The first rain and the first wind event move
            from year to year. Roof, ladder, electrical and hot-water jobs
            carry real risk: do what you can from the ground, and follow your
            appliance manuals and your fire department&apos;s instructions.
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

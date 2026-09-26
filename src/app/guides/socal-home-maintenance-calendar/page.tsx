import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide and the intended shareable asset for the launch market:
// this is the page a Facebook group admin links to and the page a
// door-hanger QR code points at. Re-aimed at Orange County on 2026-09-21 (the
// owner wants to win Orange County searches first): the title, the h1 and an
// "In Orange County" section say so, while the month lists stay true for any
// city in the county, coast or inland.
// Cadence claims mirror src/app/guides/home-maintenance-schedule/page.tsx;
// the climate-specific timing (AC strain, termite swarms, Santa Ana winds,
// first rain) is standard, widely published Southern California guidance,
// not a local statistic.

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
const TITLE = "Orange County home maintenance calendar, month by month";
const DESCRIPTION =
  "A month-by-month home maintenance calendar for Orange County: AC filters, termite swarm season, Santa Ana wind prep, first-rain checks and more.";
const CANONICAL = `${SITE_URL}/guides/socal-home-maintenance-calendar`;

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

interface MonthBlock {
  month: string;
  theme: string;
  tasks: { task: string; why: string }[];
}

const CALENDAR: MonthBlock[] = [
  {
    month: "January",
    theme: "Winter watch",
    tasks: [
      {
        task: "Check the water heater base for rust or pooling water",
        why: "Winter's heavier hot-water use is when an aging unit is most likely to finally fail.",
      },
      {
        task: "Look under sinks for slow leaks",
        why: "Holiday guests mean more use of fixtures that otherwise sit untouched most of the year.",
      },
      {
        task: "Walk the attic or top-floor ceilings after any rain",
        why: "A stain now is cheap to trace; the same leak found in summer has had months to spread.",
      },
    ],
  },
  {
    month: "February",
    theme: "Storm follow-up",
    tasks: [
      {
        task: "Inspect roof flashing and any spots where a recent storm left debris",
        why: "Still rain season here, so a small gap found now can be patched before the next storm finds it first.",
      },
      {
        task: "Test smoke and CO detectors and GFCI outlets",
        why: "The U.S. Fire Administration says to test smoke alarms every month. Tying a full check to two fixed months means it never gets skipped entirely.",
      },
    ],
  },
  {
    month: "March",
    theme: "Spring reset",
    tasks: [
      {
        task: "Check sprinkler heads and irrigation timer settings",
        why: "Watering season is starting back up; a broken head wastes water for months if it goes unnoticed.",
      },
      {
        task: "Walk the exterior for cracked caulk, peeling paint, or stucco cracks",
        why: "Winter is usually what causes these; spring is the easiest time to see and fix them.",
      },
      {
        task: "Clean gutters and downspouts",
        why: "Clears out whatever the winter storms left behind before things dry out and bake in.",
      },
    ],
  },
  {
    month: "April",
    theme: "Get ahead of summer",
    tasks: [
      {
        task: "Schedule an HVAC tune-up",
        why: "Booking before the first heat wave beats competing for an appointment once every AC in the neighborhood is struggling.",
      },
      {
        task: "Clean the dryer vent and refrigerator coils",
        why: "Both work harder once the house is warmer and everything else in it is running more.",
      },
    ],
  },
  {
    month: "May",
    theme: "Pre-heat check",
    tasks: [
      {
        task: "Check exterior faucets and hose bibs for weeping or drips",
        why: "Irrigation use is ramping up, so a small drip now becomes a real water loss over a hot summer.",
      },
      {
        task: "Inspect the roof for any damage winter left behind",
        why: "Easier to spot and fix before summer heat bakes a small issue into a bigger one.",
      },
    ],
  },
  {
    month: "June",
    theme: "Heat is close",
    tasks: [
      {
        task: "Check the HVAC filter and switch to monthly checks",
        why: "The system is about to run daily; a clogged filter makes it work harder for less cooling.",
      },
      {
        task: "Check attic ventilation isn't blocked",
        why: "Good airflow up there is what keeps summer heat from soaking straight through into the living space.",
      },
    ],
  },
  {
    month: "July",
    theme: "Peak AC strain",
    tasks: [
      {
        task: "Change the HVAC filter",
        why: "The system is running daily now; this is the single cheapest thing that protects it.",
      },
      {
        task: "Watch for slab leak signs: a warm spot on the floor or a water bill that jumps for no reason",
        why: "Older slab-foundation homes are prone to this, and it's far cheaper caught early than found late.",
      },
      {
        task: "Check eaves and attic vents for discarded insect wings",
        why: "Early sign of drywood termite swarmers, which fly during the day in summer and fall.",
      },
    ],
  },
  {
    month: "August",
    theme: "Termite swarm watch",
    tasks: [
      {
        task: "Check the HVAC filter again and book service if it's been skipped",
        why: "Late summer is when an Orange County AC system runs the most.",
      },
      {
        task: "Look for termite swarmers near eaves and windowsills",
        why: "Flying ant-like insects around the eaves this time of year can be drywood termite swarmers rather than ants; small discarded wings on a sill are the telltale sign.",
      },
    ],
  },
  {
    month: "September",
    theme: "Santa Ana wind prep",
    tasks: [
      {
        task: "Trim dead or overhanging tree limbs",
        why: "The first offshore wind events of the season turn a dead branch into either roof damage or a fire risk.",
      },
      {
        task: "Secure or store patio furniture and umbrellas",
        why: "Santa Ana gusts are strong enough to turn loose furniture into a projectile.",
      },
      {
        task: "Check the roof for loose tiles or shingles",
        why: "Anything already loose is what wind season finds first.",
      },
      {
        task: "Keep watching eaves for termite swarmers",
        why: "Swarmers fly through summer and fall, so it's still worth a look.",
      },
    ],
  },
  {
    month: "October",
    theme: "First-rain prep begins",
    tasks: [
      {
        task: "Clean gutters and downspouts",
        why: "The first rain of the season carries a summer's worth of dust and debris off the roof; clogged gutters can't handle it.",
      },
      {
        task: "Inspect the roof and flashing while it's still dry",
        why: "Any repair is easier and cheaper before the first storm tests it.",
      },
      {
        task: "Check that soil grading still slopes away from the foundation",
        why: "The single biggest factor in whether the first rain drains away or pools against the house.",
      },
    ],
  },
  {
    month: "November",
    theme: "Finish first-rain prep",
    tasks: [
      {
        task: "Clear yard drains and check any sump pump still works",
        why: "The parts of the drainage system that are invisible until the first real storm proves they don't work.",
      },
      {
        task: "Flush the water heater",
        why: "Once-a-year maintenance that clears sediment. The Irvine Ranch Water District recommends it, and hard water is the reason it matters here.",
      },
      {
        task: "Check weatherstripping around doors and windows",
        why: "The first cold, wet weather is what makes a bad seal obvious, so it's worth catching before then.",
      },
    ],
  },
  {
    month: "December",
    theme: "Close out the year",
    tasks: [
      {
        task: "Test smoke and CO detectors and replace batteries",
        why: "The other fixed month for a full check. The U.S. Fire Administration says to replace 9-volt alarm batteries at least once a year and the alarms themselves after 10 years.",
      },
      {
        task: "Check the attic and ceilings after any early storms",
        why: "Catches a new leak while it's still a stain instead of a repair.",
      },
      {
        task: "Check space heater and holiday light cords and outlets",
        why: "Both add real electrical load to circuits that sit unused the rest of the year.",
      },
    ],
  },
];

const FAQS = [
  {
    q: "What's the most important home maintenance task in Orange County?",
    a: "There isn't one single task, but the HVAC filter is the easiest to skip and one of the cheapest ways to protect an expensive system, especially July through September when the AC is running daily. Right behind it: watching for drywood termite swarmers in late summer and clearing gutters before the first rain in fall.",
  },
  {
    q: "What are drywood termite swarmers?",
    a: "Winged termites that leave a colony to start a new one. The University of California's pest program says the most common sighting of drywood termites is these flying adults, during daytime hours in summer and fall. They look like flying ants at a glance; a pile of small discarded wings on a windowsill is the clearest sign it was actually termites.",
  },
  {
    q: "What is Santa Ana wind prep?",
    a: "Getting ahead of Santa Ana winds, which the National Weather Service describes as strong, hot, dust-bearing winds that descend to the Pacific coast from the inland deserts: trimming dead or overhanging tree limbs, securing or storing patio furniture, and checking for loose roof tiles or shingles before the wind finds them.",
  },
  {
    q: "Why does first-rain prep matter so much in Orange County?",
    a: "Homes here go dry for months at a time, so gutters fill with dust and debris, soil compacts, and grading issues go unnoticed until the season's first real storm. Cleaning gutters, checking the roof, and confirming the yard still slopes away from the foundation in October and November is what keeps that first storm from causing damage.",
  },
];

function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export default function SocalHomeMaintenanceCalendarGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      {/* Article node beside the FAQ one. Dates come from src/lib/guides.ts,
          the same map the sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/socal-home-maintenance-calendar"
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
          { label: "Orange County home maintenance calendar" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Orange County home maintenance calendar", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Orange County home maintenance calendar
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/socal-home-maintenance-calendar" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Month by month, built around the Orange County climate: AC strain in
        late summer, drywood termite swarm season, Santa Ana winds, and the
        first fall rain. It works for the beach cities and the inland ones
        alike.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CALENDAR.map((m) => (
          <section key={m.month} className="card">
            <div className="flex items-baseline justify-between">
              <h2 className="font-semibold text-stone-900 dark:text-stone-100">{m.month}</h2>
              <span className="text-xs font-medium text-bark-700 dark:text-stone-300">
                {m.theme}
              </span>
            </div>
            <ul className="mt-3 space-y-2.5">
              {m.tasks.map((t) => (
                <li key={t.task} className="text-sm">
                  <p className="font-medium text-stone-800 dark:text-stone-200">{t.task}</p>
                  <p className="mt-0.5 text-stone-500 dark:text-stone-400">{t.why}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            In Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            A national calendar is built around snow and furnaces. This one is
            built around what actually wears on an Orange County house. Salt
            air: a FEMA technical bulletin says salt spray carried by onshore
            winds significantly accelerates the corrosion of metal, most of
            all within 300 to 3,000 feet of the shoreline and measurably as
            far as 5 to 10 miles inland, so beach-city homes should look over
            exterior metal, from gutters and flashing to the AC condenser,
            more often than this calendar says. Hard water: the Irvine Ranch
            Water District says the water it imports is typically hard and
            recommends a yearly water heater flush, which is the November
            task. Termites: the University of California&apos;s pest program
            puts drywood termite swarmers in summer and fall, which is why the
            July, August, and September lists tell you to look for them.
          </p>
          <p className="mt-2 leading-relaxed">
            For how often each task should happen, rather than when, see our{" "}
            <Link
              href="/guides/home-maintenance-schedule"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              home maintenance schedule
            </Link>
            .
          </p>
          <p className="mt-2 leading-relaxed">
            Our city pages add local detail:{" "}
            <Link
              href="/oc/seal-beach"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Seal Beach
            </Link>
            ,{" "}
            <Link
              href="/oc/newport-beach"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Newport Beach
            </Link>
            ,{" "}
            <Link
              href="/oc/laguna-beach"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Laguna Beach
            </Link>
            ,{" "}
            <Link
              href="/oc/dana-point"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Dana Point
            </Link>
            ,{" "}
            <Link
              href="/oc/san-clemente"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              San Clemente
            </Link>
            , or{" "}
            <Link
              href="/oc"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              all Orange County cities
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Frequently asked questions
          </h2>
          <div className="mt-2 space-y-4">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className="font-medium text-stone-900 dark:text-stone-100">{f.q}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/socal-home-maintenance-calendar" />

      <GuideCta />
    </main>
  );
}

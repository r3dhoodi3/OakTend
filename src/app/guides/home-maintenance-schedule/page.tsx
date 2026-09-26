import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide. The task list below mirrors the tasks OakTend's own
// maintenance plan generator tracks (ALWAYS_SCHEDULE / SYSTEM_SCHEDULE in
// src/lib/maintenancePlan.ts), so the "what to do" side of this page matches
// the app exactly. The "how often" side intentionally does NOT quote that
// file's dueInDays numbers: those are one-time staggering offsets used when
// a plan is first generated (so ten tasks don't all land on day one), not
// real-world recurrence intervals, and presenting them as such would be
// dishonest. Instead each cadence below is standard, widely published
// maintenance guidance for that same task.

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
const TITLE = "Home maintenance schedule for Orange County homes";
const DESCRIPTION =
  "How often to change HVAC filters, flush the water heater, service the AC, clean gutters and test smoke alarms, with notes for Orange County homes.";
const CANONICAL = `${SITE_URL}/guides/home-maintenance-schedule`;

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

const SCHEDULE = [
  {
    task: "Smoke and CO detectors",
    cadence: "Test monthly. Replace batteries at least once a year, and the units themselves every 10 years.",
  },
  {
    task: "HVAC air filter",
    cadence: "Check monthly. Replace it when it looks dirty, and at least every 3 months.",
  },
  {
    task: "HVAC tune-up",
    cadence: "Once a year, ideally right before the season you rely on it most.",
  },
  {
    task: "Water heater flush",
    cadence: "Once a year, to clear out mineral and sediment buildup. Hard water makes this one matter more in Orange County.",
  },
  {
    task: "Gutters and downspouts",
    cadence: "Twice a year, spring and fall. More often if trees overhang the roof.",
  },
  {
    task: "Roof and flashing inspection",
    cadence: "Twice a year, plus a check after any major storm.",
  },
  {
    task: "Under-sink and toilet leak check",
    cadence: "A few times a year, since small leaks are easy to miss until they've caused damage.",
  },
  {
    task: "GFCI outlets and breakers",
    cadence: "Monthly, using the outlet's built-in test button.",
  },
  {
    task: "Dryer vent and refrigerator coils",
    cadence: "Twice a year, to keep airflow clear and appliances running efficiently.",
  },
  {
    task: "Window caulk and weatherstripping",
    cadence: "Once a year, before the extreme part of the season arrives.",
  },
  {
    task: "Foundation and grading walk",
    cadence: "Once or twice a year, checking for new cracks or water pooling near the house.",
  },
  {
    task: "Sewer line check",
    cadence: "Watch for slow drains year-round. In an older home, consider a camera scope every few years or before buying.",
  },
];

const FAQS = [
  {
    q: "How often should I change my HVAC filter?",
    a: "ENERGY STAR's advice is to check it every month, especially in heavy-use months, change it if it looks dirty, and change it at least every 3 months. Homes with pets or allergy concerns usually end up changing it more often.",
  },
  {
    q: "How often should I flush my water heater?",
    a: "Once a year. The Irvine Ranch Water District recommends a yearly flush to keep sediment from building up and to prolong the life and efficiency of the water heater. It matters here because, according to the district, the water imported from the Colorado River and Northern California is typically hard.",
  },
  {
    q: "How often should I get my AC serviced?",
    a: "Once a year, ideally scheduled before the season you'll rely on it most, so a technician can catch small issues before they turn into a breakdown during the first heat wave.",
  },
  {
    q: "How often should I clean my gutters?",
    a: "Twice a year, in spring and fall, covers most homes. If trees overhang the roof, check more often, since leaves and debris build up faster.",
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

export default function HomeMaintenanceScheduleGuide() {
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
        path="/guides/home-maintenance-schedule"
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
          { label: "Home maintenance schedule for Orange County homes" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Home maintenance schedule for Orange County homes", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Home maintenance schedule for Orange County homes
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/home-maintenance-schedule" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        General guidance that fits most homes. Your own systems and their
        ages can shift the right timing.
      </p>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <p className="leading-relaxed">
            Most home maintenance isn&apos;t complicated, it&apos;s just easy to lose
            track of. Below is a plain schedule covering the tasks that come
            up on nearly every home, in roughly the order they tend to matter.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            The schedule
          </h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-stone-200 dark:border-white/10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-stone-50 text-left dark:bg-stone-800">
                  <th className="px-4 py-2.5 font-semibold text-stone-700 dark:text-stone-300">
                    Task
                  </th>
                  <th className="px-4 py-2.5 font-semibold text-stone-700 dark:text-stone-300">
                    How often
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-white/10">
                {SCHEDULE.map((row) => (
                  <tr key={row.task}>
                    <td className="px-4 py-2.5 align-top font-medium text-stone-900 dark:text-stone-100">
                      {row.task}
                    </td>
                    <td className="px-4 py-2.5 align-top text-stone-600 dark:text-stone-400">
                      {row.cadence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            The four that matter most
          </h2>
          <p className="mt-2 leading-relaxed">
            <strong>HVAC filters</strong> are the easiest task to skip and one
            of the cheapest ways to protect an expensive system: check monthly,
            replace when dirty, and at least every 3 months.{" "}
            <strong>Water heater flushes</strong>, once a year, clear out the
            sediment that otherwise makes the unit work harder and wear out
            sooner.{" "}
            <strong>AC service</strong>, once a year and ideally before the
            season you need it most, catches small problems, like a low
            refrigerant charge or a failing capacitor, while they&apos;re still
            cheap to fix.{" "}
            <strong>Gutter cleaning</strong>, twice a year, keeps water moving
            away from the roofline and foundation instead of backing up and
            causing damage somewhere it&apos;s expensive to fix.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            In Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            Three things make an Orange County schedule different from a
            national one. Water: the Irvine Ranch Water District says the
            water it imports from the Colorado River and Northern California
            is typically hard and its well water is moderately hard, and it
            recommends flushing the water heater once a year so sediment does
            not build up. Termites: the University of California&apos;s pest
            program says drywood termite swarmers fly during the day in summer
            and fall, so that is when to look for discarded wings on
            windowsills and around eaves. Wind: the National Weather Service
            describes Santa Ana winds as strong, hot, dust-bearing winds that
            descend to the coast from the inland deserts, which is the reason
            to check for loose roof tiles and trim dead limbs before wind
            season.
          </p>
          <p className="mt-2 leading-relaxed">
            For the same tasks laid out month by month, see our{" "}
            <Link
              href="/guides/socal-home-maintenance-calendar"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Orange County home maintenance calendar
            </Link>
            .
          </p>
          <p className="mt-2 leading-relaxed">
            Our city pages add local detail:{" "}
            <Link
              href="/oc/lake-forest"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Lake Forest
            </Link>
            ,{" "}
            <Link
              href="/oc/rancho-santa-margarita"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Rancho Santa Margarita
            </Link>
            ,{" "}
            <Link
              href="/oc/ladera-ranch"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Ladera Ranch
            </Link>
            ,{" "}
            <Link
              href="/oc/laguna-woods"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Laguna Woods
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
      <GuideRelated path="/guides/home-maintenance-schedule" />

      <GuideCta />
    </main>
  );
}

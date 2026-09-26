import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide, aimed at Orange County. Every figure on this page comes
// from a published source listed in GUIDE_SOURCES (src/lib/guideExtras.ts):
// lifespans from InterNACHI, the Department of Energy and ENERGY STAR, heat
// pump water heater prices from ENERGY STAR, hard water from the Irvine Ranch
// and Orange County water districts. It no longer repeats the app's own
// planning figures (REPLACEMENT_INFO / DEFAULT_LIFESPANS in src/lib/health.ts),
// because those have no published source to cite.

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
const TITLE = "Water heater replacement cost in Orange County";
const DESCRIPTION =
  "What changes the price of a new water heater in Orange County: tank, tankless or heat pump, hard water, earthquake straps, and when to repair instead.";
const CANONICAL = `${SITE_URL}/guides/water-heater-replacement-cost`;

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

const FAQS = [
  {
    q: "How much does it cost to replace a water heater in Orange County?",
    a: "No government or utility source publishes a typical installed price for Orange County, so this guide does not print one for a standard tank. A like-for-like tank swap in the same spot is the least expensive version of the job. For heat pump water heaters, ENERGY STAR puts the unit at $1,500 to $3,000 and installation labor and materials at $1,000 to $3,000 on top of that. Those are national figures. For a real local number, ask two or three licensed plumbers for written, itemized prices.",
  },
  {
    q: "Is a tankless water heater worth the extra cost?",
    a: "It depends on how long you'll stay in the home and how much hot water you use. Tankless units cost more upfront and often need bigger gas or electrical service, but they heat water only on demand and take up far less room. A standard tank costs less to install and is simpler to service.",
  },
  {
    q: "When should I repair instead of replace a water heater?",
    a: "Repair usually makes sense for a younger unit with one clear problem, such as a bad thermostat, heating element, or pilot assembly. Replacement usually makes more sense once the tank itself is leaking, the unit is past 10 years old (the age at which ENERGY STAR says it is time to consider replacing it), or you are already paying for more than one repair.",
  },
  {
    q: "Does hard water affect a water heater in Orange County?",
    a: "Yes. The Irvine Ranch Water District says water imported from the Colorado River and Northern California is typically hard and its local well water is moderately hard. InterNACHI notes that the mineral content of water can shorten a water heater's life. Minerals settle as sediment at the bottom of the tank, so the district recommends flushing the water heater once a year.",
  },
  {
    q: "Do water heaters have to be strapped in California?",
    a: "Yes. California Health and Safety Code section 19211 requires all new and replacement water heaters, and all existing residential water heaters, to be braced, anchored, or strapped to resist falling or moving sideways in an earthquake. A seller also has to certify in writing to the buyer that the water heater complies.",
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

export default function WaterHeaterReplacementCostGuide() {
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
        path="/guides/water-heater-replacement-cost"
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
          { label: "Water heater replacement cost in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Water heater replacement cost in Orange County", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Water heater replacement cost in Orange County
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/water-heater-replacement-cost" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        A planning guide for Orange County homeowners. It is not a quote for
        your home.
      </p>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What it costs
          </h2>
          <p className="mt-2 leading-relaxed">
            We looked for a government or utility source that publishes a
            typical installed price for a standard gas tank water heater in
            Orange County and did not find one, so this guide does not print a
            number for it. What holds true everywhere: a like-for-like tank
            swap, same fuel and similar size in the same spot, is the least
            expensive version of the job. Tankless and heat pump units cost
            more to buy and more to install.
          </p>
          <p className="mt-2 leading-relaxed">
            The one published figure we can point to is for heat pump water
            heaters. ENERGY STAR says the unit itself typically runs{" "}
            <strong>$1,500 to $3,000</strong>
            , and that an informal survey of contractors put installation
            labor and materials at{" "}
            <strong>$1,000 to $3,000</strong>
            {" "}
            on top of that. Those are national figures, not Orange County
            ones, and they are a few years old. For a real local number, ask
            two or three licensed plumbers for written, itemized prices.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What actually drives the price
          </h2>
          <p className="mt-2 leading-relaxed">The biggest factors:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Tank vs. tankless.</strong> Tankless costs more upfront.
            </li>
            <li>
              <strong>Fuel type.</strong> Gas vs. electric.
            </li>
            <li>
              <strong>Capacity.</strong> The tank&apos;s size.
            </li>
            <li>
              <strong>Venting or plumbing changes.</strong> Anything needed
              to fit the new unit in.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            A straightforward swap, same fuel type and similar size, in the
            same spot, is the cheapest version of this job. Anything that
            touches the vent, gas line, or electrical circuit adds labor and
            often a permit.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Tank vs. tankless
          </h2>
          <p className="mt-2 leading-relaxed">
            A standard tank water heater keeps a set volume of hot water ready
            to go, costs less to buy and install, and is the simplest to
            service, but it takes up a closet&apos;s worth of space and can run out
            of hot water during heavy use. A tankless unit heats water only as
            you use it and takes up far less room,
            but it costs more upfront, sometimes needs bigger gas or
            electrical service to keep up with demand, and is a bit more
            involved to install and maintain.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When repair beats replacement
          </h2>
          <p className="mt-2 leading-relaxed">
            Published lifespans for a tank water heater vary.
            InterNACHI&apos;s life expectancy chart lists 6 to 12 years for a
            conventional water heater. The U.S. Department of Energy, in its
            2024 efficiency rule for water heaters, estimates an average life
            of around 15 years for storage water heaters. ENERGY STAR&apos;s
            advice is the practical one: once a water heater is more than 10
            years old, it is time to consider replacing it before it fails and
            forces a rushed decision.
          </p>
          <p className="mt-2 leading-relaxed">
            If yours is younger than that and the problem is something
            specific, like a faulty thermostat, heating element, or pilot
            assembly, a repair is usually the cheaper and faster fix.
            Replacement tends to make more sense once the tank itself is
            leaking (tanks don&apos;t get patched), the unit is past that
            10-year mark, or you&apos;re facing a second repair on the same
            unit within a short span. ENERGY STAR lists leaks, rust in the
            water, running short of hot water, and rumbling noises as the
            signs to watch for.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            In Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            Hard water is the local factor. The Irvine Ranch Water District
            says water with 10 grains of hardness or more is generally
            considered hard, that the water it imports from the Colorado River
            and Northern California is typically hard, and that its own well
            water is moderately hard. The Orange County Water District says
            the groundwater basin it manages provides about 85 percent of the
            water supply for 2.5 million people in north and central Orange
            County. InterNACHI notes that the mineral content of water can
            shorten a water heater&apos;s life, and the Irvine Ranch district
            recommends flushing the tank once a year so sediment does not
            build up (see our{" "}
            <Link
              href="/guides/home-maintenance-schedule"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              home maintenance schedule
            </Link>
            ).
          </p>
          <p className="mt-2 leading-relaxed">
            California adds two rules to any replacement. Health and Safety
            Code section 19211 requires every new and replacement water heater
            to be braced, anchored, or strapped against earthquake movement.
            And the state&apos;s 2025 Energy Code, which applies to permits
            applied for on or after January 1, 2026, expands the use of heat
            pumps in newly built homes.
          </p>
          <p className="mt-2 leading-relaxed">
            Permit rules and fees differ from city to city, so ask your
            city&apos;s building department before work starts. Our city pages
            are a starting point:{" "}
            <Link
              href="/oc/irvine"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Irvine
            </Link>
            ,{" "}
            <Link
              href="/oc/anaheim"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Anaheim
            </Link>
            ,{" "}
            <Link
              href="/huntington-beach"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Huntington Beach
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
      <GuideRelated path="/guides/water-heater-replacement-cost" />

      <GuideCta
        signedInHref="/walkthrough"
        signedInLabel="Check your water heater's actual age"
      />
    </main>
  );
}

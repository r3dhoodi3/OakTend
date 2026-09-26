import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide, aimed at Orange County. Every figure on this page comes
// from a published source listed in GUIDE_SOURCES (src/lib/guideExtras.ts):
// lifespans from InterNACHI and ENERGY STAR, coastal corrosion from FEMA, the
// license rule from CSLB. It no longer repeats the app's own planning figures
// (REPLACEMENT_INFO / DEFAULT_LIFESPANS in src/lib/health.ts), because those
// have no published source to cite.

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
const TITLE = "HVAC replacement cost in Orange County: what to expect";
const DESCRIPTION =
  "What changes the price of a new heating and cooling system in Orange County: size, ducts, central AC vs. heat pump, coastal salt air, and when to repair.";
const CANONICAL = `${SITE_URL}/guides/hvac-replacement-cost`;

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
    q: "How much does it cost to replace an HVAC system in Orange County?",
    a: "No government or utility source publishes a typical installed price for Orange County, so this guide does not print one. Where a quote lands depends mostly on the size of unit your home needs, its efficiency rating, whether the ductwork needs work, and the labor to install it. A similarly sized system that reuses sound ducts is the least expensive version of the job. For a real local number, ask two or three licensed HVAC contractors for written, itemized prices.",
  },
  {
    q: "Should I get a heat pump instead of central AC?",
    a: "A standard central air conditioner only cools, so you still need a separate furnace for heat. A heat pump does both jobs with one outdoor unit, moving heat in or out depending on the season, and tends to be more efficient in mild climates. It usually costs more upfront than a straight AC swap, but replaces two systems with one.",
  },
  {
    q: "When should I repair my HVAC instead of replacing it?",
    a: "Repair usually makes sense for a younger system with one clear, contained problem, like a failed capacitor or a refrigerant leak in an otherwise sound unit. ENERGY STAR lists a heat pump or air conditioner more than 10 years old, or a furnace or boiler more than 15 years old, among the signs that it is time to consider replacing. Replacement also tends to make more sense once the system needs a major component like the compressor or heat exchanger, or keeps coming back for repeat repairs.",
  },
  {
    q: "Does living near the coast in Orange County affect my HVAC system?",
    a: "Yes, mostly through salt. A FEMA technical bulletin on coastal construction says salt spray carried by onshore winds significantly accelerates the corrosion of metal, that the salt in the air is greatest within 300 to 3,000 feet of the shoreline, and that studies have found faster corrosion as far as 5 to 10 miles inland. An outdoor condenser is mostly metal, so near the beach it is worth asking an installer about coastal protection and rinsing the unit with fresh water.",
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

export default function HvacReplacementCostGuide() {
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
        path="/guides/hvac-replacement-cost"
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
          { label: "HVAC replacement cost in Orange County: what to expect" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "HVAC replacement cost in Orange County: what to expect", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        HVAC replacement cost in Orange County: what to expect
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/hvac-replacement-cost" />
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
            typical installed price for replacing a central air conditioner
            and furnace in Orange County and did not find one, so this guide
            does not print a number. What holds true everywhere: a similarly
            sized system that reuses sound ductwork is the least expensive
            version of the job. Larger homes, higher-efficiency equipment, and
            duct changes all push the price up.
          </p>
          <p className="mt-2 leading-relaxed">
            ENERGY STAR&apos;s advice before you spend anything: deal with the
            big air leaks in the house and in the duct system first, because
            those are sometimes the real reason a system cannot keep up. For a
            real local number, ask two or three licensed HVAC contractors for
            written, itemized prices.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What actually drives the price
          </h2>
          <p className="mt-2 leading-relaxed">
            Four things mostly decide where a quote lands:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Size.</strong> The unit your home actually needs.
              Bigger is not always better, an oversized system cycles
              inefficiently.
            </li>
            <li>
              <strong>Efficiency rating.</strong> Higher-efficiency equipment
              costs more upfront.
            </li>
            <li>
              <strong>Ductwork.</strong> Whether the existing ducts need
              repair or replacement.
            </li>
            <li>
              <strong>Labor.</strong> Installing the system and charging the
              refrigerant.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            Homes that need duct work done at the same time see the biggest
            jump in price.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Central AC vs. heat pump
          </h2>
          <p className="mt-2 leading-relaxed">
            A standard central air conditioner only cools your home, so you
            still need a separate furnace for heat. A heat pump handles both
            heating and cooling with one outdoor unit, moving heat in during
            winter and out during summer, and tends to be more efficient in
            milder climates where temperatures rarely swing to extremes. It
            typically costs more upfront than a plain AC swap, but it is
            replacing what would otherwise be two separate systems.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When repair beats replacement
          </h2>
          <p className="mt-2 leading-relaxed">
            Published lifespans vary by equipment. InterNACHI&apos;s life
            expectancy chart lists 7 to 15 years for a central air
            conditioner, 10 to 15 years for a heat pump, and 15 to 25 years
            for a furnace. ENERGY STAR lists a heat pump or air conditioner
            that is more than 10 years old, or a furnace or boiler that is
            more than 15 years old, among the signs that it is time to
            consider replacing.
          </p>
          <p className="mt-2 leading-relaxed">
            If yours is younger than that and the issue is a single, contained
            part, like a capacitor, blower motor, or a refrigerant leak in an
            otherwise sound system, a repair is usually the faster and cheaper
            path. Replacement tends to make more sense once the system is past
            those ages, needs a major part like the compressor or heat
            exchanger, or has needed more than one repair recently.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            In Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            Salt air is the coastal factor. A FEMA technical bulletin on
            coastal construction says salt spray carried by onshore winds
            significantly accelerates the corrosion of metal, that the salt in
            the air is greatest within 300 to 3,000 feet of the shoreline, and
            that studies have found faster corrosion as far as 5 to 10 miles
            inland. The bulletin is about metal connectors and fasteners, but
            the same salt lands on an outdoor condenser&apos;s coil and
            cabinet. Near the beach, ask an installer about coastal protection
            for the outdoor unit and rinse it with fresh water now and then.
            Coastal communities also run milder than inland ones, so the
            system there tends to run fewer hours.
          </p>
          <p className="mt-2 leading-relaxed">
            California&apos;s 2025 Energy Code, which applies to permits
            applied for on or after January 1, 2026, expands the use of heat
            pumps in newly built homes. The Contractors State License Board
            says anyone who contracts for a job that needs a building permit,
            or for work valued at $1,000 or more in combined labor and
            materials, must hold a valid license. An HVAC replacement is well
            past that, so check the license at cslb.ca.gov before you sign.
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
              href="/oc/mission-viejo"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Mission Viejo
            </Link>
            ,{" "}
            <Link
              href="/oc/yorba-linda"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Yorba Linda
            </Link>
            ,{" "}
            <Link
              href="/oc/newport-beach"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Newport Beach
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
      <GuideRelated path="/guides/hvac-replacement-cost" />

      <GuideCta
        signedInHref="/walkthrough"
        signedInLabel="Check your HVAC's actual age"
      />
    </main>
  );
}

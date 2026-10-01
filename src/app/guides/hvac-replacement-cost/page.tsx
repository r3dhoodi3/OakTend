import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";
import OcRemodelCityTable from "@/components/OcRemodelCityTable";

// Public SEO guide, aimed at Orange County. Every figure on this page comes
// from a published source listed in GUIDE_SOURCES (src/lib/guideExtras.ts):
// lifespans from InterNACHI and ENERGY STAR, coastal corrosion from FEMA, the
// license rule from CSLB. It no longer repeats the app's own planning figures
// (REPLACEMENT_INFO / DEFAULT_LIFESPANS in src/lib/health.ts), because those
// have no published source to cite. Climate zones and the 2025 Energy Code
// are in the FAQ; the city table has its rules in src/lib/ocRemodelCities.ts.
//
// TRIMMED 2026-09-26 so each topic has one home: housing age numbers live on
// /guides/orange-county-home-age, rebate amounts on
// /guides/orange-county-home-rebates-2026, the license and down payment rules
// on /guides/contractor-deposit-rules-california and the generic bid
// checklist on /guides/is-my-contractor-quote-fair. This page links to each
// instead of repeating it. The pro side is closed, so nothing here offers to
// find, match or book a contractor.

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
// Kept to 38 characters so the full "<title> | OakTend" stays under 50.
const TITLE = "HVAC replacement cost in Orange County";
const DESCRIPTION =
  "HVAC replacement cost in Orange County: what drives the price, heat pump vs AC, when to repair, coastal salt air, Title 24 testing and permits by city.";
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

// Only questions the body does not already answer: heat pump vs central AC
// and the Energy Code live here and nowhere else on the page. Cost, repair vs
// replace, coastal salt, lifespan, permits and rebates were cut from this
// list on 2026-09-26 because they repeated a body section.
const FAQS = [
  {
    q: "Should I get a heat pump instead of central AC?",
    a: "A standard central air conditioner only cools, so you still need a separate furnace for heat. A heat pump does both jobs with one outdoor unit, moving heat in or out depending on the season, and tends to be more efficient in mild climates. It usually costs more upfront than a straight AC swap, but replaces two systems with one.",
  },
  {
    q: "What is Title 24 and does it apply to an HVAC replacement?",
    a: "Title 24 is California's building code, and Part 6 of it is the Energy Code. Permits applied for on or after January 1, 2026 fall under the 2025 Energy Code. The Energy Commission's compliance manual treats replacing a furnace, heat pump, central air conditioner or ducts as an alteration the code covers, and it requires refrigerant charge verification for heat pumps in every climate zone and for air conditioners in zones 2 and 8 through 15. By the Commission's zip code list, inland Orange County (Irvine, Santa Ana, Anaheim, Tustin and Mission Viejo zip codes, for example) is in zone 8, while coastal zip codes in Huntington Beach, Newport Beach, Costa Mesa and Fountain Valley are in zone 6.",
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
          { label: "HVAC replacement cost in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "HVAC replacement cost in Orange County", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        HVAC replacement cost in Orange County
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/hvac-replacement-cost" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        A planning guide for Orange County homeowners. It is not a quote for
        your home.
      </p>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What it costs
          </h2>
          <p className="mt-2 leading-relaxed">
            We found no government or utility source that publishes a typical
            installed price for replacing a central air conditioner and
            furnace in Orange County, so this guide does not print one. Four
            things mostly decide where a quote lands:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Size.</strong> The unit your home actually needs. An
              oversized system cycles inefficiently.
            </li>
            <li>
              <strong>Efficiency rating.</strong> Higher-efficiency equipment
              costs more upfront.
            </li>
            <li>
              <strong>Ductwork.</strong> Duct repair or replacement done at the
              same time is the biggest jump in price.
            </li>
            <li>
              <strong>Labor.</strong> Installing the system and charging the
              refrigerant.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            A similarly sized system that reuses sound ducts is the least
            expensive version of the job. Before you spend anything, ENERGY
            STAR advises dealing with the big air leaks in the house and the
            ducts, because those are sometimes the real reason a system cannot
            keep up. For a local number, ask at least three licensed HVAC
            contractors for written, itemized prices.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When repair beats replacement
          </h2>
          <p className="mt-2 leading-relaxed">
            InterNACHI&apos;s life expectancy chart lists 7 to 15 years for a
            central air conditioner, 10 to 15 years for a heat pump and 15 to
            25 years for a furnace. ENERGY STAR lists a heat pump or air
            conditioner more than 10 years old, or a furnace or boiler more
            than 15, among the signs it is time to consider replacing.
          </p>
          <p className="mt-2 leading-relaxed">
            A younger system with one contained problem, like a capacitor,
            blower motor or a refrigerant leak in an otherwise sound unit, is
            usually a repair. Replacement makes more sense past those ages,
            when the compressor or heat exchanger fails, or after repeat
            repairs.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What is different in Orange County
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Salt air on the coast.</strong> A FEMA technical bulletin
              on coastal construction says salt spray carried by onshore winds
              significantly accelerates the corrosion of metal, that the salt in
              the air is greatest within 300 to 3,000 feet of the shoreline, and
              that studies have found faster corrosion as far as 5 to 10 miles
              inland. The bulletin is about metal connectors and fasteners, but
              the same salt lands on an outdoor condenser&apos;s coil and
              cabinet. Near the beach, ask an installer about coastal
              protection for the outdoor unit and rinse it with fresh water now
              and then.
            </li>
            <li>
              <strong>Older houses.</strong> Most of the county&apos;s housing
              went up before 1980 (see{" "}
              <Link
                href="/guides/orange-county-home-age"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                how old Orange County homes are
              </Link>
              ). In an older house, have the ducts looked at along with the
              equipment.
            </li>
            <li>
              <strong>Energy Code testing.</strong> Inland zip codes have an
              extra test on a new air conditioner; see the Title 24 question
              below.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Permits and home age by city
          </h2>
          <p className="mt-2 leading-relaxed">
            What each city&apos;s own pages say about heating and air
            conditioning work, with a link to where applications go. Where a
            city&apos;s page does not name the work, we say so rather than
            guess.
          </p>
          <OcRemodelCityTable trade="hvac" />
          <p className="mt-3 leading-relaxed">
            City pages:{" "}
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
            Hiring and reading the bid
          </h2>
          <p className="mt-2 leading-relaxed">
            An HVAC replacement needs a permit, so it needs a licensed
            contractor. The heating and air conditioning license class is
            C-20, and you can check any license at cslb.ca.gov. The limit on
            the down payment is in our{" "}
            <Link
              href="/guides/contractor-deposit-rules-california"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              deposit rules guide
            </Link>
            . On top of the usual checks in{" "}
            <Link
              href="/guides/is-my-contractor-quote-fair"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              is my contractor&apos;s quote fair?
            </Link>
            , an HVAC bid should:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              Name the equipment: type, brand, model, size and efficiency
              rating, for both the indoor and outdoor parts.
            </li>
            <li>List duct repair or replacement as its own line.</li>
            <li>
              Say who gets the permit and whether Energy Code testing, like
              refrigerant charge verification, is included.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Rebates
          </h2>
          <p className="mt-2 leading-relaxed">
            Utility and state rebates change often; what is open now is on
            our{" "}
            <Link
              href="/guides/orange-county-home-rebates-2026"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Orange County home rebates page
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
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
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

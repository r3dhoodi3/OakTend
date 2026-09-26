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
// have no published source to cite. The Orange County section (housing age,
// climate zones, the 2025 Energy Code), the city table (rules in
// src/lib/ocRemodelCities.ts) and the rebates, each dated "as of" the day
// someone opened the program's page, cite their own sources. The pro side is
// closed, so nothing here offers to find, match or book a contractor.

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
  "What changes the price of a new heating and cooling system in Orange County: size, ducts, heat pumps, energy code testing, city permits, and rebates.";
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
    a: "No government or utility source publishes a typical installed price for Orange County, so this guide does not print one. Where a quote lands depends mostly on the size of unit your home needs, its efficiency rating, whether the ductwork needs work, and the labor to install it. A similarly sized system that reuses sound ducts is the least expensive version of the job. For a real local number, ask at least three licensed HVAC contractors for written, itemized prices.",
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
  // Added 2026-09-25 from the "People also ask" questions in the SEO
  // research (OakTend-marketing/seo-research-2026-09-24). Each answer only
  // repeats what the page body already says and sources.
  {
    q: "How long does an HVAC system last?",
    a: "InterNACHI's life expectancy chart lists 7 to 15 years for a central air conditioner, 10 to 15 years for a heat pump, and 15 to 25 years for a furnace. ENERGY STAR suggests considering a replacement once a heat pump or air conditioner is more than 10 years old, or a furnace or boiler more than 15.",
  },
  {
    q: "Do I need a permit to replace my AC or furnace in Orange County?",
    a: "Yes, plan on one. Huntington Beach handles furnace and air conditioner change-outs as express permits filed with an energy compliance form, Newport Beach lets you apply online for a furnace replacement, and Garden Grove's FAQ says heating or air conditioning installations or alterations need a permit. The city table on this page shows what each city's own page says.",
  },
  {
    q: "What is Title 24 and does it apply to an HVAC replacement?",
    a: "Title 24 is California's building code, and Part 6 of it is the Energy Code. Permits applied for on or after January 1, 2026 fall under the 2025 Energy Code. The Energy Commission's compliance manual treats replacing a furnace, heat pump, or central air conditioner as an alteration the code covers, and it requires refrigerant charge verification for heat pumps in every climate zone and for air conditioners in zones 2 and 8 through 15. Inland Orange County zip codes such as Irvine, Santa Ana, and Anaheim are in zone 8.",
  },
  {
    q: "Are there rebates for a new furnace or heat pump in Orange County?",
    a: "Some, and they change. As of September 25, 2026, SoCalGas lists $1.40 to $25 per kBTUh for an ENERGY STAR certified furnace with an AFUE of 92 percent or more, installed by a licensed contractor with proof the permit was closed, first come, first served through December 31, 2026. TECH Clean California's single-family heat pump HVAC incentives have been reserved statewide since November 14, 2025. Check each program's page before you count on the money.",
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
            real local number, ask at least three licensed HVAC contractors for
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
            Why it costs more in Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            No published survey we found gives an Orange County price for a
            new heating and cooling system, so this section explains the local
            things that add to one rather than printing a number.
          </p>
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
              <strong>Older houses.</strong> About 57 percent of Orange
              County&apos;s housing units were built before 1980, by the Census
              Bureau&apos;s 2020 to 2024 American Community Survey. In Fountain
              Valley it is about 82 percent, in Garden Grove 77 percent, and in
              Santa Ana 74 percent, while Irvine is about 21 percent. In an
              older house, have the ducts looked at along with the equipment:
              ENERGY STAR advises dealing with the big air leaks in the house
              and the duct system before investing in a new system.
            </li>
            <li>
              <strong>Energy Code testing inland.</strong> Permits applied for
              on or after January 1, 2026 fall under California&apos;s 2025
              Energy Code, which expands the use of heat pumps in newly built
              homes. For existing homes, the Energy Commission&apos;s compliance
              manual treats replacing a furnace, heat pump, or central air
              conditioner, or replacing ducts, as an alteration the code
              covers. It requires
              refrigerant charge verification for new heat pumps in every
              climate zone and for air conditioners in zones 2 and 8 through
              15. By the Commission&apos;s zip code list, inland Orange County
              (Irvine, Santa Ana, Anaheim, Tustin, and Mission Viejo zip codes,
              for example) is in zone 8, while coastal zip codes in Huntington
              Beach, Newport Beach, Costa Mesa, and Fountain Valley are in zone
              6. Huntington Beach asks for the state energy compliance form
              (CF1R) with every furnace or air conditioner change-out permit.
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
            Permit rules and fees differ from city to city. Our city pages are
            a starting point:{" "}
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
            Hiring in California: what to check
          </h2>
          <p className="mt-2 leading-relaxed">
            The Contractors State License Board says anyone who contracts for a
            job that needs a building permit, or for work valued at{" "}
            <strong>$1,000 or more</strong> in combined labor and materials,
            must hold a valid license. An HVAC replacement is well past that.
            The heating and air conditioning license class is C-20, and you can
            check any license at cslb.ca.gov before you sign.
          </p>
          <p className="mt-2 leading-relaxed">
            A home improvement contract over $500 has to be in writing, and
            the <strong>down payment cannot exceed $1,000 or 10 percent</strong>{" "}
            of the contract price, whichever is less (see our{" "}
            <Link
              href="/guides/contractor-deposit-rules-california"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              deposit rules guide
            </Link>
            ).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How to read the estimate
          </h2>
          <p className="mt-2 leading-relaxed">
            The figures on this page are estimate ranges, not a quote. When a
            real price for your system arrives, check it against this list.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              The contractor&apos;s name, business address, and CSLB license
              number are on it, and the license checks out on the CSLB site.
            </li>
            <li>
              It names the equipment: type, brand, model, size, and efficiency
              rating, for both the indoor and outdoor parts.
            </li>
            <li>
              Duct repair or replacement is its own line, not folded into one
              price.
            </li>
            <li>
              It says who gets the permit and whether any Energy Code testing,
              like refrigerant charge verification, is included.
            </li>
            <li>
              The down payment is no more than $1,000 or 10 percent of the
              price, whichever is less.
            </li>
            <li>
              Payments follow finished work. A contractor may not collect for
              work not yet done or materials not yet delivered.
            </li>
            <li>Start and completion dates are written in.</li>
            <li>
              You have at least three written bids on the same scope. The
              lowest is not automatically the best.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            More on this in{" "}
            <Link
              href="/guides/is-my-contractor-quote-fair"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              is my contractor&apos;s quote fair?
            </Link>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Rebates, as of September 25, 2026
          </h2>
          <p className="mt-2 leading-relaxed">
            Rebate programs open, change, and run out of money, so treat these
            as a snapshot from the day we checked each program&apos;s page.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>SoCalGas.</strong> $1.40 to $25 per kBTUh for an ENERGY
              STAR certified furnace with an AFUE of 92 percent or more,
              installed by a licensed contractor with proof the permit was
              closed, one per household. Funds are first come, first served
              through December 31, 2026 or until they run out.
            </li>
            <li>
              <strong>TECH Clean California.</strong> The state program&apos;s
              single-family heat pump HVAC incentives have been reserved
              statewide since November 14, 2025, and new HEEHRA rebate
              reservations in Central and Southern California go on a
              waitlist.
            </li>
            <li>
              <strong>Southern California Edison.</strong> SCE&apos;s rebate
              page points to SCE Marketplace, to Golden State Rebates for air
              conditioner coupons, and to Comfortably CA for HVAC equipment,
              without listing amounts itself.
            </li>
          </ul>
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

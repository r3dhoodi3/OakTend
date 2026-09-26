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
// lifespans from InterNACHI, the Department of Energy and ENERGY STAR, heat
// pump water heater prices from ENERGY STAR, hard water from the Irvine Ranch
// and Orange County water districts. It no longer repeats the app's own
// planning figures (REPLACEMENT_INFO / DEFAULT_LIFESPANS in src/lib/health.ts),
// because those have no published source to cite. The Orange County section
// (housing age, strapping, permits, the 2025 Energy Code), the city table
// (rules in src/lib/ocRemodelCities.ts) and the rebates, each dated "as of"
// the day someone opened the program's page, cite their own sources. The pro
// side is closed, so nothing here offers to find, match or book a plumber.

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
// Kept to 34 characters so the full "<title> | OakTend" stays under 50.
const TITLE = "Water heater cost in Orange County";
const DESCRIPTION =
  "What changes the price of a new water heater in Orange County: tank, tankless or heat pump, straps and permits by city, rebates, and reading a bid.";
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
    a: "No government or utility source publishes a typical installed price for Orange County, so this guide does not print one for a standard tank. A like-for-like tank swap in the same spot is the least expensive version of the job. For heat pump water heaters, ENERGY STAR puts the unit at $1,500 to $3,000 and installation labor and materials at $1,000 to $3,000 on top of that. Those are national figures. For a real local number, ask at least three licensed plumbers for written, itemized prices.",
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
  // Added 2026-09-25 from the "People also ask" questions in the SEO
  // research (OakTend-marketing/seo-research-2026-09-24). Each answer only
  // repeats what the page body already says and sources.
  {
    q: "How long do water heaters last?",
    a: "Published figures vary. InterNACHI's life expectancy chart lists 6 to 12 years for a conventional water heater, while the U.S. Department of Energy estimates an average life of around 15 years for storage water heaters. ENERGY STAR's practical advice is to start considering a replacement once a water heater is more than 10 years old, before it fails.",
  },
  {
    q: "How do I know if my water heater needs replacing?",
    a: "ENERGY STAR lists the signs: leaks, rust in the water, running short of hot water, and rumbling noises from the tank, along with age past about 10 years. A leaking tank is the clearest one, because tanks do not get patched. A younger unit with one failed part, like a thermostat or heating element, is usually a repair instead.",
  },
  {
    q: "Do I need a permit to replace a water heater in Orange County?",
    a: "Plan on one. Santa Ana issues permits for simple water heater change-outs the same day, over the counter, and Fountain Valley's page says replacing any gas or plumbing system needs a permit. Irvine does not list water heaters among its exemptions. Each city sets its own rules and fees, so check yours before work starts, and make sure the new heater is strapped, which state law requires.",
  },
  {
    q: "Are there rebates for a new water heater in Orange County?",
    a: "Some, and they change. As of September 25, 2026, SoCalGas lists $300 to $575 for a qualifying high-efficiency storage water heater and $80 to $1,500 for a tankless unit that replaces a tank in a single-family detached home, first come, first served through December 31, 2026 or until funds run out. TECH Clean California's single-family heat pump water heater incentives have been reserved statewide since November 14, 2025. Check each program's page before you count on the money.",
  },
  {
    q: "What is Title 24 and does it apply to a water heater replacement?",
    a: "Title 24 is California's building code, and Part 6 of it is the Energy Code. Permits applied for on or after January 1, 2026 fall under the 2025 Energy Code, and the Energy Commission's compliance manual lists replacing an existing water heater as an alteration the code covers. For heat pump water heaters, the 2025 code adds requirements such as ventilation where the unit is installed.",
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
          { label: "Water heater cost in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Water heater cost in Orange County", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Water heater cost in Orange County
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
            at least three licensed plumbers for written, itemized prices.
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
            Why it costs more in Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            No published survey we found gives an Orange County price for a
            water heater, so this section explains the local things that add
            to one rather than printing a number.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Hard water.</strong> The Irvine Ranch Water District says
              water with 10 grains of hardness or more is generally considered
              hard, that the water it imports from the Colorado River and
              Northern California is typically hard, and that its own well
              water is moderately hard. The Orange County Water District says
              the groundwater basin it manages provides about 85 percent of the
              water supply for 2.5 million people in north and central Orange
              County. InterNACHI notes that the mineral content of water can
              shorten a water heater&apos;s life, and the Irvine Ranch district
              recommends flushing the tank once a year so sediment does not
              build up (see our{" "}
              <Link
                href="/guides/orange-county-home-maintenance-checklist"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                Orange County home maintenance checklist
              </Link>
              ).
            </li>
            <li>
              <strong>Older houses.</strong> About 57 percent of Orange
              County&apos;s housing units were built before 1980, by the Census
              Bureau&apos;s 2020 to 2024 American Community Survey. In Fountain
              Valley it is about 82 percent, in Garden Grove 77 percent, and in
              Santa Ana 74 percent, while Irvine is about 21 percent. Switching
              an older house to a heat pump water heater can mean electrical
              work: ENERGY STAR says the unit needs a 240-volt supply where it
              goes, that you may need more capacity at the breaker box, and
              that it needs about 450 cubic feet of air around it (see our{" "}
              <Link
                href="/guides/electrical-panel-upgrade-cost"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                panel upgrade guide
              </Link>
              ).
            </li>
            <li>
              <strong>Earthquake straps.</strong> California Health and Safety
              Code section 19211 requires every new and replacement water
              heater, and every existing residential one, to be braced,
              anchored, or strapped against earthquake movement. A seller also
              has to certify it in writing to the buyer.
            </li>
            <li>
              <strong>A permit.</strong> Replacing a water heater is permitted
              work. Santa Ana, for one, issues permits for simple water heater
              change-outs the same day, over the counter. The city table below
              shows what each city&apos;s own page says.
            </li>
            <li>
              <strong>The 2025 Energy Code.</strong> Permits applied for on or
              after January 1, 2026 fall under California&apos;s 2025 Energy
              Code, which expands the use of heat pumps in newly built homes.
              For an existing home, the Energy Commission&apos;s compliance
              manual lists replacing the water heater as an alteration the code
              covers, and the 2025 code adds requirements for heat pump water
              heaters, such as ventilation where the unit is installed.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Permits and home age by city
          </h2>
          <p className="mt-2 leading-relaxed">
            What each city&apos;s own pages say about water heater and plumbing
            work, with a link to where applications go. Where a city&apos;s page
            does not name the work, we say so rather than guess.
          </p>
          <OcRemodelCityTable trade="waterHeater" />
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
            Hiring in California: what to check
          </h2>
          <p className="mt-2 leading-relaxed">
            The Contractors State License Board says anyone who contracts for a
            job that needs a building permit, or for work valued at{" "}
            <strong>$1,000 or more</strong> in combined labor and materials,
            must hold a valid license. A water heater replacement needs a
            permit, so the small-job exception does not apply to it at any
            price. The plumbing license class is C-36, and you can check any
            license at cslb.ca.gov.
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
            real price for your water heater arrives, check it against this
            list.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              The contractor&apos;s name, business address, and CSLB license
              number are on it, and the license checks out on the CSLB site.
            </li>
            <li>
              It names the new unit: type (tank, tankless, or heat pump), fuel,
              capacity, and model.
            </li>
            <li>
              Venting, gas line, or electrical changes are listed as their own
              lines, not folded into one price.
            </li>
            <li>It says who gets the permit.</li>
            <li>Earthquake straps are included.</li>
            <li>
              The down payment is no more than $1,000 or 10 percent of the
              price, whichever is less.
            </li>
            <li>
              Payments follow finished work. A contractor may not collect for
              work not yet done or materials not yet delivered.
            </li>
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
              <strong>SoCalGas.</strong> $300 to $575 for a qualifying
              high-efficiency storage water heater (55 gallons or less), and $80
              to $1,500 for a tankless unit that replaces a tank-type heater in a
              single-family detached home. Funds are first come, first served
              through December 31, 2026 or until they run out.
            </li>
            <li>
              <strong>TECH Clean California.</strong> The state program&apos;s
              single-family heat pump water heater incentives have been
              reserved statewide since November 14, 2025, and new HEEHRA
              rebate reservations in Central and Southern California go on a
              waitlist.
            </li>
            <li>
              <strong>Southern California Edison.</strong> SCE&apos;s rebate
              page points to SCE Marketplace and to Golden State Rebates for
              heat pump water heater coupons, without listing amounts itself.
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
      <GuideRelated path="/guides/water-heater-replacement-cost" />

      <GuideCta
        signedInHref="/walkthrough"
        signedInLabel="Check your water heater's actual age"
      />
    </main>
  );
}

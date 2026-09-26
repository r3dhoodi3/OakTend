import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";
import OcRemodelCityTable from "@/components/OcRemodelCityTable";

// Public SEO guide, aimed at Orange County. The cost figure on this page
// comes from the Remodeling 2025 Cost vs. Value Report, Los Angeles market
// (the closest market it covers), listed in GUIDE_SOURCES
// (src/lib/guideExtras.ts). Its reuse rules allow narrative excerpts only (no
// tables), from at most five projects across the whole site, each with the
// report's name, its URL and the copyright line: keep all three when editing,
// and do not add a sixth project. Figures are averages, never quotes. The
// Orange County section (housing age by city, older-home rules, energy code,
// HOA, coastal zone) and the city table cite their own sources: the table's
// rules and data live in src/lib/ocRemodelCities.ts. The pro side is closed,
// so nothing here offers to find, match or book a contractor. The
// signed-in CTA
// points at /contractors?category=remodeling (bathroom work maps to the
// remodeling service category, see SERVICE_CATEGORIES in src/lib/constants.ts).

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
const TITLE = "Bathroom remodel cost in Orange County";
const DESCRIPTION =
  "A sourced 2025 bathroom remodel average near Orange County, why older OC homes cost more, city permit notes, and how to read a contractor's estimate.";
const CANONICAL = `${SITE_URL}/guides/bathroom-remodel-cost`;

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
    q: "How much does a bathroom remodel cost in Orange County?",
    a: "No published cost survey we could find has its own Orange County line, so the closest sourced number is for the Los Angeles market next door. According to the Remodeling 2025 Cost vs. Value Report (www.costvsvalue.com), a midrange remodel of a 5 by 7 foot bathroom, replacing the tub, tile surround, toilet, vanity, medicine cabinet, and tile floor, averaged $27,143 there and $26,138 nationally. A larger primary bathroom, moved plumbing, or custom tile and fixtures cost considerably more.",
  },
  {
    q: "What is the cost per square foot to remodel a bathroom in OC?",
    a: "Divide the Cost vs. Value average for the Los Angeles market by the 35 square foot bathroom it describes and you get about $775 per square foot. That looks high because a bathroom packs plumbing, waterproofing, tile, and electrical into a very small room, which is also why per-square-foot numbers are a poor way to budget a bathroom. Price the scope instead.",
  },
  {
    q: "Do I need a permit to remodel a bathroom in Orange County?",
    a: "It depends on the work. Purely cosmetic updates like paint, a new vanity that reuses the existing plumbing, or new flooring generally do not need a permit. Once you move or add plumbing, change electrical, or alter the layout, most OC cities generally require one. Thresholds vary by city, so check with your local building department before work starts.",
  },
  {
    q: "Does a contractor need a license for a bathroom remodel in California?",
    a: "In California, a contractor needs a CSLB license for any job of $1,000 or more, counting labor and materials combined, as of January 1, 2025. The under-$1,000 exemption does not apply if the job needs any permit, if the person hires helpers, or if a larger job is split into smaller contracts. Most bathroom remodels clear $1,000 easily, so you should confirm a valid license.",
  },
  {
    q: "Is a bathroom remodel worth it at resale?",
    a: "In the Cost vs. Value Report's Los Angeles market for 2025, the midrange bathroom remodel recouped about 90 percent of its cost at resale, so it comes close but does not fully pay for itself. The stronger case is usually daily use and not deferring a bathroom that is leaking or failing, since those problems only get more expensive the longer they wait.",
  },
  // Added 2026-09-25 from the "People also ask" questions in the SEO
  // research (OakTend-marketing/seo-research-2026-09-24). Each answer only
  // repeats what the page body already says and sources.
  {
    q: "How much does it cost to remodel a small bathroom?",
    a: "The Cost vs. Value Report's midrange bathroom is a small one, 5 by 7 feet, and replacing every fixture in it averaged $27,143 in the Los Angeles market in 2025 (www.costvsvalue.com). A cosmetic refresh that keeps the tub and the layout costs less. Moving the toilet or shower, custom tile, or high-end fixtures cost more.",
  },
  {
    q: "What plumbing problems are common in older Orange County homes?",
    a: "About 57 percent of Orange County's housing units were built before 1980, according to the Census Bureau's 2020 to 2024 American Community Survey, and about three in four or more in Fountain Valley, Garden Grove, and Santa Ana. Older tracts can still have galvanized steel supply pipe and cast iron drains. A bathroom remodel opens the walls and floor, so it is the cheapest time to replace them.",
  },
  {
    q: "What is Title 24 and does it apply to my bathroom remodel?",
    a: "Title 24 is California's building code, and Part 6 of it is the Energy Code. Permits applied for on or after January 1, 2026 fall under the 2025 Energy Code. In a permitted bathroom remodel, new lighting or a new exhaust fan can bring parts of it into play, while like-for-like repairs generally do not. Your city's permit counter can tell you which parts apply.",
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

export default function BathroomRemodelCostGuide() {
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
        path="/guides/bathroom-remodel-cost"
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
          { label: "Bathroom remodel cost in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Bathroom remodel cost in Orange County" , href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Bathroom remodel cost in Orange County
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/bathroom-remodel-cost" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Sourced planning figures for Orange County homeowners, not a quote for
        your home. Prices vary.
      </p>

      {/* Hero cost callout: OC range above the fold, before any national number. */}
      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-6 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          Average midrange bathroom remodel, Los Angeles market, 2025
        </p>
        <p className="mt-1 text-3xl font-bold text-stone-900 dark:text-stone-100">
          $27,143
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          From the Remodeling 2025 Cost vs. Value Report
          (www.costvsvalue.com), for a full update of a 5 by 7 foot bathroom
          with all new fixtures and tile. The report has no separate Orange
          County market, so Los Angeles is the closest one. The national
          average for the same job is $26,138.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Cost by scope
          </h2>
          <p className="mt-2 leading-relaxed">
            No published cost survey we could find has its own Orange County
            line, so the closest sourced number is for the Los Angeles market
            next door. According to the Remodeling 2025 Cost vs. Value Report
            (www.costvsvalue.com), a midrange remodel of a 5 by 7 foot
            bathroom averaged{" "}
            <strong>$27,143</strong>
            {" "}
            in the Los Angeles market in 2025 and{" "}
            <strong>$26,138</strong>
            {" "}
            nationally. That job replaces every fixture: a new tub with a
            ceramic tile surround, shower control, toilet, solid-surface
            vanity top with sink, medicine cabinet, and ceramic tile floor.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Less than that:</strong> a cosmetic refresh that keeps
              the tub and the layout, with a new vanity, toilet, fixtures, and
              paint.
            </li>
            <li>
              <strong>More than that:</strong> a larger primary bathroom, a
              relocated toilet or shower, a walk-in shower with custom tile
              and glass, or high-end fixtures. We did not print a number for
              these because the one published figure we could use covers the
              midrange job only.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Cost per square foot
          </h2>
          <p className="mt-2 leading-relaxed">
            Divide that average by the 35 square foot bathroom it describes
            and you get about{" "}
            <strong>$775 per square foot</strong>
            . It looks high because a bathroom packs plumbing, waterproofing,
            tile, and electrical into a very small room. That is also why
            per-square-foot numbers are a poor way to budget a bathroom: price
            the scope instead.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What affects the price
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Layout changes.</strong> Moving the toilet, shower, or
              sink means new plumbing runs, which is one of the biggest cost
              jumps.
            </li>
            <li>
              <strong>Tile and materials.</strong> Standard porcelain costs
              far less than custom stone or intricate patterns that take more
              labor to set.
            </li>
            <li>
              <strong>Fixtures and finishes.</strong> The vanity, faucets,
              shower system, and lighting span a wide price range.
            </li>
            <li>
              <strong>Size and condition.</strong> A larger bath, or one
              hiding water damage or old plumbing behind the walls, costs
              more.
            </li>
            <li>
              <strong>Labor.</strong> A bathroom needs a plumber, a tile
              setter, and an electrician in a small space, so labor is a large
              share of the total.
            </li>
          </ul>
        </section>

        {/* Mid-page get-quotes CTA. Cost numbers are never gated; this is an
            optional next step for a reader ready to price their own project. */}
        <section>
          <p className="leading-relaxed">
            Planning a bathroom remodel?{" "}
            <Link
              href="/contractors?category=remodeling"
              className="font-medium text-bark-700 hover:underline dark:text-stone-300"
            >
              Track this project in OakTend →
            </Link>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Hiring in California: what to check
          </h2>
          <p className="mt-2 leading-relaxed">
            California requires a CSLB contractor license for any job of{" "}
            <strong>$1,000 or more</strong>, counting labor and materials
            together, as of January 1, 2025. That number went up from $500,
            so many sites still quote the old figure. The under-$1,000
            exemption does not apply if the job needs any permit, if the
            person hires helpers, or if a larger job is split into smaller
            contracts. Most bathroom remodels clear $1,000, so confirm a valid
            license before signing.
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
          <p className="mt-2 leading-relaxed">
            On permits, purely cosmetic work like paint, flooring, or a
            like-for-like vanity swap generally does not need one. Once you
            change plumbing, electrical, or the layout, most OC cities
            generally require a permit. Swapping lighting or a bath fan can
            also trigger California energy-code (Title 24) compliance, while
            simple like-for-like repairs generally do not. Thresholds vary by
            city, so check with your local building department before work
            starts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Why it costs more in Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            Orange County has no line of its own in the Cost vs. Value Report,
            which covers Los Angeles as the nearest market. The Los Angeles
            average runs about 4 percent above the national one for the same
            bathroom, so expect local prices above national figures you see
            elsewhere. A bathroom is where an older house shows its age
            first, because it packs the most plumbing into the least space.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Older houses.</strong> About 57 percent of Orange
              County&apos;s housing units were built before 1980, by the Census
              Bureau&apos;s 2020 to 2024 American Community Survey: about 82
              percent in Fountain Valley, 77 percent in Garden Grove, and 74
              percent in Santa Ana, against about 21 percent in Irvine. Older
              tracts can still have galvanized steel supply pipe and cast iron
              drains behind the tile. If the house sits on a concrete slab,
              moving a toilet or shower drain also means cutting concrete,
              which is why keeping the layout saves so much.
            </li>
            <li>
              <strong>Asbestos and lead.</strong> Cal/OSHA presumes that
              sprayed or troweled-on surfacing, such as an acoustic popcorn
              ceiling, in a building built in 1980 or earlier contains asbestos
              unless testing shows it does not. Anyone paid to disturb paint in
              a home built before 1978 must follow the EPA&apos;s lead-safe
              work rules, and California adds its own lead rules for
              construction work. Ask whether a bid includes testing.
            </li>
            <li>
              <strong>Hard water.</strong> The Irvine Ranch Water District
              says the imported water in its system is typically hard and that
              the minerals leave white spots on glassware. Expect the same on
              clear shower glass and dark fixtures when you choose finishes.
            </li>
            <li>
              <strong>The 2025 Energy Code.</strong> Permits applied for on or
              after January 1, 2026 fall under California&apos;s 2025 Energy
              Code. New lighting or a new exhaust fan in a permitted remodel
              can bring parts of it into play.
            </li>
            <li>
              <strong>HOA review and the coastal zone.</strong> Most bathroom
              work is inside the house, but a new or enlarged window can need
              your association&apos;s approval as well as the city permit
              (California Civil Code section 4765 requires the association to
              decide in writing and explain a denial). In the coastal parts of
              Huntington Beach and Newport Beach, work that changes the outside
              of the house can also need a coastal development permit.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Permits and home age by city
          </h2>
          <p className="mt-2 leading-relaxed">
            What each city&apos;s own permit page says, with a link to where
            applications go. Where a city&apos;s page does not list what needs
            a permit, we say so rather than guess.
          </p>
          <OcRemodelCityTable />
          <p className="mt-3 leading-relaxed">
            Permit rules and fees differ from city to city. Our city pages are
            a starting point:{" "}
            <Link
              href="/oc/mission-viejo"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Mission Viejo
            </Link>
            ,{" "}
            <Link
              href="/oc/tustin"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Tustin
            </Link>
            ,{" "}
            <Link
              href="/oc/brea"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Brea
            </Link>
            ,{" "}
            <Link
              href="/oc/laguna-hills"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Laguna Hills
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
            How to read the estimate
          </h2>
          <p className="mt-2 leading-relaxed">
            The figures on this page are estimate ranges, not a quote. When a
            real bid for your bathroom arrives, check it against this list.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              The contractor&apos;s name, business address, and CSLB license
              number are on it, and the license checks out on the CSLB site.
            </li>
            <li>
              The scope is itemized: demolition, waterproofing, tile,
              plumbing, fixtures, electrical, and the fan. A line marked
              &quot;allowance&quot; is a placeholder that can go up.
            </li>
            <li>It says who gets the building permits.</li>
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
              It says how rotted subfloor, old pipe, asbestos, or lead paint
              found after demolition will be priced.
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
            How to save money
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Keep the existing layout.</strong> Leaving the toilet,
              shower, and sink where they are avoids the priciest plumbing
              work.
            </li>
            <li>
              <strong>Refinish instead of replace.</strong> Reglazing a tub or
              refacing a vanity can look fresh for a fraction of replacement.
            </li>
            <li>
              <strong>Choose mid-tier tile and fixtures.</strong> The jump
              from standard to custom finishes is where budgets balloon.
            </li>
            <li>
              <strong>Get more than one itemized bid.</strong> Comparing
              detailed quotes protects you more than any single low number.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            A note on resale value
          </h2>
          <p className="mt-2 leading-relaxed">
            In the Cost vs. Value Report&apos;s Los Angeles market for 2025,
            the midrange bathroom remodel recouped about 90 percent of its
            cost at resale, so it comes close but does not fully pay for
            itself. The stronger reasons are usually daily comfort and not
            putting off a bathroom that is leaking or failing, since those
            problems only get more expensive the longer they sit.
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

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
            Cost and resale figures are from the Remodeling 2025 Cost vs.
            Value Report (www.costvsvalue.com) for the Los Angeles market, the
            closest market the report covers. © 2025 Zonda Media, a Delaware
            Corporation. Complete data from the Remodeling 2025 Cost vs. Value
            Report can be downloaded free at www.costvsvalue.com. Prices vary
            by home and project. OakTend does not set, guarantee, or bid these
            prices and is not a contractor.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/bathroom-remodel-cost" />

      <GuideCta
        signedInHref="/contractors?category=remodeling"
        signedInLabel="Track this in OakTend"
      />
    </main>
  );
}

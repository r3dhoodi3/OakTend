import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";
import OcRemodelCityTable from "@/components/OcRemodelCityTable";

// Public SEO guide, aimed at Orange County. Every cost figure on this page
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
// points at /contractors?category=remodeling (kitchen work maps to the
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
// Kept to 37 characters so the full "<title> | OakTend" stays under 50.
const TITLE = "Kitchen remodel cost in Orange County";
const DESCRIPTION =
  "Sourced 2025 kitchen remodel averages near Orange County, why older OC homes cost more, city permit notes, and how to read a contractor's estimate.";
const CANONICAL = `${SITE_URL}/guides/kitchen-remodel-cost`;

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
    q: "How much does a kitchen remodel cost in Orange County?",
    a: "No published cost survey we could find has its own Orange County line, so the closest sourced numbers are for the Los Angeles market next door. According to the Remodeling 2025 Cost vs. Value Report (www.costvsvalue.com), a minor midrange remodel of a 200 square foot kitchen, which keeps the cabinet boxes and replaces the fronts, counters, range, refrigerator, sink, and flooring, averaged $29,765 there. A major midrange remodel of the same kitchen, with new semi-custom cabinets, an island, and all new appliances, averaged $86,214. An upscale kitchen with custom cabinets, stone, and professional appliances costs far more.",
  },
  {
    q: "What is the cost per square foot for a kitchen remodel?",
    a: "Divide the Cost vs. Value averages for the Los Angeles market by the 200 square foot kitchen they describe and you get about $150 per square foot for the minor remodel and about $430 per square foot for the major midrange one. Per-square-foot numbers mislead for kitchens, though, because cabinets, counters, and appliances drive the price far more than floor area does.",
  },
  {
    q: "What is the most expensive part of a kitchen remodel?",
    a: "Cabinets are usually the single biggest line item, and the jump from refacing to semi-custom to full custom is where a budget moves most. Countertops come next, followed by appliances. That is why the two Cost vs. Value projects differ so much: the minor remodel keeps the cabinet boxes, and the major one replaces all 30 linear feet of cabinets.",
  },
  {
    q: "Do I need a permit and a licensed contractor for a kitchen remodel in California?",
    a: "California requires a CSLB contractor license for any job of $1,000 or more, counting labor and materials combined, as of January 1, 2025. The under-$1,000 exemption does not apply if the job needs any permit, if the person hires helpers, or if a big job is split into smaller contracts. On permits, moving electrical, plumbing, or gas, or taking down a wall, generally requires one in OC cities, while purely cosmetic updates like paint or new cabinet fronts generally do not. Check with your local building department.",
  },
  {
    q: "Does a kitchen remodel add value at resale?",
    a: "The smaller job does better. In the Cost vs. Value Report's Los Angeles market for 2025, the minor midrange remodel recouped about 127 percent of its cost at resale, while the major midrange remodel recouped about 57 percent. Beyond resale, an updated, functional kitchen is one of the rooms buyers and daily users notice most, which is part of why it stays a popular project.",
  },
  // Added 2026-09-25 from the "People also ask" questions in the SEO
  // research (OakTend-marketing/seo-research-2026-09-24). Each answer only
  // repeats what the page body already says and sources.
  {
    q: "What is included in a midrange versus a high-end kitchen remodel?",
    a: "In the Cost vs. Value Report's terms, a minor midrange remodel keeps the cabinet boxes and replaces the fronts and hardware, the range and refrigerator, laminate counters, the sink and faucet, and the flooring. A major midrange remodel replaces the cabinets with semi-custom ones, adds an island, and puts in a full set of new appliances and lighting. Beyond that, a high-end remodel usually means custom cabinets, stone counters, and built-in or commercial-grade appliances, and costs far more than either.",
  },
  {
    q: "Do I need HOA approval before remodeling my kitchen?",
    a: "If you live in a homeowners association, check your CC&Rs before work starts. Interior work often needs no association approval, but anything visible from outside, like a new window, door, or exterior vent, usually goes through the association's architectural review as well as the city permit. California Civil Code section 4765 requires the association to decide in writing, in good faith, and to explain any denial.",
  },
  {
    q: "What is Title 24 and does it apply to my kitchen remodel?",
    a: "Title 24 is California's building code, and Part 6 of it is the Energy Code. Permits applied for on or after January 1, 2026 fall under the 2025 Energy Code. In a permitted kitchen remodel, new lighting, windows, or appliances can bring parts of it into play, while like-for-like repairs generally do not. Your city's permit counter can tell you which parts apply to your plans.",
  },
  {
    q: "How much does a building permit cost in Orange County?",
    a: "There is no single county-wide fee. Each city sets its own permit fees, often based on the value of the work and on which trades (plumbing, electrical, mechanical) are involved, and unincorporated areas go through the County of Orange. Ask your city's permit counter for its current fee schedule before you budget, and check whether the contractor's bid includes permit fees.",
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

export default function KitchenRemodelCostGuide() {
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
        path="/guides/kitchen-remodel-cost"
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
          { label: "Kitchen remodel cost in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Kitchen remodel cost in Orange County" , href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Kitchen remodel cost in Orange County
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/kitchen-remodel-cost" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Sourced planning figures for Orange County homeowners, not a quote for
        your home. Prices vary.
      </p>

      {/* Hero cost callout: OC/SoCal range above the fold. */}
      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-6 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          Average midrange kitchen remodel, Los Angeles market, 2025
        </p>
        <p className="mt-1 text-3xl font-bold text-stone-900 dark:text-stone-100">
          $29,765 minor, $86,214 major
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          From the Remodeling 2025 Cost vs. Value Report
          (www.costvsvalue.com), both for a 200 square foot kitchen. The minor
          remodel keeps the cabinet boxes. The major one replaces them with
          semi-custom cabinets and adds an island. The report has no separate
          Orange County market, so Los Angeles is the closest one.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Cost by scope
          </h2>
          <p className="mt-2 leading-relaxed">
            No published cost survey we could find has its own Orange County
            line, so the closest sourced numbers are for the Los Angeles
            market next door. According to the Remodeling 2025 Cost vs. Value
            Report (www.costvsvalue.com), for a 200 square foot kitchen in
            2025:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Minor remodel, midrange: $29,765 on average.</strong>{" "}
              Keeps the cabinet boxes and replaces the fronts and hardware,
              the range and refrigerator, laminate counters, sink and faucet,
              and flooring, plus paint. The national average for the same job
              was $28,458.
            </li>
            <li>
              <strong>Major remodel, midrange: $86,214 on average.</strong>{" "}
              New semi-custom wood cabinets with an island, laminate counters,
              a full set of new appliances, custom lighting, new flooring, and
              paint. The national average was $82,793.
            </li>
            <li>
              <strong>Upscale:</strong> custom cabinets, stone counters,
              built-in and commercial-grade appliances. It costs far more than
              either, and we do not print a number for it here.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Cost per square foot
          </h2>
          <p className="mt-2 leading-relaxed">
            Divide those two averages by the 200 square foot kitchen they
            describe and you get about{" "}
            <strong>$150 per square foot</strong>
            {" "}
            for the minor remodel and about{" "}
            <strong>$430 per square foot</strong>
            {" "}
            for the major midrange one. Treat per-square-foot numbers with
            care: cabinets, counters, and appliances drive a kitchen&apos;s
            price far more than floor area does.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What affects the price
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Cabinets.</strong> Usually the biggest line item.
              Refacing sound boxes costs far less than new semi-custom
              cabinets, and full custom costs more again.
            </li>
            <li>
              <strong>Countertops.</strong> Laminate, quartz, and standard
              granite sit lower. High-end stone sits much higher.
            </li>
            <li>
              <strong>Appliances.</strong> A basic suite versus
              professional-grade ranges and built-ins is a wide gap.
            </li>
            <li>
              <strong>Layout changes.</strong> Moving plumbing, gas, or
              electrical, or taking out a wall, adds labor and often a permit.
            </li>
            <li>
              <strong>Location.</strong> The Los Angeles market averages above
              run about 4 to 5 percent over the national averages for the same
              two projects.
            </li>
          </ul>
        </section>

        {/* Mid-page get-quotes CTA. Cost numbers are never gated. */}
        <section>
          <p className="leading-relaxed">
            Planning a kitchen remodel?{" "}
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
            together, as of January 1, 2025. That number rose from $500, so
            many sites still cite the old figure. The under-$1,000 exemption
            does not apply if the job needs any permit, if the person hires
            helpers, or if a larger job is split into smaller contracts. A
            kitchen remodel is well past $1,000, so confirm a valid license
            before signing.
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
            On permits, moving electrical, plumbing, or gas, or removing a
            wall, generally requires one in OC cities. Purely cosmetic updates
            like paint or new cabinet fronts without wiring or plumbing
            changes generally do not. New lighting, appliances, or windows can
            also trigger California energy-code (Title 24) compliance, while
            like-for-like repairs generally do not. Thresholds vary by city,
            so check with your local building department before work starts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Why it costs more in Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            Orange County has no line of its own in the Cost vs. Value Report,
            which covers Los Angeles as the nearest market. The Los Angeles
            averages run about 4 to 5 percent above the national ones for the
            same two kitchen projects, so expect local prices above national
            figures you see elsewhere. Beyond labor, five local things tend to
            add to a kitchen budget.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Older houses.</strong> About 57 percent of Orange
              County&apos;s housing units were built before 1980, by the Census
              Bureau&apos;s 2020 to 2024 American Community Survey. In Fountain
              Valley it is about 82 percent, in Garden Grove 77 percent, and in
              Santa Ana 74 percent, while Irvine is about 21 percent. Opening a
              wall in a kitchen that age can turn up wiring or plumbing that
              has to be brought up to current code, and older tracts can still
              have galvanized steel supply pipe or cast iron drains that are
              worth replacing while the walls are open.
            </li>
            <li>
              <strong>Asbestos and lead.</strong> Cal/OSHA presumes that
              sprayed or troweled-on surfacing, such as an acoustic popcorn
              ceiling, in a building built in 1980 or earlier contains asbestos
              unless testing shows it does not. Anyone paid to disturb paint in
              a home built before 1978 must follow the EPA&apos;s lead-safe
              work rules, and California adds its own lead rules for
              construction work. Testing and safe removal are real line items.
            </li>
            <li>
              <strong>The 2025 Energy Code.</strong> Permits applied for on or
              after January 1, 2026 fall under California&apos;s 2025 Energy
              Code. New lighting, windows, or appliances in a permitted remodel
              can bring parts of it into play.
            </li>
            <li>
              <strong>HOA review.</strong> If your home is in an association,
              a new window, door, or exterior vent usually needs the
              association&apos;s approval as well as the city permit, and
              Irvine&apos;s own permit page tells residents to check their
              HOA&apos;s CC&amp;Rs. California Civil Code section 4765 requires
              the association to decide in writing, in good faith, and to
              explain a denial.
            </li>
            <li>
              <strong>The coastal zone.</strong> Parts of Huntington Beach and
              Newport Beach are in the California coastal zone, where
              development can need a coastal development permit on top of the
              building permit. If your remodel changes the outside of the
              house, ask the city whether that applies to your lot.
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
              href="/oc/irvine"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Irvine
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
              href="/oc/yorba-linda"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Yorba Linda
            </Link>
            ,{" "}
            <Link
              href="/oc/aliso-viejo"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Aliso Viejo
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
            real bid for your kitchen arrives, check it against this list.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              The contractor&apos;s name, business address, and CSLB license
              number are on it, and the license checks out on the CSLB site.
            </li>
            <li>
              The scope is itemized: demolition, cabinets, counters,
              appliances, plumbing, electrical, and finishes. A line marked
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
              It says how surprises behind the walls, like old pipe, asbestos,
              or lead paint, will be priced.
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
              <strong>Keep the existing layout.</strong> Leaving plumbing,
              gas, and walls where they are avoids the costliest structural
              work.
            </li>
            <li>
              <strong>Reface instead of replacing cabinets.</strong> New
              fronts and hardware on sound cabinet boxes cost far less than
              full custom.
            </li>
            <li>
              <strong>Choose semi-custom and quartz.</strong> The jump to full
              custom cabinetry and exotic stone is where budgets climb
              fastest.
            </li>
            <li>
              <strong>Keep appliances you can.</strong> Reusing a recent
              fridge or range trims a big chunk without hurting the result.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            A note on resale value
          </h2>
          <p className="mt-2 leading-relaxed">
            The smaller job does better at resale. In the Cost vs. Value
            Report&apos;s Los Angeles market for 2025, the minor midrange
            remodel recouped about 127 percent of its cost, while the major
            midrange remodel recouped about 57 percent. Beyond resale, the
            kitchen is one of the rooms buyers and daily users notice most,
            which is part of why it stays such a common project even when the
            numbers do not fully pay back.
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
      <GuideRelated path="/guides/kitchen-remodel-cost" />

      <GuideCta
        signedInHref="/contractors?category=remodeling"
        signedInLabel="Track this in OakTend"
      />
    </main>
  );
}

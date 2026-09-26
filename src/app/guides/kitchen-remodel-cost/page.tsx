import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide, aimed at Orange County. Every cost figure on this page
// comes from the Remodeling 2025 Cost vs. Value Report, Los Angeles market
// (the closest market it covers), listed in GUIDE_SOURCES
// (src/lib/guideExtras.ts). Its reuse rules allow narrative excerpts only (no
// tables), from at most five projects across the whole site, each with the
// report's name, its URL and the copyright line: keep all three when editing,
// and do not add a sixth project. Figures are averages, never quotes. The
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
const TITLE = "Kitchen remodel cost in Orange County: what to expect";
const DESCRIPTION =
  "What a kitchen remodel costs near Orange County: sourced 2025 averages for a minor and a major remodel, what drives the price, and hiring rules.";
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
            In Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            Orange County has no line of its own in the Cost vs. Value Report,
            which covers Los Angeles as the nearest market. The Los Angeles
            averages run about 4 to 5 percent above the national ones for the
            same two kitchen projects, so expect local prices above national
            figures you see elsewhere.
          </p>
          <p className="mt-2 leading-relaxed">
            The age of the house matters too. The Census Bureau&apos;s 2024
            American Community Survey puts about 12 percent of Orange
            County&apos;s housing units in the 1950s, 19 percent in the 1960s,
            and 22 percent in the 1970s. In a kitchen of that age, opening a
            wall can turn up wiring or plumbing that has to be brought up to
            current code, so leave room in the budget for it.
          </p>
          <p className="mt-2 leading-relaxed">
            California&apos;s rules protect you here. A contractor needs a
            state license for any job of $1,000 or more, a home improvement
            contract over $500 has to be in writing, and the down payment
            cannot exceed $1,000 or 10 percent, whichever is less (see our{" "}
            <Link
              href="/guides/contractor-deposit-rules-california"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              deposit rules guide
            </Link>
            ).
          </p>
          <p className="mt-2 leading-relaxed">
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

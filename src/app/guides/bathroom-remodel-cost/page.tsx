import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide, aimed at Orange County. The cost figure on this page
// comes from the Remodeling 2025 Cost vs. Value Report, Los Angeles market
// (the closest market it covers), listed in GUIDE_SOURCES
// (src/lib/guideExtras.ts). Its reuse rules allow narrative excerpts only (no
// tables), from at most five projects across the whole site, each with the
// report's name, its URL and the copyright line: keep all three when editing,
// and do not add a sixth project. Figures are averages, never quotes. The
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
const TITLE = "Bathroom remodel cost in Orange County: what to expect";
const DESCRIPTION =
  "What a bathroom remodel costs near Orange County: a sourced 2025 average for a midrange remodel, what drives the price, permits, and hiring rules.";
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
            In Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            Orange County has no line of its own in the Cost vs. Value Report,
            which covers Los Angeles as the nearest market. The Los Angeles
            average runs about 4 percent above the national one for the same
            bathroom, so expect local prices above national figures you see
            elsewhere.
          </p>
          <p className="mt-2 leading-relaxed">
            Two local things are worth planning for. Age is one: the Census
            Bureau&apos;s 2024 American Community Survey puts about 19 percent
            of Orange County&apos;s housing units in the 1960s and 22 percent
            in the 1970s, so budget for what opening a 50-year-old wall can
            turn up. If the house sits on a concrete slab, moving a toilet or
            shower drain also means cutting concrete, which is why keeping the
            layout saves so much. Water is the other: the Irvine Ranch Water
            District says the imported water in its system is typically hard
            and that the minerals leave white spots on glassware. Expect the
            same on clear shower glass and dark fixtures when you choose
            finishes.
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

import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide, aimed at Orange County. The cost figure on this page
// comes from the Remodeling 2025 Cost vs. Value Report, Los Angeles market
// (the closest market it covers), and the rules from the Government Code and
// the County of Orange, all listed in GUIDE_SOURCES (src/lib/guideExtras.ts).
// The Cost vs. Value reuse rules allow narrative excerpts only (no tables),
// from at most five projects across the whole site, each with the report's
// name, its URL and the copyright line: keep all three when editing, and do
// not add a sixth project. Figures are averages, never quotes. The
// signed-in CTA points at /contractors?category=remodeling (ADU work maps to
// the remodeling service category, see SERVICE_CATEGORIES in
// src/lib/constants.ts).

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
const TITLE = "ADU cost in Orange County: what to expect and the rules";
const DESCRIPTION =
  "What a detached ADU costs near Orange County, with a sourced 2025 average, why a garage conversion costs less, California ADU rules, and how to save.";
const CANONICAL = `${SITE_URL}/guides/adu-cost`;

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
    // og:image comes from the colocated opengraph-image.tsx; Next wires it
    // up automatically for this segment.
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQS = [
  {
    q: "How much does an ADU cost in Orange County?",
    a: "No published cost survey we could find has its own Orange County line, so the closest sourced number is for the Los Angeles market next door. According to the Remodeling 2025 Cost vs. Value Report (www.costvsvalue.com), a new 660 square foot, one-story, one-bedroom detached ADU averaged $178,536 there in 2025, or about $270 per square foot by simple division, and $166,406 nationally. A larger unit costs more. A garage conversion usually costs less, because the walls, roof, and foundation already exist.",
  },
  {
    q: "What is the cheapest type of ADU to build?",
    a: "Converting an existing garage is usually the cheapest path to an ADU. Because the walls, roof, and foundation already exist, you avoid the biggest costs of new construction. The main expenses become insulation, plumbing, electrical, and finishes to turn the shell into a livable unit. We did not find a published survey figure for garage conversions, so we do not print a number for them.",
  },
  {
    q: "Do I need my city's approval and a hearing to build an ADU in California?",
    a: "California ADU approval is ministerial, which means no public hearings. The city reviews your application against the rules and must decide within 60 days. If it misses that deadline, the application is deemed approved. Cities also cannot cap ADU size below 850 square feet for a studio or one-bedroom, or 1,000 square feet for two or more bedrooms. These rules come from California Government Code sections 66310 through 66342.",
  },
  {
    q: "Do I have to live on the property to rent out an ADU in California?",
    a: "For standard ADUs, there is no statewide owner-occupancy requirement. That rule was made permanent in 2024 under AB 976, so you generally can build an ADU and rent it without living on site, though local rules and other permit conditions still apply. Check your city for any specifics.",
  },
  {
    q: "Is an ADU a good investment?",
    a: "If you are counting on resale, the numbers are weak. In the Cost vs. Value Report's Los Angeles market for 2025, a detached ADU recouped about 40 percent of its cost at resale. The stronger case is usually rental income over time, or housing family without paying separate rent or a mortgage elsewhere. Check real rents for small units in your own city before you count on a number.",
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

export default function AduCostGuide() {
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
        path="/guides/adu-cost"
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
          { label: "ADU cost in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "ADU cost in Orange County" , href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        ADU cost in Orange County
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/adu-cost" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Sourced planning figures for Orange County homeowners, not a quote for
        your home. Prices vary.
      </p>

      {/* Hero cost callout: the one published average we can cite, above the
          fold. Narrative only, never a table (Cost vs. Value reuse rules). */}
      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-6 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          Average detached ADU, Los Angeles market, 2025
        </p>
        <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-100">
          $178,536
        </p>
        <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          From the Remodeling 2025 Cost vs. Value Report
          (www.costvsvalue.com), for a new 660 square foot, one-story,
          one-bedroom detached unit on a slab. The report has no separate
          Orange County market, so Los Angeles is the closest one. The
          national average for the same unit is $166,406.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Cost by type
          </h2>
          <p className="mt-2 leading-relaxed">
            With ADUs, the type matters more than a budget-versus-premium
            label, because the type decides how much new structure you are
            building from scratch.
          </p>
          <p className="mt-2 leading-relaxed">
            The one published average we can cite is for a detached unit.
            According to the Remodeling 2025 Cost vs. Value Report
            (www.costvsvalue.com), a new 660 square foot, one-story detached
            ADU with one bedroom, one bathroom, a kitchen, and a mini-split
            heat pump, built on a slab, averaged{" "}
            <strong>$178,536</strong>
            {" "}
            in the Los Angeles market in 2025 and{" "}
            <strong>$166,406</strong>
            {" "}
            nationally. The report has no separate Orange County market.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Garage conversion:</strong> usually the lowest-cost
              path, since the shell already exists.
            </li>
            <li>
              <strong>Attached ADU:</strong> a new unit built onto the
              existing home, sharing at least one wall.
            </li>
            <li>
              <strong>Detached ADU:</strong> a standalone new building, with
              its own foundation, roof, and utility connections. This is the
              type the figure above describes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Garage conversion: the cheapest path to an ADU
          </h2>
          <p className="mt-2 leading-relaxed">
            Converting an existing garage is usually the most affordable way
            to add an ADU. The reason is simple: the walls, roof, and foundation are
            already there, so you skip the largest costs of new construction.
            The budget instead goes toward insulation, drywall, plumbing,
            electrical, a kitchen and bathroom, windows, and finishes to turn
            a bare shell into a comfortable, code-compliant living space.
          </p>
          <p className="mt-2 leading-relaxed">
            The main variables are how much plumbing and electrical the garage
            needs, whether the slab and roof are sound, and how far the
            existing utilities reach. A garage close to the main home&apos;s water,
            sewer, and panel converts more cheaply than one that needs long
            new utility runs.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Cost per square foot
          </h2>
          <p className="mt-2 leading-relaxed">
            Divide the Los Angeles average by the 660 square foot unit it
            describes and you get about{" "}
            <strong>$270 per square foot</strong>
            . Small units cost more per foot than large ones, because every
            ADU needs a kitchen, a bathroom, and utility connections no matter
            how small it is. Conversions of existing space tend to run lower
            per foot than new detached builds.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What affects the price
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Type.</strong> Conversion, attached, or detached, in
              rising order of cost.
            </li>
            <li>
              <strong>Size.</strong> More square footage means more materials
              and labor.
            </li>
            <li>
              <strong>Site work and utilities.</strong> New foundation,
              grading, and running water, sewer, gas, and electrical to the
              unit can be a large share of a detached build.
            </li>
            <li>
              <strong>Finishes.</strong> Basic versus high-end kitchens,
              baths, and flooring shift the total meaningfully.
            </li>
            <li>
              <strong>Permits and fees.</strong> Plan check, permit, and any
              local fees vary by city.
            </li>
          </ul>
        </section>

        {/* Mid-page get-quotes CTA. Cost numbers are never gated. */}
        <section>
          <p className="leading-relaxed">
            Planning an ADU for your property?{" "}
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
            California ADU rules worth knowing
          </h2>
          <p className="mt-2 leading-relaxed">
            California has made ADUs far easier to build than most homeowners
            expect. Approval is <strong>ministerial</strong>, which means no
            public hearings: the city reviews your application against the
            rules and must decide within <strong>60 days</strong>. If it
            misses that deadline, the application is deemed approved. Cities
            also cannot cap ADU size below 850 square feet for a studio or
            one-bedroom, or 1,000 square feet for two or more bedrooms. For
            standard ADUs there is no statewide owner-occupancy requirement,
            made permanent in 2024 under AB 976, so you generally can build and
            rent without living on site. These rules come from California
            Government Code sections 66310 through 66342.
          </p>
          <p className="mt-2 leading-relaxed">
            An ADU is a structural project, so it needs permits and a licensed
            contractor. California requires a CSLB contractor license for any
            job of <strong>$1,000 or more</strong>, counting labor and
            materials together, as of January 1, 2025. The under-$1,000
            exemption does not apply if the job needs any permit, if the person
            hires helpers, or if a larger job is split into smaller contracts,
            all of which describe an ADU. Structural, electrical, plumbing, and
            gas work generally requires permits in OC cities, and changes to
            lighting, HVAC, windows, or the building envelope can trigger
            California energy-code (Title 24) compliance. Rules vary by city,
            so check with your local building department.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            In Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            Orange County has no line of its own in the Cost vs. Value Report,
            which covers Los Angeles as the nearest market. The Los Angeles
            average for the detached unit runs about 7 percent above the
            national one.
          </p>
          <p className="mt-2 leading-relaxed">
            State law does most of the work here. Under Government Code
            section 66317 a city has 60 days to approve or deny a complete ADU
            application, with no hearing, and section 66315 bars cities from
            adding an owner-occupancy requirement. For homes in unincorporated
            areas, the County of Orange&apos;s OC Development Services says
            ADU applications are processed ministerially and only require a
            building permit, and it publishes pre-approved ADU plans you can
            build from. Government Code section 65852.27 required every city
            and county to set up a program for pre-approved ADU plans by
            January 1, 2025, so ask your planning counter what is on its list
            before paying for a custom design.
          </p>
          <p className="mt-2 leading-relaxed">
            Every city still sets its own fees, setbacks, and parking details
            within the state&apos;s limits. Our city pages are a starting
            point:{" "}
            <Link
              href="/oc/anaheim"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Anaheim
            </Link>
            ,{" "}
            <Link
              href="/oc/santa-ana"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Santa Ana
            </Link>
            ,{" "}
            <Link
              href="/oc/garden-grove"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Garden Grove
            </Link>
            ,{" "}
            <Link
              href="/oc/costa-mesa"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Costa Mesa
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
              <strong>Convert instead of building new.</strong> A garage
              conversion reuses the existing shell and is the cheapest path.
            </li>
            <li>
              <strong>Stay near existing utilities.</strong> Building close to
              the main home&apos;s water, sewer, and panel shortens costly utility
              runs.
            </li>
            <li>
              <strong>Use standard or pre-approved plans.</strong> State law
              required every city and county to set up a pre-approved ADU plan
              program by January 1, 2025. Building from a plan on that list
              can cut plan-check time and design fees.
            </li>
            <li>
              <strong>Keep it single story on the existing slab.</strong>{" "}
              Avoiding a new foundation or second story trims some of the
              biggest structural costs.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            A note on value: think income, not resale
          </h2>
          <p className="mt-2 leading-relaxed">
            If you are counting on resale to justify the cost, the numbers are
            weak. In the Cost vs. Value Report&apos;s Los Angeles market for
            2025, a detached ADU recouped about 40 percent of its cost at
            resale. The stronger case is ongoing value: rent that offsets part
            of a mortgage over time, or housing a family member instead of
            paying separate rent or a mortgage elsewhere. Check real rents for
            small units in your own city before you count on a number. Framed
            as monthly income or avoided housing cost rather than a resale
            bump, the math looks very different.
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
            by property and project. OakTend does not set, guarantee, or bid
            these prices and is not a contractor.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/adu-cost" />

      <GuideCta
        signedInHref="/contractors?category=remodeling"
        signedInLabel="Track this in OakTend"
      />
    </main>
  );
}

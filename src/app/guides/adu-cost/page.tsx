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
// (the closest market it covers), and the rules from the Government Code and
// the County of Orange, all listed in GUIDE_SOURCES (src/lib/guideExtras.ts).
// The Cost vs. Value reuse rules allow narrative excerpts only (no tables),
// from at most five projects across the whole site, each with the report's
// name, its URL and the copyright line: keep all three when editing, and do
// not add a sixth project. Figures are averages, never quotes.
//
// The 2026 law section states only what the bill text, the amended statute or
// the named law-firm summary says (SB 543's fee rules come from the chaptered
// bill, AB 1154 from Government Code section 66333 as amended, AB 462 from
// the Burke, Williams & Sorensen summary, SB 9 from HCD's April 2026 fact
// sheet). The city table with its pre-approved plan column lives in
// src/lib/ocRemodelCities.ts. The pro side is closed, so nothing here offers
// to find, match or book a contractor. The
// signed-in CTA points at /contractors?category=remodeling (ADU work maps to
// the remodeling service category, see SERVICE_CATEGORIES in
// src/lib/constants.ts).
//
// Trimmed 2026-09-26 so each fact appears once. Topics other guides own are
// one sentence and a link here: garage conversions, HOA and coastal review,
// housing age (the city table carries the per-city numbers), asbestos and
// lead rules, reading a bid, and the license and down payment rules. The FAQ
// keeps only the two answers the body does not give (renting without living
// there, and SB 9 lot splits); FAQS feeds both the visible list and the
// FAQPage JSON-LD.

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
const TITLE = "ADU cost in Orange County: 2026 rules";
const DESCRIPTION =
  "ADU cost in Orange County: a sourced 2025 average for a detached unit, the 2026 California ADU law changes, impact fee limits and pre-approved plans by city.";
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
    q: "Can I rent out my ADU in Orange County without living there?",
    a: "For a standard ADU, yes. Government Code section 66315 bars cities from adding an owner-occupancy requirement, and AB 976 made that permanent in 2024. For a junior ADU, AB 1154 allows an owner-occupancy rule only when it shares a bathroom with the main home. Local permit conditions still apply.",
  },
  {
    q: "Can I split my lot under SB 9 instead of building an ADU?",
    a: "Possibly. Per the state housing department's April 2026 fact sheet, SB 9 lets the owner of a qualifying single-family lot in an urbanized area split it into two lots of roughly equal size and build up to two units on each, with ministerial approval within 60 days of a complete application. You sign an affidavit that you intend to live in one of the units for at least three years, and any rental must be for more than 30 days. Exceptions apply, such as homes rented to a tenant in the last three years.",
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
        your home.
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
          (www.costvsvalue.com), for a new 660 square foot, one-story unit on a
          slab with one bedroom, one bathroom, a kitchen and a mini-split heat
          pump. The report has no separate Orange County market, so Los
          Angeles is the closest one. The national average for the same unit
          is $166,406.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Cost by type
          </h2>
          <p className="mt-2 leading-relaxed">
            The type decides how much new structure you build from scratch,
            so it moves the price more than finishes do.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Garage conversion:</strong> usually the lowest-cost
              path, since the walls, roof and foundation already exist. The
              parking, setback and permit rules are in{" "}
              <Link
                href="/guides/garage-conversion-vs-adu-orange-county"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                garage conversion vs ADU in Orange County
              </Link>
              .
            </li>
            <li>
              <strong>Attached ADU:</strong> a new unit built onto the
              existing home, sharing at least one wall.
            </li>
            <li>
              <strong>Detached ADU:</strong> a standalone building with its
              own foundation, roof and utility connections. This is the type
              the figure above describes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Cost per square foot
          </h2>
          <p className="mt-2 leading-relaxed">
            Divide the Los Angeles average by the 660 square feet it
            describes and you get about{" "}
            <strong>$270 per square foot</strong>
            . Small units cost more per foot than large ones, because every
            ADU needs a kitchen, a bathroom and utility connections no matter
            how small it is.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What affects the price
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Size.</strong> More square footage means more materials
              and labor.
            </li>
            <li>
              <strong>Site work and utilities.</strong> A new foundation,
              grading, and running water, sewer, gas and electrical to the
              unit can be a large share of a detached build. A unit or garage
              close to the main home&apos;s water, sewer and panel costs less
              to connect than one that needs long new runs.
            </li>
            <li>
              <strong>Condition of what you reuse.</strong> For a conversion,
              whether the slab and roof are sound.
            </li>
            <li>
              <strong>Finishes.</strong> Basic versus high-end kitchens,
              baths and flooring.
            </li>
            <li>
              <strong>Permits and fees.</strong> Plan check, permit and local
              fees vary by city; the 2026 fee limits are below.
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
            Approval is <strong>ministerial</strong>, which means no public
            hearing: under Government Code section 66317 the city reviews your
            application against the rules and must decide within{" "}
            <strong>60 days</strong>, or the application is deemed approved.
            Cities cannot cap ADU size below 850 square feet for a studio or
            one-bedroom, or 1,000 square feet for two or more bedrooms. These
            rules are in Government Code sections 66310 through 66342.
          </p>
          <p className="mt-2 leading-relaxed">
            Because an ADU needs building permits, whoever contracts for it
            must hold a California contractor license, and the down payment
            cannot exceed $1,000 or 10 percent of the price, whichever is less.
            Our{" "}
            <Link
              href="/guides/contractor-deposit-rules-california"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              deposit rules guide
            </Link>{" "}
            covers the rest of the contract rules.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What changed for ADUs in 2026
          </h2>
          <p className="mt-2 leading-relaxed">
            Three state bills signed in fall 2025 change the rules. SB 543 and
            AB 1154 took effect January 1, 2026.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>SB 543: fees and size.</strong> Size limits are now
              measured as interior livable space. A city cannot charge impact
              fees on an ADU of <strong>750 square feet or less</strong> of
              interior livable space, or on a junior ADU of 500 square feet or
              less. Above 750 square feet, impact fees have to be in
              proportion to the size of the main house. Units under 500 square
              feet are treated as too small to trigger school fees. The fee
              limits applied from October 10, 2025. Utility connection and
              permit fees are separate.
            </li>
            <li>
              <strong>AB 1154: junior ADUs.</strong> A city can require the
              owner to live on the property only when the junior ADU shares a
              bathroom with the main home, and a junior ADU rental must be for
              more than 30 days.
            </li>
            <li>
              <strong>AB 462: coastal permits.</strong> In the coastal zone,
              the coastal development permit for an ADU runs alongside the
              city&apos;s own review, and if the city does not act within 60
              days the application is deemed approved. It also lets a detached
              ADU get its certificate of occupancy before the main house, where
              the main house was destroyed in an area under an emergency
              proclamation.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Why it can cost more in Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            The Los Angeles average runs about 7 percent above the national
            one, and four local things can push an ADU higher.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Older houses and garages.</strong> Most Orange County
              homes predate 1980 (the table below has each city&apos;s share).
              Converting an old garage, or tying a new unit into an old house,
              can mean an electrical panel, a{" "}
              <Link
                href="/guides/sewer-line-orange-county"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                sewer line
              </Link>{" "}
              or a water line that needs work first. The asbestos and lead
              paint rules for older homes are in{" "}
              <Link
                href="/guides/orange-county-home-age"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                how old Orange County homes are
              </Link>
              .
            </li>
            <li>
              <strong>The 2025 Energy Code.</strong> A new ADU is new
              construction, and permits applied for on or after January 1,
              2026 fall under California&apos;s 2025 Energy Code, which
              expands the use of heat pumps in new homes.
            </li>
            <li>
              <strong>HOA review.</strong> An association can review the
              design, but under Civil Code section 4751 rules that effectively
              prohibit or unreasonably restrict an ADU on a single-family lot
              are void. Budget time for the review anyway.
            </li>
            <li>
              <strong>The coastal zone.</strong> Parts of Huntington Beach and
              Newport Beach are in it, and Huntington Beach says development
              there may require a coastal development permit. Both reviews are
              explained in our{" "}
              <Link
                href="/guides/hoa-coastal-commission-remodel-orange-county"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                HOA and coastal approvals guide
              </Link>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Permits, home age and pre-approved plans by city
          </h2>
          <p className="mt-2 leading-relaxed">
            A pre-approved plan has already been through the city&apos;s
            review, which can cut design fees and plan-check time. Government
            Code section 65852.27 required every city and county to set up a
            pre-approved ADU plan program by January 1, 2025, so ask your
            planning counter what is on its list before paying for a custom
            design. Irvine, Santa Ana, Anaheim, Huntington Beach and Newport
            Beach all publish them; where we could not confirm a program, the
            table says so.
          </p>
          <OcRemodelCityTable showAduPlans />
          <p className="mt-3 leading-relaxed">
            For homes in unincorporated areas, the County of Orange&apos;s OC
            Development Services says ADU applications are processed
            ministerially and only require a building permit, and it publishes
            pre-approved ADU plans you can build from.
          </p>
          <p className="mt-2 leading-relaxed">
            Every city still sets its own fees, setbacks and parking details
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
            Checking an ADU bid
          </h2>
          <p className="mt-2 leading-relaxed">
            Beyond the basics in{" "}
            <Link
              href="/guides/is-my-contractor-quote-fair"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              is my contractor&apos;s quote fair?
            </Link>
            , an ADU bid should itemize design and plans, city and utility
            fees, foundation, utility runs, framing, roof, kitchen, bathroom
            and finishes. It should say whether a pre-approved city plan is
            being used, and how surprises like an undersized panel or a failing
            sewer line will be priced.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            A note on value: think income, not resale
          </h2>
          <p className="mt-2 leading-relaxed">
            In the Cost vs. Value Report&apos;s Los Angeles market for 2025, a
            detached ADU recouped about 40 percent of its cost at resale. The
            stronger case is rent that offsets part of a mortgage, or housing a
            family member who would otherwise pay rent elsewhere. Check real
            rents for small units in your own city before you count on a
            number.
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
            Value Report (www.costvsvalue.com), Los Angeles market. © 2025
            Zonda Media, a Delaware Corporation. Complete data from the
            Remodeling 2025 Cost vs. Value Report can be downloaded free at
            www.costvsvalue.com. OakTend does not set, guarantee, or bid these
            prices and is not a contractor.
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

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
// older-home section (asbestos, lead, energy code) and the city table cite
// their own sources: the table's rules and data live in
// src/lib/ocRemodelCities.ts. The pro side is closed, so nothing here offers
// to find, match or book a contractor. The signed-in CTA points at
// /contractors?category=remodeling (kitchen work maps to the remodeling
// service category, see SERVICE_CATEGORIES in src/lib/constants.ts).
//
// Trimmed 2026-09-26 so each fact is said once. Topics other guides own get
// one sentence and a link: housing age (orange-county-home-age), HOA and
// coastal review (hoa-coastal-commission-remodel-orange-county), license and
// down payment rules (contractor-deposit-rules-california), reading a bid
// (is-my-contractor-quote-fair). No FAQPage JSON-LD any more: every FAQ
// answer repeated a body section, so the questions became the headings.

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
  "Kitchen remodel cost near Orange County: 2025 averages for minor and major remodels, cost per square foot, what drives the price, older-home costs and permits.";
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

const linkClass = "text-bark-700 hover:underline dark:text-stone-300";

export default function KitchenRemodelCostGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
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
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        Sourced planning figures, not a quote for your home.
      </p>

      {/* Hero cost callout: the sourced figures above the fold. */}
      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-6 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          Average midrange kitchen remodel, Los Angeles market, 2025
        </p>
        <p className="mt-1 text-3xl font-bold text-stone-900 dark:text-stone-100">
          $29,765 minor, $86,214 major
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          From the Remodeling 2025 Cost vs. Value Report
          (www.costvsvalue.com), for a 200 square foot kitchen. The report has
          no Orange County market; Los Angeles is the closest one.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How much does a kitchen remodel cost?
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Minor remodel, midrange: $29,765 on average.</strong>{" "}
              Keeps the cabinet boxes and replaces the fronts and hardware,
              the range and refrigerator, laminate counters, sink and faucet,
              and flooring, plus paint. The national average was $28,458.
            </li>
            <li>
              <strong>Major remodel, midrange: $86,214 on average.</strong>{" "}
              Replaces all 30 linear feet of cabinets with semi-custom wood
              ones, adds an island and laminate counters, and puts in a full
              set of new appliances, custom lighting, new flooring, and paint. The national average was $82,793.
            </li>
            <li>
              <strong>Upscale:</strong> custom cabinets, stone counters, and
              built-in, commercial-grade appliances cost far more. We have no
              sourced figure for it.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            The Los Angeles averages run about 4 to 5 percent above the
            national ones, so expect local prices above national figures you
            see elsewhere.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What is the cost per square foot?
          </h2>
          <p className="mt-2 leading-relaxed">
            About <strong>$150 per square foot</strong> for the minor remodel
            and about <strong>$430 per square foot</strong> for the major
            one, dividing each average by the 200 square foot kitchen. Treat
            those with care: cabinets, counters, and appliances drive a
            kitchen&apos;s price far more than floor area does.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What drives the price?
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
          </ul>
        </section>

        {/* Mid-page CTA. Cost numbers are never gated. */}
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
            What adds cost in Orange County
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>What is behind the walls.</strong> More than half of
              Orange County&apos;s homes were built before 1980 (the table
              below has each city, and{" "}
              <Link href="/guides/orange-county-home-age" className={linkClass}>
                how old Orange County homes are
              </Link>{" "}
              has the rest). Opening a wall that age can turn up wiring or
              plumbing that has to be brought up to code, and older tracts can
              still have galvanized steel supply pipe or cast iron drains
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
              Code (Title 24, Part 6). New lighting, windows, or appliances in
              a permitted remodel can bring parts of it into play; like-for-like
              repairs generally do not. Our{" "}
              <Link href="/guides/window-replacement-cost-orange-county" className={linkClass}>
                window replacement guide
              </Link>{" "}
              lists the numbers a new window has to meet.
            </li>
            <li>
              <strong>HOA and coastal review.</strong> A new window, door, or
              exterior vent can need your association&apos;s approval, and in
              the coastal zone a coastal development permit, on top of the
              city permit. See our{" "}
              <Link
                href="/guides/hoa-coastal-commission-remodel-orange-county"
                className={linkClass}
              >
                HOA and coastal approvals guide
              </Link>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Do I need a permit for a kitchen remodel?
          </h2>
          <p className="mt-2 leading-relaxed">
            Moving electrical, plumbing, or gas, or removing a wall, generally
            needs one in Orange County cities. Paint or new cabinet fronts
            without wiring or plumbing changes generally do not. Each city
            sets its own fees, so ask for the fee schedule and check whether a
            bid includes them. Here is what each city&apos;s own permit page
            says, with a link to where applications go; where a page does not
            list what needs a permit, we say so.
          </p>
          <OcRemodelCityTable />
          <p className="mt-3 leading-relaxed">
            City pages:{" "}
            <Link href="/oc/irvine" className={linkClass}>
              Irvine
            </Link>
            ,{" "}
            <Link href="/oc/newport-beach" className={linkClass}>
              Newport Beach
            </Link>
            ,{" "}
            <Link href="/oc/yorba-linda" className={linkClass}>
              Yorba Linda
            </Link>
            ,{" "}
            <Link href="/oc/aliso-viejo" className={linkClass}>
              Aliso Viejo
            </Link>
            , or{" "}
            <Link href="/oc" className={linkClass}>
              all Orange County cities
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Before you sign
          </h2>
          <p className="mt-2 leading-relaxed">
            Check the contractor&apos;s license and keep the down payment
            within California&apos;s cap; our{" "}
            <Link
              href="/guides/contractor-deposit-rules-california"
              className={linkClass}
            >
              deposit rules guide
            </Link>{" "}
            has both. For a kitchen, ask for a bid that itemizes demolition,
            cabinets, counters, appliances, plumbing, electrical, and
            finishes, and says how surprises behind the walls, like old pipe,
            asbestos, or lead paint, will be priced. A line marked
            &quot;allowance&quot; is a placeholder that can go up. More in{" "}
            <Link
              href="/guides/is-my-contractor-quote-fair"
              className={linkClass}
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
              <strong>Keep appliances you can.</strong> Reusing a recent
              fridge or range trims a big chunk without hurting the result.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Does a kitchen remodel add value at resale?
          </h2>
          <p className="mt-2 leading-relaxed">
            The smaller job does better. In the Los Angeles market for 2025,
            the minor midrange remodel recouped about 127 percent of its cost
            at resale, and the major midrange remodel about 57 percent.
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
            Cost and resale figures are from the Remodeling 2025 Cost vs.
            Value Report (www.costvsvalue.com) for the Los Angeles market, the
            closest market the report covers. © 2025 Zonda Media, a Delaware
            Corporation. Complete data from the Remodeling 2025 Cost vs. Value
            Report can be downloaded free at www.costvsvalue.com. OakTend is
            not a contractor and does not set these prices.
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

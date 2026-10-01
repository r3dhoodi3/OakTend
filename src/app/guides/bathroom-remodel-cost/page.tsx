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
// older-home section (asbestos, lead, hard water, energy code) and the city
// table cite their own sources: the table's rules and data live in
// src/lib/ocRemodelCities.ts. The pro side is closed, so nothing here offers
// to find, match or book a contractor. The signed-in CTA points at
// /contractors?category=remodeling (bathroom work maps to the remodeling
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
// Kept to 38 characters so the full "<title> | OakTend" stays under 50.
const TITLE = "Bathroom remodel cost in Orange County";
const DESCRIPTION =
  "Bathroom remodel cost near Orange County: the 2025 midrange average, cost per square foot, what drives the price in older homes, permits by city and resale.";
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

const linkClass = "text-bark-700 hover:underline dark:text-stone-300";

export default function BathroomRemodelCostGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
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
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        Sourced planning figures, not a quote for your home.
      </p>

      {/* Hero cost callout: the sourced figure above the fold. */}
      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-6 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          Average midrange bathroom remodel, Los Angeles market, 2025
        </p>
        <p className="mt-1 text-3xl font-bold text-stone-900 dark:text-stone-100">
          $27,143
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          From the Remodeling 2025 Cost vs. Value Report
          (www.costvsvalue.com), for a 5 by 7 foot bathroom. The report has no
          Orange County market; Los Angeles is the closest one.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How much does a bathroom remodel cost?
          </h2>
          <p className="mt-2 leading-relaxed">
            The midrange job behind that $27,143 replaces every fixture: a new
            tub with a ceramic tile surround, shower control, toilet,
            solid-surface vanity top with sink, medicine cabinet, and ceramic
            tile floor. The national average for the same job was $26,138,
            so the Los Angeles figure runs about 4 percent higher.
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
              and glass, or high-end fixtures. We have no sourced figure for
              these.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What is the cost per square foot?
          </h2>
          <p className="mt-2 leading-relaxed">
            About <strong>$775 per square foot</strong>, dividing that average
            by the 35 square foot room. It looks high because a bathroom packs
            plumbing, waterproofing, tile, and electrical into a very small
            space, which is why per-square-foot numbers are a poor way to
            budget one. Price the scope instead.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What drives the price?
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Layout changes.</strong> Moving the toilet, shower, or
              sink means new plumbing runs, one of the biggest cost jumps. On
              a concrete slab it also means cutting concrete.
            </li>
            <li>
              <strong>Tile and materials.</strong> Standard porcelain costs
              far less than custom stone or intricate patterns that take more
              labor to set.
            </li>
            <li>
              <strong>Fixtures and finishes.</strong> The vanity, faucets,
              shower system, and lighting span a wide price range. Reglazing a
              tub or refacing a vanity costs a fraction of replacing it.
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

        {/* Mid-page CTA. Cost numbers are never gated; this is an optional
            next step for a reader ready to price their own project. */}
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
            What adds cost in Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            A bathroom is where an older house shows its age first, because it
            packs the most plumbing into the least space.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Old pipe.</strong> More than half of Orange
              County&apos;s homes were built before 1980 (the table below has
              each city, and{" "}
              <Link href="/guides/orange-county-home-age" className={linkClass}>
                how old Orange County homes are
              </Link>{" "}
              has the rest). Older tracts can still have galvanized steel
              supply pipe and cast iron drains behind the tile, and a remodel
              that opens the walls is the cheapest time to replace them; our{" "}
              <Link href="/guides/repipe-orange-county" className={linkClass}>
                repiping guide
              </Link>{" "}
              covers the options.
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
              More in our{" "}
              <Link href="/guides/hard-water-orange-county" className={linkClass}>
                hard water guide
              </Link>
              .
            </li>
            <li>
              <strong>The 2025 Energy Code.</strong> Permits applied for on or
              after January 1, 2026 fall under California&apos;s 2025 Energy
              Code (Title 24, Part 6). New lighting or a new exhaust fan in a
              permitted remodel can bring parts of it into play; like-for-like
              repairs generally do not.
            </li>
            <li>
              <strong>HOA and coastal review.</strong> Most bathroom work is
              inside, but a new or enlarged window can need your
              association&apos;s approval, and in the coastal zone a coastal
              development permit, on top of the city permit. See our{" "}
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
            Do I need a permit to remodel a bathroom?
          </h2>
          <p className="mt-2 leading-relaxed">
            Paint, flooring, or a like-for-like vanity swap generally does
            not need one. Once you change plumbing, electrical, or the layout,
            most Orange County cities require a permit. Here is what each
            city&apos;s own permit page says, with a link to where
            applications go; where a page does not list what needs a permit,
            we say so.
          </p>
          <OcRemodelCityTable />
          <p className="mt-3 leading-relaxed">
            City pages:{" "}
            <Link href="/oc/mission-viejo" className={linkClass}>
              Mission Viejo
            </Link>
            ,{" "}
            <Link href="/oc/tustin" className={linkClass}>
              Tustin
            </Link>
            ,{" "}
            <Link href="/oc/brea" className={linkClass}>
              Brea
            </Link>
            ,{" "}
            <Link href="/oc/laguna-hills" className={linkClass}>
              Laguna Hills
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
            has both. For a bathroom, ask for a bid that itemizes demolition,
            waterproofing, tile, plumbing, fixtures, electrical, and the fan,
            and says how rotted subfloor, old pipe, asbestos, or lead paint
            found after demolition will be priced. A line marked
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
            Is a bathroom remodel worth it at resale?
          </h2>
          <p className="mt-2 leading-relaxed">
            Close, but not quite. In the Los Angeles market for 2025, the
            midrange bathroom remodel recouped about 90 percent of its cost at
            resale. The stronger case is usually daily use, and not putting
            off a bathroom that is leaking, since that only gets more
            expensive.
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
      <GuideRelated path="/guides/bathroom-remodel-cost" />

      <GuideCta
        signedInHref="/contractors?category=remodeling"
        signedInLabel="Track this in OakTend"
      />
    </main>
  );
}

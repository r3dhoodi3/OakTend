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
// the cost range from a 2022 California utility study (NV5 and Redwood Energy
// for PG&E), a national range from Pecan Street, the build-era share from the
// Census Bureau. It no longer repeats the app's own planning figure
// (REPLACEMENT_INFO.electrical_panel in src/lib/health.ts), because that has
// no published source to cite. The Orange County section (decade shares,
// aluminum wiring from the CPSC) and the city table (rules in
// src/lib/ocRemodelCities.ts) cite their own sources; 100 vs 200 amp and the
// utility step are in the FAQ only. TRIMMED 2026-09-26: pre-1980 shares by
// city live on /guides/orange-county-home-age, the license and down payment
// rules on /guides/contractor-deposit-rules-california, the generic bid
// checklist on /guides/is-my-contractor-quote-fair. Federal
// Pacific and Zinsco panels are NOT named here: the CPSC closed its Federal
// Pacific breaker investigation in 1983, saying its data did not establish a
// serious risk and making no finding either way on their safety, and on
// 2026-09-25 no safety agency or fire authority page could be found that
// names either brand as a hazard. Only contractor sites do.
// The pro side is closed, so nothing here offers to find, match or book an
// electrician.

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
// Kept to 35 characters so the full "<title> | OakTend" stays under 50.
const TITLE = "Panel upgrade cost in Orange County";
const DESCRIPTION =
  "Electrical panel upgrade cost in Orange County: a sourced California range, when you need one, 100 vs 200 amp, aluminum wiring and permits by city.";
const CANONICAL = `${SITE_URL}/guides/electrical-panel-upgrade-cost`;

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

// Only questions the body does not already answer: 100 vs 200 amp and the
// utility step live here and nowhere else on the page. Cost, when an upgrade
// is needed, permits, licensing and aluminum wiring were cut from this list
// on 2026-09-26 because they repeated a body section.
const FAQS = [
  {
    q: "Should I go with 100 amp or 200 amp?",
    a: "Amperage is the size of your home's electrical service. Many older homes have 100-amp service, which can be fine for a smaller home with modest needs but can run short once you stack several large loads. Pecan Street's research says most all-electric homes will need at least a 200-amp panel, so 200 amp is the usual target when you upgrade, especially with an EV charger, heat pump or solar planned. An electrician sizes the service to your home's real and planned loads rather than to a rule of thumb.",
  },
  {
    q: "Who deals with the utility during a panel upgrade?",
    a: "Usually the electrician, but ask up front, along with what it adds to the price. Disconnecting and reconnecting the service is coordinated with Southern California Edison or whichever utility serves your address, and a 2022 California study found utility-side work is where costs and delays grow. In Anaheim, which runs its own utility, the city says Anaheim Public Utilities' meter spot report has to be on site at the inspection.",
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

export default function ElectricalPanelUpgradeCostGuide() {
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
        path="/guides/electrical-panel-upgrade-cost"
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
          { label: "Panel upgrade cost in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Panel upgrade cost in Orange County", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Panel upgrade cost in Orange County
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/electrical-panel-upgrade-cost" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        A planning guide for Orange County homeowners, with sourced figures.
        It is not a quote for your home.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          Panel upgrade, California electricians, 2022 study
        </p>
        <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-100">
          $2,000 to $4,500
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          The average in the study was $2,780. That is the homeowner&apos;s
          panel only. Work on the utility&apos;s side, trenching, or moving
          the panel can push the total far higher.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            The typical range
          </h2>
          <p className="mt-2 leading-relaxed">
            We found no published figure for Orange County alone. The range
            above is from a 2022 study done for California utilities by NV5
            and Redwood Energy, whose electricians worked in PG&E and SDG&E
            territory, in Northern California and the San Diego area. Treat it
            as the nearest published figure, not a local one. Nationally, the
            research group Pecan Street put panel upgrades at $1,000 to $5,000
            in 2021.
          </p>
          <p className="mt-2 leading-relaxed">
            When the job also involves the utility&apos;s equipment,
            trenching, a sub-panel, new breakers or long wire runs, the same
            study found totals from $3,000 to more than $18,000. Moving a
            panel or converting an overhead service to underground typically
            ran $3,000 to $10,000. Permit fees in the cities it looked at were
            $130 to $170.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When a panel upgrade is actually needed
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Adding an EV charger.</strong> A Level 2 charger is a
              large, steady load that an older panel may not have room for.
            </li>
            <li>
              <strong>Building an ADU.</strong> A second unit adds significant
              demand and often needs more service capacity. Our{" "}
              <Link href="/guides/garage-conversion-vs-adu-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
                garage conversion vs ADU guide
              </Link>{" "}
              compares the two routes.
            </li>
            <li>
              <strong>Going solar.</strong> Some solar and battery installs
              require a 200-amp panel or a specific bus rating. Our{" "}
              <Link href="/guides/solar-battery-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
                solar and battery guide
              </Link>{" "}
              covers the rest.
            </li>
            <li>
              <strong>An aging or overloaded panel.</strong> Older 100-amp
              panels can run short for a modern home, and a panel that trips
              often is worth having an electrician look at.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            A licensed electrician can do a load calculation and tell you
            whether your current service can carry what you want to add before
            you commit to an upgrade.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            Not sure whether your panel is due? OakTend can track your
            panel&apos;s age alongside the rest of your home&apos;s systems.
          </p>
          <Link
            href="/homeowner-signup"
            className="btn-primary mt-3 px-5 py-2"
          >
            Get a home-specific estimate free
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Permits and why licensed matters
          </h2>
          <p className="mt-2 leading-relaxed">
            A panel or service upgrade needs a permit and an inspection. The
            work touches the main service connection and carries real shock
            and fire risk if it is done wrong. Because it needs a permit,
            California&apos;s small-job exception for unlicensed workers does
            not apply at any price: hire a licensed electrical contractor
            (CSLB class C-10) and check the license at cslb.ca.gov. Confirm the
            electrician is pulling the permit; a permitted, inspected upgrade
            leaves a clean record that protects you at resale and with your
            insurer. The limit on the down payment is in our{" "}
            <Link
              href="/guides/contractor-deposit-rules-california"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              deposit rules guide
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What is different in Orange County
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Older houses.</strong> The 2024 Census survey puts about
              19 percent of the county&apos;s homes in the 1960s and about 22
              percent in the 1970s, so roughly four in ten were wired before EV
              chargers, heat pumps and home batteries existed (more in{" "}
              <Link
                href="/guides/orange-county-home-age"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                how old Orange County homes are
              </Link>
              ). InterNACHI&apos;s life expectancy chart gives a service panel
              about 60 years, so panels from early in that era are reaching it.
            </li>
            <li>
              <strong>Aluminum wiring.</strong> The U.S. Consumer Product
              Safety Commission says homes built before 1965 are unlikely to
              have aluminum branch circuit wiring, but wiring installed between
              1965 and the mid 1970s may be aluminum. A survey done for the
              CPSC found homes built before 1972 and wired with aluminum were
              55 times more likely than copper-wired homes to have a connection
              at an outlet reach fire hazard conditions, and the CPSC warns
              that failing connections seldom give warning signs. If your home
              is from that era, ask the electrician to check the branch wiring
              while the panel is open and to price any repair as its own line.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Permits and home age by city
          </h2>
          <p className="mt-2 leading-relaxed">
            What each city&apos;s own pages say about panel and electrical
            work, with a link to where applications go. Where a city&apos;s page
            does not name the work, we say so rather than guess.
          </p>
          <OcRemodelCityTable trade="panel" />
          <p className="mt-3 leading-relaxed">
            City pages:{" "}
            <Link
              href="/oc/anaheim"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Anaheim
            </Link>
            ,{" "}
            <Link
              href="/oc/fullerton"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Fullerton
            </Link>
            ,{" "}
            <Link
              href="/oc/buena-park"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Buena Park
            </Link>
            ,{" "}
            <Link
              href="/oc/garden-grove"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Garden Grove
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
            How to read the bid
          </h2>
          <p className="mt-2 leading-relaxed">
            On top of the usual checks in{" "}
            <Link
              href="/guides/is-my-contractor-quote-fair"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              is my contractor&apos;s quote fair?
            </Link>
            , a panel bid should:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              State the new service size (for example 200 amps) and whether
              the panel stays where it is or moves.
            </li>
            <li>
              List utility-side work, trenching, a sub-panel and wiring
              repairs as their own lines.
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
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend is not a contractor and does not set or guarantee prices.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/electrical-panel-upgrade-cost" />

      <GuideCta
        signedInHref="/contractors?category=electrical"
        signedInLabel="Track this in OakTend"
      />
    </main>
  );
}

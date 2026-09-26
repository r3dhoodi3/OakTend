import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide, aimed at Orange County. Every figure on this page comes
// from a published source listed in GUIDE_SOURCES (src/lib/guideExtras.ts):
// the cost range from a 2022 California utility study (NV5 and Redwood Energy
// for PG&E), a national range from Pecan Street, the build-era share from the
// Census Bureau. It no longer repeats the app's own planning figure
// (REPLACEMENT_INFO.electrical_panel in src/lib/health.ts), because that has
// no published source to cite.

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
const TITLE = "Electrical panel upgrade cost in Orange County";
const DESCRIPTION =
  "What a panel upgrade costs in California, with sourced figures, when you need one, 100 vs. 200 amp, permits, and what to check in Orange County.";
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

const FAQS = [
  {
    q: "How much does an electrical panel upgrade cost in Orange County?",
    a: "We found no published figure for Orange County alone. The nearest one is a 2022 study for California utilities, in which electricians reported panel upgrades costing $2,000 to $4,500, with an average of $2,780. That covers the homeowner's panel only. The same study found that once utility-side work, trenching, sub-panels, or long wire runs are involved, the total can range from $3,000 to more than $18,000. Nationally, the research group Pecan Street puts panel upgrades at $1,000 to $5,000.",
  },
  {
    q: "When do I actually need a panel upgrade?",
    a: "Common triggers are adding an EV charger, building an ADU, going solar, or running an aging or overloaded panel that trips often. Older 100-amp panels can run short on capacity for a modern home with a heat pump, EV charger, and other large loads. Some older panels from brands with known safety problems are also frequently recommended for replacement. A licensed electrician can tell you whether your current service can carry what you want to add.",
  },
  {
    q: "Should I go with 100 amp or 200 amp?",
    a: "Pecan Street's research says most all-electric homes will need at least a 200-amp panel, so 200 amp is the common target when you are upgrading, especially if you plan to add an EV charger, heat pump, or solar. A 100-amp service can be fine for a smaller home with modest electrical needs, but it can run short once you stack several large loads. An electrician sizes the service to your home's real and planned loads.",
  },
  {
    q: "Do I need a permit to upgrade my electrical panel?",
    a: "Electrical work like a panel or service upgrade generally requires a permit and an inspection, and the utility usually has to coordinate disconnecting and reconnecting the service. Your electrician typically handles the permit. Confirm one is being pulled, since a permitted, inspected upgrade leaves a clean record. Check with your city's building department for the exact requirement.",
  },
  {
    q: "Why does hiring a licensed electrician matter for panel work?",
    a: "A panel upgrade involves the main service connection and carries real shock and fire risk if it is done wrong. A licensed electrician is trained and accountable for the work, pulls the required permit, and gets it inspected. A panel upgrade needs a permit, so California's small-job exception for unlicensed workers does not apply to it at any price. Hire a licensed electrical contractor (CSLB class C-10) and check the license at cslb.ca.gov. A permitted job protects you at resale and with your insurer.",
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
          { label: "Electrical panel upgrade cost in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Electrical panel upgrade cost in Orange County", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Electrical panel upgrade cost in Orange County
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/electrical-panel-upgrade-cost" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        A planning guide for Orange County homeowners, with sourced figures.
        It is an estimate, not a quote for your home. Prices vary.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
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
            We found no published figure for Orange County alone. The nearest
            one is a 2022 study done for California utilities by NV5 and
            Redwood Energy, in which electricians reported that a
            homeowner&apos;s panel upgrade cost{" "}
            <strong>$2,000 to $4,500</strong>
            , with an average of{" "}
            <strong>$2,780</strong>
            . The electricians worked in PG&E and SDG&E territory, in Northern
            California and the San Diego area, so treat it as the nearest
            published figure rather than a local one. Nationally, the research
            group Pecan Street put panel upgrades at $1,000 to $5,000 in 2021.
          </p>
          <p className="mt-2 leading-relaxed">
            That range is for the panel itself. The same California study
            found that when the job also involves the utility&apos;s
            equipment, trenching, a sub-panel, new breakers, or long wire
            runs, the total can range from $3,000 to more than $18,000, and
            that moving a panel or converting an overhead service to
            underground typically ran $3,000 to $10,000. Permit fees in the
            cities it looked at were $130 to $170.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When a panel upgrade is actually needed
          </h2>
          <p className="mt-2 leading-relaxed">
            You do not upgrade a panel for its own sake. The common triggers
            are:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Adding an EV charger.</strong> A Level 2 charger is a
              large, steady load that an older panel may not have room for.
            </li>
            <li>
              <strong>Building an ADU.</strong> A second unit adds significant
              demand and often needs more service capacity.
            </li>
            <li>
              <strong>Going solar.</strong> Some solar and battery installs
              require a 200-amp panel or a specific bus rating.
            </li>
            <li>
              <strong>An aging or overloaded panel.</strong> Older 100-amp
              panels can run short for a modern home, and panels that trip
              often or come from brands with known safety problems are
              frequently recommended for replacement.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            A licensed electrician can do a load calculation and tell you
            whether your current service can carry what you want to add before
            you commit to an upgrade.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            100 amp vs. 200 amp
          </h2>
          <p className="mt-2 leading-relaxed">
            Amperage is the size of your home&apos;s electrical service. Many
            older homes have 100-amp service, which can be fine for a smaller
            home with modest needs. Pecan Street&apos;s research says most
            all-electric homes will need at least a 200-amp panel, which is why
            200 amp is the usual target when you upgrade, especially if you are
            planning an EV charger, a heat pump, or solar. The right answer is
            not automatic; an electrician sizes the service to your home&apos;s
            real and planned loads rather than to a rule of thumb.
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
            Electrical work like a panel or service upgrade generally requires a
            permit and an inspection, and the utility usually has to coordinate
            disconnecting and reconnecting the service. This is not a job to
            hand to an unlicensed handyperson. The work touches the main service
            connection and carries real shock and fire risk if it is done
            wrong.
          </p>
          <p className="mt-2 leading-relaxed">
            A licensed electrician is trained and accountable for the work,
            pulls the required permit, and gets it inspected. A panel upgrade
            needs a permit, so California&apos;s small-job exception for
            unlicensed workers does not apply to it at any price. Hire a
            licensed electrical contractor (CSLB class C-10) and check the
            license at cslb.ca.gov. A permitted, inspected upgrade
            leaves a clean record that protects you at resale and with your
            insurer. Confirm your electrician is pulling the permit, and check
            with your city&apos;s building department for the exact requirement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            In Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            Age is the local factor. The Census Bureau&apos;s 2024 American
            Community Survey puts about 19 percent of Orange County&apos;s
            housing units in the 1960s and about 22 percent in the 1970s, so
            roughly four in ten homes here were wired before EV chargers, heat
            pumps, and home batteries existed. InterNACHI&apos;s life
            expectancy chart gives a service panel about 60 years, which means
            panels from the early part of that era are now reaching it. Pecan
            Street&apos;s research says most all-electric homes will need at
            least a 200-amp panel.
          </p>
          <p className="mt-2 leading-relaxed">
            The utility matters too. Disconnecting and reconnecting the
            service is coordinated with Southern California Edison or
            whichever utility serves your address, and the California study
            above found that utility-side work is where costs and delays grow.
            Ask the electrician up front who handles the utility request and
            what it adds.
          </p>
          <p className="mt-2 leading-relaxed">
            The Contractors State License Board says anyone who contracts for
            a job that needs a building permit must hold a valid license,
            whatever the price. Permit rules and fees differ from city to
            city. Our city pages are a starting point:{" "}
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
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            Cost figures are from the Service Upgrades for Electrification
            Retrofits Study (NV5 and Redwood Energy for PG&E, May 2022) and
            from Pecan Street (2021). Neither is specific to Orange County.
            All figures are general estimates, not quotes, and actual prices
            vary by home, scope, and contractor. OakTend does not set or
            guarantee prices and is not a contractor. For safety and permit
            requirements, rely on a licensed electrician and your local
            building department.
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

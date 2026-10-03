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
// Census Bureau, the utility steps and timing from SCE's own pages, the
// warning signs from NFPA's electrical safety tip sheet. It does not repeat
// the app's own planning figure (REPLACEMENT_INFO.electrical_panel in
// src/lib/health.ts), because that has no published source to cite.
//
// RETARGETED 2026-10-01: Search Console showed the page getting impressions
// for "electrical panel upgrade" and its variants with zero clicks, so the
// title and H1 now lead with that phrase instead of "Panel upgrade cost".
// The URL stays the same on purpose (it is already indexed).
//
// Concise rule: each fact once. Pre-1980 shares by city live on
// /guides/orange-county-home-age, the down payment rule on
// /guides/contractor-deposit-rules-california, the generic bid checklist on
// /guides/is-my-contractor-quote-fair. Federal Pacific and Zinsco panels are
// NOT named here: the CPSC closed its Federal Pacific breaker investigation in
// 1983, saying its data did not establish a serious risk and making no
// finding either way on their safety, and on 2026-09-25 no safety agency or
// fire authority page could be found that names either brand as a hazard.
// Only contractor sites do. The pro side is closed, so nothing here offers to
// find, match or book an electrician.

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
// 39 characters, so the full "<title> | OakTend" is 49, under the 50 that
// src/lib/ocRemodelCities.test.ts holds the trade guides to. The H1 reads
// "in Orange County"; the title uses a comma only to fit.
const TITLE = "Electrical panel upgrade, Orange County";
const DESCRIPTION =
  "Electrical panel upgrade in Orange County: when you need one, the sourced cost range, how SCE's side works, rebates and city permits.";
const CANONICAL = `${SITE_URL}/guides/electrical-panel-upgrade-cost`;

const LINK = "text-bark-700 underline hover:no-underline dark:text-stone-300";

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

// Only questions the body does not already answer. Cost, when an upgrade is
// needed, the SCE steps, permits and licensing each live in one body section.
const FAQS = [
  {
    q: "Should I go with 100 amp or 200 amp?",
    a: "Amperage is the size of your home's electrical service. Many older homes have 100-amp service, which can be fine for a smaller home with modest needs but can run short once you stack several large loads. Pecan Street's research says most all-electric homes will need at least a 200-amp panel, so 200 amp is the usual target when you upgrade, especially with an EV charger, heat pump or solar planned. An electrician sizes the service to your home's real and planned loads rather than to a rule of thumb.",
  },
  {
    q: "Do I need a panel upgrade to install an EV charger?",
    a: "Not always. It depends on how much spare capacity your panel has, which a load calculation answers. SCE offers an EV Power Plan through its Home Fuel Advisors at 1-800-4EV-INFO, and recommends having an electrician inspect your wiring before your first charge even if you plan to use a Level 1 cord.",
  },
  {
    q: "Is there a federal tax credit for a panel upgrade?",
    a: "Not for work done now. The IRS energy efficient home improvement credit covered panels of 200 amps or more that support qualifying equipment, up to $600, but only for property placed in service before December 31, 2025.",
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
          { label: "Panel upgrade cost" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: TITLE, href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Electrical panel upgrade in Orange County
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/electrical-panel-upgrade-cost" />

      {/* Direct answer first: what it is, who is involved, where to read on. */}
      <p className="mt-4 leading-relaxed text-stone-700 dark:text-stone-300">
        An electrical panel upgrade replaces your main breaker panel and
        usually raises your home&apos;s service, most often from 100 to 200
        amps, so it can carry new loads like an EV charger, a heat pump, solar
        and a battery, or an ADU. It takes a licensed electrician, a city
        permit and inspection, and a disconnect and reconnect by your utility:
        Southern California Edison in most of Orange County, Anaheim Public
        Utilities in Anaheim. This is a planning guide with sourced figures,
        not a quote for your home.
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
            What an electrical panel upgrade costs
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
            When you need one
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Adding an EV charger.</strong> A Level 2 charger is a
              large, steady load that an older panel may not have room for.
            </li>
            <li>
              <strong>Switching gas appliances to electric.</strong> A heat
              pump for heating and cooling, a heat pump water heater, an
              induction range or an electric dryer each add load. Rebates for
              that equipment are in our{" "}
              <Link href="/guides/orange-county-home-rebates-2026" className={LINK}>
                Orange County rebates guide
              </Link>
              .
            </li>
            <li>
              <strong>Going solar or adding a battery.</strong> Some installs
              require a 200-amp panel or a specific bus rating. Our{" "}
              <Link href="/guides/solar-battery-orange-county" className={LINK}>
                solar and battery guide
              </Link>{" "}
              covers the rest.
            </li>
            <li>
              <strong>Building an ADU.</strong> A second unit adds significant
              demand and often needs more service capacity. Our{" "}
              <Link href="/guides/garage-conversion-vs-adu-orange-county" className={LINK}>
                garage conversion vs ADU guide
              </Link>{" "}
              compares the two routes.
            </li>
            <li>
              <strong>An aging or overloaded panel.</strong> Older 100-amp
              panels can run short for a modern home. The warning signs are
              below.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            Ask for a load calculation before you commit. SCE itself says load
            management, energy-efficient equipment or design changes may let
            you add new loads without increasing your service size, which can
            spare you the utility-side work and its wait.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Signs your panel needs an electrician
          </h2>
          <p className="mt-2 leading-relaxed">
            The National Fire Protection Association says to call a qualified
            electrician if you have:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>Breakers that trip or fuses that blow often</li>
            <li>Flickering or dimming lights</li>
            <li>Discolored or warm wall outlets</li>
            <li>A burning or rubbery smell from an appliance</li>
            <li>A tingle when you touch an appliance, or sparks from an outlet</li>
          </ul>
          <p className="mt-2 leading-relaxed">
            These point to a problem worth a visit, not always to a new panel.
            Leave the panel cover on and let the electrician open it.
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
            How the SCE side works
          </h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 leading-relaxed">
            <li>
              The request goes in online through SCE&apos;s{" "}
              <a
                href="https://www.sce.com/partners/consulting-services/building-renovations-planning-project-requests"
                rel="noopener"
                className={LINK}
              >
                Building, Renovation, and Project Planning Portal
              </a>
              , which lists panel upgrades for an existing service. Ask your
              electrician whether they will file it for you. File it early:{" "}
              <a
                href="https://ggcity.org/building-and-safety/permit-issuance-faqs"
                rel="noopener"
                className={LINK}
              >
                Garden Grove&apos;s online permit
              </a>{" "}
              for a service upgrade asks for the Edison service request number.
            </li>
            <li>
              SCE says it reviews an application in an average of 10 business
              days, 45 at most, and the clock starts once it calls the
              application complete.
            </li>
            <li>
              For main panel upgrades, SCE targets an average of 30 business
              days, 45 at most, for the work fully under its control. Permits
              and anything you or your electrician owe come on top.
            </li>
          </ol>
          <p className="mt-2 leading-relaxed">
            In Anaheim the utility is the city&apos;s own. You call Anaheim
            Public Utilities at{" "}
            <span className="whitespace-nowrap">714-765-6847</span> for a meter
            spot inspection; an
            inspector calls back within 2 to 3 business days with a meter spot
            report, which must be on site at the city&apos;s inspection. The
            city then inspects twice: service meter and final.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Help paying for it
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>SCE Charge Ready Home.</strong> Up to $4,200 for a panel
              upgrade plus an EV outlet, or up to $1,000 for the outlet alone
              if your panel is already 200 amps. It is for income-qualified
              households and residents of disadvantaged communities. Apply at{" "}
              <a href="https://evhome.sce.com/" rel="noopener" className={LINK}>
                evhome.sce.com
              </a>
              .
            </li>
            <li>
              <strong>SCE Common Facility Cost Treatment Program.</strong> A
              four-year pilot that puts up to $10,000 toward SCE&apos;s
              utility-side costs for a single-family home. It is narrow: you
              need a panel under 100 amps going to no more than 200, to be in a
              low-income or equity electrification program, to be replacing gas
              appliances with heat pumps and electrifying at least two of
              heating, water heating, cooking and drying, and to have ruled
              out alternatives to upsizing.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Permits, code and licensing
          </h2>
          <p className="mt-2 leading-relaxed">
            A panel or service upgrade needs a permit and an inspection.
            Permits applied for since January 1, 2026 fall under the 2025
            California Building Standards Code (Title 24), whose electrical
            part is California&apos;s version of the National Electrical Code. Because
            the job needs a permit, California&apos;s small-job exception for
            unlicensed workers does not apply at any price: hire a{" "}
            <a
              href="https://www.cslb.ca.gov/About_Us/Library/Licensing_Classifications/Licensing_Classifications_Detail.aspx?Class=C10"
              rel="noopener"
              className={LINK}
            >
              C-10 electrical contractor
            </a>{" "}
            and{" "}
            <a
              href="https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx"
              rel="noopener"
              className={LINK}
            >
              check the license with the CSLB
            </a>
            . A permitted, inspected upgrade leaves a clean record that
            protects you at resale and with your insurer. The limit on the
            down payment is in our{" "}
            <Link href="/guides/contractor-deposit-rules-california" className={LINK}>
              deposit rules guide
            </Link>
            .
          </p>
          <p className="mt-2 leading-relaxed">
            Some cities move it fast. Fountain Valley lists a 200-amp panel
            upgrade among its expedited permits, and Santa Ana issues
            residential service meter upgrades the same day over the counter.
            What other cities say is in the table below, and our{" "}
            <Link href="/guides/permits-orange-county" className={LINK}>
              Orange County permits guide
            </Link>{" "}
            covers other common jobs.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What is different in Orange County homes
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Older houses.</strong> The 2024 Census survey puts about
              19 percent of the county&apos;s homes in the 1960s and about 22
              percent in the 1970s, so roughly four in ten were wired before EV
              chargers, heat pumps and home batteries existed (more in{" "}
              <Link href="/guides/orange-county-home-age" className={LINK}>
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
              that failing connections seldom give warning signs.
            </li>
          </ul>
        </section>

        {/* Fees added 2026-10-02, each read that day from the city's own
            fee schedule or page (sources in src/lib/guideExtras.ts). Garden
            Grove, Irvine and Santa Ana are left without a number: Garden
            Grove's fee resolution was only found off the city's site, Irvine's
            schedule has no line that matches this job, and Santa Ana gives
            fees by phone. Costa Mesa's site blocked every read. */}
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Permit fees by city
          </h2>
          <p className="mt-2 leading-relaxed">
            The city&apos;s fee for the permit itself, from its own fee
            schedule. Plan review, when a city asks for it, is charged on top.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Anaheim:</strong> $126, with a $167 minimum permit fee (
              <a
                href="https://www.anaheim.net/3472/Residential-Electrical-Panel-Upgrade"
                rel="noopener"
                className={LINK}
              >
                city panel upgrade page
              </a>
              ).
            </li>
            <li>
              <strong>Fountain Valley:</strong> $85.20 for a panel upgrade up to
              250 amps, plus a $21.30 issuance fee (
              <a
                href="https://www.fountainvalley.gov/DocumentCenter/View/24612/FY-26-27-Fee-Schedule-Adopted-Final-Post"
                rel="noopener"
                className={LINK}
              >
                2026-27 fee schedule
              </a>
              ).
            </li>
            <li>
              <strong>Huntington Beach:</strong> $1.15 per amp of service ($49
              minimum), so $230 for 200 amps, plus a $41 processing charge and
              a 6% automation fee (
              <a
                href="https://www.huntingtonbeachca.gov/departments/community_development/building_inspection/permit_center/fee_calculator.php"
                rel="noopener"
                className={LINK}
              >
                fee schedule
              </a>
              ).
            </li>
            <li>
              <strong>Newport Beach:</strong> $61 for a service change up to
              200 amps (
              <a
                href="https://www.newportbeachca.gov/government/departments/community-development/fee-schedules"
                rel="noopener"
                className={LINK}
              >
                2026-27 fee schedule
              </a>
              ).
            </li>
            <li>
              <strong>Garden Grove, Irvine and Santa Ana:</strong> we could not
              find a fee for this job on the city&apos;s site. Ask the permit
              counter, linked in the table below.
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
            <Link href="/oc/anaheim" className={LINK}>
              Anaheim
            </Link>
            ,{" "}
            <Link href="/oc/fullerton" className={LINK}>
              Fullerton
            </Link>
            ,{" "}
            <Link href="/oc/buena-park" className={LINK}>
              Buena Park
            </Link>
            ,{" "}
            <Link href="/oc/garden-grove" className={LINK}>
              Garden Grove
            </Link>
            , or{" "}
            <Link href="/oc" className={LINK}>
              all Orange County cities
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Questions to ask the electrician
          </h2>
          <p className="mt-2 leading-relaxed">
            On top of the usual checks in{" "}
            <Link href="/guides/is-my-contractor-quote-fair" className={LINK}>
              is my contractor&apos;s quote fair?
            </Link>
            :
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              Will you do a load calculation, and could load management avoid
              a service upgrade?
            </li>
            <li>
              What service size are you proposing, and does the panel stay
              where it is or move?
            </li>
            <li>
              Who pulls the city permit, and who files the request with SCE or
              Anaheim Public Utilities?
            </li>
            <li>
              Are utility-side work, trenching, a sub-panel and wiring repairs
              listed as their own lines?
            </li>
            <li>
              If the house is from 1965 to the mid 1970s, will you check the
              branch wiring for aluminum while the panel is open?
            </li>
            <li>How long will the power be off, and on which days?</li>
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

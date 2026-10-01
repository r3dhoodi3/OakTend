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
// lifespans from InterNACHI, the Department of Energy and ENERGY STAR, heat
// pump water heater prices from ENERGY STAR, hard water from the Irvine Ranch
// Water District. It no longer repeats the app's own planning figures
// (REPLACEMENT_INFO / DEFAULT_LIFESPANS in src/lib/health.ts), because those
// have no published source to cite. Strapping and the 2025 Energy Code are in
// the FAQ; the city table has its rules in src/lib/ocRemodelCities.ts.
//
// TRIMMED 2026-09-26 so each topic has one home: housing age numbers live on
// /guides/orange-county-home-age, rebate amounts on
// /guides/orange-county-home-rebates-2026, the license and down payment rules
// on /guides/contractor-deposit-rules-california, the generic bid checklist
// on /guides/is-my-contractor-quote-fair and flushing on
// /guides/hard-water-orange-county. This page links to each instead of
// repeating it. The pro side is closed, so nothing here offers to find, match
// or book a plumber.

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
// Kept to 34 characters so the full "<title> | OakTend" stays under 50.
const TITLE = "Water heater cost in Orange County";
const DESCRIPTION =
  "Water heater replacement cost in Orange County: heat pump prices, tank vs tankless, when to replace, hard water, earthquake straps and permits by city.";
const CANONICAL = `${SITE_URL}/guides/water-heater-replacement-cost`;

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

// Only questions the body does not already answer: tank vs tankless, straps
// and the Energy Code live here and nowhere else on the page. Cost, repair vs
// replace, hard water, lifespan, permits and rebates were cut from this list
// on 2026-09-26 because they repeated a body section word for word.
const FAQS = [
  {
    q: "Is a tankless water heater worth the extra cost?",
    a: "It depends on how long you will stay and how much hot water you use. A tank keeps a set volume hot, costs less to buy and install and is the simplest to service, but it takes a closet's worth of space and can run out during heavy use. A tankless unit heats water only as you use it and takes far less room, but costs more upfront and sometimes needs bigger gas or electrical service to keep up.",
  },
  {
    q: "Do water heaters have to be strapped in California?",
    a: "Yes. California Health and Safety Code section 19211 requires all new and replacement water heaters, and all existing residential water heaters, to be braced, anchored, or strapped to resist falling or moving sideways in an earthquake. A seller also has to certify in writing to the buyer that the water heater complies.",
  },
  {
    q: "What is Title 24 and does it apply to a water heater replacement?",
    a: "Title 24 is California's building code, and Part 6 of it is the Energy Code. Permits applied for on or after January 1, 2026 fall under the 2025 Energy Code, and the Energy Commission's compliance manual lists replacing an existing water heater as an alteration the code covers. For heat pump water heaters, the 2025 code adds requirements such as ventilation where the unit is installed.",
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

export default function WaterHeaterReplacementCostGuide() {
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
        path="/guides/water-heater-replacement-cost"
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
          { label: "Water heater cost in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Water heater cost in Orange County", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Water heater cost in Orange County
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/water-heater-replacement-cost" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        A planning guide for Orange County homeowners. It is not a quote for
        your home.
      </p>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What it costs
          </h2>
          <p className="mt-2 leading-relaxed">
            We found no government or utility source that publishes a typical
            installed price for a standard gas tank water heater in Orange
            County, so this guide does not print one. The least expensive
            version of the job is a like-for-like swap: same fuel, similar
            size, same spot. Tankless and heat pump units cost more to buy and
            install, and anything that touches the vent, gas line or
            electrical circuit adds labor and often a permit.
          </p>
          <p className="mt-2 leading-relaxed">
            The one published figure is for heat pump water heaters. ENERGY
            STAR says the unit typically runs{" "}
            <strong>$1,500 to $3,000</strong>, and an informal survey of
            contractors put installation labor and materials at{" "}
            <strong>$1,000 to $3,000</strong> on top of that. Those are
            national figures, and a few years old. For a local number, ask at
            least three licensed plumbers for written, itemized prices.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When repair beats replacement
          </h2>
          <p className="mt-2 leading-relaxed">
            Published lifespans vary. InterNACHI&apos;s life expectancy chart
            lists 6 to 12 years for a conventional water heater, and the U.S.
            Department of Energy, in its 2024 efficiency rule, estimates about
            15 years for storage water heaters. ENERGY STAR suggests
            considering a replacement once a water heater is more than 10
            years old, before it fails and forces a rushed decision, and lists
            the signs: leaks, rust in the water, running short of hot water
            and rumbling noises.
          </p>
          <p className="mt-2 leading-relaxed">
            A younger unit with one failed part, like a thermostat, heating
            element or pilot assembly, is usually a repair. A leaking tank is
            a replacement, because tanks do not get patched, and so is a
            second repair on the same unit within a short span.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What is different in Orange County
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Hard water.</strong> The Irvine Ranch Water District says
              water with 10 grains of hardness or more is generally considered
              hard, that the water it imports from the Colorado River and Northern
              California is typically hard and that its own well water
              is moderately hard. InterNACHI notes that minerals in water can
              shorten a water heater&apos;s life. The district recommends
              flushing the tank once a year; our{" "}
              <Link
                href="/guides/hard-water-orange-county"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                hard water guide
              </Link>{" "}
              covers how.
            </li>
            <li>
              <strong>Older houses.</strong> Most of the county&apos;s housing
              went up before 1980 (see{" "}
              <Link
                href="/guides/orange-county-home-age"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                how old Orange County homes are
              </Link>
              ). Switching an older house to a heat pump water heater can mean
              electrical work: ENERGY STAR says the unit needs a 240-volt
              supply where it goes, may need more capacity at the breaker box,
              and needs about 450 cubic feet of air around it (see our{" "}
              <Link
                href="/guides/electrical-panel-upgrade-cost"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                panel upgrade guide
              </Link>
              ).
            </li>
            <li>
              <strong>Straps and a permit.</strong> State law requires
              earthquake straps on every water heater (see the questions
              below), and replacing one is permitted work; the table below
              shows what each city says.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Permits and home age by city
          </h2>
          <p className="mt-2 leading-relaxed">
            What each city&apos;s own pages say about water heater and plumbing
            work, with a link to where applications go. Where a city&apos;s page
            does not name the work, we say so rather than guess.
          </p>
          <OcRemodelCityTable trade="waterHeater" />
          <p className="mt-3 leading-relaxed">
            City pages:{" "}
            <Link
              href="/oc/irvine"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Irvine
            </Link>
            ,{" "}
            <Link
              href="/oc/anaheim"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Anaheim
            </Link>
            ,{" "}
            <Link
              href="/huntington-beach"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Huntington Beach
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
            Hiring and reading the bid
          </h2>
          <p className="mt-2 leading-relaxed">
            A water heater replacement needs a permit, so it needs a licensed
            contractor at any price. The plumbing license class is C-36, and
            you can check any license at cslb.ca.gov. The limit on the down
            payment is in our{" "}
            <Link
              href="/guides/contractor-deposit-rules-california"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              deposit rules guide
            </Link>
            . On top of the usual checks in{" "}
            <Link
              href="/guides/is-my-contractor-quote-fair"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              is my contractor&apos;s quote fair?
            </Link>
            , a water heater bid should:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              Name the new unit: type (tank, tankless or heat pump), fuel,
              capacity and model.
            </li>
            <li>
              List venting, gas line or electrical changes as their own lines.
            </li>
            <li>Say who gets the permit.</li>
            <li>Include earthquake straps.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Rebates
          </h2>
          <p className="mt-2 leading-relaxed">
            Utility and state rebates change often; what is open now is on
            our{" "}
            <Link
              href="/guides/orange-county-home-rebates-2026"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Orange County home rebates page
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
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/water-heater-replacement-cost" />

      <GuideCta
        signedInHref="/walkthrough"
        signedInLabel="Check your water heater's actual age"
      />
    </main>
  );
}

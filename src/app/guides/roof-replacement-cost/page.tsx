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
// the cost figure from the Remodeling 2025 Cost vs. Value Report (Los Angeles
// market, the closest one it covers), lifespans from InterNACHI, salt air from
// FEMA. The Cost vs. Value reuse rules allow narrative excerpts only (no
// tables), from at most five projects across the whole site, each with the
// report's name, its URL and the copyright line: keep all three when editing.
// The 22-year figure is OakTend's own planning default (DEFAULT_LIFESPANS.roof
// in src/lib/health.ts) and is labeled as such. The Orange County section
// (the 2025 Energy Code's cool roof rule by climate zone) and the city table
// (rules in src/lib/ocRemodelCities.ts) cite their own sources. Trimmed
// 2026-09-26: housing age, HOA review, license and deposit rules and the
// general bid checklist are one line plus a link to the guide that owns each. The pro side is closed, so nothing here offers to find, match
// or book a roofer.

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
const TITLE = "Roof replacement cost in Orange County";
const DESCRIPTION =
  "Roof replacement cost in Orange County: the 2025 average for an asphalt re-roof nearby, shingle vs tile, inland cool roof rules, city permits and bids.";
const CANONICAL = `${SITE_URL}/guides/roof-replacement-cost`;

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

// One question only: the others the page used to carry here restated a body
// section word for word. The permit answer lives here and not in the body.
const FAQS = [
  {
    q: "Do I need a permit to re-roof my house in Orange County?",
    a: "Plan on one. The city table above shows what each city's own page says about re-roofing. The roofer usually pulls the permit, but confirm one is being pulled: a permitted roof leaves a clean record for a future sale.",
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

export default function RoofReplacementCostGuide() {
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
        path="/guides/roof-replacement-cost"
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
          { label: "Roof replacement cost" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Roof replacement cost in Orange County" , href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Roof replacement cost in Orange County
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/roof-replacement-cost" />
      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          Average asphalt shingle re-roof, Los Angeles market, 2025
        </p>
        <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-100">
          $36,417
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          From the Remodeling 2025 Cost vs. Value Report
          (www.costvsvalue.com). The report has no separate Orange County
          market, so Los Angeles is the closest one. The national average for
          the same job is $31,871.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What a re-roof costs here
          </h2>
          <p className="mt-2 leading-relaxed">
            The job behind that figure: tearing off an old roof down to the
            sheathing and installing about 3,000 square feet (30 squares) of
            new asphalt shingles, with new underlayment, drip edge, and
            flashing. That is about $12 per square foot of roof in the Los
            Angeles market, and about 14 percent above the national figure. A
            smaller or simpler roof costs less. A steep or complex roof, a
            second story, or rotted decking under the old roof costs more.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Asphalt shingle or tile?
          </h2>
          <p className="mt-2 leading-relaxed">
            In Orange County the choice usually comes down to these two.
            Asphalt shingle costs less upfront, installs faster, and a quality
            architectural shingle performs well in this climate. Tile lasts
            far longer and fits the Spanish and Mediterranean styles common
            here, but costs considerably more for both material and labor. We
            found no published cost survey for tile, so this guide prints no
            number for it.
          </p>
          <p className="mt-2 leading-relaxed">
            Tile is also heavy. Switching from shingle to tile may mean
            confirming the framing can carry it. On many older tile roofs the
            tile is still sound and the job is to lift it, replace the worn
            underlayment, and set the tile back, which is priced differently
            from a new roof. Ask for that option by name.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            Want a range tied to your roof&apos;s actual size, age, and
            material instead of a general one?
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
            When a repair beats a replacement
          </h2>
          <p className="mt-2 leading-relaxed">
            A repair is usually the right call when the roof is well within its
            expected life and the problem is contained: a handful of lifted or
            damaged shingles, a few cracked tiles, or flashing pulled away
            around a vent or chimney. Replacement makes more sense once the
            roof is near or past its expected life, water shows up in more than
            one area, or the decking has begun to rot.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Lifespan by material
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Asphalt shingle:</strong> InterNACHI&apos;s life
              expectancy chart lists 20 years for 3-tab shingles and 30 years
              for architectural shingles, and warns that hot climates
              drastically reduce asphalt shingle life.
            </li>
            <li>
              <strong>Concrete or clay tile:</strong> the same chart lists 100
              years or more for the tile itself, though the underlayment
              beneath usually needs replacing well before the tile does.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            Sun exposure, attic ventilation, and upkeep all shift where a real
            roof lands. OakTend uses a 22-year default for planning a
            roof&apos;s replacement unless it knows more about yours. That is
            our own planning number, not a published figure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What changes the job in Orange County
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Older houses.</strong> Most of the county&apos;s homes
              predate 1980 (the numbers by city are in{" "}
              <Link
                href="/guides/orange-county-home-age"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                how old Orange County homes are
              </Link>
              ). On an older roof, ask how any rotted decking found at tear-off
              will be priced before you sign.
            </li>
            <li>
              <strong>Cool roof rules inland.</strong> Permits applied for on
              or after January 1, 2026 fall under California&apos;s 2025 Energy
              Code. The Energy Commission&apos;s compliance manual counts a
              re-roof as an alteration, not a repair, and applies cool roof
              rules when 50 percent or more of the roof is replaced. For steep
              roofs (a pitch of 2 in 12 or more) they apply in climate zones 4
              and 8 through 15. By the Commission&apos;s zip code list, inland
              Orange County (Irvine, Santa Ana, Anaheim, Tustin, and Mission
              Viejo zip codes, for example) is in zone 8, while coastal zip
              codes in Huntington Beach, Newport Beach, Costa Mesa, and
              Fountain Valley are in zone 6, where the steep-roof rule does not
              apply. Exceptions include R-38 attic insulation or an attic
              radiant barrier. Low-slope roofs have their own cool roof rule in
              zones 6 and 8 alike.
            </li>
            <li>
              <strong>Salt air and wind.</strong> A FEMA technical bulletin says
              salt spray carried by onshore winds significantly accelerates the
              corrosion of metal, most of all within 300 to 3,000 feet of the
              shoreline and measurably as far as 5 to 10 miles inland. On the
              coast, ask about the flashing, fasteners, and gutters as well as
              the roofing. The National Weather Service describes Santa Ana
              winds as strong, hot, dust-bearing winds that descend to the
              coast from the inland deserts, so check for loose tiles and
              shingles before wind season.
            </li>
            <li>
              <strong>Wildfire and insurance.</strong> Many insurers look at
              roof age, material, and condition when they write or renew a
              policy. Near a high fire hazard area, ask about Class A
              fire-rated roofing, which includes most tile and many asphalt
              shingle systems. The{" "}
              <Link
                href="/guides/santa-ana-wind-wildfire-home-prep"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                wildfire prep guide
              </Link>{" "}
              covers the rest of the house.
            </li>
            <li>
              <strong>HOA review.</strong> A new roof is visible from outside,
              so in an association it usually needs architectural approval as
              well as the city permit. Our{" "}
              <Link
                href="/guides/hoa-coastal-commission-remodel-orange-county#roof"
                className="text-bark-700 hover:underline dark:text-stone-300"
              >
                HOA guide
              </Link>{" "}
              covers that review and who replaces the roof in a condo or
              planned development.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Permits and home age by city
          </h2>
          <p className="mt-2 leading-relaxed">
            What each city&apos;s own pages say about re-roofing, with a link to
            where applications go. Where a city&apos;s page does not name the
            work, we say so rather than guess.
          </p>
          <OcRemodelCityTable trade="roof" />
          <p className="mt-3 leading-relaxed">
            City pages:{" "}
            <Link
              href="/huntington-beach"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Huntington Beach
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
              href="/oc/costa-mesa"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Costa Mesa
            </Link>
            ,{" "}
            <Link
              href="/fountain-valley"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Fountain Valley
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
            Hiring and bids
          </h2>
          <p className="mt-2 leading-relaxed">
            A re-roof needs a licensed contractor; the roofing class is C-39,
            and you can check any license at cslb.ca.gov. The license
            threshold and the legal cap on a down payment are in our{" "}
            <Link
              href="/guides/contractor-deposit-rules-california"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              deposit rules guide
            </Link>
            . Beyond the general checks in{" "}
            <Link
              href="/guides/is-my-contractor-quote-fair"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              is my contractor&apos;s quote fair?
            </Link>
            , a roof bid should:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              Name the roofing product, say whether the old roof is torn off,
              and list the new underlayment, flashing, and drip edge.
            </li>
            <li>
              Give decking repair a written unit price, so rot found at
              tear-off is not an open-ended extra.
            </li>
            <li>
              Say who gets the permit, and whether the product meets any cool
              roof rule that applies to your address.
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
            Cost figures are from the Remodeling 2025 Cost vs. Value Report
            (www.costvsvalue.com) for the Los Angeles market. © 2025 Zonda
            Media, a Delaware Corporation. Complete data from the Remodeling
            2025 Cost vs. Value Report can be downloaded free at
            www.costvsvalue.com. Figures are general estimates, not quotes.
            OakTend does not set or guarantee prices and is not a contractor.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/roof-replacement-cost" />

      <GuideCta
        signedInHref="/contractors?category=roof"
        signedInLabel="Track this in OakTend"
      />
    </main>
  );
}

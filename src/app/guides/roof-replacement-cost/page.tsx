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
// (housing age, the 2025 Energy Code's cool roof rule by climate zone, HOA
// review) and the city table (rules in src/lib/ocRemodelCities.ts) cite their
// own sources. The pro side is closed, so nothing here offers to find, match
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
  "A sourced 2025 re-roof figure near Orange County, shingle vs. tile, why older OC homes and inland cool roof rules add cost, city permits, and bids.";
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

const FAQS = [
  {
    q: "How much does it cost to replace a roof in Orange County?",
    a: "No published cost survey we could find has its own Orange County line, so the closest sourced number is for the Los Angeles market next door. According to the Remodeling 2025 Cost vs. Value Report (www.costvsvalue.com), tearing off an old roof and installing about 3,000 square feet of new asphalt shingles averaged $36,417 in the Los Angeles market and $31,871 nationally. A smaller or simpler roof costs less. Tile costs considerably more than shingle, and we did not find a published survey figure for it.",
  },
  {
    q: "Asphalt shingle or tile, which is better in Southern California?",
    a: "This is the real Orange County decision. Asphalt shingles cost less upfront and are faster to install, and a quality architectural shingle holds up well here. Tile costs much more but lasts far longer and suits the Spanish and Mediterranean styles common across the county. Tile is also heavier, so the roof structure has to be able to carry it. Many homeowners weigh the lower upfront cost of shingle against the longer life of tile.",
  },
  {
    q: "When is a roof repair enough instead of a full replacement?",
    a: "A repair usually makes sense when the roof is still well within its expected life and the problem is contained, like a few damaged or lifted shingles, some cracked tiles, or flashing that has pulled away around a vent or chimney. A full replacement tends to make more sense once the roof is near or past its expected life, leaks show up in more than one spot, or the decking underneath has started to rot.",
  },
  {
    q: "Do I need a permit to re-roof my house in Orange County?",
    a: "Plan on one. Huntington Beach and Garden Grove both say re-roofs need a permit, Newport Beach lets you apply online for a roofing replacement, and Santa Ana issues permits for minor re-roofs the same day. Your contractor usually pulls it, but confirm one is being pulled. The city table on this page shows what each city's own page says, and your building department can tell you about any fire-related roofing rules for your address.",
  },
  {
    q: "How long should a new roof last?",
    a: "It depends heavily on the material. InterNACHI's life expectancy chart lists 20 years for 3-tab asphalt shingles, 30 years for architectural asphalt shingles, and 100 years or more for clay or concrete tile, and it warns that hot climates drastically reduce asphalt shingle life. With tile, the underlayment beneath usually needs replacing well before the tile itself does. Sun exposure, ventilation, and maintenance all affect where a given roof actually lands.",
  },
  // Added 2026-09-25 from the "People also ask" questions in the SEO
  // research (OakTend-marketing/seo-research-2026-09-24). Each answer only
  // repeats what the page body already says and sources.
  {
    q: "What roofing material lasts longest in a coastal climate?",
    a: "On life expectancy alone, tile. InterNACHI's chart lists 100 years or more for clay or concrete tile, against 20 to 30 years for asphalt shingles, though the underlayment under tile wears out well before the tile does. Near the ocean the weak point is often metal: a FEMA bulletin says salt spray significantly speeds up the corrosion of metal, most within 300 to 3,000 feet of the shoreline, so ask about the flashing, fasteners, and gutters as well as the roofing itself.",
  },
  {
    q: "Does a new roof have to be a cool roof in Orange County?",
    a: "It depends on where you live and how much roof you replace. Under the 2025 Energy Code, the Energy Commission's compliance manual says cool roof rules apply when 50 percent or more of the roof is replaced. For steep roofs (a pitch of 2 in 12 or more) they apply in climate zones 4 and 8 through 15, which includes inland Orange County zip codes in cities like Irvine, Santa Ana, and Anaheim, but not zone 6 along the coast. There are exceptions, such as R-38 attic insulation or an attic radiant barrier.",
  },
  {
    q: "Do I need HOA approval before re-roofing?",
    a: "If you live in a homeowners association, check your CC&Rs first. A new roof is visible from outside, so it usually goes through the association's architectural review as well as the city permit, and Irvine's own permit page tells residents to check their HOA's CC&Rs. California Civil Code section 4765 requires the association to decide in writing, in good faith, and to explain any denial.",
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
          { label: "Roof replacement cost in Orange County" },
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
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        A planning guide for Orange County homeowners, with sourced figures.
        It is an estimate, not a quote for your home. Prices vary.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          Average asphalt shingle re-roof, Los Angeles market, 2025
        </p>
        <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-100">
          $36,417
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          From the Remodeling 2025 Cost vs. Value Report
          (www.costvsvalue.com), for tearing off and replacing about 3,000
          square feet of asphalt shingles. The report has no separate Orange
          County market, so Los Angeles is the closest one. The national
          average for the same job is $31,871.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What a re-roof costs here
          </h2>
          <p className="mt-2 leading-relaxed">
            No published cost survey we could find has its own Orange County
            line, so the closest sourced number is for the Los Angeles market
            next door. According to the Remodeling 2025 Cost vs. Value Report
            (www.costvsvalue.com), tearing off an old roof down to the
            sheathing and installing about 3,000 square feet (30 squares) of
            new asphalt shingles, with new underlayment, drip edge, and
            flashing, averaged{" "}
            <strong>$36,417</strong>
            {" "}
            in the Los Angeles market and{" "}
            <strong>$31,871</strong>
            {" "}
            nationally. By simple division that is about $12 per square foot
            of roof in the Los Angeles market.
          </p>
          <p className="mt-2 leading-relaxed">
            Use it as a planning figure, not a quote. A smaller or simpler
            roof costs less. A steep or complex roof, a second story, or
            rotted decking under the old roof costs more.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What about tile?
          </h2>
          <p className="mt-2 leading-relaxed">
            We did not find a published cost survey for concrete or clay tile
            roofs, so this guide does not print a number for them. Tile costs
            considerably more than asphalt shingle, both for the material and
            for the labor to set it, and a heavier tile system can also mean
            work on the roof structure. On many older tile roofs the tile
            itself is still sound and the job is to lift it, replace the worn
            underlayment, and set the tile back, which is a different price
            from a full new roof. Ask for that option by name when you collect
            written prices.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Asphalt vs. tile: the real SoCal decision
          </h2>
          <p className="mt-2 leading-relaxed">
            In Orange County the choice usually comes down to asphalt shingle
            versus tile. Asphalt shingle costs less upfront, installs faster,
            and a quality architectural shingle performs well in this climate.
            Tile costs considerably more, but it lasts far longer and fits the
            Spanish and Mediterranean styles that are so common here.
          </p>
          <p className="mt-2 leading-relaxed">
            Tile is also heavy, so the roof structure has to be built or rated
            to carry it. If you are switching from shingle to tile, a contractor
            may need to confirm the framing can take the added weight. Many
            homeowners end up weighing the lower upfront cost of shingle against
            the longer life of tile.
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
            You do not always need a whole new roof. A repair is usually the
            right call when the roof is still well within its expected life and
            the problem is contained, such as a handful of lifted or damaged
            shingles, a few cracked tiles, or flashing that has pulled away
            around a vent or chimney. Replacement tends to make more sense once
            the roof is near or past its expected life, water shows up in more
            than one area, or the decking underneath has begun to rot. A leak in
            one spot is a repair question; widespread wear is a replacement
            question.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Insurance and fire hardening
          </h2>
          <p className="mt-2 leading-relaxed">
            Roofing carries extra weight in Southern California because of
            wildfire risk. The roof is one of the most important parts of a
            fire-hardened home, and many insurers look closely at roof age,
            material, and condition when they write or renew a policy. Class A
            fire-rated roofing, which includes most tile and many modern asphalt
            shingle systems, is the standard many homeowners aim for. If your
            home is in or near a high fire hazard area, ask your contractor
            about fire-rated materials and ask your insurer whether the roof
            affects your coverage or premium. Rules and insurer requirements
            change, so confirm the current specifics for your address.
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
            roof&apos;s replacement timeline unless it knows more about yours.
            That default is our own planning number, not a published figure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Why it costs more in Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            Orange County has no line of its own in the Cost vs. Value Report,
            which covers Los Angeles as the nearest market. There, the asphalt
            shingle re-roof averaged about 14 percent more than the national
            figure, so expect local prices above national ones you see
            elsewhere. Beyond labor, these local things shape the price and
            the life of a roof.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Older houses.</strong> About 57 percent of Orange
              County&apos;s housing units were built before 1980, by the Census
              Bureau&apos;s 2020 to 2024 American Community Survey. In Fountain
              Valley it is about 82 percent, in Garden Grove 77 percent, and in
              Santa Ana 74 percent, while Irvine is about 21 percent. On an
              older roof, ask how any rotted decking found at tear-off will be
              priced before you sign.
            </li>
            <li>
              <strong>Cool roof rules inland.</strong> Permits applied for on
              or after January 1, 2026 fall under California&apos;s 2025 Energy
              Code. The Energy Commission&apos;s compliance manual counts a
              re-roof as an alteration, not a repair, and says cool roof rules
              apply when 50 percent or more of the roof is replaced. For steep
              roofs (a pitch of 2 in 12 or more) they apply in climate zones 4
              and 8 through 15. By the Commission&apos;s zip code list, inland
              Orange County (Irvine, Santa Ana, Anaheim, Tustin, and Mission
              Viejo zip codes, for example) is in zone 8, while coastal zip
              codes in Huntington Beach, Newport Beach, Costa Mesa, and
              Fountain Valley are in zone 6, where the steep-roof rule does not
              apply. There are exceptions, such as R-38 attic insulation or an
              attic radiant barrier. Low-slope roofs have their own cool roof
              rule in zones 6 and 8 alike.
            </li>
            <li>
              <strong>Sun, salt, and wind.</strong> InterNACHI&apos;s chart
              warns that hot climates drastically reduce asphalt shingle life.
              A FEMA technical bulletin says salt spray carried by onshore
              winds significantly accelerates the corrosion of metal, most of
              all within 300 to 3,000 feet of the shoreline and measurably as
              far as 5 to 10 miles inland. That matters for flashing,
              fasteners, and gutters in Huntington Beach, Newport Beach, Seal
              Beach, Laguna Beach, Dana Point, and San Clemente. And the
              National Weather Service describes Santa Ana winds as strong,
              hot, dust-bearing winds that descend to the coast from the inland
              deserts, so check for loose tiles and shingles before wind
              season.
            </li>
            <li>
              <strong>HOA review.</strong> A new roof is visible from outside,
              so in a homeowners association it usually needs the
              association&apos;s approval as well as the city permit, and
              Irvine&apos;s own permit page tells residents to check their
              HOA&apos;s CC&amp;Rs. California Civil Code section 4765 requires
              the association to decide in writing, in good faith, and to
              explain a denial.
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
            work, we say so rather than guess. In most cases the roofing
            contractor pulls the permit, but confirm one is being pulled: a
            permitted roof leaves a clean record for a future sale.
          </p>
          <OcRemodelCityTable trade="roof" />
          <p className="mt-3 leading-relaxed">
            Permit rules and fees differ from city to city. Our city pages are
            a starting point:{" "}
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
            Hiring in California: what to check
          </h2>
          <p className="mt-2 leading-relaxed">
            The Contractors State License Board says anyone who contracts for a
            job that needs a building permit, or for work valued at{" "}
            <strong>$1,000 or more</strong> in combined labor and materials,
            must hold a valid license. That number rose from $500 on January 1,
            2025, so many sites still cite the old figure. A re-roof is well
            past it. The roofing license class is C-39, and you can check any
            license at cslb.ca.gov.
          </p>
          <p className="mt-2 leading-relaxed">
            A home improvement contract over $500 has to be in writing, and
            the <strong>down payment cannot exceed $1,000 or 10 percent</strong>{" "}
            of the contract price, whichever is less (see our{" "}
            <Link
              href="/guides/contractor-deposit-rules-california"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              deposit rules guide
            </Link>
            ).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How to read the estimate
          </h2>
          <p className="mt-2 leading-relaxed">
            The figures on this page are estimate ranges, not a quote. When a
            real bid for your roof arrives, check it against this list.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              The contractor&apos;s name, business address, and CSLB license
              number are on it, and the license checks out on the CSLB site.
            </li>
            <li>
              It names the roofing product and says whether the old roof is
              torn off, and what new underlayment, flashing, and drip edge go
              on.
            </li>
            <li>
              Decking repair has a written unit price, so rot found at tear-off
              is not an open-ended extra.
            </li>
            <li>
              It says who gets the permit, and whether the product meets any
              cool roof rule that applies to your address.
            </li>
            <li>
              The down payment is no more than $1,000 or 10 percent of the
              price, whichever is less.
            </li>
            <li>
              Payments follow finished work. A contractor may not collect for
              work not yet done or materials not yet delivered.
            </li>
            <li>Start and completion dates are written in.</li>
            <li>
              You have at least three written bids on the same scope. The
              lowest is not automatically the best.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            More on this in{" "}
            <Link
              href="/guides/is-my-contractor-quote-fair"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              is my contractor&apos;s quote fair?
            </Link>
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
            Cost figures are from the Remodeling 2025 Cost vs. Value Report
            (www.costvsvalue.com) for the Los Angeles market, the closest
            market the report covers. © 2025 Zonda Media, a Delaware
            Corporation. Complete data from the Remodeling 2025 Cost vs. Value
            Report can be downloaded free at www.costvsvalue.com. Lifespans
            are from InterNACHI&apos;s life expectancy chart. All figures are
            general estimates, not quotes, and actual prices vary by home,
            material, and contractor. OakTend does not set or guarantee prices
            and is not a contractor.
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

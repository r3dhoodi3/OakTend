import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide for Orange County homeowners, added 2026-09-26 from
// section 2 of the SEO plan (OakTend-marketing/seo-research-2026-09-24). The
// point of the page: "garage conversion" means three different projects (a
// plain room, an ADU, a junior ADU), and most pages that rank for it blur
// them, so their prices and permit advice disagree.
//
// Every rule here was read on 2026-09-26 in the statute itself on
// leginfo.legislature.ca.gov (Government Code sections 66313, 66314, 66317,
// 66321, 66322, 66323, 66333, and the chaptered SB 543) or in HCD's March
// 2026 ADU Handbook, and each is listed in GUIDE_SOURCES
// (src/lib/guideExtras.ts). The 2026 law changes live on /guides/adu-cost;
// this page links there rather than repeating them (editor pass 2026-09-26).
//
// Cost: the one figure is the Cost vs. Value detached ADU average already
// used on /guides/adu-cost (the ADU project is one of the five the site may
// excerpt; see the rules above GUIDE_SOURCES). No garage conversion price is
// printed because no published survey we could open has one. Keep the report
// name, its URL and the copyright line together if that figure stays.
//
// The pro side is closed, so nothing here offers to find, match or book a
// contractor. No Costa Mesa permit specifics (the city's site could not be
// opened during research).

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker). Nothing in this page or in src/app/guides/layout.tsx
// reads cookies(), headers(), searchParams or the database, so it prerenders
// once and is served from the edge cache. See /guides/adu-cost for the full
// note; anything added here that reads cookies()/headers()/searchParams
// undoes it.
export const revalidate = 3600;

// Title/description held once so metadata.title, openGraph, and twitter
// can't drift from each other; the OG image at ./opengraph-image.tsx keeps
// its own literal copy of the title. 39 characters, so the full
// "<title> | OakTend" stays at 49.
const TITLE = "Garage conversion vs ADU: Orange County";
const DESCRIPTION =
  "Garage room, garage ADU, junior ADU or a new detached ADU in Orange County: the parking, setback and approval rules for each, fees and pre-approved plans.";
const PATH = "/guides/garage-conversion-vs-adu-orange-county";
const CANONICAL = `${SITE_URL}${PATH}`;

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
    // og:image comes from the colocated opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// "People also ask" questions from the SEO research, each answered only with
// what the page body already says and sources.
const FAQS = [
  {
    q: "What is the difference between a garage conversion and an ADU?",
    a: "A garage becomes an ADU only when it is turned into a separate home with complete independent living facilities. A bedroom, gym or office is not a unit, so the state ADU rules do not cover it.",
  },
  {
    q: "Can I convert my garage into a junior ADU?",
    a: "An attached garage, yes, because state law counts it as part of the house. A detached garage can become a regular ADU but not a junior ADU.",
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

const linkClass = "text-bark-700 hover:underline dark:text-stone-300";
const h2Class = "text-lg font-semibold text-stone-900 dark:text-stone-100";

// The four projects side by side. Stacked cards rather than a table so it
// reads at 390px without a sideways scroll.
const OPTIONS = [
  {
    name: "Garage turned into a room",
    what: "A bedroom, office, gym or den that stays part of the main house. Not a separate unit.",
    size: "No state ADU size rules apply.",
    parking: "Your city's own parking rules apply. The state no-replacement rule is written for ADUs.",
    approval: "A regular building permit from your city.",
  },
  {
    name: "Garage converted to an ADU",
    what: "A separate home with complete independent living facilities, in an attached or detached garage.",
    size: "Uses the existing shell. A detached garage may grow up to 150 square feet, only to fit an entry or exit such as a stairway.",
    parking: "No replacement parking for the lost garage spaces, and no parking for the ADU itself.",
    approval: "State approval clock (see below).",
  },
  {
    name: "Junior ADU",
    what: "A unit inside the house, which can include an attached garage. Can share a bathroom with the house.",
    size: "No more than 500 square feet of interior livable space. Own entrance and at least an efficiency kitchen.",
    parking: "No parking can be required, even when it is converted from an attached garage.",
    approval: "State approval clock. A city can require the owner to live on site only if it shares a bathroom with the house.",
  },
  {
    name: "New detached ADU",
    what: "A new building on the lot, with its own foundation, roof and utility runs.",
    size: "A city must allow at least 800 square feet with 4 foot side and rear setbacks.",
    parking: "At most one space per unit or bedroom, and none within half a mile walk of public transit.",
    approval: "State approval clock, plus a demolition permit issued at the same time if it replaces a detached garage.",
  },
];

export default function GarageConversionVsAduGuide() {
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
        path="/guides/garage-conversion-vs-adu-orange-county"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Garage conversion vs ADU" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Garage conversion vs ADU", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Garage conversion vs ADU in Orange County
      </h1>
      <GuideMeta path="/guides/garage-conversion-vs-adu-orange-county" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        General information, not legal advice. State rules as of September
        2026; your city sets the details within them.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-6 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          The short answer
        </p>
        <p className="mt-2 leading-relaxed text-stone-800 dark:text-stone-200">
          Turning a garage into a room is an ordinary remodel. Turning it into
          an ADU creates a second home on the lot, and California law then
          protects you: no replacement parking, no new setbacks, and a firm
          approval deadline. A junior ADU is a smaller
          unit, up to 500 square feet, inside the house or an attached garage.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className={h2Class}>Four projects people mix up</h2>
          <p className="mt-2 leading-relaxed">
            Prices for a &quot;garage conversion&quot; can disagree by a
            factor of ten because they often describe different projects.
          </p>
          <div className="mt-4 space-y-3">
            {OPTIONS.map((o) => (
              <div
                key={o.name}
                className="rounded-xl border border-stone-200 p-4 dark:border-white/10"
              >
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  {o.name}
                </h3>
                <dl className="mt-2 space-y-1.5 text-sm leading-relaxed">
                  <div>
                    <dt className="inline font-medium text-stone-900 dark:text-stone-100">
                      What it is:{" "}
                    </dt>
                    <dd className="inline">{o.what}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-stone-900 dark:text-stone-100">
                      Size:{" "}
                    </dt>
                    <dd className="inline">{o.size}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-stone-900 dark:text-stone-100">
                      Parking:{" "}
                    </dt>
                    <dd className="inline">{o.parking}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-stone-900 dark:text-stone-100">
                      Approval:{" "}
                    </dt>
                    <dd className="inline">{o.approval}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={h2Class}>Do you have to replace the parking?</h2>
          <p className="mt-2 leading-relaxed">
            Not for an ADU. Under Government Code section 66314, when a
            garage, carport or parking space is converted to an ADU, or torn
            down to build one, the city cannot require those spaces to be
            replaced. Section 66322 adds that a city cannot impose any parking
            standard on an ADU that is part of the house or of an existing
            accessory structure, or on one within half a mile walking distance
            of public transit. For a room conversion, ask the planning counter
            about parking before you design.
          </p>
        </section>

        <section>
          <h2 className={h2Class}>Permits and the approval clock</h2>
          <p className="mt-2 leading-relaxed">
            Plan on a building permit for any of these. For an ADU or junior
            ADU, Government Code section 66317 also sets the process:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              Approval is ministerial, which means no discretionary review and
              no public hearing.
            </li>
            <li>
              The city has <strong>15 business days</strong> to tell you in
              writing whether the application is complete, with a list of
              anything missing.
            </li>
            <li>
              It then has <strong>60 days</strong> to approve or deny a
              complete application when there is already a house on the lot.
              If it misses that, the application is deemed approved.
            </li>
            <li>
              A denial has to come with written comments on what is wrong and
              how to fix it, and you can appeal in writing.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            More on permits in{" "}
            <Link href="/guides/permits-orange-county" className={linkClass}>
              building permits in Orange County
            </Link>
            , and on contracts in{" "}
            <Link
              href="/guides/contractor-deposit-rules-california"
              className={linkClass}
            >
              how much a contractor can ask for up front
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className={h2Class}>Setbacks, size and fire safety</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>No new setbacks for a conversion.</strong> A city cannot
              require a setback for an existing structure converted to an ADU,
              or for one rebuilt in the same place and to the same size.
            </li>
            <li>
              <strong>Exterior access and fire safety.</strong> A converted
              ADU or junior ADU needs its own exterior access, and side and rear
              setbacks sufficient for fire and safety. HCD notes that a
              conversion has to meet the building, health and fire standards
              for a home, not a garage.
            </li>
            <li>
              <strong>Fire sprinklers.</strong> Not required if the main house
              does not require them, and adding an ADU cannot trigger
              sprinklers in the main house.
            </li>
            <li>
              <strong>Size caps.</strong> A city cannot cap an ADU below 850
              square feet, or 1,000 square feet with more than one bedroom.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={h2Class}>Can you do more than one?</h2>
          <p className="mt-2 leading-relaxed">
            Yes. Government Code section 66323 lets you combine one converted
            ADU and one junior ADU inside the house or an existing accessory
            structure with one new detached ADU of up to 800 square feet on a
            single-family lot. So a garage conversion does not rule out a
            backyard unit later. Only one junior ADU is allowed per lot.
          </p>
        </section>

        <section>
          <h2 className={h2Class}>How the cost compares</h2>
          <p className="mt-2 leading-relaxed">
            A conversion usually costs less than a new detached ADU because
            the walls, roof and foundation are already there. The money goes
            to insulation, drywall, windows and doors, plumbing and a sewer
            connection for a kitchen and bathroom, electrical work, and
            finishes. We found no published survey figure for garage
            conversions, so we do not print one.
          </p>
          <p className="mt-2 leading-relaxed">
            For the detached end, according to the Remodeling 2025 Cost vs.
            Value Report (www.costvsvalue.com), a new 660 square foot,
            one-story detached ADU averaged <strong>$178,536</strong> in the
            Los Angeles market in 2025, the closest market it covers to Orange
            County. Our{" "}
            <Link href="/guides/adu-cost" className={linkClass}>
              ADU cost guide
            </Link>{" "}
            covers what drives it, and the 2026 law changes, including the SB
            543 limits on impact fees for smaller units.
          </p>
        </section>

        <section>
          <h2 className={h2Class}>Pre-approved plans in Orange County</h2>
          <p className="mt-2 leading-relaxed">
            Newport Beach is the one Orange County city we found whose
            pre-approved plans include garage conversions: two of its five,
            one for a one-car garage and one for a two-car garage. You still
            supply site-specific items such as a site plan and a Title 24
            energy analysis. Other cities&apos; plan programs are in the city
            table of our{" "}
            <Link href="/guides/adu-cost" className={linkClass}>
              ADU cost guide
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className={h2Class}>HOAs and the coastal zone</h2>
          <p className="mt-2 leading-relaxed">
            An HOA can apply reasonable design rules to an ADU but cannot
            effectively prohibit one (Civil Code section 4751); a room
            conversion gets no such protection. In the coastal zone, an ADU
            can also need a coastal development permit. Both are covered in
            our{" "}
            <Link
              href="/guides/hoa-coastal-commission-remodel-orange-county"
              className={linkClass}
            >
              guide to HOA and coastal approvals
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className={h2Class}>Frequently asked questions</h2>
          <div className="mt-2 space-y-4">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className="font-medium text-stone-900 dark:text-stone-100">
                  {f.q}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
            The ADU cost figure is from the Remodeling
            2025 Cost vs. Value Report (www.costvsvalue.com) for the Los
            Angeles market. © 2025 Zonda Media, a Delaware Corporation.
            Complete data from the Remodeling 2025 Cost vs. Value Report can be
            downloaded free at www.costvsvalue.com. OakTend is not a contractor
            and does not set or guarantee prices.
          </p>
        </section>
      </div>

      {/* Sources, related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/garage-conversion-vs-adu-orange-county" />

      <GuideCta />
    </main>
  );
}

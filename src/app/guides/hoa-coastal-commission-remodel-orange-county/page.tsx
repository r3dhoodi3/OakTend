import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide for Orange County homeowners, added 2026-09-26 from
// section 2 of the SEO plan (OakTend-marketing/seo-research-2026-09-24): HOA
// architectural review and the Coastal Commission explained together, which
// no page the research found does.
//
// Every rule here was read on 2026-09-26 in the source itself: the Civil Code
// (4000, 4751, 4760, 4765, 714, 714.3, 4745), the Coastal Act in the Public
// Resources Code (30106, 30519, 30600, 30603, 30610), California Code of
// Regulations title 14 section 13250, Government Code section 66329 as
// amended by AB 462, HCD's March 2026 ADU Handbook, the Coastal Commission's
// LCP status chart (dated October 9, 2024) and May 2026 Seal Beach staff
// report, and the Newport Beach and San Clemente city pages. All are listed
// in GUIDE_SOURCES (src/lib/guideExtras.ts).
//
// LCP status per city comes from the Commission's chart, cross-checked
// against the city's own page where one opened (Newport Beach, San Clemente).
// Laguna Beach's site refused automated requests on 2026-09-26, so its row
// rests on the Commission chart alone. The chart also lists Costa Mesa; it is
// left off on purpose (no Costa Mesa permit specifics until someone can open
// the city's site).
//
// No timelines or fees are quoted for HOA or coastal review: none could be
// sourced. The page must keep its "general information, not legal advice"
// line. The pro side is closed, so nothing here offers to find, match or book
// a contractor.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker). Nothing in this page or in src/app/guides/layout.tsx
// reads cookies(), headers(), searchParams or the database, so it prerenders
// once and is served from the edge cache. Anything added here that reads
// cookies()/headers()/searchParams undoes it.
export const revalidate = 3600;

// 40 characters, so the full "<title> | OakTend" stays at 50. The OG image at
// ./opengraph-image.tsx keeps its own literal copy.
const TITLE = "HOA and coastal permits in Orange County";
const DESCRIPTION =
  "HOA review and Coastal Commission permits for Orange County remodels: your rights under Davis-Stirling, which cities issue coastal permits, and what is exempt.";
const CANONICAL = `${SITE_URL}/guides/hoa-coastal-commission-remodel-orange-county`;

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

const FAQS = [
  {
    q: "Do I need HOA approval before remodeling?",
    a: "Yes, if your association's governing documents require it, which is common for changes to the outside of the house. It is separate from the city building permit.",
  },
  {
    q: "Do I need a coastal development permit to remodel my house?",
    a: "Only if the house is in the coastal zone, and even then many improvements to an existing single-family home are exempt under Public Resources Code section 30610. Your city makes the call.",
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

// Local coastal program status for the Orange County cities with coastal
// zone land, from the Coastal Commission's FY 2023-24 status chart (October
// 9, 2024), cross-checked where a city page opened. Stacked rows, not a
// table, so it reads at 390px.
const COASTAL_CITIES: {
  city: string;
  href: string;
  status: string;
}[] = [
  {
    city: "Seal Beach",
    href: "/oc/seal-beach",
    status:
      "No certified program. The Coastal Commission issues coastal permits; a May 2026 Commission staff report on a Seal Beach home addition says so.",
  },
  {
    city: "Huntington Beach",
    href: "/huntington-beach",
    status:
      "Certified 1985. The Sunset Beach annexation and a few other areas are listed as uncertified.",
  },
  {
    city: "Newport Beach",
    href: "/oc/newport-beach",
    status:
      "Certified, effective January 30, 2017. The city issues most coastal permits; Banning Ranch and the Newport Coast annexation are listed as uncertified.",
  },
  {
    city: "Irvine",
    href: "/oc/irvine",
    status: "Certified 1982 for the part of the city in the coastal zone.",
  },
  {
    city: "Laguna Beach",
    href: "/oc/laguna-beach",
    status:
      "Certified 1993. Three Arch Bay, Blue Lagoon, Irvine Cove and Hobo Canyon are listed as areas where the city's program is not certified.",
  },
  {
    city: "Laguna Niguel",
    href: "/oc/laguna-niguel",
    status: "Certified 1990.",
  },
  {
    city: "Dana Point",
    href: "/oc/dana-point",
    status: "Certified 1989.",
  },
  {
    city: "San Clemente",
    href: "/oc/san-clemente",
    status:
      "Land use plan certified August 10, 2018, but the implementation plan is still in progress, so the city does not have a fully certified program yet.",
  },
];

export default function HoaCoastalRemodelGuide() {
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
        path="/guides/hoa-coastal-commission-remodel-orange-county"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "HOA and coastal approvals" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "HOA and coastal approvals", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        HOA and Coastal Commission approval for Orange County remodels
      </h1>
      <GuideMeta path="/guides/hoa-coastal-commission-remodel-orange-county" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        General information, not legal advice.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-6 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          The short answer
        </p>
        <p className="mt-2 leading-relaxed text-stone-800 dark:text-stone-200">
          A remodel in Orange County can need up to three separate approvals:
          your HOA, if its documents require one; the city building permit;
          and a coastal development permit, if the lot is in the coastal zone
          and the work is not exempt. One never stands in for another.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className={h2Class}>HOA architectural review</h2>
          <p className="mt-2 leading-relaxed">
            California associations run under the Davis-Stirling Common
            Interest Development Act, which starts at Civil Code section 4000.
            Whether you need approval depends on the governing documents,
            usually the CC&amp;Rs: a change to the exterior appearance of your
            home has to follow them (section 4760). When they require
            approval, section 4765 sets the ground rules:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              A fair, reasonable and expeditious written procedure, with a
              stated maximum time to respond.
            </li>
            <li>
              Decisions in good faith, not unreasonable, arbitrary or
              capricious, and within the law, including fair housing law and
              the building code.
            </li>
            <li>
              A written decision. A denial has to explain why and how to ask
              the board to reconsider, and you are entitled to that
              reconsideration at an open board meeting, unless the board
              itself decided at an open meeting.
            </li>
            <li>
              A yearly notice to members of which changes need approval, with
              a copy of the procedure.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            Find that annual notice or ask the management company for the
            procedure, then submit complete plans.
          </p>
        </section>

        <section>
          <h2 className={h2Class}>What an HOA cannot block outright</h2>
          <p className="mt-2 leading-relaxed">
            For these projects, state law voids association rules that
            effectively prohibit or unreasonably restrict them, though
            reasonable design and placement rules still apply.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>ADUs and junior ADUs</strong> on a single-family lot
              (Civil Code sections 4751 and 714.3). A reasonable restriction
              cannot include fees or other financial requirements, and
              HCD&apos;s ADU Handbook counts an HOA review that runs past the
              60 days a city gets as an effective prohibition. See{" "}
              <Link
                href="/guides/garage-conversion-vs-adu-orange-county"
                className={linkClass}
              >
                garage conversion vs ADU
              </Link>
              .
            </li>
            <li>
              <strong>Solar</strong> (Civil Code section 714). A solar
              application not denied in writing within 45 days is deemed
              approved, unless the association asked for more information.
              Our{" "}
              <Link
                href="/guides/solar-battery-orange-county"
                className={linkClass}
              >
                solar and battery guide
              </Link>{" "}
              covers the cost and efficiency limits on a restriction.
            </li>
            <li>
              <strong>EV charging</strong> in your unit or designated parking
              space (Civil Code section 4745). The same rule applies, with 60
              days instead of 45.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={h2Class}>The coastal zone and the Coastal Act</h2>
          <p className="mt-2 leading-relaxed">
            Under the California Coastal Act, anyone doing
            &quot;development&quot; in the coastal zone needs a coastal
            development permit, in addition to every other permit the work
            needs (Public Resources Code section 30600). Development is defined
            broadly in section 30106: building, demolition, grading, and any
            change to the size of a structure all count.
          </p>
          <p className="mt-2 leading-relaxed">
            To see whether your lot is in or near the coastal zone, start with
            the{" "}
            <a
              href="https://www.coastal.ca.gov/maps/czb/"
              className={linkClass}
              rel="noopener"
            >
              Coastal Commission&apos;s boundary maps
            </a>
            . The Commission warns that its digital maps do not replace a
            formal boundary determination, so if your lot is close to the line,
            ask the city.
          </p>
        </section>

        <section>
          <h2 className={h2Class}>Who issues the coastal permit in each city</h2>
          <p className="mt-2 leading-relaxed">
            Each coastal city writes a local coastal program. Once the
            Commission certifies it, the city issues most coastal permits
            itself (section 30519). Where there is no certified program, you
            apply to the Commission. The Commission&apos;s October 2024 status
            chart lists these Orange County cities with land in the coastal
            zone:
          </p>
          <ul className="mt-4 space-y-3">
            {COASTAL_CITIES.map((c) => (
              <li
                key={c.city}
                className="rounded-xl border border-stone-200 p-4 dark:border-white/10"
              >
                <Link
                  href={c.href}
                  className="font-semibold text-bark-700 hover:underline dark:text-stone-300"
                >
                  {c.city}
                </Link>
                <p className="mt-1 text-sm leading-relaxed">{c.status}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 leading-relaxed">
            The chart also lists unincorporated county areas and a few other
            cities. Even in a certified city, the Commission keeps permit
            authority over tidelands and submerged land, and a city&apos;s
            approval can be appealed to the Commission in certain areas near
            the shore, such as between the sea and the first public road or
            within 300 feet of a beach or of the top of a coastal bluff
            (section 30603).
          </p>
        </section>

        <section>
          <h2 className={h2Class}>What usually needs a coastal permit, and what is exempt</h2>
          <p className="mt-2 leading-relaxed">
            Public Resources Code section 30610 exempts improvements to an
            existing single-family home, and repair or maintenance that does
            not enlarge anything. The Commission&apos;s regulation (California
            Code of Regulations title 14 section 13250) lists the improvements
            that still need one, among them:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              Any improvement if the home is on a beach, in a wetland, seaward
              of the mean high tide line, in an environmentally sensitive
              habitat area, in an area designated highly scenic, or within 50
              feet of the edge of a coastal bluff.
            </li>
            <li>
              On lots between the sea and the first public road, or within 300
              feet of a beach, an addition of 10 percent or more of the floor
              area, a height increase of more than 10 percent, or a significant
              detached structure such as a garage, fence or shoreline protection.
            </li>
            <li>
              Any improvement where the original permit for the house said
              future improvements would need one.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            The same regulation counts garages, pools, fences and sheds as part
            of the home, but not guest houses or self-contained residential
            units, so an ADU is not covered by the single-family exemption.
          </p>
          <p className="mt-2 leading-relaxed">
            Your city&apos;s program can go further. Newport Beach, for
            example, says its categorical exclusion takes single-unit and
            two-unit projects out of the coastal permit requirement, except on
            the first row of lots on the shoreline and in the Bay Shores
            community. Interior remodels such as a{" "}
            <Link href="/guides/kitchen-remodel-cost" className={linkClass}>
              kitchen
            </Link>{" "}
            or{" "}
            <Link href="/guides/bathroom-remodel-cost" className={linkClass}>
              bathroom
            </Link>{" "}
            that do not add floor area or height are usually the easy case, but
            the city makes the call for your lot.
          </p>
        </section>

        <section>
          <h2 className={h2Class}>ADUs in the coastal zone: the 60-day clock</h2>
          <p className="mt-2 leading-relaxed">
            AB 462, signed October 10, 2025 and effective immediately, amended
            Government Code section 66329:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              A city with a certified program must approve or deny the coastal
              permit for an ADU within <strong>60 days</strong> of a complete
              application, at the same time as its own ADU review and without a
              public hearing.
            </li>
            <li>
              The city&apos;s decision on an ADU coastal permit cannot be
              appealed to the Coastal Commission under section 30603.
            </li>
            <li>
              Where there is no certified program, as in Seal Beach and San
              Clemente, the Commission gets the same 60 days, or the
              application is deemed approved. The exception: if the ADU is
              filed together with a new house, the Commission can decide the
              house first.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            The rest of the 2026 ADU rules are in our{" "}
            <Link href="/guides/adu-cost" className={linkClass}>
              ADU cost guide
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className={h2Class}>Getting both approvals</h2>
          <p className="mt-2 leading-relaxed">
            Design to satisfy both: a change the HOA asks for can change what
            the city reviews, and the reverse. Keep every decision in writing
            with your{" "}
            <Link href="/guides/permits-orange-county" className={linkClass}>
              building permit
            </Link>{" "}
            records, and put in your contract who is responsible for which
            approval. Our{" "}
            <Link
              href="/guides/contractor-deposit-rules-california"
              className={linkClass}
            >
              deposit rules guide
            </Link>{" "}
            covers what the contract must say.
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
            City coastal program status is from the
            Coastal Commission&apos;s chart dated October 9, 2024, checked
            against city pages on September 26, 2026.
          </p>
        </section>
      </div>

      {/* Sources, related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/hoa-coastal-commission-remodel-orange-county" />

      <GuideCta />
    </main>
  );
}

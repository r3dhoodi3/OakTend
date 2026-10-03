import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide: Orange County fire hazard severity zones, the 2025 local
// maps, how to look up an address, and what a zone means at sale. The yard
// and house work (defensible space, Zone 0, vents) lives on the wildfire prep
// guide and is linked, not repeated. The seller disclosure paragraph moved
// here from that guide on 2026-10-03, since this is the page a seller lands
// on. Every source opened 2026-10-03; links in GUIDE_SOURCES,
// src/lib/guideExtras.ts:
//  - Government Code 51178 (who maps zones, on what basis), 51179 (local
//    ordinance within 120 days, may raise, may not lower), 51183.5 (seller
//    disclosure of a very high zone on the Natural Hazard Disclosure
//    Statement). Read on leginfo with a plain fetch.
//  - County of Orange Public Works: the March 24, 2025 map, Ordinance No.
//    25-015 adopted August 26, 2025, the link to CAL FIRE's viewer, and the
//    building code line for very high zones.
//  - City of Laguna Niguel and City of Lake Forest FHSZ pages: the March 24,
//    2025 transmittal, Laguna Niguel's June 3, 2025 adoption, hazard vs risk,
//    the Department of Insurance quote, Chapter 7A for new buildings, Lake
//    Forest's 2025 and 2007 maps.
//  - OCFA: defensible space disclosure page (Civil Code 1102.19, the 11
//    cities that inspect for themselves, the address map), the FAQ (free,
//    exterior only, who must be present, timing, 6 months, NHD map
//    difference), member cities (23 cities and unincorporated areas).
//  - OAL recent actions page: Zone 0 filing still listed as withdrawn
//    September 8, 2026, and no Board of Forestry filing under review.
// CAL FIRE's own Fire Hazard Severity Zone pages (osfm.fire.ca.gov,
// fire.ca.gov) returned 403 to WebFetch and to curl, so nothing here rests on
// them; the viewer link comes from the County's page.
//
// No FAQPage or HowTo JSON-LD on purpose: the questions are visible headings
// only. Article and BreadcrumbList are the only structured data here.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker), same as every guide: nothing here reads cookies(),
// headers(), searchParams or the database.
export const revalidate = 3600;

// Title/description held once so metadata.title, openGraph, and twitter
// can't drift from each other; the OG image at ./opengraph-image.tsx keeps
// its own literal copy of the title.
const TITLE = "Fire hazard severity zones in Orange County";
const DESCRIPTION =
  "How to check if your Orange County home is in a fire hazard severity zone, what the 2025 maps changed, and what a zone means when you sell.";
const CANONICAL = `${SITE_URL}/guides/orange-county-fire-hazard-severity-zones`;

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

const linkClass =
  "text-bark-700 underline hover:no-underline dark:text-stone-300";

export default function OrangeCountyFireHazardSeverityZonesGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <GuideArticleJsonLd
        path="/guides/orange-county-fire-hazard-severity-zones"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Fire hazard severity zones" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Fire hazard severity zones", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Fire hazard severity zones in Orange County
      </h1>
      <GuideMeta path="/guides/orange-county-fire-hazard-severity-zones" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        For Orange County homeowners. General information, not legal or
        insurance advice; your city and fire department have the final word.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          The short answer
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          Check your address on the 2025 maps
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          The state sent new zone maps to Orange County cities and the
          County in 2025, so a lookup from before then may be out of date. A
          zone matters most when you build and when you sell.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What is a fire hazard severity zone?
          </h2>
          <p className="mt-2 leading-relaxed">
            An area the State Fire Marshal rates as moderate, high or very
            high fire hazard. Under Government Code section 51178 the rating
            rests on fuel, slope, fire weather and other factors, including
            places where wind is a major cause of fire spread.
          </p>
          <p className="mt-2 leading-relaxed">
            It rates the land, not your house. Laguna Niguel&apos;s page puts
            it this way: hazard is the chance of fire over 30 to 50 years
            without counting anything people do about it, while risk counts
            things like home hardening and fuel reduction. The same page
            quotes the California Department of Insurance: the maps are
            intended to drive local planning decisions, not insurance
            decisions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What changed with the 2025 maps?
          </h2>
          <p className="mt-2 leading-relaxed">
            On March 24, 2025, CAL FIRE sent updated maps for the areas that
            cities and the County protect themselves. Laguna Niguel, Lake
            Forest and the County all date their new map to that day. State
            law then gives each one 120 days to adopt zones by ordinance. A
            city or the County can add areas or raise a level, but it cannot
            lower one the state set.
          </p>
          <p className="mt-2 leading-relaxed">
            For unincorporated areas the Board of Supervisors adopted the map
            by Ordinance No. 25-015 on August 26, 2025. Laguna Niguel adopted
            its map on June 3, 2025, and{" "}
            <a
              href="https://www.lakeforestca.gov/departments/fire/fire_hazard_severity_zone_maps.php"
              rel="noopener"
              className={linkClass}
            >
              Lake Forest
            </a>{" "}
            posts its 2025 map next to the 2007 one, which is an easy way to
            see what moved.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How do I find out if my house is in one?
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>CAL FIRE&apos;s map viewer.</strong> The County links
              to the state&apos;s{" "}
              <a
                href="https://experience.arcgis.com/experience/03beab8511814e79a0e4eabf0d3e7247/"
                rel="noopener"
                className={linkClass}
              >
                Fire Hazard Severity Zone Viewer
              </a>
              , where you enter an address.
            </li>
            <li>
              <strong>OCFA&apos;s map.</strong> The Orange County Fire
              Authority&apos;s{" "}
              <a
                href="https://ocfa.org/ready-set-go/defensible-space-disclosure/"
                rel="noopener"
                className={linkClass}
              >
                defensible space disclosure page
              </a>{" "}
              has an address map. Its pink areas are where OCFA does the
              seller inspections described below.
            </li>
            <li>
              <strong>Your city.</strong>{" "}
              <a
                href="https://www.cityoflagunaniguel.org/1120/Fire-Hazard-Severity-Zones-FHSZ"
                rel="noopener"
                className={linkClass}
              >
                Laguna Niguel
              </a>{" "}
              has an address lookup, and the{" "}
              <a
                href="https://pwds.oc.gov/service-areas/oc-development-services/planning-development/current-projects/all-districts-projects/orange-county-fire-hazard-severity-zones-map"
                rel="noopener"
                className={linkClass}
              >
                County
              </a>{" "}
              posts the unincorporated map and the ordinance. Elsewhere, ask
              your city&apos;s planning or building department.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            The maps do not always agree. OCFA notes that a Natural Hazard
            Disclosure report may show a fire zone where OCFA&apos;s map does
            not, because the report company may use a map that includes
            lower severity zones.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What does being in a zone mean for my house?
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Building.</strong> The County says buildings in a very
              high zone are built with the fire-resistive features in the
              California Building Code, and Laguna Niguel points new buildings
              in its zones to Chapter 7A. Before an addition or a big
              remodel, ask your building department which rules apply.
            </li>
            <li>
              <strong>Yard and house.</strong> Defensible space, the 5-foot
              ember-resistant zone (Zone 0) and ember-resistant vents are in
              our{" "}
              <Link href="/guides/santa-ana-wind-wildfire-home-prep" className={linkClass}>
                wildfire prep guide
              </Link>
              . Whether Zone 0 is required yet is answered there too.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What do I have to do when I sell?
          </h2>
          <p className="mt-2 leading-relaxed">
            Two things. Under Government Code section 51183.5, the seller of
            a home in a very high zone has to disclose that, on the Natural
            Hazard Disclosure Statement or a local option disclosure form.
            And OCFA explains that Civil Code section 1102.19 requires the seller of a home in a high or
            very high zone to give the buyer documentation that the property
            complies with defensible space rules, or a written agreement that
            the buyer will get it within one year of closing.
          </p>
          <p className="mt-2 leading-relaxed">
            OCFA&apos;s answers about its inspection:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>It is free and covers the outside of the property only.</li>
            <li>
              The owner or the selling agent requests it, when the home is
              listed. Someone 18 or older with a right to be there has to
              walk it with the inspector.
            </li>
            <li>
              If the property passes, a compliance form is emailed within 1
              to 3 business days. If not, the inspector leaves a handwritten
              notice of the work needed.
            </li>
            <li>The compliance documentation is good for 6 months.</li>
          </ul>
          <p className="mt-2 leading-relaxed">
            OCFA serves 23 cities and all unincorporated areas. Anaheim,
            Brea, Costa Mesa, Fullerton, Fountain Valley, Huntington Beach,
            Laguna Beach, La Habra (through Los Angeles County), Newport
            Beach, Orange and Placentia run their own inspections, so start
            with the city there.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps the inspection form, dated photos of the yard work
            and your receipts in your home&apos;s record, so they are ready
            when you sell or your insurer asks.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Keep your home&apos;s record, free
          </Link>
        </div>

        <section>
          <p className="text-sm text-stone-600 dark:text-stone-300">
            City pages:{" "}
            <Link href="/oc/laguna-niguel" className="text-bark-700 hover:underline dark:text-stone-300">Laguna Niguel</Link>,{" "}
            <Link href="/oc/lake-forest" className="text-bark-700 hover:underline dark:text-stone-300">Lake Forest</Link>,{" "}
            <Link href="/oc/mission-viejo" className="text-bark-700 hover:underline dark:text-stone-300">Mission Viejo</Link>,{" "}
            <Link href="/oc/san-juan-capistrano" className="text-bark-700 hover:underline dark:text-stone-300">San Juan Capistrano</Link>,{" "}
            <Link href="/oc/brea" className="text-bark-700 hover:underline dark:text-stone-300">Brea</Link> and{" "}
            <Link href="/oc/villa-park" className="text-bark-700 hover:underline dark:text-stone-300">Villa Park</Link>, or every city on
            the <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">Orange County hub</Link>.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
            As of October 3, 2026. Maps and rules change; check the current
            map and your fire department before you rely on any of this.
          </p>
        </section>
      </div>

      <GuideRelated path="/guides/orange-county-fire-hazard-severity-zones" />

      <GuideCta />
    </main>
  );
}

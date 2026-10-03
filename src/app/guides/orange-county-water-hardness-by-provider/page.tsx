import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";
import {
  MG_L_PER_GRAIN,
  MWD_IMPORTED,
  OC_WATER_HARDNESS,
  formatRange,
} from "@/lib/ocWaterHardness";

// Public data page: tap water hardness for each Orange County water provider
// whose 2026 water quality report we opened on 2026-10-02. The numbers live in
// src/lib/ocWaterHardness.ts (with where each came from) and every report is
// listed with its link in GUIDE_SOURCES (src/lib/guideExtras.ts).
//
// What hard water does, the softener rules and the flushing advice live on
// /guides/hard-water-orange-county and the how-to pages; this page links to
// them rather than repeating them. No product or softener recommendations.
//
// No FAQPage or HowTo JSON-LD, like the other Orange County guides
// (src/lib/ocGuides.test.ts): the questions are visible headings only.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker), same as every other guide.
export const revalidate = 3600;

// 40 characters, so the full "<title> | OakTend" is 50. The OG image at
// ./opengraph-image.tsx keeps its own literal copy.
const TITLE = "Orange County water hardness by provider";
const DESCRIPTION =
  "Tap water hardness for 14 Orange County water providers, in grains per gallon and mg/L, from each provider's latest water quality report.";
const CANONICAL = `${SITE_URL}/guides/orange-county-water-hardness-by-provider`;

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
const thClass =
  "px-3 py-2.5 font-semibold text-stone-700 dark:text-stone-300";
const tdClass = "px-3 py-2.5 align-top text-stone-600 dark:text-stone-300";

export default function OrangeCountyWaterHardnessGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/orange-county-water-hardness-by-provider"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Water hardness by provider" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Water hardness by provider", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Orange County water hardness by water provider
      </h1>
      <GuideMeta path="/guides/orange-county-water-hardness-by-provider" />

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          The short answer
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          Most providers averaged 10 to 22 grains per gallon in 2025
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          That is hard to very hard water. Mesa Water District was the one
          clear exception, at 6.6. Every figure below is the provider&apos;s own,
          from its latest annual water quality report.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How hard is the water from each Orange County provider?
          </h2>
          <p className="mt-2 leading-relaxed">
            Averages for 2025, as each provider printed them. Where a provider
            listed more than one source, each gets its own line. The range is
            the lowest and highest reading in the report.
          </p>

          {/* Phone: one card per provider. */}
          <ul className="mt-3 space-y-3 sm:hidden">
            {OC_WATER_HARDNESS.map((row) => (
              <li
                key={row.provider}
                className="rounded-xl border border-stone-200 p-4 text-sm leading-relaxed dark:border-white/10"
              >
                <p className="font-semibold text-stone-900 dark:text-stone-100">
                  {row.provider}
                </p>
                {row.readings.map((r) => (
                  <p key={r.source} className="mt-1 text-stone-600 dark:text-stone-300">
                    {r.source}: {r.gpg} grains per gallon, {r.mgL} mg/L
                  </p>
                ))}
                <p className="mt-1 text-stone-600 dark:text-stone-300">
                  Range: {formatRange(row.rangeMgL)} mg/L
                </p>
                {row.note ? (
                  <p className="mt-1 text-stone-600 dark:text-stone-300">{row.note}</p>
                ) : null}
                <p className="mt-1 text-xs text-stone-600 dark:text-stone-300">
                  <a href={row.href} rel="noopener" className={linkClass}>
                    {row.report}
                  </a>
                </p>
              </li>
            ))}
          </ul>

          {/* sm and up: the table. Same numbers as the cards. */}
          <div className="mt-3 hidden overflow-hidden rounded-xl border border-stone-200 sm:block dark:border-white/10">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                Average tap water hardness in grains per gallon and mg/L as
                calcium carbonate, by Orange County water provider, 2025
                sampling
              </caption>
              <thead>
                <tr className="bg-stone-50 text-left dark:bg-stone-800">
                  <th scope="col" className={thClass}>
                    Provider and source
                  </th>
                  <th scope="col" className={thClass}>
                    Grains per gallon
                  </th>
                  <th scope="col" className={thClass}>
                    mg/L
                  </th>
                  <th scope="col" className={thClass}>
                    Range, mg/L
                  </th>
                </tr>
              </thead>
              <tbody>
                {OC_WATER_HARDNESS.map((row) => (
                  <tr
                    key={row.provider}
                    className="border-t border-stone-200 dark:border-white/10"
                  >
                    <th scope="row" className={`${tdClass} text-left font-normal`}>
                      <a
                        href={row.href}
                        rel="noopener"
                        className={`${linkClass} font-medium`}
                      >
                        {row.provider}
                      </a>
                      {row.readings.map((r) => (
                        <span key={r.source} className="block text-xs">
                          {r.source}
                        </span>
                      ))}
                      {row.note ? (
                        <span className="mt-1 block text-xs">{row.note}</span>
                      ) : null}
                    </th>
                    <td className={tdClass}>
                      {row.readings.map((r) => (
                        <span key={r.source} className="block">
                          {r.gpg}
                        </span>
                      ))}
                    </td>
                    <td className={tdClass}>
                      {row.readings.map((r) => (
                        <span key={r.source} className="block">
                          {r.mgL}
                        </span>
                      ))}
                    </td>
                    <td className={tdClass}>{formatRange(row.rangeMgL)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 leading-relaxed">
            Imported water from the Metropolitan Water District, which most of
            these providers buy some of, averaged {MWD_IMPORTED.mgLLow} to{" "}
            {MWD_IMPORTED.mgLHigh} mg/L, or about {MWD_IMPORTED.gpg} grains per
            gallon, in the reports that list it.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
            Each provider name links to its report. Every report printed both
            units, so nothing here is converted by us. City of Orange&apos;s
            report is the copy filed with the State Water Resources Control
            Board. If your provider is missing, we have not read its report
            yet. You are welcome to cite this table; please link back to this
            page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How do grains per gallon and mg/L compare?
          </h2>
          <p className="mt-2 leading-relaxed">
            They measure the same thing: dissolved calcium and magnesium,
            counted as calcium carbonate. One grain per gallon equals{" "}
            {MG_L_PER_GRAIN} mg/L, and mg/L is the same number as parts per
            million (ppm).
            On the U.S. Geological Survey&apos;s scale, anything over 180
            mg/L, about 10.5 grains, is very hard.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Which water provider serves my house?
          </h2>
          <p className="mt-2 leading-relaxed">
            The name on your water bill. City limits and water service areas
            do not always line up: Golden State Water runs separate systems in
            different parts of the county, and Tustin&apos;s report covers
            water from the East Orange County Water District as well as the
            city&apos;s own wells. City pages
            for the providers above:{" "}
            <Link href="/oc/anaheim" className={linkClass}>
              Anaheim
            </Link>
            ,{" "}
            <Link href="/fountain-valley" className={linkClass}>
              Fountain Valley
            </Link>
            ,{" "}
            <Link href="/oc/garden-grove" className={linkClass}>
              Garden Grove
            </Link>
            ,{" "}
            <Link href="/huntington-beach" className={linkClass}>
              Huntington Beach
            </Link>
            ,{" "}
            <Link href="/oc/irvine" className={linkClass}>
              Irvine
            </Link>
            ,{" "}
            <Link href="/oc/costa-mesa" className={linkClass}>
              Costa Mesa
            </Link>
            ,{" "}
            <Link href="/oc/newport-beach" className={linkClass}>
              Newport Beach
            </Link>
            ,{" "}
            <Link href="/oc/orange" className={linkClass}>
              Orange
            </Link>
            ,{" "}
            <Link href="/oc/santa-ana" className={linkClass}>
              Santa Ana
            </Link>
            ,{" "}
            <Link href="/oc/rancho-santa-margarita" className={linkClass}>
              Rancho Santa Margarita
            </Link>
            ,{" "}
            <Link href="/oc/tustin" className={linkClass}>
              Tustin
            </Link>{" "}
            and{" "}
            <Link href="/oc/placentia" className={linkClass}>
              Placentia
            </Link>
            . Every city is on the{" "}
            <Link href="/oc" className={linkClass}>
              Orange County hub
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Why does my water seem harder some months?
          </h2>
          <p className="mt-2 leading-relaxed">
            Most providers blend groundwater with imported water and change
            the mix through the year. Irvine Ranch Water District&apos;s report
            says customers may notice a difference in hardness at different
            times of year, and that none of it affects safety. That is also
            why the ranges above are wide: they cover every source and every
            sample, not your tap on a given day.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What should I do about hard water at home?
          </h2>
          <p className="mt-2 leading-relaxed">
            Hard water leaves scale when it is heated, so the water heater
            comes first. Our step-by-step pages cover{" "}
            <Link href="/guides/how-to/flush-tank-water-heater" className={linkClass}>
              flushing a tank water heater
            </Link>{" "}
            and{" "}
            <Link href="/guides/how-to/descale-tankless-water-heater" className={linkClass}>
              descaling a tankless one
            </Link>
            . What scale does to fixtures and appliances, and the California
            rules on water softeners, are in our{" "}
            <Link href="/guides/hard-water-orange-county" className={linkClass}>
              hard water guide
            </Link>
            . If a heater is past saving, see the{" "}
            <Link href="/guides/water-heater-replacement-cost" className={linkClass}>
              water heater replacement guide
            </Link>
            .
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps the age of your water heater and reminds you when a
            flush or descale is due.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Track your water heater, free
          </Link>
        </div>

        <section>
          <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
            Figures checked October 2, 2026, from each provider&apos;s report
            on 2025 sampling, linked under Sources. Providers publish a new
            report every year. General information, not plumbing or health
            advice.
          </p>
        </section>
      </div>

      {/* Sources, related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/orange-county-water-hardness-by-provider" />

      <GuideCta />
    </main>
  );
}

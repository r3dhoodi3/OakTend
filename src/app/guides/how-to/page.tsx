import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import { CHORES } from "@/content/chores";
import {
  CHORE_HUB_PATH,
  SEASON_HEADINGS,
  SEASON_ORDER,
  SYSTEM_HEADINGS,
  SYSTEM_ORDER,
  chorePath,
} from "@/lib/chores";

// Hub for the short how-to chore pages (src/lib/chores.ts). Two plain lists of
// the same pages: by part of the house, then by season. No filter widget, no
// client JS: a list a reader can scan and a crawler can follow.
//
// It is a section index, not an Article, so it renders no Article JSON-LD
// (same as the /guides index). It is listed in the sitemap from CHORE_PATHS.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const revalidate = 3600;

const TITLE = "Home maintenance how-tos";
const DESCRIPTION =
  "Short how-tos for Orange County homeowners: flush a water heater, clean a dryer vent, test alarms and GFCIs, prep gutters and sprinklers for the rain.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${CHORE_HUB_PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${CHORE_HUB_PATH}`,
    siteName: "OakTend",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const linkClass =
  "text-bark-700 underline hover:no-underline dark:text-stone-300";
const listLinkClass =
  "flex min-h-11 items-center text-sm font-medium text-bark-700 hover:underline sm:min-h-0 sm:py-1 dark:text-stone-300";

export default function HowToHub() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "How-tos" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "How-tos", href: CHORE_HUB_PATH },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        {TITLE}
      </h1>
      <p className="mt-3 leading-relaxed text-stone-700 dark:text-stone-300">
        One job per page: how often, what you need, the steps, and when to
        stop and call someone. Written for Orange County, where water is hard,
        salt air reaches well inland, and most of the year&apos;s rain falls
        from December through March. For the whole year at a glance, see the{" "}
        <Link
          href="/guides/orange-county-home-maintenance-checklist"
          className={linkClass}
        >
          Orange County home maintenance checklist
        </Link>
        .
      </p>

      <h2 className="mt-10 text-xl font-bold text-stone-900 dark:text-stone-100">
        By part of the house
      </h2>
      {SYSTEM_ORDER.map((system) => {
        const chores = CHORES.filter((c) => c.system === system);
        if (chores.length === 0) return null;
        return (
          <section key={system} className="mt-6">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              {SYSTEM_HEADINGS[system]}
            </h3>
            <ul className="mt-3 space-y-3">
              {chores.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={chorePath(c.slug)}
                    className="card block transition hover:border-bark-500 hover:shadow-md"
                  >
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      {c.metaTitle}
                    </span>
                    <span className="mt-1 block text-sm text-stone-600 dark:text-stone-300">
                      {c.howOften}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <h2 className="mt-12 text-xl font-bold text-stone-900 dark:text-stone-100">
        By season
      </h2>
      {SEASON_ORDER.map((season) => {
        const chores = CHORES.filter((c) => c.season === season);
        if (chores.length === 0) return null;
        return (
          <section key={season} className="mt-6">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              {SEASON_HEADINGS[season]}
            </h3>
            <ul className="mt-2 grid gap-x-6 sm:grid-cols-2">
              {chores.map((c) => (
                <li key={c.slug}>
                  <Link href={chorePath(c.slug)} className={listLinkClass}>
                    {c.metaTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="mt-12 border-t border-stone-200 pt-8 dark:border-white/10">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
          Covered in the longer guides
        </h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-stone-700 dark:text-stone-300">
          <li>
            Finding the water, gas and power shutoffs, and checking water
            heater straps:{" "}
            <Link
              href="/guides/new-homeowner-first-year-orange-county"
              className={linkClass}
            >
              new homeowner checklist
            </Link>
            .
          </li>
          <li>
            Clearing the first 5 feet around the house and screening vents
            against embers:{" "}
            <Link
              href="/guides/santa-ana-wind-wildfire-home-prep"
              className={linkClass}
            >
              Santa Ana wind and wildfire prep
            </Link>
            .
          </li>
          <li>
            The two-hour water meter test for a hidden leak:{" "}
            <Link href="/guides/slab-leak-signs" className={linkClass}>
              slab leak signs
            </Link>
            .
          </li>
        </ul>
      </section>
    </main>
  );
}

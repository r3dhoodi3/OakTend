import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";
import StructuredData from "@/components/StructuredData";
import { isHomeownerPreview } from "@/lib/previewMode";

// Comparison of home maintenance apps, aimed at "best home maintenance app".
//
// THE RULES THIS PAGE KEEPS:
//  - Every fact about another app comes from that app's own website or its US
//    App Store / Google Play listing, opened 2026-09-30. Each one is listed
//    with what it supports in GUIDE_SOURCES (src/lib/guideExtras.ts), which
//    renders as the Sources section at the foot of the page.
//  - Nothing about another app that its own listing does not say: no ratings,
//    no "we tested it", no comparisons we cannot source. "Best for" is a plain
//    description of who the app is built around, taken from its own feature
//    list, not a ranking.
//  - OakTend is listed first and the page says why (it is our page, and OakTend
//    only serves Orange County). Its features are not repeated here: the
//    landing page (/home-maintenance-app) has them, so this links there.
//  - No price OakTend itself does not print. During the preview the honest
//    price is free.
//
// When a price or listing changes, update APPS and the matching source entry
// together, and bump the dates in src/lib/guides.ts.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Static, same as every other guide (see the note in
// src/app/guides/new-homeowner-first-year-orange-county/page.tsx).
export const revalidate = 3600;

// 34 characters, 44 with the layout's " | OakTend".
const TITLE = "Best home maintenance apps in 2026";
const DESCRIPTION =
  "Ten home maintenance apps compared: what each does, price, platforms and who it suits. Every fact sourced, checked September 2026.";
const PATH = "/guides/best-home-maintenance-apps";
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
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

type AppEntry = {
  name: string;
  /** The app's own site or, where it has none of its own, its store listing. */
  url: string;
  what: React.ReactNode;
  price: string;
  platforms: string;
  bestFor: string;
};

// In page order. The ItemList JSON-LD below is built from this same list.
const APPS: AppEntry[] = [
  {
    name: "OakTend",
    url: `${SITE_URL}/home-maintenance-app`,
    what: (
      <>
        A maintenance plan, reminders, and weather and recall alerts built from
        your home&apos;s own record. The full feature list is on the{" "}
        <Link
          href="/home-maintenance-app"
          className="text-bark-700 underline hover:no-underline dark:text-stone-300"
        >
          OakTend app page
        </Link>
        .
      </>
    ),
    // Replaced at render by oaktendPrice(), which follows preview mode.
    price: "",
    platforms: "Web, in any phone or computer browser.",
    bestFor: "Homeowners in Orange County, California. It does not serve homes outside the county.",
  },
  {
    name: "HomeBeacon",
    url: "https://homebeacon.app/",
    what: "An automatic maintenance schedule, equipment and warranty tracking, and an AI assistant called Ask Pops.",
    price: "Free for your first home. HMS Pro is $9.99 a month or $95.90 a year in the App Store.",
    platforms: "iPhone, iPad, Mac and Android.",
    bestFor: "A free reminder schedule and equipment records for one home.",
  },
  {
    name: "HomeZada",
    url: "https://www.homezada.com/",
    what: "Home inventory, documents, maintenance, remodel projects and home finances.",
    price: "Essentials is free. Premium, which adds maintenance, is $99 a year or $15.95 a month. Deluxe is $189 a year for up to 3 properties.",
    platforms: "Web, iPhone and iPad, and Android.",
    bestFor: "Owners who want inventory, budgets and projects in one place.",
  },
  {
    name: "Homer",
    url: "https://apps.apple.com/us/app/homer-the-home-management-app/id1250049341",
    what: "Home inventory, maintenance tasks, expenses and documents. It finds owner's manuals for your appliances automatically.",
    price: "Free, with Homer Premium in-app purchases listed from $4.99 to $69.99.",
    platforms: "iPhone, Mac, Apple Vision and Android.",
    bestFor: "Keeping manuals, receipts and warranties organized.",
  },
  {
    name: "Dwellin",
    url: "https://www.dwellin.com/",
    what: "Tracks appliances, repairs and maintenance, and gives you points for the upkeep you log.",
    price: "Free. An optional Premium rewards membership earns bonus points.",
    platforms: "iPhone and iPad.",
    bestFor: "People who like earning rewards for keeping records.",
  },
  {
    name: "Oply",
    url: "https://www.oply.com/",
    what: "Maintenance recommendations for your home, an AI assistant, project tracking, and matching with local pros to compare quotes.",
    price: "Free to download.",
    platforms: "iPhone, iPad and Android.",
    bestFor: "Reminders and help finding a pro in the same app.",
  },
  {
    name: "Homerockr",
    url: "https://www.homerockr.com/en",
    what: "Maintenance and renovation planning with reminders, cost tracking and tasks shared across the household.",
    price: "Free to start, with a paid Plus subscription.",
    platforms: "Web, iPhone and Android.",
    bestFor: "Households that split chores and plan renovations together.",
  },
  {
    name: "Home Keeper",
    url: "https://apps.apple.com/us/app/home-keeper-home-maintenance/id6757248250",
    what: "Pick your state and it builds a maintenance schedule for your climate.",
    price: "Free.",
    platforms: "iPhone, Mac and Apple Vision.",
    bestFor: "A simple reminder list on iPhone.",
  },
  {
    name: "HomeQueue",
    url: "https://homequeue.app/",
    what: "Keeps repairs, upkeep and small jobs in one shared household list and ranks what to do first.",
    price: "Free for 5 active jobs, 3 upkeep schedules and 1 household. HomeQueue Pro is $2.99 a month or $29.99 a year in the US App Store.",
    platforms: "Web, iPhone and Android.",
    bestFor: "Families sorting a long to-do list.",
  },
  {
    name: "Thumbtack",
    url: "https://www.thumbtack.com/",
    what: "Mainly a marketplace where you compare prices, read reviews, and message and book local pros. Its app also has a home plan with reminders.",
    price: "Free for customers.",
    platforms: "Web, iPhone and Android.",
    bestFor: "Hiring a pro for a job right now.",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: TITLE,
  url: CANONICAL,
  numberOfItems: APPS.length,
  itemListElement: APPS.map((app, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: app.name,
    url: app.url,
  })),
};

const linkClass =
  "text-bark-700 underline hover:no-underline dark:text-stone-300";

// OakTend's price follows preview mode like the rest of the site
// (src/lib/previewMode.ts): everything free during the preview, the first
// home free outside it (same wording as /home-maintenance-app).
function oaktendPrice(preview: boolean): string {
  return preview
    ? "Free during our preview, no card needed."
    : "Your first home is free, no card needed. OakTend Plus is optional.";
}

export default function BestHomeMaintenanceAppsGuide() {
  const preview = isHomeownerPreview();
  const apps = APPS.map((app) =>
    app.name === "OakTend" ? { ...app, price: oaktendPrice(preview) } : app
  );
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <GuideArticleJsonLd
        path="/guides/best-home-maintenance-apps"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />
      <StructuredData data={itemListJsonLd} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Best home maintenance apps" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Best home maintenance apps", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Best home maintenance apps in 2026
      </h1>
      <GuideMeta path="/guides/best-home-maintenance-apps" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        As of September 2026. Every fact below comes from the app&apos;s own
        website or its US App Store or Google Play listing, linked under
        Sources. We did not test every app hands-on, and prices change, so
        check the listing before you pay.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          The short answer
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          Pick by what you need most
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          <li>
            A home in Orange County: OakTend,{" "}
            {preview ? "free during our preview" : "free for your first home"}.
          </li>
          <li>A free reminder app: HomeBeacon, Home Keeper or Dwellin.</li>
          <li>Detailed records and budgets: HomeZada or Homer.</li>
          <li>A shared family to-do list: HomeQueue or Homerockr.</li>
          <li>Hiring a pro today: Thumbtack or Oply.</li>
        </ul>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
        OakTend publishes this guide and is one of the apps on it. We list it
        first because this site is for Orange County homeowners. For a home
        anywhere else, start with the others.
      </p>

      <ol className="mt-6 space-y-4">
        {apps.map((app, i) => (
          <li key={app.name} className="card">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              {i + 1}. {app.name}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              {app.what}
            </p>
            <dl className="mt-3 space-y-2 text-sm leading-relaxed">
              <div>
                <dt className="font-medium text-stone-900 dark:text-stone-100">Price</dt>
                <dd className="text-stone-600 dark:text-stone-300">{app.price}</dd>
              </div>
              <div>
                <dt className="font-medium text-stone-900 dark:text-stone-100">Platforms</dt>
                <dd className="text-stone-600 dark:text-stone-300">{app.platforms}</dd>
              </div>
              <div>
                <dt className="font-medium text-stone-900 dark:text-stone-100">Best for</dt>
                <dd className="text-stone-600 dark:text-stone-300">{app.bestFor}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What about Centriq?
          </h2>
          <p className="mt-2 leading-relaxed">
            Centriq, an appliance tracking app that older lists still include,
            is listed as discontinued in{" "}
            <a
              href="https://realestateledger.io/guides/home-maintenance-schedule-app"
              rel="noopener"
              className={linkClass}
            >
              Real Estate Ledger&apos;s June 2026 comparison
            </a>
            , so it is not on this list.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What should a home maintenance app do?
          </h2>
          <p className="mt-2 leading-relaxed">
            Remind you of the jobs that matter for your house and your
            climate, and keep a record of what was done and when. A
            schedule built for somewhere with snow does not fit a home near
            the coast. Our{" "}
            <Link
              href="/guides/orange-county-home-maintenance-checklist"
              className={linkClass}
            >
              Orange County home maintenance checklist
            </Link>{" "}
            shows what a local schedule looks like, month by month.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            OakTend side by side
          </h2>
          <p className="mt-2 leading-relaxed">
            Weighing OakTend against one app or service in particular? We
            compare it with{" "}
            <Link href="/guides/oaktend-vs-homezada" className={linkClass}>
              HomeZada
            </Link>
            ,{" "}
            <Link href="/guides/oaktend-vs-angi" className={linkClass}>
              Angi
            </Link>{" "}
            and{" "}
            <Link href="/guides/oaktend-vs-thumbtack" className={linkClass}>
              Thumbtack
            </Link>
            .
          </p>
        </section>
      </div>

      <GuideRelated path="/guides/best-home-maintenance-apps" />

      <GuideCta />
    </main>
  );
}

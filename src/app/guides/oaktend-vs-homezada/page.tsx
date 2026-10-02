import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";
import CompareTable, { TrademarkNote, type CompareRow } from "@/components/CompareTable";
import { isHomeownerPreview } from "@/lib/previewMode";

// OakTend vs HomeZada. One of three comparison pages (HomeZada, Angi,
// Thumbtack) built 2026-10-01 under the guardrails in
// OakTend-marketing/research-2026-10-01/comparison-pages-legal.md. The ones
// that matter when editing:
//  - HomeZada's name in plain text only: no logo, no brand color, nothing
//    that suggests HomeZada endorses or works with OakTend. The trademark
//    note at the foot stays.
//  - Every HomeZada fact comes from HomeZada's own site or its app store
//    listings, opened 2026-10-01, paraphrased (never copied) and listed in
//    GUIDE_SOURCES (src/lib/guideExtras.ts). Nothing about its quality,
//    ratings or reviews.
//  - OakTend's column is held to the same rule, against the code: the
//    landing page (src/app/home-maintenance-app/page.tsx) lists where each
//    feature lives. Preview copy follows src/lib/previewMode.ts like the rest
//    of the site.
//  - When a HomeZada price changes, update the row and the source together
//    and bump the date in src/lib/guides.ts.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Static, same as every other guide.
export const revalidate = 3600;

const TITLE = "OakTend vs HomeZada";
const DESCRIPTION =
  "Looking for a HomeZada alternative in Orange County? What each app does, what it costs and who it suits, from each company's own pages.";
const PATH = "/guides/oaktend-vs-homezada";
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

const linkClass =
  "text-bark-700 underline hover:no-underline dark:text-stone-300";

function rows(preview: boolean): CompareRow[] {
  return [
    {
      label: "Price",
      oaktend: preview ? (
        "Free during our preview, no card needed."
      ) : (
        <>
          Your first home is free. OakTend Plus is optional:{" "}
          <Link href="/pricing" className={linkClass}>
            see pricing
          </Link>
          .
        </>
      ),
      other: (
        <>
          Essentials is free. Premium is $99 a year or $15.95 a month. Deluxe
          is $189 a year. Prices as of October 1, 2026, from{" "}
          <a
            href="https://www.homezada.com/homeowners/pricing"
            rel="noopener"
            className={linkClass}
          >
            HomeZada&apos;s pricing page
          </a>
          .
        </>
      ),
    },
    {
      label: "Maintenance plan and reminders",
      oaktend: "Included. The plan is built from your home's age and systems.",
      other: "Home maintenance is part of Premium and Deluxe.",
    },
    {
      label: "Questions answered by AI",
      oaktend: "Ask OakTend answers from your home's own record, with a daily limit.",
      other: "Homeowner AI chats: 10 on Essentials, 100 on Premium, 250 on Deluxe.",
    },
    {
      label: "More than one home",
      oaktend: preview
        ? "Up to 5 homes during our preview."
        : "More homes are part of OakTend Plus.",
      other: "Deluxe covers up to 3 properties. Each one after that is $99 a year.",
    },
    {
      label: "Finding a pro",
      oaktend: preview
        ? "Not yet. Our pro network isn't open."
        : "Post a job and local pros can quote it.",
      other: "No. HomeZada says it is not a contractor marketplace.",
    },
    {
      label: "Platforms",
      oaktend: "Web, in a phone or computer browser.",
      other: "Web, plus apps for iPhone, iPad and Android.",
    },
  ];
}

export default function OakTendVsHomeZada() {
  const preview = isHomeownerPreview();

  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <GuideArticleJsonLd
        path="/guides/oaktend-vs-homezada"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "OakTend vs HomeZada" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "OakTend vs HomeZada", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        OakTend vs HomeZada
      </h1>
      <GuideMeta path="/guides/oaktend-vs-homezada" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        OakTend wrote this page and is one of the two apps on it. Every fact
        about HomeZada comes from HomeZada&apos;s own website or its app store
        listings, checked October 1, 2026 and linked under Sources. We have
        not tested HomeZada&apos;s paid plans.
      </p>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What each one is for
          </h2>
          <p className="mt-2 leading-relaxed">
            HomeZada describes itself as a home management platform for your
            home&apos;s inventory, maintenance, remodel projects and finances.
          </p>
          <p className="mt-2 leading-relaxed">
            OakTend is a maintenance app for homes in Orange County: a plan for
            your house, reminders, weather and recall alerts, and your records.
            The full list is on the{" "}
            <Link href="/home-maintenance-app" className={linkClass}>
              OakTend app page
            </Link>
            .
          </p>
        </section>
      </div>

      <CompareTable otherName="HomeZada" rows={rows(preview)} />

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When HomeZada is the better fit
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
            <li>Your home is outside Orange County. OakTend does not serve it.</li>
            <li>
              You want inventory, remodel projects and home finances in one
              place. Those are the core of HomeZada&apos;s plans.
            </li>
            <li>You want an app from the App Store or Google Play.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When OakTend may fit
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
            <li>
              Your home is in Orange County and you mainly want a maintenance
              plan and reminders
              {preview ? ", free during our preview" : ""}.
            </li>
            <li>
              You want advice written for the area. Our{" "}
              <Link
                href="/guides/orange-county-home-maintenance-checklist"
                className={linkClass}
              >
                Orange County maintenance checklist
              </Link>{" "}
              is a good place to start.
            </li>
          </ul>
          <p className="mt-3 leading-relaxed">
            Comparing more apps? See{" "}
            <Link href="/guides/best-home-maintenance-apps" className={linkClass}>
              the best home maintenance apps in 2026
            </Link>
            .
          </p>
        </section>
      </div>

      <TrademarkNote name="HomeZada" owner="HomeZada, Inc." />

      <GuideRelated path="/guides/oaktend-vs-homezada" />

      <GuideCta />
    </main>
  );
}

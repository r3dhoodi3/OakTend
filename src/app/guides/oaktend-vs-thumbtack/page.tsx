import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";
import CompareTable, { TrademarkNote, type CompareRow } from "@/components/CompareTable";
import { isHomeownerPreview } from "@/lib/previewMode";

// OakTend vs Thumbtack. Same guardrails as src/app/guides/oaktend-vs-homezada
// and src/app/guides/oaktend-vs-angi. Thumbtack facts come only from
// Thumbtack's own home page, its page for pros, its help center and press
// pages, and its app store listings, checked 2026-10-01, in our own words: Thumbtack's terms forbid copying its
// content onto a competing site, so nothing here quotes it. Re-check by
// opening the pages in a browser, not with a script (its terms bar automated
// access). The trademark credit follows Thumbtack's brand guidelines.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Static, same as every other guide.
export const revalidate = 3600;

const TITLE = "OakTend vs Thumbtack";
const DESCRIPTION =
  "Thumbtack helps you find and book a pro. OakTend is a maintenance app for Orange County homes. What each does and costs, from their own pages.";
const PATH = "/guides/oaktend-vs-thumbtack";
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
      label: "Main job",
      oaktend: "Plan and keep track of your home's upkeep.",
      other: "Compare prices and reviews, message local pros, and hire one.",
    },
    {
      label: "Hiring a pro",
      oaktend: preview
        ? "Not yet. Our pro network isn't open."
        : "Post a job and local pros can quote it.",
      other: "Yes. That is what it is for.",
    },
    {
      label: "Cost to homeowners",
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
      other: "Its home page calls its app free.",
    },
    {
      label: "What pros pay",
      oaktend: preview ? (
        "Nothing yet. Pros can join a waitlist until our pro network opens."
      ) : (
        <>
          Free to apply and quote, with a fee when hired:{" "}
          <Link href="/pros" className={linkClass}>
            see pro pricing
          </Link>
          .
        </>
      ),
      other:
        "Free to join, with no subscription. Pros pay for leads.",
    },
    {
      label: "Maintenance planning",
      oaktend: "A plan built from your home's age and systems, with reminders.",
      other: "Its app has a plan for your home with reminders and seasonal upkeep guides.",
    },
    {
      label: "Platforms",
      oaktend: "Web, in a phone or computer browser.",
      other: "Web, plus apps for iPhone and Android.",
    },
  ];
}

export default function OakTendVsThumbtack() {
  const preview = isHomeownerPreview();

  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <GuideArticleJsonLd
        path="/guides/oaktend-vs-thumbtack"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "OakTend vs Thumbtack" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "OakTend vs Thumbtack", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        OakTend vs Thumbtack
      </h1>
      <GuideMeta path="/guides/oaktend-vs-thumbtack" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        OakTend wrote this page and is one of the two services on it. Every
        fact about Thumbtack comes from Thumbtack&apos;s own website or its app
        store listings, checked October 1, 2026 and linked under Sources.
      </p>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What each one is for
          </h2>
          <p className="mt-2 leading-relaxed">
            Thumbtack is a marketplace for finding and booking local pros for
            repairs, upgrades and other projects.
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

      <CompareTable otherName="Thumbtack" rows={rows(preview)} />

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When Thumbtack is the better fit
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
            {preview ? <li>You need to hire someone now.</li> : null}
            <li>Your home is outside Orange County. OakTend does not serve it.</li>
            <li>You want an app from the App Store or Google Play.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When OakTend may fit
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
            <li>
              Your home is in Orange County and you want a plan built for
              local conditions, like Orange County weather and recalls on the
              appliances you add.
            </li>
            <li>
              You want your home&apos;s photos, documents and warranties in
              one place.
            </li>
          </ul>
          <p className="mt-3 leading-relaxed">
            The two don&apos;t rule each other out: you can keep your plan in
            OakTend and hire through Thumbtack. We also compare{" "}
            <Link href="/guides/oaktend-vs-angi" className={linkClass}>
              OakTend and Angi
            </Link>
            .
          </p>
        </section>
      </div>

      <TrademarkNote name="Thumbtack" owner="Thumbtack, Inc." />

      <GuideRelated path="/guides/oaktend-vs-thumbtack" />

      <GuideCta />
    </main>
  );
}

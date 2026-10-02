import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";
import CompareTable, { TrademarkNote, type CompareRow } from "@/components/CompareTable";
import { isHomeownerPreview } from "@/lib/previewMode";

// OakTend vs Angi. Same guardrails as src/app/guides/oaktend-vs-homezada,
// plus two of its own:
//  - Angi facts come only from Angi Inc.'s own Form 10-K for 2025 (filed with
//    the SEC) and Angi's own app store listings, opened 2026-10-01. angi.com
//    blocks automated reads, so nothing here rests on it. No ratings, review
//    counts, complaints or lawsuits, and nothing about the quality of Angi's
//    pros or service.
//  - The title is "OakTend vs Angi", not "Angi alternative": while OakTend's
//    pro network is closed, OakTend cannot do Angi's main job, and the page
//    says so first. Do not add a claim that OakTend costs pros less than Angi
//    without the lawyer (flag 2 in the research note).

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Static, same as every other guide.
export const revalidate = 3600;

const TITLE = "OakTend vs Angi";
const DESCRIPTION =
  "Angi helps you hire a home pro. OakTend is a maintenance app for Orange County homes. What each does and costs, from Angi's own filings.";
const PATH = "/guides/oaktend-vs-angi";
const CANONICAL = `${SITE_URL}${PATH}`;

const TEN_K =
  "https://www.sec.gov/Archives/edgar/data/1705110/000170511026000011/angi-20251231.htm";

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
      other: "Match you with a local pro and help you hire.",
    },
    {
      label: "Hiring a pro",
      oaktend: preview
        ? "Not yet. Our pro network isn't open."
        : "Post a job and local pros can quote it.",
      other:
        "Yes, in more than 500 service categories. Some services can be booked at a set price.",
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
      other:
        "Matching, booking and basic tools are free once you register. Angi also sells membership packages to consumers.",
    },
    {
      label: "How it makes money",
      oaktend: preview ? (
        "OakTend charges nothing during our preview."
      ) : (
        <>
          The optional OakTend Plus plan, and a fee pros pay when hired:{" "}
          <Link href="/pros" className={linkClass}>
            see pro pricing
          </Link>
          .
        </>
      ),
      other:
        "Fees pros pay for matches with homeowners in the US were 57% of Angi's 2025 revenue. It also earns from advertising and memberships.",
    },
    {
      label: "Maintenance planning",
      oaktend: "A plan built from your home's age and systems, with reminders.",
      other: "Its app lists home maintenance planner features.",
    },
    {
      label: "Platforms",
      oaktend: "Web, in a phone or computer browser.",
      other: "Web, plus apps for iPhone, iPad and Android.",
    },
    {
      label: "Where it works",
      oaktend: "Homes in Orange County, California only.",
      other: "A nationwide network of pros.",
    },
  ];
}

export default function OakTendVsAngi() {
  const preview = isHomeownerPreview();

  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <GuideArticleJsonLd
        path="/guides/oaktend-vs-angi"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "OakTend vs Angi" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "OakTend vs Angi", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        OakTend vs Angi
      </h1>
      <GuideMeta path="/guides/oaktend-vs-angi" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        OakTend wrote this page and is one of the two services on it. Every
        fact about Angi comes from{" "}
        <a href={TEN_K} rel="noopener" className={linkClass}>
          Angi Inc.&apos;s annual report for 2025
        </a>{" "}
        or Angi&apos;s app store listings, checked October 1, 2026 and linked
        under Sources.
      </p>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What each one is for
          </h2>
          <p className="mt-2 leading-relaxed">
            Angi connects homeowners with home pros, from repairs and
            remodeling to cleaning and landscaping.
          </p>
          <p className="mt-2 leading-relaxed">
            OakTend is a maintenance app for homes in Orange County: a plan for
            your house, reminders, weather and recall alerts, and your records.
            The full list is on the{" "}
            <Link href="/home-maintenance-app" className={linkClass}>
              OakTend app page
            </Link>
            .{" "}
            {preview
              ? "Our pro network isn't open yet, so OakTend can't help you hire someone today."
              : ""}
          </p>
        </section>
      </div>

      <CompareTable otherName="Angi" rows={rows(preview)} />

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When Angi is the better fit
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
            {preview ? <li>You need to hire someone now.</li> : null}
            <li>Your home is outside Orange County.</li>
            <li>You want an app from the App Store or Google Play.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When OakTend may fit
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
            <li>
              Your home is in Orange County and you want a plan that tells you
              what to do and when, before something breaks.
            </li>
            <li>
              You want your home&apos;s photos, documents and warranties in
              one place.
            </li>
          </ul>
          <p className="mt-3 leading-relaxed">
            The two don&apos;t rule each other out: you can keep your plan in
            OakTend and hire through Angi.
          </p>
        </section>
      </div>

      <TrademarkNote name="Angi" owner="Angi Inc." />

      <GuideRelated path="/guides/oaktend-vs-angi" />

      <GuideCta />
    </main>
  );
}

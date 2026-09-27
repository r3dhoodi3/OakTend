import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public consumer-protection guide (not a cost guide). Statutes are stated
// with their exact conditions:
//  - Down payment cap: Business and Professions Code 7159.5(a)(3), a down
//    payment may not exceed $1,000 or 10 percent of the contract price,
//    whichever is less. Confirmed against FindLaw's copy of BPC 7159.5,
//    current as of Jan 1, 2026.
//  - Written home improvement contract required when the aggregate price
//    exceeds $500 (BPC 7159).
//  - CSLB license threshold: $1,000 or more in combined labor and materials
//    requires a licensed contractor as of Jan 1, 2025 (AB 2622), with the
//    no-permit, no-employees, and no contract-splitting carve-outs.
// Re-read on leginfo 2026-09-26: 7159.5 (last amended by SB 601, 2024),
// 7159 (SB 517, 2026) and 7048 (AB 1170, 2026) still state the $1,000 / 10
// percent cap, the $500 written-contract line and the under-$1,000 exemption.
//
// This page OWNS the license and down payment rules. What a contract must
// list item by item lives on /guides/is-my-contractor-quote-fair, permits on
// /guides/permits-orange-county; link there rather than repeat them.
// No FAQPage JSON-LD since 2026-09-26: the old FAQ only repeated the sections,
// so the section headings are the questions now. Article and BreadcrumbList
// are the only structured data here.

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
const TITLE = "Contractor deposit limit in California";
const DESCRIPTION =
  "California caps a contractor's down payment at $1,000 or 10 percent, whichever is less. When a written contract and a license are required, with red flags.";
const CANONICAL = `${SITE_URL}/guides/contractor-deposit-rules-california`;

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

export default function ContractorDepositRulesGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/contractor-deposit-rules-california"
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
          { label: "How much can a contractor ask for up front in California?" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "How much can a contractor ask for up front in California?" , href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        How much can a contractor ask for up front in California?
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/contractor-deposit-rules-california" />

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          The short answer
        </p>
        <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-100">
          $1,000 or 10 percent, whichever is less
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          That is the most a contractor may take as a down payment on a
          California home improvement contract.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How the down payment cap works
          </h2>
          <p className="mt-2 leading-relaxed">
            The cap is in Business and Professions Code section 7159.5, and
            the required contract language prints it in bold type. It covers
            home improvement contracts, the repair and remodel work most
            homeowners hire for. Two examples:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              On a <strong>$25,000</strong>{" "}
              <Link href="/guides/kitchen-remodel-cost" className={linkClass}>
                kitchen remodel
              </Link>
              , 10 percent would be $2,500, so the cap is the smaller number:{" "}
              <strong>$1,000</strong>.
            </li>
            <li>
              On a <strong>$6,000</strong> job, 10 percent is $600, which is
              less than $1,000, so the cap is <strong>$600</strong>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What about payments after the deposit?
          </h2>
          <p className="mt-2 leading-relaxed">
            They follow the work. Apart from the down payment, the law says a
            contractor may not collect payment for work not yet completed or
            materials not yet delivered. Tie each payment to progress you can
            see, and hold the last one until the job is done: that money is
            your leverage to get problems fixed.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When is a written contract required?
          </h2>
          <p className="mt-2 leading-relaxed">
            When the job is over <strong>$500</strong> in combined labor and
            materials, it needs a written contract, signed before work
            begins. Put later changes to the work in writing too. What the
            contract has to say, item by item, is in our guide to{" "}
            <Link href="/guides/is-my-contractor-quote-fair" className={linkClass}>
              reading a contractor&apos;s quote
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When does a contractor need a license?
          </h2>
          <p className="mt-2 leading-relaxed">
            Since January 1, 2025, for any job where combined labor and
            materials come to <strong>$1,000 or more</strong>. Assembly Bill
            2622 raised the old $500 threshold. Below $1,000, an unlicensed
            person can do the work only if all of these are true:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>The work needs no building permit of any kind.</li>
            <li>They hire no employees or helpers to do it.</li>
            <li>
              The job is not split into smaller pieces to stay under the limit.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            An unlicensed person who advertises for work has to say they are
            not licensed.
          </p>
          <p className="mt-2 leading-relaxed">
            The permit condition matters most. The Contractors State License
            Board says anyone who contracts for a job that requires a building
            permit must hold a valid license, whatever the price, so the
            small-job exemption never covers permitted work. Orange County
            cities each set their own permit rules; our{" "}
            <Link href="/guides/permits-orange-county" className={linkClass}>
              Orange County permit guide
            </Link>{" "}
            shows how they differ. Check any license at cslb.ca.gov before
            you hire.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Do these rules apply in every Orange County city?
          </h2>
          <p className="mt-2 leading-relaxed">
            Yes. They are state law, so they apply the same way in every city
            and in the unincorporated areas. See our city pages for{" "}
            <Link
              href="/oc/santa-ana"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Santa Ana
            </Link>
            ,{" "}
            <Link
              href="/oc/garden-grove"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Garden Grove
            </Link>
            ,{" "}
            <Link
              href="/oc/fullerton"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Fullerton
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
              href="/oc/dana-point"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Dana Point
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
            What are the red flags?
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Pressure to pay a large deposit</strong> above the legal
              cap, or most of the job before work starts.
            </li>
            <li>
              <strong>A push to pay in cash</strong>, which leaves you without a
              clear record.
            </li>
            <li>
              <strong>No written contract</strong> on a job over $500, or a rush
              to start before anything is signed.
            </li>
            <li>
              <strong>No license number</strong>, or reluctance to give one you
              can look up.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            None of these proves bad intent on its own, but each is a reason to
            slow down. You are free to walk away
            and hire someone else.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            If a dispute comes up, the signed contract, change orders, payment
            receipts and messages settle it. OakTend keeps your messages about
            a job in one record you can look back on.
          </p>
          <Link
            href="/homeowner-signup"
            className="btn-primary mt-3 px-5 py-2"
          >
            Keep your project record in one place
          </Link>
        </div>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            Statutes checked September 2026. General information, not legal
            advice: confirm the current rules with the Contractors State
            License Board or an attorney.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/contractor-deposit-rules-california" />

      <GuideCta
        signedInHref="/contractors"
        signedInLabel="Track this in OakTend"
      />
    </main>
  );
}

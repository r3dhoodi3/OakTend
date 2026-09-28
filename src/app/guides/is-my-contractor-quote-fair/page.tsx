import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide. General, honest guidance on reading a contractor's
// quote; no invented prices. Links to /quote-check (OakTend's AI Quote
// Analyzer, gated behind sign-in / OakTend Plus, see src/app/(app)/quote-check)
// as the natural next step once someone has an actual quote in hand.
//
// This page OWNS reading an estimate, including what section 7159 says the
// contract must list. License and down payment rules belong to
// /guides/contractor-deposit-rules-california: one clause and a link here.
// No FAQPage JSON-LD since 2026-09-26: every old FAQ answer repeated a
// section, so the section headings are the questions now.

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
const TITLE = "Is my contractor's quote fair?";
const DESCRIPTION =
  "How to read a contractor's quote in Orange County: what an itemized bid should show, red flags, the California contract rules, and how to compare bids.";
const CANONICAL = `${SITE_URL}/guides/is-my-contractor-quote-fair`;

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

export default function IsMyContractorQuoteFairGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/is-my-contractor-quote-fair"
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
          { label: "Is my contractor's quote fair? An Orange County guide" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Is my contractor's quote fair? An Orange County guide", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Is my contractor&apos;s quote fair? An Orange County guide
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/is-my-contractor-quote-fair" />

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What should a fair quote include?
          </h2>
          <p className="mt-2 leading-relaxed">
            Start with whether it&apos;s itemized. A fair quote breaks out
            materials from labor rather than handing you one total. It says
            whether permits are in the price and, if the job needs one,
            whether the contractor is pulling it. It describes the work in
            specific terms, not &quot;repair as needed,&quot; gives a start date
            and a completion window, and ties payments to stages of finished
            work.
          </p>
          <p className="mt-2 leading-relaxed">
            Some jobs have their own lines to check: a window quote should
            list each window&apos;s U-factor and SHGC (see our{" "}
            <Link href="/guides/window-replacement-cost-orange-county" className={linkClass}>
              window replacement guide
            </Link>
            ), and a sewer repair bid should point to where on the camera
            video the work is needed (see our{" "}
            <Link href="/guides/sewer-line-orange-county" className={linkClass}>
              sewer line guide
            </Link>
            ).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What does California law require in the contract?
          </h2>
          <p className="mt-2 leading-relaxed">
            Under Business and Professions Code section 7159, a home
            improvement contract over $500 has to be in writing and include
            the contractor&apos;s name, business address and license number,
            the approximate start and completion dates, and a schedule of
            progress payments. Apart from a down payment, which section
            7159.5 caps at $1,000 or 10 percent of the price, whichever is
            less, a contractor may not collect payment for work not yet done
            or materials not yet delivered. These are state rules, so they
            apply in every Orange County city. When a license is required and
            how the cap works are in our{" "}
            <Link href="/guides/contractor-deposit-rules-california" className={linkClass}>
              deposit rules guide
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What are the red flags?
          </h2>
          <p className="mt-2 leading-relaxed">
            Watch for pressure to sign the same day, a demand for full payment
            before work begins, and no license number, business address or
            proof of insurance. Also watch for line items that lump everything into one
            number, and a price far below every other bid with no clear reason,
            which often means materials, permits or scope get cut later.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How should I compare bids?
          </h2>
          <p className="mt-2 leading-relaxed">
            For anything beyond a small repair, get more than one quote.
            Compare the itemized lines, not just the totals, and check the
            license at cslb.ca.gov and the insurance yourself before you
            compare prices. Permit rules and fees are set by each city, so a
            quote that says permits are included should say which city&apos;s;
            our{" "}
            <Link href="/guides/permits-orange-county" className={linkClass}>
              Orange County permit guide
            </Link>{" "}
            explains how they differ. City pages:{" "}
            <Link
              href="/oc/anaheim"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Anaheim
            </Link>
            ,{" "}
            <Link
              href="/oc/irvine"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Irvine
            </Link>
            ,{" "}
            <Link
              href="/huntington-beach"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Huntington Beach
            </Link>
            ,{" "}
            <Link
              href="/oc/orange"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Orange
            </Link>
            ,{" "}
            <Link
              href="/oc/mission-viejo"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Mission Viejo
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
            Can OakTend tell me if my quote is fair?
          </h2>
          <p className="mt-2 leading-relaxed">
            OakTend&apos;s{" "}
            <Link
              href="/quote-check"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Quote analyzer
            </Link>{" "}
            reads a quote you upload or paste in, compares the total and each
            line item to typical costs, flags anything that looks padded,
            vague, or duplicated, and drafts a message you can send back if
            you want to negotiate.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/is-my-contractor-quote-fair" />

      <GuideCta
        signedInHref="/quote-check"
        signedInLabel="Check your quote"
      />
    </main>
  );
}

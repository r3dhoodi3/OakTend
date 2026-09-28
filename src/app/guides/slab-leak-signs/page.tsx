import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide, written for the Fountain Valley / Huntington Beach launch
// market: 1960s-70s tract homes on slab foundations with copper supply lines
// run through the slab, which is exactly the construction pattern that makes
// slab leaks common there. No local prices are quoted; costs vary too much
// by leak location and access to state a number honestly.

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
const TITLE = "Slab leak signs in Orange County homes";
const DESCRIPTION =
  "Slab leak signs in Orange County homes: a warm spot on the floor, a rising water bill, running water sounds, the two-hour meter test and when to act.";
const CANONICAL = `${SITE_URL}/guides/slab-leak-signs`;

const linkClass =
  "text-bark-700 underline hover:no-underline dark:text-stone-300";

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

// One FAQ only: the other questions this block used to carry repeated the
// body sections word for word. Repair options and cost drivers live on
// /guides/slab-leak-repair-orange-county.
const FAQS = [
  {
    q: "How much does a slab leak repair cost?",
    a: "It depends on where the leak is, how it has to be reached and whether you choose a spot repair, a reroute or a repipe. We found no reliable published price for Orange County, so we don't quote one: a licensed plumber can once the leak is located.",
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

export default function SlabLeakSignsGuide() {
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
        path="/guides/slab-leak-signs"
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
          { label: "Slab leak signs in Orange County homes: spot one early" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Slab leak signs in Orange County homes: spot one early", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Slab leak signs in Orange County homes: spot one early
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/slab-leak-signs" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        General information, not plumbing advice.
      </p>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What to look for
          </h2>
          <p className="mt-2 leading-relaxed">
            A slab leak is a leak in a water line running underneath your
            home&apos;s concrete foundation. Because the pipe is hidden, the signs
            tend to show up somewhere else first: a spot on the floor that&apos;s
            noticeably warm (usually a hot water line), a water bill that
            climbs without a clear explanation, or the sound of running water
            when every faucet, toilet, and appliance in the house is off. As
            a leak progresses, you may also notice damp or discolored carpet
            and flooring, a musty smell in one area, low water pressure, or
            cracks in the flooring or slab.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            In Orange County
          </h2>
          <p className="mt-2 leading-relaxed">
            Age is why this guide exists. The Census Bureau&apos;s 2024
            American Community Survey puts about 12 percent of Orange
            County&apos;s homes in the 1950s, 19 percent in the 1960s and 22
            percent in the 1970s. Our guide to{" "}
            <Link href="/guides/orange-county-home-age" className={linkClass}>
              Orange County home age by city
            </Link>{" "}
            gives each city&apos;s median year built. In the tract homes of those decades, from
            Fountain Valley and Huntington Beach to Garden Grove, Anaheim and
            Santa Ana, copper water lines were commonly run under or through
            the concrete slab rather than through walls or an attic.
          </p>
          <p className="mt-2 leading-relaxed">
            InterNACHI&apos;s life expectancy chart gives copper water lines
            50 to 70 years, so original pipe from the 1960s is now inside that
            window. Decades of contact with concrete and soil, along with the
            normal expansion and contraction of a hot water line, make pinhole
            leaks more likely than in homes with more accessible plumbing.
          </p>
          <p className="mt-2 leading-relaxed">
            Our city pages are a starting point:{" "}
            <Link
              href="/fountain-valley"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Fountain Valley
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
              href="/oc/garden-grove"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Garden Grove
            </Link>
            ,{" "}
            <Link
              href="/oc/westminster"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Westminster
            </Link>
            ,{" "}
            <Link
              href="/oc/cypress"
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              Cypress
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
            Check your water meter
          </h2>
          <p className="mt-2 leading-relaxed">
            You can test for a hidden leak before calling anyone. The
            EPA&apos;s WaterSense program suggests reading your water meter,
            using no water at all for two hours, and reading it again. If the
            number changed, you probably have a leak somewhere. Turn off the
            ice maker and irrigation timer first so they do not fool you.
            WaterSense also says that if a family of four uses more than
            12,000 gallons in a winter month, there could be a serious leak.
            The test does not tell you where the leak is; a plumber still has
            to locate it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What are the repair options?
          </h2>
          <p className="mt-2 leading-relaxed">
            The three options are a spot repair, a reroute through the attic
            or walls, or a
            whole-house repipe. Our{" "}
            <Link href="/guides/slab-leak-repair-orange-county" className={linkClass}>
              slab leak repair guide
            </Link>{" "}
            compares the three and covers permits, and the{" "}
            <Link href="/guides/repipe-orange-county" className={linkClass}>
              repipe guide
            </Link>{" "}
            covers copper versus PEX.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            When it&apos;s an emergency
          </h2>
          <p className="mt-2 leading-relaxed">
            Active water pooling, water coming up through the flooring, or a
            leak you can&apos;t stop by closing the main shutoff valve are all
            reasons to call a plumber right away. A slow leak, where the only
            signs are a warm spot and a rising water bill, is worth fixing
            soon, since it can damage flooring and drive up water costs, but
            it usually doesn&apos;t need a same-hour response.
          </p>
        </section>

        {FAQS.map((f) => (
          <section key={f.q}>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              {f.q}
            </h2>
            <p className="mt-2 leading-relaxed">{f.a}</p>
          </section>
        ))}
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/slab-leak-signs" />

      <GuideCta />
    </main>
  );
}

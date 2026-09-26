import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide. The only price on the page is HomeAdvisor's national cost
// guide (updated June 17, 2026), labeled as a national figure from a lead
// service, never as an Orange County price. Cost vs. Value is NOT used: the
// site is already at its five-project limit (see GUIDE_SOURCES in
// src/lib/guideExtras.ts).
// Sourced facts (opened 2026-09-26, links in GUIDE_SOURCES): the Energy
// Commission's 2025 compliance manual, chapter 9 (replacement windows are an
// alteration; U-factor 0.30 in zones 6 to 10 and 15, SHGC 0.23 in zones 2, 4
// and 6 to 15; the 75 square foot exception; caulking per 110.7; the wildfire
// code exception), the Energy Commission's climate zone list (checked
// 2026-09-25), the 2025 Energy Code start date, Garden Grove, Santa Ana and
// Fountain Valley permit pages that name windows, Health and Safety Code
// 13113.7 and the EPA lead renovation rule.
//
// No FAQPage or HowTo JSON-LD on purpose. Article and BreadcrumbList only.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker), same as every other guide: nothing here reads
// cookies(), headers(), searchParams or the database.
export const revalidate = 3600;

// "Window replacement cost in Orange County | OakTend" is 50 characters.
const TITLE = "Window replacement cost in Orange County";
const DESCRIPTION =
  "What changes the price of new windows in Orange County, the 2025 California Energy Code numbers a replacement window has to meet, permits, HOA review and salt air.";
const PATH = "/guides/window-replacement-cost-orange-county";
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

const LINK =
  "text-bark-700 underline hover:no-underline dark:text-stone-300";

export default function WindowReplacementCostGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <GuideArticleJsonLd
        path="/guides/window-replacement-cost-orange-county"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Window replacement cost" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Window replacement cost", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Window replacement cost in Orange County
      </h1>
      <GuideMeta path="/guides/window-replacement-cost-orange-county" />

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          National figure, not an Orange County price
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          $300 to $2,100 per window, $850 on average
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          From HomeAdvisor&apos;s window replacement cost guide, updated June
          17, 2026. HomeAdvisor is a contractor lead service; it builds the
          figure from surveys of its own customers across the country.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What changes the price?
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Retrofit or full-frame.</strong> A retrofit window slides
              into the existing frame and keeps the trim. Full-frame removes
              the whole window, which means trim work but lets the installer
              find and fix water damage or change the style. HomeAdvisor puts
              labor at $100 to $300 per window for retrofit and $150 to $800
              for full-frame. Retrofit only works if the old frame is sound.
            </li>
            <li>
              <strong>Frame material, size and brand.</strong> Vinyl,
              aluminum, wood and fiberglass are priced differently, and so
              are brands within each.
            </li>
            <li>
              <strong>House age.</strong> Pulling old frames disturbs paint.
              In a home built before 1978, the EPA requires anyone paid to do
              that to be certified in lead-safe work practices. Ask for the
              certificate.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What the 2025 Energy Code requires
          </h2>
          <p className="mt-2 leading-relaxed">
            Replacing windows is an alteration under California&apos;s Energy
            Code, and the 2025 edition applies to permits applied for on or
            after January 1, 2026. Coastal ZIP codes such as Huntington Beach
            and Newport Beach are in climate zone 6; inland ones such as
            Irvine, Santa Ana and Anaheim are in zone 8. The window rule is
            the same in both.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>U-factor 0.30 or lower.</strong> How much heat passes
              through the whole window. Lower is better.
            </li>
            <li>
              <strong>Solar heat gain coefficient (SHGC) 0.23 or lower.</strong>{" "}
              How much of the sun&apos;s heat gets in.
            </li>
            <li>
              <strong>Small jobs get more room.</strong> Up to 75 square feet
              of replacement windows can meet a U-factor of 0.40 and an SHGC
              of 0.35 instead, which helps when only a few windows change.
            </li>
            <li>
              <strong>Sealing.</strong> New windows must be caulked and sealed
              around the frame.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            Those are the prescriptive numbers. A designer can instead show
            the whole house complies with the performance method, which lets
            some windows miss them. Either way, ask that the quote list each
            window&apos;s U-factor and SHGC. In a Fire Hazard Severity Zone,
            windows also have to meet the state&apos;s wildland-urban
            interface building code; our{" "}
            <Link href="/guides/santa-ana-wind-wildfire-home-prep" className={LINK}>
              wildfire prep guide
            </Link>{" "}
            covers what the zones mean for a home.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Do replacement windows need a permit?
          </h2>
          <p className="mt-2 leading-relaxed">
            In the cities we checked, yes. Garden Grove lists installing or
            replacing windows as work that needs a permit. Santa Ana puts
            window retrofits on its same-day express permit list. Fountain
            Valley expedites window and door replacement permits and asks for
            its Window Replacement Worksheet and a floor plan. A permit on a
            job over $1,000 also means the home needs approved smoke alarms
            before final sign-off, under Health and Safety Code section
            13113.7. Our{" "}
            <Link href="/guides/permits-orange-county" className={LINK}>
              Orange County permit guide
            </Link>{" "}
            covers how cities differ.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            HOA review and salt air
          </h2>
          <p className="mt-2 leading-relaxed">
            In an HOA, new windows change how the house looks from the
            street, so expect architectural review before the order goes in.
            Our{" "}
            <Link href="/guides/hoa-coastal-commission-remodel-orange-county" className={LINK}>
              HOA and coastal remodel guide
            </Link>{" "}
            covers that process. FEMA says salt spray speeds up metal
            corrosion most within 300 to 3,000 feet of the shoreline, so near
            the beach ask what the maker says about its frames and hardware in
            coastal exposure.
          </p>
          <p className="mt-2 leading-relaxed">
            For comparing bids and deposits, see{" "}
            <Link href="/guides/is-my-contractor-quote-fair" className={LINK}>
              reading a contractor&apos;s quote
            </Link>{" "}
            and{" "}
            <Link href="/guides/contractor-deposit-rules-california" className={LINK}>
              California&apos;s deposit rules
            </Link>
            .
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps the quote, the window specs, the permit and the
            warranty in your home&apos;s record, so you have them when you
            sell.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Keep your home&apos;s repair record, free
          </Link>
        </div>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            As of September 2026. Your building division decides what your
            permit needs. This is general information, not construction or
            legal advice.
          </p>
        </section>
      </div>

      <GuideRelated path="/guides/window-replacement-cost-orange-county" />

      <GuideCta />
    </main>
  );
}

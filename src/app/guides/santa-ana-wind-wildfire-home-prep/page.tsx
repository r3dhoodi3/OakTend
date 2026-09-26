import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide. This page defers to the fire authority on purpose: every
// instruction is attributed to the Orange County Fire Authority (OCFA), state
// law, the National Weather Service or Southern California Edison, and the
// reader is sent to OCFA for an assessment of their own home.
//
// ZONE 0 STATUS, re-checked 2026-09-25. Public Resources Code 4291 and
// Government Code 51182 (both read on leginfo) require an ember-resistant zone
// within 5 feet "based on regulations promulgated by the board", and PRC
// 4291(g) says the requirement takes effect for new structures once the Board
// of Forestry updates its regulations and guidance, and for existing
// structures three years after that. The Board adopted emergency Zone 0
// regulations on 2026-08-19 and submitted them to the Office of
// Administrative Law (OAL) on 2026-08-28; OAL's comment period closed
// 2026-09-02 (BBK client alert dated 2026-09-09, republished by PublicCEO
// 2026-09-15). OAL's own emergency regulations page lists that filing,
// 2026-0828-03E, as "Withdrawn, September 8, 2026", and on 2026-09-25 it was
// not on OAL's list of emergency regulations under review. Neither BBK nor
// PublicCEO mentions the withdrawal, and OAL gives no reason, so the page
// states no reason and no date for a resubmission. The applicability and
// timing on the page describe the version the Board adopted, and the page
// says it may change. The Board of Forestry website still returned 403 to us.
// Re-check OAL before relying on any of it.
//
// Other sources (opened 2026-09-21, links in GUIDE_SOURCES,
// src/lib/guideExtras.ts): OCFA Ready, Set, Go! pages and flyers (home
// hardening, vents, fences, garages, Immediate Zone flyer dated 12/2025, red
// flag warning, vegetation management, home assessment, defensible space
// disclosure, member cities), NWS glossary, SCE PSPS page.
//
// No FAQPage or HowTo JSON-LD on purpose: the questions are visible headings
// only. Article and BreadcrumbList are the only structured data here.

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
const TITLE = "Santa Ana wind and wildfire home prep in Orange County";
const DESCRIPTION =
  "How to get an Orange County home ready for Santa Ana winds and wildfire season: defensible space, the first 5 feet, vents, gutters, fences and alerts.";
const CANONICAL = `${SITE_URL}/guides/santa-ana-wind-wildfire-home-prep`;

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

export default function SantaAnaWindWildfireHomePrepGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/santa-ana-wind-wildfire-home-prep"
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
          { label: "Santa Ana wind and wildfire home prep" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Santa Ana wind and wildfire home prep", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Santa Ana wind and wildfire home prep in Orange County
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/santa-ana-wind-wildfire-home-prep" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Written for Orange County homeowners, especially near canyons,
        hillsides and open space. Instructions here come from the Orange
        County Fire Authority and state law. General information, not safety
        advice for your property: your fire department has the final word.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          The short answer
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          Plan for embers, not just flames
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          The work that matters is small and close in: a clean roof and
          gutters, screened vents, nothing that burns in the first 5 feet,
          and a fence that cannot carry fire to the wall. Do it before the
          wind arrives, because on a red flag day it is too late to start.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What are Santa Ana winds and why do they matter for my house?
          </h2>
          <p className="mt-2 leading-relaxed">
            The National Weather Service defines a Santa Ana wind as a
            Southern California weather condition in which strong, hot,
            dust-bearing winds descend to the Pacific Coast from inland
            desert regions. They come off the desert dry, and they reach the
            whole county, not only the hills.
          </p>
          <p className="mt-2 leading-relaxed">
            For a house, that means two problems. The first is plain wind
            damage: loose roof tiles, tired fences and tree limbs. The second
            is fire. The Orange County Fire Authority (OCFA) warns that
            flying embers destroy homes miles from wildland areas, and that
            embers find the weak link in a home&apos;s protection.
          </p>
          <p className="mt-2 leading-relaxed">
            The warning to watch for is a Red Flag Warning, which the Weather
            Service issues when conditions may result in extreme burning
            conditions. OCFA lists the conditions behind one: sustained
            winds of 15 mph or greater, relative humidity of 25 percent or
            less, and temperatures above 75 degrees.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What defensible space does the law require?
          </h2>
          <p className="mt-2 leading-relaxed">
            California law requires 100 feet of defensible space around a
            structure, or to the property line if that is closer. Public
            Resources Code section 4291 applies it in state responsibility
            areas, and Government Code section 51182 applies it to homes in
            a very high fire hazard severity zone designated by a city or
            county. Both say the clearing should be more intense between 5
            and 30 feet from the house. Section 51182 also requires keeping
            the roof free of leaves and needles, removing tree limbs within
            10 feet of a chimney outlet, and keeping plants next to the
            building free of dead wood.
          </p>
          <p className="mt-2 leading-relaxed">
            On most Orange County lots the property line is closer than 100
            feet, so your share is your own yard. OCFA publishes plant
            spacing guidance, a list of flammable plants to remove, and a
            fire-resistive planting guide.
          </p>
          <p className="mt-2 leading-relaxed">
            If you sell, this becomes paperwork. OCFA explains that Civil
            Code section 1102.19 requires the seller of a home in a high or
            very high fire hazard severity zone to give the buyer
            documentation of defensible space compliance, or a written
            agreement that the buyer will obtain it within one year of
            closing. OCFA does those inspections in the 23 cities it serves
            and in unincorporated areas. Cities with their own fire
            departments, such as Anaheim, Huntington Beach, Laguna Beach,
            Newport Beach and Orange, handle their own.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What is Zone 0, and is it required yet?
          </h2>
          <p className="mt-2 leading-relaxed">
            Zone 0 is the first 5 feet around the house, which the law calls
            the ember-resistant zone and OCFA calls the Immediate Zone. OCFA
            describes it as the most important zone for reducing home
            ignition from flying embers.
          </p>
          <p className="mt-2 leading-relaxed">
            Not yet. Both statutes above say an ember-resistant zone is
            required within 5 feet of the structure, based on regulations
            written by the State Board of Forestry and Fire Protection. The
            Board adopted emergency Zone 0 regulations on August 19, 2026 and
            sent them to the state Office of Administrative Law on August 28.
            The public comment period there closed on September 2. The Office
            of Administrative Law then listed the filing as withdrawn on
            September 8, 2026, and as of September 25 it was not back under
            review. The Board can file it again, so the rule is not in effect
            and has no effective date yet.
          </p>
          <p className="mt-2 leading-relaxed">
            The version the Board adopted would apply to buildings throughout
            state responsibility areas, and in areas where a city or the
            county is responsible for fire protection, only to occupied
            structures in a very high fire hazard severity zone. For new
            structures it would wait until the Board posts updated guidance
            on managing fuels, which the Board has up to a year to do.
            Existing structures would get three years after the date set for
            new structures, which matches what Section 4291 says. The Board
            may change any of this before it files again, so check with your
            fire department before you plan around a deadline.
          </p>
          <p className="mt-2 leading-relaxed">
            You do not need a deadline to do the work. OCFA&apos;s Immediate Zone
            flyer from 2025 recommends:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              Hard surfaces such as gravel, pavers and concrete next to the
              house, and no combustible bark or mulch.
            </li>
            <li>
              Removing dead plants, leaves and debris, including from roofs,
              gutters, decks and stairways.
            </li>
            <li>
              Keeping plants in this strip low growing (under 2 feet),
              nonwoody and well watered.
            </li>
            <li>
              Moving firewood and lumber 30 feet from buildings, and
              considering a new spot for trash bins, vehicles and RVs.
            </li>
            <li>
              Replacing combustible fencing, gates and arbors attached to the
              home with noncombustible ones.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Which parts of the house should I harden first?
          </h2>
          <p className="mt-2 leading-relaxed">
            OCFA&apos;s home hardening pages go part by part. These are the ones
            a homeowner can act on without a remodel:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Vents.</strong> OCFA says most homes are built with
              1/4-inch vent screens, which let burning embers through. It
              recommends covering vents with 1/8-inch noncombustible,
              corrosion-resistant metal mesh, or replacing them with
              ember-resistant baffle vents. It notes that finer 1/16-inch
              mesh clogs easily with dust and paint.
            </li>
            <li>
              <strong>Rain gutters.</strong> Embers ignite the leaves and
              needles that collect in them. Clean them before wind season,
              not after the first rain.
            </li>
            <li>
              <strong>Fences.</strong> A wood fence attached to the house can
              lead fire right to it. OCFA suggests a noncombustible gate or
              section between a combustible fence and the home, keeping the
              fence line clear of dead plants, never stacking firewood
              against it, and checking with your building department before
              building a new one.
            </li>
            <li>
              <strong>Garage.</strong> Gaps around the door let embers in.
              OCFA recommends weather-stripping around and under it.
            </li>
            <li>
              <strong>Roof.</strong> OCFA calls the roof the most vulnerable
              part of the home, and its home assessment lists tile, asphalt
              and metal as noncombustible roof materials. If that is what you
              have, the job is maintenance: replace slipped or broken tiles
              and keep valleys clean. Our{" "}
              <Link href="/guides/roof-replacement-cost" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
                roof replacement guide
              </Link>{" "}
              covers the bigger decision.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            OCFA offers an online home assessment, and you can request an
            in-person one from a fire prevention specialist at (714)
            573-6774.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps a yearly reminder for gutters, vents and the first
            5 feet on your home&apos;s maintenance plan, and keeps the photos and
            receipts in your home&apos;s record in case your insurer asks.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Put wind season on your home&apos;s calendar, free
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What should I do before a wind event, and on a red flag day?
          </h2>
          <p className="mt-2 leading-relaxed">
            A day or two ahead, walk the outside of the house. Bring in or
            tie down umbrellas and cushions, look for loose tiles, leaning
            fence sections and dead limbs over the roof, and clear the
            gutters and the base of the fence.
          </p>
          <p className="mt-2 leading-relaxed">
            On the day, follow OCFA&apos;s red flag guidance: do any yard work
            that needs a motor before 10 a.m. and never when the wind is
            blowing, use lawn mowers on lawns only, and never park on dry
            grass. Expect that the power may go out on purpose. Southern
            California Edison explains that in a Public Safety Power Shutoff
            it temporarily shuts off power to reduce the risk of its
            equipment causing a fire, and that anyone can sign up for alerts
            for a specific address.
          </p>
          <p className="mt-2 leading-relaxed">
            OCFA&apos;s evacuation advice: leaving early is the safest choice,
            and a supply kit should cover each person for at least 3 days.
            Sign up for AlertOC, the
            county&apos;s emergency notification system, which OCFA lists among
            its wildfire resources. Our{" "}
            <Link href="/guides/orange-county-home-maintenance-checklist" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              Orange County maintenance checklist
            </Link>{" "}
            shows where wind prep sits in the year.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Does this affect my insurance?
          </h2>
          <p className="mt-2 leading-relaxed">
            It can. OCFA says insurance companies are mandating home
            hardening and vegetation management for coverage, and that an
            insurer&apos;s requirements may be stricter than OCFA&apos;s. OCFA does not
            do insurance inspections. Ask your insurer which steps it
            recognizes and what proof it wants, and keep dated photos and
            receipts of the work.
          </p>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            City pages for some of the county&apos;s foothill, canyon and coastal
            hillside communities:{" "}
            <Link href="/oc/yorba-linda" className="text-bark-700 hover:underline dark:text-stone-300">Yorba Linda</Link>,{" "}
            <Link href="/oc/lake-forest" className="text-bark-700 hover:underline dark:text-stone-300">Lake Forest</Link>,{" "}
            <Link href="/oc/rancho-santa-margarita" className="text-bark-700 hover:underline dark:text-stone-300">
              Rancho Santa Margarita
            </Link>
            , <Link href="/oc/laguna-beach" className="text-bark-700 hover:underline dark:text-stone-300">Laguna Beach</Link>,{" "}
            <Link href="/oc/san-clemente" className="text-bark-700 hover:underline dark:text-stone-300">San Clemente</Link> and{" "}
            <Link href="/oc/anaheim" className="text-bark-700 hover:underline dark:text-stone-300">Anaheim</Link>, or every city on the{" "}
            <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">Orange County hub</Link>.
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            As of September 25, 2026. Wildfire rules are changing, and OCFA
            itself notes that new state requirements may be enacted at any
            time. The state Zone 0 regulation was withdrawn from review on
            September 8, 2026 and could be filed again at any time. This is
            general information, not legal, insurance or
            safety advice. In an emergency follow the instructions of fire
            and law enforcement officials, and call 911.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/santa-ana-wind-wildfire-home-prep" />

      <GuideCta />
    </main>
  );
}

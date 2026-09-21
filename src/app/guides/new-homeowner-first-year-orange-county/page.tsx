import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide for new Orange County homeowners. Hard facts and where each
// was read (all opened 2026-09-21, links in GUIDE_SOURCES, src/lib/guideExtras.ts):
//  - Water heater strapping and the seller's written certification: Health and
//    Safety Code 19211.
//  - Smoke alarm at sale: HSC 13113.8. Carbon monoxide devices: HSC 17926.
//  - Gas: SoCalGas pages on shutting off the meter and on earthquake valves.
//    We found NO statewide or Orange County rule requiring an earthquake gas
//    shutoff valve on a single-family home, and the page says "we did not
//    find", not "there is none".
//  - Property tax dates, supplemental bills, Mello-Roos: OC Treasurer-Tax
//    Collector. Homeowners' Exemption: OC Assessor.
//  - HOA: Civil Code 4525 and 4775. Digging: Government Code 4216.2.
// Nothing here is tax or legal advice and the page says so.
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
const TITLE = "New homeowner checklist for Orange County: first year";
const DESCRIPTION =
  "What to do in your first week, month and year in an Orange County home: shutoffs, water heater, alarms, tax bills, Mello-Roos, HOA papers and permits.";
const CANONICAL = `${SITE_URL}/guides/new-homeowner-first-year-orange-county`;

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

export default function NewHomeownerFirstYearOrangeCountyGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/new-homeowner-first-year-orange-county"
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
          { label: "New homeowner checklist for Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "New homeowner checklist for Orange County" },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        New homeowner checklist for Orange County: first year
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/new-homeowner-first-year-orange-county" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Written for people who just bought a home in Orange County. Rules and
        dates were read from state law, County of Orange and utility pages in
        September 2026. General information, not legal, tax or safety advice.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          The short answer
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          Learn the shutoffs first, then the paperwork
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          Week one is about safety: water, gas, power, alarms and the water
          heater. Month one is paperwork with real deadlines: a supplemental
          tax bill, the Homeowners&apos; Exemption, HOA documents and permit
          history. After that it is one task per season.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What should I do in the first week?
          </h2>
          <p className="mt-2 leading-relaxed">
            Find the three shutoffs while nothing is wrong, and show everyone
            in the house.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Water.</strong> Most homes have a house valve where the
              water line enters, often at the front hose bib. Irvine Ranch
              Water District describes it as the valve that typically
              controls the entire water supply to your house, and a second
              customer valve sits in the meter box on the side closest to
              your home. Turn the house valve off and on once so you know it
              moves. Leave the street side of the meter alone: Garden Grove,
              for one, says city shut-off valves are not to be operated by
              customers except in an extreme emergency.
            </li>
            <li>
              <strong>Gas.</strong> SoCalGas says the meter shut-off valve is
              usually 6 to 8 inches above the ground on the pipe running up to
              the meter, and that a quarter turn with a 12-inch or larger
              adjustable wrench, until the valve is crosswise to the pipe,
              closes it. It also says not to turn the meter off unless you
              smell gas, hear it escaping or see other signs of a leak, and
              not to turn it back on yourself afterward.
            </li>
            <li>
              <strong>Power.</strong> Find the main breaker and label any
              circuits the last owner left blank.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            Then walk the house for alarms. State law requires an operable
            smoke alarm in every single-family home that is sold, and a
            carbon monoxide device in any home with a fuel-burning appliance,
            a fireplace or an attached garage. The Orange County Fire
            Authority says to test smoke alarms once a month and replace the
            whole alarm every 10 years. The manufacture date is printed on
            the back.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How do I check the water heater?
          </h2>
          <p className="mt-2 leading-relaxed">
            Look for two metal straps, one in the upper third of the tank and
            one in the lower third, anchored to the wall framing. California
            Health and Safety Code section 19211 requires every residential
            water heater to be braced, anchored or strapped against
            earthquake motion, and requires the seller to certify in writing
            that this was done. Check anyway.
          </p>
          <p className="mt-2 leading-relaxed">
            Next, find the age from the rating label and write it down.
            Orange County water is hard, which is rough on tank heaters, so an
            older tank is something to budget for. Our{" "}
            <Link href="/guides/hard-water-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              hard water guide
            </Link>{" "}
            explains why and what flushing does.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Do I need an earthquake gas shutoff valve?
          </h2>
          <p className="mt-2 leading-relaxed">
            We did not find a statewide or Orange County rule that requires
            one on a single-family home, though we did not check every city.
            SoCalGas describes them as something you may want, or that your
            insurance company or local building department may require. If
            you add one, SoCalGas says it must go on your house line, on your
            side of the meter, installed by a qualified professional, because
            the company no longer installs them.
          </p>
          <p className="mt-2 leading-relaxed">
            Two other earthquake items. The California Earthquake Authority
            says that in most cases earthquake damage is not covered by a
            homeowners policy and a separate policy is needed, so decide on
            purpose. And if you bought an older house on a raised
            foundation, look at Earthquake Brace + Bolt: the program says its
            retrofit is only done on wood-framed homes built before 1980 with
            a raised foundation, and it offers grants in eligible ZIP
            codes.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend is a free home record for Orange County homeowners. Add
            the house once, note the age of the water heater, roof and HVAC,
            store your closing documents and warranties, and get maintenance
            reminders through the year.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Start your home record, free
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What tax bills should I expect in the first year?
          </h2>
          <p className="mt-2 leading-relaxed">
            More than one, and escrow may not cover them all. The Orange
            County Treasurer-Tax Collector lists the regular schedule: the
            first installment of secured property tax is due November 1 and
            late after December 10, and the second is due February 1 and late
            after April 10, with a 10 percent penalty for missing either.
          </p>
          <p className="mt-2 leading-relaxed">
            On top of that comes a supplemental bill. The Treasurer explains
            that these are generally one-time bills issued when a property
            changes hands, based on the difference between the new and old
            assessed value, that they normally arrive within one year of the
            purchase, and that mortgage companies do not usually pay them.
            They are the new owner&apos;s responsibility, so set money aside.
          </p>
          <p className="mt-2 leading-relaxed">
            File for the Homeowners&apos; Exemption as well. The Orange County
            Assessor says it exempts $7,000 of your home&apos;s value from
            taxation, which saves at least $70 a year, if the home was your
            principal residence on January 1. The Assessor mails new owners a
            pre-filled application, and the deadline for the full exemption
            is February 15.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What is Mello-Roos and how do I find it on my bill?
          </h2>
          <p className="mt-2 leading-relaxed">
            Mello-Roos is the everyday name for a Community Facilities
            District special tax. The Treasurer-Tax Collector explains that
            the 1982 law lets local governments issue bonds to build and buy
            public facilities, and that the bonds are secured by special
            taxes levied on property owners and billed on the property tax
            bill. Not every home has one. It depends on whether your
            neighborhood was built inside a district.
          </p>
          <p className="mt-2 leading-relaxed">
            State law calls it a special tax, not a special assessment, and
            it is a separate line on your bill from the basic property tax
            that is based on assessed value. The
            Treasurer&apos;s site has a Mello-Roos map and a guide that matches
            each bill description to the bond behind it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Which HOA documents should I keep?
          </h2>
          <p className="mt-2 leading-relaxed">
            If the home is in an association, Civil Code section 4525 lists
            what the seller had to give you before closing: the governing
            documents, a statement of current regular and special
            assessments and fees, and notice of any unresolved violation,
            among other items. Keep all of it. The CC&amp;Rs answer the
            question that comes up most: who fixes what.
          </p>
          <p className="mt-2 leading-relaxed">
            The default in Civil Code section 4775 is that the association
            maintains the common area and you maintain your separate
            interest. For exclusive use common area, such as a patio only
            you use, the owner maintains it and the association repairs and
            replaces it. Your CC&amp;Rs can change those defaults.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How do I look up the permit history?
          </h2>
          <p className="mt-2 leading-relaxed">
            Ask the city&apos;s building division what permits are on file for
            your address. It tells you whether the patio cover or the remodel
            was inspected, and how old the roof really is. Some cities put
            this online: Newport Beach, for example, offers permit history by
            address. Work that was never permitted becomes your
            responsibility as the owner. Our{" "}
            <Link href="/guides/permits-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              Orange County permit guide
            </Link>{" "}
            explains what needs one.
          </p>
          <p className="mt-2 leading-relaxed">
            Before you dig for a tree or a fence post, contact 811.
            Government Code section 4216.2 requires notice at least two
            working days before digging starts, and the service is free.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What should the rest of the first year look like?
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Before fall winds.</strong> Trim trees away from the
              roof, clear gutters, and read our{" "}
              <Link href="/guides/santa-ana-wind-wildfire-home-prep" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
                Santa Ana wind and wildfire prep guide
              </Link>{" "}
              if you live near a canyon or hillside.
            </li>
            <li>
              <strong>Before the first rain.</strong> Check the roof and
              clear yard drains.
            </li>
            <li>
              <strong>Spring.</strong> Have the AC serviced before the first
              heat wave, and flush a tank water heater once a year.
            </li>
          </ul>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            See what is typical for homes in{" "}
            <Link href="/oc/irvine" className="text-bark-700 hover:underline dark:text-stone-300">Irvine</Link>,{" "}
            <Link href="/oc/mission-viejo" className="text-bark-700 hover:underline dark:text-stone-300">Mission Viejo</Link>,{" "}
            <Link href="/oc/ladera-ranch" className="text-bark-700 hover:underline dark:text-stone-300">Ladera Ranch</Link>,{" "}
            <Link href="/fountain-valley" className="text-bark-700 hover:underline dark:text-stone-300">Fountain Valley</Link> and{" "}
            <Link href="/huntington-beach" className="text-bark-700 hover:underline dark:text-stone-300">Huntington Beach</Link>, or
            browse every city on the{" "}
            <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">Orange County hub</Link>.
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            Dates, amounts and code sections as of September 2026. Tax rules,
            deadlines and local requirements change, and your home and HOA
            may differ, so confirm with the Orange County Treasurer-Tax
            Collector, the Assessor, your city and your utility. This is
            general information, not legal, tax, insurance or safety advice.
            If you smell gas, leave and call SoCalGas or 911 from a safe
            place.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/new-homeowner-first-year-orange-county" />

      <GuideCta />
    </main>
  );
}

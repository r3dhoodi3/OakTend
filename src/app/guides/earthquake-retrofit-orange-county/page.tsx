import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide: seismic (bolt and brace) retrofit for Orange County
// houses. Every fact was opened on 2026-09-26; links in GUIDE_SOURCES,
// src/lib/guideExtras.ts:
//  - Earthquake Brace + Bolt (CRMP): the retrofit page, the "see if you
//    qualify" page (up to $3,000, supplemental up to $7,000 at $94,480 or
//    less), the ZIP lookup, and the program rules effective 2026-02-01
//    (who qualifies, Chapter A3, Type 1 vs Type 2, the permit order, the
//    A or B license, one grant per parcel, and the $3,000 to $7,000 typical
//    cost, which is the program's statewide figure and is labeled as such).
//  - ZIP codes: read from the program's own ZIP lookup data on 2026-09-26.
//    It listed many Orange County ZIP codes with registration closed. The
//    page names a few cities, not the full list, because the list changes
//    every program year.
//  - CEA: "steps up to the first floor" and the up to 25% premium discount
//    with its criteria and the verification form.
//  - HSC 19211 (water heater), SoCalGas (when to shut off the gas), RTC 74.5
//    (retrofit excluded from reassessment).
// Dropped as unverifiable: a registration date for the next EBB window (no
// 2026 EBB announcement found), any Orange County retrofit price.
//
// No FAQPage or HowTo JSON-LD on purpose: the questions are visible headings
// only. Article and BreadcrumbList are the only structured data here.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker), same as every guide: nothing here reads cookies(),
// headers(), searchParams or the database.
export const revalidate = 3600;

// Title/description held once so metadata.title, openGraph, and twitter
// can't drift from each other; the OG image at ./opengraph-image.tsx keeps
// its own literal copy of the title.
const TITLE = "Earthquake retrofit in Orange County";
const DESCRIPTION =
  "Which Orange County houses need a bolt and brace retrofit, what the work involves, the Brace + Bolt grant, the insurance discount and the permit.";
const CANONICAL = `${SITE_URL}/guides/earthquake-retrofit-orange-county`;

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

export default function EarthquakeRetrofitOrangeCountyGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <GuideArticleJsonLd
        path="/guides/earthquake-retrofit-orange-county"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Earthquake retrofit in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Earthquake retrofit in Orange County", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Earthquake retrofit in Orange County
      </h1>
      <GuideMeta path="/guides/earthquake-retrofit-orange-county" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        For owners of older Orange County houses. General information, not
        engineering, insurance or tax advice.
      </p>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Which houses need a retrofit?
          </h2>
          <p className="mt-2 leading-relaxed">
            Houses raised on a foundation, with a crawl space under the
            floor. The California Earthquake Authority says older houses with
            steps up to the first floor can shift off their foundations in an
            earthquake. A house on a concrete slab is not the kind this
            retrofit is for.
          </p>
          <p className="mt-2 leading-relaxed">
            The state&apos;s Earthquake Brace + Bolt program is more exact.
            Its 2026 rules cover detached houses of one to four
            units, built before 1980, on level ground or a low slope, with a
            continuous raised perimeter foundation. Mobile and manufactured
            homes do not qualify.
          </p>
          <p className="mt-2 leading-relaxed">
            To check your own house, look in the crawl space for bolts or
            steel plates tying the wood sill to the concrete, and for short
            wood-framed walls between the foundation and the floor. Those
            are cripple walls, and they are what the bracing is for.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What does a bolt and brace retrofit involve?
          </h2>
          <p className="mt-2 leading-relaxed">
            Two things. Anchor bolts or foundation plates fasten the wood
            frame to the concrete foundation. Where there are cripple walls,
            plywood or OSB sheathing is attached along them to stiffen them.
            A house whose frame sits directly on the foundation gets bolting
            only.
          </p>
          <p className="mt-2 leading-relaxed">
            The standard is Chapter A3 of the California Existing Building
            Code. Under the program rules, cripple walls up to 4 feet tall can
            be done from a standard plan set. Taller cripple walls (up to 7
            feet), a house partly on a slab, or more than three stories need
            plans from a licensed design professional.
          </p>
          <p className="mt-2 leading-relaxed">
            Cost: the program&apos;s 2026 rules say a typical Chapter A3
            retrofit costs between $3,000 and $7,000, depending on the
            location and size of the house, contractor fees and materials.
            That is a statewide program figure, not an Orange County survey.
          </p>
          <p className="mt-2 leading-relaxed">
            Two smaller earthquake items. State
            law requires every residential water heater to be braced,
            anchored or strapped; our{" "}
            <Link href="/guides/water-heater-replacement-cost" className={linkClass}>
              water heater guide
            </Link>{" "}
            covers it. And SoCalGas says not to shut off the gas meter after
            a quake unless you smell gas, hear it escaping or see other signs
            of a leak, and never to turn it back on yourself. Our{" "}
            <Link href="/guides/new-homeowner-first-year-orange-county" className={linkClass}>
              new homeowner checklist
            </Link>{" "}
            covers the meter and automatic shutoff valves.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How does the Earthquake Brace + Bolt grant work?
          </h2>
          <p className="mt-2 leading-relaxed">
            The program, run by the California Residential Mitigation
            Program, pays up to $3,000 toward a code-compliant retrofit.
            Households with an annual income of $94,480 or less can also get
            a supplemental grant of up to $7,000, as funding permits.
          </p>
          <p className="mt-2 leading-relaxed">
            Registration opens for a limited time each year, by ZIP code. When
            we checked on September 26, 2026, the program&apos;s ZIP lookup
            included many Orange County ZIP codes, among them ones in
            Anaheim, Santa Ana, Irvine, Huntington Beach and San Clemente, and
            showed registration as closed. Check your ZIP code on the{" "}
            <a
              href="https://www.crmp.org/resources/program-zip-codes"
              rel="noopener"
              className={linkClass}
            >
              program&apos;s ZIP code page
            </a>{" "}
            and sign up there for word of the next window.
          </p>
          <p className="mt-2 leading-relaxed">
            The order matters. The rules say the permit must be issued after
            you are accepted, and work started before the program approves it
            makes the house ineligible. The contractor must hold a general
            building license (Class A or B, not B-2), or you can do the work
            yourself. A parcel that has already received an earthquake
            retrofit grant cannot get another.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Does a retrofit lower earthquake insurance?
          </h2>
          <p className="mt-2 leading-relaxed">
            On a California Earthquake Authority policy, it can. The CEA
            offers up to a 25% premium discount for a pre-1980 house like the
            ones above once it is bolted, its cripple walls are braced where
            they exist and its water heater is secured. Your insurer needs the
            CEA&apos;s Dwelling Retrofit Verification form signed by a
            contractor or structural engineer, or a Brace + Bolt verification
            number.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Do I need a permit, and will it raise my property tax?
          </h2>
          <p className="mt-2 leading-relaxed">
            Plan on a building permit. The grant program requires one for the
            retrofit alone, with any other work on a separate permit, and a
            copy signed by the inspector after the final. Our{" "}
            <Link href="/guides/permits-orange-county" className={linkClass}>
              Orange County permit guide
            </Link>{" "}
            covers how cities differ.
          </p>
          <p className="mt-2 leading-relaxed">
            The retrofit itself should not raise your assessed value.
            California Revenue and Taxation
            Code section 74.5 says seismic retrofitting is not new
            construction for reassessment. To claim that, tell the county
            assessor before, or within 30 days of, finishing the project, and
            file the supporting documents within six months of finishing.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps the permit, the inspector&apos;s sign-off and the
            retrofit verification in your home&apos;s record, dated, so they
            are there for your insurer or a buyer.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Keep your home&apos;s record, free
          </Link>
        </div>

        <section>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            City pages:{" "}
            <Link href="/oc/anaheim" className="text-bark-700 hover:underline dark:text-stone-300">Anaheim</Link>,{" "}
            <Link href="/oc/santa-ana" className="text-bark-700 hover:underline dark:text-stone-300">Santa Ana</Link>,{" "}
            <Link href="/oc/irvine" className="text-bark-700 hover:underline dark:text-stone-300">Irvine</Link>,{" "}
            <Link href="/huntington-beach" className="text-bark-700 hover:underline dark:text-stone-300">Huntington Beach</Link> and{" "}
            <Link href="/oc/san-clemente" className="text-bark-700 hover:underline dark:text-stone-300">San Clemente</Link>, or every city on
            the <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">Orange County hub</Link>.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            As of September 2026. Grant rules, ZIP codes and discounts change;
            the program and your insurer have the final word.
          </p>
        </section>
      </div>

      <GuideRelated path="/guides/earthquake-retrofit-orange-county" />

      <GuideCta />
    </main>
  );
}

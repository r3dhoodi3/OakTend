import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide. NO PRICES AND NO SAVINGS FIGURES ON PURPOSE: what a system
// saves depends on the home's use, the roof and the rate, and we will not
// print a number we cannot source for this county.
// Sourced facts (opened 2026-09-26, links in GUIDE_SOURCES,
// src/lib/guideExtras.ts): the CPUC net energy metering and net billing page
// (April 15, 2023 start, export value, TOU rate, nine-year lock, export adder
// through 2027, monthly bills, NEM 2.0 for 20 years, batteries), SCE's Solar
// Billing Plan page (TOU-D-PRIME, 4 to 9 p.m. summer weekday peak), SDG&E's
// about page (serves southern Orange County), Anaheim Public Utilities'
// solar and NEM 2.0 pages, Government Code 65850.52 (SB 379), Huntington
// Beach, Fountain Valley and Irvine solar permit pages, Civil Code 714 and
// the IRS Residential Clean Energy Credit page.
// Dropped: roof fire setback measurements (no primary California page we
// could open states them), leased-system federal credits, battery rebates
// (the rebates guide covers programs).
//
// No FAQPage or HowTo JSON-LD on purpose. Article and BreadcrumbList only.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker), same as every other guide: nothing here reads
// cookies(), headers(), searchParams or the database.
export const revalidate = 3600;

// "Solar and batteries in Orange County | OakTend" is 46 characters.
const TITLE = "Solar and batteries in Orange County";
const DESCRIPTION =
  "How net billing changed rooftop solar in Orange County, why batteries matter more now, Anaheim's rules, automated permits, HOA limits and the 2026 tax credit.";
const PATH = "/guides/solar-battery-orange-county";
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

export default function SolarBatteryOrangeCountyGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <GuideArticleJsonLd
        path="/guides/solar-battery-orange-county"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Solar and batteries" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Solar and batteries", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Solar and batteries in Orange County
      </h1>
      <GuideMeta path="/guides/solar-battery-orange-county" />
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        No prices or savings estimates here on purpose.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          The short answer
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          The rules moved toward using your own solar power
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          Power you send to the grid is worth less than it was for older
          systems, and the federal credit is gone for 2026 installs. Anaheim
          runs its own program.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What changed on April 15, 2023
          </h2>
          <p className="mt-2 leading-relaxed">
            Systems that apply to connect to SCE, PG&amp;E or SDG&amp;E since
            that date go on the Net Billing Tariff, often called NEM 3.0.
            SCE calls it the Solar Billing Plan. Solar you use yourself still
            offsets power you would buy. The change is in what you get for
            the rest:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Exports are credited at their hourly value to the
              grid.</strong> The CPUC says that is usually lower than the
              retail rate, but can rise above it on late summer evenings.
            </li>
            <li>
              <strong>A set time-of-use rate.</strong> At SCE it is
              TOU-D-PRIME.
            </li>
            <li>
              <strong>Nine years locked.</strong> The original customer keeps
              the tariff for nine years. SCE and PG&amp;E customers who apply
              before the end of 2027 also get slightly higher export credits
              for those nine years; SDG&amp;E customers do not.
            </li>
            <li>
              <strong>Monthly bills.</strong> Charges are due each month, and
              extra credits roll forward to a yearly true-up.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            A system already on the older NEM 2.0 tariff can stay on it for
            20 years from the date it was connected.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Why batteries matter more now
          </h2>
          <p className="mt-2 leading-relaxed">
            SCE&apos;s prices are highest on summer weekdays from 4 to 9
            p.m., as the sun goes down. A battery stores daytime solar to use
            or export in those hours, and the
            CPUC names that as the way to get the most bill savings under the
            tariff. Some solar and battery installs also need a bigger
            electrical panel; see our{" "}
            <Link href="/guides/electrical-panel-upgrade-cost" className={LINK}>
              panel upgrade guide
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Anaheim and south county
          </h2>
          <p className="mt-2 leading-relaxed">
            Anaheim Public Utilities, the city&apos;s own electric utility,
            says it is not going to NEM 3.0. New Anaheim systems go on its
            NEM 2.0 program, which credits exported power at a wholesale-based
            rate on its rate sheet. A grandfathered NEM 1.0 customer who adds
            panels moves the whole system to NEM 2.0. Anaheim issues permits
            for systems under 10 kW without plan review, and you can turn the
            system on once the city signs off the permit; the utility does not
            issue a separate permission to operate.
          </p>
          <p className="mt-2 leading-relaxed">
            SDG&amp;E, not SCE, serves parts of southern Orange County. Check
            the name on your bill.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Permits: the automated route
          </h2>
          <p className="mt-2 leading-relaxed">
            Government Code section 65850.52, added by SB 379, requires cities
            over 5,000 people to offer an online, automated permit for home
            solar up to 38.4 kW and a battery paired with it, issued in real
            time to a licensed contractor. Cities over 50,000 had until
            September 30, 2023; smaller ones until September 30, 2024.
            Systems the platform cannot check go through regular review.
          </p>
          <p className="mt-2 leading-relaxed">
            Huntington Beach and Fountain Valley use SolarAPP+, and both still
            inspect the finished work. Irvine issues same-day solar and
            battery permits online for a system with no more than one
            battery. Fountain Valley&apos;s plan checklist asks for fire
            access pathways on the roof and the roof covering, so if the roof
            is near the end of its life, see our{" "}
            <Link href="/guides/roof-replacement-cost" className={LINK}>
              roof replacement guide
            </Link>{" "}
            first: reroofing later means taking the panels off.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What an HOA can and cannot do
          </h2>
          <p className="mt-2 leading-relaxed">
            California Civil Code section 714 voids HOA rules that effectively
            prohibit solar. For a solar electric system, a reasonable
            restriction can add no more than $1,000 to the cost or cut
            efficiency by no more than 10 percent. Our{" "}
            <Link href="/guides/hoa-coastal-commission-remodel-orange-county" className={LINK}>
              HOA and coastal remodel guide
            </Link>{" "}
            covers the written decision and the 45-day deadline.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            The federal tax credit in 2026
          </h2>
          <p className="mt-2 leading-relaxed">
            The Residential Clean Energy Credit covered 30 percent of the cost
            of solar installed from 2022 through 2025, and batteries of at
            least 3 kWh from 2023. The IRS says it is not available for property placed
            in service after December 31, 2025. If a 2026 quote still
            subtracts it, ask the installer to explain in writing.
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
            OakTend keeps the contract, the permit, the interconnection
            papers and the warranties in your home&apos;s record, so a buyer
            can see them when you sell.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Keep your home&apos;s repair record, free
          </Link>
        </div>

        <section>
          <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
            As of September 2026. Your utility and your city have the current
            rules. This is general information, not financial, tax or legal
            advice.
          </p>
        </section>
      </div>

      <GuideRelated path="/guides/solar-battery-orange-county" />

      <GuideCta />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public guide: home rebates open to Orange County homeowners, as each
// program's own page stated them on CHECKED_ON. Time sensitive by nature, so:
//
//   - every program block carries its own "as of" date (AsOf below),
//   - the page says it is reviewed every quarter, and
//   - the box at the top tells the reader to check with the program before
//     buying anything (said once there, not repeated under every program).
//
// ONLY WHAT A PRIMARY SOURCE SAID ON THE DAY. Every amount below was read on
// the program's or utility's own page on 2026-09-26 and is listed with its
// link in GUIDE_SOURCES (src/lib/guideExtras.ts). SCE's page lists almost no
// dollar amounts, so neither does this one. Programs whose pages could not be
// read that day (MWDOC blocked automated reads, Moulton Niguel Water District
// returned 403) are left out rather than filled in from third-party sites.
//
// QUARTERLY REVIEW. Re-open every source, update CHECKED_ON and each AsOf,
// and bump dateModified in src/lib/guides.ts only if words changed. The next
// review is due by the end of December 2026.
//
// No FAQPage or HowTo JSON-LD, like the other Orange County guides. The pro
// side is closed, so nothing here offers to find, match or book anyone.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker), same as every other guide.
export const revalidate = 3600;

// 34 characters, so the full "<title> | OakTend" stays under 50. The OG image
// at ./opengraph-image.tsx keeps its own literal copy.
const TITLE = "Orange County home rebates in 2026";
const DESCRIPTION =
  "Rebates for Orange County homeowners as of September 2026: SoCalGas, SCE, turf and water devices, state heat pump programs and earthquake retrofit grants.";
const CANONICAL = `${SITE_URL}/guides/orange-county-home-rebates-2026`;

const CHECKED_ON = "September 26, 2026";

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
const cardClass =
  "rounded-xl border border-stone-200 p-4 leading-relaxed dark:border-white/10";
const cardTitleClass = "font-semibold text-stone-900 dark:text-stone-100";

// The "as of" line under every program. One component so the wording and the
// date cannot drift between blocks.
function AsOf({ href, label }: { href: string; label: string }) {
  return (
    <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
      As of {CHECKED_ON}, from the{" "}
      <a href={href} rel="noopener" className={linkClass}>
        {label}
      </a>
      .
    </p>
  );
}

export default function OrangeCountyHomeRebatesGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/orange-county-home-rebates-2026"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Orange County home rebates in 2026" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Orange County home rebates in 2026", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Orange County home rebates in 2026
      </h1>
      <GuideMeta path="/guides/orange-county-home-rebates-2026" />

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-6 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
          Every amount on this page is as of {CHECKED_ON}.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          Rebates change, run out of money and close without much notice. We
          review this page every quarter. Check with the program before you
          buy anything or start any work, and keep every receipt.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What gas appliance rebates does SoCalGas offer?
          </h2>
          <p className="mt-2 leading-relaxed">
            If your gas bill comes from SoCalGas, its rebate page lists these
            for homes, among others:
          </p>
          <ul className="mt-3 space-y-3">
            <li className={cardClass}>
              <p className={cardTitleClass}>Storage water heater: $300 to $575</p>
              <p className="mt-1 text-sm">
                The heater must have a UEF (uniform energy factor) of 0.64 or
                higher and hold 55 gallons or less.
              </p>
            </li>
            <li className={cardClass}>
              <p className={cardTitleClass}>Tankless water heater: $80 to $1,500</p>
              <p className="mt-1 text-sm">
                Only when it replaces a tank-type unit in a single-family
                detached home.
              </p>
            </li>
            <li className={cardClass}>
              <p className={cardTitleClass}>Furnace: $1.40 to $25 per kBTUh</p>
              <p className="mt-1 text-sm">
                The furnace must have an AFUE of 92 percent or more, be
                installed by a licensed contractor with proof that the permit
                was closed, and there is a limit of one per household.
              </p>
            </li>
          </ul>
          <p className="mt-3 leading-relaxed">
            SoCalGas says the money is handed out first come, first served
            until December 31, 2026 or until it runs out. For what a
            replacement involves, see our{" "}
            <Link href="/guides/water-heater-replacement-cost" className={linkClass}>
              water heater
            </Link>{" "}
            and{" "}
            <Link href="/guides/hvac-replacement-cost" className={linkClass}>
              HVAC
            </Link>{" "}
            guides.
          </p>
          <AsOf
            href="https://www.socalgas.com/savings/rebates-and-incentives"
            label="SoCalGas rebates and incentives page"
          />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What does SCE offer electric customers?
          </h2>
          <p className="mt-2 leading-relaxed">
            Southern California Edison&apos;s rebate page lists few amounts,
            so neither do we:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Golden State Rebates:</strong> instant rebate coupons on
              air conditioners, smart thermostats, electric heat pump water
              heaters and gas water heaters, used at participating retailers.
            </li>
            <li>
              <strong>Smart thermostat bill credit:</strong> $75 when you let
              SCE adjust an eligible smart thermostat by up to four degrees
              during demand response events. Only on select rate plans.
            </li>
            <li>
              <strong>Home Performance Plus:</strong> a no-cost energy
              assessment and enhanced rebates for renters and single-family
              homeowners in disadvantaged communities.
            </li>
            <li>
              <strong>Comfortably California:</strong> SCE says this program
              works through HVAC distributors and does not offer direct
              customer rebates.
            </li>
          </ul>
          <AsOf
            href="https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace"
            label="SCE rebates and SCE Marketplace page"
          />
          <p className="mt-4 leading-relaxed">
            Not every Orange County home gets its power from SCE. The City of
            Anaheim runs its own utility, Anaheim Public Utilities, and its
            appliance page lists $400 for an ENERGY STAR certified heat pump
            water heater and $200 for an ENERGY STAR certified heat pump
            dryer, among smaller rebates.
          </p>
          <AsOf
            href="https://www.anaheim.net/5241/Appliance-Fixtures"
            label="Anaheim Public Utilities appliance rebates page"
          />
          <p className="mt-4 leading-relaxed">
            For rooftop solar and batteries, including the end of the federal
            tax credit, see our{" "}
            <Link href="/guides/solar-battery-orange-county" className={linkClass}>
              solar and battery guide
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What water rebates can Orange County homeowners get?
          </h2>
          <p className="mt-2 leading-relaxed">
            SoCal Water$mart is the regional rebate program of the
            Metropolitan Water District of Southern California, and it says
            rebates vary by water agency. Some Orange County agencies also
            list their own amounts.
          </p>
          <ul className="mt-3 space-y-3">
            <li className={cardClass}>
              <p className={cardTitleClass}>
                SoCal Water$mart (Metropolitan Water District)
              </p>
              <p className="mt-1 text-sm">
                Turf replacement: $2.00 per square foot, up to 5,000 square
                feet of converted yard per year. You must apply and be approved
                before you start, then have 180 days to finish. The new yard
                needs at least 3 plants per 100 square feet, a feature that
                holds rain water, and irrigation changes; synthetic turf does
                not qualify. Devices: premium high-efficiency toilets $40
                each, rotating sprinkler nozzles $2 each (at least 30),
                high-efficiency clothes washers from $85. Amounts depend on
                funding.
              </p>
              <AsOf
                href="https://socalwatersmart.com/en/residential/rebates/available-rebates/turf-replacement-program/"
                label="SoCal Water$mart turf replacement page"
              />
            </li>
            <li className={cardClass}>
              <p className={cardTitleClass}>Irvine Ranch Water District</p>
              <p className="mt-1 text-sm">
                Turf replacement $2 per square foot; drip irrigation $0.25 per
                square foot converted; rotating spray nozzles $4 each; rain
                barrels $35 each (two per household); cisterns $250 to $350;
                soil moisture sensors up to $80 on properties under an acre;
                smart hose bib controllers $35 (two per property); flow
                monitors with a $100 base incentive (no devices attached to
                the meter);
                high-efficiency toilets $40 each (up to nine); clothes washers
                from $85. IRWD also covers half the cost of sprinkler repairs
                through its repair program. It says amounts change with
                funding.
              </p>
              <AsOf
                href="https://www.irwd.com/get-help/residential-rebates/"
                label="IRWD residential rebates page"
              />
            </li>
            <li className={cardClass}>
              <p className={cardTitleClass}>Mesa Water District</p>
              <p className="mt-1 text-sm">
                Turf removal from $3 per square foot; drip irrigation from $1
                per square foot; weather-based irrigation controllers from $80
                on properties under an acre; soil moisture sensors up to $80;
                rotating nozzles $2 each (at least 15); rain barrels $35;
                cisterns $250 to $350; pool covers $50; flow monitors from
                $100; premium toilets from $40; clothes washers from $85.
              </p>
              <AsOf
                href="https://www.mesawater.org/Rebates"
                label="Mesa Water District rebates page"
              />
            </li>
            <li className={cardClass}>
              <p className={cardTitleClass}>Santa Margarita Water District</p>
              <p className="mt-1 text-sm">
                Residential turf removal $2 per square foot plus $1,000 for
                design plans; smart sprinkler timers $100; soil moisture
                sensor systems $200; flow monitors $100; rain barrels and
                cisterns $35 to $350; high-efficiency nozzles $5; hose bib
                controllers $35; clothes washers $85; toilets $40; and up to
                $1,500 through H2OC RainSmart for rain gardens and barrels.
              </p>
              <AsOf href="https://smwd.com/rebates" label="Santa Margarita Water District rebates page" />
            </li>
          </ul>
          <p className="mt-3 leading-relaxed">
            Other Orange County water agencies run their own versions. We list
            only the pages we could open and read ourselves; if yours is not
            here, look up the agency on your water bill. Our{" "}
            <Link href="/guides/orange-county-home-maintenance-checklist" className={linkClass}>
              Orange County maintenance checklist
            </Link>{" "}
            covers the sprinkler timer and irrigation checks by month.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Are heat pump rebates still available in California?
          </h2>
          <p className="mt-2 leading-relaxed">
            Not for most single-family homes right now. Three state programs,
            three statuses:
          </p>
          <ul className="mt-3 space-y-3">
            <li className={cardClass}>
              <p className={cardTitleClass}>TECH Clean California: reserved</p>
              <p className="mt-1 text-sm">
                Since November 14, 2025, TECH Clean California&apos;s
                single-family heat pump water heater and heat pump HVAC
                incentives have been reserved statewide.
              </p>
              <AsOf
                href="https://techcleanca.com/incentives/single-family-incentives/"
                label="TECH Clean California single-family incentives page"
              />
            </li>
            <li className={cardClass}>
              <p className={cardTitleClass}>
                HEEHRA (Home Electrification and Appliance Rebates): waitlist
              </p>
              <p className="mt-1 text-sm">
                The California Energy Commission says that as of February 24,
                2026, HEEHRA rebates for single-family homes are fully
                reserved statewide. The program offered up to $8,000 to
                households under 80 percent of area median income and up to
                $4,000 between 80 and 150 percent. Requests not approved by
                then went on a waitlist, and TECH Clean California says a
                waitlisted project only qualifies if the heat pump is
                installed after its reservation is approved. Central and
                Southern California had already been fully reserved since
                January 7, 2026.
              </p>
              <AsOf
                href="https://www.energy.ca.gov/programs-and-topics/programs/inflation-reduction-act-residential-energy-rebate-programs"
                label="California Energy Commission rebate programs page"
              />
            </li>
            <li className={cardClass}>
              <p className={cardTitleClass}>HOMES (Home Efficiency Rebates): not open</p>
              <p className="mt-1 text-sm">
                The Energy Commission says HOMES rebates are not yet available.
                It reports a $291 million federal award approved in January
                2025 and gives no date for homeowners to apply.
              </p>
              <AsOf
                href="https://www.energy.ca.gov/programs-and-topics/programs/inflation-reduction-act-residential-energy-rebate-programs"
                label="California Energy Commission rebate programs page"
              />
            </li>
          </ul>
          <p className="mt-3 leading-relaxed">
            The SCE and Anaheim rebates above can still apply to a heat pump
            water heater.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Can I get a grant for an earthquake retrofit?
          </h2>
          <p className="mt-2 leading-relaxed">
            Possibly: Earthquake Brace + Bolt pays up to $3,000 toward
            retrofitting an older raised-foundation house, and more for
            income-qualified households; our{" "}
            <Link href="/guides/earthquake-retrofit-orange-county" className={linkClass}>
              earthquake retrofit guide
            </Link>{" "}
            covers who qualifies and how to apply.
          </p>
          <AsOf
            href="https://www.crmp.org/our-seismic-retrofit-programs/the-retrofits/ebb-retrofit"
            label="Earthquake Brace + Bolt program page"
          />
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps the age of your water heater, furnace and other
            systems, so you can see what is due for replacement before a
            rebate deadline passes.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Track your home, free
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How do I avoid losing a rebate?
          </h2>
          <p className="mt-2 leading-relaxed">
            Apply first when the program requires it, as turf replacement and
            waitlisted HEEHRA projects do. Pull the permit: SoCalGas wants
            proof the furnace permit was closed, and our{" "}
            <Link href="/guides/permits-orange-county" className={linkClass}>
              permits guide
            </Link>{" "}
            covers which jobs need one. Efficiency ratings like UEF and AFUE
            decide eligibility, so confirm the exact model number against the
            program&apos;s list before you buy.
          </p>
          <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
            City pages with local notes:{" "}
            <Link href="/oc/irvine" className={linkClass}>
              Irvine
            </Link>
            ,{" "}
            <Link href="/oc/anaheim" className={linkClass}>
              Anaheim
            </Link>
            ,{" "}
            <Link href="/oc/costa-mesa" className={linkClass}>
              Costa Mesa
            </Link>
            ,{" "}
            <Link href="/oc/rancho-santa-margarita" className={linkClass}>
              Rancho Santa Margarita
            </Link>{" "}
            and{" "}
            <Link href="/huntington-beach" className={linkClass}>
              Huntington Beach
            </Link>
            . Or see every city on the{" "}
            <Link href="/oc" className={linkClass}>
              Orange County hub
            </Link>
            .
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            OakTend does not run, fund or guarantee any of these programs, and
            this is not tax or financial advice.
          </p>
        </section>
      </div>

      {/* Sources, related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/orange-county-home-rebates-2026" />

      <GuideCta />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide for Orange County homeowners. Every hardness figure on this
// page was read out of the water provider's own 2026 water quality report (2025
// sampling) or its own FAQ page on 2026-09-21, and each one is listed with its
// link in GUIDE_SOURCES (src/lib/guideExtras.ts). No figure is estimated and
// no provider is listed without a page we opened. The softener section states
// what state law allows and what two districts say; we found no Orange County
// ordinance that bans softeners and the page says so in those words rather
// than claiming there is none.
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
const TITLE = "Hard water in Orange County: a homeowner guide";
const DESCRIPTION =
  "How hard Orange County tap water is by water provider, what it does to water heaters and fixtures, how to flush a tank, and what to know about softeners.";
const CANONICAL = `${SITE_URL}/guides/hard-water-orange-county`;

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

// Hardness as each provider printed it. "ppm" is parts per million as calcium
// carbonate, the same thing as milligrams per liter. Ranges are the low and
// high readings in the report, not a forecast for any one address.
const HARDNESS = [
  {
    provider: "Metropolitan Water District imported water",
    detail:
      "Average 236 ppm, range 191 to 280 (14 grains per gallon). This is the Colorado River and Northern California blend that most Orange County providers buy some of, as printed in the Newport Beach and Santa Margarita reports.",
  },
  {
    provider: "City of Fountain Valley, local groundwater",
    detail: "Average 217 ppm, range 171 to 256 (13 grains per gallon).",
  },
  {
    provider: "City of Newport Beach, groundwater source",
    detail: "Average 232 ppm, range 47.5 to 475 (14 grains per gallon).",
  },
  {
    provider: "Mesa Water District, groundwater",
    detail:
      "Average 113 ppm, range 20.6 to 293 (6.6 grains per gallon). The softest figure we found in the county.",
  },
  {
    provider: "Santa Margarita Water District",
    detail: "Average 256 ppm, range 210 to 300 (15 grains per gallon).",
  },
  {
    provider: "Yorba Linda Water District",
    detail:
      "The district's FAQ says imported water averages 18 grains per gallon and its own well water averages 20.",
  },
];

export default function HardWaterOrangeCountyGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/hard-water-orange-county"
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
          { label: "Hard water in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Hard water in Orange County" },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Hard water in Orange County: a homeowner guide
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/hard-water-orange-county" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Written for Orange County homeowners. Figures come from each water
        provider&apos;s own report, linked under Sources. General information,
        not plumbing or health advice.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          The short answer
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          Most Orange County tap water is hard to very hard
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          It is safe to drink. The cost shows up in your water heater,
          fixtures and glassware, and a yearly flush of a tank water heater is
          the cheapest thing you can do about it.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How hard is the water in Orange County?
          </h2>
          <p className="mt-2 leading-relaxed">
            The U.S. Geological Survey sorts water into four bands, measured as
            calcium carbonate: 0 to 60 milligrams per liter is soft, 61 to 120
            is moderately hard, 121 to 180 is hard, and anything over 180 is
            very hard. Milligrams per liter and parts per million (ppm) are
            the same number.
          </p>
          <p className="mt-2 leading-relaxed">
            Against that scale, most of the county lands in the top band. Here
            is what the providers printed in their 2026 water quality reports,
            which report sampling through 2025:
          </p>
          <ul className="mt-3 space-y-3">
            {HARDNESS.map((row) => (
              <li key={row.provider} className="leading-relaxed">
                <strong className="text-stone-900 dark:text-stone-100">
                  {row.provider}.
                </strong>{" "}
                {row.detail}
              </li>
            ))}
          </ul>
          <p className="mt-3 leading-relaxed">
            Two more providers describe their water without a single number on
            their FAQ page. Irvine Ranch Water District says its imported water
            is typically hard and its well water is moderately hard. El Toro
            Water District says its water is generally considered hard.
          </p>
          <p className="mt-2 leading-relaxed">
            Your own tap can differ from the average. Several providers blend
            groundwater with imported water and change the mix through the
            year, so hardness moves with the season and with where you live in
            the service area. If your provider is not listed here, look for its
            annual water quality report (also called a Consumer Confidence
            Report) and find the row labeled &quot;Hardness, total.&quot;
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Why is Orange County water so hard?
          </h2>
          <p className="mt-2 leading-relaxed">
            Hardness is dissolved calcium and magnesium, and both of the
            county&apos;s main supplies carry plenty of it. The Orange County
            Water District says the 19 cities and water agencies over the
            groundwater basin in north and central county pump about 85
            percent of their demand from it and buy the remaining 15 percent
            as imported water from the Metropolitan Water District. That
            imported water comes from the Colorado River and Northern
            California. South county sits outside that basin. The same district
            says about 600,000 people in the southern part of the county get
            most of their water from imported sources, and Santa Margarita
            Water District&apos;s report describes its supply as imported,
            treated surface water.
          </p>
          <p className="mt-2 leading-relaxed">
            El Toro Water District puts it plainly: as Colorado River water
            travels through rock formations, it naturally picks up calcium and
            magnesium.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What does hard water do to a house?
          </h2>
          <p className="mt-2 leading-relaxed">
            The U.S. Geological Survey explains that when hard water is
            heated, as in a home water heater, solid deposits of calcium
            carbonate can form, and that this scale can reduce the life of
            equipment, raise the cost of heating water, lower the efficiency
            of electric water heaters, and clog pipes. Around the house that
            looks like:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              A tank water heater that rumbles or pops as it heats, because
              water is trapped under a layer of sediment at the bottom.
            </li>
            <li>
              White crust on faucet aerators and shower heads, and a slow
              drop in flow as the small openings close up.
            </li>
            <li>
              White spots on glasses and a chalky film on shower doors. Water
              districts describe this as mineral scale left behind when
              droplets dry.
            </li>
            <li>
              White particles that clog fixtures. The City of Tustin notes
              these may be bits of calcium carbonate scale coming from the
              water heater, and that a thermostat set too high can make
              scaling worse.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            The low-cost habits are simple. Unscrew aerators and soak them in
            white vinegar once or twice a year, wipe glass and fixtures before
            droplets dry, and follow your dishwasher manual&apos;s hard water
            settings. Tankless water heaters need descaling on the schedule
            in the owner&apos;s manual, and in very hard water that is not a
            step to skip.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How often should I flush my water heater?
          </h2>
          <p className="mt-2 leading-relaxed">
            The City of Tustin&apos;s water division says many manufacturers
            recommend periodic flushing to remove sediment, which can discolor
            water and make the heater less efficient, and it tells customers to
            follow the manufacturer&apos;s owner&apos;s guide. Our own{" "}
            <Link
              href="/guides/home-maintenance-schedule"
              className="text-bark-700 underline hover:no-underline dark:text-stone-300"
            >
              maintenance schedule
            </Link>{" "}
            uses once a year as the default for a tank heater. In water as
            hard as ours, treat that as the floor unless your manual says
            otherwise.
          </p>
          <p className="mt-2 leading-relaxed">
            One caution: on an old tank that has never been flushed, the drain
            valve can clog with sediment or fail to reseal afterward.
            In that case it is fair to leave it alone and start planning for a
            replacement instead. Our{" "}
            <Link
              href="/guides/water-heater-replacement-cost"
              className="text-bark-700 underline hover:no-underline dark:text-stone-300"
            >
              water heater replacement guide
            </Link>{" "}
            covers what that involves.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps the age of your water heater, reminds you when a
            flush is due, and holds the manual and warranty so they are there
            when you need them.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Track your water heater, free
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Are water softeners allowed in Orange County?
          </h2>
          <p className="mt-2 leading-relaxed">
            Yes, with conditions, and with a local wrinkle worth knowing.
            California Health and Safety Code section 116785 allows a home
            softener only if it is regenerated off site (an exchange tank
            service), or if it drains to the sewer and meets a list of
            conditions, including regenerating on demand rather than on a
            clock and meeting a salt efficiency rating. Section 116786 lets a
            local agency limit or prohibit softeners that discharge to the
            sewer by ordinance, if it makes specific findings about salt in
            its wastewater.
          </p>
          <p className="mt-2 leading-relaxed">
            We did not find an Orange County ordinance that bans them on the
            pages we checked. What we did find is two districts asking
            customers not to use the salt kind. Irvine Ranch Water District
            and Yorba Linda Water District both say they discourage
            self-regenerating softeners, the type you add rock salt or
            potassium to, because the county recycles its wastewater and the
            brine is not removed in that process. Saltier recycled water is
            hard on the parks, school fields and golf courses irrigated with
            it. Both suggest an exchange tank service instead, so the salt
            never goes down your drain, and both point out that softening
            only the hot water lines saves money.
          </p>
          <p className="mt-2 leading-relaxed">
            Rules can change and we did not check every agency, so ask your
            water or sewer provider before you buy one.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Is hard water safe to drink?
          </h2>
          <p className="mt-2 leading-relaxed">
            Yes. Irvine Ranch Water District says hardness does not affect the
            safety of the water, and El Toro Water District describes hard
            water as safe to drink and an aesthetic and household maintenance
            issue, not a health concern. The reasons to deal with it are your
            water heater, your fixtures and your patience with spotted
            glasses.
          </p>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            City pages with local water notes:{" "}
            <Link href="/fountain-valley" className="text-bark-700 hover:underline dark:text-stone-300">
              Fountain Valley
            </Link>
            ,{" "}
            <Link href="/oc/newport-beach" className="text-bark-700 hover:underline dark:text-stone-300">
              Newport Beach
            </Link>
            ,{" "}
            <Link href="/oc/yorba-linda" className="text-bark-700 hover:underline dark:text-stone-300">
              Yorba Linda
            </Link>{" "}
            and{" "}
            <Link href="/oc/irvine" className="text-bark-700 hover:underline dark:text-stone-300">
              Irvine
            </Link>
            . Or see every city on the{" "}
            <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">
              Orange County hub
            </Link>
            .
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            Figures as of September 2026, from each provider&apos;s 2026 water
            quality report or its own FAQ page. Reports are reissued every
            year and hardness varies by season and address, so treat these as
            typical values, not a test of your tap. This is general
            information, not plumbing, legal or health advice. For your home,
            check your provider&apos;s current report and your appliance
            manuals.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/hard-water-orange-county" />

      <GuideCta />
    </main>
  );
}

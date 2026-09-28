import type { Metadata } from "next";
import Link from "next/link";
import {
  Droplet,
  Thermometer,
  Wrench,
  CalendarDays,
  ClipboardList,
  ScanSearch,
  Home,
  Zap,
  ChefHat,
  Bath,
  Building2,
  ShieldCheck,
  FileCheck,
  Droplets,
  Hammer,
  Bug,
  Flame,
  KeyRound,
  // Added 2026-09-26 (new pages A).
  Warehouse,
  Waves,
  History,
  PiggyBank,
  Activity,
  Route,
  AppWindow,
  Sun,
} from "lucide-react";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";

// Index for the public guide pages. Kept as plain grouped lists: this section
// is meant to stay small and good rather than grow into thin programmatic
// pages.
type GuideCard = {
  href: string;
  icon: typeof Droplet;
  title: string;
  blurb: string;
};

// Grouped by what a reader came for, so 26 cards are not one long list. The
// titles here are the same strings as GUIDE_TITLES in src/lib/guides.ts
// (guides.test.ts checks that), and every card keeps the href, icon, title,
// blurb order that test reads.
const SECTIONS: { heading: string; guides: GuideCard[] }[] = [
  {
    heading: "What it costs",
    guides: [
      {
        href: "/guides/water-heater-replacement-cost",
        icon: Droplet,
        title: "Water heater replacement cost",
        blurb:
          "Tank, tankless or heat pump, what changes the price, when a repair still makes sense, and strapping and permits by city.",
      },
      {
        href: "/guides/hvac-replacement-cost",
        icon: Thermometer,
        title: "HVAC replacement cost",
        blurb:
          "What drives the price of a new system, heat pump vs central AC, when to repair instead, salt air and Title 24 testing.",
      },
      {
        href: "/guides/roof-replacement-cost",
        icon: Home,
        title: "Roof replacement cost",
        blurb:
          "A sourced 2025 figure for an asphalt shingle re-roof near Orange County, shingle vs tile, when a repair is enough, and permits.",
      },
      {
        href: "/guides/electrical-panel-upgrade-cost",
        icon: Zap,
        title: "Electrical panel upgrade cost",
        blurb:
          "A sourced California price range, when an upgrade is actually needed, 100 vs 200 amp, and permits by city.",
      },
      {
        href: "/guides/kitchen-remodel-cost",
        icon: ChefHat,
        title: "Kitchen remodel cost",
        blurb:
          "Sourced 2025 averages for a minor and a major kitchen remodel near Orange County, cost per square foot, and what an older house adds.",
      },
      {
        href: "/guides/bathroom-remodel-cost",
        icon: Bath,
        title: "Bathroom remodel cost",
        blurb:
          "The sourced 2025 midrange average near Orange County, cost per square foot, what an older house adds, and resale.",
      },
      {
        href: "/guides/adu-cost",
        icon: Building2,
        title: "ADU cost",
        blurb:
          "A sourced 2025 average for a detached ADU, the 2026 California ADU law changes, impact fee limits and pre-approved plans by city.",
      },
      {
        href: "/guides/garage-conversion-vs-adu-orange-county",
        icon: Warehouse,
        title: "Garage conversion vs ADU",
        blurb:
          "Garage room, garage ADU, junior ADU or a new detached unit: the parking, setback and approval rules for each, and pre-approved plans.",
      },
      {
        href: "/guides/window-replacement-cost-orange-county",
        icon: AppWindow,
        title: "Window replacement cost in Orange County",
        blurb:
          "Retrofit vs full-frame, the Energy Code numbers a new window has to meet, permits, HOA review and salt air.",
      },
      {
        href: "/guides/solar-battery-orange-county",
        icon: Sun,
        title: "Solar and batteries in Orange County",
        blurb:
          "The net billing tariff, why batteries matter more now, Anaheim's own rules, automated permits, HOA limits and the 2026 federal credit.",
      },
    ],
  },
  {
    heading: "Leaks, pipes and water",
    guides: [
      {
        href: "/guides/slab-leak-signs",
        icon: Wrench,
        title: "Slab leak signs",
        blurb:
          "The warning signs, the two-hour water meter test, and when a slab leak is an emergency.",
      },
      {
        href: "/guides/slab-leak-repair-orange-county",
        icon: Hammer,
        title: "Slab leak repair in Orange County",
        blurb:
          "Spot repair, reroute or repipe: how each fix works, what drives the price, when a permit is needed, and what to ask your insurer.",
      },
      {
        href: "/guides/repipe-orange-county",
        icon: Wrench,
        title: "Repiping a house in Orange County",
        blurb:
          "When a whole-house repipe makes sense, copper vs PEX, the permit and inspection, and what drives the bid.",
      },
      {
        href: "/guides/sewer-line-orange-county",
        icon: Route,
        title: "Sewer line problems in Orange County",
        blurb:
          "Who owns the pipe to the street in your city, the signs of a failing line, camera inspections, repair options and permits.",
      },
      {
        href: "/guides/hard-water-orange-county",
        icon: Droplets,
        title: "Hard water in Orange County",
        blurb:
          "Hardness by water provider, what scale does to water heaters and fixtures, how often to flush a tank, and softener rules.",
      },
    ],
  },
  {
    heading: "Contractors and permits",
    guides: [
      {
        href: "/guides/is-my-contractor-quote-fair",
        icon: ClipboardList,
        title: "Is my contractor's quote fair?",
        blurb:
          "What an itemized quote should show, what California requires in the contract, red flags, and how to compare bids.",
      },
      {
        href: "/guides/contractor-deposit-rules-california",
        icon: ShieldCheck,
        title: "How much can a contractor ask for up front?",
        blurb:
          "The $1,000 or 10 percent down payment cap, when a written contract and a license are required, and the red flags.",
      },
      {
        href: "/guides/permits-orange-county",
        icon: FileCheck,
        title: "Building permits in Orange County",
        blurb:
          "Which home projects need a permit, with city examples, who should pull it, and what happens when work was done without one.",
      },
      {
        href: "/guides/hoa-coastal-commission-remodel-orange-county",
        icon: Waves,
        title: "HOA and coastal approvals",
        blurb:
          "HOA review and Coastal Commission permits for a remodel: your rights under Davis-Stirling, which cities issue coastal permits, and what is exempt.",
      },
    ],
  },
  {
    heading: "Seasons and safety",
    guides: [
      {
        href: "/guides/orange-county-home-maintenance-checklist",
        icon: CalendarDays,
        title: "Orange County home maintenance checklist",
        blurb:
          "Month by month for this climate, how often to do each job, and a link to the guide for every system in the house.",
      },
      {
        href: "/guides/santa-ana-wind-wildfire-home-prep",
        icon: Flame,
        title: "Santa Ana wind and wildfire prep",
        blurb:
          "Defensible space, Zone 0, which parts of the house to harden first, and what to do on a red flag day.",
      },
      {
        href: "/guides/termites-orange-county",
        icon: Bug,
        title: "Termites in Orange County",
        blurb:
          "Drywood vs subterranean, tenting vs local treatment, how to read an inspection report, and getting ready for a tent.",
      },
      {
        href: "/guides/earthquake-retrofit-orange-county",
        icon: Activity,
        title: "Earthquake retrofit in Orange County",
        blurb:
          "Which older raised-foundation houses need bolting and bracing, the Brace + Bolt grant, the insurance discount and the permit.",
      },
    ],
  },
  {
    heading: "Your home",
    guides: [
      {
        href: "/guides/new-homeowner-first-year-orange-county",
        icon: KeyRound,
        title: "New homeowner checklist",
        blurb:
          "Your first year in an Orange County home: shutoffs, the water heater, alarms, tax bills, Mello-Roos, HOA papers and permit records.",
      },
      {
        href: "/guides/orange-county-home-age",
        icon: History,
        title: "How old are Orange County homes?",
        blurb:
          "Census figures for all 34 cities: the share of homes built before 1980, the median year built, and what each era means for wiring, pipes, lead paint and asbestos.",
      },
      {
        href: "/guides/orange-county-home-rebates-2026",
        icon: PiggyBank,
        title: "Orange County home rebates in 2026",
        blurb:
          "SoCalGas, SCE, turf and water device rebates, the state heat pump programs and earthquake retrofit grants, each dated and reviewed every quarter.",
      },
    ],
  },
];

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

export const metadata: Metadata = {
  // The root layout's title template appends "| OakTend"; don't repeat it here.
  title: "Home maintenance guides",
  description:
    "Plain-English guides for Orange County homeowners: what repairs and remodels cost, leaks and pipes, permits, contractor rules, and seasonal maintenance.",
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
};

export default function GuidesIndex() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* One-crumb trail on the index itself: just Home > Guides, since
          Guides is the current page here. */}
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Guides" }]}
      />
      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }]}
        siteUrl={SITE_URL}
      />

      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
        Home maintenance guides
      </h1>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
        Plain-English answers for Orange County homeowners. No login
        required.
      </p>

      {SECTIONS.map((section) => (
        <section key={section.heading} className="mt-8">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            {section.heading}
          </h2>
          <ul className="mt-4 space-y-4">
            {section.guides.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="card block transition hover:border-bark-500 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="icon-chip" aria-hidden>
                      <g.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-stone-900 dark:text-stone-100">{g.title}</h3>
                      <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{g.blurb}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2 className="mt-10 text-lg font-bold text-stone-900 dark:text-stone-100">
        Have a quote in hand?
      </h2>
      <div className="mt-4">
        <Link
          href="/homeowner-signup?next=/quote-check"
          className="card block transition hover:border-bark-500 hover:shadow-md"
        >
          <div className="flex items-start gap-3">
            <span className="icon-chip" aria-hidden>
              <ScanSearch className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                Quote analyzer
              </h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
                Paste a contractor&apos;s quote and see if the price is fair.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}

import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import Logo from "@/components/Logo";
import SessionCta from "@/components/SessionCta";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import { LAUNCH_AREA_LABEL } from "@/lib/serviceArea";
import { cityPageCopy } from "@/lib/cityCopy";
import {
  isHomeownerPreview,
  PREVIEW_CITY_PROS_CARD_BODY,
  PREVIEW_CITY_PROS_CARD_TITLE,
} from "@/lib/previewMode";
import { ClipboardList, MessageSquare, Wrench, Gift } from "lucide-react";

// Shared shell for the two city landing pages (src/app/fountain-valley,
// src/app/huntington-beach): same structure and same value-prop cards, only
// the housing-stock paragraph and city name differ. Kept as one component
// rather than duplicated JSX so the two pages can't drift out of sync, the
// same way GuideCta is shared across the /guides pages.
//
// Schema.org: Service, not LocalBusiness. OakTend is an online service with
// no physical storefront in either city (the pros it connects homeowners to
// are the local businesses); claiming LocalBusiness here would be the same
// kind of overreach the /p/[id] pro pages explicitly avoid for a pro's own
// site. Service + areaServed is the honest match for "software available to
// homeowners in this city."
//
// Session-aware header/hero CTA: same reasoning as src/app/guides/layout.tsx
// - a signed-in visitor shouldn't be pitched "get started free" again.
//
// BOTH CITY PAGES ARE NOW STATIC. This component used to call
// supabase.auth.getUser() here, and <GuideCta /> below read the session again,
// which is what kept /fountain-valley and /huntington-beach off static
// generation. The old note in this spot named the fix - "a small client
// component that resolves the session in the browser and renders the CTA, used
// here and in GuideCta" - and that component now exists
// (src/components/SessionCta.tsx, which GuideCta shares). Both CTAs below are
// it, nothing in this tree reads cookies() or the session, and the two pages
// carry `export const revalidate`.
//
// The trade, stated plainly and argued in SessionCta.tsx: a signed-in visitor
// sees "Get started free" until hydration swaps it. In exchange these two
// pages ship from the CDN instead of waking a serverless function and waiting
// on a Supabase auth round trip before the first byte.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// The title/description/headline the three city routes share live in
// src/lib/cityCopy.ts (pure strings, unit-tested against both settings of the
// preview flag). Re-exported here so the page files can keep importing
// everything city-page-shaped from one module.
export { cityPageCopy };

function valueCards(): {
  icon: typeof ClipboardList;
  title: string;
  body: string;
}[] {
  const preview = isHomeownerPreview();
  return [
    {
      icon: ClipboardList,
      title: "A maintenance plan built around your home",
      body: "OakTend turns your home's age, systems, and history into a plan of what to check and when, not a generic checklist.",
    },
    {
      icon: MessageSquare,
      title: "Ask OakTend anything about your house",
      body: "Get answers about your systems, their ages, and what's likely to need attention next, any time.",
    },
    // The only card that changes. "every pro who applies shows up in one
    // place" describes a pro network that is closed right now; the preview
    // version describes what actually happens instead. Same icon, same card,
    // same position, so the grid is unchanged either way.
    preview
      ? {
          icon: Wrench,
          title: PREVIEW_CITY_PROS_CARD_TITLE,
          body: PREVIEW_CITY_PROS_CARD_BODY,
        }
      : {
          icon: Wrench,
          title: "Local pros, no bidding war",
          body: "When a pro lists a California license, we check it against the state's public CSLB database and show the result. Every pro who applies shows up in one place, so you compare and choose instead of sorting through a pile of quotes.",
        },
    {
      icon: Gift,
      title: "Free to start",
      body: "Free during our preview, no card needed.",
    },
  ];
}

const GUIDE_LINKS = [
  {
    href: "/guides/slab-leak-signs",
    title: "Slab leak signs",
    blurb: "How to spot one early in an older slab-foundation home.",
  },
  {
    href: "/guides/socal-home-maintenance-calendar",
    title: "SoCal home maintenance calendar",
    blurb: "A month-by-month calendar built for the coastal SoCal climate.",
  },
  {
    href: "/guides/water-heater-replacement-cost",
    title: "Water heater replacement cost",
    blurb: "Typical price range and when a repair is the smarter call.",
  },
  {
    href: "/guides/hvac-replacement-cost",
    title: "HVAC replacement cost",
    blurb: "Typical price range and central AC vs. heat pump.",
  },
];

export function buildCityServiceJsonLd(city: string, siteUrl: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Home maintenance management",
    provider: {
      "@type": "Organization",
      name: "OakTend",
      url: siteUrl,
    },
    areaServed: {
      "@type": "City",
      name: `${city}, California`,
    },
    url: `${siteUrl}${path}`,
  };
}

export default function CityLandingPage({
  city,
  housingParagraph,
}: {
  city: string;
  housingParagraph: string;
}) {
  const copy = cityPageCopy(city);
  const VALUE = valueCards();
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 pt-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100"
        >
          <Logo className="h-6 w-6 text-bark-700 dark:text-stone-400" /> OakTend
        </Link>
        <SessionCta signedOutHref="/homeowner-signup" />
      </header>

      <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
        {/* Breadcrumb trail. Not the shared <Breadcrumbs> component: that one
            separates with a chevron and starts at "Home", and these pages
            wanted plain "/" separators and the brand name, which is also what
            Google renders in a result's breadcrumb line.

            "Orange County" links to the county hub (src/app/oc/page.tsx),
            which lists every city by area. It was plain text while /oc was a
            404; the hub exists now, so the crumb is a real way up a level for
            a reader and a crawler both.

            Small, muted, one line: same text-sm stone-500 the site uses for
            every secondary link (see the guides footer), so it sits above the
            hero without competing with it at any width. */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-stone-500 dark:text-stone-400">
          <Link
            href="/"
            className="hover:text-bark-700 hover:underline dark:hover:text-stone-300"
          >
            OakTend
          </Link>
          <span aria-hidden="true"> / </span>
          <Link
            href="/oc"
            className="hover:text-bark-700 hover:underline dark:hover:text-stone-300"
          >
            Orange County
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-stone-700 dark:text-stone-300">
            {city}
          </span>
        </nav>
        {/* Matching BreadcrumbList. The last item carries no URL, the same
            current-page-has-no-item convention the guides' trails use. */}
        <BreadcrumbJsonLd
          items={[
            { name: "OakTend", href: "/" },
            { name: "Orange County", href: "/oc" },
            { name: city },
          ]}
          siteUrl={SITE_URL}
        />

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
            {copy.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-stone-600 dark:text-stone-300">
            {housingParagraph}
          </p>
          {/* This is a per-city page, so say out loud that the city is not the
              whole service area. OakTend serves the entire county, and a reader
              who landed here from a city search should not conclude the
              neighboring town is unserved. */}
          <p className="mx-auto mt-3 max-w-xl text-sm text-stone-500 dark:text-stone-400">
            OakTend serves {LAUNCH_AREA_LABEL}, California, not just {city}.
          </p>
          <SessionCta
            signedOutHref="/homeowner-signup"
            className="btn-primary mt-6 px-6 py-3 text-base shadow-md"
          />
        </div>

        <section className="mt-14">
          <h2 className="text-center text-xl font-semibold text-stone-900 dark:text-stone-100">
            What OakTend does
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {VALUE.map((v) => (
              <div key={v.title} className="card">
                <div className="icon-chip" aria-hidden>
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-stone-900 dark:text-stone-100">
                  {v.title}
                </h3>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-center text-xl font-semibold text-stone-900 dark:text-stone-100">
            Guides for {city} homeowners
          </h2>
          <ul className="mt-6 space-y-3">
            {GUIDE_LINKS.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="card block transition hover:border-bark-500 hover:shadow-md"
                >
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">{g.title}</h3>
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{g.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <GuideCta />
      </main>

      <footer className="mx-auto max-w-2xl border-t border-stone-200 px-6 py-6 text-center dark:border-white/10">
        <p className="inline-flex w-full items-center justify-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <Logo className="h-4 w-4 text-bark-700 dark:text-stone-400" /> OakTend · Your home, looked after
        </p>
        <p className="mt-2 text-xs">
          <Link
            href="/guides"
            className="text-stone-500 hover:text-bark-700 hover:underline dark:text-stone-400 dark:hover:text-stone-300"
          >
            All guides
          </Link>
        </p>
      </footer>
    </div>
  );
}

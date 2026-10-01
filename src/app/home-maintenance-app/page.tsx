import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarCheck,
  FolderOpen,
  ScanLine,
  MessageSquare,
  CloudSun,
  PiggyBank,
} from "lucide-react";
import Logo from "@/components/Logo";
import SessionCta from "@/components/SessionCta";
import StructuredData from "@/components/StructuredData";
import { LEGAL_LINKS } from "@/lib/legal";
import { isHomeownerPreview } from "@/lib/previewMode";

// Landing page for the search "home maintenance app". Public (see the
// middleware allowlist in src/lib/supabase/middleware.ts) and in the sitemap.
//
// EVERY FEATURE HERE IS ONE THE APP SHIPS TODAY, checked against the code on
// 2026-09-30:
//   - plan + reminders: the maintenance plan and the "reminders" notification
//     channel (src/app/(app)/account/notifications/channels.ts)
//   - home record: property-record pre-fill (home page FAQ), /documents,
//     AI document reads and inspection imports (src/app/pricing/page.tsx)
//   - Walk your home + health score: src/app/(app)/walkthrough/page.tsx
//   - Ask OakTend: answers from the home's own record (src/app/page.tsx)
//   - weather and recall alerts: src/app/api/home-alerts/route.ts
//     (Open-Meteo freeze/heat, CPSC recall matches)
//   - forecast, quote check, value estimate: src/app/(app)/forecast,
//     quote-check, value
// During the preview every one of them is free (hasPlus() is true for every
// homeowner, src/lib/subscription.ts). No price is printed: /pricing prints
// none during the preview either.
//
// NO PRO CLAIM in preview: the pro network is closed (src/lib/previewMode.ts),
// so the one answer about pros says so.
//
// Each fact once: local guides, the city list and the app comparison are
// linked, not repeated.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const PATH = "/home-maintenance-app";
const CANONICAL = `${SITE_URL}${PATH}`;

// Static: nothing here reads cookies, headers or the database. SessionCta
// resolves the session in the browser (see src/app/guides/layout.tsx).
export const revalidate = 3600;

// 47 characters. `absolute` so the layout's " | OakTend" is not added: the
// brand already leads.
const TITLE = "OakTend: Home Maintenance App for Orange County";
const DESCRIPTION =
  "OakTend is a free home maintenance app for Orange County homeowners: a plan for your house, reminders, weather and recall alerts, and your records.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "OakTend",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "A maintenance plan for your house",
    body: "Built from your home's age and systems, with a reminder when a task or seasonal check is due.",
  },
  {
    icon: FolderOpen,
    title: "Your home's records in one place",
    body: "Year built and size come from public property records when we have them. Keep photos, documents and warranties together, and let OakTend read them for you.",
  },
  {
    icon: ScanLine,
    title: "Walk your home",
    body: "Photograph the label on each system. OakTend reads it, you confirm, and you see your home health score.",
  },
  {
    icon: MessageSquare,
    title: "Ask OakTend",
    body: "Ask about your house and get an answer from its own record: what's in it, how old each thing is, and what's been done.",
  },
  {
    icon: CloudSun,
    title: "Weather and recall alerts",
    body: "Freeze and heat warnings for your home's systems, and safety recall matches for the appliance brands you add.",
  },
  {
    icon: PiggyBank,
    title: "Costs before they happen",
    body: "A 10-year cost forecast with a monthly amount to set aside, a check on whether a quote is fair, and a home value estimate.",
  },
];

const linkClass =
  "text-bark-700 underline hover:no-underline dark:text-stone-300";

function faqItems(): { q: string; a: string; node?: React.ReactNode }[] {
  const preview = isHomeownerPreview();
  return [
    {
      q: "Is OakTend free?",
      a: preview
        ? "Yes. Every feature is free during our preview and no card is needed. We'll publish pricing before anything is ever charged."
        : "Your first home is free, no card needed. OakTend Plus is optional.",
      node: preview ? undefined : (
        <>
          Your first home is free, no card needed. OakTend Plus is optional:{" "}
          <Link href="/pricing" className={linkClass}>
            see pricing
          </Link>
          .
        </>
      ),
    },
    {
      q: "Do I need to download anything?",
      a: "No. OakTend works in the browser on your phone or computer. Sign up, add your address, and your plan starts from there.",
    },
    {
      q: "Where does OakTend work?",
      a: "Homes in Orange County, California, in every city in the county.",
      node: (
        <>
          Homes in Orange County, California, in every city in the county.
          Find yours on the{" "}
          <Link href="/oc" className={linkClass}>
            Orange County page
          </Link>
          .
        </>
      ),
    },
    {
      q: "Can OakTend find me a contractor?",
      a: preview
        ? "Not yet. Our pro network isn't open. You can write a job down and it is saved with your home's record, and our team may look for a local pro by hand, but we can't promise to find one. For anything urgent, call a local licensed company."
        : "Yes. Post the job once and OakTend fills in your home's details, so local pros can quote it. Your contact info stays private until you pick one.",
    },
    {
      q: "What do you do with my data?",
      a: "We use it to run OakTend: reminders, alerts and answers about your house. We never sell your personal information. The details are in our privacy policy.",
      node: (
        <>
          We use it to run OakTend: reminders, alerts and answers about your
          house. We never sell your personal information. The details are in
          our{" "}
          <Link href="/privacy" className={linkClass}>
            privacy policy
          </Link>
          .
        </>
      ),
    },
  ];
}

function jsonLd(faq: { q: string; a: string }[]) {
  const app: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "OakTend",
    url: CANONICAL,
    description: DESCRIPTION,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web browser",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Orange County, California",
    },
    publisher: { "@id": `${SITE_URL}#organization` },
  };
  // A price only while it is true for everyone: during the preview the whole
  // app is free. Outside it, no offer here; /pricing is the place for that.
  if (isHomeownerPreview()) {
    app.offers = {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    };
  }
  return [
    app,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

export default function HomeMaintenanceAppPage() {
  const faq = faqItems();
  const preview = isHomeownerPreview();

  return (
    <div className="min-h-screen">
      <StructuredData data={jsonLd(faq)} />

      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 pt-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100"
        >
          <Logo className="h-6 w-6 text-bark-700 dark:text-stone-400" /> OakTend
        </Link>
        <SessionCta signedOutHref="/homeowner-signup" />
      </header>

      <main id="main" className="mx-auto max-w-2xl px-6 pb-16 pt-10">
        <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
          OakTend: the home maintenance app for Orange County homeowners
        </h1>
        <p className="mt-3 leading-relaxed text-stone-600 dark:text-stone-300">
          Add your home once. OakTend builds a maintenance plan around its age
          and systems, reminds you when something is due, and keeps the
          records you&apos;d otherwise lose in a drawer.
        </p>
        <Link
          href="/homeowner-signup"
          data-track="app_page_get_started"
          className="btn-primary mt-6 px-6 py-3 text-base"
        >
          Get started free
        </Link>
        <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
          {preview ? "Free during our preview. " : ""}No card needed. Works in
          your phone or computer browser.
        </p>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What OakTend does
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f.title} className="card">
                <span className="icon-chip" aria-hidden>
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-semibold text-stone-900 dark:text-stone-100">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {f.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Made for Orange County
          </h2>
          <p className="mt-2 leading-relaxed text-stone-700 dark:text-stone-300">
            OakTend is only for homes in Orange County, so the advice around
            it is local too. Our free{" "}
            <Link href="/guides" className={linkClass}>
              home guides
            </Link>{" "}
            cover things like hard water, slab leaks and Santa Ana winds, and
            the{" "}
            <Link
              href="/guides/orange-county-home-maintenance-checklist"
              className={linkClass}
            >
              Orange County maintenance checklist
            </Link>{" "}
            lays out the year month by month.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How does it compare?
          </h2>
          <p className="mt-2 leading-relaxed text-stone-700 dark:text-stone-300">
            We compared OakTend with HomeBeacon, HomeZada, Homer, Oply and
            five others on price, platforms and who each one suits, with
            every fact sourced:{" "}
            <Link href="/guides/best-home-maintenance-apps" className={linkClass}>
              best home maintenance apps in 2026
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Questions
          </h2>
          <div className="mt-4 space-y-3">
            {faq.map((item) => (
              <div key={item.q} className="card">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  {item.q}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {item.node ?? item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-bark-100 bg-bark-50 p-6 text-center dark:border-bark-700 dark:bg-bark-700/20">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Start with your address
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            It takes about 30 seconds, and you can fill in the rest later.
          </p>
          <Link
            href="/homeowner-signup"
            data-track="app_page_get_started"
            className="btn-primary mt-4 px-6 py-3 text-base"
          >
            Get started free
          </Link>
        </section>
      </main>

      <footer className="mx-auto max-w-2xl border-t border-stone-200 px-6 py-6 text-center dark:border-white/10">
        <p className="inline-flex w-full items-center justify-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
          <Logo className="h-4 w-4 text-bark-700 dark:text-stone-400" /> OakTend · Your home looked after
        </p>
        <p className="mt-2 text-xs">
          <Link
            href="/guides"
            className="text-stone-600 hover:text-bark-700 hover:underline dark:text-stone-300 dark:hover:text-stone-100"
          >
            All guides
          </Link>
          {LEGAL_LINKS.map((link) => (
            <span key={link.href}>
              {" "}
              ·{" "}
              <Link
                href={link.href}
                className="text-stone-600 hover:text-bark-700 hover:underline dark:text-stone-300 dark:hover:text-stone-100"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </p>
      </footer>
    </div>
  );
}

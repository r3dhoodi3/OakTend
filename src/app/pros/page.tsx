import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { hasAuthCookie } from "@/lib/authCookie";
import { getVerifiedUser } from "@/lib/auth";
import { getSides, isContractor } from "@/lib/contractor";
import { isHomeownerPreview } from "@/lib/previewMode";
import { homeownerLanding } from "@/lib/previewModeServer";
import ProsComingSoon from "@/components/pro/ProsComingSoon";
import {
  FOUNDER,
  COLD_START_FREE_ALERTS,
  PRO_PLAN,
} from "@/lib/constants";
import { LAUNCH_AREA_LABEL } from "@/lib/serviceArea";
import { LEGAL, LEGAL_LINKS } from "@/lib/legal";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
import BillingLegalLine from "@/components/BillingLegalLine";
import ThemeToggle from "@/components/ThemeToggle";
import ProDemoPlayerLazy from "@/components/ProDemoPlayerLazy";
import Band from "@/components/Band";
import {
  Tag,
  MousePointerClick,
  Hourglass,
  Zap,
  Ban,
  Globe,
  CalendarDays,
  Contact,
} from "lucide-react";

// Inline check mark. Emoji checks (✔️/✅) render differently per OS; one SVG
// keeps every check on this page identical. Color comes from text-green-700
// via currentColor.
function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

// The success fee (2026-09-10 model): no shared constant lives in src/lib
// for these yet, so every page that states them defines its own literal with
// a comment, same as src/app/pro-terms/page.tsx and
// src/app/contractor-signup/layout.tsx do. Mirrors the sentence in
// src/app/api/pro-ask/route.ts's system prompt and src/app/pro/help/HelpView.tsx.
const SUCCESS_FEE_PCT = 5;
const SUCCESS_FEE_MIN = 15;
const SUCCESS_FEE_CAP = 1000;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Title/description held once so metadata.title, openGraph, and twitter
// can't drift from each other; the OG image at ./opengraph-image.tsx keeps
// its own literal copy of the title (see that file's comment for why).
//
// PREVIEW MODE (src/lib/previewMode.ts) swaps both strings. The non-preview
// pair below is byte-identical to what it always was; the preview pair makes
// none of the claims the lawyer review is about - lead pricing, ghost leads,
// verified badges - because this description is what shows in a search result
// and in a link preview while the pro side is closed, and a closed door must
// not advertise. Evaluated at module scope, which is correct for a
// NEXT_PUBLIC_ variable: it is inlined at build time and flipping it already
// requires a redeploy.
const TITLE = isHomeownerPreview()
  ? "OakTend for Pros: coming soon"
  : "OakTend for Pros: real local leads, honest pricing";
const DESCRIPTION = isHomeownerPreview()
  ? "OakTend for Pros opens after our homeowner preview. Leave your email and we'll tell you first."
  : `Browse local jobs free and apply for free. Pay a ${SUCCESS_FEE_PCT}% success fee only when a homeowner hires you, plus free license-verified badges for California pros.`;
const CANONICAL = `${SITE_URL}/pros`;

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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Marketing front door for contractors. Every claim here is a real product
// behavior (free to apply and quote, a 5% success fee only on hire, free
// license verification), so keep copy in sync with /pro, /pro/help, and the
// pro-ask system prompt (src/app/api/pro-ask/route.ts) if the money model
// changes.
//
// STAYS DYNAMIC, and unlike /guides and the two city pages (both of which just
// moved to static, see src/components/SessionCta.tsx) it cannot be made static
// without changing what the page DOES. Two independent per-request reads are
// load-bearing here:
//
//   1. the session, to bounce a signed-in contractor straight to /pro. This is
//      not a label like the guides header was - it is a redirect, and
//      prerendering it would land contractors on the marketing pitch instead
//      of their leads (or flash the pitch and then bounce, if the redirect
//      moved to the client).
//   2. searchParams.ref, which threads a referral code into the signup link.
//      Reading searchParams in a page opts the route out of prerendering on
//      its own, so even removing (1) would leave this route dynamic until the
//      whole CTA moved into a client component reading useSearchParams.
//
// So no revalidate export: it would be a no-op against those reads, and
// force-static would silently break the redirect rather than fail loudly.
//
// WHAT DID GET CHEAPER. For an anonymous visitor - the overwhelming majority
// here - this now does no auth work whatsoever: the cookie-name check below
// answers "no session" without building a Supabase client at all. (Even the
// old path made no network call for them, since GoTrue answers a getUser()
// with no session cookie locally, but it still constructed a client and drove
// its initialize/lock machinery for an answer that was already knowable.) For
// a SIGNED-IN visitor it used to cost two full auth round trips (this page's
// own auth.getUser(), then a second one inside getCurrentContractor() under
// getSides()) plus a properties count query. It now costs one:
//   - getVerifiedUser() is the same live check, React-cache()-wrapped, so
//     getCurrentContractor() underneath shares this request's single
//     verification instead of opening its own.
//   - isContractor() replaces (await getSides()).hasPro. They answer the
//     identical question off the identical company row (getSides derives
//     hasPro as `contractor !== null`), but getSides ALSO runs hasHomeSide()'s
//     `count` over properties, and nothing on this page asks about homes.
export default async function ProsLanding(props: {
  searchParams?: Promise<{ ref?: string }>;
}) {
  // PREVIEW MODE: the contractor side is closed, so this marketing page is
  // replaced outright by the shared coming-soon door. FIRST statement in the
  // function on purpose - before the session read, before the redirect to
  // /pro, before searchParams. A contractor who lands here in preview must
  // never be bounced into a shell that is itself closed, and ?ref= threading
  // into a signup page that does not accept signups is meaningless.
  if (isHomeownerPreview()) {
    // A signed-in homeowner arrives here from "Switch to your business" in
    // preview (src/lib/sideActions.ts), so the door needs its way back: the
    // "Go to your homeowner account" button and the logo/back links point at
    // their homeowner side. Cookie names first, then the real check, same as
    // below; the cookie read is guarded because this page also renders in
    // unit tests outside a request scope, where it must behave as signed-out.
    let previewUser = null;
    try {
      const signedIn = hasAuthCookie((await cookies()).getAll());
      previewUser = signedIn ? await getVerifiedUser() : null;
    } catch {
      previewUser = null;
    }
    if (previewUser) {
      const sides = await getSides();
      return (
        <ProsComingSoon
          source="pros"
          homeownerHref={homeownerLanding(sides)}
          hasHome={sides.hasHome}
        />
      );
    }
    return <ProsComingSoon source="pros" />;
  }

  const searchParams = await props.searchParams;
  // Cookie names first (hasAuthCookie, src/lib/authCookie.ts): a request with
  // no Supabase auth cookie has no session to find, so it skips the client and
  // the auth call entirely. Same short-circuit, same reasoning, as the landing
  // page - and like there, it can only skip work, never grant anything.
  const signedInPossible = hasAuthCookie((await cookies()).getAll());
  const user = signedInPossible ? await getVerifiedUser() : null;

  // Pros go straight to their leads. Everyone else, including signed-in
  // homeowners, can read the pitch: bouncing them to the dashboard made this
  // page look like it demanded an account before showing anything. Keyed on a
  // company row, not the role stamp - someone whose preferred side is
  // contractor but who never finished setup should read the pitch, not be
  // thrown into an empty /pro.
  if (user && (await isContractor())) {
    redirect("/pro");
  }

  // Referral threading: a ?ref=CODE on this page rides the sign-up CTA into
  // /contractor-signup, which carries it on to /pro/onboarding (the page that
  // actually redeems it). Trimmed and URL-encoded; nothing else changes here.
  const ref =
    typeof searchParams?.ref === "string" && searchParams.ref.trim()
      ? searchParams.ref.trim()
      : null;
  const signupHref = ref
    ? `/contractor-signup?ref=${encodeURIComponent(ref)}`
    : "/contractor-signup";

  const PROMISES = [
    {
      icon: <Tag className="h-5 w-5" />,
      title: "No bidding wars, ever",
      body: `Every job has one flat ${SUCCESS_FEE_PCT}% success fee, only charged if a homeowner hires you. Nothing to bid on and no other pro's price to see or beat.`,
    },
    {
      icon: <MousePointerClick className="h-5 w-5" />,
      title: "You only pay when you're hired",
      body: `Browse and apply to every job for free. The only charge is a ${SUCCESS_FEE_PCT}% success fee, with a $${SUCCESS_FEE_MIN} minimum and a $${SUCCESS_FEE_CAP} cap, and it's only charged if you're hired.`,
    },
    {
      icon: <Hourglass className="h-5 w-5" />,
      title: "Every application is seen",
      body: `Every pro who applies gets seen by the homeowner, who compares everyone inside OakTend and picks. Applying early still helps you stand out.`,
    },
    {
      icon: <Zap className="h-5 w-5" />,
      // COLD START: while COLD_START_FREE_ALERTS is on, every pro gets these
      // alerts free, worded the same as the perk on /pro/plus so the two
      // pages never contradict each other. Title flips with the flag so it
      // can never say "free" while the body says "membership perk".
      title: COLD_START_FREE_ALERTS
        ? "Instant job alerts, free for now"
        : "Instant job alerts",
      body:
        "The moment a job posts in your trades and area, we send you an email and a phone alert right away." +
        (COLD_START_FREE_ALERTS
          ? " Free for every pro while OakTend is new. Later, a Pro membership perk."
          : " A Pro membership perk."),
    },
    {
      icon: <Check className="h-5 w-5 text-green-700 dark:text-green-400" />,
      title: "Free license verification",
      body: "We check your CSLB number against the state's public database and show homeowners a verified badge on your profile. Free, no membership needed.",
    },
    {
      icon: <Ban className="h-5 w-5" />,
      title: "No subscription required",
      body: "Applying and quoting cost nothing, so there's no subscription required to start. An optional Pro membership adds perks like priority support and an AI back office, but it never changes which jobs you can see or apply to, and you can cancel it any time, no penalty.",
    },
  ];

  const STEPS = [
    { n: "1", text: "Set up your company in about a minute." },
    { n: "2", text: "Browse open jobs and apply for free." },
    { n: "3", text: "Only pay the success fee if you're hired." },
  ];

  return (
    <main id="main" className="pb-16">
      {/* Warm band wraps header and hero: a single flat fill, oaktend-50 in
          light and stone-900 in dark (matching the body), no gradient. */}
      <div className="bg-oaktend-50 dark:bg-stone-900">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-6 sm:pb-20">
          <header className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100"
            >
              <Logo className="h-6 w-6 text-bark-700 dark:text-stone-400" /> OakTend
            </Link>
            {/* Theme switch + bordered cross-link, mirroring the landing
                page's header exactly so the two doors read as one system. */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/"
                className="inline-flex min-h-11 items-center whitespace-nowrap rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:border-bark-500 hover:text-bark-700 sm:min-h-0 dark:border-white/10 dark:text-stone-300 dark:hover:border-bark-500 dark:hover:text-stone-300"
              >
                {/* Mirrors the landing header's "For Pros" / "OakTend for
                    Pros" pair: short label on a phone, full wording from sm
                    up, and never wrapping to a second line. */}
                <span className="sm:hidden">Homeowners</span>
                <span className="hidden sm:inline">For Homeowners</span>
              </Link>
              {/* Sign in, rightmost. Solid bark, the same button the
                  homeowner landing puts here (2026-09-22), so a returning pro
                  finds the door in the same place on either front page. */}
              <Link
                href="/signin"
                className="whitespace-nowrap rounded-lg bg-bark-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-bark-700 dark:bg-bark-500 dark:hover:bg-bark-600"
              >
                Sign in
              </Link>
            </div>
          </header>

          {/* Hero */}
          {/* HERO ENTRANCE: the same staggered rise as the homeowner landing
              (hero-rise in tailwind.config.ts, held until the web font lands
              by heroFontsInit in layout.tsx), so the two front doors read as
              one system. */}
          <div className="mt-14 flex flex-col items-center pb-4 text-center">
            <h1 className="hero-rise max-w-2xl text-5xl font-semibold tracking-tight text-stone-900 motion-safe:animate-hero-rise sm:text-6xl dark:text-stone-100">
              Real local leads, honest pricing
            </h1>
            <p className="hero-rise mt-5 max-w-xl text-lg text-stone-600 motion-safe:animate-hero-rise motion-safe:[animation-delay:90ms] dark:text-stone-400">
              Other sites charge you for leads you didn&apos;t ask for and that
              other pros already have. On OakTend applying is always free,
              and you only ever pay if you win the job.
            </p>
            <p className="hero-rise mt-2 max-w-xl text-sm text-stone-500 motion-safe:animate-hero-rise motion-safe:[animation-delay:180ms] dark:text-stone-400">
              Free to apply and quote. You pay a {SUCCESS_FEE_PCT}% success
              fee, with a ${SUCCESS_FEE_MIN} minimum and a $
              {SUCCESS_FEE_CAP} cap, only when a homeowner hires you through
              OakTend.
            </p>
            <Link
              href={signupHref}
              className="btn-primary hero-rise mt-8 px-6 py-3 text-base shadow-md motion-safe:animate-hero-rise motion-safe:[animation-delay:270ms]"
            >
              Create your pro account
            </Link>
            {/* No "Already have an account? Sign in" here anymore: the
                header "Sign in" button (top-right) is the single, more
                discoverable door for returning users - the same move the
                homeowner landing made. */}
            {/* The two small lines share one delay: they read as a pair. */}
            <p className="hero-rise mt-4 text-sm text-stone-500 motion-safe:animate-hero-rise motion-safe:[animation-delay:450ms] dark:text-stone-400">
              Serving {LAUNCH_AREA_LABEL}
            </p>
            <p className="hero-rise mt-1 text-sm text-stone-500 motion-safe:animate-hero-rise motion-safe:[animation-delay:450ms] dark:text-stone-400">
              Cover the whole county or just the cities you work in.
            </p>
          </div>
        </div>
      </div>

      {/* Pro-side click-to-play demo, the contractor sibling of the homeowner
          hero video. Sits right after the warm band, mirroring how the
          landing page mounts its player: through a lazy wrapper, so the
          ~2,800-line component loads as its own chunk after hydration
          instead of riding along in this page's first-load JS. */}
      <Band tone="dark">
        <section>
          {/* Title and one honest line beside the player, mirroring the
              homeowner landing: what the demo is, and that it is a
              walkthrough of the real screens rather than a recording of a
              real job. Light text: this section always sits on a dark band. */}
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
            <div className="text-center lg:-mt-10 lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-wide text-stone-400">
                Product demo
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white [text-wrap:balance] sm:text-3xl">
                See the pro side in 30 seconds
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-300 sm:text-base">
                A walkthrough of the real app: see the jobs near you, apply
                for free, message the homeowner, and get hired. Built from the
                actual screens, with a sample job.
              </p>
            </div>
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <ProDemoPlayerLazy />
            </div>
          </div>
        </section>
      </Band>

      <Band tone="white">
      {/* How you pay: the whole money model, top billing, side by side. This
          used to be the ghost-protection / credit-back guarantee grid; that
          model (and its wallet-credit mechanics) was retired 2026-09-10 for
          the flat success fee below. See src/app/api/pro-ask/route.ts's
          system prompt and src/app/pro/help/HelpView.tsx for the same facts
          stated the same way. */}
      <section>
      <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
        How you pay
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-bark-100 bg-bark-50 p-6 text-center shadow-sm dark:border-bark-700 dark:bg-bark-700/20">
          <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            Free to apply and quote
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-stone-600 dark:text-stone-400">
            Applying, quoting, and messaging a homeowner never cost anything.
            No subscription required to start.
          </p>
        </section>
        <section className="rounded-2xl border border-bark-100 bg-bark-50 p-6 text-center shadow-sm dark:border-bark-700 dark:bg-bark-700/20">
          <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            Pay only when you&apos;re hired
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-stone-600 dark:text-stone-400">
            The only charge is a {SUCCESS_FEE_PCT}% success fee, with a $
            {SUCCESS_FEE_MIN} minimum and a ${SUCCESS_FEE_CAP} cap. It&apos;s
            only charged once a homeowner hires you through OakTend, never
            for a lead you didn&apos;t win.
          </p>
        </section>
      </div>
      <p className="mx-auto mt-4 max-w-xl text-center text-xs text-stone-500 dark:text-stone-400">
        Pro membership is optional: ${PRO_PLAN.monthly.toFixed(2)} a month or
        ${PRO_PLAN.yearly.toFixed(2)} a year, with a {PRO_PLAN.trialDays}-day
        free trial. It never changes whether you can apply to a job or what
        the success fee costs.
      </p>

      </section>
      </Band>

      <Band tone="warm">
      {/* Trust band: a real reachable team is the trust signal a national
          lead platform can never offer. Light background since 2026-09-22 -
          the dark rounded card it used to be is now the band system's job. */}
      <section className="text-center">
        <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
          Real people, real answers
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-stone-600 dark:text-stone-400">
          Message us and a real person on our team will answer.
        </p>
        {FOUNDER.name && FOUNDER.cellPhone && (
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Cell: {FOUNDER.cellPhone}
          </p>
        )}
        {/* Business line (LEGAL.businessPhone, src/lib/legal.ts), not the
            founder's personal cell above: always shown, since it's the
            number OakTend gives out publicly. */}
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Phone:{" "}
          <a
            href={`tel:${LEGAL.businessPhone.replace(/[^\d+]/g, "")}`}
            className="hover:underline"
          >
            {LEGAL.businessPhone}
          </a>
        </p>
        {/* The in-app help page requires an onboarded contractor account, so
            it is exactly wrong for the signed-out prospective pros this page
            targets. Contact form needs no session and no owner-fillable
            fields, unlike the old mailto/tel here, so it's always shown - see
            src/app/contact/page.tsx. The cell-phone line above is still
            owner-fillable and still drops out entirely when blank. */}
        <Link
          href="/contact"
          className="mt-4 inline-block text-sm text-bark-700 hover:underline dark:text-stone-300"
        >
          Questions? Contact us →
        </Link>
      </section>

      </Band>

      <Band tone="white">
      {/* The promises */}
      <section className="grid gap-4 sm:grid-cols-2">
        {PROMISES.map((p) => (
          <div key={p.title} className="card">
            <div className="icon-chip" aria-hidden>
              {p.icon}
            </div>
            <h2 className="mt-3 font-semibold text-stone-900 dark:text-stone-100">{p.title}</h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{p.body}</p>
          </div>
        ))}
      </section>

      {/* Flat trade photo, same framed treatment as the landing page.
          Not priority - well below the fold. */}
      <div className="mt-16 overflow-hidden rounded-xl border border-stone-200 dark:border-white/10">
        <Image
          src="/photos/painter-undercoating-wall.jpg"
          alt="A painter prepping and undercoating a bright wall"
          width={1600}
          height={1068}
          sizes="(min-width: 768px) 48rem, 100vw"
          className="h-auto w-full object-cover"
        />
      </div>

      {/* Single-player value: worth having even before the first job comes
          in. Every item here is verified against the shipped feature, and
          the AI back office is labeled honestly as a Pro membership perk
          rather than lumped in as free. */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Worth it even before your first job
        </h2>
        <div className="mx-auto mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
          <div className="card">
            <div className="icon-chip" aria-hidden>
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold text-stone-900 dark:text-stone-100">
              A free public profile page
            </h3>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Your own shareable page with your services and real OakTend
              reviews, built to rank on Google. Every pro gets one, free, no
              membership required.
            </p>
          </div>
          <div className="card">
            <div className="icon-chip" aria-hidden>
              <Check className="h-5 w-5 text-green-700 dark:text-green-400" />
            </div>
            <h3 className="mt-3 font-semibold text-stone-900 dark:text-stone-100">
              A free CSLB-verified badge
            </h3>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              We check your license number against the state database and
              show a verified badge on your public profile page. Free, not a
              membership perk.
            </p>
          </div>
          <div className="card">
            <div className="icon-chip" aria-hidden>
              <CalendarDays className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold text-stone-900 dark:text-stone-100">
              A compliance calendar
            </h3>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Upload your license and insurance once and get a heads-up
              before either one expires. Free for every pro.
            </p>
          </div>
          <div className="card">
            <div className="icon-chip" aria-hidden>
              <Contact className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold text-stone-900 dark:text-stone-100">
              A simple CRM
            </h3>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Track every lead through quoted, won, and lost, with notes and
              a follow-up date. Free for every pro.
            </p>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-md text-center text-sm text-stone-500 dark:text-stone-400">
          A Pro membership adds an AI back office on top: draft estimates,
          invoices, follow-up messages, review replies, and overdue-invoice
          reminders in seconds. New pros try Pro free for {PRO_PLAN.trialDays}{" "}
          days, then it is ${PRO_PLAN.monthly.toFixed(2)} a month, cancel
          anytime.{" "}
          <Link href="/pro/plus" className="text-bark-700 hover:underline dark:text-stone-300">
            See what&apos;s included
          </Link>
          .
        </p>
        {/* Cal. Bus. & Prof. Code 17538: legal name, address, and a route to
            the refund policy, shown before purchase. */}
        <BillingLegalLine className="mx-auto mt-2 max-w-md text-center text-sm text-stone-500 dark:text-stone-400" />
      </section>

      {/* Flat trade photo break before the steps, mirroring how the landing
          page pairs the roofer shot with its how-it-works block. */}
      <div className="mt-16 overflow-hidden rounded-xl border border-stone-200 dark:border-white/10">
        <Image
          src="/photos/roofer-installing-shingles.jpg"
          alt="A roofer installing asphalt shingles on a home"
          width={1600}
          height={1067}
          sizes="(min-width: 768px) 48rem, 100vw"
          className="h-auto w-full object-cover"
        />
      </div>

      {/* How it works */}
      <section className="mt-12">
        <h2 className="text-center text-2xl font-semibold text-stone-900 dark:text-stone-100">
          How it works
        </h2>
        <ol className="mx-auto mt-6 max-w-md space-y-4">
          {STEPS.map((s) => (
            <li key={s.n} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bark-600 text-sm font-semibold text-white">
                {s.n}
              </span>
              <p className="pt-0.5 text-stone-600 dark:text-stone-400">{s.text}</p>
            </li>
          ))}
        </ol>
        {/* The honest deal: every line here is a real, shipped product rule
            (no cap on applicants, the success fee, ownership verification,
            a cancel-any-time membership). Restyled from claims elsewhere on
            this page; add nothing here that isn't true in code. */}
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-white/10 dark:bg-stone-800">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
            The honest deal
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-stone-600 dark:text-stone-400">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-700 dark:text-green-400" />
              <span>
                No cap on who can apply: every application reaches the
                homeowner, who compares everyone inside OakTend and picks.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-700 dark:text-green-400" />
              <span>
                No pay-to-apply, ever: applying, quoting, and messaging a
                homeowner are always free.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-700 dark:text-green-400" />
              <span>
                Keep 100% of what you&apos;re paid for the job, minus a{" "}
                {SUCCESS_FEE_PCT}% success fee capped at ${SUCCESS_FEE_CAP}.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-700 dark:text-green-400" />
              <span>
                Each job shows whether the poster&apos;s name matched public
                property records.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-700 dark:text-green-400" />
              <span>
                Pro membership is optional. Cancel it any time from your
                account, no penalty.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Honesty line. The old deposit-bonus paragraph was removed with the
          retired wallet model (legal review H-09). */}
      <p className="mx-auto mt-12 max-w-md text-center text-xs text-stone-500 dark:text-stone-400">
        Applying, quoting, and messaging are free. The only fee is 5% of the
        job when a homeowner hires you, $15 minimum, $1,000 cap.
      </p>

      </Band>

      {/* Closing ask, in the second dark band - the homeowner landing has one
          and this page had none, so the only door was the hero at the very
          top (added 2026-09-22). Same signupHref as that hero button, so a
          ?ref= partner code threads through either door. */}
      <Band tone="dark">
        <section className="text-center">
          <h2 className="mx-auto max-w-xl text-2xl font-semibold text-white [text-wrap:balance]">
            Real local leads, honest pricing
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-300">
            Free to apply and quote. You only pay a {SUCCESS_FEE_PCT}% success
            fee when a homeowner hires you through OakTend.
          </p>
          <Link
            href={signupHref}
            className="btn-primary mt-6 px-6 py-3 text-base shadow-lift"
          >
            Create your pro account
          </Link>
          <p className="mt-3 text-sm text-stone-300">
            Serving {LAUNCH_AREA_LABEL}
          </p>
        </section>
      </Band>

      <Band tone="white">
      <footer className="border-t border-stone-200 pt-6 text-center dark:border-white/10">
        <Link href="/" className="text-sm text-stone-500 hover:text-bark-700 dark:text-stone-400 dark:hover:text-stone-300">
          Looking after your own home instead? OakTend for Homeowners →
        </Link>
        {/* Source of truth: LEGAL_LINKS in src/lib/legal.ts. Plain inline
            text wraps on its own on a phone; no layout change needed. */}
        <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
          {LEGAL_LINKS.map((link, i) => (
            <span key={link.href}>
              {i > 0 && " · "}
              <Link href={link.href} className="hover:text-bark-700 hover:underline dark:hover:text-stone-300">
                {link.label}
              </Link>
            </span>
          ))}
        </p>
      </footer>
      </Band>
    </main>
  );
}

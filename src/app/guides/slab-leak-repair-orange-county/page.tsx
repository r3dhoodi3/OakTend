import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide, the repair-side companion to /guides/slab-leak-signs.
// NO PRICES ON PURPOSE. We found no government or regional survey that states
// an Orange County slab leak repair price with a year, so the page explains
// what drives the price instead of printing a range. The insurance section is
// deliberately general: the California Department of Insurance site returned
// 503 on every attempt on 2026-09-21, so no coverage rule is stated as fact
// and the reader is sent to their own policy and insurer.
// Sourced facts (opened 2026-09-21, links in GUIDE_SOURCES,
// src/lib/guideExtras.ts): EPA WaterSense meter test, Irvine Ranch Water
// District leak adjustment, Yorba Linda plumbing permit exemptions, Fountain
// Valley and Santa Ana repipe permits, CSLB C-36 and bid advice, EPA RRP rule.
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
const TITLE = "Slab leak repair in Orange County: options and permits";
const DESCRIPTION =
  "Spot repair, reroute or repipe: how slab leak repair works in Orange County, what drives the price, when a permit is needed, and what to ask your insurer.";
const CANONICAL = `${SITE_URL}/guides/slab-leak-repair-orange-county`;

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

export default function SlabLeakRepairOrangeCountyGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/slab-leak-repair-orange-county"
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
          { label: "Slab leak repair in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Slab leak repair in Orange County", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Slab leak repair in Orange County: options and permits
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/slab-leak-repair-orange-county" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Written for Orange County homeowners who have, or think they have, a
        leak under the slab. No prices are quoted here on purpose. General
        information, not plumbing, legal or insurance advice.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          The short answer
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          Three real options: spot repair, reroute, or repipe
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          The right one depends less on the leak you found than on the
          condition of the rest of the pipe. Confirm the leak with your water
          meter, get the line located, and compare written bids that say
          which option they are pricing.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How do I confirm it is a slab leak?
          </h2>
          <p className="mt-2 leading-relaxed">
            Start with the meter, because it costs nothing. The EPA&apos;s
            WaterSense program describes the test: check your water meter
            before and after a two-hour period when no water is being used,
            and if the meter changes at all, you probably have a leak. Turn
            off the ice maker and irrigation timer first so they do not fool
            you.
          </p>
          <p className="mt-2 leading-relaxed">
            A moving meter tells you there is a leak, not where. Irvine Ranch
            Water District lists toilets, faucets and sprinklers as the
            common sources of undetected leaks, so rule those out. If the
            meter still moves with the toilets shut off
            at the wall and the irrigation valve closed, and you have a warm
            spot on the floor or the sound of running water, the slab is the
            likely place. Our{" "}
            <Link href="/guides/slab-leak-signs" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              slab leak signs guide
            </Link>{" "}
            covers the symptoms and why 1960s and 1970s Orange County tract
            homes get them. A plumber or leak detection company then
            pinpoints the spot with listening equipment and pressure tests
            before anyone cuts concrete.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What are the repair options?
          </h2>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Spot repair</h3>
          <p className="mt-2 leading-relaxed">
            The plumber opens the floor at the leak, cuts out the bad section
            and joins in new pipe, then the slab and flooring are patched. It
            fixes that leak only. It makes the most sense for a first leak in
            a spot that is easy to reach, under flooring that is cheap to
            patch.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Reroute</h3>
          <p className="mt-2 leading-relaxed">
            The leaking line is capped at both ends and abandoned in the
            slab, and a new line is run overhead through the attic and down
            inside the walls. No concrete is cut, but drywall is. A reroute
            takes that one line out of the slab for good, and the rest of the
            lines stay where they are.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Whole-house repipe</h3>
          <p className="mt-2 leading-relaxed">
            Every supply line is replaced, leaving nothing pressurized under
            the slab. It is the biggest job and the only one that ends the
            problem instead of the incident. It is usually worth pricing once
            a house has had a second leak, because at that point the pipe is
            telling you about its general condition. Our{" "}
            <Link href="/guides/repipe-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              repipe guide
            </Link>{" "}
            covers copper versus PEX and what a bid includes, and our{" "}
            <Link href="/guides/hard-water-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              hard water guide
            </Link>{" "}
            explains what local water does to plumbing.
          </p>
          <p className="mt-2 leading-relaxed">
            You may also be offered an epoxy lining that coats the inside of
            the existing pipe. We could not find an independent public source
            on how it holds up locally, so ask for the product&apos;s listing, the
            warranty in writing, and whether your city will permit it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What affects the cost of slab leak repair?
          </h2>
          <p className="mt-2 leading-relaxed">
            We do not print a price range, because we could not find a
            reliable published figure for Orange County and a made-up one
            would not help you. What moves the number is knowable:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Finding it.</strong> Leak detection is often billed
              separately from the repair. Ask whether it is credited if you
              hire the same company.
            </li>
            <li>
              <strong>Where it is.</strong> A leak under a hallway is a
              different job from one under a kitchen island or a tub.
            </li>
            <li>
              <strong>What is on top of it.</strong> Patching carpet is
              cheap. Matching hardwood, tile or stone that is no longer sold
              can cost more than the plumbing.
            </li>
            <li>
              <strong>Which option.</strong> A reroute is priced by the
              length and path of the new line and the drywall to be opened
              and closed. A repipe is priced by the number of fixtures, the
              stories, attic access and pipe material.
            </li>
            <li>
              <strong>What the bid leaves out.</strong> Drywall, texture,
              paint, flooring and the permit are common exclusions. Two bids
              are only comparable when they include the same things.
            </li>
            <li>
              <strong>Drying.</strong> If water got into walls, cabinets or
              flooring, drying and any mold cleanup is a separate trade and
              a separate invoice.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            The Contractors State License Board&apos;s advice fits this job
            exactly: get at least three written bids, make sure they are
            based on the same scope of work, and do not automatically accept
            the lowest one.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Do I need a permit for slab leak repair?
          </h2>
          <p className="mt-2 leading-relaxed">
            For anything beyond stopping a leak, plan on one. Yorba Linda&apos;s
            published exemption list, which follows the state plumbing code,
            says no permit is needed to stop leaks or to repair leaks in
            pipes, valves or fixtures. But it goes on: if a concealed pipe
            becomes defective and has to be removed and replaced with new
            material, that is considered new work, and a permit and
            inspection are required. A reroute or a repipe is new pipe by
            definition.
          </p>
          <p className="mt-2 leading-relaxed">
            The permit itself is usually quick. Fountain Valley lists a
            residential repipe among its expedited permits, and Santa Ana
            issues residential repipe and water piping permits through its
            same-day express program. Rules are set city by city, so check
            with your own building division. A good bid names who pulls the
            permit, and the Contractors State License Board says a contract
            should spell that out. See our{" "}
            <Link href="/guides/permits-orange-county" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              Orange County permit guide
            </Link>{" "}
            for how cities differ.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Will homeowners insurance cover a slab leak?
          </h2>
          <p className="mt-2 leading-relaxed">
            It depends on the wording of your policy, and we are not going to
            guess at yours. Read the water damage section and call your agent
            before work starts, not after. These are the questions that
            decide most slab leak claims, so ask each one and ask for the
            answer in writing:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              Is water damage from a plumbing leak covered, and does it
              matter whether the leak was sudden or had been seeping for a
              while?
            </li>
            <li>
              Is the cost of getting to the pipe covered, meaning breaking
              out and replacing the slab and flooring?
            </li>
            <li>
              Is the repair of the pipe itself covered, or only the damage
              the water caused?
            </li>
            <li>
              Would a reroute be treated differently from a repair in the
              slab?
            </li>
            <li>What is my deductible, and is mold handled separately?</li>
          </ul>
          <p className="mt-2 leading-relaxed">
            Whatever the answers, document first. Photograph the meter, the
            damage and the opened floor, keep the leak detection report, and
            save every invoice. If you and your insurer disagree, the
            California Department of Insurance takes consumer complaints.
          </p>
          <p className="mt-2 leading-relaxed">
            Separately, ask your water provider about a bill adjustment.
            Irvine Ranch Water District, for example, says that once a
            customer has found and repaired a leak and usage returns to
            normal, it will re-bill the usage that landed in its penalty
            tiers at a lower rate. You still pay for the water. Other
            providers have their own policies.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps the leak report, the bids, the permit and the final
            invoice in your home&apos;s record, with the date, so the next leak or
            the next buyer&apos;s inspector does not start from zero.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Keep your home&apos;s repair record, free
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Who should I hire?
          </h2>
          <p className="mt-2 leading-relaxed">
            A plumber holding a C-36 Plumbing Contractor license, which is
            the state classification that covers water supply piping. Look
            the license up on the Contractors State License Board website
            before anyone starts, and check that the name on the bid matches
            the name on the license. If your house was built before 1978 and
            walls will be opened, ask about lead paint: the EPA&apos;s renovation
            rule requires anyone paid to disturb painted surfaces in
            pre-1978 homes to be certified in lead-safe work practices.
          </p>
          <p className="mt-2 leading-relaxed">
            If water is actively coming up through the floor, shut off the
            house valve first and make calls second.
          </p>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            City pages for some of the county&apos;s older tract neighborhoods:{" "}
            <Link href="/fountain-valley" className="text-bark-700 hover:underline dark:text-stone-300">Fountain Valley</Link>,{" "}
            <Link href="/huntington-beach" className="text-bark-700 hover:underline dark:text-stone-300">Huntington Beach</Link>,{" "}
            <Link href="/oc/garden-grove" className="text-bark-700 hover:underline dark:text-stone-300">Garden Grove</Link>,{" "}
            <Link href="/oc/westminster" className="text-bark-700 hover:underline dark:text-stone-300">Westminster</Link> and{" "}
            <Link href="/oc/anaheim" className="text-bark-700 hover:underline dark:text-stone-300">Anaheim</Link>. Or see every city on the{" "}
            <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">Orange County hub</Link>.
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            As of September 2026. Permit rules differ by city and insurance
            coverage differs by policy, so confirm with your building
            division and your insurer. This is general information, not
            plumbing, legal or insurance advice.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/slab-leak-repair-orange-county" />

      <GuideCta />
    </main>
  );
}

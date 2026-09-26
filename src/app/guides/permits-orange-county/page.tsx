import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide for Orange County homeowners. The point of the page is that
// permit rules are set city by city, so it quotes real city pages as examples
// (Irvine, Fountain Valley, Yorba Linda, Garden Grove, Santa Ana, Newport
// Beach) and sends the reader to their own building department instead of
// stating one county-wide rule that does not exist. Every city figure here
// (fence heights, shed size, retaining wall height, express permit lists) was
// read off that city's own page on 2026-09-21 and is listed with its link in
// GUIDE_SOURCES (src/lib/guideExtras.ts). No permit fees are quoted: they
// change every fiscal year and differ by city.
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
const TITLE = "Building permits in Orange County: a guide by project";
const DESCRIPTION =
  "When a home project needs a permit in Orange County: water heaters, reroofs, panels, HVAC, fences and patio covers, with real city examples.";
const CANONICAL = `${SITE_URL}/guides/permits-orange-county`;

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

export default function PermitsOrangeCountyGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/permits-orange-county"
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
          { label: "Building permits in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Building permits in Orange County", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Building permits in Orange County: a guide by project
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/permits-orange-county" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Written for Orange County homeowners. City examples were read from each
        city&apos;s own building pages in September 2026. General information, not
        legal advice: your building department has the final word.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          The short answer
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          Most repair and replacement work needs a permit
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          Swapping a water heater, reroofing, upgrading a panel, changing out
          a furnace or AC, and repiping all need one in the cities we checked.
          Paint, flooring, cabinets and countertops do not. Fences, walls and
          patio covers are where cities differ most.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Who issues building permits in Orange County?
          </h2>
          <p className="mt-2 leading-relaxed">
            Your city does. Orange County has 34 cities, and each runs its
            own building department and publishes its own list of what is
            exempt. In unincorporated areas the County handles it through OC
            Development Services, which does the permit processing and
            inspections there.
          </p>
          <p className="mt-2 leading-relaxed">
            That is why a neighbor one city over can give you advice that is
            wrong for your address. Fence height is the clearest example:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Irvine</strong> exempts fences not over 7 feet high.
            </li>
            <li>
              <strong>Fountain Valley</strong> exempts fences not over 6 feet
              high and block walls not over 3 feet.
            </li>
            <li>
              <strong>Yorba Linda</strong> exempts wood, vinyl or chain link
              fences not over 6 feet and masonry or concrete fences not over
              3 feet, and not if the fence is part of a pool barrier.
            </li>
            <li>
              <strong>Garden Grove</strong> lists masonry fences over 36
              inches high among the work that needs a permit.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            These pages add the same warning: the zoning code has its own
            height and setback limits, and a permit exemption does not
            exempt you from them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Which common projects need a permit?
          </h2>
          <p className="mt-2 leading-relaxed">
            Fountain Valley states the general rule: a permit is required to
            construct, enlarge, alter, repair, move or demolish a building, or
            to install, alter, repair, remove, convert or replace any
            electrical, gas, mechanical or plumbing system. Project by
            project:
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Water heater replacement</h3>
          <p className="mt-2 leading-relaxed">
            Permit required. Fountain Valley lists a water heater change-out
            among its expedited permits, and Santa Ana lists water heaters and
            tankless water heaters on its same-day express list. The
            inspection is mostly about safety items: Fountain Valley&apos;s
            homeowner handout shows earthquake straps in the top and bottom
            third of the tank, a temperature and pressure relief valve piped
            to the outside, and a burner at least 18 inches above a garage
            floor. State law backs the strapping: Health and Safety Code
            section 19211 requires all new, replacement and existing
            residential water heaters to be braced, anchored or strapped
            against earthquake motion. Our{" "}
            <Link href="/guides/water-heater-replacement-cost" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              water heater replacement guide
            </Link>{" "}
            covers the rest of that job.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Reroof</h3>
          <p className="mt-2 leading-relaxed">
            Permit required. Garden Grove lists reroofing your home among its
            common examples, Fountain Valley lists a residential reroof as an
            expedited permit, and Santa Ana issues like-for-like reroofs the
            same day. Fountain Valley&apos;s reroof handout says final inspections
            are always required, and the roof sheathing gets inspected when it
            is replaced or filled in.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Electrical panel upgrade</h3>
          <p className="mt-2 leading-relaxed">
            Permit required. Fountain Valley lists a 200 amp panel upgrade as
            an expedited permit and Santa Ana lists service meters up to 399
            amps on its express list. What cities exempt is small: Yorba
            Linda&apos;s list covers things like replacing a breaker of the same
            capacity in the same location.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Furnace and air conditioner change-out</h3>
          <p className="mt-2 leading-relaxed">
            Permit required. Fountain Valley&apos;s handout opens with it: a
            mechanical system shall not be installed, altered, repaired,
            replaced or remodeled unless a permit has first been obtained,
            and outdoor equipment needs a site plan. A permitted HVAC
            change-out can also trigger energy code testing. The California Energy Commission
            says that, depending on the work, this testing may be mandatory,
            that properly permitted work will trigger any testing that is
            needed, and that a homeowner has the right to hire a rater who
            is independent of the contractor.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Patio covers</h3>
          <p className="mt-2 leading-relaxed">
            Do not assume a small one is exempt. Irvine&apos;s list says the shed
            exemption does not apply to patio covers, which are subject to
            permit regardless of size. Fountain
            Valley offers an expedited permit for a patio cover built to the
            city&apos;s standard plan.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Repiping and plumbing repairs</h3>
          <p className="mt-2 leading-relaxed">
            A whole-house repipe needs a permit: Fountain Valley and Santa
            Ana both list residential repipes as expedited or same-day
            permits. Small repairs do not. Yorba Linda&apos;s plumbing list
            exempts stopping leaks, clearing stoppages, and swapping a
            toilet, sink, garbage disposal or dishwasher when no valves or
            pipes are rearranged. But once a concealed pipe is defective and
            has to be replaced with new material, that is new work and a
            permit and inspection are required.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What work does not need a permit?
          </h2>
          <p className="mt-2 leading-relaxed">
            The exempt lists in Irvine, Fountain Valley and Yorba Linda share
            a core:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              Painting, papering, tiling, carpeting, cabinets, countertops
              and similar finish work. Yorba Linda adds that a permit is
              required once the job involves removing or replacing sinks,
              electrical items or drywall.
            </li>
            <li>
              A one-story detached shed or playhouse of 120 square feet or
              less. Fountain Valley also caps the ceiling height at 7 feet.
              Setbacks from the property line still apply.
            </li>
            <li>
              Retaining walls not over 4 feet, measured from the bottom of
              the footing to the top of the wall, unless the wall supports a
              surcharge.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            Irvine&apos;s page makes the point that matters most: exempt work must
            still conform to all technical codes and city, county and state
            ordinances. Exempt means no paperwork, not no rules.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend gives you one place to keep permit cards, final
            inspection sign-offs and contractor invoices with the rest of
            your home&apos;s records, so they are easy to find when you sell or
            file a claim.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Keep your home&apos;s paperwork in one place
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Who should pull the permit, me or the contractor?
          </h2>
          <p className="mt-2 leading-relaxed">
            Either can. Garden Grove&apos;s advice is the practical answer: the
            owner or an authorized agent may obtain permits, but if you are
            contracting the work out it is always wise to have the contractor
            obtain them, so the contractor keeps the responsibility to call
            for and pass every inspection. The Contractors State License
            Board warns homeowners to be wary of consultants or unlicensed
            individuals who try to talk them into becoming an owner-builder
            to save money.
          </p>
          <p className="mt-2 leading-relaxed">
            Be careful with a bid that gets cheaper without a permit.
            Fountain Valley&apos;s building division answers that offer directly:
            the responsibility for compliance lies with the property owner.
            For a licensed
            contractor, willful disregard of building laws is cause for
            discipline under Business and Professions Code section 7110. Our
            guide to{" "}
            <Link href="/guides/contractor-deposit-rules-california" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              California contractor deposit rules
            </Link>{" "}
            covers the contract side.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What happens if work was done without a permit?
          </h2>
          <p className="mt-2 leading-relaxed">
            It can usually be fixed. Fountain Valley publishes an
            after-the-fact permit process, and notes that the city enforces
            the code in effect when you apply, not the code from when the
            work was done. Garden Grove adds two money reasons to care: proof of a
            permit is often needed to get financing, and fire and liability
            insurance damages may not be paid in some cases where permits
            were not obtained and the improvements do not meet regulations.
          </p>
          <p className="mt-2 leading-relaxed">
            One more thing a permit triggers. Under Health and Safety Code
            section 13113.7, when a permit is issued for alterations, repairs
            or additions over $1,000, the city cannot sign off until you show
            the home has approved smoke alarms. Check yours before the final
            inspection.
          </p>
        </section>

        <section>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">HOA approval is separate</h3>
          <p className="mt-2 leading-relaxed">
            If you live in an association, plan on two approvals. Irvine&apos;s
            permit page tells
            residents to check whether a project is allowed under their
            association&apos;s CC&amp;Rs, and Fountain Valley&apos;s HVAC handout says
            association approval is required in an HOA tract.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How do I check the rule for my city?
          </h2>
          <p className="mt-2 leading-relaxed">
            Start at your city&apos;s building division page and look for a
            handout on work exempt from permits. Many cities issue simple
            permits online or the same day, and some, like Newport Beach, let
            you search permit history by address. If the page does not answer
            your question, call the counter.
          </p>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            Find your city on the{" "}
            <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">Orange County hub</Link>, or go straight to{" "}
            <Link href="/oc/irvine" className="text-bark-700 hover:underline dark:text-stone-300">Irvine</Link>,{" "}
            <Link href="/fountain-valley" className="text-bark-700 hover:underline dark:text-stone-300">Fountain Valley</Link>,{" "}
            <Link href="/oc/yorba-linda" className="text-bark-700 hover:underline dark:text-stone-300">Yorba Linda</Link>,{" "}
            <Link href="/oc/garden-grove" className="text-bark-700 hover:underline dark:text-stone-300">Garden Grove</Link>,{" "}
            <Link href="/oc/santa-ana" className="text-bark-700 hover:underline dark:text-stone-300">Santa Ana</Link> or{" "}
            <Link href="/oc/newport-beach" className="text-bark-700 hover:underline dark:text-stone-300">Newport Beach</Link>.
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            City examples as of September 2026. Cities amend their codes and
            fee schedules regularly, and this page covers only a few of the
            county&apos;s building departments, so confirm the current rule with
            your own city before you start. This is general information, not
            legal advice.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/permits-orange-county" />

      <GuideCta />
    </main>
  );
}

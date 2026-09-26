import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide. NO PRICES ON PURPOSE: neither UC IPM nor the Structural
// Pest Control Board publishes one, and we found no regional cost survey that
// states region and year, so the page explains what a bid is built from.
// Sources, all opened 2026-09-21 (links in GUIDE_SOURCES,
// src/lib/guideExtras.ts):
//  - UC IPM Pest Notes: Drywood Termites (updated 08/2014) and Subterranean
//    and Other Termites: identification, swarm timing, whole-structure vs
//    localized treatment, heat figures, the d-limonene (orange oil) finding.
//  - Structural Pest Control Board: "Termites" brochure (rev. 03/2019),
//    "Fumigation for Pest Control" fact sheet, the inspection search page.
//  - Business and Professions Code 8516: report within 10 business days, the
//    two kinds of findings, reinspection within four months.
//  - SoCalGas: gas shut-off before fumigation, two business days' notice.
// "Section 1" and "Section 2" are the customary labels on the report form for
// the two kinds of findings in BPC 8516; the statute itself does not use those
// names, and the page says "usually labeled".
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
const TITLE = "Termites in Orange County: tenting vs local treatment";
const DESCRIPTION =
  "Drywood vs subterranean termites in Orange County, when tenting beats spot treatment, how to read an inspection report, and what drives the price.";
const CANONICAL = `${SITE_URL}/guides/termites-orange-county`;

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

export default function TermitesOrangeCountyGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      {/* Article node. Dates come from src/lib/guides.ts, the same map the
          sitemap reads <lastmod> from. */}
      <GuideArticleJsonLd
        path="/guides/termites-orange-county"
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
          { label: "Termites in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Termites in Orange County", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Termites in Orange County: tenting vs local treatment
      </h1>
      {/* Updated date and byline, from the same date map the sitemap and the
          Article node read (src/components/GuideMeta.tsx). */}
      <GuideMeta path="/guides/termites-orange-county" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Written for Orange County homeowners. Treatment facts come from the
        University of California&apos;s pest program and the state Structural Pest
        Control Board. No prices are quoted here on purpose. General
        information, not pest control advice for your house.
      </p>

      <div className="mt-6 rounded-2xl border border-bark-100 bg-bark-50 p-5 dark:border-bark-700 dark:bg-bark-700/20">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          The short answer
        </p>
        <p className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-100">
          Find out which termite you have before you compare bids
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          Drywood termites live inside the wood and are treated in the
          structure, by tenting or by spot treatment. Subterranean termites
          live in the soil and are treated at the ground. Tenting does
          nothing for the second kind, so the inspection matters more than
          the sales pitch.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Drywood or subterranean: how do I tell them apart?
          </h2>
          <p className="mt-2 leading-relaxed">
            Orange County homes get both. The University of California&apos;s
            pest program (UC IPM) says drywood termites are most prevalent in
            Southern California, and subterranean termites are common
            throughout the state.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Drywood termites</strong> nest above ground, inside dry,
              sound wood such as rafters, fascia, window frames and
              furniture, with no connection to the soil. The giveaway is
              their droppings: small, hard pellets with six sides, pushed out
              of tiny kickout holes and collecting in little piles below. UC
              IPM says the swarmers fly during the day in summer and fall.
            </li>
            <li>
              <strong>Subterranean termites</strong> live in the soil and
              need moisture. They reach the house through wood that touches
              the ground or by building shelter tubes, the mud tubes you see
              running up a foundation or a garage wall. The state pest board
              describes those tubes as about the diameter of a pencil. UC
              IPM says the common native species swarms in the afternoon in
              spring or fall, on clear days after a soaking rain.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            Winged ants fool a lot of people. The pest board&apos;s test:
            termites have straight antennae, a
            uniform waist and wings of equal size, while ants have elbowed
            antennae, a pinched waist and longer front wings. It also points
            out that a swarm out in the yard does not necessarily mean the
            house is infested.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Tenting or local treatment: which one do I need?
          </h2>
          <p className="mt-2 leading-relaxed">
            For drywood termites, UC IPM sorts every method into two groups.
            Whole-structure treatment treats every infestation at once,
            including the ones nobody found. Localized or spot treatment goes
            after a single board or a small group of boards. Its summary is
            blunt: because drywall and other coverings hide colonies, one can
            never be sure all infestations have been treated when applying
            localized treatments.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Whole structure: fumigation or heat</h3>
          <p className="mt-2 leading-relaxed">
            Fumigation, the familiar tent, uses sulfuryl fluoride gas. UC IPM
            says it has high levels of efficacy if correctly applied, and
            that a monitored fumigation, with gas monitoring lines inside the
            house, has the highest rate of success. The costs are days out
            of the house and possible roof damage from the tarps. Heat is
            the nonchemical option: the wood is brought to at least 120
            degrees for at least 33 minutes, and you are out for hours
            instead of days. Its weakness is heat sinks, such as wood on
            concrete or tile, that are hard to get up to temperature.
          </p>
          <p className="mt-2 leading-relaxed">
            Neither one protects the house afterward. UC IPM says fumigants
            and heat have no residual effect, so a new colony can start
            later. That is how these treatments work, not a failed job.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Local or spot treatment</h3>
          <p className="mt-2 leading-relaxed">
            Injected liquids, dusts and foams, localized heat, or cutting
            out and replacing the infested wood. UC IPM says effectiveness
            is high when the colony is located correctly and the treatment
            gets directly onto the termites, that results vary a great deal
            by product, and that home-use products are not effective. On
            orange oil, it says lab and field tests from two universities
            question the efficacy of d-limonene, its active ingredient.
          </p>
          <p className="mt-2 leading-relaxed">
            The pest board draws the line in plain terms. Fumigation and
            whole-house heat are the only choices that ensure eradication in
            the entire structure. Spot control may be effective for a small,
            contained infestation, but it will not reach hidden ones. Any
            company that claims whole-house results from spot treatment is
            guilty of false advertising and should be reported.
          </p>
          <h3 className="mt-4 font-medium text-stone-900 dark:text-stone-100">Subterranean termites</h3>
          <p className="mt-2 leading-relaxed">
            These are treated at the soil, not with a tent. The pest board
            says subterranean termites require separate treatments that
            create a barrier between the building and the nest in the ground.
            UC IPM describes barrier applications around the perimeter by
            trenching, drilling or rodding, and bait stations, which it says
            can work but may take months or even years and need constant
            monitoring. If a company finds both kinds, you should see two
            separate line items.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What does an inspection report tell me?
          </h2>
          <p className="mt-2 leading-relaxed">
            Under Business and Professions Code section 8516, the written
            report has to be delivered within 10 business days of the
            inspection, and it has to separately identify two kinds of
            findings:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Infestation or infection that is evident</strong>,
              usually labeled Section 1 on the report: live termites, damage,
              fungus.
            </li>
            <li>
              <strong>
                Conditions deemed likely to lead to infestation
              </strong>
              , usually labeled Section 2: the law lists earth touching
              wood, excessive moisture, evidence of roof leaks, wood debris
              under the house and poor ventilation.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            The first kind is the problem. The second kind is mostly
            maintenance you can schedule. The same law says a reinspection
            within four months cannot cost more than the original
            inspection.
          </p>
          <p className="mt-2 leading-relaxed">
            The Structural Pest Control Board&apos;s online search shows whether a
            property has been inspected within the last two years, and you
            can request copies of those reports. That is worth doing before
            you buy a house.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What affects the cost of termite treatment?
          </h2>
          <p className="mt-2 leading-relaxed">
            We do not print a price range, because neither the university nor
            the state board publishes one. Bids are built from:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
            <li>
              <strong>Which termite, and how widespread.</strong> One
              accessible colony in a fascia board is a small job. Evidence in
              several parts of the house pushes toward whole structure.
            </li>
            <li>
              <strong>Size of the building.</strong> A tent job scales with
              the volume being tented. UC IPM notes the time out of the house
              depends on the volume and the amount of gas. Ask whether gas
              levels will be monitored inside.
            </li>
            <li>
              <strong>Wood repair.</strong> Replacing damaged fascia, rafter
              tails or framing is carpentry, priced separately.
            </li>
            <li>
              <strong>Warranty.</strong> Whole structure, or only the treated
              spots.
            </li>
          </ul>
          <p className="mt-2 leading-relaxed">
            The pest board&apos;s advice on timing: termites damage wood slowly,
            the damage from taking an extra day, week or month to decide is
            usually insignificant, and you should avoid firms that push you
            to sign right away. Our guide on{" "}
            <Link href="/guides/is-my-contractor-quote-fair" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              reading a contractor&apos;s quote
            </Link>{" "}
            applies here too.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps your inspection reports, the fumigation date and the
            warranty paperwork in your home&apos;s record, and reminds you when a
            yearly look around the eaves and the foundation is due.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Keep your home&apos;s records together, free
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How do I get ready for tenting?
          </h2>
          <p className="mt-2 leading-relaxed">
            The pest board&apos;s fact sheet covers the basics. All people, pets
            and plants have to be out, including fish. Medicines and food
            that are not sealed in metal, glass or highly resistant containers
            must be removed or sealed in protective bags. A fumigation can take from six hours to one week. The
            company puts a secondary lock on every
            outside door, and nobody goes back in until the licensee
            certifies the house safe for re-entry.
          </p>
          <p className="mt-2 leading-relaxed">
            Your gas has to be off first. SoCalGas says it closes the gas
            service before a fumigation and restores it afterward at no
            cost, needs at least two business days of notice, and that only
            SoCalGas or its certified contractors may operate the service
            shut-off valve, not the fumigator. Schedule the restore visit
            when you schedule the shut-off.
          </p>
          <p className="mt-2 leading-relaxed">
            Before you sign, look the company up on the Structural Pest
            Control Board&apos;s license search. The board also takes complaints.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How do I make my house less inviting?
          </h2>
          <p className="mt-2 leading-relaxed">
            UC IPM&apos;s prevention list: keep a 12-inch gap of concrete or other
            inorganic material between soil and structural wood, move wood
            piles away from the house, fix leaks promptly, and keep exterior
            wood sealed or painted. Our{" "}
            <Link href="/guides/orange-county-home-maintenance-checklist" className="text-bark-700 underline hover:no-underline dark:text-stone-300">
              Orange County maintenance checklist
            </Link>{" "}
            puts the yearly check in swarm season.
          </p>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            City pages:{" "}
            <Link href="/huntington-beach" className="text-bark-700 hover:underline dark:text-stone-300">Huntington Beach</Link>,{" "}
            <Link href="/oc/newport-beach" className="text-bark-700 hover:underline dark:text-stone-300">Newport Beach</Link>,{" "}
            <Link href="/oc/costa-mesa" className="text-bark-700 hover:underline dark:text-stone-300">Costa Mesa</Link>,{" "}
            <Link href="/oc/seal-beach" className="text-bark-700 hover:underline dark:text-stone-300">Seal Beach</Link>,{" "}
            <Link href="/oc/tustin" className="text-bark-700 hover:underline dark:text-stone-300">Tustin</Link> and{" "}
            <Link href="/oc/orange" className="text-bark-700 hover:underline dark:text-stone-300">Orange</Link>, or every city on the{" "}
            <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">Orange County hub</Link>.
          </p>
        </section>

        <section>
          <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            As of September 2026. The UC IPM drywood termite note was last
            updated in 2014 and the pest board brochure in 2019, so products
            and practices may have moved on. Treatment decisions belong with
            a licensed inspector who has seen your house. This is general
            information, not pest control, legal or safety advice.
          </p>
        </section>
      </div>

      {/* Sources (where verified), related guides and city pages
          (src/components/GuideRelated.tsx, data in src/lib/guideExtras.ts). */}
      <GuideRelated path="/guides/termites-orange-county" />

      <GuideCta />
    </main>
  );
}

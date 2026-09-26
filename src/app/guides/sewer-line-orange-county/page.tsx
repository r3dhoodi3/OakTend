import type { Metadata } from "next";
import Link from "next/link";
import GuideCta from "@/components/GuideCta";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";

// Public SEO guide: the sewer lateral from an Orange County house to the
// public main. Every fact was opened on 2026-09-26; links in GUIDE_SOURCES,
// src/lib/guideExtras.ts:
//  - OC San: regional provider only; the city is the local provider except
//    Yorba Linda, Irvine, Tustin and unincorporated areas.
//  - Who owns what, each in the provider's own words: Anaheim (property
//    owners guide PDF), Costa Mesa Sanitary District (FAQ and rebate page),
//    Huntington Beach (sewer lateral program), Irvine Ranch Water District.
//  - Signs, vitrified clay pipe and its 30 to 50 year service life, roots
//    entering through existing defects, 4 to 6 inch laterals: Anaheim.
//    Roots breaking a pipe, rodding as a temporary fix: CMSD.
//  - CCTV rebates, clean-out permit, dig inspection: CMSD rebate page, which
//    are rebate amounts, not repair prices.
// NO REPAIR PRICES ON PURPOSE: no government or survey source gave one.
// Dropped as unsourced: cast iron and Orangeburg pipe in Orange County tracts
// (only plumber marketing said so), a typical lateral length, pipe bursting.
// Fullerton's lateral pages returned 403 to every fetch, so Fullerton is not
// cited.
//
// No FAQPage or HowTo JSON-LD on purpose: the questions are visible headings
// only. Article and BreadcrumbList are the only structured data here.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC (ISR marker), same as every guide: nothing here reads cookies(),
// headers(), searchParams or the database.
export const revalidate = 3600;

// Title/description held once so metadata.title, openGraph, and twitter
// can't drift from each other; the OG image at ./opengraph-image.tsx keeps
// its own literal copy of the title.
const TITLE = "Sewer line problems in Orange County";
const DESCRIPTION =
  "Who owns the sewer lateral in Orange County cities, the signs of a failing line, camera inspections, repair options and permits.";
const CANONICAL = `${SITE_URL}/guides/sewer-line-orange-county`;

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

// Who owns what, in each provider's own words (sources in GUIDE_SOURCES).
const OWNERSHIP: { provider: string; rule: string }[] = [
  {
    provider: "Anaheim",
    rule: "The entire lateral is private property, including the part under the street.",
  },
  {
    provider: "Costa Mesa Sanitary District",
    rule: "The owner is responsible for the whole lateral, from the building to and including the connection to the district's main.",
  },
  {
    provider: "Huntington Beach",
    rule: "The city is responsible from its main to the private property line, including the public right-of-way. The owner pays for the part on private property.",
  },
  {
    provider: "Irvine Ranch Water District",
    rule: "The owner is responsible for the pipes in the building and the lateral out to the edge of the property line.",
  },
];

export default function SewerLineOrangeCountyGuide() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <GuideArticleJsonLd
        path="/guides/sewer-line-orange-county"
        headline={TITLE}
        description={DESCRIPTION}
        siteUrl={SITE_URL}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Sewer line problems in Orange County" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "Sewer line problems in Orange County", href: CANONICAL },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Sewer line problems in Orange County
      </h1>
      <GuideMeta path="/guides/sewer-line-orange-county" />
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        About the sewer lateral, the pipe from your house to the public sewer
        main. No repair prices here: we found no reliable published figure.
        General information, not plumbing or legal advice.
      </p>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Who owns the sewer line from my house to the street?
          </h2>
          <p className="mt-2 leading-relaxed">
            Not the Orange County Sanitation District. OC San runs the large
            regional sewers and treatment plants, and says it is not a local
            sewer provider. Your city is, except in Yorba Linda, Irvine, Tustin
            and unincorporated areas, which have their own districts. Each
            local provider decides where your part ends, and they differ:
          </p>
          <ul className="mt-3 space-y-2">
            {OWNERSHIP.map((o) => (
              <li
                key={o.provider}
                className="rounded-lg border border-stone-200 p-3 leading-relaxed dark:border-stone-700"
              >
                <strong className="text-stone-900 dark:text-stone-100">{o.provider}.</strong>{" "}
                {o.rule}
              </li>
            ))}
          </ul>
          <p className="mt-3 leading-relaxed">
            Anywhere else, ask your city&apos;s public works or utilities
            department before paying for work under the sidewalk or street.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What are the signs of a failing sewer line?
          </h2>
          <p className="mt-2 leading-relaxed">
            Anaheim&apos;s guide for property owners lists drains slowing,
            gurgling from a toilet and wet areas around the washing machine
            as signs of a blockage in the lateral. Common causes are
            grease, debris and roots.
          </p>
          <p className="mt-2 leading-relaxed">
            Age is part of it. The same guide says most laterals are
            vitrified clay pipe, with an average service life of 30 to 50
            years. Roots get in through cracks and loose joints; Anaheim
            notes they usually point to a defect that was already there. Once
            inside, the Costa Mesa Sanitary District says, roots keep growing
            and can break the pipe or collapse it.
          </p>
          <p className="mt-2 leading-relaxed">
            Laterals are only 4 to 6 inches across, so wipes block them, even
            ones labeled flushable. Grease belongs in a sealed container in
            the trash.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What does a camera inspection show?
          </h2>
          <p className="mt-2 leading-relaxed">
            A plumber runs a camera through the lateral to see its condition.
            The recording is the evidence everyone works from. Huntington
            Beach, for example, has the owner hire a contractor to clean and
            video the line, then reviews the video to decide whether the
            problem is in the city&apos;s part.
          </p>
          <p className="mt-2 leading-relaxed">
            Keep a copy that shows the date, the address and a footage counter
            and runs the whole line, from the house to past the connection at
            the main. That is what the Costa Mesa Sanitary District asks for
            with its rebate: up to $200 for a video from a ground-level
            clean-out, up to $250 from a roof vent or toilet, or up to $500
            toward installing a clean-out, which is a capped pipe that gives
            access to the line. Approval comes before any work, and it is one
            rebate every five years.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What are the repair options?
          </h2>
          <p className="mt-2 leading-relaxed">
            <strong>Cleaning.</strong> Rodding or hydrojetting clears roots,
            but the Costa Mesa Sanitary District calls it temporary because
            roots grow back, and suggests rodding every year if roots are
            the problem. Anaheim says chemical root killers are a short-term
            option that does not fix a broken pipe.
          </p>
          <p className="mt-2 leading-relaxed">
            <strong>Repair.</strong> When the video shows damage, the usual
            choices are digging up and replacing the broken section, lining
            the old pipe from inside (Huntington Beach&apos;s program names
            slip lining), or replacing the whole lateral. Ask each bidder
            which one they propose and to point to where on the video it is
            needed. Anaheim advises getting more than one quote before a
            major repair; our guide on{" "}
            <Link href="/guides/is-my-contractor-quote-fair" className={linkClass}>
              reading a contractor&apos;s quote
            </Link>{" "}
            helps compare them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Do I need a permit for sewer work?
          </h2>
          <p className="mt-2 leading-relaxed">
            For a repair or replacement, expect one: Anaheim tells owners to make
            sure the plumber gets the permits before any significant work. In
            the Costa Mesa Sanitary District, a camera inspection needs no
            permit, a new clean-out needs a sewer permit, and any lateral
            work that involves digging needs a district inspection. Our{" "}
            <Link href="/guides/permits-orange-county" className={linkClass}>
              Orange County permit guide
            </Link>{" "}
            covers how cities differ.
          </p>
        </section>

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            OakTend keeps the inspection video, the bids and the permit for a
            job like this in your home&apos;s record, dated, so the next
            plumber or a buyer can see what was done.
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Keep your home&apos;s record, free
          </Link>
        </div>

        <section>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            City pages:{" "}
            <Link href="/oc/anaheim" className="text-bark-700 hover:underline dark:text-stone-300">Anaheim</Link>,{" "}
            <Link href="/oc/costa-mesa" className="text-bark-700 hover:underline dark:text-stone-300">Costa Mesa</Link>,{" "}
            <Link href="/huntington-beach" className="text-bark-700 hover:underline dark:text-stone-300">Huntington Beach</Link>,{" "}
            <Link href="/oc/irvine" className="text-bark-700 hover:underline dark:text-stone-300">Irvine</Link> and{" "}
            <Link href="/oc/tustin" className="text-bark-700 hover:underline dark:text-stone-300">Tustin</Link>, or every city on
            the <Link href="/oc" className="text-bark-700 hover:underline dark:text-stone-300">Orange County hub</Link>.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-stone-500 dark:text-stone-500">
            As of September 2026. Your city or sewer district sets the rules
            for its lateral, permits and rebates, and can change them.
          </p>
        </section>
      </div>

      <GuideRelated path="/guides/sewer-line-orange-county" />

      <GuideCta />
    </main>
  );
}

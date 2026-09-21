import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { LEGAL } from "@/lib/legal";
import { ENTITY_DESCRIPTION } from "@/lib/siteMetadata";

// Public top-level page, same pattern as src/app/privacy-choices/page.tsx: see
// src/lib/supabase/middleware.ts for the allowlist entry and
// src/app/sitemap.ts for the sitemap entry. Short and hand-written: who runs
// OakTend, what it does, where, and how to reach us. Every statement here has
// to stay true during the homeowner preview (pro side closed, nothing sold),
// so it makes no claim about pros being available.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const CANONICAL = `${SITE_URL}/about`;

// Fixed wording, held once so the meta description, the share card and the
// AboutPage node below cannot drift from each other.
const DESCRIPTION =
  "OakTend is a free home maintenance app for Orange County, California homeowners, run by OakTend LLC in Fountain Valley. Who we are, what the app does, where our local facts come from, and how to reach us.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: "About OakTend",
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "OakTend",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About OakTend",
    description: DESCRIPTION,
  },
};

// AboutPage, pointing at the ONE Organization node the root layout emits
// (src/lib/organizationJsonLd.ts) by @id rather than describing the business a
// second time. This is the page a search engine or an AI answer tool reads to
// decide who is behind the site, so it says so in the structured data too.
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": CANONICAL,
  url: CANONICAL,
  name: "About OakTend",
  description: DESCRIPTION,
  inLanguage: "en-US",
  about: { "@id": `${SITE_URL}#organization` },
  mainEntity: { "@id": `${SITE_URL}#organization` },
  publisher: { "@id": `${SITE_URL}#organization` },
};

const linkClass = "text-bark-700 hover:underline dark:text-stone-300";

export default function AboutPage() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <StructuredData data={aboutJsonLd} />
      <p className="text-sm">
        <Link
          href="/"
          className="text-stone-500 hover:text-bark-700 max-sm:inline-flex max-sm:min-h-11 max-sm:items-center max-sm:text-base dark:text-stone-400 dark:hover:text-stone-300"
        >
          &lt; OakTend
        </Link>
      </p>

      <h1 className="mt-4 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        About OakTend
      </h1>
      {/* The fixed entity description, word for word
          (src/lib/siteMetadata.ts): the same definition the landing page and
          the Organization node carry. */}
      <p className="mt-3 leading-relaxed text-stone-600 dark:text-stone-400">
        {ENTITY_DESCRIPTION}
      </p>

      <div className="mt-8 space-y-8 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Who we are
          </h2>
          <p className="mt-2 leading-relaxed">
            OakTend is run by OakTend LLC, a California limited liability
            company formed in September 2026 and based in Fountain Valley. We
            are a small, founder-run team, and we live and work in Orange
            County. When you write to us, one of us reads it and answers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            What OakTend does
          </h2>
          <p className="mt-2 leading-relaxed">
            You add your home and its systems, like the roof, water heater,
            and air conditioning. OakTend keeps a maintenance plan for them,
            reminds you when something is due, gives rough planning ranges for
            what a replacement might cost, and stores your home documents in
            one place. Ask OakTend, an AI assistant, answers questions using
            your home&apos;s own record. It is software, not a contractor or
            an inspector, and its answers are general information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Where things stand today
          </h2>
          <p className="mt-2 leading-relaxed">
            OakTend is in a homeowner preview. Everything is free, memberships
            are coming soon, and we do not take payments of any kind. Our
            network of local pros is not open yet. If you post a job during
            the preview, our team may look for a local pro by hand. We cannot
            promise to find one. Any pro is an independent business, not our
            employee, and we do not vet or guarantee their work, so check
            their license at cslb.ca.gov and ask for proof of insurance
            before you hire. The details are in our{" "}
            <Link href="/terms" className={linkClass}>
              Terms
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Where we work
          </h2>
          <p className="mt-2 leading-relaxed">
            OakTend is for homes anywhere in Orange County, California. See
            the{" "}
            <Link href="/oc" className={linkClass}>
              list of cities
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            How we source our local facts
          </h2>
          <p className="mt-2 leading-relaxed">
            Our{" "}
            <Link href="/guides" className={linkClass}>
              guides
            </Link>{" "}
            and city pages are written by the OakTend team. For rules and
            local conditions we read the public source, such as the state
            contractor license board, state housing rules, city building
            departments and local water agencies, and where a guide lists
            sources, each one is a page we opened and checked against the
            number it supports. Cost ranges are rough planning figures, not
            quotes, and the real price for your home can land outside them.
            If you spot something wrong or out of date, tell us through the{" "}
            <Link href="/contact" className={linkClass}>
              contact form
            </Link>{" "}
            and we will fix it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Your information
          </h2>
          <p className="mt-2 leading-relaxed">
            We do not sell your personal information and we run no ad
            trackers. Our{" "}
            <Link href="/privacy" className={linkClass}>
              Privacy Policy
            </Link>{" "}
            says exactly what we collect and who receives it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Contact
          </h2>
          <p className="mt-2 leading-relaxed">
            Email:{" "}
            <a href="mailto:hello@oaktend.com" className={linkClass}>
              hello@oaktend.com
            </a>
            <br />
            Support:{" "}
            <a href={`mailto:${LEGAL.supportEmail}`} className={linkClass}>
              {LEGAL.supportEmail}
            </a>
            <br />
            Phone:{" "}
            <a
              href={`tel:${LEGAL.businessPhone.replace(/[^\d+]/g, "")}`}
              className={linkClass}
            >
              {LEGAL.businessPhone}
            </a>
            <br />
            Mail: {LEGAL.legalName}, {LEGAL.address}
          </p>
          <p className="mt-2 leading-relaxed">
            You can also use our{" "}
            <Link href="/contact" className={linkClass}>
              contact form
            </Link>
            . In an emergency, call 911. OakTend is not an emergency service.
          </p>
        </section>
      </div>
    </main>
  );
}

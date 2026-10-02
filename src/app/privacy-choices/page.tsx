import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";
import AnalyticsPreference from "@/components/AnalyticsPreference";
import { gaMeasurementIdFromEnv } from "@/lib/googleAnalytics";
import { formatLegalDate } from "@/lib/legalMarkdown";

// Public top-level page, same pattern as src/app/terms/page.tsx: see
// src/lib/supabase/middleware.ts for the allowlist entry and
// src/app/sitemap.ts for the sitemap entry. Short, hand-written page, not
// rendered from src/content/legal: it's a quick-answer index pointing at the
// full Privacy Policy (src/app/privacy) and the in-app controls, not a
// document of its own.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Your Privacy Choices",
  description:
    "OakTend does not sell or share your personal information. Here's how to exercise your privacy rights and where the controls live.",
  alternates: {
    canonical: `${SITE_URL}/privacy-choices`,
  },
};

export default function PrivacyChoicesPage() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <p className="text-sm">
        <Link
          href="/"
          className="text-stone-600 hover:text-bark-700 max-sm:inline-flex max-sm:min-h-11 max-sm:items-center max-sm:text-base dark:text-stone-300 dark:hover:text-stone-100"
        >
          &lt; OakTend
        </Link>
      </p>

      <h1 className="mt-4 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Your Privacy Choices
      </h1>
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        Last updated {formatLegalDate(LEGAL.effectiveDate)}.
      </p>
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        The short answer. See the{" "}
        <Link href="/privacy" className="text-bark-700 hover:underline dark:text-stone-300">
          full Privacy Policy
        </Link>{" "}
        for everything else.
      </p>

      <div className="mt-8 space-y-8 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            We don&apos;t sell or share your data
          </h2>
          <p className="mt-2 leading-relaxed">
            OakTend does not sell your personal information, and we do not share it for
            cross-context behavioral advertising. There is no advertiser, ad network, or data
            broker anywhere in OakTend to opt out of, and the optional Google Analytics on our
            public pages runs with ad features off. See{" "}
            <Link href="/privacy#7-your-california-privacy-rights" className="text-bark-700 hover:underline dark:text-stone-300">
              Your California Privacy Rights
            </Link>{" "}
            in the Privacy Policy for the full detail on what that means under California law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Google Analytics
          </h2>
          <p className="mt-2 leading-relaxed">
            On our public pages, such as the home page, guides, and city pages, we use Google
            Analytics only if you allow it. It is never loaded inside your signed-in account, and
            we never send it your name, email, or address. Google Signals and ad personalization
            are off. See the{" "}
            <Link href="/cookies" className="text-bark-700 hover:underline dark:text-stone-300">
              Cookie and Tracking Notice
            </Link>{" "}
            for the cookies it uses.
          </p>
          {gaMeasurementIdFromEnv() && (
            <div className="mt-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
              <AnalyticsPreference />
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Global Privacy Control and Do Not Track
          </h2>
          <p className="mt-2 leading-relaxed">
            Where your browser sends the Global Privacy Control (GPC) signal, OakTend honors it as
            a valid request to opt out of the sale and sharing of your personal information. We
            don&apos;t sell or share personal information in the first place, so GPC doesn&apos;t
            change how your account data is handled. It does turn Google Analytics off: with GPC
            or Do Not Track on, we don&apos;t load Google Analytics, even if you allowed it before.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Download or delete your data
          </h2>
          <p className="mt-2 leading-relaxed">
            If you have an account, the fastest way to act on any of this is inside the app: go to{" "}
            <Link href="/account/privacy" className="text-bark-700 hover:underline dark:text-stone-300">
              Account &gt; Privacy
            </Link>{" "}
            to download a copy of your data, as a JSON file or a PDF, or to permanently delete your
            account, without waiting on us. Deletion starts immediately and finishes within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Questions or a request by email
          </h2>
          <p className="mt-2 leading-relaxed">
            For a correction request, an authorized-agent request, or anything Account &gt;
            Privacy doesn&apos;t cover, email{" "}
            <a href={`mailto:${LEGAL.privacyEmail}`} className="text-bark-700 hover:underline dark:text-stone-300">
              {LEGAL.privacyEmail}
            </a>
            . See the{" "}
            <Link href="/privacy" className="text-bark-700 hover:underline dark:text-stone-300">
              Privacy Policy
            </Link>{" "}
            for response times, verification, and everything else we collect and why.
          </p>
          <p className="mt-2 leading-relaxed">
            Phone:{" "}
            <a
              href={`tel:${LEGAL.businessPhone.replace(/[^\d+]/g, "")}`}
              className="text-bark-700 hover:underline dark:text-stone-300"
            >
              {LEGAL.businessPhone}
            </a>
            <br />
            Mail: {LEGAL.address}
          </p>
        </section>
      </div>
    </main>
  );
}

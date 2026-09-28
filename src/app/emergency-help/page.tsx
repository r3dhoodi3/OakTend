import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import PanicCard from "@/app/(app)/emergency/PanicCard";
import { EMERGENCY_SAFETY_LINE, FLOWS } from "@/app/(app)/emergency/content";

// Public, account-free version of the in-app /emergency page. A homeowner in
// the middle of a burst pipe or a gas smell should reach these steps without
// signing in or claiming a property first, so this route lives OUTSIDE the
// auth-gated (app) group and is listed in the middleware public-paths allowlist
// (see src/lib/supabase/middleware.ts).
//
// It reuses the SAME content source (FLOWS) and the SAME PanicCard visual
// treatment as the in-app page, so the safety steps are never forked: edit the
// steps once in (app)/emergency/content.ts and both pages update. The only
// difference here is there's no saved-property context, so the per-property
// "your shutoff is here" photo (prepPhotoSrc / prepNote) is simply null and the
// generic static steps render on their own.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  // The root layout's title template appends "| OakTend"; don't repeat it here.
  title: "Emergency help",
  description:
    "Fast, plain-English steps for a home emergency: burst pipe, gas smell, no heat, power out, sewage backup, or a leaking water heater. No account needed.",
  alternates: {
    canonical: `${SITE_URL}/emergency-help`,
  },
};

export default function EmergencyHelpPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <p className="text-sm">
        {/* Same phone-only 44px tap target as the /contact back link: all
            added classes are max-sm:, so sm and up is unchanged. */}
        <Link
          href="/"
          className="text-stone-500 hover:text-bark-700 max-sm:inline-flex max-sm:min-h-11 max-sm:items-center max-sm:text-base dark:text-stone-400 dark:hover:text-stone-300"
        >
          &lt; OakTend
        </Link>
      </p>

      <h1 className="mt-4 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        Emergency help
      </h1>
      <p className="mt-2 leading-relaxed text-stone-600 dark:text-stone-400">
        Pick what&apos;s happening and follow the steps in order. No account
        needed.
      </p>

      {/* Life-safety caveat, first thing on the page. Red accent is reserved
          for this one genuine 911 warning, not decoration. */}
      <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 dark:border-red-500/40 dark:bg-red-950/30">
        <div className="flex gap-3">
          <AlertTriangle
            className="mt-0.5 h-5 w-5 flex-none text-red-600 dark:text-red-400"
            aria-hidden="true"
          />
          {/* The same single safety line as the in-app page. The gas, water
              and power-line warnings live inside their own cards below, so
              they are not repeated here. */}
          <p className="text-sm font-medium leading-relaxed text-red-900 dark:text-red-200">
            {EMERGENCY_SAFETY_LINE}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {FLOWS.map(({ icon: _icon, ...flow }) => (
          <PanicCard key={flow.key} flow={flow} prepPhotoSrc={null} prepNote={null} />
        ))}
      </div>

      {/* Calm CTA once the immediate danger is handled. */}
      <section className="card mt-8 space-y-3">
        <h2 className="font-semibold text-stone-900 dark:text-stone-100">
          Once you are safe
        </h2>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          For repairs, call a local licensed company now. With a free account
          you can save what happened, with photos, to your home&apos;s record.
        </p>
        <Link href="/homeowner-signup" className="btn-primary flex w-full text-center">
          Save it to my home&apos;s record
        </Link>
        <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
          Have an account?{" "}
          <Link href="/emergency" className="text-bark-700 hover:underline dark:text-stone-300">
            Home emergency
          </Link>{" "}
          shows these steps with your own shutoff photos.
        </p>
      </section>
    </main>
  );
}

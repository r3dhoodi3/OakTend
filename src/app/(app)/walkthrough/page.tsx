import { getActiveProperty } from "@/lib/property";
import { createClient } from "@/lib/supabase/server";
import { homeHealthScore, scoreBand } from "@/lib/health";
import type { HomeSystem, Issue } from "@/lib/database.types";
import WalkthroughList from "./WalkthroughList";
import Breadcrumbs from "@/components/Breadcrumbs";

// "Walk your home": the Centriq-style capture flow. Lists every system,
// grouped by whether its details are still an onboarding ESTIMATE
// (confirmed_at is null - migration 0056) or owner-CONFIRMED. Each estimated
// system gets a "snap the data plate" card (SystemCaptureCard) so a walk
// through the house turns every guess into a real fact, one scan at a time.
export default async function WalkthroughPage(props: {
  searchParams: Promise<{ mode?: string }>;
}) {
  // ?mode=manual opens every card straight on its typing form, for the owner
  // who is not standing in front of the furnace with a phone. Read here so a
  // reload or a link (the dashboard nudge) opens in that mode; the toggle on
  // the page switches it client side and keeps the URL in step.
  const { mode } = await props.searchParams;
  const manual = mode === "manual";
  const propertyOrNull = await getActiveProperty();
  // The (app) layout (src/app/(app)/layout.tsx) is what sends an account with
  // no claimed home to the right place, and it always redirects when there is
  // no active property. But Next renders the layout and the page in PARALLEL,
  // so this function still runs on that request - and reading .id off the
  // non-null assertion below threw "Cannot read properties of null" on every
  // such GET (live log, 2026-08-30). The response was still the layout's 307,
  // so nobody ever saw it, but a TypeError thrown on a routine redirect is
  // noise that buries real errors. Bail out quietly instead and let the layout
  // own the destination: it knows whether this account belongs on /onboarding,
  // /pro/onboarding or the role picker, and this page does not.
  if (!propertyOrNull) return null;
  const property = propertyOrNull;
  const supabase = await createClient();

  const [{ data: systems }, { data: issues }] = await Promise.all([
    supabase
      .from("home_systems")
      .select("*")
      .eq("property_id", property.id)
      .order("created_at", { ascending: true }),
    supabase
      .from("issues")
      .select("*")
      .eq("property_id", property.id)
      .eq("status", "open"),
  ]);

  const sys = (systems ?? []) as HomeSystem[];
  const openIssues = (issues ?? []) as Issue[];
  const score = homeHealthScore(sys, openIssues);
  const band = scoreBand(score);

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/dashboard" }, { label: "Walk your home" }]} />
      {/* !mt-6: the same breadcrumb-to-title gap as /learn and the other Tools
          pages, without tightening this page's space-y-8 everywhere else. */}
      <div className="!mt-6">
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Walk your home
        </h1>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
          Photograph the label on each system. OakTend reads it and you
          confirm.
        </p>
      </div>

      <div className={`card-hero inline-flex items-center gap-4 border ${band.tone}`}>
        <div>
          <p className="stat-label">Home Health Score</p>
          <p className="stat-number mt-1 text-3xl">{score}/100</p>
        </div>
        <p className="text-sm">{band.label}</p>
      </div>

      {/* Toggle and both lists are client side so "Type it in" switches every
          card at once (see WalkthroughList). */}
      <WalkthroughList systems={sys} initialManual={manual} />
    </div>
  );
}

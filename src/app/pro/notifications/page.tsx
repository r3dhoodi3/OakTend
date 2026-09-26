import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getCurrentContractor } from "@/lib/contractor";
import PushSettingsCard from "@/components/PushSettingsCard";
import ProAlertPrefsForm from "./ProAlertPrefsForm";

// Where a pro decides how a new job reaches them.
//
// WHY IT EXISTS. alertProsForNewLead has always pinged matching pros on four
// channels and there was no way to turn any of them off - not even the CAN-SPAM
// unsubscribe, because "new_lead" is on EMAIL_TRANSACTIONAL_KINDS and is exempt
// from it. An alert nobody can stop is how a sending domain earns spam
// complaints, and that reputation is shared with every other email OakTend
// sends. See src/lib/proAlertPrefs.ts.
//
// The bell row is deliberately not on this page: it is always written, for
// everyone, and it is where a pro looks to see what they missed. These three
// toggles govern only the channels that reach OUT.
export const metadata: Metadata = {
  title: "Job alerts",
};

export default async function ProNotificationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  // A pro account, not just any signed-in one: this page is about the pro-side
  // fan-out, and the rest of /pro answers the same way for a visitor without a
  // contractor row.
  const contractor = await getCurrentContractor();
  if (!contractor) redirect("/pro");

  const { data: profile } = await supabase
    .from("users")
    .select("notification_prefs")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <p className="text-sm">
        <Link
          href="/pro"
          className="text-stone-500 hover:text-bark-700 max-sm:inline-flex max-sm:min-h-11 max-sm:items-center max-sm:text-base dark:text-stone-400 dark:hover:text-stone-300"
        >
          &lt; Dashboard
        </Link>
      </p>

      <div>
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Job alerts
        </h1>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          When a homeowner posts a job in one of your trades, we let you know.
          Choose how. These alerts are free, and you can change this at any
          time.
        </p>
      </div>

      {/* Above the toggles, same reasoning as the homeowner page: this is the
          only control that reaches a pro with the app CLOSED, which is what
          somebody visiting this page is usually here for. */}
      <PushSettingsCard side="pro" />

      <ProAlertPrefsForm
        prefs={
          (profile?.notification_prefs as Record<string, boolean> | null) ??
          null
        }
      />

      <p className="text-sm text-stone-500 dark:text-stone-400">
        Turning everything off here does not stop new jobs appearing on your
        leads board, and you will still see them in your notifications when you
        open OakTend.
      </p>
    </div>
  );
}

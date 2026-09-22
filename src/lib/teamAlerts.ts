import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { isMissingSchemaError } from "@/lib/dbErrors";
import { FOUNDER } from "@/lib/constants";

// WHO IS "THE OAKTEND TEAM", for the handful of alerts that go to us rather
// than to a customer.
//
// There is deliberately no admin role in this repo (see the header of
// src/app/(app)/backoffice/partners/page.tsx). The nearest thing that exists
// is users.is_internal, the flag migration 0165 added for the internal /
// test-account pairing rule, and which both founders carry. So "the team" is
// exactly "the flagged accounts", read through the admin client because
// is_internal is not readable by `authenticated` at all.
//
// FALLBACK TO THE FOUNDER ADDRESS, the same lookup the support digest uses
// (src/app/api/cron/support-digest/route.ts): if the flag column isn't there
// yet, or nobody is flagged, an alert that reaches one founder is much better
// than an alert that reaches nobody. That was the state this whole file exists
// to end - a posted job that notified no one on either side.
//
// NEVER THROWS, matching src/lib/internalAccounts.ts: every caller is a
// best-effort notifier hanging off a real user action, and a failed lookup
// must cost the homeowner nothing. An empty list is a valid answer and means
// "nobody to tell".

export type TeamRecipient = { id: string; email: string | null };

export async function teamAlertRecipients(): Promise<TeamRecipient[]> {
  try {
    const admin = createAdminClient();
    const { data, error } = await (admin.from("users") as any)
      .select("id, email")
      .eq("is_internal", true)
      .limit(20);
    if (!error && data?.length) {
      return (data as TeamRecipient[]).filter((r) => Boolean(r?.id));
    }
    if (error && !isMissingSchemaError(error)) {
      console.error("teamAlertRecipients: read failed", error.message ?? error);
    }

    // Nobody flagged (or no such column yet). Fall back to the one address
    // that is published in src/lib/constants.ts and already monitored.
    const ownerEmail = FOUNDER.email?.trim();
    if (!ownerEmail) return [];
    const { data: owner, error: ownerError } = await (admin.from("users") as any)
      .select("id, email")
      .eq("email", ownerEmail)
      .maybeSingle();
    if (ownerError) {
      console.error(
        "teamAlertRecipients: founder lookup failed",
        ownerError.message ?? ownerError
      );
      return [];
    }
    return owner?.id ? [owner as TeamRecipient] : [];
  } catch (e) {
    console.error("teamAlertRecipients: threw", e);
    return [];
  }
}

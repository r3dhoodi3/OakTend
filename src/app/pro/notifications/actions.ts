"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { setFlash } from "@/lib/flash";
import { PRO_ALERT_CHANNELS } from "@/lib/proAlertPrefs";

// Save a pro's per-channel job-alert switches onto their own user row.
//
// MERGES, rather than overwriting the jsonb. The homeowner form
// (src/app/(app)/account/notifications/actions.ts) rebuilds notification_prefs
// from its own checkboxes and then re-attaches the two keys it knows it does
// not own - a pattern that quietly loses any key nobody remembered. A
// dual-side account exists here (a founder testing both sides is exactly one),
// so this reads the current blob and sets only its own three keys, leaving
// every other key it has never heard of untouched.
//
// Each checkbox posts "on" when ticked and nothing at all when not, so an
// absent value is an explicit false rather than "unset" - which is why the
// write stores a real boolean for all three rather than deleting keys. Absent
// means ON everywhere else in this feature (see proAlertChannelOn), and that
// default must not quietly re-enable a channel the pro just switched off.
export async function saveProAlertPrefsAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: current } = await supabase
    .from("users")
    .select("notification_prefs")
    .eq("id", user.id)
    .single();

  // The generated type for this jsonb column is a boolean map, and every key
  // the app writes into it is in fact a boolean - but it is jsonb, so a hand
  // edit or an older row could hold anything. Spread through a loose record
  // and cast once on the way back in, rather than pretending the read was
  // narrower than it is.
  const prefs: Record<string, unknown> = {
    ...((current?.notification_prefs as Record<string, unknown> | null) ?? {}),
  };
  for (const c of PRO_ALERT_CHANNELS) {
    prefs[c.key] = formData.get(c.key) === "on";
  }

  const { error } = await supabase
    .from("users")
    .update({
      notification_prefs: prefs as { [key: string]: boolean },
    })
    .eq("id", user.id);

  if (error) {
    await setFlash("Couldn't update your settings. Please try again.", "error");
  } else {
    await setFlash("Alert settings saved.", "success");
  }
  revalidatePath("/pro/notifications");
}

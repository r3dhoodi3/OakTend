// Which channels a pro wants their new-job alerts on.
//
// WHAT WAS WRONG BEFORE. alertProsForNewLead has always fanned a new job out on
// four channels - bell row, email, SMS, web push - and a pro had no way to turn
// any of them off. Worse, "new_lead" is on EMAIL_TRANSACTIONAL_KINDS, so the
// CAN-SPAM one-click unsubscribe did not stop them either: a pro could hit
// unsubscribe and keep getting alert email forever. That is the shape of thing
// that earns spam complaints, and a spam complaint costs the sending domain's
// reputation, which is shared with every other email OakTend sends.
//
// DEFAULT ON, EXPLICITLY OFF. An absent key means the channel is ON. A pro who
// signs up and never opens settings still gets the leads - that is the product
// they came for, and a marketplace that silently delivers nothing until you
// find a checkbox is worse than useless during a cold start. Only an explicit
// `false` turns a channel off.
//
// THE BELL ROW IS NOT A CHANNEL HERE, on purpose. The in-app notification row
// is always written for everyone, the same rule the whole notify stack follows
// (see src/lib/notify.ts): it costs nothing, interrupts nobody, and it is where
// a pro looks when they wonder what they missed. These toggles govern only the
// three channels that reach OUT to somebody.
//
// PURE MODULE, no "server-only", no Supabase: the fan-out (server), the
// settings form (a client component's data) and the tests all need the same
// answer, and it is a lookup in a jsonb blob the caller already has in hand.

export type ProAlertPrefs = {
  pro_alert_email?: boolean | null;
  pro_alert_sms?: boolean | null;
  pro_alert_push?: boolean | null;
} | null | undefined;

export type ProAlertChannelKey =
  | "pro_alert_email"
  | "pro_alert_sms"
  | "pro_alert_push";

// The settings form renders straight off this list, and the save action reads
// it back, so the two cannot drift. Mirrors NOTIFICATION_CHANNELS on the
// homeowner side (src/app/(app)/account/notifications/channels.ts).
export const PRO_ALERT_CHANNELS: ReadonlyArray<{
  key: ProAlertChannelKey;
  label: string;
  desc: string;
}> = [
  {
    key: "pro_alert_email",
    label: "Email",
    desc: "A new job in your trades, sent to your account email.",
  },
  {
    key: "pro_alert_sms",
    label: "Text message",
    desc: "Only if you have also agreed to texts in your profile. Never before 8am or after 9pm.",
  },
  {
    key: "pro_alert_push",
    label: "Phone notification",
    desc: "A notification on the lock screen of any device you have signed in on.",
  },
] as const;

// Is this channel on for this pro? Absent, null, or anything that is not
// exactly `false` means on - see the default-on note above. Written as a
// not-false test rather than a truthiness test so a legacy row that stored a
// string or a 1 keeps working rather than silently going dark.
export function proAlertChannelOn(
  prefs: ProAlertPrefs,
  key: ProAlertChannelKey
): boolean {
  return prefs?.[key] !== false;
}

// The three answers at once, for a caller filtering a fan-out.
export function proAlertChannels(prefs: ProAlertPrefs): {
  email: boolean;
  sms: boolean;
  push: boolean;
} {
  return {
    email: proAlertChannelOn(prefs, "pro_alert_email"),
    sms: proAlertChannelOn(prefs, "pro_alert_sms"),
    push: proAlertChannelOn(prefs, "pro_alert_push"),
  };
}

// The keys this feature owns inside users.notification_prefs.
//
// Needed because BOTH settings forms overwrite that jsonb wholesale and then
// re-attach the keys they do not own (the homeowner form already does this for
// email_opt_out and push_opt_out, with a comment explaining that a plain
// overwrite would silently re-subscribe someone). Without carrying these three
// across, a dual-side account saving their homeowner preferences would quietly
// turn every pro alert channel back on.
export const PRO_ALERT_PREF_KEYS: readonly ProAlertChannelKey[] = [
  "pro_alert_email",
  "pro_alert_sms",
  "pro_alert_push",
];

// Copy whichever of this feature's keys are set on an existing prefs blob onto
// a new one. Used by both save actions, in both directions.
export function carryProAlertPrefs(
  from: Record<string, unknown> | null | undefined,
  onto: Record<string, unknown>
): Record<string, unknown> {
  for (const key of PRO_ALERT_PREF_KEYS) {
    if (from && typeof from[key] === "boolean") onto[key] = from[key];
  }
  return onto;
}

"use client";

import SubmitButton from "@/components/SubmitButton";
import { saveProAlertPrefsAction } from "./actions";
import { PRO_ALERT_CHANNELS, proAlertChannelOn } from "@/lib/proAlertPrefs";

// The three job-alert channels a pro can switch off. Same markup and the same
// tap-target rules as the homeowner form it mirrors
// (src/app/(app)/account/notifications/NotificationPrefsForm.tsx) - including
// accent-bark-600, which is what actually colours a checkbox in this project
// since @tailwindcss/forms is not loaded.
//
// Everything defaults to ON, which is what proAlertChannelOn answers for an
// absent key: a pro who never opens this page still gets their leads.
export default function ProAlertPrefsForm({
  prefs,
}: {
  prefs: Record<string, boolean> | null;
}) {
  return (
    <form action={saveProAlertPrefsAction} className="card p-6">
      <div className="divide-y divide-stone-100 dark:divide-white/10">
        {PRO_ALERT_CHANNELS.map((c) => (
          <label
            key={c.key}
            className="flex min-h-11 cursor-pointer items-start justify-between gap-4 py-4 first:pt-0"
          >
            <span>
              <span className="block text-sm font-medium text-stone-900 dark:text-stone-100">
                {c.label}
              </span>
              <span className="block text-sm text-stone-500 dark:text-stone-400">
                {c.desc}
              </span>
            </span>
            <input
              type="checkbox"
              name={c.key}
              defaultChecked={proAlertChannelOn(prefs, c.key)}
              className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-bark-600 rounded border-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bark-600 dark:border-white/20"
            />
          </label>
        ))}
      </div>

      <div className="mt-5">
        <SubmitButton>Save alert settings</SubmitButton>
      </div>
    </form>
  );
}

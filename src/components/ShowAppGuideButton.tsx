"use client";

import { APP_GUIDE_EVENT } from "@/lib/appGuide";

// "Show the app guide again" for the help pages, both sides.
//
// A window event rather than a link or a query param: AppGuide is already
// mounted in the shell around every signed-in page (it renders null while it
// is closed), so this reopens it in place with no navigation, no refetch, and
// no route that only exists to be a switch. It also works after the account
// has been stamped as seen, which a server-decided prop could not do.
// Both shells use the same bark link colour now (the pro side dropped the
// ember red); the tone stays the caller's to pass so the two can differ again
// without this button having to guess.
const TONE = {
  homeowner: "text-bark-700 dark:text-stone-300",
  pro: "text-bark-700 dark:text-stone-300",
} as const;

export default function ShowAppGuideButton({
  tone = "homeowner",
  label = "Show the app guide again",
}: {
  tone?: keyof typeof TONE;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(APP_GUIDE_EVENT))}
      className={`focus-ring inline-flex min-h-11 items-center text-sm font-medium hover:underline ${TONE[tone]}`}
    >
      {label}
    </button>
  );
}

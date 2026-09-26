"use client";

import Link from "next/link";
import { markPushMoment } from "@/lib/pushPrompt";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import InlineSpinner from "@/components/InlineSpinner";
import {
  unlockDirectRequestAction,
  declineDirectRequestAction,
} from "./actions";
import { GHOST_PROTECTION_DAYS } from "@/lib/constants";

// Submit button for the unlock confirm form. Needs its own component because
// useFormStatus only reports pending state inside a descendant of the <form>
// it belongs to, matching ApplyJobButton's ConfirmPayButton.
function UnlockButton() {
  const { pending } = useFormStatus();
    // A pro unlocking a direct request is exactly the moment the push prompt is allowed
    // to appear: they now have money on a job and want to know the second the
    // homeowner replies. markPushMoment only stamps localStorage; the prompt
    // itself decides whether to ask (see src/lib/pushPrompt.ts). Fired on the
    // tap rather than on a success callback because this is a plain server-
    // action form with no client success state - a rare failed charge means at
    // worst one prompt shown a moment early.
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={() => markPushMoment()}
      className="btn-primary flex-1 text-sm"
    >
      {pending && <InlineSpinner />}
      Accept this request
    </button>
  );
}

// The free "Pass" submit, in its own form.
function PassButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-secondary text-sm">
      {pending && <InlineSpinner />}
      Pass
    </button>
  );
}

// Unlock / Pass actions for an "Asked for you" card. Unlocking accepts the
// request; it was a paid action until migration 0172 made it free, and the
// confirm step stays because accepting still commits the pro to the job
// first, same as ApplyJobButton.
export default function DirectRequestActions({
  leadId,
}: {
  leadId: string;
}) {
  const [confirming, setConfirming] = useState(false);

  // An insuranceRequired early return stood here, swapping Accept for a
  // "proof of insurance required" notice on roof / structural / remodeling
  // requests. Removed with the gate itself (migration 0173) - the homeowner
  // sees what is on file and decides.

  if (confirming) {
    return (
      <form
        action={unlockDirectRequestAction}
        className="space-y-2 rounded-lg border border-stone-200 bg-stone-50 p-3 dark:border-white/10 dark:bg-stone-900"
      >
        <input type="hidden" name="id" value={leadId} />
        {/* The charge sentence and its ghost-protection credit-back promise
            stood here. Accepting is free as of migration 0172, so what is
            left to say is what actually happens. */}
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Accepting this request opens the chat and gives you the
          homeowner&apos;s contact details. It is free.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="btn-secondary text-sm"
          >
            Cancel
          </button>
          <UnlockButton />
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="btn-primary text-sm"
      >
        Accept
      </button>
      <form action={declineDirectRequestAction}>
        <input type="hidden" name="id" value={leadId} />
        <PassButton />
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { refreshMarketValueAction } from "./actions";
import { formatRefreshDate } from "./refreshDate";
import SubmitButton from "@/components/SubmitButton";

// The "Refresh estimate" control under the headline number.
//
// THE DOOR IS VISIBLE BEFORE THE TAP. A free account does not get a button
// that fails: it gets the same-looking control carrying a "Plus" tag, and it
// goes to /plus instead of to the server. Nobody learns where the line is by
// running into it. The server action refuses a free account anyway
// (refreshMarketValueAction checks hasPlus before it can bill RentCast) - this
// is the honest half of the same gate, not the enforcing half.
//
// The 30-day floor (F2) is shown the same way: inside the window the button is
// the same control, disabled, with the date it comes back under it, rather
// than a live button that spends a press to say "not yet".
export default function RefreshValue({
  isPlus,
  nextRefreshAt = null,
}: {
  isPlus: boolean;
  // ISO instant this home's refresh comes back, or null when the button is
  // live. Decided on the SERVER (src/app/(app)/value/page.tsx) from the same
  // cached call the action's floor reads, so whether the button is disabled
  // never depends on the browser's clock and never differs between the server
  // render and hydration.
  nextRefreshAt?: string | null;
}) {
  const [error, setError] = useState<string | null>(null);
  // What the server said about this press, once there has been one: the whole
  // line under the button, not a fragment to assemble here.
  const [note, setNote] = useState<string | null>(null);
  const [nextAt, setNextAt] = useState<string | null>(nextRefreshAt);

  if (!isPlus) {
    return (
      <Link href="/plus?reason=value" className="btn-secondary">
        Refresh estimate
        <span className="chip ml-1.5 bg-bark-100 text-bark-700 dark:bg-bark-700 dark:text-stone-300">
          Plus
        </span>
      </Link>
    );
  }

  // Before any press, the line is just when the button comes back.
  const line =
    note ?? (nextAt ? `You can refresh again on ${formatRefreshDate(nextAt)}.` : null);

  return (
    <form
      action={async () => {
        const result = await refreshMarketValueAction();
        if (!result.ok) {
          setNote(null);
          setError(result.error);
          return;
        }
        setError(null);
        const next = result.data?.nextRefreshAt ?? null;
        setNextAt(next);
        setNote(
          result.data?.note ??
            (next
              ? `Estimate updated. You can refresh again on ${formatRefreshDate(next)}.`
              : "Estimate updated.")
        );
      }}
      className="space-y-2"
    >
      {nextAt ? (
        // Same control, disabled. .btn already carries disabled:opacity-50 and
        // disabled:cursor-not-allowed (globals.css), so the muted look matches
        // every other disabled button in the app.
        <button
          type="button"
          className="btn-secondary"
          disabled
          aria-disabled="true"
        >
          Refresh estimate
        </button>
      ) : (
        /* pendingLabel is the whole point of routing this through
           SubmitButton: an AVM lookup is a network round trip to RentCast, so
           without a pending state the button looks dead for a second or two and
           gets tapped twice. */
        <SubmitButton className="btn-secondary" pendingLabel="Refreshing…">
          Refresh estimate
        </SubmitButton>
      )}
      {error && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      {line && !error && (
        <p className="text-xs text-stone-500 dark:text-stone-400">{line}</p>
      )}
    </form>
  );
}

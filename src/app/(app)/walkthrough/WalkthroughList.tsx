"use client";

import { useEffect, useRef, useState } from "react";
import { labelFor, SYSTEM_TYPES } from "@/lib/constants";
import type { HomeSystem } from "@/lib/database.types";
import SystemCaptureCard from "./SystemCaptureCard";

// The photo-or-typing toggle plus the two lists.
//
// The toggle is client state, not a link. It used to be two <Link>s to
// /walkthrough and /walkthrough?mode=manual, and the cards only read the mode
// when they first mounted, so a soft navigation kept every card on its photo
// tile: tapping "Type it in instead" did nothing you could see. Now the switch
// is instant, every card follows it (including a card switched on its own),
// and the URL is kept in step with replaceState so a reload or a shared link
// still opens in the same mode. Nothing above the pills depends on the mode,
// so they never move when it changes.
export default function WalkthroughList({
  systems,
  initialManual,
}: {
  systems: HomeSystem[];
  initialManual: boolean;
}) {
  // The page-wide choice plus a counter that goes up on EVERY pill press.
  // Cards follow the counter, not the boolean, so pressing the pill that is
  // already lit still brings back a card the owner switched on its own. The
  // old check (do nothing when the mode is unchanged) is why "Take photos"
  // left a card stuck on its text boxes after that card's own "Type it in".
  const [mode, setMode] = useState({ manual: initialManual, seq: 0 });
  const manual = mode.manual;
  // Systems confirmed on this visit stay where they are (showing their score
  // change) after the refreshed page marks them confirmed, instead of jumping
  // down to the Confirmed list mid-walk.
  const [confirmedHere, setConfirmedHere] = useState<Set<string>>(
    () => new Set()
  );

  // A link from elsewhere (the dashboard nudge, the Tools menu) can land here
  // with a different mode while the page is already mounted. Skips the first
  // render, where the state above already matches.
  const lastInitial = useRef(initialManual);
  useEffect(() => {
    if (lastInitial.current === initialManual) return;
    lastInitial.current = initialManual;
    setMode((m) => ({ manual: initialManual, seq: m.seq + 1 }));
  }, [initialManual]);

  function choose(next: boolean) {
    setMode((m) => ({ manual: next, seq: m.seq + 1 }));
    if (next === manual) return;
    try {
      const url = new URL(window.location.href);
      if (next) url.searchParams.set("mode", "manual");
      else url.searchParams.delete("mode");
      window.history.replaceState(window.history.state, "", url);
    } catch {
      // The switch itself already happened; the URL is a convenience.
    }
  }

  function markConfirmed(id: string) {
    setConfirmedHere((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  const toConfirm = systems.filter(
    (s) => !s.confirmed_at || confirmedHere.has(s.id)
  );
  const confirmed = systems.filter(
    (s) => s.confirmed_at && !confirmedHere.has(s.id)
  );
  const openCount = systems.filter((s) => !s.confirmed_at).length;

  const pill =
    "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium";
  const on =
    "border-bark-600 bg-bark-600 text-white dark:border-bark-500 dark:bg-bark-500";
  const off =
    "border-stone-200 bg-white text-stone-700 hover:border-bark-500 dark:border-white/10 dark:bg-stone-800 dark:text-stone-300";

  return (
    <>
      {toConfirm.length > 0 && openCount > 0 && (
        <div
          role="group"
          aria-label="How to add your details"
          className="flex flex-wrap gap-2"
        >
          <button
            type="button"
            aria-pressed={!manual}
            onClick={() => choose(false)}
            className={`${pill} ${manual ? off : on}`}
          >
            Take photos
          </button>
          <button
            type="button"
            aria-pressed={manual}
            onClick={() => choose(true)}
            className={`${pill} ${manual ? on : off}`}
          >
            Type it in instead
          </button>
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
          To confirm{openCount > 0 ? ` (${openCount})` : ""}
        </h2>
        {toConfirm.length > 0 ? (
          <ul className="space-y-3">
            {toConfirm.map((s) => (
              <SystemCaptureCard
                key={s.id}
                system={s}
                manual={manual}
                modeSeq={mode.seq}
                onConfirmed={markConfirmed}
              />
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-stone-300 p-6 text-center text-sm text-stone-600 dark:border-stone-700 dark:text-stone-300">
            Every system is confirmed. Nice work.
          </p>
        )}
      </section>

      {confirmed.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Confirmed ({confirmed.length})
          </h2>
          <ul className="space-y-2">
            {confirmed.map((s) => (
              <li
                key={s.id}
                className="card flex flex-wrap items-center justify-between gap-2 text-sm"
              >
                <span className="flex flex-wrap items-center gap-x-2 text-stone-900 dark:text-stone-100">
                  <span className="font-medium">
                    {labelFor(SYSTEM_TYPES, s.system_type)}
                  </span>
                  {(s.material_or_model || s.install_year) && (
                    <span className="text-stone-600 dark:text-stone-300">
                      {[
                        s.material_or_model,
                        s.install_year ? `installed ${s.install_year}` : null,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  )}
                </span>
                <span className="chip bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-200">
                  Confirmed
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

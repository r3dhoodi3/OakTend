"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAndSaveMarketValueAction } from "./actions";

function money(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

// Kicks off the lazy RentCast AVM (market value) lookup the FIRST time someone
// opens /value, off the render path (the server component never writes to the
// DB during render). needsFetch is computed server-side from market_value
// being null plus an address on file.
//
// A per-property flag in localStorage means we attempt this once per browser
// once we have a real ANSWER. This matters for the MISS case: if the address
// returns no value, market_value stays null, so without this guard the fetch
// would re-fire every single time the tab is reopened. The flag is set when
// the action reports a hit or a real miss ("RentCast has no estimate for this
// address") - NOT when it could not ask at all (no key, a timeout, an outage,
// over budget). It used to be set BEFORE firing, which made one bad moment
// permanent: a home whose first attempt failed never got a value in that
// browser (2026-09-20). A failed attempt now simply tries again on the next
// visit; the server's own budget and its one-hour error cache keep that from
// turning into a retry storm. The in-memory ref still guards React Strict
// Mode's dev double-invoke within one mount.
export default function ValueAutoFetch({
  needsFetch,
  propertyId,
  silent = false,
}: {
  needsFetch: boolean;
  propertyId: string;
  // The dashboard mounts this inside its home-value tile purely to trigger the
  // lookup; the refreshed tile is the feedback, so it renders nothing of its
  // own. The localStorage flag below is keyed on the property, not the page,
  // so whichever screen the owner opens first spends the one attempt and the
  // other never repeats it.
  silent?: boolean;
}) {
  const router = useRouter();
  const firedRef = useRef(false);
  // The number the action just fetched, shown right away instead of leaving
  // this component blank until router.refresh() below re-renders the whole
  // page's server-side card. Read live against the current `needsFetch` prop
  // (not a snapshot from when the fetch started), so this note disappears the
  // instant the refreshed page takes over showing the real card - there's
  // never a moment with both on screen.
  const [fetched, setFetched] = useState<number | null>(null);

  useEffect(() => {
    if (!needsFetch || firedRef.current) return;
    firedRef.current = true;

    const flagKey = `oaktend_avm_tried_${propertyId}`;
    try {
      // Already answered once for this property: never run again, hit or miss.
      if (localStorage.getItem(flagKey)) return;
    } catch {
      // localStorage unavailable (private mode, etc.): fall through and attempt
      // once for this mount anyway; the ref guard still prevents a double-fire.
    }

    fetchAndSaveMarketValueAction()
      .then((result) => {
        // A real answer, either way, is the end of asking in this browser. An
        // "unavailable" (or a malformed result) leaves the flag unset.
        if (result?.ok || result?.reason === "miss") {
          try {
            localStorage.setItem(flagKey, "1");
          } catch {
            // Same as above: no storage, no flag, the ref guard still holds
            // for this mount.
          }
        }
        if (!result?.ok) return;
        if (typeof result.marketValue === "number") {
          setFetched(result.marketValue);
        }
        // Still needed to update everything else that is derived from the
        // market value server-side (equity, the value-over-time chart, the
        // purchase-price comparison) - the local number above just means the
        // owner isn't staring at nothing while that round trip is in flight.
        router.refresh();
      })
      .catch(() => {
        // Fail soft: leave whatever estimate the page already showed.
      });
  }, [needsFetch, propertyId, router]);

  if (silent || fetched == null || !needsFetch) return null;

  return (
    <p className="mb-4 rounded-lg border border-bark-100 bg-bark-50 px-3 py-2 text-center text-sm font-medium text-bark-700 dark:border-bark-700/40 dark:bg-bark-700/20 dark:text-stone-300">
      Estimated value: {money(fetched)}
    </p>
  );
}

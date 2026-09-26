"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Collapse, { COLLAPSE_MS } from "@/components/Collapse";

// A <details> whose content slides open and closed (see Collapse).
//
// Still a real <details>/<summary> in the DOM, on purpose: links to its #id,
// the spotlight tour's "#systems > summary" hook, and the browser's
// find-in-page auto-expand all keep working. The one thing a plain <details>
// cannot do is animate a close, because the browser hides the content the
// instant `open` comes off. So the summary's click is taken over: `shown`
// flips right away and drives the animation, and the real `open` attribute
// comes off only after the content has finished closing.
//
// The summary's children can follow the state while it moves with
// group-data-[shown=true]: (the chevron does), since details[open] runs
// COLLAPSE_MS late on the way out. A nested one passes a named group
// (className="group/sub") and its chevron uses group-data-[shown=true]/sub:,
// or it would read the OUTER details' state.
//
// 2026-09-21: every chevron dropdown slides now, not just Your systems, so
// this also carries the two things those needed: a `className` for the
// details itself, and the "remember that I closed it" behaviour that used to
// live in RememberedDetails (which is now a thin wrapper over this).

const REMEMBER_PREFIX = "oaktend_details_closed_";

export default function AnimatedDetails({
  id,
  defaultOpen = false,
  rememberKey,
  forceOpen = false,
  className = "group",
  testId,
  summary,
  summaryClassName,
  contentClassName,
  children,
}: {
  id?: string;
  defaultOpen?: boolean;
  // Remember a CLOSE across visits, per key (localStorage). Starts open (or
  // at defaultOpen) and stays open until the user closes it; from then on it
  // starts closed until they open it again. Read before first paint so a
  // remembered close never flashes open.
  rememberKey?: string;
  // An explicit "show me" (?plan=open): opens it and clears the remembered
  // close, so it does not snap shut again on the very next visit.
  forceOpen?: boolean;
  // On the <details>. Must include a Tailwind group marker ("group", or a
  // named "group/x" when nested inside another group) for the chevron to
  // follow data-shown. Defaults to "group".
  className?: string;
  testId?: string;
  summary: React.ReactNode;
  summaryClassName?: string;
  // On the clipped content box. Top spacing goes here as padding so it closes
  // with the content.
  contentClassName?: string;
  children: React.ReactNode;
}) {
  const startOpen = defaultOpen || forceOpen;
  const [domOpen, setDomOpen] = useState(startOpen);
  const [shown, setShown] = useState(startOpen);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const storageKey = rememberKey ? `${REMEMBER_PREFIX}${rememberKey}` : null;

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  // Layout effect, not effect: it runs before the browser paints, so a
  // remembered close is applied to the first frame and the box never flashes
  // open and then shuts. (Reading storage during render would disagree with
  // the server's markup and cause a hydration mismatch.)
  useLayoutEffect(() => {
    if (!storageKey) return;
    if (forceOpen) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        /* private mode / storage disabled: open is the default anyway */
      }
      setDomOpen(true);
      setShown(true);
      return;
    }
    let closed = false;
    try {
      closed = localStorage.getItem(storageKey) === "1";
    } catch {
      /* ignore */
    }
    if (closed) {
      setDomOpen(false);
      setShown(false);
    }
  }, [storageKey, forceOpen]);

  function remember(nowOpen: boolean) {
    if (!storageKey) return;
    try {
      if (nowOpen) localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  }

  function toggle() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (shown) {
      setShown(false);
      remember(false);
      closeTimer.current = setTimeout(() => setDomOpen(false), COLLAPSE_MS);
    } else {
      setDomOpen(true);
      setShown(true);
      remember(true);
    }
  }

  return (
    <details
      id={id}
      open={domOpen}
      data-shown={shown}
      className={className}
      data-testid={testId}
      // The browser opened it on its own (find-in-page, a #hash target inside
      // closed content): follow it rather than fight it.
      onToggle={(e) => {
        if (e.currentTarget.open && !domOpen) {
          setDomOpen(true);
          setShown(true);
          remember(true);
        }
      }}
    >
      <summary
        className={summaryClassName}
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
      >
        {summary}
      </summary>
      <Collapse open={shown} className={contentClassName}>
        {children}
      </Collapse>
    </details>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
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
// COLLAPSE_MS late on the way out.
export default function AnimatedDetails({
  id,
  defaultOpen = false,
  summary,
  summaryClassName,
  contentClassName,
  children,
}: {
  id?: string;
  defaultOpen?: boolean;
  summary: React.ReactNode;
  summaryClassName?: string;
  // On the clipped content box. Top spacing goes here as padding so it closes
  // with the content.
  contentClassName?: string;
  children: React.ReactNode;
}) {
  const [domOpen, setDomOpen] = useState(defaultOpen);
  const [shown, setShown] = useState(defaultOpen);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  function toggle() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (shown) {
      setShown(false);
      closeTimer.current = setTimeout(() => setDomOpen(false), COLLAPSE_MS);
    } else {
      setDomOpen(true);
      setShown(true);
    }
  }

  return (
    <details
      id={id}
      open={domOpen}
      data-shown={shown}
      className="group"
      // The browser opened it on its own (find-in-page, a #hash target inside
      // closed content): follow it rather than fight it.
      onToggle={(e) => {
        if (e.currentTarget.open && !domOpen) {
          setDomOpen(true);
          setShown(true);
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

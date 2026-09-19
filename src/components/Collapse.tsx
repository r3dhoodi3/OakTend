"use client";

import { useEffect, useState } from "react";

// How long the height takes to open or close. AnimatedDetails waits this long
// before it really closes its <details>, so the two must stay in step.
export const COLLAPSE_MS = 380;

// Height eases over 380ms, the fade is a little quicker (260ms) so the content
// is readable before the box finishes growing. Visibility flips instantly on
// open and only after the height has closed, which is what takes the closed
// content out of the tab order and away from screen readers without a second
// piece of state. Founder's Figma demo, 2026-09-18.
const OPEN_TRANSITION = `grid-template-rows ${COLLAPSE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity 260ms ease, visibility 0s linear 0s`;
const CLOSE_TRANSITION = `grid-template-rows ${COLLAPSE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity 260ms ease, visibility 0s linear ${COLLAPSE_MS}ms`;

// A box that slides open to its content's exact height and back.
//
// The grid-rows trick: a one-row grid animates between 0fr and 1fr, and the
// browser resolves 1fr to the real content height, so nothing is measured.
// Same idea as the panels in LearnGuide, with the timing above.
//
// Reduced motion needs nothing here: the blanket rule in globals.css cuts
// every transition to 0.01ms, so the box simply opens.
export default function Collapse({
  open,
  lazy = false,
  id,
  className = "",
  children,
}: {
  open: boolean;
  // Do not render the children until the first open. For content that costs
  // something just by existing (photos that would start loading).
  lazy?: boolean;
  id?: string;
  // Goes on the inner, clipped box: put the content's top spacing here as
  // PADDING so it collapses with the content instead of lingering as a gap.
  className?: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(open || !lazy);
  // Trails `open` by a frame on the way in, so a lazily mounted box is
  // painted closed once and has something to animate from.
  const [shown, setShown] = useState(open);
  // Fully open and at rest. The box only clips while it is moving or closed:
  // once settled it lets content overflow again, so a dropdown menu or a focus
  // ring inside it is not cut off at the box's edge. A timer rather than
  // transitionend, which never fires when reduced motion removes the
  // transition.
  const [settled, setSettled] = useState(open);

  useEffect(() => {
    if (!open) {
      setSettled(false);
      setShown(false);
      return;
    }
    setMounted(true);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setShown(true));
    });
    const settle = setTimeout(() => setSettled(true), COLLAPSE_MS + 50);
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      clearTimeout(settle);
    };
  }, [open]);

  return (
    <div
      id={id}
      className="grid"
      style={{
        gridTemplateRows: shown ? "1fr" : "0fr",
        opacity: shown ? 1 : 0,
        visibility: shown ? "visible" : "hidden",
        transition: shown ? OPEN_TRANSITION : CLOSE_TRANSITION,
      }}
    >
      <div
        className={`min-h-0 ${settled ? "" : "overflow-hidden"} ${className}`}
      >
        {mounted ? children : null}
      </div>
    </div>
  );
}

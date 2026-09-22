"use client";

import { type ReactNode } from "react";
import AnimatedDetails from "@/components/AnimatedDetails";

// A <details> that starts OPEN every visit and only stays closed if the user
// closed it themselves. The owner's rule: "as long as they don't manually
// close it, it stays open" - open on the first visit and on the thousandth.
//
// Since 2026-09-21 this is a thin wrapper over AnimatedDetails, which owns
// both halves: the slide-open animation every chevron dropdown has now, and
// the remembered close (localStorage, `oaktend_details_closed_<storageKey>`,
// read before first paint so it never flashes open then snaps shut). Kept
// under its own name because "remembered" is what the dashboard means by it.
export default function RememberedDetails({
  storageKey,
  forceOpen = false,
  className,
  testId,
  summary,
  summaryClassName,
  contentClassName,
  children,
}: {
  // Unique per surface AND per user, for example `this-month-${userId}`.
  storageKey: string;
  // An explicit request to see it (today: ?plan=open). Forces it open and
  // clears the remembered close, so "View my plan" is not silently a no-op.
  forceOpen?: boolean;
  className?: string;
  testId?: string;
  summary: ReactNode;
  summaryClassName?: string;
  contentClassName?: string;
  children: ReactNode;
}) {
  return (
    <AnimatedDetails
      defaultOpen
      rememberKey={storageKey}
      forceOpen={forceOpen}
      className={className}
      testId={testId}
      summary={summary}
      summaryClassName={summaryClassName}
      contentClassName={contentClassName}
    >
      {children}
    </AnimatedDetails>
  );
}

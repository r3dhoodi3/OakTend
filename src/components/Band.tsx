// LANDING BANDS (2026-09-21, shared with /pros 2026-09-22). The landing page
// used to be twelve sections on the one cream body colour, with two dark
// rounded cards floating in the middle: one long scroll with no chapters.
// Each group of sections now sits in a band - cream (the body colour), white,
// or dark - so a change of topic reads as a change of background. Dark is
// kept for the moments that earn it: the product demo and the closing ask.
//
// The band owns the vertical rhythm: every section inside starts at mt-0 and
// siblings get the same gap, so the old per-section top margins no longer
// stack on top of the band's own padding.
//
// Server component, no client JS: it is layout only.
//
// THREE LOOKS, one switch (BAND_STYLE), while the founders pick:
//   "full"  - every band runs edge to edge across the viewport.
//   "card"  - white and dark bands are big rounded cards sitting in the page
//             column with a gap between them; "warm" bands are just the body
//             colour with nothing drawn, since a cream card on a cream page
//             would be invisible.
//   "mixed" - the dark bands run edge to edge (the demo theatre and the
//             closing ask are the page's big moments), the white ones are
//             cards, warm stays plain.
//
// Both marketing pages read this one constant, so the homeowner landing and
// the pro landing can never drift into two different looks.
export const BAND_STYLE: "full" | "card" | "mixed" = "mixed";

export default function Band({
  tone,
  wide = false,
  className = "",
  children,
}: {
  tone: "warm" | "white" | "dark";
  // The hero band is the one wider (max-w-5xl) column; everything else keeps
  // the reading column the sections were designed for.
  wide?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const bg =
    tone === "dark"
      ? "bg-stone-900 dark:bg-stone-950"
      : tone === "white"
        ? "bg-white dark:bg-stone-800"
        : "bg-oaktend-50 dark:bg-stone-900";
  const rhythm =
    "[&>section]:mt-0 [&>section+section]:mt-16 sm:[&>section+section]:mt-24";
  const column = wide ? "max-w-5xl" : "max-w-3xl";

  const asCard =
    BAND_STYLE === "card" || (BAND_STYLE === "mixed" && tone !== "dark");
  if (asCard) {
    // The card is as wide as the hero column, so the reading column inside it
    // sits with generous side padding, the way the old dark cards did.
    const card =
      tone === "warm"
        ? ""
        : `${bg} rounded-3xl border ${
            tone === "dark" ? "border-transparent" : "border-stone-200 dark:border-white/10"
          }`;
    // Half the gap above and half below, so card-to-card and card-to-band
    // spacing come out the same (a full band in mixed mode carries the same
    // half gap as a margin).
    return (
      <div className={`mx-auto max-w-5xl px-6 py-3 sm:py-4 ${className}`.trim()}>
        <div className={`${card} px-6 py-12 sm:px-10 sm:py-16`.trim()}>
          <div className={`mx-auto ${column} ${rhythm}`}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${bg} ${BAND_STYLE === "mixed" ? "my-3 sm:my-4" : ""} ${className}`.trim()}
    >
      <div className={`mx-auto px-6 py-12 sm:py-20 ${rhythm} ${column}`}>
        {children}
      </div>
    </div>
  );
}

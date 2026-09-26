// The leads-board sort: one pure module so the server's first paint and the
// client's instant re-sort can never disagree about the order.
//
// WHY IT MOVED HERE (2026-08-30). The three buttons used to be links to
// /pro/leads?sort=..., so every tap was a full server navigation: the whole
// page re-queried Supabase, re-rendered and re-streamed just to reorder a list
// the browser already had. On a phone that reads as a lag and, when a tap
// landed twice, as a bug. The rows arrive in the board as plain props, so the
// reorder is a comparator over an array the client is already holding.
//
// The board still receives the sort the URL asked for and renders that order
// on the server, so a shared or reloaded /pro/leads?sort=fee link paints
// sorted, with no flash of the wrong order.

// "fee" (Cheapest fee) came out on 2026-09-24: applying is free as of
// migration 0172, so every lead costs the same nothing and the sort had no
// axis left. The type stays a union of one rather than collapsing to a bare
// string so the next sort somebody adds slots in here and every call site
// keeps type-checking.
export type LeadSort = "new";

// Newest is the default, and the order the RPC already returns.
//
// C5 (2026-09-07 tester wave): a "Biggest deal" sort used to sit next to this
// one, ordering by percent off. It competed with the "Cheapest fee" sort for
// the same job on the same tap - two different "this is the deal" pitches on
// one board read as confusing, not helpful, and "biggest deal" specifically
// spotlighted the free aging markdown over the paid OakTend Pro lead discount
// (the pricing priority per the growth research memory). "Cheapest fee" is
// kept: it is the discount-source-agnostic bottom line, so a Pro member's
// discounted price already sorts to the top under it without a second,
// competing button.
// One option means there is no choice to offer, so the board renders no sort
// control at all while this list has a single entry (see LeadsBoard.tsx).
export const LEAD_SORT_OPTIONS: { value: LeadSort; label: string }[] = [
  { value: "new", label: "Newest" },
];

/** Anything unknown (or missing) is the default order, never an error - which
 *  is now every value, including an old ?sort=fee link somebody bookmarked. */
export function normalizeLeadSort(_value: string | undefined | null): LeadSort {
  return "new";
}

// Nothing is read off a lead to sort it any more: the only non-default order
// was by price. Kept as an empty shape rather than deleted so sortLeads keeps
// its generic contract and the next sort has somewhere to declare what it
// needs.
export type SortableLead = Record<string, unknown>;

/**
 * A new array in the asked-for order. Never mutates the input: the "Newest"
 * order is the order the caller passed in, so the board keeps that array
 * intact to switch back to.
 */
export function sortLeads<T extends SortableLead>(
  rows: readonly T[],
  sort: LeadSort
): T[] {
  // Only "new" exists today, which is the order the caller passed in, so this
  // is a defensive copy and nothing else.
  void sort;
  return rows.slice();
}

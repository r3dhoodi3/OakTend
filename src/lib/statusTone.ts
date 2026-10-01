// Status tone utilities for code that builds a class string instead of using
// the .chip-ok / .chip-warn / .chip-danger classes in globals.css. These are
// the exact same utilities as those classes (minus the .chip shape), so a
// status map in a component or helper can never drift from the chips.
//
// The rule, light and dark alike: green = good, red = bad or needs attention,
// amber = the in-between tier only (waiting, or a medium-severity heads-up),
// stone = neutral. Never brand brown/bark for a status. Contrast figures for
// every pair are in the comment above .chip-ok in globals.css.
export const STATUS_TONE = {
  ok: "border-green-300 bg-green-100 text-green-800 dark:border-green-500/30 dark:bg-green-500/15 dark:text-green-300",
  warn: "border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300",
  danger: "border-red-300 bg-red-100 text-red-700 dark:border-red-500/30 dark:bg-red-500/15 dark:text-red-300",
  muted: "border-stone-200 bg-stone-100 text-stone-600 dark:border-white/10 dark:bg-stone-700 dark:text-stone-300",
} as const;

export type StatusTone = keyof typeof STATUS_TONE;

// The same two tones for a whole card (the Home Health Score on the dashboard
// and the walkthrough). A full -100 fill across a card that size is loud, so a
// card gets the -50 fill and -200 border, same hue and same ink. Contrast:
// green-800 on green-50 6.81:1, red-700 on red-50 5.91:1; dark ink on the
// /10 tint over the stone-700 hero card stays above 5:1.
export const STATUS_CARD_TONE = {
  ok: "border-green-200 bg-green-50 text-green-800 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300",
  danger: "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300",
} as const;

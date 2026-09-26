// Brand mark: a warm OakTend house SVG with a green sprout growing inside it.
// It replaces the 🏡 emoji wordmark. Emoji render differently on every OS;
// this keeps the logo identical everywhere and lets the house take brand
// color via currentColor.
//
// The sprout carries its own green so it stays green whatever brown the house
// is given. `tone` picks which green:
//   auto   sprout-600 on the light theme, sprout-300 under .dark (default)
//   green  always sprout-600, for surfaces that stay light in dark mode
//   light  always sprout-300, for surfaces that are always dark
//   mono   currentColor, for single-color contexts
export type LogoTone = "auto" | "green" | "light" | "mono";

const SPROUT_TONE: Record<LogoTone, string | undefined> = {
  auto: "text-sprout-600 dark:text-sprout-300",
  green: "text-sprout-600",
  light: "text-sprout-300",
  mono: undefined,
};

export default function Logo({
  className = "h-6 w-6",
  tone = "auto",
}: {
  className?: string;
  tone?: LogoTone;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* House shell with chimney */}
      <path d="M3 11.5 12 4l4 3.33V5.5h2.5v3.92L21 11.5" />
      <path d="M5 10.5V20h14v-9.5" />
      {/* OakTend sprout: one stem, four leaves */}
      <g className={SPROUT_TONE[tone]}>
        <path
          d="M12 18.7C12.3 16.6 11.4 15 11.9 12.9 12.1 12 12.4 11.4 12.6 10.9"
          stroke="currentColor"
          strokeWidth="1.05"
        />
        <path
          d="M11.75 15.30C11.88 13.99 9.92 13.07 8.63 13.50C8.90 14.83 10.68 16.07 11.75 15.30z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M12.00 14.00C13.19 14.90 15.32 13.53 15.71 12.03C14.24 11.51 11.92 12.51 12.00 14.00z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M12.35 11.70C13.33 11.76 13.98 10.27 13.62 9.32C12.63 9.55 11.75 10.92 12.35 11.70z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M12.20 12.00C12.48 11.29 11.56 10.52 10.79 10.59C10.72 11.36 11.49 12.28 12.20 12.00z"
          fill="currentColor"
          stroke="none"
        />
      </g>
    </svg>
  );
}

import { ImageResponse } from "next/og";
import { ogFontOption } from "@/lib/ogFont";

// Default social share card for every page that doesn't own a more specific
// one (the pro profile page has its own: src/app/p/[id]/opengraph-image.tsx).
// Flat single-color background, no gradient, matching the rest of the brand:
// the cream page ground (bark-50) with the brown house (bark-600), the green
// sprout (sprout-600) and dark brown text, the same palette src/lib/ogCard.tsx
// uses. Values come from tailwind.config.ts, inlined as hex since satori (what
// next/og's ImageResponse renders with) can't read Tailwind classes.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "OakTend: your home, looked after";

const CREAM = "#fbf7f2";
const HOUSE_BROWN = "#915d32";
const SPROUT_GREEN = "#4f7d3a";
const TEXT_BROWN = "#4a2e1c";
const TAGLINE_BROWN = "#73482b";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: CREAM,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Same house-and-sprout mark as components/Logo.tsx, redrawn with
              explicit fill/stroke instead of currentColor: satori renders
              each image standalone, with no CSS cascade to inherit color
              from. Brown house, green sprout, as on the light site. */}
          <svg
            width="84"
            height="84"
            viewBox="0 0 24 24"
            fill="none"
            stroke={HOUSE_BROWN}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 11.5 12 4l4 3.33V5.5h2.5v3.92L21 11.5" />
            <path d="M5 10.5V20h14v-9.5" />
            <path
              d="M12 18.7C12.3 16.6 11.4 15 11.9 12.9 12.1 12 12.4 11.4 12.6 10.9"
              stroke={SPROUT_GREEN}
              strokeWidth="1.05"
            />
            <path
              d="M11.75 15.30C11.88 13.99 9.92 13.07 8.63 13.50C8.90 14.83 10.68 16.07 11.75 15.30z"
              fill={SPROUT_GREEN}
              stroke="none"
            />
            <path
              d="M12.00 14.00C13.19 14.90 15.32 13.53 15.71 12.03C14.24 11.51 11.92 12.51 12.00 14.00z"
              fill={SPROUT_GREEN}
              stroke="none"
            />
            <path
              d="M12.35 11.70C13.33 11.76 13.98 10.27 13.62 9.32C12.63 9.55 11.75 10.92 12.35 11.70z"
              fill={SPROUT_GREEN}
              stroke="none"
            />
            <path
              d="M12.20 12.00C12.48 11.29 11.56 10.52 10.79 10.59C10.72 11.36 11.49 12.28 12.20 12.00z"
              fill={SPROUT_GREEN}
              stroke="none"
            />
          </svg>
          <div style={{ fontSize: 96, fontWeight: 700, color: TEXT_BROWN }}>
            OakTend
          </div>
        </div>
        <div
          style={{
            fontSize: 40,
            color: TAGLINE_BROWN,
            marginTop: 32,
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          Know what your home needs before it costs you
        </div>
      </div>
    ),
    { ...size, ...ogFontOption() }
  );
}

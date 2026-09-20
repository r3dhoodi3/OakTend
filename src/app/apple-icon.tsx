import { ImageResponse } from "next/og";

// iOS home-screen icon. Safari will not use an SVG here, so this renders the
// same OakTend house mark as src/app/icon.svg into a 180x180 PNG at request
// time. Solid warm background: iOS squares the corners itself and shows any
// transparency as black.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbf7f2",
        }}
      >
        <svg
          width="124"
          height="124"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#915d32"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 11.5 12 4l4 3.33V5.5h2.5v3.92L21 11.5" />
          <path d="M5 10.5V20h14v-9.5" />
          <path
            d="M12 18.7C12.3 16.6 11.4 15 11.9 12.9 12.1 12 12.4 11.4 12.6 10.9"
            stroke="#4f7d3a"
            strokeWidth="1.05"
          />
          <path
            d="M11.75 15.30C11.88 13.99 9.92 13.07 8.63 13.50C8.90 14.83 10.68 16.07 11.75 15.30z"
            fill="#4f7d3a"
            stroke="none"
          />
          <path
            d="M12.00 14.00C13.19 14.90 15.32 13.53 15.71 12.03C14.24 11.51 11.92 12.51 12.00 14.00z"
            fill="#4f7d3a"
            stroke="none"
          />
          <path
            d="M12.35 11.70C13.33 11.76 13.98 10.27 13.62 9.32C12.63 9.55 11.75 10.92 12.35 11.70z"
            fill="#4f7d3a"
            stroke="none"
          />
          <path
            d="M12.20 12.00C12.48 11.29 11.56 10.52 10.79 10.59C10.72 11.36 11.49 12.28 12.20 12.00z"
            fill="#4f7d3a"
            stroke="none"
          />
        </svg>
      </div>
    ),
    size
  );
}

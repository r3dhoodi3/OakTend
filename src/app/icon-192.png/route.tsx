import { ImageResponse } from "next/og";

// Android/Chrome install icon at 192x192, referenced by src/app/manifest.ts.
// Not a special Next.js icon-file convention (those only auto-detect exact
// names like icon.tsx / apple-icon.tsx), so this is a plain Route Handler
// under a literal "icon-192.png" folder that returns the PNG bytes directly -
// same ImageResponse call src/app/apple-icon.tsx uses, just a fixed,
// predictable URL for the manifest to point at. Same house/sprout mark and
// same ~69%-of-canvas sizing as apple-icon.tsx, which already sits well
// inside the ~80% safe zone Android wants for a maskable icon, so this one
// image works for both the "any" and "maskable" purposes declared in the
// manifest - no separate padded asset needed.
const SIZE = 192;
const MARK = 132; // keep the same ~69% ratio apple-icon.tsx uses (124/180)

// Cache hard. This handler takes no input at all - no params, no query, no
// cookies, no database - so its bytes are a constant of the deployment and can
// only change when the artwork above is edited and redeployed. A GET route
// handler is dynamic by default in Next 15, so without this every install
// prompt and every Android home-screen refresh re-runs a satori render on the
// server for a picture that never changes. attachDeviceCookie already skips
// /icon* and any path with a file extension (src/lib/risk/cookies.ts), so no
// Set-Cookie rides along to make the CDN refuse to store it.
//
//   s-maxage=31536000  the CDN may hold it until the next deploy, which
//                      invalidates the cache anyway.
//   max-age=86400      a browser re-checks daily, so a changed icon reaches an
//                      already-installed app within a day rather than never.
const ICON_CACHE_CONTROL =
  "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400";

// Rendered once at build time instead of per request. The handler reads no
// params, no query, no cookies and no database, so there is nothing for a
// request to vary on - force-static is the honest declaration of that, and it
// keeps a cold serverless invocation out of the install path entirely. The
// Cache-Control above still governs how long the CDN and the browser hold it.
export const dynamic = "force-static";

export async function GET() {
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
          width={MARK}
          height={MARK}
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
    {
      width: SIZE,
      height: SIZE,
      headers: { "Cache-Control": ICON_CACHE_CONTROL },
    }
  );
}

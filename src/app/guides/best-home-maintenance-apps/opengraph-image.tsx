import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

// Social share card for this guide, on the shared shell in src/lib/ogCard.tsx.
// Title is a literal copy of this folder's metadata.title in page.tsx, not an
// import, for the reason the other guides' cards give.

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "OakTend guide: Best home maintenance apps in 2026";

export default function OgImage() {
  return renderOgCard(
    "Best home maintenance apps in 2026",
    "An OakTend home guide"
  );
}

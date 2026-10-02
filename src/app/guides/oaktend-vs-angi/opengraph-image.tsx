import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

// Social share card for this guide, on the shared shell in src/lib/ogCard.tsx.
// Title is a literal copy of this folder's metadata.title in page.tsx. Plain
// text only: no competitor logo or brand color on the card either.

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "OakTend guide: OakTend vs Angi";

export default function OgImage() {
  return renderOgCard("OakTend vs Angi", "An OakTend home guide");
}

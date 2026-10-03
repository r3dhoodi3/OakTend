import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

// Social share card for this guide, built on the shared shell in
// src/lib/ogCard.tsx. Title is a literal copy of this folder's TITLE in
// page.tsx, not an import, so the page's module graph stays out of this
// route's bundle.

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "OakTend guide: Orange County water hardness by provider";

export default function OgImage() {
  return renderOgCard(
    "Orange County water hardness by provider",
    "An OakTend home guide"
  );
}

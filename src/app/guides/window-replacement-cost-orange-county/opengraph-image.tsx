import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

// Social share card for this guide, built on the shared shell in
// src/lib/ogCard.tsx. Title is a literal copy of this folder's metadata.title
// in page.tsx, not an import (see the repipe guide's card for why).

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "OakTend guide: Window replacement cost in Orange County";

export default function OgImage() {
  return renderOgCard("Window replacement cost in Orange County", "An OakTend home guide");
}

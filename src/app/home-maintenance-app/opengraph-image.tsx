import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

// Share card for /home-maintenance-app, on the shared shell in
// src/lib/ogCard.tsx. Literal strings rather than imports from page.tsx, same
// reason as the guide cards: no page module graph in this route's bundle.

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "OakTend: the home maintenance app for Orange County homeowners";

export default function OgImage() {
  return renderOgCard(
    "The home maintenance app for Orange County homeowners",
    "OakTend · Your home looked after"
  );
}

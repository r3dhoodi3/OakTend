import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

// Share card for the how-to hub (src/app/guides/how-to/page.tsx). Title is a
// literal copy of that page's metadata.title, same reason as the guides.

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "OakTend: Home maintenance how-tos";

export default function OgImage() {
  return renderOgCard(
    "Home maintenance how-tos",
    "Short how-tos for Orange County homes"
  );
}

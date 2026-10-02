import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";
import { getChore } from "@/lib/chores";

// Share card for one how-to chore page, on the shared shell in
// src/lib/ogCard.tsx. The title is read from the chore data by slug (the
// guides each keep a literal copy instead, but here one file serves every
// chore page). The alt text is generic because Next reads `alt` as a static
// export.

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "OakTend how-to for Orange County homeowners";

export default async function OgImage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const chore = getChore(slug);
  return renderOgCard(
    chore?.metaTitle ?? "Home maintenance how-tos",
    "An OakTend how-to for Orange County homes"
  );
}

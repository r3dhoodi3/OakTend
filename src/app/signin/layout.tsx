import type { Metadata } from "next";

// The sign-in page is a client component ("use client" files can't export
// metadata), so the title/description live on this pass-through layout.
// The root layout's title template appends "| OakTend"; don't repeat it here.
export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to OakTend. One sign-in for homeowners and contractors.",
  // noindex, follow: a utility page with nothing on it for a searcher. Left
  // indexable it competes with the landing page for the brand name and shows
  // up as a bare form in results. "follow" so the links on it still count.
  // /homeowner-signup is deliberately NOT marked: it is a real entry point.
  robots: { index: false, follow: true },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

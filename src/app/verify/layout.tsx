import type { Metadata } from "next";

// The verify page is a client component ("use client" files can't export
// metadata), so its metadata lives on this pass-through layout, the same
// arrangement src/app/signin/layout.tsx uses. It renders nothing of its own.
//
// noindex, follow: this is the email-code recovery screen, a utility page with
// nothing on it for a searcher. The root layout's title template appends
// "| OakTend"; don't repeat it here.
export const metadata: Metadata = {
  title: "Verify your email",
  description: "Enter the code we emailed you to finish setting up your OakTend account.",
  robots: { index: false, follow: true },
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

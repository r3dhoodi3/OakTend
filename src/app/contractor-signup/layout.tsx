import type { Metadata } from "next";
import { isHomeownerPreview } from "@/lib/previewMode";
import { isProSideOpenForViewer } from "@/lib/previewModeServer";
import ProsComingSoon from "@/components/pro/ProsComingSoon";

// The sign-up page is a client component ("use client" files can't export
// metadata), so the title/description live on this pass-through layout.
// `absolute` opts out of the root layout's "%s | OakTend" template, which
// would otherwise double-brand this to "... | OakTend for Pros | OakTend".
//
// PREVIEW MODE swaps both strings for ones that make no product claim, for the
// same reason /pros does: this is what a search result and a link preview show
// while the contractor side is closed.
export const metadata: Metadata = isHomeownerPreview()
  ? {
      title: { absolute: "Pros are coming soon | OakTend for Pros" },
      description:
        "OakTend for Pros opens after our homeowner preview. Leave your email and we'll tell you first.",
    }
  : {
      title: { absolute: "Create your pro account | OakTend for Pros" },
      description:
        "Apply and quote for free. A 5% success fee applies only when a homeowner hires you, never for a lead.",
    };

export default async function ContractorSignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // PREVIEW MODE: the contractor side is closed to the PUBLIC, so an anonymous
  // visitor gets the coming-soon door here. Per-viewer, not the static flag:
  // isProSideOpenForViewer() lets any signed-in account through, so a tester
  // can walk the signup flow without being flagged internal first. (The
  // metadata above stays on the static flag - a title cannot be per-viewer.)
  //
  // The gate lives HERE rather than in page.tsx because that page is a client
  // component and ProsComingSoon is a server component - a "use client" module
  // cannot import one. Swapping the children out in this server layout also
  // means the signup page's module (Supabase client, Turnstile, the OAuth
  // buttons) is never rendered at all, rather than rendered and hidden.
  if (!(await isProSideOpenForViewer())) {
    return <ProsComingSoon source="contractor-signup" />;
  }
  return children;
}

import { redirect } from "next/navigation";
import { getCurrentContractor } from "@/lib/contractor";
import { getVerifiedUser } from "@/lib/auth";
import { exportLinkStateFor } from "@/lib/dataExportLinkState";
import { FOUNDER } from "@/lib/constants";
import PrivacyRightsPanel from "@/components/PrivacyRightsPanel";

// The pro's view of the California privacy rights surface. Pros are bounced
// out of /account by the (app) layout, so they need their own route; the copy
// itself is the shared panel, and the delete/export controls they're pointed
// at are the ones on their own profile's Account Security tab.

export const metadata = {
  title: "Your privacy rights",
};

export default async function ProPrivacyRightsPage(props: {
  searchParams?: Promise<{ export?: string }>;
}) {
  const [contractor, user, searchParams] = await Promise.all([
    getCurrentContractor(),
    getVerifiedUser(),
    props.searchParams ?? Promise.resolve(undefined),
  ]);
  if (!contractor || !user) redirect("/pro/onboarding");
  const linkState = exportLinkStateFor(searchParams?.export, user.id);

  return (
    <PrivacyRightsPanel
      securityHref="/pro/profile"
      profileHref="/pro/profile"
      profileLabel="Edit business profile"
      contact={FOUNDER.email}
      blocksHref="/pro/blocks"
      side="contractor"
      linkState={linkState}
    />
  );
}

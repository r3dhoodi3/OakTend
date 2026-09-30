import { createAdminClient } from "@/lib/supabase/admin";
import { sendNotification } from "@/lib/notify";
import { jobUpdateUrl } from "@/lib/jobUpdates";

// Automated review requests. Two things trigger one: a Pro member marks a job
// Won (the original perk), and - since 2026-09-29 - ANY pro's full or balance
// invoice is paid through OakTend (src/lib/invoiceSettlement.ts), because a
// job paid through the app is the one the review will be marked as verified
// for. The homeowner gets a friendly nudge linking to /contractors/jobs, where
// the review form lives (ReviewButton on the job row; the jobs list split off
// the posting page on 2026-09-25). This only ASKS: it never touches rating
// math, ordering, or who is allowed to review: the leave_review RPC keeps
// enforcing all of that.
//
// Best-effort throughout: any failure is logged and swallowed so a
// notification hiccup can never break the pro's status update.

export async function requestReviewForWonLead(input: {
  leadId: string;
  contractorUserId: string | null;
  businessName: string | null;
}): Promise<void> {
  try {
    const admin = createAdminClient();

    // Resolve the homeowner: contractor_leads -> property_id -> properties.user_id.
    const { data: lead } = await admin
      .from("contractor_leads")
      .select("property_id")
      .eq("id", input.leadId)
      .maybeSingle();
    if (!lead?.property_id) return;

    const { data: property } = await admin
      .from("properties")
      .select("user_id")
      .eq("id", lead.property_id)
      .maybeSingle();
    const ownerId = property?.user_id;
    if (!ownerId) return;
    // A pro closing a job on their own property shouldn't be asked to review
    // themselves.
    if (input.contractorUserId && ownerId === input.contractorUserId) return;

    // The lead id in the url doubles as the idempotency key: one ask per job,
    // ever, whether it was the Won button or the payment that asked, and even
    // if the status is toggled away and back. Asks sent before the jobs page
    // split carried the old /contractors?review= url; both spellings count.
    const url = jobUpdateUrl(input.leadId);
    const legacyUrl = `/contractors?review=${input.leadId}`;
    const { data: existing } = await admin
      .from("notifications")
      .select("id")
      .eq("user_id", ownerId)
      .eq("kind", "review_request")
      .in("url", [url, legacyUrl])
      .limit(1)
      .maybeSingle();
    if (existing) return;

    // Contact details so the email/SMS channels fire too once their provider
    // env vars are set (they stay dormant until then). sms_consent gates the
    // SMS channel specifically (TCPA - see src/lib/notify.ts).
    const { data: owner } = await admin
      .from("users")
      .select("email, phone, sms_consent")
      .eq("id", ownerId)
      .maybeSingle();

    const name = input.businessName?.trim() || "your pro";
    await sendNotification(admin, {
      userId: ownerId,
      kind: "review_request",
      title: `How did ${name} do?`,
      body: "Leave a quick review to help other homeowners pick the right pro.",
      url,
      email: owner?.email ?? null,
      phone: owner?.phone ?? null,
      smsConsent: owner?.sms_consent === true,
    });
  } catch (err) {
    console.error(
      "review request:",
      err instanceof Error ? err.message : err
    );
  }
}

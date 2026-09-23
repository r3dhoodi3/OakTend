"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { getVerifiedUser } from "@/lib/auth";
import { isInternalUser } from "@/lib/internalAccounts";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNotification } from "@/lib/notify";
import { setFlash } from "@/lib/flash";
import { labelFor, JOB_CATEGORIES } from "@/lib/constants";
import {
  JOB_UPDATE_KIND,
  jobUpdateNotification,
  jobUpdateUrl,
  normalizeJobUpdate,
} from "@/lib/jobUpdates";

// "Post an update": the one way, from inside OakTend, to tell a homeowner what
// happened to the job they posted. While the pro network is closed, matching
// is done by hand and the answer used to arrive by nothing at all - not even
// an email, because the founders only saw the job by opening the database.
//
// SAME GATE AS THE PAGE, re-checked here. A server action is a public HTTP
// endpoint: the fact that the only form that calls it sits behind a 404 does
// nothing to stop a direct POST. So this re-verifies the session against the
// auth server and re-reads the internal flag before it touches anything, and
// answers notFound() for everyone else - the same 404, never a redirect, so a
// prod is not told the endpoint exists.
//
// ADMIN CLIENT, and only after the gate: it writes a notification row for
// SOMEBODY ELSE'S user id, which no session client may do (public.notifications
// has no insert policy at all, migration 0026).
export async function postJobUpdateAction(formData: FormData) {
  const user = await getVerifiedUser();
  if (!user || !(await isInternalUser(user.id))) notFound();

  const leadId = ((formData.get("lead_id") as string) || "").trim();
  if (!/^[0-9a-f-]{36}$/i.test(leadId)) notFound();

  const message = normalizeJobUpdate(formData.get("message") as string);
  if (!message) {
    await setFlash("Write the update first.", "error");
    redirect("/backoffice/jobs");
  }

  const admin = createAdminClient();
  const { data: lead, error } = await (admin as any)
    .from("contractor_leads")
    .select("id, category, property_id, homeowner_email")
    .eq("id", leadId)
    .maybeSingle();
  if (error || !lead) {
    console.error("postJobUpdateAction: lead read failed", error?.message ?? error);
    await setFlash("That job could not be read.", "error");
    redirect("/backoffice/jobs");
  }

  // The notification goes to the OWNER OF THE HOME, not to whatever address is
  // typed on the lead: contractor_leads.homeowner_email is contact detail the
  // poster filled in on the form and is not an identity. properties.user_id is.
  const { data: property } = await (admin as any)
    .from("properties")
    .select("user_id")
    .eq("id", lead.property_id)
    .maybeSingle();
  if (!property?.user_id) {
    await setFlash("That job has no home owner on file.", "error");
    redirect("/backoffice/jobs");
  }

  // The owner's own contact row, for the two outbound channels. THE TEXT IS
  // SENT TO users.phone, NOT to contractor_leads.homeowner_phone: consent is
  // recorded per account (users.sms_consent, migration 0073), and a number
  // typed into a job form is not a number that consented to anything. Texting
  // it because it happens to be on the posting is exactly the TCPA exposure
  // the gate exists to prevent. Email is the other way round - the address on
  // the posting is the one the owner just chose for this job - so that one
  // wins, with the account address as the fallback.
  const { data: owner } = await (admin as any)
    .from("users")
    .select("email, phone, sms_consent")
    .eq("id", property.user_id)
    .maybeSingle();

  const copy = jobUpdateNotification({
    categoryLabel: labelFor(JOB_CATEGORIES, lead.category),
    message,
  });
  const sent = await sendNotification(admin, {
    userId: property.user_id,
    kind: JOB_UPDATE_KIND,
    title: copy.title,
    body: copy.body,
    url: jobUpdateUrl(lead.id),
    email: lead.homeowner_email ?? owner?.email ?? null,
    phone: owner?.phone ?? null,
    smsConsent: owner?.sms_consent ?? null,
  });

  await setFlash(
    sent ? "Update sent to the homeowner." : "The update could not be saved.",
    sent ? "success" : "error"
  );
  // The homeowner's own page reads these rows to show the latest update on the
  // job card, so both surfaces are stale until they are revalidated.
  revalidatePath("/backoffice/jobs");
  revalidatePath("/contractors");
  redirect("/backoffice/jobs");
}

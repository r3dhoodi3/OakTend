"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { emailConfigured, sendEmail } from "@/lib/notify";
import { signExportLink } from "@/lib/dataExportLink";
import { type ActionResult, ok, err } from "@/lib/actionResult";

// "Email me a link" on Your privacy rights (homeowner and pro). Sends the
// signed-in person, at their OWN account email, a link back to their privacy
// page where the PDF download is waiting. The recipient is never taken from
// the browser: it is the session's email. The only input is which side's page
// to link to, and that is checked against a fixed list.
export async function emailDataExportLinkAction(
  side: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return err("Please sign in again.");
  if (!user.email) return err("Your account has no email address to send to.");

  if (!emailConfigured()) {
    return err("Email isn't available right now. Use Download PDF instead.");
  }

  const path = side === "contractor" ? "/pro/privacy" : "/account/privacy";

  // A few per day is plenty; this stops the button being used to flood an
  // inbox. Fail open like the other spam-class buckets: only an explicit
  // false blocks.
  const { data: allowed } = await createAdminClient().rpc("rate_limit_hit", {
    p_bucket: `export_link:${user.id}`,
    p_limit: 3,
    p_window_seconds: 86400,
  });
  if (allowed === false) {
    return err("You've asked for a few links today. Try again tomorrow.");
  }

  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";
  const link = `${base}${path}?export=${encodeURIComponent(signExportLink(user.id))}`;

  await sendEmail({
    userId: user.id,
    kind: "data_export_link",
    title: "Your OakTend data download",
    body: [
      "You asked for a copy of your OakTend data.",
      "",
      "Open this link and sign in to download it as a PDF. The link works for 24 hours and only for your account:",
      link,
      "",
      "If you didn't ask for this, you can ignore this email.",
    ].join("\n"),
    email: user.email,
  });
  return ok();
}

import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { isMissingSchemaError } from "@/lib/dbErrors";
import { lookupCampaign } from "@/lib/campaigns";

// The bridge between the two halves of partner attribution (Landen addendum 4,
// section 2). 0166 stamps public.users.campaign_code from the /go/ cookie at
// sign-up; 0171 stores the same code on public.pro_waitlist for a contractor
// who followed a partner link while the pro side was closed and could not
// create an account at all. This copies the second onto the first.
//
// WHY IT IS NEEDED AND WHY THE COOKIE CANNOT DO IT. The cookie lasts 30 days
// (src/lib/campaigns.ts). A contractor who joins the waitlist in preview does
// not come back until the pro side opens, which is months later by design - so
// by the time they sign up the cookie is gone and the sign-up path finds
// nothing. The waitlist row is the only surviving record of that referral.
//
// FALLBACK ONLY, and first code wins twice over: the caller runs this only when
// the cookie produced no valid code, and the UPDATE below is filtered on
// `campaign_code is null` exactly like 0166's write, so an account that already
// carries a code is not matched. The guarantee lives in the WHERE clause rather
// than in a read-then-write here, because two entry points call the sign-up
// path for the same account and a check-then-set would race with itself.
//
// ADMIN CLIENT, deliberately: public.pro_waitlist has RLS on with NO policies
// (0168), so a session client cannot see a single row of it.
//
// NEVER THROWS, AND NEVER BLOCKS A SIGN-UP. A missing column, a missing table,
// a DB blip - all of them answer null, which is exactly the behaviour before
// this existed (no attribution). Attribution is worth less than an account.

// Escapes the LIKE metacharacters in a value used as an ilike pattern, so an
// email containing "_" or "%" matches itself rather than acting as a wildcard.
// PostgREST also reads "*" as "%", which this cannot escape - harmless, because
// the exact comparison below re-checks every row the query returns.
function likePattern(email: string): string {
  return email.replace(/[\\%_]/g, (c) => `\\${c}`);
}

// Copies a waitlist row's campaign code onto the account that just signed up
// with the same email address, case-insensitively. Returns the code when one
// was found and the write was issued, null in every other case.
//
// The return value says "a code was found for this email", NOT "the account's
// column changed": the `is("campaign_code", null)` filter may legitimately
// match no row, which is first-code-wins working as intended.
export async function copyWaitlistCampaignCode(
  userId: string,
  email: string | null | undefined
): Promise<string | null> {
  const address = email?.trim();
  if (!userId || !address) return null;

  try {
    const admin = createAdminClient();

    // `(admin as any)` because pro_waitlist is not in src/lib/database.types.ts
    // - the same cast src/app/pros/actions.ts uses on the write side.
    const { data, error } = await (admin as any)
      .from("pro_waitlist")
      .select("email, campaign_code")
      .ilike("email", likePattern(address))
      .not("campaign_code", "is", null)
      .limit(5);

    if (error) {
      // 0171 (or 0168) not pasted yet is the expected case for a while and is
      // not an error; anything else is worth knowing about.
      if (!isMissingSchemaError(error)) {
        console.error(
          "copyWaitlistCampaignCode: waitlist read failed",
          error.message ?? error
        );
      }
      return null;
    }

    // The unique index is on lower(email), so at most one row can match
    // exactly. The comparison is re-done here rather than trusted to the
    // pattern above, which is deliberately loose (see likePattern).
    const target = address.toLowerCase();
    const row = ((data ?? []) as { email?: string; campaign_code?: string }[]).find(
      (r) =>
        typeof r.email === "string" &&
        r.email.trim().toLowerCase() === target &&
        typeof r.campaign_code === "string"
    );
    const code = row?.campaign_code;

    // Re-validated against the frozen allowlist even though the action only
    // ever writes a code that already passed it: this value is about to be
    // grouped by and pasted into a partner report, and the CHECK constraint
    // only guarantees its shape, not that it names a real partner.
    if (!code || !lookupCampaign(code)) return null;

    const { error: writeError } = await (admin.from("users") as any)
      .update({
        campaign_code: code,
        campaign_recorded_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .is("campaign_code", null);

    if (writeError) {
      if (isMissingSchemaError(writeError)) {
        console.warn(
          "copyWaitlistCampaignCode: users.campaign_code missing, skipping " +
            "waitlist attribution (paste migration 0166)"
        );
      } else {
        console.error("copyWaitlistCampaignCode: write failed", {
          userId,
          writeError,
        });
      }
      return null;
    }

    return code;
  } catch (e) {
    console.error("copyWaitlistCampaignCode: threw", e);
    return null;
  }
}

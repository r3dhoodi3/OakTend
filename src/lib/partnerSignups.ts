// Grouping for the back-office partner page (src/app/(app)/backoffice/
// partners/page.tsx): two flat result sets in, one row per partner code out.
//
// PURE, and no database anywhere near it. The page does the gate and the two
// service-role reads; this file only rearranges what came back, which is what
// makes the interesting part - "a partner with no sign-ups still gets a row
// saying zero" - testable without a Supabase client.
//
// TWO SOURCES, ONE ROW PER CODE:
//   * public.partner_signups (migration 0169), one row per ACCOUNT that
//     carries users.campaign_code.
//   * public.pro_waitlist (0168 + 0171), one row per contractor who left an
//     email while the pro side was closed and never got to create an account.
// They are counted in separate columns on purpose. A waitlist email is a lead,
// an account is a sign-up, and a partner conversation that added the two
// together would be quoting a number that means nothing.

/** One partner as src/lib/campaigns.ts PARTNER_CODES defines it. */
export interface PartnerCode {
  code: string;
  label: string;
}

/** A row of public.partner_signups (0169). */
export interface PartnerAccountRow {
  partner?: string | null;
  full_name?: string | null;
  email?: string | null;
  signed_up?: string | null;
}

/** A row of public.pro_waitlist carrying a campaign code (0171). */
export interface PartnerWaitlistRow {
  email?: string | null;
  created_at?: string | null;
  campaign_code?: string | null;
}

/** One person under a partner, account or waitlist. */
export interface PartnerSignupEntry {
  /** Null for a waitlist row - the form never asks for a name. */
  name: string | null;
  email: string | null;
  /** Timestamp as the database returned it; the page formats it. */
  at: string | null;
  waitlist: boolean;
}

/** One partner code, whether or not anything was found for it. */
export interface PartnerSummary {
  code: string;
  /** Null for a code found in the data but absent from PARTNER_CODES. */
  label: string | null;
  accounts: number;
  waitlist: number;
  /** Newest `at` across both sources, or null when there is nothing. */
  lastSignup: string | null;
  /** Newest first. Empty for a partner with no sign-ups yet. */
  entries: PartnerSignupEntry[];
}

// Sortable key for a timestamp string. An unparseable or missing value sorts
// last rather than crashing the page or silently jumping to the top - the
// column is written by the app, but this page also reads codes it has never
// heard of, so nothing here assumes well-formed data.
function timeKey(at: string | null): number {
  if (!at) return Number.NEGATIVE_INFINITY;
  const parsed = Date.parse(at);
  return Number.isFinite(parsed) ? parsed : Number.NEGATIVE_INFINITY;
}

function cleanCode(code: string | null | undefined): string | null {
  const trimmed = code?.trim();
  return trimmed ? trimmed : null;
}

// One summary row per partner code: every code in `partners` (so a partner who
// has sent nobody yet still appears, reading zero), followed by any code found
// in the data that is not one of them - a social-calendar code, or a partner
// deleted from the allowlist after somebody signed up through it. Unknown codes
// come last, alphabetically, and carry a null label so the page can say what
// they are.
export function summarizePartnerSignups(
  partners: readonly PartnerCode[],
  accounts: readonly PartnerAccountRow[],
  waitlist: readonly PartnerWaitlistRow[]
): PartnerSummary[] {
  const byCode = new Map<string, PartnerSummary>();

  for (const partner of partners) {
    const code = cleanCode(partner.code);
    if (!code || byCode.has(code)) continue;
    byCode.set(code, {
      code,
      label: partner.label,
      accounts: 0,
      waitlist: 0,
      lastSignup: null,
      entries: [],
    });
  }

  // Codes found only in the data. Tracked separately so the known partners
  // keep the order PARTNER_CODES lists them in, which is the order the team
  // reads them in everywhere else.
  const unknown: string[] = [];
  function bucket(code: string): PartnerSummary {
    let summary = byCode.get(code);
    if (!summary) {
      summary = {
        code,
        label: null,
        accounts: 0,
        waitlist: 0,
        lastSignup: null,
        entries: [],
      };
      byCode.set(code, summary);
      unknown.push(code);
    }
    return summary;
  }

  for (const row of accounts) {
    const code = cleanCode(row.partner);
    if (!code) continue;
    const summary = bucket(code);
    summary.accounts += 1;
    summary.entries.push({
      name: row.full_name?.trim() || null,
      email: row.email ?? null,
      at: row.signed_up ?? null,
      waitlist: false,
    });
  }

  for (const row of waitlist) {
    const code = cleanCode(row.campaign_code);
    if (!code) continue;
    const summary = bucket(code);
    summary.waitlist += 1;
    summary.entries.push({
      name: null,
      email: row.email ?? null,
      at: row.created_at ?? null,
      waitlist: true,
    });
  }

  for (const summary of byCode.values()) {
    summary.entries.sort((a, b) => timeKey(b.at) - timeKey(a.at));
    // The newest of the two sources, not the newest account: a partner whose
    // only activity this month is waitlist emails has not gone quiet.
    const newest = summary.entries.find((e) => e.at !== null && timeKey(e.at) > Number.NEGATIVE_INFINITY);
    summary.lastSignup = newest?.at ?? null;
  }

  const known = partners
    .map((p) => cleanCode(p.code))
    .filter((c): c is string => c !== null);
  const ordered = [...new Set(known), ...unknown.sort()];
  return ordered.map((code) => byCode.get(code) as PartnerSummary);
}

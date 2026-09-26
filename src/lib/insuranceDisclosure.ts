// What a homeowner is told about an applicant's insurance.
//
// WHY THIS IS A SENTENCE AND NOT A BADGE. Until migration 0173 a pro could not
// apply to a roof, structural or remodeling job without a current insurance
// date on file. That gate read a date the contractor typed into a form field
// themselves - no carrier is ever contacted, and nothing compares it to the
// uploaded document - so it implied a verification OakTend has never done,
// while turning away licensed contractors over a standard California's own
// CSLB does not set for most licence types.
//
// The fact is worth showing; the assurance is not ours to give. So the
// homeowner gets the carrier and the date, in plain words, next to the pro
// they are choosing between - and the caller pairs it with a line saying the
// pro provided it and OakTend did not check it. A green "Insured" tick would
// recreate exactly the implied vetting the gate was removed for.
//
// PURE, no "server-only": the page renders it, and a test drives it.

export type InsuranceFacts = {
  insurance_carrier?: string | null;
  insurance_expires?: string | null;
} | null | undefined;

// "State Farm, expires Mar 2027", "Expires Mar 2027" (carrier unknown), or
// null when there is nothing on file at all - which the caller renders as its
// own explicit "No insurance on file" line rather than silence.
//
// AN EXPIRED DATE IS STILL SHOWN, deliberately, and still says the month it
// ran out. "Expired Jan 2025" is far more use to somebody choosing a
// contractor than showing nothing, and hiding it would be the same
// paternalism the gate was removed for.
export function insuranceLine(facts: InsuranceFacts): string | null {
  const carrier = facts?.insurance_carrier?.trim() || null;
  const raw = facts?.insurance_expires?.trim() || null;
  if (!carrier && !raw) return null;

  let when: string | null = null;
  let expired = false;
  if (raw) {
    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) {
      // Fixed locale and zone, the same reasoning as the back office's dates:
      // a month printed here gets read back to a contractor on the phone, so
      // it must not shift with the serverless region.
      when = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        month: "short",
        year: "numeric",
      }).format(parsed);
      expired = parsed.getTime() < Date.now();
    }
  }

  const tail = when ? `${expired ? "expired" : "expires"} ${when}` : null;
  if (carrier && tail) return `Insurance on file: ${carrier}, ${tail}`;
  if (carrier) return `Insurance on file: ${carrier}`;
  // A date we could not parse, with no carrier beside it, leaves nothing true
  // to say - so it reads as nothing on file rather than printing a blank.
  if (!tail) return null;
  return `Insurance on file: ${tail}`;
}

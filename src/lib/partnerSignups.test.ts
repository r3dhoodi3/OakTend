import { describe, it, expect } from "vitest";
import {
  summarizePartnerSignups,
  type PartnerAccountRow,
  type PartnerWaitlistRow,
} from "./partnerSignups";

// The grouping behind the back-office partner page. The page itself is a gate
// plus two service-role reads; everything that could be WRONG about the numbers
// is here.

const PARTNERS = [
  { code: "curtis", label: "Curtis Do referral" },
  { code: "ethan", label: "Ethan Vu referral" },
];

function account(
  partner: string,
  name: string,
  signedUp: string
): PartnerAccountRow {
  return {
    partner,
    full_name: name,
    email: `${name.toLowerCase()}@example.com`,
    signed_up: signedUp,
  };
}

function waitlisted(code: string, email: string, at: string): PartnerWaitlistRow {
  return { campaign_code: code, email, created_at: at };
}

describe("summarizePartnerSignups", () => {
  // The reason the page does not build its rows from the data: a partner who
  // has sent nobody has to be visible, reading zero, or the answer to "how is
  // Ethan doing" is a missing row the reader has to interpret.
  it("gives every known partner a row, in PARTNER_CODES order, even at zero", () => {
    const rows = summarizePartnerSignups(PARTNERS, [], []);
    expect(rows.map((r) => r.code)).toEqual(["curtis", "ethan"]);
    expect(rows[0]).toMatchObject({
      label: "Curtis Do referral",
      accounts: 0,
      waitlist: 0,
      lastSignup: null,
      entries: [],
    });
  });

  it("counts accounts and waitlist emails in separate columns", () => {
    const rows = summarizePartnerSignups(
      PARTNERS,
      [
        account("curtis", "Ana", "2026-09-14T10:00:00Z"),
        account("curtis", "Ben", "2026-09-15T10:00:00Z"),
      ],
      [waitlisted("curtis", "pro@example.com", "2026-09-16T10:00:00Z")]
    );

    const curtis = rows.find((r) => r.code === "curtis")!;
    // A lead and a sign-up are not the same number, so they are never added
    // together - the partner conversation is about accounts.
    expect(curtis.accounts).toBe(2);
    expect(curtis.waitlist).toBe(1);
    expect(curtis.entries).toHaveLength(3);
  });

  it("lists people newest first and marks the waitlist rows", () => {
    const rows = summarizePartnerSignups(
      PARTNERS,
      [
        account("curtis", "Ana", "2026-09-14T10:00:00Z"),
        account("curtis", "Ben", "2026-09-16T10:00:00Z"),
      ],
      [waitlisted("curtis", "pro@example.com", "2026-09-15T10:00:00Z")]
    );

    const curtis = rows.find((r) => r.code === "curtis")!;
    expect(curtis.entries.map((e) => e.email)).toEqual([
      "ben@example.com",
      "pro@example.com",
      "ana@example.com",
    ]);
    expect(curtis.entries.map((e) => e.waitlist)).toEqual([false, true, false]);
    // The waitlist form never asks for a name.
    expect(curtis.entries[1].name).toBeNull();
  });

  // "Last signup" answers "is this partner still sending anyone", so a month
  // of waitlist emails and no accounts is not silence.
  it("takes last signup from whichever source is newest", () => {
    const rows = summarizePartnerSignups(
      PARTNERS,
      [account("curtis", "Ana", "2026-09-10T10:00:00Z")],
      [waitlisted("curtis", "pro@example.com", "2026-09-17T10:00:00Z")]
    );
    expect(rows.find((r) => r.code === "curtis")!.lastSignup).toBe(
      "2026-09-17T10:00:00Z"
    );
  });

  // A social-calendar code, or a partner removed from the allowlist after
  // somebody signed up through it. The accounts exist either way, so hiding
  // them would make the page disagree with the database.
  it("keeps codes that are not partners, after the known ones, with no label", () => {
    const rows = summarizePartnerSignups(
      PARTNERS,
      [
        account("tt-d03", "Cass", "2026-09-12T10:00:00Z"),
        account("ig-d01", "Dev", "2026-09-13T10:00:00Z"),
      ],
      []
    );
    expect(rows.map((r) => r.code)).toEqual([
      "curtis",
      "ethan",
      "ig-d01",
      "tt-d03",
    ]);
    expect(rows[2].label).toBeNull();
    expect(rows[2].accounts).toBe(1);
  });

  it("ignores rows with no code at all rather than inventing a bucket", () => {
    const rows = summarizePartnerSignups(
      PARTNERS,
      [{ partner: null, full_name: "Nobody", email: "n@example.com", signed_up: null }],
      [{ campaign_code: "  ", email: "x@example.com", created_at: null }]
    );
    expect(rows).toHaveLength(2);
    expect(rows.every((r) => r.entries.length === 0)).toBe(true);
  });

  // The page reads codes it has never heard of, so nothing here may assume the
  // timestamps are well formed: a junk date sorts last and reads as "-", it
  // does not crash the page or jump to the top of the list.
  it("survives a missing or unparseable timestamp", () => {
    const rows = summarizePartnerSignups(
      PARTNERS,
      [
        account("curtis", "Ana", "not a date"),
        account("curtis", "Ben", "2026-09-16T10:00:00Z"),
      ],
      [waitlisted("curtis", "pro@example.com", null as unknown as string)]
    );
    const curtis = rows.find((r) => r.code === "curtis")!;
    expect(curtis.entries[0].email).toBe("ben@example.com");
    expect(curtis.lastSignup).toBe("2026-09-16T10:00:00Z");
    expect(curtis.accounts).toBe(2);
  });
});

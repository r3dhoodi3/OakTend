// Plain-text household invite email. Pure functions so the wording can be
// unit tested and so the server action stays short.

// The inviter's name comes from their own profile, so it is attacker
// controlled text going out under OakTend's name to an address they typed.
// Keep it to one short line, and drop it entirely if it looks like a link, so
// the subject and first sentence cannot be turned into a phishing message.
export function safeInviterName(raw: string | null | undefined): string | null {
  if (typeof raw !== "string") return null;
  // eslint-disable-next-line no-control-regex
  const name = raw.replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim();
  if (!name || name.length > 60) return null;
  // Any "word.word" with a 2+ letter ending reads as a domain (evil.me,
  // help.support), not just the common endings. "J.R. Smith" and "Jr." stay.
  if (/https?:|www\.|:\/\/|@|[a-z0-9-]\.[a-z]{2,}\b/i.test(name)) return null;
  return name;
}

export function householdInviteSubject(inviterName: string | null): string {
  return inviterName
    ? `${inviterName} invited you to their home on OakTend`
    : "You're invited to a home on OakTend";
}

export function householdInviteText(input: {
  inviterName: string | null;
  inviterEmail: string | null;
  inviteeEmail: string;
  link: string;
}): string {
  const who = input.inviterName
    ? input.inviterEmail
      ? `${input.inviterName} (${input.inviterEmail})`
      : input.inviterName
    : input.inviterEmail ?? "Someone";
  return [
    `${who} invited you to share their home on OakTend, a free home maintenance app for Orange County homeowners.`,
    "",
    `To join, open this link and sign in or create an account with ${input.inviteeEmail}:`,
    input.link,
    "",
    "If you don't know this person, you can ignore this email. Nothing happens unless you accept.",
    "",
    "OakTend",
  ].join("\n");
}

// Plain-text household invite email. Pure functions so the wording can be
// unit tested and so the server action stays short.

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

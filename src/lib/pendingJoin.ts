// Household invite "breadcrumb" cookie.
//
// When someone opens a household QR link (/join/household/<token>) the
// middleware drops this short-lived, httpOnly cookie holding the token. The
// sign-up funnel can lose ?next= along the way (an email confirmation link
// that lands on the Site URL, an OAuth provider that drops the query string, a
// reader who closes the tab and signs in later), and before this cookie existed
// a housemate who lost it was dropped on the claim-your-home wizard instead of
// the home they were invited to. /onboarding reads the cookie and, while the
// invite is still live, sends them back to the join page instead.
//
// The cookie grants nothing. It only remembers WHICH join page to show; the
// join page itself re-checks the token server side and joining is an explicit
// POST (redeemHouseholdInviteAction) that runs redeem_household_invite_token()
// under the person's own session.
export const PENDING_JOIN_COOKIE = "oaktend_pending_join";

// Matches the scan grace window a live code gets when it is first opened
// (migration 0099), so the breadcrumb never outlives the invite it points at.
export const PENDING_JOIN_MAX_AGE_SECONDS = 30 * 60;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isInviteToken(value: string | null | undefined): value is string {
  return typeof value === "string" && UUID_RE.test(value);
}

// "/join/household/<uuid>" (optionally with a trailing slash) -> the token, or
// null for anything else.
export function joinTokenFromPath(path: string): string | null {
  const match = /^\/join\/household\/([^/?#]+)\/?$/.exec(path);
  if (!match) return null;
  return isInviteToken(match[1]) ? match[1].toLowerCase() : null;
}

export function pendingJoinCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: PENDING_JOIN_MAX_AGE_SECONDS,
  };
}

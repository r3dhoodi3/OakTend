import "server-only";
import { verifyExportLink } from "@/lib/dataExportLink";

// What the privacy page should say when opened with ?export=<token> from the
// "Email me a link" email. A token for a different account, or a garbled one,
// shows nothing at all (null), the same as no token.
export function exportLinkStateFor(
  token: string | undefined,
  userId: string
): "ready" | "expired" | null {
  if (!token) return null;
  const state = verifyExportLink(token, userId);
  return state === "invalid" ? null : state;
}

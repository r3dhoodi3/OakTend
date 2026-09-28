import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

// The "Email me a link" option on Your privacy rights. The emailed link opens
// the privacy page with ?export=<token>; the token names the account and an
// expiry and is signed with a server-only secret. It is NOT a bearer
// credential for the data: the download itself still needs the person to be
// signed in, and the page only treats the link as valid when the token's
// account is the signed-in account and it has not expired. So a forwarded or
// leaked email gets a stranger nothing.
//
// Keyed by SUPABASE_SERVICE_ROLE_KEY, the same server-only secret
// src/lib/unsubscribeToken.ts uses, with a distinct prefix so a token from one
// can never verify as the other.
export const EXPORT_LINK_TTL_SECONDS = 24 * 60 * 60;

function secret(): string {
  const s = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!s) throw new Error("dataExportLink: SUPABASE_SERVICE_ROLE_KEY is unset");
  return s;
}

function mac(userId: string, exp: number): string {
  return createHmac("sha256", secret())
    .update(`data-export:${userId}:${exp}`, "utf8")
    .digest("hex");
}

export function signExportLink(userId: string, nowMs = Date.now()): string {
  const exp = Math.floor(nowMs / 1000) + EXPORT_LINK_TTL_SECONDS;
  return `${exp}.${mac(userId, exp)}`;
}

export type ExportLinkState = "ready" | "expired" | "invalid";

export function verifyExportLink(
  token: string | null | undefined,
  userId: string,
  nowMs = Date.now()
): ExportLinkState {
  if (!token || !userId) return "invalid";
  const m = /^(\d{1,12})\.([0-9a-f]{64})$/.exec(token);
  if (!m) return "invalid";
  const exp = Number(m[1]);
  let expected: string;
  try {
    expected = mac(userId, exp);
  } catch {
    return "invalid";
  }
  const a = Buffer.from(m[2], "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return "invalid";
  return exp * 1000 > nowMs ? "ready" : "expired";
}

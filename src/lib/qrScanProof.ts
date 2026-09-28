// Household QR "finish joining" proof.
//
// A household QR code is usable for 10 minutes from when it is made
// (QR_TOKEN_LIFETIME_SECONDS). Someone who opens the link inside those 10
// minutes but still has to create an account needs a little longer, so the
// browser that opened it in time gets up to 30 more minutes to finish joining
// (QR_SCAN_GRACE_SECONDS). That extra time must belong to THAT browser only.
// Before this, the first open pushed the code's expiry out 30 minutes for
// everyone, so anyone else holding the link could still use it long after the
// owner's 10 minutes were up.
//
// How it is tied to one browser: when /join/household/<token> is opened, the
// middleware sets this httpOnly cookie holding the token, the time it was
// opened (server clock), and an HMAC over both, keyed with a server-only
// secret. The cookie is kept (not re-issued) on later opens of the same link,
// so reopening can never move the open time forward. The join page, the
// onboarding breadcrumb and the join action all accept the extra time only
// when the signed open time is BEFORE the code's own expiry and less than 30
// minutes ago. A person who first gets the link after the 10 minutes gets a
// cookie too, but its open time is after the expiry, so it grants nothing.
//
// The database enforces the same rule on its own (migration 0174): past the
// 10 minutes, redeem_household_invite_token() only accepts the code together
// with its grace_key, a random value the server reads with the service role
// and never sends to a browser, and never later than 30 minutes past the
// expiry. So calling the RPC directly with a leaked token does not get around
// this.
//
// Web Crypto only (no node:crypto), because the middleware signs it.

import { QR_SCAN_GRACE_SECONDS } from "@/lib/householdQr";
import { isInviteToken } from "@/lib/pendingJoin";

export const QR_SCAN_COOKIE = "oaktend_qr_scan";

function secret(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || null;
}

async function mac(token: string, openedAtSec: number): Promise<string | null> {
  const s = secret();
  if (!s || !globalThis.crypto?.subtle) return null;
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    enc.encode(s),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(`household-qr-scan:${token}:${openedAtSec}`)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Cookie value for a link opened now, or null when no secret is configured
// (then there is simply no extra time; the 10 minutes still work).
export async function signScanProof(
  token: string,
  nowMs = Date.now()
): Promise<string | null> {
  const t = token.toLowerCase();
  if (!isInviteToken(t)) return null;
  const openedAtSec = Math.floor(nowMs / 1000);
  const sig = await mac(t, openedAtSec);
  return sig ? `${t}.${openedAtSec}.${sig}` : null;
}

// The token a cookie value names, without checking the signature. Used only to
// decide whether to keep an existing cookie for the same link.
export function scanProofToken(value: string | null | undefined): string | null {
  if (!value) return null;
  const t = value.split(".")[0]?.toLowerCase() ?? "";
  return isInviteToken(t) ? t : null;
}

// When this browser opened `token` (ms), if the cookie is genuine and names
// that token. null for anything else.
export async function readScanProof(
  value: string | null | undefined,
  token: string
): Promise<number | null> {
  if (!value) return null;
  const m = /^([0-9a-f-]{36})\.(\d{1,12})\.([0-9a-f]{64})$/.exec(value);
  if (!m) return null;
  const t = token.toLowerCase();
  if (m[1] !== t) return null;
  const openedAtSec = Number(m[2]);
  const expected = await mac(t, openedAtSec);
  if (!expected || !constantTimeEqual(m[3], expected)) return null;
  return openedAtSec * 1000;
}

// The extra time applies only to a browser that opened the code while it was
// still live, lasts 30 minutes from that open, and never runs past the same
// 30 minute ceiling after the code's expiry the database enforces.
export function inScanGrace(opts: {
  openedAtMs: number | null;
  expiresAtMs: number;
  nowMs?: number;
}): boolean {
  const now = opts.nowMs ?? Date.now();
  const graceMs = QR_SCAN_GRACE_SECONDS * 1000;
  if (opts.openedAtMs == null) return false;
  if (!(opts.openedAtMs < opts.expiresAtMs)) return false;
  if (opts.openedAtMs > now) return false;
  return now < opts.openedAtMs + graceMs && now < opts.expiresAtMs + graceMs;
}

export function scanProofCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: QR_SCAN_GRACE_SECONDS,
  };
}

import "server-only";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { QR_SCAN_COOKIE, inScanGrace, readScanProof } from "@/lib/qrScanProof";

export interface OpenHouseholdInvite {
  token: string;
  property_id: string;
  created_by: string;
  expires_at: string;
  // true when the code's own 10 minutes are up and this browser is using its
  // "finish joining" time (src/lib/qrScanProof.ts).
  inGrace: boolean;
}

// Is this household QR code usable by THIS browser right now? Live codes are
// usable by anyone holding them. Past the 10 minutes, only a browser that
// opened the link before it expired, less than 30 minutes ago, still is.
// Service role because the token table has no client policies (migration
// 0097). Read only: nothing here grants anything.
export async function openHouseholdInvite(
  token: string
): Promise<OpenHouseholdInvite | null> {
  const { data: invite } = await createAdminClient()
    .from("household_invite_tokens")
    .select("token, property_id, created_by, expires_at")
    .eq("token", token)
    .maybeSingle();
  if (!invite) return null;
  const nowMs = Date.now();
  const expiresAtMs = new Date(invite.expires_at).getTime();
  if (expiresAtMs > nowMs) return { ...invite, inGrace: false };
  const openedAtMs = await readScanProof(
    (await cookies()).get(QR_SCAN_COOKIE)?.value,
    token
  );
  if (!inScanGrace({ openedAtMs, expiresAtMs, nowMs })) return null;
  return { ...invite, inGrace: true };
}

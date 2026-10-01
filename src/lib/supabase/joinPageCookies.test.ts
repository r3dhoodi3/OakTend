import { beforeAll, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

vi.mock("server-only", () => ({}));

import { updateSession } from "@/lib/supabase/middleware";
import { QR_SCAN_COOKIE, readScanProof, signScanProof } from "@/lib/qrScanProof";

// Opening a household QR link (signed out, so no Supabase call happens) drops
// the invite breadcrumb and the signed "opened in time" proof. A later open of
// the same link keeps the first proof, so reopening can never move the open
// time forward and stretch the finish-joining time.

const TOKEN = "22222222-2222-4222-8222-222222222222";

beforeAll(() => {
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-secret-for-qr-proof";
});

describe("household join page cookies", () => {
  it("first open sets the breadcrumb and a valid proof", async () => {
    const res = await updateSession(
      new NextRequest(`https://oaktend.test/join/household/${TOKEN}`)
    );
    expect(res.cookies.get("oaktend_pending_join")?.value).toBe(TOKEN);
    const proof = res.cookies.get(QR_SCAN_COOKIE);
    expect(proof?.httpOnly).toBe(true);
    const openedAt = await readScanProof(proof?.value, TOKEN);
    expect(openedAt).not.toBeNull();
    expect(Math.abs(Date.now() - (openedAt ?? 0))).toBeLessThan(5000);
  });

  it("a later open of the same link keeps the earlier proof", async () => {
    const early = await signScanProof(TOKEN, Date.now() - 8 * 60 * 1000);
    const req = new NextRequest(`https://oaktend.test/join/household/${TOKEN}`, {
      headers: { cookie: `${QR_SCAN_COOKIE}=${early}` },
    });
    const res = await updateSession(req);
    expect(res.cookies.get(QR_SCAN_COOKIE)).toBeUndefined();
  });

  it("opening a different code replaces the proof", async () => {
    const other = await signScanProof("33333333-3333-4333-8333-333333333333");
    const req = new NextRequest(`https://oaktend.test/join/household/${TOKEN}`, {
      headers: { cookie: `${QR_SCAN_COOKIE}=${other}` },
    });
    const res = await updateSession(req);
    expect(await readScanProof(res.cookies.get(QR_SCAN_COOKIE)?.value, TOKEN)).not.toBeNull();
  });
});

import { beforeAll, describe, expect, it } from "vitest";
import {
  inScanGrace,
  readScanProof,
  scanProofToken,
  signScanProof,
} from "./qrScanProof";

// The finish-joining time after a household QR scan belongs only to the
// browser that opened the code while it was live (owner feedback 2026-09-27,
// items 23-25). These pin the proof and the window rules.

const TOKEN = "22222222-2222-4222-8222-222222222222";
const OTHER = "33333333-3333-4333-8333-333333333333";
const MIN = 60 * 1000;

beforeAll(() => {
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-secret-for-qr-proof";
});

describe("scan proof cookie", () => {
  it("round trips and records the open time", async () => {
    const t0 = Date.UTC(2026, 8, 27, 12, 0, 0);
    const proof = await signScanProof(TOKEN, t0);
    expect(proof).toBeTruthy();
    expect(await readScanProof(proof, TOKEN)).toBe(t0);
    expect(scanProofToken(proof)).toBe(TOKEN);
  });

  it("does not verify for a different code", async () => {
    const proof = await signScanProof(TOKEN);
    expect(await readScanProof(proof, OTHER)).toBeNull();
  });

  it("an edited open time (to look earlier) fails the signature", async () => {
    const proof = (await signScanProof(TOKEN, Date.UTC(2026, 8, 27, 12, 20)))!;
    const [t, sec, sig] = proof.split(".");
    const forged = `${t}.${Number(sec) - 15 * 60}.${sig}`;
    expect(await readScanProof(forged, TOKEN)).toBeNull();
  });

  it("a hand-made cookie holding just the token grants nothing", async () => {
    expect(await readScanProof(TOKEN, TOKEN)).toBeNull();
    expect(await readScanProof(`${TOKEN}.1790000000.${"0".repeat(64)}`, TOKEN)).toBeNull();
  });

  it("a proof signed with another secret fails", async () => {
    const proof = await signScanProof(TOKEN);
    process.env.SUPABASE_SERVICE_ROLE_KEY = "a-different-secret";
    try {
      expect(await readScanProof(proof, TOKEN)).toBeNull();
    } finally {
      process.env.SUPABASE_SERVICE_ROLE_KEY = "test-secret-for-qr-proof";
    }
  });

  it("no secret configured: no proof at all", async () => {
    const saved = process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    try {
      expect(await signScanProof(TOKEN)).toBeNull();
    } finally {
      process.env.SUPABASE_SERVICE_ROLE_KEY = saved;
    }
  });
});

describe("finish-joining window", () => {
  const minted = Date.UTC(2026, 8, 27, 12, 0, 0);
  const expiresAtMs = minted + 10 * MIN;

  it("opened at minute 9: can finish until minute 39", () => {
    const openedAtMs = minted + 9 * MIN;
    expect(inScanGrace({ openedAtMs, expiresAtMs, nowMs: minted + 20 * MIN })).toBe(true);
    expect(inScanGrace({ openedAtMs, expiresAtMs, nowMs: minted + 38.9 * MIN })).toBe(true);
    expect(inScanGrace({ openedAtMs, expiresAtMs, nowMs: minted + 39 * MIN })).toBe(false);
  });

  it("opened at minute 2: 30 minutes from the open, not from the expiry", () => {
    const openedAtMs = minted + 2 * MIN;
    expect(inScanGrace({ openedAtMs, expiresAtMs, nowMs: minted + 31 * MIN })).toBe(true);
    expect(inScanGrace({ openedAtMs, expiresAtMs, nowMs: minted + 33 * MIN })).toBe(false);
  });

  it("first opened after the 10 minutes (a different person with the link): nothing", () => {
    const openedAtMs = minted + 10 * MIN + 1000;
    expect(inScanGrace({ openedAtMs, expiresAtMs, nowMs: minted + 12 * MIN })).toBe(false);
  });

  it("no proof: nothing", () => {
    expect(inScanGrace({ openedAtMs: null, expiresAtMs, nowMs: minted + 11 * MIN })).toBe(false);
  });

  it("an open time in the future is rejected", () => {
    expect(
      inScanGrace({ openedAtMs: minted + 9 * MIN, expiresAtMs, nowMs: minted + 5 * MIN })
    ).toBe(false);
  });
});

import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

beforeAll(() => {
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-secret";
});

describe("emailed data export link", () => {
  it("is valid only for the account it was made for", async () => {
    const { signExportLink, verifyExportLink } = await import("./dataExportLink");
    const t = signExportLink("user-a");
    expect(verifyExportLink(t, "user-a")).toBe("ready");
    expect(verifyExportLink(t, "user-b")).toBe("invalid");
  });

  it("expires after 24 hours", async () => {
    const { signExportLink, verifyExportLink } = await import("./dataExportLink");
    const now = Date.now();
    const t = signExportLink("user-a", now);
    expect(verifyExportLink(t, "user-a", now + 23 * 3600 * 1000)).toBe("ready");
    expect(verifyExportLink(t, "user-a", now + 25 * 3600 * 1000)).toBe("expired");
  });

  it("rejects a tampered expiry or garbage", async () => {
    const { signExportLink, verifyExportLink } = await import("./dataExportLink");
    const t = signExportLink("user-a");
    const [exp, mac] = t.split(".");
    expect(verifyExportLink(`${Number(exp) + 999999}.${mac}`, "user-a")).toBe("invalid");
    expect(verifyExportLink("nope", "user-a")).toBe("invalid");
    expect(verifyExportLink(null, "user-a")).toBe("invalid");
  });
});

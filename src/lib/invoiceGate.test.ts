import { describe, it, expect } from "vitest";
import {
  INVOICE_BLOCK_COPY,
  INVOICE_DUE_DAYS_DEFAULT,
  LICENCE_GATE_CENTS,
  invoiceSendBlock,
  isInvoiceKind,
  parseDueDays,
} from "./invoiceGate";

describe("invoiceSendBlock", () => {
  it("no connected account blocks every invoice, whatever the amount", () => {
    expect(
      invoiceSendBlock({ connectReady: false, licenceVerified: true, totalCents: 100 })
    ).toBe("payouts");
    expect(
      invoiceSendBlock({ connectReady: false, licenceVerified: true, totalCents: 5_000_000 })
    ).toBe("payouts");
  });

  it("payouts is named before licence when both are missing", () => {
    expect(
      invoiceSendBlock({ connectReady: false, licenceVerified: false, totalCents: 200_000 })
    ).toBe("payouts");
  });

  it("an unverified licence blocks only from $1,000 up", () => {
    expect(LICENCE_GATE_CENTS).toBe(100_000);
    expect(
      invoiceSendBlock({ connectReady: true, licenceVerified: false, totalCents: 99_999 })
    ).toBeNull();
    expect(
      invoiceSendBlock({ connectReady: true, licenceVerified: false, totalCents: 100_000 })
    ).toBe("licence");
  });

  it("ready and verified sends anything", () => {
    expect(
      invoiceSendBlock({ connectReady: true, licenceVerified: true, totalCents: 2_500_000 })
    ).toBeNull();
  });

  it("every block has copy and a place to fix it", () => {
    for (const block of ["payouts", "licence"] as const) {
      const c = INVOICE_BLOCK_COPY[block];
      expect(c.title.length).toBeGreaterThan(0);
      expect(c.href.startsWith("/pro/")).toBe(true);
    }
    expect(INVOICE_BLOCK_COPY.payouts.href).toBe("/pro/payouts");
  });
});

describe("composer field parsing", () => {
  it("unknown kinds are rejected, known ones pass", () => {
    expect(isInvoiceKind("deposit")).toBe(true);
    expect(isInvoiceKind("change_order")).toBe(true);
    expect(isInvoiceKind("refund")).toBe(false);
    expect(isInvoiceKind(null)).toBe(false);
  });

  it("due days fall back to the default for anything off the list", () => {
    expect(INVOICE_DUE_DAYS_DEFAULT).toBe(7);
    expect(parseDueDays("14")).toBe(14);
    expect(parseDueDays(30)).toBe(30);
    expect(parseDueDays("5")).toBe(7);
    expect(parseDueDays(null)).toBe(7);
    expect(parseDueDays("-3")).toBe(7);
  });
});

import { describe, it, expect } from "vitest";
import {
  FEE_CAP_CENTS,
  FEE_MIN_CENTS,
  MEMBER_FEE_BPS,
  STANDARD_FEE_BPS,
  feeRateBpsFor,
  feeRateLabel,
  platformFeeCents,
  platformFeeFor,
  proReceivesEstimate,
  stripeInvoicingEstimateCents,
  stripeProcessingEstimateCents,
} from "./platformFee";

// Every number here is one the payment-flow page promises (the "Worked
// examples" and "Edges" cards). If a constant changes, that page changes too.

describe("the rate", () => {
  it("is 5% standard and 3% for a paid member, and nothing else", () => {
    expect(STANDARD_FEE_BPS).toBe(500);
    expect(MEMBER_FEE_BPS).toBe(300);
    expect(feeRateBpsFor(false)).toBe(500);
    expect(feeRateBpsFor(true)).toBe(300);
  });

  it("prints as a whole percent", () => {
    expect(feeRateLabel(500)).toBe("5%");
    expect(feeRateLabel(300)).toBe("3%");
  });
});

describe("platformFeeCents", () => {
  it("$1,000: $50 standard, $30 member", () => {
    expect(platformFeeCents(100_000, 500)).toBe(5_000);
    expect(platformFeeCents(100_000, 300)).toBe(3_000);
  });

  it("$12,000 member: $360", () => {
    expect(platformFeeCents(1_200_000, 300)).toBe(36_000);
  });

  it("$200 deposit hits the $15 minimum at either rate", () => {
    expect(FEE_MIN_CENTS).toBe(1_500);
    expect(platformFeeCents(20_000, 500)).toBe(1_500);
    expect(platformFeeCents(20_000, 300)).toBe(1_500);
  });

  it("below $300 the two rates are identical - both sit on the $15 minimum", () => {
    // 5% clears the floor at $300 (5% x $300 = $15); 3% clears it at $500.
    // So a member saves nothing under $300, up to $10 between $300 and $500,
    // and the full 2 points from $500 up. Copy says "3% instead of 5%", never
    // "3% on everything".
    expect(platformFeeCents(29_999, 500)).toBe(1_500);
    expect(platformFeeCents(29_999, 300)).toBe(1_500);
    expect(platformFeeCents(30_000, 500)).toBe(1_500);
    expect(platformFeeCents(30_100, 500)).toBe(1_505);
    expect(platformFeeCents(40_000, 500)).toBe(2_000);
    expect(platformFeeCents(40_000, 300)).toBe(1_500);
    expect(platformFeeCents(50_000, 300)).toBe(1_500);
    expect(platformFeeCents(50_100, 300)).toBe(1_503);
  });

  it("$25,000: standard is capped at $1,000, member's $750 is not", () => {
    expect(FEE_CAP_CENTS).toBe(100_000);
    expect(platformFeeCents(2_500_000, 500)).toBe(100_000);
    expect(platformFeeCents(2_500_000, 300)).toBe(75_000);
  });

  it("member's cap lands at $33,333.34", () => {
    expect(platformFeeCents(3_333_333, 300)).toBe(100_000);
    expect(platformFeeCents(3_333_334, 300)).toBe(100_000);
    expect(platformFeeCents(9_999_999, 300)).toBe(100_000);
  });

  it("never exceeds the invoice itself", () => {
    expect(platformFeeCents(1_000, 500)).toBe(1_000);
    expect(platformFeeCents(1_499, 300)).toBe(1_499);
    expect(platformFeeCents(1_500, 300)).toBe(1_500);
  });

  it("rounds to the cent, half up", () => {
    // 5% of $10.01 = 50.05 cents -> 50; min applies anyway. Use a value above
    // the minimum: 3% of $500.15 = 1500.45 -> 1500; 3% of $500.17 = 1500.51 -> 1501.
    expect(platformFeeCents(50_015, 300)).toBe(1_500);
    expect(platformFeeCents(50_017, 300)).toBe(1_501);
  });

  it("is 0 for nonsense input rather than throwing", () => {
    expect(platformFeeCents(0, 500)).toBe(0);
    expect(platformFeeCents(-5, 500)).toBe(0);
    expect(platformFeeCents(Number.NaN, 500)).toBe(0);
  });
});

describe("platformFeeFor", () => {
  it("freezes rate and fee together", () => {
    expect(platformFeeFor(100_000, false)).toEqual({ rateBps: 500, feeCents: 5_000 });
    expect(platformFeeFor(100_000, true)).toEqual({ rateBps: 300, feeCents: 3_000 });
  });
});

describe("Stripe's side (preview estimate only)", () => {
  it("card: 2.9% + 30c", () => {
    expect(stripeProcessingEstimateCents(100_000, "card")).toBe(2_930);
    expect(stripeProcessingEstimateCents(1_200_000, "card")).toBe(34_830);
  });

  it("bank debit: 0.8% capped at $5", () => {
    expect(stripeProcessingEstimateCents(10_000, "us_bank_account")).toBe(80);
    expect(stripeProcessingEstimateCents(1_200_000, "us_bank_account")).toBe(500);
  });

  it("invoicing: 0.4% capped at $2", () => {
    expect(stripeInvoicingEstimateCents(10_000)).toBe(40);
    expect(stripeInvoicingEstimateCents(100_000)).toBe(200);
    expect(stripeInvoicingEstimateCents(1_200_000)).toBe(200);
  });

  it("$1,000 by card: pro receives $918.70 standard, $938.70 member", () => {
    expect(proReceivesEstimate(100_000, 5_000, "card").receivesCents).toBe(91_870);
    expect(proReceivesEstimate(100_000, 3_000, "card").receivesCents).toBe(93_870);
  });

  it("$12,000 by bank debit, member: pro receives $11,633.00", () => {
    const e = proReceivesEstimate(1_200_000, 36_000, "us_bank_account");
    expect(e).toEqual({
      totalCents: 1_200_000,
      platformFeeCents: 36_000,
      stripeProcessingCents: 500,
      stripeInvoicingCents: 200,
      receivesCents: 1_163_300,
    });
  });

  it("never goes negative", () => {
    expect(proReceivesEstimate(1_000, 1_000, "card").receivesCents).toBe(0);
  });
});

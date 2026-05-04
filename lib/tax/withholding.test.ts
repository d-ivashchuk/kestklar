import { describe, it, expect } from "vitest";
import { Decimal } from "decimal.js";
import { calcCreditableWithholding } from "./withholding";

const d = (n: string | number) => new Decimal(n);

describe("Creditable withholding tax", () => {
  it("paid < cap → returns paid", () => {
    const r = calcCreditableWithholding({
      foreignDividendGrossEur: d(1000),
      withholdingPaidEur: d(150),
    });
    // cap = 1000 * 0.275 = 275; paid 150 < cap, return 150
    expect(r.equals(d(150))).toBe(true);
  });

  it("paid > cap → caps at 27.5% of gross", () => {
    const r = calcCreditableWithholding({
      foreignDividendGrossEur: d(1000),
      withholdingPaidEur: d(400),
    });
    expect(r.equals(d(275))).toBe(true);
  });

  it("zero gross → zero credit (no overcredit possible)", () => {
    const r = calcCreditableWithholding({
      foreignDividendGrossEur: d(0),
      withholdingPaidEur: d(50),
    });
    expect(r.isZero()).toBe(true);
  });

  it("negative paid never creates a credit", () => {
    const r = calcCreditableWithholding({
      foreignDividendGrossEur: d(1000),
      withholdingPaidEur: d(-100),
    });
    expect(r.isZero()).toBe(true);
  });
});

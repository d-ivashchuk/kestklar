import { describe, it, expect } from "vitest";
import { Decimal } from "decimal.js";
import { calcDeemedDistribution } from "./deemed-distribution";

const d = (n: string | number) => new Decimal(n);

describe("Deemed distribution calculator", () => {
  it("EUR-denominated fund: amount = perUnit × qty (fx=1)", () => {
    const result = calcDeemedDistribution({
      oekb: {
        isin: "IE00B4L5Y983",
        taxYear: 2024,
        reportingDate: new Date("2024-12-31"),
        deemedDistributionPerUnit: d("0.50"),
        fxRateOnReportingDate: d(1),
        source: "https://my.oekb.at/...",
      },
      quantityOnReportingDate: d(100),
    });
    expect(result.equals(d(50))).toBe(true);
  });

  it("USD-denominated fund: applies fx rate", () => {
    const result = calcDeemedDistribution({
      oekb: {
        isin: "US0000000001",
        taxYear: 2024,
        reportingDate: new Date("2024-09-30"),
        deemedDistributionPerUnit: d("1.20"),
        fxRateOnReportingDate: d("0.92"), // EUR/USD on Stichtag
        source: "x",
      },
      quantityOnReportingDate: d(50),
    });
    // 1.20 * 50 * 0.92 = 55.20
    expect(result.equals(d("55.20"))).toBe(true);
  });

  it("zero quantity → zero amount", () => {
    const result = calcDeemedDistribution({
      oekb: {
        isin: "X",
        taxYear: 2024,
        reportingDate: new Date(),
        deemedDistributionPerUnit: d("0.50"),
        fxRateOnReportingDate: d(1),
        source: "x",
      },
      quantityOnReportingDate: d(0),
    });
    expect(result.isZero()).toBe(true);
  });

  it("negative quantity throws", () => {
    expect(() =>
      calcDeemedDistribution({
        oekb: {
          isin: "X",
          taxYear: 2024,
          reportingDate: new Date(),
          deemedDistributionPerUnit: d("0.50"),
          fxRateOnReportingDate: d(1),
          source: "x",
        },
        quantityOnReportingDate: d(-1),
      }),
    ).toThrow();
  });
});

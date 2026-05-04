import { describe, it, expect } from "vitest";
import { Decimal } from "decimal.js";
import { checkPerUnitVsNav, checkReportingDateInWindow, structuralFingerprint } from "./sanity";

const d = (n: string | number) => new Decimal(n);

describe("§15.1 — ÖEKB sanity bounds", () => {
  it("perUnit/NAV in [0, 0.5] passes", () => {
    expect(checkPerUnitVsNav({ perUnit: d(2), navOnReportingDate: d(100) }).ok).toBe(true);
  });

  it("perUnit/NAV > 0.5 fails", () => {
    const r = checkPerUnitVsNav({ perUnit: d(60), navOnReportingDate: d(100) });
    expect(r.ok).toBe(false);
  });

  it("negative perUnit fails", () => {
    const r = checkPerUnitVsNav({ perUnit: d(-1), navOnReportingDate: d(100) });
    expect(r.ok).toBe(false);
  });

  it("reportingDate inside year passes", () => {
    expect(
      checkReportingDateInWindow({ reportingDate: new Date("2024-06-30"), claimedTaxYear: 2024 }).ok,
    ).toBe(true);
  });

  it("reportingDate within tolerance passes (early Jan reporters)", () => {
    expect(
      checkReportingDateInWindow({ reportingDate: new Date("2025-01-15"), claimedTaxYear: 2024 }).ok,
    ).toBe(true);
  });

  it("reportingDate way outside fails", () => {
    expect(
      checkReportingDateInWindow({ reportingDate: new Date("2026-06-30"), claimedTaxYear: 2024 }).ok,
    ).toBe(false);
  });
});

describe("structural fingerprint", () => {
  it("identical shapes hash equally", () => {
    const a = { isin: "x", taxYear: 1, perUnit: 0.5 };
    const b = { isin: "y", taxYear: 99, perUnit: 0.0001 };
    expect(structuralFingerprint(a)).toBe(structuralFingerprint(b));
  });

  it("different shapes hash differently", () => {
    const a = { isin: "x", taxYear: 1 };
    const b = { isin: "x", taxYear: 1, extra: true };
    expect(structuralFingerprint(a)).not.toBe(structuralFingerprint(b));
  });
});

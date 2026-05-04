import { describe, it, expect } from "vitest";
import { Decimal } from "decimal.js";
import { assembleE1kv } from "./e1kv";

const d = (n: string | number) => new Decimal(n);

describe("E1kv assembler — §15.2 math invariants", () => {
  it("grossKest = 27.5% × (kz937 + kz936 + kz985 + kz994)", () => {
    const r = assembleE1kv({
      taxYear: 2024,
      kz937: d(1000),
      kz936: d(0),
      kz985: d(500),
      kz994: d(300),
      kz996: d(0),
      kz998: d(0),
      warnings: [],
    });
    // basis = 1800; 27.5% = 495
    expect(r.grossKest.equals(d(495))).toBe(true);
    expect(r.netKest.equals(d(495))).toBe(true);
  });

  it("netKest subtracts kz998, floor 0", () => {
    const r = assembleE1kv({
      taxYear: 2024,
      kz937: d(0),
      kz936: d(0),
      kz985: d(1000),
      kz994: d(0),
      kz996: d(0),
      kz998: d(275), // exactly 27.5% credit
      warnings: [],
    });
    expect(r.grossKest.equals(d(275))).toBe(true);
    expect(r.netKest.equals(d(0))).toBe(true);
  });

  it("netKest never goes negative even if kz998 over-credits", () => {
    const r = assembleE1kv({
      taxYear: 2024,
      kz937: d(0),
      kz936: d(0),
      kz985: d(100),
      kz994: d(0),
      kz996: d(0),
      kz998: d(500), // intentionally absurd
      warnings: [],
    });
    expect(r.netKest.equals(d(0))).toBe(true);
  });

  it("rejects negative Kennzahlen at the boundary", () => {
    expect(() =>
      assembleE1kv({
        taxYear: 2024,
        kz937: d(-1),
        kz936: d(0),
        kz985: d(0),
        kz994: d(0),
        kz996: d(0),
        kz998: d(0),
        warnings: [],
      }),
    ).toThrow();
  });

  it("losses (kz996) do not enter the gross basis", () => {
    const r = assembleE1kv({
      taxYear: 2024,
      kz937: d(0),
      kz936: d(0),
      kz985: d(1000),
      kz994: d(0),
      kz996: d(500), // present but excluded from basis
      kz998: d(0),
      warnings: [],
    });
    expect(r.grossKest.equals(d(275))).toBe(true);
  });
});

import { describe, it, expect } from "vitest";
import { Decimal } from "decimal.js";
import { netLosses } from "./loss-netter";

const d = (n: string | number) => new Decimal(n);

describe("Loss netter", () => {
  it("all gains → kz994 = sum, kz996 = 0", () => {
    const r = netLosses({ realisedAmounts: [d(100), d(200), d(50)] });
    expect(r.kz994.equals(d(350))).toBe(true);
    expect(r.kz996.isZero()).toBe(true);
    expect(r.totalLosses.isZero()).toBe(true);
  });

  it("all losses → kz994 = 0, kz996 = absolute sum", () => {
    const r = netLosses({ realisedAmounts: [d(-100), d(-200)] });
    expect(r.kz994.isZero()).toBe(true);
    expect(r.kz996.equals(d(300))).toBe(true);
  });

  it("mixed gains > losses → kz994 = net, kz996 = 0", () => {
    const r = netLosses({ realisedAmounts: [d(500), d(-100), d(-50)] });
    expect(r.kz994.equals(d(350))).toBe(true);
    expect(r.kz996.isZero()).toBe(true);
    expect(r.totalGains.equals(d(500))).toBe(true);
    expect(r.totalLosses.equals(d(150))).toBe(true);
  });

  it("mixed losses > gains → kz994 = 0, kz996 = abs(net)", () => {
    const r = netLosses({ realisedAmounts: [d(100), d(-200), d(-50)] });
    expect(r.kz994.isZero()).toBe(true);
    expect(r.kz996.equals(d(150))).toBe(true);
  });

  it("exact wash → both zero", () => {
    const r = netLosses({ realisedAmounts: [d(100), d(-100)] });
    expect(r.kz994.isZero()).toBe(true);
    expect(r.kz996.isZero()).toBe(true);
  });

  it("empty input → both zero", () => {
    const r = netLosses({ realisedAmounts: [] });
    expect(r.kz994.isZero()).toBe(true);
    expect(r.kz996.isZero()).toBe(true);
  });
});

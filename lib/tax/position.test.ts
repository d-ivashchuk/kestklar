import { describe, it, expect } from "vitest";
import { Decimal } from "decimal.js";
import { applyTrade, emptyPosition } from "./position";

const d = (n: string | number) => new Decimal(n);

describe("Position tracker — gleitender Durchschnittspreis", () => {
  it("BUY into empty position sets avg = price", () => {
    const r = applyTrade(emptyPosition("IE00B4L5Y983", 2024), {
      kind: "BUY",
      quantity: d(10),
      priceEur: d(100),
    });
    expect(r.state.quantityHeld.equals(d(10))).toBe(true);
    expect(r.state.avgCostBasisEur.equals(d(100))).toBe(true);
    expect(r.realisedGainEur.isZero()).toBe(true);
  });

  it("BUY blends weighted average correctly", () => {
    let state = emptyPosition("IE00B4L5Y983", 2024);
    state = applyTrade(state, { kind: "BUY", quantity: d(10), priceEur: d(100) }).state;
    state = applyTrade(state, { kind: "BUY", quantity: d(10), priceEur: d(120) }).state;
    expect(state.quantityHeld.equals(d(20))).toBe(true);
    expect(state.avgCostBasisEur.equals(d(110))).toBe(true);
  });

  it("SELL realises gain at (price - avgCost) * qty; avgCost unchanged", () => {
    let state = emptyPosition("IE00B4L5Y983", 2024);
    state = applyTrade(state, { kind: "BUY", quantity: d(10), priceEur: d(100) }).state;
    const r = applyTrade(state, { kind: "SELL", quantity: d(5), priceEur: d(150) });
    expect(r.realisedGainEur.equals(d(250))).toBe(true);
    expect(r.state.quantityHeld.equals(d(5))).toBe(true);
    expect(r.state.avgCostBasisEur.equals(d(100))).toBe(true);
  });

  it("SELL at loss returns negative realised", () => {
    let state = emptyPosition("X", 2024);
    state = applyTrade(state, { kind: "BUY", quantity: d(10), priceEur: d(100) }).state;
    const r = applyTrade(state, { kind: "SELL", quantity: d(10), priceEur: d(80) });
    expect(r.realisedGainEur.equals(d(-200))).toBe(true);
    expect(r.state.quantityHeld.isZero()).toBe(true);
  });

  it("invariant: SELL > holding throws", () => {
    let state = emptyPosition("X", 2024);
    state = applyTrade(state, { kind: "BUY", quantity: d(5), priceEur: d(100) }).state;
    expect(() => applyTrade(state, { kind: "SELL", quantity: d(10), priceEur: d(110) })).toThrow();
  });

  it("invariant: non-positive quantity throws", () => {
    expect(() =>
      applyTrade(emptyPosition("X", 2024), { kind: "BUY", quantity: d(0), priceEur: d(100) }),
    ).toThrow();
  });

  it("blended avg with three buys at different prices", () => {
    let s = emptyPosition("X", 2024);
    s = applyTrade(s, { kind: "BUY", quantity: d(10), priceEur: d(100) }).state;
    s = applyTrade(s, { kind: "BUY", quantity: d(5), priceEur: d(200) }).state;
    s = applyTrade(s, { kind: "BUY", quantity: d(5), priceEur: d(300) }).state;
    // (10*100 + 5*200 + 5*300) / 20 = (1000 + 1000 + 1500) / 20 = 175
    expect(s.avgCostBasisEur.equals(d(175))).toBe(true);
  });
});

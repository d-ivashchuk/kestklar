import { Decimal } from "decimal.js";
import type { PositionState } from "./types";

export type Trade =
  | { kind: "BUY"; quantity: Decimal; priceEur: Decimal }
  | { kind: "SELL"; quantity: Decimal; priceEur: Decimal };

export interface TradeResult {
  state: PositionState;
  realisedGainEur: Decimal; // signed: positive for gain, negative for loss
}

/**
 * Implements gleitender Durchschnittspreis for Neubestand
 * (securities acquired from 1 April 2012 onwards).
 *
 *   BUY:  newAvgCost = (curQty*curAvg + tradeQty*tradePrice) / (curQty + tradeQty)
 *   SELL: realisedGain = qty * (salePrice - avgCost); avgCost unchanged
 *
 * §15.2 invariants enforced here: quantity never goes negative.
 */
export function applyTrade(current: PositionState, trade: Trade): TradeResult {
  if (trade.quantity.lte(0)) {
    throw new Error(`Trade quantity must be positive (got ${trade.quantity.toString()})`);
  }

  if (trade.kind === "BUY") {
    const newQty = current.quantityHeld.plus(trade.quantity);
    const numerator = current.quantityHeld.mul(current.avgCostBasisEur).plus(trade.quantity.mul(trade.priceEur));
    const newAvg = newQty.isZero() ? new Decimal(0) : numerator.div(newQty);
    return {
      state: { ...current, quantityHeld: newQty, avgCostBasisEur: newAvg },
      realisedGainEur: new Decimal(0),
    };
  }

  // SELL
  if (trade.quantity.gt(current.quantityHeld)) {
    throw new Error(
      `SELL exceeds holding for ${current.isin}: have ${current.quantityHeld.toString()}, selling ${trade.quantity.toString()}`,
    );
  }
  const realised = trade.quantity.mul(trade.priceEur.minus(current.avgCostBasisEur));
  return {
    state: { ...current, quantityHeld: current.quantityHeld.minus(trade.quantity) },
    realisedGainEur: realised,
  };
}

export function emptyPosition(isin: string, taxYear: number): PositionState {
  return {
    isin,
    taxYear,
    quantityHeld: new Decimal(0),
    avgCostBasisEur: new Decimal(0),
  };
}

import { Decimal } from "decimal.js";
import { KEST_RATE, type CalculationWarning, type E1kvResult } from "./types";

/**
 * Final E1kv assembler — combines inputs from all upstream modules into the
 * Kennzahlen needed for the Austrian Einkommensteuererklärung E1kv schedule.
 *
 *   grossKest = 27.5% × (KZ 937 + KZ 936 + KZ 985 + KZ 994)
 *   netKest   = max(0, grossKest − KZ 998)
 *
 * §15.2 invariant: every output Kennzahl ≥ 0; grossKest equals the formula above
 * to the cent (rounding handled at presentation time, not here).
 */
export interface AssemblerInput {
  taxYear: number;
  kz937: Decimal;
  kz936: Decimal;
  kz985: Decimal;
  kz994: Decimal;
  kz996: Decimal;
  kz998: Decimal;
  warnings: CalculationWarning[];
}

export function assembleE1kv(input: AssemblerInput): E1kvResult {
  const { kz937, kz936, kz985, kz994, kz996, kz998 } = input;

  for (const [name, v] of Object.entries({ kz937, kz936, kz985, kz994, kz996, kz998 })) {
    if (v.isNegative()) throw new Error(`${name} cannot be negative (got ${v.toString()})`);
  }

  const taxableBasis = kz937.plus(kz936).plus(kz985).plus(kz994);
  const grossKest = taxableBasis.mul(KEST_RATE);
  const netKest = Decimal.max(grossKest.minus(kz998), 0);

  return {
    taxYear: input.taxYear,
    kz937,
    kz936,
    kz985,
    kz994,
    kz996,
    kz998,
    grossKest,
    netKest,
    warnings: input.warnings,
  };
}

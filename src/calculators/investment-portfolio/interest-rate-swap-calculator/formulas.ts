```typescript
import { InterestRateSwapCalculatorInputs, InterestRateSwapCalculatorMetrics, InterestRateSwapCalculatorAnalysis } from './types';

/**
 * Calculates the discount factors for each period assuming annual compounding and payments.
 * @param yieldRate - The yield rate in percentage (e.g., 5 for 5%).
 * @param tenor - The tenor in years (assumed integer for annual periods).
 * @returns Array of discount factors for periods 1 to tenor.
 */
function calculateDiscountFactors(yieldRate: number, tenor: number): number[] {
  if (tenor <= 0) {
    return [];
  }
  const r = yieldRate / 100;
  const dfs: number[] = [];
  for (let k = 1; k <= tenor; k++) {
    dfs.push(1 / Math.pow(1 + r, k));
  }
  return dfs;
}

/**
 * Computes the net present value (NPV) of an interest rate swap to the fixed-rate payer.
 * Assumptions:
 * - Annual payments and compounding.
 * - Flat yield curve at the given yield rate.
 * - Vanilla swap with no principal exchange.
 * - Floating leg based on the yield rate (par floater assumption).
 * Formula:
 * PV_floating_leg = notional * (1 - DF_T)
 * PV_fixed_leg = (fixedRate / 100) * notional * sum_{k=1 to T} DF_k
 * NPV = PV_floating_leg - PV_fixed_leg
 * @param inputs - The calculator inputs.
 * @returns The NPV as a number.
 */
export function calculateResult(inputs: InterestRateSwapCalculatorInputs): number {
  const { notional, fixedRate, yield: yieldRate, tenor } = inputs;

  // Input validation
  if (notional <= 0 || tenor <= 0 || fixedRate < 0 || yieldRate < 0) {
    return 0; // Invalid inputs yield zero NPV
  }

  const dfs = calculateDiscountFactors(yieldRate, tenor);
  if (dfs.length === 0) {
    return 0;
  }

  const DF_T = dfs[dfs.length - 1];
  const annuityFactor = dfs.reduce((sum, df) => sum + df, 0);

  const pvFloatingLeg = notional * (1 - DF_T);
  const pvFixedLeg = (fixedRate / 100) * notional * annuityFactor;

  return pvFloatingLeg - pvFixedLeg;
}

/**
 * Generates an analysis and recommendation for the interest rate swap based on the inputs and calculated metrics.
 * Risk level is determined by the normalized absolute NPV (as a fraction of notional).
 * Recommendation considers the sign of NPV and comparison of fixed rate to yield.
 * @param inputs - The calculator inputs.
 * @param metrics - The metrics including the result (NPV).
 * @returns The analysis object.
 */
export function generateAnalysis(
  inputs: InterestRateSwapCalculatorInputs,
  metrics: InterestRateSwapCalculatorMetrics
): InterestRateSwapCalculatorAnalysis {
  const result = metrics.result;
  const { notional, fixedRate, yield: yieldRate } = inputs;

  // Normalized NPV for risk assessment
  const normalizedNPV = notional > 0 ? Math.abs(result) / notional : 0;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (normalizedNPV > 0.05) {
    riskLevel = 'High';
  } else if (normalizedNPV > 0.02) {
    riskLevel = 'Medium';
  }

  let recommendation = '';
  if (result > 0) {
    recommendation = `The swap has positive NPV ($${result.toFixed(2)}) to the fixed payer, indicating it is InTheMoney. Consider holding to capture value.`;
  } else if (result < 0) {
    recommendation = `The swap has negative NPV ($${result.toFixed(2)}) to the fixed payer, indicating it is OutOfThe-money. Evaluate unwinding or hedging if termination costs are manageable.`;
  } else {
    recommendation = 'The swap is at fair value (NPV ≈ 0). Monitor for rate changes.';
  }

  // Additional insight based on rate comparison
  if (fixedRate > yieldRate) {
    recommendation += ' The contracted fixed rate exceeds the current yield, providing a buffer if interest rates decline.';
  } else {
    recommendation += ' The contracted fixed rate is below the current yield, exposing to risk if interest rates rise further.';
  }

  // General portfolio advice
  recommendation += ' In an investment portfolio, assess duration risk and correlation with other fixed-income assets.';

  return { recommendation, riskLevel };
}
```
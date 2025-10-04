```typescript
import { DistressedDebtCalculatorInputs, DistressedDebtCalculatorMetrics, DistressedDebtCalculatorAnalysis } from './types';

/**
 * Calculates the present value of a future amount using continuous compounding approximation via the power function.
 * Formula: PV = FV / (1 + r)^t
 * @param futureValue - The future value to discount.
 * @param rate - The annual discount rate.
 * @param time - The time in years.
 * @returns The present value.
 */
function presentValue(futureValue: number, rate: number, time: number): number {
  if (time === 0) return futureValue;
  return futureValue / Math.pow(1 + rate, time);
}

/**
 * Core calculation for the Distressed Debt Calculator.
 * Computes the Net Present Value (NPV) of the expected payoff from the distressed debt investment.
 * 
 * Model Assumptions:
 * - The debt resolves (default or no default) at the end of the timeToResolution period.
 * - Expected payoff at resolution: (1 - PD) * Face Value + PD * (Recovery Rate * Face Value)
 * - Discount the expected payoff to present using the provided discount rate.
 * - NPV = PV(Expected Payoff) - Current Price
 * 
 * This is a simplified binomial model for distressed debt valuation, focusing on principal recovery.
 * Coupons are omitted for deep-distressed scenarios where recovery dominates.
 * 
 * @param inputs - The input parameters for the calculation.
 * @returns The NPV of the investment.
 */
export function calculateResult(inputs: DistressedDebtCalculatorInputs): number {
  const { currentPrice, faceValue, recoveryRate, probabilityOfDefault, timeToResolution, discountRate } = inputs;

  // Validate inputs (basic production-ready checks)
  if (faceValue <= 0 || currentPrice < 0 || recoveryRate < 0 || recoveryRate > 1 || probabilityOfDefault < 0 || probabilityOfDefault > 1 || timeToResolution < 0 || discountRate < 0) {
    throw new Error('Invalid input parameters: values must be non-negative, recovery and PD between 0 and 1.');
  }

  const expectedPayoff = (1 - probabilityOfDefault) * faceValue + probabilityOfDefault * (recoveryRate * faceValue);
  const pvOfExpectedPayoff = presentValue(expectedPayoff, discountRate, timeToResolution);
  const npv = pvOfExpectedPayoff - currentPrice;

  return npv;
}

/**
 * Generates a qualitative analysis and recommendation based on the inputs and calculated metrics.
 * 
 * Risk Level Logic:
 * - High: Probability of Default > 50% (significant distress risk)
 * - Medium: 20% < Probability of Default <= 50% (moderate distress)
 * - Low: Probability of Default <= 20% (lower distress, more like performing debt)
 * 
 * Recommendation Logic:
 * - Based on NPV: Positive NPV suggests value; negative suggests overpriced.
 * - Considers discount to par (Current Price / Face Value) for upside potential.
 * 
 * @param inputs - The original inputs.
 * @param metrics - The calculated metrics, including the result (NPV).
 * @returns The analysis object with recommendation and risk level.
 */
export function generateAnalysis(
  inputs: DistressedDebtCalculatorInputs,
  metrics: DistressedDebtCalculatorMetrics
): DistressedDebtCalculatorAnalysis {
  const { probabilityOfDefault } = inputs;
  const npv = metrics.result;
  const discountToPar = (inputs.currentPrice / inputs.faceValue) * 100;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (probabilityOfDefault > 0.5) {
    riskLevel = 'High';
  } else if (probabilityOfDefault > 0.2) {
    riskLevel = 'Medium';
  }

  let recommendation: string;
  if (npv > 0) {
    recommendation = `Positive NPV of $${npv.toFixed(2)} indicates potential value in this distressed debt opportunity. With a ${discountToPar.toFixed(1)}% discount to par and ${riskLevel.toLowerCase()} risk, consider acquiring if aligned with portfolio strategy. Monitor restructuring developments closely.`;
  } else if (npv > -inputs.currentPrice * 0.1) { // Within 10% of breakeven
    recommendation = `Marginal NPV of $${npv.toFixed(2)} suggests limited upside at current pricing. The ${discountToPar.toFixed(1)}% discount to par offers some cushion, but ${riskLevel.toLowerCase()} risk warrants caution—wait for better entry or improved recovery outlook.`;
  } else {
    recommendation = `Negative NPV of $${npv.toFixed(2)} implies overpricing relative to expected recovery. Avoid unless probability of default decreases or recovery rate improves significantly. High ${riskLevel.toLowerCase()} exposure without adequate return.`;
  }

  return { recommendation, riskLevel };
}
```
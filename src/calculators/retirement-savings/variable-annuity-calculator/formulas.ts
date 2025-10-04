```typescript
import { VariableAnnuityCalculatorInputs, VariableAnnuityCalculatorMetrics, VariableAnnuityCalculatorAnalysis } from './types';

/**
 * Calculates the future value of an investment with regular annual contributions,
 * accounting for net return after fees. Uses the compound interest formula for
 * initial principal and the annuity formula for contributions (assuming end-of-year deposits).
 * 
 * @param initial - Initial investment amount
 * @param annual - Annual contribution amount
 * @param rate - Annual net growth rate (decimal)
 * @param years - Number of years
 * @returns Future value as a number
 */
function calculateFutureValue(initial: number, annual: number, rate: number, years: number): number {
  if (years <= 0) {
    return initial;
  }
  if (rate <= -1) {
    // Avoid division by zero or negative rates that cause issues; return principal only
    return initial + annual * years;
  }

  const fvInitial = initial * Math.pow(1 + rate, years);
  const fvContributions = annual * (Math.pow(1 + rate, years) - 1) / rate;
  return fvInitial + fvContributions;
}

/**
 * Main calculation function for the Variable Annuity Calculator.
 * Computes the projected account value at retirement age, based on initial investment,
 * annual contributions, expected return net of fees, and time to retirement.
 * 
 * Formulas:
 * - Years to retirement: retirementAge - currentAge
 * - Net annual rate: (expectedAnnualReturn / 100) - (annualExpenseRatio / 100)
 * - Future value: FV_initial + FV_contributions (as defined in helper)
 * 
 * Handles edge cases: negative years (return approximate current value),
 * negative net rates (return non-compounding value).
 * 
 * @param inputs - Input parameters for the calculator
 * @returns Projected account value at retirement (number, in same currency units as inputs)
 */
export function calculateResult(inputs: VariableAnnuityCalculatorInputs): number {
  const years = inputs.retirementAge - inputs.currentAge;
  const grossRate = inputs.expectedAnnualReturn / 100;
  const feeRate = inputs.annualExpenseRatio / 100;
  const netRate = grossRate - feeRate;

  // Edge case: already at or past retirement
  if (years <= 0) {
    return inputs.initialInvestment + inputs.annualContribution;
  }

  // Use helper for core calculation
  return calculateFutureValue(
    inputs.initialInvestment,
    inputs.annualContribution,
    netRate,
    years
  );
}

/**
 * Generates a qualitative analysis and recommendation for the Variable Annuity Calculator.
 * Assesses risk level based on expected annual return (higher returns imply higher market risk
 * in variable annuities). Provides a recommendation based on projected result relative to thresholds.
 * 
 * Risk levels:
 * - Low: Expected return < 5%
 * - Medium: 5% <= Expected return <= 8%
 * - High: Expected return > 8%
 * 
 * Recommendations are tailored to projected value (arbitrary thresholds for illustration;
 * adjust based on domain expertise or user context).
 * 
 * @param inputs - Input parameters for the calculator
 * @param metrics - Computed metrics including the result
 * @returns Analysis object with recommendation and riskLevel
 */
export function generateAnalysis(
  inputs: VariableAnnuityCalculatorInputs,
  metrics: VariableAnnuityCalculatorMetrics
): VariableAnnuityCalculatorAnalysis {
  const result = metrics.result;
  const expectedReturnPercent = inputs.expectedAnnualReturn;

  // Determine risk level based on expected return (volatility proxy for variable annuities)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  if (expectedReturnPercent < 5) {
    riskLevel = 'Low';
  } else if (expectedReturnPercent > 8) {
    riskLevel = 'High';
  }

  // Generate recommendation based on projected value and inputs
  let recommendation: string;
  if (result >= 1000000) {
    recommendation = 'Your projected variable annuity value at retirement is substantial. Consider annuitization options or income riders for guaranteed payouts, but be mindful of market volatility.';
  } else if (result < 100000) {
    recommendation = 'The projected value is relatively low. To improve outcomes, consider increasing annual contributions, reducing expense ratios by choosing lower-fee subaccounts, or extending the accumulation period. Consult a financial advisor.';
  } else {
    recommendation = `Your variable annuity projection shows balanced growth at ${inputs.expectedAnnualReturn}% expected return (net of ${inputs.annualExpenseRatio}% fees). Diversify subaccount investments to manage risk during the accumulation phase.`;
  }

  return {
    recommendation,
    riskLevel,
  };
}
```
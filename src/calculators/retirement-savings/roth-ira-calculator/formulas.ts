```typescript
import { RothIRACalculatorInputs, RothIRACalculatorMetrics, RothIRACalculatorAnalysis } from './types';

/**
 * Helper function to calculate the future value of a single lump sum (compound interest).
 * @param principal - Initial principal amount
 * @param rate - Annual interest rate (decimal)
 * @param periods - Number of periods (years)
 * @returns Future value of the principal
 */
function futureValueOfPrincipal(principal: number, rate: number, periods: number): number {
  if (periods <= 0) return principal;
  if (rate === 0) return principal;
  return principal * Math.pow(1 + rate, periods);
}

/**
 * Helper function to calculate the future value of an ordinary annuity (annual contributions).
 * @param payment - Annual payment/contribution
 * @param rate - Annual interest rate (decimal)
 * @param periods - Number of periods (years)
 * @returns Future value of the annuity
 */
function futureValueOfAnnuity(payment: number, rate: number, periods: number): number {
  if (periods <= 0) return 0;
  if (rate === 0) return payment * periods;
  return payment * (Math.pow(1 + rate, periods) - 1) / rate;
}

/**
 * Calculates the projected future value of a Roth IRA at retirement.
 * Uses the compound interest formula for the current balance and the future value of an annuity for annual contributions.
 * Assumes contributions are made at the end of each year and returns are compounded annually.
 * 
 * @param inputs - Roth IRA calculator inputs
 * @returns Projected balance at retirement (number, in same currency units as inputs)
 */
export function calculateResult(inputs: RothIRACalculatorInputs): number {
  const { currentAge, retirementAge, currentBalance, annualContribution, expectedReturnRate } = inputs;
  
  // Validate inputs
  if (currentAge >= retirementAge || currentAge < 0 || retirementAge < 0) {
    throw new Error('Invalid ages: current age must be less than retirement age, and both must be non-negative.');
  }
  if (currentBalance < 0 || annualContribution < 0 || expectedReturnRate < 0) {
    throw new Error('Balances, contributions, and rates must be non-negative.');
  }

  const yearsToRetirement = retirementAge - currentAge;
  const annualRate = expectedReturnRate / 100;

  const fvPrincipal = futureValueOfPrincipal(currentBalance, annualRate, yearsToRetirement);
  const fvContributions = futureValueOfAnnuity(annualContribution, annualRate, yearsToRetirement);

  return fvPrincipal + fvContributions;
}

/**
 * Generates an analysis and recommendation for the Roth IRA projection.
 * Risk level is determined based on the expected return rate:
 * - Low: < 5% (conservative)
 * - Medium: 5% to 8% (balanced)
 * - High: > 8% (aggressive, higher volatility)
 * Recommendation provides insights on the projection, suggesting actions like increasing contributions or reviewing assumptions.
 * 
 * @param inputs - Original inputs for context
 * @param metrics - Calculation metrics including the result
 * @returns Analysis object with recommendation and risk level
 */
export function generateAnalysis(
  inputs: RothIRACalculatorInputs,
  metrics: RothIRACalculatorMetrics
): RothIRACalculatorAnalysis {
  const { annualContribution, expectedReturnRate } = inputs;
  const projectedBalance = metrics.result;

  // Determine risk level based on expected return rate
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (expectedReturnRate < 5) {
    riskLevel = 'Low';
  } else if (expectedReturnRate <= 8) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  // Generate recommendation
  let recommendation = `Your projected Roth IRA balance at retirement is $${projectedBalance.toFixed(2)}. `;
  
  if (annualContribution === 0) {
    recommendation += 'Consider starting contributions to maximize tax-free growth. ';
  } else if (annualContribution < 7000) { // Assuming 2024 limit for under 50; adjust as needed for production
    recommendation += 'You may be able to increase contributions up to the annual limit (e.g., $7,000 for 2024 if under 50) for better retirement savings. ';
  }

  if (riskLevel === 'High') {
    recommendation += 'Your assumed return rate is aggressive; consider diversifying to manage risk. ';
  } else if (riskLevel === 'Low') {
    recommendation += 'Your conservative return assumption prioritizes stability; review if it aligns with your goals. ';

  recommendation += 'Roth IRAs offer tax-free withdrawals in retirement—consult a financial advisor for personalized advice.';

  return { recommendation, riskLevel };
}
```
```typescript
import { InterestCalculatorInputs, InterestCalculatorMetrics, InterestCalculatorAnalysis } from './types';

/**
 * Helper function to calculate compound interest future value.
 * Formula: FV = P * (1 + r/n)^(n*t)
 * If n=0, falls back to simple interest: FV = P * (1 + r*t)
 * @param principal - Initial investment amount
 * @param rate - Annual interest rate as decimal
 * @param years - Time period in years
 * @param compoundsPerYear - Number of compounding periods per year (0 for simple)
 * @returns Future value
 */
function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number,
  compoundsPerYear: number
): number {
  if (principal <= 0 || years <= 0 || rate < 0) {
    return principal; // No growth for invalid inputs
  }

  if (compoundsPerYear <= 0) {
    // Simple interest
    return principal * (1 + rate * years);
  }

  // Compound interest
  const exponent = compoundsPerYear * years;
  const base = 1 + (rate / compoundsPerYear);
  return principal * Math.pow(base, exponent);
}

export function calculateResult(inputs: InterestCalculatorInputs): number {
  const { principal, annualRate, years, compoundsPerYear = 12 } = inputs; // Default to monthly compounding
  const rateAsDecimal = annualRate / 100; // Convert percentage to decimal
  return calculateCompoundInterest(principal, rateAsDecimal, years, compoundsPerYear);
}

export function generateAnalysis(
  inputs: InterestCalculatorInputs,
  metrics: InterestCalculatorMetrics
): InterestCalculatorAnalysis {
  const fv = metrics.result;
  const principal = inputs.principal;
  const interestEarned = fv - principal;
  const annualRate = inputs.annualRate;
  const years = inputs.years;

  // Risk assessment: Interest calculations are generally low risk (e.g., savings, bonds).
  // Adjust based on rate: higher rates may imply higher risk instruments.
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (annualRate > 7) {
    riskLevel = 'High'; // Potentially high-yield/riskier investments
  } else if (annualRate > 4) {
    riskLevel = 'Medium'; // Moderate rates
  }

  // Recommendation based on growth and risk
  const growthPercentage = ((interestEarned / principal) * 100);
  let recommendation: string;
  if (growthPercentage > 20) {
    recommendation = `Excellent growth potential! Your $${principal.toFixed(2)} investment at ${annualRate}% over ${years} years could yield $${interestEarned.toFixed(2)} in interest (${growthPercentage.toFixed(1)}% total return). Consider this for long-term portfolio diversification, but monitor ${riskLevel.toLowerCase()} risk factors.`;
  } else if (growthPercentage > 5) {
    recommendation = `Solid steady growth. Your investment will earn $${interestEarned.toFixed(2)} in interest, reaching $${fv.toFixed(2)}. Suitable for conservative portfolio allocation with ${riskLevel.toLowerCase()} risk.`;
  } else {
    recommendation = `Modest returns expected. The $${principal.toFixed(2)} will grow by $${interestEarned.toFixed(2)}, totaling $${fv.toFixed(2)}. Ideal for low-risk preservation in your portfolio, though inflation may impact real returns.`;
  }

  return { recommendation, riskLevel };
}
```
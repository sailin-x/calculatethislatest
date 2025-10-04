```typescript
import { CDInterestCalculatorInputs, CDInterestCalculatorMetrics, CDInterestCalculatorAnalysis } from './types';

/**
 * Helper function to calculate the future value of a CD using the compound interest formula.
 * FV = P * (1 + r/n)^(n*t)
 * @param principal - Initial deposit amount
 * @param annualRate - Annual interest rate as percentage (e.g., 5 for 5%)
 * @param termYears - Term length in years
 * @param compoundingPerYear - Number of compounding periods per year (e.g., 12 for monthly, 4 for quarterly, 1 for annually)
 * @returns Future value of the investment
 */
function calculateFutureValue(
  principal: number,
  annualRate: number,
  termYears: number,
  compoundingPerYear: number
): number {
  const rateDecimal = annualRate / 100;
  const periodsPerYear = compoundingPerYear;
  if (periodsPerYear === 0) {
    // Fallback to simple interest if no compounding
    return principal * (1 + rateDecimal * termYears);
  }
  const exponent = periodsPerYear * termYears;
  const growthFactor = Math.pow(1 + rateDecimal / periodsPerYear, exponent);
  return principal * growthFactor;
}

/**
 * Calculates the interest earned on a CD.
 * Interest = Future Value - Principal
 * @param inputs - The calculator inputs
 * @returns The total interest earned (as a number)
 */
export function calculateResult(inputs: CDInterestCalculatorInputs): number {
  const { principal, annualRate, termYears, compoundingFrequency } = inputs;

  // Map compounding frequency to periods per year
  let compoundingPerYear: number;
  switch (compoundingFrequency) {
    case 'daily':
      compoundingPerYear = 365;
      break;
    case 'monthly':
      compoundingPerYear = 12;
      break;
    case 'quarterly':
      compoundingPerYear = 4;
      break;
    case 'semiAnnually':
      compoundingPerYear = 2;
      break;
    case 'annually':
    default:
      compoundingPerYear = 1;
      break;
  }

  const futureValue = calculateFutureValue(principal, annualRate, termYears, compoundingPerYear);
  const interest = futureValue - principal;

  // Round to 2 decimal places for currency precision
  return Math.round(interest * 100) / 100;
}

/**
 * Generates an analysis for the CD investment, including recommendation and risk level.
 * CDs are generally low-risk, fixed-income investments backed by FDIC insurance (up to limits).
 * @param inputs - The calculator inputs
 * @param metrics - The calculated metrics, including the result (interest)
 * @returns Analysis object with recommendation and riskLevel
 */
export function generateAnalysis(
  inputs: CDInterestCalculatorInputs,
  metrics: CDInterestCalculatorMetrics
): CDInterestCalculatorAnalysis {
  const { annualRate, termYears } = inputs;
  const interest = metrics.result;
  const futureValue = inputs.principal + interest;

  // Risk assessment: CDs are inherently low risk due to fixed rates and insurance
  const riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  // Recommendation logic: Based on rate competitiveness and term
  let recommendation: string;
  const effectiveRateThreshold = 4.0; // Arbitrary threshold for "competitive" rate (adjust based on market data)
  if (annualRate >= effectiveRateThreshold) {
    recommendation = `This CD offers a competitive ${annualRate}% annual rate over ${termYears} years, yielding approximately $${interest.toFixed(2)} in interest and a total maturity value of $${futureValue.toFixed(2)}. Ideal for conservative investors seeking guaranteed returns with minimal risk. Consider FDIC-insured options for principal protection up to $250,000.`;
  } else {
    recommendation = `This CD provides a modest ${annualRate}% annual rate over ${termYears} years, resulting in about $${interest.toFixed(2)} in interest and a total of $${futureValue.toFixed(2)} at maturity. Suitable for low-risk preservation of capital, but compare with higher-yield alternatives if inflation is a concern. Ensure FDIC coverage for safety.`;
  }

  return { recommendation, riskLevel };
}
```
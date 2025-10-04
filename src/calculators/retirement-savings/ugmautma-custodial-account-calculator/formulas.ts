```typescript
import { 
  UGMAUTMACustodialAccountCalculatorInputs, 
  UGMAUTMACustodialAccountCalculatorMetrics, 
  UGMAUTMACustodialAccountCalculatorAnalysis 
} from './types';

/**
 * Helper function to calculate the future value of an initial investment with compound interest.
 * Formula: FV = P * (1 + r)^n
 * @param principal - Initial amount
 * @param rate - Annual return rate as decimal
 * @param years - Number of years
 * @returns Future value of principal
 */
function futureValueOfPrincipal(principal: number, rate: decimal, years: number): number {
  if (years <= 0) return principal;
  return principal * Math.pow(1 + rate, years);
}

/**
 * Helper function to calculate the future value of annual contributions (annuity).
 * Formula: FV = P * ((1 + r)^n - 1) / r
 * Assumes contributions at the end of each year.
 * @param annualContribution - Annual contribution amount
 * @param rate - Annual return rate as decimal
 * @param years - Number of years
 * @returns Future value of contributions
 */
function futureValueOfAnnuity(annualContribution: number, rate: number, years: number): number {
  if (years <= 0 || rate === 0) return annualContribution * years;
  if (rate === 0) return annualContribution * years;
  return annualContribution * (Math.pow(1 + rate, years) - 1) / rate;
}

/**
 * Calculates the projected value of a UGMA/UTMA custodial account at the age of majority.
 * Uses compound annual growth rate (CAGR) for projections.
 * Years to maturity = ageOfMajority - currentAge.
 * If currentAge >= ageOfMajority, returns initialAmount + (annualContribution * yearsSinceMaturity), but assumes pre-maturity.
 * @param inputs - Calculator inputs
 * @returns Projected account value at maturity
 */
export function calculateResult(inputs: UGMAUTMACustodialAccountCalculatorInputs): number {
  const { initialAmount, annualContribution, annualReturnRate, currentAge, ageOfMajority } = inputs;
  
  if (initialAmount < 0 || annualContribution < 0 || annualReturnRate < 0 || currentAge < 0 || ageOfMajority <= currentAge) {
    throw new Error('Invalid inputs: Amounts and rates must be non-negative; child must be under age of majority.');
  }

  const rate = annualReturnRate / 100; // Convert percentage to decimal
  const years = ageOfMajority - currentAge;

  if (years <= 0) {
    // If already at or past majority, no growth projection
    return initialAmount;
  }

  const fvPrincipal = futureValueOfPrincipal(initialAmount, rate, years);
  const fvContributions = futureValueOfAnnuity(annualContribution, rate, years);

  return fvPrincipal + fvContributions;
}

/**
 * Generates an analysis for the UGMA/UTMA custodial account projection.
 * Assesses risk based on expected return rate (common benchmark for investment risk).
 * Provides a recommendation based on projected value and inputs.
 * @param inputs - Calculator inputs
 * @param metrics - Calculated metrics including result
 * @returns Analysis with recommendation and risk level
 */
export function generateAnalysis(
  inputs: UGMAUTMACustodialAccountCalculatorInputs, 
  metrics: UGMAUTMACustodialAccountCalculatorMetrics
): UGMAUTMACustodialAccountCalculatorAnalysis {
  const { annualReturnRate, currentAge, ageOfMajority } = inputs;
  const projectedValue = metrics.result;
  const yearsToMaturity = ageOfMajority - currentAge;

  // Risk level assessment based on return rate (simplified; in production, consider asset allocation)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (annualReturnRate < 4) {
    riskLevel = 'Low'; // Conservative (e.g., bonds, savings)
  } else if (annualReturnRate < 8) {
    riskLevel = 'Medium'; // Balanced (e.g., mixed stocks/bonds)
  } else {
    riskLevel = 'High'; // Aggressive (e.g., stocks)
  }

  // Recommendation logic: General guidance for custodial savings
  let recommendation: string;
  if (projectedValue < 5000) {
    recommendation = 'Consider increasing contributions or return rate for better growth. UGMA/UTMA accounts are great for tax-advantaged minor savings, but diversify investments to match risk tolerance.';
  } else if (projectedValue < 25000) {
    recommendation = 'Solid foundation for your child\'s future. Monitor tax implications (Kiddie Tax may apply to earnings). Consult a financial advisor for optimal asset allocation.';
  } else {
    recommendation = 'Excellent projection! This could significantly support education or early financial independence. Remember, control transfers at age of majority; plan for that transition.';
  }

  if (yearsToMaturity <= 5) {
    recommendation += ' With maturity approaching, consider shifting to lower-risk investments to preserve capital.';
  }

  return { recommendation, riskLevel };
}
```
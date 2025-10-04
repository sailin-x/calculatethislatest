```typescript
import { IncomeBasedRepaymentCalculatorInputs, IncomeBasedRepaymentCalculatorMetrics, IncomeBasedRepaymentCalculatorAnalysis } from './types';

/**
 * Helper function to retrieve the federal poverty guideline based on family size.
 * Uses 2023 HHS Poverty Guidelines for the 48 contiguous states and DC.
 * For production, this should be updated annually or fetched from an API.
 * Assumes contiguous US; extend for AK/HI if needed.
 */
function getPovertyGuideline(familySize: number): number {
  // 2023 Poverty Guidelines for family size (contiguous US)
  const levels: Record<number, number> = {
    1: 14380,
    2: 19430,
    3: 24500,
    4: 29570,
    5: 34640,
    6: 39710,
    7: 44780,
    8: 49850,
    // For family size >8, add $5070 per additional person
  };

  if (familySize > 8) {
    return levels[8] + (familySize - 8) * 5070;
  }

  return levels[familySize] || 14380; // Default to size 1 if invalid
}

/**
 * Calculates discretionary income for IBR eligibility.
 * Formula: Discretionary Income = AGI - (150% of Federal Poverty Guideline for family size)
 * Ensures non-negative result.
 */
function calculateDiscretionaryIncome(annualIncome: number, familySize: number): number {
  const povertyGuideline = getPovertyGuideline(familySize);
  const povertyThreshold = povertyGuideline * 1.5;
  return Math.max(0, annualIncome - povertyThreshold);
}

/**
 * Calculates the annual IBR payment based on discretionary income and repayment percentage.
 * Monthly payment is then derived by dividing by 12.
 * Percentage: 10% for new borrowers (loans after July 1, 2014), 15% for older.
 */
function calculateAnnualIBRPayment(discretionaryIncome: number, isNewBorrower: boolean): number {
  const percentage = isNewBorrower ? 0.10 : 0.15;
  return discretionaryIncome * percentage;
}

export function calculateResult(inputs: IncomeBasedRepaymentCalculatorInputs): number {
  // Calculate discretionary income using IBR-specific formula
  const discretionaryIncome = calculateDiscretionaryIncome(inputs.annualIncome, inputs.familySize);
  
  // Calculate annual payment using IBR percentage
  const annualPayment = calculateAnnualIBRPayment(discretionaryIncome, inputs.isNewBorrower);
  
  // Return monthly payment (core result)
  return Math.max(0, annualPayment / 12); // Ensure non-negative
}

export function generateAnalysis(
  inputs: IncomeBasedRepaymentCalculatorInputs, 
  metrics: IncomeBasedRepaymentCalculatorMetrics
): IncomeBasedRepaymentCalculatorAnalysis {
  const monthlyPayment = metrics.result;
  const monthlyIncome = inputs.annualIncome / 12;
  const paymentToIncomeRatio = (monthlyPayment / monthlyIncome) * 100;

  // IBR-specific risk assessment:
  // - Low: Payment <= 8% of monthly income (highly affordable, potential for faster payoff)
  // - Medium: 8% < Payment <= 12% (standard IBR range, manageable)
  // - High: Payment > 12% (nearing cap, may lead to extended term/forgiveness reliance)
  // This accounts for IBR's 10-15% cap on discretionary income but normalizes to gross income.
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (paymentToIncomeRatio > 12) {
    riskLevel = 'High';
  } else if (paymentToIncomeRatio > 8) {
    riskLevel = 'Medium';
  }

  // IBR-specific recommendation:
  // Considers if IBR saves money vs. standard 10-year plan (assumes inputs.loanBalance and inputs.interestRate for comparison)
  // Simplified: If IBR payment < estimated standard payment, recommend IBR.
  const estimatedStandardMonthly = (inputs.loanBalance * inputs.interestRate / 12) / (1 - Math.pow(1 + inputs.interestRate / 12, -120)); // 10-year amortization formula
  const isSavings = monthlyPayment < estimatedStandardMonthly;

  let recommendation: string;
  if (isSavings && riskLevel === 'Low') {
    recommendation = `Your IBR monthly payment of $${monthlyPayment.toFixed(2)} is affordable (${paymentToIncomeRatio.toFixed(1)}% of monthly income) and saves you compared to the standard plan. Proceed with IBR for long-term relief.`;
  } else if (isSavings) {
    recommendation = `IBR reduces your payment to $${monthlyPayment.toFixed(2)} (${paymentToIncomeRatio.toFixed(1)}% of income), but monitor your budget closely. Consider income-driven adjustments if finances tighten.`;
  } else {
    recommendation = `At $${monthlyPayment.toFixed(2)} monthly (${paymentToIncomeRatio.toFixed(1)}% of income), IBR may not save much over standard repayment. Evaluate other plans like PAYE if eligible, or focus on extra principal payments to avoid 20-25 year forgiveness taxes.`;
  }

  return { recommendation, riskLevel };
}
```
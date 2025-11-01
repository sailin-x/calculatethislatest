```typescript
import { DTIRatioCalculatorInputs, DTIRatioCalculatorMetrics, DTIRatioCalculatorAnalysis } from './types';

/**
 * Helper function to validate DTI inputs for loans-debt calculations.
 * Ensures gross monthly income is positive to avoid division by zero.
 * @param inputs - DTI calculator inputs
 * @returns boolean indicating validity
 */
function isValidDTIInputs(inputs: DTIRatioCalculatorInputs): boolean {
  return inputs.grossMonthlyIncome > 0 && inputs.totalMonthlyDebtPayments >= 0;
}

/**
 * Helper function to calculate the DebtToIncome (DTI) ratio percentage.
 * Formula: DTI = (Total Monthly Debt Payments / Gross Monthly Income) * 100
 * This is the standard formula used in mortgage and loan underwriting to assess borrower's ability to manage debt.
 * @param grossMonthlyIncome - Borrower's gross monthly income (pre-tax)
 * @param totalMonthlyDebtPayments - Sum of all recurring monthly debt obligations (e.g., mortgage, auto loans, credit cards, student loans)
 * @returns DTI ratio as a percentage (number)
 */
function computeDTIRatio(grossMonthlyIncome: number, totalMonthlyDebtPayments: number): number {
  if (grossMonthlyIncome <= 0) {
    throw new Error('Gross monthly income must be greater than zero for DTI calculation.');
  }
  return (totalMonthlyDebtPayments / grossMonthlyIncome) * 100;
}

export function calculateResult(inputs: DTIRatioCalculatorInputs): number {
  if (!isValidDTIInputs(inputs)) {
    throw new Error('Invalid inputs: Gross monthly income must be positive, and debt payments non-negative.');
  }

  // Core DTI calculation using standard loans-debt formula
  const dtiRatio = computeDTIRatio(inputs.grossMonthlyIncome, inputs.totalMonthlyDebtPayments);

  return dtiRatio;
}

export function generateAnalysis(
  inputs: DTIRatioCalculatorInputs,
  metrics: DTIRatioCalculatorMetrics
): DTIRatioCalculatorAnalysis {
  const result = metrics.result; // DTI ratio percentage
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  // Loans-debt specific risk assessment based on standard underwriting guidelines (e.g., FHA/VA/Conventional loans)
  // - <36%: Ideal for most lenders, low risk of default
  // - 36-43%: Acceptable for some programs, moderate risk; may require compensating factors
  // - >43%: High risk, often disqualifies for new loans; signals over-leveraging
  if (result < 36) {
    riskLevel = 'Low';
    recommendation = `Your DTI ratio of ${result.toFixed(2)}% is excellent. This positions you well for loan approvals, such as mortgages or personal loans, with minimal risk of financial strain. Consider maintaining or reducing debt to keep this strong profile.`;
  } else if (result >= 36 && result <= 43) {
    riskLevel = 'Medium';
    recommendation = `Your DTI ratio of ${result.toFixed(2)}% is manageable but approaching lender thresholds. You may qualify for loans with strong credit or reserves, but focus on paying down high-interest debts (e.g., credit cards) to improve affordability and reduce default risk.`;
  } else {
    riskLevel = 'High';
    recommendation = `Your DTI ratio of ${result.toFixed(2)}% indicates a high debt burden relative to income. This could hinder new loan approvals and increase financial stress. Prioritize debt consolidation, budgeting, or income boosts to lower your ratio below 43% for better lending options and stability.`;
  }

  return { recommendation, riskLevel };
}
```
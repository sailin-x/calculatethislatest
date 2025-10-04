```typescript
import { PaydayLoanCalculatorInputs, PaydayLoanCalculatorMetrics, PaydayLoanCalculatorAnalysis } from './types';

/**
 * Helper function to calculate the effective Annual Percentage Rate (APR) for a payday loan.
 * Formula: APR = (Finance Charge / Principal) * (365 / Term in Days) * 100
 * This annualizes the cost of the short-term loan, reflecting the high effective rates typical in payday lending.
 * @param principal - The loan amount borrowed.
 * @param financeCharge - The fee or interest charged by the lender.
 * @param termDays - The loan term in days (typically 7-31 days for payday loans).
 * @returns The effective APR as a percentage (number).
 */
function calculateAPR(principal: number, financeCharge: number, termDays: number): number {
  if (principal <= 0 || termDays <= 0 || financeCharge < 0) {
    throw new Error('Invalid inputs: principal and term must be positive, finance charge non-negative.');
  }
  const dailyRate = financeCharge / principal / termDays;
  const annualRate = dailyRate * 365;
  return annualRate * 100; // Convert to percentage
}

/**
 * Helper function to calculate the total repayment amount for the payday loan.
 * Formula: Total Repayment = Principal + Finance Charge
 * This represents the full amount due at the end of the loan term.
 * @param principal - The loan amount borrowed.
 * @param financeCharge - The fee or interest charged.
 * @returns The total amount to be repaid.
 */
function calculateTotalRepayment(principal: number, financeCharge: number): number {
  if (principal <= 0 || financeCharge < 0) {
    throw new Error('Invalid inputs: principal must be positive, finance charge non-negative.');
  }
  return principal + financeCharge;
}

/**
 * Helper function to calculate the total cost of the loan as a percentage of principal.
 * Formula: Cost Percentage = (Finance Charge / Principal) * 100
 * Useful for assessing the immediate cost burden relative to the borrowed amount.
 * @param principal - The loan amount borrowed.
 * @param financeCharge - The fee or interest charged.
 * @returns The cost as a percentage of principal.
 */
function calculateCostPercentage(principal: number, financeCharge: number): number {
  if (principal <= 0 || financeCharge < 0) {
    throw new Error('Invalid inputs: principal must be positive, finance charge non-negative.');
  }
  return (financeCharge / principal) * 100;
}

export function calculateResult(inputs: PaydayLoanCalculatorInputs): number {
  // The primary result is the effective APR, a key metric for evaluating payday loan affordability and risk.
  // This uses the standard annualization formula for short-term high-fee loans.
  return calculateAPR(inputs.principal, inputs.financeCharge, inputs.termDays);
}

export function generateAnalysis(
  inputs: PaydayLoanCalculatorInputs,
  metrics: PaydayLoanCalculatorMetrics
): PaydayLoanCalculatorAnalysis {
  const apr = metrics.apr; // From metrics, which includes the calculated APR
  const totalRepayment = calculateTotalRepayment(inputs.principal, inputs.financeCharge);
  const costPercentage = calculateCostPercentage(inputs.principal, inputs.financeCharge);

  // Risk assessment based on payday loan APR thresholds:
  // - Low: APR < 200% (still high, but below typical payday extremes)
  // - Medium: 200% <= APR < 500%
  // - High: APR >= 500% (common in predatory payday lending)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (apr >= 500) {
    riskLevel = 'High';
  } else if (apr >= 200) {
    riskLevel = 'Medium';
  }

  // Recommendation logic: Tailored to payday loan debt cycle risks, emphasizing alternatives for high APRs.
  let recommendation: string;
  if (riskLevel === 'High') {
    recommendation = `This payday loan has an extremely high APR of ${apr.toFixed(2)}%, which could lead to a debt trap. Total repayment is $${totalRepayment.toFixed(2)}, with fees consuming ${costPercentage.toFixed(2)}% of your principal. Strongly consider alternatives like credit union loans, salary advances, or emergency savings to avoid long-term financial harm.`;
  } else if (riskLevel === 'Medium') {
    recommendation = `The APR of ${apr.toFixed(2)}% is high for this short-term loan (term: ${inputs.termDays} days). You'll repay $${totalRepayment.toFixed(2)} total, including fees of ${costPercentage.toFixed(2)}% of principal. Proceed with caution and explore lower-cost options if possible to prevent escalating debt.`;
  } else {
    recommendation = `This loan's APR is ${apr.toFixed(2)}%, relatively lower for payday lending. Total due: $${totalRepayment.toFixed(2)} after ${inputs.termDays} days, with fees at ${costPercentage.toFixed(2)}% of principal. Ensure you can repay on time to avoid rollover fees and additional costs.`;
  }

  return { recommendation, riskLevel };
}
```
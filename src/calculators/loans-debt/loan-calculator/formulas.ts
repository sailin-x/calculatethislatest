```typescript
import { LoanCalculatorInputs, LoanCalculatorMetrics, LoanCalculatorAnalysis } from './types';

/**
 * Calculates the monthly interest rate from the annual rate.
 * @param annualRate - Annual interest rate as a percentage (e.g., 5 for 5%).
 * @returns Monthly interest rate as a decimal.
 */
function getMonthlyRate(annualRate: number): number {
  return annualRate / 12 / 100;
}

/**
 * Calculates the total number of monthly payments.
 * @param termYears - Loan term in years.
 * @returns Number of monthly payments.
 */
function getNumPayments(termYears: number): number {
  return termYears * 12;
}

/**
 * Calculates the monthly payment for a fixed-rate loan using the amortization formula.
 * Formula: M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
 * Where P = principal, r = monthly rate, n = number of payments.
 * Handles zero interest rate case (straight-line repayment).
 * @param principal - Loan principal amount.
 * @param annualRate - Annual interest rate (%).
 * @param termYears - Loan term in years.
 * @returns Monthly payment amount.
 */
export function calculateMonthlyPayment(principal: number, annualRate: number, termYears: number): number {
  if (principal <= 0 || termYears <= 0) {
    return 0;
  }

  const monthlyRate = getMonthlyRate(annualRate);
  const numPayments = getNumPayments(termYears);

  if (monthlyRate === 0) {
    return principal / numPayments;
  }

  const numerator = monthlyRate * Math.pow(1 + monthlyRate, numPayments);
  const denominator = Math.pow(1 + monthlyRate, numPayments) - 1;
  return principal * (numerator / denominator);
}

/**
 * Calculates the total interest paid over the loan term.
 * @param principal - Loan principal amount.
 * @param monthlyPayment - Calculated monthly payment.
 * @param termYears - Loan term in years.
 * @returns Total interest paid.
 */
export function calculateTotalInterest(principal: number, monthlyPayment: number, termYears: number): number {
  if (monthlyPayment <= 0 || termYears <= 0) {
    return 0;
  }
  const totalPaid = monthlyPayment * getNumPayments(termYears);
  return Math.max(0, totalPaid - principal);
}

/**
 * Calculates the total amount paid (principal + interest).
 * @param principal - Loan principal amount.
 * @param totalInterest - Total interest paid.
 * @returns Total amount paid.
 */
export function calculateTotalPayment(principal: number, totalInterest: number): number {
  return principal + totalInterest;
}

/**
 * Calculates the debt-to-income (DTI) ratio as a percentage.
 * Used for risk assessment in loan affordability.
 * @param monthlyPayment - Monthly loan payment.
 * @param monthlyIncome - Borrower's monthly income.
 * @returns DTI ratio as a percentage.
 */
export function calculateDTI(monthlyPayment: number, monthlyIncome: number): number {
  if (monthlyIncome <= 0) {
    return 0;
  }
  return (monthlyPayment / monthlyIncome) * 100;
}

/**
 * Assesses loan risk level based on DTI and interest rate.
 * - Low: DTI < 28% and rate < 5%
 * - Medium: DTI 28-36% or rate 5-7%
 * - High: DTI > 36% or rate > 7%
 * Falls back to interest rate if income not provided.
 * @param dti - Debt-to-income ratio (%).
 * @param annualRate - Annual interest rate (%).
 * @param monthlyIncome - Monthly income (for validation).
 * @returns Risk level.
 */
function assessRiskLevel(dti: number, annualRate: number, monthlyIncome?: number): 'Low' | 'Medium' | 'High' {
  if (monthlyIncome && monthlyIncome > 0) {
    if (dti < 28 && annualRate < 5) return 'Low';
    if (dti <= 36 || (annualRate >= 5 && annualRate <= 7)) return 'Medium';
    return 'High';
  } else {
    // Fallback to rate-based assessment if no income
    if (annualRate < 5) return 'Low';
    if (annualRate <= 7) return 'Medium';
    return 'High';
  }
}

export function calculateResult(inputs: LoanCalculatorInputs): number {
  // Primary result: monthly payment using standard loan amortization formula
  return calculateMonthlyPayment(inputs.principal, inputs.annualRate, inputs.termYears);
}

export function generateAnalysis(
  inputs: LoanCalculatorInputs,
  metrics: LoanCalculatorMetrics
): LoanCalculatorAnalysis {
  const { principal, annualRate, termYears, monthlyIncome } = inputs;
  const monthlyPayment = metrics.result;
  const totalInterest = metrics.totalInterest;
  const totalPayment = metrics.totalPayment;

  // Calculate DTI for affordability assessment
  const dti = calculateDTI(monthlyPayment, monthlyIncome ?? 0);

  // Assess risk level using DTI and rate
  const riskLevel = assessRiskLevel(dti, annualRate, monthlyIncome);

  // Generate domain-specific recommendation based on loan metrics
  let recommendation = '';
  if (dti > 36) {
    recommendation = `Your estimated monthly payment is $${monthlyPayment.toFixed(2)}, resulting in a DTI of ${dti.toFixed(1)}%. This is high risk; consider reducing the loan amount, extending the term to ${termYears + 1} years, or improving your income before proceeding. Total interest over the term: $${totalInterest.toFixed(2)}.`;
  } else if (dti > 28) {
    recommendation = `Your monthly payment of $${monthlyPayment.toFixed(2)} yields a DTI of ${dti.toFixed(1)}%, which is manageable but monitor other debts. Total cost: $${totalPayment.toFixed(2)} including $${totalInterest.toFixed(2)} in interest.`;
  } else {
    recommendation = `Affordable loan with monthly payment of $${monthlyPayment.toFixed(2)} and DTI of ${dti.toFixed(1)}%. Total repayment: $${totalPayment.toFixed(2)}, with $${totalInterest.toFixed(2)} in interest. Proceed if rate is locked.`;
  }

  if (!monthlyIncome || monthlyIncome <= 0) {
    recommendation += ' Note: Risk assessment is rate-based; provide income for full DTI analysis.';
  }

  return { recommendation, riskLevel };
}
```
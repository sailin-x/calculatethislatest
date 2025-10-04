```typescript
import { StudentLoanRefinancingCalculatorInputs, StudentLoanRefinancingCalculatorMetrics, StudentLoanRefinancingCalculatorAnalysis } from './types';

/**
 * Calculates the monthly payment for a loan using the standard amortization formula.
 * PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
 * Where:
 * - P = principal (loan balance)
 * - r = monthly interest rate (annual rate / 12 / 100)
 * - n = number of payments (years * 12)
 *
 * Handles zero interest rate edge case.
 */
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  if (monthlyRate === 0) {
    return principal / months;
  }

  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  return principal * (numerator / denominator);
}

export function calculateResult(inputs: StudentLoanRefinancingCalculatorInputs): number {
  // Calculate the new monthly payment after refinancing, assuming the principal remains the current balance
  // (origination fees are handled in analysis for break-even calculation, assuming paid upfront)
  return calculateMonthlyPayment(inputs.currentBalance, inputs.refinanceApr, inputs.refinanceTermYears);
}

export function generateAnalysis(
  inputs: StudentLoanRefinancingCalculatorInputs,
  metrics: StudentLoanRefinancingCalculatorMetrics
): StudentLoanRefinancingCalculatorAnalysis {
  const newPayment = metrics.result;
  const currentPayment = calculateMonthlyPayment(
    inputs.currentBalance,
    inputs.currentApr,
    inputs.remainingTermYears
  );
  const monthlySavings = currentPayment - newPayment;
  const fee = inputs.originationFee || 0;
  const remainingMonths = inputs.remainingTermYears * 12;
  const termExtension = inputs.refinanceTermYears > inputs.remainingTermYears;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  if (monthlySavings <= 0) {
    recommendation =
      'Refinancing would not reduce your monthly payment and may increase costs. It is not recommended at this time. Consider shopping for better rates or improving your credit.';
    riskLevel = 'High';
  } else {
    const breakEvenMonths = fee / monthlySavings;
    const breakEvenInYears = breakEvenMonths / 12;

    if (breakEvenMonths <= remainingMonths / 2) {
      recommendation = `Refinancing can save you approximately $${monthlySavings.toFixed(2)} per month on your payment (from $${currentPayment.toFixed(2)} to $${newPayment.toFixed(2)}). With a break-even period of about ${Math.round(breakEvenMonths)} months (${breakEvenInYears.toFixed(1)} years), this is a strong opportunity to reduce costs, especially if it aligns with your retirement savings goals by freeing up cash flow. Proceed if you plan to keep the loan for the full term.`;
      riskLevel = termExtension ? 'Medium' : 'Low'; // Medium risk if extending term (potential for more total interest)
    } else if (breakEvenMonths <= remainingMonths) {
      recommendation = `Refinancing offers monthly savings of $${monthlySavings.toFixed(2)} (from $${currentPayment.toFixed(2)} to $${newPayment.toFixed(2)}), but the break-even period is ${Math.round(breakEvenMonths)} months (${breakEvenInYears.toFixed(1)} years) due to fees. It could still be worthwhile if you intend to hold the loan beyond this point and use the savings toward retirement. Evaluate if the longer term (if applicable) fits your debt payoff strategy.`;
      riskLevel = termExtension ? 'High' : 'Medium';
    } else {
      recommendation =
        'The break-even period exceeds your remaining loan term, meaning you may not recoup the refinancing fees before payoff. Refinancing is not recommended unless other factors (e.g., switching to fixed rate or consolidating) apply. Focus on extra payments to accelerate payoff instead.';
      riskLevel = 'High';
    }
  }

  return { recommendation, riskLevel };
}
```
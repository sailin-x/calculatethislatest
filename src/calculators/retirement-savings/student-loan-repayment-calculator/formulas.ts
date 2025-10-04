```typescript
import { StudentLoanRepaymentCalculatorInputs, StudentLoanRepaymentCalculatorMetrics, StudentLoanRepaymentCalculatorAnalysis } from './types';

/**
 * Calculates the monthly payment for a student loan using the standard amortization formula.
 * Handles edge cases like zero interest rate.
 */
function calculateMonthlyPayment(principal: number, annualInterestRate: number, termYears: number): number {
  if (principal <= 0 || termYears <= 0) {
    return 0;
  }

  const monthlyRate = (annualInterestRate / 100) / 12;
  const numPayments = termYears * 12;

  if (monthlyRate === 0) {
    return principal / numPayments;
  }

  const numerator = monthlyRate * Math.pow(1 + monthlyRate, numPayments);
  const denominator = Math.pow(1 + monthlyRate, numPayments) - 1;
  return principal * (numerator / denominator);
}

/**
 * Calculates the total interest paid over the life of the loan.
 */
function calculateTotalInterest(monthlyPayment: number, numPayments: number, principal: number): number {
  const totalPaid = monthlyPayment * numPayments;
  return totalPaid - principal;
}

export function calculateResult(inputs: StudentLoanRepaymentCalculatorInputs): number {
  // Assuming inputs include: principal, annualInterestRate (as percentage), termYears
  // Returns the monthly payment amount
  return calculateMonthlyPayment(inputs.principal, inputs.annualInterestRate, inputs.termYears);
}

export function generateAnalysis(
  inputs: StudentLoanRepaymentCalculatorInputs,
  metrics: StudentLoanRepaymentCalculatorMetrics
): StudentLoanRepaymentCalculatorAnalysis {
  const result = metrics.result; // Monthly payment
  const principal = inputs.principal;
  const annualInterestRate = inputs.annualInterestRate;
  const termYears = inputs.termYears;
  const numPayments = termYears * 12;
  const totalInterest = calculateTotalInterest(result, numPayments, principal);

  // Risk level based on interest rate (common benchmark for student loans)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (annualInterestRate > 6) {
    riskLevel = 'High';
  } else if (annualInterestRate > 4) {
    riskLevel = 'Medium';
  }

  // Recommendation considering retirement impact: high payments may reduce savings contributions
  let recommendation = `Your estimated monthly student loan payment is $${result.toFixed(2)}. Over ${termYears} years, you will pay approximately $${totalInterest.toFixed(2)} in interest. `;
  
  if (riskLevel === 'High') {
    recommendation += 'Consider refinancing to a lower rate or income-driven repayment plans to reduce interest costs and free up funds for retirement savings.';
  } else if (riskLevel === 'Medium') {
    recommendation += 'Your rate is reasonable, but explore federal forgiveness programs if eligible to minimize long-term impact on retirement goals.';
  } else {
    recommendation += 'This payment is manageable. Prioritize extra payments to pay off faster and accelerate retirement contributions.';
  }

  if (result > principal / numPayments * 1.5) { // Rough heuristic: if payment is 50%+ above interest-free, flag for retirement risk
    recommendation += ' Note: High monthly payments could strain your budget—aim to allocate at least 15% of income to retirement savings despite this debt.';
  }

  return { recommendation, riskLevel };
}
```
```typescript
import { StudentLoanForgivenessCalculatorInputs, StudentLoanForgivenessCalculatorMetrics, StudentLoanForgivenessCalculatorAnalysis } from './types';

/**
 * Helper function to calculate the remaining loan balance after a specified number of monthly payments.
 * Uses the standard amortization formula: balance = balance * (1 + monthlyRate) - monthlyPayment, clamped to >= 0.
 * @param initialBalance - Starting loan balance
 * @param monthlyRate - Monthly interest rate (annualRate / 100 / 12)
 * @param monthlyPayment - Fixed monthly payment amount
 * @param months - Number of months to simulate payments
 * @returns Remaining balance after the specified months (forgiven amount if under forgiveness program)
 */
function calculateRemainingBalance(
  initialBalance: number,
  monthlyRate: number,
  monthlyPayment: number,
  months: number
): number {
  if (initialBalance <= 0) return 0;
  if (monthlyPayment <= 0 || months <= 0) return initialBalance;

  let balance = initialBalance;
  for (let i = 0; i < months; i++) {
    balance = balance * (1 + monthlyRate) - monthlyPayment;
    if (balance < 0) balance = 0;
  }
  return balance;
}

export function calculateResult(inputs: StudentLoanForgivenessCalculatorInputs): number {
  const monthlyRate = inputs.annualInterestRate / 100 / 12;
  const months = inputs.yearsToForgiveness * 12;
  const forgivenAmount = calculateRemainingBalance(
    inputs.currentBalance,
    monthlyRate,
    inputs.monthlyPayment,
    months
  );
  return Math.round(forgivenAmount * 100) / 100; // Round to 2 decimal places for currency precision
}

export function generateAnalysis(
  inputs: StudentLoanForgivenessCalculatorInputs,
  metrics: StudentLoanForgivenessCalculatorMetrics
): StudentLoanForgivenessCalculatorAnalysis {
  const result = metrics.result;
  const yearsToForgiveness = inputs.yearsToForgiveness;

  // Risk level based on time to forgiveness (shorter timelines imply lower risk of program changes or non-qualification)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (yearsToForgiveness > 20) {
    riskLevel = 'High';
  } else if (yearsToForgiveness > 10) {
    riskLevel = 'Medium';
  }

  // Recommendation: Provide actionable advice on how forgiveness impacts retirement savings
  const formattedResult = result.toFixed(2);
  const recommendation = `Your estimated student loan forgiveness amount is $${formattedResult} after ${yearsToForgiveness} years of qualifying payments. This forgiven amount can significantly boost your retirement savings by reducing your debt obligations—consider directing equivalent monthly payments to a 401(k) or IRA post-forgiveness. Ensure you meet program requirements (e.g., PSLF for public service) to minimize risk.`;

  return { recommendation, riskLevel };
}
```
```typescript
import { CreditUtilizationCalculatorInputs, CreditUtilizationCalculatorMetrics, CreditUtilizationCalculatorAnalysis } from './types';

// Domain-specific helper function for credit utilization calculation
// Handles division by zero and ensures result is a percentage (0-100, clamped if needed)
function computeUtilizationRatio(totalBalance: number, totalCreditLimit: number): number {
  if (totalCreditLimit <= 0) {
    return 0; // Avoid division by zero; treat as no utilization
  }
  const ratio = (totalBalance / totalCreditLimit) * 100;
  return Math.min(Math.max(ratio, 0), 100); // Clamp to valid percentage range
}

// Domain-specific helper function to assess credit score impact risk
// Based on FICO guidelines: <30% ideal, 30-49% moderate impact, >=50% high negative impact
function assessUtilizationRisk(utilization: number): 'Low' | 'Medium' | 'High' {
  if (utilization < 30) {
    return 'Low';
  } else if (utilization < 50) {
    return 'Medium';
  } else {
    return 'High';
  }
}

export function calculateResult(inputs: CreditUtilizationCalculatorInputs): number {
  // Real credit utilization calculation: (Total Balances / Total Credit Limits) * 100
  // This metric directly influences credit scores (e.g., FICO weighs it at ~30%)
  return computeUtilizationRatio(inputs.totalBalance, inputs.totalCreditLimit);
}

export function generateAnalysis(
  inputs: CreditUtilizationCalculatorInputs,
  metrics: CreditUtilizationCalculatorMetrics
): CreditUtilizationCalculatorAnalysis {
  const result = metrics.result;
  const riskLevel = assessUtilizationRisk(result);

  let recommendation: string;
  if (riskLevel === 'Low') {
    recommendation = 'Your credit utilization is excellent. Maintaining it below 30% helps keep your credit score strong. Consider keeping balances low relative to limits.';
  } else if (riskLevel === 'Medium') {
    recommendation = 'Your utilization is moderate. Aim to pay down balances to get under 30% for optimal credit health. This can positively impact your score over time.';
  } else {
    recommendation = 'High utilization may harm your credit score. Prioritize paying off credit card balances to reduce utilization below 30%. Avoid maxing out limits to improve your financial profile.';
  }

  return { recommendation, riskLevel };
}
```
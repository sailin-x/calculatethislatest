```typescript
import { DistressedDebtInvestingROICalculatorInputs, DistressedDebtInvestingROICalculatorMetrics, DistressedDebtInvestingROICalculatorAnalysis } from './types';

/**
 * Calculates the simple ROI if holding period is zero or invalid.
 * @param expectedPayout - The expected payout amount.
 * @param purchasePrice - The purchase price of the debt.
 * @returns Simple ROI as percentage.
 */
function calculateSimpleROI(expectedPayout: number, purchasePrice: number): number {
  if (purchasePrice <= 0) return 0;
  return ((expectedPayout - purchasePrice) / purchasePrice) * 100;
}

/**
 * Calculates the annualized ROI using the formula: (totalReturn ^ (1 / years)) - 1 * 100%
 * @param totalReturn - The total return multiple (expectedPayout / purchasePrice).
 * @param holdingPeriodYears - The holding period in years.
 * @returns Annualized ROI as percentage.
 */
function calculateAnnualizedROI(totalReturn: number, holdingPeriodYears: number): number {
  if (holdingPeriodYears <= 0 || totalReturn <= 0) return 0;
  return (Math.pow(totalReturn, 1 / holdingPeriodYears) - 1) * 100;
}

export function calculateResult(inputs: DistressedDebtInvestingROICalculatorInputs): number {
  const { faceValue, purchasePrice, expectedRecoveryRate, holdingPeriodYears } = inputs;

  if (faceValue <= 0 || purchasePrice <= 0 || expectedRecoveryRate < 0 || expectedRecoveryRate > 1) {
    return 0; // Invalid inputs return 0 ROI
  }

  const expectedPayout = faceValue * expectedRecoveryRate;
  const totalReturn = expectedPayout / purchasePrice;

  if (holdingPeriodYears <= 0) {
    return calculateSimpleROI(expectedPayout, purchasePrice);
  }

  return calculateAnnualizedROI(totalReturn, holdingPeriodYears);
}

export function generateAnalysis(
  inputs: DistressedDebtInvestingROICalculatorInputs,
  metrics: DistressedDebtInvestingROICalculatorMetrics
): DistressedDebtInvestingROICalculatorAnalysis {
  const result = metrics.result; // Annualized or simple ROI percentage
  const { expectedRecoveryRate, holdingPeriodYears } = inputs;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'High'; // Distressed debt is inherently high risk
  let recommendation: string;

  // Adjust risk based on recovery rate (higher expected recovery = lower relative risk)
  if (expectedRecoveryRate > 0.7) {
    riskLevel = 'Medium';
  } else if (expectedRecoveryRate > 0.4) {
    riskLevel = 'High';
  } else {
    riskLevel = 'High'; // Very low recovery amplifies risk
  }

  // Recommendation based on ROI, considering the high-risk nature of distressed debt
  if (result > 30) {
    recommendation = 'Strong buy opportunity. The projected ROI significantly exceeds typical distressed debt thresholds, offering substantial upside despite the risks.';
  } else if (result > 15) {
    recommendation = 'Attractive investment. The ROI justifies the risk profile for experienced investors in distressed assets.';
  } else if (result > 5) {
    recommendation = 'Moderate opportunity. Consider if aligned with portfolio risk tolerance; monitor for upside catalysts.';
  } else {
    recommendation = 'Avoid or proceed with extreme caution. The projected ROI does not adequately compensate for the illiquidity and default risks in distressed debt.';
  }

  // Factor in holding period for additional context
  if (holdingPeriodYears > 3) {
    recommendation += ' Note: Extended holding period increases uncertainty and opportunity cost.';
  }

  return { recommendation, riskLevel };
}
```
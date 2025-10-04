```typescript
import { LitigationFinanceROICalculatorInputs, LitigationFinanceROICalculatorMetrics, LitigationFinanceROICalculatorAnalysis } from './types';

/**
 * Calculates the expected payout for the litigation finance investment.
 * Expected Payout = Success Probability × Projected Settlement × (Investor Percentage / 100)
 */
function calculateExpectedPayout(inputs: LitigationFinanceROICalculatorInputs): number {
  const { successProbability, projectedSettlement, investorPercentage } = inputs;
  if (successProbability < 0 || successProbability > 1 || investorPercentage < 0 || investorPercentage > 100) {
    throw new Error('Invalid input: successProbability must be between 0 and 1, investorPercentage between 0 and 100');
  }
  return successProbability * projectedSettlement * (investorPercentage / 100);
}

/**
 * Calculates the net payout after deducting funding fees.
 * Net Payout = Expected Payout - Funding Fees
 */
function calculateNetPayout(inputs: LitigationFinanceROICalculatorInputs): number {
  const expectedPayout = calculateExpectedPayout(inputs);
  const fundingFees = inputs.fundingFees || 0;
  if (fundingFees < 0) {
    throw new Error('Invalid input: fundingFees must be non-negative');
  }
  return expectedPayout - fundingFees;
}

/**
 * Calculates the annualized expected ROI percentage.
 * - Multiple = Net Payout / Investment Amount
 * - If duration <= 0, ROI = (Multiple - 1) × 100 (total ROI)
 * - Else, Annualized ROI = [(Multiple)^{1 / Duration in Years} - 1] × 100
 * Handles edge cases: negative multiples return -100% (total loss), zero investment throws error.
 */
export function calculateResult(inputs: LitigationFinanceROICalculatorInputs): number {
  const { investmentAmount, caseDurationYears } = inputs;
  if (investmentAmount <= 0) {
    throw new Error('Invalid input: investmentAmount must be positive');
  }
  if (caseDurationYears < 0) {
    throw new Error('Invalid input: caseDurationYears must be non-negative');
  }

  const netPayout = calculateNetPayout(inputs);
  const multiple = netPayout / investmentAmount;

  if (multiple <= 0) {
    return -100; // Total loss scenario
  }

  let roi: number;
  if (caseDurationYears <= 0) {
    roi = (multiple - 1) * 100;
  } else {
    const annualizedMultiple = Math.pow(multiple, 1 / caseDurationYears);
    roi = (annualizedMultiple - 1) * 100;
  }

  // Round to 2 decimal places for production use
  return Math.round(roi * 100) / 100;
}

export function generateAnalysis(
  inputs: LitigationFinanceROICalculatorInputs,
  metrics: LitigationFinanceROICalculatorMetrics
): LitigationFinanceROICalculatorAnalysis {
  const result = metrics.result;
  const { successProbability } = inputs;

  // Risk level based on success probability (domain-specific: litigation cases often have 40-70% success rates)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  if (successProbability > 0.7) {
    riskLevel = 'Low';
  } else if (successProbability < 0.4) {
    riskLevel = 'High';
  }

  // Recommendation based on annualized ROI thresholds (litigation finance targets often 20-30%+ IRR due to high risk)
  let recommendation: string;
  if (result > 30) {
    recommendation = 'Strong investment opportunity: High expected annualized ROI with acceptable risk.';
  } else if (result > 20) {
    recommendation = 'Viable investment: Meets typical litigation finance return thresholds.';
  } else if (result > 10) {
    recommendation = 'Moderate opportunity: Consider if risk aligns with portfolio strategy.';
  } else if (result > 0) {
    recommendation = 'Marginal returns: Proceed only with diversified portfolio and low allocation.';
  } else {
    recommendation = 'Avoid investment: Expected losses outweigh potential gains.';
  }

  return { recommendation, riskLevel };
}
```
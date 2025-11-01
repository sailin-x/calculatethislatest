```typescript
import { PeerToPeerLendingCalculatorInputs, PeerToPeerLendingCalculatorMetrics, PeerToPeerLendingCalculatorAnalysis } from './types';

/**
 * Calculates the effective annual yield for P2P lending by subtracting the expected default rate
 * from the gross annual interest rate. This accounts for anticipated losses in PeerToPeer investments.
 * @param grossRate - The gross annual interest rate (as a decimal, e.g., 0.07 for 7%).
 * @param defaultRate - The expected annual default rate (as a decimal, e.g., 0.02 for 2%).
 * @returns The effective annual yield (as a decimal).
 */
function calculateEffectiveYield(grossRate: number, defaultRate: number): number {
  // In P2P lending, effective yield is gross yield minus expected loss rate due to defaults.
  // This is a standard adjustment in alternative lending portfolio metrics.
  return Math.max(0, grossRate - defaultRate); // Ensure non-negative yield
}

/**
 * Calculates the total expected profit from a P2P lending investment using simple interest
 * adjusted for defaults. Formula: Profit = Investment * Effective Rate * Term in Years.
 * This assumes annual compounding is not applied, common in many P2P platforms for projection purposes.
 * @param investmentAmount - The principal investment amount.
 * @param effectiveRate - The effective annual yield (as a decimal).
 * @param termInYears - The loan term in years.
 * @returns The expected profit (as a number).
 */
function calculateExpectedProfit(investmentAmount: number, effectiveRate: number, termInYears: number): number {
  // Simple interest profit formula adjusted for P2P net yield.
  return investmentAmount * effectiveRate * termInYears;
}

export function calculateResult(inputs: PeerToPeerLendingCalculatorInputs): number {
  // Core P2P lending return calculation:
  // 1. Compute effective yield: gross rate minus default rate (standard risk adjustment).
  // 2. Compute profit using simple interest over the term.
  // 3. Total return = principal + profit.
  // This models the net expected value in a diversified P2P portfolio.
  const effectiveRate = calculateEffectiveYield(inputs.annualInterestRate, inputs.expectedDefaultRate);
  const profit = calculateExpectedProfit(inputs.investmentAmount, effectiveRate, inputs.termInYears);
  const totalReturn = inputs.investmentAmount + profit;

  return totalReturn;
}

export function generateAnalysis(
  inputs: PeerToPeerLendingCalculatorInputs,
  metrics: PeerToPeerLendingCalculatorMetrics
): PeerToPeerLendingCalculatorAnalysis {
  const totalReturn = metrics.result;
  const effectiveRate = calculateEffectiveYield(inputs.annualInterestRate, inputs.expectedDefaultRate);
  const totalProfit = totalReturn - inputs.investmentAmount;

  // Risk assessment based on expected default rate, a key metric in P2P lending portfolios.
  // Thresholds derived from industry standards: low (<3% annual default), medium (3-6%), high (>6%).
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.expectedDefaultRate > 0.06) {
    riskLevel = 'High';
  } else if (inputs.expectedDefaultRate > 0.03) {
    riskLevel = 'Medium';
  }

  // Recommendation logic: Evaluate based on effective yield and risk.
  // Positive effective yield with low risk suggests viability; high risk advises caution or diversification.
  let recommendation: string;
  if (effectiveRate > 0.05 && riskLevel === 'Low') {
    recommendation = `With an effective yield of ${(effectiveRate * 100).toFixed(2)}%, this P2P investment offers strong potential returns of $${totalProfit.toFixed(2)} over ${inputs.termInYears} years. Consider diversifying across multiple loans to maintain low risk.`;
  } else if (effectiveRate > 0 && riskLevel === 'Medium') {
    recommendation = `The effective yield of ${(effectiveRate * 100).toFixed(2)}% yields $${totalProfit.toFixed(2)} in expected profit, but medium default risk suggests monitoring platform performance and limiting exposure to 10-20% of your portfolio.`;
  } else if (riskLevel === 'High') {
    recommendation = `High default risk at ${(inputs.expectedDefaultRate * 100).toFixed(2)}% results in a low effective yield of ${(effectiveRate * 100).toFixed(2)}% and modest profit of $${totalProfit.toFixed(2)}. Avoid or heavily diversify; consider safer fixed-income alternatives.`;
  } else {
    recommendation = `The calculated effective yield is ${(effectiveRate * 100).toFixed(2)}%, leading to $${totalProfit.toFixed(2)} profit. Reassess inputs as returns may not justify P2P lending risks at this configuration.`;
  }

  return { recommendation, riskLevel };
}
```
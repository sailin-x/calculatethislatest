```typescript
import { LeverageRatioCalculatorInputs, LeverageRatioCalculatorMetrics, LeverageRatioCalculatorAnalysis } from './types';

/**
 * Calculates the Leverage Ratio, specifically the Debt-to-Equity (D/E) Ratio.
 * Formula: D/E Ratio = Total Debt / Total Equity
 * This measures the proportion of debt financing relative to equity financing.
 * A higher ratio indicates higher financial leverage and risk.
 *
 * @param inputs - The input values for total debt and total equity.
 * @returns The calculated leverage ratio as a number.
 *          Returns Infinity if totalEquity is 0 (indicating infinite leverage).
 *          Assumes non-negative inputs; invalid inputs may yield NaN.
 */
export function calculateResult(inputs: LeverageRatioCalculatorInputs): number {
  if (inputs.totalEquity === 0) {
    return Infinity;
  }
  return inputs.totalDebt / inputs.totalEquity;
}

/**
 * Generates an analysis of the leverage ratio, including risk assessment and recommendation.
 * Risk levels are determined as follows:
 * - Low: Ratio < 1 (conservative financing, low risk)
 * - Medium: 1 <= Ratio <= 2 (moderate leverage, balanced risk)
 * - High: Ratio > 2 (high leverage, elevated risk of insolvency)
 * Special handling for infinite or invalid ratios (e.g., zero equity) as High risk.
 *
 * @param inputs - The original inputs used for calculation.
 * @param metrics - The calculated metrics, including the result.
 * @returns An analysis object with recommendation and riskLevel.
 */
export function generateAnalysis(
  inputs: LeverageRatioCalculatorInputs,
  metrics: LeverageRatioCalculatorMetrics
): LeverageRatioCalculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  if (isNaN(result) || !isFinite(result) || result === Infinity) {
    riskLevel = 'High';
    recommendation = 'Invalid or infinite leverage detected (e.g., zero equity). This indicates extreme financial risk. Immediately review your balance sheet and consider injecting equity or restructuring debt to avoid potential insolvency.';
  } else if (result < 1) {
    riskLevel = 'Low';
    recommendation = 'Your leverage ratio is low, suggesting a conservative capital structure with more equity than debt. This reduces financial risk but may limit growth opportunities. Consider moderate debt financing if expansion is a goal.';
  } else if (result <= 2) {
    riskLevel = 'Medium';
    recommendation = 'Your leverage ratio is moderate, indicating a balanced use of debt and equity. This is generally acceptable for most industries, but monitor interest coverage to ensure debt servicing remains sustainable.';
  } else {
    riskLevel = 'High';
    recommendation = 'Your leverage ratio is high, signaling heavy reliance on debt. This increases vulnerability to economic downturns or interest rate hikes. Recommend reducing debt through asset sales, equity issuance, or operational improvements to lower risk.';
  }

  return { recommendation, riskLevel };
}
```
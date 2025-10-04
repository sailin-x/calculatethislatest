```typescript
import { TaxLossHarvestingCalculatorInputs, TaxLossHarvestingCalculatorMetrics, TaxLossHarvestingCalculatorAnalysis } from './types';

/**
 * Calculates the estimated tax savings from tax-loss harvesting.
 * Formula:
 * - Effective offset against capital gains: min(capitalGains, harvestableLosses)
 * - Tax savings from capital gains offset: effectiveOffset * capitalGainsTaxRate
 * - If excess losses: additional offset against ordinary income up to $3,000
 * - Additional savings: min(excessLosses, 3000) * ordinaryIncomeTaxRate
 * - Total tax savings: capitalGainsSavings + additionalSavings
 * 
 * Assumptions:
 * - Capital gains are long-term (taxed at capitalGainsTaxRate).
 * - Losses first offset capital gains, then up to $3,000 of ordinary income.
 * - Excess losses beyond $3,000 can be carried forward but are not factored into current-year savings.
 * - Rates are decimals (e.g., 0.15 for 15%).
 * - Inputs are pre-validated (non-negative numbers).
 */
export function calculateResult(inputs: TaxLossHarvestingCalculatorInputs): number {
  const { capitalGains, harvestableLosses, capitalGainsTaxRate, ordinaryIncomeTaxRate } = inputs;

  if (harvestableLosses <= 0 || capitalGains < 0) {
    return 0;
  }

  const effectiveOffset = Math.min(capitalGains, harvestableLosses);
  const capitalGainsSavings = effectiveOffset * capitalGainsTaxRate;

  const excessLosses = harvestableLosses - effectiveOffset;
  const ordinaryIncomeOffset = Math.min(excessLosses, 3000);
  const additionalSavings = ordinaryIncomeOffset * ordinaryIncomeTaxRate;

  return capitalGainsSavings + additionalSavings;
}

/**
 * Generates an analysis and recommendation for tax-loss harvesting.
 * - Recommendation: Based on the magnitude of tax savings relative to harvestable losses.
 *   - If savings > 5% of losses, strong recommendation.
 *   - If savings > 0, mild recommendation.
 *   - Otherwise, no recommendation.
 * - Risk Level: 
 *   - Low: Minimal losses or no harvesting needed.
 *   - Medium: Standard harvesting (wash-sale rule and market risk apply).
 *   - High: Large losses relative to gains (potential for over-harvesting or volatility).
 */
export function generateAnalysis(
  inputs: TaxLossHarvestingCalculatorInputs,
  metrics: TaxLossHarvestingCalculatorMetrics
): TaxLossHarvestingCalculatorAnalysis {
  const { harvestableLosses } = inputs;
  const taxSavings = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  let recommendation: string;

  if (taxSavings <= 0) {
    recommendation = 'No tax savings opportunity from harvesting losses in the current year. Consider carrying forward losses or reviewing your portfolio.';
    riskLevel = 'Low';
  } else if (taxSavings > harvestableLosses * 0.05) {
    recommendation = `Strongly consider tax-loss harvesting $${harvestableLosses.toFixed(2)} in losses to realize approximately $${taxSavings.toFixed(2)} in tax savings. Ensure compliance with the wash-sale rule by avoiding repurchase of identical securities within 30 days.`;
    riskLevel = harvestableLosses > 50000 ? 'High' : 'Medium'; // High risk for very large amounts due to market impact
  } else {
    recommendation = `Tax-loss harvesting $${harvestableLosses.toFixed(2)} in losses could save approximately $${taxSavings.toFixed(2)} in taxes. Evaluate if the potential savings justify the transaction costs and risks, including the wash-sale rule.`;
    riskLevel = 'Medium';
  }

  return { recommendation, riskLevel };
}
```
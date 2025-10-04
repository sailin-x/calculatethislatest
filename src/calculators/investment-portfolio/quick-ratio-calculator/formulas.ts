```typescript
import { QuickRatioCalculatorInputs, QuickRatioCalculatorMetrics, QuickRatioCalculatorAnalysis } from './types';

/**
 * Helper function to validate investment portfolio liquidity inputs for Quick Ratio calculation.
 * Ensures non-negative values for assets and liabilities, as negative values are invalid in financial contexts.
 * @param inputs - The input values for current assets, inventory, and current liabilities.
 * @returns boolean indicating if inputs are valid.
 */
function validateQuickRatioInputs(inputs: QuickRatioCalculatorInputs): boolean {
  return (
    typeof inputs.currentAssets === 'number' &&
    typeof inputs.inventory === 'number' &&
    typeof inputs.currentLiabilities === 'number' &&
    inputs.currentAssets >= 0 &&
    inputs.inventory >= 0 &&
    inputs.currentLiabilities >= 0 &&
    inputs.inventory <= inputs.currentAssets // Inventory cannot exceed current assets logically
  );
}

/**
 * Helper function to compute quick assets for portfolio liquidity analysis.
 * Quick assets exclude inventory to focus on highly liquid components in investment evaluation.
 * @param currentAssets - Total current assets from balance sheet.
 * @param inventory - Inventory value to subtract.
 * @returns The value of quick assets.
 */
function computeQuickAssets(currentAssets: number, inventory: number): number {
  return Math.max(0, currentAssets - inventory); // Ensure non-negative quick assets
}

export function calculateResult(inputs: QuickRatioCalculatorInputs): number {
  if (!validateQuickRatioInputs(inputs)) {
    throw new Error('Invalid inputs for Quick Ratio calculation: All values must be non-negative numbers, and inventory cannot exceed current assets.');
  }

  const quickAssets = computeQuickAssets(inputs.currentAssets, inputs.inventory);
  const currentLiabilities = inputs.currentLiabilities;

  if (currentLiabilities === 0) {
    return Infinity; // Infinite liquidity if no current liabilities, common in financial modeling
  }

  // Core Quick Ratio formula: (Current Assets - Inventory) / Current Liabilities
  // This measures short-term liquidity for portfolio company analysis, excluding less liquid inventory
  return quickAssets / currentLiabilities;
}

export function generateAnalysis(
  inputs: QuickRatioCalculatorInputs,
  metrics: QuickRatioCalculatorMetrics
): QuickRatioCalculatorAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  // Investment-portfolio-specific risk assessment for liquidity:
  // Quick Ratio > 1.0 indicates strong short-term solvency for portfolio holdings
  // Between 0.5 and 1.0 suggests moderate liquidity risk, potentially requiring monitoring
  // Below 0.5 signals high liquidity risk, impacting portfolio stability
  if (result > 1.0) {
    riskLevel = 'Low';
    recommendation = 'The company demonstrates strong liquidity with a Quick Ratio above 1.0, indicating it can cover short-term obligations without relying on inventory sales. This supports a stable position in your investment portfolio.';
  } else if (result >= 0.5) {
    riskLevel = 'Medium';
    recommendation = 'The Quick Ratio between 0.5 and 1.0 suggests adequate but not exceptional liquidity. Monitor inventory turnover and consider diversifying portfolio exposure to mitigate potential short-term funding risks.';
  } else {
    riskLevel = 'High';
    recommendation = 'A Quick Ratio below 0.5 highlights liquidity concerns, as the company may struggle to meet short-term liabilities without liquidating inventory. Evaluate reducing this holding in your portfolio or awaiting improved financials.';
  }

  // Handle infinite case for companies with no current liabilities
  if (result === Infinity) {
    riskLevel = 'Low';
    recommendation = 'No current liabilities indicate exceptional liquidity strength. This asset enhances portfolio resilience against market volatility.';
  }

  return { recommendation, riskLevel };
}
```
```typescript
import { NetMarginCalculatorInputs, NetMarginCalculatorMetrics, NetMarginCalculatorAnalysis } from './types';

/**
 * Helper function to validate investment inputs for net margin calculation.
 * Ensures revenue is positive to avoid invalid portfolio profitability assessments.
 * In investment-portfolio context, invalid inputs could skew company evaluation.
 */
function validateNetMarginInputs(inputs: NetMarginCalculatorInputs): boolean {
  return inputs.revenue > 0 && typeof inputs.netIncome === 'number' && typeof inputs.revenue === 'number';
}

/**
 * Domain-specific helper: Calculates the implied portfolio impact factor for net margin.
 * In investment-portfolio analysis, this adjusts net margin by a hypothetical portfolio weight
 * (e.g., company's allocation) to estimate contribution to overall portfolio profitability.
 * Formula: adjustedMargin = netMargin * weight (where weight is between 0 and 1).
 * Used for weighted average net margin in multi-asset portfolios.
 */
function calculateAdjustedPortfolioMargin(netMargin: number, portfolioWeight: number): number {
  if (portfolioWeight < 0 || portfolioWeight > 1) {
    throw new Error('Portfolio weight must be between 0 and 1 for valid adjustment.');
  }
  return netMargin * portfolioWeight;
}

/**
 * Core calculation for Net Margin in investment-portfolio context.
 * Net Margin = (Net Income / Revenue) * 100, expressed as percentage.
 * This metric evaluates a company's profitability efficiency, crucial for portfolio stock selection.
 * Handles edge cases like zero revenue to prevent division errors in portfolio modeling.
 */
export function calculateResult(inputs: NetMarginCalculatorInputs): number {
  if (!validateNetMarginInputs(inputs)) {
    return 0; // Neutral value for invalid inputs; in production, log error or throw.
  }

  const netMargin = (inputs.netIncome / inputs.revenue) * 100;
  return Math.round(netMargin * 100) / 100; // Round to 2 decimal places for financial precision.
}

/**
 * Generates InvestmentPortfolioSpecific analysis for Net Margin.
 * Assesses profitability risk in portfolio context: higher margins indicate stable cash flows,
 * reducing portfolio volatility risk. Uses thresholds based on typical equity benchmarks
 * (e.g., >15% strong for growth stocks, <5% high risk for value traps).
 * Incorporates adjusted portfolio impact if weight provided.
 */
export function generateAnalysis(
  inputs: NetMarginCalculatorInputs,
  metrics: NetMarginCalculatorMetrics
): NetMarginCalculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';

  // Portfolio-specific risk assessment logic
  if (result > 15) {
    riskLevel = 'Low'; // Strong profitability supports portfolio stability
  } else if (result > 5) {
    riskLevel = 'Medium'; // Moderate; monitor for portfolio diversification
  } else {
    riskLevel = 'High'; // Weak margins increase portfolio downside risk
  }

  // Domain-specific recommendation with portfolio context
  let recommendation: string;
  if (riskLevel === 'Low') {
    recommendation = 'Excellent net margin indicates robust profitability. Recommend increasing allocation in the portfolio for enhanced returns with low risk.';
  } else if (riskLevel === 'Medium') {
    recommendation = 'Solid net margin; suitable for balanced portfolio inclusion. Consider pairing with higher-margin assets for optimization.';
  } else {
    recommendation = 'Low net margin signals potential inefficiencies. Advise reducing or avoiding this holding to mitigate portfolio risk.';
  }

  // Optional: If portfolio weight is provided, include adjusted insight
  if (inputs.portfolioWeight && inputs.portfolioWeight > 0) {
    const adjustedMargin = calculateAdjustedPortfolioMargin(result, inputs.portfolioWeight);
    recommendation += ` Adjusted portfolio contribution: ${adjustedMargin.toFixed(2)}%.`;
  }

  return { recommendation, riskLevel };
}
```
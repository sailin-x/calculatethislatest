```typescript
import { GrossMarginCalculatorInputs, GrossMarginCalculatorMetrics, GrossMarginCalculatorAnalysis } from './types';

/**
 * Calculates the Gross Margin percentage.
 * Formula: ((Revenue - COGS) / Revenue) * 100
 * Handles edge cases like zero or negative revenue.
 */
export function calculateResult(inputs: GrossMarginCalculatorInputs): number {
  const { revenue, cogs } = inputs;

  // Validate inputs: revenue must be positive
  if (revenue <= 0) {
    return 0; // Invalid input, return 0% margin
  }

  // Ensure COGS is non-negative
  const effectiveCogs = Math.max(0, cogs);

  // Calculate gross profit
  const grossProfit = revenue - effectiveCogs;

  // Gross Margin percentage
  const grossMargin = (grossProfit / revenue) * 100;

  // Cap at 100% for cases where COGS is negative (though unlikely)
  return Math.min(100, Math.max(0, grossMargin));
}

/**
 * Generates an analysis for the Gross Margin calculation.
 * Provides a recommendation based on industry-standard benchmarks for investment evaluation.
 * Risk level: High if margin < 20% (poor profitability), Medium if 20-50%, Low if >50%.
 * In the context of investment portfolios, higher margins indicate better operational efficiency and lower risk.
 */
export function generateAnalysis(
  inputs: GrossMarginCalculatorInputs,
  metrics: GrossMarginCalculatorMetrics
): GrossMarginCalculatorAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  // Risk assessment logic based on gross margin benchmarks
  // (Adjustable for specific industries; here using general investment portfolio thresholds)
  if (result < 20) {
    riskLevel = 'High'; // Indicates high cost pressures or pricing issues
  } else if (result < 50) {
    riskLevel = 'Medium'; // Room for improvement, monitor closely
  } else {
    riskLevel = 'Low'; // Strong profitability, attractive for portfolio
  }

  // Generate recommendation
  let recommendation: string;
  if (result > 50) {
    recommendation = 'Excellent gross margin indicating strong pricing power and cost control. Consider increasing allocation in your investment portfolio for stable growth.';
  } else if (result >= 20) {
    recommendation = 'Moderate gross margin suggests operational efficiency but potential for cost optimization. Evaluate competitive positioning before investing.';
  } else {
    recommendation = 'Low gross margin signals profitability challenges. High risk for investment; recommend avoiding or requiring detailed cost analysis before inclusion in portfolio.';
  }

  return { recommendation, riskLevel };
}
```
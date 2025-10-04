```typescript
import { 
  CommodityCalculatorInputs, 
  CommodityCalculatorMetrics, 
  CommodityCalculatorAnalysis 
} from './types';

/**
 * Calculates the Return on Investment (ROI) percentage for a commodity holding.
 * Formula: ROI = ((Current Value - Initial Value) / Initial Value) * 100
 * Where Initial Value = quantity * purchasePrice
 *       Current Value = quantity * currentPrice
 * Handles division by zero by returning 0.
 */
export function calculateResult(inputs: CommodityCalculatorInputs): number {
  const initialValue = inputs.quantity * inputs.purchasePrice;
  const currentValue = inputs.quantity * inputs.currentPrice;

  if (initialValue === 0) {
    return 0;
  }

  return ((currentValue - initialValue) / initialValue) * 100;
}

/**
 * Generates an analysis for the commodity investment based on the ROI result.
 * Risk level defaults to 'High' for commodities due to inherent volatility,
 * but adjusts based on performance thresholds.
 * Recommendations are derived from standard investment advice for positive/negative returns.
 */
export function generateAnalysis(
  inputs: CommodityCalculatorInputs, 
  metrics: CommodityCalculatorMetrics
): CommodityCalculatorAnalysis {
  const result = metrics.result; // ROI percentage
  let riskLevel: 'Low' | 'Medium' | 'High' = 'High'; // Commodities are volatile by nature
  let recommendation = '';

  if (result > 10) {
    recommendation = 'The investment is showing strong performance. Consider holding or increasing your position in this commodity.';
    riskLevel = 'Medium'; // Positive momentum reduces perceived short-term risk
  } else if (result > 0) {
    recommendation = 'Modest positive returns observed. Maintain the current position and monitor market trends.';
    riskLevel = 'Low'; // Stable gains suggest lower immediate risk
  } else if (result > -10) {
    recommendation = 'Slight underperformance. Hold and reassess based on commodity market fundamentals.';
    riskLevel = 'Medium'; // Minor losses warrant caution but not panic
  } else {
    recommendation = 'Significant losses incurred. Evaluate selling to limit further downside exposure.';
    riskLevel = 'High'; // Large losses amplify commodity volatility risks
  }

  return { recommendation, riskLevel };
}
```
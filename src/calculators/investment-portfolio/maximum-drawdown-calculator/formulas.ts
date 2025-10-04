```typescript
import { MaximumDrawdownCalculatorInputs, MaximumDrawdownCalculatorMetrics, MaximumDrawdownCalculatorAnalysis } from './types';

/**
 * Calculates the Maximum Drawdown (MDD) from a series of portfolio values.
 * MDD is the largest peak-to-trough decline as a percentage.
 * 
 * Formula:
 * For each point i in the series:
 *   If value[i] > running_peak, update running_peak = value[i], reset current_dd = 0
 *   Else, current_dd = (running_peak - value[i]) / running_peak
 *   Track the maximum current_dd across all points
 * MDD = max(current_dd) * 100
 * 
 * @param inputs - Object containing the array of portfolio values over time
 * @returns The MDD as a percentage (e.g., 15.5 for 15.5%)
 */
export function calculateResult(inputs: MaximumDrawdownCalculatorInputs): number {
  const { portfolioValues } = inputs;

  if (!portfolioValues || portfolioValues.length < 2) {
    return 0; // No drawdown possible with insufficient data
  }

  let maxPeak = portfolioValues[0];
  let maxDrawdown = 0;

  for (let i = 1; i < portfolioValues.length; i++) {
    const value = portfolioValues[i];

    if (value > maxPeak) {
      maxPeak = value;
    } else {
      const currentDrawdown = (maxPeak - value) / maxPeak;
      if (currentDrawdown > maxDrawdown) {
        maxDrawdown = currentDrawdown;
      }
    }
  }

  return maxDrawdown * 100;
}

/**
 * Generates an analysis for the Maximum Drawdown calculation.
 * Assesses risk level based on MDD thresholds:
 * - Low: MDD < 10%
 * - Medium: 10% <= MDD < 25%
 * - High: MDD >= 25%
 * Provides a recommendation based on the risk level.
 * 
 * @param inputs - The original inputs
 * @param metrics - The calculated metrics including the result
 * @returns Analysis object with recommendation and riskLevel
 */
export function generateAnalysis(
  inputs: MaximumDrawdownCalculatorInputs,
  metrics: MaximumDrawdownCalculatorMetrics
): MaximumDrawdownCalculatorAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  if (result < 10) {
    riskLevel = 'Low';
    recommendation = 'The portfolio exhibits low downside risk with a minimal maximum drawdown. Continue monitoring but consider maintaining current strategy for growth.';
  } else if (result < 25) {
    riskLevel = 'Medium';
    recommendation = 'The portfolio shows moderate downside risk. Diversification or hedging strategies may help mitigate potential losses during market downturns.';
  } else {
    riskLevel = 'High';
    recommendation = 'The portfolio has significant downside risk indicated by a high maximum drawdown. Strongly recommend reviewing asset allocation, increasing diversification, or incorporating stop-loss measures to protect capital.';
  }

  return { recommendation, riskLevel };
}
```
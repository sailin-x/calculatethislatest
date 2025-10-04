```typescript
import { SortinoRatioCalculatorInputs, SortinoRatioCalculatorMetrics, SortinoRatioCalculatorAnalysis } from './types';

/**
 * Calculates the mean return from an array of periodic returns.
 * @param returns - Array of historical portfolio returns (in decimal form, e.g., 0.05 for 5%).
 * @returns The arithmetic mean of the returns.
 */
function calculateMeanReturn(returns: number[]): number {
  if (returns.length === 0) {
    throw new Error('Returns array cannot be empty');
  }
  return returns.reduce((sum, returnValue) => sum + returnValue, 0) / returns.length;
}

/**
 * Calculates the downside deviation relative to a target return.
 * Downside deviation measures the volatility of negative returns only, using the population standard deviation formula.
 * @param returns - Array of historical portfolio returns.
 * @param target - The target return (typically the risk-free rate) below which downside is measured.
 * @returns The downside deviation (standard deviation of downside returns).
 */
function calculateDownsideDeviation(returns: number[], target: number): number {
  if (returns.length === 0) {
    throw new Error('Returns array cannot be empty');
  }
  const downsideSquaredDifferences = returns.map(returnValue => {
    const downside = Math.min(0, returnValue - target);
    return downside * downside;
  });
  const meanDownsideSquared = downsideSquaredDifferences.reduce((sum, value) => sum + value, 0) / returns.length;
  return Math.sqrt(meanDownsideSquared);
}

/**
 * Core calculation for the Sortino Ratio.
 * The Sortino Ratio is (Mean Portfolio Return - Risk-Free Rate) / Downside Deviation.
 * It focuses on downside risk, providing a risk-adjusted performance measure for portfolios.
 * @param inputs - Input parameters including historical returns and risk-free rate.
 * @returns The Sortino Ratio value.
 */
export function calculateResult(inputs: SortinoRatioCalculatorInputs): number {
  const meanReturn = calculateMeanReturn(inputs.returns);
  const excessReturn = meanReturn - inputs.riskFreeRate;
  const downsideDeviation = calculateDownsideDeviation(inputs.returns, inputs.riskFreeRate);

  if (downsideDeviation === 0) {
    // No downside volatility; treat as exceptionally favorable (infinite ratio)
    return Infinity;
  }

  return excessReturn / downsideDeviation;
}

/**
 * Generates a portfolio-specific analysis and recommendation based on the Sortino Ratio.
 * Assesses the ratio to determine risk level and provide actionable insights for investment decisions.
 * - High Sortino (>2): Strong downside protection, suitable for conservative portfolios.
 * - Medium Sortino (1-2): Balanced risk-return, monitor for downside events.
 * - Low Sortino (<1): Poor downside protection, consider rebalancing or hedging.
 * @param inputs - Original inputs for context.
 * @param metrics - Computed metrics including the Sortino Ratio result.
 * @returns Analysis object with recommendation and risk level.
 */
export function generateAnalysis(
  inputs: SortinoRatioCalculatorInputs,
  metrics: SortinoRatioCalculatorMetrics
): SortinoRatioCalculatorAnalysis {
  const sortinoRatio = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  if (sortinoRatio > 2) {
    riskLevel = 'Low'; // Excellent downside-adjusted performance
  } else if (sortinoRatio >= 1) {
    riskLevel = 'Medium'; // Acceptable but room for improvement in downside protection
  } else {
    riskLevel = 'High'; // Elevated downside risk relative to returns
  }

  let recommendation: string;
  const meanReturn = calculateMeanReturn(inputs.returns);
  if (sortinoRatio > 2) {
    recommendation = `Your portfolio demonstrates strong downside protection with a Sortino Ratio of ${sortinoRatio.toFixed(2)}. The mean return of ${(meanReturn * 100).toFixed(2)}% significantly outperforms the risk-free rate while minimizing negative volatility. Consider maintaining or scaling this allocation for long-term growth.`;
  } else if (sortinoRatio >= 1) {
    recommendation = `The Sortino Ratio of ${sortinoRatio.toFixed(2)} indicates balanced risk-adjusted performance, with a mean return of ${(meanReturn * 100).toFixed(2)}%. Downside deviation is moderate; evaluate adding downside hedges like options or diversifying into lower-volatility assets to enhance protection.`;
  } else {
    recommendation = `With a Sortino Ratio of ${sortinoRatio.toFixed(2)}, your portfolio shows vulnerability to downside risk despite a mean return of ${(meanReturn * 100).toFixed(2)}%. High negative volatility suggests immediate rebalancing—reduce exposure to high-risk assets and incorporate more stable investments or stop-loss strategies.`;
  }

  return { recommendation, riskLevel };
}
```
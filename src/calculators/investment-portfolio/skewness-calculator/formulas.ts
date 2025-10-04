```typescript
import { SkewnessCalculatorInputs, SkewnessCalculatorMetrics, SkewnessCalculatorAnalysis } from './types';

/**
 * Calculates the sample mean of portfolio returns.
 * @param returns - Array of historical portfolio returns (e.g., daily or monthly percentage returns).
 * @returns The arithmetic mean return.
 */
function calculateMean(returns: number[]): number {
  if (returns.length === 0) return 0;
  return returns.reduce((sum, returnValue) => sum + returnValue, 0) / returns.length;
}

/**
 * Calculates the sample variance of portfolio returns.
 * @param returns - Array of historical portfolio returns.
 * @param mean - The mean return.
 * @returns The sample variance (divided by n-1 for unbiased estimator).
 */
function calculateSampleVariance(returns: number[], mean: number): number {
  const n = returns.length;
  if (n < 2) return 0;
  const sumSquaredDiffs = returns.reduce((sum, returnValue) => {
    const diff = returnValue - mean;
    return sum + (diff * diff);
  }, 0);
  return sumSquaredDiffs / (n - 1);
}

/**
 * Calculates the sample standard deviation of portfolio returns.
 * @param returns - Array of historical portfolio returns.
 * @param mean - The mean return.
 * @returns The sample standard deviation.
 */
function calculateSampleStdDev(returns: number[], mean: number): number {
  const variance = calculateSampleVariance(returns, mean);
  return Math.sqrt(variance);
}

/**
 * Calculates the skewness of the portfolio returns distribution.
 * Uses the adjusted Fisher-Pearson standardized moment coefficient for sample data,
 * which is common in financial analysis to assess asymmetry in return distributions.
 * Positive skewness indicates a right-tailed distribution (upside potential),
 * negative indicates left-tailed (downside risk).
 * @param returns - Array of historical portfolio returns.
 * @returns The skewness value.
 */
function calculateSkewness(returns: number[]): number {
  const n = returns.length;
  if (n < 3) return 0; // Insufficient data for skewness

  const mean = calculateMean(returns);
  const stdDev = calculateSampleStdDev(returns, mean);

  if (stdDev === 0) return 0; // No variation, symmetric by default

  const sumCubedDiffs = returns.reduce((sum, returnValue) => {
    const diff = returnValue - mean;
    return sum + (diff * diff * diff);
  }, 0);

  // Fisher-Pearson coefficient: n / ((n-1)(n-2)) * Σ[(x_i - μ)^3] / σ^3
  const adjustmentFactor = n / ((n - 1) * (n - 2));
  const skewness = adjustmentFactor * (sumCubedDiffs / (stdDev * stdDev * stdDev));

  return skewness;
}

export function calculateResult(inputs: SkewnessCalculatorInputs): number {
  // Validate inputs
  if (!inputs.returns || !Array.isArray(inputs.returns) || inputs.returns.length === 0) {
    return 0; // Invalid or empty data
  }

  // Filter out any non-numeric values to ensure data integrity
  const validReturns = inputs.returns.filter(r => typeof r === 'number' && !isNaN(r));
  if (validReturns.length < 3) {
    return 0; // Insufficient valid data
  }

  return calculateSkewness(validReturns);
}

export function generateAnalysis(
  inputs: SkewnessCalculatorInputs,
  metrics: SkewnessCalculatorMetrics
): SkewnessCalculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';

  // Investment-portfolio-specific risk assessment:
  // Negative skewness increases downside risk (higher probability of extreme losses),
  // positive skewness suggests upside potential (asymmetric gains).
  // Thresholds based on financial literature (e.g., |skewness| > 0.5 indicates significant asymmetry).
  let recommendation: string;

  if (result > 0.5) {
    riskLevel = 'Low';
    recommendation = 'The portfolio shows positive skewness, indicating a favorable return distribution with greater upside potential and reduced risk of severe losses. This is desirable for long-term investors seeking asymmetric returns.';
  } else if (result >= -0.5 && result <= 0.5) {
    riskLevel = 'Medium';
    recommendation = 'The portfolio return distribution is relatively symmetric (low skewness). This suggests balanced risk but limited asymmetry—consider diversifying to introduce positive skew if seeking higher reward potential.';
  } else if (result > -1) {
    riskLevel = 'High';
    recommendation = 'Mild negative skewness detected, implying a higher likelihood of downside deviations. Monitor for tail risks and consider hedging strategies to protect against potential losses.';
  } else {
    riskLevel = 'High';
    recommendation = 'Significant negative skewness indicates a left-tailed distribution, increasing the risk of extreme losses. Rebalance the portfolio by reducing exposure to high-volatility assets or adding options for downside protection to mitigate this risk.';
  }

  return { recommendation, riskLevel };
}
```
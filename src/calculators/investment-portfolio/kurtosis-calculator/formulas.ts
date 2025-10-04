```typescript
import { KurtosisCalculatorInputs, KurtosisCalculatorMetrics, KurtosisCalculatorAnalysis } from './types';

/**
 * Calculates the sample excess kurtosis of a dataset.
 * Uses the unbiased estimator formula for excess kurtosis.
 * Returns NaN if the dataset has fewer than 4 observations or if standard deviation is zero.
 * @param data - Array of numerical values (e.g., returns)
 * @returns The excess kurtosis value
 */
function calculateExcessKurtosis(data: number[]): number {
  const n = data.length;
  if (n < 4) {
    return NaN;
  }

  const mean = data.reduce((sum, value) => sum + value, 0) / n;

  // Sample variance (divided by n-1)
  const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (n - 1);
  const stdDev = Math.sqrt(variance);

  if (stdDev === 0) {
    return NaN; // Cannot compute kurtosis for constant series
  }

  // Fourth central moment (raw, divided by n)
  const fourthMoment = data.reduce((sum, value) => {
    const z = (value - mean) / stdDev;
    return sum + Math.pow(z, 4);
  }, 0) / n;

  // Unbiased excess kurtosis formula
  const adjustment1 = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
  const adjustment2 = 3 * Math.pow(n - 1, 2) / ((n - 2) * (n - 3));
  const kurtosis = (adjustment1 * fourthMoment) - adjustment2;

  return kurtosis;
}

export function calculateResult(inputs: KurtosisCalculatorInputs): number {
  if (!inputs.returns || inputs.returns.length === 0) {
    return NaN;
  }

  return calculateExcessKurtosis(inputs.returns);
}

export function generateAnalysis(
  inputs: KurtosisCalculatorInputs,
  metrics: KurtosisCalculatorMetrics
): KurtosisCalculatorAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  if (isNaN(result)) {
    recommendation = 'Insufficient data (fewer than 4 observations) to calculate kurtosis. Consider adding more historical returns for accurate analysis.';
    riskLevel = 'Low'; // Neutral for insufficient data
  } else if (result > 3) {
    // High positive excess kurtosis: leptokurtic, fat tails, high risk of extremes
    riskLevel = 'High';
    recommendation = 'The portfolio exhibits significantly leptokurtic distribution (excess kurtosis > 3), indicating fat tails and a higher likelihood of extreme returns or losses. This suggests elevated tail risk; consider diversification or hedging strategies to mitigate potential outliers.';
  } else if (result > 0) {
    // Positive excess kurtosis: leptokurtic, moderate fat tails
    riskLevel = 'Medium';
    recommendation = 'The portfolio shows leptokurtic characteristics (excess kurtosis > 0), implying fatter tails than a normal distribution and moderate risk of extreme events. Monitor for outliers and ensure robust risk management practices.';
  } else if (result < -1) {
    // Negative excess kurtosis: platykurtic, thin tails, lower risk of extremes
    riskLevel = 'Low';
    recommendation = 'The portfolio has a platykurtic distribution (excess kurtosis < -1), with thinner tails than normal, suggesting fewer extreme returns. This indicates relatively stable behavior with low tail risk.';
  } else {
    // Near-normal or slightly platykurtic
    riskLevel = 'Low';
    recommendation = 'The kurtosis is close to that of a normal distribution, indicating balanced tail risk with no significant propensity for extreme returns. The portfolio appears stable in terms of outlier events.';
  }

  return { recommendation, riskLevel };
}
```
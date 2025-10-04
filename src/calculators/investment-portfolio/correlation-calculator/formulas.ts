```typescript
import { CorrelationCalculatorInputs, CorrelationCalculatorMetrics, CorrelationCalculatorAnalysis } from './types';

/**
 * Calculates the mean of an array of numbers.
 * @param values - Array of numbers.
 * @returns The mean value.
 */
function calculateMean(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

/**
 * Calculates the sample covariance between two arrays.
 * @param x - First array of numbers.
 * @param y - Second array of numbers (must be same length).
 * @returns The covariance value.
 */
function calculateCovariance(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) {
    return 0;
  }
  const meanX = calculateMean(x);
  const meanY = calculateMean(y);
  const n = x.length - 1;
  let cov = 0;
  for (let i = 0; i < x.length; i++) {
    cov += (x[i] - meanX) * (y[i] - meanY);
  }
  return cov / n;
}

/**
 * Calculates the sample standard deviation of an array.
 * @param values - Array of numbers.
 * @returns The standard deviation value.
 */
function calculateStandardDeviation(values: number[]): number {
  if (values.length < 2) {
    return 0;
  }
  const mean = calculateMean(values);
  let sumSqDiff = 0;
  for (const val of values) {
    sumSqDiff += Math.pow(val - mean, 2);
  }
  const variance = sumSqDiff / (values.length - 1);
  return Math.sqrt(variance);
}

export function calculateResult(inputs: CorrelationCalculatorInputs): number {
  const { assetAReturns, assetBReturns } = inputs;
  
  // Validate inputs
  if (assetAReturns.length !== assetBReturns.length || assetAReturns.length < 2) {
    return 0; // Invalid input; correlation undefined
  }

  const cov = calculateCovariance(assetAReturns, assetBReturns);
  const stdA = calculateStandardDeviation(assetAReturns);
  const stdB = calculateStandardDeviation(assetBReturns);

  // Avoid division by zero
  if (stdA === 0 || stdB === 0) {
    return 0;
  }

  // Pearson correlation coefficient
  return cov / (stdA * stdB);
}

export function generateAnalysis(
  inputs: CorrelationCalculatorInputs,
  metrics: CorrelationCalculatorMetrics
): CorrelationCalculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  // Assess risk based on correlation (higher positive correlation increases portfolio risk due to reduced diversification)
  if (result > 0.7) {
    riskLevel = 'High';
    recommendation = 'High positive correlation indicates that the assets tend to move in the same direction, offering limited diversification benefits and potentially increasing overall portfolio risk. Consider adding assets with lower or negative correlations.';
  } else if (result > 0.3) {
    riskLevel = 'Medium';
    recommendation = `Moderate positive correlation (${result.toFixed(3)}) suggests some diversification potential, but the assets may still amplify portfolio volatility during market movements. Monitor and diversify further if needed.`;
  } else {
    riskLevel = 'Low';
    if (result < 0) {
      recommendation = `Negative correlation (${result.toFixed(3)}) provides excellent diversification and hedging benefits, as the assets tend to move in opposite directions, helping to reduce overall portfolio risk.`;
    } else {
      recommendation = `Low correlation (${result.toFixed(3)}) offers good diversification benefits, allowing the assets to offset each other's movements and stabilize the portfolio.`;
    }
  }

  return { recommendation, riskLevel };
}
```
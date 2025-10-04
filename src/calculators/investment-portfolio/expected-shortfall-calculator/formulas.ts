```typescript
import { ExpectedShortfallCalculatorInputs, ExpectedShortfallCalculatorMetrics, ExpectedShortfallCalculatorAnalysis } from './types';

// Helper function to compute empirical Expected Shortfall
function computeEmpiricalES(returns: number[], confidenceLevel: number): number {
  if (returns.length === 0) {
    return 0;
  }
  const tailProbability = 1 - confidenceLevel;
  const n = returns.length;
  const k = Math.max(1, Math.ceil(n * tailProbability)); // Ensure at least one observation in the tail
  const sortedReturns = [...returns].sort((a, b) => a - b); // Ascending order (worst returns first)
  const tailSum = sortedReturns.slice(0, k).reduce((sum, ret) => sum + ret, 0);
  return tailSum / k;
}

// Helper function to compute mean of returns
function computeMean(returns: number[]): number {
  if (returns.length === 0) {
    return 0;
  }
  return returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
}

// Helper function to compute standard deviation of returns
function computeStdDev(returns: number[], mean: number): number {
  if (returns.length === 0) {
    return 0;
  }
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
  return Math.sqrt(variance);
}

export function calculateResult(inputs: ExpectedShortfallCalculatorInputs): number {
  return computeEmpiricalES(inputs.historicalReturns, inputs.confidenceLevel);
}

export function generateAnalysis(
  inputs: ExpectedShortfallCalculatorInputs,
  metrics: ExpectedShortfallCalculatorMetrics
): ExpectedShortfallCalculatorAnalysis {
  const { historicalReturns, confidenceLevel } = inputs;
  const es = metrics.result;

  const mean = computeMean(historicalReturns);
  const stdDev = computeStdDev(historicalReturns, mean);

  // Compute the z-score equivalent: how many standard deviations the ES is below the mean
  // Larger z indicates fatter tails/higher risk
  const zScore = stdDev > 0 ? (mean - es) / stdDev : 0;

  let riskLevel: 'Low' | 'Medium' | 'High';
  if (zScore < 1.5) {
    riskLevel = 'Low';
  } else if (zScore < 2.5) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  let recommendation: string;
  const tailProb = (1 - confidenceLevel) * 100;
  if (riskLevel === 'Low') {
    recommendation = `At a ${tailProb}% tail probability, the Expected Shortfall of ${es.toFixed(4)} indicates low tail risk relative to the portfolio's mean return of ${mean.toFixed(4)}. This suggests the portfolio is resilient in adverse scenarios and suitable for conservative strategies.`;
  } else if (riskLevel === 'Medium') {
    recommendation = `At a ${tailProb}% tail probability, the Expected Shortfall of ${es.toFixed(4)} shows moderate tail risk (approximately ${zScore.toFixed(2)} standard deviations below the mean of ${mean.toFixed(4)}). Consider monitoring and potentially diversifying to mitigate further downside exposure.`;
  } else {
    recommendation = `At a ${tailProb}% tail probability, the Expected Shortfall of ${es.toFixed(4)} reveals high tail risk (approximately ${zScore.toFixed(2)} standard deviations below the mean of ${mean.toFixed(4)}). Urgent review of portfolio allocation, stress testing, and hedging strategies (e.g., options or diversification) is recommended to reduce potential severe losses.`;
  }

  return { recommendation, riskLevel };
}
```
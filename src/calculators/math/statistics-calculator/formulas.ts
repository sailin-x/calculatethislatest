import { statistics-calculatorInputs, statistics-calculatorMetrics, statistics-calculatorAnalysis } from './types';

// Statistics Calculator
export function calculateMean(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

export function calculateMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function calculateStandardDeviation(values: number[], isPopulation: boolean = false): number {
  const mean = calculateMean(values);
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / (values.length - (isPopulation ? 0 : 1));
  return Math.sqrt(variance);
}

export function calculateResult(inputs: statistics-calculatorInputs): number {
  if ('values' in inputs && Array.isArray(inputs.values)) {
    return calculateMean(inputs.values);
  }
  return 0;
}

export function generateAnalysis(inputs: statistics-calculatorInputs, metrics: statistics-calculatorMetrics): statistics-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  const recommendation = 'Statistical calculation completed. Verify data distribution and outliers.';

  return { recommendation, riskLevel };
}
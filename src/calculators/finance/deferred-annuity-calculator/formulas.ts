import { deferred-annuity-calculatorInputs, deferred-annuity-calculatorMetrics, deferred-annuity-calculatorAnalysis } from './types';

// Deferred Annuity Calculator - Finance calculations
export function calculateResult(inputs: deferred-annuity-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: deferred-annuity-calculatorInputs, metrics: deferred-annuity-calculatorMetrics): deferred-annuity-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
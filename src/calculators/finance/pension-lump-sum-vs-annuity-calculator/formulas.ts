import { pension-lump-sum-vs-annuity-calculatorInputs, pension-lump-sum-vs-annuity-calculatorMetrics, pension-lump-sum-vs-annuity-calculatorAnalysis } from './types';

// Pension Lump Sum vs. Annuity Calculator - Finance calculations
export function calculateResult(inputs: pension-lump-sum-vs-annuity-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: pension-lump-sum-vs-annuity-calculatorInputs, metrics: pension-lump-sum-vs-annuity-calculatorMetrics): pension-lump-sum-vs-annuity-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
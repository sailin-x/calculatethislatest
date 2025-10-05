import { mortgage-vs-rent-calculatorInputs, mortgage-vs-rent-calculatorMetrics, mortgage-vs-rent-calculatorAnalysis } from './types';

// Mortgage vs. Rent Calculator - Finance calculations
export function calculateResult(inputs: mortgage-vs-rent-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: mortgage-vs-rent-calculatorInputs, metrics: mortgage-vs-rent-calculatorMetrics): mortgage-vs-rent-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
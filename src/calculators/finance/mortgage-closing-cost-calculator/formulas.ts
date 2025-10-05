import { mortgage-closing-cost-calculatorInputs, mortgage-closing-cost-calculatorMetrics, mortgage-closing-cost-calculatorAnalysis } from './types';

// Mortgage Closing Cost Calculator - Finance calculations
export function calculateResult(inputs: mortgage-closing-cost-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: mortgage-closing-cost-calculatorInputs, metrics: mortgage-closing-cost-calculatorMetrics): mortgage-closing-cost-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
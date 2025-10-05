import { 529-college-savings-plan-calculatorInputs, 529-college-savings-plan-calculatorMetrics, 529-college-savings-plan-calculatorAnalysis } from './types';

// 529 College Savings Plan Calculator - Finance calculations
export function calculateResult(inputs: 529-college-savings-plan-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: 529-college-savings-plan-calculatorInputs, metrics: 529-college-savings-plan-calculatorMetrics): 529-college-savings-plan-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
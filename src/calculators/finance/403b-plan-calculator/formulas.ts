import { 403b-plan-calculatorInputs, 403b-plan-calculatorMetrics, 403b-plan-calculatorAnalysis } from './types';

// 403(b) Plan Calculator - Finance calculations
export function calculateResult(inputs: 403b-plan-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: 403b-plan-calculatorInputs, metrics: 403b-plan-calculatorMetrics): 403b-plan-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
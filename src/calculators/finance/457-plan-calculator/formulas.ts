import { 457-plan-calculatorInputs, 457-plan-calculatorMetrics, 457-plan-calculatorAnalysis } from './types';

// 457 Plan Calculator - Finance calculations
export function calculateResult(inputs: 457-plan-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: 457-plan-calculatorInputs, metrics: 457-plan-calculatorMetrics): 457-plan-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
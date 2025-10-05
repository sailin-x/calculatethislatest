import { 401k-rollover-calculatorInputs, 401k-rollover-calculatorMetrics, 401k-rollover-calculatorAnalysis } from './types';

// 401(k) Rollover Calculator - Finance calculations
export function calculateResult(inputs: 401k-rollover-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: 401k-rollover-calculatorInputs, metrics: 401k-rollover-calculatorMetrics): 401k-rollover-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
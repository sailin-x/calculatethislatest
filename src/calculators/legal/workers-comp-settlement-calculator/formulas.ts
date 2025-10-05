import { workers-comp-settlement-calculatorInputs, workers-comp-settlement-calculatorMetrics, workers-comp-settlement-calculatorAnalysis } from './types';

// Workers' Comp Settlement Calculator - Legal calculations
export function calculateResult(inputs: workers-comp-settlement-calculatorInputs): number {
  // Legal calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: workers-comp-settlement-calculatorInputs, metrics: workers-comp-settlement-calculatorMetrics): workers-comp-settlement-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Legal calculation completed - consult legal professional for interpretation';

  return { recommendation, riskLevel };
}
import { ArmVsFixed-mortgage-calculatorInputs, ArmVsFixed-mortgage-calculatorMetrics, ArmVsFixed-mortgage-calculatorAnalysis } from './types';

// ARM vs. Fixed Mortgage Calculator - Finance calculations
export function calculateResult(inputs: ArmVsFixed-mortgage-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: ArmVsFixed-mortgage-calculatorInputs, metrics: ArmVsFixed-mortgage-calculatorMetrics): ArmVsFixed-mortgage-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
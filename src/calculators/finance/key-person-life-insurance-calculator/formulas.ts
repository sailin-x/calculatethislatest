import { key-person-life-insurance-calculatorInputs, key-person-life-insurance-calculatorMetrics, key-person-life-insurance-calculatorAnalysis } from './types';

// Key Person Life Insurance Calculator - Finance calculations
export function calculateResult(inputs: key-person-life-insurance-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: key-person-life-insurance-calculatorInputs, metrics: key-person-life-insurance-calculatorMetrics): key-person-life-insurance-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
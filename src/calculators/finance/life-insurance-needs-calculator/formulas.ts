import { life-insurance-needs-calculatorInputs, life-insurance-needs-calculatorMetrics, life-insurance-needs-calculatorAnalysis } from './types';

// Life Insurance Needs Calculator - Finance calculations
export function calculateResult(inputs: life-insurance-needs-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: life-insurance-needs-calculatorInputs, metrics: life-insurance-needs-calculatorMetrics): life-insurance-needs-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
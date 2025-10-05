import { disability-insurance-needs-calculatorInputs, disability-insurance-needs-calculatorMetrics, disability-insurance-needs-calculatorAnalysis } from './types';

// Disability Insurance Needs Calculator - Finance calculations
export function calculateResult(inputs: disability-insurance-needs-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: disability-insurance-needs-calculatorInputs, metrics: disability-insurance-needs-calculatorMetrics): disability-insurance-needs-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
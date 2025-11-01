import { WorkersCompensationInsurance-calculatorInputs, WorkersCompensationInsurance-calculatorMetrics, WorkersCompensationInsurance-calculatorAnalysis } from './types';

// Workers' Compensation Insurance Calculator - Finance calculations
export function calculateResult(inputs: WorkersCompensationInsurance-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: WorkersCompensationInsurance-calculatorInputs, metrics: WorkersCompensationInsurance-calculatorMetrics): WorkersCompensationInsurance-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
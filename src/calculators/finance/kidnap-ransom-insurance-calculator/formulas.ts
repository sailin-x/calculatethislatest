import { kidnap-ransom-insurance-calculatorInputs, kidnap-ransom-insurance-calculatorMetrics, kidnap-ransom-insurance-calculatorAnalysis } from './types';

// Kidnap & Ransom Insurance Calculator - Finance calculations
export function calculateResult(inputs: kidnap-ransom-insurance-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: kidnap-ransom-insurance-calculatorInputs, metrics: kidnap-ransom-insurance-calculatorMetrics): kidnap-ransom-insurance-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
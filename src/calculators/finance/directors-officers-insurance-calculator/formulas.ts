import { directors-officers-insurance-calculatorInputs, directors-officers-insurance-calculatorMetrics, directors-officers-insurance-calculatorAnalysis } from './types';

// Directors & Officers Insurance Calculator - Finance calculations
export function calculateResult(inputs: directors-officers-insurance-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: directors-officers-insurance-calculatorInputs, metrics: directors-officers-insurance-calculatorMetrics): directors-officers-insurance-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
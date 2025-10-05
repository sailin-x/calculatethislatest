import { dental-malpractice-settlement-calculatorInputs, dental-malpractice-settlement-calculatorMetrics, dental-malpractice-settlement-calculatorAnalysis } from './types';

// Dental Malpractice Settlement Calculator - Legal calculations
export function calculateResult(inputs: dental-malpractice-settlement-calculatorInputs): number {
  // Legal calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: dental-malpractice-settlement-calculatorInputs, metrics: dental-malpractice-settlement-calculatorMetrics): dental-malpractice-settlement-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Legal calculation completed - consult legal professional for interpretation';

  return { recommendation, riskLevel };
}
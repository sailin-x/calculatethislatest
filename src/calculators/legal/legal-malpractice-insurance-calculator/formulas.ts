import { legal-malpractice-insurance-calculatorInputs, legal-malpractice-insurance-calculatorMetrics, legal-malpractice-insurance-calculatorAnalysis } from './types';

// Legal Malpractice Insurance Calculator - Legal calculations
export function calculateResult(inputs: legal-malpractice-insurance-calculatorInputs): number {
  // Legal calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: legal-malpractice-insurance-calculatorInputs, metrics: legal-malpractice-insurance-calculatorMetrics): legal-malpractice-insurance-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Legal calculation completed - consult legal professional for interpretation';

  return { recommendation, riskLevel };
}
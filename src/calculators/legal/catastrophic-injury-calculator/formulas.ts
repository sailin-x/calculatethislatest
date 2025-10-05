import { catastrophic-injury-calculatorInputs, catastrophic-injury-calculatorMetrics, catastrophic-injury-calculatorAnalysis } from './types';

// Catastrophic Injury Calculator - Legal calculations
export function calculateResult(inputs: catastrophic-injury-calculatorInputs): number {
  // Legal calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: catastrophic-injury-calculatorInputs, metrics: catastrophic-injury-calculatorMetrics): catastrophic-injury-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Legal calculation completed - consult legal professional for interpretation';

  return { recommendation, riskLevel };
}
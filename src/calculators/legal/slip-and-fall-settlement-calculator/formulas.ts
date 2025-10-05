import { slip-and-fall-settlement-calculatorInputs, slip-and-fall-settlement-calculatorMetrics, slip-and-fall-settlement-calculatorAnalysis } from './types';

// Slip and Fall Settlement Calculator - Legal calculations
export function calculateResult(inputs: slip-and-fall-settlement-calculatorInputs): number {
  // Legal calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: slip-and-fall-settlement-calculatorInputs, metrics: slip-and-fall-settlement-calculatorMetrics): slip-and-fall-settlement-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Legal calculation completed - consult legal professional for interpretation';

  return { recommendation, riskLevel };
}
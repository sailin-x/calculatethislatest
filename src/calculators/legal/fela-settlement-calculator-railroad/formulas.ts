import { fela-settlement-calculator-railroadInputs, fela-settlement-calculator-railroadMetrics, fela-settlement-calculator-railroadAnalysis } from './types';

// FELA Settlement Calculator (Railroad) - Legal calculations
export function calculateResult(inputs: fela-settlement-calculator-railroadInputs): number {
  // Legal calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: fela-settlement-calculator-railroadInputs, metrics: fela-settlement-calculator-railroadMetrics): fela-settlement-calculator-railroadAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Legal calculation completed - consult legal professional for interpretation';

  return { recommendation, riskLevel };
}
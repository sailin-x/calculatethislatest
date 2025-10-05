import { jones-act-settlement-calculator-maritimeInputs, jones-act-settlement-calculator-maritimeMetrics, jones-act-settlement-calculator-maritimeAnalysis } from './types';

// Jones Act Settlement Calculator (Maritime) - Legal calculations
export function calculateResult(inputs: jones-act-settlement-calculator-maritimeInputs): number {
  // Legal calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: jones-act-settlement-calculator-maritimeInputs, metrics: jones-act-settlement-calculator-maritimeMetrics): jones-act-settlement-calculator-maritimeAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Legal calculation completed - consult legal professional for interpretation';

  return { recommendation, riskLevel };
}
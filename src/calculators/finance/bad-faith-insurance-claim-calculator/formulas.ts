import { bad-faith-insurance-claim-calculatorInputs, bad-faith-insurance-claim-calculatorMetrics, bad-faith-insurance-claim-calculatorAnalysis } from './types';

// Bad Faith Insurance Claim Calculator - Finance calculations
export function calculateResult(inputs: bad-faith-insurance-claim-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: bad-faith-insurance-claim-calculatorInputs, metrics: bad-faith-insurance-claim-calculatorMetrics): bad-faith-insurance-claim-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
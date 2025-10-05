import { trade-credit-insurance-roi-calculatorInputs, trade-credit-insurance-roi-calculatorMetrics, trade-credit-insurance-roi-calculatorAnalysis } from './types';

// Trade Credit Insurance ROI Calculator - Finance calculations
export function calculateResult(inputs: trade-credit-insurance-roi-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: trade-credit-insurance-roi-calculatorInputs, metrics: trade-credit-insurance-roi-calculatorMetrics): trade-credit-insurance-roi-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
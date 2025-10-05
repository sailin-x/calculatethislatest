import { crypto-tax-harvesting-calculatorInputs, crypto-tax-harvesting-calculatorMetrics, crypto-tax-harvesting-calculatorAnalysis } from './types';

// Crypto Tax Harvesting Calculator - Finance calculations
export function calculateResult(inputs: crypto-tax-harvesting-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: crypto-tax-harvesting-calculatorInputs, metrics: crypto-tax-harvesting-calculatorMetrics): crypto-tax-harvesting-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
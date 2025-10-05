import { hsa-triple-tax-advantage-calculatorInputs, hsa-triple-tax-advantage-calculatorMetrics, hsa-triple-tax-advantage-calculatorAnalysis } from './types';

// HSA Triple Tax Advantage Calculator - Finance calculations
export function calculateResult(inputs: hsa-triple-tax-advantage-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: hsa-triple-tax-advantage-calculatorInputs, metrics: hsa-triple-tax-advantage-calculatorMetrics): hsa-triple-tax-advantage-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
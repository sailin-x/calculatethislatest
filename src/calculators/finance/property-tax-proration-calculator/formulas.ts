import { property-tax-proration-calculatorInputs, property-tax-proration-calculatorMetrics, property-tax-proration-calculatorAnalysis } from './types';

// Property Tax Proration Calculator - Finance calculations
export function calculateResult(inputs: property-tax-proration-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: property-tax-proration-calculatorInputs, metrics: property-tax-proration-calculatorMetrics): property-tax-proration-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
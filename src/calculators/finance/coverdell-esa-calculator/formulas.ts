import { coverdell-esa-calculatorInputs, coverdell-esa-calculatorMetrics, coverdell-esa-calculatorAnalysis } from './types';

// Coverdell ESA Calculator - Finance calculations
export function calculateResult(inputs: coverdell-esa-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: coverdell-esa-calculatorInputs, metrics: coverdell-esa-calculatorMetrics): coverdell-esa-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
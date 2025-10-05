import { roth-401k-vs-traditional-401k-calculatorInputs, roth-401k-vs-traditional-401k-calculatorMetrics, roth-401k-vs-traditional-401k-calculatorAnalysis } from './types';

// Roth 401(k) vs. Traditional 401(k) Calculator - Finance calculations
export function calculateResult(inputs: roth-401k-vs-traditional-401k-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: roth-401k-vs-traditional-401k-calculatorInputs, metrics: roth-401k-vs-traditional-401k-calculatorMetrics): roth-401k-vs-traditional-401k-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
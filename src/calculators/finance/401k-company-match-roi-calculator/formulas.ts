import { 401k-company-match-roi-calculatorInputs, 401k-company-match-roi-calculatorMetrics, 401k-company-match-roi-calculatorAnalysis } from './types';

// 401(k) Company Match ROI Calculator - Finance calculations
export function calculateResult(inputs: 401k-company-match-roi-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: 401k-company-match-roi-calculatorInputs, metrics: 401k-company-match-roi-calculatorMetrics): 401k-company-match-roi-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
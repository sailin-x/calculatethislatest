import { buy-sell-agreement-insurance-calculatorInputs, buy-sell-agreement-insurance-calculatorMetrics, buy-sell-agreement-insurance-calculatorAnalysis } from './types';

// Buy-Sell Agreement Insurance Calculator - Finance calculations
export function calculateResult(inputs: buy-sell-agreement-insurance-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: buy-sell-agreement-insurance-calculatorInputs, metrics: buy-sell-agreement-insurance-calculatorMetrics): buy-sell-agreement-insurance-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
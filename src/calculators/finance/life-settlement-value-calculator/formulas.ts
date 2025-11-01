import { LifeSettlementValue-calculatorInputs, LifeSettlementValue-calculatorMetrics, LifeSettlementValue-calculatorAnalysis } from './types';

// Life Settlement Value Calculator - Finance calculations
export function calculateResult(inputs: LifeSettlementValue-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: LifeSettlementValue-calculatorInputs, metrics: LifeSettlementValue-calculatorMetrics): LifeSettlementValue-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
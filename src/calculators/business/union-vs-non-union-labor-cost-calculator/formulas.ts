import { UnionVsNon-UnionLaborCost-calculatorInputs, UnionVsNon-UnionLaborCost-calculatorMetrics, UnionVsNon-UnionLaborCost-calculatorAnalysis } from './types';

// Union vs. Non-Union Labor Cost Calculator - Business calculations
export function calculateResult(inputs: UnionVsNon-UnionLaborCost-calculatorInputs): number {
  // Business calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: UnionVsNon-UnionLaborCost-calculatorInputs, metrics: UnionVsNon-UnionLaborCost-calculatorMetrics): UnionVsNon-UnionLaborCost-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Business calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
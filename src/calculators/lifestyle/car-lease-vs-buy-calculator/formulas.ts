import { CarLeaseVs-buy-calculatorInputs, CarLeaseVs-buy-calculatorMetrics, CarLeaseVs-buy-calculatorAnalysis } from './types';

// Car Lease vs. Buy Calculator - Lifestyle calculations
export function calculateResult(inputs: CarLeaseVs-buy-calculatorInputs): number {
  // Lifestyle calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: CarLeaseVs-buy-calculatorInputs, metrics: CarLeaseVs-buy-calculatorMetrics): CarLeaseVs-buy-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 1000) riskLevel = 'High';
  else if (Math.abs(result) > 100) riskLevel = 'Medium';

  const recommendation = 'Lifestyle calculation completed - review results';

  return { recommendation, riskLevel };
}
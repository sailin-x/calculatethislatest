import { carb-cycling-calculatorInputs, carb-cycling-calculatorMetrics, carb-cycling-calculatorAnalysis } from './types';

// Carb Cycling Calculator - Lifestyle calculations
export function calculateResult(inputs: carb-cycling-calculatorInputs): number {
  // Lifestyle calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: carb-cycling-calculatorInputs, metrics: carb-cycling-calculatorMetrics): carb-cycling-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 1000) riskLevel = 'High';
  else if (Math.abs(result) > 100) riskLevel = 'Medium';

  const recommendation = 'Lifestyle calculation completed - review results';

  return { recommendation, riskLevel };
}
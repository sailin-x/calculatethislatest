import { WeightedGradeCalculatorinputs, WeightedGradeCalculatormetrics, WeightedGradeCalculatoranalysis } from './types';

// Weighted Grade Calculator - Health calculations
export function calculateResult(inputs: WeightedGradeCalculatorinputs): number {
  // Health calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: WeightedGradeCalculatorinputs, metrics: WeightedGradeCalculatormetrics): WeightedGradeCalculatoranalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 1000) riskLevel = 'High';
  else if (Math.abs(result) > 100) riskLevel = 'Medium';

  const recommendation = 'Health calculation completed - consult healthcare professional for interpretation';

  return { recommendation, riskLevel };
}
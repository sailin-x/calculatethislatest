import { self-funded-health-plan-vs-fully-insured-calculatorInputs, self-funded-health-plan-vs-fully-insured-calculatorMetrics, self-funded-health-plan-vs-fully-insured-calculatorAnalysis } from './types';

// Self-Funded Health Plan vs. Fully-Insured Calculator - Health calculations
export function calculateResult(inputs: self-funded-health-plan-vs-fully-insured-calculatorInputs): number {
  // Health calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: self-funded-health-plan-vs-fully-insured-calculatorInputs, metrics: self-funded-health-plan-vs-fully-insured-calculatorMetrics): self-funded-health-plan-vs-fully-insured-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 1000) riskLevel = 'High';
  else if (Math.abs(result) > 100) riskLevel = 'Medium';

  const recommendation = 'Health calculation completed - consult healthcare professional for interpretation';

  return { recommendation, riskLevel };
}
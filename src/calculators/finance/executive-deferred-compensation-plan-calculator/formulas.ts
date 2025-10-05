import { executive-deferred-compensation-plan-calculatorInputs, executive-deferred-compensation-plan-calculatorMetrics, executive-deferred-compensation-plan-calculatorAnalysis } from './types';

// Executive Deferred Compensation Plan Calculator - Finance calculations
export function calculateResult(inputs: executive-deferred-compensation-plan-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: executive-deferred-compensation-plan-calculatorInputs, metrics: executive-deferred-compensation-plan-calculatorMetrics): executive-deferred-compensation-plan-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
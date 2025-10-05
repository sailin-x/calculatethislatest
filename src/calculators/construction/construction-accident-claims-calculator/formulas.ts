import { construction-accident-claims-calculatorInputs, construction-accident-claims-calculatorMetrics, construction-accident-claims-calculatorAnalysis } from './types';

// Construction Accident Claims Calculator - Construction calculations
export function calculateResult(inputs: construction-accident-claims-calculatorInputs): number {
  // Construction calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: construction-accident-claims-calculatorInputs, metrics: construction-accident-claims-calculatorMetrics): construction-accident-claims-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 10000) riskLevel = 'High';
  else if (Math.abs(result) > 1000) riskLevel = 'Medium';

  const recommendation = 'Construction calculation completed - verify with local building codes';

  return { recommendation, riskLevel };
}
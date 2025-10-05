import { bill-of-materials-bom-cost-calculatorInputs, bill-of-materials-bom-cost-calculatorMetrics, bill-of-materials-bom-cost-calculatorAnalysis } from './types';

// Bill of Materials (BOM) Cost Calculator - Business calculations
export function calculateResult(inputs: bill-of-materials-bom-cost-calculatorInputs): number {
  // Business calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: bill-of-materials-bom-cost-calculatorInputs, metrics: bill-of-materials-bom-cost-calculatorMetrics): bill-of-materials-bom-cost-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Business calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
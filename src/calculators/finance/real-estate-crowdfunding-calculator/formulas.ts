import { real-estate-crowdfunding-calculatorInputs, real-estate-crowdfunding-calculatorMetrics, real-estate-crowdfunding-calculatorAnalysis } from './types';

// Real Estate Crowdfunding Calculator - Finance calculations
export function calculateResult(inputs: real-estate-crowdfunding-calculatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: real-estate-crowdfunding-calculatorInputs, metrics: real-estate-crowdfunding-calculatorMetrics): real-estate-crowdfunding-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
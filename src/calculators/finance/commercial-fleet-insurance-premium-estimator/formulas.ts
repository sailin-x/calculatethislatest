import { commercial-fleet-insurance-premium-estimatorInputs, commercial-fleet-insurance-premium-estimatorMetrics, commercial-fleet-insurance-premium-estimatorAnalysis } from './types';

// Commercial Fleet Insurance Premium Estimator - Finance calculations
export function calculateResult(inputs: commercial-fleet-insurance-premium-estimatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: commercial-fleet-insurance-premium-estimatorInputs, metrics: commercial-fleet-insurance-premium-estimatorMetrics): commercial-fleet-insurance-premium-estimatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
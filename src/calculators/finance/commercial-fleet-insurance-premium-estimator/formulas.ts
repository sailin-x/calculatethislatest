import { CommercialFleetInsurance-premium-estimatorInputs, CommercialFleetInsurance-premium-estimatorMetrics, CommercialFleetInsurance-premium-estimatorAnalysis } from './types';

// Commercial Fleet Insurance Premium Estimator - Finance calculations
export function calculateResult(inputs: CommercialFleetInsurance-premium-estimatorInputs): number {
  // Financial calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: CommercialFleetInsurance-premium-estimatorInputs, metrics: CommercialFleetInsurance-premium-estimatorMetrics): CommercialFleetInsurance-premium-estimatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Financial calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
import { ai-prompt-cost-token-estimatorInputs, ai-prompt-cost-token-estimatorMetrics, ai-prompt-cost-token-estimatorAnalysis } from './types';

// AI Prompt Cost & Token Estimator - Business calculations
export function calculateResult(inputs: ai-prompt-cost-token-estimatorInputs): number {
  // Business calculation logic
  const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
  return numericValues.reduce((sum, val) => sum + val, 0) || 0;
}

export function generateAnalysis(inputs: ai-prompt-cost-token-estimatorInputs, metrics: ai-prompt-cost-token-estimatorMetrics): ai-prompt-cost-token-estimatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = 'Business calculation completed - review results carefully';

  return { recommendation, riskLevel };
}
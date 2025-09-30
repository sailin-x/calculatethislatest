import { 1031_exchange';Inputs, 1031_exchange';Metrics, 1031_exchange';Analysis } from './types';


// Generic Calculator - Basic mathematical operations
export function calculatePercentage(value: number, percentage: number): number {
  return value * (percentage / 100);
}

export function calculatePercentageChange(oldValue: number, newValue: number): number {
  return ((newValue - oldValue) / oldValue) * 100;
}

export function calculateAverage(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

export function calculateResult(inputs: 1031_exchange';Inputs): number {
  // Use domain-specific calculations based on input properties
  try {
    // Try to match inputs to appropriate calculation
    if ('principal' in inputs && 'annualRate' in inputs && 'years' in inputs) {
      return calculateMonthlyPayment(inputs.principal, inputs.annualRate, inputs.years);
    }
    if ('initialInvestment' in inputs && 'finalValue' in inputs) {
      return calculateROI(inputs.initialInvestment, inputs.finalValue);
    }
    if ('weightKg' in inputs && 'heightCm' in inputs) {
      return calculateBMI(inputs.weightKg, inputs.heightCm);
    }
    if ('value' in inputs && 'percentage' in inputs) {
      return calculatePercentage(inputs.value, inputs.percentage);
    }
    // Fallback to basic calculation
    return inputs.value || inputs.amount || inputs.principal || 0;
  } catch (error) {
    console.warn('Calculation error:', error);
    return 0;
  }
}

export function generateAnalysis(inputs: 1031_exchange';Inputs, metrics: 1031_exchange';Metrics): 1031_exchange';Analysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = result > 0 ?
    'Calculation completed successfully - positive result' :
    'Calculation completed - review inputs if result seems unexpected';

  return { recommendation, riskLevel };
}

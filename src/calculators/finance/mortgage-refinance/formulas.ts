import { mortgage-refinanceInputs, mortgage-refinanceMetrics, mortgage-refinanceAnalysis } from './types';


// Mortgage Payment Calculator - Standard loan amortization formula
export function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateTotalInterest(principal: number, monthlyPayment: number, numPayments: number): number {
  return (monthlyPayment * numPayments) - principal;
}

export function calculateResult(inputs: mortgage-refinanceInputs): number {
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

export function generateAnalysis(inputs: mortgage-refinanceInputs, metrics: mortgage-refinanceMetrics): mortgage-refinanceAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = result > 0 ?
    'Calculation completed successfully - positive result' :
    'Calculation completed - review inputs if result seems unexpected';

  return { recommendation, riskLevel };
}

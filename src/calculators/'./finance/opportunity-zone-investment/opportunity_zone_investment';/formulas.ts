import { opportunity_zone_investment';Inputs, opportunity_zone_investment';Metrics, opportunity_zone_investment';Analysis } from './types';


// Investment Calculator - ROI and growth calculations
export function calculateROI(initialInvestment: number, finalValue: number): number {
  return ((finalValue - initialInvestment) / initialInvestment) * 100;
}

export function calculateCompoundInterest(principal: number, rate: number, years: number, compoundingFrequency: number = 12): number {
  const ratePerPeriod = rate / 100 / compoundingFrequency;
  const totalPeriods = years * compoundingFrequency;
  return principal * Math.pow(1 + ratePerPeriod, totalPeriods);
}

export function calculateResult(inputs: opportunity_zone_investment';Inputs): number {
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

export function generateAnalysis(inputs: opportunity_zone_investment';Inputs, metrics: opportunity_zone_investment';Metrics): opportunity_zone_investment';Analysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = result > 0 ?
    'Calculation completed successfully - positive result' :
    'Calculation completed - review inputs if result seems unexpected';

  return { recommendation, riskLevel };
}

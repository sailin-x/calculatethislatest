import { estate_tax_liability_calculator';Inputs, estate_tax_liability_calculator';Metrics, estate_tax_liability_calculator';Analysis } from './types';


// Tax Calculator - Progressive tax calculations
export function calculateProgressiveTax(income: number, brackets: Array<{min: number, max: number, rate: number}>): number {
  let tax = 0;
  let remainingIncome = income;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    tax += taxableInBracket * (bracket.rate / 100);
    remainingIncome -= taxableInBracket;
  }

  return tax;
}

export function calculateEffectiveTaxRate(taxPaid: number, totalIncome: number): number {
  return (taxPaid / totalIncome) * 100;
}

export function calculateResult(inputs: estate_tax_liability_calculator';Inputs): number {
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

export function generateAnalysis(inputs: estate_tax_liability_calculator';Inputs, metrics: estate_tax_liability_calculator';Metrics): estate_tax_liability_calculator';Analysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = result > 0 ?
    'Calculation completed successfully - positive result' :
    'Calculation completed - review inputs if result seems unexpected';

  return { recommendation, riskLevel };
}

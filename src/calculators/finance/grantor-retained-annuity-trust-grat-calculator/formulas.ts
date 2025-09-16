import { GRATInputs, GRATResults, GRATMetrics } from './types';

export function calculateGRAT(inputs: GRATInputs): GRATResults {
  const {
    initialValue,
    annuityRate,
    termYears,
    growthRate,
    discountRate,
    gstTaxRate,
    estateTaxRate,
    includeStateTax,
    stateTaxRate,
    inflationRate,
    trustType
  } = inputs;

  // Calculate annuity payment
  const annuityPayment = initialValue * (annuityRate / 100);

  // Calculate remainder value at end of term
  let remainderValue = initialValue;
  for (let year = 1; year <= termYears; year++) {
    remainderValue = (remainderValue - annuityPayment) * (1 + growthRate / 100);
  }

  // Apply discount rate for present value
  const presentValueRemainder = remainderValue / Math.pow(1 + discountRate / 100, termYears);

  // Calculate GST tax on remainder
  const gstTaxLiability = presentValueRemainder * (gstTaxRate / 100);

  // Calculate estate tax if trust fails
  const estateTaxLiability = includeStateTax
    ? gstTaxLiability * (estateTaxRate / 100) + gstTaxLiability * (stateTaxRate / 100)
    : gstTaxLiability * (estateTaxRate / 100);

  // Total tax liability
  const totalTaxLiability = gstTaxLiability + estateTaxLiability;

  // Net benefit (value transferred minus taxes)
  const netBenefit = presentValueRemainder - totalTaxLiability;

  // Calculate IRR (simplified approximation)
  const internalRateOfReturn = ((presentValueRemainder / initialValue) - 1) * 100 / termYears;

  // Break-even point
  const breakEvenPoint = totalTaxLiability / (annuityRate / 100);

  // Optimal strategy
  let optimalStrategy = 'Standard GRAT structure';
  if (trustType === 'zeroed-out') {
    optimalStrategy = 'Zeroed-out GRAT for maximum transfer';
  } else if (trustType === 'rollover') {
    optimalStrategy = 'Rollover GRAT for extended term';
  } else if (termYears < 3) {
    optimalStrategy = 'Consider longer term for better results';
  }

  return {
    annuityPayment,
    remainderValue,
    gstTaxLiability,
    estateTaxLiability,
    totalTaxLiability,
    netBenefit,
    internalRateOfReturn,
    breakEvenPoint,
    optimalStrategy
  };
}

export function calculateGRATMetrics(
  inputs: GRATInputs,
  results: GRATResults
): GRATMetrics {
  const { initialValue, termYears } = inputs;
  const { netBenefit, totalTaxLiability, remainderValue } = results;

  // Efficiency ratio
  const efficiencyRatio = netBenefit / initialValue;

  // Tax savings percentage
  const taxSavingsPercentage = totalTaxLiability > 0
    ? ((remainderValue - totalTaxLiability) / remainderValue) * 100
    : 100;

  // Risk assessment
  let riskAssessment: 'low' | 'medium' | 'high' = 'medium';
  if (termYears < 2) {
    riskAssessment = 'high';
  } else if (termYears > 5) {
    riskAssessment = 'low';
  }

  // Success probability (simplified)
  const successProbability = Math.max(0, Math.min(100, 50 + (termYears * 5) - (totalTaxLiability / initialValue * 100)));

  return {
    efficiencyRatio,
    taxSavingsPercentage,
    riskAssessment,
    successProbability
  };
}

export function validateGRATInputs(inputs: GRATInputs): string[] {
  const errors: string[] = [];

  if (inputs.initialValue <= 0) {
    errors.push('Initial value must be greater than $0');
  }

  if (inputs.annuityRate <= 0 || inputs.annuityRate > 100) {
    errors.push('Annuity rate must be between 0% and 100%');
  }

  if (inputs.termYears < 1 || inputs.termYears > 20) {
    errors.push('Term years must be between 1 and 20');
  }

  if (inputs.growthRate < -20 || inputs.growthRate > 50) {
    errors.push('Growth rate must be between -20% and 50%');
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 30) {
    errors.push('Discount rate must be between 0% and 30%');
  }

  if (inputs.gstTaxRate < 0 || inputs.gstTaxRate > 100) {
    errors.push('GST tax rate must be between 0% and 100%');
  }

  if (inputs.estateTaxRate < 0 || inputs.estateTaxRate > 100) {
    errors.push('Estate tax rate must be between 0% and 100%');
  }

  return errors;
}
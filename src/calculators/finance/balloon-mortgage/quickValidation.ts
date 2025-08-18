import { CalculatorInput } from '../../../types/Calculator';

export function validateBalloonMortgageInputs(inputs: Record<string, any>): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = ['loanAmount', 'interestRate', 'balloonTerm', 'amortizationPeriod'];
  
  for (const field of requiredFields) {
    if (!inputs[field] || Number(inputs[field]) <= 0) {
      errors.push(`${field} is required and must be greater than 0`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Convert to numbers for validation
  const loanAmount = Number(inputs.loanAmount);
  const interestRate = Number(inputs.interestRate);
  const balloonTerm = Number(inputs.balloonTerm);
  const amortizationPeriod = Number(inputs.amortizationPeriod);
  const downPayment = Number(inputs.downPayment) || 0;
  const expectedAppreciation = Number(inputs.expectedAppreciation) || 3;
  const refinanceRate = Number(inputs.refinanceRate) || interestRate + 0.5;

  // Range validations
  if (loanAmount < 50000 || loanAmount > 10000000) {
    errors.push('Loan amount must be between $50,000 and $10,000,000');
  }

  if (interestRate < 1 || interestRate > 15) {
    errors.push('Interest rate must be between 1% and 15%');
  }

  if (balloonTerm < 1 || balloonTerm > 10) {
    errors.push('Balloon term must be between 1 and 10 years');
  }

  if (amortizationPeriod < 15 || amortizationPeriod > 40) {
    errors.push('Amortization period must be between 15 and 40 years');
  }

  if (downPayment < 0 || downPayment >= loanAmount) {
    errors.push('Down payment must be between $0 and loan amount');
  }

  // Cross-field validations
  if (balloonTerm >= amortizationPeriod) {
    errors.push('Balloon term must be less than amortization period');
  }

  // Business logic warnings
  const downPaymentPercent = (downPayment / loanAmount) * 100;
  if (downPaymentPercent < 10) {
    warnings.push('Low down payment (< 10%) increases balloon mortgage risk');
  }

  if (balloonTerm <= 3) {
    warnings.push('Short balloon term requires quick exit strategy execution');
  } else if (balloonTerm >= 8) {
    warnings.push('Long balloon term increases market uncertainty');
  }

  const rateIncrease = refinanceRate - interestRate;
  if (rateIncrease > 2) {
    warnings.push('Significant rate increase expected - high refinancing risk');
  }

  if (expectedAppreciation < 0) {
    warnings.push('Negative appreciation expected - increases balloon payment risk');
  } else if (expectedAppreciation > 6) {
    warnings.push('High appreciation expectations may be optimistic');
  }

  // Risk assessment
  let riskFactors = 0;
  if (balloonTerm >= 7) riskFactors++;
  if (downPaymentPercent < 15) riskFactors++;
  if (rateIncrease > 1) riskFactors++;
  if (expectedAppreciation < 2) riskFactors++;

  if (riskFactors >= 3) {
    warnings.push('High-risk balloon mortgage - consider alternatives');
  } else if (riskFactors >= 2) {
    warnings.push('Moderate-risk balloon mortgage - ensure solid exit strategy');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
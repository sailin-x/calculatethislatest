import { CalculatorInput } from '../../../types/Calculator';

export function validateARMvsFixedInputs(inputs: Record<string, any>): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = ['loanAmount', 'fixedRate', 'armInitialRate', 'armInitialPeriod', 'loanTerm', 'armMargin', 'currentIndexRate'];
  
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
  const fixedRate = Number(inputs.fixedRate);
  const armInitialRate = Number(inputs.armInitialRate);
  const armInitialPeriod = Number(inputs.armInitialPeriod);
  const loanTerm = Number(inputs.loanTerm);
  const armMargin = Number(inputs.armMargin);
  const currentIndexRate = Number(inputs.currentIndexRate);
  const armPeriodicCap = Number(inputs.armPeriodicCap) || 2;
  const armLifetimeCap = Number(inputs.armLifetimeCap) || 5;

  // Range validations
  if (loanAmount < 50000 || loanAmount > 10000000) {
    errors.push('Loan amount must be between $50,000 and $10,000,000');
  }

  if (fixedRate < 1 || fixedRate > 15) {
    errors.push('Fixed rate must be between 1% and 15%');
  }

  if (armInitialRate < 1 || armInitialRate > 15) {
    errors.push('ARM initial rate must be between 1% and 15%');
  }

  if (armInitialPeriod < 1 || armInitialPeriod > 10) {
    errors.push('ARM initial period must be between 1 and 10 years');
  }

  if (loanTerm < 15 || loanTerm > 40) {
    errors.push('Loan term must be between 15 and 40 years');
  }

  if (armMargin < 1 || armMargin > 6) {
    errors.push('ARM margin must be between 1% and 6%');
  }

  if (currentIndexRate < 0 || currentIndexRate > 10) {
    errors.push('Current index rate must be between 0% and 10%');
  }

  // Cross-field validations
  if (armInitialPeriod >= loanTerm) {
    errors.push('ARM initial period must be less than loan term');
  }

  if (armPeriodicCap > armLifetimeCap) {
    errors.push('ARM periodic cap cannot exceed lifetime cap');
  }

  // Business logic warnings
  const fullyIndexedRate = currentIndexRate + armMargin;
  if (Math.abs(armInitialRate - fullyIndexedRate) > 2) {
    warnings.push('ARM initial rate significantly differs from index + margin - verify this is a teaser rate');
  }

  if (armInitialRate > fixedRate) {
    warnings.push('ARM initial rate is higher than fixed rate - unusual market condition');
  }

  const maxRate = armInitialRate + armLifetimeCap;
  const maxPaymentIncrease = ((maxRate / armInitialRate) - 1) * 100;
  if (maxPaymentIncrease > 50) {
    warnings.push(`ARM payment could increase by up to ${maxPaymentIncrease.toFixed(0)}% if rates hit lifetime cap`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
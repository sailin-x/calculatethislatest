import { ValidationResult } from './validation';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Property value is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property value must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  // Cross-validation with loan amount
  if (allInputs?.loanAmount) {
    const loanAmount = Number(allInputs.loanAmount);
    if (!isNaN(loanAmount) && loanAmount > numValue) {
      warnings.push('Loan amount exceeds property value (negative equity)');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Loan amount is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Loan amount must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue <= 0) {
    errors.push('Loan amount must be greater than 0');
  }

  // Cross-validation with property value
  if (allInputs?.propertyValue) {
    const propertyValue = Number(allInputs.propertyValue);
    if (!isNaN(propertyValue)) {
      const ltv = (numValue / propertyValue) * 100;
      if (ltv > 95) {
        warnings.push('Loan-to-value ratio is very high (>95%)');
      }
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Interest rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Interest rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 50) {
    errors.push('Interest rate must be between 0% and 50%');
  } else if (numValue < 2) {
    warnings.push('Interest rate is unusually low');
  } else if (numValue > 15) {
    warnings.push('Interest rate is unusually high');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Loan term is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Loan term must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1 || numValue > 50) {
    errors.push('Loan term must be between 1 and 50 years');
  } else if (numValue < 5) {
    warnings.push('Very short loan term');
  } else if (numValue > 30) {
    warnings.push('Very long loan term');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Down payment is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Down payment must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Down payment cannot be negative');
  }

  // Cross-validation with property value
  if (allInputs?.propertyValue) {
    const propertyValue = Number(allInputs.propertyValue);
    if (!isNaN(propertyValue)) {
      const downPaymentRatio = (numValue / propertyValue) * 100;
      if (downPaymentRatio < 5) {
        warnings.push('Down payment is below typical minimum (5%)');
      } else if (downPaymentRatio >= 20) {
        warnings.push('Excellent down payment - may avoid PMI');
      }
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMonthlyRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Monthly rent is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Monthly rent must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue <= 0) {
    errors.push('Monthly rent must be greater than 0');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Annual income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Annual income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue <= 0) {
    errors.push('Annual income must be greater than 0');
  } else if (numValue < 30000) {
    warnings.push('Annual income is below typical qualification thresholds');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Property appreciation rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property appreciation rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < -20 || numValue > 20) {
    errors.push('Property appreciation rate must be between -20% and 20%');
  } else if (numValue > 10) {
    warnings.push('Property appreciation rate is unusually high');
  } else if (numValue < -5) {
    warnings.push('Property appreciation rate is unusually low (depreciation)');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateInvestmentReturnRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Investment return rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Investment return rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 30) {
    errors.push('Investment return rate must be between 0% and 30%');
  } else if (numValue > 15) {
    warnings.push('Investment return rate is unusually high');
  } else if (numValue < 3) {
    warnings.push('Investment return rate is unusually low');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Analysis period is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Analysis period must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1 || numValue > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  } else if (numValue < 3) {
    warnings.push('Very short analysis period');
  } else if (numValue > 20) {
    warnings.push('Very long analysis period');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateRentIncreaseRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Rent increase rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Rent increase rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 20) {
    errors.push('Rent increase rate must be between 0% and 20%');
  } else if (numValue > 10) {
    warnings.push('Rent increase rate is unusually high');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMarginalTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Marginal tax rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Marginal tax rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 50) {
    errors.push('Marginal tax rate must be between 0% and 50%');
  } else if (numValue > 40) {
    warnings.push('Marginal tax rate is unusually high');
  }

  return { isValid: errors.length === 0, errors, warnings };
}
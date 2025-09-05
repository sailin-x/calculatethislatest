import { ValidationResult } from './validation';

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
  } else if (numValue < 50000) {
    warnings.push('Loan amount is below typical minimum thresholds');
  } else if (numValue > 10000000) {
    warnings.push('Loan amount exceeds typical maximum thresholds');
  }

  // Cross-validation with property value
  if (allInputs?.propertyValue) {
    const propertyValue = Number(allInputs.propertyValue);
    if (!isNaN(propertyValue) && numValue > propertyValue) {
      warnings.push('Loan amount exceeds property value (negative equity)');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLockedRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Locked rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Locked rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 50) {
    errors.push('Locked rate must be between 0% and 50%');
  } else if (numValue < 2) {
    warnings.push('Locked rate is unusually low');
  } else if (numValue > 15) {
    warnings.push('Locked rate is unusually high');
  }

  // Cross-validation with current market rate
  if (allInputs?.currentMarketRate) {
    const currentRate = Number(allInputs.currentMarketRate);
    if (!isNaN(currentRate)) {
      const rateDifference = Math.abs(numValue - currentRate);
      if (rateDifference > 2) {
        warnings.push('Large difference between locked rate and current market rate');
      }
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCurrentMarketRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Current market rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Current market rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 50) {
    errors.push('Current market rate must be between 0% and 50%');
  } else if (numValue < 2) {
    warnings.push('Current market rate is unusually low');
  } else if (numValue > 15) {
    warnings.push('Current market rate is unusually high');
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

export function validateLoanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value) {
    errors.push('Loan type is required');
    return { isValid: false, errors, warnings };
  }

  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];
  if (!validTypes.includes(value)) {
    errors.push('Invalid loan type');
    return { isValid: false, errors, warnings };
  }

  // Business rule validations
  if (allInputs?.loanAmount) {
    const loanAmount = Number(allInputs.loanAmount);
    if (!isNaN(loanAmount)) {
      if (value === 'jumbo' && loanAmount < 647200) {
        warnings.push('Loan amount may not qualify as jumbo loan');
      }
      if (value === 'fha' && loanAmount > 420680) {
        warnings.push('Loan amount may exceed FHA limits');
      }
    }
  }

  if (allInputs?.borrowerDebtToIncomeRatio) {
    const dti = Number(allInputs.borrowerDebtToIncomeRatio);
    if (!isNaN(dti)) {
      if (value === 'va' && dti > 41) {
        warnings.push('Debt-to-income ratio may exceed VA loan guidelines');
      }
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePaymentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value) {
    errors.push('Payment type is required');
    return { isValid: false, errors, warnings };
  }

  const validTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validTypes.includes(value)) {
    errors.push('Invalid payment type');
    return { isValid: false, errors, warnings };
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLockDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value) {
    errors.push('Lock date is required');
    return { isValid: false, errors, warnings };
  }

  const lockDate = new Date(value);
  if (isNaN(lockDate.getTime())) {
    errors.push('Invalid lock date format');
    return { isValid: false, errors, warnings };
  }

  const today = new Date();
  if (lockDate > today) {
    warnings.push('Lock date is in the future');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLockExpirationDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value) {
    errors.push('Lock expiration date is required');
    return { isValid: false, errors, warnings };
  }

  const expirationDate = new Date(value);
  if (isNaN(expirationDate.getTime())) {
    errors.push('Invalid lock expiration date format');
    return { isValid: false, errors, warnings };
  }

  const today = new Date();
  if (expirationDate < today) {
    warnings.push('Lock has already expired');
  }

  // Cross-validation with lock date
  if (allInputs?.lockDate) {
    const lockDate = new Date(allInputs.lockDate);
    if (!isNaN(lockDate.getTime()) && expirationDate <= lockDate) {
      errors.push('Lock expiration date must be after lock date');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLockDuration(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Lock duration is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Lock duration must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1 || numValue > 365) {
    errors.push('Lock duration must be between 1 and 365 days');
  } else if (numValue < 15) {
    warnings.push('Very short lock duration');
  } else if (numValue > 90) {
    warnings.push('Very long lock duration');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLockType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value) {
    errors.push('Lock type is required');
    return { isValid: false, errors, warnings };
  }

  const validTypes = ['free', 'paid', 'float_down', 'extended'];
  if (!validTypes.includes(value)) {
    errors.push('Invalid lock type');
    return { isValid: false, errors, warnings };
  }

  // Business rule validations
  if (allInputs?.lockFee !== undefined) {
    const lockFee = Number(allInputs.lockFee);
    if (!isNaN(lockFee)) {
      if (value === 'paid' && lockFee === 0) {
        warnings.push('Paid lock type selected but no lock fee specified');
      }
      if (value === 'free' && lockFee > 0) {
        warnings.push('Free lock type selected but lock fee is specified');
      }
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLockFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Lock fee must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Lock fee cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

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

export function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value || value.trim().length === 0) {
    errors.push('Property address is required');
    return { isValid: false, errors, warnings };
  }

  if (value.trim().length < 10) {
    warnings.push('Property address seems incomplete');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value) {
    errors.push('Property type is required');
    return { isValid: false, errors, warnings };
  }

  const validTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'];
  if (!validTypes.includes(value)) {
    errors.push('Invalid property type');
    return { isValid: false, errors, warnings };
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Property size is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property size must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue <= 0) {
    errors.push('Property size must be greater than 0');
  } else if (numValue < 500) {
    warnings.push('Property size is unusually small');
  } else if (numValue > 10000) {
    warnings.push('Property size is unusually large');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property age must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Property age cannot be negative');
  } else if (numValue > 200) {
    warnings.push('Property age is unusually old');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateEstimatedClosingDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value) {
    errors.push('Estimated closing date is required');
    return { isValid: false, errors, warnings };
  }

  const closingDate = new Date(value);
  if (isNaN(closingDate.getTime())) {
    errors.push('Invalid estimated closing date format');
    return { isValid: false, errors, warnings };
  }

  const today = new Date();
  if (closingDate < today) {
    warnings.push('Estimated closing date is in the past');
  }

  // Cross-validation with lock expiration
  if (allInputs?.lockExpirationDate) {
    const expirationDate = new Date(allInputs.lockExpirationDate);
    if (!isNaN(expirationDate.getTime()) && closingDate > expirationDate) {
      warnings.push('Estimated closing date is after lock expiration');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Borrower income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue <= 0) {
    errors.push('Borrower income must be greater than 0');
  } else if (numValue < 30000) {
    warnings.push('Borrower income is below typical qualification thresholds');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Borrower credit score is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower credit score must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 300 || numValue > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  } else if (numValue < 620) {
    warnings.push('Credit score is below typical qualification thresholds');
  } else if (numValue >= 740) {
    warnings.push('Excellent credit score - may qualify for best rates');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Debt-to-income ratio is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Debt-to-income ratio must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 100) {
    errors.push('Debt-to-income ratio must be between 0% and 100%');
  } else if (numValue > 43) {
    warnings.push('Debt-to-income ratio exceeds typical qualification limits');
  } else if (numValue <= 28) {
    warnings.push('Excellent debt-to-income ratio');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMarketLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value || value.trim().length === 0) {
    errors.push('Market location is required');
    return { isValid: false, errors, warnings };
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMarketCondition(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value) {
    errors.push('Market condition is required');
    return { isValid: false, errors, warnings };
  }

  const validConditions = ['declining', 'stable', 'growing', 'volatile'];
  if (!validConditions.includes(value)) {
    errors.push('Invalid market condition');
    return { isValid: false, errors, warnings };
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateRiskTolerance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value) {
    errors.push('Risk tolerance is required');
    return { isValid: false, errors, warnings };
  }

  const validTolerances = ['conservative', 'moderate', 'aggressive'];
  if (!validTolerances.includes(value)) {
    errors.push('Invalid risk tolerance');
    return { isValid: false, errors, warnings };
  }

  return { isValid: errors.length === 0, errors, warnings };
}
import { ValidationResult } from '../../types/calculator';

export function validateInitialInvestment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { initialInvestment: 'Initial investment must be greater than $0' } };
  }
  if (value < 1000) {
    return { isValid: false, errors: { initialInvestment: 'Initial investment must be at least $1,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { initialInvestment: 'Initial investment cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHoldingPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { holdingPeriod: 'Holding period must be greater than 0 years' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { holdingPeriod: 'Holding period must be at least 1 year' } };
  }
  if (value > 10) {
    return { isValid: false, errors: { holdingPeriod: 'Holding period cannot exceed 10 years' } };
  }
  if (value < 5) {
    return { isValid: false, errors: { holdingPeriod: 'Holding period must be at least 5 years for Opportunity Zone benefits' } };
  }
  if (value < 7) {
    return { isValid: false, errors: { holdingPeriod: 'Holding period must be at least 7 years for full tax benefits' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < -10) {
    return { isValid: false, errors: { appreciationRate: 'Appreciation rate cannot be less than -10%' } };
  }
  if (value > 30) {
    return { isValid: false, errors: { appreciationRate: 'Appreciation rate cannot exceed 30%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRentalYield(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { rentalYield: 'Rental yield cannot be negative' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { rentalYield: 'Rental yield cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCapitalGainsTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { capitalGainsTax: 'Capital gains tax rate cannot be negative' } };
  }
  if (value > 40) {
    return { isValid: false, errors: { capitalGainsTax: 'Capital gains tax rate cannot exceed 40%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { stateTaxRate: 'State tax rate cannot be negative' } };
  }
  if (value > 15) {
    return { isValid: false, errors: { stateTaxRate: 'State tax rate cannot exceed 15%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDeferralPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 1) {
    return { isValid: false, errors: { deferralPeriod: 'Deferral period must be at least 1 year' } };
  }
  if (value > 10) {
    return { isValid: false, errors: { deferralPeriod: 'Deferral period cannot exceed 10 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStepUpPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { stepUpPercentage: 'Step-up percentage cannot be negative' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { stepUpPercentage: 'Step-up percentage cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFullExclusionPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { fullExclusionPercentage: 'Full exclusion percentage cannot be negative' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { fullExclusionPercentage: 'Full exclusion percentage cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLeverageRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { leverageRatio: 'Leverage ratio cannot be negative' } };
  }
  if (value > 90) {
    return { isValid: false, errors: { leverageRatio: 'Leverage ratio cannot exceed 90%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { interestRate: 'Interest rate cannot be negative' } };
  }
  if (value > 15) {
    return { isValid: false, errors: { interestRate: 'Interest rate cannot exceed 15%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateManagementFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { managementFees: 'Management fees cannot be negative' } };
  }
  if (value > 5) {
    return { isValid: false, errors: { managementFees: 'Management fees cannot exceed 5%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTransactionFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { transactionFees: 'Transaction fees cannot be negative' } };
  }
  if (value > 5) {
    return { isValid: false, errors: { transactionFees: 'Transaction fees cannot exceed 5%' } };
  }
  return { isValid: true, errors: {} };
}
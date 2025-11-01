import { CharitableRemainderTrustInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateInitialContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Initial contribution must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Initial contribution seems unusually high' };
  }
  return { isValid: true };
}

export function validateTrustType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['charitable_remainder_annuity_trust', 'charitable_remainder_unitrust'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Trust type must be annuity trust or unitrust' };
  }
  return { isValid: true };
}

export function validatePayoutRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 5) {
    return { isValid: false, message: 'Payout rate must be at least 5%' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Payout rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateBeneficiaryAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Beneficiary age must be at least 18' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Beneficiary age cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Life expectancy must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Life expectancy seems unusually high' };
  }
  return { isValid: true };
}

export function validateNumberOfBeneficiaries(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Number of beneficiaries must be at least 1' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Number of beneficiaries seems unusually high' };
  }
  return { isValid: true };
}

export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < -10) {
    return { isValid: false, message: 'Expected annual return cannot be less than -10%' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Expected annual return seems unusually high (>30%)' };
  }
  return { isValid: true };
}

export function validateInvestmentFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Investment fees cannot be negative' };
  }
  if (value > 5) {
    return { isValid: false, message: 'Investment fees seem unusually high (>5%)' };
  }
  return { isValid: true };
}

export function validateCurrentTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Current tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Current tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateOrdinaryIncomeTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Ordinary income tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Ordinary income tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateCharitableDeductionRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Charitable deduction rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Charitable deduction rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateTrustDuration(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Trust duration must be greater than 0 years' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Trust duration cannot exceed 30 years' };
  }
  return { isValid: true };
}

export function validateRemainderBeneficiary(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: 'Remainder beneficiary is required' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < -5) {
    return { isValid: false, message: 'Inflation rate cannot be less than -5%' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Inflation rate seems unusually high (>10%)' };
  }
  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validPeriods = ['annual', 'monthly'];
  if (!validPeriods.includes(value)) {
    return { isValid: false, message: 'Analysis period must be annual or monthly' };
  }
  return { isValid: true };
}
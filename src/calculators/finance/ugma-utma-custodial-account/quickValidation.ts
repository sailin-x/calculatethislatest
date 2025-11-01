import { UGMACustodialAccountInputs } from './types';

export function validateInitialContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Initial contribution cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, message: 'Initial contribution cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Annual contribution cannot be negative' };
  }
  if (value > 18000) {
    return { isValid: false, message: 'Annual contribution exceeds gift tax exclusion limit ($18,000)' };
  }
  return { isValid: true };
}

export function validateExpectedReturnRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 25) {
    return { isValid: false, message: 'Expected return rate must be between -10% and 25%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 10) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 10%' };
  }
  return { isValid: true };
}

export function validateChildAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 0) {
    return { isValid: false, message: 'Child age must be 0 or greater' };
  }
  if (value > 17) {
    return { isValid: false, message: 'Child age should be under 18 for optimal custodial account benefits' };
  }
  return { isValid: true };
}

export function validateCustodialAccountType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !['UGMA', 'UTMA'].includes(value)) {
    return { isValid: false, message: 'Custodial account type must be UGMA or UTMA' };
  }
  return { isValid: true };
}

export function validateState(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.length !== 2) {
    return { isValid: false, message: 'Please select a valid state' };
  }
  return { isValid: true };
}

export function validateTaxYear(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 2020 || value > 2030) {
    return { isValid: false, message: 'Tax year must be between 2020 and 2030' };
  }
  return { isValid: true };
}

export function validateGiftTaxExclusionUsed(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 18000) {
    return { isValid: false, message: 'Gift tax exclusion used must be between 0 and $18,000' };
  }
  return { isValid: true };
}
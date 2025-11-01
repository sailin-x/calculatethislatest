import { TrustFundDistributionInputs } from './types';

export function validateTrustPrincipal(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Trust principal must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Trust principal cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Annual income cannot be negative' };
  }
  return { isValid: true };
}

export function validateBeneficiaryAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 0) {
    return { isValid: false, message: 'Beneficiary age must be 0 or greater' };
  }
  if (value > 120) {
    return { isValid: false, message: 'Beneficiary age cannot exceed 120' };
  }
  return { isValid: true };
}

export function validateTrustDuration(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Trust duration must be at least 1 year' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Trust duration cannot exceed 100 years' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 20) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 20%' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Tax rate must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateNumberOfBeneficiaries(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Number of beneficiaries must be at least 1' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Number of beneficiaries cannot exceed 20' };
  }
  return { isValid: true };
}

export function validateInvestmentReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -20 || value > 30) {
    return { isValid: false, message: 'Investment return must be between -20% and 30%' };
  }
  return { isValid: true };
}

export function validateAdministrativeCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Administrative costs must be 0 or greater' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Administrative costs cannot exceed 10%' };
  }
  return { isValid: true };
}
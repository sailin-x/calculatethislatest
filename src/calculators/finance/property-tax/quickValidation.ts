import { ValidationResult } from '../../types/calculator';

export function validateAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { assessedValue: 'Assessed property value must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { assessedValue: 'Assessed value must be at least $10,000' } };
  }
  if (value > 20000000) {
    return { isValid: false, errors: { assessedValue: 'Assessed value cannot exceed $20,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMarketValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value <= 0) {
    return { isValid: false, errors: { marketValue: 'Market value must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { marketValue: 'Market value must be at least $10,000' } };
  }
  if (value > 20000000) {
    return { isValid: false, errors: { marketValue: 'Market value cannot exceed $20,000,000' } };
  }
  if (allInputs?.assessedValue && value < allInputs.assessedValue * 0.5) {
    return { isValid: false, errors: { marketValue: 'Market value should not be less than 50% of assessed value' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { taxRate: 'Property tax rate must be greater than 0%' } };
  }
  if (value < 0.1) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be at least 0.1%' } };
  }
  if (value > 5) {
    return { isValid: false, errors: { taxRate: 'Tax rate cannot exceed 5%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxRateType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { taxRateType: 'Tax rate type is required' } };
  }
  const validTypes = ['percentage', 'mills'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { taxRateType: 'Invalid tax rate type selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHomesteadExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { homesteadExemption: 'Homestead exemption cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { homesteadExemption: 'Homestead exemption cannot exceed $100,000' } };
  }
  if (allInputs?.assessedValue && value > allInputs.assessedValue) {
    return { isValid: false, errors: { homesteadExemption: 'Homestead exemption cannot exceed assessed value' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSeniorExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { seniorExemption: 'Senior exemption cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { seniorExemption: 'Senior exemption cannot exceed $50,000' } };
  }
  if (allInputs?.assessedValue) {
    const homesteadExemption = allInputs.homesteadExemption || 0;
    const remainingValue = allInputs.assessedValue - homesteadExemption;
    if (value > remainingValue) {
      return { isValid: false, errors: { seniorExemption: 'Senior exemption cannot exceed remaining value after homestead exemption' } };
    }
  }
  return { isValid: true, errors: {} };
}

export function validateDisabilityExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { disabilityExemption: 'Disability exemption cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { disabilityExemption: 'Disability exemption cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOtherExemptions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { otherExemptions: 'Other exemptions cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { otherExemptions: 'Other exemptions cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePaymentFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { paymentFrequency: 'Payment frequency is required' } };
  }
  const validFrequencies = ['annual', 'semi-annual', 'quarterly', 'monthly'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, errors: { paymentFrequency: 'Invalid payment frequency selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAssessmentRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 50) {
    return { isValid: false, errors: { assessmentRatio: 'Assessment ratio must be at least 50%' } };
  }
  if (value > 150) {
    return { isValid: false, errors: { assessmentRatio: 'Assessment ratio cannot exceed 150%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLastAssessmentYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 1900) {
    return { isValid: false, errors: { lastAssessmentYear: 'Assessment year must be 1900 or later' } };
  }
  const currentYear = new Date().getFullYear();
  if (value > currentYear) {
    return { isValid: false, errors: { lastAssessmentYear: 'Assessment year cannot be in the future' } };
  }
  return { isValid: true, errors: {} };
}
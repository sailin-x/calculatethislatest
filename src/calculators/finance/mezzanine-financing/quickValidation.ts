import { ValidationResult } from '../../types/calculator';

export function validateProjectValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Project value must be a valid number' };
  }
  if (value < 100000) {
    return { isValid: false, message: 'Project value must be at least $100,000' };
  }
  if (value > 1000000000) {
    return { isValid: false, message: 'Project value seems unusually high' };
  }
  return { isValid: true };
}

export function validateSeniorLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Senior loan amount must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Senior loan amount cannot be negative' };
  }
  if (allInputs && allInputs?.projectValue && value > allInputs?.projectValue) {
    return { isValid: false, message: 'Senior loan amount cannot exceed project value' };
  }
  return { isValid: true };
}

export function validateMezzanineLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mezzanine loan amount must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Mezzanine loan amount cannot be negative' };
  }
  if (allInputs && allInputs?.projectValue && value > allInputs?.projectValue) {
    return { isValid: false, message: 'Mezzanine loan amount cannot exceed project value' };
  }
  return { isValid: true };
}

export function validateEquityContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Equity contribution must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Equity contribution cannot be negative' };
  }
  return { isValid: true };
}

export function validateSeniorLoanRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Senior loan rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Senior loan rate cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Senior loan rate seems unusually high' };
  }
  return { isValid: true };
}

export function validateMezzanineLoanRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mezzanine loan rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Mezzanine loan rate cannot be negative' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Mezzanine loan rate seems unusually high' };
  }
  return { isValid: true };
}

export function validateSeniorLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Senior loan term must be a valid number' };
  }
  if (value < 1) {
    return { isValid: false, message: 'Senior loan term must be at least 1 year' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Senior loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateMezzanineLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mezzanine loan term must be a valid number' };
  }
  if (value < 1) {
    return { isValid: false, message: 'Mezzanine loan term must be at least 1 year' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Mezzanine loan term cannot exceed 20 years' };
  }
  return { isValid: true };
}

export function validateProjectTimeline(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Project timeline must be a valid number' };
  }
  if (value < 6) {
    return { isValid: false, message: 'Project timeline must be at least 6 months' };
  }
  if (value > 60) {
    return { isValid: false, message: 'Project timeline cannot exceed 60 months' };
  }
  return { isValid: true };
}

export function validateExpectedExitValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Expected exit value must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Expected exit value cannot be negative' };
  }
  return { isValid: true };
}

export function validateExitTimeline(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Exit timeline must be a valid number' };
  }
  if (value < 12) {
    return { isValid: false, message: 'Exit timeline must be at least 12 months' };
  }
  if (value > 120) {
    return { isValid: false, message: 'Exit timeline cannot exceed 120 months' };
  }
  return { isValid: true };
}

export function validateMezzanineFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mezzanine fees must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Mezzanine fees cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, message: 'Mezzanine fees seem unusually high' };
  }
  return { isValid: true };
}

export function validateMezzanineEquityKicker(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mezzanine equity kicker must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Mezzanine equity kicker cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Mezzanine equity kicker cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateOperatingExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Operating expenses must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Operating expenses cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Operating expenses seem unusually high' };
  }
  return { isValid: true };
}

export function validateVacancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Vacancy rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Vacancy rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Vacancy rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validatePropertyTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property tax rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Property tax rate cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Property tax rate cannot exceed 10%' };
  }
  return { isValid: true };
}

export function validateInsuranceRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Insurance rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Insurance rate cannot be negative' };
  }
  if (value > 5) {
    return { isValid: false, message: 'Insurance rate cannot exceed 5%' };
  }
  return { isValid: true };
}

export function validateManagementFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Management fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Management fee cannot be negative' };
  }
  if (value > 15) {
    return { isValid: false, message: 'Management fee cannot exceed 15%' };
  }
  return { isValid: true };
}

export function validateMezzanineLTV(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mezzanine LTV must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Mezzanine LTV cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Mezzanine LTV cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateSeniorLTV(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Senior LTV must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Senior LTV cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Senior LTV cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateMezzanineDSCR(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mezzanine DSCR must be a valid number' };
  }
  if (value < 1) {
    return { isValid: false, message: 'Mezzanine DSCR must be at least 1.0' };
  }
  if (value > 3) {
    return { isValid: false, message: 'Mezzanine DSCR cannot exceed 3.0' };
  }
  return { isValid: true };
}

export function validateSeniorDSCR(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Senior DSCR must be a valid number' };
  }
  if (value < 1) {
    return { isValid: false, message: 'Senior DSCR must be at least 1.0' };
  }
  if (value > 3) {
    return { isValid: false, message: 'Senior DSCR cannot exceed 3.0' };
  }
  return { isValid: true };
}

export function validateMezzaninePrepaymentPenalty(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mezzanine prepayment penalty must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Mezzanine prepayment penalty cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Mezzanine prepayment penalty cannot exceed 10%' };
  }
  return { isValid: true };
}

export function validateMezzanineOriginationFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mezzanine origination fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Mezzanine origination fee cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Mezzanine origination fee cannot exceed 10%' };
  }
  return { isValid: true };
}

export function validateMezzanineExitFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mezzanine exit fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Mezzanine exit fee cannot be negative' };
  }
  if (value > 5) {
    return { isValid: false, message: 'Mezzanine exit fee cannot exceed 5%' };
  }
  return { isValid: true };
}

export function validateAllMezzanineFinancingInputs(inputs: Record<string, any>): ValidationResult {
  const validators = [
    validateProjectValue,
    validateSeniorLoanAmount,
    validateMezzanineLoanAmount,
    validateEquityContribution,
    validateSeniorLoanRate,
    validateMezzanineLoanRate,
    validateSeniorLoanTerm,
    validateMezzanineLoanTerm,
    validateProjectTimeline,
    validateExpectedExitValue,
    validateExitTimeline,
    validateMezzanineFees,
    validateMezzanineEquityKicker,
    validateOperatingExpenses,
    validateVacancyRate,
    validatePropertyTaxRate,
    validateInsuranceRate,
    validateManagementFee,
    validateMezzanineLTV,
    validateSeniorLTV,
    validateMezzanineDSCR,
    validateSeniorDSCR,
    validateMezzaninePrepaymentPenalty,
    validateMezzanineOriginationFee,
    validateMezzanineExitFee
  ];

  for (const validator of validators) {
    const fieldName = validator.name.replace('validate', '').replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
    const value = inputs[fieldName];
    const result = validator(value, inputs);
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true };
}

import { ValidationResult } from '../../types/validation';

// Individual field validation functions with allInputs parameter (required by completion standards)
export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: ['Property value must be greater than 0'] };
  }

  if (value > 1000000000) {
    return { isValid: false, errors: ['Property value seems unreasonably high'] };
  }

  return { isValid: true, errors: [] };
}

export function validatePurchasePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: ['Purchase price must be greater than 0'] };
  }

  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, errors: ['Purchase price cannot exceed property value'] };
  }

  return { isValid: true, errors: [] };
}

export function validateSeniorLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: ['Senior loan amount must be greater than 0'] };
  }

  if (allInputs?.propertyValue && value > allInputs.propertyValue * 0.75) {
    return { isValid: false, errors: ['Senior loan amount cannot exceed 75% of property value'] };
  }

  return { isValid: true, errors: [] };
}

export function validateMezzanineLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: ['Mezzanine loan amount must be greater than 0'] };
  }

  if (allInputs?.propertyValue && allInputs?.seniorLoanAmount) {
    const totalLTV = ((allInputs.seniorLoanAmount + value) / allInputs.propertyValue) * 100;
    if (totalLTV > 95) {
      return { isValid: false, errors: ['Total LoanToValue ratio cannot exceed 95%'] };
    }
  }

  return { isValid: true, errors: [] };
}

export function validateEquityContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: ['Equity contribution must be greater than 0'] };
  }

  if (allInputs?.purchasePrice && value > allInputs.purchasePrice) {
    return { isValid: false, errors: ['Equity contribution cannot exceed purchase price'] };
  }

  return { isValid: true, errors: [] };
}

export function validateSeniorInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0 || value > 20) {
    return { isValid: false, errors: ['Senior interest rate must be between 0% and 20%'] };
  }

  return { isValid: true, errors: [] };
}

export function validateMezzanineInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0 || value > 30) {
    return { isValid: false, errors: ['Mezzanine interest rate must be between 0% and 30%'] };
  }

  if (allInputs?.seniorInterestRate && value <= allInputs.seniorInterestRate) {
    return { isValid: false, errors: ['Mezzanine interest rate must be higher than senior interest rate'] };
  }

  return { isValid: true, errors: [] };
}

export function validateSeniorLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0 || value > 30) {
    return { isValid: false, errors: ['Senior loan term must be between 1 and 30 years'] };
  }

  return { isValid: true, errors: [] };
}

export function validateMezzanineLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0 || value > 10) {
    return { isValid: false, errors: ['Mezzanine loan term must be between 1 and 10 years'] };
  }

  if (allInputs?.seniorLoanTerm && value > allInputs.seniorLoanTerm) {
    return { isValid: false, errors: ['Mezzanine loan term cannot exceed senior loan term'] };
  }

  return { isValid: true, errors: [] };
}

export function validateNetOperatingIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: ['Net operating income must be greater than 0'] };
  }

  return { isValid: true, errors: [] };
}

// Cross-field validation functions
export function validateTotalFinancing(allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) {
    return { isValid: true, errors: [] };
  }

  const { seniorLoanAmount, mezzanineLoanAmount, equityContribution, purchasePrice } = allInputs;
  if (seniorLoanAmount && mezzanineLoanAmount && equityContribution && purchasePrice) {
    const totalFinancing = seniorLoanAmount + mezzanineLoanAmount + equityContribution;
    if (Math.abs(totalFinancing - purchasePrice) > 1000) {
      return { isValid: false, errors: ['Total financing must equal purchase price'] };
    }
  }

  return { isValid: true, errors: [] };
}

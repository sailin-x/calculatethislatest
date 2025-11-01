import { PropertyTaxProrationInputs } from './types';

export function validateSalePrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Sale price must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Sale price cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateClosingDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Closing date is required' };
  }
  return { isValid: true };
}

export function validateTaxYearStart(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Tax year start date is required' };
  }
  return { isValid: true };
}

export function validateTaxYearEnd(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Tax year end date is required' };
  }
  if (allInputs?.taxYearStart && value) {
    const startDate = new Date(allInputs.taxYearStart);
    const endDate = new Date(value);
    if (endDate <= startDate) {
      return { isValid: false, message: 'Tax year end must be after tax year start' };
    }
  }
  return { isValid: true };
}

export function validateAnnualPropertyTax(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Annual property tax cannot be negative' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Tax rate must be 0 or greater' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Tax rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateAssessedValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Assessed value cannot be negative' };
  }
  return { isValid: true };
}

export function validateBuyerName(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !value.trim()) {
    return { isValid: false, message: 'Buyer name is required' };
  }
  return { isValid: true };
}

export function validateSellerName(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !value.trim()) {
    return { isValid: false, message: 'Seller name is required' };
  }
  return { isValid: true };
}

export function validatePropertyAddress(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !value.trim()) {
    return { isValid: false, message: 'Property address is required' };
  }
  return { isValid: true };
}

export function validateState(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !value.trim()) {
    return { isValid: false, message: 'State is required' };
  }
  return { isValid: true };
}

export function validateSpecialAssessments(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Special assessments cannot be negative' };
  }
  return { isValid: true };
}

export function validateTaxOverrides(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Tax overrides cannot be negative' };
  }
  return { isValid: true };
}

export function validateEscrowFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Escrow fees cannot be negative' };
  }
  return { isValid: true };
}

export function validateTitleFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Title fees cannot be negative' };
  }
  return { isValid: true };
}

export function validateRecordingFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Recording fees cannot be negative' };
  }
  return { isValid: true };
}

export function validatePreviousYearTax(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Previous year tax cannot be negative' };
  }
  return { isValid: true };
}

export function validateTaxIncreasePercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -50 || value > 100) {
    return { isValid: false, message: 'Tax increase percentage must be between -50% and 100%' };
  }
  return { isValid: true };
}

export function validateLastTaxPaymentAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Last tax payment amount cannot be negative' };
  }
  return { isValid: true };
}

export function validateClosingAdjustmentDays(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Closing adjustment days cannot be negative' };
  }
  return { isValid: true };
}
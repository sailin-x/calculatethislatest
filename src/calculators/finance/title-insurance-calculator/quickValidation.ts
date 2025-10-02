import { ValidationResult } from '../../types/calculator';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { propertyValue: 'Property value must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { propertyValue: 'Property value must be at least $10,000' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { propertyValue: 'Property value cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePurchasePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { purchasePrice: 'Purchase price must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { purchasePrice: 'Purchase price must be at least $10,000' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { purchasePrice: 'Purchase price cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { loanAmount: 'Loan amount cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { loanAmount: 'Loan amount cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOwnersTitleInsuranceRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 5) {
    return { isValid: false, errors: { ownersTitleInsuranceRate: 'Owner\'s title insurance rate must be between 0% and 5%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLendersTitleInsuranceRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 2) {
    return { isValid: false, errors: { lendersTitleInsuranceRate: 'Lender\'s title insurance rate must be between 0% and 2%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTitleSearchFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { titleSearchFee: 'Title search fee cannot be negative' } };
  }
  if (value > 2000) {
    return { isValid: false, errors: { titleSearchFee: 'Title search fee cannot exceed $2,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTitleExaminationFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { titleExaminationFee: 'Title examination fee cannot be negative' } };
  }
  if (value > 1500) {
    return { isValid: false, errors: { titleExaminationFee: 'Title examination fee cannot exceed $1,500' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDocumentPreparationFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { documentPreparationFee: 'Document preparation fee cannot be negative' } };
  }
  if (value > 1000) {
    return { isValid: false, errors: { documentPreparationFee: 'Document preparation fee cannot exceed $1,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNotaryFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { notaryFee: 'Notary fee cannot be negative' } };
  }
  if (value > 500) {
    return { isValid: false, errors: { notaryFee: 'Notary fee cannot exceed $500' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRecordingFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { recordingFee: 'Recording fee cannot be negative' } };
  }
  if (value > 2000) {
    return { isValid: false, errors: { recordingFee: 'Recording fee cannot exceed $2,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTransferTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 5) {
    return { isValid: false, errors: { transferTaxRate: 'Transfer tax rate must be between 0% and 5%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSettlementDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { settlementDate: 'Settlement date is required' } };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: { settlementDate: 'Invalid date format' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsRefinance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isRefinance: 'Is refinance must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsCashPurchase(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isCashPurchase: 'Is cash purchase must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeEndorsements(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeEndorsements: 'Include endorsements must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEndorsementCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { endorsementCost: 'Endorsement cost cannot be negative' } };
  }
  if (value > 5000) {
    return { isValid: false, errors: { endorsementCost: 'Endorsement cost cannot exceed $5,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeTitleCurative(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeTitleCurative: 'Include title curative must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurativeCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { curativeCost: 'Curative cost cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { curativeCost: 'Curative cost cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}
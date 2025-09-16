import { ValidationResult } from '../../../types/calculator';

export function validateGiftValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { giftValue: 'Gift value cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { giftValue: 'Gift value cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualExclusion(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualExclusion: 'Annual exclusion cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { annualExclusion: 'Annual exclusion cannot exceed $1,000,000' } };
  }

  // Special validation for spouses
  if (allInputs?.relationshipToRecipient === 'spouse' && value > 1000000) {
    return { isValid: false, errors: { annualExclusion: 'Spousal annual exclusion is unlimited' } };
  }

  return { isValid: true, errors: {} };
}

export function validateNumberOfRecipients(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 100) {
    return { isValid: false, errors: { numberOfRecipients: 'Number of recipients must be between 1 and 100' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGiftFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['one-time', 'annual', 'monthly'].includes(value)) {
    return { isValid: false, errors: { giftFrequency: 'Please select a valid gift frequency' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFilingStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['single', 'married-joint', 'married-separate', 'head-household'].includes(value)) {
    return { isValid: false, errors: { filingStatus: 'Please select a valid filing status' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTotalLifetimeExclusionsUsed(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { totalLifetimeExclusionsUsed: 'Total lifetime exclusions used cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { totalLifetimeExclusionsUsed: 'Total lifetime exclusions used cannot exceed $100,000,000' } };
  }

  if (allInputs?.totalLifetimeExclusion && value > allInputs.totalLifetimeExclusion) {
    return { isValid: false, errors: { totalLifetimeExclusionsUsed: 'Cannot exceed total lifetime exclusion' } };
  }

  return { isValid: true, errors: {} };
}

export function validateTotalLifetimeExclusion(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { totalLifetimeExclusion: 'Total lifetime exclusion cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { totalLifetimeExclusion: 'Total lifetime exclusion cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRelationshipToRecipient(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['spouse', 'child', 'grandchild', 'parent', 'sibling', 'other'].includes(value)) {
    return { isValid: false, errors: { relationshipToRecipient: 'Please select a valid relationship to recipient' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsEducationExpense(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isEducationExpense: 'Education expense must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsMedicalExpense(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isMedicalExpense: 'Medical expense must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsCharitableGift(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isCharitableGift: 'Charitable gift must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 2020 || value > 2030) {
    return { isValid: false, errors: { taxYear: 'Tax year must be between 2020 and 2030' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGiftTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { giftTaxRate: 'Gift tax rate must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEstateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { estateTaxRate: 'Estate tax rate must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStateGiftTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { stateGiftTax: 'State gift tax must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGenerationSkippingTransfer(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { generationSkippingTransfer: 'Generation skipping transfer must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCrummeyTrust(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { crummeyTrust: 'Crummey trust must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualExclusionCarryover(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { annualExclusionCarryover: 'Annual exclusion carryover must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUseAnnualExclusion(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { useAnnualExclusion: 'Use annual exclusion must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSplitGifts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { splitGifts: 'Split gifts must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUseUnifiedCredit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { useUnifiedCredit: 'Use unified credit must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateConsiderPortability(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { considerPortability: 'Consider portability must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasSpouse(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasSpouse: 'Has spouse must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSpouseHasCoverage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { spouseHasCoverage: 'Spouse has coverage must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInsuranceType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['individual', 'family', 'none'].includes(value)) {
    return { isValid: false, errors: { insuranceType: 'Please select a valid insurance type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasHealthInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasHealthInsurance: 'Has health insurance must be true or false' } };
  }
  return { isValid: true, errors: {} };
}
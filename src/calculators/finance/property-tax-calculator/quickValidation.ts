import { PropertyTaxInputs } from './types';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Property value cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateAssessedValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Assessed value must be greater than 0' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Tax rate must be 0 or greater' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Tax rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateAssessmentRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (value <= 0 || value > 100)) {
    return { isValid: false, message: 'Assessment ratio must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateHomesteadExemption(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Homestead exemption cannot be negative' };
  }
  return { isValid: true };
}

export function validateSeniorExemption(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Senior exemption cannot be negative' };
  }
  return { isValid: true };
}

export function validateDisabilityExemption(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Disability exemption cannot be negative' };
  }
  return { isValid: true };
}

export function validateVeteranExemption(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Veteran exemption cannot be negative' };
  }
  return { isValid: true };
}

export function validateOtherExemptions(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Other exemptions cannot be negative' };
  }
  return { isValid: true };
}

export function validateSchoolDistrictTax(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'School district tax cannot be negative' };
  }
  return { isValid: true };
}

export function validateFireDistrictTax(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Fire district tax cannot be negative' };
  }
  return { isValid: true };
}

export function validateLibraryDistrictTax(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Library district tax cannot be negative' };
  }
  return { isValid: true };
}

export function validateOtherDistrictTaxes(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Other district taxes cannot be negative' };
  }
  return { isValid: true };
}

export function validateHouseholdIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Household income cannot be negative' };
  }
  return { isValid: true };
}

export function validateAgeOfHomeowner(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (value < 0 || value > 150)) {
    return { isValid: false, message: 'Age must be between 0 and 150' };
  }
  return { isValid: true };
}

export function validateNumberOfDependents(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Number of dependents cannot be negative' };
  }
  return { isValid: true };
}

export function validateAverageTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'Average tax rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateMedianTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'Median tax rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateAssessmentYear(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (value < 1800 || value > 2100)) {
    return { isValid: false, message: 'Assessment year must be between 1800 and 2100' };
  }
  return { isValid: true };
}

export function validateReassessmentFrequency(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && value <= 0) {
    return { isValid: false, message: 'Reassessment frequency must be greater than 0 years' };
  }
  return { isValid: true };
}

export function validatePreviousYearTax(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Previous year tax cannot be negative' };
  }
  return { isValid: true };
}

export function validateTwoYearsAgoTax(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Two years ago tax cannot be negative' };
  }
  return { isValid: true };
}

export function validateThreeYearsAgoTax(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Three years ago tax cannot be negative' };
  }
  return { isValid: true };
}

export function validateLastPaymentAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Last payment amount cannot be negative' };
  }
  return { isValid: true };
}

export function validateAppraisedValueAppeal(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.appealFiled && value && value <= 0) {
    return { isValid: false, message: 'Appeal appraised value must be greater than 0' };
  }
  return { isValid: true };
}

export function validateAssessmentAppeal(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.appealFiled && value && value <= 0) {
    return { isValid: false, message: 'Appeal assessment value must be greater than 0' };
  }
  return { isValid: true };
}

export function validateExpectedValueChange(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -50 || value > 100) {
    return { isValid: false, message: 'Expected value change must be between -50% and 100%' };
  }
  return { isValid: true };
}

export function validateExpectedRateChange(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -20 || value > 50) {
    return { isValid: false, message: 'Expected rate change must be between -20% and 50%' };
  }
  return { isValid: true };
}

export function validateProjectionYears(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Projection years must be between 0 and 50' };
  }
  return { isValid: true };
}

export function validatePropertyAddress(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !value.trim()) {
    return { isValid: false, message: 'Property address is required' };
  }
  return { isValid: true };
}

export function validateCity(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !value.trim()) {
    return { isValid: false, message: 'City is required' };
  }
  return { isValid: true };
}

export function validateState(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !value.trim()) {
    return { isValid: false, message: 'State is required' };
  }
  return { isValid: true };
}

export function validateZipCode(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !value.trim()) {
    return { isValid: false, message: 'Zip code is required' };
  }
  return { isValid: true };
}
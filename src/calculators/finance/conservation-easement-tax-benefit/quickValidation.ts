import { CalculatorInputs } from '../../../types/calculator';

// Real-time validation functions for immediate feedback
export function validatePropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property value must be a valid number' };
  }
  
  if (numValue < 10000) {
    return { isValid: false, message: 'Property value must be at least $10,000' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Property value cannot exceed $100,000,000' };
  }
  
  return { isValid: true };
}

export function validateEasementValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Easement value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Easement value must be a valid number' };
  }
  
  if (numValue < 1000) {
    return { isValid: false, message: 'Easement value must be at least $1,000' };
  }
  
  if (numValue > 50000000) {
    return { isValid: false, message: 'Easement value cannot exceed $50,000,000' };
  }
  
  return { isValid: true };
}

export function validatePropertyValueAfter(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property value after easement is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property value after easement must be a valid number' };
  }
  
  if (numValue < 1000) {
    return { isValid: false, message: 'Property value after easement must be at least $1,000' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Property value after easement cannot exceed $100,000,000' };
  }
  
  return { isValid: true };
}

export function validateAcres(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property acres is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property acres must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Property acres must be at least 1' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Property acres cannot exceed 100,000' };
  }
  
  return { isValid: true };
}

export function validateEasementAcres(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Easement acres is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Easement acres must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Easement acres must be at least 1' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Easement acres cannot exceed 100,000' };
  }
  
  return { isValid: true };
}

export function validateTaxYear(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Tax year is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Tax year must be a valid number' };
  }
  
  if (numValue < 2015) {
    return { isValid: false, message: 'Tax year must be at least 2015' };
  }
  
  if (numValue > 2030) {
    return { isValid: false, message: 'Tax year cannot exceed 2030' };
  }
  
  return { isValid: true };
}

export function validateAdjustedGrossIncome(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Adjusted gross income is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Adjusted gross income must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Adjusted gross income cannot be negative' };
  }
  
  if (numValue > 10000000) {
    return { isValid: false, message: 'Adjusted gross income cannot exceed $10,000,000' };
  }
  
  return { isValid: true };
}

export function validateMarginalTaxRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Marginal tax rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Marginal tax rate must be a valid number' };
  }
  
  if (numValue < 10) {
    return { isValid: false, message: 'Marginal tax rate must be at least 10%' };
  }
  
  if (numValue > 50) {
    return { isValid: false, message: 'Marginal tax rate cannot exceed 50%' };
  }
  
  return { isValid: true };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'State tax rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'State tax rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'State tax rate cannot be negative' };
  }
  
  if (numValue > 15) {
    return { isValid: false, message: 'State tax rate cannot exceed 15%' };
  }
  
  return { isValid: true };
}

export function validateOtherCharitableDeductions(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Other charitable deductions is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Other charitable deductions must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Other charitable deductions cannot be negative' };
  }
  
  if (numValue > 1000000) {
    return { isValid: false, message: 'Other charitable deductions cannot exceed $1,000,000' };
  }
  
  return { isValid: true };
}

export function validateAppraisalCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Appraisal cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Appraisal cost must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Appraisal cost cannot be negative' };
  }
  
  if (numValue > 50000) {
    return { isValid: false, message: 'Appraisal cost cannot exceed $50,000' };
  }
  
  return { isValid: true };
}

export function validateLegalCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Legal cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Legal cost must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Legal cost cannot be negative' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Legal cost cannot exceed $100,000' };
  }
  
  return { isValid: true };
}

export function validateSurveyCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Survey cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Survey cost must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Survey cost cannot be negative' };
  }
  
  if (numValue > 50000) {
    return { isValid: false, message: 'Survey cost cannot exceed $50,000' };
  }
  
  return { isValid: true };
}

export function validateEasementDuration(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Easement duration is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Easement duration must be a valid number' };
  }
  
  if (numValue < 30) {
    return { isValid: false, message: 'Easement duration must be at least 30 years' };
  }
  
  if (numValue > 100) {
    return { isValid: false, message: 'Easement duration cannot exceed 100 years' };
  }
  
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['farmland', 'forest', 'wetland', 'wildlife-habitat', 'scenic-view', 'historic', 'recreational', 'open-space'];
  
  if (!value) {
    return { isValid: false, message: 'Property type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid property type' };
  }
  
  return { isValid: true };
}

export function validateEasementType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['perpetual', 'term', 'partial'];
  
  if (!value) {
    return { isValid: false, message: 'Easement type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid easement type' };
  }
  
  return { isValid: true };
}

export function validateEasementHolder(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validHolders = ['land-trust', 'government', 'nonprofit', 'tribal'];
  
  if (!value) {
    return { isValid: false, message: 'Easement holder is required' };
  }
  
  if (!validHolders.includes(value)) {
    return { isValid: false, message: 'Please select a valid easement holder' };
  }
  
  return { isValid: true };
}

export function validateDonorType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['individual', 'partnership', 'corporation', 'llc', 'trust', 'estate'];
  
  if (!value) {
    return { isValid: false, message: 'Donor type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid donor type' };
  }
  
  return { isValid: true };
}

export function validateDevelopmentRights(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validRights = ['residential', 'commercial', 'industrial', 'subdivision', 'mining', 'logging', 'agricultural', 'none'];
  
  if (!value) {
    return { isValid: false, message: 'Development rights are required' };
  }
  
  if (!Array.isArray(value)) {
    return { isValid: false, message: 'Development rights must be an array' };
  }
  
  for (const right of value) {
    if (!validRights.includes(right)) {
      return { isValid: false, message: 'Please select valid development rights' };
    }
  }
  
  return { isValid: true };
}

export function validatePublicAccess(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validAccess = ['full', 'limited', 'none'];
  
  if (!value) {
    return { isValid: false, message: 'Public access is required' };
  }
  
  if (!validAccess.includes(value)) {
    return { isValid: false, message: 'Please select a valid public access level' };
  }
  
  return { isValid: true };
}

export function validateConservationPurpose(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validPurposes = ['wildlife', 'agricultural', 'scenic', 'historic', 'recreational', 'open-space', 'watershed', 'forest'];
  
  if (!value) {
    return { isValid: false, message: 'Conservation purpose is required' };
  }
  
  if (!Array.isArray(value)) {
    return { isValid: false, message: 'Conservation purpose must be an array' };
  }
  
  for (const purpose of value) {
    if (!validPurposes.includes(purpose)) {
      return { isValid: false, message: 'Please select valid conservation purposes' };
    }
  }
  
  return { isValid: true };
}

// Comprehensive validation for all inputs
export function validateAllTaxBenefitInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate required fields
  const propertyValueValidation = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueValidation.isValid) {
    errors.push(propertyValueValidation.message!);
  }
  
  const easementValueValidation = validateEasementValue(inputs.easementValue);
  if (!easementValueValidation.isValid) {
    errors.push(easementValueValidation.message!);
  }
  
  const propertyValueAfterValidation = validatePropertyValueAfter(inputs.propertyValueAfter);
  if (!propertyValueAfterValidation.isValid) {
    errors.push(propertyValueAfterValidation.message!);
  }
  
  const acresValidation = validateAcres(inputs.acres);
  if (!acresValidation.isValid) {
    errors.push(acresValidation.message!);
  }
  
  const easementAcresValidation = validateEasementAcres(inputs.easementAcres);
  if (!easementAcresValidation.isValid) {
    errors.push(easementAcresValidation.message!);
  }
  
  const taxYearValidation = validateTaxYear(inputs.taxYear);
  if (!taxYearValidation.isValid) {
    errors.push(taxYearValidation.message!);
  }
  
  const adjustedGrossIncomeValidation = validateAdjustedGrossIncome(inputs.adjustedGrossIncome);
  if (!adjustedGrossIncomeValidation.isValid) {
    errors.push(adjustedGrossIncomeValidation.message!);
  }
  
  const marginalTaxRateValidation = validateMarginalTaxRate(inputs.marginalTaxRate);
  if (!marginalTaxRateValidation.isValid) {
    errors.push(marginalTaxRateValidation.message!);
  }
  
  const stateTaxRateValidation = validateStateTaxRate(inputs.stateTaxRate);
  if (!stateTaxRateValidation.isValid) {
    errors.push(stateTaxRateValidation.message!);
  }
  
  const otherCharitableDeductionsValidation = validateOtherCharitableDeductions(inputs.otherCharitableDeductions);
  if (!otherCharitableDeductionsValidation.isValid) {
    errors.push(otherCharitableDeductionsValidation.message!);
  }
  
  const appraisalCostValidation = validateAppraisalCost(inputs.appraisalCost);
  if (!appraisalCostValidation.isValid) {
    errors.push(appraisalCostValidation.message!);
  }
  
  const legalCostValidation = validateLegalCost(inputs.legalCost);
  if (!legalCostValidation.isValid) {
    errors.push(legalCostValidation.message!);
  }
  
  const surveyCostValidation = validateSurveyCost(inputs.surveyCost);
  if (!surveyCostValidation.isValid) {
    errors.push(surveyCostValidation.message!);
  }
  
  const easementDurationValidation = validateEasementDuration(inputs.easementDuration);
  if (!easementDurationValidation.isValid) {
    errors.push(easementDurationValidation.message!);
  }
  
  const propertyTypeValidation = validatePropertyType(inputs.propertyType);
  if (!propertyTypeValidation.isValid) {
    errors.push(propertyTypeValidation.message!);
  }
  
  const easementTypeValidation = validateEasementType(inputs.easementType);
  if (!easementTypeValidation.isValid) {
    errors.push(easementTypeValidation.message!);
  }
  
  const easementHolderValidation = validateEasementHolder(inputs.easementHolder);
  if (!easementHolderValidation.isValid) {
    errors.push(easementHolderValidation.message!);
  }
  
  const donorTypeValidation = validateDonorType(inputs.donorType);
  if (!donorTypeValidation.isValid) {
    errors.push(donorTypeValidation.message!);
  }
  
  const developmentRightsValidation = validateDevelopmentRights(inputs.developmentRights);
  if (!developmentRightsValidation.isValid) {
    errors.push(developmentRightsValidation.message!);
  }
  
  const publicAccessValidation = validatePublicAccess(inputs.publicAccess);
  if (!publicAccessValidation.isValid) {
    errors.push(publicAccessValidation.message!);
  }
  
  const conservationPurposeValidation = validateConservationPurpose(inputs.conservationPurpose);
  if (!conservationPurposeValidation.isValid) {
    errors.push(conservationPurposeValidation.message!);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

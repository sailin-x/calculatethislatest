import { CalculatorInputs } from '../../../types/calculator';

// Real-time validation functions for immediate feedback
export function validateTotalPropertyCost(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Total property cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Total property cost must be a valid number' };
  }
  
  if (numValue < 100000) {
    return { isValid: false, message: 'Total property cost must be at least $100,000' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Total property cost cannot exceed $100,000,000' };
  }
  
  return { isValid: true };
}

export function validateLandCost(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Land cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Land cost must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Land cost cannot be negative' };
  }
  
  if (numValue > 50000000) {
    return { isValid: false, message: 'Land cost cannot exceed $50,000,000' };
  }
  
  return { isValid: true };
}

export function validateBuildingCost(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Building cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Building cost must be a valid number' };
  }
  
  if (numValue < 50000) {
    return { isValid: false, message: 'Building cost must be at least $50,000' };
  }
  
  if (numValue > 80000000) {
    return { isValid: false, message: 'Building cost cannot exceed $80,000,000' };
  }
  
  return { isValid: true };
}

export function validateSiteImprovements(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Site improvements is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Site improvements must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Site improvements cannot be negative' };
  }
  
  if (numValue > 20000000) {
    return { isValid: false, message: 'Site improvements cannot exceed $20,000,000' };
  }
  
  return { isValid: true };
}

export function validatePersonalProperty(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Personal property is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Personal property must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Personal property cannot be negative' };
  }
  
  if (numValue > 10000000) {
    return { isValid: false, message: 'Personal property cannot exceed $10,000,000' };
  }
  
  return { isValid: true };
}

export function validateLandImprovements(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Land improvements is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Land improvements must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Land improvements cannot be negative' };
  }
  
  if (numValue > 15000000) {
    return { isValid: false, message: 'Land improvements cannot exceed $15,000,000' };
  }
  
  return { isValid: true };
}

export function validateStudyCost(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Study cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Study cost must be a valid number' };
  }
  
  if (numValue < 5000) {
    return { isValid: false, message: 'Study cost must be at least $5,000' };
  }
  
  if (numValue > 50000) {
    return { isValid: false, message: 'Study cost cannot exceed $50,000' };
  }
  
  return { isValid: true };
}

export function validateTaxYear(value: any): { isValid: boolean; message?: string } {
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

export function validateMarginalTaxRate(value: any): { isValid: boolean; message?: string } {
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

export function validateStateTaxRate(value: any): { isValid: boolean; message?: string } {
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

export function validatePropertyAge(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property age is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property age must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Property age cannot be negative' };
  }
  
  if (numValue > 50) {
    return { isValid: false, message: 'Property age cannot exceed 50 years' };
  }
  
  return { isValid: true };
}

export function validateRenovationCost(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Renovation cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Renovation cost must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Renovation cost cannot be negative' };
  }
  
  if (numValue > 20000000) {
    return { isValid: false, message: 'Renovation cost cannot exceed $20,000,000' };
  }
  
  return { isValid: true };
}

export function validateSection179(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Section 179 deduction is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Section 179 deduction must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Section 179 deduction cannot be negative' };
  }
  
  if (numValue > 1000000) {
    return { isValid: false, message: 'Section 179 deduction cannot exceed $1,000,000' };
  }
  
  return { isValid: true };
}

export function validatePriorDepreciation(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Prior depreciation is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Prior depreciation must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Prior depreciation cannot be negative' };
  }
  
  if (numValue > 50000000) {
    return { isValid: false, message: 'Prior depreciation cannot exceed $50,000,000' };
  }
  
  return { isValid: true };
}

export function validatePropertyType(value: any): { isValid: boolean; message?: string } {
  const validTypes = ['office', 'retail', 'warehouse', 'hotel', 'apartment', 'restaurant', 'medical', 'mixed-use'];
  
  if (!value) {
    return { isValid: false, message: 'Property type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid property type' };
  }
  
  return { isValid: true };
}

export function validatePropertyUse(value: any): { isValid: boolean; message?: string } {
  const validUses = ['business', 'rental', 'investment', 'mixed'];
  
  if (!value) {
    return { isValid: false, message: 'Property use is required' };
  }
  
  if (!validUses.includes(value)) {
    return { isValid: false, message: 'Please select a valid property use' };
  }
  
  return { isValid: true };
}

export function validateOwnershipType(value: any): { isValid: boolean; message?: string } {
  const validTypes = ['individual', 'partnership', 'corporation', 'llc', 'trust'];
  
  if (!value) {
    return { isValid: false, message: 'Ownership type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid ownership type' };
  }
  
  return { isValid: true };
}

export function validateBonusDepreciation(value: any): { isValid: boolean; message?: string } {
  const validPercentages = ['100', '80', '60', '40', '20', '0'];
  
  if (!value) {
    return { isValid: false, message: 'Bonus depreciation is required' };
  }
  
  if (!validPercentages.includes(value)) {
    return { isValid: false, message: 'Please select a valid bonus depreciation percentage' };
  }
  
  return { isValid: true };
}

export function validateRecoveryPeriod(value: any): { isValid: boolean; message?: string } {
  const validPeriods = ['27.5', '39', '31.5'];
  
  if (!value) {
    return { isValid: false, message: 'Recovery period is required' };
  }
  
  if (!validPeriods.includes(value)) {
    return { isValid: false, message: 'Please select a valid recovery period' };
  }
  
  return { isValid: true };
}

export function validateDepreciationMethod(value: any): { isValid: boolean; message?: string } {
  const validMethods = ['straight-line', 'declining-balance', 'sum-of-years'];
  
  if (!value) {
    return { isValid: false, message: 'Depreciation method is required' };
  }
  
  if (!validMethods.includes(value)) {
    return { isValid: false, message: 'Please select a valid depreciation method' };
  }
  
  return { isValid: true };
}

export function validateConvention(value: any): { isValid: boolean; message?: string } {
  const validConventions = ['mid-month', 'mid-quarter', 'half-year'];
  
  if (!value) {
    return { isValid: false, message: 'Depreciation convention is required' };
  }
  
  if (!validConventions.includes(value)) {
    return { isValid: false, message: 'Please select a valid depreciation convention' };
  }
  
  return { isValid: true };
}

export function validateAcquisitionDate(value: any): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Acquisition date is required' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Please enter a valid date' };
  }
  
  return { isValid: true };
}

export function validateRenovationDate(value: any): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Renovation date is required' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Please enter a valid date' };
  }
  
  return { isValid: true };
}

// Comprehensive validation for all inputs
export function validateAllCostSegregationInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate required fields
  const totalPropertyCostValidation = validateTotalPropertyCost(inputs.totalPropertyCost);
  if (!totalPropertyCostValidation.isValid) {
    errors.push(totalPropertyCostValidation.message!);
  }
  
  const landCostValidation = validateLandCost(inputs.landCost);
  if (!landCostValidation.isValid) {
    errors.push(landCostValidation.message!);
  }
  
  const buildingCostValidation = validateBuildingCost(inputs.buildingCost);
  if (!buildingCostValidation.isValid) {
    errors.push(buildingCostValidation.message!);
  }
  
  const siteImprovementsValidation = validateSiteImprovements(inputs.siteImprovements);
  if (!siteImprovementsValidation.isValid) {
    errors.push(siteImprovementsValidation.message!);
  }
  
  const personalPropertyValidation = validatePersonalProperty(inputs.personalProperty);
  if (!personalPropertyValidation.isValid) {
    errors.push(personalPropertyValidation.message!);
  }
  
  const landImprovementsValidation = validateLandImprovements(inputs.landImprovements);
  if (!landImprovementsValidation.isValid) {
    errors.push(landImprovementsValidation.message!);
  }
  
  const studyCostValidation = validateStudyCost(inputs.studyCost);
  if (!studyCostValidation.isValid) {
    errors.push(studyCostValidation.message!);
  }
  
  const taxYearValidation = validateTaxYear(inputs.taxYear);
  if (!taxYearValidation.isValid) {
    errors.push(taxYearValidation.message!);
  }
  
  const marginalTaxRateValidation = validateMarginalTaxRate(inputs.marginalTaxRate);
  if (!marginalTaxRateValidation.isValid) {
    errors.push(marginalTaxRateValidation.message!);
  }
  
  const stateTaxRateValidation = validateStateTaxRate(inputs.stateTaxRate);
  if (!stateTaxRateValidation.isValid) {
    errors.push(stateTaxRateValidation.message!);
  }
  
  const propertyAgeValidation = validatePropertyAge(inputs.propertyAge);
  if (!propertyAgeValidation.isValid) {
    errors.push(propertyAgeValidation.message!);
  }
  
  const renovationCostValidation = validateRenovationCost(inputs.renovationCost);
  if (!renovationCostValidation.isValid) {
    errors.push(renovationCostValidation.message!);
  }
  
  const section179Validation = validateSection179(inputs.section179);
  if (!section179Validation.isValid) {
    errors.push(section179Validation.message!);
  }
  
  const priorDepreciationValidation = validatePriorDepreciation(inputs.priorDepreciation);
  if (!priorDepreciationValidation.isValid) {
    errors.push(priorDepreciationValidation.message!);
  }
  
  const propertyTypeValidation = validatePropertyType(inputs.propertyType);
  if (!propertyTypeValidation.isValid) {
    errors.push(propertyTypeValidation.message!);
  }
  
  const propertyUseValidation = validatePropertyUse(inputs.propertyUse);
  if (!propertyUseValidation.isValid) {
    errors.push(propertyUseValidation.message!);
  }
  
  const ownershipTypeValidation = validateOwnershipType(inputs.ownershipType);
  if (!ownershipTypeValidation.isValid) {
    errors.push(ownershipTypeValidation.message!);
  }
  
  const bonusDepreciationValidation = validateBonusDepreciation(inputs.bonusDepreciation);
  if (!bonusDepreciationValidation.isValid) {
    errors.push(bonusDepreciationValidation.message!);
  }
  
  const recoveryPeriodValidation = validateRecoveryPeriod(inputs.recoveryPeriod);
  if (!recoveryPeriodValidation.isValid) {
    errors.push(recoveryPeriodValidation.message!);
  }
  
  const depreciationMethodValidation = validateDepreciationMethod(inputs.depreciationMethod);
  if (!depreciationMethodValidation.isValid) {
    errors.push(depreciationMethodValidation.message!);
  }
  
  const conventionValidation = validateConvention(inputs.convention);
  if (!conventionValidation.isValid) {
    errors.push(conventionValidation.message!);
  }
  
  const acquisitionDateValidation = validateAcquisitionDate(inputs.acquisitionDate);
  if (!acquisitionDateValidation.isValid) {
    errors.push(acquisitionDateValidation.message!);
  }
  
  const renovationDateValidation = validateRenovationDate(inputs.renovationDate);
  if (!renovationDateValidation.isValid) {
    errors.push(renovationDateValidation.message!);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

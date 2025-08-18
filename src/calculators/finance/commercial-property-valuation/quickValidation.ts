import { CalculatorInputs } from '../../../types/calculator';

// Real-time validation functions for immediate feedback
export function validateSquareFootage(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Square footage is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Square footage must be a valid number' };
  }
  
  if (numValue < 1000) {
    return { isValid: false, message: 'Square footage must be at least 1,000 sq ft' };
  }
  
  if (numValue > 1000000) {
    return { isValid: false, message: 'Square footage cannot exceed 1,000,000 sq ft' };
  }
  
  return { isValid: true };
}

export function validateLandArea(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Land area is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Land area must be a valid number' };
  }
  
  if (numValue < 0.1) {
    return { isValid: false, message: 'Land area must be at least 0.1 acres' };
  }
  
  if (numValue > 1000) {
    return { isValid: false, message: 'Land area cannot exceed 1,000 acres' };
  }
  
  return { isValid: true };
}

export function validateYearBuilt(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Year built is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Year built must be a valid number' };
  }
  
  const currentYear = new Date().getFullYear();
  if (numValue < 1900) {
    return { isValid: false, message: 'Year built cannot be before 1900' };
  }
  
  if (numValue > currentYear) {
    return { isValid: false, message: `Year built cannot be after ${currentYear}` };
  }
  
  return { isValid: true };
}

export function validateAnnualRent(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Annual rent is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Annual rent must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Annual rent cannot be negative' };
  }
  
  if (numValue > 10000000) {
    return { isValid: false, message: 'Annual rent cannot exceed $10,000,000' };
  }
  
  return { isValid: true };
}

export function validateOperatingExpenses(value: any, annualRent?: number): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Operating expenses is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Operating expenses must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Operating expenses cannot be negative' };
  }
  
  if (numValue > 5000000) {
    return { isValid: false, message: 'Operating expenses cannot exceed $5,000,000' };
  }
  
  if (annualRent && numValue > annualRent) {
    return { isValid: false, message: 'Operating expenses cannot exceed annual rent' };
  }
  
  return { isValid: true };
}

export function validateVacancyRate(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Vacancy rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Vacancy rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Vacancy rate cannot be negative' };
  }
  
  if (numValue > 50) {
    return { isValid: false, message: 'Vacancy rate cannot exceed 50%' };
  }
  
  return { isValid: true };
}

export function validateCapRate(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Cap rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Cap rate must be a valid number' };
  }
  
  if (numValue < 2) {
    return { isValid: false, message: 'Cap rate must be at least 2%' };
  }
  
  if (numValue > 15) {
    return { isValid: false, message: 'Cap rate cannot exceed 15%' };
  }
  
  return { isValid: true };
}

export function validateComparableSales(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Comparable sales is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Comparable sales must be a valid number' };
  }
  
  if (numValue < 10) {
    return { isValid: false, message: 'Comparable sales must be at least $10 per sq ft' };
  }
  
  if (numValue > 1000) {
    return { isValid: false, message: 'Comparable sales cannot exceed $1,000 per sq ft' };
  }
  
  return { isValid: true };
}

export function validateLandValue(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Land value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Land value must be a valid number' };
  }
  
  if (numValue < 1000) {
    return { isValid: false, message: 'Land value must be at least $1,000 per acre' };
  }
  
  if (numValue > 1000000) {
    return { isValid: false, message: 'Land value cannot exceed $1,000,000 per acre' };
  }
  
  return { isValid: true };
}

export function validateReplacementCost(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Replacement cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Replacement cost must be a valid number' };
  }
  
  if (numValue < 20) {
    return { isValid: false, message: 'Replacement cost must be at least $20 per sq ft' };
  }
  
  if (numValue > 500) {
    return { isValid: false, message: 'Replacement cost cannot exceed $500 per sq ft' };
  }
  
  return { isValid: true };
}

export function validateDepreciation(value: any): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Depreciation is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Depreciation must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Depreciation cannot be negative' };
  }
  
  if (numValue > 90) {
    return { isValid: false, message: 'Depreciation cannot exceed 90%' };
  }
  
  return { isValid: true };
}

export function validatePropertyType(value: any): { isValid: boolean; message?: string } {
  const validTypes = ['office', 'retail', 'warehouse', 'restaurant', 'hotel', 'medical', 'manufacturing', 'mixed-use', 'apartment', 'self-storage'];
  
  if (!value) {
    return { isValid: false, message: 'Property type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid property type' };
  }
  
  return { isValid: true };
}

export function validateConstructionQuality(value: any): { isValid: boolean; message?: string } {
  const validQualities = ['economy', 'standard', 'custom', 'luxury'];
  
  if (!value) {
    return { isValid: false, message: 'Construction quality is required' };
  }
  
  if (!validQualities.includes(value)) {
    return { isValid: false, message: 'Please select a valid construction quality' };
  }
  
  return { isValid: true };
}

export function validateLocation(value: any): { isValid: boolean; message?: string } {
  const validLocations = ['rural', 'suburban', 'urban', 'cbd', 'airport', 'highway'];
  
  if (!value) {
    return { isValid: false, message: 'Location is required' };
  }
  
  if (!validLocations.includes(value)) {
    return { isValid: false, message: 'Please select a valid location' };
  }
  
  return { isValid: true };
}

export function validateMarketCondition(value: any): { isValid: boolean; message?: string } {
  const validConditions = ['declining', 'stable', 'growing', 'hot'];
  
  if (!value) {
    return { isValid: false, message: 'Market condition is required' };
  }
  
  if (!validConditions.includes(value)) {
    return { isValid: false, message: 'Please select a valid market condition' };
  }
  
  return { isValid: true };
}

export function validateZoning(value: any): { isValid: boolean; message?: string } {
  const validZoning = ['residential', 'commercial', 'industrial', 'mixed', 'agricultural'];
  
  if (!value) {
    return { isValid: false, message: 'Zoning is required' };
  }
  
  if (!validZoning.includes(value)) {
    return { isValid: false, message: 'Please select a valid zoning' };
  }
  
  return { isValid: true };
}

export function validateAccessibility(value: any): { isValid: boolean; message?: string } {
  const validAccessibility = ['poor', 'fair', 'good', 'excellent'];
  
  if (!value) {
    return { isValid: false, message: 'Accessibility is required' };
  }
  
  if (!validAccessibility.includes(value)) {
    return { isValid: false, message: 'Please select a valid accessibility' };
  }
  
  return { isValid: true };
}

export function validateCondition(value: any): { isValid: boolean; message?: string } {
  const validConditions = ['poor', 'fair', 'good', 'excellent'];
  
  if (!value) {
    return { isValid: false, message: 'Property condition is required' };
  }
  
  if (!validConditions.includes(value)) {
    return { isValid: false, message: 'Please select a valid property condition' };
  }
  
  return { isValid: true };
}

export function validateTenantQuality(value: any): { isValid: boolean; message?: string } {
  const validQualities = ['poor', 'fair', 'good', 'excellent'];
  
  if (!value) {
    return { isValid: false, message: 'Tenant quality is required' };
  }
  
  if (!validQualities.includes(value)) {
    return { isValid: false, message: 'Please select a valid tenant quality' };
  }
  
  return { isValid: true };
}

export function validateLeaseTerms(value: any): { isValid: boolean; message?: string } {
  const validTerms = ['month-to-month', 'short-term', 'medium-term', 'long-term'];
  
  if (!value) {
    return { isValid: false, message: 'Lease terms is required' };
  }
  
  if (!validTerms.includes(value)) {
    return { isValid: false, message: 'Please select valid lease terms' };
  }
  
  return { isValid: true };
}

// Comprehensive validation for all inputs
export function validateAllValuationInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate required fields
  const squareFootageValidation = validateSquareFootage(inputs.squareFootage);
  if (!squareFootageValidation.isValid) {
    errors.push(squareFootageValidation.message!);
  }
  
  const landAreaValidation = validateLandArea(inputs.landArea);
  if (!landAreaValidation.isValid) {
    errors.push(landAreaValidation.message!);
  }
  
  const yearBuiltValidation = validateYearBuilt(inputs.yearBuilt);
  if (!yearBuiltValidation.isValid) {
    errors.push(yearBuiltValidation.message!);
  }
  
  const annualRentValidation = validateAnnualRent(inputs.annualRent);
  if (!annualRentValidation.isValid) {
    errors.push(annualRentValidation.message!);
  }
  
  const operatingExpensesValidation = validateOperatingExpenses(inputs.operatingExpenses, inputs.annualRent as number);
  if (!operatingExpensesValidation.isValid) {
    errors.push(operatingExpensesValidation.message!);
  }
  
  const vacancyRateValidation = validateVacancyRate(inputs.vacancyRate);
  if (!vacancyRateValidation.isValid) {
    errors.push(vacancyRateValidation.message!);
  }
  
  const capRateValidation = validateCapRate(inputs.capRate);
  if (!capRateValidation.isValid) {
    errors.push(capRateValidation.message!);
  }
  
  const comparableSalesValidation = validateComparableSales(inputs.comparableSales);
  if (!comparableSalesValidation.isValid) {
    errors.push(comparableSalesValidation.message!);
  }
  
  const landValueValidation = validateLandValue(inputs.landValue);
  if (!landValueValidation.isValid) {
    errors.push(landValueValidation.message!);
  }
  
  const replacementCostValidation = validateReplacementCost(inputs.replacementCost);
  if (!replacementCostValidation.isValid) {
    errors.push(replacementCostValidation.message!);
  }
  
  const depreciationValidation = validateDepreciation(inputs.depreciation);
  if (!depreciationValidation.isValid) {
    errors.push(depreciationValidation.message!);
  }
  
  const propertyTypeValidation = validatePropertyType(inputs.propertyType);
  if (!propertyTypeValidation.isValid) {
    errors.push(propertyTypeValidation.message!);
  }
  
  const constructionQualityValidation = validateConstructionQuality(inputs.constructionQuality);
  if (!constructionQualityValidation.isValid) {
    errors.push(constructionQualityValidation.message!);
  }
  
  const locationValidation = validateLocation(inputs.location);
  if (!locationValidation.isValid) {
    errors.push(locationValidation.message!);
  }
  
  const marketConditionValidation = validateMarketCondition(inputs.marketCondition);
  if (!marketConditionValidation.isValid) {
    errors.push(marketConditionValidation.message!);
  }
  
  const zoningValidation = validateZoning(inputs.zoning);
  if (!zoningValidation.isValid) {
    errors.push(zoningValidation.message!);
  }
  
  const accessibilityValidation = validateAccessibility(inputs.accessibility);
  if (!accessibilityValidation.isValid) {
    errors.push(accessibilityValidation.message!);
  }
  
  const conditionValidation = validateCondition(inputs.condition);
  if (!conditionValidation.isValid) {
    errors.push(conditionValidation.message!);
  }
  
  const tenantQualityValidation = validateTenantQuality(inputs.tenantQuality);
  if (!tenantQualityValidation.isValid) {
    errors.push(tenantQualityValidation.message!);
  }
  
  const leaseTermsValidation = validateLeaseTerms(inputs.leaseTerms);
  if (!leaseTermsValidation.isValid) {
    errors.push(leaseTermsValidation.message!);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

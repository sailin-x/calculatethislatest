import { CalculatorInputs } from '../../types/calculator';

// Real-time validation functions for immediate feedback
export function validatePropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property value must be a valid number' };
  }
  
  if (numValue < 100000) {
    return { isValid: false, message: 'Property value must be at least $100,000' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Property value cannot exceed $100,000,000' };
  }
  
  return { isValid: true };
}

export function validateBuildingValue(value: any, propertyValue?: number, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Building value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Building value must be a valid number' };
  }
  
  if (numValue < 50000) {
    return { isValid: false, message: 'Building value must be at least $50,000' };
  }
  
  if (numValue > 80000000) {
    return { isValid: false, message: 'Building value cannot exceed $80,000,000' };
  }
  
  if (propertyValue && numValue > propertyValue) {
    return { isValid: false, message: 'Building value cannot exceed total property value' };
  }
  
  return { isValid: true };
}

export function validateContentsValue(value: any, propertyValue?: number, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Contents value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Contents value must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Contents value cannot be negative' };
  }
  
  if (numValue > 20000000) {
    return { isValid: false, message: 'Contents value cannot exceed $20,000,000' };
  }
  
  if (propertyValue && numValue > propertyValue) {
    return { isValid: false, message: 'Contents value cannot exceed total property value' };
  }
  
  return { isValid: true };
}

export function validateBusinessIncome(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Business income is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Business income must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Business income cannot be negative' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Business income cannot exceed $100,000,000' };
  }
  
  return { isValid: true };
}

export function validateYearBuilt(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
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

export function validateSquareFootage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
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

export function validateDeductible(value: any, propertyValue?: number, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Deductible is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Deductible must be a valid number' };
  }
  
  if (numValue < 1000) {
    return { isValid: false, message: 'Deductible must be at least $1,000' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Deductible cannot exceed $100,000' };
  }
  
  if (propertyValue && numValue > propertyValue * 0.1) {
    return { isValid: false, message: 'Deductible should not exceed 10% of property value' };
  }
  
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['office', 'retail', 'warehouse', 'restaurant', 'hotel', 'medical', 'manufacturing', 'mixed-use'];
  
  if (!value) {
    return { isValid: false, message: 'Property type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid property type' };
  }
  
  return { isValid: true };
}

export function validateConstructionType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['frame', 'joisted-masonry', 'non-combustible', 'MasonryNonCombustible', 'ModifiedFireResistive', 'fire-resistive'];
  
  if (!value) {
    return { isValid: false, message: 'Construction type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid construction type' };
  }
  
  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validLocations = ['low-risk', 'medium-risk', 'high-risk', 'coastal', 'earthquake', 'flood', 'wildfire'];
  
  if (!value) {
    return { isValid: false, message: 'Location is required' };
  }
  
  if (!validLocations.includes(value)) {
    return { isValid: false, message: 'Please select a valid location' };
  }
  
  return { isValid: true };
}

export function validateCoverageLimits(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validLimits = ['80-percent', '90-percent', '100-percent', 'agreed-value'];
  
  if (!value) {
    return { isValid: false, message: 'Coverage limits are required' };
  }
  
  if (!validLimits.includes(value)) {
    return { isValid: false, message: 'Please select valid coverage limits' };
  }
  
  return { isValid: true };
}

export function validateClaimsHistory(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validClaims = ['0', '1', '2', '3+'];
  
  if (!value) {
    return { isValid: false, message: 'Claims history is required' };
  }
  
  if (!validClaims.includes(value)) {
    return { isValid: false, message: 'Please select valid claims history' };
  }
  
  return { isValid: true };
}

export function validateOccupancy(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validOccupancy = ['owner-occupied', 'tenant-occupied', 'vacant', 'under-construction'];
  
  if (!value) {
    return { isValid: false, message: 'Occupancy is required' };
  }
  
  if (!validOccupancy.includes(value)) {
    return { isValid: false, message: 'Please select valid occupancy status' };
  }
  
  return { isValid: true };
}

export function validateAdditionalCoverages(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !Array.isArray(value)) {
    return { isValid: true }; // Optional field
  }
  
  const validCoverages = [
    'earthquake', 'flood', 'windstorm', 'terrorism', 'equipment-breakdown',
    'cyber-liability', 'employment-practices', 'directors-officers'
  ];
  
  for (const coverage of value) {
    if (!validCoverages.includes(coverage)) {
      return { isValid: false, message: `Invalid additional coverage: ${coverage}` };
    }
  }
  
  return { isValid: true };
}

export function validateSafetyFeatures(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !Array.isArray(value)) {
    return { isValid: true }; // Optional field
  }
  
  const validFeatures = [
    'sprinkler-system', 'fire-alarm', 'security-system', 'backup-generator',
    'storm-shutters', 'elevated-foundation'
  ];
  
  for (const feature of value) {
    if (!validFeatures.includes(feature)) {
      return { isValid: false, message: `Invalid safety feature: ${feature}` };
    }
  }
  
  return { isValid: true };
}

// Comprehensive validation for all inputs
export function validateAllInsuranceInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate required fields
  const propertyValueValidation = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueValidation.isValid) {
    errors.push(propertyValueValidation.message!);
  }
  
  const buildingValueValidation = validateBuildingValue(inputs.buildingValue, inputs.propertyValue as number);
  if (!buildingValueValidation.isValid) {
    errors.push(buildingValueValidation.message!);
  }
  
  const contentsValueValidation = validateContentsValue(inputs.contentsValue, inputs.propertyValue as number);
  if (!contentsValueValidation.isValid) {
    errors.push(contentsValueValidation.message!);
  }
  
  const businessIncomeValidation = validateBusinessIncome(inputs.businessIncome);
  if (!businessIncomeValidation.isValid) {
    errors.push(businessIncomeValidation.message!);
  }
  
  const yearBuiltValidation = validateYearBuilt(inputs.yearBuilt);
  if (!yearBuiltValidation.isValid) {
    errors.push(yearBuiltValidation.message!);
  }
  
  const squareFootageValidation = validateSquareFootage(inputs.squareFootage);
  if (!squareFootageValidation.isValid) {
    errors.push(squareFootageValidation.message!);
  }
  
  const deductibleValidation = validateDeductible(inputs.deductible, inputs.propertyValue as number);
  if (!deductibleValidation.isValid) {
    errors.push(deductibleValidation.message!);
  }
  
  const propertyTypeValidation = validatePropertyType(inputs.propertyType);
  if (!propertyTypeValidation.isValid) {
    errors.push(propertyTypeValidation.message!);
  }
  
  const constructionTypeValidation = validateConstructionType(inputs.constructionType);
  if (!constructionTypeValidation.isValid) {
    errors.push(constructionTypeValidation.message!);
  }
  
  const locationValidation = validateLocation(inputs.location);
  if (!locationValidation.isValid) {
    errors.push(locationValidation.message!);
  }
  
  const coverageLimitsValidation = validateCoverageLimits(inputs.coverageLimits);
  if (!coverageLimitsValidation.isValid) {
    errors.push(coverageLimitsValidation.message!);
  }
  
  const claimsHistoryValidation = validateClaimsHistory(inputs.claimsHistory);
  if (!claimsHistoryValidation.isValid) {
    errors.push(claimsHistoryValidation.message!);
  }
  
  const occupancyValidation = validateOccupancy(inputs.occupancy);
  if (!occupancyValidation.isValid) {
    errors.push(occupancyValidation.message!);
  }
  
  // Validate optional fields
  const additionalCoveragesValidation = validateAdditionalCoverages(inputs.additionalCoverages);
  if (!additionalCoveragesValidation.isValid) {
    errors.push(additionalCoveragesValidation.message!);
  }
  
  const safetyFeaturesValidation = validateSafetyFeatures(inputs.safetyFeatures);
  if (!safetyFeaturesValidation.isValid) {
    errors.push(safetyFeaturesValidation.message!);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

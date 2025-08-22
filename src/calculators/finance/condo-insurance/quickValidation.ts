import { CalculatorInputs } from '../../../types/calculator';

// Real-time validation functions for immediate feedback
export function validateSquareFootage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Square footage is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Square footage must be a valid number' };
  }
  
  if (numValue < 300) {
    return { isValid: false, message: 'Square footage must be at least 300 sq ft' };
  }
  
  if (numValue > 10000) {
    return { isValid: false, message: 'Square footage cannot exceed 10,000 sq ft' };
  }
  
  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property value must be a valid number' };
  }
  
  if (numValue < 50000) {
    return { isValid: false, message: 'Property value must be at least $50,000' };
  }
  
  if (numValue > 5000000) {
    return { isValid: false, message: 'Property value cannot exceed $5,000,000' };
  }
  
  return { isValid: true };
}

export function validatePersonalPropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Personal property value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Personal property value must be a valid number' };
  }
  
  if (numValue < 5000) {
    return { isValid: false, message: 'Personal property value must be at least $5,000' };
  }
  
  if (numValue > 500000) {
    return { isValid: false, message: 'Personal property value cannot exceed $500,000' };
  }
  
  return { isValid: true };
}

export function validateBuildingCoverage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Building coverage is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Building coverage must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Building coverage cannot be negative' };
  }
  
  if (numValue > 500000) {
    return { isValid: false, message: 'Building coverage cannot exceed $500,000' };
  }
  
  return { isValid: true };
}

export function validateLossOfUseCoverage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loss of use coverage is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loss of use coverage must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Loss of use coverage cannot be negative' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Loss of use coverage cannot exceed $100,000' };
  }
  
  return { isValid: true };
}

export function validatePersonalLiabilityCoverage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Personal liability coverage is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Personal liability coverage must be a valid number' };
  }
  
  if (numValue < 100000) {
    return { isValid: false, message: 'Personal liability coverage must be at least $100,000' };
  }
  
  if (numValue > 2000000) {
    return { isValid: false, message: 'Personal liability coverage cannot exceed $2,000,000' };
  }
  
  return { isValid: true };
}

export function validateMedicalPaymentsCoverage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Medical payments coverage is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Medical payments coverage must be a valid number' };
  }
  
  if (numValue < 1000) {
    return { isValid: false, message: 'Medical payments coverage must be at least $1,000' };
  }
  
  if (numValue > 50000) {
    return { isValid: false, message: 'Medical payments coverage cannot exceed $50,000' };
  }
  
  return { isValid: true };
}

export function validateDeductible(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Deductible is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Deductible must be a valid number' };
  }
  
  if (numValue < 250) {
    return { isValid: false, message: 'Deductible must be at least $250' };
  }
  
  if (numValue > 10000) {
    return { isValid: false, message: 'Deductible cannot exceed $10,000' };
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
  
  if (numValue < 1900) {
    return { isValid: false, message: 'Year built must be at least 1900' };
  }
  
  if (numValue > 2024) {
    return { isValid: false, message: 'Year built cannot exceed 2024' };
  }
  
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['studio', 'one-bedroom', 'two-bedroom', 'three-bedroom', 'penthouse', 'townhouse'];
  
  if (!value) {
    return { isValid: false, message: 'Property type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid property type' };
  }
  
  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validLocations = ['urban', 'suburban', 'rural', 'coastal', 'mountain'];
  
  if (!value) {
    return { isValid: false, message: 'Location is required' };
  }
  
  if (!validLocations.includes(value)) {
    return { isValid: false, message: 'Please select a valid location' };
  }
  
  return { isValid: true };
}

export function validateConstructionType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['frame', 'masonry', 'fire-resistive', 'non-combustible'];
  
  if (!value) {
    return { isValid: false, message: 'Construction type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid construction type' };
  }
  
  return { isValid: true };
}

export function validateSecurityFeatures(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validFeatures = ['alarm-system', 'security-camera', 'doorman', 'gated-access', 'fire-sprinklers', 'none'];
  
  if (!value) {
    return { isValid: false, message: 'Security features are required' };
  }
  
  if (!Array.isArray(value)) {
    return { isValid: false, message: 'Security features must be an array' };
  }
  
  for (const feature of value) {
    if (!validFeatures.includes(feature)) {
      return { isValid: false, message: 'Please select valid security features' };
    }
  }
  
  return { isValid: true };
}

export function validateClaimsHistory(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validHistory = ['0', '1', '2', '3+'];
  
  if (!value) {
    return { isValid: false, message: 'Claims history is required' };
  }
  
  if (!validHistory.includes(value)) {
    return { isValid: false, message: 'Please select a valid claims history' };
  }
  
  return { isValid: true };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validScores = ['excellent', 'good', 'fair', 'poor'];
  
  if (!value) {
    return { isValid: false, message: 'Credit score is required' };
  }
  
  if (!validScores.includes(value)) {
    return { isValid: false, message: 'Please select a valid credit score' };
  }
  
  return { isValid: true };
}

export function validateOccupancyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['owner-occupied', 'rental', 'vacation'];
  
  if (!value) {
    return { isValid: false, message: 'Occupancy type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid occupancy type' };
  }
  
  return { isValid: true };
}

export function validateHoaInsurance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['bare-walls', 'single-entity', 'all-inclusive'];
  
  if (!value) {
    return { isValid: false, message: 'HOA insurance type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid HOA insurance type' };
  }
  
  return { isValid: true };
}

export function validateFloodZone(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validZones = ['x', 'a', 'v', 'unknown'];
  
  if (!value) {
    return { isValid: false, message: 'Flood zone is required' };
  }
  
  if (!validZones.includes(value)) {
    return { isValid: false, message: 'Please select a valid flood zone' };
  }
  
  return { isValid: true };
}

export function validateEarthquakeZone(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validZones = ['low', 'moderate', 'high'];
  
  if (!value) {
    return { isValid: false, message: 'Earthquake zone is required' };
  }
  
  if (!validZones.includes(value)) {
    return { isValid: false, message: 'Please select a valid earthquake zone' };
  }
  
  return { isValid: true };
}

// Comprehensive validation for all inputs
export function validateAllInsuranceInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate required fields
  const squareFootageValidation = validateSquareFootage(inputs.squareFootage);
  if (!squareFootageValidation.isValid) {
    errors.push(squareFootageValidation.message!);
  }
  
  const propertyValueValidation = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueValidation.isValid) {
    errors.push(propertyValueValidation.message!);
  }
  
  const personalPropertyValueValidation = validatePersonalPropertyValue(inputs.personalPropertyValue);
  if (!personalPropertyValueValidation.isValid) {
    errors.push(personalPropertyValueValidation.message!);
  }
  
  const buildingCoverageValidation = validateBuildingCoverage(inputs.buildingCoverage);
  if (!buildingCoverageValidation.isValid) {
    errors.push(buildingCoverageValidation.message!);
  }
  
  const lossOfUseCoverageValidation = validateLossOfUseCoverage(inputs.lossOfUseCoverage);
  if (!lossOfUseCoverageValidation.isValid) {
    errors.push(lossOfUseCoverageValidation.message!);
  }
  
  const personalLiabilityCoverageValidation = validatePersonalLiabilityCoverage(inputs.personalLiabilityCoverage);
  if (!personalLiabilityCoverageValidation.isValid) {
    errors.push(personalLiabilityCoverageValidation.message!);
  }
  
  const medicalPaymentsCoverageValidation = validateMedicalPaymentsCoverage(inputs.medicalPaymentsCoverage);
  if (!medicalPaymentsCoverageValidation.isValid) {
    errors.push(medicalPaymentsCoverageValidation.message!);
  }
  
  const deductibleValidation = validateDeductible(inputs.deductible);
  if (!deductibleValidation.isValid) {
    errors.push(deductibleValidation.message!);
  }
  
  const yearBuiltValidation = validateYearBuilt(inputs.yearBuilt);
  if (!yearBuiltValidation.isValid) {
    errors.push(yearBuiltValidation.message!);
  }
  
  const propertyTypeValidation = validatePropertyType(inputs.propertyType);
  if (!propertyTypeValidation.isValid) {
    errors.push(propertyTypeValidation.message!);
  }
  
  const locationValidation = validateLocation(inputs.location);
  if (!locationValidation.isValid) {
    errors.push(locationValidation.message!);
  }
  
  const constructionTypeValidation = validateConstructionType(inputs.constructionType);
  if (!constructionTypeValidation.isValid) {
    errors.push(constructionTypeValidation.message!);
  }
  
  const securityFeaturesValidation = validateSecurityFeatures(inputs.securityFeatures);
  if (!securityFeaturesValidation.isValid) {
    errors.push(securityFeaturesValidation.message!);
  }
  
  const claimsHistoryValidation = validateClaimsHistory(inputs.claimsHistory);
  if (!claimsHistoryValidation.isValid) {
    errors.push(claimsHistoryValidation.message!);
  }
  
  const creditScoreValidation = validateCreditScore(inputs.creditScore);
  if (!creditScoreValidation.isValid) {
    errors.push(creditScoreValidation.message!);
  }
  
  const occupancyTypeValidation = validateOccupancyType(inputs.occupancyType);
  if (!occupancyTypeValidation.isValid) {
    errors.push(occupancyTypeValidation.message!);
  }
  
  const hoaInsuranceValidation = validateHoaInsurance(inputs.hoaInsurance);
  if (!hoaInsuranceValidation.isValid) {
    errors.push(hoaInsuranceValidation.message!);
  }
  
  const floodZoneValidation = validateFloodZone(inputs.floodZone);
  if (!floodZoneValidation.isValid) {
    errors.push(floodZoneValidation.message!);
  }
  
  const earthquakeZoneValidation = validateEarthquakeZone(inputs.earthquakeZone);
  if (!earthquakeZoneValidation.isValid) {
    errors.push(earthquakeZoneValidation.message!);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

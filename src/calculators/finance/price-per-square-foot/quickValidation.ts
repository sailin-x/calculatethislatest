import { ValidationResult } from './validation';

export function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property address is required'], warnings: [] };
  }

  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, errors: ['Property address must be a non-empty string'], warnings: [] };
  }

  if (value.trim().length < 10) {
    return { isValid: true, errors: [], warnings: ['Property address seems incomplete'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property type is required'], warnings: [] };
  }

  const validTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial', 'industrial', 'land', 'mixed_use'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: ['Property type must be one of: single_family, multi_family, condo, townhouse, commercial, industrial, land, mixed_use'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property size is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property size must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Property size must be greater than 0'], warnings: [] };
  }

  if (numValue < 100) {
    return { isValid: true, errors: [], warnings: ['Property size is very small'] };
  }

  if (numValue > 10000) {
    return { isValid: true, errors: [], warnings: ['Property size is very large'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property age is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property age must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Property age cannot be negative'], warnings: [] };
  }

  if (numValue > 100) {
    return { isValid: true, errors: [], warnings: ['Property age is very high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateNumberOfUnits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Number of units is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Number of units must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Number of units cannot be negative'], warnings: [] };
  }

  if (numValue === 0 && allInputs?.propertyType !== 'land') {
    return { isValid: true, errors: [], warnings: ['Zero units may not be appropriate for this property type'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateNumberOfBedrooms(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Number of bedrooms is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Number of bedrooms must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Number of bedrooms cannot be negative'], warnings: [] };
  }

  if (numValue > 10) {
    return { isValid: true, errors: [], warnings: ['Number of bedrooms is unusually high'] };
  }

  if (numValue === 0 && allInputs?.propertyType === 'single_family') {
    return { isValid: true, errors: [], warnings: ['Single family homes typically have bedrooms'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateNumberOfBathrooms(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Number of bathrooms is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Number of bathrooms must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Number of bathrooms cannot be negative'], warnings: [] };
  }

  if (numValue > 10) {
    return { isValid: true, errors: [], warnings: ['Number of bathrooms is unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyPrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property price is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property price must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Property price must be greater than 0'], warnings: [] };
  }

  if (numValue < 50000) {
    return { isValid: true, errors: [], warnings: ['Property price is very low'] };
  }

  if (numValue > 100000000) {
    return { isValid: true, errors: [], warnings: ['Property price is very high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateListPrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['List price is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['List price must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['List price must be greater than 0'], warnings: [] };
  }

  if (allInputs?.propertyPrice && numValue !== allInputs.propertyPrice) {
    return { isValid: true, errors: [], warnings: ['List price differs from property price'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateSalePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Sale price is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Sale price must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Sale price must be greater than 0'], warnings: [] };
  }

  if (allInputs?.propertyPrice && numValue !== allInputs.propertyPrice) {
    return { isValid: true, errors: [], warnings: ['Sale price differs from property price'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateAppraisalValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Appraisal value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Appraisal value must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Appraisal value must be greater than 0'], warnings: [] };
  }

  if (allInputs?.propertyPrice) {
    const difference = Math.abs(numValue - allInputs.propertyPrice) / allInputs.propertyPrice;
    if (difference > 0.2) {
      return { isValid: true, errors: [], warnings: ['Appraisal value differs significantly from property price'] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Assessed value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Assessed value must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Assessed value must be greater than 0'], warnings: [] };
  }

  if (allInputs?.propertyPrice) {
    const difference = Math.abs(numValue - allInputs.propertyPrice) / allInputs.propertyPrice;
    if (difference > 0.3) {
      return { isValid: true, errors: [], warnings: ['Assessed value differs significantly from property price'] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Market location is required'], warnings: [] };
  }

  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, errors: ['Market location must be a non-empty string'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketCondition(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Market condition is required'], warnings: [] };
  }

  const validConditions = ['declining', 'stable', 'growing', 'hot'];
  if (!validConditions.includes(value)) {
    return { isValid: false, errors: ['Market condition must be one of: declining, stable, growing, hot'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Market growth rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Market growth rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Market growth rate cannot be negative'], warnings: [] };
  }

  if (numValue > 0.5) {
    return { isValid: true, errors: [], warnings: ['Market growth rate is very high, may be unrealistic'] };
  }

  if (numValue < 0 && allInputs?.marketCondition !== 'declining') {
    return { isValid: true, errors: [], warnings: ['Negative market growth rate may not align with market condition'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateDaysOnMarket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Days on market is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Days on market must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Days on market cannot be negative'], warnings: [] };
  }

  if (numValue > 365) {
    return { isValid: true, errors: [], warnings: ['Property has been on market for more than a year'] };
  }

  if (numValue > 180) {
    return { isValid: true, errors: [], warnings: ['Property has been on market for more than 6 months'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyCondition(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property condition is required'], warnings: [] };
  }

  const validConditions = ['excellent', 'good', 'average', 'poor', 'needs_repair'];
  if (!validConditions.includes(value)) {
    return { isValid: false, errors: ['Property condition must be one of: excellent, good, average, poor, needs_repair'], warnings: [] };
  }

  if (value === 'poor' || value === 'needs_repair') {
    return { isValid: true, errors: [], warnings: ['Property condition may significantly impact value'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyStyle(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property style is required'], warnings: [] };
  }

  const validStyles = ['modern', 'traditional', 'contemporary', 'colonial', 'ranch', 'other'];
  if (!validStyles.includes(value)) {
    return { isValid: false, errors: ['Property style must be one of: modern, traditional, contemporary, colonial, ranch, other'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateLotSize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Lot size is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Lot size must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Lot size cannot be negative'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateGarageSpaces(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Garage spaces is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Garage spaces must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Garage spaces cannot be negative'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateParkingSpaces(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Parking spaces is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Parking spaces must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Parking spaces cannot be negative'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateSchoolDistrict(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['School district is required'], warnings: [] };
  }

  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, errors: ['School district must be a non-empty string'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateSchoolRating(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['School rating is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['School rating must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 10) {
    return { isValid: false, errors: ['School rating must be between 0 and 10'], warnings: [] };
  }

  if (numValue < 5) {
    return { isValid: true, errors: [], warnings: ['Low school rating may impact property value'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateCrimeRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Crime rate is required'], warnings: [] };
  }

  const validRates = ['low', 'medium', 'high'];
  if (!validRates.includes(value)) {
    return { isValid: false, errors: ['Crime rate must be one of: low, medium, high'], warnings: [] };
  }

  if (value === 'high') {
    return { isValid: true, errors: [], warnings: ['High crime rate may impact property value'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateWalkScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Walk score is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Walk score must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 100) {
    return { isValid: false, errors: ['Walk score must be between 0 and 100'], warnings: [] };
  }

  if (numValue < 30) {
    return { isValid: true, errors: [], warnings: ['Low walkability score may impact property value'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateTransitScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Transit score is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Transit score must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 100) {
    return { isValid: false, errors: ['Transit score must be between 0 and 100'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBikeScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Bike score is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Bike score must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 100) {
    return { isValid: false, errors: ['Bike score must be between 0 and 100'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Analysis period is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Analysis period must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Analysis period must be greater than 0'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Inflation rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Inflation rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Inflation rate cannot be negative'], warnings: [] };
  }

  if (numValue > 0.1) {
    return { isValid: true, errors: [], warnings: ['Inflation rate is very high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property appreciation rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property appreciation rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Property appreciation rate cannot be negative'], warnings: [] };
  }

  if (numValue > 0.2) {
    return { isValid: true, errors: [], warnings: ['Property appreciation rate is very high, may be unrealistic'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Discount rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Discount rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Discount rate cannot be negative'], warnings: [] };
  }

  if (numValue > 0.2) {
    return { isValid: true, errors: [], warnings: ['Discount rate is very high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}
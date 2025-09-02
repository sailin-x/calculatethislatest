import { PricePerSquareFootInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof PricePerSquareFootInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'propertyAddress':
      return validatePropertyAddress(value);
    case 'propertyType':
      return validatePropertyType(value);
    case 'propertySize':
      return validatePropertySize(value, allInputs);
    case 'propertyAge':
      return validatePropertyAge(value);
    case 'numberOfUnits':
      return validateNumberOfUnits(value, allInputs);
    case 'numberOfBedrooms':
      return validateNumberOfBedrooms(value);
    case 'numberOfBathrooms':
      return validateNumberOfBathrooms(value);
    case 'propertyPrice':
      return validatePropertyPrice(value, allInputs);
    case 'listPrice':
      return validateListPrice(value, allInputs);
    case 'salePrice':
      return validateSalePrice(value);
    case 'appraisalValue':
      return validateAppraisalValue(value);
    case 'assessedValue':
      return validateAssessedValue(value);
    case 'comparableProperties':
      return validateComparableProperties(value);
    case 'marketLocation':
      return validateMarketLocation(value);
    case 'marketCondition':
      return validateMarketCondition(value);
    case 'marketGrowthRate':
      return validateMarketGrowthRate(value);
    case 'daysOnMarket':
      return validateDaysOnMarket(value);
    case 'propertyCondition':
      return validatePropertyCondition(value);
    case 'propertyStyle':
      return validatePropertyStyle(value);
    case 'lotSize':
      return validateLotSize(value, allInputs);
    case 'garageSpaces':
      return validateGarageSpaces(value);
    case 'parkingSpaces':
      return validateParkingSpaces(value);
    case 'amenities':
      return validateAmenities(value);
    case 'schoolDistrict':
      return validateSchoolDistrict(value);
    case 'schoolRating':
      return validateSchoolRating(value);
    case 'crimeRate':
      return validateCrimeRate(value);
    case 'walkScore':
      return validateWalkScore(value, allInputs);
    case 'transitScore':
      return validateTransitScore(value, allInputs);
    case 'bikeScore':
      return validateBikeScore(value, allInputs);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value);
    case 'inflationRate':
      return validateInflationRate(value);
    case 'propertyAppreciationRate':
      return validatePropertyAppreciationRate(value);
    case 'discountRate':
      return validateDiscountRate(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    case 'includeCharts':
      return validateIncludeCharts(value);
    default:
      return { isValid: true };
  }
}

function validatePropertyAddress(value: any): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Property address is required' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any): ValidationResult {
  const validTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial', 'industrial', 'land', 'mixed_use'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Valid property type is required' };
  }
  return { isValid: true };
}

function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property size must be greater than 0' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Property size cannot exceed 100,000 sq ft' };
  }
  if (allInputs?.propertyType === 'single_family' && value > 10000) {
    return { isValid: false, error: 'Property size seems unusually large for single family home' };
  }
  if (allInputs?.propertyType === 'condo' && value > 5000) {
    return { isValid: false, error: 'Property size seems unusually large for condominium' };
  }
  return { isValid: true };
}

function validatePropertyAge(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Property age must be 0 or greater' };
  }
  if (value > 200) {
    return { isValid: false, error: 'Property age cannot exceed 200 years' };
  }
  return { isValid: true };
}

function validateNumberOfUnits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Number of units must be greater than 0' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'Number of units cannot exceed 1,000' };
  }
  if (allInputs?.propertyType === 'single_family' && value > 1) {
    return { isValid: false, error: 'Single family properties should have 1 unit' };
  }
  if (allInputs?.propertyType === 'multi_family' && value < 2) {
    return { isValid: false, error: 'Multi-family properties should have 2 or more units' };
  }
  return { isValid: true };
}

function validateNumberOfBedrooms(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Number of bedrooms must be 0 or greater' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Number of bedrooms cannot exceed 20' };
  }
  return { isValid: true };
}

function validateNumberOfBathrooms(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Number of bathrooms must be 0 or greater' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Number of bathrooms cannot exceed 20' };
  }
  return { isValid: true };
}

function validatePropertyPrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property price must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Property price cannot exceed $100 million' };
  }
  if (allInputs?.propertySize) {
    const pricePerSqFt = value / allInputs.propertySize;
    if (pricePerSqFt < 10) {
      return { isValid: false, error: 'Property price seems unusually low relative to property size' };
    }
    if (pricePerSqFt > 10000) {
      return { isValid: false, error: 'Property price seems unusually high relative to property size' };
    }
  }
  return { isValid: true };
}

function validateListPrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'List price must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'List price cannot exceed $100 million' };
  }
  if (allInputs?.propertyPrice) {
    if (value < allInputs.propertyPrice * 0.5) {
      return { isValid: false, error: 'List price seems unusually low relative to property price' };
    }
    if (value > allInputs.propertyPrice * 2) {
      return { isValid: false, error: 'List price seems unusually high relative to property price' };
    }
  }
  return { isValid: true };
}

function validateSalePrice(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Sale price must be 0 or greater' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Sale price cannot exceed $100 million' };
  }
  return { isValid: true };
}

function validateAppraisalValue(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Appraisal value must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Appraisal value cannot exceed $100 million' };
  }
  return { isValid: true };
}

function validateAssessedValue(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Assessed value must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Assessed value cannot exceed $100 million' };
  }
  return { isValid: true };
}

function validateComparableProperties(value: any): ValidationResult {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return { isValid: false, error: 'At least one comparable property is required' };
  }
  for (let i = 0; i < value.length; i++) {
    const property = value[i];
    if (!property.address || property.address.trim().length === 0) {
      return { isValid: false, error: `Comparable property ${i + 1} address is required` };
    }
    if (!property.salePrice || property.salePrice <= 0) {
      return { isValid: false, error: `Comparable property ${i + 1} sale price must be greater than 0` };
    }
    if (!property.size || property.size <= 0) {
      return { isValid: false, error: `Comparable property ${i + 1} size must be greater than 0` };
    }
    if (!property.age || property.age < 0) {
      return { isValid: false, error: `Comparable property ${i + 1} age must be 0 or greater` };
    }
    if (!property.bedrooms || property.bedrooms < 0) {
      return { isValid: false, error: `Comparable property ${i + 1} bedrooms must be 0 or greater` };
    }
    if (!property.bathrooms || property.bathrooms < 0) {
      return { isValid: false, error: `Comparable property ${i + 1} bathrooms must be 0 or greater` };
    }
    if (!property.saleDate) {
      return { isValid: false, error: `Comparable property ${i + 1} sale date is required` };
    }
    if (!property.condition || property.condition.trim().length === 0) {
      return { isValid: false, error: `Comparable property ${i + 1} condition is required` };
    }
    if (!property.location || property.location.trim().length === 0) {
      return { isValid: false, error: `Comparable property ${i + 1} location is required` };
    }
    if (typeof property.adjustments !== 'number') {
      return { isValid: false, error: `Comparable property ${i + 1} adjustments must be a number` };
    }
  }
  return { isValid: true };
}

function validateMarketLocation(value: any): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Market location is required' };
  }
  return { isValid: true };
}

function validateMarketCondition(value: any): ValidationResult {
  const validConditions = ['declining', 'stable', 'growing', 'hot'];
  if (!value || !validConditions.includes(value)) {
    return { isValid: false, error: 'Valid market condition is required' };
  }
  return { isValid: true };
}

function validateMarketGrowthRate(value: any): ValidationResult {
  if (!value || value < -50) {
    return { isValid: false, error: 'Market growth rate must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Market growth rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateDaysOnMarket(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Days on market must be 0 or greater' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'Days on market cannot exceed 1,000' };
  }
  return { isValid: true };
}

function validatePropertyCondition(value: any): ValidationResult {
  const validConditions = ['excellent', 'good', 'average', 'poor', 'needs_repair'];
  if (!value || !validConditions.includes(value)) {
    return { isValid: false, error: 'Valid property condition is required' };
  }
  return { isValid: true };
}

function validatePropertyStyle(value: any): ValidationResult {
  const validStyles = ['modern', 'traditional', 'contemporary', 'colonial', 'ranch', 'other'];
  if (!value || !validStyles.includes(value)) {
    return { isValid: false, error: 'Valid property style is required' };
  }
  return { isValid: true };
}

function validateLotSize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Lot size must be greater than 0' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Lot size cannot exceed 1,000,000 sq ft' };
  }
  if (allInputs?.propertySize) {
    if (value < allInputs.propertySize) {
      return { isValid: false, error: 'Lot size should typically be larger than property size' };
    }
    if (value > allInputs.propertySize * 10) {
      return { isValid: false, error: 'Lot size seems unusually large relative to property size' };
    }
  }
  return { isValid: true };
}

function validateGarageSpaces(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Garage spaces must be 0 or greater' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Garage spaces cannot exceed 20' };
  }
  return { isValid: true };
}

function validateParkingSpaces(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Parking spaces must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Parking spaces cannot exceed 100' };
  }
  return { isValid: true };
}

function validateAmenities(value: any): ValidationResult {
  if (!value || !Array.isArray(value)) {
    return { isValid: false, error: 'Amenities must be an array' };
  }
  for (let i = 0; i < value.length; i++) {
    const amenity = value[i];
    if (!amenity.amenity || amenity.amenity.trim().length === 0) {
      return { isValid: false, error: `Amenity ${i + 1} name is required` };
    }
    if (typeof amenity.value !== 'number' || amenity.value < 0) {
      return { isValid: false, error: `Amenity ${i + 1} value must be 0 or greater` };
    }
    if (typeof amenity.included !== 'boolean') {
      return { isValid: false, error: `Amenity ${i + 1} included status must be true or false` };
    }
  }
  return { isValid: true };
}

function validateSchoolDistrict(value: any): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'School district is required' };
  }
  return { isValid: true };
}

function validateSchoolRating(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'School rating must be 0 or greater' };
  }
  if (value > 10) {
    return { isValid: false, error: 'School rating cannot exceed 10' };
  }
  return { isValid: true };
}

function validateCrimeRate(value: any): ValidationResult {
  const validRates = ['low', 'medium', 'high'];
  if (!value || !validRates.includes(value)) {
    return { isValid: false, error: 'Valid crime rate is required' };
  }
  return { isValid: true };
}

function validateWalkScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Walk score must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Walk score cannot exceed 100' };
  }
  if (allInputs?.transitScore && allInputs?.bikeScore) {
    if (value + allInputs.transitScore + allInputs.bikeScore > 300) {
      return { isValid: false, error: 'Total accessibility scores cannot exceed 300' };
    }
  }
  return { isValid: true };
}

function validateTransitScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Transit score must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Transit score cannot exceed 100' };
  }
  if (allInputs?.walkScore && allInputs?.bikeScore) {
    if (allInputs.walkScore + value + allInputs.bikeScore > 300) {
      return { isValid: false, error: 'Total accessibility scores cannot exceed 300' };
    }
  }
  return { isValid: true };
}

function validateBikeScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Bike score must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Bike score cannot exceed 100' };
  }
  if (allInputs?.walkScore && allInputs?.transitScore) {
    if (allInputs.walkScore + allInputs.transitScore + value > 300) {
      return { isValid: false, error: 'Total accessibility scores cannot exceed 300' };
    }
  }
  return { isValid: true };
}

function validateAnalysisPeriod(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0' };
  }
  if (value > 120) {
    return { isValid: false, error: 'Analysis period cannot exceed 120 months' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any): ValidationResult {
  if (!value || value < -50) {
    return { isValid: false, error: 'Inflation rate must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Inflation rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validatePropertyAppreciationRate(value: any): ValidationResult {
  if (!value || value < -50) {
    return { isValid: false, error: 'Property appreciation rate must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Property appreciation rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateDiscountRate(value: any): ValidationResult {
  if (!value || value < -100) {
    return { isValid: false, error: 'Discount rate must be -100% or greater' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'Discount rate cannot exceed 1000%' };
  }
  return { isValid: true };
}

function validateCurrency(value: any): ValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!value || !validCurrencies.includes(value)) {
    return { isValid: false, error: 'Valid currency is required' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any): ValidationResult {
  const validFormats = ['percentage', 'decimal', 'currency'];
  if (!value || !validFormats.includes(value)) {
    return { isValid: false, error: 'Valid display format is required' };
  }
  return { isValid: true };
}

function validateIncludeCharts(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include charts must be true or false' };
  }
  return { isValid: true };
}
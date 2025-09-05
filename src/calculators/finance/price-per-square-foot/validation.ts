import { PricePerSquareFootInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validatePricePerSquareFootInputs(inputs: PricePerSquareFootInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Property Information Validation
  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }

  if (!inputs.propertyType || !['single_family', 'multi_family', 'condo', 'townhouse', 'commercial', 'industrial', 'land', 'mixed_use'].includes(inputs.propertyType)) {
    errors.push('Property type must be one of: single_family, multi_family, condo, townhouse, commercial, industrial, land, mixed_use');
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.push('Property size must be greater than 0');
  }

  if (inputs.propertyAge < 0) {
    errors.push('Property age cannot be negative');
  }

  if (inputs.numberOfUnits < 0) {
    errors.push('Number of units cannot be negative');
  }

  if (inputs.numberOfBedrooms < 0) {
    errors.push('Number of bedrooms cannot be negative');
  }

  if (inputs.numberOfBathrooms < 0) {
    errors.push('Number of bathrooms cannot be negative');
  }

  // Price Information Validation
  if (!inputs.propertyPrice || inputs.propertyPrice <= 0) {
    errors.push('Property price must be greater than 0');
  }

  if (inputs.listPrice <= 0) {
    errors.push('List price must be greater than 0');
  }

  if (inputs.salePrice <= 0) {
    errors.push('Sale price must be greater than 0');
  }

  if (inputs.appraisalValue <= 0) {
    errors.push('Appraisal value must be greater than 0');
  }

  if (inputs.assessedValue <= 0) {
    errors.push('Assessed value must be greater than 0');
  }

  // Comparable Properties Validation
  if (!inputs.comparableProperties || !Array.isArray(inputs.comparableProperties)) {
    errors.push('Comparable properties must be an array');
  } else {
    inputs.comparableProperties.forEach((comp, index) => {
      if (!comp.address || comp.address.trim().length === 0) {
        errors.push(`Comparable property ${index + 1}: address is required`);
      }
      if (comp.salePrice <= 0) {
        errors.push(`Comparable property ${index + 1}: sale price must be greater than 0`);
      }
      if (comp.size <= 0) {
        errors.push(`Comparable property ${index + 1}: size must be greater than 0`);
      }
      if (comp.age < 0) {
        errors.push(`Comparable property ${index + 1}: age cannot be negative`);
      }
      if (comp.bedrooms < 0) {
        errors.push(`Comparable property ${index + 1}: bedrooms cannot be negative`);
      }
      if (comp.bathrooms < 0) {
        errors.push(`Comparable property ${index + 1}: bathrooms cannot be negative`);
      }
      if (!comp.saleDate) {
        errors.push(`Comparable property ${index + 1}: sale date is required`);
      } else {
        const saleDate = new Date(comp.saleDate);
        if (isNaN(saleDate.getTime())) {
          errors.push(`Comparable property ${index + 1}: sale date must be a valid date`);
        }
      }
    });
  }

  // Market Information Validation
  if (!inputs.marketLocation || inputs.marketLocation.trim().length === 0) {
    errors.push('Market location is required');
  }

  if (!inputs.marketCondition || !['declining', 'stable', 'growing', 'hot'].includes(inputs.marketCondition)) {
    errors.push('Market condition must be one of: declining, stable, growing, hot');
  }

  if (inputs.marketGrowthRate < 0) {
    errors.push('Market growth rate cannot be negative');
  }

  if (inputs.daysOnMarket < 0) {
    errors.push('Days on market cannot be negative');
  }

  // Property Features Validation
  if (!inputs.propertyCondition || !['excellent', 'good', 'average', 'poor', 'needs_repair'].includes(inputs.propertyCondition)) {
    errors.push('Property condition must be one of: excellent, good, average, poor, needs_repair');
  }

  if (!inputs.propertyStyle || !['modern', 'traditional', 'contemporary', 'colonial', 'ranch', 'other'].includes(inputs.propertyStyle)) {
    errors.push('Property style must be one of: modern, traditional, contemporary, colonial, ranch, other');
  }

  if (inputs.lotSize < 0) {
    errors.push('Lot size cannot be negative');
  }

  if (inputs.garageSpaces < 0) {
    errors.push('Garage spaces cannot be negative');
  }

  if (inputs.parkingSpaces < 0) {
    errors.push('Parking spaces cannot be negative');
  }

  // Amenities Validation
  if (!inputs.amenities || !Array.isArray(inputs.amenities)) {
    errors.push('Amenities must be an array');
  } else {
    inputs.amenities.forEach((amenity, index) => {
      if (!amenity.amenity || amenity.amenity.trim().length === 0) {
        errors.push(`Amenity ${index + 1}: amenity name is required`);
      }
      if (amenity.value < 0) {
        errors.push(`Amenity ${index + 1}: value cannot be negative`);
      }
    });
  }

  // Location Factors Validation
  if (!inputs.schoolDistrict || inputs.schoolDistrict.trim().length === 0) {
    errors.push('School district is required');
  }

  if (inputs.schoolRating < 0 || inputs.schoolRating > 10) {
    errors.push('School rating must be between 0 and 10');
  }

  if (!inputs.crimeRate || !['low', 'medium', 'high'].includes(inputs.crimeRate)) {
    errors.push('Crime rate must be one of: low, medium, high');
  }

  if (inputs.walkScore < 0 || inputs.walkScore > 100) {
    errors.push('Walk score must be between 0 and 100');
  }

  if (inputs.transitScore < 0 || inputs.transitScore > 100) {
    errors.push('Transit score must be between 0 and 100');
  }

  if (inputs.bikeScore < 0 || inputs.bikeScore > 100) {
    errors.push('Bike score must be between 0 and 100');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (inputs.inflationRate < 0) {
    errors.push('Inflation rate cannot be negative');
  }

  if (inputs.propertyAppreciationRate < 0) {
    errors.push('Property appreciation rate cannot be negative');
  }

  if (inputs.discountRate < 0) {
    errors.push('Discount rate cannot be negative');
  }

  // Reporting Preferences Validation
  if (!inputs.currency || !['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.push('Currency must be one of: USD, EUR, GBP, CAD, AUD');
  }

  if (!inputs.displayFormat || !['percentage', 'decimal', 'currency'].includes(inputs.displayFormat)) {
    errors.push('Display format must be one of: percentage, decimal, currency');
  }

  // Cross-field Validation
  if (inputs.propertySize < 100) {
    warnings.push('Property size is very small');
  }

  if (inputs.propertySize > 10000) {
    warnings.push('Property size is very large');
  }

  if (inputs.propertyAge > 100) {
    warnings.push('Property age is very high');
  }

  if (inputs.numberOfBedrooms > 10) {
    warnings.push('Number of bedrooms is unusually high');
  }

  if (inputs.numberOfBathrooms > 10) {
    warnings.push('Number of bathrooms is unusually high');
  }

  // Price Validation
  if (inputs.propertyPrice > 100000000) {
    warnings.push('Property price is very high');
  }

  if (inputs.propertyPrice < 50000) {
    warnings.push('Property price is very low');
  }

  // Price Consistency Validation
  if (inputs.listPrice !== inputs.propertyPrice) {
    warnings.push('List price differs from property price');
  }

  if (inputs.salePrice !== inputs.propertyPrice) {
    warnings.push('Sale price differs from property price');
  }

  if (Math.abs(inputs.appraisalValue - inputs.propertyPrice) / inputs.propertyPrice > 0.2) {
    warnings.push('Appraisal value differs significantly from property price');
  }

  if (Math.abs(inputs.assessedValue - inputs.propertyPrice) / inputs.propertyPrice > 0.3) {
    warnings.push('Assessed value differs significantly from property price');
  }

  // Comparable Properties Validation
  if (inputs.comparableProperties.length < 3) {
    warnings.push('Fewer than 3 comparable properties may affect analysis accuracy');
  }

  if (inputs.comparableProperties.length > 20) {
    warnings.push('More than 20 comparable properties may include less relevant data');
  }

  // Market Growth Rate Validation
  if (inputs.marketGrowthRate > 0.5) {
    warnings.push('Market growth rate is very high, may be unrealistic');
  }

  if (inputs.marketGrowthRate < 0 && inputs.marketCondition !== 'declining') {
    warnings.push('Negative market growth rate may not align with market condition');
  }

  // Days on Market Validation
  if (inputs.daysOnMarket > 365) {
    warnings.push('Property has been on market for more than a year');
  }

  if (inputs.daysOnMarket > 180) {
    warnings.push('Property has been on market for more than 6 months');
  }

  // Property Condition Validation
  if (inputs.propertyCondition === 'poor' || inputs.propertyCondition === 'needs_repair') {
    warnings.push('Property condition may significantly impact value');
  }

  // Location Factors Validation
  if (inputs.schoolRating < 5) {
    warnings.push('Low school rating may impact property value');
  }

  if (inputs.crimeRate === 'high') {
    warnings.push('High crime rate may impact property value');
  }

  if (inputs.walkScore < 30) {
    warnings.push('Low walkability score may impact property value');
  }

  // Amenities Validation
  if (inputs.amenities.length === 0) {
    warnings.push('No amenities listed may affect property value');
  }

  const totalAmenityValue = inputs.amenities.reduce((sum, amenity) => sum + amenity.value, 0);
  if (totalAmenityValue > inputs.propertyPrice * 0.1) {
    warnings.push('Amenity values seem unusually high relative to property price');
  }

  // Analysis Parameters Validation
  if (inputs.inflationRate > 0.1) {
    warnings.push('Inflation rate is very high');
  }

  if (inputs.propertyAppreciationRate > 0.2) {
    warnings.push('Property appreciation rate is very high, may be unrealistic');
  }

  if (inputs.discountRate > 0.2) {
    warnings.push('Discount rate is very high');
  }

  // Comparable Properties Date Validation
  if (inputs.comparableProperties.length > 0) {
    const currentDate = new Date();
    const oldComparables = inputs.comparableProperties.filter(comp => {
      const saleDate = new Date(comp.saleDate);
      const monthsDiff = (currentDate.getFullYear() - saleDate.getFullYear()) * 12 + 
                        (currentDate.getMonth() - saleDate.getMonth());
      return monthsDiff > 12;
    });

    if (oldComparables.length > inputs.comparableProperties.length * 0.5) {
      warnings.push('More than half of comparable properties are older than 12 months');
    }
  }

  // Property Type Specific Validation
  if (inputs.propertyType === 'land' && inputs.numberOfBedrooms > 0) {
    warnings.push('Land properties typically do not have bedrooms');
  }

  if (inputs.propertyType === 'land' && inputs.numberOfBathrooms > 0) {
    warnings.push('Land properties typically do not have bathrooms');
  }

  if (inputs.propertyType === 'commercial' && inputs.numberOfBedrooms > 0) {
    warnings.push('Commercial properties typically do not have bedrooms');
  }

  if (inputs.propertyType === 'industrial' && inputs.numberOfBedrooms > 0) {
    warnings.push('Industrial properties typically do not have bedrooms');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
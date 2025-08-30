import { PricePerSquareFootInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validatePricePerSquareFootInputs(inputs: PricePerSquareFootInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Property Information Validation
  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.propertyAddress = 'Property address is required';
  }

  if (!inputs.propertyType || !['single_family', 'multi_family', 'condo', 'townhouse', 'commercial', 'industrial', 'land', 'mixed_use'].includes(inputs.propertyType)) {
    errors.propertyType = 'Valid property type is required';
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.propertySize = 'Property size must be greater than 0';
  }
  if (inputs.propertySize > 100000) {
    errors.propertySize = 'Property size cannot exceed 100,000 sq ft';
  }

  if (!inputs.propertyAge || inputs.propertyAge < 0) {
    errors.propertyAge = 'Property age must be 0 or greater';
  }
  if (inputs.propertyAge > 200) {
    errors.propertyAge = 'Property age cannot exceed 200 years';
  }

  if (!inputs.numberOfUnits || inputs.numberOfUnits <= 0) {
    errors.numberOfUnits = 'Number of units must be greater than 0';
  }
  if (inputs.numberOfUnits > 1000) {
    errors.numberOfUnits = 'Number of units cannot exceed 1,000';
  }

  if (!inputs.numberOfBedrooms || inputs.numberOfBedrooms < 0) {
    errors.numberOfBedrooms = 'Number of bedrooms must be 0 or greater';
  }
  if (inputs.numberOfBedrooms > 20) {
    errors.numberOfBedrooms = 'Number of bedrooms cannot exceed 20';
  }

  if (!inputs.numberOfBathrooms || inputs.numberOfBathrooms < 0) {
    errors.numberOfBathrooms = 'Number of bathrooms must be 0 or greater';
  }
  if (inputs.numberOfBathrooms > 20) {
    errors.numberOfBathrooms = 'Number of bathrooms cannot exceed 20';
  }

  // Price Information Validation
  if (!inputs.propertyPrice || inputs.propertyPrice <= 0) {
    errors.propertyPrice = 'Property price must be greater than 0';
  }
  if (inputs.propertyPrice > 100000000) {
    errors.propertyPrice = 'Property price cannot exceed $100 million';
  }

  if (!inputs.listPrice || inputs.listPrice <= 0) {
    errors.listPrice = 'List price must be greater than 0';
  }
  if (inputs.listPrice > 100000000) {
    errors.listPrice = 'List price cannot exceed $100 million';
  }

  if (!inputs.salePrice || inputs.salePrice < 0) {
    errors.salePrice = 'Sale price must be 0 or greater';
  }
  if (inputs.salePrice > 100000000) {
    errors.salePrice = 'Sale price cannot exceed $100 million';
  }

  if (!inputs.appraisalValue || inputs.appraisalValue <= 0) {
    errors.appraisalValue = 'Appraisal value must be greater than 0';
  }
  if (inputs.appraisalValue > 100000000) {
    errors.appraisalValue = 'Appraisal value cannot exceed $100 million';
  }

  if (!inputs.assessedValue || inputs.assessedValue <= 0) {
    errors.assessedValue = 'Assessed value must be greater than 0';
  }
  if (inputs.assessedValue > 100000000) {
    errors.assessedValue = 'Assessed value cannot exceed $100 million';
  }

  // Comparable Properties Validation
  if (!inputs.comparableProperties || inputs.comparableProperties.length === 0) {
    errors.comparableProperties = 'At least one comparable property is required';
  } else {
    inputs.comparableProperties.forEach((property, index) => {
      if (!property.address || property.address.trim().length === 0) {
        errors[`comparableProperties.${index}.address`] = 'Comparable property address is required';
      }
      if (!property.salePrice || property.salePrice <= 0) {
        errors[`comparableProperties.${index}.salePrice`] = 'Comparable property sale price must be greater than 0';
      }
      if (!property.size || property.size <= 0) {
        errors[`comparableProperties.${index}.size`] = 'Comparable property size must be greater than 0';
      }
      if (!property.age || property.age < 0) {
        errors[`comparableProperties.${index}.age`] = 'Comparable property age must be 0 or greater';
      }
      if (!property.bedrooms || property.bedrooms < 0) {
        errors[`comparableProperties.${index}.bedrooms`] = 'Comparable property bedrooms must be 0 or greater';
      }
      if (!property.bathrooms || property.bathrooms < 0) {
        errors[`comparableProperties.${index}.bathrooms`] = 'Comparable property bathrooms must be 0 or greater';
      }
      if (!property.saleDate) {
        errors[`comparableProperties.${index}.saleDate`] = 'Comparable property sale date is required';
      }
      if (!property.condition || property.condition.trim().length === 0) {
        errors[`comparableProperties.${index}.condition`] = 'Comparable property condition is required';
      }
      if (!property.location || property.location.trim().length === 0) {
        errors[`comparableProperties.${index}.location`] = 'Comparable property location is required';
      }
      if (typeof property.adjustments !== 'number') {
        errors[`comparableProperties.${index}.adjustments`] = 'Comparable property adjustments must be a number';
      }
    });
  }

  // Market Information Validation
  if (!inputs.marketLocation || inputs.marketLocation.trim().length === 0) {
    errors.marketLocation = 'Market location is required';
  }

  if (!inputs.marketCondition || !['declining', 'stable', 'growing', 'hot'].includes(inputs.marketCondition)) {
    errors.marketCondition = 'Valid market condition is required';
  }

  if (!inputs.marketGrowthRate || inputs.marketGrowthRate < -50) {
    errors.marketGrowthRate = 'Market growth rate must be -50% or greater';
  }
  if (inputs.marketGrowthRate > 100) {
    errors.marketGrowthRate = 'Market growth rate cannot exceed 100%';
  }

  if (!inputs.daysOnMarket || inputs.daysOnMarket < 0) {
    errors.daysOnMarket = 'Days on market must be 0 or greater';
  }
  if (inputs.daysOnMarket > 1000) {
    errors.daysOnMarket = 'Days on market cannot exceed 1,000';
  }

  // Property Features Validation
  if (!inputs.propertyCondition || !['excellent', 'good', 'average', 'poor', 'needs_repair'].includes(inputs.propertyCondition)) {
    errors.propertyCondition = 'Valid property condition is required';
  }

  if (!inputs.propertyStyle || !['modern', 'traditional', 'contemporary', 'colonial', 'ranch', 'other'].includes(inputs.propertyStyle)) {
    errors.propertyStyle = 'Valid property style is required';
  }

  if (!inputs.lotSize || inputs.lotSize <= 0) {
    errors.lotSize = 'Lot size must be greater than 0';
  }
  if (inputs.lotSize > 1000000) {
    errors.lotSize = 'Lot size cannot exceed 1,000,000 sq ft';
  }

  if (!inputs.garageSpaces || inputs.garageSpaces < 0) {
    errors.garageSpaces = 'Garage spaces must be 0 or greater';
  }
  if (inputs.garageSpaces > 20) {
    errors.garageSpaces = 'Garage spaces cannot exceed 20';
  }

  if (!inputs.parkingSpaces || inputs.parkingSpaces < 0) {
    errors.parkingSpaces = 'Parking spaces must be 0 or greater';
  }
  if (inputs.parkingSpaces > 100) {
    errors.parkingSpaces = 'Parking spaces cannot exceed 100';
  }

  // Amenities Validation
  if (!inputs.amenities || !Array.isArray(inputs.amenities)) {
    errors.amenities = 'Amenities must be an array';
  } else {
    inputs.amenities.forEach((amenity, index) => {
      if (!amenity.amenity || amenity.amenity.trim().length === 0) {
        errors[`amenities.${index}.amenity`] = 'Amenity name is required';
      }
      if (typeof amenity.value !== 'number' || amenity.value < 0) {
        errors[`amenities.${index}.value`] = 'Amenity value must be 0 or greater';
      }
      if (typeof amenity.included !== 'boolean') {
        errors[`amenities.${index}.included`] = 'Amenity included status must be true or false';
      }
    });
  }

  // Location Factors Validation
  if (!inputs.schoolDistrict || inputs.schoolDistrict.trim().length === 0) {
    errors.schoolDistrict = 'School district is required';
  }

  if (!inputs.schoolRating || inputs.schoolRating < 0) {
    errors.schoolRating = 'School rating must be 0 or greater';
  }
  if (inputs.schoolRating > 10) {
    errors.schoolRating = 'School rating cannot exceed 10';
  }

  if (!inputs.crimeRate || !['low', 'medium', 'high'].includes(inputs.crimeRate)) {
    errors.crimeRate = 'Valid crime rate is required';
  }

  if (!inputs.walkScore || inputs.walkScore < 0) {
    errors.walkScore = 'Walk score must be 0 or greater';
  }
  if (inputs.walkScore > 100) {
    errors.walkScore = 'Walk score cannot exceed 100';
  }

  if (!inputs.transitScore || inputs.transitScore < 0) {
    errors.transitScore = 'Transit score must be 0 or greater';
  }
  if (inputs.transitScore > 100) {
    errors.transitScore = 'Transit score cannot exceed 100';
  }

  if (!inputs.bikeScore || inputs.bikeScore < 0) {
    errors.bikeScore = 'Bike score must be 0 or greater';
  }
  if (inputs.bikeScore > 100) {
    errors.bikeScore = 'Bike score cannot exceed 100';
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.analysisPeriod = 'Analysis period must be greater than 0';
  }
  if (inputs.analysisPeriod > 120) {
    errors.analysisPeriod = 'Analysis period cannot exceed 120 months';
  }

  if (!inputs.inflationRate || inputs.inflationRate < -50) {
    errors.inflationRate = 'Inflation rate must be -50% or greater';
  }
  if (inputs.inflationRate > 100) {
    errors.inflationRate = 'Inflation rate cannot exceed 100%';
  }

  if (!inputs.propertyAppreciationRate || inputs.propertyAppreciationRate < -50) {
    errors.propertyAppreciationRate = 'Property appreciation rate must be -50% or greater';
  }
  if (inputs.propertyAppreciationRate > 100) {
    errors.propertyAppreciationRate = 'Property appreciation rate cannot exceed 100%';
  }

  if (!inputs.discountRate || inputs.discountRate < -100) {
    errors.discountRate = 'Discount rate must be -100% or greater';
  }
  if (inputs.discountRate > 1000) {
    errors.discountRate = 'Discount rate cannot exceed 1000%';
  }

  // Reporting Preferences Validation
  if (!inputs.currency || !['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Valid currency is required';
  }

  if (!inputs.displayFormat || !['percentage', 'decimal', 'currency'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Valid display format is required';
  }

  if (typeof inputs.includeCharts !== 'boolean') {
    errors.includeCharts = 'Include charts must be true or false';
  }

  // Business Logic Validations
  // Check if property price is reasonable relative to property size
  const pricePerSqFt = inputs.propertyPrice / inputs.propertySize;
  if (pricePerSqFt < 10) {
    errors.propertyPrice = 'Property price seems unusually low relative to property size';
  }
  if (pricePerSqFt > 10000) {
    errors.propertyPrice = 'Property price seems unusually high relative to property size';
  }

  // Check if list price is reasonable relative to property price
  if (inputs.listPrice < inputs.propertyPrice * 0.5) {
    errors.listPrice = 'List price seems unusually low relative to property price';
  }
  if (inputs.listPrice > inputs.propertyPrice * 2) {
    errors.listPrice = 'List price seems unusually high relative to property price';
  }

  // Check if comparable properties are reasonable
  if (inputs.comparableProperties.length > 0) {
    const comparablePrices = inputs.comparableProperties.map(prop => prop.salePrice / prop.size);
    const avgComparablePrice = comparablePrices.reduce((sum, price) => sum + price, 0) / comparablePrices.length;
    
    if (Math.abs(pricePerSqFt - avgComparablePrice) / avgComparablePrice > 2) {
      errors.propertyPrice = 'Property price seems significantly different from comparable properties';
    }
  }

  // Check if property size is reasonable for property type
  if (inputs.propertyType === 'single_family' && inputs.propertySize > 10000) {
    errors.propertySize = 'Property size seems unusually large for single family home';
  }
  if (inputs.propertyType === 'condo' && inputs.propertySize > 5000) {
    errors.propertySize = 'Property size seems unusually large for condominium';
  }

  // Check if number of units is reasonable for property type
  if (inputs.propertyType === 'single_family' && inputs.numberOfUnits > 1) {
    errors.numberOfUnits = 'Single family properties should have 1 unit';
  }
  if (inputs.propertyType === 'multi_family' && inputs.numberOfUnits < 2) {
    errors.numberOfUnits = 'Multi-family properties should have 2 or more units';
  }

  // Check if lot size is reasonable relative to property size
  if (inputs.lotSize < inputs.propertySize) {
    errors.lotSize = 'Lot size should typically be larger than property size';
  }
  if (inputs.lotSize > inputs.propertySize * 10) {
    errors.lotSize = 'Lot size seems unusually large relative to property size';
  }

  // Check if scores are reasonable
  if (inputs.walkScore + inputs.transitScore + inputs.bikeScore > 300) {
    errors.walkScore = 'Total accessibility scores cannot exceed 300';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validatePricePerSquareFootOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate that all required output fields are present and have reasonable values
  if (typeof outputs.pricePerSquareFoot !== 'number' || isNaN(outputs.pricePerSquareFoot)) {
    errors.pricePerSquareFoot = 'Price per square foot must be a valid number';
  }

  if (typeof outputs.averageComparablePrice !== 'number' || isNaN(outputs.averageComparablePrice)) {
    errors.averageComparablePrice = 'Average comparable price must be a valid number';
  }

  if (typeof outputs.medianComparablePrice !== 'number' || isNaN(outputs.medianComparablePrice)) {
    errors.medianComparablePrice = 'Median comparable price must be a valid number';
  }

  if (typeof outputs.estimatedValue !== 'number' || isNaN(outputs.estimatedValue)) {
    errors.estimatedValue = 'Estimated value must be a valid number';
  }

  if (typeof outputs.overUnderPricedPercentage !== 'number' || isNaN(outputs.overUnderPricedPercentage)) {
    errors.overUnderPricedPercentage = 'Over/under priced percentage must be a valid number';
  }

  if (!outputs.pricePosition || typeof outputs.pricePosition !== 'string') {
    errors.pricePosition = 'Price position is required';
  }

  if (typeof outputs.riskScore !== 'number' || isNaN(outputs.riskScore)) {
    errors.riskScore = 'Risk score must be a valid number';
  }

  if (typeof outputs.pricePerformance !== 'number' || isNaN(outputs.pricePerformance)) {
    errors.pricePerformance = 'Price performance must be a valid number';
  }

  // Validate analysis object
  if (!outputs.analysis || typeof outputs.analysis !== 'object') {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.priceRating || typeof outputs.analysis.priceRating !== 'string') {
      errors.analysis = 'Price rating is required';
    }
    if (!outputs.analysis.valueRating || typeof outputs.analysis.valueRating !== 'string') {
      errors.analysis = 'Value rating is required';
    }
    if (!outputs.analysis.recommendation || typeof outputs.analysis.recommendation !== 'string') {
      errors.analysis = 'Recommendation is required';
    }
  }

  // Validate additional metrics
  if (typeof outputs.listPricePerSquareFoot !== 'number' || isNaN(outputs.listPricePerSquareFoot)) {
    errors.listPricePerSquareFoot = 'List price per square foot must be a valid number';
  }

  if (typeof outputs.salePricePerSquareFoot !== 'number' || isNaN(outputs.salePricePerSquareFoot)) {
    errors.salePricePerSquareFoot = 'Sale price per square foot must be a valid number';
  }

  if (typeof outputs.appraisalPricePerSquareFoot !== 'number' || isNaN(outputs.appraisalPricePerSquareFoot)) {
    errors.appraisalPricePerSquareFoot = 'Appraisal price per square foot must be a valid number';
  }

  if (typeof outputs.assessedPricePerSquareFoot !== 'number' || isNaN(outputs.assessedPricePerSquareFoot)) {
    errors.assessedPricePerSquareFoot = 'Assessed price per square foot must be a valid number';
  }

  if (typeof outputs.pricePercentile !== 'number' || isNaN(outputs.pricePercentile)) {
    errors.pricePercentile = 'Price percentile must be a valid number';
  }

  if (typeof outputs.marketAveragePrice !== 'number' || isNaN(outputs.marketAveragePrice)) {
    errors.marketAveragePrice = 'Market average price must be a valid number';
  }

  if (typeof outputs.marketMedianPrice !== 'number' || isNaN(outputs.marketMedianPrice)) {
    errors.marketMedianPrice = 'Market median price must be a valid number';
  }

  if (typeof outputs.priceVolatility !== 'number' || isNaN(outputs.priceVolatility)) {
    errors.priceVolatility = 'Price volatility must be a valid number';
  }

  if (typeof outputs.marketRisk !== 'number' || isNaN(outputs.marketRisk)) {
    errors.marketRisk = 'Market risk must be a valid number';
  }

  if (typeof outputs.valuationRisk !== 'number' || isNaN(outputs.valuationRisk)) {
    errors.valuationRisk = 'Valuation risk must be a valid number';
  }

  if (typeof outputs.marketPerformance !== 'number' || isNaN(outputs.marketPerformance)) {
    errors.marketPerformance = 'Market performance must be a valid number';
  }

  if (typeof outputs.relativePerformance !== 'number' || isNaN(outputs.relativePerformance)) {
    errors.relativePerformance = 'Relative performance must be a valid number';
  }

  // Validate arrays
  if (!outputs.priceTrend || !Array.isArray(outputs.priceTrend)) {
    errors.priceTrend = 'Price trend array is required';
  }

  if (!outputs.sensitivityMatrix || !Array.isArray(outputs.sensitivityMatrix)) {
    errors.sensitivityMatrix = 'Sensitivity matrix array is required';
  }

  if (!outputs.scenarios || !Array.isArray(outputs.scenarios)) {
    errors.scenarios = 'Scenarios array is required';
  }

  if (!outputs.comparisonAnalysis || !Array.isArray(outputs.comparisonAnalysis)) {
    errors.comparisonAnalysis = 'Comparison analysis array is required';
  }

  if (!outputs.benchmarkAnalysis || !Array.isArray(outputs.benchmarkAnalysis)) {
    errors.benchmarkAnalysis = 'Benchmark analysis array is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}
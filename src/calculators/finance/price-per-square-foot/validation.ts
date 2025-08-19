import { ValidationRuleFactory } from '../../../utils/validation';
import { PricePerSquareFootInputs } from './formulas';

/**
 * Validate price per square foot calculator inputs
 */
export function validatePricePerSquareFootInputs(inputs: Partial<PricePerSquareFootInputs>): string[] {
  const errors: string[] = [];

  // Required field validations
  if (inputs.propertyPrice === undefined) {
    errors.push('Property Price is required');
  }

  if (inputs.totalSquareFootage === undefined) {
    errors.push('Total Square Footage is required');
  }

  if (inputs.propertyType === undefined) {
    errors.push('Property Type is required');
  }

  if (inputs.calculationType === undefined) {
    errors.push('Calculation Type is required');
  }

  // Range validations
  if (inputs.propertyPrice !== undefined) {
    const propertyPricePositiveRule = ValidationRuleFactory.positive('propertyPrice', 'Property Price must be positive');
    if (!propertyPricePositiveRule.validator(inputs.propertyPrice)) {
      errors.push(propertyPricePositiveRule.message);
    }
    
    const propertyPriceRangeRule = ValidationRuleFactory.range('propertyPrice', 10000, 10000000, 'Property Price must be between $10,000 and $10,000,000');
    if (!propertyPriceRangeRule.validator(inputs.propertyPrice)) {
      errors.push(propertyPriceRangeRule.message);
    }
  }

  if (inputs.totalSquareFootage !== undefined) {
    const squareFootagePositiveRule = ValidationRuleFactory.positive('totalSquareFootage', 'Total Square Footage must be positive');
    if (!squareFootagePositiveRule.validator(inputs.totalSquareFootage)) {
      errors.push(squareFootagePositiveRule.message);
    }
    
    const squareFootageRangeRule = ValidationRuleFactory.range('totalSquareFootage', 100, 50000, 'Total Square Footage must be between 100 and 50,000 sq ft');
    if (!squareFootageRangeRule.validator(inputs.totalSquareFootage)) {
      errors.push(squareFootageRangeRule.message);
    }
  }

  if (inputs.bedrooms !== undefined) {
    const bedroomsNonNegativeRule = ValidationRuleFactory.nonNegative('bedrooms', 'Bedrooms cannot be negative');
    if (!bedroomsNonNegativeRule.validator(inputs.bedrooms)) {
      errors.push(bedroomsNonNegativeRule.message);
    }
    
    const bedroomsRangeRule = ValidationRuleFactory.range('bedrooms', 0, 20, 'Bedrooms must be between 0 and 20');
    if (!bedroomsRangeRule.validator(inputs.bedrooms)) {
      errors.push(bedroomsRangeRule.message);
    }
  }

  if (inputs.bathrooms !== undefined) {
    const bathroomsNonNegativeRule = ValidationRuleFactory.nonNegative('bathrooms', 'Bathrooms cannot be negative');
    if (!bathroomsNonNegativeRule.validator(inputs.bathrooms)) {
      errors.push(bathroomsNonNegativeRule.message);
    }
    
    const bathroomsRangeRule = ValidationRuleFactory.range('bathrooms', 0, 20, 'Bathrooms must be between 0 and 20');
    if (!bathroomsRangeRule.validator(inputs.bathrooms)) {
      errors.push(bathroomsRangeRule.message);
    }
  }

  if (inputs.yearBuilt !== undefined) {
    const yearBuiltRangeRule = ValidationRuleFactory.range('yearBuilt', 1800, 2030, 'Year Built must be between 1800 and 2030');
    if (!yearBuiltRangeRule.validator(inputs.yearBuilt)) {
      errors.push(yearBuiltRangeRule.message);
    }
  }

  if (inputs.lotSize !== undefined) {
    const lotSizeNonNegativeRule = ValidationRuleFactory.nonNegative('lotSize', 'Lot Size cannot be negative');
    if (!lotSizeNonNegativeRule.validator(inputs.lotSize)) {
      errors.push(lotSizeNonNegativeRule.message);
    }
    
    const lotSizeRangeRule = ValidationRuleFactory.range('lotSize', 0, 1000000, 'Lot Size must be between 0 and 1,000,000 sq ft');
    if (!lotSizeRangeRule.validator(inputs.lotSize)) {
      errors.push(lotSizeRangeRule.message);
    }
  }

  if (inputs.marketAverage !== undefined) {
    const marketAveragePositiveRule = ValidationRuleFactory.positive('marketAverage', 'Market Average must be positive');
    if (!marketAveragePositiveRule.validator(inputs.marketAverage)) {
      errors.push(marketAveragePositiveRule.message);
    }
    
    const marketAverageRangeRule = ValidationRuleFactory.range('marketAverage', 10, 2000, 'Market Average must be between $10 and $2,000 per sq ft');
    if (!marketAverageRangeRule.validator(inputs.marketAverage)) {
      errors.push(marketAverageRangeRule.message);
    }
  }

  if (inputs.comparableProperties !== undefined) {
    const comparablePropertiesNonNegativeRule = ValidationRuleFactory.nonNegative('comparableProperties', 'Comparable Properties cannot be negative');
    if (!comparablePropertiesNonNegativeRule.validator(inputs.comparableProperties)) {
      errors.push(comparablePropertiesNonNegativeRule.message);
    }
    
    const comparablePropertiesRangeRule = ValidationRuleFactory.range('comparableProperties', 0, 50, 'Comparable Properties must be between 0 and 50');
    if (!comparablePropertiesRangeRule.validator(inputs.comparableProperties)) {
      errors.push(comparablePropertiesRangeRule.message);
    }
  }

  if (inputs.adjustmentFactors !== undefined) {
    const adjustmentFactorsRangeRule = ValidationRuleFactory.range('adjustmentFactors', -50, 100, 'Adjustment Factors must be between -50% and 100%');
    if (!adjustmentFactorsRangeRule.validator(inputs.adjustmentFactors)) {
      errors.push(adjustmentFactorsRangeRule.message);
    }
  }

  // Business logic validations
  if (inputs.propertyPrice !== undefined && inputs.totalSquareFootage !== undefined) {
    const pricePerSqFt = inputs.propertyPrice / inputs.totalSquareFootage;
    
    if (pricePerSqFt < 10) {
      errors.push('Price per square foot seems unusually low. Please verify the property price and square footage');
    }
    
    if (pricePerSqFt > 2000) {
      errors.push('Price per square foot seems unusually high. Please verify the property price and square footage');
    }
  }

  if (inputs.propertyPrice !== undefined && inputs.lotSize !== undefined) {
    if (inputs.lotSize > inputs.propertyPrice * 0.1) {
      errors.push('Lot size seems unusually large compared to property price');
    }
  }

  // Property type specific validations
  if (inputs.propertyType === 'land' && inputs.bedrooms && inputs.bedrooms > 0) {
    errors.push('Land properties should not have bedrooms');
  }

  if (inputs.propertyType === 'land' && inputs.bathrooms && inputs.bathrooms > 0) {
    errors.push('Land properties should not have bathrooms');
  }

  if (inputs.propertyType === 'land' && inputs.totalSquareFootage && inputs.totalSquareFootage > 10000) {
    errors.push('Land square footage seems unusually large for a building');
  }

  // Year built reasonableness check
  if (inputs.yearBuilt !== undefined) {
    const currentYear = new Date().getFullYear();
    if (inputs.yearBuilt > currentYear + 2) {
      errors.push('Year built cannot be in the future');
    }
    
    if (inputs.yearBuilt < 1800) {
      errors.push('Year built seems too old. Please verify');
    }
  }

  // Market comparison validation
  if (inputs.marketAverage !== undefined && inputs.propertyPrice !== undefined && inputs.totalSquareFootage !== undefined) {
    const pricePerSqFt = inputs.propertyPrice / inputs.totalSquareFootage;
    const difference = Math.abs(pricePerSqFt - inputs.marketAverage) / inputs.marketAverage;
    
    if (difference > 2) {
      errors.push('Price per square foot differs significantly from market average. Please verify the data');
    }
  }

  // Feature validation
  if (inputs.features && inputs.features.length > 10) {
    errors.push('Too many features selected. Please limit to 10 or fewer');
  }

  // Location and condition consistency
  if (inputs.location === 'waterfront' && inputs.propertyType === 'land') {
    errors.push('Waterfront location is not applicable to vacant land');
  }

  if (inputs.condition === 'excellent' && inputs.yearBuilt && inputs.yearBuilt < 1950) {
    errors.push('Excellent condition seems unlikely for a property built before 1950');
  }

  return errors;
}
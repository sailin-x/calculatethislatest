import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateGrossRentMultiplierInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.propertyValue) {
    errors.push('Property value is required');
  }
  if (!inputs.grossAnnualRent) {
    errors.push('Gross annual rent is required');
  }
  if (!inputs.propertyType) {
    errors.push('Property type is required');
  }
  if (!inputs.location) {
    errors.push('Location is required');
  }
  if (!inputs.marketType) {
    errors.push('Market type is required');
  }

  // Data type validation
  if (inputs.propertyValue && typeof inputs.propertyValue !== 'number') {
    errors.push('Property value must be a number');
  }
  if (inputs.grossAnnualRent && typeof inputs.grossAnnualRent !== 'number') {
    errors.push('Gross annual rent must be a number');
  }
  if (inputs.propertyAge && typeof inputs.propertyAge !== 'number') {
    errors.push('Property age must be a number');
  }
  if (inputs.squareFootage && typeof inputs.squareFootage !== 'number') {
    errors.push('Square footage must be a number');
  }
  if (inputs.bedrooms && typeof inputs.bedrooms !== 'number') {
    errors.push('Bedrooms must be a number');
  }
  if (inputs.bathrooms && typeof inputs.bathrooms !== 'number') {
    errors.push('Bathrooms must be a number');
  }
  if (inputs.parkingSpaces && typeof inputs.parkingSpaces !== 'number') {
    errors.push('Parking spaces must be a number');
  }
  if (inputs.vacancyRate && typeof inputs.vacancyRate !== 'number') {
    errors.push('Vacancy rate must be a number');
  }
  if (inputs.operatingExpenses && typeof inputs.operatingExpenses !== 'number') {
    errors.push('Operating expenses must be a number');
  }
  if (inputs.propertyTaxes && typeof inputs.propertyTaxes !== 'number') {
    errors.push('Property taxes must be a number');
  }
  if (inputs.insurance && typeof inputs.insurance !== 'number') {
    errors.push('Insurance costs must be a number');
  }
  if (inputs.maintenance && typeof inputs.maintenance !== 'number') {
    errors.push('Maintenance costs must be a number');
  }
  if (inputs.managementFees && typeof inputs.managementFees !== 'number') {
    errors.push('Management fees must be a number');
  }
  if (inputs.utilities && typeof inputs.utilities !== 'number') {
    errors.push('Utilities must be a number');
  }
  if (inputs.hoaFees && typeof inputs.hoaFees !== 'number') {
    errors.push('HOA fees must be a number');
  }
  if (inputs.marketRent && typeof inputs.marketRent !== 'number') {
    errors.push('Market rent must be a number');
  }
  if (inputs.comparableSales && typeof inputs.comparableSales !== 'number') {
    errors.push('Comparable sales must be a number');
  }
  if (inputs.appreciationRate && typeof inputs.appreciationRate !== 'number') {
    errors.push('Appreciation rate must be a number');
  }
  if (inputs.inflationRate && typeof inputs.inflationRate !== 'number') {
    errors.push('Inflation rate must be a number');
  }
  if (inputs.taxRate && typeof inputs.taxRate !== 'number') {
    errors.push('Tax rate must be a number');
  }
  if (inputs.riskScore && typeof inputs.riskScore !== 'number') {
    errors.push('Risk score must be a number');
  }

  // Range validation
  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 100000000)) {
    errors.push('Property value must be between $10,000 and $100,000,000');
  }
  if (inputs.grossAnnualRent && (inputs.grossAnnualRent < 1000 || inputs.grossAnnualRent > 10000000)) {
    errors.push('Gross annual rent must be between $1,000 and $10,000,000');
  }
  if (inputs.propertyAge && (inputs.propertyAge < 0 || inputs.propertyAge > 200)) {
    errors.push('Property age must be between 0 and 200 years');
  }
  if (inputs.squareFootage && (inputs.squareFootage < 100 || inputs.squareFootage > 100000)) {
    errors.push('Square footage must be between 100 and 100,000 sq ft');
  }
  if (inputs.bedrooms && (inputs.bedrooms < 0 || inputs.bedrooms > 20)) {
    errors.push('Bedrooms must be between 0 and 20');
  }
  if (inputs.bathrooms && (inputs.bathrooms < 0 || inputs.bathrooms > 20)) {
    errors.push('Bathrooms must be between 0 and 20');
  }
  if (inputs.parkingSpaces && (inputs.parkingSpaces < 0 || inputs.parkingSpaces > 50)) {
    errors.push('Parking spaces must be between 0 and 50');
  }
  if (inputs.vacancyRate && (inputs.vacancyRate < 0 || inputs.vacancyRate > 50)) {
    errors.push('Vacancy rate must be between 0% and 50%');
  }
  if (inputs.operatingExpenses && (inputs.operatingExpenses < 0 || inputs.operatingExpenses > 1000000)) {
    errors.push('Operating expenses must be between $0 and $1,000,000');
  }
  if (inputs.propertyTaxes && (inputs.propertyTaxes < 0 || inputs.propertyTaxes > 100000)) {
    errors.push('Property taxes must be between $0 and $100,000');
  }
  if (inputs.insurance && (inputs.insurance < 0 || inputs.insurance > 100000)) {
    errors.push('Insurance costs must be between $0 and $100,000');
  }
  if (inputs.maintenance && (inputs.maintenance < 0 || inputs.maintenance > 100000)) {
    errors.push('Maintenance costs must be between $0 and $100,000');
  }
  if (inputs.managementFees && (inputs.managementFees < 0 || inputs.managementFees > 100000)) {
    errors.push('Management fees must be between $0 and $100,000');
  }
  if (inputs.utilities && (inputs.utilities < 0 || inputs.utilities > 100000)) {
    errors.push('Utilities must be between $0 and $100,000');
  }
  if (inputs.hoaFees && (inputs.hoaFees < 0 || inputs.hoaFees > 100000)) {
    errors.push('HOA fees must be between $0 and $100,000');
  }
  if (inputs.marketRent && (inputs.marketRent < 0 || inputs.marketRent > 100000)) {
    errors.push('Market rent must be between $0 and $100,000');
  }
  if (inputs.comparableSales && (inputs.comparableSales < 0 || inputs.comparableSales > 100000000)) {
    errors.push('Comparable sales must be between $0 and $100,000,000');
  }
  if (inputs.appreciationRate && (inputs.appreciationRate < -10 || inputs.appreciationRate > 20)) {
    errors.push('Appreciation rate must be between -10% and 20%');
  }
  if (inputs.inflationRate && (inputs.inflationRate < -5 || inputs.inflationRate > 15)) {
    errors.push('Inflation rate must be between -5% and 15%');
  }
  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }
  if (inputs.riskScore && (inputs.riskScore < 1 || inputs.riskScore > 10)) {
    errors.push('Risk score must be between 1 and 10');
  }

  // Logical validation
  if (inputs.grossAnnualRent && inputs.propertyValue && inputs.grossAnnualRent > inputs.propertyValue) {
    errors.push('Gross annual rent cannot exceed property value');
  }
  if (inputs.marketRent && inputs.grossAnnualRent && inputs.marketRent > inputs.grossAnnualRent * 2) {
    errors.push('Market rent seems unusually high relative to current rent');
  }
  if (inputs.comparableSales && inputs.propertyValue) {
    const priceDiff = Math.abs(inputs.comparableSales - inputs.propertyValue) / inputs.propertyValue;
    if (priceDiff > 0.5) {
      errors.push('Comparable sales price differs significantly from property value');
    }
  }
  if (inputs.squareFootage && inputs.bedrooms && inputs.squareFootage < inputs.bedrooms * 200) {
    errors.push('Square footage seems too low for the number of bedrooms');
  }
  if (inputs.squareFootage && inputs.bathrooms && inputs.squareFootage < inputs.bathrooms * 100) {
    errors.push('Square footage seems too low for the number of bathrooms');
  }

  // Enum validation
  const validPropertyTypes = ['single-family', 'multi-family', 'apartment', 'commercial', 'industrial', 'mixed-use', 'condo', 'townhouse'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type. Must be one of: single-family, multi-family, apartment, commercial, industrial, mixed-use, condo, townhouse');
  }

  const validLocations = ['urban', 'suburban', 'rural', 'coastal', 'mountain', 'downtown', 'residential'];
  if (inputs.location && !validLocations.includes(inputs.location)) {
    errors.push('Invalid location. Must be one of: urban, suburban, rural, coastal, mountain, downtown, residential');
  }

  const validMarketTypes = ['hot', 'stable', 'declining', 'emerging', 'balanced'];
  if (inputs.marketType && !validMarketTypes.includes(inputs.marketType)) {
    errors.push('Invalid market type. Must be one of: hot, stable, declining, emerging, balanced');
  }

  const validConditions = ['excellent', 'good', 'fair', 'poor', 'needs-renovation'];
  if (inputs.condition && !validConditions.includes(inputs.condition)) {
    errors.push('Invalid property condition. Must be one of: excellent, good, fair, poor, needs-renovation');
  }

  const validAmenities = ['pool', 'gym', 'parking', 'balcony', 'fireplace', 'central-air', 'hardwood-floors', 'granite-countertops', 'stainless-steel-appliances', 'walk-in-closet', 'garden', 'patio', 'basement', 'attic', 'garage'];
  if (inputs.amenities && Array.isArray(inputs.amenities)) {
    for (const amenity of inputs.amenities) {
      if (!validAmenities.includes(amenity)) {
        errors.push(`Invalid amenity: ${amenity}`);
      }
    }
  }

  const validMarketLiquidity = ['high', 'medium', 'low'];
  if (inputs.marketLiquidity && !validMarketLiquidity.includes(inputs.marketLiquidity)) {
    errors.push('Invalid market liquidity. Must be one of: high, medium, low');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateGrossRentMultiplierInput(field: string, value: any): string | null {
  switch (field) {
    case 'propertyValue':
      if (!value) return 'Property value is required';
      if (typeof value !== 'number') return 'Property value must be a number';
      if (value < 10000 || value > 100000000) return 'Property value must be between $10,000 and $100,000,000';
      return null;

    case 'grossAnnualRent':
      if (!value) return 'Gross annual rent is required';
      if (typeof value !== 'number') return 'Gross annual rent must be a number';
      if (value < 1000 || value > 10000000) return 'Gross annual rent must be between $1,000 and $10,000,000';
      return null;

    case 'propertyType':
      if (!value) return 'Property type is required';
      const validPropertyTypes = ['single-family', 'multi-family', 'apartment', 'commercial', 'industrial', 'mixed-use', 'condo', 'townhouse'];
      if (!validPropertyTypes.includes(value)) return 'Invalid property type';
      return null;

    case 'location':
      if (!value) return 'Location is required';
      const validLocations = ['urban', 'suburban', 'rural', 'coastal', 'mountain', 'downtown', 'residential'];
      if (!validLocations.includes(value)) return 'Invalid location';
      return null;

    case 'marketType':
      if (!value) return 'Market type is required';
      const validMarketTypes = ['hot', 'stable', 'declining', 'emerging', 'balanced'];
      if (!validMarketTypes.includes(value)) return 'Invalid market type';
      return null;

    case 'propertyAge':
      if (value && typeof value !== 'number') return 'Property age must be a number';
      if (value && (value < 0 || value > 200)) return 'Property age must be between 0 and 200 years';
      return null;

    case 'squareFootage':
      if (value && typeof value !== 'number') return 'Square footage must be a number';
      if (value && (value < 100 || value > 100000)) return 'Square footage must be between 100 and 100,000 sq ft';
      return null;

    case 'bedrooms':
      if (value && typeof value !== 'number') return 'Bedrooms must be a number';
      if (value && (value < 0 || value > 20)) return 'Bedrooms must be between 0 and 20';
      return null;

    case 'bathrooms':
      if (value && typeof value !== 'number') return 'Bathrooms must be a number';
      if (value && (value < 0 || value > 20)) return 'Bathrooms must be between 0 and 20';
      return null;

    case 'parkingSpaces':
      if (value && typeof value !== 'number') return 'Parking spaces must be a number';
      if (value && (value < 0 || value > 50)) return 'Parking spaces must be between 0 and 50';
      return null;

    case 'condition':
      if (value) {
        const validConditions = ['excellent', 'good', 'fair', 'poor', 'needs-renovation'];
        if (!validConditions.includes(value)) return 'Invalid property condition';
      }
      return null;

    case 'amenities':
      if (value && Array.isArray(value)) {
        const validAmenities = ['pool', 'gym', 'parking', 'balcony', 'fireplace', 'central-air', 'hardwood-floors', 'granite-countertops', 'stainless-steel-appliances', 'walk-in-closet', 'garden', 'patio', 'basement', 'attic', 'garage'];
        for (const amenity of value) {
          if (!validAmenities.includes(amenity)) return `Invalid amenity: ${amenity}`;
        }
      }
      return null;

    case 'vacancyRate':
      if (value && typeof value !== 'number') return 'Vacancy rate must be a number';
      if (value && (value < 0 || value > 50)) return 'Vacancy rate must be between 0% and 50%';
      return null;

    case 'operatingExpenses':
      if (value && typeof value !== 'number') return 'Operating expenses must be a number';
      if (value && (value < 0 || value > 1000000)) return 'Operating expenses must be between $0 and $1,000,000';
      return null;

    case 'propertyTaxes':
      if (value && typeof value !== 'number') return 'Property taxes must be a number';
      if (value && (value < 0 || value > 100000)) return 'Property taxes must be between $0 and $100,000';
      return null;

    case 'insurance':
      if (value && typeof value !== 'number') return 'Insurance costs must be a number';
      if (value && (value < 0 || value > 100000)) return 'Insurance costs must be between $0 and $100,000';
      return null;

    case 'maintenance':
      if (value && typeof value !== 'number') return 'Maintenance costs must be a number';
      if (value && (value < 0 || value > 100000)) return 'Maintenance costs must be between $0 and $100,000';
      return null;

    case 'managementFees':
      if (value && typeof value !== 'number') return 'Management fees must be a number';
      if (value && (value < 0 || value > 100000)) return 'Management fees must be between $0 and $100,000';
      return null;

    case 'utilities':
      if (value && typeof value !== 'number') return 'Utilities must be a number';
      if (value && (value < 0 || value > 100000)) return 'Utilities must be between $0 and $100,000';
      return null;

    case 'hoaFees':
      if (value && typeof value !== 'number') return 'HOA fees must be a number';
      if (value && (value < 0 || value > 100000)) return 'HOA fees must be between $0 and $100,000';
      return null;

    case 'marketRent':
      if (value && typeof value !== 'number') return 'Market rent must be a number';
      if (value && (value < 0 || value > 100000)) return 'Market rent must be between $0 and $100,000';
      return null;

    case 'comparableSales':
      if (value && typeof value !== 'number') return 'Comparable sales must be a number';
      if (value && (value < 0 || value > 100000000)) return 'Comparable sales must be between $0 and $100,000,000';
      return null;

    case 'appreciationRate':
      if (value && typeof value !== 'number') return 'Appreciation rate must be a number';
      if (value && (value < -10 || value > 20)) return 'Appreciation rate must be between -10% and 20%';
      return null;

    case 'inflationRate':
      if (value && typeof value !== 'number') return 'Inflation rate must be a number';
      if (value && (value < -5 || value > 15)) return 'Inflation rate must be between -5% and 15%';
      return null;

    case 'taxRate':
      if (value && typeof value !== 'number') return 'Tax rate must be a number';
      if (value && (value < 0 || value > 50)) return 'Tax rate must be between 0% and 50%';
      return null;

    case 'riskScore':
      if (value && typeof value !== 'number') return 'Risk score must be a number';
      if (value && (value < 1 || value > 10)) return 'Risk score must be between 1 and 10';
      return null;

    case 'marketLiquidity':
      if (value) {
        const validMarketLiquidity = ['high', 'medium', 'low'];
        if (!validMarketLiquidity.includes(value)) return 'Invalid market liquidity';
      }
      return null;

    default:
      return null;
  }
}

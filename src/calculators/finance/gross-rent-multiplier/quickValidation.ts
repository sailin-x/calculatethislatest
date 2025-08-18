import { CalculatorInputs } from '../../../types/calculator';

export function validatePropertyValue(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property value is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Property value must be a number' };
  if (value < 10000 || value > 100000000) return { isValid: false, message: 'Property value must be between $10,000 and $100,000,000' };
  return { isValid: true };
}

export function validateGrossAnnualRent(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Gross annual rent is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Gross annual rent must be a number' };
  if (value < 1000 || value > 10000000) return { isValid: false, message: 'Gross annual rent must be between $1,000 and $10,000,000' };
  return { isValid: true };
}

export function validatePropertyType(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property type is required' };
  const validTypes = ['single-family', 'multi-family', 'apartment', 'commercial', 'industrial', 'mixed-use', 'condo', 'townhouse'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid property type' };
  return { isValid: true };
}

export function validateLocation(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Location is required' };
  const validLocations = ['urban', 'suburban', 'rural', 'coastal', 'mountain', 'downtown', 'residential'];
  if (!validLocations.includes(value)) return { isValid: false, message: 'Invalid location' };
  return { isValid: true };
}

export function validateMarketType(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Market type is required' };
  const validTypes = ['hot', 'stable', 'declining', 'emerging', 'balanced'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid market type' };
  return { isValid: true };
}

export function validatePropertyAge(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Property age must be a number' };
  if (value && (value < 0 || value > 200)) return { isValid: false, message: 'Property age must be between 0 and 200 years' };
  return { isValid: true };
}

export function validateSquareFootage(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Square footage must be a number' };
  if (value && (value < 100 || value > 100000)) return { isValid: false, message: 'Square footage must be between 100 and 100,000 sq ft' };
  return { isValid: true };
}

export function validateBedrooms(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Bedrooms must be a number' };
  if (value && (value < 0 || value > 20)) return { isValid: false, message: 'Bedrooms must be between 0 and 20' };
  return { isValid: true };
}

export function validateBathrooms(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Bathrooms must be a number' };
  if (value && (value < 0 || value > 20)) return { isValid: false, message: 'Bathrooms must be between 0 and 20' };
  return { isValid: true };
}

export function validateParkingSpaces(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Parking spaces must be a number' };
  if (value && (value < 0 || value > 50)) return { isValid: false, message: 'Parking spaces must be between 0 and 50' };
  return { isValid: true };
}

export function validateCondition(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validConditions = ['excellent', 'good', 'fair', 'poor', 'needs-renovation'];
    if (!validConditions.includes(value)) return { isValid: false, message: 'Invalid property condition' };
  }
  return { isValid: true };
}

export function validateAmenities(value: any): { isValid: boolean; message?: string } {
  if (value && Array.isArray(value)) {
    const validAmenities = ['pool', 'gym', 'parking', 'balcony', 'fireplace', 'central-air', 'hardwood-floors', 'granite-countertops', 'stainless-steel-appliances', 'walk-in-closet', 'garden', 'patio', 'basement', 'attic', 'garage'];
    for (const amenity of value) {
      if (!validAmenities.includes(amenity)) return { isValid: false, message: `Invalid amenity: ${amenity}` };
    }
  }
  return { isValid: true };
}

export function validateVacancyRate(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Vacancy rate must be a number' };
  if (value && (value < 0 || value > 50)) return { isValid: false, message: 'Vacancy rate must be between 0% and 50%' };
  return { isValid: true };
}

export function validateOperatingExpenses(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Operating expenses must be a number' };
  if (value && (value < 0 || value > 1000000)) return { isValid: false, message: 'Operating expenses must be between $0 and $1,000,000' };
  return { isValid: true };
}

export function validatePropertyTaxes(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Property taxes must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Property taxes must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateInsurance(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Insurance costs must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Insurance costs must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateMaintenance(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Maintenance costs must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Maintenance costs must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateManagementFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Management fees must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Management fees must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateUtilities(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Utilities must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Utilities must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateHoaFees(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'HOA fees must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'HOA fees must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateMarketRent(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Market rent must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Market rent must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateComparableSales(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Comparable sales must be a number' };
  if (value && (value < 0 || value > 100000000)) return { isValid: false, message: 'Comparable sales must be between $0 and $100,000,000' };
  return { isValid: true };
}

export function validateAppreciationRate(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Appreciation rate must be a number' };
  if (value && (value < -10 || value > 20)) return { isValid: false, message: 'Appreciation rate must be between -10% and 20%' };
  return { isValid: true };
}

export function validateInflationRate(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Inflation rate must be a number' };
  if (value && (value < -5 || value > 15)) return { isValid: false, message: 'Inflation rate must be between -5% and 15%' };
  return { isValid: true };
}

export function validateTaxRate(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Tax rate must be a number' };
  if (value && (value < 0 || value > 50)) return { isValid: false, message: 'Tax rate must be between 0% and 50%' };
  return { isValid: true };
}

export function validateRiskScore(value: any): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Risk score must be a number' };
  if (value && (value < 1 || value > 10)) return { isValid: false, message: 'Risk score must be between 1 and 10' };
  return { isValid: true };
}

export function validateMarketLiquidity(value: any): { isValid: boolean; message?: string } {
  if (value) {
    const validMarketLiquidity = ['high', 'medium', 'low'];
    if (!validMarketLiquidity.includes(value)) return { isValid: false, message: 'Invalid market liquidity' };
  }
  return { isValid: true };
}

export function validateAllGrossRentMultiplierInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const propertyValueResult = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueResult.isValid) errors.push(propertyValueResult.message!);

  const grossAnnualRentResult = validateGrossAnnualRent(inputs.grossAnnualRent);
  if (!grossAnnualRentResult.isValid) errors.push(grossAnnualRentResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const locationResult = validateLocation(inputs.location);
  if (!locationResult.isValid) errors.push(locationResult.message!);

  const marketTypeResult = validateMarketType(inputs.marketType);
  if (!marketTypeResult.isValid) errors.push(marketTypeResult.message!);

  const propertyAgeResult = validatePropertyAge(inputs.propertyAge);
  if (!propertyAgeResult.isValid) errors.push(propertyAgeResult.message!);

  const squareFootageResult = validateSquareFootage(inputs.squareFootage);
  if (!squareFootageResult.isValid) errors.push(squareFootageResult.message!);

  const bedroomsResult = validateBedrooms(inputs.bedrooms);
  if (!bedroomsResult.isValid) errors.push(bedroomsResult.message!);

  const bathroomsResult = validateBathrooms(inputs.bathrooms);
  if (!bathroomsResult.isValid) errors.push(bathroomsResult.message!);

  const parkingSpacesResult = validateParkingSpaces(inputs.parkingSpaces);
  if (!parkingSpacesResult.isValid) errors.push(parkingSpacesResult.message!);

  const conditionResult = validateCondition(inputs.condition);
  if (!conditionResult.isValid) errors.push(conditionResult.message!);

  const amenitiesResult = validateAmenities(inputs.amenities);
  if (!amenitiesResult.isValid) errors.push(amenitiesResult.message!);

  const vacancyRateResult = validateVacancyRate(inputs.vacancyRate);
  if (!vacancyRateResult.isValid) errors.push(vacancyRateResult.message!);

  const operatingExpensesResult = validateOperatingExpenses(inputs.operatingExpenses);
  if (!operatingExpensesResult.isValid) errors.push(operatingExpensesResult.message!);

  const propertyTaxesResult = validatePropertyTaxes(inputs.propertyTaxes);
  if (!propertyTaxesResult.isValid) errors.push(propertyTaxesResult.message!);

  const insuranceResult = validateInsurance(inputs.insurance);
  if (!insuranceResult.isValid) errors.push(insuranceResult.message!);

  const maintenanceResult = validateMaintenance(inputs.maintenance);
  if (!maintenanceResult.isValid) errors.push(maintenanceResult.message!);

  const managementFeesResult = validateManagementFees(inputs.managementFees);
  if (!managementFeesResult.isValid) errors.push(managementFeesResult.message!);

  const utilitiesResult = validateUtilities(inputs.utilities);
  if (!utilitiesResult.isValid) errors.push(utilitiesResult.message!);

  const hoaFeesResult = validateHoaFees(inputs.hoaFees);
  if (!hoaFeesResult.isValid) errors.push(hoaFeesResult.message!);

  const marketRentResult = validateMarketRent(inputs.marketRent);
  if (!marketRentResult.isValid) errors.push(marketRentResult.message!);

  const comparableSalesResult = validateComparableSales(inputs.comparableSales);
  if (!comparableSalesResult.isValid) errors.push(comparableSalesResult.message!);

  const appreciationRateResult = validateAppreciationRate(inputs.appreciationRate);
  if (!appreciationRateResult.isValid) errors.push(appreciationRateResult.message!);

  const inflationRateResult = validateInflationRate(inputs.inflationRate);
  if (!inflationRateResult.isValid) errors.push(inflationRateResult.message!);

  const taxRateResult = validateTaxRate(inputs.taxRate);
  if (!taxRateResult.isValid) errors.push(taxRateResult.message!);

  const riskScoreResult = validateRiskScore(inputs.riskScore);
  if (!riskScoreResult.isValid) errors.push(riskScoreResult.message!);

  const marketLiquidityResult = validateMarketLiquidity(inputs.marketLiquidity);
  if (!marketLiquidityResult.isValid) errors.push(marketLiquidityResult.message!);

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

  return {
    isValid: errors.length === 0,
    errors
  };
}

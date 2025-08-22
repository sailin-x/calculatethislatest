import { CalculatorInputs } from '../../../types/calculator';

// Individual field validation functions
export function validatePersonalPropertyValue(value: number, allInputs?: Record<string, any>): string | null {
  if (!value || value <= 0) return 'Personal property value must be greater than 0';
  if (value > 1000000) return 'Personal property value cannot exceed $1,000,000';
  return null;
}

export function validateElectronicsValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Electronics value cannot be negative';
  if (value > 100000) return 'Electronics value cannot exceed $100,000';
  return null;
}

export function validateJewelryValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Jewelry value cannot be negative';
  if (value > 50000) return 'Jewelry value cannot exceed $50,000';
  return null;
}

export function validateFurnitureValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Furniture value cannot be negative';
  if (value > 100000) return 'Furniture value cannot exceed $100,000';
  return null;
}

export function validateClothingValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Clothing value cannot be negative';
  if (value > 50000) return 'Clothing value cannot exceed $50,000';
  return null;
}

export function validateArtValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Art value cannot be negative';
  if (value > 50000) return 'Art value cannot exceed $50,000';
  return null;
}

export function validateSportsEquipmentValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Sports equipment value cannot be negative';
  if (value > 20000) return 'Sports equipment value cannot exceed $20,000';
  return null;
}

export function validateMusicalInstrumentsValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Musical instruments value cannot be negative';
  if (value > 20000) return 'Musical instruments value cannot exceed $20,000';
  return null;
}

export function validateLiabilityCoverage(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Liability coverage cannot be negative';
  if (value > 1000000) return 'Liability coverage cannot exceed $1,000,000';
  return null;
}

export function validateMedicalPayments(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Medical payments cannot be negative';
  if (value > 10000) return 'Medical payments cannot exceed $10,000';
  return null;
}

export function validateLossOfUse(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Loss of use coverage cannot be negative';
  if (value > 50000) return 'Loss of use coverage cannot exceed $50,000';
  return null;
}

export function validateDeductible(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Deductible cannot be negative';
  if (value > 5000) return 'Deductible cannot exceed $5,000';
  return null;
}

export function validatePropertyType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['apartment', 'condo', 'house', 'townhouse', 'duplex', 'studio', 'loft', 'mobile-home'];
  if (!value) return 'Property type is required';
  if (!validTypes.includes(value)) return 'Invalid property type';
  return null;
}

export function validateSquareFootage(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Square footage cannot be negative';
  if (value > 10000) return 'Square footage cannot exceed 10,000';
  return null;
}

export function validateBedrooms(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Bedrooms cannot be negative';
  if (value > 10) return 'Bedrooms cannot exceed 10';
  return null;
}

export function validateBathrooms(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Bathrooms cannot be negative';
  if (value > 10) return 'Bathrooms cannot exceed 10';
  return null;
}

export function validateYearBuilt(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1800) return 'Year built must be at least 1800';
  if (value > 2030) return 'Year built cannot exceed 2030';
  return null;
}

export function validateState(value: string, allInputs?: Record<string, any>): string | null {
  const validStates = ['al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'];
  if (!value) return 'State is required';
  if (!validStates.includes(value)) return 'Invalid state';
  return null;
}

export function validateCity(value: string, allInputs?: Record<string, any>): string | null {
  const validCities = ['major-metro', 'suburban', 'small-city', 'rural'];
  if (!value) return 'City type is required';
  if (!validCities.includes(value)) return 'Invalid city type';
  return null;
}

export function validateCrimeRate(value: string, allInputs?: Record<string, any>): string | null {
  const validRates = ['low', 'medium', 'high'];
  if (!value) return 'Crime rate is required';
  if (!validRates.includes(value)) return 'Invalid crime rate';
  return null;
}

export function validateSmoking(value: string, allInputs?: Record<string, any>): string | null {
  const validStatuses = ['non-smoker', 'smoker', 'former-smoker'];
  if (!value) return 'Smoking status is required';
  if (!validStatuses.includes(value)) return 'Invalid smoking status';
  return null;
}

export function validatePets(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['none', 'dog', 'cat', 'other'];
  if (!value) return 'Pet type is required';
  if (!validTypes.includes(value)) return 'Invalid pet type';
  return null;
}

export function validateSecurityFeatures(value: string, allInputs?: Record<string, any>): string | null {
  const validFeatures = ['none', 'basic', 'advanced', 'gated'];
  if (!value) return 'Security features is required';
  if (!validFeatures.includes(value)) return 'Invalid security features';
  return null;
}

export function validateFireProtection(value: string, allInputs?: Record<string, any>): string | null {
  const validProtection = ['none', 'smoke-detectors', 'sprinklers', 'fire-station-nearby'];
  if (!value) return 'Fire protection is required';
  if (!validProtection.includes(value)) return 'Invalid fire protection';
  return null;
}

export function validateFloodZone(value: string, allInputs?: Record<string, any>): string | null {
  const validZones = ['none', 'low-risk', 'moderate-risk', 'high-risk'];
  if (!value) return 'Flood zone is required';
  if (!validZones.includes(value)) return 'Invalid flood zone';
  return null;
}

export function validateEarthquakeZone(value: string, allInputs?: Record<string, any>): string | null {
  const validZones = ['none', 'low', 'moderate', 'high'];
  if (!value) return 'Earthquake zone is required';
  if (!validZones.includes(value)) return 'Invalid earthquake zone';
  return null;
}

export function validateAge(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 18) return 'Age must be at least 18';
  if (value > 100) return 'Age cannot exceed 100';
  return null;
}

export function validateCreditScore(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 300) return 'Credit score must be at least 300';
  if (value > 850) return 'Credit score cannot exceed 850';
  return null;
}

export function validateClaimsHistory(value: string, allInputs?: Record<string, any>): string | null {
  const validHistory = ['none', '1-2', '3-5', '5-plus'];
  if (!value) return 'Claims history is required';
  if (!validHistory.includes(value)) return 'Invalid claims history';
  return null;
}

export function validateOccupation(value: string, allInputs?: Record<string, any>): string | null {
  const validOccupations = ['student', 'professional', 'service', 'retail', 'unemployed', 'retired', 'other'];
  if (!value) return 'Occupation is required';
  if (!validOccupations.includes(value)) return 'Invalid occupation';
  return null;
}

export function validatePolicyType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['basic', 'standard', 'premium', 'comprehensive'];
  if (!value) return 'Policy type is required';
  if (!validTypes.includes(value)) return 'Invalid policy type';
  return null;
}

export function validateReplacementCost(value: string, allInputs?: Record<string, any>): string | null {
  const validCosts = ['actual-cash-value', 'replacement-cost'];
  if (!value) return 'Replacement cost is required';
  if (!validCosts.includes(value)) return 'Invalid replacement cost';
  return null;
}

export function validateIdentityTheft(value: string, allInputs?: Record<string, any>): string | null {
  const validCoverage = ['none', 'basic', 'comprehensive'];
  if (!value) return 'Identity theft coverage is required';
  if (!validCoverage.includes(value)) return 'Invalid identity theft coverage';
  return null;
}

export function validateWaterBackup(value: string, allInputs?: Record<string, any>): string | null {
  const validCoverage = ['none', 'basic', 'enhanced'];
  if (!value) return 'Water backup coverage is required';
  if (!validCoverage.includes(value)) return 'Invalid water backup coverage';
  return null;
}

// Consolidated validation function
export function validateAllRentersInsuranceInputs(inputs: CalculatorInputs): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  const personalPropertyValueError = validatePersonalPropertyValue(inputs.personalPropertyValue);
  if (personalPropertyValueError) errors.push(personalPropertyValueError);

  // Optional field validations
  if (inputs.electronicsValue !== undefined) {
    const electronicsValueError = validateElectronicsValue(inputs.electronicsValue);
    if (electronicsValueError) errors.push(electronicsValueError);
  }

  if (inputs.jewelryValue !== undefined) {
    const jewelryValueError = validateJewelryValue(inputs.jewelryValue);
    if (jewelryValueError) errors.push(jewelryValueError);
  }

  if (inputs.furnitureValue !== undefined) {
    const furnitureValueError = validateFurnitureValue(inputs.furnitureValue);
    if (furnitureValueError) errors.push(furnitureValueError);
  }

  if (inputs.clothingValue !== undefined) {
    const clothingValueError = validateClothingValue(inputs.clothingValue);
    if (clothingValueError) errors.push(clothingValueError);
  }

  if (inputs.artValue !== undefined) {
    const artValueError = validateArtValue(inputs.artValue);
    if (artValueError) errors.push(artValueError);
  }

  if (inputs.sportsEquipmentValue !== undefined) {
    const sportsEquipmentValueError = validateSportsEquipmentValue(inputs.sportsEquipmentValue);
    if (sportsEquipmentValueError) errors.push(sportsEquipmentValueError);
  }

  if (inputs.musicalInstrumentsValue !== undefined) {
    const musicalInstrumentsValueError = validateMusicalInstrumentsValue(inputs.musicalInstrumentsValue);
    if (musicalInstrumentsValueError) errors.push(musicalInstrumentsValueError);
  }

  if (inputs.liabilityCoverage !== undefined) {
    const liabilityCoverageError = validateLiabilityCoverage(inputs.liabilityCoverage);
    if (liabilityCoverageError) errors.push(liabilityCoverageError);
  }

  if (inputs.medicalPayments !== undefined) {
    const medicalPaymentsError = validateMedicalPayments(inputs.medicalPayments);
    if (medicalPaymentsError) errors.push(medicalPaymentsError);
  }

  if (inputs.lossOfUse !== undefined) {
    const lossOfUseError = validateLossOfUse(inputs.lossOfUse);
    if (lossOfUseError) errors.push(lossOfUseError);
  }

  if (inputs.deductible !== undefined) {
    const deductibleError = validateDeductible(inputs.deductible);
    if (deductibleError) errors.push(deductibleError);
  }

  if (inputs.propertyType !== undefined) {
    const propertyTypeError = validatePropertyType(inputs.propertyType);
    if (propertyTypeError) errors.push(propertyTypeError);
  }

  if (inputs.squareFootage !== undefined) {
    const squareFootageError = validateSquareFootage(inputs.squareFootage);
    if (squareFootageError) errors.push(squareFootageError);
  }

  if (inputs.bedrooms !== undefined) {
    const bedroomsError = validateBedrooms(inputs.bedrooms);
    if (bedroomsError) errors.push(bedroomsError);
  }

  if (inputs.bathrooms !== undefined) {
    const bathroomsError = validateBathrooms(inputs.bathrooms);
    if (bathroomsError) errors.push(bathroomsError);
  }

  if (inputs.yearBuilt !== undefined) {
    const yearBuiltError = validateYearBuilt(inputs.yearBuilt);
    if (yearBuiltError) errors.push(yearBuiltError);
  }

  if (inputs.state !== undefined) {
    const stateError = validateState(inputs.state);
    if (stateError) errors.push(stateError);
  }

  if (inputs.city !== undefined) {
    const cityError = validateCity(inputs.city);
    if (cityError) errors.push(cityError);
  }

  if (inputs.crimeRate !== undefined) {
    const crimeRateError = validateCrimeRate(inputs.crimeRate);
    if (crimeRateError) errors.push(crimeRateError);
  }

  if (inputs.smoking !== undefined) {
    const smokingError = validateSmoking(inputs.smoking);
    if (smokingError) errors.push(smokingError);
  }

  if (inputs.pets !== undefined) {
    const petsError = validatePets(inputs.pets);
    if (petsError) errors.push(petsError);
  }

  if (inputs.securityFeatures !== undefined) {
    const securityFeaturesError = validateSecurityFeatures(inputs.securityFeatures);
    if (securityFeaturesError) errors.push(securityFeaturesError);
  }

  if (inputs.fireProtection !== undefined) {
    const fireProtectionError = validateFireProtection(inputs.fireProtection);
    if (fireProtectionError) errors.push(fireProtectionError);
  }

  if (inputs.floodZone !== undefined) {
    const floodZoneError = validateFloodZone(inputs.floodZone);
    if (floodZoneError) errors.push(floodZoneError);
  }

  if (inputs.earthquakeZone !== undefined) {
    const earthquakeZoneError = validateEarthquakeZone(inputs.earthquakeZone);
    if (earthquakeZoneError) errors.push(earthquakeZoneError);
  }

  if (inputs.age !== undefined) {
    const ageError = validateAge(inputs.age);
    if (ageError) errors.push(ageError);
  }

  if (inputs.creditScore !== undefined) {
    const creditScoreError = validateCreditScore(inputs.creditScore);
    if (creditScoreError) errors.push(creditScoreError);
  }

  if (inputs.claimsHistory !== undefined) {
    const claimsHistoryError = validateClaimsHistory(inputs.claimsHistory);
    if (claimsHistoryError) errors.push(claimsHistoryError);
  }

  if (inputs.occupation !== undefined) {
    const occupationError = validateOccupation(inputs.occupation);
    if (occupationError) errors.push(occupationError);
  }

  if (inputs.policyType !== undefined) {
    const policyTypeError = validatePolicyType(inputs.policyType);
    if (policyTypeError) errors.push(policyTypeError);
  }

  if (inputs.replacementCost !== undefined) {
    const replacementCostError = validateReplacementCost(inputs.replacementCost);
    if (replacementCostError) errors.push(replacementCostError);
  }

  if (inputs.identityTheft !== undefined) {
    const identityTheftError = validateIdentityTheft(inputs.identityTheft);
    if (identityTheftError) errors.push(identityTheftError);
  }

  if (inputs.waterBackup !== undefined) {
    const waterBackupError = validateWaterBackup(inputs.waterBackup);
    if (waterBackupError) errors.push(waterBackupError);
  }

  // Logical validation warnings
  if (inputs.personalPropertyValue && inputs.electronicsValue && inputs.jewelryValue && 
      inputs.furnitureValue && inputs.clothingValue && inputs.artValue && 
      inputs.sportsEquipmentValue && inputs.musicalInstrumentsValue) {
    const totalValue = inputs.electronicsValue + inputs.jewelryValue + inputs.furnitureValue + 
                      inputs.clothingValue + inputs.artValue + inputs.sportsEquipmentValue + 
                      inputs.musicalInstrumentsValue;
    if (Math.abs(totalValue - inputs.personalPropertyValue) > 1000) {
      warnings.push('Sum of individual property values should equal total personal property value');
    }
  }

  if (inputs.personalPropertyValue && inputs.personalPropertyValue < 5000) {
    warnings.push('Very low property value - consider if all items are included');
  }

  if (inputs.personalPropertyValue && inputs.personalPropertyValue > 100000) {
    warnings.push('High property value - consider additional coverage for valuable items');
  }

  if (inputs.deductible && inputs.deductible > 1000) {
    warnings.push('High deductible may result in significant out-of-pocket costs');
  }

  if (inputs.liabilityCoverage && inputs.liabilityCoverage < 100000) {
    warnings.push('Consider higher liability coverage for better protection');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

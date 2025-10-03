import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateRentersInsuranceInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  if (!inputs.personalPropertyValue || inputs.personalPropertyValue <= 0) {
    errors.push('Personal property value is required and must be greater than 0');
  }

  // Data type validation
  if (typeof inputs.personalPropertyValue !== 'number') {
    errors.push('Personal property value must be a number');
  }

  // Range validation
  if (inputs.personalPropertyValue && (inputs.personalPropertyValue < 0 || inputs.personalPropertyValue > 1000000)) {
    errors.push('Personal property value must be between $0 and $1,000,000');
  }

  if (inputs.electronicsValue && (inputs.electronicsValue < 0 || inputs.electronicsValue > 100000)) {
    errors.push('Electronics value must be between $0 and $100,000');
  }

  if (inputs.jewelryValue && (inputs.jewelryValue < 0 || inputs.jewelryValue > 50000)) {
    errors.push('Jewelry value must be between $0 and $50,000');
  }

  if (inputs.furnitureValue && (inputs.furnitureValue < 0 || inputs.furnitureValue > 100000)) {
    errors.push('Furniture value must be between $0 and $100,000');
  }

  if (inputs.clothingValue && (inputs.clothingValue < 0 || inputs.clothingValue > 50000)) {
    errors.push('Clothing value must be between $0 and $50,000');
  }

  if (inputs.artValue && (inputs.artValue < 0 || inputs.artValue > 50000)) {
    errors.push('Art value must be between $0 and $50,000');
  }

  if (inputs.sportsEquipmentValue && (inputs.sportsEquipmentValue < 0 || inputs.sportsEquipmentValue > 20000)) {
    errors.push('Sports equipment value must be between $0 and $20,000');
  }

  if (inputs.musicalInstrumentsValue && (inputs.musicalInstrumentsValue < 0 || inputs.musicalInstrumentsValue > 20000)) {
    errors.push('Musical instruments value must be between $0 and $20,000');
  }

  if (inputs.liabilityCoverage && (inputs.liabilityCoverage < 0 || inputs.liabilityCoverage > 1000000)) {
    errors.push('Liability coverage must be between $0 and $1,000,000');
  }

  if (inputs.medicalPayments && (inputs.medicalPayments < 0 || inputs.medicalPayments > 10000)) {
    errors.push('Medical payments must be between $0 and $10,000');
  }

  if (inputs.lossOfUse && (inputs.lossOfUse < 0 || inputs.lossOfUse > 50000)) {
    errors.push('Loss of use coverage must be between $0 and $50,000');
  }

  if (inputs.deductible && (inputs.deductible < 0 || inputs.deductible > 5000)) {
    errors.push('Deductible must be between $0 and $5,000');
  }

  if (inputs.squareFootage && (inputs.squareFootage < 0 || inputs.squareFootage > 10000)) {
    errors.push('Square footage must be between 0 and 10,000');
  }

  if (inputs.bedrooms && (inputs.bedrooms < 0 || inputs.bedrooms > 10)) {
    errors.push('Bedrooms must be between 0 and 10');
  }

  if (inputs.bathrooms && (inputs.bathrooms < 0 || inputs.bathrooms > 10)) {
    errors.push('Bathrooms must be between 0 and 10');
  }

  if (inputs.yearBuilt && (inputs.yearBuilt < 1800 || inputs.yearBuilt > 2030)) {
    errors.push('Year built must be between 1800 and 2030');
  }

  if (inputs.age && (inputs.age < 18 || inputs.age > 100)) {
    errors.push('Age must be between 18 and 100');
  }

  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push('Credit score must be between 300 and 850');
  }

  // Logical validation
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

  // Enum validation
  const validPropertyTypes = ['apartment', 'condo', 'house', 'townhouse', 'duplex', 'studio', 'loft', 'mobile-home'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Property type must be one of: apartment, condo, house, townhouse, duplex, studio, loft, mobile-home');
  }

  const validStates = ['al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'];
  if (inputs.state && !validStates.includes(inputs.state)) {
    errors.push('Invalid state selection');
  }

  const validCities = ['major-metro', 'suburban', 'small-city', 'rural'];
  if (inputs.city && !validCities.includes(inputs.city)) {
    errors.push('City type must be one of: major-metro, suburban, small-city, rural');
  }

  const validCrimeRates = ['low', 'medium', 'high'];
  if (inputs.crimeRate && !validCrimeRates.includes(inputs.crimeRate)) {
    errors.push('Crime rate must be one of: low, medium, high');
  }

  const validSmokingStatuses = ['non-smoker', 'smoker', 'former-smoker'];
  if (inputs.smoking && !validSmokingStatuses.includes(inputs.smoking)) {
    errors.push('Smoking status must be one of: non-smoker, smoker, former-smoker');
  }

  const validPetTypes = ['none', 'dog', 'cat', 'other'];
  if (inputs.pets && !validPetTypes.includes(inputs.pets)) {
    errors.push('Pet type must be one of: none, dog, cat, other');
  }

  const validSecurityFeatures = ['none', 'basic', 'advanced', 'gated'];
  if (inputs.securityFeatures && !validSecurityFeatures.includes(inputs.securityFeatures)) {
    errors.push('Security features must be one of: none, basic, advanced, gated');
  }

  const validFireProtection = ['none', 'smoke-detectors', 'sprinklers', 'fire-station-nearby'];
  if (inputs.fireProtection && !validFireProtection.includes(inputs.fireProtection)) {
    errors.push('Fire protection must be one of: none, smoke-detectors, sprinklers, fire-station-nearby');
  }

  const validFloodZones = ['none', 'low-risk', 'moderate-risk', 'high-risk'];
  if (inputs.floodZone && !validFloodZones.includes(inputs.floodZone)) {
    errors.push('Flood zone must be one of: none, low-risk, moderate-risk, high-risk');
  }

  const validEarthquakeZones = ['none', 'low', 'moderate', 'high'];
  if (inputs.earthquakeZone && !validEarthquakeZones.includes(inputs.earthquakeZone)) {
    errors.push('Earthquake zone must be one of: none, low, moderate, high');
  }

  const validClaimsHistory = ['none', '1-2', '3-5', '5-plus'];
  if (inputs.claimsHistory && !validClaimsHistory.includes(inputs.claimsHistory)) {
    errors.push('Claims history must be one of: none, 1-2, 3-5, 5-plus');
  }

  const validOccupations = ['student', 'professional', 'service', 'retail', 'unemployed', 'retired', 'other'];
  if (inputs.occupation && !validOccupations.includes(inputs.occupation)) {
    errors.push('Occupation must be one of: student, professional, service, retail, unemployed, retired, other');
  }

  const validPolicyTypes = ['basic', 'standard', 'premium', 'comprehensive'];
  if (inputs.policyType && !validPolicyTypes.includes(inputs.policyType)) {
    errors.push('Policy type must be one of: basic, standard, premium, comprehensive');
  }

  const validReplacementCost = ['actual-cash-value', 'replacement-cost'];
  if (inputs.replacementCost && !validReplacementCost.includes(inputs.replacementCost)) {
    errors.push('Replacement cost must be one of: actual-cash-value, replacement-cost');
  }

  const validIdentityTheft = ['none', 'basic', 'comprehensive'];
  if (inputs.identityTheft && !validIdentityTheft.includes(inputs.identityTheft)) {
    errors.push('Identity theft coverage must be one of: none, basic, comprehensive');
  }

  const validWaterBackup = ['none', 'basic', 'enhanced'];
  if (inputs.waterBackup && !validWaterBackup.includes(inputs.waterBackup)) {
    errors.push('Water backup coverage must be one of: none, basic, enhanced');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

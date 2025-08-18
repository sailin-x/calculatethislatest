import { CalculatorInputs } from '../../../types/calculator';

export function validateHomeValue(value: any): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Home value is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 10000 || value > 10000000) return { isValid: false, message: 'Must be between $10,000 and $10,000,000' };
  return { isValid: true };
}

export function validateReplacementCost(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value !== undefined && (value < 10000 || value > 15000000)) return { isValid: false, message: 'Must be between $10,000 and $15,000,000' };
  return { isValid: true };
}

export function validatePropertyType(value: any): { isValid: boolean; message?: string } {
  if (value && !['single-family', 'condo', 'townhouse', 'duplex', 'multi-family'].includes(value)) return { isValid: false, message: 'Invalid property type' };
  return { isValid: true };
}

export function validateConstructionType(value: any): { isValid: boolean; message?: string } {
  if (value && !['frame', 'brick', 'stone', 'concrete', 'steel', 'mixed'].includes(value)) return { isValid: false, message: 'Invalid construction type' };
  return { isValid: true };
}

export function validateYearBuilt(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 1800 || value > new Date().getFullYear())) return { isValid: false, message: 'Must be between 1800 and current year' };
  return { isValid: true };
}

export function validateSquareFootage(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value !== undefined && (value < 100 || value > 50000)) return { isValid: false, message: 'Must be between 100 and 50,000' };
  return { isValid: true };
}

export function validateLocation(value: any): { isValid: boolean; message?: string } {
  if (value && !['urban', 'suburban', 'rural'].includes(value)) return { isValid: false, message: 'Invalid location type' };
  return { isValid: true };
}

export function validateState(value: any): { isValid: boolean; message?: string } {
  if (value && !['california', 'florida', 'texas', 'new-york', 'illinois', 'pennsylvania', 'ohio', 'georgia', 'north-carolina', 'michigan'].includes(value)) return { isValid: false, message: 'Invalid state' };
  return { isValid: true };
}

export function validateZipCode(value: any): { isValid: boolean; message?: string } {
  if (value && !/^\d{5}(-\d{4})?$/.test(value)) return { isValid: false, message: 'Invalid zip code format' };
  return { isValid: true };
}

export function validateCrimeRate(value: any): { isValid: boolean; message?: string } {
  if (value && !['low', 'medium', 'high'].includes(value)) return { isValid: false, message: 'Invalid crime rate' };
  return { isValid: true };
}

export function validateFireStationDistance(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 50) return { isValid: false, message: 'Must be 50 miles or less' };
  return { isValid: true };
}

export function validateFloodZone(value: any): { isValid: boolean; message?: string } {
  if (value && !['none', 'a', 'ae', 'ah', 'ao', 'ar', 'a99', 'v', 've', 'x'].includes(value)) return { isValid: false, message: 'Invalid flood zone' };
  return { isValid: true };
}

export function validateEarthquakeZone(value: any): { isValid: boolean; message?: string } {
  if (value && !['none', 'low', 'moderate', 'high', 'very-high'].includes(value)) return { isValid: false, message: 'Invalid earthquake zone' };
  return { isValid: true };
}

export function validateHurricaneZone(value: any): { isValid: boolean; message?: string } {
  if (value && !['none', 'low', 'moderate', 'high', 'very-high'].includes(value)) return { isValid: false, message: 'Invalid hurricane zone' };
  return { isValid: true };
}

export function validateTornadoZone(value: any): { isValid: boolean; message?: string } {
  if (value && !['none', 'low', 'moderate', 'high', 'very-high'].includes(value)) return { isValid: false, message: 'Invalid tornado zone' };
  return { isValid: true };
}

export function validateWildfireZone(value: any): { isValid: boolean; message?: string } {
  if (value && !['none', 'low', 'moderate', 'high', 'very-high'].includes(value)) return { isValid: false, message: 'Invalid wildfire zone' };
  return { isValid: true };
}

export function validateDeductible(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value !== undefined && ![500, 1000, 1500, 2000, 2500, 5000].includes(value)) return { isValid: false, message: 'Must be one of: 500, 1000, 1500, 2000, 2500, 5000' };
  return { isValid: true };
}

export function validateCoverageLevel(value: any): { isValid: boolean; message?: string } {
  if (value && !['basic', 'standard', 'premium', 'comprehensive'].includes(value)) return { isValid: false, message: 'Invalid coverage level' };
  return { isValid: true };
}

export function validatePersonalPropertyValue(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 1000000) return { isValid: false, message: 'Must be $1,000,000 or less' };
  return { isValid: true };
}

export function validateLiabilityCoverage(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value !== undefined && (value < 100000 || value > 5000000)) return { isValid: false, message: 'Must be between $100,000 and $5,000,000' };
  return { isValid: true };
}

export function validateMedicalPayments(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value !== undefined && (value < 1000 || value > 100000)) return { isValid: false, message: 'Must be between $1,000 and $100,000' };
  return { isValid: true };
}

export function validateLossOfUse(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value !== undefined && (value < 5000 || value > 200000)) return { isValid: false, message: 'Must be between $5,000 and $200,000' };
  return { isValid: true };
}

export function validateJewelryCoverage(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 100000) return { isValid: false, message: 'Must be $100,000 or less' };
  return { isValid: true };
}

export function validateElectronicsCoverage(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 50000) return { isValid: false, message: 'Must be $50,000 or less' };
  return { isValid: true };
}

export function validateBusinessEquipmentCoverage(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 100000) return { isValid: false, message: 'Must be $100,000 or less' };
  return { isValid: true };
}

export function validateCreditScore(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 300 || value > 850)) return { isValid: false, message: 'Must be between 300 and 850' };
  return { isValid: true };
}

export function validateClaimsHistory(value: any): { isValid: boolean; message?: string } {
  if (value && !['none', '1-2', '3-5', '5-plus'].includes(value)) return { isValid: false, message: 'Invalid claims history' };
  return { isValid: true };
}

export function validateOccupancyType(value: any): { isValid: boolean; message?: string } {
  if (value && !['owner-occupied', 'rental', 'vacation', 'investment'].includes(value)) return { isValid: false, message: 'Invalid occupancy type' };
  return { isValid: true };
}

export function validateSecurityFeatures(value: any): { isValid: boolean; message?: string } {
  if (value && !Array.isArray(value)) return { isValid: false, message: 'Must be an array' };
  if (value) {
    const validFeatures = ['alarm-system', 'smoke-detectors', 'fire-sprinklers', 'deadbolts', 'security-cameras', 'gated-community'];
    for (const feature of value) {
      if (!validFeatures.includes(feature)) return { isValid: false, message: `Invalid security feature: ${feature}` };
    }
  }
  return { isValid: true };
}

export function validateRoofAge(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 50) return { isValid: false, message: 'Must be 50 years or less' };
  return { isValid: true };
}

export function validateHeatingSystemAge(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 50) return { isValid: false, message: 'Must be 50 years or less' };
  return { isValid: true };
}

export function validateElectricalSystemAge(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 50) return { isValid: false, message: 'Must be 50 years or less' };
  return { isValid: true };
}

export function validatePlumbingSystemAge(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 50) return { isValid: false, message: 'Must be 50 years or less' };
  return { isValid: true };
}

export function validateWaterBackup(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 50000) return { isValid: false, message: 'Must be $50,000 or less' };
  return { isValid: true };
}

export function validateIdentityTheft(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 25000) return { isValid: false, message: 'Must be $25,000 or less' };
  return { isValid: true };
}

export function validateTaxRate(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) return { isValid: false, message: 'Must be between 0 and 100' };
  return { isValid: true };
}

export function validateInflationRate(value: any): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -50 || value > 100)) return { isValid: false, message: 'Must be between -50 and 100' };
  return { isValid: true };
}

export function validateAllHomeInsuranceInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const homeValueResult = validateHomeValue(inputs.homeValue);
  if (!homeValueResult.isValid) errors.push(homeValueResult.message!);

  const replacementCostResult = validateReplacementCost(inputs.replacementCost);
  if (!replacementCostResult.isValid) errors.push(replacementCostResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const constructionTypeResult = validateConstructionType(inputs.constructionType);
  if (!constructionTypeResult.isValid) errors.push(constructionTypeResult.message!);

  const yearBuiltResult = validateYearBuilt(inputs.yearBuilt);
  if (!yearBuiltResult.isValid) errors.push(yearBuiltResult.message!);

  const squareFootageResult = validateSquareFootage(inputs.squareFootage);
  if (!squareFootageResult.isValid) errors.push(squareFootageResult.message!);

  const locationResult = validateLocation(inputs.location);
  if (!locationResult.isValid) errors.push(locationResult.message!);

  const stateResult = validateState(inputs.state);
  if (!stateResult.isValid) errors.push(stateResult.message!);

  const zipCodeResult = validateZipCode(inputs.zipCode);
  if (!zipCodeResult.isValid) errors.push(zipCodeResult.message!);

  const crimeRateResult = validateCrimeRate(inputs.crimeRate);
  if (!crimeRateResult.isValid) errors.push(crimeRateResult.message!);

  const fireStationDistanceResult = validateFireStationDistance(inputs.fireStationDistance);
  if (!fireStationDistanceResult.isValid) errors.push(fireStationDistanceResult.message!);

  const floodZoneResult = validateFloodZone(inputs.floodZone);
  if (!floodZoneResult.isValid) errors.push(floodZoneResult.message!);

  const earthquakeZoneResult = validateEarthquakeZone(inputs.earthquakeZone);
  if (!earthquakeZoneResult.isValid) errors.push(earthquakeZoneResult.message!);

  const hurricaneZoneResult = validateHurricaneZone(inputs.hurricaneZone);
  if (!hurricaneZoneResult.isValid) errors.push(hurricaneZoneResult.message!);

  const tornadoZoneResult = validateTornadoZone(inputs.tornadoZone);
  if (!tornadoZoneResult.isValid) errors.push(tornadoZoneResult.message!);

  const wildfireZoneResult = validateWildfireZone(inputs.wildfireZone);
  if (!wildfireZoneResult.isValid) errors.push(wildfireZoneResult.message!);

  const deductibleResult = validateDeductible(inputs.deductible);
  if (!deductibleResult.isValid) errors.push(deductibleResult.message!);

  const coverageLevelResult = validateCoverageLevel(inputs.coverageLevel);
  if (!coverageLevelResult.isValid) errors.push(coverageLevelResult.message!);

  const personalPropertyValueResult = validatePersonalPropertyValue(inputs.personalPropertyValue);
  if (!personalPropertyValueResult.isValid) errors.push(personalPropertyValueResult.message!);

  const liabilityCoverageResult = validateLiabilityCoverage(inputs.liabilityCoverage);
  if (!liabilityCoverageResult.isValid) errors.push(liabilityCoverageResult.message!);

  const medicalPaymentsResult = validateMedicalPayments(inputs.medicalPayments);
  if (!medicalPaymentsResult.isValid) errors.push(medicalPaymentsResult.message!);

  const lossOfUseResult = validateLossOfUse(inputs.lossOfUse);
  if (!lossOfUseResult.isValid) errors.push(lossOfUseResult.message!);

  const jewelryCoverageResult = validateJewelryCoverage(inputs.jewelryCoverage);
  if (!jewelryCoverageResult.isValid) errors.push(jewelryCoverageResult.message!);

  const electronicsCoverageResult = validateElectronicsCoverage(inputs.electronicsCoverage);
  if (!electronicsCoverageResult.isValid) errors.push(electronicsCoverageResult.message!);

  const businessEquipmentCoverageResult = validateBusinessEquipmentCoverage(inputs.businessEquipmentCoverage);
  if (!businessEquipmentCoverageResult.isValid) errors.push(businessEquipmentCoverageResult.message!);

  const creditScoreResult = validateCreditScore(inputs.creditScore);
  if (!creditScoreResult.isValid) errors.push(creditScoreResult.message!);

  const claimsHistoryResult = validateClaimsHistory(inputs.claimsHistory);
  if (!claimsHistoryResult.isValid) errors.push(claimsHistoryResult.message!);

  const occupancyTypeResult = validateOccupancyType(inputs.occupancyType);
  if (!occupancyTypeResult.isValid) errors.push(occupancyTypeResult.message!);

  const securityFeaturesResult = validateSecurityFeatures(inputs.securityFeatures);
  if (!securityFeaturesResult.isValid) errors.push(securityFeaturesResult.message!);

  const roofAgeResult = validateRoofAge(inputs.roofAge);
  if (!roofAgeResult.isValid) errors.push(roofAgeResult.message!);

  const heatingSystemAgeResult = validateHeatingSystemAge(inputs.heatingSystemAge);
  if (!heatingSystemAgeResult.isValid) errors.push(heatingSystemAgeResult.message!);

  const electricalSystemAgeResult = validateElectricalSystemAge(inputs.electricalSystemAge);
  if (!electricalSystemAgeResult.isValid) errors.push(electricalSystemAgeResult.message!);

  const plumbingSystemAgeResult = validatePlumbingSystemAge(inputs.plumbingSystemAge);
  if (!plumbingSystemAgeResult.isValid) errors.push(plumbingSystemAgeResult.message!);

  const waterBackupResult = validateWaterBackup(inputs.waterBackup);
  if (!waterBackupResult.isValid) errors.push(waterBackupResult.message!);

  const identityTheftResult = validateIdentityTheft(inputs.identityTheft);
  if (!identityTheftResult.isValid) errors.push(identityTheftResult.message!);

  const taxRateResult = validateTaxRate(inputs.taxRate);
  if (!taxRateResult.isValid) errors.push(taxRateResult.message!);

  const inflationRateResult = validateInflationRate(inputs.inflationRate);
  if (!inflationRateResult.isValid) errors.push(inflationRateResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}

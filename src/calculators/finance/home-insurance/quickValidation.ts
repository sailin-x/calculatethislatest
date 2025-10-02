import { CalculatorInputs } from '../../types/calculator';

// Property Information Validators
export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property value is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 50000 || value > 10000000) return { isValid: false, message: 'Must be between $50,000 and $10,000,000' };
  return { isValid: true };
}

export function validatePropertyAddress(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) return { isValid: false, message: 'Property address is required' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property type is required' };
  const validTypes = ['single_family', 'condo', 'townhouse', 'multi_family', 'mobile_home'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid property type' };
  return { isValid: true };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Property age is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 100) return { isValid: false, message: 'Must be 100 years or less' };
  return { isValid: true };
}

export function validatePropertySize(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Property size is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 500 || value > 10000) return { isValid: false, message: 'Must be between 500 and 10,000 sq ft' };
  return { isValid: true };
}

export function validateConstructionType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Construction type is required' };
  const validTypes = ['wood_frame', 'brick', 'stone', 'concrete', 'steel_frame', 'mixed'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid construction type' };
  return { isValid: true };
}

export function validateRoofType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Roof type is required' };
  const validTypes = ['asphalt_shingle', 'metal', 'tile', 'slate', 'wood_shake', 'flat'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid roof type' };
  return { isValid: true };
}

export function validateRoofAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Roof age is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 50) return { isValid: false, message: 'Must be 50 years or less' };
  return { isValid: true };
}

// Location Validators
export function validateState(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) return { isValid: false, message: 'State is required' };
  return { isValid: true };
}

export function validateCity(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) return { isValid: false, message: 'City is required' };
  return { isValid: true };
}

export function validateZipCode(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) return { isValid: false, message: 'ZIP code is required' };
  if (!/^\d{5}(-\d{4})?$/.test(value)) return { isValid: false, message: 'Invalid ZIP code format' };
  return { isValid: true };
}

export function validateFloodZone(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Flood zone is required' };
  const validZones = ['low_risk', 'moderate_risk', 'high_risk', 'very_high_risk', 'unknown'];
  if (!validZones.includes(value)) return { isValid: false, message: 'Invalid flood zone' };
  return { isValid: true };
}

export function validateCrimeRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Crime rate is required' };
  const validRates = ['low', 'medium', 'high', 'very_high'];
  if (!validRates.includes(value)) return { isValid: false, message: 'Invalid crime rate' };
  return { isValid: true };
}

export function validateFireStationDistance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Fire station distance is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 50) return { isValid: false, message: 'Must be 50 miles or less' };
  return { isValid: true };
}

export function validatePoliceStationDistance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Police station distance is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 50) return { isValid: false, message: 'Must be 50 miles or less' };
  return { isValid: true };
}

// Coverage Validators
export function validateDwellingCoverage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Dwelling coverage is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 50000 || value > 5000000) return { isValid: false, message: 'Must be between $50,000 and $5,000,000' };
  return { isValid: true };
}

export function validatePersonalPropertyCoverage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Personal property coverage is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 1000000) return { isValid: false, message: 'Must be $1,000,000 or less' };
  return { isValid: true };
}

export function validateLiabilityCoverage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Liability coverage is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 100000 || value > 1000000) return { isValid: false, message: 'Must be between $100,000 and $1,000,000' };
  return { isValid: true };
}

export function validateMedicalPaymentsCoverage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Medical payments coverage is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 1000 || value > 10000) return { isValid: false, message: 'Must be between $1,000 and $10,000' };
  return { isValid: true };
}

export function validateLossOfUseCoverage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Loss of use coverage is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 10000 || value > 100000) return { isValid: false, message: 'Must be between $10,000 and $100,000' };
  return { isValid: true };
}

export function validateOtherStructuresCoverage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Other structures coverage is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 500000) return { isValid: false, message: 'Must be $500,000 or less' };
  return { isValid: true };
}

// Deductible Validators
export function validateDwellingDeductible(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Dwelling deductible is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  const validDeductibles = [250, 500, 1000, 1500, 2000, 2500, 5000, 10000];
  if (!validDeductibles.includes(value)) return { isValid: false, message: 'Must be one of: 250, 500, 1000, 1500, 2000, 2500, 5000, 10000' };
  return { isValid: true };
}

export function validatePersonalPropertyDeductible(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Personal property deductible is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  const validDeductibles = [250, 500, 1000, 1500, 2000, 2500, 5000];
  if (!validDeductibles.includes(value)) return { isValid: false, message: 'Must be one of: 250, 500, 1000, 1500, 2000, 2500, 5000' };
  return { isValid: true };
}

export function validateLiabilityDeductible(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Liability deductible is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 5000) return { isValid: false, message: 'Must be $5,000 or less' };
  return { isValid: true };
}

export function validateHurricaneDeductible(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Hurricane deductible is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 50000) return { isValid: false, message: 'Must be $50,000 or less' };
  return { isValid: true };
}

export function validateWindstormDeductible(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Windstorm deductible is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 25000) return { isValid: false, message: 'Must be $25,000 or less' };
  return { isValid: true };
}

// Claims History Validators
export function validateClaimsInLast3Years(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Claims in last 3 years is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 10) return { isValid: false, message: 'Must be 10 or less' };
  return { isValid: true };
}

export function validateClaimsInLast5Years(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Claims in last 5 years is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 15) return { isValid: false, message: 'Must be 15 or less' };
  return { isValid: true };
}

export function validateClaimsInLast10Years(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Claims in last 10 years is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 25) return { isValid: false, message: 'Must be 25 or less' };
  return { isValid: true };
}

export function validateTotalClaimAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Total claim amount is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 1000000) return { isValid: false, message: 'Must be $1,000,000 or less' };
  return { isValid: true };
}

// Policy Information Validators
export function validateInsuranceCompany(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) return { isValid: false, message: 'Insurance company is required' };
  return { isValid: true };
}

export function validatePolicyType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Policy type is required' };
  const validTypes = ['standard', 'premium', 'basic', 'custom'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid policy type' };
  return { isValid: true };
}

export function validatePolicyTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Policy term is required' };
  if (typeof value !== 'number' || value < 6) return { isValid: false, message: 'Must be at least 6 months' };
  if (value > 36) return { isValid: false, message: 'Must be 36 months or less' };
  return { isValid: true };
}

// Analysis Parameters Validators
export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Analysis period is required' };
  if (typeof value !== 'number' || value < 1) return { isValid: false, message: 'Must be at least 1 year' };
  if (value > 10) return { isValid: false, message: 'Must be 10 years or less' };
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Inflation rate is required' };
  if (typeof value !== 'number' || value < -5) return { isValid: false, message: 'Must be -5% or higher' };
  if (value > 15) return { isValid: false, message: 'Must be 15% or less' };
  return { isValid: true };
}

export function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Property appreciation rate is required' };
  if (typeof value !== 'number' || value < -10) return { isValid: false, message: 'Must be -10% or higher' };
  if (value > 20) return { isValid: false, message: 'Must be 20% or less' };
  return { isValid: true };
}

export function validateRentalUnits(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Rental units is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 10) return { isValid: false, message: 'Must be 10 or less' };
  return { isValid: true };
}

export function validateAllHomeInsuranceInputs(inputs: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Property Information
  const propertyValueResult = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueResult.isValid) errors.push(propertyValueResult.message!);

  const propertyAddressResult = validatePropertyAddress(inputs.propertyAddress);
  if (!propertyAddressResult.isValid) errors.push(propertyAddressResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const propertyAgeResult = validatePropertyAge(inputs.propertyAge);
  if (!propertyAgeResult.isValid) errors.push(propertyAgeResult.message!);

  const propertySizeResult = validatePropertySize(inputs.propertySize);
  if (!propertySizeResult.isValid) errors.push(propertySizeResult.message!);

  const constructionTypeResult = validateConstructionType(inputs.constructionType);
  if (!constructionTypeResult.isValid) errors.push(constructionTypeResult.message!);

  const roofTypeResult = validateRoofType(inputs.roofType);
  if (!roofTypeResult.isValid) errors.push(roofTypeResult.message!);

  const roofAgeResult = validateRoofAge(inputs.roofAge);
  if (!roofAgeResult.isValid) errors.push(roofAgeResult.message!);

  // Location Information
  const stateResult = validateState(inputs.state);
  if (!stateResult.isValid) errors.push(stateResult.message!);

  const cityResult = validateCity(inputs.city);
  if (!cityResult.isValid) errors.push(cityResult.message!);

  const zipCodeResult = validateZipCode(inputs.zipCode);
  if (!zipCodeResult.isValid) errors.push(zipCodeResult.message!);

  const floodZoneResult = validateFloodZone(inputs.floodZone);
  if (!floodZoneResult.isValid) errors.push(floodZoneResult.message!);

  const crimeRateResult = validateCrimeRate(inputs.crimeRate);
  if (!crimeRateResult.isValid) errors.push(crimeRateResult.message!);

  const fireStationDistanceResult = validateFireStationDistance(inputs.fireStationDistance);
  if (!fireStationDistanceResult.isValid) errors.push(fireStationDistanceResult.message!);

  const policeStationDistanceResult = validatePoliceStationDistance(inputs.policeStationDistance);
  if (!policeStationDistanceResult.isValid) errors.push(policeStationDistanceResult.message!);

  // Coverage Information
  const dwellingCoverageResult = validateDwellingCoverage(inputs.dwellingCoverage);
  if (!dwellingCoverageResult.isValid) errors.push(dwellingCoverageResult.message!);

  const personalPropertyCoverageResult = validatePersonalPropertyCoverage(inputs.personalPropertyCoverage);
  if (!personalPropertyCoverageResult.isValid) errors.push(personalPropertyCoverageResult.message!);

  const liabilityCoverageResult = validateLiabilityCoverage(inputs.liabilityCoverage);
  if (!liabilityCoverageResult.isValid) errors.push(liabilityCoverageResult.message!);

  const medicalPaymentsCoverageResult = validateMedicalPaymentsCoverage(inputs.medicalPaymentsCoverage);
  if (!medicalPaymentsCoverageResult.isValid) errors.push(medicalPaymentsCoverageResult.message!);

  const lossOfUseCoverageResult = validateLossOfUseCoverage(inputs.lossOfUseCoverage);
  if (!lossOfUseCoverageResult.isValid) errors.push(lossOfUseCoverageResult.message!);

  const otherStructuresCoverageResult = validateOtherStructuresCoverage(inputs.otherStructuresCoverage);
  if (!otherStructuresCoverageResult.isValid) errors.push(otherStructuresCoverageResult.message!);

  // Deductibles
  const dwellingDeductibleResult = validateDwellingDeductible(inputs.dwellingDeductible);
  if (!dwellingDeductibleResult.isValid) errors.push(dwellingDeductibleResult.message!);

  const personalPropertyDeductibleResult = validatePersonalPropertyDeductible(inputs.personalPropertyDeductible);
  if (!personalPropertyDeductibleResult.isValid) errors.push(personalPropertyDeductibleResult.message!);

  const liabilityDeductibleResult = validateLiabilityDeductible(inputs.liabilityDeductible);
  if (!liabilityDeductibleResult.isValid) errors.push(liabilityDeductibleResult.message!);

  const hurricaneDeductibleResult = validateHurricaneDeductible(inputs.hurricaneDeductible);
  if (!hurricaneDeductibleResult.isValid) errors.push(hurricaneDeductibleResult.message!);

  const windstormDeductibleResult = validateWindstormDeductible(inputs.windstormDeductible);
  if (!windstormDeductibleResult.isValid) errors.push(windstormDeductibleResult.message!);

  // Claims History
  const claimsInLast3YearsResult = validateClaimsInLast3Years(inputs.claimsInLast3Years);
  if (!claimsInLast3YearsResult.isValid) errors.push(claimsInLast3YearsResult.message!);

  const claimsInLast5YearsResult = validateClaimsInLast5Years(inputs.claimsInLast5Years);
  if (!claimsInLast5YearsResult.isValid) errors.push(claimsInLast5YearsResult.message!);

  const claimsInLast10YearsResult = validateClaimsInLast10Years(inputs.claimsInLast10Years);
  if (!claimsInLast10YearsResult.isValid) errors.push(claimsInLast10YearsResult.message!);

  const totalClaimAmountResult = validateTotalClaimAmount(inputs.totalClaimAmount);
  if (!totalClaimAmountResult.isValid) errors.push(totalClaimAmountResult.message!);

  // Policy Information
  const insuranceCompanyResult = validateInsuranceCompany(inputs.insuranceCompany);
  if (!insuranceCompanyResult.isValid) errors.push(insuranceCompanyResult.message!);

  const policyTypeResult = validatePolicyType(inputs.policyType);
  if (!policyTypeResult.isValid) errors.push(policyTypeResult.message!);

  const policyTermResult = validatePolicyTerm(inputs.policyTerm);
  if (!policyTermResult.isValid) errors.push(policyTermResult.message!);

  // Analysis Parameters
  const analysisPeriodResult = validateAnalysisPeriod(inputs.analysisPeriod);
  if (!analysisPeriodResult.isValid) errors.push(analysisPeriodResult.message!);

  const inflationRateResult = validateInflationRate(inputs.inflationRate);
  if (!inflationRateResult.isValid) errors.push(inflationRateResult.message!);

  const propertyAppreciationRateResult = validatePropertyAppreciationRate(inputs.propertyAppreciationRate);
  if (!propertyAppreciationRateResult.isValid) errors.push(propertyAppreciationRateResult.message!);

  // Risk Factors
  const rentalUnitsResult = validateRentalUnits(inputs.rentalUnits);
  if (!rentalUnitsResult.isValid) errors.push(rentalUnitsResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}

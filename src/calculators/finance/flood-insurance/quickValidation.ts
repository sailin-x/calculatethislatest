import { CalculatorInputs } from '../../../types/calculator';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property value is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Property value must be a number' };
  if (value < 10000 || value > 10000000) return { isValid: false, message: 'Property value must be between $10,000 and $10,000,000' };
  return { isValid: true };
}

export function validateBuildingValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Building value is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Building value must be a number' };
  if (value < 5000 || value > 10000000) return { isValid: false, message: 'Building value must be between $5,000 and $10,000,000' };
  return { isValid: true };
}

export function validateContentsValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Contents value is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Contents value must be a number' };
  if (value < 1000 || value > 5000000) return { isValid: false, message: 'Contents value must be between $1,000 and $5,000,000' };
  return { isValid: true };
}

export function validateFloodZone(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Flood zone is required' };
  const validZones = ['A', 'AE', 'AH', 'AO', 'AR', 'A99', 'V', 'VE', 'X', 'D'];
  if (!validZones.includes(value)) return { isValid: false, message: 'Invalid flood zone' };
  return { isValid: true };
}

export function validateDeductible(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Deductible is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Deductible must be a number' };
  if (value < 1000 || value > 100000) return { isValid: false, message: 'Deductible must be between $1,000 and $100,000' };
  return { isValid: true };
}

export function validatePolicyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Policy type is required' };
  const validTypes = ['nfip', 'private', 'excess'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid policy type' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property type is required' };
  const validTypes = ['single-family', 'multi-family', 'condo', 'commercial', 'manufactured'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid property type' };
  return { isValid: true };
}

export function validateOccupancyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Occupancy type is required' };
  const validTypes = ['primary', 'secondary', 'rental', 'business'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid occupancy type' };
  return { isValid: true };
}

export function validateBuildingElevation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Building elevation must be a number' };
  if (value && (value < -50 || value > 100)) return { isValid: false, message: 'Building elevation must be between -50 and 100 feet' };
  return { isValid: true };
}

export function validateBaseFloodElevation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Base flood elevation must be a number' };
  if (value && (value < -50 || value > 100)) return { isValid: false, message: 'Base flood elevation must be between -50 and 100 feet' };
  return { isValid: true };
}

export function validateContentsDeductible(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Contents deductible must be a number' };
  if (value && (value < 500 || value > 50000)) return { isValid: false, message: 'Contents deductible must be between $500 and $50,000' };
  return { isValid: true };
}

export function validateAdditionalLivingExpenses(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Additional living expenses must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Additional living expenses must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateBusinessInterruption(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Business interruption must be a number' };
  if (value && (value < 0 || value > 500000)) return { isValid: false, message: 'Business interruption must be between $0 and $500,000' };
  return { isValid: true };
}

export function validateOrdinanceLaw(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Ordinance and law coverage must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Ordinance and law coverage must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateUmbrellaLiability(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Umbrella liability must be a number' };
  if (value && (value < 0 || value > 10000000)) return { isValid: false, message: 'Umbrella liability must be between $0 and $10,000,000' };
  return { isValid: true };
}

export function validateElevationCertStatus(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validStatuses = ['yes', 'no', 'pending'];
    if (!validStatuses.includes(value)) return { isValid: false, message: 'Invalid elevation certificate status' };
  }
  return { isValid: true };
}

export function validateMitigationMeasures(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validMeasures = ['elevation', 'floodwalls', 'dry-floodproofing', 'wet-floodproofing', 'none'];
    if (!validMeasures.includes(value)) return { isValid: false, message: 'Invalid mitigation measures' };
  }
  return { isValid: true };
}

export function validateCommunityRating(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validRatings = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'none'];
    if (!validRatings.includes(value)) return { isValid: false, message: 'Invalid community rating' };
  }
  return { isValid: true };
}

export function validateRiskScore(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Risk score must be a number' };
  if (value && (value < 1 || value > 10)) return { isValid: false, message: 'Risk score must be between 1 and 10' };
  return { isValid: true };
}

export function validateAffordabilityScore(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Affordability score must be a number' };
  if (value && (value < 1 || value > 10)) return { isValid: false, message: 'Affordability score must be between 1 and 10' };
  return { isValid: true };
}

export function validateAllFloodInsuranceInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const propertyValueResult = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueResult.isValid) errors.push(propertyValueResult.message!);

  const buildingValueResult = validateBuildingValue(inputs.buildingValue);
  if (!buildingValueResult.isValid) errors.push(buildingValueResult.message!);

  const contentsValueResult = validateContentsValue(inputs.contentsValue);
  if (!contentsValueResult.isValid) errors.push(contentsValueResult.message!);

  const floodZoneResult = validateFloodZone(inputs.floodZone);
  if (!floodZoneResult.isValid) errors.push(floodZoneResult.message!);

  const deductibleResult = validateDeductible(inputs.deductible);
  if (!deductibleResult.isValid) errors.push(deductibleResult.message!);

  const policyTypeResult = validatePolicyType(inputs.policyType);
  if (!policyTypeResult.isValid) errors.push(policyTypeResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const occupancyTypeResult = validateOccupancyType(inputs.occupancyType);
  if (!occupancyTypeResult.isValid) errors.push(occupancyTypeResult.message!);

  const buildingElevationResult = validateBuildingElevation(inputs.buildingElevation);
  if (!buildingElevationResult.isValid) errors.push(buildingElevationResult.message!);

  const baseFloodElevationResult = validateBaseFloodElevation(inputs.baseFloodElevation);
  if (!baseFloodElevationResult.isValid) errors.push(baseFloodElevationResult.message!);

  const contentsDeductibleResult = validateContentsDeductible(inputs.contentsDeductible);
  if (!contentsDeductibleResult.isValid) errors.push(contentsDeductibleResult.message!);

  const additionalLivingExpensesResult = validateAdditionalLivingExpenses(inputs.additionalLivingExpenses);
  if (!additionalLivingExpensesResult.isValid) errors.push(additionalLivingExpensesResult.message!);

  const businessInterruptionResult = validateBusinessInterruption(inputs.businessInterruption);
  if (!businessInterruptionResult.isValid) errors.push(businessInterruptionResult.message!);

  const ordinanceLawResult = validateOrdinanceLaw(inputs.ordinanceLaw);
  if (!ordinanceLawResult.isValid) errors.push(ordinanceLawResult.message!);

  const umbrellaLiabilityResult = validateUmbrellaLiability(inputs.umbrellaLiability);
  if (!umbrellaLiabilityResult.isValid) errors.push(umbrellaLiabilityResult.message!);

  const elevationCertStatusResult = validateElevationCertStatus(inputs.elevationCertStatus);
  if (!elevationCertStatusResult.isValid) errors.push(elevationCertStatusResult.message!);

  const mitigationMeasuresResult = validateMitigationMeasures(inputs.mitigationMeasures);
  if (!mitigationMeasuresResult.isValid) errors.push(mitigationMeasuresResult.message!);

  const communityRatingResult = validateCommunityRating(inputs.communityRating);
  if (!communityRatingResult.isValid) errors.push(communityRatingResult.message!);

  const riskScoreResult = validateRiskScore(inputs.riskScore);
  if (!riskScoreResult.isValid) errors.push(riskScoreResult.message!);

  const affordabilityScoreResult = validateAffordabilityScore(inputs.affordabilityScore);
  if (!affordabilityScoreResult.isValid) errors.push(affordabilityScoreResult.message!);

  // Logical validation
  if (inputs.buildingValue && inputs.propertyValue && inputs.buildingValue > inputs.propertyValue) {
    errors.push('Building value cannot exceed property value');
  }
  if (inputs.contentsValue && inputs.propertyValue && inputs.contentsValue > inputs.propertyValue) {
    errors.push('Contents value cannot exceed property value');
  }
  if (inputs.deductible && inputs.buildingValue && inputs.deductible > inputs.buildingValue) {
    errors.push('Deductible cannot exceed building value');
  }
  if (inputs.contentsDeductible && inputs.contentsValue && inputs.contentsDeductible > inputs.contentsValue) {
    errors.push('Contents deductible cannot exceed contents value');
  }
  if (inputs.buildingElevation && inputs.baseFloodElevation) {
    const elevationDiff = inputs.buildingElevation - inputs.baseFloodElevation;
    if (elevationDiff < -20) {
      errors.push('Building elevation is significantly below base flood elevation');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

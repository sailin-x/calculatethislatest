import { CalculatorInputs } from '../../../types/calculator';

// Quick validation functions for individual inputs with allInputs parameter

export function validatePropertyAddress(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim().length === 0) {
    return 'Property address is required';
  }
  if (value.length > 200) {
    return 'Property address must be 200 characters or less';
  }
  return null;
}


export function validatePropertyValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Property value must be greater than zero';
  }
  if (value > 10000000) {
    return 'Property value over $10 million seems excessive';
  }
  return null;
}

export function validatePropertySize(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Property size must be greater than zero';
  }
  if (value > 100000) {
    return 'Property size over 100,000 sq ft seems unrealistic';
  }
  return null;
}

export function validateYearBuilt(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1800 || value > 2030) {
    return 'Year built must be between 1800 and 2030';
  }
  return null;
}

export function validateNumberOfStories(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Number of stories must be greater than zero';
  }
  if (value > 50) {
    return 'Number of stories over 50 seems unrealistic';
  }
  return null;
}

export function validateFoundationType(value: string, allInputs?: Record<string, any>): string | null {
  const validTypes = ['slab', 'crawlspace', 'basement', 'elevated', 'pier_and_beam'];
  if (!validTypes.includes(value)) {
    return 'Invalid foundation type selected';
  }
  return null;
}


export function validateElevationCertificate(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}


export function validatePropertyElevation(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < -50 || value > 10000) {
      return 'Property elevation must be between -50 and 10,000 feet';
    }
  }
  return null;
}

export function validateDistanceToWater(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Distance to water cannot be negative';
    }
    if (value > 100000) {
      return 'Distance to water over 100,000 feet seems unrealistic';
    }
  }
  return null;
}

export function validateCoastalLocation(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateBuildingCoverage(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Building coverage must be greater than zero';
  }
  if (value > 10000000) {
    return 'Building coverage over $10 million seems excessive';
  }
  return null;
}

export function validateContentsCoverage(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) {
    return 'Contents coverage cannot be negative';
  }
  if (value > 5000000) {
    return 'Contents coverage over $5 million seems excessive';
  }
  return null;
}

export function validateReplacementCostValue(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value <= 0) {
      return 'Replacement cost value must be greater than zero';
    }
    if (value > 10000000) {
      return 'Replacement cost value over $10 million seems excessive';
    }
  }
  return null;
}

export function validateActualCashValue(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateReplacementCost(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateBuildingDeductible(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 500) {
    return 'Building deductible must be at least $500';
  }
  if (value > 100000) {
    return 'Building deductible over $100,000 seems excessive';
  }
  return null;
}


export function validateSeparateDeductibles(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}


export function validatePolicyTerm(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Policy term must be greater than zero';
  }
  if (value > 60) {
    return 'Policy term over 60 months seems excessive';
  }
  return null;
}

export function validatePolicyStartDate(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) {
    return 'Policy start date is required';
  }
  return null;
}

export function validatePolicyEndDate(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) {
    return 'Policy end date is required';
  }
  return null;
}

export function validateFloodHistory(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateNumberOfPreviousClaims(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Number of previous claims cannot be negative';
    }
    if (value > 50) {
      return 'Number of previous claims over 50 seems excessive';
    }
  }
  return null;
}

export function validateYearsSinceLastClaim(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Years since last claim cannot be negative';
    }
    if (value > 100) {
      return 'Years since last claim over 100 seems unrealistic';
    }
  }
  return null;
}

export function validateFloodRiskScore(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 1 || value > 10) {
      return 'Flood risk score must be between 1 and 10';
    }
  }
  return null;
}

export function validateElevationRisk(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validRisks = ['low', 'medium', 'high'];
    if (!validRisks.includes(value)) {
      return 'Invalid elevation risk selected';
    }
  }
  return null;
}

export function validateConstructionType(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validTypes = ['frame', 'masonry', 'fire_resistive', 'non_combustible'];
    if (!validTypes.includes(value)) {
      return 'Invalid construction type selected';
    }
  }
  return null;
}

export function validateRoofType(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validTypes = ['gable', 'hip', 'flat', 'mansard', 'gambrel'];
    if (!validTypes.includes(value)) {
      return 'Invalid roof type selected';
    }
  }
  return null;
}

export function validateRoofAge(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Roof age cannot be negative';
    }
    if (value > 100) {
      return 'Roof age over 100 years seems unrealistic';
    }
  }
  return null;
}

export function validateFoundationHeight(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Foundation height cannot be negative';
    }
    if (value > 50) {
      return 'Foundation height over 50 feet seems unrealistic';
    }
  }
  return null;
}

export function validateFloodVents(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateNumberOfFloodVents(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Number of flood vents cannot be negative';
    }
    if (value > 100) {
      return 'Number of flood vents over 100 seems excessive';
    }
  }
  return null;
}

export function validateCommunityRatingSystem(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 1 || value > 10) {
      return 'Community rating system score must be between 1 and 10';
    }
  }
  return null;
}

export function validateFloodplainManagement(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateBuildingCodes(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validCodes = ['none', 'basic', 'enhanced', 'strict'];
    if (!validCodes.includes(value)) {
      return 'Invalid building codes selected';
    }
  }
  return null;
}

export function validateEmergencyServices(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateInsuranceCompany(value: string, allInputs?: Record<string, any>): string | null {
  if (value && value.length > 100) {
    return 'Insurance company name must be 100 characters or less';
  }
  return null;
}

export function validateCompanyRating(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validRatings = ['A++', 'A+', 'A', 'A-', 'B++', 'B+', 'B', 'B-', 'C++', 'C+', 'C', 'C-', 'D', 'E', 'F'];
    if (!validRatings.includes(value)) {
      return 'Invalid company rating selected';
    }
  }
  return null;
}

export function validateClaimsService(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validServices = ['excellent', 'good', 'fair', 'poor'];
    if (!validServices.includes(value)) {
      return 'Invalid claims service selected';
    }
  }
  return null;
}

export function validateMultiPolicyDiscount(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateClaimsFreeDiscount(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateProtectiveDeviceDiscount(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateCommunityDiscount(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateElevationDiscount(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateLossOfUse(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateLossOfUseLimit(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Loss of use limit cannot be negative';
    }
    if (value > 100000) {
      return 'Loss of use limit over $100,000 seems excessive';
    }
  }
  return null;
}

export function validateOrdinanceOrLaw(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateOrdinanceOrLawLimit(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Ordinance or law limit cannot be negative';
    }
    if (value > 100000) {
      return 'Ordinance or law limit over $100,000 seems excessive';
    }
  }
  return null;
}

export function validateSewerBackup(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateSewerBackupLimit(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < 0) {
      return 'Sewer backup limit cannot be negative';
    }
    if (value > 100000) {
      return 'Sewer backup limit over $100,000 seems excessive';
    }
  }
  return null;
}

export function validateAnalysisPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0) {
    return 'Analysis period must be greater than zero';
  }
  if (value > 30) {
    return 'Analysis period over 30 years seems excessive';
  }
  return null;
}

export function validateInflationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < -10) {
      return 'Inflation rate below -10% seems unrealistic';
    }
    if (value > 20) {
      return 'Inflation rate over 20% seems excessive';
    }
  }
  return null;
}

export function validatePropertyAppreciationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value !== undefined) {
    if (value < -20) {
      return 'Property appreciation rate below -20% seems unrealistic';
    }
    if (value > 20) {
      return 'Property appreciation rate over 20% seems excessive';
    }
  }
  return null;
}

export function validateCurrency(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
    if (!validCurrencies.includes(value)) {
      return 'Invalid currency selected';
    }
  }
  return null;
}

export function validateDisplayFormat(value: string, allInputs?: Record<string, any>): string | null {
  if (value) {
    const validFormats = ['percentage', 'decimal', 'basis-points'];
    if (!validFormats.includes(value)) {
      return 'Invalid display format selected';
    }
  }
  return null;
}

export function validateIncludeCharts(value: boolean, allInputs?: Record<string, any>): string | null {
  return null;
}

export function validateBuildingValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Building value is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Building value must be a number' };
  if (value < 5000 || value > 10000000) return { isValid: false, message: 'Building value must be between $5,000 and $10,000,000' };
  return { isValid: true };
}

export function validateContentsValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Contents value is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Contents value must be a number' };
  if (value < 1000 || value > 5000000) return { isValid: false, message: 'Contents value must be between $1,000 and $5,000,000' };
  return { isValid: true };
}

export function validateFloodZone(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Flood zone is required' };
  const validZones = ['A', 'AE', 'AH', 'AO', 'AR', 'A99', 'V', 'VE', 'X', 'D'];
  if (!validZones.includes(value)) return { isValid: false, message: 'Invalid flood zone' };
  return { isValid: true };
}

export function validateDeductible(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Deductible is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Deductible must be a number' };
  if (value < 1000 || value > 100000) return { isValid: false, message: 'Deductible must be between $1,000 and $100,000' };
  return { isValid: true };
}

export function validatePolicyType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Policy type is required' };
  const validTypes = ['nfip', 'private', 'excess'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid policy type' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property type is required' };
  const validTypes = ['single-family', 'multi-family', 'condo', 'commercial', 'manufactured'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid property type' };
  return { isValid: true };
}

export function validateOccupancyType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Occupancy type is required' };
  const validTypes = ['primary', 'secondary', 'rental', 'business'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid occupancy type' };
  return { isValid: true };
}

export function validateBuildingElevation(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Building elevation must be a number' };
  if (value && (value < -50 || value > 100)) return { isValid: false, message: 'Building elevation must be between -50 and 100 feet' };
  return { isValid: true };
}

export function validateBaseFloodElevation(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Base flood elevation must be a number' };
  if (value && (value < -50 || value > 100)) return { isValid: false, message: 'Base flood elevation must be between -50 and 100 feet' };
  return { isValid: true };
}

export function validateContentsDeductible(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Contents deductible must be a number' };
  if (value && (value < 500 || value > 50000)) return { isValid: false, message: 'Contents deductible must be between $500 and $50,000' };
  return { isValid: true };
}

export function validateAdditionalLivingExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Additional living expenses must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Additional living expenses must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateBusinessInterruption(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Business interruption must be a number' };
  if (value && (value < 0 || value > 500000)) return { isValid: false, message: 'Business interruption must be between $0 and $500,000' };
  return { isValid: true };
}

export function validateOrdinanceLaw(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Ordinance and law coverage must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Ordinance and law coverage must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateUmbrellaLiability(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Umbrella liability must be a number' };
  if (value && (value < 0 || value > 10000000)) return { isValid: false, message: 'Umbrella liability must be between $0 and $10,000,000' };
  return { isValid: true };
}

export function validateElevationCertStatus(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validStatuses = ['yes', 'no', 'pending'];
    if (!validStatuses.includes(value)) return { isValid: false, message: 'Invalid elevation certificate status' };
  }
  return { isValid: true };
}

export function validateMitigationMeasures(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validMeasures = ['elevation', 'floodwalls', 'dry-floodproofing', 'wet-floodproofing', 'none'];
    if (!validMeasures.includes(value)) return { isValid: false, message: 'Invalid mitigation measures' };
  }
  return { isValid: true };
}

export function validateCommunityRating(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validRatings = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'none'];
    if (!validRatings.includes(value)) return { isValid: false, message: 'Invalid community rating' };
  }
  return { isValid: true };
}

export function validateRiskScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Risk score must be a number' };
  if (value && (value < 1 || value > 10)) return { isValid: false, message: 'Risk score must be between 1 and 10' };
  return { isValid: true };
}

export function validateAffordabilityScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Affordability score must be a number' };
  if (value && (value < 1 || value > 10)) return { isValid: false, message: 'Affordability score must be between 1 and 10' };
  return { isValid: true };
}

export function validateAllFloodInsuranceInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate property value
  if (inputs.propertyValue !== undefined) {
    const result = validatePropertyValue(inputs.propertyValue);
    if (result) errors.push(result);
  }

  // Validate building value
  if (inputs.buildingValue !== undefined) {
    const result = validateBuildingValue(inputs.buildingValue);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate contents value
  if (inputs.contentsValue !== undefined) {
    const result = validateContentsValue(inputs.contentsValue);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate flood zone
  if (inputs.floodZone !== undefined) {
    const result = validateFloodZone(inputs.floodZone);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate deductible
  if (inputs.deductible !== undefined) {
    const result = validateDeductible(inputs.deductible);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate policy type
  if (inputs.policyType !== undefined) {
    const result = validatePolicyType(inputs.policyType);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate property type
  if (inputs.propertyType !== undefined) {
    const result = validatePropertyType(inputs.propertyType);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate occupancy type
  if (inputs.occupancyType !== undefined) {
    const result = validateOccupancyType(inputs.occupancyType);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate building elevation
  if (inputs.buildingElevation !== undefined) {
    const result = validateBuildingElevation(inputs.buildingElevation);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate base flood elevation
  if (inputs.baseFloodElevation !== undefined) {
    const result = validateBaseFloodElevation(inputs.baseFloodElevation);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate contents deductible
  if (inputs.contentsDeductible !== undefined) {
    const result = validateContentsDeductible(inputs.contentsDeductible);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate additional living expenses
  if (inputs.additionalLivingExpenses !== undefined) {
    const result = validateAdditionalLivingExpenses(inputs.additionalLivingExpenses);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate business interruption
  if (inputs.businessInterruption !== undefined) {
    const result = validateBusinessInterruption(inputs.businessInterruption);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate ordinance law
  if (inputs.ordinanceLaw !== undefined) {
    const result = validateOrdinanceLaw(inputs.ordinanceLaw);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate umbrella liability
  if (inputs.umbrellaLiability !== undefined) {
    const result = validateUmbrellaLiability(inputs.umbrellaLiability);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate elevation cert status
  if (inputs.elevationCertStatus !== undefined) {
    const result = validateElevationCertStatus(inputs.elevationCertStatus);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate mitigation measures
  if (inputs.mitigationMeasures !== undefined) {
    const result = validateMitigationMeasures(inputs.mitigationMeasures);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate community rating
  if (inputs.communityRating !== undefined) {
    const result = validateCommunityRating(inputs.communityRating);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate risk score
  if (inputs.riskScore !== undefined) {
    const result = validateRiskScore(inputs.riskScore);
    if (!result.isValid && result.message) errors.push(result.message);
  }

  // Validate affordability score
  if (inputs.affordabilityScore !== undefined) {
    const result = validateAffordabilityScore(inputs.affordabilityScore);
    if (!result.isValid && result.message) errors.push(result.message);
  }

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

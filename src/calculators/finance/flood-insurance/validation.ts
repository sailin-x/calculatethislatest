import { FloodInsuranceInputs } from './types';

export function validateFloodInsuranceInputs(inputs: FloodInsuranceInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Property Information Validation
  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }
  if (inputs.propertyAddress && inputs.propertyAddress.length > 200) {
    errors.push('Property address must be 200 characters or less');
  }

  if (inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than zero');
  }
  if (inputs.propertyValue > 10000000) {
    errors.push('Property value over $10 million seems excessive');
  }

  if (inputs.propertySize <= 0) {
    errors.push('Property size must be greater than zero');
  }
  if (inputs.propertySize > 100000) {
    errors.push('Property size over 100,000 sq ft seems unrealistic');
  }

  if (inputs.yearBuilt < 1800 || inputs.yearBuilt > 2030) {
    errors.push('Year built must be between 1800 and 2030');
  }

  if (inputs.numberOfStories <= 0) {
    errors.push('Number of stories must be greater than zero');
  }
  if (inputs.numberOfStories > 50) {
    errors.push('Number of stories over 50 seems unrealistic');
  }

  // Coverage Information Validation
  if (inputs.buildingCoverage <= 0) {
    errors.push('Building coverage must be greater than zero');
  }
  if (inputs.buildingCoverage > 10000000) {
    errors.push('Building coverage over $10 million seems excessive');
  }

  if (inputs.contentsCoverage < 0) {
    errors.push('Contents coverage cannot be negative');
  }
  if (inputs.contentsCoverage > 5000000) {
    errors.push('Contents coverage over $5 million seems excessive');
  }

  if (inputs.replacementCostValue !== undefined && inputs.replacementCostValue <= 0) {
    errors.push('Replacement cost value must be greater than zero');
  }
  if (inputs.replacementCostValue !== undefined && inputs.replacementCostValue > 10000000) {
    errors.push('Replacement cost value over $10 million seems excessive');
  }

  // Deductible Information Validation
  if (inputs.buildingDeductible < 500) {
    errors.push('Building deductible must be at least $500');
  }
  if (inputs.buildingDeductible > 100000) {
    errors.push('Building deductible over $100,000 seems excessive');
  }

  if (inputs.contentsDeductible < 500) {
    errors.push('Contents deductible must be at least $500');
  }
  if (inputs.contentsDeductible > 100000) {
    errors.push('Contents deductible over $100,000 seems excessive');
  }

  // Policy Information Validation
  if (inputs.policyTerm <= 0) {
    errors.push('Policy term must be greater than zero');
  }
  if (inputs.policyTerm > 60) {
    errors.push('Policy term over 60 months seems excessive');
  }

  if (!inputs.policyStartDate) {
    errors.push('Policy start date is required');
  }

  if (!inputs.policyEndDate) {
    errors.push('Policy end date is required');
  }

  // Risk Factors Validation
  if (inputs.numberOfPreviousClaims !== undefined && inputs.numberOfPreviousClaims < 0) {
    errors.push('Number of previous claims cannot be negative');
  }
  if (inputs.numberOfPreviousClaims !== undefined && inputs.numberOfPreviousClaims > 50) {
    errors.push('Number of previous claims over 50 seems excessive');
  }

  if (inputs.yearsSinceLastClaim !== undefined && inputs.yearsSinceLastClaim < 0) {
    errors.push('Years since last claim cannot be negative');
  }
  if (inputs.yearsSinceLastClaim !== undefined && inputs.yearsSinceLastClaim > 100) {
    errors.push('Years since last claim over 100 seems unrealistic');
  }

  if (inputs.floodRiskScore !== undefined && (inputs.floodRiskScore < 1 || inputs.floodRiskScore > 10)) {
    errors.push('Flood risk score must be between 1 and 10');
  }

  // Building Characteristics Validation
  if (inputs.roofAge !== undefined && inputs.roofAge < 0) {
    errors.push('Roof age cannot be negative');
  }
  if (inputs.roofAge !== undefined && inputs.roofAge > 100) {
    errors.push('Roof age over 100 years seems unrealistic');
  }

  if (inputs.foundationHeight !== undefined && inputs.foundationHeight < 0) {
    errors.push('Foundation height cannot be negative');
  }
  if (inputs.foundationHeight !== undefined && inputs.foundationHeight > 50) {
    errors.push('Foundation height over 50 feet seems unrealistic');
  }

  if (inputs.numberOfFloodVents !== undefined && inputs.numberOfFloodVents < 0) {
    errors.push('Number of flood vents cannot be negative');
  }
  if (inputs.numberOfFloodVents !== undefined && inputs.numberOfFloodVents > 100) {
    errors.push('Number of flood vents over 100 seems excessive');
  }

  // Community Information Validation
  if (inputs.communityRatingSystem !== undefined && (inputs.communityRatingSystem < 1 || inputs.communityRatingSystem > 10)) {
    errors.push('Community rating system score must be between 1 and 10');
  }

  // Additional Coverage Validation
  if (inputs.lossOfUseLimit !== undefined && inputs.lossOfUseLimit < 0) {
    errors.push('Loss of use limit cannot be negative');
  }
  if (inputs.lossOfUseLimit !== undefined && inputs.lossOfUseLimit > 100000) {
    errors.push('Loss of use limit over $100,000 seems excessive');
  }

  if (inputs.ordinanceOrLawLimit !== undefined && inputs.ordinanceOrLawLimit < 0) {
    errors.push('Ordinance or law limit cannot be negative');
  }
  if (inputs.ordinanceOrLawLimit !== undefined && inputs.ordinanceOrLawLimit > 100000) {
    errors.push('Ordinance or law limit over $100,000 seems excessive');
  }

  if (inputs.sewerBackupLimit !== undefined && inputs.sewerBackupLimit < 0) {
    errors.push('Sewer backup limit cannot be negative');
  }
  if (inputs.sewerBackupLimit !== undefined && inputs.sewerBackupLimit > 100000) {
    errors.push('Sewer backup limit over $100,000 seems excessive');
  }

  // Analysis Parameters Validation
  if (inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than zero');
  }
  if (inputs.analysisPeriod > 30) {
    errors.push('Analysis period over 30 years seems excessive');
  }

  if (inputs.inflationRate !== undefined && inputs.inflationRate < -10) {
    errors.push('Inflation rate below -10% seems unrealistic');
  }
  if (inputs.inflationRate !== undefined && inputs.inflationRate > 20) {
    errors.push('Inflation rate over 20% seems excessive');
  }

  if (inputs.propertyAppreciationRate !== undefined && inputs.propertyAppreciationRate < -20) {
    errors.push('Property appreciation rate below -20% seems unrealistic');
  }
  if (inputs.propertyAppreciationRate !== undefined && inputs.propertyAppreciationRate > 20) {
    errors.push('Property appreciation rate over 20% seems excessive');
  }

  // Business Logic Validation
  if (inputs.buildingCoverage > inputs.propertyValue) {
    errors.push('Building coverage cannot exceed property value');
  }

  if (inputs.contentsCoverage > inputs.propertyValue * 0.5) {
    errors.push('Contents coverage over 50% of property value seems excessive');
  }

  if (inputs.replacementCostValue && inputs.buildingCoverage > inputs.replacementCostValue) {
    errors.push('Building coverage cannot exceed replacement cost value');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateFloodInsuranceInput(field: string, value: any): string | null {
  switch (field) {
    case 'propertyValue':
      if (!value) return 'Property value is required';
      if (typeof value !== 'number') return 'Property value must be a number';
      if (value < 10000 || value > 10000000) return 'Property value must be between $10,000 and $10,000,000';
      return null;

    case 'buildingValue':
      if (!value) return 'Building value is required';
      if (typeof value !== 'number') return 'Building value must be a number';
      if (value < 5000 || value > 10000000) return 'Building value must be between $5,000 and $10,000,000';
      return null;

    case 'contentsValue':
      if (!value) return 'Contents value is required';
      if (typeof value !== 'number') return 'Contents value must be a number';
      if (value < 1000 || value > 5000000) return 'Contents value must be between $1,000 and $5,000,000';
      return null;

    case 'floodZone':
      if (!value) return 'Flood zone is required';
      const validZones = ['A', 'AE', 'AH', 'AO', 'AR', 'A99', 'V', 'VE', 'X', 'D'];
      if (!validZones.includes(value)) return 'Invalid flood zone';
      return null;

    case 'deductible':
      if (!value) return 'Deductible is required';
      if (typeof value !== 'number') return 'Deductible must be a number';
      if (value < 1000 || value > 100000) return 'Deductible must be between $1,000 and $100,000';
      return null;

    case 'policyType':
      if (!value) return 'Policy type is required';
      const validTypes = ['nfip', 'private', 'excess'];
      if (!validTypes.includes(value)) return 'Invalid policy type';
      return null;

    case 'propertyType':
      if (!value) return 'Property type is required';
      const validPropertyTypes = ['single-family', 'multi-family', 'condo', 'commercial', 'manufactured'];
      if (!validPropertyTypes.includes(value)) return 'Invalid property type';
      return null;

    case 'occupancyType':
      if (!value) return 'Occupancy type is required';
      const validOccupancyTypes = ['primary', 'secondary', 'rental', 'business'];
      if (!validOccupancyTypes.includes(value)) return 'Invalid occupancy type';
      return null;

    case 'buildingElevation':
      if (value && typeof value !== 'number') return 'Building elevation must be a number';
      if (value && (value < -50 || value > 100)) return 'Building elevation must be between -50 and 100 feet';
      return null;

    case 'baseFloodElevation':
      if (value && typeof value !== 'number') return 'Base flood elevation must be a number';
      if (value && (value < -50 || value > 100)) return 'Base flood elevation must be between -50 and 100 feet';
      return null;

    case 'contentsDeductible':
      if (value && typeof value !== 'number') return 'Contents deductible must be a number';
      if (value && (value < 500 || value > 50000)) return 'Contents deductible must be between $500 and $50,000';
      return null;

    case 'additionalLivingExpenses':
      if (value && typeof value !== 'number') return 'Additional living expenses must be a number';
      if (value && (value < 0 || value > 100000)) return 'Additional living expenses must be between $0 and $100,000';
      return null;

    case 'businessInterruption':
      if (value && typeof value !== 'number') return 'Business interruption must be a number';
      if (value && (value < 0 || value > 500000)) return 'Business interruption must be between $0 and $500,000';
      return null;

    case 'ordinanceLaw':
      if (value && typeof value !== 'number') return 'Ordinance and law coverage must be a number';
      if (value && (value < 0 || value > 100000)) return 'Ordinance and law coverage must be between $0 and $100,000';
      return null;

    case 'umbrellaLiability':
      if (value && typeof value !== 'number') return 'Umbrella liability must be a number';
      if (value && (value < 0 || value > 10000000)) return 'Umbrella liability must be between $0 and $10,000,000';
      return null;

    case 'elevationCertStatus':
      if (value) {
        const validStatuses = ['yes', 'no', 'pending'];
        if (!validStatuses.includes(value)) return 'Invalid elevation certificate status';
      }
      return null;

    case 'mitigationMeasures':
      if (value) {
        const validMeasures = ['elevation', 'floodwalls', 'dry-floodproofing', 'wet-floodproofing', 'none'];
        if (!validMeasures.includes(value)) return 'Invalid mitigation measures';
      }
      return null;

    case 'communityRating':
      if (value) {
        const validRatings = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'none'];
        if (!validRatings.includes(value)) return 'Invalid community rating';
      }
      return null;

    case 'riskScore':
      if (value && typeof value !== 'number') return 'Risk score must be a number';
      if (value && (value < 1 || value > 10)) return 'Risk score must be between 1 and 10';
      return null;

    case 'affordabilityScore':
      if (value && typeof value !== 'number') return 'Affordability score must be a number';
      if (value && (value < 1 || value > 10)) return 'Affordability score must be between 1 and 10';
      return null;

    default:
      return null;
  }
}

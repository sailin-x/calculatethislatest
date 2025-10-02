import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateEarthquakeInsuranceInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  const requiredFields = [
    'propertyValue', 'location', 'seismicZone', 'buildingType', 'buildingAge',
    'stories', 'squareFootage', 'foundationType', 'soilType', 'retrofitStatus',
    'coverageType', 'deductiblePercentage', 'coverageLimit', 'contentsValue',
    'businessInterruption', 'policyType', 'claimsHistory'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Validate property value
  const propertyValue = Number(inputs.propertyValue);
  if (isNaN(propertyValue) || propertyValue < 50000 || propertyValue > 10000000) {
    errors.push('Property value must be between $50,000 and $10,000,000');
  }

  // Validate location
  const validStates = [
    'CA', 'AK', 'WA', 'OR', 'NV', 'UT', 'ID', 'MT', 'WY', 'CO', 'AZ', 'NM', 'TX', 'OK', 'AR', 'MO', 'TN', 'KY', 'IL', 'IN', 'OH', 'SC', 'NC', 'VA', 'WV', 'PA', 'NY', 'VT', 'NH', 'ME', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD', 'GA', 'FL', 'AL', 'MS', 'LA', 'HI', 'other'
  ];
  if (!validStates.includes(inputs.location)) {
    errors.push('Invalid location/state selected');
  }

  // Validate seismic zone
  const validSeismicZones = ['zone-1', 'zone-2', 'zone-3', 'zone-4'];
  if (!validSeismicZones.includes(inputs.seismicZone)) {
    errors.push('Invalid seismic zone selected');
  }

  // Validate building type
  const validBuildingTypes = ['wood-frame', 'steel-frame', 'concrete', 'masonry', 'mixed', 'manufactured'];
  if (!validBuildingTypes.includes(inputs.buildingType)) {
    errors.push('Invalid building type selected');
  }

  // Validate building age
  const buildingAge = Number(inputs.buildingAge);
  if (isNaN(buildingAge) || buildingAge < 0 || buildingAge > 200) {
    errors.push('Building age must be between 0 and 200 years');
  }

  // Validate stories
  const stories = Number(inputs.stories);
  if (isNaN(stories) || stories < 1 || stories > 100) {
    errors.push('Number of stories must be between 1 and 100');
  }

  // Validate square footage
  const squareFootage = Number(inputs.squareFootage);
  if (isNaN(squareFootage) || squareFootage < 100 || squareFootage > 100000) {
    errors.push('Square footage must be between 100 and 100,000 sq ft');
  }

  // Validate foundation type
  const validFoundationTypes = ['slab', 'crawlspace', 'basement', 'pier-beam', 'post-tension'];
  if (!validFoundationTypes.includes(inputs.foundationType)) {
    errors.push('Invalid foundation type selected');
  }

  // Validate soil type
  const validSoilTypes = ['rock', 'hard-soil', 'soft-soil', 'fill'];
  if (!validSoilTypes.includes(inputs.soilType)) {
    errors.push('Invalid soil type selected');
  }

  // Validate retrofit status
  const validRetrofitStatuses = ['none', 'partial', 'complete', 'unknown'];
  if (!validRetrofitStatuses.includes(inputs.retrofitStatus)) {
    errors.push('Invalid retrofit status selected');
  }

  // Validate coverage type
  const validCoverageTypes = ['building-only', 'contents-only', 'building-contents', 'loss-of-use', 'comprehensive'];
  if (!validCoverageTypes.includes(inputs.coverageType)) {
    errors.push('Invalid coverage type selected');
  }

  // Validate deductible percentage
  const deductiblePercentage = Number(inputs.deductiblePercentage);
  if (isNaN(deductiblePercentage) || deductiblePercentage < 1 || deductiblePercentage > 25) {
    errors.push('Deductible percentage must be between 1% and 25%');
  }

  // Validate coverage limit
  const coverageLimit = Number(inputs.coverageLimit);
  if (isNaN(coverageLimit) || coverageLimit < 10000 || coverageLimit > 10000000) {
    errors.push('Coverage limit must be between $10,000 and $10,000,000');
  }

  // Validate contents value
  const contentsValue = Number(inputs.contentsValue);
  if (isNaN(contentsValue) || contentsValue < 0 || contentsValue > 1000000) {
    errors.push('Contents value must be between $0 and $1,000,000');
  }

  // Validate business interruption
  if (!['yes', 'no'].includes(inputs.businessInterruption)) {
    errors.push('Business interruption must be yes or no');
  }

  // Validate annual income if business interruption is yes
  if (inputs.businessInterruption === 'yes') {
    if (!inputs.annualIncome) {
      errors.push('Annual income is required when business interruption coverage is selected');
    } else {
      const annualIncome = Number(inputs.annualIncome);
      if (isNaN(annualIncome) || annualIncome < 0 || annualIncome > 10000000) {
        errors.push('Annual income must be between $0 and $10,000,000');
      }
    }
  }

  // Validate policy type
  const validPolicyTypes = ['standalone', 'endorsement', 'commercial'];
  if (!validPolicyTypes.includes(inputs.policyType)) {
    errors.push('Invalid policy type selected');
  }

  // Validate claims history
  const validClaimsHistory = ['none', 'one', 'multiple'];
  if (!validClaimsHistory.includes(inputs.claimsHistory)) {
    errors.push('Invalid claims history selected');
  }

  // Logical consistency checks
  if (propertyValue && coverageLimit) {
    if (coverageLimit > propertyValue * 1.5) {
      errors.push('Coverage limit should not exceed 150% of property value');
    }
    if (coverageLimit < propertyValue * 0.5) {
      errors.push('Coverage limit should be at least 50% of property value for adequate protection');
    }
  }

  if (contentsValue && coverageLimit) {
    if (contentsValue > coverageLimit * 0.5) {
      errors.push('Contents value should not exceed 50% of coverage limit');
    }
  }

  if (buildingAge && stories) {
    if (buildingAge > 100 && stories > 10) {
      errors.push('Very old high-rise buildings may require special consideration');
    }
  }

  if (seismicZone && location) {
    if (seismicZone === 'zone-4' && !['CA', 'AK', 'WA', 'OR'].includes(inputs.location)) {
      errors.push('Zone 4 seismic risk is typically only found in high-risk states');
    }
    if (seismicZone === 'zone-1' && ['CA', 'AK', 'WA', 'OR'].includes(inputs.location)) {
      errors.push('Low-risk states typically have higher seismic zones');
    }
  }

  if (buildingType && retrofitStatus) {
    if (buildingType === 'manufactured' && retrofitStatus === 'complete') {
      errors.push('Manufactured homes typically cannot be fully retrofitted');
    }
  }

  if (coverageType && contentsValue) {
    if (coverageType === 'contents-only' && contentsValue === 0) {
      errors.push('Contents-only coverage requires contents value');
    }
  }

  if (businessInterruption && policyType) {
    if (businessInterruption === 'yes' && policyType === 'endorsement') {
      errors.push('Business interruption coverage may not be available with endorsement policies');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateEarthquakeInsuranceInput(field: string, value: any): string | null {
  switch (field) {
    case 'propertyValue':
      const propertyValue = Number(value);
      if (isNaN(propertyValue)) return 'Property value must be a number';
      if (propertyValue < 50000) return 'Property value must be at least $50,000';
      if (propertyValue > 10000000) return 'Property value cannot exceed $10,000,000';
      break;

    case 'buildingAge':
      const buildingAge = Number(value);
      if (isNaN(buildingAge)) return 'Building age must be a number';
      if (buildingAge < 0) return 'Building age cannot be negative';
      if (buildingAge > 200) return 'Building age cannot exceed 200 years';
      break;

    case 'stories':
      const stories = Number(value);
      if (isNaN(stories)) return 'Number of stories must be a number';
      if (stories < 1) return 'Number of stories must be at least 1';
      if (stories > 100) return 'Number of stories cannot exceed 100';
      break;

    case 'squareFootage':
      const squareFootage = Number(value);
      if (isNaN(squareFootage)) return 'Square footage must be a number';
      if (squareFootage < 100) return 'Square footage must be at least 100 sq ft';
      if (squareFootage > 100000) return 'Square footage cannot exceed 100,000 sq ft';
      break;

    case 'deductiblePercentage':
      const deductiblePercentage = Number(value);
      if (isNaN(deductiblePercentage)) return 'Deductible percentage must be a number';
      if (deductiblePercentage < 1) return 'Deductible percentage must be at least 1%';
      if (deductiblePercentage > 25) return 'Deductible percentage cannot exceed 25%';
      break;

    case 'coverageLimit':
      const coverageLimit = Number(value);
      if (isNaN(coverageLimit)) return 'Coverage limit must be a number';
      if (coverageLimit < 10000) return 'Coverage limit must be at least $10,000';
      if (coverageLimit > 10000000) return 'Coverage limit cannot exceed $10,000,000';
      break;

    case 'contentsValue':
      const contentsValue = Number(value);
      if (isNaN(contentsValue)) return 'Contents value must be a number';
      if (contentsValue < 0) return 'Contents value cannot be negative';
      if (contentsValue > 1000000) return 'Contents value cannot exceed $1,000,000';
      break;

    case 'annualIncome':
      const annualIncome = Number(value);
      if (isNaN(annualIncome)) return 'Annual income must be a number';
      if (annualIncome < 0) return 'Annual income cannot be negative';
      if (annualIncome > 10000000) return 'Annual income cannot exceed $10,000,000';
      break;
  }

  return null;
}

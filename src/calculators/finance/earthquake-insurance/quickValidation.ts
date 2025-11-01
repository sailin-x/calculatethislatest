import { CalculatorInputs } from '../../types/calculator';

// Real-time validation functions for immediate feedback
export function validatePropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Property value must be a number' };
  if (num < 50000) return { isValid: false, message: 'Property value must be at least $50,000' };
  if (num > 10000000) return { isValid: false, message: 'Property value cannot exceed $10,000,000' };
  return { isValid: true };
}

export function validateBuildingAge(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Building age must be a number' };
  if (num < 0) return { isValid: false, message: 'Building age cannot be negative' };
  if (num > 200) return { isValid: false, message: 'Building age cannot exceed 200 years' };
  return { isValid: true };
}

export function validateStories(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Number of stories must be a number' };
  if (num < 1) return { isValid: false, message: 'Number of stories must be at least 1' };
  if (num > 100) return { isValid: false, message: 'Number of stories cannot exceed 100' };
  return { isValid: true };
}

export function validateSquareFootage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Square footage must be a number' };
  if (num < 100) return { isValid: false, message: 'Square footage must be at least 100 sq ft' };
  if (num > 100000) return { isValid: false, message: 'Square footage cannot exceed 100,000 sq ft' };
  return { isValid: true };
}

export function validateDeductiblePercentage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Deductible percentage must be a number' };
  if (num < 1) return { isValid: false, message: 'Deductible percentage must be at least 1%' };
  if (num > 25) return { isValid: false, message: 'Deductible percentage cannot exceed 25%' };
  return { isValid: true };
}

export function validateCoverageLimit(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Coverage limit must be a number' };
  if (num < 10000) return { isValid: false, message: 'Coverage limit must be at least $10,000' };
  if (num > 10000000) return { isValid: false, message: 'Coverage limit cannot exceed $10,000,000' };
  return { isValid: true };
}

export function validateContentsValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Contents value must be a number' };
  if (num < 0) return { isValid: false, message: 'Contents value cannot be negative' };
  if (num > 1000000) return { isValid: false, message: 'Contents value cannot exceed $1,000,000' };
  return { isValid: true };
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const num = Number(value);
  if (isNaN(num)) return { isValid: false, message: 'Annual income must be a number' };
  if (num < 0) return { isValid: false, message: 'Annual income cannot be negative' };
  if (num > 10000000) return { isValid: false, message: 'Annual income cannot exceed $10,000,000' };
  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validStates = [
    'CA', 'AK', 'WA', 'OR', 'NV', 'UT', 'ID', 'MT', 'WY', 'CO', 'AZ', 'NM', 'TX', 'OK', 'AR', 'MO', 'TN', 'KY', 'IL', 'IN', 'OH', 'SC', 'NC', 'VA', 'WV', 'PA', 'NY', 'VT', 'NH', 'ME', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD', 'GA', 'FL', 'AL', 'MS', 'LA', 'HI', 'other'
  ];
  if (!validStates.includes(value)) return { isValid: false, message: 'Please select a valid state' };
  return { isValid: true };
}

export function validateSeismicZone(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validZones = ['zone-1', 'zone-2', 'zone-3', 'zone-4'];
  if (!validZones.includes(value)) return { isValid: false, message: 'Please select a valid seismic zone' };
  return { isValid: true };
}

export function validateBuildingType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['wood-frame', 'steel-frame', 'concrete', 'masonry', 'mixed', 'manufactured'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Please select a valid building type' };
  return { isValid: true };
}

export function validateFoundationType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['slab', 'crawlspace', 'basement', 'pier-beam', 'post-tension'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Please select a valid foundation type' };
  return { isValid: true };
}

export function validateSoilType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['rock', 'hard-soil', 'soft-soil', 'fill'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Please select a valid soil type' };
  return { isValid: true };
}

export function validateRetrofitStatus(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validStatuses = ['none', 'partial', 'complete', 'unknown'];
  if (!validStatuses.includes(value)) return { isValid: false, message: 'Please select a valid retrofit status' };
  return { isValid: true };
}

export function validateCoverageType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['building-only', 'contents-only', 'building-contents', 'LossOfUse', 'comprehensive'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Please select a valid coverage type' };
  return { isValid: true };
}

export function validateBusinessInterruption(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!['yes', 'no'].includes(value)) return { isValid: false, message: 'Please select yes or no' };
  return { isValid: true };
}

export function validatePolicyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['standalone', 'endorsement', 'commercial'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Please select a valid policy type' };
  return { isValid: true };
}

export function validateClaimsHistory(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validHistory = ['none', 'one', 'multiple'];
  if (!validHistory.includes(value)) return { isValid: false, message: 'Please select a valid claims history' };
  return { isValid: true };
}

// Aggregated validation for all inputs
export function validateAllEarthquakeInsuranceInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate required fields
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

  // Validate individual fields if they exist
  if (inputs.propertyValue !== undefined) {
    const result = validatePropertyValue(inputs.propertyValue);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.buildingAge !== undefined) {
    const result = validateBuildingAge(inputs.buildingAge);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.stories !== undefined) {
    const result = validateStories(inputs.stories);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.squareFootage !== undefined) {
    const result = validateSquareFootage(inputs.squareFootage);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.deductiblePercentage !== undefined) {
    const result = validateDeductiblePercentage(inputs.deductiblePercentage);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.coverageLimit !== undefined) {
    const result = validateCoverageLimit(inputs.coverageLimit);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.contentsValue !== undefined) {
    const result = validateContentsValue(inputs.contentsValue);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.annualIncome !== undefined) {
    const result = validateAnnualIncome(inputs.annualIncome);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.location !== undefined) {
    const result = validateLocation(inputs.location);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.seismicZone !== undefined) {
    const result = validateSeismicZone(inputs.seismicZone);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.buildingType !== undefined) {
    const result = validateBuildingType(inputs.buildingType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.foundationType !== undefined) {
    const result = validateFoundationType(inputs.foundationType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.soilType !== undefined) {
    const result = validateSoilType(inputs.soilType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.retrofitStatus !== undefined) {
    const result = validateRetrofitStatus(inputs.retrofitStatus);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.coverageType !== undefined) {
    const result = validateCoverageType(inputs.coverageType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.businessInterruption !== undefined) {
    const result = validateBusinessInterruption(inputs.businessInterruption);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.policyType !== undefined) {
    const result = validatePolicyType(inputs.policyType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.claimsHistory !== undefined) {
    const result = validateClaimsHistory(inputs.claimsHistory);
    if (!result.isValid) errors.push(result.message!);
  }

  // Cross-field validation
  if (inputs.propertyValue && inputs.coverageLimit) {
    const propertyValue = Number(inputs.propertyValue);
    const coverageLimit = Number(inputs.coverageLimit);
    if (coverageLimit > propertyValue * 1.5) {
      errors.push('Coverage limit should not exceed 150% of property value');
    }
    if (coverageLimit < propertyValue * 0.5) {
      errors.push('Coverage limit should be at least 50% of property value');
    }
  }

  if (inputs.contentsValue && inputs.coverageLimit) {
    const contentsValue = Number(inputs.contentsValue);
    const coverageLimit = Number(inputs.coverageLimit);
    if (contentsValue > coverageLimit * 0.5) {
      errors.push('Contents value should not exceed 50% of coverage limit');
    }
  }

  if (inputs.buildingAge && inputs.stories) {
    const buildingAge = Number(inputs.buildingAge);
    const stories = Number(inputs.stories);
    if (buildingAge > 100 && stories > 10) {
      errors.push('Very old high-rise buildings may require special consideration');
    }
  }

  if (inputs.seismicZone && inputs.location) {
    if (inputs.seismicZone === 'zone-4' && !['CA', 'AK', 'WA', 'OR'].includes(inputs.location)) {
      errors.push('Zone 4 seismic risk is typically only found in high-risk states');
    }
    if (inputs.seismicZone === 'zone-1' && ['CA', 'AK', 'WA', 'OR'].includes(inputs.location)) {
      errors.push('Low-risk states typically have higher seismic zones');
    }
  }

  if (inputs.buildingType && inputs.retrofitStatus) {
    if (inputs.buildingType === 'manufactured' && inputs.retrofitStatus === 'complete') {
      errors.push('Manufactured homes typically cannot be fully retrofitted');
    }
  }

  if (inputs.coverageType && inputs.contentsValue) {
    if (inputs.coverageType === 'contents-only' && Number(inputs.contentsValue) === 0) {
      errors.push('Contents-only coverage requires contents value');
    }
  }

  if (inputs.businessInterruption && inputs.policyType) {
    if (inputs.businessInterruption === 'yes' && inputs.policyType === 'endorsement') {
      errors.push('Business interruption coverage may not be available with endorsement policies');
    }
  }

  if (inputs.businessInterruption === 'yes' && !inputs.annualIncome) {
    errors.push('Annual income is required when business interruption coverage is selected');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

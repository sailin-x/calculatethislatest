import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateInsuranceInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  const requiredFields = [
    'propertyType', 'squareFootage', 'propertyValue', 'personalPropertyValue',
    'buildingCoverage', 'lossOfUseCoverage', 'personalLiabilityCoverage',
    'medicalPaymentsCoverage', 'deductible', 'location', 'constructionType',
    'yearBuilt', 'securityFeatures', 'claimsHistory', 'creditScore',
    'occupancyType', 'hoaInsurance', 'floodZone', 'earthquakeZone'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Square footage validation
  const squareFootage = inputs.squareFootage as number;
  if (typeof squareFootage !== 'number' || isNaN(squareFootage)) {
    errors.push('Square footage must be a valid number');
  } else if (squareFootage < 300 || squareFootage > 10000) {
    errors.push('Square footage must be between 300 and 10,000 sq ft');
  }

  // Property value validation
  const propertyValue = inputs.propertyValue as number;
  if (typeof propertyValue !== 'number' || isNaN(propertyValue)) {
    errors.push('Property value must be a valid number');
  } else if (propertyValue < 50000 || propertyValue > 5000000) {
    errors.push('Property value must be between $50,000 and $5,000,000');
  }

  // Personal property value validation
  const personalPropertyValue = inputs.personalPropertyValue as number;
  if (typeof personalPropertyValue !== 'number' || isNaN(personalPropertyValue)) {
    errors.push('Personal property value must be a valid number');
  } else if (personalPropertyValue < 5000 || personalPropertyValue > 500000) {
    errors.push('Personal property value must be between $5,000 and $500,000');
  }

  // Building coverage validation
  const buildingCoverage = inputs.buildingCoverage as number;
  if (typeof buildingCoverage !== 'number' || isNaN(buildingCoverage)) {
    errors.push('Building coverage must be a valid number');
  } else if (buildingCoverage < 0 || buildingCoverage > 500000) {
    errors.push('Building coverage must be between $0 and $500,000');
  }

  // Loss of use coverage validation
  const lossOfUseCoverage = inputs.lossOfUseCoverage as number;
  if (typeof lossOfUseCoverage !== 'number' || isNaN(lossOfUseCoverage)) {
    errors.push('Loss of use coverage must be a valid number');
  } else if (lossOfUseCoverage < 0 || lossOfUseCoverage > 100000) {
    errors.push('Loss of use coverage must be between $0 and $100,000');
  }

  // Personal liability coverage validation
  const personalLiabilityCoverage = inputs.personalLiabilityCoverage as number;
  if (typeof personalLiabilityCoverage !== 'number' || isNaN(personalLiabilityCoverage)) {
    errors.push('Personal liability coverage must be a valid number');
  } else if (personalLiabilityCoverage < 100000 || personalLiabilityCoverage > 2000000) {
    errors.push('Personal liability coverage must be between $100,000 and $2,000,000');
  }

  // Medical payments coverage validation
  const medicalPaymentsCoverage = inputs.medicalPaymentsCoverage as number;
  if (typeof medicalPaymentsCoverage !== 'number' || isNaN(medicalPaymentsCoverage)) {
    errors.push('Medical payments coverage must be a valid number');
  } else if (medicalPaymentsCoverage < 1000 || medicalPaymentsCoverage > 50000) {
    errors.push('Medical payments coverage must be between $1,000 and $50,000');
  }

  // Deductible validation
  const deductible = inputs.deductible as number;
  if (typeof deductible !== 'number' || isNaN(deductible)) {
    errors.push('Deductible must be a valid number');
  } else if (deductible < 250 || deductible > 10000) {
    errors.push('Deductible must be between $250 and $10,000');
  }

  // Year built validation
  const yearBuilt = inputs.yearBuilt as number;
  if (typeof yearBuilt !== 'number' || isNaN(yearBuilt)) {
    errors.push('Year built must be a valid number');
  } else if (yearBuilt < 1900 || yearBuilt > 2024) {
    errors.push('Year built must be between 1900 and 2024');
  }

  // Property type validation
  const validPropertyTypes = ['studio', 'one-bedroom', 'two-bedroom', 'three-bedroom', 'penthouse', 'townhouse'];
  const propertyType = inputs.propertyType as string;
  if (!validPropertyTypes.includes(propertyType)) {
    errors.push('Invalid property type selected');
  }

  // Location validation
  const validLocations = ['urban', 'suburban', 'rural', 'coastal', 'mountain'];
  const location = inputs.location as string;
  if (!validLocations.includes(location)) {
    errors.push('Invalid location selected');
  }

  // Construction type validation
  const validConstructionTypes = ['frame', 'masonry', 'fire-resistive', 'non-combustible'];
  const constructionType = inputs.constructionType as string;
  if (!validConstructionTypes.includes(constructionType)) {
    errors.push('Invalid construction type selected');
  }

  // Security features validation
  const validSecurityFeatures = ['alarm-system', 'security-camera', 'doorman', 'gated-access', 'fire-sprinklers', 'none'];
  const securityFeatures = inputs.securityFeatures as string[];
  if (!Array.isArray(securityFeatures)) {
    errors.push('Security features must be an array');
  } else {
    securityFeatures.forEach(feature => {
      if (!validSecurityFeatures.includes(feature)) {
        errors.push('Invalid security feature selected');
      }
    });
  }

  // Claims history validation
  const validClaimsHistory = ['0', '1', '2', '3+'];
  const claimsHistory = inputs.claimsHistory as string;
  if (!validClaimsHistory.includes(claimsHistory)) {
    errors.push('Invalid claims history selected');
  }

  // Credit score validation
  const validCreditScores = ['excellent', 'good', 'fair', 'poor'];
  const creditScore = inputs.creditScore as string;
  if (!validCreditScores.includes(creditScore)) {
    errors.push('Invalid credit score selected');
  }

  // Occupancy type validation
  const validOccupancyTypes = ['owner-occupied', 'rental', 'vacation'];
  const occupancyType = inputs.occupancyType as string;
  if (!validOccupancyTypes.includes(occupancyType)) {
    errors.push('Invalid occupancy type selected');
  }

  // HOA insurance validation
  const validHoaInsurance = ['bare-walls', 'single-entity', 'all-inclusive'];
  const hoaInsurance = inputs.hoaInsurance as string;
  if (!validHoaInsurance.includes(hoaInsurance)) {
    errors.push('Invalid HOA insurance type selected');
  }

  // Flood zone validation
  const validFloodZones = ['x', 'a', 'v', 'unknown'];
  const floodZone = inputs.floodZone as string;
  if (!validFloodZones.includes(floodZone)) {
    errors.push('Invalid flood zone selected');
  }

  // Earthquake zone validation
  const validEarthquakeZones = ['low', 'moderate', 'high'];
  const earthquakeZone = inputs.earthquakeZone as string;
  if (!validEarthquakeZones.includes(earthquakeZone)) {
    errors.push('Invalid earthquake zone selected');
  }

  // Logical validation
  if (personalPropertyValue > propertyValue) {
    errors.push('Personal property value cannot exceed property value');
  }

  if (buildingCoverage > propertyValue) {
    errors.push('Building coverage cannot exceed property value');
  }

  if (lossOfUseCoverage > personalPropertyValue * 2) {
    errors.push('Loss of use coverage should not exceed twice the personal property value');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Quick validation for real-time input checking
export function quickValidateInsuranceInput(field: string, value: any): string | null {
  switch (field) {
    case 'squareFootage':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Square footage must be a valid number';
      }
      if (value < 300 || value > 10000) {
        return 'Square footage must be between 300 and 10,000 sq ft';
      }
      break;

    case 'propertyValue':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Property value must be a valid number';
      }
      if (value < 50000 || value > 5000000) {
        return 'Property value must be between $50,000 and $5,000,000';
      }
      break;

    case 'personalPropertyValue':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Personal property value must be a valid number';
      }
      if (value < 5000 || value > 500000) {
        return 'Personal property value must be between $5,000 and $500,000';
      }
      break;

    case 'buildingCoverage':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Building coverage must be a valid number';
      }
      if (value < 0 || value > 500000) {
        return 'Building coverage must be between $0 and $500,000';
      }
      break;

    case 'lossOfUseCoverage':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Loss of use coverage must be a valid number';
      }
      if (value < 0 || value > 100000) {
        return 'Loss of use coverage must be between $0 and $100,000';
      }
      break;

    case 'personalLiabilityCoverage':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Personal liability coverage must be a valid number';
      }
      if (value < 100000 || value > 2000000) {
        return 'Personal liability coverage must be between $100,000 and $2,000,000';
      }
      break;

    case 'medicalPaymentsCoverage':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Medical payments coverage must be a valid number';
      }
      if (value < 1000 || value > 50000) {
        return 'Medical payments coverage must be between $1,000 and $50,000';
      }
      break;

    case 'deductible':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Deductible must be a valid number';
      }
      if (value < 250 || value > 10000) {
        return 'Deductible must be between $250 and $10,000';
      }
      break;

    case 'yearBuilt':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Year built must be a valid number';
      }
      if (value < 1900 || value > 2024) {
        return 'Year built must be between 1900 and 2024';
      }
      break;
  }

  return null;
}

import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateHomeownersInsuranceInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.homeValue) {
    errors.push('Home value is required');
  } else if (typeof inputs.homeValue !== 'number' || inputs.homeValue <= 0) {
    errors.push('Home value must be a positive number');
  } else if (inputs.homeValue < 10000 || inputs.homeValue > 10000000) {
    errors.push('Home value must be between $10,000 and $10,000,000');
  }

  // Replacement cost validation
  if (inputs.replacementCost !== undefined) {
    if (typeof inputs.replacementCost !== 'number' || inputs.replacementCost <= 0) {
      errors.push('Replacement cost must be a positive number');
    } else if (inputs.replacementCost < 10000 || inputs.replacementCost > 15000000) {
      errors.push('Replacement cost must be between $10,000 and $15,000,000');
    }
  }

  // Property type validation
  if (inputs.propertyType && !['single-family', 'condo', 'townhouse', 'duplex', 'multi-family'].includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }

  // Construction type validation
  if (inputs.constructionType && !['frame', 'brick', 'stone', 'concrete', 'steel', 'mixed'].includes(inputs.constructionType)) {
    errors.push('Invalid construction type');
  }

  // Year built validation
  if (inputs.yearBuilt !== undefined) {
    if (typeof inputs.yearBuilt !== 'number' || inputs.yearBuilt < 1800 || inputs.yearBuilt > new Date().getFullYear()) {
      errors.push('Year built must be between 1800 and current year');
    }
  }

  // Square footage validation
  if (inputs.squareFootage !== undefined) {
    if (typeof inputs.squareFootage !== 'number' || inputs.squareFootage <= 0) {
      errors.push('Square footage must be a positive number');
    } else if (inputs.squareFootage < 100 || inputs.squareFootage > 50000) {
      errors.push('Square footage must be between 100 and 50,000');
    }
  }

  // Location validation
  if (inputs.location && !['urban', 'suburban', 'rural'].includes(inputs.location)) {
    errors.push('Invalid location type');
  }

  // State validation
  if (inputs.state && !['california', 'florida', 'texas', 'new-york', 'illinois', 'pennsylvania', 'ohio', 'georgia', 'north-carolina', 'michigan'].includes(inputs.state)) {
    errors.push('Invalid state selection');
  }

  // Zip code validation
  if (inputs.zipCode && !/^\d{5}(-\d{4})?$/.test(inputs.zipCode)) {
    errors.push('Invalid zip code format');
  }

  // Crime rate validation
  if (inputs.crimeRate && !['low', 'medium', 'high'].includes(inputs.crimeRate)) {
    errors.push('Invalid crime rate selection');
  }

  // Fire station distance validation
  if (inputs.fireStationDistance !== undefined) {
    if (typeof inputs.fireStationDistance !== 'number' || inputs.fireStationDistance < 0) {
      errors.push('Fire station distance must be a non-negative number');
    } else if (inputs.fireStationDistance > 50) {
      errors.push('Fire station distance must be 50 miles or less');
    }
  }

  // Natural disaster zone validations
  if (inputs.floodZone && !['none', 'a', 'ae', 'ah', 'ao', 'ar', 'a99', 'v', 've', 'x'].includes(inputs.floodZone)) {
    errors.push('Invalid flood zone');
  }

  if (inputs.earthquakeZone && !['none', 'low', 'moderate', 'high', 'very-high'].includes(inputs.earthquakeZone)) {
    errors.push('Invalid earthquake zone');
  }

  if (inputs.hurricaneZone && !['none', 'low', 'moderate', 'high', 'very-high'].includes(inputs.hurricaneZone)) {
    errors.push('Invalid hurricane zone');
  }

  if (inputs.tornadoZone && !['none', 'low', 'moderate', 'high', 'very-high'].includes(inputs.tornadoZone)) {
    errors.push('Invalid tornado zone');
  }

  if (inputs.wildfireZone && !['none', 'low', 'moderate', 'high', 'very-high'].includes(inputs.wildfireZone)) {
    errors.push('Invalid wildfire zone');
  }

  // Deductible validation
  if (inputs.deductible !== undefined) {
    if (typeof inputs.deductible !== 'number' || inputs.deductible <= 0) {
      errors.push('Deductible must be a positive number');
    } else if (![500, 1000, 1500, 2000, 2500, 5000].includes(inputs.deductible)) {
      errors.push('Deductible must be one of: 500, 1000, 1500, 2000, 2500, 5000');
    }
  }

  // Coverage level validation
  if (inputs.coverageLevel && !['basic', 'standard', 'premium', 'comprehensive'].includes(inputs.coverageLevel)) {
    errors.push('Invalid coverage level');
  }

  // Personal property value validation
  if (inputs.personalPropertyValue !== undefined) {
    if (typeof inputs.personalPropertyValue !== 'number' || inputs.personalPropertyValue < 0) {
      errors.push('Personal property value must be a non-negative number');
    } else if (inputs.personalPropertyValue > 1000000) {
      errors.push('Personal property value must be $1,000,000 or less');
    }
  }

  // Liability coverage validation
  if (inputs.liabilityCoverage !== undefined) {
    if (typeof inputs.liabilityCoverage !== 'number' || inputs.liabilityCoverage <= 0) {
      errors.push('Liability coverage must be a positive number');
    } else if (inputs.liabilityCoverage < 100000 || inputs.liabilityCoverage > 5000000) {
      errors.push('Liability coverage must be between $100,000 and $5,000,000');
    }
  }

  // Medical payments validation
  if (inputs.medicalPayments !== undefined) {
    if (typeof inputs.medicalPayments !== 'number' || inputs.medicalPayments <= 0) {
      errors.push('Medical payments must be a positive number');
    } else if (inputs.medicalPayments < 1000 || inputs.medicalPayments > 100000) {
      errors.push('Medical payments must be between $1,000 and $100,000');
    }
  }

  // Loss of use validation
  if (inputs.lossOfUse !== undefined) {
    if (typeof inputs.lossOfUse !== 'number' || inputs.lossOfUse <= 0) {
      errors.push('Loss of use must be a positive number');
    } else if (inputs.lossOfUse < 5000 || inputs.lossOfUse > 200000) {
      errors.push('Loss of use must be between $5,000 and $200,000');
    }
  }

  // Additional coverage validations
  if (inputs.jewelryCoverage !== undefined) {
    if (typeof inputs.jewelryCoverage !== 'number' || inputs.jewelryCoverage < 0) {
      errors.push('Jewelry coverage must be a non-negative number');
    } else if (inputs.jewelryCoverage > 100000) {
      errors.push('Jewelry coverage must be $100,000 or less');
    }
  }

  if (inputs.electronicsCoverage !== undefined) {
    if (typeof inputs.electronicsCoverage !== 'number' || inputs.electronicsCoverage < 0) {
      errors.push('Electronics coverage must be a non-negative number');
    } else if (inputs.electronicsCoverage > 50000) {
      errors.push('Electronics coverage must be $50,000 or less');
    }
  }

  if (inputs.businessEquipmentCoverage !== undefined) {
    if (typeof inputs.businessEquipmentCoverage !== 'number' || inputs.businessEquipmentCoverage < 0) {
      errors.push('Business equipment coverage must be a non-negative number');
    } else if (inputs.businessEquipmentCoverage > 100000) {
      errors.push('Business equipment coverage must be $100,000 or less');
    }
  }

  // Credit score validation
  if (inputs.creditScore !== undefined) {
    if (typeof inputs.creditScore !== 'number' || inputs.creditScore < 300 || inputs.creditScore > 850) {
      errors.push('Credit score must be between 300 and 850');
    }
  }

  // Claims history validation
  if (inputs.claimsHistory && !['none', '1-2', '3-5', '5-plus'].includes(inputs.claimsHistory)) {
    errors.push('Invalid claims history selection');
  }

  // Occupancy type validation
  if (inputs.occupancyType && !['owner-occupied', 'rental', 'vacation', 'investment'].includes(inputs.occupancyType)) {
    errors.push('Invalid occupancy type');
  }

  // Security features validation
  if (inputs.securityFeatures && !Array.isArray(inputs.securityFeatures)) {
    errors.push('Security features must be an array');
  } else if (inputs.securityFeatures) {
    const validFeatures = ['alarm-system', 'smoke-detectors', 'fire-sprinklers', 'deadbolts', 'security-cameras', 'gated-community'];
    for (const feature of inputs.securityFeatures) {
      if (!validFeatures.includes(feature)) {
        errors.push(`Invalid security feature: ${feature}`);
      }
    }
  }

  // Roof age validation
  if (inputs.roofAge !== undefined) {
    if (typeof inputs.roofAge !== 'number' || inputs.roofAge < 0) {
      errors.push('Roof age must be a non-negative number');
    } else if (inputs.roofAge > 50) {
      errors.push('Roof age must be 50 years or less');
    }
  }

  // System age validations
  if (inputs.heatingSystemAge !== undefined) {
    if (typeof inputs.heatingSystemAge !== 'number' || inputs.heatingSystemAge < 0) {
      errors.push('Heating system age must be a non-negative number');
    } else if (inputs.heatingSystemAge > 50) {
      errors.push('Heating system age must be 50 years or less');
    }
  }

  if (inputs.electricalSystemAge !== undefined) {
    if (typeof inputs.electricalSystemAge !== 'number' || inputs.electricalSystemAge < 0) {
      errors.push('Electrical system age must be a non-negative number');
    } else if (inputs.electricalSystemAge > 50) {
      errors.push('Electrical system age must be 50 years or less');
    }
  }

  if (inputs.plumbingSystemAge !== undefined) {
    if (typeof inputs.plumbingSystemAge !== 'number' || inputs.plumbingSystemAge < 0) {
      errors.push('Plumbing system age must be a non-negative number');
    } else if (inputs.plumbingSystemAge > 50) {
      errors.push('Plumbing system age must be 50 years or less');
    }
  }

  // Additional coverage validations
  if (inputs.waterBackup !== undefined) {
    if (typeof inputs.waterBackup !== 'number' || inputs.waterBackup < 0) {
      errors.push('Water backup coverage must be a non-negative number');
    } else if (inputs.waterBackup > 50000) {
      errors.push('Water backup coverage must be $50,000 or less');
    }
  }

  if (inputs.identityTheft !== undefined) {
    if (typeof inputs.identityTheft !== 'number' || inputs.identityTheft < 0) {
      errors.push('Identity theft coverage must be a non-negative number');
    } else if (inputs.identityTheft > 25000) {
      errors.push('Identity theft coverage must be $25,000 or less');
    }
  }

  // Tax rate validation
  if (inputs.taxRate !== undefined) {
    if (typeof inputs.taxRate !== 'number' || inputs.taxRate < 0 || inputs.taxRate > 100) {
      errors.push('Tax rate must be between 0 and 100');
    }
  }

  // Inflation rate validation
  if (inputs.inflationRate !== undefined) {
    if (typeof inputs.inflationRate !== 'number' || inputs.inflationRate < -50 || inputs.inflationRate > 100) {
      errors.push('Inflation rate must be between -50 and 100');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateHomeownersInsuranceInput(field: string, value: any): string | null {
  switch (field) {
    case 'homeValue':
      if (!value) return 'Home value is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 10000 || value > 10000000) return 'Must be between $10,000 and $10,000,000';
      break;

    case 'replacementCost':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 10000 || value > 15000000)) return 'Must be between $10,000 and $15,000,000';
      break;

    case 'propertyType':
      if (value && !['single-family', 'condo', 'townhouse', 'duplex', 'multi-family'].includes(value)) return 'Invalid property type';
      break;

    case 'constructionType':
      if (value && !['frame', 'brick', 'stone', 'concrete', 'steel', 'mixed'].includes(value)) return 'Invalid construction type';
      break;

    case 'yearBuilt':
      if (value !== undefined && (typeof value !== 'number' || value < 1800 || value > new Date().getFullYear())) return 'Must be between 1800 and current year';
      break;

    case 'squareFootage':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 100 || value > 50000)) return 'Must be between 100 and 50,000';
      break;

    case 'location':
      if (value && !['urban', 'suburban', 'rural'].includes(value)) return 'Invalid location type';
      break;

    case 'state':
      if (value && !['california', 'florida', 'texas', 'new-york', 'illinois', 'pennsylvania', 'ohio', 'georgia', 'north-carolina', 'michigan'].includes(value)) return 'Invalid state';
      break;

    case 'zipCode':
      if (value && !/^\d{5}(-\d{4})?$/.test(value)) return 'Invalid zip code format';
      break;

    case 'crimeRate':
      if (value && !['low', 'medium', 'high'].includes(value)) return 'Invalid crime rate';
      break;

    case 'fireStationDistance':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 50) return 'Must be 50 miles or less';
      break;

    case 'floodZone':
      if (value && !['none', 'a', 'ae', 'ah', 'ao', 'ar', 'a99', 'v', 've', 'x'].includes(value)) return 'Invalid flood zone';
      break;

    case 'earthquakeZone':
      if (value && !['none', 'low', 'moderate', 'high', 'very-high'].includes(value)) return 'Invalid earthquake zone';
      break;

    case 'hurricaneZone':
      if (value && !['none', 'low', 'moderate', 'high', 'very-high'].includes(value)) return 'Invalid hurricane zone';
      break;

    case 'tornadoZone':
      if (value && !['none', 'low', 'moderate', 'high', 'very-high'].includes(value)) return 'Invalid tornado zone';
      break;

    case 'wildfireZone':
      if (value && !['none', 'low', 'moderate', 'high', 'very-high'].includes(value)) return 'Invalid wildfire zone';
      break;

    case 'deductible':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && ![500, 1000, 1500, 2000, 2500, 5000].includes(value)) return 'Must be one of: 500, 1000, 1500, 2000, 2500, 5000';
      break;

    case 'coverageLevel':
      if (value && !['basic', 'standard', 'premium', 'comprehensive'].includes(value)) return 'Invalid coverage level';
      break;

    case 'personalPropertyValue':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 1000000) return 'Must be $1,000,000 or less';
      break;

    case 'liabilityCoverage':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 100000 || value > 5000000)) return 'Must be between $100,000 and $5,000,000';
      break;

    case 'medicalPayments':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 1000 || value > 100000)) return 'Must be between $1,000 and $100,000';
      break;

    case 'lossOfUse':
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value !== undefined && (value < 5000 || value > 200000)) return 'Must be between $5,000 and $200,000';
      break;

    case 'creditScore':
      if (value !== undefined && (typeof value !== 'number' || value < 300 || value > 850)) return 'Must be between 300 and 850';
      break;

    case 'claimsHistory':
      if (value && !['none', '1-2', '3-5', '5-plus'].includes(value)) return 'Invalid claims history';
      break;

    case 'occupancyType':
      if (value && !['owner-occupied', 'rental', 'vacation', 'investment'].includes(value)) return 'Invalid occupancy type';
      break;

    case 'roofAge':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 50) return 'Must be 50 years or less';
      break;

    case 'heatingSystemAge':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 50) return 'Must be 50 years or less';
      break;

    case 'electricalSystemAge':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 50) return 'Must be 50 years or less';
      break;

    case 'plumbingSystemAge':
      if (value !== undefined && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value !== undefined && value > 50) return 'Must be 50 years or less';
      break;

    case 'taxRate':
      if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) return 'Must be between 0 and 100';
      break;

    case 'inflationRate':
      if (value !== undefined && (typeof value !== 'number' || value < -50 || value > 100)) return 'Must be between -50 and 100';
      break;
  }

  return null;
}

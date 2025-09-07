import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateHomeInsuranceInputs(inputs: any): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.propertyValue) {
    errors.push('Property value is required');
  } else if (typeof inputs.propertyValue !== 'number' || inputs.propertyValue <= 0) {
    errors.push('Property value must be a positive number');
  } else if (inputs.propertyValue < 50000 || inputs.propertyValue > 10000000) {
    errors.push('Property value must be between $50,000 and $10,000,000');
  }

  // Property address validation
  if (!inputs.propertyAddress || typeof inputs.propertyAddress !== 'string' || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }

  // Property type validation
  if (!inputs.propertyType) {
    errors.push('Property type is required');
  } else if (!['single_family', 'condo', 'townhouse', 'multi_family', 'mobile_home'].includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }

  // Property age validation
  if (inputs.propertyAge === undefined || inputs.propertyAge === null) {
    errors.push('Property age is required');
  } else if (typeof inputs.propertyAge !== 'number' || inputs.propertyAge < 0) {
    errors.push('Property age must be a non-negative number');
  } else if (inputs.propertyAge > 100) {
    errors.push('Property age must be 100 years or less');
  }

  // Property size validation
  if (inputs.propertySize === undefined || inputs.propertySize === null) {
    errors.push('Property size is required');
  } else if (typeof inputs.propertySize !== 'number' || inputs.propertySize <= 0) {
    errors.push('Property size must be a positive number');
  } else if (inputs.propertySize < 500 || inputs.propertySize > 10000) {
    errors.push('Property size must be between 500 and 10,000 sq ft');
  }

  // Construction type validation
  if (!inputs.constructionType) {
    errors.push('Construction type is required');
  } else if (!['wood_frame', 'brick', 'stone', 'concrete', 'steel_frame', 'mixed'].includes(inputs.constructionType)) {
    errors.push('Invalid construction type');
  }

  // Roof type validation
  if (!inputs.roofType) {
    errors.push('Roof type is required');
  } else if (!['asphalt_shingle', 'metal', 'tile', 'slate', 'wood_shake', 'flat'].includes(inputs.roofType)) {
    errors.push('Invalid roof type');
  }

  // Roof age validation
  if (inputs.roofAge === undefined || inputs.roofAge === null) {
    errors.push('Roof age is required');
  } else if (typeof inputs.roofAge !== 'number' || inputs.roofAge < 0) {
    errors.push('Roof age must be a non-negative number');
  } else if (inputs.roofAge > 50) {
    errors.push('Roof age must be 50 years or less');
  }

  // Location validation
  if (!inputs.state || typeof inputs.state !== 'string' || inputs.state.trim().length === 0) {
    errors.push('State is required');
  }

  if (!inputs.city || typeof inputs.city !== 'string' || inputs.city.trim().length === 0) {
    errors.push('City is required');
  }

  // Zip code validation
  if (!inputs.zipCode || typeof inputs.zipCode !== 'string' || inputs.zipCode.trim().length === 0) {
    errors.push('ZIP code is required');
  } else if (!/^\d{5}(-\d{4})?$/.test(inputs.zipCode)) {
    errors.push('Invalid ZIP code format');
  }

  // Flood zone validation
  if (!inputs.floodZone) {
    errors.push('Flood zone is required');
  } else if (!['low_risk', 'moderate_risk', 'high_risk', 'very_high_risk', 'unknown'].includes(inputs.floodZone)) {
    errors.push('Invalid flood zone');
  }

  // Crime rate validation
  if (!inputs.crimeRate) {
    errors.push('Crime rate is required');
  } else if (!['low', 'medium', 'high', 'very_high'].includes(inputs.crimeRate)) {
    errors.push('Invalid crime rate');
  }

  // Distance validation
  if (inputs.fireStationDistance === undefined || inputs.fireStationDistance === null) {
    errors.push('Fire station distance is required');
  } else if (typeof inputs.fireStationDistance !== 'number' || inputs.fireStationDistance < 0) {
    errors.push('Fire station distance must be a non-negative number');
  } else if (inputs.fireStationDistance > 50) {
    errors.push('Fire station distance must be 50 miles or less');
  }

  if (inputs.policeStationDistance === undefined || inputs.policeStationDistance === null) {
    errors.push('Police station distance is required');
  } else if (typeof inputs.policeStationDistance !== 'number' || inputs.policeStationDistance < 0) {
    errors.push('Police station distance must be a non-negative number');
  } else if (inputs.policeStationDistance > 50) {
    errors.push('Police station distance must be 50 miles or less');
  }

  // Coverage validation
  if (inputs.dwellingCoverage === undefined || inputs.dwellingCoverage === null) {
    errors.push('Dwelling coverage is required');
  } else if (typeof inputs.dwellingCoverage !== 'number' || inputs.dwellingCoverage <= 0) {
    errors.push('Dwelling coverage must be a positive number');
  } else if (inputs.dwellingCoverage < 50000 || inputs.dwellingCoverage > 5000000) {
    errors.push('Dwelling coverage must be between $50,000 and $5,000,000');
  }

  if (inputs.personalPropertyCoverage === undefined || inputs.personalPropertyCoverage === null) {
    errors.push('Personal property coverage is required');
  } else if (typeof inputs.personalPropertyCoverage !== 'number' || inputs.personalPropertyCoverage < 0) {
    errors.push('Personal property coverage must be a non-negative number');
  } else if (inputs.personalPropertyCoverage > 1000000) {
    errors.push('Personal property coverage must be $1,000,000 or less');
  }

  if (inputs.liabilityCoverage === undefined || inputs.liabilityCoverage === null) {
    errors.push('Liability coverage is required');
  } else if (typeof inputs.liabilityCoverage !== 'number' || inputs.liabilityCoverage <= 0) {
    errors.push('Liability coverage must be a positive number');
  } else if (inputs.liabilityCoverage < 100000 || inputs.liabilityCoverage > 1000000) {
    errors.push('Liability coverage must be between $100,000 and $1,000,000');
  }

  if (inputs.medicalPaymentsCoverage === undefined || inputs.medicalPaymentsCoverage === null) {
    errors.push('Medical payments coverage is required');
  } else if (typeof inputs.medicalPaymentsCoverage !== 'number' || inputs.medicalPaymentsCoverage <= 0) {
    errors.push('Medical payments coverage must be a positive number');
  } else if (inputs.medicalPaymentsCoverage < 1000 || inputs.medicalPaymentsCoverage > 10000) {
    errors.push('Medical payments coverage must be between $1,000 and $10,000');
  }

  if (inputs.lossOfUseCoverage === undefined || inputs.lossOfUseCoverage === null) {
    errors.push('Loss of use coverage is required');
  } else if (typeof inputs.lossOfUseCoverage !== 'number' || inputs.lossOfUseCoverage <= 0) {
    errors.push('Loss of use coverage must be a positive number');
  } else if (inputs.lossOfUseCoverage < 10000 || inputs.lossOfUseCoverage > 100000) {
    errors.push('Loss of use coverage must be between $10,000 and $100,000');
  }

  if (inputs.otherStructuresCoverage === undefined || inputs.otherStructuresCoverage === null) {
    errors.push('Other structures coverage is required');
  } else if (typeof inputs.otherStructuresCoverage !== 'number' || inputs.otherStructuresCoverage < 0) {
    errors.push('Other structures coverage must be a non-negative number');
  } else if (inputs.otherStructuresCoverage > 500000) {
    errors.push('Other structures coverage must be $500,000 or less');
  }

  // Deductible validation
  if (inputs.dwellingDeductible === undefined || inputs.dwellingDeductible === null) {
    errors.push('Dwelling deductible is required');
  } else if (typeof inputs.dwellingDeductible !== 'number' || inputs.dwellingDeductible <= 0) {
    errors.push('Dwelling deductible must be a positive number');
  } else if (![250, 500, 1000, 1500, 2000, 2500, 5000, 10000].includes(inputs.dwellingDeductible)) {
    errors.push('Dwelling deductible must be one of: 250, 500, 1000, 1500, 2000, 2500, 5000, 10000');
  }

  if (inputs.personalPropertyDeductible === undefined || inputs.personalPropertyDeductible === null) {
    errors.push('Personal property deductible is required');
  } else if (typeof inputs.personalPropertyDeductible !== 'number' || inputs.personalPropertyDeductible <= 0) {
    errors.push('Personal property deductible must be a positive number');
  } else if (![250, 500, 1000, 1500, 2000, 2500, 5000].includes(inputs.personalPropertyDeductible)) {
    errors.push('Personal property deductible must be one of: 250, 500, 1000, 1500, 2000, 2500, 5000');
  }

  if (inputs.liabilityDeductible === undefined || inputs.liabilityDeductible === null) {
    errors.push('Liability deductible is required');
  } else if (typeof inputs.liabilityDeductible !== 'number' || inputs.liabilityDeductible < 0) {
    errors.push('Liability deductible must be a non-negative number');
  } else if (inputs.liabilityDeductible > 5000) {
    errors.push('Liability deductible must be $5,000 or less');
  }

  if (inputs.hurricaneDeductible === undefined || inputs.hurricaneDeductible === null) {
    errors.push('Hurricane deductible is required');
  } else if (typeof inputs.hurricaneDeductible !== 'number' || inputs.hurricaneDeductible < 0) {
    errors.push('Hurricane deductible must be a non-negative number');
  } else if (inputs.hurricaneDeductible > 50000) {
    errors.push('Hurricane deductible must be $50,000 or less');
  }

  if (inputs.windstormDeductible === undefined || inputs.windstormDeductible === null) {
    errors.push('Windstorm deductible is required');
  } else if (typeof inputs.windstormDeductible !== 'number' || inputs.windstormDeductible < 0) {
    errors.push('Windstorm deductible must be a non-negative number');
  } else if (inputs.windstormDeductible > 25000) {
    errors.push('Windstorm deductible must be $25,000 or less');
  }

  // Claims history validation
  if (inputs.claimsInLast3Years === undefined || inputs.claimsInLast3Years === null) {
    errors.push('Claims in last 3 years is required');
  } else if (typeof inputs.claimsInLast3Years !== 'number' || inputs.claimsInLast3Years < 0) {
    errors.push('Claims in last 3 years must be a non-negative number');
  } else if (inputs.claimsInLast3Years > 10) {
    errors.push('Claims in last 3 years must be 10 or less');
  }

  if (inputs.claimsInLast5Years === undefined || inputs.claimsInLast5Years === null) {
    errors.push('Claims in last 5 years is required');
  } else if (typeof inputs.claimsInLast5Years !== 'number' || inputs.claimsInLast5Years < 0) {
    errors.push('Claims in last 5 years must be a non-negative number');
  } else if (inputs.claimsInLast5Years > 15) {
    errors.push('Claims in last 5 years must be 15 or less');
  }

  if (inputs.claimsInLast10Years === undefined || inputs.claimsInLast10Years === null) {
    errors.push('Claims in last 10 years is required');
  } else if (typeof inputs.claimsInLast10Years !== 'number' || inputs.claimsInLast10Years < 0) {
    errors.push('Claims in last 10 years must be a non-negative number');
  } else if (inputs.claimsInLast10Years > 25) {
    errors.push('Claims in last 10 years must be 25 or less');
  }

  if (inputs.totalClaimAmount === undefined || inputs.totalClaimAmount === null) {
    errors.push('Total claim amount is required');
  } else if (typeof inputs.totalClaimAmount !== 'number' || inputs.totalClaimAmount < 0) {
    errors.push('Total claim amount must be a non-negative number');
  } else if (inputs.totalClaimAmount > 1000000) {
    errors.push('Total claim amount must be $1,000,000 or less');
  }

  // Policy information validation
  if (!inputs.insuranceCompany || typeof inputs.insuranceCompany !== 'string' || inputs.insuranceCompany.trim().length === 0) {
    errors.push('Insurance company is required');
  }

  if (!inputs.policyType) {
    errors.push('Policy type is required');
  } else if (!['standard', 'premium', 'basic', 'custom'].includes(inputs.policyType)) {
    errors.push('Invalid policy type');
  }

  if (inputs.policyTerm === undefined || inputs.policyTerm === null) {
    errors.push('Policy term is required');
  } else if (typeof inputs.policyTerm !== 'number' || inputs.policyTerm < 6) {
    errors.push('Policy term must be at least 6 months');
  } else if (inputs.policyTerm > 36) {
    errors.push('Policy term must be 36 months or less');
  }

  // Analysis parameters validation
  if (inputs.analysisPeriod === undefined || inputs.analysisPeriod === null) {
    errors.push('Analysis period is required');
  } else if (typeof inputs.analysisPeriod !== 'number' || inputs.analysisPeriod < 1) {
    errors.push('Analysis period must be at least 1 year');
  } else if (inputs.analysisPeriod > 10) {
    errors.push('Analysis period must be 10 years or less');
  }

  if (inputs.inflationRate === undefined || inputs.inflationRate === null) {
    errors.push('Inflation rate is required');
  } else if (typeof inputs.inflationRate !== 'number' || inputs.inflationRate < -5) {
    errors.push('Inflation rate must be -5% or higher');
  } else if (inputs.inflationRate > 15) {
    errors.push('Inflation rate must be 15% or less');
  }

  if (inputs.propertyAppreciationRate === undefined || inputs.propertyAppreciationRate === null) {
    errors.push('Property appreciation rate is required');
  } else if (typeof inputs.propertyAppreciationRate !== 'number' || inputs.propertyAppreciationRate < -10) {
    errors.push('Property appreciation rate must be -10% or higher');
  } else if (inputs.propertyAppreciationRate > 20) {
    errors.push('Property appreciation rate must be 20% or less');
  }

  if (inputs.rentalUnits === undefined || inputs.rentalUnits === null) {
    errors.push('Rental units is required');
  } else if (typeof inputs.rentalUnits !== 'number' || inputs.rentalUnits < 0) {
    errors.push('Rental units must be a non-negative number');
  } else if (inputs.rentalUnits > 10) {
    errors.push('Rental units must be 10 or less');
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

export function quickValidateHomeInsuranceInput(field: string, value: any): string | null {
  switch (field) {
    case 'propertyValue':
      if (!value) return 'Property value is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 50000 || value > 10000000) return 'Must be between $50,000 and $10,000,000';
      break;

    case 'propertyAddress':
      if (!value || typeof value !== 'string' || value.trim().length === 0) return 'Property address is required';
      break;

    case 'propertyType':
      if (!value) return 'Property type is required';
      if (!['single_family', 'condo', 'townhouse', 'multi_family', 'mobile_home'].includes(value)) return 'Invalid property type';
      break;

    case 'propertyAge':
      if (value === undefined || value === null) return 'Property age is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 100) return 'Must be 100 years or less';
      break;

    case 'propertySize':
      if (value === undefined || value === null) return 'Property size is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 500 || value > 10000) return 'Must be between 500 and 10,000 sq ft';
      break;

    case 'constructionType':
      if (!value) return 'Construction type is required';
      if (!['wood_frame', 'brick', 'stone', 'concrete', 'steel_frame', 'mixed'].includes(value)) return 'Invalid construction type';
      break;

    case 'roofType':
      if (!value) return 'Roof type is required';
      if (!['asphalt_shingle', 'metal', 'tile', 'slate', 'wood_shake', 'flat'].includes(value)) return 'Invalid roof type';
      break;

    case 'roofAge':
      if (value === undefined || value === null) return 'Roof age is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 50) return 'Must be 50 years or less';
      break;

    case 'state':
      if (!value || typeof value !== 'string' || value.trim().length === 0) return 'State is required';
      break;

    case 'city':
      if (!value || typeof value !== 'string' || value.trim().length === 0) return 'City is required';
      break;

    case 'zipCode':
      if (!value || typeof value !== 'string' || value.trim().length === 0) return 'ZIP code is required';
      if (!/^\d{5}(-\d{4})?$/.test(value)) return 'Invalid ZIP code format';
      break;

    case 'floodZone':
      if (!value) return 'Flood zone is required';
      if (!['low_risk', 'moderate_risk', 'high_risk', 'very_high_risk', 'unknown'].includes(value)) return 'Invalid flood zone';
      break;

    case 'crimeRate':
      if (!value) return 'Crime rate is required';
      if (!['low', 'medium', 'high', 'very_high'].includes(value)) return 'Invalid crime rate';
      break;

    case 'fireStationDistance':
      if (value === undefined || value === null) return 'Fire station distance is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 50) return 'Must be 50 miles or less';
      break;

    case 'policeStationDistance':
      if (value === undefined || value === null) return 'Police station distance is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 50) return 'Must be 50 miles or less';
      break;

    case 'dwellingCoverage':
      if (value === undefined || value === null) return 'Dwelling coverage is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 50000 || value > 5000000) return 'Must be between $50,000 and $5,000,000';
      break;

    case 'personalPropertyCoverage':
      if (value === undefined || value === null) return 'Personal property coverage is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 1000000) return 'Must be $1,000,000 or less';
      break;

    case 'liabilityCoverage':
      if (value === undefined || value === null) return 'Liability coverage is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 100000 || value > 1000000) return 'Must be between $100,000 and $1,000,000';
      break;

    case 'medicalPaymentsCoverage':
      if (value === undefined || value === null) return 'Medical payments coverage is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 1000 || value > 10000) return 'Must be between $1,000 and $10,000';
      break;

    case 'lossOfUseCoverage':
      if (value === undefined || value === null) return 'Loss of use coverage is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 10000 || value > 100000) return 'Must be between $10,000 and $100,000';
      break;

    case 'otherStructuresCoverage':
      if (value === undefined || value === null) return 'Other structures coverage is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 500000) return 'Must be $500,000 or less';
      break;

    case 'dwellingDeductible':
      if (value === undefined || value === null) return 'Dwelling deductible is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (![250, 500, 1000, 1500, 2000, 2500, 5000, 10000].includes(value)) return 'Must be one of: 250, 500, 1000, 1500, 2000, 2500, 5000, 10000';
      break;

    case 'personalPropertyDeductible':
      if (value === undefined || value === null) return 'Personal property deductible is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (![250, 500, 1000, 1500, 2000, 2500, 5000].includes(value)) return 'Must be one of: 250, 500, 1000, 1500, 2000, 2500, 5000';
      break;

    case 'liabilityDeductible':
      if (value === undefined || value === null) return 'Liability deductible is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 5000) return 'Must be $5,000 or less';
      break;

    case 'hurricaneDeductible':
      if (value === undefined || value === null) return 'Hurricane deductible is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 50000) return 'Must be $50,000 or less';
      break;

    case 'windstormDeductible':
      if (value === undefined || value === null) return 'Windstorm deductible is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 25000) return 'Must be $25,000 or less';
      break;

    case 'claimsInLast3Years':
      if (value === undefined || value === null) return 'Claims in last 3 years is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 10) return 'Must be 10 or less';
      break;

    case 'claimsInLast5Years':
      if (value === undefined || value === null) return 'Claims in last 5 years is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 15) return 'Must be 15 or less';
      break;

    case 'claimsInLast10Years':
      if (value === undefined || value === null) return 'Claims in last 10 years is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 25) return 'Must be 25 or less';
      break;

    case 'totalClaimAmount':
      if (value === undefined || value === null) return 'Total claim amount is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 1000000) return 'Must be $1,000,000 or less';
      break;

    case 'insuranceCompany':
      if (!value || typeof value !== 'string' || value.trim().length === 0) return 'Insurance company is required';
      break;

    case 'policyType':
      if (!value) return 'Policy type is required';
      if (!['standard', 'premium', 'basic', 'custom'].includes(value)) return 'Invalid policy type';
      break;

    case 'policyTerm':
      if (value === undefined || value === null) return 'Policy term is required';
      if (typeof value !== 'number' || value < 6) return 'Must be at least 6 months';
      if (value > 36) return 'Must be 36 months or less';
      break;

    case 'analysisPeriod':
      if (value === undefined || value === null) return 'Analysis period is required';
      if (typeof value !== 'number' || value < 1) return 'Must be at least 1 year';
      if (value > 10) return 'Must be 10 years or less';
      break;

    case 'inflationRate':
      if (value === undefined || value === null) return 'Inflation rate is required';
      if (typeof value !== 'number' || value < -5) return 'Must be -5% or higher';
      if (value > 15) return 'Must be 15% or less';
      break;

    case 'propertyAppreciationRate':
      if (value === undefined || value === null) return 'Property appreciation rate is required';
      if (typeof value !== 'number' || value < -10) return 'Must be -10% or higher';
      if (value > 20) return 'Must be 20% or less';
      break;

    case 'rentalUnits':
      if (value === undefined || value === null) return 'Rental units is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 10) return 'Must be 10 or less';
      break;
  }

  return null;
}

import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateLandlordInsuranceInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.propertyValue) {
    errors.push('Property value is required');
  } else if (typeof inputs.propertyValue !== 'number' || inputs.propertyValue <= 0) {
    errors.push('Property value must be a positive number');
  } else if (inputs.propertyValue < 50000 || inputs.propertyValue > 10000000) {
    errors.push('Property value must be between $50,000 and $10,000,000');
  }

  // Replacement cost validation
  if (inputs.replacementCost) {
    if (typeof inputs.replacementCost !== 'number' || inputs.replacementCost <= 0) {
      errors.push('Replacement cost must be a positive number');
    } else if (inputs.replacementCost < 50000 || inputs.replacementCost > 15000000) {
      errors.push('Replacement cost must be between $50,000 and $15,000,000');
    }
  }

  // Annual rent validation
  if (inputs.annualRent) {
    if (typeof inputs.annualRent !== 'number' || inputs.annualRent < 0) {
      errors.push('Annual rent must be a non-negative number');
    } else if (inputs.annualRent > 500000) {
      errors.push('Annual rent must be $500,000 or less');
    }
  }

  // Year built validation
  if (inputs.yearBuilt) {
    if (typeof inputs.yearBuilt !== 'number' || inputs.yearBuilt <= 0) {
      errors.push('Year built must be a positive number');
    } else if (inputs.yearBuilt < 1800 || inputs.yearBuilt > 2024) {
      errors.push('Year built must be between 1800 and 2024');
    }
  }

  // Square footage validation
  if (inputs.squareFootage) {
    if (typeof inputs.squareFootage !== 'number' || inputs.squareFootage <= 0) {
      errors.push('Square footage must be a positive number');
    } else if (inputs.squareFootage < 500 || inputs.squareFootage > 50000) {
      errors.push('Square footage must be between 500 and 50,000 sqft');
    }
  }

  // Number of units validation
  if (inputs.numberOfUnits) {
    if (typeof inputs.numberOfUnits !== 'number' || inputs.numberOfUnits <= 0) {
      errors.push('Number of units must be a positive number');
    } else if (inputs.numberOfUnits < 1 || inputs.numberOfUnits > 100) {
      errors.push('Number of units must be between 1 and 100');
    }
  }

  // Liability limit validation
  if (inputs.liabilityLimit) {
    if (typeof inputs.liabilityLimit !== 'number' || inputs.liabilityLimit <= 0) {
      errors.push('Liability limit must be a positive number');
    } else if (inputs.liabilityLimit < 100000 || inputs.liabilityLimit > 5000000) {
      errors.push('Liability limit must be between $100,000 and $5,000,000');
    }
  }

  // Medical payments validation
  if (inputs.medicalPayments) {
    if (typeof inputs.medicalPayments !== 'number' || inputs.medicalPayments <= 0) {
      errors.push('Medical payments must be a positive number');
    } else if (inputs.medicalPayments < 1000 || inputs.medicalPayments > 100000) {
      errors.push('Medical payments must be between $1,000 and $100,000');
    }
  }

  // Loss of rent validation
  if (inputs.lossOfRent) {
    if (typeof inputs.lossOfRent !== 'number' || inputs.lossOfRent < 0) {
      errors.push('Loss of rent coverage must be a non-negative number');
    } else if (inputs.lossOfRent > 100000) {
      errors.push('Loss of rent coverage must be $100,000 or less');
    }
  }

  // Personal property validation
  if (inputs.personalProperty) {
    if (typeof inputs.personalProperty !== 'number' || inputs.personalProperty < 0) {
      errors.push('Personal property coverage must be a non-negative number');
    } else if (inputs.personalProperty > 100000) {
      errors.push('Personal property coverage must be $100,000 or less');
    }
  }

  // Deductible validation
  if (inputs.deductible) {
    if (typeof inputs.deductible !== 'number' || inputs.deductible <= 0) {
      errors.push('Deductible must be a positive number');
    } else if (inputs.deductible < 250 || inputs.deductible > 10000) {
      errors.push('Deductible must be between $250 and $10,000');
    }
  }

  // Occupancy rate validation
  if (inputs.occupancyRate) {
    if (typeof inputs.occupancyRate !== 'number' || inputs.occupancyRate < 0) {
      errors.push('Occupancy rate must be a non-negative number');
    } else if (inputs.occupancyRate > 100) {
      errors.push('Occupancy rate must be 100% or less');
    }
  }

  // Credit score validation
  if (inputs.creditScore) {
    if (typeof inputs.creditScore !== 'number' || inputs.creditScore <= 0) {
      errors.push('Credit score must be a positive number');
    } else if (inputs.creditScore < 300 || inputs.creditScore > 850) {
      errors.push('Credit score must be between 300 and 850');
    }
  }

  // Loyalty discount validation
  if (inputs.loyaltyDiscount) {
    if (typeof inputs.loyaltyDiscount !== 'number' || inputs.loyaltyDiscount < 0) {
      errors.push('Loyalty discount years must be a non-negative number');
    } else if (inputs.loyaltyDiscount > 50) {
      errors.push('Loyalty discount years must be 50 or less');
    }
  }

  // Enum validation
  const validPropertyTypes = ['Single Family', 'Multi-Family', 'Condo', 'Townhouse', 'Apartment Building', 'Commercial'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Property type must be one of: ' + validPropertyTypes.join(', '));
  }

  const validConstructionTypes = ['Frame', 'Brick', 'Masonry', 'Steel', 'Concrete', 'Mixed'];
  if (inputs.constructionType && !validConstructionTypes.includes(inputs.constructionType)) {
    errors.push('Construction type must be one of: ' + validConstructionTypes.join(', '));
  }

  const validLocations = ['Urban', 'Suburban', 'Rural', 'Coastal', 'Mountain', 'Desert'];
  if (inputs.location && !validLocations.includes(inputs.location)) {
    errors.push('Location must be one of: ' + validLocations.join(', '));
  }

  const validStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  if (inputs.state && !validStates.includes(inputs.state)) {
    errors.push('State must be one of: ' + validStates.join(', '));
  }

  const validRiskZones = ['Low', 'Medium', 'High', 'Very High'];
  if (inputs.riskZone && !validRiskZones.includes(inputs.riskZone)) {
    errors.push('Risk zone must be one of: ' + validRiskZones.join(', '));
  }

  const validCoverageLevels = ['Basic', 'Standard', 'Comprehensive', 'Premium'];
  if (inputs.coverageLevel && !validCoverageLevels.includes(inputs.coverageLevel)) {
    errors.push('Coverage level must be one of: ' + validCoverageLevels.join(', '));
  }

  const validTenantTypes = ['Residential', 'Student', 'Section 8', 'Corporate', 'Short-term', 'Vacant'];
  if (inputs.tenantType && !validTenantTypes.includes(inputs.tenantType)) {
    errors.push('Tenant type must be one of: ' + validTenantTypes.join(', '));
  }

  const validClaimsHistories = ['None', '1-2 Claims', '3-5 Claims', '5+ Claims'];
  if (inputs.claimsHistory && !validClaimsHistories.includes(inputs.claimsHistory)) {
    errors.push('Claims history must be one of: ' + validClaimsHistories.join(', '));
  }

  const validInsuranceScores = ['Excellent', 'Good', 'Fair', 'Poor'];
  if (inputs.insuranceScore && !validInsuranceScores.includes(inputs.insuranceScore)) {
    errors.push('Insurance score must be one of: ' + validInsuranceScores.join(', '));
  }

  const validMultiPolicyDiscounts = ['None', 'Auto', 'Umbrella', 'Life', 'Multiple'];
  if (inputs.multiPolicyDiscount && !validMultiPolicyDiscounts.includes(inputs.multiPolicyDiscount)) {
    errors.push('Multi-policy discount must be one of: ' + validMultiPolicyDiscounts.join(', '));
  }

  const validPaymentMethods = ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'];
  if (inputs.paymentMethod && !validPaymentMethods.includes(inputs.paymentMethod)) {
    errors.push('Payment method must be one of: ' + validPaymentMethods.join(', '));
  }

  const validYesNoOptions = ['Yes', 'No'];
  if (inputs.paperlessDiscount && !validYesNoOptions.includes(inputs.paperlessDiscount)) {
    errors.push('Paperless discount must be one of: ' + validYesNoOptions.join(', '));
  }

  if (inputs.autoPayDiscount && !validYesNoOptions.includes(inputs.autoPayDiscount)) {
    errors.push('Auto-pay discount must be one of: ' + validYesNoOptions.join(', '));
  }

  if (inputs.newCustomerDiscount && !validYesNoOptions.includes(inputs.newCustomerDiscount)) {
    errors.push('New customer discount must be one of: ' + validYesNoOptions.join(', '));
  }

  const validBundlingDiscounts = ['None', 'Auto', 'Umbrella', 'Life', 'Multiple'];
  if (inputs.bundlingDiscount && !validBundlingDiscounts.includes(inputs.bundlingDiscount)) {
    errors.push('Bundling discount must be one of: ' + validBundlingDiscounts.join(', '));
  }

  const validSafetyDiscounts = ['None', 'Basic', 'Advanced', 'Premium'];
  if (inputs.safetyDiscount && !validSafetyDiscounts.includes(inputs.safetyDiscount)) {
    errors.push('Safety discount must be one of: ' + validSafetyDiscounts.join(', '));
  }

  const validClaimsFreeDiscounts = ['None', '1-3 Years', '3-5 Years', '5+ Years'];
  if (inputs.claimsFreeDiscount && !validClaimsFreeDiscounts.includes(inputs.claimsFreeDiscount)) {
    errors.push('Claims-free discount must be one of: ' + validClaimsFreeDiscounts.join(', '));
  }

  // Security features validation
  const validSecurityFeatures = ['Alarm System', 'Security Cameras', 'Deadbolts', 'Fire Sprinklers', 'Smoke Detectors', 'Carbon Monoxide Detectors', 'Gated Community', 'Doorman', 'None'];
  if (Array.isArray(inputs.securityFeatures)) {
    inputs.securityFeatures.forEach(feature => {
      if (!validSecurityFeatures.includes(feature)) {
        errors.push('Security feature must be one of: ' + validSecurityFeatures.join(', '));
      }
    });
  }

  // Logical validation
  if (inputs.replacementCost && inputs.propertyValue) {
    if (inputs.replacementCost > inputs.propertyValue * 1.5) {
      errors.push('Replacement cost should not significantly exceed property value');
    }
  }

  if (inputs.lossOfRent && inputs.annualRent) {
    if (inputs.lossOfRent > inputs.annualRent) {
      errors.push('Loss of rent coverage should not exceed annual rent');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateLandlordInsuranceInput(field: string, value: any): string | null {
  switch (field) {
    case 'propertyValue':
      if (!value) return 'Property value is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 50000 || value > 10000000) return 'Must be between $50,000 and $10,000,000';
      break;

    case 'replacementCost':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 50000 || value > 15000000)) return 'Must be between $50,000 and $15,000,000';
      break;

    case 'annualRent':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 500000) return 'Must be $500,000 or less';
      break;

    case 'yearBuilt':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 1800 || value > 2024)) return 'Must be between 1800 and 2024';
      break;

    case 'squareFootage':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 500 || value > 50000)) return 'Must be between 500 and 50,000 sqft';
      break;

    case 'numberOfUnits':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 1 || value > 100)) return 'Must be between 1 and 100';
      break;

    case 'liabilityLimit':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 100000 || value > 5000000)) return 'Must be between $100,000 and $5,000,000';
      break;

    case 'medicalPayments':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 1000 || value > 100000)) return 'Must be between $1,000 and $100,000';
      break;

    case 'lossOfRent':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 100000) return 'Must be $100,000 or less';
      break;

    case 'personalProperty':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 100000) return 'Must be $100,000 or less';
      break;

    case 'deductible':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 250 || value > 10000)) return 'Must be between $250 and $10,000';
      break;

    case 'occupancyRate':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 100) return 'Must be 100% or less';
      break;

    case 'creditScore':
      if (value && (typeof value !== 'number' || value <= 0)) return 'Must be a positive number';
      if (value && (value < 300 || value > 850)) return 'Must be between 300 and 850';
      break;

    case 'loyaltyDiscount':
      if (value && (typeof value !== 'number' || value < 0)) return 'Must be a non-negative number';
      if (value && value > 50) return 'Must be 50 or less';
      break;
  }

  return null;
}

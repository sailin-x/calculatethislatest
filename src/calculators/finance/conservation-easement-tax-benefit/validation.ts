import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateTaxBenefitInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  const requiredFields = [
    'propertyType', 'propertyValue', 'easementValue', 'propertyValueAfter',
    'acres', 'easementAcres', 'easementType', 'easementHolder', 'donorType',
    'taxYear', 'adjustedGrossIncome', 'marginalTaxRate', 'stateTaxRate',
    'otherCharitableDeductions', 'appraisalCost', 'legalCost', 'surveyCost',
    'easementDuration', 'developmentRights', 'publicAccess', 'conservationPurpose'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Property value validation
  const propertyValue = inputs.propertyValue as number;
  if (typeof propertyValue !== 'number' || isNaN(propertyValue)) {
    errors.push('Property value must be a valid number');
  } else if (propertyValue < 10000 || propertyValue > 100000000) {
    errors.push('Property value must be between $10,000 and $100,000,000');
  }

  // Easement value validation
  const easementValue = inputs.easementValue as number;
  if (typeof easementValue !== 'number' || isNaN(easementValue)) {
    errors.push('Easement value must be a valid number');
  } else if (easementValue < 1000 || easementValue > 50000000) {
    errors.push('Easement value must be between $1,000 and $50,000,000');
  }

  // Property value after validation
  const propertyValueAfter = inputs.propertyValueAfter as number;
  if (typeof propertyValueAfter !== 'number' || isNaN(propertyValueAfter)) {
    errors.push('Property value after easement must be a valid number');
  } else if (propertyValueAfter < 1000 || propertyValueAfter > 100000000) {
    errors.push('Property value after easement must be between $1,000 and $100,000,000');
  }

  // Acres validation
  const acres = inputs.acres as number;
  if (typeof acres !== 'number' || isNaN(acres)) {
    errors.push('Property acres must be a valid number');
  } else if (acres < 1 || acres > 100000) {
    errors.push('Property acres must be between 1 and 100,000');
  }

  // Easement acres validation
  const easementAcres = inputs.easementAcres as number;
  if (typeof easementAcres !== 'number' || isNaN(easementAcres)) {
    errors.push('Easement acres must be a valid number');
  } else if (easementAcres < 1 || easementAcres > 100000) {
    errors.push('Easement acres must be between 1 and 100,000');
  }

  // Tax year validation
  const taxYear = inputs.taxYear as number;
  if (typeof taxYear !== 'number' || isNaN(taxYear)) {
    errors.push('Tax year must be a valid number');
  } else if (taxYear < 2015 || taxYear > 2030) {
    errors.push('Tax year must be between 2015 and 2030');
  }

  // Adjusted gross income validation
  const adjustedGrossIncome = inputs.adjustedGrossIncome as number;
  if (typeof adjustedGrossIncome !== 'number' || isNaN(adjustedGrossIncome)) {
    errors.push('Adjusted gross income must be a valid number');
  } else if (adjustedGrossIncome < 0 || adjustedGrossIncome > 10000000) {
    errors.push('Adjusted gross income must be between $0 and $10,000,000');
  }

  // Marginal tax rate validation
  const marginalTaxRate = inputs.marginalTaxRate as number;
  if (typeof marginalTaxRate !== 'number' || isNaN(marginalTaxRate)) {
    errors.push('Marginal tax rate must be a valid number');
  } else if (marginalTaxRate < 10 || marginalTaxRate > 50) {
    errors.push('Marginal tax rate must be between 10% and 50%');
  }

  // State tax rate validation
  const stateTaxRate = inputs.stateTaxRate as number;
  if (typeof stateTaxRate !== 'number' || isNaN(stateTaxRate)) {
    errors.push('State tax rate must be a valid number');
  } else if (stateTaxRate < 0 || stateTaxRate > 15) {
    errors.push('State tax rate must be between 0% and 15%');
  }

  // Other charitable deductions validation
  const otherCharitableDeductions = inputs.otherCharitableDeductions as number;
  if (typeof otherCharitableDeductions !== 'number' || isNaN(otherCharitableDeductions)) {
    errors.push('Other charitable deductions must be a valid number');
  } else if (otherCharitableDeductions < 0 || otherCharitableDeductions > 1000000) {
    errors.push('Other charitable deductions must be between $0 and $1,000,000');
  }

  // Appraisal cost validation
  const appraisalCost = inputs.appraisalCost as number;
  if (typeof appraisalCost !== 'number' || isNaN(appraisalCost)) {
    errors.push('Appraisal cost must be a valid number');
  } else if (appraisalCost < 0 || appraisalCost > 50000) {
    errors.push('Appraisal cost must be between $0 and $50,000');
  }

  // Legal cost validation
  const legalCost = inputs.legalCost as number;
  if (typeof legalCost !== 'number' || isNaN(legalCost)) {
    errors.push('Legal cost must be a valid number');
  } else if (legalCost < 0 || legalCost > 100000) {
    errors.push('Legal cost must be between $0 and $100,000');
  }

  // Survey cost validation
  const surveyCost = inputs.surveyCost as number;
  if (typeof surveyCost !== 'number' || isNaN(surveyCost)) {
    errors.push('Survey cost must be a valid number');
  } else if (surveyCost < 0 || surveyCost > 50000) {
    errors.push('Survey cost must be between $0 and $50,000');
  }

  // Easement duration validation
  const easementDuration = inputs.easementDuration as number;
  if (typeof easementDuration !== 'number' || isNaN(easementDuration)) {
    errors.push('Easement duration must be a valid number');
  } else if (easementDuration < 30 || easementDuration > 100) {
    errors.push('Easement duration must be between 30 and 100 years');
  }

  // Property type validation
  const validPropertyTypes = ['farmland', 'forest', 'wetland', 'wildlife-habitat', 'scenic-view', 'historic', 'recreational', 'open-space'];
  const propertyType = inputs.propertyType as string;
  if (!validPropertyTypes.includes(propertyType)) {
    errors.push('Invalid property type selected');
  }

  // Easement type validation
  const validEasementTypes = ['perpetual', 'term', 'partial'];
  const easementType = inputs.easementType as string;
  if (!validEasementTypes.includes(easementType)) {
    errors.push('Invalid easement type selected');
  }

  // Easement holder validation
  const validEasementHolders = ['land-trust', 'government', 'nonprofit', 'tribal'];
  const easementHolder = inputs.easementHolder as string;
  if (!validEasementHolders.includes(easementHolder)) {
    errors.push('Invalid easement holder selected');
  }

  // Donor type validation
  const validDonorTypes = ['individual', 'partnership', 'corporation', 'llc', 'trust', 'estate'];
  const donorType = inputs.donorType as string;
  if (!validDonorTypes.includes(donorType)) {
    errors.push('Invalid donor type selected');
  }

  // Development rights validation
  const validDevelopmentRights = ['residential', 'commercial', 'industrial', 'subdivision', 'mining', 'logging', 'agricultural', 'none'];
  const developmentRights = inputs.developmentRights as string[];
  if (!Array.isArray(developmentRights)) {
    errors.push('Development rights must be an array');
  } else {
    developmentRights.forEach(right => {
      if (!validDevelopmentRights.includes(right)) {
        errors.push('Invalid development right selected');
      }
    });
  }

  // Public access validation
  const validPublicAccess = ['full', 'limited', 'none'];
  const publicAccess = inputs.publicAccess as string;
  if (!validPublicAccess.includes(publicAccess)) {
    errors.push('Invalid public access level selected');
  }

  // Conservation purpose validation
  const validConservationPurposes = ['wildlife', 'agricultural', 'scenic', 'historic', 'recreational', 'open-space', 'watershed', 'forest'];
  const conservationPurpose = inputs.conservationPurpose as string[];
  if (!Array.isArray(conservationPurpose)) {
    errors.push('Conservation purpose must be an array');
  } else {
    conservationPurpose.forEach(purpose => {
      if (!validConservationPurposes.includes(purpose)) {
        errors.push('Invalid conservation purpose selected');
      }
    });
  }

  // Logical validation
  if (easementAcres > acres) {
    errors.push('Easement acres cannot exceed total property acres');
  }

  if (easementValue > propertyValue) {
    errors.push('Easement value cannot exceed property value');
  }

  if (propertyValueAfter > propertyValue) {
    errors.push('Property value after easement cannot exceed property value before easement');
  }

  if (propertyValueAfter < 0) {
    errors.push('Property value after easement cannot be negative');
  }

  // Validate easement value consistency
  const expectedReduction = propertyValue - propertyValueAfter;
  const tolerance = Math.abs(expectedReduction - easementValue) / propertyValue;
  if (tolerance > 0.1) {
    errors.push('Easement value should be approximately equal to property value reduction (within 10%)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Quick validation for real-time input checking
export function quickValidateTaxBenefitInput(field: string, value: any): string | null {
  switch (field) {
    case 'propertyValue':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Property value must be a valid number';
      }
      if (value < 10000 || value > 100000000) {
        return 'Property value must be between $10,000 and $100,000,000';
      }
      break;

    case 'easementValue':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Easement value must be a valid number';
      }
      if (value < 1000 || value > 50000000) {
        return 'Easement value must be between $1,000 and $50,000,000';
      }
      break;

    case 'propertyValueAfter':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Property value after easement must be a valid number';
      }
      if (value < 1000 || value > 100000000) {
        return 'Property value after easement must be between $1,000 and $100,000,000';
      }
      break;

    case 'acres':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Property acres must be a valid number';
      }
      if (value < 1 || value > 100000) {
        return 'Property acres must be between 1 and 100,000';
      }
      break;

    case 'easementAcres':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Easement acres must be a valid number';
      }
      if (value < 1 || value > 100000) {
        return 'Easement acres must be between 1 and 100,000';
      }
      break;

    case 'taxYear':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Tax year must be a valid number';
      }
      if (value < 2015 || value > 2030) {
        return 'Tax year must be between 2015 and 2030';
      }
      break;

    case 'adjustedGrossIncome':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Adjusted gross income must be a valid number';
      }
      if (value < 0 || value > 10000000) {
        return 'Adjusted gross income must be between $0 and $10,000,000';
      }
      break;

    case 'marginalTaxRate':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Marginal tax rate must be a valid number';
      }
      if (value < 10 || value > 50) {
        return 'Marginal tax rate must be between 10% and 50%';
      }
      break;

    case 'stateTaxRate':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'State tax rate must be a valid number';
      }
      if (value < 0 || value > 15) {
        return 'State tax rate must be between 0% and 15%';
      }
      break;

    case 'easementDuration':
      if (typeof value !== 'number' || isNaN(value)) {
        return 'Easement duration must be a valid number';
      }
      if (value < 30 || value > 100) {
        return 'Easement duration must be between 30 and 100 years';
      }
      break;
  }

  return null;
}

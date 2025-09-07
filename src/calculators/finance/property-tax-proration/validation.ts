import { PropertyTaxProrationInputs } from './types';
import { ValidationResult } from '../../../types/calculator';

export function validatePropertyTaxProrationInputs(inputs: PropertyTaxProrationInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Property value validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  } else if (inputs.propertyValue > 100000000) { // $100M
    warnings.push('Property value seems unusually high - please verify');
  }

  // Tax rate validation
  if (!inputs.annualTaxRate || inputs.annualTaxRate <= 0) {
    errors.push('Annual tax rate must be greater than 0');
  } else if (inputs.annualTaxRate > 10) { // 10%
    warnings.push('Tax rate seems unusually high - please verify');
  }

  // Tax assessment validation
  if (inputs.taxAssessment && inputs.taxAssessment <= 0) {
    errors.push('Tax assessment must be greater than 0');
  } else if (inputs.taxAssessment && inputs.taxAssessment > inputs.propertyValue) {
    warnings.push('Tax assessment is higher than property value - please verify');
  }

  // Date validations
  const closingDate = new Date(inputs.closingDate);
  const prorationDate = new Date(inputs.prorationDate);
  const taxStart = new Date(inputs.taxYearStart);
  const taxEnd = new Date(inputs.taxYearEnd);

  if (isNaN(closingDate.getTime())) {
    errors.push('Invalid closing date format');
  }

  if (isNaN(prorationDate.getTime())) {
    errors.push('Invalid proration date format');
  }

  if (isNaN(taxStart.getTime())) {
    errors.push('Invalid tax year start date format');
  }

  if (isNaN(taxEnd.getTime())) {
    errors.push('Invalid tax year end date format');
  }

  // Date logic validations
  if (closingDate >= taxEnd) {
    errors.push('Closing date must be before tax year end');
  }

  if (closingDate <= taxStart) {
    errors.push('Closing date must be after tax year start');
  }

  if (prorationDate < closingDate) {
    errors.push('Proration date cannot be before closing date');
  }

  if (taxEnd <= taxStart) {
    errors.push('Tax year end must be after tax year start');
  }

  // Prepaid taxes validation
  if (inputs.prepaidTaxes && inputs.prepaidTaxes < 0) {
    errors.push('Prepaid taxes cannot be negative');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function validateField(fieldName: string, value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};
  const warnings: string[] = [];

  switch (fieldName) {
    case 'propertyValue':
      if (!value || value <= 0) {
        errors.propertyValue = 'Property value must be greater than 0';
      } else if (value > 100000000) {
        warnings.push('Property value seems unusually high');
      }
      break;

    case 'annualTaxRate':
      if (!value || value <= 0) {
        errors.annualTaxRate = 'Annual tax rate must be greater than 0';
      } else if (value > 10) {
        warnings.push('Tax rate seems unusually high');
      }
      break;

    case 'taxAssessment':
      if (value && value <= 0) {
        errors.taxAssessment = 'Tax assessment must be greater than 0';
      } else if (value && allInputs?.propertyValue && value > allInputs.propertyValue) {
        warnings.push('Tax assessment is higher than property value');
      }
      break;

    case 'closingDate':
      if (!value) {
        errors.closingDate = 'Closing date is required';
      } else {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          errors.closingDate = 'Invalid closing date format';
        } else if (allInputs?.taxYearStart && allInputs?.taxYearEnd) {
          const taxStart = new Date(allInputs.taxYearStart);
          const taxEnd = new Date(allInputs.taxYearEnd);
          if (date >= taxEnd) {
            errors.closingDate = 'Closing date must be before tax year end';
          }
          if (date <= taxStart) {
            errors.closingDate = 'Closing date must be after tax year start';
          }
        }
      }
      break;

    case 'prorationDate':
      if (!value) {
        errors.prorationDate = 'Proration date is required';
      } else {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          errors.prorationDate = 'Invalid proration date format';
        } else if (allInputs?.closingDate) {
          const closingDate = new Date(allInputs.closingDate);
          if (date < closingDate) {
            errors.prorationDate = 'Proration date cannot be before closing date';
          }
        }
      }
      break;

    case 'taxYearStart':
    case 'taxYearEnd':
      if (!value) {
        errors[fieldName] = `${fieldName === 'taxYearStart' ? 'Tax year start' : 'Tax year end'} date is required`;
      } else {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          errors[fieldName] = `Invalid ${fieldName === 'taxYearStart' ? 'tax year start' : 'tax year end'} date format`;
        } else if (allInputs?.taxYearStart && allInputs?.taxYearEnd) {
          const start = new Date(allInputs.taxYearStart);
          const end = new Date(allInputs.taxYearEnd);
          if (end <= start) {
            errors[fieldName] = 'Tax year end must be after tax year start';
          }
        }
      }
      break;

    case 'prepaidTaxes':
      if (value && value < 0) {
        errors.prepaidTaxes = 'Prepaid taxes cannot be negative';
      }
      break;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings
  };
}
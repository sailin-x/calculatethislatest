import { ValidationRule, ValidationResult } from '../../types/calculator';
import { CompoundInterestInputs } from './types';

/**
 * Validation rules for compound interest calculator
 */
export const compoundInterestValidationRules: ValidationRule[] = [
  {
    field: 'principal',
    validator: (value: any, allInputs?: Record<string, any>): boolean => {
      const num = Number(value);
      return !isNaN(num) && num > 0 && num <= 1000000000;
    },
    message: 'Principal amount must be a positive number between $1 and $1 billion'
  },
  {
    field: 'rate',
    validator: (value: any, allInputs?: Record<string, any>): boolean => {
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    message: 'Interest rate must be between 0% and 100%'
  },
  {
    field: 'time',
    validator: (value: any, allInputs?: Record<string, any>): boolean => {
      const num = Number(value);
      return !isNaN(num) && num > 0 && num <= 100;
    },
    message: 'Time period must be between 0.1 and 100 years'
  },
  {
    field: 'compoundingFrequency',
    validator: (value: any, allInputs?: Record<string, any>): boolean => {
      const num = Number(value);
      return !isNaN(num) && num > 0 && num <= 365;
    },
    message: 'Compounding frequency must be between 1 and 365 times per year'
  },
  {
    field: 'monthlyContribution',
    validator: (value: any, allInputs?: Record<string, any>): boolean => {
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 100000;
    },
    message: 'Monthly contribution must be between $0 and $100,000'
  },
  {
    field: 'inflationRate',
    validator: (value: any, allInputs?: Record<string, any>): boolean => {
      const num = Number(value);
      return !isNaN(num) && num >= -50 && num <= 100;
    },
    message: 'Inflation rate must be between -50% and 100%'
  },
  {
    field: 'taxRate',
    validator: (value: any, allInputs?: Record<string, any>): boolean => {
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    message: 'Tax rate must be between 0% and 100%'
  },
  {
    field: 'targetAmount',
    validator: (value: any, allInputs?: Record<string, any>): boolean => {
      if (!value) return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num > 0 && num <= 1000000000;
    },
    message: 'Target amount must be a positive number between $1 and $1 billion'
  }
];

/**
 * Cross-field validation rules
 */
export const compoundInterestCrossFieldRules: ValidationRule[] = [
  {
    field: 'targetAmount',
    validator: (value: any, allInputs?: Record<string, any>): boolean => {
      if (!value || !allInputs) return true;
      const target = Number(value);
      const principal = Number(allInputs.principal);
      return target > principal;
    },
    message: 'Target amount must be greater than the principal amount'
  },
  {
    field: 'rate',
    validator: (value: any, allInputs?: Record<string, any>): boolean => {
      if (!allInputs?.includeInflation) return true;
      const rate = Number(value);
      const inflationRate = Number(allInputs.inflationRate);
      return rate > inflationRate;
    },
    message: 'Interest rate should be higher than inflation rate for positive real returns'
  }
];

/**
 * Validate compound interest calculator inputs
 */
export function validateCompoundInterestInputs(inputs: CompoundInterestInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Check required fields
  if (!inputs.principal || inputs.principal <= 0) {
    errors.principal = 'Principal amount is required and must be positive';
  }
  
  if (!inputs.rate || inputs.rate < 0) {
    errors.rate = 'Interest rate is required and must be non-negative';
  }
  
  if (!inputs.time || inputs.time <= 0) {
    errors.time = 'Time period is required and must be positive';
  }
  
  // Validate individual fields
  compoundInterestValidationRules.forEach(rule => {
    const value = inputs[rule.field as keyof CompoundInterestInputs];
    if (!rule.validator(value, inputs)) {
      errors[rule.field] = rule.message;
    }
  });
  
  // Validate cross-field rules
  compoundInterestCrossFieldRules.forEach(rule => {
    const value = inputs[rule.field as keyof CompoundInterestInputs];
    if (!rule.validator(value, inputs)) {
      errors[rule.field] = rule.message;
    }
  });
  
  // Business logic validations
  if (inputs.includeInflation && (!inputs.inflationRate || inputs.inflationRate === 0)) {
    errors.inflationRate = 'Inflation rate is required when inflation adjustment is enabled';
  }
  
  if (inputs.includeTax && (!inputs.taxRate || inputs.taxRate === 0)) {
    errors.taxRate = 'Tax rate is required when tax impact calculation is enabled';
  }
  
  // Validate realistic scenarios
  if (inputs.rate > 50) {
    errors.rate = 'Interest rates above 50% are unusual and may indicate an error';
  }
  
  if (inputs.time > 50) {
    errors.time = 'Time periods over 50 years may not be realistic for most investment scenarios';
  }
  
  if (inputs.monthlyContribution && inputs.monthlyContribution > inputs.principal * 12) {
    errors.monthlyContribution = 'Monthly contribution is unusually high compared to principal';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Get validation rules for compound interest calculator
 */
export function getCompoundInterestValidationRules(): ValidationRule[] {
  return [...compoundInterestValidationRules, ...compoundInterestCrossFieldRules];
}

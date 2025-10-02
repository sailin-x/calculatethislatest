import { ValidationResult } from '../../types/calculator';

// Age Validators
export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.currentAge = 'Current age is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.currentAge = 'Current age must be a valid number';
  } else if (value < 18) {
    errors.currentAge = 'Current age must be at least 18 years';
  } else if (value > 100) {
    errors.currentAge = 'Current age cannot exceed 100 years';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.retirementAge = 'Retirement age is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.retirementAge = 'Retirement age must be a valid number';
  } else if (value < 55) {
    errors.retirementAge = 'Retirement age must be at least 55 years';
  } else if (value > 100) {
    errors.retirementAge = 'Retirement age cannot exceed 100 years';
  } else if (allInputs?.currentAge && value <= allInputs.currentAge) {
    errors.retirementAge = 'Retirement age must be greater than current age';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Financial Validators
export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Current balance is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.currentBalance = 'Current balance must be a valid number';
  } else if (value < 0) {
    errors.currentBalance = 'Current balance cannot be negative';
  } else if (value > 10000000) {
    errors.currentBalance = 'Current balance cannot exceed $10,000,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateAnnualSalary(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.annualSalary = 'Annual salary is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.annualSalary = 'Annual salary must be a valid number';
  } else if (value < 10000) {
    errors.annualSalary = 'Annual salary must be at least $10,000';
  } else if (value > 10000000) {
    errors.annualSalary = 'Annual salary cannot exceed $10,000,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Contribution Validators
export function validateEmployeeContributionPercent(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.employeeContributionPercent = 'Employee contribution percentage is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.employeeContributionPercent = 'Employee contribution percentage must be a valid number';
  } else if (value < 0) {
    errors.employeeContributionPercent = 'Employee contribution percentage cannot be negative';
  } else if (value > 100) {
    errors.employeeContributionPercent = 'Employee contribution percentage cannot exceed 100%';
  }

  // Check if maximizing employer match
  if (allInputs?.employerMatchPercent && allInputs?.employerMatchLimit && value < allInputs.employerMatchLimit) {
    errors.employeeContributionPercent = 'Consider increasing to maximize employer match';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateEmployerMatchPercent(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Employer match is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.employerMatchPercent = 'Employer match percentage must be a valid number';
  } else if (value < 0) {
    errors.employerMatchPercent = 'Employer match percentage cannot be negative';
  } else if (value > 100) {
    errors.employerMatchPercent = 'Employer match percentage cannot exceed 100%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateEmployerMatchLimit(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Employer match limit is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.employerMatchLimit = 'Employer match limit must be a valid number';
  } else if (value < 0) {
    errors.employerMatchLimit = 'Employer match limit cannot be negative';
  } else if (value > 100) {
    errors.employerMatchLimit = 'Employer match limit cannot exceed 100%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateCatchUpContributions(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Catch-up contributions is optional
  } else if (typeof value !== 'boolean') {
    errors.catchUpContributions = 'Catch-up contributions must be true or false';
  }

  // Check if eligible for catch-up contributions
  if (allInputs?.currentAge && allInputs.currentAge >= 50 && !value) {
    errors.catchUpContributions = 'Consider catch-up contributions if age 50 or older';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Investment Validators
export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.expectedAnnualReturn = 'Expected annual return is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.expectedAnnualReturn = 'Expected annual return must be a valid number';
  } else if (value < 0) {
    errors.expectedAnnualReturn = 'Expected annual return cannot be negative';
  } else if (value > 20) {
    errors.expectedAnnualReturn = 'Expected annual return cannot exceed 20%';
  } else if (value < 3 || value > 12) {
    errors.expectedAnnualReturn = 'Historical market returns typically range from 3% to 12%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.inflationRate = 'Inflation rate is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.inflationRate = 'Inflation rate must be a valid number';
  } else if (value < 0) {
    errors.inflationRate = 'Inflation rate cannot be negative';
  } else if (value > 10) {
    errors.inflationRate = 'Inflation rate cannot exceed 10%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Tax Validators
export function validateCurrentTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.currentTaxRate = 'Current tax rate is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.currentTaxRate = 'Current tax rate must be a valid number';
  } else if (value < 0) {
    errors.currentTaxRate = 'Current tax rate cannot be negative';
  } else if (value > 50) {
    errors.currentTaxRate = 'Current tax rate cannot exceed 50%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateRetirementTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.retirementTaxRate = 'Retirement tax rate is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.retirementTaxRate = 'Retirement tax rate must be a valid number';
  } else if (value < 0) {
    errors.retirementTaxRate = 'Retirement tax rate cannot be negative';
  } else if (value > 50) {
    errors.retirementTaxRate = 'Retirement tax rate cannot exceed 50%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Advanced Options Validators
export function validateContributionIncreaseRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Contribution increase rate is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.contributionIncreaseRate = 'Contribution increase rate must be a valid number';
  } else if (value < -5) {
    errors.contributionIncreaseRate = 'Contribution increase rate cannot be less than -5%';
  } else if (value > 10) {
    errors.contributionIncreaseRate = 'Contribution increase rate cannot exceed 10%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateSalaryIncreaseRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Salary increase rate is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.salaryIncreaseRate = 'Salary increase rate must be a valid number';
  } else if (value < 0) {
    errors.salaryIncreaseRate = 'Salary increase rate cannot be negative';
  } else if (value > 10) {
    errors.salaryIncreaseRate = 'Salary increase rate cannot exceed 10%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Fees are optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.fees = 'Fees must be a valid number';
  } else if (value < 0) {
    errors.fees = 'Fees cannot be negative';
  } else if (value > 5) {
    errors.fees = 'Fees cannot exceed 5%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
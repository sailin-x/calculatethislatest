import { ValidationResult } from '../../types/calculator';

// Current Balance Validators
export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.currentBalance = 'Current balance is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.currentBalance = 'Current balance must be a valid number';
  } else if (value < 0) {
    errors.currentBalance = 'Current balance cannot be negative';
  } else if (value > 10000000) {
    errors.currentBalance = 'Current balance cannot exceed $10,000,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Annual Contribution Validators
export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.annualContribution = 'Annual contribution is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.annualContribution = 'Annual contribution must be a valid number';
  } else if (value < 0) {
    errors.annualContribution = 'Annual contribution cannot be negative';
  } else if (value > 23000) {
    errors.annualContribution = 'Annual contribution cannot exceed 2024 IRA limit of $23,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Expected Return Rate Validators
export function validateExpectedReturnRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.expectedReturnRate = 'Expected return rate is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.expectedReturnRate = 'Expected return rate must be a valid number';
  } else if (value < -10 || value > 25) {
    errors.expectedReturnRate = 'Expected return rate must be between -10% and 25%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Current Age Validators
export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.currentAge = 'Current age is required';
  } else if (typeof value !== 'number' || isNaN(value) || !Number.isInteger(value)) {
    errors.currentAge = 'Current age must be a whole number';
  } else if (value < 18) {
    errors.currentAge = 'Must be at least 18 years old to open an IRA';
  } else if (value > 70) {
    errors.currentAge = 'Age must be 70 or younger (RMD rules apply after 72)';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Retirement Age Validators
export function validateRetirementAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.retirementAge = 'Retirement age is required';
  } else if (typeof value !== 'number' || isNaN(value) || !Number.isInteger(value)) {
    errors.retirementAge = 'Retirement age must be a whole number';
  } else if (value <= (allInputs?.currentAge || 0)) {
    errors.retirementAge = 'Retirement age must be greater than current age';
  } else if (value > 100) {
    errors.retirementAge = 'Retirement age cannot exceed 100';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Years to Contribute Validators
export function validateYearsToContribute(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.yearsToContribute = 'Years to contribute is required';
  } else if (typeof value !== 'number' || isNaN(value) || !Number.isInteger(value)) {
    errors.yearsToContribute = 'Years to contribute must be a whole number';
  } else if (value < 0) {
    errors.yearsToContribute = 'Years to contribute cannot be negative';
  } else if (value > 50) {
    errors.yearsToContribute = 'Years to contribute cannot exceed 50';
  } else {
    // Check against retirement timeline
    const yearsToRetirement = (allInputs?.retirementAge || 0) - (allInputs?.currentAge || 0);
    if (value > yearsToRetirement) {
      errors.yearsToContribute = 'Cannot contribute longer than years until retirement';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// IRA Type Validators
export function validateIRAType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!value) {
    errors.iraType = 'IRA type is required';
  } else {
    const validTypes = ['traditional', 'roth', 'sep', 'simple'];
    if (!validTypes.includes(value)) {
      errors.iraType = 'Invalid IRA type selected';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Current Tax Rate Validators (for Traditional IRA)
export function validateCurrentTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (allInputs?.iraType === 'traditional') {
    if (value === undefined || value === null) {
      errors.currentTaxRate = 'Current tax rate is required for Traditional IRA';
    } else if (typeof value !== 'number' || isNaN(value)) {
      errors.currentTaxRate = 'Current tax rate must be a valid number';
    } else if (value < 0 || value > 50) {
      errors.currentTaxRate = 'Current tax rate must be between 0% and 50%';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Expected Retirement Tax Rate Validators
export function validateExpectedRetirementTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (allInputs?.iraType === 'traditional') {
    if (value === undefined || value === null) {
      errors.expectedRetirementTaxRate = 'Expected retirement tax rate is required for Traditional IRA';
    } else if (typeof value !== 'number' || isNaN(value)) {
      errors.expectedRetirementTaxRate = 'Expected retirement tax rate must be a valid number';
    } else if (value < 0 || value > 50) {
      errors.expectedRetirementTaxRate = 'Expected retirement tax rate must be between 0% and 50%';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Current Income Validators (for Roth IRA)
export function validateCurrentIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (allInputs?.iraType === 'roth') {
    if (value === undefined || value === null) {
      errors.currentIncome = 'Current income is required for Roth IRA eligibility check';
    } else if (typeof value !== 'number' || isNaN(value)) {
      errors.currentIncome = 'Current income must be a valid number';
    } else if (value < 0) {
      errors.currentIncome = 'Current income cannot be negative';
    } else if (value > 1000000) {
      errors.currentIncome = 'Please verify income amount';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Contribution Limit Validators
export function validateContributionLimit(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value !== undefined && value !== null) {
    if (typeof value !== 'number' || isNaN(value)) {
      errors.contributionLimit = 'Contribution limit must be a valid number';
    } else if (value < 0) {
      errors.contributionLimit = 'Contribution limit cannot be negative';
    } else if (value > 23000) {
      errors.contributionLimit = 'Contribution limit cannot exceed 2024 IRA limit';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Inflation Rate Validators
export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value !== undefined && value !== null) {
    if (typeof value !== 'number' || isNaN(value)) {
      errors.inflationRate = 'Inflation rate must be a valid number';
    } else if (value < 0 || value > 10) {
      errors.inflationRate = 'Inflation rate must be between 0% and 10%';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Compound Frequency Validators
export function validateCompoundFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!value) {
    errors.compoundFrequency = 'Compound frequency is required';
  } else {
    const validFrequencies = ['monthly', 'quarterly', 'annually'];
    if (!validFrequencies.includes(value)) {
      errors.compoundFrequency = 'Invalid compound frequency selected';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Include RMD Validators
export function validateIncludeRMD(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (typeof value !== 'boolean') {
    errors.includeRMD = 'Include RMD must be true or false';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
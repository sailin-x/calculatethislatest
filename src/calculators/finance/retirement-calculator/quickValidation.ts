import { ValidationResult } from '../../types/calculator';

// Age Validators
export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.currentAge = 'Current age is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.currentAge = 'Current age must be a valid number';
  } else if (value < 18) {
    errors.currentAge = 'Current age must be at least 18';
  } else if (value > 80) {
    errors.currentAge = 'Current age cannot exceed 80';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.retirementAge = 'Retirement age is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.retirementAge = 'Retirement age must be a valid number';
  } else if (value < 50) {
    errors.retirementAge = 'Retirement age must be at least 50';
  } else if (value > 80) {
    errors.retirementAge = 'Retirement age cannot exceed 80';
  } else if (allInputs?.currentAge && value <= allInputs.currentAge) {
    errors.retirementAge = 'Retirement age must be greater than current age';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.lifeExpectancy = 'Life expectancy is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.lifeExpectancy = 'Life expectancy must be a valid number';
  } else if (value < 70) {
    errors.lifeExpectancy = 'Life expectancy must be at least 70';
  } else if (value > 100) {
    errors.lifeExpectancy = 'Life expectancy cannot exceed 100';
  } else if (allInputs?.retirementAge && value <= allInputs.retirementAge) {
    errors.lifeExpectancy = 'Life expectancy must be greater than retirement age';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Financial Validators
export function validateCurrentSavings(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.currentSavings = 'Current savings is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.currentSavings = 'Current savings must be a valid number';
  } else if (value < 0) {
    errors.currentSavings = 'Current savings cannot be negative';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateMonthlySavings(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.monthlySavings = 'Monthly savings is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.monthlySavings = 'Monthly savings must be a valid number';
  } else if (value < 0) {
    errors.monthlySavings = 'Monthly savings cannot be negative';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.annualIncome = 'Annual income is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.annualIncome = 'Annual income must be a valid number';
  } else if (value <= 0) {
    errors.annualIncome = 'Annual income must be positive';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateAnnualExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.annualExpenses = 'Annual expenses is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.annualExpenses = 'Annual expenses must be a valid number';
  } else if (value <= 0) {
    errors.annualExpenses = 'Annual expenses must be positive';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Rate Validators
export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.expectedAnnualReturn = 'Expected annual return is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.expectedAnnualReturn = 'Expected annual return must be a valid number';
  } else if (value < -10) {
    errors.expectedAnnualReturn = 'Expected annual return cannot be less than -10%';
  } else if (value > 50) {
    errors.expectedAnnualReturn = 'Expected annual return cannot exceed 50%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.inflationRate = 'Inflation rate is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.inflationRate = 'Inflation rate must be a valid number';
  } else if (value < -5) {
    errors.inflationRate = 'Inflation rate cannot be less than -5%';
  } else if (value > 20) {
    errors.inflationRate = 'Inflation rate cannot exceed 20%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Risk Validators
export function validateRiskTolerance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.riskTolerance = 'Risk tolerance is required';
  } else if (!['conservative', 'moderate', 'aggressive'].includes(value)) {
    errors.riskTolerance = 'Risk tolerance must be conservative, moderate, or aggressive';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateMarketVolatility(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.marketVolatility = 'Market volatility is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.marketVolatility = 'Market volatility must be a valid number';
  } else if (value < 0) {
    errors.marketVolatility = 'Market volatility cannot be negative';
  } else if (value > 100) {
    errors.marketVolatility = 'Market volatility cannot exceed 100%';
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

// Social Security Validators
export function validateSocialSecurityBenefit(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.socialSecurityBenefit = 'Social Security benefit must be a valid number';
  } else if (value < 0) {
    errors.socialSecurityBenefit = 'Social Security benefit cannot be negative';
  } else if (value > 50000) {
    errors.socialSecurityBenefit = 'Social Security benefit cannot exceed $50,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateSocialSecurityStartAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.socialSecurityStartAge = 'Social Security start age must be a valid number';
  } else if (value < 62) {
    errors.socialSecurityStartAge = 'Social Security start age must be at least 62';
  } else if (value > 70) {
    errors.socialSecurityStartAge = 'Social Security start age cannot exceed 70';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Pension Validators
export function validatePensionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.pensionAmount = 'Pension amount must be a valid number';
  } else if (value < 0) {
    errors.pensionAmount = 'Pension amount cannot be negative';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Healthcare Validators
export function validateHealthcareCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.healthcareCosts = 'Healthcare costs must be a valid number';
  } else if (value < 0) {
    errors.healthcareCosts = 'Healthcare costs cannot be negative';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateMedicareStartAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.medicareStartAge = 'Medicare start age must be a valid number';
  } else if (value < 65) {
    errors.medicareStartAge = 'Medicare start age must be at least 65';
  } else if (value > 70) {
    errors.medicareStartAge = 'Medicare start age cannot exceed 70';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Withdrawal Validators
export function validateWithdrawalRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.withdrawalRate = 'Withdrawal rate must be a valid number';
  } else if (value < 2) {
    errors.withdrawalRate = 'Withdrawal rate must be at least 2%';
  } else if (value > 10) {
    errors.withdrawalRate = 'Withdrawal rate cannot exceed 10%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Legacy Planning Validators
export function validateLegacyAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (allInputs?.leaveLegacy) {
    if (value === undefined || value === null) {
      errors.legacyAmount = 'Legacy amount is required when leaving a legacy';
    } else if (typeof value !== 'number' || isNaN(value)) {
      errors.legacyAmount = 'Legacy amount must be a valid number';
    } else if (value <= 0) {
      errors.legacyAmount = 'Legacy amount must be positive';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

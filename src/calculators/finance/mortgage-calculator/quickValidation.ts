import { ValidationResult } from '../../../types/calculator';

// Personal Information Validators
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

// Loan Details Validators
export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.loanAmount = 'Loan amount is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.loanAmount = 'Loan amount must be a valid number';
  } else if (value < 10000) {
    errors.loanAmount = 'Loan amount must be at least $10,000';
  } else if (value > 10000000) {
    errors.loanAmount = 'Loan amount cannot exceed $10,000,000';
  } else if (allInputs?.propertyValue && value > allInputs.propertyValue - (allInputs.downPayment || 0)) {
    errors.loanAmount = 'Loan amount cannot exceed property value minus down payment';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.interestRate = 'Interest rate is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.interestRate = 'Interest rate must be a valid number';
  } else if (value < 0) {
    errors.interestRate = 'Interest rate cannot be negative';
  } else if (value > 20) {
    errors.interestRate = 'Interest rate cannot exceed 20%';
  } else if (value < 2 || value > 8) {
    errors.interestRate = 'Current market rates typically range from 2% to 8%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateLoanTermYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.loanTermYears = 'Loan term is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.loanTermYears = 'Loan term must be a valid number';
  } else if (value < 1) {
    errors.loanTermYears = 'Loan term must be at least 1 year';
  } else if (value > 50) {
    errors.loanTermYears = 'Loan term cannot exceed 50 years';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateLoanTermMonths(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.loanTermMonths = 'Additional months must be a valid number';
  } else if (value < 0) {
    errors.loanTermMonths = 'Additional months cannot be negative';
  } else if (value > 11) {
    errors.loanTermMonths = 'Additional months cannot exceed 11';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Property Information Validators
export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.propertyValue = 'Property value is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.propertyValue = 'Property value must be a valid number';
  } else if (value < 10000) {
    errors.propertyValue = 'Property value must be at least $10,000';
  } else if (value > 50000000) {
    errors.propertyValue = 'Property value cannot exceed $50,000,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Down payment is optional
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.downPayment = 'Down payment must be a valid number';
  } else if (value < 0) {
    errors.downPayment = 'Down payment cannot be negative';
  } else if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    errors.downPayment = 'Down payment cannot exceed property value';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateDownPaymentPercent(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.downPaymentPercent = 'Down payment percentage must be a valid number';
  } else if (value < 0) {
    errors.downPaymentPercent = 'Down payment percentage cannot be negative';
  } else if (value > 100) {
    errors.downPaymentPercent = 'Down payment percentage cannot exceed 100%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Additional Costs Validators
export function validateClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.closingCosts = 'Closing costs must be a valid number';
  } else if (value < 0) {
    errors.closingCosts = 'Closing costs cannot be negative';
  } else if (value > 100000) {
    errors.closingCosts = 'Closing costs cannot exceed $100,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.propertyTaxes = 'Property taxes must be a valid number';
  } else if (value < 0) {
    errors.propertyTaxes = 'Property taxes cannot be negative';
  } else if (value > 50000) {
    errors.propertyTaxes = 'Property taxes cannot exceed $50,000 annually';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateHomeownersInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.homeownersInsurance = 'Homeowners insurance must be a valid number';
  } else if (value < 0) {
    errors.homeownersInsurance = 'Homeowners insurance cannot be negative';
  } else if (value > 10000) {
    errors.homeownersInsurance = 'Homeowners insurance cannot exceed $10,000 annually';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validatePmiRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.pmiRate = 'PMI rate must be a valid number';
  } else if (value < 0) {
    errors.pmiRate = 'PMI rate cannot be negative';
  } else if (value > 5) {
    errors.pmiRate = 'PMI rate cannot exceed 5%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Payment Schedule Validators
export function validatePaymentFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.paymentFrequency = 'Payment frequency is required';
  } else if (!['monthly', 'biweekly', 'weekly'].includes(value)) {
    errors.paymentFrequency = 'Payment frequency must be monthly, biweekly, or weekly';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Extra Payments Validators
export function validateExtraPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.extraPayment = 'Extra payment must be a valid number';
  } else if (value < 0) {
    errors.extraPayment = 'Extra payment cannot be negative';
  } else if (value > 50000) {
    errors.extraPayment = 'Extra payment cannot exceed $50,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateExtraPaymentFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (!['monthly', 'yearly', 'one_time'].includes(value)) {
    errors.extraPaymentFrequency = 'Extra payment frequency must be monthly, yearly, or one_time';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Loan Type Validators
export function validateLoanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.loanType = 'Loan type is required';
  } else if (!['fixed', 'adjustable', 'interest_only', 'balloon'].includes(value)) {
    errors.loanType = 'Loan type must be fixed, adjustable, interest_only, or balloon';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Adjustable Rate Details Validators
export function validateAdjustmentPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (allInputs?.loanType === 'adjustable') {
    if (value === undefined || value === null) {
      errors.adjustmentPeriod = 'Adjustment period is required for adjustable rate mortgages';
    } else if (typeof value !== 'number' || isNaN(value)) {
      errors.adjustmentPeriod = 'Adjustment period must be a valid number';
    } else if (value < 1) {
      errors.adjustmentPeriod = 'Adjustment period must be at least 1 month';
    } else if (value > 120) {
      errors.adjustmentPeriod = 'Adjustment period cannot exceed 120 months';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Tax Considerations Validators
export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    errors.taxRate = 'Tax rate is required';
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.taxRate = 'Tax rate must be a valid number';
  } else if (value < 0) {
    errors.taxRate = 'Tax rate cannot be negative';
  } else if (value > 50) {
    errors.taxRate = 'Tax rate cannot exceed 50%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateDeductibleInterest(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'boolean') {
    errors.deductibleInterest = 'Deductible interest must be true or false';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Advanced Options Validators
export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.inflationRate = 'Inflation rate must be a valid number';
  } else if (value < 0) {
    errors.inflationRate = 'Inflation rate cannot be negative';
  } else if (value > 10) {
    errors.inflationRate = 'Inflation rate cannot exceed 10%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validatePropertyAppreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.propertyAppreciation = 'Property appreciation must be a valid number';
  } else if (value < -10) {
    errors.propertyAppreciation = 'Property appreciation cannot be less than -10%';
  } else if (value > 20) {
    errors.propertyAppreciation = 'Property appreciation cannot exceed 20%';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateDiscountPoints(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.discountPoints = 'Discount points must be a valid number';
  } else if (value < 0) {
    errors.discountPoints = 'Discount points cannot be negative';
  } else if (value > 5) {
    errors.discountPoints = 'Discount points cannot exceed 5';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateOriginationFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  if (value === undefined || value === null) {
    // Optional field
  } else if (typeof value !== 'number' || isNaN(value)) {
    errors.originationFees = 'Origination fees must be a valid number';
  } else if (value < 0) {
    errors.originationFees = 'Origination fees cannot be negative';
  } else if (value > 10000) {
    errors.originationFees = 'Origination fees cannot exceed $10,000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
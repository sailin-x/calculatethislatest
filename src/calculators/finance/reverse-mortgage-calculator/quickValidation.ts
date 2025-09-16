import { ValidationResult } from '../../../types/calculator';

export function validateHomeValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { homeValue: 'Home value must be greater than $0' } };
  }
  if (value < 75000) {
    return { isValid: false, errors: { homeValue: 'Home value must be at least $75,000 for FHA reverse mortgage' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { homeValue: 'Home value cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBorrowerAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 62) {
    return { isValid: false, errors: { borrowerAge: 'Borrower must be at least 62 years old' } };
  }
  if (value > 120) {
    return { isValid: false, errors: { borrowerAge: 'Borrower age cannot exceed 120 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateYoungestBorrowerAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 62) {
    return { isValid: false, errors: { youngestBorrowerAge: 'Youngest borrower must be at least 62 years old' } };
  }
  if (value > 120) {
    return { isValid: false, errors: { youngestBorrowerAge: 'Youngest borrower age cannot exceed 120 years' } };
  }
  if (allInputs?.borrowerAge && value > allInputs.borrowerAge) {
    return { isValid: false, errors: { youngestBorrowerAge: 'Youngest borrower age cannot be greater than borrower age' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 15) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be between 0% and 15%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedAppreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { expectedAppreciation: 'Expected appreciation must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy must be at least 1 year' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy cannot exceed 50 years' } };
  }
  if (allInputs?.borrowerAge) {
    const maxReasonableLifeExpectancy = 120 - allInputs.borrowerAge;
    if (value > maxReasonableLifeExpectancy) {
      return { isValid: false, errors: { lifeExpectancy: 'Life expectancy seems unreasonably long relative to current age' } };
    }
  }
  return { isValid: true, errors: {} };
}

export function validatePaymentPlan(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { paymentPlan: 'Payment plan is required' } };
  }
  const validPlans = ['tenure', 'term', 'line-of-credit'];
  if (!validPlans.includes(value)) {
    return { isValid: false, errors: { paymentPlan: 'Invalid payment plan selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTermYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs?.paymentPlan || allInputs.paymentPlan !== 'term') return { isValid: true, errors: {} };
  if (!value || value < 1) {
    return { isValid: false, errors: { termYears: 'Term years must be at least 1' } };
  }
  if (value > 30) {
    return { isValid: false, errors: { termYears: 'Term years cannot exceed 30' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { monthlyIncome: 'Monthly income cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { monthlyIncome: 'Monthly income cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { monthlyExpenses: 'Monthly expenses cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { monthlyExpenses: 'Monthly expenses cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExistingMortgageBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { existingMortgageBalance: 'Existing mortgage balance cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { existingMortgageBalance: 'Existing mortgage balance cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCounselingFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { counselingFee: 'Counseling fee cannot be negative' } };
  }
  if (value > 1000) {
    return { isValid: false, errors: { counselingFee: 'Counseling fee cannot exceed $1,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOriginationFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { originationFee: 'Origination fee cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { originationFee: 'Origination fee cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateServicingFeeSetAside(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { servicingFeeSetAside: 'Servicing fee set-aside cannot be negative' } };
  }
  if (value > 5000) {
    return { isValid: false, errors: { servicingFeeSetAside: 'Servicing fee set-aside cannot exceed $5,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMortgageInsurancePremium(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { mortgageInsurancePremium: 'Mortgage insurance premium cannot be negative' } };
  }
  if (value > 5000) {
    return { isValid: false, errors: { mortgageInsurancePremium: 'Mortgage insurance premium cannot exceed $5,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHomeownersInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { homeownersInsurance: 'Homeowners insurance cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { homeownersInsurance: 'Homeowners insurance cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHoaFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaintenanceCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { maintenanceCost: 'Maintenance cost cannot be negative' } };
  }
  if (value > 25000) {
    return { isValid: false, errors: { maintenanceCost: 'Maintenance cost cannot exceed $25,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRepairSetAside(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { repairSetAside: 'Repair set-aside cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { repairSetAside: 'Repair set-aside cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}
import { ValidationResult } from '../../types/calculator';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 18 || value > 70) {
    return { isValid: false, errors: { currentAge: 'Current age must be between 18 and 70' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 50 || value > 75) {
    return { isValid: false, errors: { retirementAge: 'Retirement age must be between 50 and 75' } };
  }
  if (allInputs?.currentAge && value <= allInputs.currentAge) {
    return { isValid: false, errors: { retirementAge: 'Retirement age must be greater than current age' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentSalary(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 50000) {
    return { isValid: false, errors: { currentSalary: 'Current salary must be at least $50,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentSalary: 'Current salary cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedSalaryGrowth(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { expectedSalaryGrowth: 'Expected salary growth must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualDeferralAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualDeferralAmount: 'Annual deferral amount cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { annualDeferralAmount: 'Annual deferral amount cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDeferralPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { deferralPercentage: 'Deferral percentage must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateVestingPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 10) {
    return { isValid: false, errors: { vestingPeriod: 'Vesting period must be between 0 and 10 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 30) {
    return { isValid: false, errors: { expectedReturn: 'Expected return must be between -10% and 30%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCompanyMatch(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 200) {
    return { isValid: false, errors: { companyMatch: 'Company match must be between 0% and 200%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCompanyMatchLimit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { companyMatchLimit: 'Company match limit cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { companyMatchLimit: 'Company match limit cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { currentTaxRate: 'Current tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDeferredTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { deferredTaxRate: 'Deferred tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCapitalGainsTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 30) {
    return { isValid: false, errors: { capitalGainsTaxRate: 'Capital gains tax rate must be between 0% and 30%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEmployerContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { employerContribution: 'Employer contribution cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { employerContribution: 'Employer contribution cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateVestingSchedule(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['graded', 'cliff', 'immediate'].includes(value)) {
    return { isValid: false, errors: { vestingSchedule: 'Please select a valid vesting schedule' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDistributionOptions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['lump-sum', 'annuity', 'installments'].includes(value)) {
    return { isValid: false, errors: { distributionOptions: 'Please select a valid distribution option' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCompanyRisk(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['low', 'medium', 'high'].includes(value)) {
    return { isValid: false, errors: { companyRisk: 'Please select a valid company risk level' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMarketRisk(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['conservative', 'moderate', 'aggressive'].includes(value)) {
    return { isValid: false, errors: { marketRisk: 'Please select a valid market risk level' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnalysisYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 50) {
    return { isValid: false, errors: { analysisYears: 'Analysis years must be between 1 and 50' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 10) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between 0% and 10%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCliffVesting(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { cliffVesting: 'Cliff vesting must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateConsiderPortability(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { considerPortability: 'Consider portability must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateConsiderCreditShelter(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { considerCreditShelter: 'Consider credit shelter must be true or false' } };
  }
  return { isValid: true, errors: {} };
}
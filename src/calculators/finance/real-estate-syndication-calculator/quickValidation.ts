import { ValidationResult } from '../../types/calculator';

export function validateTotalProjectCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { totalProjectCost: 'Total project cost must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { totalProjectCost: 'Total project cost must be at least $10,000' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { totalProjectCost: 'Total project cost cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSponsorEquity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { sponsorEquity: 'Sponsor equity cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { sponsorEquity: 'Sponsor equity cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInvestorEquity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { investorEquity: 'Investor equity cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { investorEquity: 'Investor equity cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { loanAmount: 'Loan amount cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { loanAmount: 'Loan amount cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTotalUnits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { totalUnits: 'Total units must be greater than 0' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { totalUnits: 'Total units must be at least 1' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { totalUnits: 'Total units cannot exceed 10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAverageRentPerUnit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { averageRentPerUnit: 'Average rent per unit cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { averageRentPerUnit: 'Average rent per unit cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateVacancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0 || value > 100) {
    return { isValid: false, errors: { vacancyRate: 'Vacancy rate must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOperatingExpensesRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0 || value > 100) {
    return { isValid: false, errors: { operatingExpensesRate: 'Operating expenses rate must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCapRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value <= 0 || value > 50) {
    return { isValid: false, errors: { capRate: 'Cap rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHoldingPeriodYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { holdingPeriodYears: 'Holding period must be greater than 0' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { holdingPeriodYears: 'Holding period must be at least 1 year' } };
  }
  if (value > 30) {
    return { isValid: false, errors: { holdingPeriodYears: 'Holding period cannot exceed 30 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSponsorProfitSplit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0 || value > 100) {
    return { isValid: false, errors: { sponsorProfitSplit: 'Sponsor profit split must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInvestorProfitSplit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0 || value > 100) {
    return { isValid: false, errors: { investorProfitSplit: 'Investor profit split must be between 0% and 100%' } };
  }
  if (allInputs?.sponsorProfitSplit && (value + allInputs.sponsorProfitSplit) !== 100) {
    return { isValid: false, errors: { investorProfitSplit: 'Sponsor and investor profit splits must total 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePreferredReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0 || value > 20) {
    return { isValid: false, errors: { preferredReturn: 'Preferred return must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePromoteStructure(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { promoteStructure: 'Promote structure is required' } };
  }
  const validStructures = ['straight', 'waterfall'];
  if (!validStructures.includes(value)) {
    return { isValid: false, errors: { promoteStructure: 'Invalid promote structure selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePromotePercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0 || value > 50) {
    return { isValid: false, errors: { promotePercentage: 'Promote percentage must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}
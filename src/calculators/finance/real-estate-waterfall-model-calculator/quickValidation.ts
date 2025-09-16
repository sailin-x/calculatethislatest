import { ValidationResult } from '../../../types/calculator';

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

export function validatePreferredReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, errors: { preferredReturn: 'Preferred return must be 0% or greater' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { preferredReturn: 'Preferred return cannot exceed 20%' } };
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

export function validateTotalCashFlow(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { totalCashFlow: 'Total cash flow cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { totalCashFlow: 'Total cash flow cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTotalAppreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { totalAppreciation: 'Total appreciation cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { totalAppreciation: 'Total appreciation cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTotalPrincipalPaydown(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { totalPrincipalPaydown: 'Total principal paydown cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { totalPrincipalPaydown: 'Total principal paydown cannot exceed $100,000,000' } };
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

export function validateWaterfallType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { waterfallType: 'Waterfall type is required' } };
  }
  const validTypes = ['american', 'european', 'tiered'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { waterfallType: 'Invalid waterfall type selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePromoteStructure(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { promoteStructure: 'Promote structure is required' } };
  }
  const validStructures = ['straight', 'catch_up'];
  if (!validStructures.includes(value)) {
    return { isValid: false, errors: { promoteStructure: 'Invalid promote structure selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIrrTarget(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0 || value > 50) {
    return { isValid: false, errors: { irrTarget: 'IRR target must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}
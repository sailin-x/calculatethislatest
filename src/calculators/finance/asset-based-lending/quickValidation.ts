import { AssetBasedLendingInputs } from './types';

export function validateTotalAssetValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Total asset value must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Total asset value cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateAssetType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !['accounts_receivable', 'inventory', 'equipment', 'real_estate', 'securities'].includes(value)) {
    return { isValid: false, message: 'Asset type must be accounts_receivable, inventory, equipment, real_estate, or securities' };
  }
  return { isValid: true };
}

export function validateAdvanceRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 1) {
    return { isValid: false, message: 'Advance rate must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateBorrowingBase(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Borrowing base cannot be negative' };
  }
  return { isValid: true };
}

export function validateOutstandingDebt(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Outstanding debt cannot be negative' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 0) {
    return { isValid: false, message: 'Interest rate must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Interest rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Loan term must be at least 1 year' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Loan term cannot exceed 30 years' };
  }
  return { isValid: true };
}

export function validateMonthlyRevenue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Monthly revenue cannot be negative' };
  }
  return { isValid: true };
}

export function validateMonthlyExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Monthly expenses cannot be negative' };
  }
  return { isValid: true };
}

export function validateDebtServiceCoverageRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Debt service coverage ratio cannot be negative' };
  }
  return { isValid: true };
}

export function validateCollateralCoverageRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Collateral coverage ratio cannot be negative' };
  }
  return { isValid: true };
}

export function validateIndustry(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, message: 'Industry must be specified' };
  }
  return { isValid: true };
}

export function validateCreditRating(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC'].includes(value)) {
    return { isValid: false, message: 'Credit rating must be AAA, AA, A, BBB, BB, B, or CCC' };
  }
  return { isValid: true };
}
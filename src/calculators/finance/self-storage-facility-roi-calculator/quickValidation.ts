import { ValidationResult } from '../../types/calculator';

export function validateTotalUnits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { totalUnits: 'Total units must be greater than 0' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { totalUnits: 'Total units cannot exceed 10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAverageUnitSize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { averageUnitSize: 'Average unit size must be greater than 0' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { averageUnitSize: 'Average unit size cannot exceed 10,000 sq ft' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTotalSquareFootage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { totalSquareFootage: 'Total square footage must be greater than 0' } };
  }
  if (value < 100) {
    return { isValid: false, errors: { totalSquareFootage: 'Total square footage must be at least 100 sq ft' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { totalSquareFootage: 'Total square footage cannot exceed 1,000,000 sq ft' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOccupancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { occupancyRate: 'Occupancy rate must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAverageMonthlyRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { averageMonthlyRent: 'Average monthly rent must be greater than $0' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { averageMonthlyRent: 'Average monthly rent cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAcquisitionCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { acquisitionCost: 'Acquisition cost cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { acquisitionCost: 'Acquisition cost cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLandCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { landCost: 'Land cost cannot be negative' } };
  }
  if (value > 5000000) {
    return { isValid: false, errors: { landCost: 'Land cost cannot exceed $5,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateConstructionCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { constructionCost: 'Construction cost cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { constructionCost: 'Construction cost cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSoftCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { softCosts: 'Soft costs cannot be negative' } };
  }
  if (value > 2000000) {
    return { isValid: false, errors: { softCosts: 'Soft costs cannot exceed $2,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFinancingAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { financingAmount: 'Financing amount cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { financingAmount: 'Financing amount cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { loanTerm: 'Loan term must be between 0 and 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { insurance: 'Insurance cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { insurance: 'Insurance cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaintenance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { maintenance: 'Maintenance cannot be negative' } };
  }
  if (value > 200000) {
    return { isValid: false, errors: { maintenance: 'Maintenance cannot exceed $200,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUtilities(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { utilities: 'Utilities cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { utilities: 'Utilities cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateManagementFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { managementFees: 'Management fees cannot be negative' } };
  }
  if (value > 200000) {
    return { isValid: false, errors: { managementFees: 'Management fees cannot exceed $200,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMarketing(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { marketing: 'Marketing cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { marketing: 'Marketing cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSupplies(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { supplies: 'Supplies cannot be negative' } };
  }
  if (value > 25000) {
    return { isValid: false, errors: { supplies: 'Supplies cannot exceed $25,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSecurity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { security: 'Security cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { security: 'Security cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOtherIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { otherIncome: 'Other income cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { otherIncome: 'Other income cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualRentIncrease(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { annualRentIncrease: 'Annual rent increase must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period must be at least 1 year' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExitCapRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { exitCapRate: 'Exit cap rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { discountRate: 'Discount rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTerminalValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { terminalValue: 'Terminal value cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { terminalValue: 'Terminal value cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}
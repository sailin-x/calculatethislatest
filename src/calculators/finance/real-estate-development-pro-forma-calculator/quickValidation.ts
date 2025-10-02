import { ValidationResult } from '../../types/calculator';

/**
 * Quick validation functions for individual real estate development pro-forma calculator fields
 * Each function validates a single field and includes allInputs parameter
 */

export function validateCalculationType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, errors: { calculationType: 'Analysis type is required' } };
  }

  const validTypes = [
    'development_costs', 'revenue_projections', 'financing',
    'investment_returns', 'sensitivity_analysis', 'comprehensive'
  ];

  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { calculationType: 'Please select a valid analysis type' } };
  }

  return { isValid: true, errors: {} };
}

export function validateLandCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100000000) {
    return { isValid: false, errors: { landCost: 'Land cost must be between $0 and $100,000,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateConstructionCostPerSqFt(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 10000) {
    return { isValid: false, errors: { constructionCostPerSqFt: 'Construction cost per square foot must be between $0 and $10,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateTotalSqFt(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 100 || numValue > 1000000) {
    return { isValid: false, errors: { totalSqFt: 'Total square footage must be between 100 and 1,000,000 sq ft' } };
  }

  return { isValid: true, errors: {} };
}

export function validateSoftCostsPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, errors: { softCostsPercentage: 'Soft costs percentage must be between 0% and 50%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateContingencyPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 20) {
    return { isValid: false, errors: { contingencyPercentage: 'Contingency percentage must be between 0% and 20%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateMarketingCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 10000000) {
    return { isValid: false, errors: { marketingCost: 'Marketing cost must be between $0 and $10,000,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateFinancingCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 10000000) {
    return { isValid: false, errors: { financingCost: 'Financing cost must be between $0 and $10,000,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateRentalRatePerSqFt(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 1000) {
    return { isValid: false, errors: { rentalRatePerSqFt: 'Rental rate per square foot must be between $0 and $1,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateOccupancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, errors: { occupancyRate: 'Occupancy rate must be between 0% and 100%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateAnnualRentIncrease(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < -10 || numValue > 20) {
    return { isValid: false, errors: { annualRentIncrease: 'Annual rent increase must be between -10% and 20%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateHoldingPeriodYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 30) {
    return { isValid: false, errors: { holdingPeriodYears: 'Holding period must be between 1 and 30 years' } };
  }

  return { isValid: true, errors: {} };
}

export function validateExitCapRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 20) {
    return { isValid: false, errors: { exitCapRate: 'Exit cap rate must be between 1% and 20%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateEquityPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, errors: { equityPercentage: 'Equity percentage must be between 0% and 100%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 15) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be between 0% and 15%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateLoanTermYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 50) {
    return { isValid: false, errors: { loanTermYears: 'Loan term must be between 1 and 50 years' } };
  }

  return { isValid: true, errors: {} };
}

export function validateConstructionPeriodMonths(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 36) {
    return { isValid: false, errors: { constructionPeriodMonths: 'Construction period must be between 1 and 36 months' } };
  }

  return { isValid: true, errors: {} };
}

export function validateInterestOnlyPeriodMonths(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 60) {
    return { isValid: false, errors: { interestOnlyPeriodMonths: 'Interest-only period must be between 0 and 60 months' } };
  }

  // Check if interest-only period is at least as long as construction period
  if (allInputs?.constructionPeriodMonths && numValue < Number(allInputs.constructionPeriodMonths)) {
    return { isValid: false, errors: { interestOnlyPeriodMonths: 'Interest-only period must be at least as long as construction period' } };
  }

  return { isValid: true, errors: {} };
}

export function validateCostVariance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  try {
    const variances = value.split(',').map((v: string) => Number(v.trim()));
    const allValid = variances.every((v: number) => !isNaN(v) && v >= -50 && v <= 50);

    if (!allValid) {
      return { isValid: false, errors: { costVariance: 'Cost variance must be comma-separated numbers between -50% and 50%' } };
    }
  } catch {
    return { isValid: false, errors: { costVariance: 'Cost variance must be comma-separated numbers' } };
  }

  return { isValid: true, errors: {} };
}

export function validateRevenueVariance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  try {
    const variances = value.split(',').map((v: string) => Number(v.trim()));
    const allValid = variances.every((v: number) => !isNaN(v) && v >= -50 && v <= 50);

    if (!allValid) {
      return { isValid: false, errors: { revenueVariance: 'Revenue variance must be comma-separated numbers between -50% and 50%' } };
    }
  } catch {
    return { isValid: false, errors: { revenueVariance: 'Revenue variance must be comma-separated numbers' } };
  }

  return { isValid: true, errors: {} };
}

export function validateCapRateVariance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} };
  }

  try {
    const variances = value.split(',').map((v: string) => Number(v.trim()));
    const allValid = variances.every((v: number) => !isNaN(v) && v >= -50 && v <= 50);

    if (!allValid) {
      return { isValid: false, errors: { capRateVariance: 'Cap rate variance must be comma-separated numbers between -50% and 50%' } };
    }
  } catch {
    return { isValid: false, errors: { capRateVariance: 'Cap rate variance must be comma-separated numbers' } };
  }

  return { isValid: true, errors: {} };
}
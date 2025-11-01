import { CostOfDebtInputs } from './types';

export function validateBondFaceValue(value: any): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Bond face value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Bond face value cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateBondCouponRate(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Bond coupon rate must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Bond coupon rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateBondMarketPrice(value: any): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Bond market price must be greater than 0' };
  }
  return { isValid: true };
}

export function validateBondYearsToMaturity(value: any): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Bond years to maturity must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Bond years to maturity cannot exceed 100 years' };
  }
  return { isValid: true };
}

export function validateBondCouponFrequency(value: any): { isValid: boolean; message?: string } {
  if (!value || value < 1 || value > 12) {
    return { isValid: false, message: 'Bond coupon frequency must be between 1 and 12' };
  }
  return { isValid: true };
}

export function validateBankLoanAmount(value: any): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Bank loan amount must be greater than 0' };
  }
  return { isValid: true };
}

export function validateBankLoanInterestRate(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Bank loan interest rate must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Bank loan interest rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateBankLoanTerm(value: any): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Bank loan term must be greater than 0' };
  }
  return { isValid: true };
}

export function validateCreditFacilityLimit(value: any): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Credit facility limit must be greater than 0' };
  }
  return { isValid: true };
}

export function validateCreditFacilityRate(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Credit facility rate must be 0 or greater' };
  }
  return { isValid: true };
}

export function validateCreditFacilityUtilization(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0 || value > 100) {
    return { isValid: false, message: 'Credit facility utilization must be between 0 and 100' };
  }
  return { isValid: true };
}

export function validatePreferredStockDividend(value: any): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Preferred stock dividend cannot be negative' };
  }
  return { isValid: true };
}

export function validatePreferredStockPrice(value: any): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Preferred stock price must be greater than 0' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Tax rate must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Tax rate cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateRiskFreeRate(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < -0.1) {
    return { isValid: false, message: 'Risk free rate must be -10% or greater' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Risk free rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateMarketRiskPremium(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Market risk premium must be 0 or greater' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Market risk premium cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateCompanyBeta(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < -5) {
    return { isValid: false, message: 'Company beta must be -5 or greater' };
  }
  if (value > 5) {
    return { isValid: false, message: 'Company beta cannot exceed 5' };
  }
  return { isValid: true };
}

export function validateCreditRating(value: any): { isValid: boolean; message?: string } {
  const validRatings = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C', 'D'];
  if (!value || !validRatings.includes(value.toUpperCase())) {
    return { isValid: false, message: 'Credit rating must be a valid rating (AAA, AA, A, BBB, BB, B, CCC, CC, C, D)' };
  }
  return { isValid: true };
}

export function validateIndustry(value: any): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, message: 'Industry is required' };
  }
  return { isValid: true };
}

export function validateTotalDebt(value: any): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Total debt cannot be negative' };
  }
  return { isValid: true };
}

export function validateTotalAssets(value: any): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Total assets must be greater than 0' };
  }
  return { isValid: true };
}

export function validateEbitda(value: any): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'EBITDA cannot be negative' };
  }
  return { isValid: true };
}

export function validateInterestExpense(value: any): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Interest expense cannot be negative' };
  }
  return { isValid: true };
}

export function validateDebtToEquityRatio(value: any): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Debt to equity ratio cannot be negative' };
  }
  return { isValid: true };
}

export function validateDebtToEbitdaRatio(value: any): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Debt to EBITDA ratio cannot be negative' };
  }
  return { isValid: true };
}

export function validateCalculationMethod(value: any): { isValid: boolean; message?: string } {
  const validMethods = ['bond_yield', 'loan_rate', 'credit_spread', 'synthetic_rating', 'weighted_average'];
  if (!value || !validMethods.includes(value)) {
    return { isValid: false, message: 'Calculation method must be one of: bond_yield, loan_rate, credit_spread, synthetic_rating, weighted_average' };
  }
  return { isValid: true };
}

export function validateWeightingMethod(value: any): { isValid: boolean; message?: string } {
  const validMethods = ['book_value', 'market_value', 'equal_weight'];
  if (!value || !validMethods.includes(value)) {
    return { isValid: false, message: 'Weighting method must be one of: book_value, market_value, equal_weight' };
  }
  return { isValid: true };
}
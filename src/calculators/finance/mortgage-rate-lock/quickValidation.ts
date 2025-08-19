import { QuickValidationResult } from '../../../types/calculator';
import { MortgageRateLockInputs } from './formulas';

/**
 * Quick validate loan amount
 */
export function quickValidateLoanAmount(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Loan amount is required', severity: 'error' };
  }
  
  if (value <= 0) {
    return { isValid: false, message: 'Loan amount must be positive', severity: 'error' };
  }
  
  if (value < 50000) {
    return { isValid: false, message: 'Loan amount should be at least $50,000', severity: 'warning' };
  }
  
  if (value > 10000000) {
    return { isValid: false, message: 'Loan amount seems unusually high', severity: 'warning' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate interest rate
 */
export function quickValidateInterestRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Interest rate is required', severity: 'error' };
  }
  
  if (value <= 0) {
    return { isValid: false, message: 'Interest rate must be positive', severity: 'error' };
  }
  
  if (value < 0.1 || value > 20) {
    return { isValid: false, message: 'Interest rate must be between 0.1% and 20%', severity: 'error' };
  }
  
  if (value > 10) {
    return { isValid: false, message: 'Interest rate above 10% seems unusually high', severity: 'warning' };
  }
  
  if (value < 2) {
    return { isValid: true, message: 'Excellent interest rate', severity: 'success' };
  }
  
  if (value < 4) {
    return { isValid: true, message: 'Good interest rate', severity: 'success' };
  }
  
  return { isValid: true, message: 'Standard interest rate', severity: 'success' };
}

/**
 * Quick validate loan term
 */
export function quickValidateLoanTerm(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Loan term is required', severity: 'error' };
  }
  
  const validTerms = ['15', '20', '30'];
  if (!validTerms.includes(value)) {
    return { isValid: false, message: 'Loan term must be 15, 20, or 30 years', severity: 'error' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate lock period
 */
export function quickValidateLockPeriod(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Lock period is required', severity: 'error' };
  }
  
  const validPeriods = ['15', '30', '45', '60', '90', '120'];
  if (!validPeriods.includes(value)) {
    return { isValid: false, message: 'Lock period must be 15, 30, 45, 60, 90, or 120 days', severity: 'error' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate lock fee
 */
export function quickValidateLockFee(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return { isValid: false, message: 'Lock fee cannot be negative', severity: 'error' };
  }
  
  if (value > 5000) {
    return { isValid: false, message: 'Lock fee above $5,000 seems unusually high', severity: 'warning' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate lock extension fee
 */
export function quickValidateLockExtensionFee(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return { isValid: false, message: 'Lock extension fee cannot be negative', severity: 'error' };
  }
  
  if (value > 100) {
    return { isValid: false, message: 'Lock extension fee above $100 per day seems unusually high', severity: 'warning' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate processing time
 */
export function quickValidateProcessingTime(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Processing time is required', severity: 'error' };
  }
  
  if (value < 7) {
    return { isValid: false, message: 'Processing time should be at least 7 days', severity: 'error' };
  }
  
  if (value > 120) {
    return { isValid: false, message: 'Processing time above 120 days seems unusually long', severity: 'warning' };
  }
  
  if (value <= 30) {
    return { isValid: true, message: 'Fast processing time', severity: 'success' };
  }
  
  if (value <= 60) {
    return { isValid: true, message: 'Standard processing time', severity: 'success' };
  }
  
  return { isValid: true, message: 'Extended processing time', severity: 'success' };
}

/**
 * Quick validate rate volatility
 */
export function quickValidateRateVolatility(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return { isValid: false, message: 'Rate volatility cannot be negative', severity: 'error' };
  }
  
  if (value > 200) {
    return { isValid: false, message: 'Rate volatility above 200 basis points seems unusually high', severity: 'warning' };
  }
  
  if (value > 50) {
    return { isValid: true, message: 'High volatility environment', severity: 'success' };
  }
  
  if (value > 25) {
    return { isValid: true, message: 'Moderate volatility', severity: 'success' };
  }
  
  return { isValid: true, message: 'Low volatility environment', severity: 'success' };
}

/**
 * Quick validate market trend
 */
export function quickValidateMarketTrend(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  const validTrends = ['rising', 'falling', 'stable'];
  if (!validTrends.includes(value)) {
    return { isValid: false, message: 'Market trend must be rising, falling, or stable', severity: 'error' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate property type
 */
export function quickValidatePropertyType(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  const validTypes = ['primary', 'secondary', 'investment'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Property type must be primary, secondary, or investment', severity: 'error' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate loan type
 */
export function quickValidateLoanType(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Loan type is required', severity: 'error' };
  }
  
  const validTypes = ['conventional', 'fha', 'va', 'usda'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Loan type must be conventional, fha, va, or usda', severity: 'error' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate credit score
 */
export function quickValidateCreditScore(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 300 || value > 850) {
    return { isValid: false, message: 'Credit score must be between 300 and 850', severity: 'error' };
  }
  
  if (value < 580) {
    return { isValid: false, message: 'Credit score below 580 may limit loan options', severity: 'warning' };
  }
  
  if (value < 620) {
    return { isValid: false, message: 'Credit score below 620 may affect conventional loan eligibility', severity: 'warning' };
  }
  
  if (value >= 750) {
    return { isValid: true, message: 'Excellent credit score', severity: 'success' };
  }
  
  if (value >= 700) {
    return { isValid: true, message: 'Good credit score', severity: 'success' };
  }
  
  return { isValid: true, message: 'Fair credit score', severity: 'success' };
}

/**
 * Quick validate down payment
 */
export function quickValidateDownPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return { isValid: false, message: 'Down payment cannot be negative', severity: 'error' };
  }
  
  if (value > 1000000) {
    return { isValid: false, message: 'Down payment above $1,000,000 seems unusually high', severity: 'warning' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate closing date
 */
export function quickValidateClosingDate(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Closing date must be a valid date', severity: 'error' };
  }
  
  const today = new Date();
  if (date < today) {
    return { isValid: false, message: 'Closing date cannot be in the past', severity: 'error' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate lock start date
 */
export function quickValidateLockStartDate(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Lock start date must be a valid date', severity: 'error' };
  }
  
  const today = new Date();
  if (date < today) {
    return { isValid: false, message: 'Lock start date cannot be in the past', severity: 'error' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate all inputs
 */
export function quickValidateAllInputs(inputs: Partial<MortgageRateLockInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];
  
  results.push(quickValidateLoanAmount(inputs.loanAmount));
  results.push(quickValidateInterestRate(inputs.interestRate));
  results.push(quickValidateLoanTerm(inputs.loanTerm));
  results.push(quickValidateLockPeriod(inputs.lockPeriod));
  results.push(quickValidateLockFee(inputs.lockFee));
  results.push(quickValidateLockExtensionFee(inputs.lockExtensionFee));
  results.push(quickValidateProcessingTime(inputs.processingTime));
  results.push(quickValidateRateVolatility(inputs.rateVolatility));
  results.push(quickValidateMarketTrend(inputs.marketTrend));
  results.push(quickValidatePropertyType(inputs.propertyType));
  results.push(quickValidateLoanType(inputs.loanType));
  results.push(quickValidateCreditScore(inputs.creditScore));
  results.push(quickValidateDownPayment(inputs.downPayment));
  results.push(quickValidateClosingDate(inputs.closingDate));
  results.push(quickValidateLockStartDate(inputs.lockStartDate));
  
  return results;
}
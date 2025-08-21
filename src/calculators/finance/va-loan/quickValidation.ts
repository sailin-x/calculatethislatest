import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validatePurchasePrice(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Purchase price must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Purchase price must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: true, message: 'Purchase price is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateDownPayment(value: any, purchasePrice?: number): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Down payment must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Down payment cannot be negative' };
  }
  if (purchasePrice && value >= purchasePrice) {
    return { isValid: false, message: 'Down payment must be less than purchase price' };
  }
  if (value > 0) {
    return { isValid: true, message: 'VA loans typically allow 0% down payment. Consider if down payment is necessary' };
  }
  return { isValid: true, message: '' };
}

export function validateInterestRate(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Interest rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 15) {
    return { isValid: true, message: 'Interest rate is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateLoanTerm(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Loan term must be a valid number' };
  }
  if (value < 15) {
    return { isValid: false, message: 'Loan term must be at least 15 years' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Loan term cannot exceed 30 years' };
  }
  return { isValid: true, message: '' };
}

export function validateVeteranStatus(value: any): ValidationResult {
  if (typeof value !== 'string' || !value) {
    return { isValid: false, message: 'Veteran status must be selected' };
  }
  return { isValid: true, message: '' };
}

export function validateServiceYears(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Years of service must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Years of service cannot be negative' };
  }
  if (value > 50) {
    return { isValid: true, message: 'Years of service is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateDisabilityRating(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Disability rating must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Disability rating cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Disability rating cannot exceed 100%' };
  }
  return { isValid: true, message: '' };
}

export function validateFirstTimeUse(value: any): ValidationResult {
  if (typeof value !== 'string' || !value) {
    return { isValid: false, message: 'First time use must be selected' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyType(value: any): ValidationResult {
  if (typeof value !== 'string' || !value) {
    return { isValid: false, message: 'Property type must be selected' };
  }
  if (value === 'condo') {
    return { isValid: true, message: 'Condominiums must be VA-approved. Verify eligibility' };
  }
  if (value === 'manufactured') {
    return { isValid: true, message: 'Manufactured homes must meet specific VA requirements. Verify eligibility' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyLocation(value: any): ValidationResult {
  if (typeof value !== 'string' || !value) {
    return { isValid: false, message: 'Property location must be selected' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyAge(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property age must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Property age cannot be negative' };
  }
  if (value > 100) {
    return { isValid: true, message: 'Property age is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertySize(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property size must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Property size must be greater than 0' };
  }
  if (value > 15000) {
    return { isValid: true, message: 'Property size is very large. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyTaxes(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property taxes must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Property taxes cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: true, message: 'Property taxes are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateHomeownersInsurance(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Homeowners insurance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Homeowners insurance cannot be negative' };
  }
  if (value > 20000) {
    return { isValid: true, message: 'Homeowners insurance is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateMonthlyDebts(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Monthly debts must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Monthly debts cannot be negative' };
  }
  if (value > 15000) {
    return { isValid: true, message: 'Monthly debts are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateCreditScore(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Credit score must be a valid number' };
  }
  if (value < 500) {
    return { isValid: false, message: 'Credit score cannot be less than 500' };
  }
  if (value > 850) {
    return { isValid: false, message: 'Credit score cannot exceed 850' };
  }
  if (value < 640) {
    return { isValid: true, message: 'Credit score is below typical VA requirements. Consider improving credit score' };
  }
  return { isValid: true, message: '' };
}

export function validateAnnualIncome(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Annual income must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Annual income must be greater than 0' };
  }
  if (value > 5000000) {
    return { isValid: true, message: 'Annual income is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateClosingCosts(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Closing costs must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Closing costs cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: true, message: 'Closing costs are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validatePrepaidItems(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Prepaid items must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Prepaid items cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: true, message: 'Prepaid items are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateSellerCredits(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Seller credits must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Seller credits cannot be negative' };
  }
  if (value > 200000) {
    return { isValid: true, message: 'Seller credits are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateAnalysisPeriod(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Analysis period must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Analysis period must be greater than 0' };
  }
  if (value > 30) {
    return { isValid: true, message: 'Analysis period is very long. Consider a shorter period' };
  }
  return { isValid: true, message: '' };
}

export function validateAllVALoanInputs(inputs: CalculatorInputs): ValidationResult {
  const validations = [
    validatePurchasePrice(inputs.purchasePrice),
    validateDownPayment(inputs.downPayment, inputs.purchasePrice),
    validateInterestRate(inputs.interestRate),
    validateLoanTerm(inputs.loanTerm),
    validateVeteranStatus(inputs.veteranStatus),
    validateServiceYears(inputs.serviceYears),
    validateDisabilityRating(inputs.disabilityRating),
    validateFirstTimeUse(inputs.firstTimeUse),
    validatePropertyType(inputs.propertyType),
    validatePropertyLocation(inputs.propertyLocation),
    validatePropertyAge(inputs.propertyAge),
    validatePropertySize(inputs.propertySize),
    validatePropertyTaxes(inputs.propertyTaxes),
    validateHomeownersInsurance(inputs.homeownersInsurance),
    validateMonthlyDebts(inputs.monthlyDebts),
    validateCreditScore(inputs.creditScore),
    validateAnnualIncome(inputs.annualIncome),
    validateClosingCosts(inputs.closingCosts),
    validatePrepaidItems(inputs.prepaidItems),
    validateSellerCredits(inputs.sellerCredits),
    validateAnalysisPeriod(inputs.analysisPeriod)
  ];

  const errors = validations.filter(v => !v.isValid);
  const warnings = validations.filter(v => v.isValid && v.message);

  if (errors.length > 0) {
    return { isValid: false, message: errors[0].message };
  }

  if (warnings.length > 0) {
    return { isValid: true, message: warnings[0].message };
  }

  return { isValid: true, message: '' };
}

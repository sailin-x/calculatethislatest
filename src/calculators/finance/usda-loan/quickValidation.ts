import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validatePurchasePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Purchase price must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Purchase price must be greater than 0' };
  }
  if (value > 5000000) {
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
    return { isValid: true, message: 'USDA loans typically allow 0% down payment. Consider if down payment is necessary' };
  }
  return { isValid: true, message: '' };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Annual income must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Annual income must be greater than 0' };
  }
  if (value > 2000000) {
    return { isValid: true, message: 'Annual income is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateHouseholdSize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Household size must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Household size must be greater than 0' };
  }
  if (value > 20) {
    return { isValid: true, message: 'Household size is very large. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'string' || !value) {
    return { isValid: false, message: 'Property location must be selected' };
  }
  if (value === 'urban') {
    return { isValid: true, message: 'Urban properties typically have limited USDA eligibility. Verify property location' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'string' || !value) {
    return { isValid: false, message: 'Property type must be selected' };
  }
  if (value === 'condo') {
    return { isValid: true, message: 'Condominiums may have limited USDA eligibility. Verify with USDA' };
  }
  if (value === 'manufactured') {
    return { isValid: true, message: 'Manufactured homes must meet specific USDA requirements. Verify eligibility' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property size must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Property size must be greater than 0' };
  }
  if (value > 10000) {
    return { isValid: true, message: 'Property size is very large. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property taxes must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Property taxes cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: true, message: 'Property taxes are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateHomeownersInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Homeowners insurance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Homeowners insurance cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: true, message: 'Homeowners insurance is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateMonthlyDebts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Monthly debts must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Monthly debts cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: true, message: 'Monthly debts are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
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
    return { isValid: true, message: 'Credit score is below typical USDA requirements. Consider improving credit score' };
  }
  return { isValid: true, message: '' };
}

export function validateGuaranteeFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Guarantee fee must be a valid number' };
  }
  if (value < 0.5) {
    return { isValid: false, message: 'Guarantee fee cannot be less than 0.5%' };
  }
  if (value > 3.5) {
    return { isValid: false, message: 'Guarantee fee cannot exceed 3.5%' };
  }
  return { isValid: true, message: '' };
}

export function validateAnnualFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Annual fee must be a valid number' };
  }
  if (value < 0.1) {
    return { isValid: false, message: 'Annual fee cannot be less than 0.1%' };
  }
  if (value > 1.0) {
    return { isValid: false, message: 'Annual fee cannot exceed 1.0%' };
  }
  return { isValid: true, message: '' };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Closing costs must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Closing costs cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: true, message: 'Closing costs are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validatePrepaidItems(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Prepaid items must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Prepaid items cannot be negative' };
  }
  if (value > 20000) {
    return { isValid: true, message: 'Prepaid items are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateSellerCredits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Seller credits must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Seller credits cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: true, message: 'Seller credits are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
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

export function validateAllUSDALoanInputs(inputs: CalculatorInputs): ValidationResult {
  const validations = [
    validatePurchasePrice(inputs.purchasePrice),
    validateDownPayment(inputs.downPayment, inputs.purchasePrice),
    validateInterestRate(inputs.interestRate),
    validateLoanTerm(inputs.loanTerm),
    validateAnnualIncome(inputs.annualIncome),
    validateHouseholdSize(inputs.householdSize),
    validatePropertyLocation(inputs.propertyLocation),
    validatePropertyType(inputs.propertyType),
    validatePropertyAge(inputs.propertyAge),
    validatePropertySize(inputs.propertySize),
    validatePropertyTaxes(inputs.propertyTaxes),
    validateHomeownersInsurance(inputs.homeownersInsurance),
    validateMonthlyDebts(inputs.monthlyDebts),
    validateCreditScore(inputs.creditScore),
    validateGuaranteeFee(inputs.guaranteeFee),
    validateAnnualFee(inputs.annualFee),
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

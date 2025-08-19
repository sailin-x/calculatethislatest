import { QuickValidationResult } from '../../../types/calculator';
import { MortgageQualificationInputs } from './formulas';

/**
 * Quick validate gross monthly income
 */
export function quickValidateGrossMonthlyIncome(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Gross monthly income is required', severity: 'error' };
  }
  
  if (value <= 0) {
    return { isValid: false, message: 'Gross monthly income must be positive', severity: 'error' };
  }
  
  if (value < 1000) {
    return { isValid: false, message: 'Gross monthly income should be at least $1,000', severity: 'warning' };
  }
  
  if (value > 1000000) {
    return { isValid: false, message: 'Gross monthly income seems unusually high', severity: 'warning' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate monthly debts
 */
export function quickValidateMonthlyDebts(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Monthly debts are required', severity: 'error' };
  }
  
  if (value < 0) {
    return { isValid: false, message: 'Monthly debts cannot be negative', severity: 'error' };
  }
  
  if (value > 100000) {
    return { isValid: false, message: 'Monthly debts seem unusually high', severity: 'warning' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate down payment
 */
export function quickValidateDownPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Down payment is required', severity: 'error' };
  }
  
  if (value < 0) {
    return { isValid: false, message: 'Down payment cannot be negative', severity: 'error' };
  }
  
  if (value > 1000000) {
    return { isValid: false, message: 'Down payment seems unusually high', severity: 'warning' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate credit score
 */
export function quickValidateCreditScore(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Credit score is required', severity: 'error' };
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
 * Quick validate property tax rate
 */
export function quickValidatePropertyTaxRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return { isValid: false, message: 'Property tax rate cannot be negative', severity: 'error' };
  }
  
  if (value > 5) {
    return { isValid: false, message: 'Property tax rate above 5% seems unusually high', severity: 'warning' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate homeowners insurance
 */
export function quickValidateHomeownersInsurance(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return { isValid: false, message: 'Homeowners insurance cannot be negative', severity: 'error' };
  }
  
  if (value > 10000) {
    return { isValid: false, message: 'Homeowners insurance above $10,000 seems unusually high', severity: 'warning' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate PMI rate
 */
export function quickValidatePmiRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return { isValid: false, message: 'PMI rate cannot be negative', severity: 'error' };
  }
  
  if (value > 2) {
    return { isValid: false, message: 'PMI rate above 2% seems unusually high', severity: 'warning' };
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
 * Quick validate DTI ratio
 */
export function quickValidateDtiRatio(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value <= 0) {
    return { isValid: false, message: 'DTI ratio must be positive', severity: 'error' };
  }
  
  if (value < 20 || value > 50) {
    return { isValid: false, message: 'DTI ratio must be between 20% and 50%', severity: 'error' };
  }
  
  if (value > 43) {
    return { isValid: false, message: 'DTI ratio above 43% may make qualification difficult', severity: 'warning' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate front-end ratio
 */
export function quickValidateFrontEndRatio(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value <= 0) {
    return { isValid: false, message: 'Front-end ratio must be positive', severity: 'error' };
  }
  
  if (value < 20 || value > 40) {
    return { isValid: false, message: 'Front-end ratio must be between 20% and 40%', severity: 'error' };
  }
  
  if (value > 28) {
    return { isValid: false, message: 'Front-end ratio above 28% may make qualification difficult', severity: 'warning' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate reserves
 */
export function quickValidateReserves(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return { isValid: false, message: 'Reserves cannot be negative', severity: 'error' };
  }
  
  if (value > 24) {
    return { isValid: false, message: 'Reserves above 24 months seem unusually high', severity: 'warning' };
  }
  
  if (value >= 6) {
    return { isValid: true, message: 'Good amount of reserves', severity: 'success' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate employment type
 */
export function quickValidateEmploymentType(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  const validTypes = ['w2', 'self-employed', 'business-owner', 'retired'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Employment type must be w2, self-employed, business-owner, or retired', severity: 'error' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate income stability
 */
export function quickValidateIncomeStability(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  
  if (value < 0) {
    return { isValid: false, message: 'Income stability cannot be negative', severity: 'error' };
  }
  
  if (value > 20) {
    return { isValid: false, message: 'Income stability above 20 years seems unusually high', severity: 'warning' };
  }
  
  if (value < 2) {
    return { isValid: false, message: 'Income stability below 2 years may affect qualification', severity: 'warning' };
  }
  
  if (value >= 5) {
    return { isValid: true, message: 'Excellent income stability', severity: 'success' };
  }
  
  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validate all inputs
 */
export function quickValidateAllInputs(inputs: Partial<MortgageQualificationInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];
  
  results.push(quickValidateGrossMonthlyIncome(inputs.grossMonthlyIncome));
  results.push(quickValidateMonthlyDebts(inputs.monthlyDebts));
  results.push(quickValidateDownPayment(inputs.downPayment));
  results.push(quickValidateCreditScore(inputs.creditScore));
  results.push(quickValidateInterestRate(inputs.interestRate));
  results.push(quickValidateLoanTerm(inputs.loanTerm));
  results.push(quickValidatePropertyTaxRate(inputs.propertyTaxRate));
  results.push(quickValidateHomeownersInsurance(inputs.homeownersInsurance));
  results.push(quickValidatePmiRate(inputs.pmiRate));
  results.push(quickValidateLoanType(inputs.loanType));
  results.push(quickValidateDtiRatio(inputs.dtiRatio));
  results.push(quickValidateFrontEndRatio(inputs.frontEndRatio));
  results.push(quickValidateReserves(inputs.reserves));
  results.push(quickValidateEmploymentType(inputs.employmentType));
  results.push(quickValidateIncomeStability(inputs.incomeStability));
  
  return results;
}
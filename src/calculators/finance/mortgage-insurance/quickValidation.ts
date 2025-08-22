import { ValidationResult } from '../../../types/calculator';

export function validateHomeValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Home value is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Home value must be a number' };
  if (numValue < 10000) return { isValid: false, message: 'Home value must be at least $10,000' };
  if (numValue > 10000000) return { isValid: false, message: 'Home value cannot exceed $10,000,000' };
  return { isValid: true };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Loan amount is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Loan amount must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Loan amount cannot be negative' };
  if (numValue > 10000000) return { isValid: false, message: 'Loan amount cannot exceed $10,000,000' };
  return { isValid: true };
}

export function validateCurrentLoanBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Current loan balance is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Current loan balance must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Current loan balance cannot be negative' };
  if (numValue > 10000000) return { isValid: false, message: 'Current loan balance cannot exceed $10,000,000' };
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Down payment is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Down payment must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Down payment cannot be negative' };
  if (numValue > 10000000) return { isValid: false, message: 'Down payment cannot exceed $10,000,000' };
  return { isValid: true };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Credit score is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Credit score must be a number' };
  if (numValue < 300) return { isValid: false, message: 'Credit score must be at least 300' };
  if (numValue > 850) return { isValid: false, message: 'Credit score cannot exceed 850' };
  return { isValid: true };
}

export function validateLoanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'Loan type is required' };
  const validOptions = ['conventional', 'fha', 'va', 'usda'];
  if (!validOptions.includes(value)) return { isValid: false, message: 'Invalid loan type option' };
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Loan term is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Loan term must be a number' };
  if (numValue < 1) return { isValid: false, message: 'Loan term must be at least 1 year' };
  if (numValue > 50) return { isValid: false, message: 'Loan term cannot exceed 50 years' };
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Interest rate is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Interest rate must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Interest rate cannot be negative' };
  if (numValue > 20) return { isValid: false, message: 'Interest rate cannot exceed 20%' };
  return { isValid: true };
}

export function validateMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Monthly payment is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Monthly payment must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Monthly payment cannot be negative' };
  if (numValue > 50000) return { isValid: false, message: 'Monthly payment cannot exceed $50,000' };
  return { isValid: true };
}

export function validatePurchaseDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'Purchase date is required' };
  const date = new Date(value);
  if (isNaN(date.getTime())) return { isValid: false, message: 'Invalid purchase date format' };
  const currentDate = new Date();
  if (date > currentDate) return { isValid: false, message: 'Purchase date cannot be in the future' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'Property type is required' };
  const validOptions = ['single-family', 'condo', 'multi-family', 'investment'];
  if (!validOptions.includes(value)) return { isValid: false, message: 'Invalid property type option' };
  return { isValid: true };
}

export function validateOccupancyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'Occupancy type is required' };
  const validOptions = ['primary', 'secondary', 'investment'];
  if (!validOptions.includes(value)) return { isValid: false, message: 'Invalid occupancy type option' };
  return { isValid: true };
}

export function validatePropertyTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Property tax rate is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Property tax rate must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Property tax rate cannot be negative' };
  if (numValue > 10) return { isValid: false, message: 'Property tax rate cannot exceed 10%' };
  return { isValid: true };
}

export function validateHomeownersInsuranceAnnual(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Annual homeowners insurance is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Annual homeowners insurance must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Annual homeowners insurance cannot be negative' };
  if (numValue > 10000) return { isValid: false, message: 'Annual homeowners insurance cannot exceed $10,000' };
  return { isValid: true };
}

export function validateMonthlyPrincipalPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Monthly principal payment is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Monthly principal payment must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Monthly principal payment cannot be negative' };
  if (numValue > 50000) return { isValid: false, message: 'Monthly principal payment cannot exceed $50,000' };
  return { isValid: true };
}

export function validateAdditionalPrincipalPayments(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Additional principal payments are required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Additional principal payments must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Additional principal payments cannot be negative' };
  if (numValue > 50000) return { isValid: false, message: 'Additional principal payments cannot exceed $50,000' };
  return { isValid: true };
}

export function validateHomeImprovements(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Home improvements amount is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Home improvements amount must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Home improvements amount cannot be negative' };
  if (numValue > 1000000) return { isValid: false, message: 'Home improvements amount cannot exceed $1,000,000' };
  return { isValid: true };
}

export function validateMarketAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Market appreciation rate is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Market appreciation rate must be a number' };
  if (numValue < -20) return { isValid: false, message: 'Market appreciation rate cannot be less than -20%' };
  if (numValue > 20) return { isValid: false, message: 'Market appreciation rate cannot exceed 20%' };
  return { isValid: true };
}

export function validateRefinanceHistory(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'Refinance history is required' };
  const validOptions = ['none', 'one', 'multiple'];
  if (!validOptions.includes(value)) return { isValid: false, message: 'Invalid refinance history option' };
  return { isValid: true };
}

export function validatePaymentHistory(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'Payment history is required' };
  const validOptions = ['perfect', 'good', 'fair', 'poor'];
  if (!validOptions.includes(value)) return { isValid: false, message: 'Invalid payment history option' };
  return { isValid: true };
}

export function validateBankruptcyHistory(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'Bankruptcy history is required' };
  const validOptions = ['none', 'chapter7', 'chapter13', 'multiple'];
  if (!validOptions.includes(value)) return { isValid: false, message: 'Invalid bankruptcy history option' };
  return { isValid: true };
}

export function validateForeclosureHistory(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'Foreclosure history is required' };
  const validOptions = ['none', 'one', 'multiple'];
  if (!validOptions.includes(value)) return { isValid: false, message: 'Invalid foreclosure history option' };
  return { isValid: true };
}

export function validateDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Debt-to-income ratio is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Debt-to-income ratio must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Debt-to-income ratio cannot be negative' };
  if (numValue > 100) return { isValid: false, message: 'Debt-to-income ratio cannot exceed 100%' };
  return { isValid: true };
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Annual income is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Annual income must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Annual income cannot be negative' };
  if (numValue > 10000000) return { isValid: false, message: 'Annual income cannot exceed $10,000,000' };
  return { isValid: true };
}

export function validateOtherMonthlyDebts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Other monthly debts are required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Other monthly debts must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Other monthly debts cannot be negative' };
  if (numValue > 50000) return { isValid: false, message: 'Other monthly debts cannot exceed $50,000' };
  return { isValid: true };
}

export function validateState(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'State is required' };
  const validStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
  if (!validStates.includes(value)) return { isValid: false, message: 'Invalid state option' };
  return { isValid: true };
}

export function validateCounty(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'County type is required' };
  const validOptions = ['urban', 'suburban', 'rural'];
  if (!validOptions.includes(value)) return { isValid: false, message: 'Invalid county type option' };
  return { isValid: true };
}

// Consolidated validation function
export function validateAllMortgageInsuranceInputs(inputs: Record<string, any>): ValidationResult[] {
  return [
    validateHomeValue(inputs.homeValue, inputs),
    validateLoanAmount(inputs.loanAmount, inputs),
    validateCurrentLoanBalance(inputs.currentLoanBalance, inputs),
    validateDownPayment(inputs.downPayment, inputs),
    validateCreditScore(inputs.creditScore, inputs),
    validateLoanType(inputs.loanType, inputs),
    validateLoanTerm(inputs.loanTerm, inputs),
    validateInterestRate(inputs.interestRate, inputs),
    validateMonthlyPayment(inputs.monthlyPayment, inputs),
    validatePurchaseDate(inputs.purchaseDate, inputs),
    validatePropertyType(inputs.propertyType, inputs),
    validateOccupancyType(inputs.occupancyType, inputs),
    validatePropertyTaxRate(inputs.propertyTaxRate, inputs),
    validateHomeownersInsuranceAnnual(inputs.homeownersInsuranceAnnual, inputs),
    validateMonthlyPrincipalPayment(inputs.monthlyPrincipalPayment, inputs),
    validateAdditionalPrincipalPayments(inputs.additionalPrincipalPayments, inputs),
    validateHomeImprovements(inputs.homeImprovements, inputs),
    validateMarketAppreciationRate(inputs.marketAppreciationRate, inputs),
    validateRefinanceHistory(inputs.refinanceHistory, inputs),
    validatePaymentHistory(inputs.paymentHistory, inputs),
    validateBankruptcyHistory(inputs.bankruptcyHistory, inputs),
    validateForeclosureHistory(inputs.foreclosureHistory, inputs),
    validateDebtToIncomeRatio(inputs.debtToIncomeRatio, inputs),
    validateAnnualIncome(inputs.annualIncome, inputs),
    validateOtherMonthlyDebts(inputs.otherMonthlyDebts, inputs),
    validateState(inputs.state, inputs),
    validateCounty(inputs.county, inputs)
  ];
}

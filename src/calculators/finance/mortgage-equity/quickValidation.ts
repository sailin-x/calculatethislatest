import { ValidationResult } from '../../types/calculator';

export function validateHomeValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Home value is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Home value must be a number' };
  if (numValue < 10000) return { isValid: false, message: 'Home value must be at least $10,000' };
  if (numValue > 10000000) return { isValid: false, message: 'Home value cannot exceed $10,000,000' };
  return { isValid: true };
}

export function validateOriginalPurchasePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Original purchase price is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Original purchase price must be a number' };
  if (numValue < 10000) return { isValid: false, message: 'Original purchase price must be at least $10,000' };
  if (numValue > 10000000) return { isValid: false, message: 'Original purchase price cannot exceed $10,000,000' };
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

export function validateOriginalLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Original loan amount is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Original loan amount must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Original loan amount cannot be negative' };
  if (numValue > 10000000) return { isValid: false, message: 'Original loan amount cannot exceed $10,000,000' };
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

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Interest rate is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Interest rate must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Interest rate cannot be negative' };
  if (numValue > 20) return { isValid: false, message: 'Interest rate cannot exceed 20%' };
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

export function validateMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Monthly payment is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Monthly payment must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Monthly payment cannot be negative' };
  if (numValue > 50000) return { isValid: false, message: 'Monthly payment cannot exceed $50,000' };
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

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Closing costs are required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Closing costs must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Closing costs cannot be negative' };
  if (numValue > 100000) return { isValid: false, message: 'Closing costs cannot exceed $100,000' };
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

export function validatePmiMonthly(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Monthly PMI is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Monthly PMI must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Monthly PMI cannot be negative' };
  if (numValue > 1000) return { isValid: false, message: 'Monthly PMI cannot exceed $1,000' };
  return { isValid: true };
}

export function validateHelocBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'HELOC balance is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'HELOC balance must be a number' };
  if (numValue < 0) return { isValid: false, message: 'HELOC balance cannot be negative' };
  if (numValue > 1000000) return { isValid: false, message: 'HELOC balance cannot exceed $1,000,000' };
  return { isValid: true };
}

export function validateSecondMortgageBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Second mortgage balance is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Second mortgage balance must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Second mortgage balance cannot be negative' };
  if (numValue > 1000000) return { isValid: false, message: 'Second mortgage balance cannot exceed $1,000,000' };
  return { isValid: true };
}

export function validateOtherLiens(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Other liens amount is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Other liens amount must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Other liens amount cannot be negative' };
  if (numValue > 1000000) return { isValid: false, message: 'Other liens amount cannot exceed $1,000,000' };
  return { isValid: true };
}

export function validateRentalIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Monthly rental income is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Monthly rental income must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Monthly rental income cannot be negative' };
  if (numValue > 50000) return { isValid: false, message: 'Monthly rental income cannot exceed $50,000' };
  return { isValid: true };
}

export function validateRentalExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Monthly rental expenses are required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Monthly rental expenses must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Monthly rental expenses cannot be negative' };
  if (numValue > 50000) return { isValid: false, message: 'Monthly rental expenses cannot exceed $50,000' };
  return { isValid: true };
}

export function validateRefinanceHistory(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'Refinance history is required' };
  const validOptions = ['none', 'one', 'multiple'];
  if (!validOptions.includes(value)) return { isValid: false, message: 'Invalid refinance history option' };
  return { isValid: true };
}

export function validateRefinanceCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Refinance costs are required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Refinance costs must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Refinance costs cannot be negative' };
  if (numValue > 100000) return { isValid: false, message: 'Refinance costs cannot exceed $100,000' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'Property type is required' };
  const validOptions = ['single-family', 'condo', 'multi-family', 'investment'];
  if (!validOptions.includes(value)) return { isValid: false, message: 'Invalid property type option' };
  return { isValid: true };
}

export function validateLocationType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: false, message: 'Location type is required' };
  const validOptions = ['urban', 'suburban', 'rural'];
  if (!validOptions.includes(value)) return { isValid: false, message: 'Invalid location type option' };
  return { isValid: true };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Property age is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Property age must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Property age cannot be negative' };
  if (numValue > 200) return { isValid: false, message: 'Property age cannot exceed 200 years' };
  return { isValid: true };
}

export function validateSquareFootage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Square footage is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Square footage must be a number' };
  if (numValue < 100) return { isValid: false, message: 'Square footage must be at least 100 sq ft' };
  if (numValue > 10000) return { isValid: false, message: 'Square footage cannot exceed 10,000 sq ft' };
  return { isValid: true };
}

export function validateBedrooms(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Number of bedrooms is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Number of bedrooms must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Number of bedrooms cannot be negative' };
  if (numValue > 20) return { isValid: false, message: 'Number of bedrooms cannot exceed 20' };
  return { isValid: true };
}

export function validateBathrooms(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined) return { isValid: false, message: 'Number of bathrooms is required' };
  const numValue = Number(value);
  if (isNaN(numValue)) return { isValid: false, message: 'Number of bathrooms must be a number' };
  if (numValue < 0) return { isValid: false, message: 'Number of bathrooms cannot be negative' };
  if (numValue > 20) return { isValid: false, message: 'Number of bathrooms cannot exceed 20' };
  return { isValid: true };
}

// Consolidated validation function
export function validateAllMortgageEquityInputs(inputs: Record<string, any>): ValidationResult[] {
  return [
    validateHomeValue(inputs.homeValue, inputs),
    validateOriginalPurchasePrice(inputs.originalPurchasePrice, inputs),
    validatePurchaseDate(inputs.purchaseDate, inputs),
    validateOriginalLoanAmount(inputs.originalLoanAmount, inputs),
    validateCurrentLoanBalance(inputs.currentLoanBalance, inputs),
    validateInterestRate(inputs.interestRate, inputs),
    validateLoanTerm(inputs.loanTerm, inputs),
    validateMonthlyPayment(inputs.monthlyPayment, inputs),
    validatePropertyTaxRate(inputs.propertyTaxRate, inputs),
    validateHomeownersInsuranceAnnual(inputs.homeownersInsuranceAnnual, inputs),
    validateHomeImprovements(inputs.homeImprovements, inputs),
    validateMarketAppreciationRate(inputs.marketAppreciationRate, inputs),
    validateClosingCosts(inputs.closingCosts, inputs),
    validateDownPayment(inputs.downPayment, inputs),
    validatePmiMonthly(inputs.pmiMonthly, inputs),
    validateHelocBalance(inputs.helocBalance, inputs),
    validateSecondMortgageBalance(inputs.secondMortgageBalance, inputs),
    validateOtherLiens(inputs.otherLiens, inputs),
    validateRentalIncome(inputs.rentalIncome, inputs),
    validateRentalExpenses(inputs.rentalExpenses, inputs),
    validateRefinanceHistory(inputs.refinanceHistory, inputs),
    validateRefinanceCosts(inputs.refinanceCosts, inputs),
    validatePropertyType(inputs.propertyType, inputs),
    validateLocationType(inputs.locationType, inputs),
    validatePropertyAge(inputs.propertyAge, inputs),
    validateSquareFootage(inputs.squareFootage, inputs),
    validateBedrooms(inputs.bedrooms, inputs),
    validateBathrooms(inputs.bathrooms, inputs)
  ];
}

import { CalculatorInputs } from '../../types/calculator';

// Real-time validation functions for immediate feedback
export function validateLoanAmount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan amount is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan amount must be a valid number' };
  }
  
  if (numValue < 100000) {
    return { isValid: false, message: 'Loan amount must be at least $100,000' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $100,000,000' };
  }
  
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Interest rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Interest rate must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Interest rate must be at least 1%' };
  }
  
  if (numValue > 20) {
    return { isValid: false, message: 'Interest rate cannot exceed 20%' };
  }
  
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan term is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan term must be a valid number' };
  }
  
  if (numValue < 5) {
    return { isValid: false, message: 'Loan term must be at least 5 years' };
  }
  
  if (numValue > 30) {
    return { isValid: false, message: 'Loan term cannot exceed 30 years' };
  }
  
  return { isValid: true };
}

export function validateBalloonPayment(value: any, loanAmount?: number, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Balloon payment is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Balloon payment must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Balloon payment cannot be negative' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Balloon payment cannot exceed $100,000,000' };
  }
  
  if (loanAmount && numValue > loanAmount) {
    return { isValid: false, message: 'Balloon payment cannot exceed loan amount' };
  }
  
  return { isValid: true };
}

export function validatePrepaymentPenalty(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Prepayment penalty is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Prepayment penalty must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Prepayment penalty cannot be negative' };
  }
  
  if (numValue > 10) {
    return { isValid: false, message: 'Prepayment penalty cannot exceed 10%' };
  }
  
  return { isValid: true };
}

export function validateOriginationFee(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Origination fee is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Origination fee must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Origination fee cannot be negative' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Origination fee cannot exceed $100,000' };
  }
  
  return { isValid: true };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Closing costs is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Closing costs must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Closing costs cannot be negative' };
  }
  
  if (numValue > 500000) {
    return { isValid: false, message: 'Closing costs cannot exceed $500,000' };
  }
  
  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property value must be a valid number' };
  }
  
  if (numValue < 100000) {
    return { isValid: false, message: 'Property value must be at least $100,000' };
  }
  
  if (numValue > 100000000) {
    return { isValid: false, message: 'Property value cannot exceed $100,000,000' };
  }
  
  return { isValid: true };
}

export function validateLoanToValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan-to-value ratio is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan-to-value ratio must be a valid number' };
  }
  
  if (numValue < 10) {
    return { isValid: false, message: 'Loan-to-value ratio must be at least 10%' };
  }
  
  if (numValue > 95) {
    return { isValid: false, message: 'Loan-to-value ratio cannot exceed 95%' };
  }
  
  return { isValid: true };
}

export function validateDebtServiceCoverage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Debt service coverage ratio is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Debt service coverage ratio must be a valid number' };
  }
  
  if (numValue < 1.0) {
    return { isValid: false, message: 'Debt service coverage ratio must be at least 1.0' };
  }
  
  if (numValue > 3.0) {
    return { isValid: false, message: 'Debt service coverage ratio cannot exceed 3.0' };
  }
  
  return { isValid: true };
}

export function validateAnnualNOI(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Annual NOI is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Annual NOI must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Annual NOI cannot be negative' };
  }
  
  if (numValue > 10000000) {
    return { isValid: false, message: 'Annual NOI cannot exceed $10,000,000' };
  }
  
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Tax rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Tax rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Tax rate cannot be negative' };
  }
  
  if (numValue > 50) {
    return { isValid: false, message: 'Tax rate cannot exceed 50%' };
  }
  
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Inflation rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Inflation rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Inflation rate cannot be negative' };
  }
  
  if (numValue > 10) {
    return { isValid: false, message: 'Inflation rate cannot exceed 10%' };
  }
  
  return { isValid: true };
}

export function validateAppreciationRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Appreciation rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Appreciation rate must be a valid number' };
  }
  
  if (numValue < -10) {
    return { isValid: false, message: 'Appreciation rate cannot be less than -10%' };
  }
  
  if (numValue > 15) {
    return { isValid: false, message: 'Appreciation rate cannot exceed 15%' };
  }
  
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['office', 'retail', 'warehouse', 'restaurant', 'hotel', 'medical', 'manufacturing', 'mixed-use', 'apartment', 'self-storage'];
  
  if (!value) {
    return { isValid: false, message: 'Property type is required' };
  }
  
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid property type' };
  }
  
  return { isValid: true };
}

export function validatePaymentFrequency(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validFrequencies = ['weekly', 'biweekly', 'monthly', 'quarterly', 'annually'];
  
  if (!value) {
    return { isValid: false, message: 'Payment frequency is required' };
  }
  
  if (!validFrequencies.includes(value)) {
    return { isValid: false, message: 'Please select a valid payment frequency' };
  }
  
  return { isValid: true };
}

export function validateStartDate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Start date is required' };
  }
  
  if (typeof value !== 'string') {
    return { isValid: false, message: 'Start date must be a string' };
  }
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    return { isValid: false, message: 'Start date must be in YYYY-MM-DD format' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Start date must be a valid date' };
  }
  
  return { isValid: true };
}

// Comprehensive validation for all inputs
export function validateAllAmortizationInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate required fields
  const loanAmountValidation = validateLoanAmount(inputs.loanAmount);
  if (!loanAmountValidation.isValid) {
    errors.push(loanAmountValidation.message!);
  }
  
  const interestRateValidation = validateInterestRate(inputs.interestRate);
  if (!interestRateValidation.isValid) {
    errors.push(interestRateValidation.message!);
  }
  
  const loanTermValidation = validateLoanTerm(inputs.loanTerm);
  if (!loanTermValidation.isValid) {
    errors.push(loanTermValidation.message!);
  }
  
  const balloonPaymentValidation = validateBalloonPayment(inputs.balloonPayment, inputs.loanAmount as number);
  if (!balloonPaymentValidation.isValid) {
    errors.push(balloonPaymentValidation.message!);
  }
  
  const prepaymentPenaltyValidation = validatePrepaymentPenalty(inputs.prepaymentPenalty);
  if (!prepaymentPenaltyValidation.isValid) {
    errors.push(prepaymentPenaltyValidation.message!);
  }
  
  const originationFeeValidation = validateOriginationFee(inputs.originationFee);
  if (!originationFeeValidation.isValid) {
    errors.push(originationFeeValidation.message!);
  }
  
  const closingCostsValidation = validateClosingCosts(inputs.closingCosts);
  if (!closingCostsValidation.isValid) {
    errors.push(closingCostsValidation.message!);
  }
  
  const propertyValueValidation = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueValidation.isValid) {
    errors.push(propertyValueValidation.message!);
  }
  
  const loanToValueValidation = validateLoanToValue(inputs.loanToValue);
  if (!loanToValueValidation.isValid) {
    errors.push(loanToValueValidation.message!);
  }
  
  const debtServiceCoverageValidation = validateDebtServiceCoverage(inputs.debtServiceCoverage);
  if (!debtServiceCoverageValidation.isValid) {
    errors.push(debtServiceCoverageValidation.message!);
  }
  
  const annualNOIValidation = validateAnnualNOI(inputs.annualNOI);
  if (!annualNOIValidation.isValid) {
    errors.push(annualNOIValidation.message!);
  }
  
  const taxRateValidation = validateTaxRate(inputs.taxRate);
  if (!taxRateValidation.isValid) {
    errors.push(taxRateValidation.message!);
  }
  
  const inflationRateValidation = validateInflationRate(inputs.inflationRate);
  if (!inflationRateValidation.isValid) {
    errors.push(inflationRateValidation.message!);
  }
  
  const appreciationRateValidation = validateAppreciationRate(inputs.appreciationRate);
  if (!appreciationRateValidation.isValid) {
    errors.push(appreciationRateValidation.message!);
  }
  
  const propertyTypeValidation = validatePropertyType(inputs.propertyType);
  if (!propertyTypeValidation.isValid) {
    errors.push(propertyTypeValidation.message!);
  }
  
  const paymentFrequencyValidation = validatePaymentFrequency(inputs.paymentFrequency);
  if (!paymentFrequencyValidation.isValid) {
    errors.push(paymentFrequencyValidation.message!);
  }
  
  const startDateValidation = validateStartDate(inputs.startDate);
  if (!startDateValidation.isValid) {
    errors.push(startDateValidation.message!);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

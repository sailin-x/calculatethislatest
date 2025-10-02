import { ValidationResult } from '../../types/calculator';
import { MortgageQualificationInputs } from './types';

export function validateMortgageQualificationInputs(inputs: MortgageQualificationInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Required field validations
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.borrowerIncome = 'Borrower income is required and must be greater than 0';
  }

  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.borrowerCreditScore = 'Borrower credit score must be between 300 and 850';
  }

  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value is required and must be greater than 0';
  }

  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.loanAmount = 'Loan amount is required and must be greater than 0';
  }

  if (!inputs.interestRate || inputs.interestRate <= 0 || inputs.interestRate > 20) {
    errors.interestRate = 'Interest rate must be between 0.1% and 20%';
  }

  if (!inputs.loanTerm || inputs.loanTerm < 5 || inputs.loanTerm > 50) {
    errors.loanTerm = 'Loan term must be between 5 and 50 years';
  }

  if (!inputs.downPayment || inputs.downPayment < 0) {
    errors.downPayment = 'Down payment cannot be negative';
  }

  // Business logic validations
  if (inputs.loanAmount > inputs.propertyValue) {
    errors.loanAmount = 'Loan amount cannot exceed property value';
  }

  if (inputs.downPayment >= inputs.propertyValue) {
    errors.downPayment = 'Down payment cannot equal or exceed property value';
  }

  // Co-borrower validations (if provided)
  if (inputs.coBorrowerIncome && inputs.coBorrowerIncome < 0) {
    errors.coBorrowerIncome = 'Co-borrower income cannot be negative';
  }

  if (inputs.coBorrowerCreditScore && (inputs.coBorrowerCreditScore < 300 || inputs.coBorrowerCreditScore > 850)) {
    errors.coBorrowerCreditScore = 'Co-borrower credit score must be between 300 and 850';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateMortgageQualificationBusinessRules(inputs: MortgageQualificationInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Loan-to-value ratio validation
  const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (ltvRatio > 97) {
    errors.loanAmount = 'Loan-to-value ratio cannot exceed 97% for most conventional loans';
  }

  // Minimum down payment validation
  const downPaymentPercent = (inputs.downPayment / inputs.propertyValue) * 100;
  if (downPaymentPercent < 3) {
    errors.downPayment = 'Minimum down payment is typically 3% for conventional loans';
  }

  // FHA loan specific validations
  if (inputs.loanType === 'fha') {
    if (downPaymentPercent < 3.5) {
      errors.downPayment = 'FHA loans require minimum 3.5% down payment';
    }
    if (ltvRatio > 96.5) {
      errors.loanAmount = 'FHA loans cannot exceed 96.5% LTV';
    }
  }

  // VA loan specific validations
  if (inputs.loanType === 'va') {
    if (ltvRatio > 100) {
      errors.loanAmount = 'VA loans cannot exceed 100% LTV';
    }
  }

  // USDA loan specific validations
  if (inputs.loanType === 'usda') {
    if (ltvRatio > 100) {
      errors.loanAmount = 'USDA loans cannot exceed 100% LTV';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
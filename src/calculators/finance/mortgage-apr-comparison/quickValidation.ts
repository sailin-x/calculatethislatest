import { ValidationResult } from '../../types/calculator';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 10000) {
    return { isValid: false, errors: { loanAmount: 'Loan amount must be at least $10,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { loanAmount: 'Loan amount cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be greater than 0%' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { interestRate: 'Interest rate cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, errors: { closingCosts: 'Closing costs cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { closingCosts: 'Closing costs cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePoints(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, errors: { points: 'Points cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { points: 'Points cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOfferName(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, errors: { offerName: 'Offer name is required' } };
  }
  if (value.length > 50) {
    return { isValid: false, errors: { offerName: 'Offer name cannot exceed 50 characters' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTerms = ['15', '20', '30'];
  if (!validTerms.includes(value)) {
    return { isValid: false, errors: { loanTerm: 'Loan term must be 15, 20, or 30 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAllMortgageAPRComparisonInputs(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate required fields
  if (!allInputs?.homePrice) {
    errors.homePrice = 'Home price is required';
  }
  if (!allInputs?.downPayment) {
    errors.downPayment = 'Down payment is required';
  }
  if (!allInputs?.loanTerm) {
    errors.loanTerm = 'Loan term is required';
  }

  // Validate interest rates for all three offers
  for (let i = 1; i <= 3; i++) {
    const rateKey = `interestRate${i}`;
    const rate = allInputs?.[rateKey];
    if (rate !== undefined && rate !== null && rate !== '') {
      if (rate <= 0) {
        errors[rateKey] = `Interest rate ${i} must be greater than 0%`;
      } else if (rate > 30) {
        errors[rateKey] = `Interest rate ${i} cannot exceed 30%`;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

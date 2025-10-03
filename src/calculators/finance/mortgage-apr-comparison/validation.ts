import { ValidationResult } from '../../../types/calculator';

export function validateLoanAmount(value: number): ValidationResult {
  if (value < 10000) {
    return { isValid: false, errors: { loanAmount: 'Loan amount must be at least $10,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { loanAmount: 'Loan amount cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: number): ValidationResult {
  if (value <= 0) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be greater than 0%' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { interestRate: 'Interest rate cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateClosingCosts(value: number): ValidationResult {
  if (value < 0) {
    return { isValid: false, errors: { closingCosts: 'Closing costs cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { closingCosts: 'Closing costs cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePoints(value: number): ValidationResult {
  if (value < 0) {
    return { isValid: false, errors: { points: 'Points cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { points: 'Points cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOfferName(value: string): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, errors: { offerName: 'Offer name is required' } };
  }
  if (value.length > 50) {
    return { isValid: false, errors: { offerName: 'Offer name cannot exceed 50 characters' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLoanTerm(value: string): ValidationResult {
  const validTerms = ['15', '20', '30'];
  if (!validTerms.includes(value)) {
    return { isValid: false, errors: { loanTerm: 'Loan term must be 15, 20, or 30 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMortgageAPRComparisonInputs(inputs: any): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Validate loan amount
  results.push(validateLoanAmount(inputs.loanAmount));

  // Validate loan term
  results.push(validateLoanTerm(inputs.loanTerm));

  // Validate offer 1
  results.push(validateOfferName(inputs.offer1Name));
  results.push(validateInterestRate(inputs.offer1InterestRate));
  results.push(validateClosingCosts(inputs.offer1ClosingCosts));
  results.push(validatePoints(inputs.offer1Points));

  // Validate offer 2
  results.push(validateOfferName(inputs.offer2Name));
  results.push(validateInterestRate(inputs.offer2InterestRate));
  results.push(validateClosingCosts(inputs.offer2ClosingCosts));
  results.push(validatePoints(inputs.offer2Points));

  // Validate offer 3 (optional)
  if (inputs.offer3Name) {
    results.push(validateOfferName(inputs.offer3Name));
    if (inputs.offer3InterestRate !== undefined) {
      results.push(validateInterestRate(inputs.offer3InterestRate));
    }
    if (inputs.offer3ClosingCosts !== undefined) {
      results.push(validateClosingCosts(inputs.offer3ClosingCosts));
    }
    if (inputs.offer3Points !== undefined) {
      results.push(validatePoints(inputs.offer3Points));
    }
  }

  return results;
}

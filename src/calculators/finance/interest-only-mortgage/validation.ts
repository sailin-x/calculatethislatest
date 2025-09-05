import { InterestOnlyMortgageInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateInterestOnlyMortgageInputs(inputs: InterestOnlyMortgageInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Loan amount validation
  if (!inputs.loanAmount || inputs.loanAmount < 50000) {
    errors.push('Loan amount must be at least $50,000');
  }
  if (inputs.loanAmount > 10000000) {
    errors.push('Loan amount cannot exceed $10,000,000');
  }

  // Interest rate validation
  if (inputs.interestRate < 0 || inputs.interestRate > 0.5) {
    errors.push('Interest rate must be between 0% and 50%');
  }

  // Interest-only period validation
  if (inputs.interestOnlyPeriod < 1) {
    errors.push('Interest-only period must be at least 1 year');
  }
  if (inputs.interestOnlyPeriod > 30) {
    errors.push('Interest-only period cannot exceed 30 years');
  }

  // Total loan term validation
  if (inputs.totalLoanTerm < inputs.interestOnlyPeriod) {
    errors.push('Total loan term must be greater than interest-only period');
  }
  if (inputs.totalLoanTerm > 50) {
    errors.push('Total loan term cannot exceed 50 years');
  }

  // Property value validation
  if (!inputs.propertyValue || inputs.propertyValue < 100000) {
    errors.push('Property value must be at least $100,000');
  }

  // Property address validation
  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length < 10) {
    errors.push('Property address is required and must be at least 10 characters');
  }

  // Down payment validation
  if (inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }
  if (inputs.downPayment > inputs.propertyValue) {
    errors.push('Down payment cannot exceed property value');
  }

  // Loan-to-value ratio validation
  if (inputs.loanToValueRatio < 0 || inputs.loanToValueRatio > 1) {
    errors.push('Loan-to-value ratio must be between 0% and 100%');
  }

  // Debt-to-income ratio validation
  if (inputs.debtToIncomeRatio < 0 || inputs.debtToIncomeRatio > 1) {
    errors.push('Debt-to-income ratio must be between 0% and 100%');
  }

  // Payment validation
  if (inputs.interestOnlyPayment < 0) {
    errors.push('Interest-only payment cannot be negative');
  }

  if (inputs.principalAndInterestPayment < 0) {
    errors.push('Principal and interest payment cannot be negative');
  }

  if (inputs.totalMonthlyPayment < 0) {
    errors.push('Total monthly payment cannot be negative');
  }

  // Additional costs validation
  if (inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  }

  if (inputs.homeownersInsurance < 0) {
    errors.push('Homeowners insurance cannot be negative');
  }

  if (inputs.privateMortgageInsurance < 0) {
    errors.push('Private mortgage insurance cannot be negative');
  }

  if (inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  }

  if (inputs.otherMonthlyExpenses < 0) {
    errors.push('Other monthly expenses cannot be negative');
  }

  // Refinancing validation
  if (inputs.refinanceAfterInterestOnly) {
    if (inputs.refinanceRate < 0 || inputs.refinanceRate > 0.5) {
      errors.push('Refinance rate must be between 0% and 50%');
    }

    if (inputs.refinanceTerm < 1 || inputs.refinanceTerm > 50) {
      errors.push('Refinance term must be between 1 and 50 years');
    }
  }

  // Investment analysis validation
  if (inputs.expectedPropertyAppreciation < -0.2 || inputs.expectedPropertyAppreciation > 0.5) {
    errors.push('Expected property appreciation must be between -20% and 50%');
  }

  if (inputs.rentalIncome < 0) {
    errors.push('Rental income cannot be negative');
  }

  if (inputs.taxDeductionBenefit < 0) {
    errors.push('Tax deduction benefit cannot be negative');
  }

  if (inputs.opportunityCost < 0 || inputs.opportunityCost > 1) {
    errors.push('Opportunity cost must be between 0% and 100%');
  }

  // Warnings
  if (inputs.interestOnlyPeriod > 10) {
    warnings.push('Interest-only period over 10 years increases payment shock risk');
  }

  if (inputs.debtToIncomeRatio > 0.4) {
    warnings.push('Debt-to-income ratio above 40% may limit borrowing capacity');
  }

  if (inputs.loanToValueRatio > 0.8) {
    warnings.push('Loan-to-value ratio above 80% may require PMI');
  }

  if (inputs.creditScore === 'poor' || inputs.creditScore === 'fair') {
    warnings.push('Lower credit score may result in higher interest rates');
  }

  if (inputs.loanType === 'adjustable') {
    warnings.push('Adjustable rate mortgages carry interest rate risk');
  }

  if (inputs.interestOnlyPeriod >= inputs.totalLoanTerm * 0.5) {
    warnings.push('Interest-only period is more than half of total loan term');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

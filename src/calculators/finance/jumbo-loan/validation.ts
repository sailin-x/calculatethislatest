import { JumboLoanInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateJumboLoanInputs(inputs: JumboLoanInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Loan amount validation
  if (!inputs.loanAmount || inputs.loanAmount < 100000) {
    errors.push('Loan amount must be at least $100,000');
  }
  if (inputs.loanAmount > 50000000) {
    errors.push('Loan amount cannot exceed $50,000,000');
  }

  // Interest rate validation
  if (inputs.interestRate < 0 || inputs.interestRate > 0.5) {
    errors.push('Interest rate must be between 0% and 50%');
  }

  // Loan term validation
  if (inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 1 and 50 years');
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

  // Property value validation
  if (!inputs.propertyValue || inputs.propertyValue < 100000) {
    errors.push('Property value must be at least $100,000');
  }

  // Property address validation
  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length < 10) {
    errors.push('Property address is required and must be at least 10 characters');
  }

  // Debt-to-income ratio validation
  if (inputs.debtToIncomeRatio < 0 || inputs.debtToIncomeRatio > 1) {
    errors.push('Debt-to-income ratio must be between 0% and 100%');
  }

  // Annual income validation
  if (!inputs.annualIncome || inputs.annualIncome < 50000) {
    errors.push('Annual income must be at least $50,000');
  }

  // Employment length validation
  if (inputs.employmentLength < 0) {
    errors.push('Employment length cannot be negative');
  }

  // Liquid assets validation
  if (inputs.liquidAssets < 0) {
    errors.push('Liquid assets cannot be negative');
  }

  // Reserves validation
  if (inputs.reserves < 0) {
    errors.push('Reserves cannot be negative');
  }

  // Other properties validation
  if (inputs.otherProperties < 0) {
    errors.push('Other properties cannot be negative');
  }

  // Existing debt validation
  if (inputs.existingDebt < 0) {
    errors.push('Existing debt cannot be negative');
  }

  // Conforming limit validation
  if (!inputs.conformingLimit || inputs.conformingLimit < 100000) {
    errors.push('Conforming limit must be at least $100,000');
  }

  // Jumbo premium validation
  if (inputs.jumboPremium < 0 || inputs.jumboPremium > 0.1) {
    errors.push('Jumbo premium must be between 0% and 10%');
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

  // Interest-only period validation
  if (inputs.interestOnlyOption && inputs.interestOnlyPeriod < 1) {
    errors.push('Interest-only period must be at least 1 year');
  }

  if (inputs.interestOnlyOption && inputs.interestOnlyPeriod > inputs.loanTerm) {
    errors.push('Interest-only period cannot exceed loan term');
  }

  // Prepayment penalty period validation
  if (inputs.prepaymentPenalty && inputs.prepaymentPenaltyPeriod < 1) {
    errors.push('Prepayment penalty period must be at least 1 year');
  }

  if (inputs.prepaymentPenalty && inputs.prepaymentPenaltyPeriod > inputs.loanTerm) {
    errors.push('Prepayment penalty period cannot exceed loan term');
  }

  // Rate lock period validation
  if (inputs.rateLockPeriod < 0 || inputs.rateLockPeriod > 365) {
    errors.push('Rate lock period must be between 0 and 365 days');
  }

  // Qualification requirements validation
  if (inputs.minimumCreditScore < 300 || inputs.minimumCreditScore > 850) {
    errors.push('Minimum credit score must be between 300 and 850');
  }

  if (inputs.maximumDTI < 0 || inputs.maximumDTI > 1) {
    errors.push('Maximum DTI must be between 0% and 100%');
  }

  if (inputs.minimumReserves < 0) {
    errors.push('Minimum reserves cannot be negative');
  }

  if (inputs.maximumLTV < 0 || inputs.maximumLTV > 1) {
    errors.push('Maximum LTV must be between 0% and 100%');
  }

  // Warnings
  if (inputs.loanAmount > inputs.conformingLimit * 2) {
    warnings.push('Loan amount significantly exceeds conforming limit');
  }

  if (inputs.debtToIncomeRatio > 0.43) {
    warnings.push('Debt-to-income ratio above 43% may limit options');
  }

  if (inputs.loanToValueRatio > 0.90) {
    warnings.push('Loan-to-value ratio above 90% may require additional documentation');
  }

  if (inputs.creditScore === 'poor' || inputs.creditScore === 'fair') {
    warnings.push('Lower credit score may result in higher rates');
  }

  if (inputs.employmentType === 'self_employed' || inputs.employmentType === 'business_owner') {
    warnings.push('Self-employed or business owner may require additional documentation');
  }

  if (inputs.reserves < 6) {
    warnings.push('Reserves below 6 months may limit options');
  }

  if (inputs.loanType === 'adjustable') {
    warnings.push('Adjustable rate mortgages carry interest rate risk');
  }

  if (inputs.jumboPremium > 0.05) {
    warnings.push('High jumbo premium may impact affordability');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

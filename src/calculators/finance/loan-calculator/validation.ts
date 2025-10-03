import { LoanCalculatorInputs } from './types';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
}

/**
 * Validate loan calculator inputs for required fields and basic constraints
 */
export function validateLoanCalculatorInputs(inputs: LoanCalculatorInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Loan Amount Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount must be greater than 0' });
  }
  if (inputs.loanAmount && inputs.loanAmount > 10000000) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed $10,000,000' });
  }

  // Interest Rate Validation
  if (inputs.interestRate === undefined || inputs.interestRate === null) {
    errors.push({ field: 'interestRate', message: 'Interest rate is required' });
  }
  if (inputs.interestRate !== undefined && (inputs.interestRate < 0 || inputs.interestRate > 50)) {
    errors.push({ field: 'interestRate', message: 'Interest rate must be between 0% and 50%' });
  }

  // Loan Term Validation
  if (!inputs.loanTerm || inputs.loanTerm < 1) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be at least 1 year' });
  }
  if (inputs.loanTerm && inputs.loanTerm > 50) {
    errors.push({ field: 'loanTerm', message: 'Loan term cannot exceed 50 years' });
  }

  // Payment Frequency Validation
  const validFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
  if (!inputs.paymentFrequency || !validFrequencies.includes(inputs.paymentFrequency)) {
    errors.push({
      field: 'paymentFrequency',
      message: 'Payment frequency must be monthly, quarterly, semi-annually, or annually'
    });
  }

  // Loan Type Validation
  const validLoanTypes = ['personal', 'business', 'student', 'auto', 'other'];
  if (inputs.loanType && !validLoanTypes.includes(inputs.loanType)) {
    errors.push({
      field: 'loanType',
      message: 'Loan type must be personal, business, student, auto, or other'
    });
  }

  // Extra Payment Validation
  if (inputs.extraPayment && inputs.extraPayment < 0) {
    errors.push({ field: 'extraPayment', message: 'Extra payment cannot be negative' });
  }
  if (inputs.extraPayment && inputs.loanAmount && inputs.extraPayment >= inputs.loanAmount) {
    errors.push({ field: 'extraPayment', message: 'Extra payment cannot be greater than or equal to loan amount' });
  }

  return errors;
}

/**
 * Validate loan calculator business rules and provide warnings
 */
export function validateLoanCalculatorBusinessRules(inputs: LoanCalculatorInputs): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  // High interest rate warning
  if (inputs.interestRate && inputs.interestRate > 15) {
    warnings.push({
      field: 'interestRate',
      message: 'High interest rate may indicate increased risk - consider shopping for better terms'
    });
  }

  // Long loan term warning
  if (inputs.loanTerm && inputs.loanTerm > 20) {
    warnings.push({
      field: 'loanTerm',
      message: 'Long loan terms increase total interest paid over time'
    });
  }

  // Annual payment frequency warning
  if (inputs.paymentFrequency === 'annually') {
    warnings.push({
      field: 'paymentFrequency',
      message: 'Annual payments may create cash flow challenges - consider more frequent payments'
    });
  }

  // High loan amount relative to typical loans
  if (inputs.loanAmount && inputs.loanAmount > 500000) {
    warnings.push({
      field: 'loanAmount',
      message: 'Large loan amounts may require additional documentation and approval processes'
    });
  }

  // Zero interest rate with long term
  if (inputs.interestRate === 0 && inputs.loanTerm && inputs.loanTerm > 5) {
    warnings.push({
      field: 'interestRate',
      message: 'Zero interest rate loans are typically short-term promotional offers'
    });
  }

  // Extra payment recommendations
  if (inputs.extraPayment && inputs.extraPayment > 0) {
    const recommendedExtra = inputs.loanAmount * 0.01; // 1% of loan amount
    if (inputs.extraPayment < recommendedExtra) {
      warnings.push({
        field: 'extraPayment',
        message: `Consider increasing extra payments to at least $${recommendedExtra.toFixed(2)} for meaningful savings`
      });
    }
  }

  // Loan type specific warnings
  if (inputs.loanType === 'student' && inputs.loanAmount && inputs.loanAmount > 100000) {
    warnings.push({
      field: 'loanAmount',
      message: 'Student loan limits may apply - check eligibility requirements'
    });
  }

  if (inputs.loanType === 'personal' && inputs.loanAmount && inputs.loanAmount > 50000) {
    warnings.push({
      field: 'loanAmount',
      message: 'Personal loans typically have lower limits - consider business loan options'
    });
  }

  return warnings;
}

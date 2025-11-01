import { AmortizationScheduleInputs } from './types';

export function validateAmortizationScheduleInputs(inputs: AmortizationScheduleInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate loan amount
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount must be greater than 0' });
  }
  if (inputs.loanAmount && inputs.loanAmount > 10000000) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed $10,000,000' });
  }

  // Validate annual interest rate
  if (inputs.annualInterestRate === undefined || inputs.annualInterestRate < 0) {
    errors.push({ field: 'annualInterestRate', message: 'Annual interest rate cannot be negative' });
  }
  if (inputs.annualInterestRate && inputs.annualInterestRate > 50) {
    errors.push({ field: 'annualInterestRate', message: 'Annual interest rate seems unusually high (>50%)' });
  }

  // Validate loan term
  if (!inputs.loanTermYears || inputs.loanTermYears <= 0) {
    errors.push({ field: 'loanTermYears', message: 'Loan term must be greater than 0 years' });
  }
  if (inputs.loanTermYears && inputs.loanTermYears > 50) {
    errors.push({ field: 'loanTermYears', message: 'Loan term cannot exceed 50 years' });
  }

  // Validate start date if provided
  if (inputs.startDate) {
    const startDate = new Date(inputs.startDate);
    const now = new Date();
    if (isNaN(startDate.getTime())) {
      errors.push({ field: 'startDate', message: 'Start date must be a valid date' });
    } else if (startDate < new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())) {
      errors.push({ field: 'startDate', message: 'Start date cannot be more than 1 year in the past' });
    }
  }

  // Validate extra payment if provided
  if (inputs.extraPayment !== undefined && inputs.extraPayment < 0) {
    errors.push({ field: 'extraPayment', message: 'Extra payment cannot be negative' });
  }
  if (inputs.extraPayment && inputs.loanAmount && inputs.extraPayment > inputs.loanAmount) {
    errors.push({ field: 'extraPayment', message: 'Extra payment cannot exceed loan amount' });
  }

  return errors;
}

export function validateAmortizationScheduleBusinessRules(inputs: AmortizationScheduleInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business rule validations
  if (inputs.annualInterestRate && inputs.annualInterestRate > 10) {
    warnings.push({
      field: 'annualInterestRate',
      message: 'High interest rate may indicate reviewing loan terms or considering refinancing'
    });
  }

  if (inputs.loanTermYears && inputs.loanTermYears > 30) {
    warnings.push({
      field: 'loanTermYears',
      message: 'Long loan terms increase total interest paid over time'
    });
  }

  if (inputs.extraPayment && inputs.extraPayment > 0) {
    warnings.push({
      field: 'extraPayment',
      message: 'Extra payments will reduce total interest and shorten loan term'
    });
  }

  if (inputs.loanAmount && inputs.annualInterestRate && inputs.loanTermYears) {
    const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.annualInterestRate, inputs.loanTermYears);
    const totalPayments = monthlyPayment * inputs.loanTermYears * 12;
    const totalInterest = totalPayments - inputs.loanAmount;

    if (totalInterest > inputs.loanAmount * 2) {
      warnings.push({
        field: 'loanTermYears',
        message: 'Total interest exceeds loan amount - consider shorter term or lower amount'
      });
    }
  }

  return warnings;
}

// Helper function for business rules validation
function calculateMonthlyPayment(loanAmount: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 12 / 100;
  const payments = years * 12;

  if (monthlyRate === 0) return loanAmount / payments;

  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, payments)) /
         (Math.pow(1 + monthlyRate, payments) - 1);
}
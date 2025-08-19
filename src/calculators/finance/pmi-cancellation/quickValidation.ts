import { QuickValidationResult } from '../../../types/calculator';
import { PMICancellationInputs } from './formulas';

export function quickValidateOriginalLoanAmount(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Original Loan Amount is required', severity: 'error' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Original Loan Amount must be positive', severity: 'error' };
  }
  if (value < 50000) {
    return { isValid: true, message: 'Original Loan Amount seems low for typical mortgage', severity: 'warning' };
  }
  if (value > 2000000) {
    return { isValid: true, message: 'Original Loan Amount seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateCurrentBalance(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Current Loan Balance is required', severity: 'error' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Current Loan Balance must be non-negative', severity: 'error' };
  }
  if (value === 0) {
    return { isValid: true, message: 'Loan appears to be paid off', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateOriginalHomeValue(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Original Home Value is required', severity: 'error' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Original Home Value must be positive', severity: 'error' };
  }
  if (value < 50000) {
    return { isValid: true, message: 'Original Home Value seems low', severity: 'warning' };
  }
  if (value > 5000000) {
    return { isValid: true, message: 'Original Home Value seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateCurrentHomeValue(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Current Home Value is required', severity: 'error' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Current Home Value must be positive', severity: 'error' };
  }
  if (value < 50000) {
    return { isValid: true, message: 'Current Home Value seems low', severity: 'warning' };
  }
  if (value > 5000000) {
    return { isValid: true, message: 'Current Home Value seems unusually high', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateDownPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Original Down Payment is required', severity: 'error' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Original Down Payment must be non-negative', severity: 'error' };
  }
  if (value === 0) {
    return { isValid: true, message: 'No down payment - may indicate special loan program', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateLoanTerm(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Loan Term is required', severity: 'error' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Loan Term must be positive', severity: 'error' };
  }
  if (value < 15) {
    return { isValid: true, message: 'Short loan term - faster equity building', severity: 'success' };
  }
  if (value > 40) {
    return { isValid: true, message: 'Long loan term - slower equity building', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateInterestRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Interest Rate is required', severity: 'error' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Interest Rate must be positive', severity: 'error' };
  }
  if (value < 2) {
    return { isValid: true, message: 'Very low interest rate', severity: 'success' };
  }
  if (value > 10) {
    return { isValid: true, message: 'High interest rate - consider refinancing', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateMonthlyPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Monthly Payment is required', severity: 'error' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Monthly Payment must be positive', severity: 'error' };
  }
  if (value < 500) {
    return { isValid: true, message: 'Monthly payment seems low', severity: 'warning' };
  }
  if (value > 15000) {
    return { isValid: true, message: 'Monthly payment seems high', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidatePMIRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'PMI Rate is required', severity: 'error' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'PMI Rate must be positive', severity: 'error' };
  }
  if (value > 1.5) {
    return { isValid: true, message: 'PMI rate seems high', severity: 'warning' };
  }
  if (value === 0) {
    return { isValid: true, message: 'No PMI - loan may have 20%+ down payment', severity: 'success' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateLoanStartDate(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan Start Date is required', severity: 'error' };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Loan Start Date must be a valid date', severity: 'error' };
  }
  const today = new Date();
  if (date > today) {
    return { isValid: true, message: 'Loan Start Date is in the future', severity: 'warning' };
  }
  if (date < new Date('1980-01-01')) {
    return { isValid: true, message: 'Loan Start Date seems too far in the past', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidatePaymentHistory(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Payment History is required', severity: 'error' };
  }
  const validHistories = ['perfect', 'good', 'fair', 'poor'];
  if (!validHistories.includes(value)) {
    return { isValid: false, message: 'Payment History must be one of the valid options', severity: 'error' };
  }
  if (value === 'poor') {
    return { isValid: true, message: 'Poor payment history may affect PMI cancellation', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateLoanType(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Loan Type is required', severity: 'error' };
  }
  const validTypes = ['conventional', 'fha', 'va', 'usda'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Loan Type must be one of the valid options', severity: 'error' };
  }
  if (value === 'va') {
    return { isValid: true, message: 'VA loans do not require PMI', severity: 'success' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidatePropertyType(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, message: 'Property Type is required', severity: 'error' };
  }
  const validTypes = ['primary', 'secondary', 'investment'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Property Type must be one of the valid options', severity: 'error' };
  }
  if (value === 'investment') {
    return { isValid: true, message: 'Investment properties may have different PMI rules', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAppreciationRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < -10 || value > 20) {
    return { isValid: false, message: 'Appreciation Rate must be between -10% and 20%', severity: 'error' };
  }
  if (value < -5) {
    return { isValid: true, message: 'High negative appreciation may affect home value', severity: 'warning' };
  }
  if (value > 10) {
    return { isValid: true, message: 'High appreciation rate may be optimistic', severity: 'warning' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAdditionalPayments(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Additional Monthly Payments must be non-negative', severity: 'error' };
  }
  if (value > 2000) {
    return { isValid: true, message: 'High additional payments will accelerate PMI cancellation', severity: 'success' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateLumpSumPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Lump Sum Payment must be non-negative', severity: 'error' };
  }
  if (value > 50000) {
    return { isValid: true, message: 'Large lump sum payment will significantly reduce loan balance', severity: 'success' };
  }
  return { isValid: true, message: '', severity: 'success' };
}

export function quickValidateAllInputs(inputs: Partial<PMICancellationInputs>): QuickValidationResult[] {
  return [
    quickValidateOriginalLoanAmount(inputs.originalLoanAmount),
    quickValidateCurrentBalance(inputs.currentBalance),
    quickValidateOriginalHomeValue(inputs.originalHomeValue),
    quickValidateCurrentHomeValue(inputs.currentHomeValue),
    quickValidateDownPayment(inputs.downPayment),
    quickValidateLoanTerm(inputs.loanTerm),
    quickValidateInterestRate(inputs.interestRate),
    quickValidateMonthlyPayment(inputs.monthlyPayment),
    quickValidatePMIRate(inputs.pmiRate),
    quickValidateLoanStartDate(inputs.loanStartDate),
    quickValidatePaymentHistory(inputs.paymentHistory),
    quickValidateLoanType(inputs.loanType),
    quickValidatePropertyType(inputs.propertyType),
    quickValidateAppreciationRate(inputs.appreciationRate),
    quickValidateAdditionalPayments(inputs.additionalPayments),
    quickValidateLumpSumPayment(inputs.lumpSumPayment)
  ];
}
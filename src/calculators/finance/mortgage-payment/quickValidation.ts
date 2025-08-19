import { QuickValidationResult } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validationRuleFactory';

/**
 * Quick validation for loan amount
 */
export function quickValidateLoanAmount(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Loan amount is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Loan Amount');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Loan Amount');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Loan Amount', 1000, 10000000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 50000) {
    return { isValid: true, message: 'Consider if this loan amount is sufficient for your needs', severity: 'warning' };
  }

  if (value > 2000000) {
    return { isValid: true, message: 'This is a jumbo loan. Verify lender requirements.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for interest rate
 */
export function quickValidateInterestRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Interest rate is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Interest Rate');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Interest Rate', 0.1, 20);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 2) {
    return { isValid: true, message: 'Very low interest rate. Verify this is current.', severity: 'warning' };
  }

  if (value > 8) {
    return { isValid: true, message: 'High interest rate. Consider shopping around.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for loan term
 */
export function quickValidateLoanTerm(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Loan term is required', severity: 'error' };
  }

  const validTerms = ['10', '15', '20', '30', '40'];
  if (!validTerms.includes(value)) {
    return { isValid: false, message: 'Loan term must be 10, 15, 20, 30, or 40 years', severity: 'error' };
  }

  if (value === '10') {
    return { isValid: true, message: 'Short term loan with higher payments but less total interest', severity: 'info' };
  }

  if (value === '40') {
    return { isValid: true, message: 'Long term loan with lower payments but more total interest', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for property tax
 */
export function quickValidatePropertyTax(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Property Tax', 0, 50000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value === 0) {
    return { isValid: true, message: 'No property tax entered. Verify this is correct.', severity: 'warning' };
  }

  if (value > 10000) {
    return { isValid: true, message: 'High property tax. Verify this amount.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for home insurance
 */
export function quickValidateHomeInsurance(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Home Insurance', 0, 10000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value === 0) {
    return { isValid: true, message: 'No home insurance entered. Verify this is correct.', severity: 'warning' };
  }

  if (value < 500) {
    return { isValid: true, message: 'Low insurance amount. Verify coverage is adequate.', severity: 'warning' };
  }

  if (value > 5000) {
    return { isValid: true, message: 'High insurance amount. Verify this is correct.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for PMI rate
 */
export function quickValidatePMIRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'PMI Rate', 0, 2);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value > 0 && value < 0.3) {
    return { isValid: true, message: 'Low PMI rate. Verify this is current.', severity: 'warning' };
  }

  if (value > 1.5) {
    return { isValid: true, message: 'High PMI rate. Consider larger down payment.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for down payment
 */
export function quickValidateDownPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Down Payment', 0, 1000000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value === 0) {
    return { isValid: true, message: '0% down payment. Verify loan type allows this.', severity: 'warning' };
  }

  if (value > 500000) {
    return { isValid: true, message: 'Large down payment. Verify this amount.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for loan type
 */
export function quickValidateLoanType(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Loan type is required', severity: 'error' };
  }

  const validTypes = ['conventional', 'fha', 'va', 'usda'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Loan type must be conventional, FHA, VA, or USDA', severity: 'error' };
  }

  switch (value) {
    case 'fha':
      return { isValid: true, message: 'FHA loans require 3.5% minimum down payment', severity: 'info' };
    case 'va':
      return { isValid: true, message: 'VA loans typically require 0% down payment', severity: 'info' };
    case 'usda':
      return { isValid: true, message: 'USDA loans typically require 0% down payment', severity: 'info' };
    default:
      return { isValid: true, message: '', severity: 'success' };
  }
}

/**
 * Quick validation for payment frequency
 */
export function quickValidatePaymentFrequency(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Payment frequency is required', severity: 'error' };
  }

  const validFrequencies = ['monthly', 'biweekly', 'weekly'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, message: 'Payment frequency must be monthly, biweekly, or weekly', severity: 'error' };
  }

  switch (value) {
    case 'biweekly':
      return { isValid: true, message: 'Bi-weekly payments can save interest and pay off loan faster', severity: 'info' };
    case 'weekly':
      return { isValid: true, message: 'Weekly payments can save even more interest', severity: 'info' };
    default:
      return { isValid: true, message: '', severity: 'success' };
  }
}

/**
 * Quick validation for all inputs together
 */
export function quickValidateAllInputs(inputs: {
  loanAmount?: number;
  interestRate?: number;
  loanTerm?: string;
  propertyTax?: number;
  homeInsurance?: number;
  pmiRate?: number;
  downPayment?: number;
  loanType?: string;
  paymentFrequency?: string;
}): QuickValidationResult[] {
  return [
    quickValidateLoanAmount(inputs.loanAmount),
    quickValidateInterestRate(inputs.interestRate),
    quickValidateLoanTerm(inputs.loanTerm),
    quickValidatePropertyTax(inputs.propertyTax),
    quickValidateHomeInsurance(inputs.homeInsurance),
    quickValidatePMIRate(inputs.pmiRate),
    quickValidateDownPayment(inputs.downPayment),
    quickValidateLoanType(inputs.loanType),
    quickValidatePaymentFrequency(inputs.paymentFrequency)
  ];
}

/**
 * Quick validation for down payment percentage
 */
export function quickValidateDownPaymentPercentage(
  downPayment: number | undefined,
  loanAmount: number | undefined
): QuickValidationResult {
  if (downPayment === undefined || loanAmount === undefined || downPayment === null || loanAmount === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  if (loanAmount <= 0) {
    return { isValid: false, message: 'Loan amount must be positive to calculate down payment percentage', severity: 'error' };
  }

  const downPaymentPercent = (downPayment / (loanAmount + downPayment)) * 100;

  if (downPaymentPercent < 3.5) {
    return { isValid: false, message: 'Down payment below 3.5% may not be available for conventional loans', severity: 'error' };
  }

  if (downPaymentPercent < 20) {
    return { isValid: true, message: 'PMI will likely be required with less than 20% down payment', severity: 'warning' };
  }

  if (downPaymentPercent >= 20) {
    return { isValid: true, message: 'No PMI required with 20% or more down payment', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for debt-to-income ratio estimation
 */
export function quickValidateDTIEstimation(
  monthlyPayment: number | undefined,
  monthlyIncome: number | undefined
): QuickValidationResult {
  if (monthlyPayment === undefined || monthlyIncome === undefined || monthlyPayment === null || monthlyIncome === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  if (monthlyIncome <= 0) {
    return { isValid: false, message: 'Monthly income must be positive to calculate DTI ratio', severity: 'error' };
  }

  const dtiRatio = (monthlyPayment / monthlyIncome) * 100;

  if (dtiRatio > 43) {
    return { isValid: false, message: 'DTI ratio above 43% may not qualify for conventional loans', severity: 'error' };
  }

  if (dtiRatio > 36) {
    return { isValid: true, message: 'DTI ratio above 36% may limit loan options', severity: 'warning' };
  }

  if (dtiRatio <= 28) {
    return { isValid: true, message: 'Good DTI ratio for mortgage qualification', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}
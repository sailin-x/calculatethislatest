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
 * Quick validation for property value
 */
export function quickValidatePropertyValue(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Property value is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Property Value');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Property Value');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Property Value', 1000, 10000000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 50000) {
    return { isValid: true, message: 'Property value seems low. Verify this amount.', severity: 'warning' };
  }

  if (value > 5000000) {
    return { isValid: true, message: 'High-value property. Verify this amount.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for down payment
 */
export function quickValidateDownPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Down payment is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Down Payment');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
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
 * Quick validation for credit score
 */
export function quickValidateCreditScore(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Credit Score', 300, 850);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 580) {
    return { isValid: true, message: 'Low credit score may limit loan options', severity: 'warning' };
  }

  if (value < 620) {
    return { isValid: true, message: 'Credit score below 620 may affect rates', severity: 'warning' };
  }

  if (value >= 760) {
    return { isValid: true, message: 'Excellent credit score for best rates', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for occupancy type
 */
export function quickValidateOccupancyType(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Occupancy type is required', severity: 'error' };
  }

  const validTypes = ['primary', 'secondary', 'investment'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Occupancy type must be primary, secondary, or investment', severity: 'error' };
  }

  switch (value) {
    case 'secondary':
      return { isValid: true, message: 'Secondary homes may have different requirements', severity: 'info' };
    case 'investment':
      return { isValid: true, message: 'Investment properties may have higher rates', severity: 'info' };
    default:
      return { isValid: true, message: '', severity: 'success' };
  }
}

/**
 * Quick validation for loan term
 */
export function quickValidateLoanTerm(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Loan term is required', severity: 'error' };
  }

  const validTerms = ['15', '30'];
  if (!validTerms.includes(value)) {
    return { isValid: false, message: 'Loan term must be 15 or 30 years', severity: 'error' };
  }

  if (value === '15') {
    return { isValid: true, message: '15-year loan with higher payments but less total interest', severity: 'info' };
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

  const rangeErrors = ValidationRuleFactory.range(value, 'PMI Rate', 0.1, 2);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 0.3) {
    return { isValid: true, message: 'Very low PMI rate. Verify this is current.', severity: 'warning' };
  }

  if (value > 1.5) {
    return { isValid: true, message: 'High PMI rate. Consider larger down payment.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for MIP rate
 */
export function quickValidateMIPRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'MIP Rate', 0.45, 1.75);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 0.5) {
    return { isValid: true, message: 'Very low MIP rate. Verify this is current.', severity: 'warning' };
  }

  if (value > 1.5) {
    return { isValid: true, message: 'High MIP rate. Verify this is correct.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for VA funding fee
 */
export function quickValidateVAFundingFee(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'VA Funding Fee', 0, 3.6);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 1.0) {
    return { isValid: true, message: 'Very low VA funding fee. Verify this is current.', severity: 'warning' };
  }

  if (value > 3.0) {
    return { isValid: true, message: 'High VA funding fee. Verify this is correct.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for USDA guarantee fee
 */
export function quickValidateUSDAGuaranteeFee(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'USDA Guarantee Fee', 0, 2);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 0.5) {
    return { isValid: true, message: 'Very low USDA guarantee fee. Verify this is current.', severity: 'warning' };
  }

  if (value > 1.5) {
    return { isValid: true, message: 'High USDA guarantee fee. Verify this is correct.', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for all inputs together
 */
export function quickValidateAllInputs(inputs: {
  loanAmount?: number;
  propertyValue?: number;
  downPayment?: number;
  loanType?: string;
  creditScore?: number;
  occupancyType?: string;
  loanTerm?: string;
  pmiRate?: number;
  mipRate?: number;
  fundingFee?: number;
  guaranteeFee?: number;
}): QuickValidationResult[] {
  return [
    quickValidateLoanAmount(inputs.loanAmount),
    quickValidatePropertyValue(inputs.propertyValue),
    quickValidateDownPayment(inputs.downPayment),
    quickValidateLoanType(inputs.loanType),
    quickValidateCreditScore(inputs.creditScore),
    quickValidateOccupancyType(inputs.occupancyType),
    quickValidateLoanTerm(inputs.loanTerm),
    quickValidatePMIRate(inputs.pmiRate),
    quickValidateMIPRate(inputs.mipRate),
    quickValidateVAFundingFee(inputs.fundingFee),
    quickValidateUSDAGuaranteeFee(inputs.guaranteeFee)
  ];
}

/**
 * Quick validation for LTV ratio
 */
export function quickValidateLTVRatio(
  loanAmount: number | undefined,
  propertyValue: number | undefined
): QuickValidationResult {
  if (loanAmount === undefined || propertyValue === undefined || loanAmount === null || propertyValue === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  if (propertyValue <= 0) {
    return { isValid: false, message: 'Property value must be positive to calculate LTV ratio', severity: 'error' };
  }

  const ltvRatio = (loanAmount / propertyValue) * 100;

  if (ltvRatio > 100) {
    return { isValid: false, message: 'LTV ratio cannot exceed 100%', severity: 'error' };
  }

  if (ltvRatio > 97) {
    return { isValid: false, message: 'LTV ratio above 97% may not be available', severity: 'error' };
  }

  if (ltvRatio > 80) {
    return { isValid: true, message: 'LTV above 80% will require mortgage insurance', severity: 'warning' };
  }

  if (ltvRatio <= 80) {
    return { isValid: true, message: 'LTV ≤ 80% - no mortgage insurance required', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for down payment percentage
 */
export function quickValidateDownPaymentPercentage(
  downPayment: number | undefined,
  propertyValue: number | undefined
): QuickValidationResult {
  if (downPayment === undefined || propertyValue === undefined || downPayment === null || propertyValue === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  if (propertyValue <= 0) {
    return { isValid: false, message: 'Property value must be positive to calculate down payment percentage', severity: 'error' };
  }

  const downPaymentPercent = (downPayment / propertyValue) * 100;

  if (downPaymentPercent < 3.5) {
    return { isValid: false, message: 'Down payment below 3.5% may not be available for most loans', severity: 'error' };
  }

  if (downPaymentPercent < 20) {
    return { isValid: true, message: 'Down payment below 20% will likely require mortgage insurance', severity: 'warning' };
  }

  if (downPaymentPercent >= 20) {
    return { isValid: true, message: 'Down payment ≥ 20% - no mortgage insurance required', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}
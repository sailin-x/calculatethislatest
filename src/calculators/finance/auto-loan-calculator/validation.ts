import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Auto Loan Calculator Validation Rules
 * Comprehensive validation for auto loan calculations
 */
export const autoLoanValidationRules: ValidationRule[] = [
  // Required fields validation
  ValidationRuleFactory.required('vehiclePrice', 'Vehicle price is required'),
  ValidationRuleFactory.required('loanTermYears', 'Loan term is required'),
  ValidationRuleFactory.required('interestRate', 'Interest rate is required'),

  // Vehicle price validation
  ValidationRuleFactory.range('vehiclePrice', 5000, 2000000, 'Vehicle price must be between $5,000 and $2,000,000'),

  // Down payment validation
  ValidationRuleFactory.businessRule(
    'downPayment',
    (downPayment, allInputs) => {
      if (!allInputs?.vehiclePrice) return true;
      if (downPayment === undefined || downPayment === null || downPayment === '') return true;
      return downPayment >= 0 && downPayment <= allInputs.vehiclePrice;
    },
    'Down payment cannot exceed vehicle price'
  ),

  // Down payment percentage validation
  ValidationRuleFactory.businessRule(
    'downPaymentPercent',
    (downPaymentPercent) => {
      if (downPaymentPercent === undefined || downPaymentPercent === null || downPaymentPercent === '') return true;
      return downPaymentPercent >= 0 && downPaymentPercent <= 100;
    },
    'Down payment percentage must be between 0% and 100%'
  ),

  // Loan term validation
  ValidationRuleFactory.range('loanTermYears', 1, 10, 'Loan term must be between 1 and 10 years'),

  // Interest rate validation
  ValidationRuleFactory.range('interestRate', 0, 25, 'Interest rate must be between 0% and 25%'),

  // Sales tax validation
  ValidationRuleFactory.businessRule(
    'salesTax',
    (salesTax) => {
      if (salesTax === undefined || salesTax === null || salesTax === '') return true;
      return salesTax >= 0 && salesTax <= 20;
    },
    'Sales tax must be between 0% and 20%'
  ),

  // Registration fees validation
  ValidationRuleFactory.businessRule(
    'registrationFees',
    (registrationFees) => {
      if (registrationFees === undefined || registrationFees === null || registrationFees === '') return true;
      return registrationFees >= 0 && registrationFees <= 2000;
    },
    'Registration fees must be between $0 and $2,000'
  ),

  // Monthly insurance validation
  ValidationRuleFactory.businessRule(
    'monthlyInsurance',
    (monthlyInsurance) => {
      if (monthlyInsurance === undefined || monthlyInsurance === null || monthlyInsurance === '') return true;
      return monthlyInsurance >= 0 && monthlyInsurance <= 500;
    },
    'Monthly insurance must be between $0 and $500'
  ),

  // Trade-in value validation
  ValidationRuleFactory.businessRule(
    'tradeInValue',
    (tradeInValue, allInputs) => {
      if (tradeInValue === undefined || tradeInValue === null || tradeInValue === '') return true;
      if (!allInputs?.vehiclePrice) return true;
      return tradeInValue >= 0 && tradeInValue <= allInputs.vehiclePrice;
    },
    'Trade-in value cannot exceed vehicle price'
  ),

  // Business rule: Ensure either down payment amount or percentage is provided
  ValidationRuleFactory.businessRule(
    'downPayment',
    (downPayment, allInputs) => {
      const hasDownPayment = downPayment !== undefined && downPayment !== null && downPayment !== '';
      const hasDownPaymentPercent = allInputs?.downPaymentPercent !== undefined &&
                                   allInputs?.downPaymentPercent !== null &&
                                   allInputs?.downPaymentPercent !== '';

      // Must have at least one type of down payment
      return hasDownPayment || hasDownPaymentPercent;
    },
    'Either down payment amount or percentage must be provided'
  ),

  // Business rule: Reasonable loan-to-value ratio warning
  ValidationRuleFactory.businessRule(
    'downPayment',
    (downPayment, allInputs) => {
      if (!allInputs?.vehiclePrice || !allInputs?.loanTermYears) return true;

      const actualDownPayment = downPayment || (allInputs.vehiclePrice * (allInputs.downPaymentPercent || 0) / 100);
      const loanAmount = allInputs.vehiclePrice - actualDownPayment - (allInputs.tradeInValue || 0);
      const ltvRatio = loanAmount / allInputs.vehiclePrice;

      // Warn if LTV is too high (over 120% which would be negative equity)
      return ltvRatio <= 1.2;
    },
    'Loan amount should not exceed 120% of vehicle value to avoid negative equity'
  ),

  // Business rule: Interest rate reasonableness check
  ValidationRuleFactory.businessRule(
    'interestRate',
    (interestRate, allInputs) => {
      if (!allInputs?.loanTermYears) return true;

      // Current market rates (2024)
      const rateRanges = {
        excellent: { min: 3.0, max: 6.0 },
        good: { min: 6.0, max: 10.0 },
        fair: { min: 10.0, max: 15.0 },
        poor: { min: 15.0, max: 25.0 }
      };

      // This is just a warning, not an error
      return true; // Always pass validation, but could show warning in UI
    },
    'Interest rate seems outside typical market ranges'
  ),

  // Business rule: Minimum down payment requirements
  ValidationRuleFactory.businessRule(
    'downPayment',
    (downPayment, allInputs) => {
      if (!allInputs?.vehiclePrice) return true;

      const actualDownPayment = downPayment || (allInputs.vehiclePrice * (allInputs.downPaymentPercent || 0) / 100);
      const minDownPayment = allInputs.vehiclePrice * 0.03; // 3% minimum

      return actualDownPayment >= minDownPayment;
    },
    'Most lenders require at least 3% down payment'
  )
];

/**
 * Get validation rules with contextual help messages
 */
export function getAutoLoanValidationRules(): ValidationRule[] {
  return autoLoanValidationRules;
}

/**
 * Auto loan type information for validation context
 */
export const autoLoanTypeInfo = {
  new: {
    typicalDownPayment: 20,
    typicalLoanTerm: 5,
    description: 'Brand new vehicle purchase'
  },
  used: {
    typicalDownPayment: 15,
    typicalLoanTerm: 4,
    description: 'Previously owned vehicle purchase'
  },
  refinance: {
    typicalDownPayment: 0,
    typicalLoanTerm: 6,
    description: 'Refinancing existing auto loan'
  }
};
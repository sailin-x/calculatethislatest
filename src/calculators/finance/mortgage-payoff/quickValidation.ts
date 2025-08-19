import { QuickValidationResult } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Quick validation for current balance
 */
export function quickValidateCurrentBalance(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Current balance is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Current Balance');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Current Balance');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Current Balance', 1000, 10000000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 50000) {
    return { isValid: true, message: 'Small mortgage balance', severity: 'info' };
  }

  if (value > 2000000) {
    return { isValid: true, message: 'Large mortgage balance - jumbo loan', severity: 'info' };
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

  const positiveErrors = ValidationRuleFactory.positive(value, 'Interest Rate');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Interest Rate', 0.1, 20);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 3) {
    return { isValid: true, message: 'Very low interest rate - excellent', severity: 'success' };
  }

  if (value > 8) {
    return { isValid: true, message: 'High interest rate - consider refinancing', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for remaining term
 */
export function quickValidateRemainingTerm(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Remaining term is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Remaining Term');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Remaining Term');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Remaining Term', 1, 50);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 5) {
    return { isValid: true, message: 'Short remaining term - near payoff', severity: 'info' };
  }

  if (value > 30) {
    return { isValid: true, message: 'Long remaining term - early in mortgage', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for monthly payment
 */
export function quickValidateMonthlyPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Monthly payment is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Monthly Payment');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Monthly Payment');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Monthly Payment', 100, 50000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 500) {
    return { isValid: true, message: 'Low monthly payment', severity: 'info' };
  }

  if (value > 5000) {
    return { isValid: true, message: 'High monthly payment', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for extra payment
 */
export function quickValidateExtraPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const nonNegativeErrors = ValidationRuleFactory.nonNegative(value, 'Extra Payment');
  if (nonNegativeErrors.length > 0) {
    return { isValid: false, message: nonNegativeErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Extra Payment', 0, 10000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value > 0 && value < 100) {
    return { isValid: true, message: 'Small extra payment - good start', severity: 'success' };
  }

  if (value > 500) {
    return { isValid: true, message: 'Large extra payment - significant impact', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for lump sum payment
 */
export function quickValidateLumpSumPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const nonNegativeErrors = ValidationRuleFactory.nonNegative(value, 'Lump Sum Payment');
  if (nonNegativeErrors.length > 0) {
    return { isValid: false, message: nonNegativeErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Lump Sum Payment', 0, 1000000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value > 0 && value < 5000) {
    return { isValid: true, message: 'Small lump sum payment', severity: 'info' };
  }

  if (value > 50000) {
    return { isValid: true, message: 'Large lump sum payment - significant impact', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for payoff strategy
 */
export function quickValidatePayoffStrategy(value: string | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Payoff strategy is required', severity: 'error' };
  }

  const validStrategies = ['standard', 'extra-monthly', 'lump-sum', 'biweekly', 'custom'];
  if (!validStrategies.includes(value)) {
    return { isValid: false, message: 'Invalid payoff strategy', severity: 'error' };
  }

  switch (value) {
    case 'standard':
      return { isValid: true, message: 'Standard payment strategy', severity: 'info' };
    case 'extra-monthly':
      return { isValid: true, message: 'Extra monthly payment strategy', severity: 'info' };
    case 'lump-sum':
      return { isValid: true, message: 'Lump sum payment strategy', severity: 'info' };
    case 'biweekly':
      return { isValid: true, message: 'Bi-weekly payment strategy', severity: 'info' };
    case 'custom':
      return { isValid: true, message: 'Custom payment strategy', severity: 'info' };
    default:
      return { isValid: true, message: '', severity: 'success' };
  }
}

/**
 * Quick validation for property value
 */
export function quickValidatePropertyValue(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
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
    return { isValid: true, message: 'Low property value', severity: 'info' };
  }

  if (value > 2000000) {
    return { isValid: true, message: 'High-value property', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for tax rate
 */
export function quickValidateTaxRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Tax Rate', 0, 50);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 10) {
    return { isValid: true, message: 'Low tax bracket', severity: 'info' };
  }

  if (value > 35) {
    return { isValid: true, message: 'High tax bracket - significant interest deduction', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for investment return
 */
export function quickValidateInvestmentReturn(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Investment Return', 0, 20);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 3) {
    return { isValid: true, message: 'Low investment return - consider paying off mortgage', severity: 'warning' };
  }

  if (value > 10) {
    return { isValid: true, message: 'High investment return - consider investing instead', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for inflation rate
 */
export function quickValidateInflationRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Inflation Rate', 0, 10);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 1) {
    return { isValid: true, message: 'Low inflation rate', severity: 'info' };
  }

  if (value > 5) {
    return { isValid: true, message: 'High inflation rate - reduces real cost of mortgage', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for all inputs together
 */
export function quickValidateAllInputs(inputs: {
  currentBalance?: number;
  interestRate?: number;
  remainingTerm?: number;
  monthlyPayment?: number;
  extraPayment?: number;
  lumpSumPayment?: number;
  payoffStrategy?: string;
  targetPayoffDate?: string;
  propertyValue?: number;
  taxRate?: number;
  investmentReturn?: number;
  inflationRate?: number;
}): QuickValidationResult[] {
  return [
    quickValidateCurrentBalance(inputs.currentBalance),
    quickValidateInterestRate(inputs.interestRate),
    quickValidateRemainingTerm(inputs.remainingTerm),
    quickValidateMonthlyPayment(inputs.monthlyPayment),
    quickValidateExtraPayment(inputs.extraPayment),
    quickValidateLumpSumPayment(inputs.lumpSumPayment),
    quickValidatePayoffStrategy(inputs.payoffStrategy),
    quickValidatePropertyValue(inputs.propertyValue),
    quickValidateTaxRate(inputs.taxRate),
    quickValidateInvestmentReturn(inputs.investmentReturn),
    quickValidateInflationRate(inputs.inflationRate)
  ];
}

/**
 * Quick validation for payment consistency
 */
export function quickValidatePaymentConsistency(
  currentBalance: number | undefined,
  interestRate: number | undefined,
  remainingTerm: number | undefined,
  monthlyPayment: number | undefined
): QuickValidationResult {
  if (currentBalance === undefined || interestRate === undefined || 
      remainingTerm === undefined || monthlyPayment === undefined) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = remainingTerm * 12;
  const calculatedPayment = currentBalance * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const paymentDifference = Math.abs(monthlyPayment - calculatedPayment);
  const paymentTolerance = calculatedPayment * 0.15; // 15% tolerance
  
  if (paymentDifference > paymentTolerance) {
    return { 
      isValid: false, 
      message: `Monthly payment seems inconsistent with other inputs. Expected: $${calculatedPayment.toFixed(0)}`, 
      severity: 'warning' 
    };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for LTV ratio
 */
export function quickValidateLTVRatio(
  currentBalance: number | undefined,
  propertyValue: number | undefined
): QuickValidationResult {
  if (currentBalance === undefined || propertyValue === undefined || 
      currentBalance === null || propertyValue === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  if (propertyValue <= 0) {
    return { isValid: false, message: 'Property value must be positive to calculate LTV ratio', severity: 'error' };
  }

  const ltvRatio = (currentBalance / propertyValue) * 100;

  if (ltvRatio > 100) {
    return { isValid: false, message: 'LTV ratio cannot exceed 100%', severity: 'error' };
  }

  if (ltvRatio > 95) {
    return { isValid: true, message: 'Very high LTV ratio', severity: 'warning' };
  }

  if (ltvRatio <= 80) {
    return { isValid: true, message: 'Good LTV ratio', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}
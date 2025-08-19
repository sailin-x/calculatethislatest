import { QuickValidationResult } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

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

  const rangeErrors = ValidationRuleFactory.range(value, 'Loan Amount', 10000, 10000000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 50000) {
    return { isValid: true, message: 'Small loan amount', severity: 'info' };
  }

  if (value > 2000000) {
    return { isValid: true, message: 'Large loan amount - jumbo loan', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for original interest rate
 */
export function quickValidateOriginalRate(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Original interest rate is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Original Interest Rate');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Original Interest Rate');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Original Interest Rate', 0.1, 20);
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
 * Quick validation for points to buy
 */
export function quickValidatePointsToBuy(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Points to buy is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Points to Buy');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Points to Buy', 0, 5);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value === 0) {
    return { isValid: true, message: 'No points - standard rate', severity: 'info' };
  }

  if (value < 0.5) {
    return { isValid: true, message: 'Small points purchase', severity: 'info' };
  }

  if (value > 2) {
    return { isValid: true, message: 'Large points purchase - significant cost', severity: 'warning' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for rate reduction per point
 */
export function quickValidateRateReduction(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Rate reduction per point is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Rate Reduction per Point');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Rate Reduction per Point');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Rate Reduction per Point', 0.125, 0.5);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 0.2) {
    return { isValid: true, message: 'Low rate reduction per point', severity: 'info' };
  }

  if (value > 0.4) {
    return { isValid: true, message: 'High rate reduction per point - excellent value', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for loan term
 */
export function quickValidateLoanTerm(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'Loan term is required', severity: 'error' };
  }

  const requiredErrors = ValidationRuleFactory.required(value, 'Loan Term');
  if (requiredErrors.length > 0) {
    return { isValid: false, message: requiredErrors[0], severity: 'error' };
  }

  const positiveErrors = ValidationRuleFactory.positive(value, 'Loan Term');
  if (positiveErrors.length > 0) {
    return { isValid: false, message: positiveErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Loan Term', 1, 50);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 10) {
    return { isValid: true, message: 'Short loan term', severity: 'info' };
  }

  if (value > 30) {
    return { isValid: true, message: 'Long loan term', severity: 'info' };
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
 * Quick validation for planned ownership years
 */
export function quickValidatePlannedOwnershipYears(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Planned Ownership', 1, 50);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 5) {
    return { isValid: true, message: 'Short-term ownership - points may not pay off', severity: 'warning' };
  }

  if (value > 20) {
    return { isValid: true, message: 'Long-term ownership - points likely to pay off', severity: 'success' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for closing costs
 */
export function quickValidateClosingCosts(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const nonNegativeErrors = ValidationRuleFactory.nonNegative(value, 'Closing Costs');
  if (nonNegativeErrors.length > 0) {
    return { isValid: false, message: nonNegativeErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Closing Costs', 0, 50000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value < 1000) {
    return { isValid: true, message: 'Low closing costs', severity: 'info' };
  }

  if (value > 10000) {
    return { isValid: true, message: 'High closing costs', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
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
 * Quick validation for down payment
 */
export function quickValidateDownPayment(value: number | undefined): QuickValidationResult {
  if (value === undefined || value === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const nonNegativeErrors = ValidationRuleFactory.nonNegative(value, 'Down Payment');
  if (nonNegativeErrors.length > 0) {
    return { isValid: false, message: nonNegativeErrors[0], severity: 'error' };
  }

  const rangeErrors = ValidationRuleFactory.range(value, 'Down Payment', 0, 1000000);
  if (rangeErrors.length > 0) {
    return { isValid: false, message: rangeErrors[0], severity: 'error' };
  }

  if (value === 0) {
    return { isValid: true, message: 'No down payment - 100% financing', severity: 'info' };
  }

  if (value > 200000) {
    return { isValid: true, message: 'Large down payment', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for all inputs together
 */
export function quickValidateAllInputs(inputs: {
  loanAmount?: number;
  originalRate?: number;
  pointsToBuy?: number;
  rateReduction?: number;
  loanTerm?: number;
  taxRate?: number;
  investmentReturn?: number;
  inflationRate?: number;
  plannedOwnershipYears?: number;
  closingCosts?: number;
  propertyValue?: number;
  downPayment?: number;
}): QuickValidationResult[] {
  return [
    quickValidateLoanAmount(inputs.loanAmount),
    quickValidateOriginalRate(inputs.originalRate),
    quickValidatePointsToBuy(inputs.pointsToBuy),
    quickValidateRateReduction(inputs.rateReduction),
    quickValidateLoanTerm(inputs.loanTerm),
    quickValidateTaxRate(inputs.taxRate),
    quickValidateInvestmentReturn(inputs.investmentReturn),
    quickValidateInflationRate(inputs.inflationRate),
    quickValidatePlannedOwnershipYears(inputs.plannedOwnershipYears),
    quickValidateClosingCosts(inputs.closingCosts),
    quickValidatePropertyValue(inputs.propertyValue),
    quickValidateDownPayment(inputs.downPayment)
  ];
}

/**
 * Quick validation for new interest rate
 */
export function quickValidateNewRate(
  originalRate: number | undefined,
  pointsToBuy: number | undefined,
  rateReduction: number | undefined
): QuickValidationResult {
  if (originalRate === undefined || pointsToBuy === undefined || rateReduction === undefined ||
      originalRate === null || pointsToBuy === null || rateReduction === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const newRate = originalRate - (pointsToBuy * rateReduction);

  if (newRate < 0) {
    return { isValid: false, message: 'New rate would be negative', severity: 'error' };
  }

  if (newRate < 0.1) {
    return { isValid: false, message: 'New rate would be extremely low', severity: 'error' };
  }

  if (newRate > originalRate) {
    return { isValid: false, message: 'New rate is higher than original rate', severity: 'error' };
  }

  const rateReductionPercent = ((originalRate - newRate) / originalRate) * 100;

  if (rateReductionPercent > 20) {
    return { isValid: true, message: 'Very large rate reduction', severity: 'warning' };
  }

  if (rateReductionPercent < 1) {
    return { isValid: true, message: 'Very small rate reduction', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
}

/**
 * Quick validation for points cost
 */
export function quickValidatePointsCost(
  loanAmount: number | undefined,
  pointsToBuy: number | undefined
): QuickValidationResult {
  if (loanAmount === undefined || pointsToBuy === undefined ||
      loanAmount === null || pointsToBuy === null) {
    return { isValid: true, message: '', severity: 'success' };
  }

  const pointsCost = loanAmount * (pointsToBuy / 100);
  const costAsPercentOfLoan = (pointsCost / loanAmount) * 100;

  if (costAsPercentOfLoan > 5) {
    return { isValid: false, message: 'Points cost is unusually high', severity: 'error' };
  }

  if (costAsPercentOfLoan > 3) {
    return { isValid: true, message: 'High points cost relative to loan', severity: 'warning' };
  }

  if (costAsPercentOfLoan < 0.5) {
    return { isValid: true, message: 'Low points cost', severity: 'info' };
  }

  return { isValid: true, message: '', severity: 'success' };
}
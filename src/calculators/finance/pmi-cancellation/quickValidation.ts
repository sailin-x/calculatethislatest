import { pmiCancellationValidationRules } from './validation';

// Helper function to find validation rule by field and type
function findValidationRule(field: string, type: string) {
  return pmiCancellationValidationRules.find(rule => rule.field === field && rule.type === type);
}

// Required field validations
export function validateOriginalLoanAmount(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('originalLoanAmount', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateCurrentLoanBalance(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('currentLoanBalance', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateHomePurchasePrice(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('homePurchasePrice', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateCurrentHomeValue(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('currentHomeValue', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateLoanType(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('loanType', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateLoanStartDate(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('loanStartDate', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateOriginalDownPayment(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('originalDownPayment', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateMonthlyPMIPayment(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('monthlyPMIPayment', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateDownPaymentPercentage(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('downPaymentPercentage', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualPMIRate(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualPMIRate', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateCreditScore(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('creditScore', 'required');
  return rule ? rule.validator(value) : true;
}

export function validatePaymentHistory(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('paymentHistory', 'required');
  return rule ? rule.validator(value) : true;
}

export function validatePropertyType(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('propertyType', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateAppreciationRate(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('appreciationRate', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateRefinanceOption(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('refinanceOption', 'required');
  return rule ? rule.validator(value) : true;
}

// Range validations
export function validateOriginalLoanAmountRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('originalLoanAmount', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateCurrentLoanBalanceRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('currentLoanBalance', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateHomePurchasePriceRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('homePurchasePrice', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateCurrentHomeValueRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('currentHomeValue', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualPMIRateRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualPMIRate', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateCreditScoreRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('creditScore', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateAppreciationRateRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('appreciationRate', 'range');
  return rule ? rule.validator(value) : true;
}

// Business rule validations
export function validateCurrentLoanBalanceBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('currentLoanBalance', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateOriginalDownPaymentBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('originalDownPayment', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateMonthlyPMIPaymentBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('monthlyPMIPayment', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateCurrentHomeValueBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('currentHomeValue', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateLoanStartDateBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('loanStartDate', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateCreditScoreBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('creditScore', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateAppreciationRateBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('appreciationRate', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}
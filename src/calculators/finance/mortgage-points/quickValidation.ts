import { mortgagePointsValidationRules } from './validation';

export const validateLoanAmount = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'loanAmount' && r.type === 'required');
  return rule ? rule.validator(value) : true;
};

export const validateBaseInterestRate = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'baseInterestRate' && r.type === 'required');
  return rule ? rule.validator(value) : true;
};

export const validateLoanTerm = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'loanTerm' && r.type === 'required');
  return rule ? rule.validator(value) : true;
};

export const validateDiscountPoints = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'discountPoints' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validateOriginationPoints = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'originationPoints' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validatePointCost = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'pointCost' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validatePropertyValue = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'propertyValue' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validateDownPayment = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'downPayment' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validateBorrowerCreditScore = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'borrowerCreditScore' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validateBorrowerTaxRate = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'borrowerTaxRate' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validateAnalysisPeriod = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'analysisPeriod' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validateLoanAmountBusiness = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'loanAmount' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDownPaymentBusiness = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'downPayment' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBaseInterestRateBusiness = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'baseInterestRate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDiscountPointsBusiness = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'discountPoints' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateAnalysisPeriodBusiness = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePointsValidationRules.find(r => r.field === 'analysisPeriod' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};
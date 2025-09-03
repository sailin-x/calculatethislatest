import { mortgagePaymentValidationRules } from './validation';

export const validateLoanAmount = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'loanAmount' && r.type === 'required');
  return rule ? rule.validator(value) : true;
};

export const validateInterestRate = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'interestRate' && r.type === 'required');
  return rule ? rule.validator(value) : true;
};

export const validateLoanTerm = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'loanTerm' && r.type === 'required');
  return rule ? rule.validator(value) : true;
};

export const validateDownPayment = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'downPayment' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validateHomePrice = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'homePrice' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validatePropertyTaxes = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'propertyTaxes' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validateHomeownersInsurance = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'homeownersInsurance' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validatePMI = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'pmi' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validateHOAFees = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'hoaFees' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validateExtraPayment = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'extraPayment' && r.type === 'range');
  return rule ? rule.validator(value) : true;
};

export const validateLoanAmountBusiness = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'loanAmount' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDownPaymentBusiness = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'downPayment' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInterestRateBusiness = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'interestRate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanTermBusiness = (value: any, allInputs: Record<string, any>): boolean => {
  const rule = mortgagePaymentValidationRules.find(r => r.field === 'loanTerm' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};
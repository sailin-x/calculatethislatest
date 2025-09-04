import { privateMortgageInsuranceValidationRules } from './validation';

// Required validations
export const validateLoanAmount = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'loanAmount' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHomeValue = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'homeValue' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDownPayment = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'downPayment' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePMIRate = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'pmiRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanType = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'loanType' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanTerm = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'loanTerm' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

// Range validations
export const validateLoanAmountRange = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'loanAmount' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHomeValueRange = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'homeValue' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDownPaymentRange = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'downPayment' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePMIRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'pmiRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCreditScoreRange = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'creditScore' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanTermRange = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'loanTerm' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateAnnualAppreciationRange = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'annualAppreciation' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateMonthlyPaymentRange = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'monthlyPayment' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInterestRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'interestRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

// Business rule validations
export const validateLoanAmountBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'loanAmount' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDownPaymentBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'downPayment' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePMIRateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = privateMortgageInsuranceValidationRules.find(r => r.field === 'pmiRate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};
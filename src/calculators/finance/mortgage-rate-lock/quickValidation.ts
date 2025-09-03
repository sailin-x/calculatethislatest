import { mortgageRateLockValidationRules } from './validation';

export const validateLoanAmount = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'loanAmount' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanAmountRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'loanAmount' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanAmountBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'loanAmount' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLockedRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'lockedRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLockedRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'lockedRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLockedRateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'lockedRate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCurrentMarketRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'currentMarketRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCurrentMarketRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'currentMarketRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCurrentMarketRateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'currentMarketRate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanTerm = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'loanTerm' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanTermRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'loanTerm' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanType = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'loanType' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePaymentType = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'paymentType' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLockDate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'lockDate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLockDateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'lockDate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLockExpirationDate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'lockExpirationDate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLockExpirationDateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'lockExpirationDate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLockDuration = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'lockDuration' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLockType = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'lockType' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLockFee = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'lockFee' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLockFeeType = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'lockFeeType' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyValue = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'propertyValue' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyValueRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'propertyValue' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyValueBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'propertyValue' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyType = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'propertyType' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateEstimatedClosingDate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'estimatedClosingDate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateEstimatedClosingDateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'estimatedClosingDate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateMarketCondition = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'marketCondition' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateRateTrend = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'rateTrend' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateRiskTolerance = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'riskTolerance' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateMaxRateIncrease = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRateLockValidationRules.find(r => r.field === 'maxRateIncrease' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};
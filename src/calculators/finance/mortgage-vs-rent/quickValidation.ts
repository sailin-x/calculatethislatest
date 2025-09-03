import { mortgageVsRentValidationRules } from './validation';

export const validateCurrentRent = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'currentRent' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCurrentRentRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'currentRent' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateRentIncreaseRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'rentIncreaseRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateRentIncreaseRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'rentIncreaseRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateRentIncreaseRateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'rentIncreaseRate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHomePrice = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'homePrice' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHomePriceRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'homePrice' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDownPayment = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'downPayment' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDownPaymentRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'downPayment' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDownPaymentBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'downPayment' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInterestRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'interestRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInterestRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'interestRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanTerm = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'loanTerm' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanTermRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'loanTerm' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyTaxRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'propertyTaxRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyTaxRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'propertyTaxRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHomeownersInsuranceRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'homeownersInsuranceRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHomeownersInsuranceRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'homeownersInsuranceRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateMaintenanceRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'maintenanceRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateMaintenanceRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'maintenanceRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHoaFees = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'hoaFees' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateClosingCosts = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'closingCosts' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateClosingCostsRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'closingCosts' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInvestmentReturnRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'investmentReturnRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInvestmentReturnRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'investmentReturnRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInvestmentReturnRateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'investmentReturnRate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateTaxBracket = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'taxBracket' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateTaxBracketRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'taxBracket' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateTimeHorizon = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'timeHorizon' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateTimeHorizonRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'timeHorizon' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateTimeHorizonBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'timeHorizon' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHomeAppreciationRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'homeAppreciationRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHomeAppreciationRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'homeAppreciationRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHomeAppreciationRateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'homeAppreciationRate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInflationRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'inflationRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInflationRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageVsRentValidationRules.find(r => r.field === 'inflationRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};
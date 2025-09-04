import { netOperatingIncomeValidationRules } from './validation';

export const validateBaseRent = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'baseRent' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBaseRentRange = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'baseRent' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateAdditionalIncome = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'additionalIncome' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateVacancyRate = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'vacancyRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateVacancyRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'vacancyRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateVacancyRateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'vacancyRate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyManagementFee = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'propertyManagementFee' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyManagementFeeRange = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'propertyManagementFee' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyManagementFeeBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'propertyManagementFee' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateMaintenanceCosts = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'maintenanceCosts' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateMaintenanceCostsRange = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'maintenanceCosts' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateMaintenanceCostsBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'maintenanceCosts' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyTaxes = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'propertyTaxes' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyTaxesRange = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'propertyTaxes' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyInsurance = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'propertyInsurance' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyInsuranceRange = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'propertyInsurance' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateUtilities = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'utilities' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHoaFees = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'hoaFees' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLegalFees = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'legalFees' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateAccountingFees = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'accountingFees' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateAdvertisingCosts = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'advertisingCosts' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateOtherExpenses = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'otherExpenses' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyValue = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'propertyValue' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateOperatingExpenseRatio = (value: any, allInputs: Record<string, any>) => {
  const rule = netOperatingIncomeValidationRules.find(r => r.field === 'operatingExpenseRatio' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};
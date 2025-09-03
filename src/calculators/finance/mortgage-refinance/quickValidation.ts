import { mortgageRefinanceValidationRules } from './validation';

export const validateCurrentLoanAmount = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'currentLoanAmount' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCurrentLoanAmountRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'currentLoanAmount' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCurrentInterestRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'currentInterestRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCurrentInterestRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'currentInterestRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCurrentRemainingTerm = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'currentRemainingTerm' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCurrentRemainingTermRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'currentRemainingTerm' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCurrentRemainingTermBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'currentRemainingTerm' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCurrentMonthlyPayment = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'currentMonthlyPayment' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateNewLoanAmount = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'newLoanAmount' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateNewLoanAmountRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'newLoanAmount' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateNewLoanAmountBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'newLoanAmount' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateNewInterestRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'newInterestRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateNewInterestRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'newInterestRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateNewInterestRateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'newInterestRate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateNewLoanTerm = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'newLoanTerm' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateNewLoanTermRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'newLoanTerm' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateRefinanceType = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'refinanceType' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyValue = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'propertyValue' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyValueRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'propertyValue' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateClosingCosts = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'closingCosts' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateClosingCostsRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'closingCosts' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateClosingCostsBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'closingCosts' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateOriginationFee = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'originationFee' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateAppraisalFee = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'appraisalFee' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateTitleInsuranceFee = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'titleInsuranceFee' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBorrowerIncome = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'borrowerIncome' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBorrowerCreditScore = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'borrowerCreditScore' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBorrowerTaxRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'borrowerTaxRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateRefinanceGoal = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'refinanceGoal' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateTargetMonthlySavings = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'targetMonthlySavings' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCashOutAmount = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'cashOutAmount' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCashOutAmountBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageRefinanceValidationRules.find(r => r.field === 'cashOutAmount' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};
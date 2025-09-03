import { mortgageQualificationValidationRules } from './validation';

export const validateBorrowerIncome = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'borrowerIncome' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBorrowerIncomeRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'borrowerIncome' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBorrowerIncomeBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'borrowerIncome' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCoBorrowerIncome = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'coBorrowerIncome' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBorrowerCreditScore = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'borrowerCreditScore' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBorrowerCreditScoreRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'borrowerCreditScore' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBorrowerCreditScoreBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'borrowerCreditScore' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCoBorrowerCreditScore = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'coBorrowerCreditScore' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateBorrowerEmploymentLength = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'borrowerEmploymentLength' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyValue = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'propertyValue' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyValueRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'propertyValue' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanAmount = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'loanAmount' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanAmountRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'loanAmount' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanAmountBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'loanAmount' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInterestRate = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'interestRate' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInterestRateRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'interestRate' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateInterestRateBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'interestRate' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanTerm = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'loanTerm' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateLoanTermRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'loanTerm' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDownPayment = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'downPayment' && r.type === 'required');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDownPaymentRange = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'downPayment' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateDownPaymentBusiness = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'downPayment' && r.type === 'business');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyTaxes = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'propertyTaxes' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validatePropertyInsurance = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'propertyInsurance' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateHoaFees = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'hoaFees' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateCreditCardDebt = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'creditCardDebt' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateAutoLoanDebt = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'autoLoanDebt' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateStudentLoanDebt = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'studentLoanDebt' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};

export const validateOtherDebt = (value: any, allInputs: Record<string, any>) => {
  const rule = mortgageQualificationValidationRules.find(r => r.field === 'otherDebt' && r.type === 'range');
  return rule ? rule.validator(value, allInputs) : true;
};
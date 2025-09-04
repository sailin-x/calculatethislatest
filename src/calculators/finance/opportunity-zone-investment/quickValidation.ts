import { opportunityZoneInvestmentValidationRules } from './validation';

// Helper function to find validation rule by field and type
function findValidationRule(field: string, type: string) {
  return opportunityZoneInvestmentValidationRules.find(rule => rule.field === field && rule.type === type);
}

// Required field validations
export function validateInitialInvestment(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('initialInvestment', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateInvestmentTimeline(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('investmentTimeline', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualAppreciationRate(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualAppreciationRate', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualRentalIncome(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualRentalIncome', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateRentalIncomeGrowthRate(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('rentalIncomeGrowthRate', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateCurrentTaxBracket(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('currentTaxBracket', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateCapitalGainsTaxRate(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('capitalGainsTaxRate', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateDeferralPeriod(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('deferralPeriod', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualOperatingExpenses(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualOperatingExpenses', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualPropertyTaxes(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualPropertyTaxes', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualInsurance(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualInsurance', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateAcquisitionCosts(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('acquisitionCosts', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateExitCosts(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('exitCosts', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateAlternativeInvestmentReturn(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('alternativeInvestmentReturn', 'required');
  return rule ? rule.validator(value) : true;
}

export function validateInflationRate(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('inflationRate', 'required');
  return rule ? rule.validator(value) : true;
}

// Range validations
export function validateInitialInvestmentRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('initialInvestment', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateInvestmentTimelineRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('investmentTimeline', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualAppreciationRateRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualAppreciationRate', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualRentalIncomeRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualRentalIncome', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateRentalIncomeGrowthRateRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('rentalIncomeGrowthRate', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateCurrentTaxBracketRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('currentTaxBracket', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateCapitalGainsTaxRateRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('capitalGainsTaxRate', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateDeferralPeriodRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('deferralPeriod', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualOperatingExpensesRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualOperatingExpenses', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualPropertyTaxesRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualPropertyTaxes', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateAnnualInsuranceRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualInsurance', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateAcquisitionCostsRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('acquisitionCosts', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateExitCostsRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('exitCosts', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateAlternativeInvestmentReturnRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('alternativeInvestmentReturn', 'range');
  return rule ? rule.validator(value) : true;
}

export function validateInflationRateRange(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('inflationRate', 'range');
  return rule ? rule.validator(value) : true;
}

// Business rule validations
export function validateInvestmentTimelineBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('investmentTimeline', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateDeferralPeriodBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('deferralPeriod', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateAnnualRentalIncomeBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualRentalIncome', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateAnnualOperatingExpensesBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('annualOperatingExpenses', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateAcquisitionCostsBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('acquisitionCosts', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateExitCostsBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('exitCosts', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateCapitalGainsTaxRateBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('capitalGainsTaxRate', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateAlternativeInvestmentReturnBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('alternativeInvestmentReturn', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}

export function validateInflationRateBusiness(value: any, allInputs: Record<string, any>): boolean {
  const rule = findValidationRule('inflationRate', 'business');
  return rule ? rule.validator(value, allInputs) : true;
}
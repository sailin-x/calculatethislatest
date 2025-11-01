import { CapitalStructureOptimizationInputs } from './types';

// Property Information Validators
export function validateTotalAssets(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Total assets is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 100000 || value > 100000000000) return { isValid: false, message: 'Must be between $100,000 and $100,000,000,000' };
  return { isValid: true };
}

export function validateTotalDebt(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Total debt is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (allInputs?.totalAssets && value > allInputs.totalAssets) return { isValid: false, message: 'Cannot exceed total assets' };
  return { isValid: true };
}

export function validateTotalEquity(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Total equity is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (allInputs?.totalAssets && value > allInputs.totalAssets) return { isValid: false, message: 'Cannot exceed total assets' };
  return { isValid: true };
}

// Cost Validators
export function validateCostOfDebt(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Cost of debt is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 0.5) return { isValid: false, message: 'Must be less than 50%' };
  return { isValid: true };
}

export function validateCostOfEquity(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Cost of equity is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 0.5) return { isValid: false, message: 'Must be less than 50%' };
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Tax rate is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 1) return { isValid: false, message: 'Must be less than or equal to 100%' };
  return { isValid: true };
}

// Market Data Validators
export function validateRiskFreeRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Risk-free rate is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 0.2) return { isValid: false, message: 'Must be less than 20%' };
  return { isValid: true };
}

export function validateMarketRiskPremium(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Market risk premium is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 0.2) return { isValid: false, message: 'Must be less than 20%' };
  return { isValid: true };
}

export function validateBeta(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Beta is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 5) return { isValid: false, message: 'Must be less than or equal to 5' };
  return { isValid: true };
}

// Ratio Validators
export function validateTargetDebtRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Target debt ratio is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 1) return { isValid: false, message: 'Must be less than or equal to 100%' };
  return { isValid: true };
}

export function validateCurrentDebtRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Current debt ratio is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 1) return { isValid: false, message: 'Must be less than or equal to 100%' };
  return { isValid: true };
}

// Analysis Parameters Validators
export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Analysis period is required' };
  if (typeof value !== 'number' || value < 1) return { isValid: false, message: 'Must be at least 1 year' };
  if (value > 50) return { isValid: false, message: 'Must be 50 years or less' };
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Inflation rate is required' };
  if (typeof value !== 'number' || value < -0.1) return { isValid: false, message: 'Must be -10% or higher' };
  if (value > 0.2) return { isValid: false, message: 'Must be 20% or less' };
  return { isValid: true };
}

export function validateGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Growth rate is required' };
  if (typeof value !== 'number' || value < -0.1) return { isValid: false, message: 'Must be -10% or higher' };
  if (value > 0.2) return { isValid: false, message: 'Must be 20% or less' };
  return { isValid: true };
}

// Company Information Validators
export function validateCompanyType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Company type is required' };
  const validTypes = ['public', 'private', 'startup', 'mature'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid company type' };
  return { isValid: true };
}

export function validateIndustry(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) return { isValid: false, message: 'Industry is required' };
  return { isValid: true };
}

export function validateCreditRating(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Credit rating is required' };
  const validRatings = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C', 'D'];
  if (!validRatings.includes(value)) return { isValid: false, message: 'Invalid credit rating' };
  return { isValid: true };
}

export function validateAllCapitalStructureOptimizationInputs(inputs: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Property Information
  const totalAssetsResult = validateTotalAssets(inputs.totalAssets);
  if (!totalAssetsResult.isValid) errors.push(totalAssetsResult.message!);

  const totalDebtResult = validateTotalDebt(inputs.totalDebt, inputs);
  if (!totalDebtResult.isValid) errors.push(totalDebtResult.message!);

  const totalEquityResult = validateTotalEquity(inputs.totalEquity, inputs);
  if (!totalEquityResult.isValid) errors.push(totalEquityResult.message!);

  // Costs
  const costOfDebtResult = validateCostOfDebt(inputs.costOfDebt);
  if (!costOfDebtResult.isValid) errors.push(costOfDebtResult.message!);

  const costOfEquityResult = validateCostOfEquity(inputs.costOfEquity);
  if (!costOfEquityResult.isValid) errors.push(costOfEquityResult.message!);

  const taxRateResult = validateTaxRate(inputs.taxRate);
  if (!taxRateResult.isValid) errors.push(taxRateResult.message!);

  // Market Data
  const riskFreeRateResult = validateRiskFreeRate(inputs.riskFreeRate);
  if (!riskFreeRateResult.isValid) errors.push(riskFreeRateResult.message!);

  const marketRiskPremiumResult = validateMarketRiskPremium(inputs.marketRiskPremium);
  if (!marketRiskPremiumResult.isValid) errors.push(marketRiskPremiumResult.message!);

  const betaResult = validateBeta(inputs.beta);
  if (!betaResult.isValid) errors.push(betaResult.message!);

  // Ratios
  const targetDebtRatioResult = validateTargetDebtRatio(inputs.targetDebtRatio);
  if (!targetDebtRatioResult.isValid) errors.push(targetDebtRatioResult.message!);

  const currentDebtRatioResult = validateCurrentDebtRatio(inputs.currentDebtRatio);
  if (!currentDebtRatioResult.isValid) errors.push(currentDebtRatioResult.message!);

  // Analysis Parameters
  const analysisPeriodResult = validateAnalysisPeriod(inputs.analysisPeriod);
  if (!analysisPeriodResult.isValid) errors.push(analysisPeriodResult.message!);

  const inflationRateResult = validateInflationRate(inputs.inflationRate);
  if (!inflationRateResult.isValid) errors.push(inflationRateResult.message!);

  const growthRateResult = validateGrowthRate(inputs.growthRate);
  if (!growthRateResult.isValid) errors.push(growthRateResult.message!);

  // Company Information
  const companyTypeResult = validateCompanyType(inputs.companyType);
  if (!companyTypeResult.isValid) errors.push(companyTypeResult.message!);

  const industryResult = validateIndustry(inputs.industry);
  if (!industryResult.isValid) errors.push(industryResult.message!);

  const creditRatingResult = validateCreditRating(inputs.creditRating);
  if (!creditRatingResult.isValid) errors.push(creditRatingResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}
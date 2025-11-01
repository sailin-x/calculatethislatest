import { CAPMInputs } from './types';

// Risk-Free Rate Validators
export function validateRiskFreeRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Risk-free rate is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 0.2) return { isValid: false, message: 'Must be 20% or less' };
  return { isValid: true };
}

export function validateMarketRiskPremium(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Market risk premium is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 0.2) return { isValid: false, message: 'Must be 20% or less' };
  return { isValid: true };
}

export function validateBeta(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Beta is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 5) return { isValid: false, message: 'Must be 5 or less' };
  return { isValid: true };
}

export function validateCompanyName(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'string' || value.trim().length === 0)) return { isValid: false, message: 'Must be a non-empty string' };
  return { isValid: true };
}

export function validateIndustry(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'string' || value.trim().length === 0)) return { isValid: false, message: 'Must be a non-empty string' };
  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 1 || value > 50)) return { isValid: false, message: 'Must be between 1 and 50 years' };
  return { isValid: true };
}

export function validateHistoricalBeta(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 5)) return { isValid: false, message: 'Must be between 0 and 5' };
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 1)) return { isValid: false, message: 'Must be between 0 and 100%' };
  return { isValid: true };
}

export function validateDebtRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 1)) return { isValid: false, message: 'Must be between 0 and 100%' };
  return { isValid: true };
}

export function validateAllCAPMInputs(inputs: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  const riskFreeRateResult = validateRiskFreeRate(inputs.riskFreeRate);
  if (!riskFreeRateResult.isValid) errors.push(riskFreeRateResult.message!);

  const marketRiskPremiumResult = validateMarketRiskPremium(inputs.marketRiskPremium);
  if (!marketRiskPremiumResult.isValid) errors.push(marketRiskPremiumResult.message!);

  const betaResult = validateBeta(inputs.beta);
  if (!betaResult.isValid) errors.push(betaResult.message!);

  // Optional fields
  const companyNameResult = validateCompanyName(inputs.companyName);
  if (!companyNameResult.isValid) errors.push(companyNameResult.message!);

  const industryResult = validateIndustry(inputs.industry);
  if (!industryResult.isValid) errors.push(industryResult.message!);

  const analysisPeriodResult = validateAnalysisPeriod(inputs.analysisPeriod);
  if (!analysisPeriodResult.isValid) errors.push(analysisPeriodResult.message!);

  const historicalBetaResult = validateHistoricalBeta(inputs.historicalBeta);
  if (!historicalBetaResult.isValid) errors.push(historicalBetaResult.message!);

  const taxRateResult = validateTaxRate(inputs.taxRate);
  if (!taxRateResult.isValid) errors.push(taxRateResult.message!);

  const debtRatioResult = validateDebtRatio(inputs.debtRatio);
  if (!debtRatioResult.isValid) errors.push(debtRatioResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}
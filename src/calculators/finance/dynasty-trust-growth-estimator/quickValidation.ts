import { DynastyTrustGrowthEstimatorInputs } from './types';

export function validateInitialTrustValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Initial trust value must be greater than 0' };
  }

  if (value > 10000000) {
    return { isValid: true, error: 'Large trust value - consider GST exemption utilization' };
  }

  return { isValid: true };
}

export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < -0.1 || value > 0.2) {
    return { isValid: false, error: 'Expected annual return must be between -10% and 20%' };
  }

  if (value > 0.1) {
    return { isValid: true, error: 'High return expectations may be unrealistic for long-term planning' };
  }

  if (value < 0.04) {
    return { isValid: true, error: 'Low return may not keep pace with inflation' };
  }

  return { isValid: true };
}

export function validateNumberOfGenerations(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 10) {
    return { isValid: false, error: 'Number of generations must be between 1 and 10' };
  }

  if (value > 5) {
    return { isValid: true, error: 'Planning for many generations increases uncertainty' };
  }

  return { isValid: true };
}

export function validateGenerationSkippingTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.5)) {
    return { isValid: false, error: 'GST tax rate must be between 0% and 50%' };
  }

  if (value > 0.4) {
    return { isValid: true, error: 'High GST rate may significantly impact wealth transfer' };
  }

  return { isValid: true };
}

export function validateEstateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.5)) {
    return { isValid: false, error: 'Estate tax rate must be between 0% and 50%' };
  }

  if (value > 0.4) {
    return { isValid: true, error: 'High estate tax rate may erode trust value' };
  }

  return { isValid: true };
}

export function validateGstExemptionAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'GST exemption amount cannot be negative' };
  }

  if (value > 10000000) {
    return { isValid: true, error: 'Large GST exemption provides significant tax protection' };
  }

  return { isValid: true };
}

export function validateAnalysisHorizon(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 10 || value > 200) {
    return { isValid: false, error: 'Analysis horizon must be between 10 and 200 years' };
  }

  if (value < 50) {
    return { isValid: true, error: 'Short horizon may not capture full multi-generational impact' };
  }

  return { isValid: true };
}

export function validateAnnualContributions(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual contributions cannot be negative' };
  }

  if (value > 100000) {
    return { isValid: true, error: 'Large annual contributions will significantly grow trust value' };
  }

  return { isValid: true };
}

export function validateAnnualAdministrativeFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual administrative fees cannot be negative' };
  }

  if (value > 10000) {
    return { isValid: true, error: 'High administrative fees may impact long-term growth' };
  }

  return { isValid: true };
}

export function validateInvestmentManagementFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Investment management fees cannot be negative' };
  }

  if (value > 50000) {
    return { isValid: true, error: 'High investment management fees may reduce returns' };
  }

  return { isValid: true };
}

export function validateTrusteeFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Trustee fees cannot be negative' };
  }

  if (value > 25000) {
    return { isValid: true, error: 'High trustee fees may impact trust efficiency' };
  }

  return { isValid: true };
}

export function validateAnnualDistributionRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.1)) {
    return { isValid: false, error: 'Annual distribution rate must be between 0% and 10%' };
  }

  if (value > 0.05) {
    return { isValid: true, error: 'High distribution rate may deplete trust principal' };
  }

  return { isValid: true };
}

export function validateMinimumDistributionAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Minimum distribution amount cannot be negative' };
  }

  return { isValid: true };
}

export function validateMarketVolatility(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.5)) {
    return { isValid: false, error: 'Market volatility must be between 0% and 50%' };
  }

  if (value > 0.2) {
    return { isValid: true, error: 'High volatility increases risk of significant value fluctuations' };
  }

  return { isValid: true };
}

export function validateLongevityRisk(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.5)) {
    return { isValid: false, error: 'Longevity risk must be between 0% and 50%' };
  }

  return { isValid: true };
}

export function validateRegulatoryRisk(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.5)) {
    return { isValid: false, error: 'Regulatory risk must be between 0% and 50%' };
  }

  return { isValid: true };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.2)) {
    return { isValid: false, error: 'Discount rate must be between 0% and 20%' };
  }

  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -0.05 || value > 0.1)) {
    return { isValid: false, error: 'Inflation rate must be between -5% and 10%' };
  }

  if (value > 0.04) {
    return { isValid: true, error: 'High inflation may erode purchasing power' };
  }

  return { isValid: true };
}

export function validateContributionGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -0.1 || value > 0.2)) {
    return { isValid: false, error: 'Contribution growth rate must be between -10% and 20%' };
  }

  if (allInputs?.expectedAnnualReturn && value > allInputs.expectedAnnualReturn) {
    return { isValid: true, error: 'Contribution growth exceeds investment return' };
  }

  return { isValid: true };
}

export function validateIncomeTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.5)) {
    return { isValid: false, error: 'Income tax rate must be between 0% and 50%' };
  }

  return { isValid: true };
}

export function validateGenerationInterval(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 20 || value > 50) {
    return { isValid: false, error: 'Generation interval must be between 20 and 50 years' };
  }

  return { isValid: true };
}

export function validateBeneficiaryLifeExpectancy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 70 || value > 120) {
    return { isValid: false, error: 'Beneficiary life expectancy must be between 70 and 120' };
  }

  return { isValid: true };
}

export function validateTrustDuration(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 360) {
    return { isValid: false, error: 'Trust duration must be between 1 and 360 years' };
  }

  if (value > 100) {
    return { isValid: true, error: 'Long trust duration may face rule against perpetuities' };
  }

  return { isValid: true };
}

export function validateCurrency(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!value || !validCurrencies.includes(value)) {
    return { isValid: false, error: 'Please select a valid currency' };
  }

  return { isValid: true };
}

export function validateTrustType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['grantor', 'non_grantor', 'perpetual', 'rule_against_perpetuities'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid trust type' };
  }

  return { isValid: true };
}

export function validateDistributionStrategy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['equal', 'needs_based', 'percentage', 'discretionary'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid distribution strategy' };
  }

  return { isValid: true };
}

export function validateStateOfCreation(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'State of creation is required' };
  }

  return { isValid: true };
}
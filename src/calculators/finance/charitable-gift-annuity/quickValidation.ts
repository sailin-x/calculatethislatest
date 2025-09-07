import { CharitableGiftAnnuityInputs } from './types';

export function validateDonorAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 18 || value > 100) {
    return { isValid: false, error: 'Donor age must be between 18 and 100' };
  }

  if (value >= 70) {
    return { isValid: true, error: 'Age 70½+ may trigger RMD requirements' };
  }

  return { isValid: true };
}

export function validateAnnuityAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 0 || value > 100) {
    return { isValid: false, error: 'Annuity age must be between 0 and 100' };
  }

  if (allInputs?.donorAge && value < allInputs.donorAge) {
    return { isValid: false, error: 'Annuity age cannot be less than donor age' };
  }

  return { isValid: true };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0 || value > 120) {
    return { isValid: false, error: 'Life expectancy must be between 1 and 120' };
  }

  if (allInputs?.donorAge && value <= allInputs.donorAge) {
    return { isValid: false, error: 'Life expectancy must be greater than donor age' };
  }

  return { isValid: true };
}

export function validateFilingStatus(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validStatuses = ['single', 'married_filing_jointly', 'married_filing_separately', 'head_of_household'];
  if (!value || !validStatuses.includes(value)) {
    return { isValid: false, error: 'Please select a valid filing status' };
  }

  return { isValid: true };
}

export function validateGiftAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Gift amount must be greater than 0' };
  }

  if (value < 10000) {
    return { isValid: true, error: 'Small gift amounts may have limited benefits' };
  }

  if (value > 1000000) {
    return { isValid: true, error: 'Large gifts may require special tax considerations' };
  }

  return { isValid: true };
}

export function validateFairMarketValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Fair market value must be greater than 0' };
  }

  return { isValid: true };
}

export function validateCostBasis(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Cost basis cannot be negative' };
  }

  if (allInputs?.fairMarketValue && value > allInputs.fairMarketValue) {
    return { isValid: false, error: 'Cost basis cannot exceed fair market value' };
  }

  return { isValid: true };
}

export function validateGiftType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validTypes = ['cash', 'securities', 'real_estate', 'other_appreciated_property'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Please select a valid gift type' };
  }

  if (value === 'real_estate' || value === 'other_appreciated_property') {
    return { isValid: true, error: 'Appreciated property may have complex tax implications' };
  }

  return { isValid: true };
}

export function validateAnnuityRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0 || value > 20)) {
    return { isValid: false, error: 'Annuity rate must be between 0 and 20 percent' };
  }

  if (value < 4) {
    return { isValid: true, error: 'Low annuity rate may result in modest payments' };
  }

  if (value > 8) {
    return { isValid: true, error: 'High annuity rate may indicate higher risk' };
  }

  return { isValid: true };
}

export function validatePaymentFrequency(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validFrequencies = ['monthly', 'quarterly', 'semi_annual', 'annual'];
  if (!value || !validFrequencies.includes(value)) {
    return { isValid: false, error: 'Please select a valid payment frequency' };
  }

  return { isValid: true };
}

export function validateAnnuityType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validTypes = ['immediate', 'deferred'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Please select immediate or deferred annuity' };
  }

  return { isValid: true };
}

export function validateDeferralPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (allInputs?.annuityType !== 'deferred') {
    return { isValid: true }; // Not required for immediate annuities
  }

  if (!value || typeof value !== 'number' || value < 1 || value > 30) {
    return { isValid: false, error: 'Deferral period must be between 1 and 30 years' };
  }

  if (value > 10) {
    return { isValid: true, error: 'Long deferral may reduce present value' };
  }

  return { isValid: true };
}

export function validateMarginalTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, error: 'Marginal tax rate must be between 0 and 50 percent' };
  }

  if (value > 35) {
    return { isValid: true, error: 'High tax rate maximizes deduction benefits' };
  }

  return { isValid: true };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 40)) {
    return { isValid: false, error: 'State tax rate must be between 0 and 40 percent' };
  }

  if (value > 8) {
    return { isValid: true, error: 'High state tax rate reduces benefits' };
  }

  return { isValid: true };
}

export function validateCapitalGainsTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, error: 'Capital gains tax rate must be between 0 and 50 percent' };
  }

  return { isValid: true };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -20 || value > 30)) {
    return { isValid: false, error: 'Expected return must be between -20% and 30%' };
  }

  if (value > 10) {
    return { isValid: true, error: 'Return above 10% may be unrealistic' };
  }

  if (value < 3) {
    return { isValid: true, error: 'Return below 3% may favor annuity' };
  }

  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -5 || value > 15)) {
    return { isValid: false, error: 'Inflation rate must be between -5% and 15%' };
  }

  if (value > 4) {
    return { isValid: true, error: 'High inflation may erode annuity value' };
  }

  return { isValid: true };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 20)) {
    return { isValid: false, error: 'Discount rate must be between 0 and 20 percent' };
  }

  if (value > 8) {
    return { isValid: true, error: 'High discount rate may undervalue benefits' };
  }

  return { isValid: true };
}

export function validateCharityType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validTypes = ['public_charity', 'private_foundation', 'university', 'hospital', 'church'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Please select a valid charity type' };
  }

  if (value === 'private_foundation') {
    return { isValid: true, error: 'Private foundations have different deduction limits' };
  }

  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0 || value > 50) {
    return { isValid: false, error: 'Analysis period must be between 1 and 50 years' };
  }

  if (value < 10) {
    return { isValid: true, error: 'Short period may not capture long-term benefits' };
  }

  if (value > 30) {
    return { isValid: true, error: 'Long period increases uncertainty' };
  }

  return { isValid: true };
}

export function validateSurvivorAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!allInputs?.survivorBenefit) {
    return { isValid: true }; // Not required if no survivor benefit
  }

  if (!value || typeof value !== 'number' || value < 0 || value > 120) {
    return { isValid: false, error: 'Survivor age must be between 0 and 120' };
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

export function validateIncludeStateTaxes(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include state taxes must be true or false' };
  }

  return { isValid: true };
}

export function validateSurvivorBenefit(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Survivor benefit must be true or false' };
  }

  if (value) {
    return { isValid: true, error: 'Survivor benefits may reduce payment amounts' };
  }

  return { isValid: true };
}

export function validateTaxAdvantaged(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Tax advantaged must be true or false' };
  }

  return { isValid: true };
}
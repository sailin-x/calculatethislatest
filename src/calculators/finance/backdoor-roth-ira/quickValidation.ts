import { BackdoorRothIRAInputs } from './types';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 18 || value > 100) {
    return { isValid: false, error: 'Current age must be between 18 and 100' };
  }

  if (value >= 72) {
    return { isValid: true, error: 'Age 72+ triggers RMD requirements - consider Roth benefits' };
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

export function validateModifiedAGILimit(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Modified AGI limit must be greater than 0' };
  }

  if (value < 100000) {
    return { isValid: true, error: 'Low MAGI limit may restrict traditional IRA contributions' };
  }

  return { isValid: true };
}

export function validateTraditionalIRABalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Traditional IRA balance cannot be negative' };
  }

  return { isValid: true };
}

export function validateRothIRABalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Roth IRA balance cannot be negative' };
  }

  return { isValid: true };
}

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual contribution cannot be negative' };
  }

  if (value > 6000) {
    return { isValid: true, error: 'Contribution exceeds standard IRA limit - verify eligibility' };
  }

  return { isValid: true };
}

export function validateConversionAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Conversion amount must be greater than 0' };
  }

  if (value > 100000) {
    return { isValid: true, error: 'Large conversion may trigger higher tax brackets' };
  }

  return { isValid: true };
}

export function validateMarginalTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, error: 'Marginal tax rate must be between 0 and 50 percent' };
  }

  if (value > 35) {
    return { isValid: true, error: 'High tax rate reduces conversion benefits' };
  }

  return { isValid: true };
}

export function validateCapitalGainsTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, error: 'Capital gains tax rate must be between 0 and 50 percent' };
  }

  return { isValid: true };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 40)) {
    return { isValid: false, error: 'State tax rate must be between 0 and 40 percent' };
  }

  if (value > 10) {
    return { isValid: true, error: 'High state tax rate increases conversion costs' };
  }

  return { isValid: true };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -20 || value > 30)) {
    return { isValid: false, error: 'Expected return must be between -20% and 30%' };
  }

  if (value > 12) {
    return { isValid: true, error: 'Return above 12% may be unrealistic' };
  }

  if (value < 4) {
    return { isValid: true, error: 'Return below 4% may not justify conversion costs' };
  }

  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -5 || value > 15)) {
    return { isValid: false, error: 'Inflation rate must be between -5% and 15%' };
  }

  if (value > 4) {
    return { isValid: true, error: 'High inflation reduces traditional IRA benefits' };
  }

  return { isValid: true };
}

export function validateConversionFrequency(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validFrequencies = ['annual', 'semi_annual', 'quarterly', 'monthly'];
  if (!value || !validFrequencies.includes(value)) {
    return { isValid: false, error: 'Please select a valid conversion frequency' };
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
    return { isValid: true, error: 'Long period increases projection uncertainty' };
  }

  return { isValid: true };
}

export function validateConversionFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Conversion fees cannot be negative' };
  }

  if (value > 100) {
    return { isValid: true, error: 'High fees may reduce strategy effectiveness' };
  }

  return { isValid: true };
}

export function validateAccountFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Account fees cannot be negative' };
  }

  if (value > 200) {
    return { isValid: true, error: 'High fees may erode tax benefits' };
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

export function validateIncludeRequiredMinimumDistributions(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include RMDs must be true or false' };
  }

  if (value && allInputs?.currentAge && allInputs.currentAge < 70) {
    return { isValid: true, error: 'RMDs not required until age 72' };
  }

  return { isValid: true };
}

export function validateRecharacterizationStrategy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Recharacterization strategy must be true or false' };
  }

  if (value) {
    return { isValid: true, error: 'Recharacterization no longer available after 2017' };
  }

  return { isValid: true };
}

export function validateFiveYearRule(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: '5-year rule must be true or false' };
  }

  if (value && allInputs?.currentAge && allInputs.currentAge > 55) {
    return { isValid: true, error: '5-year rule may not apply if over age 59½' };
  }

  return { isValid: true };
}

export function validateTaxAdvantaged(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Tax advantaged must be true or false' };
  }

  return { isValid: true };
}
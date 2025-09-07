import { DeferredAnnuityInputs } from './types';

export function validateInitialInvestment(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Initial investment cannot be negative' };
  }

  if (value > 1000000) {
    return { isValid: true, error: 'Large investment - consider tax implications' };
  }

  return { isValid: true };
}

export function validateMonthlyContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Monthly contribution cannot be negative' };
  }

  if (value > 5000) {
    return { isValid: true, error: 'High monthly contribution - ensure sustainable' };
  }

  if (value < 50) {
    return { isValid: true, error: 'Low monthly contribution may not meet goals' };
  }

  return { isValid: true };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 18 || value > 80) {
    return { isValid: false, error: 'Current age must be between 18 and 80' };
  }

  if (value > 70) {
    return { isValid: true, error: 'Consider RMD requirements for traditional accounts' };
  }

  return { isValid: true };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 50 || value > 100) {
    return { isValid: false, error: 'Retirement age must be between 50 and 100' };
  }

  if (value < 62) {
    return { isValid: true, error: 'Early retirement may affect Social Security benefits' };
  }

  if (value > 70) {
    return { isValid: true, error: 'Delayed retirement maximizes accumulation' };
  }

  return { isValid: true };
}

export function validateAnnuityStartAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 50 || value > 100) {
    return { isValid: false, error: 'Annuity start age must be between 50 and 100' };
  }

  if (allInputs?.retirementAge && value < allInputs.retirementAge) {
    return { isValid: false, error: 'Annuity start age cannot be before retirement age' };
  }

  if (value > 85) {
    return { isValid: true, error: 'Late annuity start reduces payout period' };
  }

  return { isValid: true };
}

export function validateExpectedReturnRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < -0.1 || value > 0.2) {
    return { isValid: false, error: 'Expected return rate must be between -10% and 20%' };
  }

  if (value > 0.12) {
    return { isValid: true, error: 'High return expectations may be unrealistic' };
  }

  if (value < 0.03) {
    return { isValid: true, error: 'Low return may not keep pace with inflation' };
  }

  return { isValid: true };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 70 || value > 120) {
    return { isValid: false, error: 'Life expectancy must be between 70 and 120' };
  }

  if (allInputs?.annuityStartAge && value <= allInputs.annuityStartAge) {
    return { isValid: false, error: 'Life expectancy must be greater than annuity start age' };
  }

  if (value > 100) {
    return { isValid: true, error: 'Long life expectancy increases longevity risk' };
  }

  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.5)) {
    return { isValid: false, error: 'Tax bracket must be between 0% and 50%' };
  }

  if (value > 0.35) {
    return { isValid: true, error: 'High tax bracket - maximize tax-advantaged strategies' };
  }

  return { isValid: true };
}

export function validateAnnuityType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['fixed', 'variable', 'immediate', 'deferred'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid annuity type' };
  }

  return { isValid: true };
}

export function validatePayoutType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['lifetime', 'period_certain', 'joint_survivor', 'lump_sum'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid payout type' };
  }

  return { isValid: true };
}

export function validateAccountType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['traditional', 'roth', 'non_qualified'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid account type' };
  }

  if (value === 'traditional' && allInputs?.currentAge && allInputs.currentAge > 70) {
    return { isValid: true, error: 'RMD requirements apply to traditional accounts' };
  }

  return { isValid: true };
}

export function validateExpenseRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.1)) {
    return { isValid: false, error: 'Expense ratio must be between 0% and 10%' };
  }

  if (value > 0.02) {
    return { isValid: true, error: 'High expense ratio may reduce returns significantly' };
  }

  return { isValid: true };
}

export function validateSurrenderCharges(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Surrender charges cannot be negative' };
  }

  if (value > 0.1) {
    return { isValid: true, error: 'High surrender charges may limit liquidity' };
  }

  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 50) {
    return { isValid: false, error: 'Analysis period must be between 1 and 50 years' };
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

export function validateRiskTolerance(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['conservative', 'moderate', 'aggressive'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid risk tolerance' };
  }

  return { isValid: true };
}

export function validateInvestmentType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['fixed', 'variable', 'indexed'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid investment type' };
  }

  return { isValid: true };
}

export function validatePayoutFrequency(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['monthly', 'quarterly', 'annually'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid payout frequency' };
  }

  return { isValid: true };
}

export function validateIncludeSocialSecurity(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Social Security inclusion must be true or false' };
  }

  return { isValid: true };
}

export function validateSocialSecurityBenefit(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Social Security benefit cannot be negative' };
  }

  if (value > 50000) {
    return { isValid: true, error: 'High Social Security benefit - review annuity necessity' };
  }

  return { isValid: true };
}
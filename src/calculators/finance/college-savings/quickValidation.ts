import { CollegeSavingsInputs } from './types';

export function validateChildAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 0 || value > 18) {
    return { isValid: false, error: 'Child age must be between 0 and 18' };
  }

  if (value < 5) {
    return { isValid: true, error: 'Early start to college savings recommended' };
  }

  if (value > 15) {
    return { isValid: true, error: 'Limited time for college savings growth' };
  }

  return { isValid: true };
}

export function validateYearsUntilCollege(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 0 || value > 20) {
    return { isValid: false, error: 'Years until college must be between 0 and 20' };
  }

  if (value < 5) {
    return { isValid: true, error: 'Short timeframe - consider conservative investments' };
  }

  if (value > 15) {
    return { isValid: true, error: 'Long timeframe - can afford growth investments' };
  }

  return { isValid: true };
}

export function validateCurrentSavings(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Current savings cannot be negative' };
  }

  if (value > 100000) {
    return { isValid: true, error: 'Substantial savings - review investment strategy' };
  }

  return { isValid: true };
}

export function validateMonthlyContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Monthly contribution cannot be negative' };
  }

  if (value > 2000) {
    return { isValid: true, error: 'High monthly contribution - ensure sustainable' };
  }

  if (value < 50) {
    return { isValid: true, error: 'Low monthly contribution may not meet goals' };
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

export function validateExpectedCollegeCost(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Expected college cost must be greater than 0' };
  }

  if (value > 200000) {
    return { isValid: true, error: 'Very high cost - consider cost-saving strategies' };
  }

  if (value < 20000) {
    return { isValid: true, error: 'Low cost - verify includes all expenses' };
  }

  return { isValid: true };
}

export function validateYearsInCollege(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 2 || value > 8) {
    return { isValid: false, error: 'Years in college must be between 2 and 8' };
  }

  if (value > 4) {
    return { isValid: true, error: 'Extended college duration increases total cost' };
  }

  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.5)) {
    return { isValid: false, error: 'Tax bracket must be between 0% and 50%' };
  }

  if (value > 0.35) {
    return { isValid: true, error: 'High tax bracket - maximize tax-advantaged savings' };
  }

  return { isValid: true };
}

export function validateUse529Plan(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: '529 plan preference must be true or false' };
  }

  if (value && allInputs?.useCoverdellESA) {
    return { isValid: true, error: 'Both 529 and ESA selected - review contribution limits' };
  }

  return { isValid: true };
}

export function validateUseCoverdellESA(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'ESA preference must be true or false' };
  }

  if (value && allInputs?.use529Plan) {
    return { isValid: true, error: 'Both 529 and ESA selected - review contribution limits' };
  }

  return { isValid: true };
}

export function validateExpectedFinancialAid(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Expected financial aid cannot be negative' };
  }

  const collegeCost = allInputs?.expectedCollegeCost || 0;
  if (value > collegeCost * 0.8) {
    return { isValid: true, error: 'High aid expectation - verify realistic' };
  }

  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 30) {
    return { isValid: false, error: 'Analysis period must be between 1 and 30 years' };
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

export function validateIncludeStateTaxBenefits(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'State tax benefits preference must be true or false' };
  }

  return { isValid: true };
}
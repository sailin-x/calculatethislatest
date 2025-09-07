import { CoverdellESAInputs } from './types';

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Current balance cannot be negative' };
  }

  if (value > 50000) {
    return { isValid: true, error: 'Substantial balance - review investment strategy' };
  }

  return { isValid: true };
}

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual contribution cannot be negative' };
  }

  const maxLimit = 2000 * (allInputs?.useSpouseAccount ? 2 : 1);
  if (value > maxLimit) {
    return { isValid: false, error: `Contribution exceeds IRS limit of $${maxLimit}` };
  }

  if (value > maxLimit * 0.8) {
    return { isValid: true, error: 'Approaching annual contribution limit' };
  }

  return { isValid: true };
}

export function validateBeneficiaryAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 0 || value > 30) {
    return { isValid: false, error: 'Beneficiary age must be between 0 and 30' };
  }

  if (value > 18) {
    return { isValid: true, error: 'Limited time for tax-free contributions' };
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

export function validateYearsUntilEducation(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 0 || value > 25) {
    return { isValid: false, error: 'Years until education must be between 0 and 25' };
  }

  if (value < 5) {
    return { isValid: true, error: 'Short timeframe - consider conservative investments' };
  }

  if (value > 15) {
    return { isValid: true, error: 'Long timeframe - can afford growth investments' };
  }

  return { isValid: true };
}

export function validateExpectedEducationCost(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Expected education cost must be greater than 0' };
  }

  if (value > 100000) {
    return { isValid: true, error: 'Very high cost - consider cost-saving strategies' };
  }

  if (value < 20000) {
    return { isValid: true, error: 'Low cost - verify includes all expenses' };
  }

  return { isValid: true };
}

export function validateEducationDuration(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 8) {
    return { isValid: false, error: 'Education duration must be between 1 and 8 years' };
  }

  if (value > 4) {
    return { isValid: true, error: 'Extended education duration increases total cost' };
  }

  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.5)) {
    return { isValid: false, error: 'Tax bracket must be between 0% and 50%' };
  }

  if (value > 0.35) {
    return { isValid: true, error: 'High tax bracket - maximize tax benefits' };
  }

  return { isValid: true };
}

export function validateContributionFrequency(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['monthly', 'quarterly', 'annually'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid contribution frequency' };
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

export function validateRelationshipToOwner(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['parent', 'grandparent', 'other'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid relationship' };
  }

  if (value === 'other') {
    return { isValid: true, error: 'Non-family beneficiary - verify eligibility' };
  }

  return { isValid: true };
}

export function validateUseSpouseAccount(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Spouse account preference must be true or false' };
  }

  if (value) {
    return { isValid: true, error: 'Spouse account doubles contribution limit' };
  }

  return { isValid: true };
}

export function validateNumberOfBeneficiaries(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 1)) {
    return { isValid: false, error: 'Number of beneficiaries must be at least 1' };
  }

  if (value > 1) {
    return { isValid: true, error: 'Multiple beneficiaries - monitor contribution limits' };
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

export function validateIncludeStateTaxBenefits(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'State tax benefits preference must be true or false' };
  }

  return { isValid: true };
}
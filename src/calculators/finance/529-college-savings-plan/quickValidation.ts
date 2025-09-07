import { FiveTwoNineInputs } from './types';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 18 || value > 100) {
    return { isValid: false, error: 'Current age must be between 18 and 100' };
  }

  return { isValid: true };
}

export function validateChildAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 0 || value > 25) {
    return { isValid: false, error: 'Child age must be between 0 and 25' };
  }

  if (allInputs?.currentAge && value >= allInputs.currentAge) {
    return { isValid: false, error: 'Child age must be less than current age' };
  }

  return { isValid: true };
}

export function validateCollegeStartAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 17 || value > 30) {
    return { isValid: false, error: 'College start age must be between 17 and 30' };
  }

  if (allInputs?.childAge && value <= allInputs.childAge) {
    return { isValid: false, error: 'College start age must be greater than child age' };
  }

  if (value < 18) {
    return { isValid: true, error: 'Early college start may affect financial aid' };
  }

  return { isValid: true };
}

export function validateYearsUntilCollege(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 0 || value > 25) {
    return { isValid: false, error: 'Years until college must be between 0 and 25' };
  }

  if (value < 5) {
    return { isValid: true, error: 'Less than 5 years - consider aggressive savings' };
  }

  return { isValid: true };
}

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Current balance cannot be negative' };
  }

  return { isValid: true };
}

export function validateMonthlyContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Monthly contribution cannot be negative' };
  }

  if (value < 50) {
    return { isValid: true, error: 'Low monthly contribution may not keep pace with inflation' };
  }

  return { isValid: true };
}

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual contribution cannot be negative' };
  }

  if (value > 15000) {
    return { isValid: true, error: 'Contribution above $15,000 - verify 529 plan limits' };
  }

  return { isValid: true };
}

export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 20)) {
    return { isValid: false, error: 'Expected annual return must be between 0 and 20 percent' };
  }

  if (value > 12) {
    return { isValid: true, error: 'Return above 12% may be unrealistic' };
  }

  if (value < 4) {
    return { isValid: true, error: 'Return below 4% may not keep pace with inflation' };
  }

  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -5 || value > 15)) {
    return { isValid: false, error: 'Inflation rate must be between -5% and 15%' };
  }

  return { isValid: true };
}

export function validateCurrentAnnualCost(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Current annual cost must be greater than 0' };
  }

  if (value > 50000) {
    return { isValid: true, error: 'High cost - consider cost-saving strategies' };
  }

  return { isValid: true };
}

export function validateCostIncreaseRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -10 || value > 20)) {
    return { isValid: false, error: 'Cost increase rate must be between -10% and 20%' };
  }

  if (value > 8) {
    return { isValid: true, error: 'Cost increase above 8% may be aggressive' };
  }

  return { isValid: true };
}

export function validateYearsOfCollege(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 8) {
    return { isValid: false, error: 'Years of college must be between 1 and 8' };
  }

  if (value > 4) {
    return { isValid: true, error: 'Duration above 4 years - consider additional funding' };
  }

  return { isValid: true };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, error: 'State tax rate must be between 0 and 50 percent' };
  }

  return { isValid: true };
}

export function validateFederalTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, error: 'Federal tax rate must be between 0 and 50 percent' };
  }

  if (allInputs?.stateTaxRate && value + allInputs.stateTaxRate > 40) {
    return { isValid: true, error: 'Combined tax rate above 40% reduces tax benefit value' };
  }

  return { isValid: true };
}

export function validateExpectedAidPercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) {
    return { isValid: false, error: 'Expected aid percentage must be between 0 and 100' };
  }

  if (value > 80) {
    return { isValid: true, error: 'Aid above 80% may be unrealistic' };
  }

  return { isValid: true };
}

export function validateScholarshipAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Scholarship amount cannot be negative' };
  }

  return { isValid: true };
}

export function validateWorkStudyAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Work-study amount cannot be negative' };
  }

  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0 years' };
  }

  if (value > 30) {
    return { isValid: true, error: 'Analysis period over 30 years may be too long' };
  }

  return { isValid: true };
}

export function validateAccountFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Account fees cannot be negative' };
  }

  if (value > 100) {
    return { isValid: true, error: 'High account fees may impact returns' };
  }

  return { isValid: true };
}

export function validateManagementFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 5)) {
    return { isValid: false, error: 'Management fees must be between 0 and 5 percent' };
  }

  if (value > 1) {
    return { isValid: true, error: 'Fees above 1% may significantly impact long-term returns' };
  }

  return { isValid: true };
}

export function validateContributionFrequency(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validFrequencies = ['monthly', 'quarterly', 'annually'];
  if (!value || !validFrequencies.includes(value)) {
    return { isValid: false, error: 'Please select a valid contribution frequency' };
  }

  return { isValid: true };
}

export function validateInvestmentStrategy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validStrategies = ['conservative', 'moderate', 'aggressive'];
  if (!value || !validStrategies.includes(value)) {
    return { isValid: false, error: 'Please select a valid investment strategy' };
  }

  return { isValid: true };
}

export function validateCollegeType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validTypes = ['public_in_state', 'public_out_state', 'private'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Please select a valid college type' };
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
    return { isValid: false, error: 'Include state tax benefits must be true or false' };
  }

  return { isValid: true };
}

export function validateIncludeFederalTaxBenefits(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include federal tax benefits must be true or false' };
  }

  return { isValid: true };
}

export function validateTaxAdvantaged(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Tax advantaged must be true or false' };
  }

  return { isValid: true };
}
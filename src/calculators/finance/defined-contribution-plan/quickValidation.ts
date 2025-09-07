import { DefinedContributionPlanInputs } from './types';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 18 || value > 80) {
    return { isValid: false, error: 'Current age must be between 18 and 80' };
  }

  if (value >= 50) {
    return { isValid: true, error: 'Eligible for catch-up contributions' };
  }

  return { isValid: true };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 50 || value > 100) {
    return { isValid: false, error: 'Retirement age must be between 50 and 100' };
  }

  if (allInputs?.currentAge && value <= allInputs.currentAge) {
    return { isValid: false, error: 'Retirement age must be greater than current age' };
  }

  if (value >= 73) {
    return { isValid: true, error: 'Required minimum distributions will apply' };
  }

  return { isValid: true };
}

export function validateCurrentAccountBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Current account balance cannot be negative' };
  }

  if (value > 1000000) {
    return { isValid: true, error: 'Large balance - consider tax diversification' };
  }

  return { isValid: true };
}

export function validateMonthlyContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Monthly contribution cannot be negative' };
  }

  if (value > 2000) {
    return { isValid: true, error: 'High contribution - verify against limits' };
  }

  return { isValid: true };
}

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual contribution cannot be negative' };
  }

  if (value > 20000) {
    return { isValid: true, error: 'High contribution - verify against limits' };
  }

  return { isValid: true };
}

export function validateEmployerMatch(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 1)) {
    return { isValid: false, error: 'Employer match must be between 0% and 100%' };
  }

  if (value < 0.5) {
    return { isValid: true, error: 'Low employer match - maximize personal contributions' };
  }

  return { isValid: true };
}

export function validateExpectedReturnRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < -0.1 || value > 0.2) {
    return { isValid: false, error: 'Expected return rate must be between -10% and 20%' };
  }

  if (value > 0.1) {
    return { isValid: true, error: 'High return expectations may be unrealistic' };
  }

  if (value < 0.03) {
    return { isValid: true, error: 'Low return may not keep pace with inflation' };
  }

  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.5)) {
    return { isValid: false, error: 'Tax bracket must be between 0% and 50%' };
  }

  if (value > 0.35) {
    return { isValid: true, error: 'High tax bracket - consider Roth options' };
  }

  return { isValid: true };
}

export function validateYearsToRetirement(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 50) {
    return { isValid: false, error: 'Years to retirement must be between 1 and 50' };
  }

  if (value < 10) {
    return { isValid: true, error: 'Short time horizon - consider conservative strategy' };
  }

  return { isValid: true };
}

export function validateWithdrawalRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0.02 || value > 0.1)) {
    return { isValid: false, error: 'Withdrawal rate must be between 2% and 10%' };
  }

  if (value > 0.05) {
    return { isValid: true, error: 'High withdrawal rate may deplete funds faster' };
  }

  return { isValid: true };
}

export function validateExpenseRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.1)) {
    return { isValid: false, error: 'Expense ratio must be between 0% and 10%' };
  }

  if (value > 0.02) {
    return { isValid: true, error: 'High expense ratio may reduce returns' };
  }

  return { isValid: true };
}

export function validateContributionLimit(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Contribution limit cannot be negative' };
  }

  if (value > 30000) {
    return { isValid: true, error: 'High contribution limit allows for significant savings' };
  }

  return { isValid: true };
}

export function validateCatchUpContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Catch-up contribution cannot be negative' };
  }

  if (allInputs?.currentAge && allInputs.currentAge >= 50 && !value) {
    return { isValid: true, error: 'Age 50+ eligible for catch-up contributions' };
  }

  return { isValid: true };
}

export function validateAnnualFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Annual fees cannot be negative' };
  }

  if (value > 500) {
    return { isValid: true, error: 'High annual fees may impact returns' };
  }

  return { isValid: true };
}

export function validateTransactionFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Transaction fees cannot be negative' };
  }

  if (value > 100) {
    return { isValid: true, error: 'High transaction fees - consider low-cost alternatives' };
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

export function validateSalaryIncreaseRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -0.1 || value > 0.2)) {
    return { isValid: false, error: 'Salary increase rate must be between -10% and 20%' };
  }

  return { isValid: true };
}

export function validateSocialSecurityBenefit(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Social Security benefit cannot be negative' };
  }

  if (value > 40000) {
    return { isValid: true, error: 'High Social Security benefit provides strong foundation' };
  }

  return { isValid: true };
}

export function validateSocialSecurityStartAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 62 || value > 70)) {
    return { isValid: false, error: 'Social Security start age must be between 62 and 70' };
  }

  if (value < 67) {
    return { isValid: true, error: 'Early start reduces monthly benefit' };
  }

  return { isValid: true };
}

export function validateWithdrawalStartAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 50 || value > 100)) {
    return { isValid: false, error: 'Withdrawal start age must be between 50 and 100' };
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

export function validatePlanType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['401k', '403b', '457', 'traditional_ira', 'roth_ira', 'sep_ira', 'simple_ira'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid plan type' };
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
  const validOptions = ['target_date', 'balanced', 'aggressive_growth', 'conservative'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid investment type' };
  }

  return { isValid: true };
}

export function validateVestingSchedule(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['immediate', 'graded', 'cliff'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid vesting schedule' };
  }

  return { isValid: true };
}

export function validateAccountType(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['traditional', 'roth', 'non_deductible'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid account type' };
  }

  return { isValid: true };
}

export function validateGender(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['male', 'female'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid gender' };
  }

  return { isValid: true };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 70 || value > 120) {
    return { isValid: false, error: 'Life expectancy must be between 70 and 120' };
  }

  if (allInputs?.retirementAge && value <= allInputs.retirementAge) {
    return { isValid: false, error: 'Life expectancy must be greater than retirement age' };
  }

  return { isValid: true };
}

export function validateEmployerMatchLimit(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Employer match limit cannot be negative' };
  }

  return { isValid: true };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.2)) {
    return { isValid: false, error: 'State tax rate must be between 0% and 20%' };
  }

  return { isValid: true };
}

export function validateRequiredMinimumDistribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Required minimum distribution must be true or false' };
  }

  return { isValid: true };
}

export function validateIncludeSocialSecurity(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include Social Security must be true or false' };
  }

  return { isValid: true };
}
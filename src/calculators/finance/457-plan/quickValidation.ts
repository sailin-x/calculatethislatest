import { FourFiveSevenInputs } from './types';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 18 || value > 100) {
    return { isValid: false, error: 'Current age must be between 18 and 100' };
  }

  if (allInputs?.retirementAge && value >= allInputs.retirementAge) {
    return { isValid: false, error: 'Current age must be less than retirement age' };
  }

  return { isValid: true };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0 || value > 100) {
    return { isValid: false, error: 'Retirement age must be between 1 and 100' };
  }

  if (allInputs?.currentAge && value <= allInputs.currentAge) {
    return { isValid: false, error: 'Retirement age must be greater than current age' };
  }

  if (value < 59.5) {
    return { isValid: true, error: 'Early retirement before 59½ may incur penalties' };
  }

  return { isValid: true };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0 || value > 120) {
    return { isValid: false, error: 'Life expectancy must be between 1 and 120' };
  }

  if (allInputs?.retirementAge && value <= allInputs.retirementAge) {
    return { isValid: false, error: 'Life expectancy must be greater than retirement age' };
  }

  return { isValid: true };
}

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Current balance cannot be negative' };
  }

  return { isValid: true };
}

export function validateAnnualSalary(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Annual salary must be greater than 0' };
  }

  if (value < 30000) {
    return { isValid: true, error: 'Low salary may limit retirement contributions' };
  }

  return { isValid: true };
}

export function validateEmployeeContributionPercent(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) {
    return { isValid: false, error: 'Employee contribution percentage must be between 0 and 100' };
  }

  if (value < 5) {
    return { isValid: true, error: 'Contribution below 5% may miss tax benefits' };
  }

  if (allInputs?.annualSalary && allInputs?.contributionLimit && value) {
    const contributionAmount = allInputs.annualSalary * (value / 100);
    if (contributionAmount > allInputs.contributionLimit) {
      return { isValid: false, error: 'Contribution exceeds annual limit' };
    }
  }

  return { isValid: true };
}

export function validateEmployerContributionPercent(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) {
    return { isValid: false, error: 'Employer contribution percentage must be between 0 and 100' };
  }

  return { isValid: true };
}

export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 20)) {
    return { isValid: false, error: 'Expected annual return must be between 0 and 20 percent' };
  }

  if (value > 12) {
    return { isValid: true, error: 'Return above 12% may be unrealistic - consider conservative assumptions' };
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

export function validateCurrentTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, error: 'Current tax rate must be between 0 and 50 percent' };
  }

  return { isValid: true };
}

export function validateRetirementTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, error: 'Retirement tax rate must be between 0 and 50 percent' };
  }

  if (allInputs?.currentTaxRate && value > allInputs.currentTaxRate) {
    return { isValid: true, error: 'Higher retirement tax rate may impact retirement income' };
  }

  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0 years' };
  }

  if (value > 50) {
    return { isValid: true, error: 'Analysis period over 50 years may be too long for accurate projections' };
  }

  return { isValid: true };
}

export function validateSocialSecurityBenefit(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Social Security benefit cannot be negative' };
  }

  return { isValid: true };
}

export function validateAnnualFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 10)) {
    return { isValid: false, error: 'Annual fees must be between 0 and 10 percent' };
  }

  if (value > 1) {
    return { isValid: true, error: 'Fees above 1% may significantly impact long-term returns' };
  }

  return { isValid: true };
}

export function validateContributionLimit(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Contribution limit must be greater than 0' };
  }

  if (value < 22000) {
    return { isValid: true, error: 'Contribution limit below current IRS limit of $22,000' };
  }

  return { isValid: true };
}

export function validateLifetimeLimit(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Lifetime contribution limit must be greater than 0' };
  }

  return { isValid: true };
}

export function validateYearsOfService(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Years of service cannot be negative' };
  }

  return { isValid: true };
}

export function validateCatchUpContributions(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  // Boolean validation - no specific rules needed
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Catch-up contributions must be true or false' };
  }

  if (allInputs?.currentAge && allInputs.currentAge >= 50 && !value) {
    return { isValid: true, error: 'Age 50+ eligible for catch-up contributions' };
  }

  return { isValid: true };
}

export function validateIncludeSocialSecurity(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include Social Security must be true or false' };
  }

  return { isValid: true };
}

export function validateVestingSchedule(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validSchedules = ['immediate', 'graded', 'cliff'];
  if (!value || !validSchedules.includes(value)) {
    return { isValid: false, error: 'Please select a valid vesting schedule' };
  }

  return { isValid: true };
}

export function validateWithdrawalStrategy(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validStrategies = ['fixed_amount', 'percentage', 'required_minimum'];
  if (!value || !validStrategies.includes(value)) {
    return { isValid: false, error: 'Please select a valid withdrawal strategy' };
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
import { DefinedBenefitPlanInputs } from './types';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 18 || value > 80) {
    return { isValid: false, error: 'Current age must be between 18 and 80' };
  }

  if (value > 70) {
    return { isValid: true, error: 'Consider RMD requirements and retirement timing' };
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

  if (value < 62) {
    return { isValid: true, error: 'Early retirement may reduce Social Security benefits' };
  }

  return { isValid: true };
}

export function validateYearsOfService(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Years of service cannot be negative' };
  }

  if (value > 40) {
    return { isValid: true, error: 'Long service time maximizes benefit' };
  }

  if (value < 5) {
    return { isValid: true, error: 'Short service time may limit vesting' };
  }

  return { isValid: true };
}

export function validateFinalAverageSalary(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Final average salary must be greater than 0' };
  }

  if (value > 500000) {
    return { isValid: true, error: 'High salary may trigger benefit caps' };
  }

  return { isValid: true };
}

export function validateBenefitMultiplier(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Benefit multiplier must be greater than 0' };
  }

  if (value > 2.5) {
    return { isValid: true, error: 'High multiplier indicates generous plan' };
  }

  if (value < 1.0) {
    return { isValid: true, error: 'Low multiplier may require additional savings' };
  }

  return { isValid: true };
}

export function validateMinimumRetirementAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 50 || value > 70) {
    return { isValid: false, error: 'Minimum retirement age must be between 50 and 70' };
  }

  return { isValid: true };
}

export function validateExpectedReturnRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -0.1 || value > 0.2)) {
    return { isValid: false, error: 'Expected return rate must be between -10% and 20%' };
  }

  if (value > 0.08) {
    return { isValid: true, error: 'High return expectations may be unrealistic' };
  }

  return { isValid: true };
}

export function validateColaRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.1)) {
    return { isValid: false, error: 'COLA rate must be between 0% and 10%' };
  }

  if (value < 0.02) {
    return { isValid: true, error: 'Low COLA may not keep pace with inflation' };
  }

  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.5)) {
    return { isValid: false, error: 'Tax bracket must be between 0% and 50%' };
  }

  if (value > 0.35) {
    return { isValid: true, error: 'High tax bracket - consider tax planning strategies' };
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
  const validOptions = ['traditional', 'cash_balance', 'hybrid'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid plan type' };
  }

  return { isValid: true };
}

export function validateBenefitFormula(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  const validOptions = ['final_average', 'career_average', 'flat_benefit'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, error: 'Please select a valid benefit formula' };
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

export function validateCurrentSalary(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value <= 0) {
    return { isValid: false, error: 'Current salary must be greater than 0' };
  }

  if (value > 1000000) {
    return { isValid: true, error: 'High salary may trigger compensation limits' };
  }

  return { isValid: true };
}

export function validateYearsOfServiceRequired(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'number' || value < 1 || value > 40) {
    return { isValid: false, error: 'Years of service required must be between 1 and 40' };
  }

  return { isValid: true };
}

export function validateEarlyRetirementReduction(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 10)) {
    return { isValid: false, error: 'Early retirement reduction must be between 0% and 10%' };
  }

  return { isValid: true };
}

export function validateCurrentAccountBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Current account balance cannot be negative' };
  }

  return { isValid: true };
}

export function validateEmployerContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Employer contribution cannot be negative' };
  }

  return { isValid: true };
}

export function validateEmployeeContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, error: 'Employee contribution cannot be negative' };
  }

  return { isValid: true };
}

export function validateColaStartAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 50 || value > 100)) {
    return { isValid: false, error: 'COLA start age must be between 50 and 100' };
  }

  return { isValid: true };
}

export function validateSpouseAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 18 || value > 100)) {
    return { isValid: false, error: 'Spouse age must be between 18 and 100' };
  }

  return { isValid: true };
}

export function validateSurvivorBenefitPercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) {
    return { isValid: false, error: 'Survivor benefit percentage must be between 0% and 100%' };
  }

  if (value < 50) {
    return { isValid: true, error: 'Low survivor benefit may leave spouse under-protected' };
  }

  return { isValid: true };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.2)) {
    return { isValid: false, error: 'State tax rate must be between 0% and 20%' };
  }

  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -0.05 || value > 0.1)) {
    return { isValid: false, error: 'Inflation rate must be between -5% and 10%' };
  }

  return { isValid: true };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 0.2)) {
    return { isValid: false, error: 'Discount rate must be between 0% and 20%' };
  }

  return { isValid: true };
}

export function validateExpectedSalaryIncrease(value: any, allInputs?: Record<string, any>): { isValid: boolean; error?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -0.1 || value > 0.2)) {
    return { isValid: false, error: 'Expected salary increase must be between -10% and 20%' };
  }

  return { isValid: true };
}
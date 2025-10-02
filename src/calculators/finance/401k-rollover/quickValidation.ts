import { ValidationResult } from '../../types/calculator';

export function validateCurrent401kBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Current 401(k) balance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Current 401(k) balance cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Current 401(k) balance seems unusually high' };
  }
  return { isValid: true };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Current age must be a valid number' };
  }
  if (value < 18) {
    return { isValid: false, message: 'Current age must be at least 18' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Current age seems unusually high' };
  }
  return { isValid: true };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Retirement age must be a valid number' };
  }
  if (value < 50) {
    return { isValid: false, message: 'Retirement age must be at least 50' };
  }
  if (value > 85) {
    return { isValid: false, message: 'Retirement age seems unusually high' };
  }
  if (allInputs && allInputs.currentAge && value <= allInputs.currentAge) {
    return { isValid: false, message: 'Retirement age must be greater than current age' };
  }
  return { isValid: true };
}

export function validateCurrentTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Current tax rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Current tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Current tax rate seems unusually high' };
  }
  return { isValid: true };
}

export function validateRetirementTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Retirement tax rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Retirement tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Retirement tax rate seems unusually high' };
  }
  return { isValid: true };
}

export function validateRolloverType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['traditional-ira', 'roth-ira', 'new-401k', 'roth-401k'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Rollover type must be one of: Traditional IRA, Roth IRA, New 401(k), Roth 401(k)' };
  }
  return { isValid: true };
}

export function validateCurrentPlanFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Current plan fees must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Current plan fees cannot be negative' };
  }
  if (value > 5) {
    return { isValid: false, message: 'Current plan fees seem unusually high' };
  }
  return { isValid: true };
}

export function validateNewPlanFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'New plan fees must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'New plan fees cannot be negative' };
  }
  if (value > 5) {
    return { isValid: false, message: 'New plan fees seem unusually high' };
  }
  return { isValid: true };
}

export function validateCurrentInvestmentOptions(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validOptions = ['excellent', 'good', 'fair', 'poor'];
  if (!validOptions.includes(value)) {
    return { isValid: false, message: 'Current investment options must be one of: Excellent, Good, Fair, Poor' };
  }
  return { isValid: true };
}

export function validateNewInvestmentOptions(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validOptions = ['excellent', 'good', 'fair', 'poor'];
  if (!validOptions.includes(value)) {
    return { isValid: false, message: 'New investment options must be one of: Excellent, Good, Fair, Poor' };
  }
  return { isValid: true };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Expected return must be a valid number' };
  }
  if (value < -20) {
    return { isValid: false, message: 'Expected return seems unusually low' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Expected return seems unusually high' };
  }
  return { isValid: true };
}

export function validateYearsToRetirement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Years to retirement must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Years to retirement cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Years to retirement seems unusually high' };
  }
  return { isValid: true };
}

export function validateRolloverFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Rollover fees must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Rollover fees cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Rollover fees seem unusually high' };
  }
  return { isValid: true };
}

export function validateEarlyWithdrawalPenalty(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, message: 'Early withdrawal penalty must be true or false' };
  }
  return { isValid: true };
}

export function validateEmployerMatch(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Employer match must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Employer match cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Employer match cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateEmployerMatchLimit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Employer match limit must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Employer match limit cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Employer match limit cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Annual contribution must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Annual contribution cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Annual contribution seems unusually high' };
  }
  return { isValid: true };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'State tax rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'State tax rate cannot be negative' };
  }
  if (value > 15) {
    return { isValid: false, message: 'State tax rate seems unusually high' };
  }
  return { isValid: true };
}

export function validateNetUnrealizedAppreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Net unrealized appreciation must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Net unrealized appreciation cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, message: 'Net unrealized appreciation seems unusually high' };
  }
  return { isValid: true };
}

export function validateHasAfterTaxContributions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, message: 'Has after-tax contributions must be true or false' };
  }
  return { isValid: true };
}

export function validateAfterTaxAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'After-tax amount must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'After-tax amount cannot be negative' };
  }
  if (allInputs && allInputs.current401kBalance && value > allInputs.current401kBalance) {
    return { isValid: false, message: 'After-tax amount cannot exceed current 401(k) balance' };
  }
  return { isValid: true };
}

export function validateHasRoth401k(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, message: 'Has Roth 401(k) must be true or false' };
  }
  return { isValid: true };
}

export function validateRoth401kAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Roth 401(k) amount must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Roth 401(k) amount cannot be negative' };
  }
  if (allInputs && allInputs.current401kBalance && value > allInputs.current401kBalance) {
    return { isValid: false, message: 'Roth 401(k) amount cannot exceed current 401(k) balance' };
  }
  return { isValid: true };
}

export function validateHasOutstandingLoan(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, message: 'Has outstanding loan must be true or false' };
  }
  return { isValid: true };
}

export function validateLoanBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Loan balance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Loan balance cannot be negative' };
  }
  if (allInputs && allInputs.current401kBalance && value > allInputs.current401kBalance * 0.5) {
    return { isValid: false, message: 'Loan balance cannot exceed 50% of current 401(k) balance' };
  }
  return { isValid: true };
}

export function validateLoanRepaymentPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Loan repayment period must be a valid number' };
  }
  if (value < 1) {
    return { isValid: false, message: 'Loan repayment period must be at least 1 month' };
  }
  if (value > 60) {
    return { isValid: false, message: 'Loan repayment period cannot exceed 60 months' };
  }
  return { isValid: true };
}

export function validateAllFourZeroOneKRolloverInputs(inputs: Record<string, any>): ValidationResult {
  const validators = [
    validateCurrent401kBalance,
    validateCurrentAge,
    validateRetirementAge,
    validateCurrentTaxRate,
    validateRetirementTaxRate,
    validateRolloverType,
    validateCurrentPlanFees,
    validateNewPlanFees,
    validateCurrentInvestmentOptions,
    validateNewInvestmentOptions,
    validateExpectedReturn,
    validateYearsToRetirement,
    validateRolloverFees,
    validateEarlyWithdrawalPenalty,
    validateEmployerMatch,
    validateEmployerMatchLimit,
    validateAnnualContribution,
    validateStateTaxRate,
    validateNetUnrealizedAppreciation,
    validateHasAfterTaxContributions,
    validateAfterTaxAmount,
    validateHasRoth401k,
    validateRoth401kAmount,
    validateHasOutstandingLoan,
    validateLoanBalance,
    validateLoanRepaymentPeriod
  ];

  for (const validator of validators) {
    const fieldName = validator.name.replace('validate', '').replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
    const value = inputs[fieldName];
    const result = validator(value, inputs);
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true };
}

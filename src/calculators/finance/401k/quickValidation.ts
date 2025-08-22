import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Current age is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Current age must be a valid number' };
  }
  if (value < 18) {
    return { isValid: false, error: 'Current age must be at least 18 years' };
  }
  if (value > 80) {
    return { isValid: false, error: 'Current age cannot exceed 80 years' };
  }
  return { isValid: true };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Retirement age is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Retirement age must be a valid number' };
  }
  if (value < 45) {
    return { isValid: false, error: 'Retirement age must be at least 45 years' };
  }
  if (value > 85) {
    return { isValid: false, error: 'Retirement age cannot exceed 85 years' };
  }
  
  if (allInputs?.currentAge && value <= allInputs.currentAge) {
    return { isValid: false, error: 'Retirement age must be greater than current age' };
  }
  
  if (allInputs?.currentAge && (value - allInputs.currentAge) < 5) {
    return { isValid: true, warning: 'Very short time to retirement - consider extending retirement age' };
  }
  
  return { isValid: true };
}

export function validateCurrentSalary(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Current salary is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Current salary must be a valid number' };
  }
  if (value < 10000) {
    return { isValid: false, error: 'Current salary must be at least $10,000' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Current salary cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

export function validateCurrent401kBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Current 401(k) balance is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Current 401(k) balance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Current 401(k) balance cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Current 401(k) balance cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateEmployeeContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Employee contribution percentage is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Employee contribution percentage must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Employee contribution percentage cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Employee contribution percentage cannot exceed 100%' };
  }
  
  if (value < 6) {
    return { isValid: true, warning: 'Low contribution rate - consider increasing to at least 6%' };
  }
  
  // Check contribution limits
  if (allInputs?.currentSalary && allInputs?.currentAge) {
    const annualContribution = allInputs.currentSalary * (value / 100);
    const maxContribution = allInputs.currentAge >= 50 ? 30000 : 22500; // 2024 limits
    
    if (annualContribution > maxContribution) {
      return { isValid: true, warning: `Contribution exceeds IRS limit of $${maxContribution.toLocaleString()}` };
    }
  }
  
  return { isValid: true };
}

export function validateEmployerMatch(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Employer match percentage is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Employer match percentage must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Employer match percentage cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Employer match percentage cannot exceed 100%' };
  }
  
  if (value === 0) {
    return { isValid: true, warning: 'No employer match - consider negotiating for better benefits' };
  }
  
  return { isValid: true };
}

export function validateEmployerMatchLimit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Employer match limit percentage is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Employer match limit percentage must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Employer match limit percentage cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Employer match limit percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateSalaryGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Salary growth rate is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Salary growth rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Salary growth rate cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Salary growth rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateInvestmentReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Expected investment return is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Expected investment return must be a valid number' };
  }
  if (value < 1) {
    return { isValid: false, error: 'Expected investment return must be at least 1%' };
  }
  if (value > 15) {
    return { isValid: false, error: 'Expected investment return cannot exceed 15%' };
  }
  
  if (value < 5) {
    return { isValid: true, warning: 'Low expected return - consider reviewing investment strategy' };
  }
  
  if (value > 12) {
    return { isValid: true, warning: 'Very high expected return - consider more conservative estimate' };
  }
  
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Expected inflation rate is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Expected inflation rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Expected inflation rate cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Expected inflation rate cannot exceed 10%' };
  }
  return { isValid: true };
}

export function validateContributionIncrease(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Annual contribution increase is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Annual contribution increase must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Annual contribution increase cannot be negative' };
  }
  if (value > 5) {
    return { isValid: false, error: 'Annual contribution increase cannot exceed 5%' };
  }
  return { isValid: true };
}

export function validateCatchUpContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, error: 'Catch-up contribution preference is required' };
  }
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Catch-up contribution must be true or false' };
  }
  
  if (allInputs?.currentAge && allInputs.currentAge >= 50 && !value) {
    return { isValid: true, warning: 'Consider catch-up contributions to maximize retirement savings' };
  }
  
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Current tax rate is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Current tax rate must be a valid number' };
  }
  if (value < 10) {
    return { isValid: false, error: 'Current tax rate must be at least 10%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Current tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateRetirementTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Expected retirement tax rate is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Expected retirement tax rate must be a valid number' };
  }
  if (value < 10) {
    return { isValid: false, error: 'Expected retirement tax rate must be at least 10%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Expected retirement tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Life expectancy is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Life expectancy must be a valid number' };
  }
  if (value < 70) {
    return { isValid: false, error: 'Life expectancy must be at least 70 years' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Life expectancy cannot exceed 100 years' };
  }
  
  if (allInputs?.retirementAge && (value - allInputs.retirementAge) < 10) {
    return { isValid: true, warning: 'Short retirement period - consider longer life expectancy' };
  }
  
  return { isValid: true };
}

export function validateSocialSecurityIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Expected Social Security income is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Expected Social Security income must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Expected Social Security income cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Expected Social Security income cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateOtherRetirementIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Other retirement income is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Other retirement income must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Other retirement income cannot be negative' };
  }
  if (value > 500000) {
    return { isValid: false, error: 'Other retirement income cannot exceed $500,000' };
  }
  return { isValid: true };
}

export function validateAllFourZeroOneKInputs(inputs: CalculatorInputs): ValidationResult {
  const validations = [
    { field: 'currentAge', validator: validateCurrentAge },
    { field: 'retirementAge', validator: validateRetirementAge },
    { field: 'currentSalary', validator: validateCurrentSalary },
    { field: 'current401kBalance', validator: validateCurrent401kBalance },
    { field: 'employeeContribution', validator: validateEmployeeContribution },
    { field: 'employerMatch', validator: validateEmployerMatch },
    { field: 'employerMatchLimit', validator: validateEmployerMatchLimit },
    { field: 'salaryGrowthRate', validator: validateSalaryGrowthRate },
    { field: 'investmentReturn', validator: validateInvestmentReturn },
    { field: 'inflationRate', validator: validateInflationRate },
    { field: 'contributionIncrease', validator: validateContributionIncrease },
    { field: 'catchUpContribution', validator: validateCatchUpContribution },
    { field: 'taxRate', validator: validateTaxRate },
    { field: 'retirementTaxRate', validator: validateRetirementTaxRate },
    { field: 'lifeExpectancy', validator: validateLifeExpectancy },
    { field: 'socialSecurityIncome', validator: validateSocialSecurityIncome },
    { field: 'otherRetirementIncome', validator: validateOtherRetirementIncome }
  ];

  for (const validation of validations) {
    const result = validation.validator(inputs[validation.field], inputs);
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true };
}

import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Current age is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Current age must be a valid number' };
  }
  if (numValue < 18) {
    return { isValid: false, error: 'Current age must be at least 18' };
  }
  if (numValue > 100) {
    return { isValid: false, error: 'Current age cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Retirement age is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Retirement age must be a valid number' };
  }
  if (numValue < 50) {
    return { isValid: false, error: 'Retirement age must be at least 50' };
  }
  if (numValue > 85) {
    return { isValid: false, error: 'Retirement age cannot exceed 85' };
  }
  
  // Check if retirement age is greater than current age
  const currentAge = allInputs?.currentAge;
  if (currentAge !== undefined && currentAge !== null) {
    const currentAgeNum = Number(currentAge);
    if (!isNaN(currentAgeNum) && numValue <= currentAgeNum) {
      return { isValid: false, error: 'Retirement age must be greater than current age' };
    }
  }
  
  return { isValid: true };
}

export function validateCurrentSalary(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Current salary is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Current salary must be a valid number' };
  }
  if (numValue < 10000) {
    return { isValid: false, error: 'Current salary must be at least $10,000' };
  }
  if (numValue > 10000000) {
    return { isValid: false, error: 'Current salary cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateCurrent401kBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Current 401(k) balance is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Current 401(k) balance must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Current 401(k) balance cannot be negative' };
  }
  if (numValue > 10000000) {
    return { isValid: false, error: 'Current 401(k) balance cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateEmployeeContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Employee contribution percentage is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Employee contribution percentage must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Employee contribution percentage cannot be negative' };
  }
  if (numValue > 100) {
    return { isValid: false, error: 'Employee contribution percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateEmployerMatch(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Employer match percentage is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Employer match percentage must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Employer match percentage cannot be negative' };
  }
  if (numValue > 100) {
    return { isValid: false, error: 'Employer match percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateEmployerMatchLimit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Employer match limit is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Employer match limit must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Employer match limit cannot be negative' };
  }
  if (numValue > 100) {
    return { isValid: false, error: 'Employer match limit cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validatePlanFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Plan fees are required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Plan fees must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Plan fees cannot be negative' };
  }
  if (numValue > 5) {
    return { isValid: false, error: 'Plan fees cannot exceed 5%' };
  }
  return { isValid: true };
}

export function validateInvestmentFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Investment fees are required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Investment fees must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Investment fees cannot be negative' };
  }
  if (numValue > 5) {
    return { isValid: false, error: 'Investment fees cannot exceed 5%' };
  }
  return { isValid: true };
}

export function validateSalaryGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Salary growth rate is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Salary growth rate must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Salary growth rate cannot be negative' };
  }
  if (numValue > 20) {
    return { isValid: false, error: 'Salary growth rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateInvestmentReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Investment return rate is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Investment return rate must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Investment return rate cannot be negative' };
  }
  if (numValue > 20) {
    return { isValid: false, error: 'Investment return rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Inflation rate is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Inflation rate must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Inflation rate cannot be negative' };
  }
  if (numValue > 15) {
    return { isValid: false, error: 'Inflation rate cannot exceed 15%' };
  }
  return { isValid: true };
}

export function validateContributionIncrease(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Contribution increase rate is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Contribution increase rate must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Contribution increase rate cannot be negative' };
  }
  if (numValue > 10) {
    return { isValid: false, error: 'Contribution increase rate cannot exceed 10%' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Tax rate is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Tax rate must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Tax rate cannot be negative' };
  }
  if (numValue > 50) {
    return { isValid: false, error: 'Tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateRetirementTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Retirement tax rate is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Retirement tax rate must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Retirement tax rate cannot be negative' };
  }
  if (numValue > 50) {
    return { isValid: false, error: 'Retirement tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Life expectancy is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Life expectancy must be a valid number' };
  }
  if (numValue < 65) {
    return { isValid: false, error: 'Life expectancy must be at least 65' };
  }
  if (numValue > 120) {
    return { isValid: false, error: 'Life expectancy cannot exceed 120' };
  }
  
  // Check if life expectancy is greater than retirement age
  const retirementAge = allInputs?.retirementAge;
  if (retirementAge !== undefined && retirementAge !== null) {
    const retirementAgeNum = Number(retirementAge);
    if (!isNaN(retirementAgeNum) && numValue <= retirementAgeNum) {
      return { isValid: false, error: 'Life expectancy must be greater than retirement age' };
    }
  }
  
  return { isValid: true };
}

export function validateSocialSecurityIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Social Security income is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Social Security income must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Social Security income cannot be negative' };
  }
  if (numValue > 1000000) {
    return { isValid: false, error: 'Social Security income cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

export function validateOtherRetirementIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Other retirement income is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Other retirement income must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Other retirement income cannot be negative' };
  }
  if (numValue > 1000000) {
    return { isValid: false, error: 'Other retirement income cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

export function validatePlanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Plan type is required' };
  }
  const validTypes = ['traditional', 'roth', 'both'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Please select a valid plan type' };
  }
  return { isValid: true };
}

export function validateRothPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Roth percentage is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Roth percentage must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Roth percentage cannot be negative' };
  }
  if (numValue > 100) {
    return { isValid: false, error: 'Roth percentage cannot exceed 100%' };
  }
  
  // Check plan type consistency
  const planType = allInputs?.planType;
  if (planType === 'traditional' && numValue !== 0) {
    return { isValid: false, error: 'Roth percentage must be 0 for traditional-only plans' };
  }
  if (planType === 'roth' && numValue !== 100) {
    return { isValid: false, error: 'Roth percentage must be 100 for Roth-only plans' };
  }
  
  return { isValid: true };
}

export function validateLoanBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Loan balance is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Loan balance must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Loan balance cannot be negative' };
  }
  if (numValue > 1000000) {
    return { isValid: false, error: 'Loan balance cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

export function validateHardshipWithdrawals(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Hardship withdrawals amount is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Hardship withdrawals amount must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, error: 'Hardship withdrawals amount cannot be negative' };
  }
  if (numValue > 1000000) {
    return { isValid: false, error: 'Hardship withdrawals amount cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

export function validateInvestmentAllocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Investment allocation is required' };
  }
  const validAllocations = ['conservative', 'moderate', 'aggressive', 'custom'];
  if (!validAllocations.includes(value)) {
    return { isValid: false, error: 'Please select a valid investment allocation' };
  }
  return { isValid: true };
}

export function validateRebalanceFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Rebalance frequency is required' };
  }
  const validFrequencies = ['never', 'annually', 'quarterly', 'monthly'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, error: 'Please select a valid rebalance frequency' };
  }
  return { isValid: true };
}

export function validateAllFourZeroOneKPlanInputs(inputs: CalculatorInputs): ValidationResult {
  const validations = [
    validateCurrentAge(inputs.currentAge, inputs),
    validateRetirementAge(inputs.retirementAge, inputs),
    validateCurrentSalary(inputs.currentSalary, inputs),
    validateCurrent401kBalance(inputs.current401kBalance, inputs),
    validateEmployeeContribution(inputs.employeeContribution, inputs),
    validateEmployerMatch(inputs.employerMatch, inputs),
    validateEmployerMatchLimit(inputs.employerMatchLimit, inputs),
    validatePlanFees(inputs.planFees, inputs),
    validateInvestmentFees(inputs.investmentFees, inputs),
    validateSalaryGrowthRate(inputs.salaryGrowthRate, inputs),
    validateInvestmentReturn(inputs.investmentReturn, inputs),
    validateInflationRate(inputs.inflationRate, inputs),
    validateContributionIncrease(inputs.contributionIncrease, inputs),
    validateTaxRate(inputs.taxRate, inputs),
    validateRetirementTaxRate(inputs.retirementTaxRate, inputs),
    validateLifeExpectancy(inputs.lifeExpectancy, inputs),
    validateSocialSecurityIncome(inputs.socialSecurityIncome, inputs),
    validateOtherRetirementIncome(inputs.otherRetirementIncome, inputs),
    validatePlanType(inputs.planType, inputs),
    validateRothPercentage(inputs.rothPercentage, inputs),
    validateLoanBalance(inputs.loanBalance, inputs),
    validateHardshipWithdrawals(inputs.hardshipWithdrawals, inputs),
    validateInvestmentAllocation(inputs.investmentAllocation, inputs),
    validateRebalanceFrequency(inputs.rebalanceFrequency, inputs)
  ];

  const errors = validations
    .filter(validation => !validation.isValid)
    .map(validation => validation.error)
    .filter(Boolean);

  return {
    isValid: errors.length === 0,
    error: errors.length > 0 ? errors.join('; ') : undefined
  };
}

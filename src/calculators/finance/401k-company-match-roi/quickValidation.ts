import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateCurrentAge(value: any): ValidationResult {
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

export function validateCurrentSalary(value: any): ValidationResult {
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

export function validateEmployeeContribution(value: any): ValidationResult {
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
  
  return { isValid: true };
}

export function validateEmployerMatch(value: any): ValidationResult {
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

export function validateEmployerMatchLimit(value: any): ValidationResult {
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

export function validateMatchVestingSchedule(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Vesting schedule is required' };
  }
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Vesting schedule must be a valid option' };
  }
  
  const validSchedules = ['immediate', 'cliff-1', 'cliff-3', 'cliff-5', 'graded-3', 'graded-5', 'graded-6'];
  if (!validSchedules.includes(value)) {
    return { isValid: false, error: 'Vesting schedule must be a valid option' };
  }
  
  if (allInputs?.yearsOfService) {
    const yearsOfService = allInputs.yearsOfService as number;
    
    if (value.includes('cliff-5') && yearsOfService < 5) {
      return { isValid: true, warning: 'Long vesting schedule - significant value at risk if you leave early' };
    }
    
    if (value.includes('graded-6') && yearsOfService < 6) {
      return { isValid: true, warning: 'Extended vesting schedule - consider the long-term commitment' };
    }
  }
  
  return { isValid: true };
}

export function validateYearsOfService(value: any): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Years of service is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Years of service must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Years of service cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Years of service cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateSalaryGrowthRate(value: any): ValidationResult {
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

export function validateInvestmentReturn(value: any): ValidationResult {
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

export function validateAlternativeInvestmentReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Alternative investment return is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Alternative investment return must be a valid number' };
  }
  if (value < 1) {
    return { isValid: false, error: 'Alternative investment return must be at least 1%' };
  }
  if (value > 15) {
    return { isValid: false, error: 'Alternative investment return cannot exceed 15%' };
  }
  return { isValid: true };
}

export function validatePlanToStay(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, error: 'Plan to stay preference is required' };
  }
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Plan to stay must be true or false' };
  }
  return { isValid: true };
}

export function validateCompanyStability(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Company stability rating is required' };
  }
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Company stability must be a valid option' };
  }
  
  const validOptions = ['very-stable', 'stable', 'moderate', 'risky', 'very-risky'];
  if (!validOptions.includes(value)) {
    return { isValid: false, error: 'Company stability must be a valid option' };
  }
  
  if (value === 'very-risky' || value === 'risky') {
    return { isValid: true, warning: 'High company risk - factor this into your vesting decisions' };
  }
  
  return { isValid: true };
}

export function validateJobSatisfaction(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Job satisfaction level is required' };
  }
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Job satisfaction must be a valid option' };
  }
  
  const validOptions = ['very-high', 'high', 'moderate', 'low', 'very-low'];
  if (!validOptions.includes(value)) {
    return { isValid: false, error: 'Job satisfaction must be a valid option' };
  }
  
  if (value === 'very-low' || value === 'low') {
    return { isValid: true, warning: 'Low job satisfaction - consider this against financial benefits' };
  }
  
  return { isValid: true };
}

export function validateMarketConditions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Market conditions is required' };
  }
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Market conditions must be a valid option' };
  }
  
  const validOptions = ['excellent', 'good', 'moderate', 'poor', 'very-poor'];
  if (!validOptions.includes(value)) {
    return { isValid: false, error: 'Market conditions must be a valid option' };
  }
  
  return { isValid: true };
}

export function validateAllFourZeroOneKCompanyMatchROIInputs(inputs: CalculatorInputs): ValidationResult {
  const validations = [
    { field: 'currentAge', validator: validateCurrentAge },
    { field: 'retirementAge', validator: validateRetirementAge },
    { field: 'currentSalary', validator: validateCurrentSalary },
    { field: 'employeeContribution', validator: validateEmployeeContribution },
    { field: 'employerMatch', validator: validateEmployerMatch },
    { field: 'employerMatchLimit', validator: validateEmployerMatchLimit },
    { field: 'matchVestingSchedule', validator: validateMatchVestingSchedule },
    { field: 'yearsOfService', validator: validateYearsOfService },
    { field: 'salaryGrowthRate', validator: validateSalaryGrowthRate },
    { field: 'investmentReturn', validator: validateInvestmentReturn },
    { field: 'inflationRate', validator: validateInflationRate },
    { field: 'taxRate', validator: validateTaxRate },
    { field: 'retirementTaxRate', validator: validateRetirementTaxRate },
    { field: 'alternativeInvestmentReturn', validator: validateAlternativeInvestmentReturn },
    { field: 'planToStay', validator: validatePlanToStay },
    { field: 'companyStability', validator: validateCompanyStability },
    { field: 'jobSatisfaction', validator: validateJobSatisfaction },
    { field: 'marketConditions', validator: validateMarketConditions }
  ];

  for (const validation of validations) {
    const result = validation.validator(inputs[validation.field], inputs);
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true };
}

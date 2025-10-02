import { ValidationResult } from '../../types/calculator';

/**
 * Quick validation functions for Social Security calculator
 * Each function validates a single field and includes the allInputs parameter
 */

export function validateBirthYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { birthYear: 'Birth year must be a valid number' } };
  }
  if (num < 1900) {
    return { isValid: false, errors: { birthYear: 'Birth year cannot be before 1900' } };
  }
  if (num > 2010) {
    return { isValid: false, errors: { birthYear: 'Birth year cannot be after 2010' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { currentAge: 'Current age must be a valid number' } };
  }
  if (num < 18) {
    return { isValid: false, errors: { currentAge: 'Current age must be at least 18' } };
  }
  if (num > 100) {
    return { isValid: false, errors: { currentAge: 'Current age cannot exceed 100' } };
  }
  
  // Check if current age is consistent with birth year
  if (allInputs?.birthYear) {
    const currentYear = new Date().getFullYear();
    const expectedAge = currentYear - Number(allInputs.birthYear);
    if (Math.abs(num - expectedAge) > 5) {
      return { isValid: false, errors: { currentAge: 'Current age seems inconsistent with birth year' } };
    }
  }
  
  return { isValid: true, errors: {} };
}

export function validatePlannedRetirementAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { plannedRetirementAge: 'Planned retirement age must be a valid number' } };
  }
  if (num < 62) {
    return { isValid: false, errors: { plannedRetirementAge: 'Retirement age cannot be below 62' } };
  }
  if (num > 70) {
    return { isValid: false, errors: { plannedRetirementAge: 'Retirement age cannot exceed 70' } };
  }
  
  // Check if retirement age is after current age
  if (allInputs?.currentAge && num <= Number(allInputs.currentAge)) {
    return { isValid: false, errors: { plannedRetirementAge: 'Retirement age must be after current age' } };
  }
  
  return { isValid: true, errors: {} };
}

export function validateCurrentAnnualEarnings(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { currentAnnualEarnings: 'Current annual earnings must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { currentAnnualEarnings: 'Current annual earnings cannot be negative' } };
  }
  if (num > 200000) {
    return { isValid: false, errors: { currentAnnualEarnings: 'Current annual earnings above $200,000 is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedEarningsGrowth(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { expectedEarningsGrowth: 'Expected earnings growth must be a valid number' } };
  }
  if (num < -10) {
    return { isValid: false, errors: { expectedEarningsGrowth: 'Expected earnings growth cannot be below -10%' } };
  }
  if (num > 20) {
    return { isValid: false, errors: { expectedEarningsGrowth: 'Expected earnings growth above 20% is unrealistic' } };
  }
  return { isValid: true, errors: {} };
}

export function validateYearsToRetirement(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { yearsToRetirement: 'Years to retirement must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { yearsToRetirement: 'Years to retirement cannot be negative' } };
  }
  if (num > 50) {
    return { isValid: false, errors: { yearsToRetirement: 'Years to retirement cannot exceed 50' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAverageIndexedMonthlyEarnings(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { averageIndexedMonthlyEarnings: 'Average indexed monthly earnings must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { averageIndexedMonthlyEarnings: 'Average indexed monthly earnings cannot be negative' } };
  }
  if (num > 20000) {
    return { isValid: false, errors: { averageIndexedMonthlyEarnings: 'Average indexed monthly earnings above $20,000 is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSpouseEarnings(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { spouseEarnings: 'Spouse earnings must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { spouseEarnings: 'Spouse earnings cannot be negative' } };
  }
  if (num > 200000) {
    return { isValid: false, errors: { spouseEarnings: 'Spouse earnings above $200,000 is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateChildrenUnder18(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { childrenUnder18: 'Number of children under 18 must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { childrenUnder18: 'Number of children cannot be negative' } };
  }
  if (num > 10) {
    return { isValid: false, errors: { childrenUnder18: 'Number of children above 10 is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDisabledChildren(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { disabledChildren: 'Number of disabled children must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { disabledChildren: 'Number of disabled children cannot be negative' } };
  }
  if (num > 5) {
    return { isValid: false, errors: { disabledChildren: 'Number of disabled children above 5 is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be a valid number' } };
  }
  if (num < -20) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate cannot be below -20%' } };
  }
  if (num > 50) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate above 50% is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { taxRate: 'Tax rate cannot be negative' } };
  }
  if (num > 100) {
    return { isValid: false, errors: { taxRate: 'Tax rate cannot exceed 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTargetMonthlyIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { targetMonthlyIncome: 'Target monthly income must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { targetMonthlyIncome: 'Target monthly income cannot be negative' } };
  }
  if (num > 50000) {
    return { isValid: false, errors: { targetMonthlyIncome: 'Target monthly income above $50,000 is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonteCarloSamples(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { monteCarloSamples: 'Monte Carlo samples must be a valid number' } };
  }
  if (num < 1000) {
    return { isValid: false, errors: { monteCarloSamples: 'Monte Carlo samples must be at least 1,000' } };
  }
  if (num > 100000) {
    return { isValid: false, errors: { monteCarloSamples: 'Monte Carlo samples cannot exceed 100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateConfidenceLevel(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { confidenceLevel: 'Confidence level must be a valid number' } };
  }
  if (num < 50) {
    return { isValid: false, errors: { confidenceLevel: 'Confidence level must be at least 50%' } };
  }
  if (num > 99) {
    return { isValid: false, errors: { confidenceLevel: 'Confidence level cannot exceed 99%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGender(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validGenders = ['male', 'female'];
  if (!validGenders.includes(value)) {
    return { isValid: false, errors: { gender: 'Invalid gender selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaritalStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validStatuses = ['single', 'married', 'divorced', 'widowed'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, errors: { maritalStatus: 'Invalid marital status selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBenefitType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['retirement', 'spousal', 'survivor', 'disability'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { benefitType: 'Invalid benefit type selected' } };
  }
  return { isValid: true, errors: {} };
}

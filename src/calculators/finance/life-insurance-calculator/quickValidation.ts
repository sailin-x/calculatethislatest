import { ValidationResult } from '../../types/calculator';

/**
 * Quick validation functions for Life Insurance calculator
 * Each function validates a single field and includes the allInputs parameter
 */

export function validateAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { age: 'Age must be a valid number' } };
  }
  if (num < 18) {
    return { isValid: false, errors: { age: 'Age must be at least 18' } };
  }
  if (num > 85) {
    return { isValid: false, errors: { age: 'Age cannot exceed 85' } };
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

export function validateHealthStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validStatuses = ['excellent', 'very-good', 'good', 'fair', 'poor'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, errors: { healthStatus: 'Invalid health status selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSmokingStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validStatuses = ['non-smoker', 'smoker', 'former-smoker'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, errors: { smokingStatus: 'Invalid smoking status selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHeight(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { height: 'Height must be a valid number' } };
  }
  if (num < 48) {
    return { isValid: false, errors: { height: 'Height must be at least 48 inches' } };
  }
  if (num > 84) {
    return { isValid: false, errors: { height: 'Height cannot exceed 84 inches' } };
  }
  return { isValid: true, errors: {} };
}

export function validateWeight(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { weight: 'Weight must be a valid number' } };
  }
  if (num < 80) {
    return { isValid: false, errors: { weight: 'Weight must be at least 80 pounds' } };
  }
  if (num > 400) {
    return { isValid: false, errors: { weight: 'Weight cannot exceed 400 pounds' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInsuranceType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['term', 'whole', 'universal', 'variable', 'indexed'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { insuranceType: 'Invalid insurance type selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCoverageAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { coverageAmount: 'Coverage amount must be a valid number' } };
  }
  if (num < 10000) {
    return { isValid: false, errors: { coverageAmount: 'Coverage amount must be at least $10,000' } };
  }
  if (num > 10000000) {
    return { isValid: false, errors: { coverageAmount: 'Coverage amount cannot exceed $10 million' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePolicyTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { policyTerm: 'Policy term must be a valid number' } };
  }
  if (num < 1) {
    return { isValid: false, errors: { policyTerm: 'Policy term must be at least 1 year' } };
  }
  if (num > 50) {
    return { isValid: false, errors: { policyTerm: 'Policy term cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePremiumPaymentFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, errors: { premiumPaymentFrequency: 'Invalid payment frequency selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { annualIncome: 'Annual income must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { annualIncome: 'Annual income cannot be negative' } };
  }
  if (num > 1000000) {
    return { isValid: false, errors: { annualIncome: 'Annual income above $1 million is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentSavings(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { currentSavings: 'Current savings must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { currentSavings: 'Current savings cannot be negative' } };
  }
  if (num > 10000000) {
    return { isValid: false, errors: { currentSavings: 'Current savings above $10 million is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOutstandingDebts(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { outstandingDebts: 'Outstanding debts must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { outstandingDebts: 'Outstanding debts cannot be negative' } };
  }
  if (num > 5000000) {
    return { isValid: false, errors: { outstandingDebts: 'Outstanding debts above $5 million is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFuneralExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { funeralExpenses: 'Funeral expenses must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { funeralExpenses: 'Funeral expenses cannot be negative' } };
  }
  if (num > 50000) {
    return { isValid: false, errors: { funeralExpenses: 'Funeral expenses above $50,000 is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateChildrenEducationCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { childrenEducationCosts: 'Education costs must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { childrenEducationCosts: 'Education costs cannot be negative' } };
  }
  if (num > 1000000) {
    return { isValid: false, errors: { childrenEducationCosts: 'Education costs above $1 million is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMortgageBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { mortgageBalance: 'Mortgage balance must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { mortgageBalance: 'Mortgage balance cannot be negative' } };
  }
  if (num > 5000000) {
    return { isValid: false, errors: { mortgageBalance: 'Mortgage balance above $5 million is unusual' } };
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

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { expectedReturn: 'Expected return must be a valid number' } };
  }
  if (num < -50) {
    return { isValid: false, errors: { expectedReturn: 'Expected return cannot be below -50%' } };
  }
  if (num > 50) {
    return { isValid: false, errors: { expectedReturn: 'Expected return above 50% is unrealistic' } };
  }
  return { isValid: true, errors: {} };
}

export function validateVolatility(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { volatility: 'Volatility must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { volatility: 'Volatility cannot be negative' } };
  }
  if (num > 100) {
    return { isValid: false, errors: { volatility: 'Volatility cannot exceed 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCashValueGrowth(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { cashValueGrowth: 'Cash value growth must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { cashValueGrowth: 'Cash value growth cannot be negative' } };
  }
  if (num > 20) {
    return { isValid: false, errors: { cashValueGrowth: 'Cash value growth above 20% is unusual' } };
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

export function validateFamilyHistory(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validHistories = ['excellent', 'good', 'fair', 'poor'];
  if (!validHistories.includes(value)) {
    return { isValid: false, errors: { familyHistory: 'Invalid family history selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOccupation(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validOccupations = ['low-risk', 'medium-risk', 'high-risk'];
  if (!validOccupations.includes(value)) {
    return { isValid: false, errors: { occupation: 'Invalid occupation risk level selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHobbies(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validHobbies = ['low-risk', 'medium-risk', 'high-risk'];
  if (!validHobbies.includes(value)) {
    return { isValid: false, errors: { hobbies: 'Invalid hobby risk level selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTravelFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validFrequencies = ['low', 'medium', 'high'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, errors: { travelFrequency: 'Invalid travel frequency selected' } };
  }
  return { isValid: true, errors: {} };
}

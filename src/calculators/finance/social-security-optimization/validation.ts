import { SocialSecurityOptimizationInputs } from './types';

export function validateSocialSecurityOptimizationInputs(inputs: SocialSecurityOptimizationInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Current Age Validation
  if (!inputs.currentAge || inputs.currentAge < 18) {
    errors.push({ field: 'currentAge', message: 'Current age must be at least 18' });
  }
  if (inputs.currentAge && inputs.currentAge > 100) {
    errors.push({ field: 'currentAge', message: 'Current age cannot exceed 100' });
  }

  // Retirement Age Validation
  if (!inputs.retirementAge || inputs.retirementAge < 55) {
    errors.push({ field: 'retirementAge', message: 'Retirement age must be at least 55' });
  }
  if (inputs.retirementAge && inputs.retirementAge > 75) {
    errors.push({ field: 'retirementAge', message: 'Retirement age cannot exceed 75' });
  }
  if (inputs.retirementAge && inputs.currentAge && inputs.retirementAge <= inputs.currentAge) {
    errors.push({ field: 'retirementAge', message: 'Retirement age must be greater than current age' });
  }

  // Spouse Age Validation
  if (inputs.spouseCurrentAge && inputs.spouseCurrentAge < 18) {
    errors.push({ field: 'spouseCurrentAge', message: 'Spouse current age must be at least 18' });
  }
  if (inputs.spouseCurrentAge && inputs.spouseCurrentAge > 100) {
    errors.push({ field: 'spouseCurrentAge', message: 'Spouse current age cannot exceed 100' });
  }
  if (inputs.spouseRetirementAge && inputs.spouseCurrentAge && inputs.spouseRetirementAge <= inputs.spouseCurrentAge) {
    errors.push({ field: 'spouseRetirementAge', message: 'Spouse retirement age must be greater than current age' });
  }

  // Primary Insurance Amount Validation
  if (!inputs.primaryInsuranceAmount || inputs.primaryInsuranceAmount <= 0) {
    errors.push({ field: 'primaryInsuranceAmount', message: 'Primary insurance amount must be greater than 0' });
  }
  if (inputs.primaryInsuranceAmount && inputs.primaryInsuranceAmount > 4000) {
    errors.push({ field: 'primaryInsuranceAmount', message: 'Primary insurance amount cannot exceed $4,000 (2024 maximum)' });
  }

  // Spouse Primary Insurance Amount Validation
  if (inputs.spousePrimaryInsuranceAmount && inputs.spousePrimaryInsuranceAmount <= 0) {
    errors.push({ field: 'spousePrimaryInsuranceAmount', message: 'Spouse primary insurance amount must be greater than 0' });
  }
  if (inputs.spousePrimaryInsuranceAmount && inputs.spousePrimaryInsuranceAmount > 4000) {
    errors.push({ field: 'spousePrimaryInsuranceAmount', message: 'Spouse primary insurance amount cannot exceed $4,000' });
  }

  // Expected Lifespan Validation
  if (!inputs.expectedLifespan || inputs.expectedLifespan < 70) {
    errors.push({ field: 'expectedLifespan', message: 'Expected lifespan must be at least 70' });
  }
  if (inputs.expectedLifespan && inputs.expectedLifespan > 120) {
    errors.push({ field: 'expectedLifespan', message: 'Expected lifespan cannot exceed 120' });
  }
  if (inputs.expectedLifespan && inputs.currentAge && inputs.expectedLifespan <= inputs.currentAge) {
    errors.push({ field: 'expectedLifespan', message: 'Expected lifespan must be greater than current age' });
  }

  // Spouse Expected Lifespan Validation
  if (inputs.spouseExpectedLifespan && inputs.spouseCurrentAge && inputs.spouseExpectedLifespan <= inputs.spouseCurrentAge) {
    errors.push({ field: 'spouseExpectedLifespan', message: 'Spouse expected lifespan must be greater than current age' });
  }

  // Inflation Rate Validation
  if (inputs.inflationRate < -5 || inputs.inflationRate > 20) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -5% and 20%' });
  }

  // Discount Rate Validation
  if (!inputs.discountRate || inputs.discountRate < 0) {
    errors.push({ field: 'discountRate', message: 'Discount rate must be 0 or greater' });
  }
  if (inputs.discountRate && inputs.discountRate > 25) {
    errors.push({ field: 'discountRate', message: 'Discount rate cannot exceed 25%' });
  }

  // Current Savings Validation
  if (inputs.currentSavings < 0) {
    errors.push({ field: 'currentSavings', message: 'Current savings cannot be negative' });
  }

  // Monthly Retirement Expenses Validation
  if (!inputs.monthlyRetirementExpenses || inputs.monthlyRetirementExpenses <= 0) {
    errors.push({ field: 'monthlyRetirementExpenses', message: 'Monthly retirement expenses must be greater than 0' });
  }

  // Other Income Sources Validation
  if (inputs.otherIncomeSources < 0) {
    errors.push({ field: 'otherIncomeSources', message: 'Other income sources cannot be negative' });
  }

  // Tax Bracket Validation
  if (inputs.taxBracket < 0 || inputs.taxBracket > 100) {
    errors.push({ field: 'taxBracket', message: 'Tax bracket must be between 0% and 100%' });
  }

  return errors;
}

export function validateSocialSecurityOptimizationBusinessRules(inputs: SocialSecurityOptimizationInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Age Warnings
  if (inputs.currentAge && inputs.currentAge < 55) {
    warnings.push({ field: 'currentAge', message: 'Social Security claiming optimization is most relevant for those approaching retirement age' });
  }

  // Lifespan Warnings
  if (inputs.expectedLifespan && inputs.expectedLifespan < 80) {
    warnings.push({ field: 'expectedLifespan', message: 'Lower life expectancy may favor earlier claiming' });
  }

  // Benefit Amount Warnings
  if (inputs.primaryInsuranceAmount && inputs.primaryInsuranceAmount < 1000) {
    warnings.push({ field: 'primaryInsuranceAmount', message: 'Low benefit amount may require additional retirement planning' });
  }

  // Discount Rate Warnings
  if (inputs.discountRate && inputs.discountRate > 10) {
    warnings.push({ field: 'discountRate', message: 'High discount rate favors earlier claiming' });
  }

  // Inflation Warnings
  if (inputs.inflationRate && inputs.inflationRate > 5) {
    warnings.push({ field: 'inflationRate', message: 'High inflation favors delayed claiming' });
  }

  // Spouse Coordination Warnings
  if (inputs.filingStrategy === 'married_filing_jointly' && (!inputs.spouseCurrentAge || !inputs.spousePrimaryInsuranceAmount)) {
    warnings.push({ field: 'filingStrategy', message: 'Married filing jointly requires spouse information for accurate optimization' });
  }

  return warnings;
}
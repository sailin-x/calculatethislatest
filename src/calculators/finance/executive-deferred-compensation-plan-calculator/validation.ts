import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Executive deferred compensation validation rules
 */
export const executiveDeferredCompensationValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('retirementAge', 'Retirement age is required'),
  ValidationRuleFactory.required('currentSalary', 'Current salary is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
  ValidationRuleFactory.required('currentTaxRate', 'Current tax rate is required'),
  ValidationRuleFactory.required('deferredTaxRate', 'Deferred tax rate is required'),

  // Age validations
  ValidationRuleFactory.range('currentAge', 18, 70, 'Current age must be between 18 and 70'),
  ValidationRuleFactory.range('retirementAge', 50, 75, 'Retirement age must be between 50 and 75'),

  // Financial validations
  ValidationRuleFactory.range('currentSalary', 50000, 10000000, 'Current salary must be between $50,000 and $10,000,000'),
  ValidationRuleFactory.range('expectedSalaryGrowth', -10, 20, 'Expected salary growth must be between -10% and 20%'),
  ValidationRuleFactory.range('annualDeferralAmount', 0, 1000000, 'Annual deferral amount must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('deferralPercentage', 0, 100, 'Deferral percentage must be between 0% and 100%'),

  // Investment validations
  ValidationRuleFactory.range('expectedReturn', -10, 30, 'Expected return must be between -10% and 30%'),
  ValidationRuleFactory.range('companyMatch', 0, 200, 'Company match must be between 0% and 200%'),
  ValidationRuleFactory.range('companyMatchLimit', 0, 50000, 'Company match limit must be between $0 and $50,000'),

  // Tax validations
  ValidationRuleFactory.range('currentTaxRate', 0, 50, 'Current tax rate must be between 0% and 50%'),
  ValidationRuleFactory.range('deferredTaxRate', 0, 50, 'Deferred tax rate must be between 0% and 50%'),
  ValidationRuleFactory.range('capitalGainsTaxRate', 0, 30, 'Capital gains tax rate must be between 0% and 30%'),

  // Plan feature validations
  ValidationRuleFactory.range('vestingPeriod', 0, 10, 'Vesting period must be between 0 and 10 years'),
  ValidationRuleFactory.range('employerContribution', 0, 100000, 'Employer contribution must be between $0 and $100,000'),

  // Time and risk validations
  ValidationRuleFactory.range('analysisYears', 1, 50, 'Analysis years must be between 1 and 50'),
  ValidationRuleFactory.range('inflationRate', 0, 10, 'Inflation rate must be between 0% and 10%'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'retirementAge',
    (retirementAge, allInputs) => {
      if (!allInputs?.currentAge) return true;
      return retirementAge > allInputs.currentAge;
    },
    'Retirement age must be greater than current age'
  ),

  ValidationRuleFactory.businessRule(
    'annualDeferralAmount',
    (annualDeferralAmount, allInputs) => {
      if (!allInputs?.currentSalary) return true;
      return annualDeferralAmount <= allInputs.currentSalary * 0.5; // Max 50% of salary
    },
    'Annual deferral amount should not exceed 50% of current salary'
  ),

  ValidationRuleFactory.businessRule(
    'deferralPercentage',
    (deferralPercentage, allInputs) => {
      if (!allInputs?.annualDeferralAmount || !allInputs?.currentSalary) return true;
      const calculatedPercentage = (allInputs.annualDeferralAmount / allInputs.currentSalary) * 100;
      return Math.abs(deferralPercentage - calculatedPercentage) < 1; // Allow 1% variance
    },
    'Deferral percentage should match the calculated percentage from deferral amount'
  ),

  ValidationRuleFactory.businessRule(
    'companyMatchLimit',
    (companyMatchLimit, allInputs) => {
      if (!allInputs?.currentSalary) return true;
      return companyMatchLimit <= allInputs.currentSalary * 0.1; // Max 10% of salary
    },
    'Company match limit should not exceed 10% of current salary'
  ),

  ValidationRuleFactory.businessRule(
    'deferredTaxRate',
    (deferredTaxRate, allInputs) => {
      if (!allInputs?.currentTaxRate) return true;
      return deferredTaxRate <= allInputs.currentTaxRate; // Deferred rate should be lower
    },
    'Deferred tax rate should typically be lower than current tax rate'
  ),

  ValidationRuleFactory.businessRule(
    'vestingPeriod',
    (vestingPeriod, allInputs) => {
      if (!allInputs?.currentAge || !allInputs?.retirementAge) return true;
      const workingYears = allInputs.retirementAge - allInputs.currentAge;
      return vestingPeriod <= workingYears;
    },
    'Vesting period should not exceed working years until retirement'
  )
];

/**
 * Get validation rules for executive deferred compensation calculator
 */
export function getExecutiveDeferredCompensationValidationRules(): ValidationRule[] {
  return executiveDeferredCompensationValidationRules;
}
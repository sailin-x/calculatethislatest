import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Pension Plan Funding validation rules
 */
export const pensionFundingValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('currentPlanBalance', 'Current plan balance is required'),
  ValidationRuleFactory.required('targetRetirementBalance', 'Target retirement balance is required'),
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('retirementAge', 'Retirement age is required'),
  ValidationRuleFactory.required('annualContribution', 'Annual contribution is required'),
  ValidationRuleFactory.required('employerMatch', 'Employer match is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
  ValidationRuleFactory.required('currentSalary', 'Current salary is required'),
  ValidationRuleFactory.required('planType', 'Plan type is required'),
  ValidationRuleFactory.required('fundingStrategy', 'Funding strategy is required'),

  // Value validations
  ValidationRuleFactory.range('currentPlanBalance', 0, 10000000, 'Current plan balance must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('targetRetirementBalance', 0, 20000000, 'Target retirement balance must be between $0 and $20,000,000'),
  ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
  ValidationRuleFactory.range('retirementAge', 1, 120, 'Retirement age must be between 1 and 120'),
  ValidationRuleFactory.range('annualContribution', 0, 500000, 'Annual contribution must be between $0 and $500,000'),
  ValidationRuleFactory.range('employerMatch', 0, 100, 'Employer match must be between 0% and 100%'),
  ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
  ValidationRuleFactory.range('currentSalary', 0, 10000000, 'Current salary must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('salaryGrowthRate', -10, 20, 'Salary growth rate must be between -10% and 20%'),

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
    'targetRetirementBalance',
    (targetRetirementBalance, allInputs) => {
      if (!allInputs?.currentPlanBalance) return true;
      return targetRetirementBalance > allInputs.currentPlanBalance;
    },
    'Target retirement balance should be greater than current balance'
  ),

  ValidationRuleFactory.businessRule(
    'annualContribution',
    (annualContribution, allInputs) => {
      if (!allInputs?.currentSalary) return true;
      return annualContribution <= allInputs.currentSalary * 0.5; // Max 50% of salary
    },
    'Annual contribution should not exceed 50% of current salary'
  ),

  ValidationRuleFactory.businessRule(
    'employerMatch',
    (employerMatch, allInputs) => {
      if (!allInputs?.planType) return true;

      // Different limits for different plan types
      if (allInputs.planType === 'defined_contribution') {
        return employerMatch <= 100; // 401(k) match limit
      }
      return employerMatch <= 50; // Other plan types
    },
    'Employer match exceeds typical limits for this plan type'
  ),

  ValidationRuleFactory.businessRule(
    'expectedReturn',
    (expectedReturn, allInputs) => {
      if (!allInputs?.fundingStrategy) return true;

      // Adjust expectations based on strategy
      const maxReturns = {
        'conservative': 6,
        'moderate': 8,
        'aggressive': 12
      };

      return expectedReturn <= (maxReturns[allInputs.fundingStrategy as keyof typeof maxReturns] || 8);
    },
    'Expected return seems unrealistic for the selected funding strategy'
  ),

  ValidationRuleFactory.businessRule(
    'currentSalary',
    (currentSalary, allInputs) => {
      if (!allInputs?.annualContribution) return true;
      return currentSalary >= allInputs.annualContribution;
    },
    'Annual contribution cannot exceed current salary'
  )
];

/**
 * Get validation rules for Pension Plan Funding calculator
 */
export function getPensionFundingValidationRules(): ValidationRule[] {
  return pensionFundingValidationRules;
}
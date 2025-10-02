import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Retirement Savings validation rules
 */
export const retirementSavingsValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('retirementAge', 'Retirement age is required'),
  ValidationRuleFactory.required('currentSavings', 'Current savings is required'),
  ValidationRuleFactory.required('monthlyContribution', 'Monthly contribution is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
  ValidationRuleFactory.required('retirementIncomeNeeded', 'Retirement income needed is required'),
  ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
  ValidationRuleFactory.required('contributionFrequency', 'Contribution frequency is required'),
  ValidationRuleFactory.required('accountType', 'Account type is required'),

  // Value validations
  ValidationRuleFactory.range('currentAge', 18, 120, 'Current age must be between 18 and 120'),
  ValidationRuleFactory.range('retirementAge', 50, 120, 'Retirement age must be between 50 and 120'),
  ValidationRuleFactory.range('currentSavings', 0, 10000000, 'Current savings must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('monthlyContribution', 0, 10000, 'Monthly contribution must be between $0 and $10,000'),
  ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
  ValidationRuleFactory.range('inflationRate', -10, 20, 'Inflation rate must be between -10% and 20%'),
  ValidationRuleFactory.range('retirementIncomeNeeded', 0, 500000, 'Retirement income needed must be between $0 and $500,000'),
  ValidationRuleFactory.range('socialSecurityBenefit', 0, 50000, 'Social Security benefit must be between $0 and $50,000'),
  ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('employerMatch', 0, 100, 'Employer match must be between 0% and 100%'),
  ValidationRuleFactory.range('employerMatchLimit', 0, 20000, 'Employer match limit must be between $0 and $20,000'),

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
    'retirementIncomeNeeded',
    (retirementIncomeNeeded, allInputs) => {
      if (!allInputs?.socialSecurityBenefit) return true;
      return retirementIncomeNeeded > allInputs.socialSecurityBenefit;
    },
    'Retirement income needed should typically exceed Social Security benefits'
  ),

  ValidationRuleFactory.businessRule(
    'monthlyContribution',
    (monthlyContribution, allInputs) => {
      if (!allInputs?.accountType) return true;

      // Different contribution limits for different account types
      if (allInputs.accountType === '401k' && monthlyContribution > 2300) {
        return false; // 2024 401k limit is $23,000 annually
      }
      if (allInputs.accountType === 'traditional_ira' && monthlyContribution > 167) {
        return false; // 2024 IRA limit is $7,000 annually
      }
      return monthlyContribution >= 0;
    },
    'Monthly contribution exceeds IRS limits for the selected account type'
  ),

  ValidationRuleFactory.businessRule(
    'employerMatch',
    (employerMatch, allInputs) => {
      if (!allInputs?.accountType) return true;

      // Employer match only applies to workplace plans
      if (allInputs.accountType === '401k' || allInputs.accountType === '403b') {
        return employerMatch >= 0 && employerMatch <= 100;
      }
      return employerMatch === 0; // No employer match for IRAs
    },
    'Employer match only applies to workplace retirement plans'
  ),

  ValidationRuleFactory.businessRule(
    'taxBracket',
    (taxBracket, allInputs) => {
      if (!allInputs?.accountType) return true;

      // Different tax implications for different account types
      if (allInputs.accountType === 'roth_ira') {
        return true; // Roth accounts have different tax treatment
      }
      return taxBracket >= 0 && taxBracket <= 50;
    },
    'Tax bracket validation based on account type'
  )
];

/**
 * Get validation rules for Retirement Savings calculator
 */
export function getRetirementSavingsValidationRules(): ValidationRule[] {
  return retirementSavingsValidationRules;
}
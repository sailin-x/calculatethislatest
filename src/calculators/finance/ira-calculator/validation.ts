import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * IRA validation rules
 */
export const iraValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('currentBalance', 'Current balance is required'),
  ValidationRuleFactory.required('annualContribution', 'Annual contribution is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
  ValidationRuleFactory.required('yearsToRetirement', 'Years to retirement is required'),
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('iraType', 'IRA type is required'),
  ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),

  // Value validations
  ValidationRuleFactory.range('currentBalance', 0, 10000000, 'Current balance must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('annualContribution', 0, 23000, 'Annual contribution must be between $0 and $23,000'),
  ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
  ValidationRuleFactory.range('yearsToRetirement', 0, 100, 'Years to retirement must be between 0 and 100'),
  ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
  ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('inflationRate', -10, 20, 'Inflation rate must be between -10% and 20%'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'annualContribution',
    (annualContribution, allInputs) => {
      if (!allInputs?.iraType || !allInputs?.currentAge || !allInputs?.catchUpContributions) return true;

      const limits = {
        traditional: 7000,
        roth: 7000,
        sep: 69000,
        simple: 16000
      };

      let limit = limits[allInputs.iraType as keyof typeof limits] || 7000;

      if (allInputs.catchUpContributions && allInputs.currentAge >= 50) {
        limit += 1000;
      }

      if (allInputs.spousalIRA) {
        limit *= 2;
      }

      return annualContribution <= limit;
    },
    'Contribution exceeds IRS annual limit for selected IRA type and age'
  ),

  ValidationRuleFactory.businessRule(
    'currentAge',
    (currentAge, allInputs) => {
      if (!allInputs?.yearsToRetirement) return true;
      return currentAge + allInputs.yearsToRetirement <= 120;
    },
    'Age at retirement cannot exceed 120 years'
  ),

  ValidationRuleFactory.businessRule(
    'iraType',
    (iraType, allInputs) => {
      if (!allInputs?.currentAge) return true;

      // SEP and SIMPLE IRAs have age restrictions
      if (iraType === 'sep' && allInputs.currentAge < 21) {
        return false;
      }

      return true;
    },
    'SEP IRAs require minimum age of 21'
  )
];

/**
 * Get validation rules for IRA calculator
 */
export function getIRAValidationRules(): ValidationRule[] {
  return iraValidationRules;
}
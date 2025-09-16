import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Mega Backdoor Roth validation rules
 */
export const megaBackdoorRothValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('annualSalary', 'Annual salary is required'),
  ValidationRuleFactory.required('current401kBalance', 'Current 401(k) balance is required'),
  ValidationRuleFactory.required('currentRothBalance', 'Current Roth balance is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
  ValidationRuleFactory.required('yearsToRetirement', 'Years to retirement is required'),
  ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),

  // Value validations
  ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
  ValidationRuleFactory.range('annualSalary', 0, 10000000, 'Annual salary must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('employerMatch', 0, 20, 'Employer match must be between 0% and 20%'),
  ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
  ValidationRuleFactory.range('yearsToRetirement', 0, 100, 'Years to retirement must be between 0 and 100'),
  ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('stateTaxRate', 0, 20, 'State tax rate must be between 0% and 20%'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'currentAge',
    (currentAge, allInputs) => {
      if (!allInputs?.yearsToRetirement) return true;
      return currentAge + allInputs.yearsToRetirement <= 120;
    },
    'Age at retirement cannot exceed 120 years'
  ),

  ValidationRuleFactory.businessRule(
    'annualSalary',
    (annualSalary, allInputs) => {
      if (!allInputs?.currentAge) return true;

      // Mega Backdoor Roth typically requires high income
      const minSalary = allInputs.currentAge >= 50 ? 100000 : 150000;
      return annualSalary >= minSalary || annualSalary === 0;
    },
    'Mega Backdoor Roth typically requires higher income levels for optimal benefits'
  ),

  ValidationRuleFactory.businessRule(
    'taxBracket',
    (taxBracket, allInputs) => {
      if (!allInputs?.includeAfterTaxContributions) return true;

      // Higher tax brackets benefit more from Roth conversions
      return taxBracket >= 22 || taxBracket === 0;
    },
    'Mega Backdoor Roth is most beneficial in higher tax brackets'
  )
];

/**
 * Get validation rules for Mega Backdoor Roth calculator
 */
export function getMegaBackdoorRothValidationRules(): ValidationRule[] {
  return megaBackdoorRothValidationRules;
}
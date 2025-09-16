import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Required Minimum Distribution RMD validation rules
 */
export const rmdRMDValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('accountBalance', 'Account balance is required'),
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
  ValidationRuleFactory.required('accountType', 'Account type is required'),
  ValidationRuleFactory.required('beneficiaryType', 'Beneficiary type is required'),
  ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),

  // Value validations
  ValidationRuleFactory.range('accountBalance', 0, 10000000, 'Account balance must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
  ValidationRuleFactory.range('lifeExpectancy', 1, 120, 'Life expectancy must be between 1 and 120'),
  ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
  ValidationRuleFactory.range('previousYearBalance', 0, 10000000, 'Previous year balance must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('qualifiedCharitableDistribution', 0, 10000000, 'Qualified charitable distribution must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('spouseAge', 0, 120, 'Spouse age must be between 0 and 120'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'lifeExpectancy',
    (lifeExpectancy, allInputs) => {
      if (!allInputs?.currentAge) return true;
      return lifeExpectancy > allInputs.currentAge;
    },
    'Life expectancy must be greater than current age'
  ),

  ValidationRuleFactory.businessRule(
    'qualifiedCharitableDistribution',
    (qualifiedCharitableDistribution, allInputs) => {
      if (!allInputs?.accountBalance) return true;
      return qualifiedCharitableDistribution <= allInputs.accountBalance;
    },
    'Qualified charitable distribution cannot exceed account balance'
  ),

  ValidationRuleFactory.businessRule(
    'previousYearBalance',
    (previousYearBalance, allInputs) => {
      if (!allInputs?.accountBalance) return true;
      return previousYearBalance <= allInputs.accountBalance * 1.5; // Allow for growth
    },
    'Previous year balance seems unrealistic compared to current balance'
  ),

  ValidationRuleFactory.businessRule(
    'taxBracket',
    (taxBracket, allInputs) => {
      if (!allInputs?.accountType) return true;

      // Roth IRAs have different tax implications
      if (allInputs.accountType === 'roth_ira' && taxBracket > 0) {
        return true; // Roth withdrawals are tax-free
      }
      return taxBracket >= 0 && taxBracket <= 50;
    },
    'Tax bracket validation based on account type'
  ),

  ValidationRuleFactory.businessRule(
    'spouseAge',
    (spouseAge, allInputs) => {
      if (!allInputs?.includeSpouse) return true;
      return spouseAge >= 0 && spouseAge <= 120;
    },
    'Spouse age must be between 0 and 120 when spouse is included'
  ),

  ValidationRuleFactory.businessRule(
    'currentAge',
    (currentAge, allInputs) => {
      if (!allInputs?.accountType) return true;

      // Different RBD ages for different account types
      if (allInputs.accountType === 'roth_ira') {
        return currentAge >= 0; // No RMD requirement
      }
      return currentAge >= 72; // SECURE Act 2.0 requirement
    },
    'Current age validation based on account type and RMD requirements'
  )
];

/**
 * Get validation rules for Required Minimum Distribution RMD calculator
 */
export function getRMDRMDValidationRules(): ValidationRule[] {
  return rmdRMDValidationRules;
}
import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Required Beginning Date RMD validation rules
 */
export const rbdRMDValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('birthYear', 'Birth year is required'),
  ValidationRuleFactory.required('currentYear', 'Current year is required'),
  ValidationRuleFactory.required('accountBalance', 'Account balance is required'),
  ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
  ValidationRuleFactory.required('accountType', 'Account type is required'),
  ValidationRuleFactory.required('beneficiaryType', 'Beneficiary type is required'),
  ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),

  // Value validations
  ValidationRuleFactory.range('birthYear', 1900, 2010, 'Birth year must be between 1900 and 2010'),
  ValidationRuleFactory.range('currentYear', 2020, 2050, 'Current year must be between 2020 and 2050'),
  ValidationRuleFactory.range('accountBalance', 0, 10000000, 'Account balance must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('lifeExpectancy', 1, 120, 'Life expectancy must be between 1 and 120 years'),
  ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
  ValidationRuleFactory.range('spouseBirthYear', 1900, 2010, 'Spouse birth year must be between 1900 and 2010'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'currentYear',
    (currentYear, allInputs) => {
      if (!allInputs?.birthYear) return true;
      return currentYear >= allInputs.birthYear;
    },
    'Current year must be greater than or equal to birth year'
  ),

  ValidationRuleFactory.businessRule(
    'lifeExpectancy',
    (lifeExpectancy, allInputs) => {
      if (!allInputs?.birthYear || !allInputs?.currentYear) return true;
      const currentAge = allInputs.currentYear - allInputs.birthYear;
      return lifeExpectancy > currentAge;
    },
    'Life expectancy must be greater than current age'
  ),

  ValidationRuleFactory.businessRule(
    'accountBalance',
    (accountBalance, allInputs) => {
      if (!allInputs?.accountType) return true;

      // Minimum balances for certain account types
      if (allInputs.accountType === 'roth_ira' && accountBalance < 1000) {
        return false; // Warning for very small Roth balances
      }
      return accountBalance >= 0;
    },
    'Account balance validation based on account type'
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
    'spouseBirthYear',
    (spouseBirthYear, allInputs) => {
      if (!allInputs?.includeSpouse) return true;
      return spouseBirthYear >= 1900 && spouseBirthYear <= 2010;
    },
    'Spouse birth year must be between 1900 and 2010 when spouse is included'
  ),

  ValidationRuleFactory.businessRule(
    'beneficiaryType',
    (beneficiaryType, allInputs) => {
      if (!allInputs?.accountType) return true;

      // Certain beneficiary types have special rules
      if (allInputs.accountType === 'roth_ira' && beneficiaryType === 'charity') {
        return true; // Charities can be Roth IRA beneficiaries
      }
      return true; // All beneficiary types are generally valid
    },
    'Beneficiary type validation based on account type'
  )
];

/**
 * Get validation rules for Required Beginning Date RMD calculator
 */
export function getRBDRMDValidationRules(): ValidationRule[] {
  return rbdRMDValidationRules;
}
import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Roth Conversion validation rules
 */
export const rothConversionValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('conversionAmount', 'Conversion amount is required'),
  ValidationRuleFactory.required('currentTaxBracket', 'Current tax bracket is required'),
  ValidationRuleFactory.required('expectedTaxBracket', 'Expected tax bracket is required'),
  ValidationRuleFactory.required('timeHorizon', 'Time horizon is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
  ValidationRuleFactory.required('accountType', 'Account type is required'),

  // Value validations
  ValidationRuleFactory.range('currentAge', 18, 120, 'Current age must be between 18 and 120'),
  ValidationRuleFactory.range('conversionAmount', 0, 1000000, 'Conversion amount must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('currentTaxBracket', 0, 50, 'Current tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('expectedTaxBracket', 0, 50, 'Expected tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('timeHorizon', 1, 100, 'Time horizon must be between 1 and 100 years'),
  ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
  ValidationRuleFactory.range('inflationRate', -10, 20, 'Inflation rate must be between -10% and 20%'),
  ValidationRuleFactory.range('stateTaxRate', 0, 20, 'State tax rate must be between 0% and 20%'),
  ValidationRuleFactory.range('medicalExpenses', 0, 100000, 'Medical expenses must be between $0 and $100,000'),
  ValidationRuleFactory.range('charitableContributions', 0, 100000, 'Charitable contributions must be between $0 and $100,000'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'conversionAmount',
    (conversionAmount, allInputs) => {
      if (!allInputs?.accountType) return true;

      // Different limits for different account types
      if (allInputs.accountType === 'traditional_ira') {
        return conversionAmount <= 100000; // Reasonable IRA conversion limit
      }
      return conversionAmount <= 1000000; // Higher limit for 401k
    },
    'Conversion amount exceeds typical limits for selected account type'
  ),

  ValidationRuleFactory.businessRule(
    'timeHorizon',
    (timeHorizon, allInputs) => {
      if (!allInputs?.fiveYearRule) return true;
      return timeHorizon >= 5; // Five-year rule consideration
    },
    'Consider five-year rule requirements for Roth conversions'
  ),

  ValidationRuleFactory.businessRule(
    'currentAge',
    (currentAge, allInputs) => {
      if (!allInputs?.accountType) return true;

      // Age restrictions for different account types
      if (allInputs.accountType === '401k') {
        return currentAge >= 59.5; // 401k early withdrawal penalty
      }
      return currentAge >= 18; // General retirement account age
    },
    'Age restrictions may apply for early withdrawals from retirement accounts'
  ),

  ValidationRuleFactory.businessRule(
    'expectedTaxBracket',
    (expectedTaxBracket, allInputs) => {
      if (!allInputs?.currentTaxBracket) return true;
      // Expected tax bracket should be reasonable compared to current
      return Math.abs(expectedTaxBracket - allInputs.currentTaxBracket) <= 20;
    },
    'Expected tax bracket seems unrealistic compared to current bracket'
  ),

  ValidationRuleFactory.businessRule(
    'stateTaxRate',
    (stateTaxRate, allInputs) => {
      if (!allInputs?.includeStateTax) return true;
      return stateTaxRate >= 0 && stateTaxRate <= 20;
    },
    'State tax rate must be provided when state tax is included'
  ),

  ValidationRuleFactory.businessRule(
    'accountType',
    (accountType, allInputs) => {
      const validTypes = ['traditional_ira', '401k', 'sep_ira', 'simple_ira'];
      return validTypes.includes(accountType);
    },
    'Please select a valid account type for conversion'
  )
];

/**
 * Get validation rules for Roth Conversion calculator
 */
export function getRothConversionValidationRules(): ValidationRule[] {
  return rothConversionValidationRules;
}
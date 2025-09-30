import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * CAGR validation rules
 */
export const cagrValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('beginningValue', 'Beginning value is required'),
  ValidationRuleFactory.required('endingValue', 'Ending value is required'),
  ValidationRuleFactory.required('numberOfPeriods', 'Number of periods is required'),
  ValidationRuleFactory.required('periodType', 'Period type is required'),

  // Value validations
  ValidationRuleFactory.range('beginningValue', 0.01, 100000000, 'Beginning value must be between $0.01 and $100,000,000'),
  ValidationRuleFactory.range('endingValue', 0, 100000000, 'Ending value must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('numberOfPeriods', 1, 100, 'Number of periods must be between 1 and 100'),
  ValidationRuleFactory.range('dividendAmount', 0, 100000, 'Dividend amount must be between $0 and $100,000'),
  ValidationRuleFactory.range('inflationRate', -10, 20, 'Inflation rate must be between -10% and 20%'),
  ValidationRuleFactory.range('taxRate', 0, 100, 'Tax rate must be between 0% and 100%'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'endingValue',
    (endingValue, allInputs) => {
      if (!allInputs?.beginningValue) return true;
      return endingValue >= 0; // Allow losses
    },
    'Ending value validation'
  ),

  ValidationRuleFactory.businessRule(
    'dividendAmount',
    (dividendAmount, allInputs) => {
      if (!allInputs?.includeDividends) return true;
      return dividendAmount >= 0;
    },
    'Dividend amount should be included when dividends are enabled'
  ),

  ValidationRuleFactory.businessRule(
    'numberOfPeriods',
    (numberOfPeriods, allInputs) => {
      if (!allInputs?.periodType) return true;
      if (allInputs.periodType === 'days' && numberOfPeriods > 365 * 50) {
        return false; // Too many days
      }
      if (allInputs.periodType === 'months' && numberOfPeriods > 12 * 50) {
        return false; // Too many months
      }
      return true;
    },
    'Number of periods seems unusually high for the selected period type'
  )
];

/**
 * Get validation rules for CAGR calculator
 */
export function getCAGRValidationRules(): ValidationRule[] {
  return cagrValidationRules;
}
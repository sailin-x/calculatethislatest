import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * ILIT validation rules
 */
export const ilitValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('trustValue', 'Trust value is required'),
  ValidationRuleFactory.required('annualPremium', 'Annual premium is required'),
  ValidationRuleFactory.required('deathBenefit', 'Death benefit is required'),
  ValidationRuleFactory.required('trustDuration', 'Trust duration is required'),
  ValidationRuleFactory.required('discountRate', 'Discount rate is required'),
  ValidationRuleFactory.required('taxRate', 'Tax rate is required'),
  ValidationRuleFactory.required('numberOfBeneficiaries', 'Number of beneficiaries is required'),
  ValidationRuleFactory.required('trustType', 'Trust type is required'),
  ValidationRuleFactory.required('stateOfResidence', 'State of residence is required'),

  // Value validations
  ValidationRuleFactory.range('trustValue', 0, 10000000, 'Trust value must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('annualPremium', 0, 100000, 'Annual premium must be between $0 and $100,000'),
  ValidationRuleFactory.range('deathBenefit', 0, 50000000, 'Death benefit must be between $0 and $50,000,000'),
  ValidationRuleFactory.range('trustDuration', 1, 100, 'Trust duration must be between 1 and 100 years'),
  ValidationRuleFactory.range('discountRate', -10, 20, 'Discount rate must be between -10% and 20%'),
  ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),
  ValidationRuleFactory.range('numberOfBeneficiaries', 1, 50, 'Number of beneficiaries must be between 1 and 50'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'deathBenefit',
    (deathBenefit, allInputs) => {
      if (!allInputs?.trustValue) return true;
      return deathBenefit >= allInputs.trustValue;
    },
    'Death benefit should typically exceed trust value for meaningful coverage'
  ),

  ValidationRuleFactory.businessRule(
    'annualPremium',
    (annualPremium, allInputs) => {
      if (!allInputs?.deathBenefit) return true;
      return annualPremium <= allInputs.deathBenefit * 0.01; // Premium shouldn't exceed 1% of death benefit
    },
    'Annual premium seems unusually high relative to death benefit'
  ),

  ValidationRuleFactory.businessRule(
    'trustDuration',
    (trustDuration, allInputs) => {
      if (!allInputs?.trustType) return true;
      if (allInputs.trustType === 'charitable-remainder') {
        return trustDuration >= 10; // Charitable remainder trusts typically longer
      }
      return true;
    },
    'Charitable remainder trusts typically have longer durations'
  )
];

/**
 * Get validation rules for ILIT calculator
 */
export function getILITValidationRules(): ValidationRule[] {
  return ilitValidationRules;
}
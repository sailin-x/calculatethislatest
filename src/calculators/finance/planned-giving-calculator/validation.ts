import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Planned Giving validation rules
 */
export const plannedGivingValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('giftAmount', 'Gift amount is required'),
  ValidationRuleFactory.required('donorAge', 'Donor age is required'),
  ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
  ValidationRuleFactory.required('givingMethod', 'Giving method is required'),
  ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
  ValidationRuleFactory.required('charitableDeductionRate', 'Charitable deduction rate is required'),

  // Value validations
  ValidationRuleFactory.range('giftAmount', 0, 100000000, 'Gift amount must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('donorAge', 0, 120, 'Donor age must be between 0 and 120'),
  ValidationRuleFactory.range('lifeExpectancy', 1, 120, 'Life expectancy must be between 1 and 120'),
  ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
  ValidationRuleFactory.range('charitableDeductionRate', 0, 100, 'Charitable deduction rate must be between 0% and 100%'),
  ValidationRuleFactory.range('payoutRate', 0, 50, 'Payout rate must be between 0% and 50%'),
  ValidationRuleFactory.range('trustTerm', 1, 100, 'Trust term must be between 1 and 100 years'),
  ValidationRuleFactory.range('spouseAge', 0, 120, 'Spouse age must be between 0 and 120'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'lifeExpectancy',
    (lifeExpectancy, allInputs) => {
      if (!allInputs?.donorAge) return true;
      return lifeExpectancy > allInputs.donorAge;
    },
    'Life expectancy must be greater than donor age'
  ),

  ValidationRuleFactory.businessRule(
    'charitableDeductionRate',
    (charitableDeductionRate, allInputs) => {
      if (!allInputs?.givingMethod) return true;

      // Different limits for different giving methods
      if (allInputs.givingMethod === 'charitable_remainder_trust') {
        return charitableDeductionRate <= 50; // CRT limit
      } else if (allInputs.givingMethod === 'charitable_lead_trust') {
        return charitableDeductionRate <= 60; // CLT limit
      }
      return charitableDeductionRate <= 100;
    },
    'Charitable deduction rate exceeds IRS limits for this giving method'
  ),

  ValidationRuleFactory.businessRule(
    'payoutRate',
    (payoutRate, allInputs) => {
      if (!allInputs?.givingMethod || !allInputs?.givingMethod.includes('trust')) return true;
      return payoutRate >= 0 && payoutRate <= 50;
    },
    'Payout rate must be between 0% and 50% for trust-based giving methods'
  ),

  ValidationRuleFactory.businessRule(
    'trustTerm',
    (trustTerm, allInputs) => {
      if (!allInputs?.givingMethod || !allInputs?.givingMethod.includes('trust')) return true;
      return trustTerm >= 1 && trustTerm <= 100;
    },
    'Trust term must be between 1 and 100 years for trust-based giving'
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
    'giftAmount',
    (giftAmount, allInputs) => {
      if (!allInputs?.givingMethod) return true;

      // Minimum amounts for certain giving methods
      if (allInputs.givingMethod === 'life_insurance') {
        return giftAmount >= 10000; // Minimum for life insurance gifts
      }
      return giftAmount >= 0;
    },
    'Gift amount may be below minimum requirements for this giving method'
  )
];

/**
 * Get validation rules for Planned Giving calculator
 */
export function getPlannedGivingValidationRules(): ValidationRule[] {
  return plannedGivingValidationRules;
}
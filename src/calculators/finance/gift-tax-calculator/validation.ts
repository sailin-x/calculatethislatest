import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Gift tax validation rules
 */
export const giftTaxValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('giftValue', 'Gift value is required'),
  ValidationRuleFactory.required('annualExclusion', 'Annual exclusion is required'),
  ValidationRuleFactory.required('giftTaxRate', 'Gift tax rate is required'),

  // Value validations
  ValidationRuleFactory.range('giftValue', 0, 100000000, 'Gift value must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('annualExclusion', 0, 1000000, 'Annual exclusion must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('numberOfRecipients', 1, 100, 'Number of recipients must be between 1 and 100'),

  // Tax rate validations
  ValidationRuleFactory.range('giftTaxRate', 0, 100, 'Gift tax rate must be between 0% and 100%'),
  ValidationRuleFactory.range('estateTaxRate', 0, 100, 'Estate tax rate must be between 0% and 100%'),
  ValidationRuleFactory.range('stateGiftTax', 0, 100, 'State gift tax must be between 0% and 100%'),

  // Lifetime exclusion validations
  ValidationRuleFactory.range('totalLifetimeExclusionsUsed', 0, 100000000, 'Total lifetime exclusions used must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('totalLifetimeExclusion', 0, 100000000, 'Total lifetime exclusion must be between $0 and $100,000,000'),

  // Year validations
  ValidationRuleFactory.range('taxYear', 2020, 2030, 'Tax year must be between 2020 and 2030'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'totalLifetimeExclusionsUsed',
    (totalLifetimeExclusionsUsed, allInputs) => {
      if (!allInputs?.totalLifetimeExclusion) return true;
      return totalLifetimeExclusionsUsed <= allInputs.totalLifetimeExclusion;
    },
    'Lifetime exclusions used cannot exceed total lifetime exclusion'
  ),

  ValidationRuleFactory.businessRule(
    'annualExclusion',
    (annualExclusion, allInputs) => {
      if (!allInputs?.relationshipToRecipient) return true;

      // Spousal unlimited exclusion
      if (allInputs.relationshipToRecipient === 'spouse') {
        return true; // No limit for spouses
      }

      // Standard annual exclusion limit (2024)
      return annualExclusion <= 18000;
    },
    'Annual exclusion exceeds IRS limit for the selected relationship'
  ),

  ValidationRuleFactory.businessRule(
    'giftValue',
    (giftValue, allInputs) => {
      if (!allInputs?.isCharitableGift || !allInputs?.isEducationExpense || !allInputs?.isMedicalExpense) return true;

      // Charitable gifts have different rules
      if (allInputs.isCharitableGift) {
        return true; // No limit for charitable gifts
      }

      // Education and medical exclusions
      if (allInputs.isEducationExpense || allInputs.isMedicalExpense) {
        return true; // Additional exclusions apply
      }

      return giftValue >= 0;
    },
    'Gift value validation based on gift type'
  ),

  ValidationRuleFactory.businessRule(
    'relationshipToRecipient',
    (relationshipToRecipient, allInputs) => {
      const validRelationships = ['spouse', 'child', 'grandchild', 'parent', 'sibling', 'other'];
      return validRelationships.includes(relationshipToRecipient);
    },
    'Please select a valid relationship to recipient'
  ),

  ValidationRuleFactory.businessRule(
    'filingStatus',
    (filingStatus, allInputs) => {
      const validStatuses = ['single', 'married-joint', 'married-separate', 'head-household'];
      return validStatuses.includes(filingStatus);
    },
    'Please select a valid filing status'
  ),

  ValidationRuleFactory.businessRule(
    'giftFrequency',
    (giftFrequency, allInputs) => {
      const validFrequencies = ['one-time', 'annual', 'monthly'];
      return validFrequencies.includes(giftFrequency);
    },
    'Please select a valid gift frequency'
  )
];

/**
 * Get validation rules for gift tax calculator
 */
export function getGiftTaxValidationRules(): ValidationRule[] {
  return giftTaxValidationRules;
}
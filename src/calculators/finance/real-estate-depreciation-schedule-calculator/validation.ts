import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Real estate depreciation validation rules
 */
export const realEstateDepreciationValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('propertyCost', 'Property cost is required'),
  ValidationRuleFactory.required('depreciationStartDate', 'Depreciation start date is required'),

  // Positive value validations
  ValidationRuleFactory.range('propertyCost', 0, 100000000, 'Property cost must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('landValue', 0, 100000000, 'Land value must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('usefulLife', 1, 50, 'Useful life must be between 1 and 50 years'),
  ValidationRuleFactory.range('calculationYears', 1, 50, 'Calculation years must be between 1 and 50'),
  ValidationRuleFactory.range('salvageValue', 0, 100000000, 'Salvage value must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('bonusDepreciationPercentage', 0, 100, 'Bonus depreciation percentage must be between 0% and 100%'),
  ValidationRuleFactory.range('section179Deduction', 0, 100000000, 'Section 179 deduction must be between $0 and $100,000,000'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'landValue',
    (landValue, allInputs) => {
      if (!allInputs?.propertyCost) return true;
      return landValue <= allInputs.propertyCost;
    },
    'Land value cannot exceed property cost'
  ),

  ValidationRuleFactory.businessRule(
    'salvageValue',
    (salvageValue, allInputs) => {
      if (!allInputs?.propertyCost) return true;
      return salvageValue <= allInputs.propertyCost;
    },
    'Salvage value cannot exceed property cost'
  ),

  ValidationRuleFactory.businessRule(
    'section179Deduction',
    (section179Deduction, allInputs) => {
      if (!allInputs?.propertyCost) return true;
      return section179Deduction <= allInputs.propertyCost;
    },
    'Section 179 deduction cannot exceed property cost'
  ),

  ValidationRuleFactory.businessRule(
    'depreciationStartDate',
    (depreciationStartDate) => {
      const date = new Date(depreciationStartDate);
      const now = new Date();
      const minDate = new Date('1900-01-01');
      return date >= minDate && date <= now;
    },
    'Depreciation start date must be between 1900 and today'
  ),

  ValidationRuleFactory.businessRule(
    'depreciationMethod',
    (depreciationMethod) => {
      const validMethods = ['straight-line', 'declining-balance', 'section-179', 'bonus-depreciation'];
      return validMethods.includes(depreciationMethod);
    },
    'Invalid depreciation method selected'
  )
];

/**
 * Get validation rules for real estate depreciation calculator
 */
export function getRealEstateDepreciationValidationRules(): ValidationRule[] {
  return realEstateDepreciationValidationRules;
}
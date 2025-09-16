import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * GRAT validation rules
 */
export const gratValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('initialValue', 'Initial value is required'),
  ValidationRuleFactory.required('annuityRate', 'Annuity rate is required'),
  ValidationRuleFactory.required('termYears', 'Term years is required'),
  ValidationRuleFactory.required('growthRate', 'Growth rate is required'),
  ValidationRuleFactory.required('discountRate', 'Discount rate is required'),
  ValidationRuleFactory.required('gstTaxRate', 'GST tax rate is required'),
  ValidationRuleFactory.required('estateTaxRate', 'Estate tax rate is required'),
  ValidationRuleFactory.required('trustType', 'Trust type is required'),

  // Value validations
  ValidationRuleFactory.range('initialValue', 0, 100000000, 'Initial value must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('annuityRate', 0, 50, 'Annuity rate must be between 0% and 50%'),
  ValidationRuleFactory.range('termYears', 1, 20, 'Term years must be between 1 and 20'),
  ValidationRuleFactory.range('growthRate', -20, 50, 'Growth rate must be between -20% and 50%'),
  ValidationRuleFactory.range('discountRate', 0, 30, 'Discount rate must be between 0% and 30%'),
  ValidationRuleFactory.range('gstTaxRate', 0, 100, 'GST tax rate must be between 0% and 100%'),
  ValidationRuleFactory.range('estateTaxRate', 0, 100, 'Estate tax rate must be between 0% and 100%'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'annuityRate',
    (annuityRate, allInputs) => {
      if (!allInputs?.termYears) return true;
      return annuityRate > 0 && annuityRate <= 100 / allInputs.termYears;
    },
    'Annuity rate too high for term length'
  ),

  ValidationRuleFactory.businessRule(
    'termYears',
    (termYears, allInputs) => {
      if (!allInputs?.trustType) return true;
      if (allInputs.trustType === 'zeroed-out' && termYears > 3) {
        return false;
      }
      return true;
    },
    'Zeroed-out GRATs typically have shorter terms'
  ),

  ValidationRuleFactory.businessRule(
    'discountRate',
    (discountRate, allInputs) => {
      if (!allInputs?.growthRate) return true;
      return discountRate <= allInputs.growthRate + 10;
    },
    'Discount rate should not exceed growth rate by more than 10%'
  )
];

/**
 * Get validation rules for GRAT calculator
 */
export function getGRATValidationRules(): ValidationRule[] {
  return gratValidationRules;
}
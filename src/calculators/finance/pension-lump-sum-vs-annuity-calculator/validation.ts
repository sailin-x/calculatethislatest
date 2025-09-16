import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Pension Lump Sum vs. Annuity validation rules
 */
export const pensionValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('lumpSumAmount', 'Lump sum amount is required'),
  ValidationRuleFactory.required('annualAnnuityPayment', 'Annual annuity payment is required'),
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
  ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
  ValidationRuleFactory.required('annuityType', 'Annuity type is required'),
  ValidationRuleFactory.required('riskTolerance', 'Risk tolerance is required'),

  // Value validations
  ValidationRuleFactory.range('lumpSumAmount', 0, 10000000, 'Lump sum amount must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('annualAnnuityPayment', 0, 1000000, 'Annual annuity payment must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
  ValidationRuleFactory.range('lifeExpectancy', 1, 120, 'Life expectancy must be between 1 and 120'),
  ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
  ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('spouseAge', 0, 120, 'Spouse age must be between 0 and 120'),
  ValidationRuleFactory.range('spouseLifeExpectancy', 1, 120, 'Spouse life expectancy must be between 1 and 120'),

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
    'spouseLifeExpectancy',
    (spouseLifeExpectancy, allInputs) => {
      if (!allInputs?.includeSpouse || !allInputs?.spouseAge) return true;
      return spouseLifeExpectancy > allInputs.spouseAge;
    },
    'Spouse life expectancy must be greater than spouse age'
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
    'annualAnnuityPayment',
    (annualAnnuityPayment, allInputs) => {
      if (!allInputs?.lumpSumAmount) return true;
      return annualAnnuityPayment <= allInputs.lumpSumAmount * 0.1; // Annuity shouldn't exceed 10% of lump sum annually
    },
    'Annual annuity payment seems unusually high relative to lump sum'
  ),

  ValidationRuleFactory.businessRule(
    'lumpSumAmount',
    (lumpSumAmount, allInputs) => {
      if (!allInputs?.annualAnnuityPayment || !allInputs?.lifeExpectancy || !allInputs?.currentAge) return true;
      const years = allInputs.lifeExpectancy - allInputs.currentAge;
      const totalAnnuityValue = allInputs.annualAnnuityPayment * years;
      return lumpSumAmount <= totalAnnuityValue * 2; // Lump sum shouldn't exceed 2x total annuity value
    },
    'Lump sum amount seems unusually high relative to annuity payments'
  )
];

/**
 * Get validation rules for Pension Lump Sum vs. Annuity calculator
 */
export function getPensionValidationRules(): ValidationRule[] {
  return pensionValidationRules;
}
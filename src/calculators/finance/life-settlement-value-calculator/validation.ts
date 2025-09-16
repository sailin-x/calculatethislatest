import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Life Settlement validation rules
 */
export const lifeSettlementValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
  ValidationRuleFactory.required('deathBenefit', 'Death benefit is required'),
  ValidationRuleFactory.required('annualPremium', 'Annual premium is required'),
  ValidationRuleFactory.required('policyType', 'Policy type is required'),
  ValidationRuleFactory.required('healthStatus', 'Health status is required'),
  ValidationRuleFactory.required('settlementOffer', 'Settlement offer is required'),
  ValidationRuleFactory.required('discountRate', 'Discount rate is required'),
  ValidationRuleFactory.required('taxRate', 'Tax rate is required'),
  ValidationRuleFactory.required('remainingTerm', 'Remaining term is required'),

  // Value validations
  ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
  ValidationRuleFactory.range('lifeExpectancy', 1, 120, 'Life expectancy must be between 1 and 120'),
  ValidationRuleFactory.range('deathBenefit', 0, 10000000, 'Death benefit must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('annualPremium', 0, 100000, 'Annual premium must be between $0 and $100,000'),
  ValidationRuleFactory.range('settlementOffer', 0, 5000000, 'Settlement offer must be between $0 and $5,000,000'),
  ValidationRuleFactory.range('discountRate', -10, 20, 'Discount rate must be between -10% and 20%'),
  ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),
  ValidationRuleFactory.range('remainingTerm', 0, 100, 'Remaining term must be between 0 and 100'),

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
    'settlementOffer',
    (settlementOffer, allInputs) => {
      if (!allInputs?.deathBenefit) return true;
      return settlementOffer <= allInputs.deathBenefit * 1.5; // Settlement shouldn't exceed 150% of death benefit
    },
    'Settlement offer seems unusually high relative to death benefit'
  ),

  ValidationRuleFactory.businessRule(
    'remainingTerm',
    (remainingTerm, allInputs) => {
      if (!allInputs?.currentAge || !allInputs?.lifeExpectancy) return true;
      const yearsRemaining = allInputs.lifeExpectancy - allInputs.currentAge;
      return remainingTerm <= yearsRemaining;
    },
    'Remaining term cannot exceed life expectancy'
  ),

  ValidationRuleFactory.businessRule(
    'annualPremium',
    (annualPremium, allInputs) => {
      if (!allInputs?.deathBenefit) return true;
      return annualPremium <= allInputs.deathBenefit * 0.05; // Premium shouldn't exceed 5% of death benefit
    },
    'Annual premium seems unusually high relative to death benefit'
  )
];

/**
 * Get validation rules for Life Settlement calculator
 */
export function getLifeSettlementValidationRules(): ValidationRule[] {
  return lifeSettlementValidationRules;
}
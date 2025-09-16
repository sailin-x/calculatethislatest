import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Retirement Abroad validation rules
 */
export const retirementAbroadValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('retirementAge', 'Retirement age is required'),
  ValidationRuleFactory.required('currentSavings', 'Current savings is required'),
  ValidationRuleFactory.required('monthlyRetirementIncome', 'Monthly retirement income is required'),
  ValidationRuleFactory.required('targetCountry', 'Target country is required'),
  ValidationRuleFactory.required('residencyType', 'Residency type is required'),
  ValidationRuleFactory.required('housingCost', 'Housing cost is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
  ValidationRuleFactory.required('taxRate', 'Tax rate is required'),

  // Value validations
  ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
  ValidationRuleFactory.range('retirementAge', 1, 120, 'Retirement age must be between 1 and 120'),
  ValidationRuleFactory.range('currentSavings', 0, 10000000, 'Current savings must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('monthlyRetirementIncome', 0, 50000, 'Monthly retirement income must be between $0 and $50,000'),
  ValidationRuleFactory.range('healthcareCost', 0, 10000, 'Healthcare cost must be between $0 and $10,000'),
  ValidationRuleFactory.range('housingCost', 0, 10000, 'Housing cost must be between $0 and $10,000'),
  ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
  ValidationRuleFactory.range('inflationRate', -10, 20, 'Inflation rate must be between -10% and 20%'),
  ValidationRuleFactory.range('currencyExchangeRate', 0.1, 10, 'Currency exchange rate must be between 0.1 and 10'),
  ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'retirementAge',
    (retirementAge, allInputs) => {
      if (!allInputs?.currentAge) return true;
      return retirementAge > allInputs.currentAge;
    },
    'Retirement age must be greater than current age'
  ),

  ValidationRuleFactory.businessRule(
    'healthcareCost',
    (healthcareCost, allInputs) => {
      if (!allInputs?.includeHealthcare) return true;
      return healthcareCost >= 0;
    },
    'Healthcare cost must be provided when healthcare is included'
  ),

  ValidationRuleFactory.businessRule(
    'targetCountry',
    (targetCountry, allInputs) => {
      const validCountries = ['portugal', 'spain', 'mexico', 'panama', 'thailand', 'malaysia', 'costa_rica', 'ecuador', 'uruguay', 'chile'];
      return validCountries.includes(targetCountry);
    },
    'Please select a valid target country'
  ),

  ValidationRuleFactory.businessRule(
    'residencyType',
    (residencyType, allInputs) => {
      const validTypes = ['temporary', 'permanent', 'citizenship'];
      return validTypes.includes(residencyType);
    },
    'Please select a valid residency type'
  ),

  ValidationRuleFactory.businessRule(
    'costOfLivingAdjustment',
    (costOfLivingAdjustment, allInputs) => {
      return costOfLivingAdjustment >= -50 && costOfLivingAdjustment <= 200;
    },
    'Cost of living adjustment must be between -50% and 200%'
  )
];

/**
 * Get validation rules for Retirement Abroad calculator
 */
export function getRetirementAbroadValidationRules(): ValidationRule[] {
  return retirementAbroadValidationRules;
}
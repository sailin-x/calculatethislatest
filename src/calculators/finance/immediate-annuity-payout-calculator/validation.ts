import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Immediate Annuity validation rules
 */
export const immediateAnnuityValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('principalAmount', 'Principal amount is required'),
  ValidationRuleFactory.required('age', 'Age is required'),
  ValidationRuleFactory.required('gender', 'Gender is required'),
  ValidationRuleFactory.required('payoutType', 'Payout type is required'),
  ValidationRuleFactory.required('payoutFrequency', 'Payout frequency is required'),
  ValidationRuleFactory.required('annuityType', 'Annuity type is required'),
  ValidationRuleFactory.required('interestRate', 'Interest rate is required'),
  ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),

  // Value validations
  ValidationRuleFactory.range('principalAmount', 0, 10000000, 'Principal amount must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('age', 0, 120, 'Age must be between 0 and 120'),
  ValidationRuleFactory.range('lifeExpectancy', 0, 120, 'Life expectancy must be between 0 and 120'),
  ValidationRuleFactory.range('interestRate', 0, 20, 'Interest rate must be between 0% and 20%'),
  ValidationRuleFactory.range('guaranteePeriod', 0, 40, 'Guarantee period must be between 0 and 40 years'),
  ValidationRuleFactory.range('jointAge', 0, 120, 'Joint age must be between 0 and 120'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'lifeExpectancy',
    (lifeExpectancy, allInputs) => {
      if (!allInputs?.age) return true;
      return lifeExpectancy > allInputs.age;
    },
    'Life expectancy must be greater than current age'
  ),

  ValidationRuleFactory.businessRule(
    'jointAge',
    (jointAge, allInputs) => {
      if (!allInputs?.payoutType || allInputs.payoutType !== 'joint-life') return true;
      return jointAge !== undefined && jointAge >= 0 && jointAge <= 120;
    },
    'Joint age is required for joint-life payout and must be between 0 and 120'
  ),

  ValidationRuleFactory.businessRule(
    'jointGender',
    (jointGender, allInputs) => {
      if (!allInputs?.payoutType || allInputs.payoutType !== 'joint-life') return true;
      return jointGender !== undefined;
    },
    'Joint gender is required for joint-life payout'
  ),

  ValidationRuleFactory.businessRule(
    'guaranteePeriod',
    (guaranteePeriod, allInputs) => {
      if (!allInputs?.payoutType || allInputs.payoutType !== 'period-certain') return true;
      return guaranteePeriod > 0;
    },
    'Guarantee period is required for period-certain payout'
  )
];

/**
 * Get validation rules for Immediate Annuity calculator
 */
export function getImmediateAnnuityValidationRules(): ValidationRule[] {
  return immediateAnnuityValidationRules;
}
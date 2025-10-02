import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * APT value validation rules
 */
export const aptValueValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('trustAssets', 'Trust assets is required'),
  ValidationRuleFactory.required('trustDuration', 'Trust duration is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
  ValidationRuleFactory.required('numberOfBeneficiaries', 'Number of beneficiaries is required'),

  // Financial validations
  ValidationRuleFactory.range('trustAssets', 0, 100000000, 'Trust assets must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('annualContributions', 0, 10000000, 'Annual contributions must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('contributionYears', 0, 50, 'Contribution years must be between 0 and 50'),
  ValidationRuleFactory.range('trustDuration', 1, 100, 'Trust duration must be between 1 and 100 years'),
  ValidationRuleFactory.range('trusteeFees', 0, 100000, 'Trustee fees must be between $0 and $100,000'),
  ValidationRuleFactory.range('expectedReturn', -10, 30, 'Expected return must be between -10% and 30%'),
  ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),
  ValidationRuleFactory.range('numberOfBeneficiaries', 1, 50, 'Number of beneficiaries must be between 1 and 50'),
  ValidationRuleFactory.range('setupCosts', 0, 100000, 'Setup costs must be between $0 and $100,000'),
  ValidationRuleFactory.range('annualLegalFees', 0, 50000, 'Annual legal fees must be between $0 and $50,000'),
  ValidationRuleFactory.range('analysisPeriod', 1, 100, 'Analysis period must be between 1 and 100 years'),
  ValidationRuleFactory.range('discountRate', 0, 20, 'Discount rate must be between 0% and 20%'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'contributionYears',
    (contributionYears, allInputs) => {
      if (!allInputs?.trustDuration) return true;
      return contributionYears <= allInputs.trustDuration;
    },
    'Contribution years cannot exceed trust duration'
  ),

  ValidationRuleFactory.businessRule(
    'analysisPeriod',
    (analysisPeriod, allInputs) => {
      if (!allInputs?.trustDuration) return true;
      return analysisPeriod >= allInputs.trustDuration;
    },
    'Analysis period should be at least as long as trust duration'
  ),

  ValidationRuleFactory.businessRule(
    'expectedReturn',
    (expectedReturn, allInputs) => {
      if (!allInputs?.riskTolerance) return true;

      // Return should be reasonable for risk tolerance
      switch (allInputs.riskTolerance) {
        case 'low':
          return expectedReturn <= 6;
        case 'medium':
          return expectedReturn <= 10;
        case 'high':
          return expectedReturn <= 20;
        default:
          return true;
      }
    },
    'Expected return seems inconsistent with risk tolerance'
  ),

  ValidationRuleFactory.businessRule(
    'trustDuration',
    (trustDuration, allInputs) => {
      if (!allInputs?.lifeExpectancy) return true;
      return trustDuration <= allInputs.lifeExpectancy;
    },
    'Trust duration should not exceed life expectancy'
  ),

  ValidationRuleFactory.businessRule(
    'stateOfFormation',
    (stateOfFormation) => {
      const validStates = ['alaska', 'delaware', 'south dakota', 'wyoming', 'new hampshire'];
      return validStates.includes(stateOfFormation.toLowerCase());
    },
    'State should be known for strong asset protection laws'
  ),

  ValidationRuleFactory.businessRule(
    'beneficiaryAges',
    (beneficiaryAges, allInputs) => {
      if (!allInputs?.lifeExpectancy) return true;
      return beneficiaryAges.every((age: number) => age <= allInputs.lifeExpectancy);
    },
    'Beneficiary ages should not exceed life expectancy'
  )
];

/**
 * Get validation rules for APT value calculator
 */
export function getAPTValueValidationRules(): ValidationRule[] {
  return aptValueValidationRules;
}
import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * HSA Triple Tax validation rules
 */
export const hsaTripleTaxValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('annualContribution', 'Annual contribution is required'),
  ValidationRuleFactory.required('currentBalance', 'Current balance is required'),
  ValidationRuleFactory.required('age', 'Age is required'),
  ValidationRuleFactory.required('coverageType', 'Coverage type is required'),
  ValidationRuleFactory.required('contributionType', 'Contribution type is required'),
  ValidationRuleFactory.required('investmentReturn', 'Investment return is required'),
  ValidationRuleFactory.required('yearsToRetirement', 'Years to retirement is required'),
  ValidationRuleFactory.required('incomeTaxRate', 'Income tax rate is required'),
  ValidationRuleFactory.required('capitalGainsTaxRate', 'Capital gains tax rate is required'),
  ValidationRuleFactory.required('comparisonInvestmentReturn', 'Comparison investment return is required'),

  // Value validations
  ValidationRuleFactory.range('annualContribution', 0, 10000, 'Annual contribution must be between $0 and $10,000'),
  ValidationRuleFactory.range('currentBalance', 0, 10000000, 'Current balance must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('age', 0, 120, 'Age must be between 0 and 120'),
  ValidationRuleFactory.range('investmentReturn', -20, 50, 'Investment return must be between -20% and 50%'),
  ValidationRuleFactory.range('yearsToRetirement', 0, 100, 'Years to retirement must be between 0 and 100'),
  ValidationRuleFactory.range('incomeTaxRate', 0, 50, 'Income tax rate must be between 0% and 50%'),
  ValidationRuleFactory.range('capitalGainsTaxRate', 0, 50, 'Capital gains tax rate must be between 0% and 50%'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'annualContribution',
    (annualContribution, allInputs) => {
      if (!allInputs?.coverageType || !allInputs?.contributionType) return true;
      const maxLimits = {
        'self-only': { employee: 4150, 'self-employed': 4150, 'catch-up': 4950 },
        family: { employee: 8300, 'self-employed': 8300, 'catch-up': 9100 }
      };
      const limit = maxLimits[allInputs.coverageType]?.[allInputs.contributionType] || 10000;
      return annualContribution <= limit;
    },
    'Contribution exceeds IRS annual limit for selected coverage and contribution type'
  ),

  ValidationRuleFactory.businessRule(
    'capitalGainsTaxRate',
    (capitalGainsTaxRate, allInputs) => {
      if (!allInputs?.incomeTaxRate) return true;
      return capitalGainsTaxRate <= allInputs.incomeTaxRate;
    },
    'Capital gains tax rate should not exceed income tax rate'
  )
];

/**
 * Get validation rules for HSA Triple Tax calculator
 */
export function getHSATripleTaxValidationRules(): ValidationRule[] {
  return hsaTripleTaxValidationRules;
}
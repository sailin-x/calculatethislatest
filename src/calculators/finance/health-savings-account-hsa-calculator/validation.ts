import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * HSA validation rules
 */
export const hsaValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('annualContribution', 'Annual contribution is required'),
  ValidationRuleFactory.required('currentBalance', 'Current balance is required'),
  ValidationRuleFactory.required('age', 'Age is required'),
  ValidationRuleFactory.required('coverageType', 'Coverage type is required'),
  ValidationRuleFactory.required('contributionType', 'Contribution type is required'),
  ValidationRuleFactory.required('investmentReturn', 'Investment return is required'),
  ValidationRuleFactory.required('yearsUntilRetirement', 'Years until retirement is required'),
  ValidationRuleFactory.required('incomeTaxRate', 'Income tax rate is required'),

  // Value validations
  ValidationRuleFactory.range('annualContribution', 0, 10000, 'Annual contribution must be between $0 and $10,000'),
  ValidationRuleFactory.range('currentBalance', 0, 10000000, 'Current balance must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('age', 0, 120, 'Age must be between 0 and 120'),
  ValidationRuleFactory.range('investmentReturn', -20, 50, 'Investment return must be between -20% and 50%'),
  ValidationRuleFactory.range('yearsUntilRetirement', 0, 100, 'Years until retirement must be between 0 and 100'),
  ValidationRuleFactory.range('incomeTaxRate', 0, 50, 'Income tax rate must be between 0% and 50%'),

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
    'nonQualifiedWithdrawals',
    (nonQualifiedWithdrawals, allInputs) => {
      if (!allInputs?.age) return true;
      if (allInputs.age >= 65) return true; // No penalty after 65
      return nonQualifiedWithdrawals >= 0;
    },
    'Non-qualified withdrawals before age 65 are subject to penalties'
  ),

  ValidationRuleFactory.businessRule(
    'qualifiedExpenses',
    (qualifiedExpenses, allInputs) => {
      if (!allInputs?.currentBalance) return true;
      return qualifiedExpenses <= allInputs.currentBalance;
    },
    'Qualified expenses cannot exceed current HSA balance'
  )
];

/**
 * Get validation rules for HSA calculator
 */
export function getHSAValidationRules(): ValidationRule[] {
  return hsaValidationRules;
}
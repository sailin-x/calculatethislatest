import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Inheritance Tax validation rules
 */
export const inheritanceTaxValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('estateValue', 'Estate value is required'),
  ValidationRuleFactory.required('maritalStatus', 'Marital status is required'),
  ValidationRuleFactory.required('numberOfChildren', 'Number of children is required'),
  ValidationRuleFactory.required('stateOfResidence', 'State of residence is required'),

  // Value validations
  ValidationRuleFactory.range('estateValue', 0, 100000000, 'Estate value must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('numberOfChildren', 0, 20, 'Number of children must be between 0 and 20'),
  ValidationRuleFactory.range('charitableDonations', 0, 100000000, 'Charitable donations must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('funeralExpenses', 0, 100000, 'Funeral expenses must be between $0 and $100,000'),
  ValidationRuleFactory.range('medicalExpenses', 0, 1000000, 'Medical expenses must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('administrativeExpenses', 0, 500000, 'Administrative expenses must be between $0 and $500,000'),
  ValidationRuleFactory.range('debtsAndLiabilities', 0, 100000000, 'Debts and liabilities must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('retirementAccounts', 0, 100000000, 'Retirement accounts must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('realEstateValue', 0, 50000000, 'Real estate value must be between $0 and $50,000,000'),
  ValidationRuleFactory.range('businessInterests', 0, 50000000, 'Business interests must be between $0 and $50,000,000'),
  ValidationRuleFactory.range('personalProperty', 0, 10000000, 'Personal property must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('cashAndInvestments', 0, 50000000, 'Cash and investments must be between $0 and $50,000,000'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'charitableDonations',
    (charitableDonations, allInputs) => {
      if (!allInputs?.estateValue) return true;
      return charitableDonations <= allInputs.estateValue;
    },
    'Charitable donations cannot exceed estate value'
  ),

  ValidationRuleFactory.businessRule(
    'totalDeductions',
    (totalDeductions, allInputs) => {
      if (!allInputs?.estateValue) return true;
      const totalDeductionsCalc = (allInputs.charitableDonations || 0) +
                                 (allInputs.funeralExpenses || 0) +
                                 (allInputs.medicalExpenses || 0) +
                                 (allInputs.administrativeExpenses || 0) +
                                 (allInputs.debtsAndLiabilities || 0);
      return totalDeductionsCalc <= allInputs.estateValue;
    },
    'Total deductions cannot exceed estate value'
  )
];

/**
 * Get validation rules for Inheritance Tax calculator
 */
export function getInheritanceTaxValidationRules(): ValidationRule[] {
  return inheritanceTaxValidationRules;
}
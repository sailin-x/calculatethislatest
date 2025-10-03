import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Estate tax liability validation rules
 */
export const estateTaxLiabilityValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('grossEstateValue', 'Gross estate value is required'),
  ValidationRuleFactory.required('federalExemption', 'Federal exemption is required'),
  ValidationRuleFactory.required('federalTaxRate', 'Federal tax rate is required'),

  // Financial validations
  ValidationRuleFactory.range('grossEstateValue', 0, 1000000000, 'Gross estate value must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('funeralExpenses', 0, 50000, 'Funeral expenses must be between $0 and $50,000'),
  ValidationRuleFactory.range('administrationExpenses', 0, 100000, 'Administration expenses must be between $0 and $100,000'),
  ValidationRuleFactory.range('debtsAndLiabilities', 0, 100000000, 'Debts and liabilities must be between $0 and $100,000,000'),

  // Exemption validations
  ValidationRuleFactory.range('federalExemption', 0, 50000000, 'Federal exemption must be between $0 and $50,000,000'),
  ValidationRuleFactory.range('stateExemption', 0, 5000000, 'State exemption must be between $0 and $5,000,000'),
  ValidationRuleFactory.range('predeceasedSpouseExemption', 0, 50000000, 'Predeceased spouse exemption must be between $0 and $50,000,000'),

  // Tax rate validations
  ValidationRuleFactory.range('federalTaxRate', 0, 50, 'Federal tax rate must be between 0% and 50%'),
  ValidationRuleFactory.range('stateTaxRate', 0, 20, 'State tax rate must be between 0% and 20%'),

  // Deduction validations
  ValidationRuleFactory.range('maritalDeduction', 0, 1000000000, 'Marital deduction must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('charitableDeduction', 0, 1000000000, 'Charitable deduction must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('otherDeductions', 0, 100000000, 'Other deductions must be between $0 and $100,000,000'),

  // Asset validations
  ValidationRuleFactory.range('probateAssets', 0, 1000000000, 'Probate assets must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('nonProbateAssets', 0, 1000000000, 'Non-probate assets must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('lifeInsuranceProceeds', 0, 100000000, 'Life insurance proceeds must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('retirementAccounts', 0, 1000000000, 'Retirement accounts must be between $0 and $1,000,000,000'),

  // Beneficiary validations
  ValidationRuleFactory.range('numberOfChildren', 0, 20, 'Number of children must be between 0 and 20'),
  ValidationRuleFactory.range('numberOfGrandchildren', 0, 50, 'Number of grandchildren must be between 0 and 50'),

  // Planning validations
  ValidationRuleFactory.range('annualExclusionGifts', 0, 1000000, 'Annual exclusion gifts must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('lifetimeExclusionUsed', 0, 50000000, 'Lifetime exclusion used must be between $0 and $50,000,000'),
  ValidationRuleFactory.range('outOfStateValue', 0, 1000000000, 'Out of state value must be between $0 and $1,000,000,000'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'maritalDeduction',
    (maritalDeduction, allInputs) => {
      if (!allInputs?.survivingSpouse) return true;
      return maritalDeduction <= allInputs.grossEstateValue;
    },
    'Marital deduction cannot exceed gross estate value'
  ),

  ValidationRuleFactory.businessRule(
    'charitableDeduction',
    (charitableDeduction, allInputs) => {
      if (!allInputs?.grossEstateValue) return true;
      return charitableDeduction <= allInputs.grossEstateValue;
    },
    'Charitable deduction cannot exceed gross estate value'
  ),

  ValidationRuleFactory.businessRule(
    'probateAssets',
    (probateAssets, allInputs) => {
      if (!allInputs?.nonProbateAssets || !allInputs?.grossEstateValue) return true;
      const totalAssets = probateAssets + allInputs.nonProbateAssets;
      return Math.abs(totalAssets - allInputs.grossEstateValue) / allInputs.grossEstateValue <= 0.1;
    },
    'Sum of probate and non-probate assets should approximately equal gross estate value'
  ),

  ValidationRuleFactory.businessRule(
    'federalExemption',
    (federalExemption, allInputs) => {
      if (!allInputs?.grossEstateValue) return true;
      // Federal exemption should be reasonable relative to estate size
      return federalExemption <= allInputs.grossEstateValue * 2;
    },
    'Federal exemption seems unusually high relative to estate value'
  ),

  ValidationRuleFactory.businessRule(
    'annualExclusionGifts',
    (annualExclusionGifts, allInputs) => {
      if (!allInputs?.grossEstateValue) return true;
      // Annual gifts shouldn't exceed a reasonable portion of estate
      return annualExclusionGifts <= allInputs.grossEstateValue * 0.1;
    },
    'Annual exclusion gifts seem unusually high relative to estate value'
  )
];

/**
 * Get validation rules for estate tax liability calculator
 */
export function getEstateTaxLiabilityValidationRules(): ValidationRule[] {
  return estateTaxLiabilityValidationRules;
}
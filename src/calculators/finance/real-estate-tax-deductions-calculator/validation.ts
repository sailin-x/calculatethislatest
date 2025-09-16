import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Real estate tax deductions validation rules
 */
export const realEstateTaxDeductionsValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('annualIncome', 'Annual income is required'),
  ValidationRuleFactory.required('taxRate', 'Tax rate is required'),

  // Positive value validations
  ValidationRuleFactory.range('annualIncome', 0, 10000000, 'Annual income must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('mortgageInterest', 0, 1000000, 'Mortgage interest must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('propertyTaxes', 0, 100000, 'Property taxes must be between $0 and $100,000'),
  ValidationRuleFactory.range('insurance', 0, 50000, 'Insurance must be between $0 and $50,000'),
  ValidationRuleFactory.range('maintenance', 0, 100000, 'Maintenance must be between $0 and $100,000'),
  ValidationRuleFactory.range('repairs', 0, 100000, 'Repairs must be between $0 and $100,000'),
  ValidationRuleFactory.range('utilities', 0, 50000, 'Utilities must be between $0 and $50,000'),
  ValidationRuleFactory.range('hoaFees', 0, 20000, 'HOA fees must be between $0 and $20,000'),
  ValidationRuleFactory.range('depreciation', 0, 500000, 'Depreciation must be between $0 and $500,000'),
  ValidationRuleFactory.range('managementFees', 0, 50000, 'Management fees must be between $0 and $50,000'),
  ValidationRuleFactory.range('vacancyAllowance', 0, 100000, 'Vacancy allowance must be between $0 and $100,000'),
  ValidationRuleFactory.range('rentalIncome', 0, 1000000, 'Rental income must be between $0 and $1,000,000'),

  // Percentage validations
  ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),
  ValidationRuleFactory.range('personalUsePercentage', 0, 100, 'Personal use percentage must be between 0% and 100%'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'personalUsePercentage',
    (personalUsePercentage, allInputs) => {
      if (!allInputs?.propertyType) return true;
      // Personal residence should have higher personal use percentage
      if (allInputs.propertyType === 'residential' && personalUsePercentage < 50) {
        return false;
      }
      // Rental property should have lower personal use percentage
      if (allInputs.propertyType === 'rental' && personalUsePercentage > 14) {
        return false;
      }
      return true;
    },
    'Personal use percentage seems inconsistent with property type'
  ),

  ValidationRuleFactory.businessRule(
    'rentalIncome',
    (rentalIncome, allInputs) => {
      if (!allInputs?.propertyType || allInputs.propertyType !== 'rental') return true;
      return rentalIncome > 0;
    },
    'Rental income is required for rental properties'
  ),

  ValidationRuleFactory.businessRule(
    'taxRate',
    (taxRate, allInputs) => {
      if (!allInputs?.filingStatus) return true;
      // Reasonable tax rate ranges by filing status
      const taxRateRanges = {
        'single': { min: 10, max: 37 },
        'married-joint': { min: 10, max: 36 },
        'married-separate': { min: 10, max: 37 },
        'head-household': { min: 10, max: 37 }
      };
      const range = taxRateRanges[allInputs.filingStatus as keyof typeof taxRateRanges];
      if (!range) return true;
      return taxRate >= range.min && taxRate <= range.max;
    },
    'Tax rate seems outside typical range for filing status'
  ),

  ValidationRuleFactory.businessRule(
    'propertyTaxes',
    (propertyTaxes, allInputs) => {
      if (!allInputs?.annualIncome) return true;
      // Property taxes should be reasonable relative to income
      const taxToIncomeRatio = propertyTaxes / allInputs.annualIncome;
      return taxToIncomeRatio <= 0.1; // Property taxes shouldn't exceed 10% of income
    },
    'Property taxes seem unusually high relative to income'
  ),

  ValidationRuleFactory.businessRule(
    'depreciation',
    (depreciation, allInputs) => {
      if (!allInputs?.annualIncome) return true;
      // Depreciation should be reasonable relative to income
      const depreciationToIncomeRatio = depreciation / allInputs.annualIncome;
      return depreciationToIncomeRatio <= 0.5; // Depreciation shouldn't exceed 50% of income
    },
    'Depreciation amount seems unusually high relative to income'
  )
];

/**
 * Get validation rules for real estate tax deductions calculator
 */
export function getRealEstateTaxDeductionsValidationRules(): ValidationRule[] {
  return realEstateTaxDeductionsValidationRules;
}
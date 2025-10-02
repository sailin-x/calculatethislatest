import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Renters insurance validation rules
 */
export const rentersInsuranceValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('monthlyRent', 'Monthly rent is required'),
  ValidationRuleFactory.required('coverageYears', 'Coverage years is required'),
  ValidationRuleFactory.required('insurancePremium', 'Insurance premium is required'),

  // Positive value validations
  ValidationRuleFactory.range('monthlyRent', 100, 50000, 'Monthly rent must be between $100 and $50,000'),
  ValidationRuleFactory.range('personalPropertyValue', 0, 1000000, 'Personal property value must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('liabilityCoverage', 0, 1000000, 'Liability coverage must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('deductibleAmount', 0, 10000, 'Deductible amount must be between $0 and $10,000'),
  ValidationRuleFactory.range('insurancePremium', 1, 10000, 'Insurance premium must be between $1 and $10,000'),

  // Percentage validations
  ValidationRuleFactory.range('annualRentIncrease', -10, 20, 'Annual rent increase must be between -10% and 20%'),
  ValidationRuleFactory.range('inflationRate', -5, 15, 'Inflation rate must be between -5% and 15%'),
  ValidationRuleFactory.range('discountRate', 0, 20, 'Discount rate must be between 0% and 20%'),

  // Year validations
  ValidationRuleFactory.range('coverageYears', 1, 50, 'Coverage years must be between 1 and 50'),

  // ALE validations (conditional)
  ValidationRuleFactory.businessRule(
    'aleCoverageDays',
    (aleCoverageDays, allInputs) => {
      if (!allInputs?.additionalLivingExpenses) return true;
      return aleCoverageDays >= 0 && aleCoverageDays <= 365;
    },
    'ALE coverage days must be between 0 and 365 when ALE is enabled'
  ),

  ValidationRuleFactory.businessRule(
    'aleDailyRate',
    (aleDailyRate, allInputs) => {
      if (!allInputs?.additionalLivingExpenses) return true;
      return aleDailyRate >= 0 && aleDailyRate <= 500;
    },
    'ALE daily rate must be between $0 and $500 when ALE is enabled'
  ),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'liabilityCoverage',
    (liabilityCoverage) => {
      // Standard liability coverage should be reasonable
      return liabilityCoverage >= 100000 && liabilityCoverage <= 1000000;
    },
    'Liability coverage should typically be between $100,000 and $1,000,000'
  ),

  ValidationRuleFactory.businessRule(
    'personalPropertyValue',
    (personalPropertyValue, allInputs) => {
      if (!allInputs?.monthlyRent) return true;
      // Personal property should be reasonable relative to rent
      const annualRent = allInputs.monthlyRent * 12;
      const maxReasonableProperty = annualRent * 2; // Max 2 years of rent worth
      return personalPropertyValue <= maxReasonableProperty;
    },
    'Personal property value seems unreasonably high relative to rent'
  ),

  ValidationRuleFactory.businessRule(
    'insurancePremium',
    (insurancePremium, allInputs) => {
      if (!allInputs?.monthlyRent) return true;
      // Insurance premium should be reasonable relative to rent (typically 0.5% to 5% of annual rent)
      const annualRent = allInputs.monthlyRent * 12;
      const minReasonablePremium = annualRent * 0.005;
      const maxReasonablePremium = annualRent * 0.05;
      return insurancePremium >= minReasonablePremium && insurancePremium <= maxReasonablePremium;
    },
    'Insurance premium seems unreasonable relative to rent'
  ),

  ValidationRuleFactory.businessRule(
    'deductibleAmount',
    (deductibleAmount, allInputs) => {
      if (!allInputs?.insurancePremium) return true;
      // Deductible should be reasonable relative to premium (typically 1% to 20% of annual premium)
      const minReasonableDeductible = allInputs.insurancePremium * 0.01;
      const maxReasonableDeductible = allInputs.insurancePremium * 0.2;
      return deductibleAmount >= minReasonableDeductible && deductibleAmount <= maxReasonableDeductible;
    },
    'Deductible amount seems unreasonable relative to premium'
  )
];

/**
 * Get validation rules for renters insurance calculator
 */
export function getRentersInsuranceValidationRules(): ValidationRule[] {
  return rentersInsuranceValidationRules;
}
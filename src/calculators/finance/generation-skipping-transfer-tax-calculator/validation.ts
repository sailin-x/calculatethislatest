import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * GST Tax validation rules
 */
export const gstTaxValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('transferAmount', 'Transfer amount is required'),
  ValidationRuleFactory.required('gstTaxRate', 'GST tax rate is required'),
  ValidationRuleFactory.required('gstExemptionLimit', 'GST exemption limit is required'),
  ValidationRuleFactory.required('numberOfSkipGenerations', 'Number of skip generations is required'),

  // Value validations
  ValidationRuleFactory.range('transferAmount', 0, 100000000, 'Transfer amount must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('gstTaxRate', 0, 100, 'GST tax rate must be between 0% and 100%'),
  ValidationRuleFactory.range('gstExemptionUsed', 0, 20000000, 'GST exemption used must be between $0 and $20,000,000'),
  ValidationRuleFactory.range('gstExemptionLimit', 0, 20000000, 'GST exemption limit must be between $0 and $20,000,000'),
  ValidationRuleFactory.range('numberOfSkipGenerations', 1, 10, 'Number of skip generations must be between 1 and 10'),
  ValidationRuleFactory.range('stateTaxRate', 0, 20, 'State tax rate must be between 0% and 20%'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'gstExemptionUsed',
    (gstExemptionUsed, allInputs) => {
      if (!allInputs?.gstExemptionLimit) return true;
      return gstExemptionUsed <= allInputs.gstExemptionLimit;
    },
    'GST exemption used cannot exceed GST exemption limit'
  ),

  ValidationRuleFactory.businessRule(
    'transferAmount',
    (transferAmount, allInputs) => {
      if (!allInputs?.gstExemptionLimit || !allInputs?.gstExemptionUsed) return true;
      const remainingExemption = allInputs.gstExemptionLimit - allInputs.gstExemptionUsed;
      return transferAmount >= 0 || transferAmount <= remainingExemption + 100000000; // Allow large transfers
    },
    'Transfer amount validation based on GST exemption'
  ),

  ValidationRuleFactory.businessRule(
    'numberOfSkipGenerations',
    (numberOfSkipGenerations, allInputs) => {
      if (!allInputs?.isDirectSkip) return true;
      return numberOfSkipGenerations >= 1;
    },
    'Direct skip transfers require at least 1 skip generation'
  ),

  ValidationRuleFactory.businessRule(
    'planningHorizon',
    (planningHorizon) => {
      if (planningHorizon === undefined || planningHorizon === null) return true;
      return planningHorizon >= 0 && planningHorizon <= 100;
    },
    'Planning horizon must be between 0 and 100 years'
  ),

  ValidationRuleFactory.businessRule(
    'inflationRate',
    (inflationRate) => {
      if (inflationRate === undefined || inflationRate === null) return true;
      return inflationRate >= -10 && inflationRate <= 25;
    },
    'Inflation rate must be between -10% and 25%'
  ),

  ValidationRuleFactory.businessRule(
    'stateTaxRate',
    (stateTaxRate, allInputs) => {
      if (!allInputs?.includeStateTax) return true;
      return stateTaxRate >= 0 && stateTaxRate <= 20;
    },
    'State tax rate must be between 0% and 20% when state tax is included'
  )
];

/**
 * Get validation rules for GST tax calculator
 */
export function getGSTTaxValidationRules(): ValidationRule[] {
  return gstTaxValidationRules;
}
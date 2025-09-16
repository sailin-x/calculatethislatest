import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';
import { BusinessValidation } from '../../../utils/businessValidation';

/**
 * Comprehensive GST tax calculator validation rules
 */
export const gstValidationRules: ValidationRule[] = [
  // Required field validations
  ValidationRuleFactory.required('transferAmount', 'Transfer amount is required'),
  ValidationRuleFactory.required('gstTaxRate', 'GST tax rate is required'),
  ValidationRuleFactory.required('annualExclusionAmount', 'Annual exclusion amount is required'),
  ValidationRuleFactory.required('gstExemptionAmount', 'GST exemption amount is required'),
  ValidationRuleFactory.required('gstExemptionUsed', 'GST exemption used is required'),
  ValidationRuleFactory.required('numberOfSkipBeneficiaries', 'Number of skip beneficiaries is required'),
  ValidationRuleFactory.required('transferType', 'Transfer type is required'),
  ValidationRuleFactory.required('planningHorizon', 'Planning horizon is required'),
  ValidationRuleFactory.required('expectedGrowthRate', 'Expected growth rate is required'),
  ValidationRuleFactory.required('discountRate', 'Discount rate is required'),

  // Range validations
  ValidationRuleFactory.range('transferAmount', 1000, 100000000, 'Transfer amount must be between $1,000 and $100,000,000'),
  ValidationRuleFactory.range('gstTaxRate', 0, 100, 'GST tax rate must be between 0% and 100%'),
  ValidationRuleFactory.range('annualExclusionAmount', 0, 50000, 'Annual exclusion amount must be between $0 and $50,000'),
  ValidationRuleFactory.range('gstExemptionAmount', 0, 15000000, 'GST exemption amount must be between $0 and $15,000,000'),
  ValidationRuleFactory.range('gstExemptionUsed', 0, 15000000, 'GST exemption used must be between $0 and $15,000,000'),
  ValidationRuleFactory.range('numberOfSkipBeneficiaries', 1, 50, 'Number of skip beneficiaries must be between 1 and 50'),
  ValidationRuleFactory.range('planningHorizon', 0, 100, 'Planning horizon must be between 0 and 100 years'),
  ValidationRuleFactory.range('expectedGrowthRate', -10, 20, 'Expected growth rate must be between -10% and 20%'),
  ValidationRuleFactory.range('discountRate', 0, 15, 'Discount rate must be between 0% and 15%'),
  ValidationRuleFactory.range('inflationAdjustment', -5, 10, 'Inflation adjustment must be between -5% and 10%'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'gstExemptionUsed',
    (gstExemptionUsed, allInputs) => {
      if (!allInputs?.gstExemptionAmount) return true;
      return gstExemptionUsed <= allInputs.gstExemptionAmount;
    },
    'GST exemption used cannot exceed total exemption amount'
  ),

  ValidationRuleFactory.businessRule(
    'stateGstTaxRate',
    (stateGstTaxRate, allInputs) => {
      if (!allInputs?.includeStateGstTax) return true;
      if (stateGstTaxRate === undefined || stateGstTaxRate === null) return false;
      return stateGstTaxRate >= 0 && stateGstTaxRate <= 50;
    },
    'State GST tax rate must be between 0% and 50% when state tax is included'
  ),

  ValidationRuleFactory.businessRule(
    'transferAmount',
    (transferAmount, allInputs) => {
      if (!allInputs?.annualExclusionAmount || !allInputs?.numberOfSkipBeneficiaries) return true;
      const totalAnnualExclusions = allInputs.annualExclusionAmount * allInputs.numberOfSkipBeneficiaries;
      return transferAmount >= totalAnnualExclusions || transferAmount <= 1000;
    },
    'Transfer amount should typically exceed total annual exclusions for meaningful GST planning'
  ),

  ValidationRuleFactory.businessRule(
    'gstExemptionAmount',
    (gstExemptionAmount, allInputs) => {
      if (!allInputs?.gstExemptionUsed) return true;
      return gstExemptionAmount >= allInputs.gstExemptionUsed;
    },
    'GST exemption amount must be at least as large as exemption used'
  ),

  ValidationRuleFactory.businessRule(
    'planningHorizon',
    (planningHorizon, allInputs) => {
      if (!allInputs?.expectedGrowthRate) return true;
      // Long planning horizons with high growth rates may need special consideration
      if (planningHorizon > 50 && allInputs.expectedGrowthRate > 10) {
        return false; // This would create unrealistically high future values
      }
      return true;
    },
    'Planning horizon and growth rate combination may create unrealistic projections'
  ),

  ValidationRuleFactory.businessRule(
    'discountRate',
    (discountRate, allInputs) => {
      if (!allInputs?.expectedGrowthRate) return true;
      // Discount rate should typically be higher than expected growth rate for conservative planning
      return discountRate >= allInputs.expectedGrowthRate - 2;
    },
    'Discount rate should generally exceed expected growth rate for conservative planning'
  ),

  ValidationRuleFactory.businessRule(
    'transferType',
    (transferType) => {
      const validTypes = ['direct', 'trust', 'life-insurance', 'other'];
      return validTypes.includes(transferType);
    },
    'Invalid transfer type selected'
  ),

  // Warning validations (non-blocking)
  ValidationRuleFactory.businessRule(
    'gstTaxRate',
    (gstTaxRate) => {
      // Current federal GST tax rate is 40%
      if (gstTaxRate !== 40) {
        // This is a warning, not an error
        return true;
      }
      return true;
    },
    'GST tax rate differs from current federal rate of 40%'
  ),

  ValidationRuleFactory.businessRule(
    'annualExclusionAmount',
    (annualExclusionAmount) => {
      // Current annual exclusion is around $18,000 (2024)
      if (annualExclusionAmount > 20000) {
        return true; // Allow higher amounts for future adjustments
      }
      return true;
    },
    'Annual exclusion amount may need adjustment for inflation'
  )
];

/**
 * Get validation rules with contextual help messages
 */
export function getGstValidationRules(): ValidationRule[] {
  return gstValidationRules;
}

/**
 * GST-specific validation context and information
 */
export const gstValidationContext = {
  currentFederalGstRate: 40,
  currentAnnualExclusion: 18000, // 2024 amount
  gstExemptionLimit: 13800000, // 2024 amount
  recommendedPlanningHorizon: 30,
  conservativeDiscountRate: 6,
  optimisticGrowthRate: 7,
  conservativeGrowthRate: 4
};
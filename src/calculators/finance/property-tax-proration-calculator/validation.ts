import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Comprehensive property tax proration calculator validation rules
 */
export const propertyTaxValidationRules: ValidationRule[] = [
  // Required fields based on calculation type
  ValidationRuleFactory.businessRule(
    'calculationType',
    (calculationType) => {
      const validTypes = [
        'proration', 'from_assessed_value', 'appeal_savings',
        'escrow', 'assessment_change', 'tax_cap', 'comprehensive'
      ];
      return validTypes.includes(calculationType);
    },
    'Please select a valid calculation type'
  ),

  // Annual property tax validation
  ValidationRuleFactory.businessRule(
    'annualPropertyTax',
    (annualPropertyTax, allInputs) => {
      if (!annualPropertyTax) return true; // Optional for some calculation types
      const numValue = Number(annualPropertyTax);
      return !isNaN(numValue) && numValue >= 0 && numValue <= 1000000;
    },
    'Annual property tax must be between $0 and $1,000,000'
  ),

  // Sale price validation
  ValidationRuleFactory.businessRule(
    'salePrice',
    (salePrice) => {
      if (!salePrice) return true;
      const numValue = Number(salePrice);
      return !isNaN(numValue) && numValue > 0 && numValue <= 100000000;
    },
    'Sale price must be between $1 and $100,000,000'
  ),

  // Date validations
  ValidationRuleFactory.businessRule(
    'closingDate',
    (closingDate, allInputs) => {
      if (!closingDate || !allInputs?.taxYearStart || !allInputs?.taxYearEnd) return true;
      const closing = new Date(closingDate);
      const start = new Date(allInputs.taxYearStart);
      const end = new Date(allInputs.taxYearEnd);
      return closing >= start && closing <= end;
    },
    'Closing date must be within the tax year period'
  ),

  // Assessed value validation
  ValidationRuleFactory.businessRule(
    'assessedValue',
    (assessedValue) => {
      if (!assessedValue) return true;
      const numValue = Number(assessedValue);
      return !isNaN(numValue) && numValue >= 0 && numValue <= 100000000;
    },
    'Assessed value must be between $0 and $100,000,000'
  ),

  // Millage rate validation
  ValidationRuleFactory.businessRule(
    'millageRate',
    (millageRate) => {
      if (!millageRate) return true;
      const numValue = Number(millageRate);
      return !isNaN(numValue) && numValue >= 0 && numValue <= 500;
    },
    'Millage rate must be between 0 and 500 mills'
  ),

  // Appeal validation
  ValidationRuleFactory.businessRule(
    'currentAssessedValue',
    (currentAssessedValue, allInputs) => {
      if (!currentAssessedValue || !allInputs?.appealedAssessedValue) return true;
      return Number(currentAssessedValue) >= Number(allInputs.appealedAssessedValue);
    },
    'Appealed value cannot exceed current assessed value'
  ),

  // Success probability validation
  ValidationRuleFactory.businessRule(
    'successProbability',
    (successProbability) => {
      if (!successProbability) return true;
      const numValue = Number(successProbability);
      return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
    },
    'Success probability must be between 0% and 100%'
  ),

  // Escrow validation
  ValidationRuleFactory.businessRule(
    'escrowMonths',
    (escrowMonths) => {
      if (!escrowMonths) return true;
      const numValue = Number(escrowMonths);
      return !isNaN(numValue) && numValue >= 1 && numValue <= 24;
    },
    'Escrow months must be between 1 and 24'
  ),

  // Assessment change validation
  ValidationRuleFactory.businessRule(
    'previousAssessedValue',
    (previousAssessedValue, allInputs) => {
      if (!previousAssessedValue || !allInputs?.newAssessedValue) return true;
      return Number(previousAssessedValue) >= 0;
    },
    'Previous assessed value cannot be negative'
  ),

  // Tax cap validation
  ValidationRuleFactory.businessRule(
    'taxCapPercentage',
    (taxCapPercentage) => {
      if (!taxCapPercentage) return true;
      const numValue = Number(taxCapPercentage);
      return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
    },
    'Tax cap percentage must be between 0% and 100%'
  ),

  // Cross-field validations
  ValidationRuleFactory.businessRule(
    'exemptions',
    (exemptions, allInputs) => {
      if (!exemptions || !allInputs?.assessedValue) return true;
      return Number(exemptions) <= Number(allInputs.assessedValue);
    },
    'Exemptions cannot exceed assessed value'
  ),

  ValidationRuleFactory.businessRule(
    'portabilityAmount',
    (portabilityAmount, allInputs) => {
      if (!portabilityAmount || !allInputs?.newAssessedValue) return true;
      return Number(portabilityAmount) <= Number(allInputs.newAssessedValue);
    },
    'Portability amount cannot exceed new assessed value'
  )
];

/**
 * Get validation rules with contextual help messages
 */
export function getPropertyTaxValidationRules(): ValidationRule[] {
  return propertyTaxValidationRules;
}
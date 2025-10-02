import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * USDA loan validation rules
 */
export const usdaLoanValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('propertyValue', 'Property value is required'),
  ValidationRuleFactory.required('purchasePrice', 'Purchase price is required'),
  ValidationRuleFactory.required('householdIncome', 'Household income is required'),
  ValidationRuleFactory.required('householdSize', 'Household size is required'),
  ValidationRuleFactory.required('creditScore', 'Credit score is required'),
  ValidationRuleFactory.required('debtToIncomeRatio', 'Debt-to-income ratio is required'),

  // Property and financial validations
  ValidationRuleFactory.range('propertyValue', 10000, 100000000, 'Property value must be between $10,000 and $100,000,000'),
  ValidationRuleFactory.range('purchasePrice', 10000, 100000000, 'Purchase price must be between $10,000 and $100,000,000'),
  ValidationRuleFactory.range('householdIncome', 1000, 10000000, 'Household income must be between $1,000 and $10,000,000 annually'),
  ValidationRuleFactory.range('householdSize', 1, 10, 'Household size must be between 1 and 10'),
  ValidationRuleFactory.range('creditScore', 300, 850, 'Credit score must be between 300 and 850'),
  ValidationRuleFactory.range('debtToIncomeRatio', 0, 100, 'Debt-to-income ratio must be between 0% and 100%'),
  ValidationRuleFactory.range('downPayment', 0, 10000000, 'Down payment must be between $0 and $10,000,000'),

  // Interest rate and loan term validations
  ValidationRuleFactory.range('interestRate', 0, 20, 'Interest rate must be between 0% and 20%'),

  // Cost validations
  ValidationRuleFactory.range('closingCosts', 0, 100000, 'Closing costs must be between $0 and $100,000'),
  ValidationRuleFactory.range('propertyTaxes', 0, 50000, 'Annual property taxes must be between $0 and $50,000'),
  ValidationRuleFactory.range('homeownersInsurance', 0, 10000, 'Annual homeowners insurance must be between $0 and $10,000'),
  ValidationRuleFactory.range('hoaFees', 0, 10000, 'Annual HOA fees must be between $0 and $10,000'),

  // Analysis period validation
  ValidationRuleFactory.range('analysisPeriod', 1, 50, 'Analysis period must be between 1 and 50 years'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'purchasePrice',
    (purchasePrice, allInputs) => {
      if (!allInputs?.propertyValue) return true;
      // Purchase price should be reasonable relative to property value
      const ratio = purchasePrice / allInputs.propertyValue;
      return ratio >= 0.5 && ratio <= 2.0;
    },
    'Purchase price seems unreasonable relative to property value'
  ),

  ValidationRuleFactory.businessRule(
    'creditScore',
    (creditScore) => {
      // USDA minimum credit score requirement
      return creditScore >= 620;
    },
    'Credit score must be at least 620 for USDA loan eligibility'
  ),

  ValidationRuleFactory.businessRule(
    'debtToIncomeRatio',
    (debtToIncomeRatio) => {
      // USDA maximum debt-to-income ratio
      return debtToIncomeRatio <= 43;
    },
    'Debt-to-income ratio cannot exceed 43% for USDA loan eligibility'
  ),

  ValidationRuleFactory.businessRule(
    'householdIncome',
    (householdIncome, allInputs) => {
      if (!allInputs?.householdSize) return true;

      // Simplified income limit check (actual limits vary by county)
      // Using approximate 2024 limits as example
      const incomeLimits = {
        1: 110000,
        2: 125000,
        3: 140000,
        4: 155000,
        5: 170000
      };

      const limit = incomeLimits[Math.min(allInputs.householdSize, 5) as keyof typeof incomeLimits] || 170000;
      return householdIncome <= limit;
    },
    'Household income may exceed USDA income limits for your area'
  ),

  ValidationRuleFactory.businessRule(
    'loanTerm',
    (loanTerm) => {
      // USDA loans are only available for 30-year terms
      return loanTerm === 30;
    },
    'USDA loans are only available for 30-year terms'
  ),

  ValidationRuleFactory.businessRule(
    'location',
    (location) => {
      // USDA loans are for rural and suburban areas
      return location === 'rural' || location === 'suburban' || location === 'small-town';
    },
    'USDA loans require property to be in eligible rural or suburban area'
  ),

  ValidationRuleFactory.businessRule(
    'isPrimaryResidence',
    (isPrimaryResidence) => {
      // Must be primary residence
      return isPrimaryResidence === true;
    },
    'Property must be primary residence for USDA loan eligibility'
  ),

  ValidationRuleFactory.businessRule(
    'isModestHousing',
    (isModestHousing) => {
      // Must meet modest housing requirements
      return isModestHousing === true;
    },
    'Property must meet USDA modest housing requirements'
  ),

  ValidationRuleFactory.businessRule(
    'meetsIncomeLimits',
    (meetsIncomeLimits) => {
      // Must meet income limits
      return meetsIncomeLimits === true;
    },
    'Household must meet USDA income limits for the area'
  ),

  ValidationRuleFactory.businessRule(
    'meetsLocationRequirements',
    (meetsLocationRequirements) => {
      // Must meet location requirements
      return meetsLocationRequirements === true;
    },
    'Property location must meet USDA rural development requirements'
  ),

  ValidationRuleFactory.businessRule(
    'downPayment',
    (downPayment) => {
      // USDA loans typically require 0% down payment
      return downPayment >= 0;
    },
    'USDA loans typically require 0% down payment'
  ),

  ValidationRuleFactory.businessRule(
    'propertyValue',
    (propertyValue, allInputs) => {
      if (!allInputs?.purchasePrice) return true;
      // Property value should not be excessively higher than purchase price
      const ratio = propertyValue / allInputs.purchasePrice;
      return ratio <= 1.5;
    },
    'Property value seems unreasonably high compared to purchase price'
  )
];

/**
 * Get validation rules for USDA loan calculator
 */
export function getUSDALoanValidationRules(): ValidationRule[] {
  return usdaLoanValidationRules;
}
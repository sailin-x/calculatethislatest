import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Real estate development validation rules
 */
export const realEstateValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('landCost', 'Land cost is required'),
  ValidationRuleFactory.required('constructionCostPerSqFt', 'Construction cost per square foot is required'),
  ValidationRuleFactory.required('totalSqFt', 'Total square footage is required'),
  ValidationRuleFactory.required('rentalRatePerSqFt', 'Rental rate per square foot is required'),

  // Positive value validations
  ValidationRuleFactory.range('landCost', 0, 100000000, 'Land cost must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('constructionCostPerSqFt', 0, 10000, 'Construction cost per square foot must be between $0 and $10,000'),
  ValidationRuleFactory.range('totalSqFt', 100, 1000000, 'Total square footage must be between 100 and 1,000,000 sq ft'),
  ValidationRuleFactory.range('rentalRatePerSqFt', 0, 1000, 'Rental rate per square foot must be between $0 and $1,000'),

  // Percentage validations
  ValidationRuleFactory.range('softCostsPercentage', 0, 100, 'Soft costs percentage must be between 0% and 100%'),
  ValidationRuleFactory.range('contingencyPercentage', 0, 50, 'Contingency percentage must be between 0% and 50%'),
  ValidationRuleFactory.range('occupancyRate', 0, 100, 'Occupancy rate must be between 0% and 100%'),
  ValidationRuleFactory.range('equityPercentage', 0, 100, 'Equity percentage must be between 0% and 100%'),
  ValidationRuleFactory.range('interestRate', 0, 20, 'Interest rate must be between 0% and 20%'),
  ValidationRuleFactory.range('exitCapRate', 1, 20, 'Exit cap rate must be between 1% and 20%'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'annualRentIncrease',
    (annualRentIncrease) => annualRentIncrease >= -50 && annualRentIncrease <= 50,
    'Annual rent increase must be between -50% and 50%'
  ),

  ValidationRuleFactory.businessRule(
    'holdingPeriodYears',
    (holdingPeriodYears) => holdingPeriodYears >= 1 && holdingPeriodYears <= 30,
    'Holding period must be between 1 and 30 years'
  ),

  ValidationRuleFactory.businessRule(
    'loanTermYears',
    (loanTermYears) => loanTermYears >= 1 && loanTermYears <= 50,
    'Loan term must be between 1 and 50 years'
  ),

  ValidationRuleFactory.businessRule(
    'constructionPeriodMonths',
    (constructionPeriodMonths) => constructionPeriodMonths >= 1 && constructionPeriodMonths <= 36,
    'Construction period must be between 1 and 36 months'
  ),

  ValidationRuleFactory.businessRule(
    'interestOnlyPeriodMonths',
    (interestOnlyPeriodMonths) => interestOnlyPeriodMonths >= 0 && interestOnlyPeriodMonths <= 60,
    'Interest-only period must be between 0 and 60 months'
  ),

  // Cross-field validations
  ValidationRuleFactory.businessRule(
    'interestOnlyPeriodMonths',
    (interestOnlyPeriodMonths, allInputs) => {
      if (!allInputs?.constructionPeriodMonths) return true;
      return interestOnlyPeriodMonths >= allInputs.constructionPeriodMonths;
    },
    'Interest-only period cannot be shorter than construction period'
  ),

  ValidationRuleFactory.businessRule(
    'equityPercentage',
    (equityPercentage) => {
      if (equityPercentage < 10) {
        return false; // Warning for low equity
      }
      return true;
    },
    'Low equity percentage may increase financing risk'
  )
];

/**
 * Get validation rules for real estate development calculator
 */
export function getRealEstateValidationRules(): ValidationRule[] {
  return realEstateValidationRules;
}
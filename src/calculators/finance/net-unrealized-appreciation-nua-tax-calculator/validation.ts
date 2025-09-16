import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * NUA validation rules
 */
export const nuaValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('currentSharePrice', 'Current share price is required'),
  ValidationRuleFactory.required('originalPurchasePrice', 'Original purchase price is required'),
  ValidationRuleFactory.required('numberOfShares', 'Number of shares is required'),
  ValidationRuleFactory.required('yearsHeld', 'Years held is required'),
  ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
  ValidationRuleFactory.required('expectedGrowthRate', 'Expected growth rate is required'),
  ValidationRuleFactory.required('yearsToSale', 'Years to sale is required'),

  // Value validations
  ValidationRuleFactory.range('currentSharePrice', 0, 10000, 'Current share price must be between $0 and $10,000'),
  ValidationRuleFactory.range('originalPurchasePrice', 0, 10000, 'Original purchase price must be between $0 and $10,000'),
  ValidationRuleFactory.range('numberOfShares', 1, 1000000, 'Number of shares must be between 1 and 1,000,000'),
  ValidationRuleFactory.range('yearsHeld', 0, 50, 'Years held must be between 0 and 50'),
  ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('stateTaxRate', 0, 20, 'State tax rate must be between 0% and 20%'),
  ValidationRuleFactory.range('expectedGrowthRate', -20, 50, 'Expected growth rate must be between -20% and 50%'),
  ValidationRuleFactory.range('yearsToSale', 0, 30, 'Years to sale must be between 0 and 30'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'currentSharePrice',
    (currentSharePrice, allInputs) => {
      if (!allInputs?.originalPurchasePrice) return true;
      return currentSharePrice >= allInputs.originalPurchasePrice;
    },
    'Current share price should be at least equal to original purchase price for NUA benefits'
  ),

  ValidationRuleFactory.businessRule(
    'yearsHeld',
    (yearsHeld) => {
      if (yearsHeld < 5) {
        return true; // Allow but may reduce NUA benefits
      }
      return true;
    },
    'NUA benefits are optimized with longer holding periods (5+ years recommended)'
  ),

  ValidationRuleFactory.businessRule(
    'taxBracket',
    (taxBracket) => {
      if (taxBracket <= 20) {
        return true; // Allow but NUA benefits may be reduced
      }
      return true;
    },
    'NUA benefits are most advantageous in higher tax brackets'
  ),

  ValidationRuleFactory.businessRule(
    'numberOfShares',
    (numberOfShares, allInputs) => {
      if (!allInputs?.employerStock) return true;
      return numberOfShares > 0;
    },
    'Employer stock plans typically require minimum share holdings'
  )
];

/**
 * Get validation rules for NUA calculator
 */
export function getNUAValidationRules(): ValidationRule[] {
  return nuaValidationRules;
}
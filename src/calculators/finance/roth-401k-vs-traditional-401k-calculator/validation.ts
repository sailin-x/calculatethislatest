import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Roth vs Traditional 401(k) validation rules
 */
export const rothVsTraditionalValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('retirementAge', 'Retirement age is required'),
  ValidationRuleFactory.required('currentIncome', 'Current income is required'),
  ValidationRuleFactory.required('currentTaxBracket', 'Current tax bracket is required'),
  ValidationRuleFactory.required('retirementTaxBracket', 'Retirement tax bracket is required'),
  ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
  ValidationRuleFactory.required('annualContribution', 'Annual contribution is required'),
  ValidationRuleFactory.required('timeHorizon', 'Time horizon is required'),

  // Value validations
  ValidationRuleFactory.range('currentAge', 18, 120, 'Current age must be between 18 and 120'),
  ValidationRuleFactory.range('retirementAge', 50, 120, 'Retirement age must be between 50 and 120'),
  ValidationRuleFactory.range('currentIncome', 0, 10000000, 'Current income must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('expectedIncomeGrowth', -20, 50, 'Expected income growth must be between -20% and 50%'),
  ValidationRuleFactory.range('currentTaxBracket', 0, 50, 'Current tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('retirementTaxBracket', 0, 50, 'Retirement tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
  ValidationRuleFactory.range('annualContribution', 0, 23000, 'Annual contribution must be between $0 and $23,000'),
  ValidationRuleFactory.range('employerMatch', 0, 100, 'Employer match must be between 0% and 100%'),
  ValidationRuleFactory.range('employerMatchLimit', 0, 10000, 'Employer match limit must be between $0 and $10,000'),
  ValidationRuleFactory.range('timeHorizon', 1, 100, 'Time horizon must be between 1 and 100 years'),
  ValidationRuleFactory.range('inflationRate', -10, 20, 'Inflation rate must be between -10% and 20%'),
  ValidationRuleFactory.range('rothConversionAmount', 0, 1000000, 'Roth conversion amount must be between $0 and $1,000,000'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'retirementAge',
    (retirementAge, allInputs) => {
      if (!allInputs?.currentAge) return true;
      return retirementAge > allInputs.currentAge;
    },
    'Retirement age must be greater than current age'
  ),

  ValidationRuleFactory.businessRule(
    'annualContribution',
    (annualContribution, allInputs) => {
      if (!allInputs?.currentIncome) return true;
      return annualContribution <= allInputs.currentIncome * 0.5; // Reasonable contribution limit
    },
    'Annual contribution should not exceed 50% of current income'
  ),

  ValidationRuleFactory.businessRule(
    'employerMatchLimit',
    (employerMatchLimit, allInputs) => {
      if (!allInputs?.annualContribution || !allInputs?.employerMatch) return true;
      const maxMatch = allInputs.annualContribution * (allInputs.employerMatch / 100);
      return employerMatchLimit <= maxMatch;
    },
    'Employer match limit should not exceed calculated match amount'
  ),

  ValidationRuleFactory.businessRule(
    'rothConversionAmount',
    (rothConversionAmount, allInputs) => {
      if (!allInputs?.currentIncome) return true;
      return rothConversionAmount <= allInputs.currentIncome * 0.5; // Reasonable conversion limit
    },
    'Roth conversion amount should not exceed 50% of current income'
  ),

  ValidationRuleFactory.businessRule(
    'timeHorizon',
    (timeHorizon, allInputs) => {
      if (!allInputs?.currentAge || !allInputs?.retirementAge) return true;
      const calculatedHorizon = allInputs.retirementAge - allInputs.currentAge;
      return Math.abs(timeHorizon - calculatedHorizon) <= 5; // Allow some flexibility
    },
    'Time horizon should approximately match retirement age minus current age'
  ),

  ValidationRuleFactory.businessRule(
    'retirementTaxBracket',
    (retirementTaxBracket, allInputs) => {
      if (!allInputs?.currentTaxBracket) return true;
      // Retirement tax bracket should typically be lower than current bracket
      return retirementTaxBracket <= allInputs.currentTaxBracket + 10; // Allow some increase
    },
    'Retirement tax bracket seems unrealistically high compared to current bracket'
  )
];

/**
 * Get validation rules for Roth vs Traditional 401(k) calculator
 */
export function getRothVsTraditionalValidationRules(): ValidationRule[] {
  return rothVsTraditionalValidationRules;
}
import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Estate planning validation rules
 */
export const estatePlanningValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('age', 'Age is required'),
  ValidationRuleFactory.required('maritalStatus', 'Marital status is required'),
  ValidationRuleFactory.required('totalAssets', 'Total assets is required'),
  ValidationRuleFactory.required('annualIncome', 'Annual income is required'),
  ValidationRuleFactory.required('annualExpenses', 'Annual expenses is required'),
  ValidationRuleFactory.required('federalTaxBracket', 'Federal tax bracket is required'),
  ValidationRuleFactory.required('planningHorizon', 'Planning horizon is required'),

  // Personal information validation
  ValidationRuleFactory.range('age', 18, 120, 'Age must be between 18 and 120'),
  ValidationRuleFactory.range('numberOfChildren', 0, 20, 'Number of children must be between 0 and 20'),
  ValidationRuleFactory.range('numberOfGrandchildren', 0, 50, 'Number of grandchildren must be between 0 and 50'),

  // Financial validation
  ValidationRuleFactory.range('totalAssets', 0, 1000000000, 'Total assets must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('liquidAssets', 0, 1000000000, 'Liquid assets must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('realEstateValue', 0, 1000000000, 'Real estate value must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('retirementAccounts', 0, 1000000000, 'Retirement accounts must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('businessInterests', 0, 1000000000, 'Business interests must be between $0 and $1,000,000,000'),

  // Income and expense validation
  ValidationRuleFactory.range('annualIncome', 0, 100000000, 'Annual income must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('annualExpenses', 0, 100000000, 'Annual expenses must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('annualTaxes', 0, 50000000, 'Annual taxes must be between $0 and $50,000,000'),

  // Estate goals validation
  ValidationRuleFactory.range('desiredLegacy', 0, 1000000000, 'Desired legacy must be between $0 and $1,000,000,000'),
  ValidationRuleFactory.range('educationFunding', 0, 100000000, 'Education funding must be between $0 and $100,000,000'),
  ValidationRuleFactory.range('charitableGiving', 0, 1000000000, 'Charitable giving must be between $0 and $1,000,000,000'),

  // Tax information validation
  ValidationRuleFactory.range('federalTaxBracket', 0, 50, 'Federal tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('stateTaxBracket', 0, 20, 'State tax bracket must be between 0% and 20%'),
  ValidationRuleFactory.range('estateTaxExemption', 0, 50000000, 'Estate tax exemption must be between $0 and $50,000,000'),

  // Planning parameters validation
  ValidationRuleFactory.range('planningHorizon', 1, 50, 'Planning horizon must be between 1 and 50 years'),
  ValidationRuleFactory.range('expectedInflation', 0, 10, 'Expected inflation must be between 0% and 10%'),
  ValidationRuleFactory.range('expectedReturn', -10, 30, 'Expected return must be between -10% and 30%'),

  // Life expectancy validation
  ValidationRuleFactory.businessRule(
    'lifeExpectancy',
    (lifeExpectancy, allInputs) => {
      if (!allInputs?.age) return true;
      return lifeExpectancy > allInputs.age && lifeExpectancy <= 150;
    },
    'Life expectancy must be greater than age and less than or equal to 150'
  ),

  // Asset allocation validation
  ValidationRuleFactory.businessRule(
    'totalAssets',
    (totalAssets, allInputs) => {
      if (!allInputs?.liquidAssets || !allInputs?.realEstateValue ||
          !allInputs?.retirementAccounts || !allInputs?.businessInterests) return true;

      const sumOfComponents = (allInputs.liquidAssets || 0) +
                             (allInputs.realEstateValue || 0) +
                             (allInputs.retirementAccounts || 0) +
                             (allInputs.businessInterests || 0);

      return Math.abs(totalAssets - sumOfComponents) / totalAssets <= 0.1; // Allow 10% variance
    },
    'Sum of asset components should approximately equal total assets'
  ),

  // Income vs expenses validation
  ValidationRuleFactory.businessRule(
    'annualExpenses',
    (annualExpenses, allInputs) => {
      if (!allInputs?.annualIncome) return true;
      return annualExpenses <= allInputs.annualIncome * 2; // Expenses shouldn't exceed 2x income
    },
    'Annual expenses seem unusually high relative to income'
  ),

  // Legacy vs assets validation
  ValidationRuleFactory.businessRule(
    'desiredLegacy',
    (desiredLegacy, allInputs) => {
      if (!allInputs?.totalAssets) return true;
      return desiredLegacy <= allInputs.totalAssets * 2; // Legacy shouldn't exceed 2x current assets
    },
    'Desired legacy seems unusually high relative to current assets'
  ),

  // Tax bracket consistency
  ValidationRuleFactory.businessRule(
    'federalTaxBracket',
    (federalTaxBracket, allInputs) => {
      if (!allInputs?.annualIncome) return true;

      // Rough validation of tax bracket vs income
      const estimatedBracket = estimateTaxBracket(allInputs.annualIncome);
      return Math.abs(federalTaxBracket - estimatedBracket) <= 10; // Allow 10% variance
    },
    'Federal tax bracket seems inconsistent with reported income'
  )
];

/**
 * Estimate tax bracket based on income (simplified)
 */
function estimateTaxBracket(annualIncome: number): number {
  if (annualIncome <= 11000) return 10;
  if (annualIncome <= 44725) return 12;
  if (annualIncome <= 95375) return 22;
  if (annualIncome <= 182100) return 24;
  if (annualIncome <= 231250) return 32;
  if (annualIncome <= 578125) return 35;
  return 37;
}

/**
 * Get validation rules for estate planning calculator
 */
export function getEstatePlanningValidationRules(): ValidationRule[] {
  return estatePlanningValidationRules;
}

import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Flexible spending account validation rules
 */
export const flexibleSpendingAccountValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('accountType', 'Account type is required'),
  ValidationRuleFactory.required('annualContributionLimit', 'Annual contribution limit is required'),
  ValidationRuleFactory.required('marginalTaxRate', 'Marginal tax rate is required'),

  // Account type validations
  ValidationRuleFactory.businessRule(
    'accountType',
    (accountType, allInputs) => {
      const validTypes = ['health', 'dependent', 'parking', 'transit'];
      return validTypes.includes(accountType);
    },
    'Please select a valid account type'
  ),

  // Contribution validations
  ValidationRuleFactory.range('annualContributionLimit', 0, 10000, 'Annual contribution limit must be between $0 and $10,000'),
  ValidationRuleFactory.range('currentBalance', 0, 10000, 'Current balance must be between $0 and $10,000'),

  // Personal information validations
  ValidationRuleFactory.businessRule(
    'filingStatus',
    (filingStatus, allInputs) => {
      const validStatuses = ['single', 'married-joint', 'married-separate', 'head-household'];
      return validStatuses.includes(filingStatus);
    },
    'Please select a valid filing status'
  ),

  ValidationRuleFactory.range('numberOfDependents', 0, 10, 'Number of dependents must be between 0 and 10'),

  // Health FSA validations
  ValidationRuleFactory.businessRule(
    'expectedMedicalExpenses',
    (expectedMedicalExpenses, allInputs) => {
      if (allInputs?.accountType !== 'health') return true;
      return expectedMedicalExpenses >= 0;
    },
    'Expected medical expenses must be provided for health FSA'
  ),

  ValidationRuleFactory.businessRule(
    'preventiveCareExpenses',
    (preventiveCareExpenses, allInputs) => {
      if (allInputs?.accountType !== 'health') return true;
      return preventiveCareExpenses >= 0;
    },
    'Preventive care expenses must be provided for health FSA'
  ),

  // Dependent care FSA validations
  ValidationRuleFactory.businessRule(
    'childcareExpenses',
    (childcareExpenses, allInputs) => {
      if (allInputs?.accountType !== 'dependent') return true;
      return childcareExpenses >= 0;
    },
    'Childcare expenses must be provided for dependent care FSA'
  ),

  ValidationRuleFactory.businessRule(
    'childcareProvider',
    (childcareProvider, allInputs) => {
      if (allInputs?.accountType !== 'dependent') return true;
      const validProviders = ['licensed', 'unlicensed', 'relative'];
      return validProviders.includes(childcareProvider);
    },
    'Please select a valid childcare provider type'
  ),

  // Commuter benefits validations
  ValidationRuleFactory.businessRule(
    'monthlyParkingCost',
    (monthlyParkingCost, allInputs) => {
      if (allInputs?.accountType !== 'parking') return true;
      return monthlyParkingCost >= 0 && monthlyParkingCost <= 280;
    },
    'Monthly parking cost must be between $0 and $280 for parking FSA'
  ),

  ValidationRuleFactory.businessRule(
    'monthlyTransitCost',
    (monthlyTransitCost, allInputs) => {
      if (allInputs?.accountType !== 'transit') return true;
      return monthlyTransitCost >= 0 && monthlyTransitCost <= 315;
    },
    'Monthly transit cost must be between $0 and $315 for transit FSA'
  ),

  ValidationRuleFactory.range('workDaysPerMonth', 1, 31, 'Work days per month must be between 1 and 31'),
  ValidationRuleFactory.range('distanceToWork', 0, 500, 'Distance to work must be between 0 and 500 miles'),

  // Tax validations
  ValidationRuleFactory.range('marginalTaxRate', 0, 50, 'Marginal tax rate must be between 0% and 50%'),
  ValidationRuleFactory.range('stateTaxRate', 0, 20, 'State tax rate must be between 0% and 20%'),
  ValidationRuleFactory.range('employerMatch', 0, 100, 'Employer match must be between 0% and 100%'),

  // Plan year validations
  ValidationRuleFactory.range('gracePeriodDays', 0, 365, 'Grace period days must be between 0 and 365'),
  ValidationRuleFactory.range('maxCarryoverAmount', 0, 500, 'Maximum carryover amount must be between $0 and $500'),

  // Usage validations
  ValidationRuleFactory.businessRule(
    'usedToDate',
    (usedToDate, allInputs) => {
      if (!allInputs?.currentBalance) return true;
      return usedToDate <= allInputs.currentBalance;
    },
    'Used to date cannot exceed current balance'
  ),

  ValidationRuleFactory.businessRule(
    'projectedUsage',
    (projectedUsage, allInputs) => {
      if (!allInputs?.annualContributionLimit) return true;
      return projectedUsage <= allInputs.annualContributionLimit;
    },
    'Projected usage cannot exceed annual contribution limit'
  ),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'annualContributionLimit',
    (annualContributionLimit, allInputs) => {
      if (!allInputs?.accountType) return true;

      // Account type specific limits
      switch (allInputs.accountType) {
        case 'health':
          return annualContributionLimit <= 3050; // 2024 limit
        case 'dependent':
          return annualContributionLimit <= 5000; // 2024 limit
        case 'parking':
          return annualContributionLimit <= 280; // Monthly limit
        case 'transit':
          return annualContributionLimit <= 315; // Monthly limit
        default:
          return true;
      }
    },
    'Contribution limit exceeds IRS maximum for selected account type'
  ),

  ValidationRuleFactory.businessRule(
    'numberOfDependents',
    (numberOfDependents, allInputs) => {
      if (allInputs?.accountType !== 'dependent') return true;
      return numberOfDependents > 0;
    },
    'Number of dependents must be greater than 0 for dependent care FSA'
  ),

  ValidationRuleFactory.businessRule(
    'hasSpouse',
    (hasSpouse, allInputs) => {
      if (allInputs?.accountType !== 'dependent') return true;
      // Additional validation for dependent care
      return true;
    },
    'Spouse information is required for dependent care FSA'
  )
];

/**
 * Get validation rules for flexible spending account calculator
 */
export function getFlexibleSpendingAccountValidationRules(): ValidationRule[] {
  return flexibleSpendingAccountValidationRules;
}
import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Reverse mortgage validation rules
 */
export const reverseMortgageValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('homeValue', 'Home value is required'),
  ValidationRuleFactory.required('borrowerAge', 'Borrower age is required'),
  ValidationRuleFactory.required('youngestBorrowerAge', 'Youngest borrower age is required'),
  ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
  ValidationRuleFactory.required('paymentPlan', 'Payment plan is required'),

  // Age validations
  ValidationRuleFactory.range('borrowerAge', 62, 120, 'Borrower must be at least 62 years old'),
  ValidationRuleFactory.range('youngestBorrowerAge', 62, 120, 'Youngest borrower must be at least 62 years old'),

  // Financial validations
  ValidationRuleFactory.range('homeValue', 75000, 10000000, 'Home value must be between $75,000 and $10,000,000'),
  ValidationRuleFactory.range('interestRate', 0, 15, 'Interest rate must be between 0% and 15%'),
  ValidationRuleFactory.range('expectedAppreciation', -10, 20, 'Expected appreciation must be between -10% and 20%'),

  // Fee validations
  ValidationRuleFactory.range('counselingFee', 0, 1000, 'Counseling fee must be between $0 and $1,000'),
  ValidationRuleFactory.range('originationFee', 0, 10000, 'Origination fee must be between $0 and $10,000'),
  ValidationRuleFactory.range('servicingFeeSetAside', 0, 5000, 'Servicing fee set-aside must be between $0 and $5,000'),
  ValidationRuleFactory.range('mortgageInsurancePremium', 0, 5000, 'Mortgage insurance premium must be between $0 and $5,000'),

  // Annual cost validations
  ValidationRuleFactory.range('propertyTaxes', 0, 50000, 'Annual property taxes must be between $0 and $50,000'),
  ValidationRuleFactory.range('homeownersInsurance', 0, 10000, 'Annual homeowners insurance must be between $0 and $10,000'),
  ValidationRuleFactory.range('hoaFees', 0, 10000, 'Monthly HOA fees must be between $0 and $10,000'),
  ValidationRuleFactory.range('maintenanceCost', 0, 25000, 'Annual maintenance cost must be between $0 and $25,000'),

  // Other validations
  ValidationRuleFactory.range('repairSetAside', 0, 50000, 'Repair set-aside must be between $0 and $50,000'),
  ValidationRuleFactory.range('lifeExpectancy', 1, 50, 'Life expectancy must be between 1 and 50 years'),
  ValidationRuleFactory.range('monthlyIncome', 0, 50000, 'Monthly income must be between $0 and $50,000'),
  ValidationRuleFactory.range('monthlyExpenses', 0, 50000, 'Monthly expenses must be between $0 and $50,000'),
  ValidationRuleFactory.range('existingMortgageBalance', 0, 10000000, 'Existing mortgage balance must be between $0 and $10,000,000'),

  // Payment plan specific validations
  ValidationRuleFactory.businessRule(
    'termYears',
    (termYears, allInputs) => {
      if (!allInputs?.paymentPlan || allInputs.paymentPlan !== 'term') return true;
      return termYears >= 1 && termYears <= 30;
    },
    'Term years must be between 1 and 30 for term payment plan'
  ),

  // FHA eligibility validations
  ValidationRuleFactory.businessRule(
    'homeValue',
    (homeValue, allInputs) => {
      if (!allInputs?.existingMortgageBalance) return true;
      // Home must have sufficient equity (at least 50% equity required)
      const equity = homeValue - (allInputs.existingMortgageBalance || 0);
      const equityPercentage = equity / homeValue;
      return equityPercentage >= 0.5;
    },
    'Home must have at least 50% equity for FHA reverse mortgage'
  ),

  // Age consistency validation
  ValidationRuleFactory.businessRule(
    'youngestBorrowerAge',
    (youngestBorrowerAge, allInputs) => {
      if (!allInputs?.borrowerAge) return true;
      return youngestBorrowerAge <= allInputs.borrowerAge;
    },
    'Youngest borrower age cannot be greater than borrower age'
  ),

  // Life expectancy validation
  ValidationRuleFactory.businessRule(
    'lifeExpectancy',
    (lifeExpectancy, allInputs) => {
      if (!allInputs?.borrowerAge) return true;
      // Life expectancy should be reasonable relative to current age
      const maxReasonableLifeExpectancy = 120 - allInputs.borrowerAge;
      return lifeExpectancy <= maxReasonableLifeExpectancy;
    },
    'Life expectancy seems unreasonably long relative to current age'
  ),

  // Financial stability validation
  ValidationRuleFactory.businessRule(
    'monthlyIncome',
    (monthlyIncome, allInputs) => {
      if (!allInputs?.monthlyExpenses) return true;
      // Should have some positive cash flow (allowing for reverse mortgage income)
      return monthlyIncome >= allInputs.monthlyExpenses * 0.5;
    },
    'Monthly income should be at least 50% of monthly expenses'
  ),

  // Home value reasonableness validation
  ValidationRuleFactory.businessRule(
    'homeValue',
    (homeValue, allInputs) => {
      if (!allInputs?.propertyTaxes) return true;
      // Property taxes should be reasonable relative to home value (0.5% to 3%)
      const taxRate = allInputs.propertyTaxes / homeValue;
      return taxRate >= 0.005 && taxRate <= 0.03;
    },
    'Property tax rate seems unreasonable relative to home value'
  ),

  ValidationRuleFactory.businessRule(
    'homeValue',
    (homeValue, allInputs) => {
      if (!allInputs?.homeownersInsurance) return true;
      // Insurance should be reasonable relative to home value (0.1% to 0.5%)
      const insuranceRate = allInputs.homeownersInsurance / homeValue;
      return insuranceRate >= 0.001 && insuranceRate <= 0.005;
    },
    'Homeowners insurance seems unreasonable relative to home value'
  ),

  ValidationRuleFactory.businessRule(
    'homeValue',
    (homeValue, allInputs) => {
      if (!allInputs?.maintenanceCost) return true;
      // Maintenance should be reasonable relative to home value (0.5% to 2%)
      const maintenanceRate = allInputs.maintenanceCost / homeValue;
      return maintenanceRate >= 0.005 && maintenanceRate <= 0.02;
    },
    'Maintenance cost seems unreasonable relative to home value'
  )
];

/**
 * Get validation rules for reverse mortgage calculator
 */
export function getReverseMortgageValidationRules(): ValidationRule[] {
  return reverseMortgageValidationRules;
}
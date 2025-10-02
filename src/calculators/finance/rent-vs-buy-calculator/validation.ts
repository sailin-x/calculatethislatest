import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Rent vs. buy validation rules
 */
export const rentVsBuyValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('monthlyRent', 'Monthly rent is required'),
  ValidationRuleFactory.required('homePrice', 'Home price is required'),
  ValidationRuleFactory.required('analysisPeriod', 'Analysis period is required'),

  // Positive value validations
  ValidationRuleFactory.range('monthlyRent', 100, 50000, 'Monthly rent must be between $100 and $50,000'),
  ValidationRuleFactory.range('homePrice', 10000, 10000000, 'Home price must be between $10,000 and $10,000,000'),
  ValidationRuleFactory.range('downPayment', 0, 10000000, 'Down payment must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('propertyTaxes', 0, 50000, 'Annual property taxes must be between $0 and $50,000'),
  ValidationRuleFactory.range('homeownersInsurance', 0, 10000, 'Annual homeowners insurance must be between $0 and $10,000'),
  ValidationRuleFactory.range('hoaFees', 0, 10000, 'Monthly HOA fees must be between $0 and $10,000'),
  ValidationRuleFactory.range('maintenanceCost', 0, 25000, 'Annual maintenance cost must be between $0 and $25,000'),
  ValidationRuleFactory.range('closingCosts', 0, 500000, 'Closing costs must be between $0 and $500,000'),
  ValidationRuleFactory.range('rentersInsurance', 0, 5000, 'Annual renters insurance must be between $0 and $5,000'),
  ValidationRuleFactory.range('securityDeposit', 0, 100000, 'Security deposit must be between $0 and $100,000'),

  // Percentage validations
  ValidationRuleFactory.range('annualRentIncrease', -10, 20, 'Annual rent increase must be between -10% and 20%'),
  ValidationRuleFactory.range('interestRate', 0, 20, 'Interest rate must be between 0% and 20%'),
  ValidationRuleFactory.range('expectedAppreciation', -10, 20, 'Expected appreciation must be between -10% and 20%'),
  ValidationRuleFactory.range('investmentReturn', 0, 20, 'Investment return must be between 0% and 20%'),
  ValidationRuleFactory.range('marginalTaxRate', 0, 50, 'Marginal tax rate must be between 0% and 50%'),

  // Year validations
  ValidationRuleFactory.range('loanTerm', 0, 50, 'Loan term must be between 0 and 50 years'),
  ValidationRuleFactory.range('analysisPeriod', 1, 50, 'Analysis period must be between 1 and 50 years'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'downPayment',
    (downPayment, allInputs) => {
      if (!allInputs?.homePrice) return true;
      return downPayment <= allInputs.homePrice;
    },
    'Down payment cannot exceed home price'
  ),

  ValidationRuleFactory.businessRule(
    'downPayment',
    (downPayment, allInputs) => {
      if (!allInputs?.homePrice) return true;
      const minDownPayment = allInputs.homePrice * 0.03; // Minimum 3% down payment
      return downPayment >= minDownPayment;
    },
    'Down payment should be at least 3% of home price for conventional loans'
  ),

  ValidationRuleFactory.businessRule(
    'monthlyRent',
    (monthlyRent, allInputs) => {
      if (!allInputs?.homePrice) return true;
      // Rent should be reasonable relative to home price (0.3% to 1.5% of home price per month)
      const minRent = allInputs.homePrice * 0.003;
      const maxRent = allInputs.homePrice * 0.015;
      return monthlyRent >= minRent && monthlyRent <= maxRent;
    },
    'Monthly rent seems unreasonable relative to home price'
  ),

  ValidationRuleFactory.businessRule(
    'propertyTaxes',
    (propertyTaxes, allInputs) => {
      if (!allInputs?.homePrice || !propertyTaxes) return true;
      // Property taxes should be reasonable (0.5% to 3% of home price annually)
      const taxRate = propertyTaxes / allInputs.homePrice;
      return taxRate >= 0.005 && taxRate <= 0.03;
    },
    'Annual property tax rate seems unreasonable'
  ),

  ValidationRuleFactory.businessRule(
    'homeownersInsurance',
    (homeownersInsurance, allInputs) => {
      if (!allInputs?.homePrice || !homeownersInsurance) return true;
      // Insurance should be reasonable (0.1% to 0.5% of home price annually)
      const insuranceRate = homeownersInsurance / allInputs.homePrice;
      return insuranceRate >= 0.001 && insuranceRate <= 0.005;
    },
    'Annual homeowners insurance seems unreasonable'
  ),

  ValidationRuleFactory.businessRule(
    'maintenanceCost',
    (maintenanceCost, allInputs) => {
      if (!allInputs?.homePrice || !maintenanceCost) return true;
      // Maintenance should be reasonable (0.5% to 2% of home price annually)
      const maintenanceRate = maintenanceCost / allInputs.homePrice;
      return maintenanceRate >= 0.005 && maintenanceRate <= 0.02;
    },
    'Annual maintenance cost seems unreasonable'
  ),

  ValidationRuleFactory.businessRule(
    'closingCosts',
    (closingCosts, allInputs) => {
      if (!allInputs?.homePrice || !closingCosts) return true;
      // Closing costs should be reasonable (1% to 5% of home price)
      const closingRate = closingCosts / allInputs.homePrice;
      return closingRate >= 0.01 && closingRate <= 0.05;
    },
    'Closing costs seem unreasonable relative to home price'
  ),

  ValidationRuleFactory.businessRule(
    'securityDeposit',
    (securityDeposit, allInputs) => {
      if (!allInputs?.monthlyRent || !securityDeposit) return true;
      // Security deposit should be reasonable (0.5 to 2 months rent)
      const minDeposit = allInputs.monthlyRent * 0.5;
      const maxDeposit = allInputs.monthlyRent * 2;
      return securityDeposit >= minDeposit && securityDeposit <= maxDeposit;
    },
    'Security deposit seems unreasonable relative to monthly rent'
  ),

  ValidationRuleFactory.businessRule(
    'rentersInsurance',
    (rentersInsurance, allInputs) => {
      if (!allInputs?.monthlyRent || !rentersInsurance) return true;
      // Renters insurance should be reasonable (0.5% to 2% of annual rent)
      const annualRent = allInputs.monthlyRent * 12;
      const insuranceRate = rentersInsurance / annualRent;
      return insuranceRate >= 0.005 && insuranceRate <= 0.02;
    },
    'Annual renters insurance seems unreasonable relative to rent'
  )
];

/**
 * Get validation rules for rent vs. buy calculator
 */
export function getRentVsBuyValidationRules(): ValidationRule[] {
  return rentVsBuyValidationRules;
}
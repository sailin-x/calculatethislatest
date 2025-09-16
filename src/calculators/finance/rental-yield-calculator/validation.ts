import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Rental yield validation rules
 */
export const rentalYieldValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('propertyPrice', 'Property price is required'),
  ValidationRuleFactory.required('monthlyRent', 'Monthly rent is required'),
  ValidationRuleFactory.required('financingType', 'Financing type is required'),

  // Positive value validations
  ValidationRuleFactory.range('propertyPrice', 10000, 10000000, 'Property price must be between $10,000 and $10,000,000'),
  ValidationRuleFactory.range('monthlyRent', 100, 50000, 'Monthly rent must be between $100 and $50,000'),

  // Percentage validations
  ValidationRuleFactory.range('vacancyRate', 0, 50, 'Vacancy rate must be between 0% and 50%'),
  ValidationRuleFactory.range('downPaymentPercentage', 0, 95, 'Down payment percentage must be between 0% and 95%'),
  ValidationRuleFactory.range('interestRate', 0, 20, 'Interest rate must be between 0% and 20%'),

  // Non-negative validations
  ValidationRuleFactory.nonNegative('annualOperatingExpenses', 'Annual operating expenses cannot be negative'),
  ValidationRuleFactory.nonNegative('annualPropertyTaxes', 'Annual property taxes cannot be negative'),
  ValidationRuleFactory.nonNegative('annualInsurance', 'Annual insurance cannot be negative'),
  ValidationRuleFactory.nonNegative('annualMaintenance', 'Annual maintenance cannot be negative'),
  ValidationRuleFactory.nonNegative('annualManagementFees', 'Annual management fees cannot be negative'),
  ValidationRuleFactory.nonNegative('otherAnnualCosts', 'Other annual costs cannot be negative'),

  // Year validations
  ValidationRuleFactory.range('loanTerm', 0, 50, 'Loan term must be between 0 and 50 years'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'monthlyRent',
    (monthlyRent, allInputs) => {
      if (!allInputs?.propertyPrice) return true;
      // Rent should be reasonable relative to property value (0.2% to 1.5% of property value per month)
      const minRent = allInputs.propertyPrice * 0.002;
      const maxRent = allInputs.propertyPrice * 0.015;
      return monthlyRent >= minRent && monthlyRent <= maxRent;
    },
    'Monthly rent seems unreasonable relative to property price'
  ),

  ValidationRuleFactory.businessRule(
    'annualPropertyTaxes',
    (annualPropertyTaxes, allInputs) => {
      if (!allInputs?.propertyPrice || !annualPropertyTaxes) return true;
      // Property taxes should be reasonable (0.5% to 3% of property value annually)
      const taxRate = annualPropertyTaxes / allInputs.propertyPrice;
      return taxRate >= 0.005 && taxRate <= 0.03;
    },
    'Annual property tax rate seems unreasonable'
  ),

  ValidationRuleFactory.businessRule(
    'annualInsurance',
    (annualInsurance, allInputs) => {
      if (!allInputs?.propertyPrice || !annualInsurance) return true;
      // Insurance should be reasonable (0.1% to 0.5% of property value annually)
      const insuranceRate = annualInsurance / allInputs.propertyPrice;
      return insuranceRate >= 0.001 && insuranceRate <= 0.005;
    },
    'Annual insurance cost seems unreasonable'
  ),

  ValidationRuleFactory.businessRule(
    'annualMaintenance',
    (annualMaintenance, allInputs) => {
      if (!allInputs?.propertyPrice || !annualMaintenance) return true;
      // Maintenance should be reasonable (0.5% to 2% of property value annually)
      const maintenanceRate = annualMaintenance / allInputs.propertyPrice;
      return maintenanceRate >= 0.005 && maintenanceRate <= 0.02;
    },
    'Annual maintenance cost seems unreasonable'
  ),

  ValidationRuleFactory.businessRule(
    'annualManagementFees',
    (annualManagementFees, allInputs) => {
      if (!allInputs?.monthlyRent || !annualManagementFees) return true;
      // Management fees should be reasonable (5% to 15% of annual rent)
      const annualRent = allInputs.monthlyRent * 12;
      const managementRate = annualManagementFees / annualRent;
      return managementRate >= 0.05 && managementRate <= 0.15;
    },
    'Annual management fees seem unreasonable relative to rent'
  ),

  ValidationRuleFactory.businessRule(
    'downPaymentPercentage',
    (downPaymentPercentage, allInputs) => {
      if (allInputs?.financingType !== 'financed') return true;
      return downPaymentPercentage >= 3; // Minimum 3% down payment for financed properties
    },
    'Down payment must be at least 3% for financed properties'
  ),

  ValidationRuleFactory.businessRule(
    'interestRate',
    (interestRate, allInputs) => {
      if (allInputs?.financingType !== 'financed') return true;
      return interestRate > 0; // Interest rate must be positive for financed properties
    },
    'Interest rate must be greater than 0% for financed properties'
  ),

  ValidationRuleFactory.businessRule(
    'loanTerm',
    (loanTerm, allInputs) => {
      if (allInputs?.financingType !== 'financed') return true;
      return loanTerm > 0; // Loan term must be positive for financed properties
    },
    'Loan term must be greater than 0 for financed properties'
  )
];

/**
 * Get validation rules for rental yield calculator
 */
export function getRentalYieldValidationRules(): ValidationRule[] {
  return rentalYieldValidationRules;
}
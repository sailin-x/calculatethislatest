import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Rental property ROI validation rules
 */
export const rentalPropertyROIValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('propertyPrice', 'Property price is required'),
  ValidationRuleFactory.required('downPayment', 'Down payment is required'),
  ValidationRuleFactory.required('monthlyRent', 'Monthly rent is required'),
  ValidationRuleFactory.required('holdingPeriod', 'Holding period is required'),

  // Positive value validations
  ValidationRuleFactory.range('propertyPrice', 10000, 10000000, 'Property price must be between $10,000 and $10,000,000'),
  ValidationRuleFactory.range('downPayment', 0, 10000000, 'Down payment must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('loanAmount', 0, 10000000, 'Loan amount must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('monthlyRent', 100, 50000, 'Monthly rent must be between $100 and $50,000'),
  ValidationRuleFactory.range('maintenanceCost', 0, 10000, 'Maintenance cost must be between $0 and $10,000'),
  ValidationRuleFactory.range('propertyTaxes', 0, 20000, 'Property taxes must be between $0 and $20,000'),
  ValidationRuleFactory.range('insurance', 0, 5000, 'Insurance must be between $0 and $5,000'),
  ValidationRuleFactory.range('hoaFees', 0, 2000, 'HOA fees must be between $0 and $2,000'),
  ValidationRuleFactory.range('otherExpenses', 0, 10000, 'Other expenses must be between $0 and $10,000'),

  // Percentage validations
  ValidationRuleFactory.range('interestRate', 0, 20, 'Interest rate must be between 0% and 20%'),
  ValidationRuleFactory.range('vacancyRate', 0, 50, 'Vacancy rate must be between 0% and 50%'),
  ValidationRuleFactory.range('propertyManagementFee', 0, 50, 'Property management fee must be between 0% and 50%'),
  ValidationRuleFactory.range('appreciationRate', -10, 20, 'Appreciation rate must be between -10% and 20%'),
  ValidationRuleFactory.range('sellingCosts', 0, 20, 'Selling costs must be between 0% and 20%'),

  // Year validations
  ValidationRuleFactory.range('loanTerm', 0, 50, 'Loan term must be between 0 and 50 years'),
  ValidationRuleFactory.range('holdingPeriod', 1, 50, 'Holding period must be between 1 and 50 years'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'downPayment',
    (downPayment, allInputs) => {
      if (!allInputs?.propertyPrice) return true;
      return downPayment <= allInputs.propertyPrice;
    },
    'Down payment cannot exceed property price'
  ),

  ValidationRuleFactory.businessRule(
    'loanAmount',
    (loanAmount, allInputs) => {
      if (!allInputs?.propertyPrice || !allInputs?.downPayment) return true;
      return loanAmount <= allInputs.propertyPrice - allInputs.downPayment;
    },
    'Loan amount cannot exceed property price minus down payment'
  ),

  ValidationRuleFactory.businessRule(
    'monthlyRent',
    (monthlyRent, allInputs) => {
      if (!allInputs?.propertyPrice) return true;
      // Rent should be reasonable relative to property value (0.3% to 1% of property value per month)
      const minRent = allInputs.propertyPrice * 0.003;
      const maxRent = allInputs.propertyPrice * 0.01;
      return monthlyRent >= minRent && monthlyRent <= maxRent;
    },
    'Monthly rent seems unreasonable relative to property price'
  ),

  ValidationRuleFactory.businessRule(
    'propertyTaxes',
    (propertyTaxes, allInputs) => {
      if (!allInputs?.propertyPrice) return true;
      // Property taxes should be reasonable (0.5% to 3% of property value annually)
      const annualTaxRate = (propertyTaxes * 12) / allInputs.propertyPrice;
      return annualTaxRate >= 0.005 && annualTaxRate <= 0.03;
    },
    'Annual property tax rate seems unreasonable'
  ),

  ValidationRuleFactory.businessRule(
    'insurance',
    (insurance, allInputs) => {
      if (!allInputs?.propertyPrice) return true;
      // Insurance should be reasonable (0.1% to 0.5% of property value annually)
      const annualInsuranceRate = (insurance * 12) / allInputs.propertyPrice;
      return annualInsuranceRate >= 0.001 && annualInsuranceRate <= 0.005;
    },
    'Annual insurance cost seems unreasonable'
  ),

  ValidationRuleFactory.businessRule(
    'maintenanceCost',
    (maintenanceCost, allInputs) => {
      if (!allInputs?.propertyPrice) return true;
      // Maintenance should be reasonable (0.5% to 2% of property value annually)
      const annualMaintenanceRate = (maintenanceCost * 12) / allInputs.propertyPrice;
      return annualMaintenanceRate >= 0.005 && annualMaintenanceRate <= 0.02;
    },
    'Annual maintenance cost seems unreasonable'
  )
];

/**
 * Get validation rules for rental property ROI calculator
 */
export function getRentalPropertyROIValidationRules(): ValidationRule[] {
  return rentalPropertyROIValidationRules;
}
import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Self-storage facility ROI validation rules
 */
export const selfStorageFacilityROIValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('totalUnits', 'Total units is required'),
  ValidationRuleFactory.required('averageUnitSize', 'Average unit size is required'),
  ValidationRuleFactory.required('totalSquareFootage', 'Total square footage is required'),
  ValidationRuleFactory.required('occupancyRate', 'Occupancy rate is required'),
  ValidationRuleFactory.required('averageMonthlyRent', 'Average monthly rent is required'),
  ValidationRuleFactory.required('analysisPeriod', 'Analysis period is required'),

  // Positive value validations
  ValidationRuleFactory.range('totalUnits', 1, 10000, 'Total units must be between 1 and 10,000'),
  ValidationRuleFactory.range('averageUnitSize', 1, 10000, 'Average unit size must be between 1 and 10,000 sq ft'),
  ValidationRuleFactory.range('totalSquareFootage', 100, 1000000, 'Total square footage must be between 100 and 1,000,000 sq ft'),
  ValidationRuleFactory.range('occupancyRate', 0, 100, 'Occupancy rate must be between 0% and 100%'),
  ValidationRuleFactory.range('averageMonthlyRent', 1, 10000, 'Average monthly rent must be between $1 and $10,000'),
  ValidationRuleFactory.range('annualRentIncrease', -10, 20, 'Annual rent increase must be between -10% and 20%'),
  ValidationRuleFactory.range('otherIncome', 0, 1000000, 'Other income must be between $0 and $1,000,000'),

  // Financial validations
  ValidationRuleFactory.range('acquisitionCost', 0, 10000000, 'Acquisition cost must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('landCost', 0, 5000000, 'Land cost must be between $0 and $5,000,000'),
  ValidationRuleFactory.range('constructionCost', 0, 10000000, 'Construction cost must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('softCosts', 0, 2000000, 'Soft costs must be between $0 and $2,000,000'),
  ValidationRuleFactory.range('financingAmount', 0, 10000000, 'Financing amount must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('interestRate', 0, 20, 'Interest rate must be between 0% and 20%'),
  ValidationRuleFactory.range('loanTerm', 0, 50, 'Loan term must be between 0 and 50 years'),

  // Operating expense validations
  ValidationRuleFactory.range('propertyTaxes', 0, 500000, 'Property taxes must be between $0 and $500,000'),
  ValidationRuleFactory.range('insurance', 0, 100000, 'Insurance must be between $0 and $100,000'),
  ValidationRuleFactory.range('maintenance', 0, 200000, 'Maintenance must be between $0 and $200,000'),
  ValidationRuleFactory.range('utilities', 0, 100000, 'Utilities must be between $0 and $100,000'),
  ValidationRuleFactory.range('managementFees', 0, 200000, 'Management fees must be between $0 and $200,000'),
  ValidationRuleFactory.range('marketing', 0, 50000, 'Marketing must be between $0 and $50,000'),
  ValidationRuleFactory.range('supplies', 0, 25000, 'Supplies must be between $0 and $25,000'),
  ValidationRuleFactory.range('security', 0, 50000, 'Security must be between $0 and $50,000'),

  // Analysis parameter validations
  ValidationRuleFactory.range('analysisPeriod', 1, 50, 'Analysis period must be between 1 and 50 years'),
  ValidationRuleFactory.range('exitCapRate', 0, 20, 'Exit cap rate must be between 0% and 20%'),
  ValidationRuleFactory.range('discountRate', 0, 20, 'Discount rate must be between 0% and 20%'),
  ValidationRuleFactory.range('terminalValue', 0, 10000000, 'Terminal value must be between $0 and $10,000,000'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'totalSquareFootage',
    (totalSquareFootage, allInputs) => {
      if (!allInputs?.totalUnits || !allInputs?.averageUnitSize) return true;
      const expectedSquareFootage = allInputs.totalUnits * allInputs.averageUnitSize;
      const tolerance = expectedSquareFootage * 0.1; // 10% tolerance
      return Math.abs(totalSquareFootage - expectedSquareFootage) <= tolerance;
    },
    'Total square footage should approximately equal total units × average unit size'
  ),

  ValidationRuleFactory.businessRule(
    'financingAmount',
    (financingAmount, allInputs) => {
      if (!allInputs?.acquisitionCost || !allInputs?.landCost || !allInputs?.constructionCost || !allInputs?.softCosts) return true;
      const totalCost = allInputs.acquisitionCost + allInputs.landCost + allInputs.constructionCost + allInputs.softCosts;
      return financingAmount <= totalCost;
    },
    'Financing amount cannot exceed total project cost'
  ),

  ValidationRuleFactory.businessRule(
    'occupancyRate',
    (occupancyRate) => {
      if (occupancyRate < 50) {
        // This is a warning, not an error - we'll handle it in the UI
        return true;
      }
      return true;
    },
    'Low occupancy rate may indicate investment risk'
  ),

  ValidationRuleFactory.businessRule(
    'averageMonthlyRent',
    (averageMonthlyRent, allInputs) => {
      if (!allInputs?.averageUnitSize) return true;
      // Rent per square foot should be reasonable ($0.50 to $5.00 per sq ft per month)
      const rentPerSqFt = averageMonthlyRent / allInputs.averageUnitSize;
      return rentPerSqFt >= 0.5 && rentPerSqFt <= 5.0;
    },
    'Rent per square foot seems unreasonable'
  ),

  ValidationRuleFactory.businessRule(
    'propertyTaxes',
    (propertyTaxes, allInputs) => {
      if (!allInputs?.totalSquareFootage || !propertyTaxes) return true;
      // Property tax per square foot should be reasonable ($0.50 to $5.00 per sq ft per year)
      const taxPerSqFt = propertyTaxes / allInputs.totalSquareFootage;
      return taxPerSqFt >= 0.5 && taxPerSqFt <= 5.0;
    },
    'Property tax per square foot seems unreasonable'
  ),

  ValidationRuleFactory.businessRule(
    'maintenance',
    (maintenance, allInputs) => {
      if (!allInputs?.totalSquareFootage || !maintenance) return true;
      // Maintenance per square foot should be reasonable ($0.50 to $3.00 per sq ft per year)
      const maintenancePerSqFt = maintenance / allInputs.totalSquareFootage;
      return maintenancePerSqFt >= 0.5 && maintenancePerSqFt <= 3.0;
    },
    'Maintenance cost per square foot seems unreasonable'
  ),

  ValidationRuleFactory.businessRule(
    'insurance',
    (insurance, allInputs) => {
      if (!allInputs?.totalSquareFootage || !insurance) return true;
      // Insurance per square foot should be reasonable ($0.20 to $1.50 per sq ft per year)
      const insurancePerSqFt = insurance / allInputs.totalSquareFootage;
      return insurancePerSqFt >= 0.2 && insurancePerSqFt <= 1.5;
    },
    'Insurance cost per square foot seems unreasonable'
  )
];

/**
 * Get validation rules for self-storage facility ROI calculator
 */
export function getSelfStorageFacilityROIValidationRules(): ValidationRule[] {
  return selfStorageFacilityROIValidationRules;
}
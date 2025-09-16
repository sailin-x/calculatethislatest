import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Tenant improvement allowance validation rules
 */
export const tenantImprovementAllowanceValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('leaseTermYears', 'Lease term is required'),
  ValidationRuleFactory.required('annualRent', 'Annual rent is required'),
  ValidationRuleFactory.required('tenantImprovementAllowance', 'TI allowance is required'),
  ValidationRuleFactory.required('landlordContributionPercentage', 'Landlord contribution percentage is required'),
  ValidationRuleFactory.required('totalConstructionCost', 'Total construction cost is required'),

  // Lease term validation
  ValidationRuleFactory.range('leaseTermYears', 1, 50, 'Lease term must be between 1 and 50 years'),

  // Financial validations
  ValidationRuleFactory.range('annualRent', 0, 10000000, 'Annual rent must be between $0 and $10,000,000'),
  ValidationRuleFactory.range('tenantImprovementAllowance', 0, 5000000, 'TI allowance must be between $0 and $5,000,000'),
  ValidationRuleFactory.range('landlordContributionPercentage', 0, 100, 'Landlord contribution percentage must be between 0% and 100%'),
  ValidationRuleFactory.range('totalConstructionCost', 0, 10000000, 'Total construction cost must be between $0 and $10,000,000'),

  // Construction and timing validations
  ValidationRuleFactory.range('constructionPeriodMonths', 0, 60, 'Construction period must be between 0 and 60 months'),
  ValidationRuleFactory.range('holdingPeriodYears', 0, 50, 'Holding period must be between 0 and 50 years'),

  // Rate validations
  ValidationRuleFactory.range('financingRate', 0, 30, 'Financing rate must be between 0% and 30%'),
  ValidationRuleFactory.range('discountRate', 0, 20, 'Discount rate must be between 0% and 20%'),
  ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),
  ValidationRuleFactory.range('expectedAppreciation', -10, 20, 'Expected appreciation must be between -10% and 20%'),

  // Depreciation validation
  ValidationRuleFactory.range('depreciationYears', 1, 50, 'Depreciation years must be between 1 and 50'),

  // Business rule validations
  ValidationRuleFactory.businessRule(
    'tenantImprovementAllowance',
    (tenantImprovementAllowance, allInputs) => {
      if (!allInputs?.totalConstructionCost) return true;
      // TI allowance should not exceed total construction cost
      return tenantImprovementAllowance <= allInputs.totalConstructionCost;
    },
    'TI allowance should not exceed total construction cost'
  ),

  ValidationRuleFactory.businessRule(
    'landlordContributionPercentage',
    (landlordContributionPercentage, allInputs) => {
      if (!allInputs?.tenantImprovementAllowance || !allInputs?.annualRent) return true;
      const landlordContribution = allInputs.tenantImprovementAllowance * (landlordContributionPercentage / 100);
      // Landlord contribution should be reasonable relative to annual rent
      return landlordContribution <= allInputs.annualRent * 2; // Max 2 years of rent
    },
    'Landlord contribution seems unreasonably high relative to annual rent'
  ),

  ValidationRuleFactory.businessRule(
    'constructionPeriodMonths',
    (constructionPeriodMonths, allInputs) => {
      if (!allInputs?.leaseTermYears) return true;
      const leaseMonths = allInputs.leaseTermYears * 12;
      // Construction should not exceed 20% of lease term
      return constructionPeriodMonths <= leaseMonths * 0.2;
    },
    'Construction period seems long relative to lease term'
  ),

  ValidationRuleFactory.businessRule(
    'financingRate',
    (financingRate, allInputs) => {
      if (!allInputs?.includeFinancing) return true;
      // Financing rate should be reasonable for commercial loans
      return financingRate >= 3 && financingRate <= 12;
    },
    'Financing rate seems outside typical commercial loan range (3%-12%)'
  ),

  ValidationRuleFactory.businessRule(
    'discountRate',
    (discountRate, allInputs) => {
      if (!allInputs?.financingRate) return true;
      // Discount rate should typically be higher than financing rate
      return discountRate >= allInputs.financingRate * 0.5;
    },
    'Discount rate should typically be at least half the financing rate'
  ),

  ValidationRuleFactory.businessRule(
    'depreciationYears',
    (depreciationYears, allInputs) => {
      if (!allInputs?.leaseTermYears) return true;
      // Depreciation period should not exceed lease term
      return depreciationYears <= allInputs.leaseTermYears;
    },
    'Depreciation period should not exceed lease term'
  ),

  ValidationRuleFactory.businessRule(
    'holdingPeriodYears',
    (holdingPeriodYears, allInputs) => {
      if (!allInputs?.leaseTermYears) return true;
      // Holding period should be at least as long as lease term
      return holdingPeriodYears >= allInputs.leaseTermYears;
    },
    'Holding period should be at least as long as lease term'
  ),

  ValidationRuleFactory.businessRule(
    'expectedAppreciation',
    (expectedAppreciation, allInputs) => {
      // Appreciation should be reasonable for commercial real estate
      return expectedAppreciation >= -5 && expectedAppreciation <= 10;
    },
    'Expected appreciation seems outside reasonable range for commercial real estate (-5% to 10%)'
  )
];

/**
 * Get validation rules for tenant improvement allowance calculator
 */
export function getTenantImprovementAllowanceValidationRules(): ValidationRule[] {
  return tenantImprovementAllowanceValidationRules;
}
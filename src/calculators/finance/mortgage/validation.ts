import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';
import { BusinessValidation } from '../../../utils/businessValidation';

/**
 * Comprehensive mortgage calculator validation rules
 */
export const mortgageValidationRules: ValidationRule[] = [
  // Basic required fields
  ValidationRuleFactory.required('homePrice', 'Home price is required'),
  ValidationRuleFactory.required('downPayment', 'Down payment is required'),
  ValidationRuleFactory.required('loanTerm', 'Loan term is required'),
  ValidationRuleFactory.required('interestRate', 'Interest rate is required'),
  ValidationRuleFactory.required('loanType', 'Loan type is required'),

  // Home price validation
  ValidationRuleFactory.range('homePrice', 50000, 50000000, 'Home price must be between $50,000 and $50,000,000'),

  // Down payment validation
  ValidationRuleFactory.range('downPayment', 0, 10000000, 'Down payment cannot exceed $10,000,000'),
  ValidationRuleFactory.businessRule(
    'downPayment',
    (downPayment, allInputs) => {
      if (!allInputs?.homePrice) return true;
      return downPayment <= allInputs.homePrice;
    },
    'Down payment cannot exceed home price'
  ),

  // Loan term validation
  ValidationRuleFactory.range('loanTerm', 1, 50, 'Loan term must be between 1 and 50 years'),

  // Interest rate validation
  ValidationRuleFactory.range('interestRate', 0.1, 30, 'Interest rate must be between 0.1% and 30%'),

  // Property tax validation
  ValidationRuleFactory.nonNegative('propertyTax', 'Property tax cannot be negative'),
  ValidationRuleFactory.range('propertyTax', 0, 500000, 'Property tax seems unreasonably high'),

  // Home insurance validation
  ValidationRuleFactory.nonNegative('homeInsurance', 'Home insurance cannot be negative'),
  ValidationRuleFactory.range('homeInsurance', 0, 100000, 'Home insurance seems unreasonably high'),

  // PMI rate validation (if provided)
  ValidationRuleFactory.businessRule(
    'pmiRate',
    (pmiRate) => {
      if (pmiRate === undefined || pmiRate === null || pmiRate === '') return true;
      return pmiRate >= 0 && pmiRate <= 5;
    },
    'PMI rate must be between 0% and 5%'
  ),

  // HOA fees validation
  ValidationRuleFactory.businessRule(
    'hoaFees',
    (hoaFees) => {
      if (hoaFees === undefined || hoaFees === null || hoaFees === '') return true;
      return hoaFees >= 0 && hoaFees <= 5000;
    },
    'HOA fees must be between $0 and $5,000 per month'
  ),

  // Extra payment validation
  ValidationRuleFactory.businessRule(
    'extraPayment',
    (extraPayment) => {
      if (extraPayment === undefined || extraPayment === null || extraPayment === '') return true;
      return extraPayment >= 0 && extraPayment <= 50000;
    },
    'Extra payment must be between $0 and $50,000 per month'
  ),

  // LoanToValue ratio validation by loan type
  ValidationRuleFactory.businessRule(
    'downPayment',
    (downPayment, allInputs) => {
      if (!allInputs?.homePrice || !allInputs?.loanType) return true;
      
      const loanAmount = allInputs.homePrice - downPayment;
      const ltv = loanAmount / allInputs.homePrice;
      
      switch (allInputs.loanType) {
        case 'conventional':
          return ltv <= 0.97; // 97% max LTV for conventional
        case 'fha':
          return ltv <= 0.965; // 96.5% max LTV for FHA
        case 'va':
          return ltv <= 1.0; // 100% financing allowed for VA
        case 'usda':
          return ltv <= 1.0; // 100% financing allowed for USDA
        case 'jumbo':
          return ltv <= 0.80; // 80% max LTV for jumbo (typically)
        default:
          return ltv <= 0.95;
      }
    },
    'Down payment is insufficient for selected loan type'
  ),

  // Down payment minimums by loan type
  ValidationRuleFactory.businessRule(
    'downPayment',
    (downPayment, allInputs) => {
      if (!allInputs?.homePrice || !allInputs?.loanType) return true;
      
      const downPaymentPercent = downPayment / allInputs.homePrice;
      
      switch (allInputs.loanType) {
        case 'conventional':
          return downPaymentPercent >= 0.03; // 3% minimum for conventional
        case 'fha':
          return downPaymentPercent >= 0.035; // 3.5% minimum for FHA
        case 'va':
          return true; // No minimum for VA
        case 'usda':
          return true; // No minimum for USDA
        case 'jumbo':
          return downPaymentPercent >= 0.10; // 10% minimum for jumbo
        default:
          return downPaymentPercent >= 0.03;
      }
    },
    'Down payment does not meet minimum requirement for selected loan type'
  ),

  // Jumbo loan limits (2024 conforming loan limits)
  ValidationRuleFactory.businessRule(
    'homePrice',
    (homePrice, allInputs) => {
      if (!allInputs?.loanType || allInputs.loanType !== 'jumbo') return true;
      if (!allInputs?.downPayment) return true;
      
      const loanAmount = homePrice - allInputs.downPayment;
      const jumboLimit = 766550; // 2024 conforming loan limit for most areas
      
      return loanAmount > jumboLimit;
    },
    'Loan amount must exceed conforming loan limits for jumbo loans'
  ),

  // Reasonable interest rate warnings by loan type
  ValidationRuleFactory.businessRule(
    'interestRate',
    (interestRate, allInputs) => {
      if (!allInputs?.loanType) return true;

      // Current market rate ranges (2024)
      const rateRanges = {
        conventional: { min: 6.0, max: 8.5 },
        fha: { min: 5.5, max: 8.0 },
        va: { min: 5.5, max: 8.0 },
        usda: { min: 5.5, max: 8.0 },
        jumbo: { min: 6.5, max: 9.0 }
      };

      const range = rateRanges[allInputs.loanType as keyof typeof rateRanges];
      if (!range) return true;

      // This is a warning, not an error
      if (interestRate < range.min || interestRate > range.max) {
        // We'll handle this as a warning in the UI
        return true;
      }

      return true;
    },
    'Interest rate may be outside typical range for selected loan type'
  ),

  // Property tax reasonableness check
  ValidationRuleFactory.businessRule(
    'propertyTax',
    (propertyTax, allInputs) => {
      if (!allInputs?.homePrice || !propertyTax) return true;
      
      const taxRate = propertyTax / allInputs.homePrice;
      
      // Property tax rates typically range from 0.2% to 3% annually
      if (taxRate > 0.05) { // 5% is extremely high
        return false;
      }
      
      return true;
    },
    'Property tax rate seems unusually high (>5% of home value)'
  ),

  // Home insurance reasonableness check
  ValidationRuleFactory.businessRule(
    'homeInsurance',
    (homeInsurance, allInputs) => {
      if (!allInputs?.homePrice || !homeInsurance) return true;
      
      const insuranceRate = homeInsurance / allInputs.homePrice;
      
      // Home insurance typically ranges from 0.1% to 1% of home value annually
      if (insuranceRate > 0.02) { // 2% is very high
        return false;
      }
      
      return true;
    },
    'Home insurance cost seems unusually high (>2% of home value)'
  )
];

/**
 * Get validation rules with contextual help messages
 */
export function getMortgageValidationRules(): ValidationRule[] {
  return mortgageValidationRules;
}

/**
 * Loan type specific information for validation context
 */
export const loanTypeInfo = {
  conventional: {
    minDownPayment: 3,
    maxLTV: 97,
    pmiRequired: true,
    description: 'Standard mortgage not backed by government'
  },
  fha: {
    minDownPayment: 3.5,
    maxLTV: 96.5,
    pmiRequired: true,
    description: 'Government-backed loan with lower down payment requirements'
  },
  va: {
    minDownPayment: 0,
    maxLTV: 100,
    pmiRequired: false,
    description: 'Veterans Affairs loan for eligible service members'
  },
  usda: {
    minDownPayment: 0,
    maxLTV: 100,
    pmiRequired: true,
    description: 'Rural development loan for eligible rural and suburban areas'
  },
  jumbo: {
    minDownPayment: 10,
    maxLTV: 80,
    pmiRequired: false,
    description: 'High-balance loan exceeding conforming loan limits'
  }
};
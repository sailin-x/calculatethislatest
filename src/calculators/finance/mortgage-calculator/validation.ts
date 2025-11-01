import { ValidationRule } from '../../../types/calculator';
import { MortgageInputs } from './types';

export function getMortgageValidationRules(): ValidationRule[] {
  return [
    // Personal Information Validation
    {
      field: 'annualSalary',
      type: 'required',
      message: 'Annual salary is required',
      validator: (value: any) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'annualSalary',
      type: 'range',
      message: 'Annual salary must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },

    // Loan Details Validation
    {
      field: 'loanAmount',
      type: 'required',
      message: 'Loan amount is required',
      validator: (value: any) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'loanAmount',
      type: 'range',
      message: 'Loan amount must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      field: 'interestRate',
      type: 'required',
      message: 'Interest rate is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'interestRate',
      type: 'range',
      message: 'Interest rate must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      field: 'loanTermYears',
      type: 'required',
      message: 'Loan term is required',
      validator: (value: any) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'loanTermYears',
      type: 'range',
      message: 'Loan term must be between 1 and 50 years',
      validator: (value: any) => value >= 1 && value <= 50
    },
    {
      field: 'loanTermMonths',
      type: 'range',
      message: 'Additional loan months must be between 0 and 11',
      validator: (value: any) => !value || (value >= 0 && value <= 11)
    },

    // Property Information Validation
    {
      field: 'propertyValue',
      type: 'required',
      message: 'Property value is required',
      validator: (value: any) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'propertyValue',
      type: 'range',
      message: 'Property value must be between $10,000 and $50,000,000',
      validator: (value: any) => value >= 10000 && value <= 50000000
    },
    {
      field: 'downPayment',
      type: 'range',
      message: 'Down payment cannot be negative',
      validator: (value: any) => !value || value >= 0
    },
    {
      field: 'downPayment',
      type: 'business',
      message: 'Down payment cannot exceed property value',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.propertyValue) return true;
        return value <= allInputs.propertyValue;
      }
    },
    {
      field: 'downPaymentPercent',
      type: 'range',
      message: 'Down payment percentage must be between 0% and 100%',
      validator: (value: any) => !value || (value >= 0 && value <= 100)
    },

    // Additional Costs Validation
    {
      field: 'closingCosts',
      type: 'range',
      message: 'Closing costs cannot be negative',
      validator: (value: any) => !value || value >= 0
    },
    {
      field: 'closingCosts',
      type: 'range',
      message: 'Closing costs cannot exceed $100,000',
      validator: (value: any) => !value || value <= 100000
    },
    {
      field: 'propertyTaxes',
      type: 'range',
      message: 'Property taxes cannot be negative',
      validator: (value: any) => !value || value >= 0
    },
    {
      field: 'homeownersInsurance',
      type: 'range',
      message: 'Homeowners insurance cannot be negative',
      validator: (value: any) => !value || value >= 0
    },
    {
      field: 'pmiRate',
      type: 'range',
      message: 'PMI rate must be between 0% and 5%',
      validator: (value: any) => !value || (value >= 0 && value <= 5)
    },

    // Payment Schedule Validation
    {
      field: 'paymentFrequency',
      type: 'required',
      message: 'Payment frequency is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'paymentFrequency',
      type: 'business',
      message: 'Invalid payment frequency',
      validator: (value: any) => ['monthly', 'biweekly', 'weekly'].includes(value)
    },

    // Extra Payments Validation
    {
      field: 'extraPayment',
      type: 'range',
      message: 'Extra payment cannot be negative',
      validator: (value: any) => !value || value >= 0
    },
    {
      field: 'extraPaymentFrequency',
      type: 'business',
      message: 'Invalid extra payment frequency',
      validator: (value: any) => !value || ['monthly', 'yearly', 'one_time'].includes(value)
    },

    // Loan Type Validation
    {
      field: 'loanType',
      type: 'required',
      message: 'Loan type is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'loanType',
      type: 'business',
      message: 'Invalid loan type',
      validator: (value: any) => ['fixed', 'adjustable', 'interest_only', 'balloon'].includes(value)
    },

    // Adjustable Rate Details Validation
    {
      field: 'adjustmentPeriod',
      type: 'business',
      message: 'Adjustment period is required for adjustable rate mortgages',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (allInputs?.loanType !== 'adjustable') return true;
        return value !== undefined && value !== null && value > 0;
      }
    },
    {
      field: 'adjustmentCaps',
      type: 'business',
      message: 'Adjustment caps are required for adjustable rate mortgages',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (allInputs?.loanType !== 'adjustable') return true;
        return value !== undefined && value !== null;
      }
    },

    // Tax Considerations Validation
    {
      field: 'taxRate',
      type: 'required',
      message: 'Tax rate is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'taxRate',
      type: 'range',
      message: 'Tax rate must be between 0% and 50%',
      validator: (value: any) => value >= 0 && value <= 50
    },
    {
      field: 'deductibleInterest',
      type: 'business',
      message: 'Deductible interest must be true or false',
      validator: (value: any) => typeof value === 'boolean'
    },

    // Advanced Options Validation
    {
      field: 'inflationRate',
      type: 'range',
      message: 'Inflation rate must be between 0% and 10%',
      validator: (value: any) => !value || (value >= 0 && value <= 10)
    },
    {
      field: 'propertyAppreciation',
      type: 'range',
      message: 'Property appreciation must be between -10% and 20%',
      validator: (value: any) => !value || (value >= -10 && value <= 20)
    },
    {
      field: 'discountPoints',
      type: 'range',
      message: 'Discount points must be between 0 and 5',
      validator: (value: any) => !value || (value >= 0 && value <= 5)
    },
    {
      field: 'originationFees',
      type: 'range',
      message: 'Origination fees cannot be negative',
      validator: (value: any) => !value || value >= 0
    },

    // Business Logic Validations
    {
      field: 'loanAmount',
      type: 'business',
      message: 'Loan amount cannot exceed property value minus down payment',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.propertyValue || !allInputs?.downPayment) return true;
        return value <= allInputs.propertyValue - allInputs.downPayment;
      }
    },
    {
      field: 'loanAmount',
      type: 'business',
      message: 'LoanToValue ratio cannot exceed 97%',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.propertyValue) return true;
        const ltvRatio = (value / allInputs.propertyValue) * 100;
        return ltvRatio <= 97;
      }
    },
    {
      field: 'pmiRate',
      type: 'business',
      message: 'PMI is typically required for LTV ratios above 80%',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.loanAmount || !allInputs?.propertyValue) return true;
        const ltvRatio = (allInputs.loanAmount / allInputs.propertyValue) * 100;
        if (ltvRatio > 80 && (!value || value === 0)) {
          return false; // Warning for missing PMI when needed
        }
        return true;
      }
    },
    {
      field: 'extraPayment',
      type: 'business',
      message: 'Extra payments should not exceed 50% of monthly payment',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!value || !allInputs) return true;
        // This would require calculating monthly payment - simplified check
        return value <= (allInputs.loanAmount * 0.005); // Rough estimate
      }
    },
    {
      field: 'downPayment',
      type: 'business',
      message: 'Larger down payment reduces monthly payments and may eliminate PMI',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.propertyValue) return true;
        const downPaymentPercent = (value / allInputs.propertyValue) * 100;
        return downPaymentPercent >= 3; // Minimum recommended down payment
      }
    },
    {
      field: 'interestRate',
      type: 'business',
      message: 'Consider shopping multiple lenders for the best rate',
      validator: (value: any) => {
        // This is informational - always return true for business logic
        return true;
      }
    },
    {
      field: 'loanTermYears',
      type: 'business',
      message: 'Longer terms reduce monthly payments but increase total interest',
      validator: (value: any) => {
        // This is informational - always return true for business logic
        return true;
      }
    }
  ];
}

/**
 * Comprehensive validation function for all mortgage inputs
 */
export function validateAllMortgageInputs(inputs: MortgageInputs): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const rules = getMortgageValidationRules();

  // Apply all validation rules
  rules.forEach(rule => {
    const value = inputs[rule.field as keyof MortgageInputs];
    if (!rule.validator(value, inputs)) {
      errors[rule.field] = rule.message;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
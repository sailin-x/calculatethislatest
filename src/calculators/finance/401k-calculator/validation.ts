import { ValidationRule } from '../../types/calculator';
import { FourZeroOneKInputs } from './types';

export function getFourZeroOneKValidationRules(): ValidationRule[] {
  return [
    // Age Validation
    {
      field: 'currentAge',
      type: 'required',
      message: 'Current age is required',
      validator: (value: any) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'currentAge',
      type: 'range',
      message: 'Current age must be between 18 and 100 years',
      validator: (value: any) => value >= 18 && value <= 100
    },
    {
      field: 'retirementAge',
      type: 'required',
      message: 'Retirement age is required',
      validator: (value: any) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'retirementAge',
      type: 'range',
      message: 'Retirement age must be between 55 and 100 years',
      validator: (value: any) => value >= 55 && value <= 100
    },
    {
      field: 'retirementAge',
      type: 'business',
      message: 'Retirement age must be greater than current age',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.currentAge) return true;
        return value > allInputs.currentAge;
      }
    },

    // Financial Validation
    {
      field: 'currentBalance',
      type: 'range',
      message: 'Current balance cannot be negative',
      validator: (value: any) => !value || value >= 0
    },
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

    // Contribution Validation
    {
      field: 'employeeContributionPercent',
      type: 'required',
      message: 'Employee contribution percentage is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'employeeContributionPercent',
      type: 'range',
      message: 'Employee contribution must be between 0% and 100%',
      validator: (value: any) => value >= 0 && value <= 100
    },
    {
      field: 'employerMatchPercent',
      type: 'range',
      message: 'Employer match percentage must be between 0% and 100%',
      validator: (value: any) => !value || (value >= 0 && value <= 100)
    },
    {
      field: 'employerMatchLimit',
      type: 'range',
      message: 'Employer match limit must be between 0% and 100%',
      validator: (value: any) => !value || (value >= 0 && value <= 100)
    },

    // Investment Validation
    {
      field: 'expectedAnnualReturn',
      type: 'required',
      message: 'Expected annual return is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'expectedAnnualReturn',
      type: 'range',
      message: 'Expected annual return must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      field: 'inflationRate',
      type: 'required',
      message: 'Inflation rate is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'inflationRate',
      type: 'range',
      message: 'Inflation rate must be between 0% and 10%',
      validator: (value: any) => value >= 0 && value <= 10
    },

    // Tax Validation
    {
      field: 'currentTaxRate',
      type: 'required',
      message: 'Current tax rate is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'currentTaxRate',
      type: 'range',
      message: 'Current tax rate must be between 0% and 50%',
      validator: (value: any) => value >= 0 && value <= 50
    },
    {
      field: 'retirementTaxRate',
      type: 'required',
      message: 'Retirement tax rate is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'retirementTaxRate',
      type: 'range',
      message: 'Retirement tax rate must be between 0% and 50%',
      validator: (value: any) => value >= 0 && value <= 50
    },

    // Advanced Options Validation
    {
      field: 'contributionIncreaseRate',
      type: 'range',
      message: 'Contribution increase rate must be between -5% and 10%',
      validator: (value: any) => !value || (value >= -5 && value <= 10)
    },
    {
      field: 'salaryIncreaseRate',
      type: 'range',
      message: 'Salary increase rate must be between 0% and 10%',
      validator: (value: any) => !value || (value >= 0 && value <= 10)
    },
    {
      field: 'fees',
      type: 'range',
      message: 'Fees must be between 0% and 5%',
      validator: (value: any) => !value || (value >= 0 && value <= 5)
    },

    // Business Logic Validations
    {
      field: 'employeeContributionPercent',
      type: 'business',
      message: 'Consider increasing contributions to maximize employer match',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.employerMatchPercent || !allInputs?.employerMatchLimit) return true;
        const maxMatch = Math.min(value, allInputs.employerMatchLimit);
        return value >= maxMatch;
      }
    },
    {
      field: 'catchUpContributions',
      type: 'business',
      message: 'Consider catch-up contributions if age 50 or older',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.currentAge) return true;
        if (allInputs.currentAge >= 50 && !value) {
          return false; // Warning for not using catch-up contributions
        }
        return true;
      }
    },
    {
      field: 'expectedAnnualReturn',
      type: 'business',
      message: 'Historical stock market returns average 7-10% annually',
      validator: (value: any) => {
        return value >= 3 && value <= 12; // Reasonable range for long-term expectations
      }
    },
    {
      field: 'yearsToRetirement',
      type: 'business',
      message: 'Longer time horizons allow for more aggressive investment strategies',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.currentAge || !allInputs?.retirementAge) return true;
        const years = allInputs.retirementAge - allInputs.currentAge;
        return years > 0;
      }
    },
    {
      field: 'currentTaxRate',
      type: 'business',
      message: 'Tax-deferred growth can significantly impact retirement savings',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.retirementTaxRate) return true;
        // This is informational - tax rates can change
        return true;
      }
    }
  ];
}

/**
 * Comprehensive validation function for all 401(k) inputs
 */
export function validateAllFourZeroOneKInputs(inputs: FourZeroOneKInputs): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const rules = getFourZeroOneKValidationRules();

  // Apply all validation rules
  rules.forEach(rule => {
    const value = inputs[rule.field as keyof FourZeroOneKInputs];
    if (!rule.validator(value, inputs)) {
      errors[rule.field] = rule.message;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
import { ValidationRule } from '../../../types/calculator';
import { RetirementInputs } from './types';

export function getRetirementValidationRules(): ValidationRule[] {
  return [
    // Age Validations
    {
      field: 'currentAge',
      type: 'required',
      message: 'Current age is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 18 && value <= 80
    },
    {
      field: 'retirementAge',
      type: 'required',
      message: 'Retirement age is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 50 && value <= 80
    },
    {
      field: 'lifeExpectancy',
      type: 'required',
      message: 'Life expectancy is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 70 && value <= 100
    },
    {
      field: 'retirementAge',
      type: 'business',
      message: 'Retirement age must be greater than current age',
      validator: (value: any, allInputs?: Record<string, any>) => {
        return !allInputs?.currentAge || value > allInputs.currentAge;
      }
    },
    {
      field: 'lifeExpectancy',
      type: 'business',
      message: 'Life expectancy must be greater than retirement age',
      validator: (value: any, allInputs?: Record<string, any>) => {
        return !allInputs?.retirementAge || value > allInputs.retirementAge;
      }
    },

    // Financial Validations
    {
      field: 'currentSavings',
      type: 'required',
      message: 'Current savings is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 0
    },
    {
      field: 'monthlySavings',
      type: 'required',
      message: 'Monthly savings is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 0
    },
    {
      field: 'annualIncome',
      type: 'required',
      message: 'Annual income is required',
      validator: (value: any) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'annualExpenses',
      type: 'required',
      message: 'Annual expenses is required',
      validator: (value: any) => value !== undefined && value !== null && value > 0
    },

    // Rate Validations
    {
      field: 'expectedAnnualReturn',
      type: 'required',
      message: 'Expected annual return is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'expectedAnnualReturn',
      type: 'range',
      message: 'Expected annual return must be between -10% and 50%',
      validator: (value: any) => value >= -10 && value <= 50
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
      message: 'Inflation rate must be between -5% and 20%',
      validator: (value: any) => value >= -5 && value <= 20
    },
    {
      field: 'salaryGrowthRate',
      type: 'range',
      message: 'Salary growth rate must be between -5% and 15%',
      validator: (value: any) => !value || (value >= -5 && value <= 15)
    },

    // Risk Parameters
    {
      field: 'riskTolerance',
      type: 'required',
      message: 'Risk tolerance is required',
      validator: (value: any) => ['conservative', 'moderate', 'aggressive'].includes(value)
    },
    {
      field: 'marketVolatility',
      type: 'required',
      message: 'Market volatility is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 0 && value <= 100
    },

    // Tax Validations
    {
      field: 'currentTaxRate',
      type: 'required',
      message: 'Current tax rate is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 0 && value <= 50
    },
    {
      field: 'retirementTaxRate',
      type: 'required',
      message: 'Retirement tax rate is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 0 && value <= 50
    },

    // Healthcare Planning
    {
      field: 'medicareStartAge',
      type: 'range',
      message: 'Medicare start age must be between 65 and 70',
      validator: (value: any) => !value || (value >= 65 && value <= 70)
    },

    // Withdrawal Planning
    {
      field: 'withdrawalRate',
      type: 'range',
      message: 'Withdrawal rate must be between 2% and 10%',
      validator: (value: any) => !value || (value >= 2 && value <= 10)
    },
    {
      field: 'withdrawalStartYear',
      type: 'range',
      message: 'Withdrawal start year must be between 1 and 50',
      validator: (value: any) => !value || (value >= 1 && value <= 50)
    },

    // Scenario Analysis
    {
      field: 'bearMarketDuration',
      type: 'range',
      message: 'Bear market duration must be between 1 and 120 months',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.includeMarketCrash) return true;
        return !value || (value >= 1 && value <= 120);
      }
    },
    {
      field: 'recoveryTime',
      type: 'range',
      message: 'Recovery time must be between 1 and 120 months',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.includeMarketCrash) return true;
        return !value || (value >= 1 && value <= 120);
      }
    },

    // Legacy Planning
    {
      field: 'inheritanceAmount',
      type: 'range',
      message: 'Inheritance amount must be positive',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.includeInheritance) return true;
        return !value || value > 0;
      }
    },
    {
      field: 'inheritanceAge',
      type: 'range',
      message: 'Inheritance age must be between current age and life expectancy',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.includeInheritance) return true;
        if (!allInputs?.currentAge || !allInputs?.lifeExpectancy) return true;
        return !value || (value >= allInputs.currentAge && value <= allInputs.lifeExpectancy);
      }
    }
  ];
}
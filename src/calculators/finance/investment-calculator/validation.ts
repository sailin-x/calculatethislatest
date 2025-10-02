import { ValidationRule } from '../../types/calculator';
import { InvestmentInputs } from './types';

export function getInvestmentValidationRules(): ValidationRule[] {
  return [
    // Initial Investment Validation
    {
      field: 'initialInvestment',
      type: 'required',
      message: 'Initial investment is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 0
    },
    {
      field: 'initialInvestment',
      type: 'range',
      message: 'Initial investment must be between $0 and $10,000,000',
      validator: (value: any) => value >= 0 && value <= 10000000
    },

    // Monthly Contribution Validation
    {
      field: 'monthlyContribution',
      type: 'range',
      message: 'Monthly contribution cannot be negative',
      validator: (value: any) => !value || value >= 0
    },
    {
      field: 'monthlyContribution',
      type: 'range',
      message: 'Monthly contribution cannot exceed $100,000',
      validator: (value: any) => !value || value <= 100000
    },

    // Time Horizon Validation
    {
      field: 'investmentPeriodYears',
      type: 'required',
      message: 'Investment period is required',
      validator: (value: any) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'investmentPeriodYears',
      type: 'range',
      message: 'Investment period must be between 1 and 100 years',
      validator: (value: any) => value >= 1 && value <= 100
    },
    {
      field: 'investmentPeriodMonths',
      type: 'range',
      message: 'Additional months must be between 0 and 11',
      validator: (value: any) => !value || (value >= 0 && value <= 11)
    },

    // Expected Returns Validation
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
      field: 'expectedAnnualReturnMin',
      type: 'range',
      message: 'Minimum expected return must be between -10% and 50%',
      validator: (value: any) => !value || (value >= -10 && value <= 50)
    },
    {
      field: 'expectedAnnualReturnMax',
      type: 'range',
      message: 'Maximum expected return must be between -10% and 50%',
      validator: (value: any) => !value || (value >= -10 && value <= 50)
    },
    {
      field: 'expectedAnnualReturn',
      type: 'business',
      message: 'Maximum return should be greater than minimum return',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.expectedAnnualReturnMin || !allInputs?.expectedAnnualReturnMax) return true;
        return allInputs.expectedAnnualReturnMax >= allInputs.expectedAnnualReturnMin;
      }
    },

    // Risk Parameters Validation
    {
      field: 'volatility',
      type: 'required',
      message: 'Volatility is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 0
    },
    {
      field: 'volatility',
      type: 'range',
      message: 'Volatility must be between 0% and 100%',
      validator: (value: any) => value >= 0 && value <= 100
    },
    {
      field: 'riskTolerance',
      type: 'required',
      message: 'Risk tolerance is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'riskTolerance',
      type: 'business',
      message: 'Invalid risk tolerance level',
      validator: (value: any) => ['conservative', 'moderate', 'aggressive'].includes(value)
    },

    // Inflation & Taxes Validation
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
      field: 'taxDeferred',
      type: 'business',
      message: 'Tax deferred must be true or false',
      validator: (value: any) => typeof value === 'boolean'
    },

    // Investment Strategy Validation
    {
      field: 'investmentStrategy',
      type: 'required',
      message: 'Investment strategy is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'investmentStrategy',
      type: 'business',
      message: 'Invalid investment strategy',
      validator: (value: any) => ['lump_sum', 'monthly_contributions', 'both'].includes(value)
    },
    {
      field: 'rebalanceFrequency',
      type: 'required',
      message: 'Rebalance frequency is required',
      validator: (value: any) => value !== undefined && value !== null
    },
    {
      field: 'rebalanceFrequency',
      type: 'business',
      message: 'Invalid rebalance frequency',
      validator: (value: any) => ['never', 'quarterly', 'annually'].includes(value)
    },

    // Asset Allocation Validation
    {
      field: 'stockAllocation',
      type: 'required',
      message: 'Stock allocation is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 0
    },
    {
      field: 'stockAllocation',
      type: 'range',
      message: 'Stock allocation must be between 0% and 100%',
      validator: (value: any) => value >= 0 && value <= 100
    },
    {
      field: 'bondAllocation',
      type: 'required',
      message: 'Bond allocation is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 0
    },
    {
      field: 'bondAllocation',
      type: 'range',
      message: 'Bond allocation must be between 0% and 100%',
      validator: (value: any) => value >= 0 && value <= 100
    },
    {
      field: 'cashAllocation',
      type: 'required',
      message: 'Cash allocation is required',
      validator: (value: any) => value !== undefined && value !== null && value >= 0
    },
    {
      field: 'cashAllocation',
      type: 'range',
      message: 'Cash allocation must be between 0% and 100%',
      validator: (value: any) => value >= 0 && value <= 100
    },
    {
      field: 'stockAllocation',
      type: 'business',
      message: 'Asset allocations must total 100%',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.bondAllocation || !allInputs?.cashAllocation) return true;
        const total = value + allInputs.bondAllocation + allInputs.cashAllocation;
        return Math.abs(total - 100) < 0.1;
      }
    },

    // Advanced Options Validation
    {
      field: 'includeDividends',
      type: 'business',
      message: 'Include dividends must be true or false',
      validator: (value: any) => typeof value === 'boolean'
    },
    {
      field: 'dividendYield',
      type: 'range',
      message: 'Dividend yield must be between 0% and 20%',
      validator: (value: any) => !value || (value >= 0 && value <= 20)
    },
    {
      field: 'expenseRatio',
      type: 'range',
      message: 'Expense ratio must be between 0% and 5%',
      validator: (value: any) => !value || (value >= 0 && value <= 5)
    },
    {
      field: 'managementFee',
      type: 'range',
      message: 'Management fee must be between 0% and 5%',
      validator: (value: any) => !value || (value >= 0 && value <= 5)
    },

    // Goal Setting Validation
    {
      field: 'targetAmount',
      type: 'range',
      message: 'Target amount must be greater than $0',
      validator: (value: any) => !value || value > 0
    },
    {
      field: 'targetAmount',
      type: 'range',
      message: 'Target amount cannot exceed $100,000,000',
      validator: (value: any) => !value || value <= 100000000
    },
    {
      field: 'riskAdjustedTarget',
      type: 'business',
      message: 'Risk adjusted target must be true or false',
      validator: (value: any) => typeof value === 'boolean'
    },

    // Scenario Analysis Validation
    {
      field: 'marketCrashScenario',
      type: 'business',
      message: 'Market crash scenario must be true or false',
      validator: (value: any) => typeof value === 'boolean'
    },
    {
      field: 'bearMarketDuration',
      type: 'range',
      message: 'Bear market duration must be between 1 and 120 months',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.marketCrashScenario) return true;
        return !value || (value >= 1 && value <= 120);
      }
    },
    {
      field: 'recoveryTime',
      type: 'range',
      message: 'Recovery time must be between 1 and 120 months',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!allInputs?.marketCrashScenario) return true;
        return !value || (value >= 1 && value <= 120);
      }
    },

    // Withdrawal Planning Validation
    {
      field: 'withdrawalRate',
      type: 'range',
      message: 'Withdrawal rate must be between 2% and 10%',
      validator: (value: any) => !value || (value >= 2 && value <= 10)
    },
    {
      field: 'withdrawalStartYear',
      type: 'range',
      message: 'Withdrawal start year must be between 1 and 100',
      validator: (value: any) => !value || (value >= 1 && value <= 100)
    },
    {
      field: 'withdrawalInflationAdjusted',
      type: 'business',
      message: 'Withdrawal inflation adjustment must be true or false',
      validator: (value: any) => typeof value === 'boolean'
    },

    // Comparison Options Validation
    {
      field: 'compareStrategies',
      type: 'business',
      message: 'Compare strategies must be true or false',
      validator: (value: any) => typeof value === 'boolean'
    },
    {
      field: 'benchmarkIndex',
      type: 'business',
      message: 'Invalid benchmark index',
      validator: (value: any) => ['sp500', 'nasdaq', 'dow_jones', 'custom'].includes(value)
    },
    {
      field: 'customBenchmarkReturn',
      type: 'range',
      message: 'Custom benchmark return must be between -10% and 50%',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (allInputs?.benchmarkIndex !== 'custom') return true;
        return !value || (value >= -10 && value <= 50);
      }
    },

    // Analysis Options Validation
    {
      field: 'prepaymentAnalysis',
      type: 'business',
      message: 'Prepayment analysis must be true or false',
      validator: (value: any) => typeof value === 'boolean'
    },
    {
      field: 'analysisPeriod',
      type: 'range',
      message: 'Analysis period must be between 1 and 100 years',
      validator: (value: any) => !value || (value >= 1 && value <= 100)
    },

    // Business Logic Validations
    {
      field: 'monthlyContribution',
      type: 'business',
      message: 'Consider increasing monthly contributions for better retirement outcomes',
      validator: (value: any) => {
        // This is informational - always return true for business logic
        return true;
      }
    },
    {
      field: 'expectedAnnualReturn',
      type: 'business',
      message: 'Historical stock market returns average 7-10% annually',
      validator: (value: any) => {
        // This is informational - always return true for business logic
        return true;
      }
    },
    {
      field: 'volatility',
      type: 'business',
      message: 'Higher volatility typically means higher potential returns but also higher risk',
      validator: (value: any) => {
        // This is informational - always return true for business logic
        return true;
      }
    },
    {
      field: 'stockAllocation',
      type: 'business',
      message: 'Consider your age and risk tolerance when allocating to stocks',
      validator: (value: any) => {
        // This is informational - always return true for business logic
        return true;
      }
    },
    {
      field: 'targetAmount',
      type: 'business',
      message: 'Consider consulting a financial advisor for personalized target amounts',
      validator: (value: any) => {
        // This is informational - always return true for business logic
        return true;
      }
    }
  ];
}

/**
 * Comprehensive validation function for all investment inputs
 */
export function validateAllInvestmentInputs(inputs: InvestmentInputs): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const rules = getInvestmentValidationRules();

  // Apply all validation rules
  rules.forEach(rule => {
    const value = inputs[rule.field as keyof InvestmentInputs];
    if (!rule.validator(value, inputs)) {
      errors[rule.field] = rule.message;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
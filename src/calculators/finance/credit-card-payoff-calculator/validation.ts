import { ValidationRule } from '../../types/calculator';
import { CreditCardPayoffInputs } from './types';

export function getCreditCardPayoffValidationRules(): ValidationRule[] {
  return [
    // Current Balance
    {
      field: 'currentBalance',
      type: 'required',
      message: 'Current balance is required',
      validator: (value: any) => value !== undefined && value !== null && typeof value === 'number' && value >= 0
    },
    {
      field: 'currentBalance',
      type: 'range',
      message: 'Current balance cannot exceed $250,000',
      validator: (value: any) => value <= 250000
    },
    {
      field: 'currentBalance',
      type: 'business',
      message: 'Current balance cannot exceed credit limit',
      validator: (value: any, allInputs?: Record<string, any>) => {
        return !allInputs?.creditLimit || value <= allInputs.creditLimit;
      }
    },

    // Credit Limit
    {
      field: 'creditLimit',
      type: 'required',
      message: 'Credit limit is required',
      validator: (value: any) => value !== undefined && value !== null && typeof value === 'number' && value > 0
    },
    {
      field: 'creditLimit',
      type: 'range',
      message: 'Credit limit must be between $100 and $500,000',
      validator: (value: any) => value >= 100 && value <= 500000
    },

    // Interest Rate
    {
      field: 'interestRate',
      type: 'required',
      message: 'Interest rate is required',
      validator: (value: any) => value !== undefined && value !== null && typeof value === 'number'
    },
    {
      field: 'interestRate',
      type: 'range',
      message: 'Interest rate must be between 0% and 50%',
      validator: (value: any) => value >= 0 && value <= 50
    },

    // Minimum Payment
    {
      field: 'minimumPayment',
      type: 'required',
      message: 'Minimum payment is required',
      validator: (value: any) => value !== undefined && value !== null && typeof value === 'number' && value > 0
    },
    {
      field: 'minimumPayment',
      type: 'range',
      message: 'Minimum payment cannot exceed $50,000',
      validator: (value: any) => value <= 50000
    },

    // Planned Payment
    {
      field: 'plannedPayment',
      type: 'required',
      message: 'Planned payment is required',
      validator: (value: any) => value !== undefined && value !== null && typeof value === 'number' && value >= 0
    },
    {
      field: 'plannedPayment',
      type: 'business',
      message: 'Planned payment cannot be less than minimum payment',
      validator: (value: any, allInputs?: Record<string, any>) => {
        return !allInputs?.minimumPayment || value >= allInputs.minimumPayment;
      }
    },

    // Payment Frequency
    {
      field: 'paymentFrequency',
      type: 'required',
      message: 'Payment frequency is required',
      validator: (value: any) => ['monthly', 'biweekly', 'weekly'].includes(value)
    },

    // Extra Payment
    {
      field: 'extraPayment',
      type: 'range',
      message: 'Extra payment cannot be negative',
      validator: (value: any) => !value || value >= 0
    },

    // Financial Context
    {
      field: 'monthlyIncome',
      type: 'range',
      message: 'Monthly income cannot be negative',
      validator: (value: any) => !value || value >= 0
    },
    {
      field: 'monthlyExpenses',
      type: 'range',
      message: 'Monthly expenses cannot be negative',
      validator: (value: any) => !value || value >= 0
    },
    {
      field: 'emergencyFund',
      type: 'range',
      message: 'Emergency fund cannot be negative',
      validator: (value: any) => !value || value >= 0
    },

    // Payoff Goal
    {
      field: 'payoffGoal',
      type: 'required',
      message: 'Payoff goal is required',
      validator: (value: any) => ['debt_free', 'minimum_payments', 'custom_amount'].includes(value)
    },
    {
      field: 'customPayoffAmount',
      type: 'business',
      message: 'Custom payoff amount must be between 0 and current balance',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!value) return true; // Optional field
        const currentBalance = allInputs?.currentBalance || 0;
        return value >= 0 && value <= currentBalance;
      }
    },

    // Risk Tolerance
    {
      field: 'riskTolerance',
      type: 'required',
      message: 'Risk tolerance is required',
      validator: (value: any) => ['conservative', 'moderate', 'aggressive'].includes(value)
    },

    // Payoff Strategy
    {
      field: 'payoffStrategy',
      type: 'required',
      message: 'Payoff strategy is required',
      validator: (value: any) => ['avalanche', 'snowball', 'custom'].includes(value)
    },

    // Balance Transfer
    {
      field: 'balanceTransferFee',
      type: 'business',
      message: 'Balance transfer fee should be less than 5% of balance',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!value || !allInputs?.isBalanceTransfer) return true;
        const balance = allInputs?.currentBalance || 0;
        return value <= balance * 0.05;
      }
    },

    // Promotional Rate
    {
      field: 'promotionalRate',
      type: 'range',
      message: 'Promotional rate must be between 0% and current interest rate',
      validator: (value: any, allInputs?: Record<string, any>) => {
        if (!value) return true;
        const currentRate = allInputs?.interestRate || 100;
        return value >= 0 && value <= currentRate;
      }
    },

    // Promotional Period
    {
      field: 'promotionalPeriod',
      type: 'range',
      message: 'Promotional period must be between 1 and 24 months',
      validator: (value: any) => !value || (value >= 1 && value <= 24)
    },

    // Target Date
    {
      field: 'targetDate',
      type: 'business',
      message: 'Target date must be in the future',
      validator: (value: any) => {
        if (!value) return true;
        const targetDate = new Date(value);
        const now = new Date();
        return targetDate > now;
      }
    }
  ];
}
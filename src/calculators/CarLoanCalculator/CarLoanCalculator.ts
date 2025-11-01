import { Calculator } from '../../types/calculator';
import { CarLoanInputs, CarLoanOutputs } from './types';
import { calculateMonthlyPayment, calculateTotalCost, calculateTotalInterest } from './formulas';
import { validateCarLoanInputs } from './validation';

export const CarLoanCalculator: Calculator = {
  id: 'CarLoanCalculator',
  title: 'Car Loan Calculator',
  category: 'finance',
  subcategory: 'Auto & Transportation',
  description: 'Calculate car loan payments, total cost, and interest for auto financing with different loan terms and interest rates.',
  usageInstructions: [
    'Enter the vehicle price',
    'Input your down payment amount',
    'Specify the loan term in months',
    'Enter the interest rate',
    'Review monthly payment and total cost'
  ],

  inputs: [
    {
      id: 'vehiclePrice',
      label: 'Vehicle Price ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total price of the vehicle'
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Initial payment amount'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Months)',
      type: 'number',
      required: true,
      min: 12,
      max: 96,
      tooltip: 'Length of the loan in months'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 25,
      step: 0.125,
      tooltip: 'Annual interest rate'
    },
    {
      id: 'tradeInValue',
      label: 'Trade-in Value ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Value of vehicle being traded in'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Monthly loan payment amount'
    },
    {
      id: 'totalCost',
      label: 'Total Cost',
      type: 'currency',
      explanation: 'Total amount paid including principal and interest'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest',
      type: 'currency',
      explanation: 'Total interest paid over the loan term'
    }
  ],

  formulas: [], // Formulas are implemented in formulas.ts

  validationRules: [], // Validation rules are implemented in validation.ts

  examples: [
    {
      title: 'Standard Car Loan',
      description: '48-month loan for $25,000 vehicle with 5% interest',
      inputs: {
        vehiclePrice: 25000,
        downPayment: 5000,
        loanTerm: 48,
        interestRate: 5,
        tradeInValue: 0
      },
      expectedOutputs: {
        monthlyPayment: 425,
        totalCost: 30400,
        totalInterest: 1900
      }
    }
  ]
};
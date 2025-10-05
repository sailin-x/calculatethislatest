import { Calculator } from '../../types/calculator';
import { MortgageAprComparisonCalculatorInputs, MortgageAprComparisonCalculatorOutputs } from './types';
import {
  // Import calculation functions from formulas.ts
  calculateResult,
  calculateSecondaryResult,
  // Add other formula imports as needed
} from './formulas';
import { validateMortgageAprComparisonCalculatorInputs, validateMortgageAprComparisonCalculatorBusinessRules } from './validation';

export const MortgageAprComparisonCalculatorCalculator: Calculator: Calculator = {
  id: 'mortgage-apr-comparison-calculator-calculator',
  title: 'Mortgage APR Comparison Calculator Calculator',
  finance: 'finance', // e.g., 'finance', 'math', 'health', 'business'
  subfinance: 'Subfinance Name',
  description: 'Brief description of what this calculator does and its purpose.',
  usageInstructions: [
    'Step 1: Enter the primary input values',
    'Step 2: Configure any optional parameters',
    'Step 3: Review the calculated results',
    'Step 4: Adjust inputs as needed for different scenarios'
  ],

  inputs: [
    {
        "id": "loanAmount",
        "label": "Loan Amount ($)",
        "type": "currency",
        "required": true,
        "min": 0,
        "tooltip": "Total loan amount"
    },
    {
        "id": "interestRate",
        "label": "Interest Rate (%)",
        "type": "percentage",
        "required": true,
        "min": 0,
        "max": 30,
        "step": 0.125,
        "tooltip": "Annual interest rate"
    },
    {
        "id": "loanTerm",
        "label": "Loan Term (Years)",
        "type": "number",
        "required": true,
        "min": 1,
        "max": 50,
        "tooltip": "Loan duration in years"
    }
],

  outputs: [
    {
        "id": "monthlyPayment",
        "label": "Monthly Payment",
        "type": "currency",
        "explanation": "Monthly payment amount"
    },
    {
        "id": "totalInterest",
        "label": "Total Interest",
        "type": "currency",
        "explanation": "Total interest paid over loan term"
    }
],

  formulas: [], // Formulas are implemented in formulas.ts

  validationRules: [], // Validation rules are implemented in validation.ts

  examples: [
    {
        "title": "30-Year Fixed Loan",
        "description": "Standard 30-year mortgage calculation",
        "inputs": {
            "loanAmount": 300000,
            "interestRate": 6.5,
            "loanTerm": 30
        },
        "expectedOutputs": {
            "monthlyPayment": 1918,
            "totalInterest": 387000
        }
    }
]
};
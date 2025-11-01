import { Calculator } from '../../types/calculator';
import { Four01kCalculatorInputs, Four01kCalculatorResults } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export const Four01kCalculator: Calculator = {
  id: 'FourZeroOne-k-calculator',
  title: '401(k) Calculator',
  category: 'finance',
  subcategory: 'Retirement Planning',
  description: 'Calculate 401(k) contributions, growth projections, and retirement savings with tax advantages and employer matching.',
  usageInstructions: [
    'Enter your current age and retirement age',
    'Input your current 401(k) balance',
    'Specify your annual contribution amount',
    'Enter expected annual return rate',
    'Review growth projections and tax savings'
  ],

  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 80,
      tooltip: 'Your current age'
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      min: 55,
      max: 80,
      tooltip: 'Age when you plan to retire'
    },
    {
      id: 'currentBalance',
      label: 'Current 401(k) Balance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Current amount in your 401(k) account'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 23000,
      tooltip: 'Annual contribution amount (2024 limit: $23,000)'
    },
    {
      id: 'expectedReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      defaultValue: 7,
      tooltip: 'Expected annual return on investments'
    },
    {
      id: 'employerMatch',
      label: 'Employer Match (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Percentage of salary matched by employer'
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Projected Balance at Retirement',
      type: 'currency',
      explanation: 'Estimated 401(k) balance at retirement age'
    }
  ],

  formulas: [], // Formulas are implemented in formulas.ts

  validationRules: [], // Validation rules are implemented in validation.ts

  examples: [
    {
      title: 'Standard 401(k) Contribution',
      description: '30YearOld contributing $10,000 annually with 7% return',
      inputs: {
        currentAge: 30,
        retirementAge: 65,
        currentBalance: 50000,
        annualContribution: 10000,
        expectedReturn: 7,
        employerMatch: 0
      },
      expectedOutputs: {
        result: 1000000
      }
    }
  ]
};
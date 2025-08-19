import { Calculator } from '../../../types/calculator';
import { calculateMortgagePayoff, analyzePayoffStrategies, calculatePayoffScenarios } from './formulas';
import { validateMortgagePayoffInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const mortgagePayoffCalculator: Calculator = {
  id: 'mortgage-payoff',
  title: 'Mortgage Payoff Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage payoff strategies, early payment benefits, and different payoff scenarios to help you pay off your mortgage faster and save on interest.',
  usageInstructions: 'Enter your current mortgage details and desired payoff strategy to see how different approaches can help you pay off your mortgage faster and save money on interest.',
  inputs: [
    {
      id: 'currentBalance',
      label: 'Current Mortgage Balance',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      tooltip: 'Your current outstanding mortgage balance',
      placeholder: '250000',
      defaultValue: 250000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.125,
      tooltip: 'Your current mortgage interest rate',
      placeholder: '4.5',
      defaultValue: 4.5
    },
    {
      id: 'remainingTerm',
      label: 'Remaining Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      tooltip: 'Years remaining on your mortgage',
      placeholder: '25',
      defaultValue: 25
    },
    {
      id: 'monthlyPayment',
      label: 'Current Monthly Payment',
      type: 'number',
      required: true,
      min: 100,
      max: 50000,
      step: 50,
      tooltip: 'Your current monthly mortgage payment (principal + interest)',
      placeholder: '1500',
      defaultValue: 1500
    },
    {
      id: 'extraPayment',
      label: 'Extra Monthly Payment',
      type: 'number',
      required: false,
      min: 0,
      max: 10000,
      step: 50,
      tooltip: 'Additional amount you can pay each month',
      placeholder: '200',
      defaultValue: 200
    },
    {
      id: 'lumpSumPayment',
      label: 'Lump Sum Payment',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'One-time payment to reduce principal',
      placeholder: '10000',
      defaultValue: 0
    },
    {
      id: 'payoffStrategy',
      label: 'Payoff Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'standard', label: 'Standard Payment' },
        { value: 'extra-monthly', label: 'Extra Monthly Payment' },
        { value: 'lump-sum', label: 'Lump Sum Payment' },
        { value: 'biweekly', label: 'Bi-weekly Payments' },
        { value: 'custom', label: 'Custom Strategy' }
      ],
      tooltip: 'Choose your preferred payoff strategy',
      defaultValue: 'standard'
    },
    {
      id: 'targetPayoffDate',
      label: 'Target Payoff Date',
      type: 'date',
      required: false,
      tooltip: 'Desired date to have mortgage paid off',
      placeholder: '2030-12-31'
    },
    {
      id: 'propertyValue',
      label: 'Current Property Value',
      type: 'number',
      required: false,
      min: 1000,
      max: 10000000,
      step: 1000,
      tooltip: 'Current market value of your property',
      placeholder: '350000',
      defaultValue: 350000
    },
    {
      id: 'taxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 50,
      step: 1,
      tooltip: 'Your marginal federal tax rate for interest deduction calculations',
      placeholder: '22',
      defaultValue: 22
    },
    {
      id: 'investmentReturn',
      label: 'Alternative Investment Return (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      step: 0.5,
      tooltip: 'Expected return if you invested the money instead',
      placeholder: '7',
      defaultValue: 7
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      tooltip: 'Expected annual inflation rate',
      placeholder: '2.5',
      defaultValue: 2.5
    }
  ],
  outputs: [
    {
      id: 'payoffDate',
      label: 'Payoff Date',
      type: 'date',
      format: 'MM/DD/YYYY',
      explanation: 'Estimated date when mortgage will be fully paid off'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'currency',
      format: 'USD',
      explanation: 'Total interest paid over the life of the mortgage'
    },
    {
      id: 'interestSavings',
      label: 'Interest Savings',
      type: 'currency',
      format: 'USD',
      explanation: 'Amount of interest saved compared to standard payment'
    },
    {
      id: 'timeSaved',
      label: 'Time Saved (Years)',
      type: 'number',
      format: 'decimal',
      explanation: 'Years saved on mortgage term'
    },
    {
      id: 'monthlyPaymentNew',
      label: 'New Monthly Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'New monthly payment amount with strategy'
    },
    {
      id: 'payoffSchedule',
      label: 'Payoff Schedule',
      type: 'table',
      format: 'JSON',
      explanation: 'Detailed month-by-month payoff schedule'
    },
    {
      id: 'costBenefitAnalysis',
      label: 'Cost-Benefit Analysis',
      type: 'text',
      format: 'markdown',
      explanation: 'Analysis of payoff strategy costs and benefits'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      format: 'markdown',
      explanation: 'Personalized recommendations for payoff strategy'
    }
  ],
  formulas: [
    {
      id: 'calculatePayoff',
      name: 'Calculate Mortgage Payoff',
      description: 'Calculate payoff date, interest savings, and schedule for different strategies',
      calculate: calculateMortgagePayoff
    },
    {
      id: 'analyzeStrategies',
      name: 'Analyze Payoff Strategies',
      description: 'Compare different payoff strategies and their effectiveness',
      calculate: analyzePayoffStrategies
    },
    {
      id: 'calculateScenarios',
      name: 'Calculate Payoff Scenarios',
      description: 'Generate different payoff scenarios based on various strategies',
      calculate: calculatePayoffScenarios
    }
  ],
  validationRules: [
    {
      id: 'validateInputs',
      name: 'Validate Inputs',
      description: 'Validate all input values for reasonableness and business rules',
      validate: validateMortgagePayoffInputs
    }
  ],
  examples: [
    {
      title: 'Standard 30-Year Mortgage',
      description: 'Calculate payoff for a standard 30-year fixed mortgage',
      inputs: {
        currentBalance: 300000,
        interestRate: 4.5,
        remainingTerm: 30,
        monthlyPayment: 1520,
        extraPayment: 0,
        lumpSumPayment: 0,
        payoffStrategy: 'standard',
        propertyValue: 400000,
        taxRate: 22,
        investmentReturn: 7,
        inflationRate: 2.5
      },
      expectedOutputs: {
        payoffDate: '2053-12-01',
        totalInterest: 247200,
        interestSavings: 0,
        timeSaved: 0,
        monthlyPaymentNew: 1520
      }
    },
    {
      title: 'Extra Monthly Payment Strategy',
      description: 'Add $200 extra monthly payment to pay off faster',
      inputs: {
        currentBalance: 250000,
        interestRate: 4.0,
        remainingTerm: 25,
        monthlyPayment: 1320,
        extraPayment: 200,
        lumpSumPayment: 0,
        payoffStrategy: 'extra-monthly',
        propertyValue: 350000,
        taxRate: 24,
        investmentReturn: 8,
        inflationRate: 2.0
      },
      expectedOutputs: {
        payoffDate: '2035-06-01',
        totalInterest: 156800,
        interestSavings: 45600,
        timeSaved: 4.5,
        monthlyPaymentNew: 1520
      }
    },
    {
      title: 'Lump Sum Payment Strategy',
      description: 'Make a $20,000 lump sum payment to reduce principal',
      inputs: {
        currentBalance: 200000,
        interestRate: 3.75,
        remainingTerm: 20,
        monthlyPayment: 1185,
        extraPayment: 0,
        lumpSumPayment: 20000,
        payoffStrategy: 'lump-sum',
        propertyValue: 280000,
        taxRate: 22,
        investmentReturn: 6.5,
        inflationRate: 2.5
      },
      expectedOutputs: {
        payoffDate: '2038-03-01',
        totalInterest: 98750,
        interestSavings: 23400,
        timeSaved: 2.8,
        monthlyPaymentNew: 1185
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};
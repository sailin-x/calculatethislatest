import { Calculator } from '../../../types/calculator';
import { calculateMortgagePoints, analyzePointsStrategies, calculateBreakEvenAnalysis } from './formulas';
import { validateMortgagePointsInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const mortgagePointsCalculator: Calculator = {
  id: 'mortgage-points',
  title: 'Mortgage Points Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage points costs, interest rate reductions, and break-even analysis to determine if buying points makes financial sense.',
  usageInstructions: 'Enter your loan details and points information to calculate the cost of buying points, interest savings, and determine when you will break even on the investment.',
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'number',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      tooltip: 'Total amount of the mortgage loan',
      placeholder: '300000',
      defaultValue: 300000
    },
    {
      id: 'originalRate',
      label: 'Original Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.125,
      tooltip: 'Interest rate without buying points',
      placeholder: '5.5',
      defaultValue: 5.5
    },
    {
      id: 'pointsToBuy',
      label: 'Points to Buy',
      type: 'number',
      required: true,
      min: 0,
      max: 5,
      step: 0.125,
      tooltip: 'Number of discount points to purchase (1 point = 1% of loan amount)',
      placeholder: '1',
      defaultValue: 1
    },
    {
      id: 'rateReduction',
      label: 'Rate Reduction per Point (%)',
      type: 'number',
      required: true,
      min: 0.125,
      max: 0.5,
      step: 0.125,
      tooltip: 'Interest rate reduction for each point purchased',
      placeholder: '0.25',
      defaultValue: 0.25
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      tooltip: 'Length of the mortgage in years',
      placeholder: '30',
      defaultValue: 30
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
      tooltip: 'Expected return if you invested the points cost instead',
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
    },
    {
      id: 'plannedOwnershipYears',
      label: 'Planned Ownership (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 50,
      step: 1,
      tooltip: 'How long you plan to own the property',
      placeholder: '7',
      defaultValue: 7
    },
    {
      id: 'closingCosts',
      label: 'Other Closing Costs',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Other closing costs not related to points',
      placeholder: '5000',
      defaultValue: 5000
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'number',
      required: false,
      min: 1000,
      max: 10000000,
      step: 1000,
      tooltip: 'Purchase price or appraised value of the property',
      placeholder: '375000',
      defaultValue: 375000
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Down payment amount',
      placeholder: '75000',
      defaultValue: 75000
    }
  ],
  outputs: [
    {
      id: 'pointsCost',
      label: 'Points Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Total cost to purchase the specified points'
    },
    {
      id: 'newRate',
      label: 'New Interest Rate (%)',
      type: 'number',
      format: 'decimal',
      explanation: 'Interest rate after purchasing points'
    },
    {
      id: 'monthlyPaymentOriginal',
      label: 'Original Monthly Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'Monthly payment at the original interest rate'
    },
    {
      id: 'monthlyPaymentNew',
      label: 'New Monthly Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'Monthly payment at the reduced interest rate'
    },
    {
      id: 'monthlySavings',
      label: 'Monthly Payment Savings',
      type: 'currency',
      format: 'USD',
      explanation: 'Amount saved each month by purchasing points'
    },
    {
      id: 'totalInterestSavings',
      label: 'Total Interest Savings',
      type: 'currency',
      format: 'USD',
      explanation: 'Total interest saved over the life of the loan'
    },
    {
      id: 'breakEvenMonths',
      label: 'Break-Even (Months)',
      type: 'number',
      format: 'decimal',
      explanation: 'Number of months to break even on points investment'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even (Years)',
      type: 'number',
      format: 'decimal',
      explanation: 'Number of years to break even on points investment'
    },
    {
      id: 'costBenefitAnalysis',
      label: 'Cost-Benefit Analysis',
      type: 'text',
      format: 'markdown',
      explanation: 'Detailed analysis of points purchase costs and benefits'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      format: 'markdown',
      explanation: 'Personalized recommendations based on your situation'
    }
  ],
  formulas: [
    {
      id: 'calculatePoints',
      name: 'Calculate Mortgage Points',
      description: 'Calculate points cost, new rate, payment savings, and break-even analysis',
      calculate: calculateMortgagePoints
    },
    {
      id: 'analyzeStrategies',
      name: 'Analyze Points Strategies',
      description: 'Compare different points purchase strategies and their effectiveness',
      calculate: analyzePointsStrategies
    },
    {
      id: 'calculateBreakEven',
      name: 'Calculate Break-Even Analysis',
      description: 'Detailed break-even analysis considering various factors',
      calculate: calculateBreakEvenAnalysis
    }
  ],
  validationRules: [
    {
      id: 'validateInputs',
      name: 'Validate Inputs',
      description: 'Validate all input values for reasonableness and business rules',
      validate: validateMortgagePointsInputs
    }
  ],
  examples: [
    {
      title: 'Standard 30-Year Fixed Rate',
      description: 'Calculate points for a standard 30-year fixed rate mortgage',
      inputs: {
        loanAmount: 300000,
        originalRate: 5.5,
        pointsToBuy: 1,
        rateReduction: 0.25,
        loanTerm: 30,
        taxRate: 22,
        investmentReturn: 7,
        inflationRate: 2.5,
        plannedOwnershipYears: 7,
        closingCosts: 5000,
        propertyValue: 375000,
        downPayment: 75000
      },
      expectedOutputs: {
        pointsCost: 3000,
        newRate: 5.25,
        monthlyPaymentOriginal: 1703,
        monthlyPaymentNew: 1656,
        monthlySavings: 47,
        breakEvenMonths: 64
      }
    },
    {
      title: 'High Rate Reduction Scenario',
      description: 'Calculate points with a higher rate reduction per point',
      inputs: {
        loanAmount: 400000,
        originalRate: 6.0,
        pointsToBuy: 2,
        rateReduction: 0.375,
        loanTerm: 30,
        taxRate: 24,
        investmentReturn: 8,
        inflationRate: 2.0,
        plannedOwnershipYears: 10,
        closingCosts: 6000,
        propertyValue: 500000,
        downPayment: 100000
      },
      expectedOutputs: {
        pointsCost: 8000,
        newRate: 5.25,
        monthlyPaymentOriginal: 2398,
        monthlyPaymentNew: 2208,
        monthlySavings: 190,
        breakEvenMonths: 42
      }
    },
    {
      title: 'Short-Term Ownership',
      description: 'Calculate points for someone planning to sell in 5 years',
      inputs: {
        loanAmount: 250000,
        originalRate: 5.0,
        pointsToBuy: 0.5,
        rateReduction: 0.25,
        loanTerm: 30,
        taxRate: 22,
        investmentReturn: 7,
        inflationRate: 2.5,
        plannedOwnershipYears: 5,
        closingCosts: 4000,
        propertyValue: 312500,
        downPayment: 62500
      },
      expectedOutputs: {
        pointsCost: 1250,
        newRate: 4.875,
        monthlyPaymentOriginal: 1342,
        monthlyPaymentNew: 1320,
        monthlySavings: 22,
        breakEvenMonths: 57
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};
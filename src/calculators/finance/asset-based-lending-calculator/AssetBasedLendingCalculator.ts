import { Calculator } from '../../types/calculator';
import { AssetBasedLendingCalculatorInputs, AssetBasedLendingCalculatorOutputs } from './types';
import { calculateAssetBasedLendingResults } from './formulas';
import { validateAssetBasedLendingInputs } from './validation';

export const AssetBasedLendingCalculator: Calculator = {
  id: 'asset-based-lending-calculator',
  title: 'Asset-Based Lending Calculator',
  category: 'finance',
  subcategory: 'Investment & Portfolio',
  description: 'Calculate asset-based lending terms, loan amounts, and costs based on asset value and advance rates.',
  usageInstructions: [
    'Enter the total value of your assets',
    'Specify the advance rate percentage',
    'Input interest rate and loan term',
    'Include origination and monitoring fees',
    'Review loan amount and total costs'
  ],

  inputs: [
    {
      id: 'assetValue',
      label: 'Asset Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total value of assets being used as collateral'
    },
    {
      id: 'advanceRate',
      label: 'Advance Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      tooltip: 'Percentage of asset value that can be borrowed'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.125,
      tooltip: 'Annual interest rate for the loan'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Months)',
      type: 'number',
      required: true,
      min: 1,
      max: 360,
      tooltip: 'Length of the loan in months'
    },
    {
      id: 'originationFee',
      label: 'Origination Fee (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      defaultValue: 1,
      tooltip: 'One-time fee charged to originate the loan'
    },
    {
      id: 'monitoringFee',
      label: 'Annual Monitoring Fee (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      step: 0.1,
      defaultValue: 0.5,
      tooltip: 'Annual fee for monitoring collateral value'
    }
  ],

  outputs: [
    {
      id: 'maximumLoanAmount',
      label: 'Maximum Loan Amount',
      type: 'currency',
      explanation: 'Maximum amount that can be borrowed based on advance rate'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Monthly loan payment including principal and interest'
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest paid over the loan term'
    },
    {
      id: 'totalFees',
      label: 'Total Fees',
      type: 'currency',
      explanation: 'Total origination and monitoring fees'
    },
    {
      id: 'totalCost',
      label: 'Total Cost',
      type: 'currency',
      explanation: 'Total cost of borrowing including interest and fees'
    },
    {
      id: 'effectiveInterestRate',
      label: 'Effective Interest Rate',
      type: 'percentage',
      explanation: 'Effective annual interest rate including fees'
    }
  ],

  formulas: [
    {
      id: 'asset-based-lending-calculation',
      name: 'Asset-Based Lending Calculation',
      description: 'Calculate asset-based lending terms and costs',
      calculate: (inputs: Record<string, any>) => {
        const result = calculateAssetBasedLendingResults(inputs as AssetBasedLendingCalculatorInputs);
        return {
          outputs: {
            maximumLoanAmount: result.maximumLoanAmount,
            monthlyPayment: result.monthlyPayment,
            totalInterestPaid: result.totalInterestPaid,
            totalFees: result.totalFees,
            totalCost: result.totalCost,
            effectiveInterestRate: result.effectiveInterestRate
          },
          explanation: 'Asset-based lending calculation completed'
        };
      }
    }
  ],

  validationRules: [],

  examples: [
    {
      title: 'Commercial Real Estate Financing',
      description: 'Asset-based loan for commercial property valued at $2M',
      inputs: {
        assetValue: 2000000,
        advanceRate: 75,
        interestRate: 8.5,
        loanTerm: 60,
        originationFee: 1.5,
        monitoringFee: 0.75
      },
      expectedOutputs: {
        maximumLoanAmount: 1500000,
        monthlyPayment: 30375,
        totalInterestPaid: 323250,
        totalFees: 168750,
        totalCost: 492000,
        effectiveInterestRate: 10.2
      }
    },
    {
      title: 'Equipment Financing',
      description: 'Asset-based loan for manufacturing equipment',
      inputs: {
        assetValue: 500000,
        advanceRate: 80,
        interestRate: 7.25,
        loanTerm: 48,
        originationFee: 1,
        monitoringFee: 0.5
      },
      expectedOutputs: {
        maximumLoanAmount: 400000,
        monthlyPayment: 10025,
        totalInterestPaid: 98200,
        totalFees: 22000,
        totalCost: 120200,
        effectiveInterestRate: 8.1
      }
    }
  ]
};

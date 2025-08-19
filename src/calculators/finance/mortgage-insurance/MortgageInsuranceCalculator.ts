import { Calculator } from '../../../types/calculator';

export const mortgageInsuranceCalculator: Calculator = {
  id: 'mortgage-insurance',
  title: 'Mortgage Insurance Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage insurance costs including PMI, MIP, and other insurance premiums based on loan type and down payment.',
  usageInstructions: 'Enter your loan details to calculate mortgage insurance costs. The calculator handles PMI for conventional loans, MIP for FHA loans, and other insurance types.',
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      tooltip: 'The total amount you are borrowing',
      placeholder: '300000',
      defaultValue: 300000
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      tooltip: 'The appraised value of the property',
      placeholder: '375000',
      defaultValue: 375000
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Amount of down payment',
      placeholder: '75000',
      defaultValue: 75000
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' }
      ],
      tooltip: 'Type of mortgage loan',
      defaultValue: 'conventional'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: false,
      min: 300,
      max: 850,
      step: 1,
      tooltip: 'Your credit score (affects PMI rates)',
      placeholder: '720',
      defaultValue: 720
    },
    {
      id: 'occupancyType',
      label: 'Occupancy Type',
      type: 'select',
      required: true,
      options: [
        { value: 'primary', label: 'Primary Residence' },
        { value: 'secondary', label: 'Secondary Home' },
        { value: 'investment', label: 'Investment Property' }
      ],
      tooltip: 'How you plan to use the property',
      defaultValue: 'primary'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'select',
      required: true,
      options: [
        { value: '15', label: '15 Years' },
        { value: '30', label: '30 Years' }
      ],
      tooltip: 'Length of the loan',
      defaultValue: '30'
    },
    {
      id: 'pmiRate',
      label: 'PMI Rate (%)',
      type: 'number',
      required: false,
      min: 0.1,
      max: 2,
      step: 0.01,
      tooltip: 'Annual PMI rate (if known)',
      placeholder: '0.5',
      defaultValue: 0.5
    },
    {
      id: 'mipRate',
      label: 'MIP Rate (%)',
      type: 'number',
      required: false,
      min: 0.45,
      max: 1.75,
      step: 0.01,
      tooltip: 'Annual MIP rate for FHA loans',
      placeholder: '0.85',
      defaultValue: 0.85
    },
    {
      id: 'fundingFee',
      label: 'VA Funding Fee (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 3.6,
      step: 0.1,
      tooltip: 'VA funding fee percentage',
      placeholder: '2.3',
      defaultValue: 2.3
    },
    {
      id: 'guaranteeFee',
      label: 'USDA Guarantee Fee (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 2,
      step: 0.01,
      tooltip: 'USDA guarantee fee percentage',
      placeholder: '1.0',
      defaultValue: 1.0
    }
  ],
  outputs: [
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Percentage of property value being financed'
    },
    {
      id: 'insuranceRequired',
      label: 'Insurance Required',
      type: 'boolean',
      format: 'text',
      explanation: 'Whether mortgage insurance is required'
    },
    {
      id: 'insuranceType',
      label: 'Insurance Type',
      type: 'text',
      format: 'text',
      explanation: 'Type of insurance required (PMI, MIP, etc.)'
    },
    {
      id: 'annualInsuranceCost',
      label: 'Annual Insurance Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Annual cost of mortgage insurance'
    },
    {
      id: 'monthlyInsuranceCost',
      label: 'Monthly Insurance Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Monthly cost of mortgage insurance'
    },
    {
      id: 'totalInsuranceCost',
      label: 'Total Insurance Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Total insurance cost over loan term'
    },
    {
      id: 'cancellationDate',
      label: 'Cancellation Date',
      type: 'date',
      format: 'MM/DD/YYYY',
      explanation: 'When insurance can be cancelled (if applicable)'
    },
    {
      id: 'equityNeededToCancel',
      label: 'Equity Needed to Cancel',
      type: 'currency',
      format: 'USD',
      explanation: 'Additional equity needed to cancel insurance'
    },
    {
      id: 'insuranceBreakdown',
      label: 'Insurance Breakdown',
      type: 'table',
      format: 'JSON',
      explanation: 'Detailed breakdown of insurance costs by year'
    },
    {
      id: 'costComparison',
      label: 'Cost Comparison',
      type: 'chart',
      format: 'JSON',
      explanation: 'Comparison of costs with and without insurance'
    }
  ],
  formulas: [
    {
      id: 'mortgage-insurance',
      name: 'Mortgage Insurance Calculation',
      description: 'Calculate mortgage insurance costs based on loan type and LTV ratio',
      calculate: (inputs) => {
        const { calculateMortgageInsurance } = require('./formulas');
        return calculateMortgageInsurance(inputs);
      }
    },
    {
      id: 'ltv-calculation',
      name: 'Loan-to-Value Calculation',
      description: 'Calculate LTV ratio and determine insurance requirements',
      calculate: (inputs) => {
        const { calculateLTVAndInsurance } = require('./formulas');
        return calculateLTVAndInsurance(inputs);
      }
    },
    {
      id: 'cancellation-analysis',
      name: 'Insurance Cancellation Analysis',
      description: 'Analyze when insurance can be cancelled and costs saved',
      calculate: (inputs) => {
        const { analyzeInsuranceCancellation } = require('./formulas');
        return analyzeInsuranceCancellation(inputs);
      }
    }
  ],
  validationRules: [
    {
      id: 'loan-amount-positive',
      name: 'Loan Amount Must Be Positive',
      description: 'Loan amount must be greater than zero',
      validate: (inputs) => {
        const { validateMortgageInsuranceInputs } = require('./validation');
        return validateMortgageInsuranceInputs(inputs);
      }
    }
  ],
  examples: [
    {
      title: 'Conventional Loan with PMI',
      description: 'A conventional loan with 10% down payment requiring PMI',
      inputs: {
        loanAmount: 300000,
        propertyValue: 333333,
        downPayment: 33333,
        loanType: 'conventional',
        creditScore: 720,
        occupancyType: 'primary',
        loanTerm: '30',
        pmiRate: 0.5,
        mipRate: 0.85,
        fundingFee: 2.3,
        guaranteeFee: 1.0
      },
      expectedOutputs: {
        loanToValueRatio: 90.0,
        insuranceRequired: true,
        insuranceType: 'PMI',
        annualInsuranceCost: 1500.00,
        monthlyInsuranceCost: 125.00,
        totalInsuranceCost: 45000.00
      }
    },
    {
      title: 'FHA Loan with MIP',
      description: 'An FHA loan with 3.5% down payment requiring MIP',
      inputs: {
        loanAmount: 250000,
        propertyValue: 259067,
        downPayment: 9067,
        loanType: 'fha',
        creditScore: 680,
        occupancyType: 'primary',
        loanTerm: '30',
        pmiRate: 0.5,
        mipRate: 0.85,
        fundingFee: 2.3,
        guaranteeFee: 1.0
      },
      expectedOutputs: {
        loanToValueRatio: 96.5,
        insuranceRequired: true,
        insuranceType: 'MIP',
        annualInsuranceCost: 2125.00,
        monthlyInsuranceCost: 177.08,
        totalInsuranceCost: 63750.00
      }
    },
    {
      title: 'VA Loan with Funding Fee',
      description: 'A VA loan with 0% down payment and funding fee',
      inputs: {
        loanAmount: 350000,
        propertyValue: 350000,
        downPayment: 0,
        loanType: 'va',
        creditScore: 750,
        occupancyType: 'primary',
        loanTerm: '30',
        pmiRate: 0.5,
        mipRate: 0.85,
        fundingFee: 2.3,
        guaranteeFee: 1.0
      },
      expectedOutputs: {
        loanToValueRatio: 100.0,
        insuranceRequired: true,
        insuranceType: 'VA Funding Fee',
        annualInsuranceCost: 8050.00,
        monthlyInsuranceCost: 0.00,
        totalInsuranceCost: 8050.00
      }
    }
  ]
};
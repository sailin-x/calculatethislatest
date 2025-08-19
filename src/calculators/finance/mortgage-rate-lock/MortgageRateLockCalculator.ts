import { Calculator } from '../../../types/calculator';
import { calculateRateLockAnalysis, analyzeLockStrategies, calculateLockScenarios } from './formulas';
import { validateMortgageRateLockInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const mortgageRateLockCalculator: Calculator = {
  id: 'mortgage-rate-lock',
  title: 'Mortgage Rate Lock Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage rate lock costs, analyze lock strategies, and determine optimal lock periods to protect against rate increases during the loan process.',
  usageInstructions: 'Enter your loan details and rate lock information to analyze the costs and benefits of different rate lock strategies and determine the optimal approach for your situation.',
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'number',
      required: true,
      min: 50000,
      max: 10000000,
      step: 10000,
      tooltip: 'Total amount of the mortgage loan',
      placeholder: '300000',
      defaultValue: 300000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.125,
      tooltip: 'Current interest rate being locked',
      placeholder: '4.5',
      defaultValue: 4.5
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'select',
      required: true,
      options: [
        { value: '15', label: '15 Years' },
        { value: '20', label: '20 Years' },
        { value: '30', label: '30 Years' }
      ],
      tooltip: 'Length of the mortgage loan',
      defaultValue: '30'
    },
    {
      id: 'lockPeriod',
      label: 'Rate Lock Period (Days)',
      type: 'select',
      required: true,
      options: [
        { value: '15', label: '15 Days' },
        { value: '30', label: '30 Days' },
        { value: '45', label: '45 Days' },
        { value: '60', label: '60 Days' },
        { value: '90', label: '90 Days' },
        { value: '120', label: '120 Days' }
      ],
      tooltip: 'Number of days the rate is locked',
      defaultValue: '30'
    },
    {
      id: 'lockFee',
      label: 'Rate Lock Fee',
      type: 'number',
      required: false,
      min: 0,
      max: 5000,
      step: 50,
      tooltip: 'Fee charged for the rate lock (if any)',
      placeholder: '500',
      defaultValue: 500
    },
    {
      id: 'lockExtensionFee',
      label: 'Lock Extension Fee (per day)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 5,
      tooltip: 'Daily fee for extending the rate lock beyond the initial period',
      placeholder: '25',
      defaultValue: 25
    },
    {
      id: 'processingTime',
      label: 'Expected Processing Time (Days)',
      type: 'number',
      required: true,
      min: 7,
      max: 120,
      step: 1,
      tooltip: 'Expected number of days to complete loan processing',
      placeholder: '45',
      defaultValue: 45
    },
    {
      id: 'rateVolatility',
      label: 'Rate Volatility (Basis Points)',
      type: 'number',
      required: false,
      min: 0,
      max: 200,
      step: 5,
      tooltip: 'Expected rate volatility in basis points (1 basis point = 0.01%)',
      placeholder: '25',
      defaultValue: 25
    },
    {
      id: 'marketTrend',
      label: 'Market Rate Trend',
      type: 'select',
      required: false,
      options: [
        { value: 'rising', label: 'Rising' },
        { value: 'falling', label: 'Falling' },
        { value: 'stable', label: 'Stable' }
      ],
      tooltip: 'Expected direction of interest rates',
      defaultValue: 'stable'
    },
    {
      id: 'closingDate',
      label: 'Expected Closing Date',
      type: 'date',
      required: false,
      tooltip: 'Expected date of loan closing',
      placeholder: '2024-02-15'
    },
    {
      id: 'lockStartDate',
      label: 'Rate Lock Start Date',
      type: 'date',
      required: false,
      tooltip: 'Date when the rate lock begins',
      placeholder: '2024-01-15'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: false,
      options: [
        { value: 'primary', label: 'Primary Residence' },
        { value: 'secondary', label: 'Secondary Home' },
        { value: 'investment', label: 'Investment Property' }
      ],
      tooltip: 'Type of property being financed',
      defaultValue: 'primary'
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
      tooltip: 'Your credit score (affects rate lock terms)',
      placeholder: '750',
      defaultValue: 750
    },
    {
      id: 'downPayment',
      label: 'Down Payment Amount',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Amount of down payment (affects rate lock terms)',
      placeholder: '60000',
      defaultValue: 60000
    }
  ],
  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'Monthly mortgage payment at the locked rate'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'currency',
      format: 'USD',
      explanation: 'Total interest paid over the life of the loan'
    },
    {
      id: 'lockCost',
      label: 'Rate Lock Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Total cost of the rate lock including fees'
    },
    {
      id: 'potentialSavings',
      label: 'Potential Rate Increase Savings',
      type: 'currency',
      format: 'USD',
      explanation: 'Potential savings if rates increase during processing'
    },
    {
      id: 'breakEvenDays',
      label: 'Break-Even Days',
      type: 'number',
      format: 'decimal',
      explanation: 'Number of days for lock cost to break even with rate increase'
    },
    {
      id: 'riskAnalysis',
      label: 'Risk Analysis',
      type: 'text',
      format: 'markdown',
      explanation: 'Analysis of rate lock risks and benefits'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      format: 'markdown',
      explanation: 'Personalized recommendations for rate lock strategy'
    },
    {
      id: 'lockScenarios',
      label: 'Lock Scenarios',
      type: 'table',
      format: 'JSON',
      explanation: 'Comparison of different rate lock scenarios'
    }
  ],
  formulas: [
    {
      id: 'calculateRateLock',
      name: 'Calculate Rate Lock Analysis',
      description: 'Calculate rate lock costs, benefits, and break-even analysis',
      calculate: calculateRateLockAnalysis
    },
    {
      id: 'analyzeStrategies',
      name: 'Analyze Lock Strategies',
      description: 'Analyze different rate lock strategies and their effectiveness',
      calculate: analyzeLockStrategies
    },
    {
      id: 'calculateScenarios',
      name: 'Calculate Lock Scenarios',
      description: 'Generate different rate lock scenarios based on market conditions',
      calculate: calculateLockScenarios
    }
  ],
  validationRules: [
    {
      id: 'validateInputs',
      name: 'Validate Inputs',
      description: 'Validate all input values for reasonableness and business rules',
      validate: validateMortgageRateLockInputs
    }
  ],
  examples: [
    {
      title: 'Standard 30-Year Conventional Loan',
      description: 'Calculate rate lock analysis for a standard 30-year conventional mortgage',
      inputs: {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '30',
        lockFee: 500,
        lockExtensionFee: 25,
        processingTime: 45,
        rateVolatility: 25,
        marketTrend: 'rising',
        propertyType: 'primary',
        loanType: 'conventional',
        creditScore: 750,
        downPayment: 60000
      },
      expectedOutputs: {
        monthlyPayment: 1520,
        totalInterest: 247200,
        lockCost: 875,
        potentialSavings: 15000,
        breakEvenDays: 35
      }
    },
    {
      title: 'FHA Loan with Longer Lock',
      description: 'Calculate rate lock analysis for an FHA loan with a 60-day lock',
      inputs: {
        loanAmount: 250000,
        interestRate: 5.0,
        loanTerm: '30',
        lockPeriod: '60',
        lockFee: 750,
        lockExtensionFee: 30,
        processingTime: 60,
        rateVolatility: 30,
        marketTrend: 'stable',
        propertyType: 'primary',
        loanType: 'fha',
        creditScore: 680,
        downPayment: 8750
      },
      expectedOutputs: {
        monthlyPayment: 1342,
        totalInterest: 233120,
        lockCost: 750,
        potentialSavings: 12000,
        breakEvenDays: 40
      }
    },
    {
      title: 'Investment Property with High Volatility',
      description: 'Calculate rate lock analysis for an investment property in a volatile rate environment',
      inputs: {
        loanAmount: 400000,
        interestRate: 5.5,
        loanTerm: '30',
        lockPeriod: '90',
        lockFee: 1000,
        lockExtensionFee: 40,
        processingTime: 75,
        rateVolatility: 50,
        marketTrend: 'rising',
        propertyType: 'investment',
        loanType: 'conventional',
        creditScore: 720,
        downPayment: 80000
      },
      expectedOutputs: {
        monthlyPayment: 2271,
        totalInterest: 417560,
        lockCost: 1600,
        potentialSavings: 25000,
        breakEvenDays: 45
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};
import { Calculator } from '../../../types/calculator';
import { MortgageEquityInputs, MortgageEquityOutputs } from './types';
import { calculateMortgageEquity } from './formulas';
import { validateMortgageEquityInputs, validateMortgageEquityBusinessRules } from './validation';

export const MortgageEquityCalculator: Calculator = {
  id: 'MortgageEquityCalculator',
  title: 'Mortgage Equity Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate current equity position, project equity growth over time, analyze cash flow, and assess investment risk for mortgage properties.',
  usageInstructions: [
    'Enter current property value and loan balance',
    'Input loan details and payment history',
    'Specify appreciation rates and market conditions',
    'Include rental income and operating expenses',
    'Review equity growth projections and risk assessment'
  ],

  inputs: [
    {
      id: 'propertyValue',
      label: 'Current Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market value of the property'
    },
    {
      id: 'loanBalance',
      label: 'Current Loan Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Remaining loan balance'
    },
    {
      id: 'originalLoanAmount',
      label: 'Original Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Original loan amount borrowed'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly mortgage payment amount'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Annual interest rate'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Original loan term in years'
    },
    {
      id: 'monthsPaid',
      label: 'Months Paid',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Number of months payments have been made'
    },
    {
      id: 'propertyAppreciationRate',
      label: 'Annual Property Appreciation (%)',
      type: 'percentage',
      required: false,
      min: -20,
      max: 50,
      step: 0.5,
      defaultValue: 3,
      tooltip: 'Expected annual property value increase'
    },
    {
      id: 'marketGrowthRate',
      label: 'Market Growth Rate (%)',
      type: 'percentage',
      required: false,
      min: -20,
      max: 50,
      step: 0.5,
      defaultValue: 3,
      tooltip: 'Overall market growth rate'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 30,
      defaultValue: 10,
      tooltip: 'Period for equity growth analysis'
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual property tax amount'
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual homeowners insurance premium'
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly homeowners association fees'
    },
    {
      id: 'maintenanceCosts',
      label: 'Monthly Maintenance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly maintenance and repair costs'
    },
    {
      id: 'vacancyRate',
      label: 'Vacancy Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 5,
      tooltip: 'Expected percentage of time property is vacant'
    },
    {
      id: 'propertyManagementFee',
      label: 'Property Management Fee (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      step: 0.5,
      defaultValue: 8,
      tooltip: 'Percentage paid to property management'
    },
    {
      id: 'rentalIncome',
      label: 'Monthly Rental Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly rental income from property'
    }
  ],

  outputs: [
    {
      id: 'currentEquity',
      label: 'Current Equity',
      type: 'currency',
      explanation: 'Current equity position in the property'
    },
    {
      id: 'equityPercentage',
      label: 'Equity Percentage',
      type: 'percentage',
      explanation: 'Equity as percentage of property value'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio',
      type: 'percentage',
      explanation: 'Loan balance as percentage of property value'
    },
    {
      id: 'equityGrowth',
      label: 'Equity Growth Projection',
      type: 'text',
      explanation: 'Projected equity growth over analysis period'
    },
    {
      id: 'equityBuildUp',
      label: 'Equity Build-Up',
      type: 'text',
      explanation: 'Breakdown of how equity is built through principal and appreciation'
    },
    {
      id: 'cashFlowAnalysis',
      label: 'Cash Flow Analysis',
      type: 'text',
      explanation: 'Monthly and annual cash flow analysis'
    },
    {
      id: 'breakevenAnalysis',
      label: 'Breakeven Analysis',
      type: 'text',
      explanation: 'Time required to break even on investment'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Overall risk assessment and recommendations'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Primary Residence Equity Analysis',
      description: 'Equity analysis for a paid-off primary residence with appreciation',
      inputs: {
        propertyValue: 400000,
        loanBalance: 200000,
        originalLoanAmount: 300000,
        monthlyPayment: 1600,
        interestRate: 4.5,
        loanTerm: 30,
        monthsPaid: 120,
        propertyAppreciationRate: 4,
        marketGrowthRate: 3,
        analysisPeriod: 10,
        propertyTaxes: 4800,
        homeownersInsurance: 1200,
        hoaFees: 0,
        maintenanceCosts: 200,
        vacancyRate: 0,
        propertyManagementFee: 0,
        rentalIncome: 0
      },
      expectedOutputs: {
        currentEquity: 200000,
        equityPercentage: 50,
        loanToValueRatio: 50
      }
    },
    {
      title: 'Investment Property Cash Flow Analysis',
      description: 'Equity and cash flow analysis for a rental investment property',
      inputs: {
        propertyValue: 350000,
        loanBalance: 280000,
        originalLoanAmount: 280000,
        monthlyPayment: 1800,
        interestRate: 5.25,
        loanTerm: 30,
        monthsPaid: 24,
        propertyAppreciationRate: 3.5,
        marketGrowthRate: 2.5,
        analysisPeriod: 15,
        propertyTaxes: 4200,
        homeownersInsurance: 1400,
        hoaFees: 150,
        maintenanceCosts: 300,
        vacancyRate: 8,
        propertyManagementFee: 9,
        rentalIncome: 2800
      },
      expectedOutputs: {
        currentEquity: 70000,
        equityPercentage: 20,
        loanToValueRatio: 80
      }
    }
  ]
};
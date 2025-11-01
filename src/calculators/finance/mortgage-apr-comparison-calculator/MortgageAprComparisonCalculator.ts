import { Calculator } from '../../../types/calculator';
import { MortgageAprComparisonInputs, MortgageAprComparisonOutputs } from './types';
import {
  calculateMortgageAprComparison,
  calculateAprComparison,
  calculateRecommendedLoan,
  calculateCostBreakdown,
  calculateSensitivityAnalysis
} from './formulas';
import { validateMortgageAprComparisonInputs, validateMortgageAprComparisonBusinessRules } from './validation';

export const MortgageAprComparisonCalculator: Calculator = {
  id: 'MortgageAprComparisonCalculator',
  title: 'Mortgage APR Comparison Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Compare APR rates across different mortgage types including fixed-rate, ARM, FHA, VA, and conventional loans to find the best financing option.',
  usageInstructions: [
    'Enter loan amount and property details',
    'Input current market interest rates',
    'Specify closing costs and fees',
    'Review APR comparison across loan types',
    'Analyze break-even points and total costs',
    'Consider sensitivity analysis for rate changes'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total loan amount requested'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Length of the loan in years'
    },
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market value of the property'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      tooltip: 'Your FICO credit score'
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
      tooltip: 'Type of mortgage loan'
    },
    {
      id: 'propertyState',
      label: 'Property State',
      type: 'text',
      required: true,
      tooltip: 'State where the property is located'
    },
    {
      id: 'propertyZipCode',
      label: 'Property ZIP Code',
      type: 'text',
      required: true,
      tooltip: 'ZIP code of the property'
    },
    {
      id: 'firstTimeHomebuyer',
      label: 'First-Time Homebuyer',
      type: 'boolean',
      required: false,
      tooltip: 'Are you a first-time homebuyer?'
    },
    {
      id: 'veteranStatus',
      label: 'Veteran Status',
      type: 'boolean',
      required: false,
      tooltip: 'Are you a veteran (for VA loans)?'
    },
    {
      id: 'currentMarketRates.30_year_fixed',
      label: '30-Year Fixed Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Current 30-year fixed mortgage rate'
    },
    {
      id: 'currentMarketRates.15_year_fixed',
      label: '15-Year Fixed Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Current 15-year fixed mortgage rate'
    },
    {
      id: 'currentMarketRates.5_1_arm',
      label: '5/1 ARM Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Current 5/1 ARM mortgage rate'
    },
    {
      id: 'currentMarketRates.7_1_arm',
      label: '7/1 ARM Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Current 7/1 ARM mortgage rate'
    },
    {
      id: 'currentMarketRates.10_1_arm',
      label: '10/1 ARM Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Current 10/1 ARM mortgage rate'
    },
    {
      id: 'closingCosts.originationFees',
      label: 'Origination Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Loan origination fees'
    },
    {
      id: 'closingCosts.appraisalFee',
      label: 'Appraisal Fee ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Property appraisal fee'
    },
    {
      id: 'closingCosts.titleInsurance',
      label: 'Title Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Title insurance premium'
    },
    {
      id: 'closingCosts.escrowFees',
      label: 'Escrow Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Escrow service fees'
    },
    {
      id: 'closingCosts.otherFees',
      label: 'Other Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Other closing costs and fees'
    },
    {
      id: 'discountPoints',
      label: 'Discount Points',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      step: 0.5,
      tooltip: 'Number of discount points purchased'
    },
    {
      id: 'lenderCredits',
      label: 'Lender Credits ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Credits provided by the lender'
    }
  ],

  outputs: [
    {
      id: 'aprComparison',
      label: 'APR Comparison',
      type: 'text',
      explanation: 'Comparison of APR rates across different loan types'
    },
    {
      id: 'recommendedLoan',
      label: 'Recommended Loan',
      type: 'text',
      explanation: 'Recommended loan option based on total cost analysis'
    },
    {
      id: 'costBreakdown',
      label: 'Cost Breakdown',
      type: 'text',
      explanation: 'Detailed breakdown of loan costs'
    },
    {
      id: 'sensitivityAnalysis',
      label: 'Sensitivity Analysis',
      type: 'text',
      explanation: 'Impact of interest rate changes on payments and costs'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Conventional 30-Year vs 15-Year Fixed',
      description: 'Compare 30-year and 15-year fixed rate mortgages for a conventional loan',
      inputs: {
        loanAmount: 300000,
        loanTerm: 30,
        propertyValue: 400000,
        creditScore: 750,
        loanType: 'conventional',
        propertyState: 'CA',
        propertyZipCode: '90210',
        firstTimeHomebuyer: false,
        veteranStatus: false,
        currentMarketRates: {
          '30_year_fixed': 6.75,
          '15_year_fixed': 6.0,
          '5_1_arm': 6.25,
          '7_1_arm': 6.375,
          '10_1_arm': 6.5
        },
        closingCosts: {
          originationFees: 3000,
          appraisalFee: 600,
          titleInsurance: 1200,
          escrowFees: 800,
          otherFees: 500
        },
        discountPoints: 1,
        lenderCredits: 0
      },
      expectedOutputs: {
        aprComparison: [
          {
            loanType: '30 Year Fixed',
            interestRate: 6.75,
            apr: 6.85,
            monthlyPayment: 1950,
            totalPayments: 702000,
            totalInterest: 402000,
            totalCost: 708000,
            breakEvenPoint: 48
          },
          {
            loanType: '15 Year Fixed',
            interestRate: 6.0,
            apr: 6.15,
            monthlyPayment: 2550,
            totalPayments: 459000,
            totalInterest: 159000,
            totalCost: 465000,
            breakEvenPoint: 24
          }
        ],
        recommendedLoan: {
          loanType: '15 Year Fixed',
          reason: 'Lowest total cost over 15 years',
          savings: 243000
        },
        costBreakdown: {
          principal: 300000,
          interest: 402000,
          fees: 6000,
          total: 708000
        }
      }
    }
  ]
};
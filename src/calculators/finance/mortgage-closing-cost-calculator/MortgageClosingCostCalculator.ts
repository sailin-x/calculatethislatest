import { Calculator } from '../../../types/calculator';
import { MortgageClosingCostInputs, MortgageClosingCostOutputs } from './types';
import { calculateMortgageClosingCosts } from './formulas';
import { validateMortgageClosingCostInputs, validateMortgageClosingCostBusinessRules } from './validation';

export const MortgageClosingCostCalculator: Calculator = {
  id: 'MortgageClosingCostCalculator',
  title: 'Mortgage Closing Cost Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate all closing costs associated with a mortgage including lender fees, third-party fees, prepaid items, and escrow deposits.',
  usageInstructions: [
    'Enter loan and property details',
    'Input all closing cost components',
    'Specify discount points and lender credits',
    'Review total closing costs and cash to close',
    'Compare different scenarios and affordability'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total loan amount'
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
      id: 'propertyCounty',
      label: 'Property County',
      type: 'text',
      required: true,
      tooltip: 'County where the property is located'
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
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      tooltip: 'Your FICO credit score'
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
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Down payment amount'
    },
    {
      id: 'earnestMoneyDeposit',
      label: 'Earnest Money Deposit ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Earnest money deposit'
    },
    {
      id: 'cashReserves',
      label: 'Cash Reserves ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Cash reserves required'
    },
    {
      id: 'sellerConcessions',
      label: 'Seller Concessions ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Concessions paid by seller'
    },
    {
      id: 'originationFees',
      label: 'Origination Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Loan origination fees'
    },
    {
      id: 'appraisalFee',
      label: 'Appraisal Fee ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Property appraisal fee'
    },
    {
      id: 'titleInsurance',
      label: 'Title Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Title insurance premium'
    },
    {
      id: 'escrowFees',
      label: 'Escrow Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Escrow service fees'
    },
    {
      id: 'recordingFees',
      label: 'Recording Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Document recording fees'
    },
    {
      id: 'transferTaxes',
      label: 'Transfer Taxes ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Property transfer taxes'
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
      id: 'floodInsurance',
      label: 'Annual Flood Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual flood insurance premium'
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
      id: 'prepaidInterest',
      label: 'Prepaid Interest ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Interest paid in advance'
    },
    {
      id: 'otherFees',
      label: 'Other Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Other closing costs and fees'
    }
  ],

  outputs: [
    {
      id: 'totalClosingCosts',
      label: 'Total Closing Costs',
      type: 'currency',
      explanation: 'Sum of all closing costs'
    },
    {
      id: 'lenderFees',
      label: 'Lender Fees',
      type: 'currency',
      explanation: 'Fees charged by the lender'
    },
    {
      id: 'thirdPartyFees',
      label: 'Third-Party Fees',
      type: 'currency',
      explanation: 'Fees for third-party services'
    },
    {
      id: 'prepaidItems',
      label: 'Prepaid Items',
      type: 'currency',
      explanation: 'Items paid in advance'
    },
    {
      id: 'escrowDeposits',
      label: 'Escrow Deposits',
      type: 'currency',
      explanation: 'Funds deposited into escrow'
    },
    {
      id: 'totalCashToClose',
      label: 'Total Cash to Close',
      type: 'currency',
      explanation: 'Total cash required at closing'
    },
    {
      id: 'cashFromBorrower',
      label: 'Cash from Borrower',
      type: 'currency',
      explanation: 'Cash required from the borrower'
    },
    {
      id: 'cashFromSeller',
      label: 'Cash from Seller',
      type: 'currency',
      explanation: 'Cash provided by seller concessions'
    },
    {
      id: 'costBreakdown',
      label: 'Cost Breakdown',
      type: 'text',
      explanation: 'Detailed breakdown of all costs'
    },
    {
      id: 'affordabilityAnalysis',
      label: 'Affordability Analysis',
      type: 'text',
      explanation: 'Analysis of payment affordability'
    },
    {
      id: 'comparisonScenarios',
      label: 'Comparison Scenarios',
      type: 'text',
      explanation: 'Comparison of different cost scenarios'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Conventional 30-Year Fixed Loan',
      description: 'Standard closing costs for a conventional 30-year fixed rate mortgage',
      inputs: {
        loanAmount: 300000,
        propertyValue: 400000,
        loanType: 'conventional',
        propertyState: 'CA',
        propertyCounty: 'Los Angeles',
        propertyZipCode: '90210',
        firstTimeHomebuyer: false,
        veteranStatus: false,
        creditScore: 750,
        loanTerm: 30,
        interestRate: 6.75,
        discountPoints: 1,
        lenderCredits: 0,
        downPayment: 100000,
        earnestMoneyDeposit: 5000,
        cashReserves: 2000,
        sellerConcessions: 3000,
        originationFees: 1500,
        appraisalFee: 600,
        titleInsurance: 1200,
        escrowFees: 800,
        recordingFees: 150,
        transferTaxes: 2400,
        homeownersInsurance: 1200,
        floodInsurance: 0,
        propertyTaxes: 4800,
        prepaidInterest: 1687.50,
        otherFees: 500
      },
      expectedOutputs: {
        totalClosingCosts: 12537.50,
        lenderFees: 3250,
        thirdPartyFees: 5150,
        prepaidItems: 4687.50,
        escrowDeposits: 200,
        totalCashToClose: 103537.50,
        cashFromBorrower: 103537.50,
        cashFromSeller: 3000
      }
    }
  ]
};
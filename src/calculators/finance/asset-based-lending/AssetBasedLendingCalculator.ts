import { Calculator } from '../../../types/calculator';
import { AssetBasedLendingInputs, AssetBasedLendingOutputs } from './types';
import {
  calculateMaximumLoanAmount,
  calculateAvailableCredit,
  calculateBorrowingBase,
  calculateLoanToValueRatio,
  calculateMonthlyPayment,
  calculateTotalInterestPaid,
  calculateDebtServiceCoverageRatio,
  calculateRiskRating,
  calculateLiquidityRatio,
  calculateCollateralCoverageRatio,
  calculateNetIncome,
  calculateCashFlowAvailable
} from './formulas';
import { validateAssetBasedLendingInputs, validateAssetBasedLendingBusinessRules } from './validation';

export const AssetBasedLendingCalculator: Calculator = {
  id: 'AssetBasedLendingCalculator',
  title: 'Asset-Based Lending Calculator',
  category: 'finance',
  subcategory: 'Business & Commercial Lending',
  description: 'Calculate borrowing capacity and loan terms for asset-based lending using accounts receivable, inventory, equipment, real estate, and securities as collateral. Includes risk assessment and cash flow analysis.',
  usageInstructions: [
    'Enter total asset value and select asset type',
    'Specify advance rate and outstanding debt',
    'Input interest rate and loan term details',
    'Provide monthly revenue and expense information',
    'Select credit rating and industry',
    'Review borrowing capacity and risk analysis'
  ],

  inputs: [
    {
      id: 'totalAssetValue',
      label: 'Total Asset Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000000,
      tooltip: 'Total value of assets to be used as collateral'
    },
    {
      id: 'assetType',
      label: 'Asset Type',
      type: 'select',
      required: true,
      options: [
        { value: 'accounts_receivable', label: 'Accounts Receivable' },
        { value: 'inventory', label: 'Inventory' },
        { value: 'equipment', label: 'Equipment' },
        { value: 'real_estate', label: 'Real Estate' },
        { value: 'securities', label: 'Securities' }
      ],
      tooltip: 'Type of assets being used as collateral'
    },
    {
      id: 'advanceRate',
      label: 'Advance Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 70,
      tooltip: 'Percentage of asset value that can be borrowed'
    },
    {
      id: 'borrowingBase',
      label: 'Borrowing Base ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Calculated borrowing base (asset value × advance rate)'
    },
    {
      id: 'outstandingDebt',
      label: 'Outstanding Debt ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current outstanding debt against these assets'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.25,
      defaultValue: 8,
      tooltip: 'Annual interest rate for the loan'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      defaultValue: 5,
      tooltip: 'Length of the loan in years'
    },
    {
      id: 'monthlyRevenue',
      label: 'Monthly Revenue ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly gross revenue'
    },
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly operating expenses'
    },
    {
      id: 'debtServiceCoverageRatio',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      required: false,
      min: 0,
      step: 0.1,
      tooltip: 'Ratio of cash available to required debt payments'
    },
    {
      id: 'collateralCoverageRatio',
      label: 'Collateral Coverage Ratio',
      type: 'number',
      required: false,
      min: 0,
      step: 0.1,
      tooltip: 'Ratio of collateral value to loan amount'
    },
    {
      id: 'industry',
      label: 'Industry',
      type: 'select',
      required: true,
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'retail', label: 'Retail' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'finance', label: 'Finance' },
        { value: 'construction', label: 'Construction' }
      ],
      tooltip: 'Primary industry of the business'
    },
    {
      id: 'creditRating',
      label: 'Credit Rating',
      type: 'select',
      required: true,
      options: [
        { value: 'AAA', label: 'AAA (Highest Quality)' },
        { value: 'AA', label: 'AA (High Quality)' },
        { value: 'A', label: 'A (Upper Medium Grade)' },
        { value: 'BBB', label: 'BBB (Lower Medium Grade)' },
        { value: 'BB', label: 'BB (Speculative)' },
        { value: 'B', label: 'B (Highly Speculative)' },
        { value: 'CCC', label: 'CCC (Substantial Risk)' }
      ],
      tooltip: 'Business credit rating'
    }
  ],

  outputs: [
    {
      id: 'maximumLoanAmount',
      label: 'Maximum Loan Amount',
      type: 'currency',
      explanation: 'Maximum amount that can be borrowed based on assets'
    },
    {
      id: 'availableCredit',
      label: 'Available Credit',
      type: 'currency',
      explanation: 'Credit available after accounting for outstanding debt'
    },
    {
      id: 'borrowingBaseValue',
      label: 'Borrowing Base Value',
      type: 'currency',
      explanation: 'Value of assets eligible for borrowing'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      explanation: 'Loan amount as percentage of total asset value'
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
      id: 'debtServiceCoverageRatio',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      explanation: 'Ability to pay current debt obligations'
    },
    {
      id: 'riskRating',
      label: 'Risk Rating (0-100)',
      type: 'number',
      explanation: 'Overall risk assessment score'
    },
    {
      id: 'liquidityRatio',
      label: 'Liquidity Ratio',
      type: 'number',
      explanation: 'Ratio of revenue to expenses'
    },
    {
      id: 'collateralCoverageRatio',
      label: 'Collateral Coverage Ratio',
      type: 'number',
      explanation: 'Collateral value relative to loan amount'
    },
    {
      id: 'netIncome',
      label: 'Monthly Net Income',
      type: 'currency',
      explanation: 'Monthly profit after expenses'
    },
    {
      id: 'cashFlowAvailable',
      label: 'Cash Flow Available',
      type: 'currency',
      explanation: 'Cash available after debt payments'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Manufacturing Company A/R Financing',
      description: 'Asset-based loan secured by accounts receivable for a manufacturing company',
      inputs: {
        totalAssetValue: 2000000,
        assetType: 'accounts_receivable',
        advanceRate: 80,
        borrowingBase: 1600000,
        outstandingDebt: 500000,
        interestRate: 7.5,
        loanTerm: 3,
        monthlyRevenue: 250000,
        monthlyExpenses: 180000,
        debtServiceCoverageRatio: 1.8,
        collateralCoverageRatio: 2.5,
        industry: 'manufacturing',
        creditRating: 'BBB'
      },
      expectedOutputs: {
        maximumLoanAmount: 1100000,
        availableCredit: 1100000,
        borrowingBaseValue: 1600000,
        loanToValueRatio: 55,
        monthlyPayment: 34667,
        totalInterestPaid: 248000,
        debtServiceCoverageRatio: 1.8,
        riskRating: 72,
        liquidityRatio: 1.39,
        collateralCoverageRatio: 2.5,
        netIncome: 70000,
        cashFlowAvailable: 35333
      }
    },
    {
      title: 'Retail Inventory Financing',
      description: 'Inventory-based financing for a retail business',
      inputs: {
        totalAssetValue: 800000,
        assetType: 'inventory',
        advanceRate: 50,
        borrowingBase: 400000,
        outstandingDebt: 150000,
        interestRate: 9,
        loanTerm: 2,
        monthlyRevenue: 120000,
        monthlyExpenses: 95000,
        debtServiceCoverageRatio: 1.4,
        collateralCoverageRatio: 1.6,
        industry: 'retail',
        creditRating: 'BB'
      },
      expectedOutputs: {
        maximumLoanAmount: 250000,
        availableCredit: 250000,
        borrowingBaseValue: 400000,
        loanToValueRatio: 31.25,
        monthlyPayment: 11333,
        totalInterestPaid: 72000,
        debtServiceCoverageRatio: 1.4,
        riskRating: 58,
        liquidityRatio: 1.26,
        collateralCoverageRatio: 1.6,
        netIncome: 25000,
        cashFlowAvailable: 13667
      }
    }
  ]
};
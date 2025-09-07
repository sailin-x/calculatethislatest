import { Calculator } from '../../../types/calculator';
import { LoanToCostInputs, LoanToCostOutputs } from './types';
import {
  calculateLoanToCostRatio,
  calculateEquityContribution,
  calculateEquityPercentage,
  calculateLeverageRatio,
  calculateCostBreakdown,
  calculateCostPerSquareFoot,
  calculateCostVariance,
  calculateLoanPercentage,
  calculateInterestExpense,
  calculateTotalLoanCost,
  calculateConstructionCashFlow,
  calculateMonthlyInterestExpense,
  calculateTotalInterestExpense,
  calculateRiskScore,
  calculateProbabilityOfCompletion,
  calculateProbabilityOfDefault,
  calculateExpectedLoss,
  calculateExpectedProfit,
  calculateProfitMargin,
  calculateReturnOnEquity,
  calculateReturnOnCost,
  calculateSensitivityMatrix,
  calculateScenarios,
  calculateIndustryBenchmarks,
  generateLoanToCostAnalysis
} from './formulas';
import { validateLoanToCostInputs, validateLoanToCostBusinessRules } from './validation';

export const LoanToCostCalculator: Calculator = {
  id: 'loan-to-cost-calculator',
  title: 'Loan-to-Cost (LTC) Ratio Calculator',
  category: 'finance',
  subcategory: 'Real Estate',
  description: 'Calculate loan-to-cost ratios and analyze real estate project financing with comprehensive risk assessment and profitability analysis.',
  usageInstructions: [
    'Enter project details including costs and loan information',
    'Specify borrower qualifications and market conditions',
    'Review LTC ratio and risk assessment results',
    'Analyze profitability and return metrics',
    'Use sensitivity analysis for scenario planning'
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
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      tooltip: 'Annual interest rate on the loan'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Term of the loan in years'
    },
    {
      id: 'totalProjectCost',
      label: 'Total Project Cost ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total cost of the entire project'
    },
    {
      id: 'landCost',
      label: 'Land Cost ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Cost of the land acquisition'
    },
    {
      id: 'constructionCost',
      label: 'Construction Cost ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Cost of construction and building'
    },
    {
      id: 'softCosts',
      label: 'Soft Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Architectural, engineering, and permit fees'
    },
    {
      id: 'contingencyCost',
      label: 'Contingency Cost ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Reserve for unexpected costs'
    },
    {
      id: 'projectSize',
      label: 'Project Size (sq ft)',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Total square footage of the project'
    },
    {
      id: 'borrowerEquity',
      label: 'Borrower Equity ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Equity contribution from the borrower'
    },
    {
      id: 'borrowerCreditScore',
      label: 'Borrower Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      tooltip: 'FICO credit score of the borrower'
    },
    {
      id: 'constructionDuration',
      label: 'Construction Duration (Months)',
      type: 'number',
      required: true,
      min: 1,
      max: 36,
      tooltip: 'Expected construction timeline'
    },
    {
      id: 'expectedExitValue',
      label: 'Expected Exit Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Expected sale or refinance value'
    },
    {
      id: 'exitTimeline',
      label: 'Exit Timeline (Months)',
      type: 'number',
      required: true,
      min: 1,
      tooltip: 'Time to project completion and exit'
    },
    {
      id: 'marketGrowthRate',
      label: 'Market Growth Rate (%)',
      type: 'percentage',
      required: true,
      min: -20,
      max: 50,
      tooltip: 'Annual market growth rate'
    }
  ],

  outputs: [
    {
      id: 'loanToCostRatio',
      label: 'Loan-to-Cost Ratio (%)',
      type: 'percentage',
      explanation: 'Percentage of total project cost financed by the loan'
    },
    {
      id: 'equityContribution',
      label: 'Equity Contribution ($)',
      type: 'currency',
      explanation: 'Amount of equity required from borrower'
    },
    {
      id: 'equityPercentage',
      label: 'Equity Percentage (%)',
      type: 'percentage',
      explanation: 'Percentage of project cost provided as equity'
    },
    {
      id: 'leverageRatio',
      label: 'Leverage Ratio',
      type: 'number',
      explanation: 'Ratio of loan amount to equity contribution'
    },
    {
      id: 'riskScore',
      label: 'Risk Score (0-400)',
      type: 'number',
      explanation: 'Overall project risk assessment score'
    },
    {
      id: 'expectedProfit',
      label: 'Expected Profit ($)',
      type: 'currency',
      explanation: 'Projected profit from the project'
    },
    {
      id: 'profitMargin',
      label: 'Profit Margin (%)',
      type: 'percentage',
      explanation: 'Profit as percentage of total project cost'
    },
    {
      id: 'returnOnEquity',
      label: 'Return on Equity (%)',
      type: 'percentage',
      explanation: 'Return on borrower equity investment'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Residential Development Project',
      description: 'A $2M residential development with construction loan',
      inputs: {
        loanAmount: 1500000,
        interestRate: 7.5,
        loanTerm: 24,
        totalProjectCost: 2000000,
        landCost: 400000,
        constructionCost: 1200000,
        softCosts: 300000,
        contingencyCost: 100000,
        projectSize: 10000,
        borrowerEquity: 500000,
        borrowerCreditScore: 750,
        constructionDuration: 18,
        expectedExitValue: 2800000,
        exitTimeline: 24,
        marketGrowthRate: 4
      },
      expectedOutputs: {
        loanToCostRatio: 75,
        equityContribution: 500000,
        equityPercentage: 25,
        leverageRatio: 3,
        riskScore: 50,
        expectedProfit: 800000,
        profitMargin: 40,
        returnOnEquity: 160
      }
    },
    {
      title: 'Commercial Office Building',
      description: 'A $5M commercial office building project',
      inputs: {
        loanAmount: 3750000,
        interestRate: 6.25,
        loanTerm: 36,
        totalProjectCost: 5000000,
        landCost: 1000000,
        constructionCost: 3200000,
        softCosts: 600000,
        contingencyCost: 200000,
        projectSize: 50000,
        borrowerEquity: 1250000,
        borrowerCreditScore: 800,
        constructionDuration: 24,
        expectedExitValue: 6500000,
        exitTimeline: 36,
        marketGrowthRate: 3
      },
      expectedOutputs: {
        loanToCostRatio: 75,
        equityContribution: 1250000,
        equityPercentage: 25,
        leverageRatio: 3,
        riskScore: 25,
        expectedProfit: 1500000,
        profitMargin: 30,
        returnOnEquity: 120
      }
    }
  ]
};
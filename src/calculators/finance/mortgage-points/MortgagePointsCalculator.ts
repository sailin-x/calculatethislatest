import { Calculator } from '../../types/calculator';
import { MortgagePointsInputs, MortgagePointsOutputs } from './types';
import {
  calculateTotalPoints,
  calculateTotalPointCost,
  calculatePointValue,
  calculateEffectiveRate,
  calculateMonthlyPayment,
  calculateMonthlyPaymentSavings,
  calculateAnnualPaymentSavings,
  calculateTotalPaymentSavings,
  calculateTotalInterestPaid,
  calculateInterestSavings,
  calculateInterestSavingsPercentage,
  calculateTotalCost,
  calculateNetSavings,
  calculateBreakEvenPoint,
  calculateBreakEvenMonths,
  calculateBreakEvenYears,
  calculateTaxDeduction,
  calculateAfterTaxCost,
  calculateAfterTaxSavings,
  calculateReturnOnInvestment,
  calculatePaybackPeriod,
  calculateNetPresentValue,
  calculateInternalRateOfReturn,
  calculateComparisonAnalysis,
  calculateSensitivityMatrix,
  calculateScenarios,
  calculateAmortizationComparison,
  calculateRiskScore,
  calculateProbabilityOfBenefit,
  calculateWorstCaseScenario,
  calculateBestCaseScenario,
  generateMortgagePointsAnalysis
} from './formulas';
import { validateMortgagePointsInputs, validateMortgagePointsBusinessRules } from './validation';

export const MortgagePointsCalculator: Calculator = {
  id: 'mortgage-points-calculator',
  title: 'Mortgage Points Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Analyze the cost-benefit of buying discount points to lower your mortgage interest rate. Calculate break-even periods, ROI, and tax implications.',
  usageInstructions: [
    'Enter loan amount, interest rate, and term',
    'Specify number of discount and origination points',
    'Input point cost and borrower information',
    'Review break-even analysis and ROI calculations',
    'Consider tax implications and risk factors',
    'Compare scenarios with and without points'
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
      id: 'baseInterestRate',
      label: 'Base Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Interest rate without points'
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
      id: 'discountPoints',
      label: 'Discount Points',
      type: 'number',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      tooltip: 'Number of discount points purchased'
    },
    {
      id: 'originationPoints',
      label: 'Origination Points',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      step: 0.5,
      tooltip: 'Number of origination points'
    },
    {
      id: 'pointCost',
      label: 'Cost Per Point ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Cost of each point'
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
      id: 'borrowerIncome',
      label: 'Annual Borrower Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual gross income'
    },
    {
      id: 'borrowerCreditScore',
      label: 'Borrower Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      tooltip: 'FICO credit score'
    },
    {
      id: 'borrowerTaxRate',
      label: 'Borrower Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      tooltip: 'Marginal tax rate for tax deductions'
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
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' }
      ],
      tooltip: 'Type of mortgage loan'
    },
    {
      id: 'marketCondition',
      label: 'Market Condition',
      type: 'select',
      required: false,
      options: [
        { value: 'declining', label: 'Declining' },
        { value: 'stable', label: 'Stable' },
        { value: 'growing', label: 'Growing' },
        { value: 'hot', label: 'Hot' }
      ],
      tooltip: 'Current real estate market condition'
    },
    {
      id: 'marketGrowthRate',
      label: 'Market Growth Rate (%)',
      type: 'percentage',
      required: false,
      min: -20,
      max: 50,
      tooltip: 'Annual market growth rate'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 30,
      defaultValue: 5,
      tooltip: 'Period for financial analysis'
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 25,
      defaultValue: 8,
      tooltip: 'Rate used for NPV calculations'
    }
  ],

  outputs: [
    {
      id: 'totalPoints',
      label: 'Total Points',
      type: 'number',
      explanation: 'Total number of discount and origination points'
    },
    {
      id: 'totalPointCost',
      label: 'Total Point Cost',
      type: 'currency',
      explanation: 'Total cost of all points purchased'
    },
    {
      id: 'effectiveRate',
      label: 'Effective Interest Rate',
      type: 'percentage',
      explanation: 'Interest rate after accounting for points'
    },
    {
      id: 'monthlyPaymentSavings',
      label: 'Monthly Payment Savings',
      type: 'currency',
      explanation: 'Monthly savings from lower interest rate'
    },
    {
      id: 'interestSavings',
      label: 'Total Interest Savings',
      type: 'currency',
      explanation: 'Total interest savings over loan term'
    },
    {
      id: 'breakEvenMonths',
      label: 'Break-Even Period',
      type: 'number',
      explanation: 'Months to recover point cost through savings'
    },
    {
      id: 'returnOnInvestment',
      label: 'Return on Investment',
      type: 'percentage',
      explanation: 'Annual ROI from purchasing points'
    },
    {
      id: 'netPresentValue',
      label: 'Net Present Value',
      type: 'currency',
      explanation: 'Present value of future savings minus point cost'
    },
    {
      id: 'netSavings',
      label: 'Net Savings',
      type: 'currency',
      explanation: 'Total savings after point cost'
    },
    {
      id: 'afterTaxCost',
      label: 'After-Tax Point Cost',
      type: 'currency',
      explanation: 'Point cost after tax deduction'
    },
    {
      id: 'probabilityOfBenefit',
      label: 'Probability of Benefit',
      type: 'percentage',
      explanation: 'Likelihood of realizing savings'
    },
    {
      id: 'riskScore',
      label: 'Risk Score (0-100)',
      type: 'number',
      explanation: 'Overall risk assessment score'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: '2-Point Purchase on 30-Year Fixed',
      description: 'Purchasing 2 discount points on a $400,000 loan at 7% interest',
      inputs: {
        loanAmount: 400000,
        baseInterestRate: 7.0,
        loanTerm: 30,
        discountPoints: 2,
        originationPoints: 0,
        pointCost: 2000,
        propertyValue: 500000,
        borrowerIncome: 100000,
        borrowerCreditScore: 750,
        borrowerTaxRate: 25,
        loanType: 'conventional',
        marketCondition: 'stable',
        marketGrowthRate: 3,
        analysisPeriod: 10,
        discountRate: 8
      },
      expectedOutputs: {
        totalPoints: 2,
        totalPointCost: 4000,
        effectiveRate: 6.5,
        monthlyPaymentSavings: 132,
        interestSavings: 47520,
        breakEvenMonths: 30,
        returnOnInvestment: 1188,
        netPresentValue: 32000,
        netSavings: 43520,
        afterTaxCost: 3000,
        probabilityOfBenefit: 0.95,
        riskScore: 15
      }
    },
    {
      title: '1-Point Purchase on 15-Year Fixed',
      description: 'Purchasing 1 discount point on a $300,000 loan at 6% interest',
      inputs: {
        loanAmount: 300000,
        baseInterestRate: 6.0,
        loanTerm: 15,
        discountPoints: 1,
        originationPoints: 0,
        pointCost: 1500,
        propertyValue: 400000,
        borrowerIncome: 80000,
        borrowerCreditScore: 720,
        borrowerTaxRate: 22,
        loanType: 'conventional',
        marketCondition: 'growing',
        marketGrowthRate: 4,
        analysisPeriod: 7,
        discountRate: 7
      },
      expectedOutputs: {
        totalPoints: 1,
        totalPointCost: 1500,
        effectiveRate: 5.75,
        monthlyPaymentSavings: 45,
        interestSavings: 8100,
        breakEvenMonths: 33,
        returnOnInvestment: 540,
        netPresentValue: 6500,
        netSavings: 6600,
        afterTaxCost: 1170,
        probabilityOfBenefit: 0.9,
        riskScore: 20
      }
    },
    {
      title: '3-Point Purchase - High Risk Scenario',
      description: 'Purchasing 3 discount points with longer break-even period',
      inputs: {
        loanAmount: 250000,
        baseInterestRate: 8.0,
        loanTerm: 30,
        discountPoints: 3,
        originationPoints: 0,
        pointCost: 1250,
        propertyValue: 350000,
        borrowerIncome: 60000,
        borrowerCreditScore: 680,
        borrowerTaxRate: 15,
        loanType: 'conventional',
        marketCondition: 'declining',
        marketGrowthRate: -1,
        analysisPeriod: 3,
        discountRate: 10
      },
      expectedOutputs: {
        totalPoints: 3,
        totalPointCost: 3750,
        effectiveRate: 7.25,
        monthlyPaymentSavings: 78,
        interestSavings: 28080,
        breakEvenMonths: 48,
        returnOnInvestment: 749,
        netPresentValue: 18000,
        netSavings: 24330,
        afterTaxCost: 3188,
        probabilityOfBenefit: 0.7,
        riskScore: 65
      }
    }
  ]
};
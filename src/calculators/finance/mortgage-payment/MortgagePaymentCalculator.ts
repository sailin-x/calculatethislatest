import { Calculator } from '../../../types/calculator';
import { MortgagePaymentInputs, MortgagePaymentOutputs } from './types';
import {
  calculateMonthlyPayment,
  calculatePrincipalPayment,
  calculateInterestPayment,
  calculateTotalPayment,
  calculateTotalPayments,
  calculateTotalInterestPaid,
  calculateEffectiveInterestRate,
  calculateAmortizationSchedule,
  calculateARMSchedule,
  calculateBreakEvenPoint,
  calculateBreakEvenMonths,
  calculateBreakEvenYears,
  calculateEquityPosition,
  calculateEquityPercentage,
  calculateLoanToValueRatio,
  calculateMonthlyCashFlow,
  calculateAnnualCashFlow,
  calculateTotalCashFlow,
  calculateSensitivityMatrix,
  calculateScenarios,
  calculateComparisonAnalysis,
  calculateRiskScore,
  calculateProbabilityOfDefault,
  calculatePaymentShockRisk,
  calculateInterestRateRisk,
  generateMortgagePaymentAnalysis
} from './formulas';
import { validateMortgagePaymentInputs, validateMortgagePaymentBusinessRules } from './validation';

export const MortgagePaymentCalculator: Calculator = {
  id: 'mortgage-payment-calculator',
  title: 'Mortgage Payment Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate mortgage payments, amortization schedules, and comprehensive payment analysis with support for all loan types including ARM, FHA, VA, and conventional loans.',
  usageInstructions: [
    'Enter loan amount, interest rate, and term',
    'Select loan type and payment structure',
    'Input property details and borrower information',
    'Review payment breakdown and amortization schedule',
    'Analyze affordability and risk factors',
    'Compare different loan scenarios'
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
      step: 0.125,
      tooltip: 'Annual interest rate for the loan'
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
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' },
        { value: 'hard_money', label: 'Hard Money' },
        { value: 'private', label: 'Private' }
      ],
      tooltip: 'Type of mortgage loan'
    },
    {
      id: 'paymentType',
      label: 'Payment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon Payment' },
        { value: 'arm', label: 'Adjustable Rate (ARM)' }
      ],
      tooltip: 'Payment structure for the loan'
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
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Down payment amount'
    },
    {
      id: 'propertyInsurance',
      label: 'Annual Property Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual homeowners insurance premium'
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
      id: 'hoaFees',
      label: 'Monthly HOA Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly homeowners association fees'
    },
    {
      id: 'floodInsurance',
      label: 'Monthly Flood Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly flood insurance premium'
    },
    {
      id: 'mortgageInsurance',
      label: 'Monthly Mortgage Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly private mortgage insurance'
    },
    {
      id: 'borrowerIncome',
      label: 'Annual Borrower Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual gross income of the borrower'
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
      id: 'borrowerDebtToIncomeRatio',
      label: 'Debt-to-Income Ratio (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Current debt obligations as percentage of income'
    },
    {
      id: 'firstPaymentDate',
      label: 'First Payment Date',
      type: 'date',
      required: false,
      tooltip: 'Date of the first mortgage payment'
    },
    {
      id: 'initialFixedPeriod',
      label: 'ARM Initial Fixed Period (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      tooltip: 'Initial fixed rate period for ARM loans'
    },
    {
      id: 'adjustmentPeriod',
      label: 'ARM Adjustment Period (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 5,
      tooltip: 'Rate adjustment frequency for ARM loans'
    },
    {
      id: 'lifetimeCap',
      label: 'ARM Lifetime Cap (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      tooltip: 'Maximum interest rate over loan life for ARM loans'
    },
    {
      id: 'periodicCap',
      label: 'ARM Periodic Cap (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      tooltip: 'Maximum rate change per adjustment for ARM loans'
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
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Total monthly mortgage payment including principal, interest, taxes, insurance, and fees'
    },
    {
      id: 'principalPayment',
      label: 'Principal Payment',
      type: 'currency',
      explanation: 'Monthly principal portion of the payment'
    },
    {
      id: 'interestPayment',
      label: 'Interest Payment',
      type: 'currency',
      explanation: 'Monthly interest portion of the payment'
    },
    {
      id: 'totalPayment',
      label: 'Total Monthly Payment',
      type: 'currency',
      explanation: 'Complete monthly housing payment'
    },
    {
      id: 'totalPayments',
      label: 'Total of All Payments',
      type: 'currency',
      explanation: 'Sum of all payments over the loan term'
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest paid over the loan term'
    },
    {
      id: 'effectiveInterestRate',
      label: 'Effective Interest Rate',
      type: 'percentage',
      explanation: 'Effective annual interest rate'
    },
    {
      id: 'breakEvenMonths',
      label: 'Break-Even Period',
      type: 'number',
      explanation: 'Months to break even on the investment'
    },
    {
      id: 'equityPosition',
      label: 'Equity Position',
      type: 'currency',
      explanation: 'Current equity in the property'
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
      explanation: 'Loan amount as percentage of property value'
    },
    {
      id: 'monthlyCashFlow',
      label: 'Monthly Cash Flow',
      type: 'currency',
      explanation: 'Monthly cash flow after mortgage payment'
    },
    {
      id: 'annualCashFlow',
      label: 'Annual Cash Flow',
      type: 'currency',
      explanation: 'Annual cash flow after mortgage payment'
    },
    {
      id: 'riskScore',
      label: 'Risk Score (0-100)',
      type: 'number',
      explanation: 'Overall loan risk assessment score'
    },
    {
      id: 'probabilityOfDefault',
      label: 'Probability of Default',
      type: 'percentage',
      explanation: 'Estimated probability of loan default'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: '30-Year Fixed Conventional Loan',
      description: 'Standard 30-year fixed rate mortgage for primary residence',
      inputs: {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30,
        loanType: 'conventional',
        paymentType: 'principal_interest',
        propertyValue: 400000,
        downPayment: 100000,
        propertyInsurance: 1200,
        propertyTaxes: 4800,
        hoaFees: 0,
        floodInsurance: 0,
        mortgageInsurance: 0,
        borrowerIncome: 80000,
        borrowerCreditScore: 750,
        borrowerDebtToIncomeRatio: 35,
        firstPaymentDate: '2024-02-01',
        marketGrowthRate: 3,
        analysisPeriod: 5
      },
      expectedOutputs: {
        monthlyPayment: 1918,
        principalPayment: 383,
        interestPayment: 1535,
        totalPayment: 2798,
        totalPayments: 687000,
        totalInterestPaid: 387000,
        effectiveInterestRate: 6.5,
        breakEvenMonths: 360,
        equityPosition: 100000,
        equityPercentage: 25,
        loanToValueRatio: 75,
        monthlyCashFlow: 1869,
        annualCashFlow: 22428,
        riskScore: 25,
        probabilityOfDefault: 2.5
      }
    },
    {
      title: '15-Year Fixed FHA Loan',
      description: '15-year FHA loan with lower interest rate and shorter term',
      inputs: {
        loanAmount: 180000,
        interestRate: 5.75,
        loanTerm: 15,
        loanType: 'fha',
        paymentType: 'principal_interest',
        propertyValue: 200000,
        downPayment: 20000,
        propertyInsurance: 1000,
        propertyTaxes: 3000,
        hoaFees: 150,
        floodInsurance: 0,
        mortgageInsurance: 120,
        borrowerIncome: 65000,
        borrowerCreditScore: 720,
        borrowerDebtToIncomeRatio: 28,
        firstPaymentDate: '2024-02-01',
        marketGrowthRate: 4,
        analysisPeriod: 5
      },
      expectedOutputs: {
        monthlyPayment: 1365,
        principalPayment: 765,
        interestPayment: 600,
        totalPayment: 2635,
        totalPayments: 237000,
        totalInterestPaid: 57000,
        effectiveInterestRate: 5.75,
        breakEvenMonths: 180,
        equityPosition: 20000,
        equityPercentage: 10,
        loanToValueRatio: 90,
        monthlyCashFlow: 2415,
        annualCashFlow: 28980,
        riskScore: 35,
        probabilityOfDefault: 3.5
      }
    },
    {
      title: '5/1 ARM Loan',
      description: '5-year ARM with initial fixed period and adjustable rate',
      inputs: {
        loanAmount: 250000,
        interestRate: 5.25,
        loanTerm: 30,
        loanType: 'conventional',
        paymentType: 'arm',
        propertyValue: 350000,
        downPayment: 100000,
        propertyInsurance: 1400,
        propertyTaxes: 4200,
        hoaFees: 0,
        floodInsurance: 0,
        mortgageInsurance: 0,
        borrowerIncome: 90000,
        borrowerCreditScore: 780,
        borrowerDebtToIncomeRatio: 32,
        firstPaymentDate: '2024-02-01',
        initialFixedPeriod: 5,
        adjustmentPeriod: 1,
        lifetimeCap: 9.25,
        periodicCap: 2,
        marketGrowthRate: 3.5,
        analysisPeriod: 5
      },
      expectedOutputs: {
        monthlyPayment: 1378,
        principalPayment: 531,
        interestPayment: 847,
        totalPayment: 2378,
        totalPayments: 428000,
        totalInterestPaid: 178000,
        effectiveInterestRate: 5.25,
        breakEvenMonths: 360,
        equityPosition: 100000,
        equityPercentage: 28.57,
        loanToValueRatio: 71.43,
        monthlyCashFlow: 3122,
        annualCashFlow: 37464,
        riskScore: 30,
        probabilityOfDefault: 3.0
      }
    }
  ]
};
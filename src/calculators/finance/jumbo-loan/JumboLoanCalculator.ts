import { Calculator } from '../../../types/calculator';
import { calculateJumboLoan, generateJumboLoanAnalysis } from './formulas';
import { validateJumboLoanInputs } from './validation';

export const JumboLoanCalculator: Calculator = {
  id: 'jumbo-loan-calculator',
  name: 'Jumbo Loan Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate jumbo loan payments, requirements, and costs including higher down payment requirements, stricter qualification criteria, and premium pricing.',
  inputs: [
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Total loan amount (exceeds conforming limits)', placeholder: '750000', min: 548250, max: 10000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate', placeholder: '6.5', min: 0.1, max: 20 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: true, description: 'Loan term in years', placeholder: '30', min: 5, max: 50 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: true, description: 'Down payment amount', placeholder: '150000', min: 0, max: 5000000 },
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: false, description: 'Property purchase price or appraised value', placeholder: '900000', min: 100000, max: 20000000 },
    { id: 'annualIncome', name: 'Annual Income', type: 'number', unit: 'USD', required: false, description: 'Annual household income', placeholder: '150000', min: 50000, max: 5000000 },
    { id: 'monthlyDebts', name: 'Monthly Debts', type: 'number', unit: 'USD', required: false, description: 'Monthly debt payments (excluding new mortgage)', placeholder: '1500', min: 0, max: 50000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'FICO credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'reserves', name: 'Reserves', type: 'number', unit: 'USD', required: false, description: 'Cash reserves after closing', placeholder: '50000', min: 0, max: 10000000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property', placeholder: 'Single Family', options: ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Investment Property'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'How the property will be occupied', placeholder: 'Primary Residence', options: ['Primary Residence', 'Second Home', 'Investment Property'] },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: false, description: 'Type of jumbo loan', placeholder: 'Fixed Rate', options: ['Fixed Rate', 'Adjustable Rate', 'Interest Only', 'Hybrid ARM'] },
    { id: 'armPeriod', name: 'ARM Period', type: 'number', unit: 'years', required: false, description: 'Fixed period for ARM loans', placeholder: '7', min: 1, max: 30 },
    { id: 'points', name: 'Points', type: 'number', required: false, description: 'Discount points paid', placeholder: '0', min: 0, max: 5 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Estimated closing costs', placeholder: '15000', min: 0, max: 100000 },
    { id: 'propertyTaxes', name: 'Property Taxes', type: 'number', unit: 'USD/year', required: false, description: 'Annual property taxes', placeholder: '9000', min: 0, max: 100000 },
    { id: 'homeInsurance', name: 'Home Insurance', type: 'number', unit: 'USD/year', required: false, description: 'Annual homeowners insurance', placeholder: '2400', min: 0, max: 50000 },
    { id: 'pmi', name: 'PMI', type: 'number', unit: 'USD/month', required: false, description: 'Private mortgage insurance', placeholder: '0', min: 0, max: 1000 },
    { id: 'hoaFees', name: 'HOA Fees', type: 'number', unit: 'USD/month', required: false, description: 'Monthly HOA fees', placeholder: '0', min: 0, max: 2000 },
    { id: 'incomeVerification', name: 'Income Verification', type: 'select', required: false, description: 'Type of income verification', placeholder: 'Full Documentation', options: ['Full Documentation', 'Stated Income', 'Bank Statement', 'Asset Depletion'] },
    { id: 'employmentType', name: 'Employment Type', type: 'select', required: false, description: 'Employment status', placeholder: 'W-2 Employee', options: ['W-2 Employee', 'Self-Employed', 'Business Owner', 'Retired', 'Other'] },
    { id: 'yearsEmployed', name: 'Years Employed', type: 'number', unit: 'years', required: false, description: 'Years in current employment', placeholder: '5', min: 0, max: 50 },
    { id: 'liquidAssets', name: 'Liquid Assets', type: 'number', unit: 'USD', required: false, description: 'Liquid assets available', placeholder: '100000', min: 0, max: 10000000 },
    { id: 'investmentAssets', name: 'Investment Assets', type: 'number', unit: 'USD', required: false, description: 'Investment assets value', placeholder: '200000', min: 0, max: 10000000 },
    { id: 'debtToIncomeRatio', name: 'Target DTI Ratio', type: 'number', unit: '%', required: false, description: 'Target debt-to-income ratio', placeholder: '43', min: 20, max: 50 },
    { id: 'loanToValueRatio', name: 'Target LTV Ratio', type: 'number', unit: '%', required: false, description: 'Target loan-to-value ratio', placeholder: '80', min: 50, max: 95 },
    { id: 'marketConditions', name: 'Market Conditions', type: 'select', required: false, description: 'Current market conditions', placeholder: 'Normal', options: ['Favorable', 'Normal', 'Tight', 'Very Tight'] },
    { id: 'lenderType', name: 'Lender Type', type: 'select', required: false, description: 'Type of lender', placeholder: 'Traditional Bank', options: ['Traditional Bank', 'Credit Union', 'Mortgage Banker', 'Portfolio Lender', 'Private Lender'] }
  ],
  outputs: [
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly principal and interest payment' },
    { id: 'monthlyPITI', name: 'Monthly PITI', type: 'number', unit: 'USD', description: 'Monthly payment including taxes and insurance' },
    { id: 'totalPayment', name: 'Total Payment', type: 'number', unit: 'USD', description: 'Total payment over loan term' },
    { id: 'totalInterest', name: 'Total Interest', type: 'number', unit: 'USD', description: 'Total interest paid over loan term' },
    { id: 'downPaymentPercent', name: 'Down Payment %', type: 'number', unit: '%', description: 'Down payment as percentage of property value' },
    { id: 'loanToValueRatio', name: 'Loan-to-Value Ratio', type: 'number', unit: '%', description: 'Current loan-to-value ratio' },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', description: 'Calculated debt-to-income ratio' },
    { id: 'frontEndDTI', name: 'Front-End DTI', type: 'number', unit: '%', description: 'Front-end debt-to-income ratio' },
    { id: 'backEndDTI', name: 'Back-End DTI', type: 'number', unit: '%', description: 'Back-end debt-to-income ratio' },
    { id: 'qualificationScore', name: 'Qualification Score', type: 'number', unit: '/100', description: 'Overall qualification score' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', unit: '/100', description: 'Risk assessment score' },
    { id: 'approvalProbability', name: 'Approval Probability', type: 'number', unit: '%', description: 'Estimated approval probability' },
    { id: 'jumboPremium', name: 'Jumbo Premium', type: 'number', unit: 'USD', description: 'Additional cost due to jumbo loan status' },
    { id: 'conformingComparison', name: 'Conforming Comparison', type: 'number', unit: 'USD', description: 'Monthly payment difference vs conforming loan' },
    { id: 'reserveRequirement', name: 'Reserve Requirement', type: 'number', unit: 'USD', description: 'Minimum reserve requirement' },
    { id: 'incomeRequirement', name: 'Income Requirement', type: 'number', unit: 'USD', description: 'Minimum income requirement' },
    { id: 'creditRequirement', name: 'Credit Requirement', type: 'number', description: 'Minimum credit score requirement' },
    { id: 'downPaymentRequirement', name: 'Down Payment Requirement', type: 'number', unit: '%', description: 'Minimum down payment percentage' },
    { id: 'amortizationSchedule', name: 'Amortization Schedule', type: 'string', description: 'Loan amortization schedule' },
    { id: 'paymentBreakdown', name: 'Payment Breakdown', type: 'string', description: 'Monthly payment breakdown' },
    { id: 'costAnalysis', name: 'Cost Analysis', type: 'string', description: 'Detailed cost analysis' },
    { id: 'qualificationAnalysis', name: 'Qualification Analysis', type: 'string', description: 'Qualification requirements analysis' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Loan recommendation' },
    { id: 'jumboLoanAnalysis', name: 'Jumbo Loan Analysis', type: 'string', description: 'Comprehensive jumbo loan analysis' }
  ],
  calculate: (inputs) => {
    return calculateJumboLoan(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateJumboLoanAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Monthly Payment Calculation',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Standard amortization formula where P = payment, L = loan amount, c = monthly interest rate, n = total payments'
    },
    {
      name: 'Loan-to-Value Ratio',
      formula: 'LTV = (Loan Amount / Property Value) × 100',
      description: 'Ratio of loan amount to property value'
    },
    {
      name: 'Debt-to-Income Ratio',
      formula: 'DTI = (Total Monthly Debt / Monthly Income) × 100',
      description: 'Ratio of total monthly debt payments to monthly income'
    },
    {
      name: 'Down Payment Percentage',
      formula: 'Down Payment % = (Down Payment / Property Value) × 100',
      description: 'Down payment as percentage of property value'
    },
    {
      name: 'Jumbo Premium Calculation',
      formula: 'Premium = (Jumbo Rate - Conforming Rate) × Loan Amount × Loan Term',
      description: 'Additional cost due to higher jumbo loan rates'
    },
    {
      name: 'Qualification Score',
      formula: 'Score = (Credit Score × 0.3) + (DTI Score × 0.25) + (LTV Score × 0.25) + (Reserve Score × 0.2)',
      description: 'Weighted qualification score based on multiple factors'
    }
  ],
  examples: [
    {
      name: 'High-Income Professional',
      inputs: {
        loanAmount: 800000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 200000,
        propertyValue: 1000000,
        annualIncome: 200000,
        monthlyDebts: 2000,
        creditScore: 780,
        reserves: 100000
      },
      description: 'High-income professional with excellent credit seeking jumbo loan for luxury home'
    },
    {
      name: 'Self-Employed Borrower',
      inputs: {
        loanAmount: 650000,
        interestRate: 7.0,
        loanTerm: 30,
        downPayment: 130000,
        propertyValue: 780000,
        annualIncome: 150000,
        monthlyDebts: 1500,
        creditScore: 720,
        reserves: 75000,
        employmentType: 'Self-Employed',
        incomeVerification: 'Bank Statement'
      },
      description: 'Self-employed borrower using bank statement income verification'
    },
    {
      name: 'Investment Property',
      inputs: {
        loanAmount: 750000,
        interestRate: 7.5,
        loanTerm: 30,
        downPayment: 187500,
        propertyValue: 937500,
        annualIncome: 180000,
        monthlyDebts: 2500,
        creditScore: 750,
        reserves: 150000,
        occupancyType: 'Investment Property',
        propertyType: 'Multi-Family'
      },
      description: 'Investment property jumbo loan with higher down payment requirement'
    }
  ]
};

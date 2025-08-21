import { Calculator } from '../../../types/calculator';
import { calculateReverseMortgage, generateReverseMortgageAnalysis } from './formulas';
import { validateReverseMortgageInputs } from './validation';

export const ReverseMortgageCalculator: Calculator = {
  id: 'reverse-mortgage-calculator',
  name: 'Reverse Mortgage Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate reverse mortgage benefits, loan amounts, payment options, and financial implications for seniors using home equity.',
  inputs: [
    { id: 'homeValue', name: 'Home Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the home', placeholder: '500000', min: 100000, max: 10000000 },
    { id: 'existingMortgage', name: 'Existing Mortgage Balance', type: 'number', unit: 'USD', required: false, description: 'Current mortgage balance if any', placeholder: '150000', min: 0, max: 10000000 },
    { id: 'borrowerAge', name: 'Youngest Borrower Age', type: 'number', unit: 'years', required: true, description: 'Age of the youngest borrower', placeholder: '65', min: 62, max: 100 },
    { id: 'coBorrowerAge', name: 'Co-Borrower Age', type: 'number', unit: 'years', required: false, description: 'Age of co-borrower if applicable', placeholder: '67', min: 62, max: 100 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: false, description: 'Reverse mortgage interest rate', placeholder: '6.5', min: 0.1, max: 15 },
    { id: 'paymentType', name: 'Payment Type', type: 'select', required: false, description: 'Type of reverse mortgage payment', placeholder: 'line-of-credit', options: ['line-of-credit', 'monthly-payment', 'lump-sum', 'tenure-payment', 'term-payment'] },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: false, description: 'Loan term for term payments', placeholder: '10', min: 1, max: 30 },
    { id: 'monthlyPayment', name: 'Monthly Payment Amount', type: 'number', unit: 'USD', required: false, description: 'Desired monthly payment amount', placeholder: '2000', min: 100, max: 50000 },
    { id: 'lumpSumAmount', name: 'Lump Sum Amount', type: 'number', unit: 'USD', required: false, description: 'Desired lump sum amount', placeholder: '100000', min: 1000, max: 1000000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of residential property', placeholder: 'single-family', options: ['single-family', 'condo', 'townhouse', 'duplex', 'multi-family', 'manufactured'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'How the property is occupied', placeholder: 'primary-residence', options: ['primary-residence', 'second-home', 'investment'] },
    { id: 'propertyLocation', name: 'Property Location', type: 'select', required: false, description: 'Property location type', placeholder: 'urban', options: ['urban', 'suburban', 'rural'] },
    { id: 'state', name: 'State', type: 'select', required: false, description: 'State where the property is located', placeholder: 'california', options: ['california', 'florida', 'texas', 'new-york', 'illinois', 'pennsylvania', 'ohio', 'georgia', 'north-carolina', 'michigan'] },
    { id: 'zipCode', name: 'Zip Code', type: 'string', required: false, description: 'Property zip code for rate calculation', placeholder: '90210' },
    { id: 'homeAppreciationRate', name: 'Home Appreciation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual home appreciation rate', placeholder: '3.0', min: -50, max: 50 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: -50, max: 50 },
    { id: 'lifeExpectancy', name: 'Life Expectancy', type: 'number', unit: 'years', required: false, description: 'Expected life expectancy in years', placeholder: '85', min: 70, max: 120 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: false, description: 'One-time closing costs', placeholder: '8000', min: 0, max: 50000 },
    { id: 'servicingFees', name: 'Servicing Fees', type: 'number', unit: 'USD/month', required: false, description: 'Monthly servicing fees', placeholder: '35', min: 0, max: 1000 },
    { id: 'mortgageInsurance', name: 'Mortgage Insurance', type: 'number', unit: '%', required: false, description: 'Annual mortgage insurance premium rate', placeholder: '0.5', min: 0, max: 5 },
    { id: 'propertyTaxRate', name: 'Property Tax Rate', type: 'number', unit: '%', required: false, description: 'Annual property tax rate', placeholder: '1.2', min: 0, max: 10 },
    { id: 'homeInsuranceRate', name: 'Home Insurance Rate', type: 'number', unit: '%', required: false, description: 'Annual home insurance rate', placeholder: '0.5', min: 0, max: 5 },
    { id: 'maintenanceRate', name: 'Maintenance Rate', type: 'number', unit: '%', required: false, description: 'Annual maintenance cost rate', placeholder: '1.0', min: 0, max: 10 },
    { id: 'hoaFees', name: 'HOA Fees', type: 'number', unit: 'USD/month', required: false, description: 'Monthly HOA fees', placeholder: '200', min: 0, max: 5000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Borrower credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'income', name: 'Monthly Income', type: 'number', unit: 'USD', required: false, description: 'Monthly income from other sources', placeholder: '3000', min: 0, max: 100000 },
    { id: 'expenses', name: 'Monthly Expenses', type: 'number', unit: 'USD', required: false, description: 'Monthly living expenses', placeholder: '2500', min: 0, max: 100000 },
    { id: 'otherAssets', name: 'Other Assets', type: 'number', unit: 'USD', required: false, description: 'Value of other assets', placeholder: '100000', min: 0, max: 10000000 },
    { id: 'otherDebts', name: 'Other Debts', type: 'number', unit: 'USD', required: false, description: 'Other outstanding debts', placeholder: '50000', min: 0, max: 1000000 },
    { id: 'healthStatus', name: 'Health Status', type: 'select', required: false, description: 'General health status', placeholder: 'good', options: ['excellent', 'good', 'fair', 'poor'] },
    { id: 'familyHistory', name: 'Family History', type: 'select', required: false, description: 'Family health history', placeholder: 'average', options: ['excellent', 'good', 'average', 'poor'] },
    { id: 'marketConditions', name: 'Market Conditions', type: 'select', required: false, description: 'Current real estate market conditions', placeholder: 'normal', options: ['buyers-market', 'normal', 'sellers-market', 'hot-market'] },
    { id: 'loanPurpose', name: 'Loan Purpose', type: 'select', required: false, description: 'Primary purpose of the reverse mortgage', placeholder: 'supplement-income', options: ['supplement-income', 'pay-off-debts', 'home-improvements', 'medical-expenses', 'travel', 'emergency-fund', 'other'] }
  ],
  outputs: [
    { id: 'principalLimit', name: 'Principal Limit', type: 'number', unit: 'USD', description: 'Maximum loan amount available' },
    { id: 'availableEquity', name: 'Available Equity', type: 'number', unit: 'USD', description: 'Equity available for reverse mortgage' },
    { id: 'initialDraw', name: 'Initial Draw', type: 'number', unit: 'USD', description: 'Initial loan amount drawn' },
    { id: 'monthlyPaymentAmount', name: 'Monthly Payment Amount', type: 'number', unit: 'USD', description: 'Monthly payment amount (if applicable)' },
    { id: 'lineOfCredit', name: 'Line of Credit', type: 'number', unit: 'USD', description: 'Available line of credit' },
    { id: 'totalLoanBalance', name: 'Total Loan Balance', type: 'number', unit: 'USD', description: 'Total loan balance at end of term' },
    { id: 'remainingEquity', name: 'Remaining Equity', type: 'number', unit: 'USD', description: 'Remaining home equity at end of term' },
    { id: 'loanToValueRatio', name: 'Loan-to-Value Ratio', type: 'number', unit: '%', description: 'Final loan-to-value ratio' },
    { id: 'annualPercentageRate', name: 'Annual Percentage Rate', type: 'number', unit: '%', description: 'Effective annual percentage rate' },
    { id: 'totalInterest', name: 'Total Interest', type: 'number', unit: 'USD', description: 'Total interest accrued over loan term' },
    { id: 'totalCosts', name: 'Total Costs', type: 'number', unit: 'USD', description: 'Total costs including fees and interest' },
    { id: 'breakEvenYears', name: 'Break-Even Years', type: 'number', unit: 'years', description: 'Years until costs exceed benefits' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Financial recommendation' },
    { id: 'monthlyCashFlow', name: 'Monthly Cash Flow', type: 'number', unit: 'USD', description: 'Net monthly cash flow improvement' },
    { id: 'annualCashFlow', name: 'Annual Cash Flow', type: 'number', unit: 'USD', description: 'Net annual cash flow improvement' },
    { id: 'debtElimination', name: 'Debt Elimination', type: 'number', unit: 'USD', description: 'Amount of existing debt eliminated' },
    { id: 'taxImplications', name: 'Tax Implications', type: 'string', description: 'Tax implications of reverse mortgage' },
    { id: 'riskAssessment', name: 'Risk Assessment', type: 'string', description: 'Risk factors and considerations' },
    { id: 'alternatives', name: 'Alternatives', type: 'string', description: 'Alternative financial options' },
    { id: 'repaymentAnalysis', name: 'Repayment Analysis', type: 'string', description: 'Analysis of repayment scenarios' },
    { id: 'equityProjection', name: 'Equity Projection', type: 'string', description: 'Projected equity over time' },
    { id: 'costBenefitAnalysis', name: 'Cost-Benefit Analysis', type: 'string', description: 'Detailed cost-benefit analysis' },
    { id: 'eligibilityScore', name: 'Eligibility Score', type: 'number', description: 'Reverse mortgage eligibility score (0-100)' },
    { id: 'suitabilityScore', name: 'Suitability Score', type: 'number', description: 'Reverse mortgage suitability score (0-100)' },
    { id: 'reverseMortgageAnalysis', name: 'Reverse Mortgage Analysis', type: 'string', description: 'Comprehensive analysis report' }
  ],
  calculate: (inputs) => {
    return calculateReverseMortgage(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateReverseMortgageAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Principal Limit Factor',
      formula: 'PLF = Base Factor × Age Factor × Property Factor × Interest Rate Factor',
      description: 'Calculates the principal limit factor based on borrower age and property factors'
    },
    {
      name: 'Principal Limit',
      formula: 'Principal Limit = (Home Value × PLF) - Existing Mortgage - Closing Costs',
      description: 'Maximum loan amount available for reverse mortgage'
    },
    {
      name: 'Monthly Payment Calculation',
      formula: 'Monthly Payment = Principal Limit × Monthly Payment Factor × (1 - Initial Draw Factor)',
      description: 'Calculates monthly payment amount for tenure or term payments'
    },
    {
      name: 'Line of Credit Growth',
      formula: 'LOC Growth = Available Credit × (1 + Interest Rate)^Years',
      description: 'Line of credit grows over time at the loan interest rate'
    },
    {
      name: 'Total Loan Balance',
      formula: 'Total Balance = Initial Draw + Interest Accrued + Fees + Servicing Charges',
      description: 'Total amount owed at end of loan term'
    },
    {
      name: 'Remaining Equity',
      formula: 'Remaining Equity = Future Home Value - Total Loan Balance',
      description: 'Equity remaining after reverse mortgage repayment'
    }
  ],
  examples: [
    {
      name: 'Basic Reverse Mortgage',
      inputs: {
        homeValue: 500000,
        borrowerAge: 70,
        interestRate: 6.5,
        paymentType: 'line-of-credit',
        existingMortgage: 100000
      },
      description: 'Basic reverse mortgage for a 70-year-old with existing mortgage'
    },
    {
      name: 'Monthly Payment Option',
      inputs: {
        homeValue: 750000,
        borrowerAge: 75,
        interestRate: 6.0,
        paymentType: 'monthly-payment',
        monthlyPayment: 2500,
        existingMortgage: 0
      },
      description: 'Reverse mortgage with monthly payment option for income supplement'
    },
    {
      name: 'Lump Sum Payment',
      inputs: {
        homeValue: 400000,
        borrowerAge: 68,
        interestRate: 7.0,
        paymentType: 'lump-sum',
        lumpSumAmount: 150000,
        existingMortgage: 50000
      },
      description: 'Reverse mortgage with lump sum payment for debt elimination'
    }
  ],
  tags: ['reverse-mortgage', 'senior-finance', 'home-equity', 'retirement', 'loan', 'hecm', 'fha', 'elderly', 'cash-flow'],
  references: [
    'Federal Housing Administration (FHA)',
    'Department of Housing and Urban Development (HUD)',
    'Consumer Financial Protection Bureau (CFPB)',
    'National Reverse Mortgage Lenders Association (NRMLA)',
    'AARP Reverse Mortgage Guidelines'
  ]
};
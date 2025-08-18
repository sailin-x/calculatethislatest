import { Calculator } from '../../../types/calculator';
import { calculateInterestOnlyMortgage, generateInterestOnlyMortgageAnalysis } from './formulas';
import { validateInterestOnlyMortgageInputs } from './validation';

export const InterestOnlyMortgageCalculator: Calculator = {
  id: 'interest-only-mortgage-calculator',
  name: 'Interest-Only Mortgage Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate interest-only mortgage payments, total costs, and compare with traditional amortizing mortgages including balloon payment analysis.',
  inputs: [
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Total loan amount', placeholder: '500000', min: 10000, max: 10000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate', placeholder: '5.5', min: 0.1, max: 20 },
    { id: 'interestOnlyPeriod', name: 'Interest-Only Period', type: 'number', unit: 'years', required: true, description: 'Number of years for interest-only payments', placeholder: '10', min: 1, max: 30 },
    { id: 'totalLoanTerm', name: 'Total Loan Term', type: 'number', unit: 'years', required: true, description: 'Total loan term in years', placeholder: '30', min: 5, max: 50 },
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: false, description: 'Current property value', placeholder: '600000', min: 10000, max: 20000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: false, description: 'Down payment amount', placeholder: '100000', min: 0, max: 10000000 },
    { id: 'downPaymentPercentage', name: 'Down Payment %', type: 'number', unit: '%', required: false, description: 'Down payment as percentage of property value', placeholder: '20', min: 0, max: 100 },
    { id: 'propertyTaxes', name: 'Property Taxes', type: 'number', unit: 'USD/year', required: false, description: 'Annual property taxes', placeholder: '6000', min: 0, max: 100000 },
    { id: 'propertyTaxRate', name: 'Property Tax Rate', type: 'number', unit: '%', required: false, description: 'Property tax rate as percentage of property value', placeholder: '1.2', min: 0, max: 10 },
    { id: 'homeownersInsurance', name: 'Homeowners Insurance', type: 'number', unit: 'USD/year', required: false, description: 'Annual homeowners insurance', placeholder: '1200', min: 0, max: 50000 },
    { id: 'insuranceRate', name: 'Insurance Rate', type: 'number', unit: '%', required: false, description: 'Insurance rate as percentage of property value', placeholder: '0.2', min: 0, max: 5 },
    { id: 'pmi', name: 'PMI', type: 'number', unit: 'USD/year', required: false, description: 'Annual Private Mortgage Insurance', placeholder: '0', min: 0, max: 10000 },
    { id: 'pmiRate', name: 'PMI Rate', type: 'number', unit: '%', required: false, description: 'PMI rate as percentage of loan amount', placeholder: '0.5', min: 0, max: 5 },
    { id: 'hoaFees', name: 'HOA Fees', type: 'number', unit: 'USD/month', required: false, description: 'Monthly HOA fees', placeholder: '0', min: 0, max: 5000 },
    { id: 'utilities', name: 'Utilities', type: 'number', unit: 'USD/month', required: false, description: 'Monthly utilities', placeholder: '200', min: 0, max: 2000 },
    { id: 'maintenance', name: 'Maintenance', type: 'number', unit: 'USD/month', required: false, description: 'Monthly maintenance costs', placeholder: '100', min: 0, max: 5000 },
    { id: 'appreciationRate', name: 'Property Appreciation Rate', type: 'number', unit: '%/year', required: false, description: 'Expected annual property appreciation', placeholder: '3', min: -10, max: 20 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%/year', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: 0, max: 20 },
    { id: 'incomeTaxRate', name: 'Income Tax Rate', type: 'number', unit: '%', required: false, description: 'Marginal income tax rate for interest deduction', placeholder: '24', min: 0, max: 50 },
    { id: 'alternativeInvestmentReturn', name: 'Alternative Investment Return', type: 'number', unit: '%/year', required: false, description: 'Expected return on alternative investments', placeholder: '7', min: 0, max: 20 },
    { id: 'refinanceRate', name: 'Refinance Rate', type: 'number', unit: '%', required: false, description: 'Expected refinance rate after interest-only period', placeholder: '6', min: 0.1, max: 20 },
    { id: 'refinanceCosts', name: 'Refinance Costs', type: 'number', unit: 'USD', required: false, description: 'Costs to refinance the loan', placeholder: '5000', min: 0, max: 50000 },
    { id: 'sellingCosts', name: 'Selling Costs', type: 'number', unit: '%', required: false, description: 'Selling costs as percentage of property value', placeholder: '6', min: 0, max: 15 },
    { id: 'exitStrategy', name: 'Exit Strategy', type: 'select', required: false, description: 'Planned exit strategy', placeholder: 'refinance', options: ['refinance', 'sell', 'pay-off', 'extend'] },
    { id: 'riskTolerance', name: 'Risk Tolerance', type: 'select', required: false, description: 'Risk tolerance level', placeholder: 'moderate', options: ['conservative', 'moderate', 'aggressive'] },
    { id: 'investmentHorizon', name: 'Investment Horizon', type: 'number', unit: 'years', required: false, description: 'Expected investment holding period', placeholder: '10', min: 1, max: 50 },
    { id: 'monthlyIncome', name: 'Monthly Income', type: 'number', unit: 'USD', required: false, description: 'Monthly household income', placeholder: '8000', min: 1000, max: 1000000 },
    { id: 'monthlyDebts', name: 'Monthly Debts', type: 'number', unit: 'USD', required: false, description: 'Other monthly debt payments', placeholder: '500', min: 0, max: 100000 },
    { id: 'emergencyFund', name: 'Emergency Fund', type: 'number', unit: 'USD', required: false, description: 'Available emergency fund', placeholder: '25000', min: 0, max: 1000000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: false, description: 'Type of interest-only loan', placeholder: 'fixed-rate', options: ['fixed-rate', 'adjustable-rate', 'hybrid-arm'] },
    { id: 'armIndex', name: 'ARM Index', type: 'number', unit: '%', required: false, description: 'ARM index rate', placeholder: '3.5', min: 0, max: 20 },
    { id: 'armMargin', name: 'ARM Margin', type: 'number', unit: '%', required: false, description: 'ARM margin above index', placeholder: '2.5', min: 0, max: 10 },
    { id: 'armAdjustmentPeriod', name: 'ARM Adjustment Period', type: 'number', unit: 'months', required: false, description: 'ARM adjustment period in months', placeholder: '12', min: 1, max: 60 },
    { id: 'armCaps', name: 'ARM Caps', type: 'select', required: false, description: 'ARM rate adjustment caps', placeholder: '2-2-5', options: ['1-1-5', '2-2-5', '5-2-5', 'no-caps'] },
    { id: 'prepaymentPenalty', name: 'Prepayment Penalty', type: 'number', unit: '%', required: false, description: 'Prepayment penalty as percentage of loan balance', placeholder: '0', min: 0, max: 10 },
    { id: 'prepaymentPenaltyPeriod', name: 'Prepayment Penalty Period', type: 'number', unit: 'years', required: false, description: 'Years prepayment penalty applies', placeholder: '0', min: 0, max: 10 },
    { id: 'lenderFees', name: 'Lender Fees', type: 'number', unit: 'USD', required: false, description: 'Lender origination and processing fees', placeholder: '2000', min: 0, max: 50000 },
    { id: 'titleInsurance', name: 'Title Insurance', type: 'number', unit: 'USD', required: false, description: 'Title insurance cost', placeholder: '1000', min: 0, max: 10000 },
    { id: 'appraisalFee', name: 'Appraisal Fee', type: 'number', unit: 'USD', required: false, description: 'Appraisal fee', placeholder: '500', min: 0, max: 5000 },
    { id: 'escrowAccount', name: 'Escrow Account', type: 'select', required: false, description: 'Whether escrow account is required', placeholder: 'yes', options: ['yes', 'no', 'optional'] },
    { id: 'escrowAmount', name: 'Escrow Amount', type: 'number', unit: 'USD', required: false, description: 'Initial escrow deposit amount', placeholder: '3000', min: 0, max: 50000 }
  ],
  outputs: [
    { id: 'monthlyInterestPayment', name: 'Monthly Interest Payment', type: 'number', unit: 'USD', description: 'Monthly interest-only payment' },
    { id: 'monthlyPrincipalPayment', name: 'Monthly Principal Payment', type: 'number', unit: 'USD', description: 'Monthly principal payment (after interest-only period)' },
    { id: 'monthlyTotalPayment', name: 'Monthly Total Payment', type: 'number', unit: 'USD', description: 'Total monthly payment including principal and interest' },
    { id: 'monthlyPITI', name: 'Monthly PITI', type: 'number', unit: 'USD', description: 'Monthly payment including Principal, Interest, Taxes, and Insurance' },
    { id: 'monthlyTotalHousing', name: 'Monthly Total Housing Cost', type: 'number', unit: 'USD', description: 'Total monthly housing cost including all expenses' },
    { id: 'balloonPayment', name: 'Balloon Payment', type: 'number', unit: 'USD', description: 'Balloon payment due at end of interest-only period' },
    { id: 'totalInterestPaid', name: 'Total Interest Paid', type: 'number', unit: 'USD', description: 'Total interest paid over loan term' },
    { id: 'totalCost', name: 'Total Cost', type: 'number', unit: 'USD', description: 'Total cost including principal, interest, and fees' },
    { id: 'amortizationComparison', name: 'Amortization Comparison', type: 'number', unit: 'USD', description: 'Monthly payment for equivalent amortizing loan' },
    { id: 'savingsDuringInterestOnly', name: 'Savings During Interest-Only Period', type: 'number', unit: 'USD', description: 'Monthly savings compared to amortizing loan' },
    { id: 'totalSavings', name: 'Total Savings', type: 'number', unit: 'USD', description: 'Total savings over interest-only period' },
    { id: 'investmentOpportunity', name: 'Investment Opportunity', type: 'number', unit: 'USD', description: 'Potential investment value of monthly savings' },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', description: 'Front-end debt-to-income ratio' },
    { id: 'debtToIncomeRatioBack', name: 'Back-End DTI Ratio', type: 'number', unit: '%', description: 'Back-end debt-to-income ratio' },
    { id: 'loanToValueRatio', name: 'Loan-to-Value Ratio', type: 'number', unit: '%', description: 'Current loan-to-value ratio' },
    { id: 'equityBuildUp', name: 'Equity Build-Up', type: 'number', unit: 'USD', description: 'Equity built up through property appreciation' },
    { id: 'taxSavings', name: 'Tax Savings', type: 'number', unit: 'USD', description: 'Annual tax savings from interest deduction' },
    { id: 'afterTaxCost', name: 'After-Tax Cost', type: 'number', unit: 'USD', description: 'Monthly payment after tax savings' },
    { id: 'breakEvenPoint', name: 'Break-Even Point', type: 'number', unit: 'years', description: 'Years to break even on interest-only vs amortizing' },
    { id: 'refinanceAnalysis', name: 'Refinance Analysis', type: 'string', description: 'Analysis of refinancing options' },
    { id: 'riskAssessment', name: 'Risk Assessment', type: 'string', description: 'Risk assessment of interest-only mortgage' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Recommendation based on analysis' },
    { id: 'affordabilityScore', name: 'Affordability Score', type: 'number', description: 'Affordability score (0-100)' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Risk score (0-100)' },
    { id: 'suitabilityScore', name: 'Suitability Score', type: 'number', description: 'Overall suitability score (0-100)' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'string', description: 'Summary of key financial metrics' },
    { id: 'paymentSchedule', name: 'Payment Schedule', type: 'string', description: 'Detailed payment schedule' },
    { id: 'comparisonAnalysis', name: 'Comparison Analysis', type: 'string', description: 'Comparison with traditional mortgage' },
    { id: 'scenarioAnalysis', name: 'Scenario Analysis', type: 'string', description: 'Analysis of different scenarios' },
    { id: 'exitStrategyAnalysis', name: 'Exit Strategy Analysis', type: 'string', description: 'Analysis of exit strategies' }
  ],
  calculate: (inputs) => {
    return calculateInterestOnlyMortgage(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateInterestOnlyMortgageAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Monthly Interest Payment',
      formula: 'Monthly Interest = (Loan Amount × Annual Interest Rate) ÷ 12',
      description: 'Calculates the monthly interest-only payment'
    },
    {
      name: 'Balloon Payment',
      formula: 'Balloon Payment = Original Loan Amount',
      description: 'The balloon payment equals the original loan amount since no principal is paid during interest-only period'
    },
    {
      name: 'Total Interest Paid',
      formula: 'Total Interest = (Monthly Interest × Interest-Only Period × 12) + (Amortized Interest for Remaining Term)',
      description: 'Calculates total interest paid over the entire loan term'
    },
    {
      name: 'Debt-to-Income Ratio',
      formula: 'DTI = (Monthly Housing Payment ÷ Monthly Income) × 100',
      description: 'Calculates the debt-to-income ratio for loan qualification'
    },
    {
      name: 'Loan-to-Value Ratio',
      formula: 'LTV = (Loan Amount ÷ Property Value) × 100',
      description: 'Calculates the loan-to-value ratio'
    },
    {
      name: 'Tax Savings',
      formula: 'Tax Savings = (Annual Interest Paid × Income Tax Rate) ÷ 100',
      description: 'Calculates annual tax savings from mortgage interest deduction'
    },
    {
      name: 'Investment Opportunity',
      formula: 'Investment Value = Monthly Savings × (1 + Investment Return Rate)^Period',
      description: 'Calculates the potential value of investing monthly savings'
    },
    {
      name: 'Break-Even Analysis',
      formula: 'Break-Even = Total Cost Difference ÷ Monthly Savings',
      description: 'Calculates the time to break even on interest-only vs traditional mortgage'
    }
  ],
  examples: [
    {
      name: 'Conservative Interest-Only Mortgage',
      inputs: {
        loanAmount: 400000,
        interestRate: 4.5,
        interestOnlyPeriod: 7,
        totalLoanTerm: 30,
        propertyValue: 500000,
        downPayment: 100000,
        propertyTaxes: 5000,
        homeownersInsurance: 1200,
        monthlyIncome: 8000,
        incomeTaxRate: 24
      },
      description: 'A conservative interest-only mortgage with 7-year interest-only period and 4.5% rate'
    },
    {
      name: 'Aggressive Investment Strategy',
      inputs: {
        loanAmount: 600000,
        interestRate: 5.5,
        interestOnlyPeriod: 10,
        totalLoanTerm: 30,
        propertyValue: 750000,
        downPayment: 150000,
        alternativeInvestmentReturn: 8,
        riskTolerance: 'aggressive',
        investmentHorizon: 10
      },
      description: 'An aggressive strategy using interest-only payments to maximize investment opportunities'
    },
    {
      name: 'Short-Term Investment Property',
      inputs: {
        loanAmount: 300000,
        interestRate: 6.0,
        interestOnlyPeriod: 5,
        totalLoanTerm: 30,
        propertyValue: 375000,
        downPayment: 75000,
        exitStrategy: 'sell',
        investmentHorizon: 5,
        appreciationRate: 4
      },
      description: 'Short-term investment property with 5-year interest-only period and planned sale'
    }
  ]
};

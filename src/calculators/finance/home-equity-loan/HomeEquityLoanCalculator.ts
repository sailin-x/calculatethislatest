import { Calculator } from '../../../types/calculator';
import { calculateHomeEquityLoan, generateHomeEquityLoanAnalysis } from './formulas';
import { validateHomeEquityLoanInputs } from './validation';

export const HomeEquityLoanCalculator: Calculator = {
  id: 'home-equity-loan-calculator',
  name: 'Home Equity Loan Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate home equity loan terms, payments, and borrowing capacity based on home value, current mortgage, and lender requirements.',
  inputs: [
    { id: 'homeValue', name: 'Home Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the home', placeholder: '500000', min: 10000, max: 10000000 },
    { id: 'currentMortgageBalance', name: 'Current Mortgage Balance', type: 'number', unit: 'USD', required: true, description: 'Current outstanding mortgage balance', placeholder: '300000', min: 0, max: 10000000 },
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Amount you want to borrow', placeholder: '50000', min: 1000, max: 1000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate on the home equity loan', placeholder: '7.5', min: 1, max: 20 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: true, description: 'Loan term in years', placeholder: '15', min: 1, max: 30 },
    { id: 'maxLTV', name: 'Maximum LTV', type: 'number', unit: '%', required: false, description: 'Maximum loan-to-value ratio allowed by lender', placeholder: '85', min: 50, max: 95 },
    { id: 'maxCLTV', name: 'Maximum CLTV', type: 'number', unit: '%', required: false, description: 'Maximum combined loan-to-value ratio', placeholder: '90', min: 50, max: 95 },
    { id: 'originationFee', name: 'Origination Fee', type: 'number', unit: 'USD', required: false, description: 'Loan origination fee', placeholder: '500', min: 0, max: 5000 },
    { id: 'appraisalFee', name: 'Appraisal Fee', type: 'number', unit: 'USD', required: false, description: 'Property appraisal fee', placeholder: '400', min: 0, max: 1000 },
    { id: 'titleFees', name: 'Title Fees', type: 'number', unit: 'USD', required: false, description: 'Title search and insurance fees', placeholder: '800', min: 0, max: 2000 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Other closing costs', placeholder: '1000', min: 0, max: 5000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', unit: 'score', required: false, description: 'Your credit score (affects interest rate)', placeholder: '750', min: 300, max: 850 },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', required: false, description: 'Your current debt-to-income ratio', placeholder: '35', min: 0, max: 100 },
    { id: 'monthlyIncome', name: 'Monthly Income', type: 'number', unit: 'USD', required: false, description: 'Your monthly gross income', placeholder: '8000', min: 1000, max: 1000000 },
    { id: 'monthlyDebtPayments', name: 'Monthly Debt Payments', type: 'number', unit: 'USD', required: false, description: 'Your current monthly debt payments', placeholder: '1500', min: 0, max: 100000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property', placeholder: 'single-family', options: ['single-family', 'condo', 'townhouse', 'multi-family'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'How the property is occupied', placeholder: 'primary-residence', options: ['primary-residence', 'second-home', 'investment-property'] },
    { id: 'propertyLocation', name: 'Property Location', type: 'select', required: false, description: 'Property location type', placeholder: 'suburban', options: ['urban', 'suburban', 'rural'] },
    { id: 'marketType', name: 'Market Type', type: 'select', required: false, description: 'Current real estate market conditions', placeholder: 'stable', options: ['hot', 'stable', 'declining'] },
    { id: 'loanPurpose', name: 'Loan Purpose', type: 'select', required: false, description: 'Purpose of the loan', placeholder: 'home-improvement', options: ['home-improvement', 'debt-consolidation', 'education', 'emergency-fund', 'investment', 'other'] },
    { id: 'propertyTaxes', name: 'Annual Property Taxes', type: 'number', unit: 'USD', required: false, description: 'Annual property taxes', placeholder: '5000', min: 0, max: 100000 },
    { id: 'homeownersInsurance', name: 'Annual Homeowners Insurance', type: 'number', unit: 'USD', required: false, description: 'Annual homeowners insurance premium', placeholder: '2000', min: 0, max: 50000 },
    { id: 'hoaFees', name: 'Monthly HOA Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly homeowners association fees', placeholder: '200', min: 0, max: 5000 },
    { id: 'prepaymentPenalty', name: 'Prepayment Penalty', type: 'number', unit: '%', required: false, description: 'Prepayment penalty percentage', placeholder: '2', min: 0, max: 5 },
    { id: 'lateFees', name: 'Late Fees', type: 'number', unit: 'USD', required: false, description: 'Late payment fees', placeholder: '50', min: 0, max: 100 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Your marginal tax rate for tax benefit calculations', placeholder: '22', min: 0, max: 50 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: 0, max: 10 }
  ],
  outputs: [
    { id: 'availableEquity', name: 'Available Equity', type: 'number', unit: 'USD', description: 'Total available home equity' },
    { id: 'maxLoanAmount', name: 'Maximum Loan Amount', type: 'number', unit: 'USD', description: 'Maximum amount you can borrow' },
    { id: 'approvedLoanAmount', name: 'Approved Loan Amount', type: 'number', unit: 'USD', description: 'Amount approved based on your request and qualifications' },
    { id: 'currentLTV', name: 'Current LTV', type: 'number', unit: '%', description: 'Current loan-to-value ratio' },
    { id: 'proposedCLTV', name: 'Proposed CLTV', type: 'number', unit: '%', description: 'Proposed combined loan-to-value ratio' },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly loan payment (principal and interest)' },
    { id: 'totalFees', name: 'Total Fees', type: 'number', unit: 'USD', description: 'Total loan fees and closing costs' },
    { id: 'apr', name: 'APR', type: 'number', unit: '%', description: 'Annual percentage rate including fees' },
    { id: 'effectiveRate', name: 'Effective Rate', type: 'number', unit: '%', description: 'Effective interest rate after tax benefits' },
    { id: 'totalInterest', name: 'Total Interest', type: 'number', unit: 'USD', description: 'Total interest paid over loan term' },
    { id: 'totalCost', name: 'Total Cost', type: 'number', unit: 'USD', description: 'Total cost of the loan including fees and interest' },
    { id: 'debtServiceCoverage', name: 'Debt Service Coverage', type: 'number', unit: 'ratio', description: 'Debt service coverage ratio' },
    { id: 'paymentToIncomeRatio', name: 'Payment-to-Income Ratio', type: 'number', unit: '%', description: 'Loan payment as percentage of income' },
    { id: 'breakEvenMonths', name: 'Break-Even Months', type: 'number', unit: 'months', description: 'Months to break even on closing costs' },
    { id: 'taxBenefits', name: 'Annual Tax Benefits', type: 'number', unit: 'USD', description: 'Annual tax benefits from interest deduction' },
    { id: 'inflationHedgeScore', name: 'Inflation Hedge Score', type: 'number', unit: 'score', description: 'Score indicating inflation protection value' },
    { id: 'liquidityScore', name: 'Liquidity Score', type: 'number', unit: 'score', description: 'Liquidity assessment score' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', unit: 'score', description: 'Risk assessment score' },
    { id: 'feasibilityScore', name: 'Feasibility Score', type: 'number', unit: 'score', description: 'Overall feasibility score' },
    { id: 'maxBorrowingAmount', name: 'Maximum Borrowing Amount', type: 'number', unit: 'USD', description: 'Maximum amount you could potentially borrow' },
    { id: 'recommendedLoanAmount', name: 'Recommended Loan Amount', type: 'number', unit: 'USD', description: 'Recommended loan amount for optimal terms' },
    { id: 'monthlyCashFlow', name: 'Monthly Cash Flow Impact', type: 'number', unit: 'USD', description: 'Monthly cash flow impact' },
    { id: 'annualCashFlow', name: 'Annual Cash Flow Impact', type: 'number', unit: 'USD', description: 'Annual cash flow impact' },
    { id: 'equityUtilization', name: 'Equity Utilization', type: 'number', unit: '%', description: 'Percentage of available equity being used' },
    { id: 'costOfBorrowing', name: 'Cost of Borrowing', type: 'number', unit: '%', description: 'Effective cost of borrowing' },
    { id: 'investmentGrade', name: 'Investment Grade', type: 'string', description: 'Investment grade assessment' },
    { id: 'recommendedAction', name: 'Recommended Action', type: 'string', description: 'Recommended action based on analysis' },
    { id: 'homeEquityLoanAnalysis', name: 'Home Equity Loan Analysis', type: 'string', description: 'Comprehensive home equity loan analysis report' }
  ],
  calculate: (inputs) => {
    return calculateHomeEquityLoan(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateHomeEquityLoanAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Available Equity',
      description: 'Calculate available home equity',
      formula: 'Available Equity = Home Value - Current Mortgage Balance',
      variables: {
        'Home Value': 'Current market value of the property',
        'Current Mortgage Balance': 'Outstanding balance on existing mortgage'
      }
    },
    {
      name: 'Maximum Loan Amount',
      description: 'Calculate maximum loan amount based on LTV and CLTV limits',
      formula: 'Max Loan = min(Home Value * Max LTV - Current Mortgage, Home Value * Max CLTV - Current Mortgage)',
      variables: {
        'Max LTV': 'Maximum loan-to-value ratio',
        'Max CLTV': 'Maximum combined loan-to-value ratio',
        'Home Value': 'Current market value of the property'
      }
    },
    {
      name: 'Monthly Payment',
      description: 'Calculate monthly payment using standard loan formula',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      variables: {
        P: 'Monthly payment',
        L: 'Loan amount',
        c: 'Monthly interest rate (annual rate / 12)',
        n: 'Total number of payments (years * 12)'
      }
    },
    {
      name: 'APR Calculation',
      description: 'Calculate annual percentage rate including fees',
      formula: 'APR = ((Total Cost / Loan Amount)^(1/Years) - 1) * 100',
      variables: {
        'Total Cost': 'Total cost including fees and interest',
        'Loan Amount': 'Original loan amount',
        'Years': 'Loan term in years'
      }
    }
  ],
  examples: [
    {
      name: 'Home Improvement Loan',
      description: 'Typical home improvement scenario with moderate equity',
      inputs: {
        homeValue: 500000,
        currentMortgageBalance: 300000,
        loanAmount: 50000,
        interestRate: 7.5,
        loanTerm: 15,
        maxLTV: 85,
        maxCLTV: 90,
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        loanPurpose: 'home-improvement'
      },
      expectedOutputs: {
        availableEquity: 200000,
        maxLoanAmount: 125000,
        monthlyPayment: 463,
        currentLTV: 60,
        proposedCLTV: 70,
        feasibilityScore: 75
      }
    },
    {
      name: 'Debt Consolidation Loan',
      description: 'Debt consolidation scenario with high equity',
      inputs: {
        homeValue: 600000,
        currentMortgageBalance: 200000,
        loanAmount: 100000,
        interestRate: 8.0,
        loanTerm: 20,
        maxLTV: 80,
        maxCLTV: 85,
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        loanPurpose: 'debt-consolidation'
      },
      expectedOutputs: {
        availableEquity: 400000,
        maxLoanAmount: 280000,
        monthlyPayment: 836,
        currentLTV: 33,
        proposedCLTV: 50,
        feasibilityScore: 80
      }
    },
    {
      name: 'Conservative Loan',
      description: 'Conservative borrowing with low equity utilization',
      inputs: {
        homeValue: 400000,
        currentMortgageBalance: 250000,
        loanAmount: 25000,
        interestRate: 6.5,
        loanTerm: 10,
        maxLTV: 85,
        maxCLTV: 90,
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        loanPurpose: 'emergency-fund'
      },
      expectedOutputs: {
        availableEquity: 150000,
        maxLoanAmount: 90000,
        monthlyPayment: 284,
        currentLTV: 63,
        proposedCLTV: 69,
        feasibilityScore: 85
      }
    }
  ]
};

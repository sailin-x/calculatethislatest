import { Calculator } from '../../../types/calculator';

export const StudentLoanCalculator: Calculator = {
  id: 'student-loan-calculator',
  name: 'Student Loan Calculator',
  category: 'finance',
  subcategory: 'education',
  description: 'Calculate student loan payments, total interest, repayment strategies, and analyze different repayment plans',
  inputs: [
    // Loan Details
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Total student loan amount', placeholder: '50000', min: 0, max: 1000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate', placeholder: '6.8', min: 0, max: 20, step: 0.125 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: true, description: 'Loan term in years', placeholder: '10', min: 1, max: 30 },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: false, description: 'Type of student loan', options: [
      { value: 'federal-subsidized', label: 'Federal Subsidized' },
      { value: 'federal-unsubsidized', label: 'Federal Unsubsidized' },
      { value: 'federal-plus', label: 'Federal PLUS' },
      { value: 'private', label: 'Private Loan' },
      { value: 'consolidated', label: 'Consolidated Loan' }
    ] },
    { id: 'disbursementDate', name: 'Disbursement Date', type: 'date', required: false, description: 'Date loan was disbursed' },
    { id: 'gracePeriod', name: 'Grace Period', type: 'number', unit: 'months', required: false, description: 'Grace period before repayment begins', placeholder: '6', min: 0, max: 60 },

    // Repayment Plan
    { id: 'repaymentPlan', name: 'Repayment Plan', type: 'select', required: false, description: 'Federal repayment plan type', options: [
      { value: 'standard', label: 'Standard (10 years)' },
      { value: 'extended', label: 'Extended (25 years)' },
      { value: 'graduated', label: 'Graduated (10 years)' },
      { value: 'income-based', label: 'Income-Based Repayment (IBR)' },
      { value: 'pay-as-you-earn', label: 'Pay As You Earn (PAYE)' },
      { value: 'revised-pay-as-you-earn', label: 'Revised Pay As You Earn (REPAYE)' },
      { value: 'income-contingent', label: 'Income-Contingent Repayment (ICR)' },
      { value: 'income-sensitive', label: 'Income-Sensitive Repayment' }
    ] },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', required: false, description: 'Fixed monthly payment (if known)', placeholder: '575', min: 0, max: 10000 },

    // Income-Based Repayment Details
    { id: 'annualIncome', name: 'Annual Income', type: 'number', unit: 'USD', required: false, description: 'Annual gross income for income-based plans', placeholder: '45000', min: 0, max: 1000000 },
    { id: 'familySize', name: 'Family Size', type: 'number', required: false, description: 'Number of people in household', placeholder: '1', min: 1, max: 10 },
    { id: 'filingStatus', name: 'Filing Status', type: 'select', required: false, description: 'Tax filing status', options: [
      { value: 'single', label: 'Single' },
      { value: 'married-filing-jointly', label: 'Married Filing Jointly' },
      { value: 'married-filing-separately', label: 'Married Filing Separately' },
      { value: 'head-of-household', label: 'Head of Household' }
    ] },
    { id: 'stateOfResidence', name: 'State of Residence', type: 'select', required: false, description: 'State of residence for poverty guidelines', options: [
      { value: 'al', label: 'Alabama' }, { value: 'ak', label: 'Alaska' }, { value: 'az', label: 'Arizona' }, { value: 'ar', label: 'Arkansas' },
      { value: 'ca', label: 'California' }, { value: 'co', label: 'Colorado' }, { value: 'ct', label: 'Connecticut' }, { value: 'de', label: 'Delaware' },
      { value: 'fl', label: 'Florida' }, { value: 'ga', label: 'Georgia' }, { value: 'hi', label: 'Hawaii' }, { value: 'id', label: 'Idaho' },
      { value: 'il', label: 'Illinois' }, { value: 'in', label: 'Indiana' }, { value: 'ia', label: 'Iowa' }, { value: 'ks', label: 'Kansas' },
      { value: 'ky', label: 'Kentucky' }, { value: 'la', label: 'Louisiana' }, { value: 'me', label: 'Maine' }, { value: 'md', label: 'Maryland' },
      { value: 'ma', label: 'Massachusetts' }, { value: 'mi', label: 'Michigan' }, { value: 'mn', label: 'Minnesota' }, { value: 'ms', label: 'Mississippi' },
      { value: 'mo', label: 'Missouri' }, { value: 'mt', label: 'Montana' }, { value: 'ne', label: 'Nebraska' }, { value: 'nv', label: 'Nevada' },
      { value: 'nh', label: 'New Hampshire' }, { value: 'nj', label: 'New Jersey' }, { value: 'nm', label: 'New Mexico' }, { value: 'ny', label: 'New York' },
      { value: 'nc', label: 'North Carolina' }, { value: 'nd', label: 'North Dakota' }, { value: 'oh', label: 'Ohio' }, { value: 'ok', label: 'Oklahoma' },
      { value: 'or', label: 'Oregon' }, { value: 'pa', label: 'Pennsylvania' }, { value: 'ri', label: 'Rhode Island' }, { value: 'sc', label: 'South Carolina' },
      { value: 'sd', label: 'South Dakota' }, { value: 'tn', label: 'Tennessee' }, { value: 'tx', label: 'Texas' }, { value: 'ut', label: 'Utah' },
      { value: 'vt', label: 'Vermont' }, { value: 'va', label: 'Virginia' }, { value: 'wa', label: 'Washington' }, { value: 'wv', label: 'West Virginia' },
      { value: 'wi', label: 'Wisconsin' }, { value: 'wy', label: 'Wyoming' }
    ] },

    // Additional Financial Information
    { id: 'otherDebts', name: 'Other Debts', type: 'number', unit: 'USD', required: false, description: 'Monthly payments on other debts', placeholder: '200', min: 0, max: 10000 },
    { id: 'monthlyExpenses', name: 'Monthly Expenses', type: 'number', unit: 'USD', required: false, description: 'Other monthly expenses', placeholder: '1500', min: 0, max: 50000 },
    { id: 'emergencyFund', name: 'Emergency Fund', type: 'number', unit: 'USD', required: false, description: 'Current emergency fund balance', placeholder: '5000', min: 0, max: 100000 },
    { id: 'monthlySavings', name: 'Monthly Savings', type: 'number', unit: 'USD', required: false, description: 'Monthly savings goal', placeholder: '500', min: 0, max: 10000 },

    // Repayment Strategy
    { id: 'repaymentStrategy', name: 'Repayment Strategy', type: 'select', required: false, description: 'Preferred repayment strategy', options: [
      { value: 'minimum-payments', label: 'Minimum Payments' },
      { value: 'debt-snowball', label: 'Debt Snowball (Lowest Balance First)' },
      { value: 'debt-avalanche', label: 'Debt Avalanche (Highest Interest First)' },
      { value: 'aggressive-payoff', label: 'Aggressive Payoff' },
      { value: 'income-based', label: 'Income-Based Repayment' }
    ] },
    { id: 'extraPayment', name: 'Extra Payment', type: 'number', unit: 'USD', required: false, description: 'Additional monthly payment', placeholder: '100', min: 0, max: 10000 },
    { id: 'lumpSumPayment', name: 'Lump Sum Payment', type: 'number', unit: 'USD', required: false, description: 'One-time lump sum payment', placeholder: '5000', min: 0, max: 100000 },

    // Refinancing Options
    { id: 'refinanceRate', name: 'Refinance Rate', type: 'number', unit: '%', required: false, description: 'Potential refinance interest rate', placeholder: '4.5', min: 0, max: 20, step: 0.125 },
    { id: 'refinanceTerm', name: 'Refinance Term', type: 'number', unit: 'years', required: false, description: 'Refinance loan term', placeholder: '7', min: 1, max: 30 },
    { id: 'refinanceFees', name: 'Refinance Fees', type: 'number', unit: 'USD', required: false, description: 'Refinancing fees and costs', placeholder: '2000', min: 0, max: 10000 },

    // Analysis Period
    { id: 'analysisPeriod', name: 'Analysis Period', type: 'select', required: false, description: 'Period for detailed analysis', options: [
      { value: '1-year', label: '1 Year' },
      { value: '5-year', label: '5 Years' },
      { value: '10-year', label: '10 Years' },
      { value: 'full-term', label: 'Full Term' }
    ] }
  ],
  outputs: [
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly loan payment' },
    { id: 'totalInterest', name: 'Total Interest', type: 'number', unit: 'USD', description: 'Total interest paid over loan term' },
    { id: 'totalPayments', name: 'Total Payments', type: 'number', unit: 'USD', description: 'Total amount paid over loan term' },
    { id: 'payoffDate', name: 'Payoff Date', type: 'string', description: 'Expected loan payoff date' },
    { id: 'amortizationSchedule', name: 'Amortization Schedule', type: 'array', description: 'Year-by-year payment breakdown' },
    { id: 'interestToPrincipalRatio', name: 'Interest to Principal Ratio', type: 'number', description: 'Ratio of interest to principal payments' },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', description: 'Monthly debt payments to income ratio' },
    { id: 'affordabilityScore', name: 'Affordability Score', type: 'number', description: 'Loan affordability assessment (0-100)' },
    { id: 'repaymentEfficiency', name: 'Repayment Efficiency', type: 'number', unit: '%', description: 'Efficiency of repayment strategy' },
    { id: 'savingsImpact', name: 'Savings Impact', type: 'number', unit: 'USD', description: 'Impact on monthly savings' },
    { id: 'emergencyFundImpact', name: 'Emergency Fund Impact', type: 'number', unit: 'USD', description: 'Impact on emergency fund building' },
    { id: 'refinanceSavings', name: 'Refinance Savings', type: 'number', unit: 'USD', description: 'Potential savings from refinancing' },
    { id: 'refinancePayoffDate', name: 'Refinance Payoff Date', type: 'string', description: 'Payoff date with refinancing' },
    { id: 'incomeBasedPayment', name: 'Income-Based Payment', type: 'number', unit: 'USD', description: 'Monthly payment under income-based plan' },
    { id: 'forgivenessAmount', name: 'Forgiveness Amount', type: 'number', unit: 'USD', description: 'Potential loan forgiveness amount' },
    { id: 'forgivenessDate', name: 'Forgiveness Date', type: 'string', description: 'Date of potential loan forgiveness' },
    { id: 'repaymentPlanComparison', name: 'Repayment Plan Comparison', type: 'array', description: 'Comparison of different repayment plans' },
    { id: 'recommendedStrategy', name: 'Recommended Strategy', type: 'string', description: 'Recommended repayment strategy' },
    { id: 'keyBenefits', name: 'Key Benefits', type: 'string', description: 'Key benefits of recommended strategy' },
    { id: 'keyRisks', name: 'Key Risks', type: 'string', description: 'Key risks to consider' },
    { id: 'studentLoanAnalysis', name: 'Student Loan Analysis', type: 'string', description: 'Comprehensive student loan analysis report' }
  ],
  calculate: (inputs) => {
    const { calculateStudentLoan } = require('./formulas');
    return calculateStudentLoan(inputs);
  },
  generateReport: (inputs, outputs) => {
    const { generateStudentLoanAnalysis } = require('./formulas');
    return generateStudentLoanAnalysis(inputs, outputs);
  },
  formulas: require('./formulas')
};

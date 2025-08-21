import { Calculator } from '../../../types/calculator';
import { calculateMortgageQualification, generateMortgageQualificationAnalysis } from './formulas';
import { validateMortgageQualificationInputs } from './validation';

export const MortgageQualificationCalculator: Calculator = {
  id: 'mortgage-qualification-calculator',
  name: 'Mortgage Qualification Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage qualification, maximum loan amounts, and debt-to-income ratios to determine loan eligibility.',
  inputs: [
    {
      id: 'annualIncome',
      name: 'Annual Income',
      type: 'number',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '75000',
      description: 'Total annual gross income'
    },
    {
      id: 'monthlyIncome',
      name: 'Monthly Income',
      type: 'number',
      required: false,
      min: 1000,
      max: 1000000,
      step: 100,
      placeholder: '6250',
      description: 'Total monthly gross income'
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '50000',
      description: 'Available down payment amount'
    },
    {
      id: 'downPaymentPercent',
      name: 'Down Payment (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.5,
      placeholder: '20',
      description: 'Down payment as percentage of home price'
    },
    {
      id: 'propertyPrice',
      name: 'Property Price',
      type: 'number',
      required: false,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '250000',
      description: 'Target property purchase price'
    },
    {
      id: 'interestRate',
      name: 'Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 25,
      step: 0.125,
      placeholder: '4.5',
      description: 'Expected mortgage interest rate'
    },
    {
      id: 'loanTerm',
      name: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      description: 'Mortgage loan term'
    },
    {
      id: 'loanType',
      name: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' }
      ],
      placeholder: 'conventional',
      description: 'Type of mortgage loan'
    },
    {
      id: 'creditScore',
      name: 'Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '720',
      description: 'Your credit score'
    },
    {
      id: 'monthlyDebts',
      name: 'Monthly Debts',
      type: 'number',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '800',
      description: 'Total monthly debt payments (excluding housing)'
    },
    {
      id: 'propertyTax',
      name: 'Annual Property Tax',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '3000',
      description: 'Annual property tax amount'
    },
    {
      id: 'propertyTaxRate',
      name: 'Property Tax Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 0.01,
      placeholder: '1.2',
      description: 'Property tax rate as percentage of property value'
    },
    {
      id: 'homeInsurance',
      name: 'Annual Home Insurance',
      type: 'number',
      required: false,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '1200',
      description: 'Annual homeowners insurance premium'
    },
    {
      id: 'hoaFees',
      name: 'Monthly HOA Fees',
      type: 'number',
      required: false,
      min: 0,
      max: 2000,
      step: 10,
      placeholder: '200',
      description: 'Monthly homeowners association fees'
    },
    {
      id: 'pmi',
      name: 'PMI Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      placeholder: '0.5',
      description: 'Private mortgage insurance rate'
    },
    {
      id: 'closingCosts',
      name: 'Closing Costs',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '8000',
      description: 'Estimated closing costs'
    },
    {
      id: 'reserves',
      name: 'Cash Reserves',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '25000',
      description: 'Available cash reserves after down payment'
    },
    {
      id: 'employmentType',
      name: 'Employment Type',
      type: 'select',
      required: false,
      options: [
        { value: 'w2', label: 'W-2 Employee' },
        { value: 'self-employed', label: 'Self-Employed' },
        { value: 'business-owner', label: 'Business Owner' },
        { value: 'retired', label: 'Retired' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'w2',
      description: 'Type of employment'
    },
    {
      id: 'employmentLength',
      name: 'Employment Length (Years)',
      type: 'number',
      required: false,
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: '5',
      description: 'Length of current employment'
    },
    {
      id: 'debtTypes',
      name: 'Debt Types',
      type: 'multiselect',
      required: false,
      options: [
        { value: 'auto-loan', label: 'Auto Loan' },
        { value: 'student-loan', label: 'Student Loan' },
        { value: 'credit-card', label: 'Credit Card' },
        { value: 'personal-loan', label: 'Personal Loan' },
        { value: 'business-loan', label: 'Business Loan' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: ['auto-loan', 'student-loan'],
      description: 'Types of existing debt'
    },
    {
      id: 'bankruptcy',
      name: 'Bankruptcy History',
      type: 'select',
      required: false,
      options: [
        { value: 'none', label: 'None' },
        { value: 'chapter7', label: 'Chapter 7 (Discharge Date)' },
        { value: 'chapter13', label: 'Chapter 13 (Discharge Date)' }
      ],
      placeholder: 'none',
      description: 'Bankruptcy history if applicable'
    },
    {
      id: 'bankruptcyDate',
      name: 'Bankruptcy Discharge Date',
      type: 'date',
      required: false,
      placeholder: '2020-01-01',
      description: 'Date of bankruptcy discharge (if applicable)'
    },
    {
      id: 'foreclosure',
      name: 'Foreclosure History',
      type: 'select',
      required: false,
      options: [
        { value: 'none', label: 'None' },
        { value: 'recent', label: 'Recent (Within 7 Years)' },
        { value: 'older', label: 'Older (7+ Years Ago)' }
      ],
      placeholder: 'none',
      description: 'Foreclosure history if applicable'
    },
    {
      id: 'foreclosureDate',
      name: 'Foreclosure Date',
      type: 'date',
      required: false,
      placeholder: '2018-01-01',
      description: 'Date of foreclosure (if applicable)'
    },
    {
      id: 'coBorrower',
      name: 'Co-Borrower',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Will there be a co-borrower on the loan?'
    },
    {
      id: 'coBorrowerIncome',
      name: 'Co-Borrower Annual Income',
      type: 'number',
      required: false,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '60000',
      description: 'Co-borrower annual income (if applicable)'
    },
    {
      id: 'coBorrowerDebts',
      name: 'Co-Borrower Monthly Debts',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '500',
      description: 'Co-borrower monthly debt payments (if applicable)'
    },
    {
      id: 'coBorrowerCreditScore',
      name: 'Co-Borrower Credit Score',
      type: 'number',
      required: false,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '700',
      description: 'Co-borrower credit score (if applicable)'
    },
    {
      id: 'includeTaxes',
      name: 'Include Property Taxes',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Include property taxes in qualification calculations'
    },
    {
      id: 'includeInsurance',
      name: 'Include Insurance',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Include insurance in qualification calculations'
    },
    {
      id: 'includePMI',
      name: 'Include PMI',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Include PMI in qualification calculations'
    },
    {
      id: 'includeHOA',
      name: 'Include HOA Fees',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Include HOA fees in qualification calculations'
    },
    {
      id: 'qualificationMethod',
      name: 'Qualification Method',
      type: 'select',
      required: false,
      options: [
        { value: 'standard', label: 'Standard (28/36 Rule)' },
        { value: 'fha', label: 'FHA Guidelines' },
        { value: 'va', label: 'VA Guidelines' },
        { value: 'usda', label: 'USDA Guidelines' },
        { value: 'jumbo', label: 'Jumbo Guidelines' }
      ],
      placeholder: 'standard',
      description: 'Qualification method to use'
    },
    {
      id: 'frontEndRatio',
      name: 'Front-End Ratio (%)',
      type: 'number',
      required: false,
      min: 20,
      max: 50,
      step: 1,
      placeholder: '28',
      description: 'Maximum front-end ratio percentage'
    },
    {
      id: 'backEndRatio',
      name: 'Back-End Ratio (%)',
      type: 'number',
      required: false,
      min: 30,
      max: 55,
      step: 1,
      placeholder: '36',
      description: 'Maximum back-end ratio percentage'
    }
  ],
  outputs: [
    {
      id: 'qualified',
      name: 'Qualified',
      type: 'boolean',
      description: 'Whether the borrower qualifies for the loan'
    },
    {
      id: 'maxLoanAmount',
      name: 'Maximum Loan Amount',
      type: 'number',
      description: 'Maximum loan amount borrower can qualify for'
    },
    {
      id: 'maxHomePrice',
      name: 'Maximum Home Price',
      type: 'number',
      description: 'Maximum home price borrower can afford'
    },
    {
      id: 'frontEndRatio',
      name: 'Front-End Ratio',
      type: 'number',
      description: 'Housing expense to income ratio'
    },
    {
      id: 'backEndRatio',
      name: 'Back-End Ratio',
      type: 'number',
      description: 'Total debt to income ratio'
    },
    {
      id: 'monthlyPayment',
      name: 'Monthly Payment',
      type: 'number',
      description: 'Estimated monthly mortgage payment'
    },
    {
      id: 'qualificationAnalysis',
      name: 'Qualification Analysis',
      type: 'object',
      description: 'Detailed qualification analysis'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'object',
      description: 'Assessment of qualification risk factors'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'array',
      description: 'Recommendations to improve qualification'
    },
    {
      id: 'loanOptions',
      name: 'Loan Options',
      type: 'object',
      description: 'Available loan options and programs'
    }
  ],
  calculate: (inputs) => {
    return calculateMortgageQualification(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateMortgageQualificationAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Front-End Ratio',
      formula: 'Front-End Ratio = (Monthly Housing Expenses / Monthly Income) × 100',
      description: 'Housing expense to income ratio (typically max 28%)'
    },
    {
      name: 'Back-End Ratio',
      formula: 'Back-End Ratio = ((Monthly Housing Expenses + Monthly Debts) / Monthly Income) × 100',
      description: 'Total debt to income ratio (typically max 36%)'
    },
    {
      name: 'Maximum Loan Amount',
      formula: 'Max Loan = (Monthly Income × Max Ratio) / Monthly Payment Factor',
      description: 'Maximum loan amount based on income and ratios'
    },
    {
      name: 'Monthly Payment',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Where P = monthly payment, L = loan amount, c = monthly interest rate, n = total number of payments'
    }
  ]
};
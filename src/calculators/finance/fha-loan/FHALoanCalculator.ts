import { Calculator } from '../../../types/calculator';
import { calculateFHALoan, generateFHALoanAnalysis } from './formulas';
import { validateFHALoanInputs } from './validation';

export const FHALoanCalculator: Calculator = {
  id: 'fha-loan-calculator',
  name: 'FHA Loan Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate FHA loan payments, requirements, mortgage insurance, and eligibility for Federal Housing Administration loans.',
  inputs: [
    { id: 'homePrice', name: 'Home Price', type: 'number', unit: 'USD', required: true, description: 'Purchase price of the home', placeholder: '300000', min: 50000, max: 10000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: true, description: 'Amount of down payment', placeholder: '10500', min: 1000, max: 5000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: true, description: 'Annual interest rate for the FHA loan', placeholder: '6.5', min: 1, max: 20 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: true, description: 'Loan term in years', placeholder: '30', min: 15, max: 30 },
    { id: 'annualIncome', name: 'Annual Income', type: 'number', unit: 'USD', required: true, description: 'Borrower\'s annual income', placeholder: '75000', min: 10000, max: 1000000 },
    { id: 'monthlyDebt', name: 'Monthly Debt Payments', type: 'number', unit: 'USD', required: true, description: 'Total monthly debt payments (excluding housing)', placeholder: '500', min: 0, max: 10000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', unit: 'score', required: true, description: 'Borrower\'s credit score', placeholder: '680', min: 500, max: 850 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: true, description: 'Type of property being purchased', placeholder: 'Select property type', options: ['single-family', 'duplex', 'triplex', 'fourplex', 'condo', 'townhouse', 'manufactured'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: true, description: 'How the property will be occupied', placeholder: 'Select occupancy type', options: ['primary-residence', 'secondary-home', 'investment'] },
    { id: 'state', name: 'State', type: 'select', required: true, description: 'State where the property is located', placeholder: 'Select state', options: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'] },
    { id: 'propertyTaxes', name: 'Annual Property Taxes', type: 'number', unit: 'USD', required: true, description: 'Annual property taxes', placeholder: '3000', min: 0, max: 100000 },
    { id: 'homeInsurance', name: 'Annual Home Insurance', type: 'number', unit: 'USD', required: true, description: 'Annual homeowners insurance premium', placeholder: '1200', min: 0, max: 50000 },
    { id: 'hoaFees', name: 'Monthly HOA Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly homeowners association fees', placeholder: '200', min: 0, max: 2000 },
    { id: 'floodInsurance', name: 'Annual Flood Insurance', type: 'number', unit: 'USD', required: false, description: 'Annual flood insurance premium (if required)', placeholder: '500', min: 0, max: 10000 },
    { id: 'loanType', name: 'FHA Loan Type', type: 'select', required: true, description: 'Type of FHA loan program', placeholder: 'Select loan type', options: ['standard', 'streamline-refinance', '203k-rehab', 'energy-efficient', 'reverse-mortgage'] },
    { id: 'veteranStatus', name: 'Veteran Status', type: 'select', required: false, description: 'Veteran status for additional benefits', placeholder: 'Select veteran status', options: ['none', 'veteran', 'active-duty', 'reserve', 'national-guard'] },
    { id: 'firstTimeBuyer', name: 'First-Time Homebuyer', type: 'select', required: false, description: 'Whether this is a first-time homebuyer', placeholder: 'Select first-time buyer status', options: ['yes', 'no', 'unknown'] },
    { id: 'incomeType', name: 'Income Type', type: 'select', required: false, description: 'Type of income being used for qualification', placeholder: 'Select income type', options: ['w2-employment', 'self-employed', 'retirement', 'disability', 'social-security', 'other'] },
    { id: 'employmentLength', name: 'Employment Length', type: 'number', unit: 'years', required: false, description: 'Length of current employment in years', placeholder: '3', min: 0, max: 50 },
    { id: 'reserves', name: 'Cash Reserves', type: 'number', unit: 'USD', required: false, description: 'Available cash reserves after closing', placeholder: '10000', min: 0, max: 1000000 },
    { id: 'giftFunds', name: 'Gift Funds', type: 'number', unit: 'USD', required: false, description: 'Amount of gift funds being used for down payment', placeholder: '5000', min: 0, max: 100000 },
    { id: 'sellerConcessions', name: 'Seller Concessions', type: 'number', unit: 'USD', required: false, description: 'Amount of seller concessions or credits', placeholder: '3000', min: 0, max: 100000 },
    { id: 'closingCosts', name: 'Estimated Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Estimated closing costs', placeholder: '8000', min: 0, max: 100000 },
    { id: 'prepaidItems', name: 'Prepaid Items', type: 'number', unit: 'USD', required: false, description: 'Prepaid items (insurance, taxes, etc.)', placeholder: '2000', min: 0, max: 50000 },
    { id: 'rateLock', name: 'Rate Lock Period', type: 'select', required: false, description: 'Rate lock period in days', placeholder: 'Select rate lock period', options: ['15', '30', '45', '60', '90'] },
    { id: 'points', name: 'Discount Points', type: 'number', unit: 'points', required: false, description: 'Number of discount points purchased', placeholder: '0', min: 0, max: 10 },
    { id: 'lenderCredits', name: 'Lender Credits', type: 'number', unit: 'USD', required: false, description: 'Lender credits to reduce closing costs', placeholder: '1000', min: 0, max: 50000 }
  ],
  outputs: [
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', description: 'Total FHA loan amount' },
    { id: 'downPaymentPercentage', name: 'Down Payment Percentage', type: 'number', unit: '%', description: 'Down payment as percentage of home price' },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly principal and interest payment' },
    { id: 'monthlyMIP', name: 'Monthly MIP', type: 'number', unit: 'USD', description: 'Monthly mortgage insurance premium' },
    { id: 'monthlyTaxes', name: 'Monthly Taxes', type: 'number', unit: 'USD', description: 'Monthly property tax payment' },
    { id: 'monthlyInsurance', name: 'Monthly Insurance', type: 'number', unit: 'USD', description: 'Monthly insurance payment' },
    { id: 'totalMonthlyPayment', name: 'Total Monthly Payment', type: 'number', unit: 'USD', description: 'Total monthly payment including P&I, MIP, taxes, and insurance' },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', description: 'Total debt-to-income ratio' },
    { id: 'frontEndDTI', name: 'Front-End DTI', type: 'number', unit: '%', description: 'Housing debt-to-income ratio' },
    { id: 'backEndDTI', name: 'Back-End DTI', type: 'number', unit: '%', description: 'Total debt-to-income ratio including housing' },
    { id: 'loanToValueRatio', name: 'Loan-to-Value Ratio', type: 'number', unit: '%', description: 'Loan-to-value ratio' },
    { id: 'upfrontMIP', name: 'Upfront MIP', type: 'number', unit: 'USD', description: 'Upfront mortgage insurance premium' },
    { id: 'annualMIP', name: 'Annual MIP Rate', type: 'number', unit: '%', description: 'Annual mortgage insurance premium rate' },
    { id: 'totalMIPCost', name: 'Total MIP Cost', type: 'number', unit: 'USD', description: 'Total cost of mortgage insurance over loan term' },
    { id: 'totalInterest', name: 'Total Interest', type: 'number', unit: 'USD', description: 'Total interest paid over loan term' },
    { id: 'totalCost', name: 'Total Cost', type: 'number', unit: 'USD', description: 'Total cost of the loan including interest and MIP' },
    { id: 'amortizationSchedule', name: 'Amortization Schedule', type: 'string', description: 'Summary of loan amortization' },
    { id: 'eligibilityScore', name: 'Eligibility Score', type: 'number', unit: 'score', description: 'Overall FHA loan eligibility score' },
    { id: 'qualificationStatus', name: 'Qualification Status', type: 'string', description: 'Whether the borrower qualifies for the FHA loan' },
    { id: 'maxLoanAmount', name: 'Maximum Loan Amount', type: 'number', unit: 'USD', description: 'Maximum FHA loan amount for the area' },
    { id: 'minDownPayment', name: 'Minimum Down Payment', type: 'number', unit: 'USD', description: 'Minimum required down payment' },
    { id: 'maxHomePrice', name: 'Maximum Home Price', type: 'number', unit: 'USD', description: 'Maximum home price the borrower can afford' },
    { id: 'monthlyIncomeRequired', name: 'Monthly Income Required', type: 'number', unit: 'USD', description: 'Minimum monthly income required to qualify' },
    { id: 'cashToClose', name: 'Cash to Close', type: 'number', unit: 'USD', description: 'Total cash required to close the loan' },
    { id: 'monthlySavings', name: 'Monthly Savings vs Conventional', type: 'number', unit: 'USD', description: 'Monthly savings compared to conventional loan' },
    { id: 'totalSavings', name: 'Total Savings vs Conventional', type: 'number', unit: 'USD', description: 'Total savings over loan term vs conventional' },
    { id: 'fhaLoanAnalysis', name: 'FHA Loan Analysis', type: 'string', description: 'Comprehensive FHA loan analysis report' }
  ],
  calculate: (inputs) => {
    return calculateFHALoan(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateFHALoanAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Loan Amount',
      formula: 'Loan Amount = Home Price - Down Payment',
      description: 'Base loan amount before MIP'
    },
    {
      name: 'Monthly Payment',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Where P = monthly payment, L = loan amount, c = monthly interest rate, n = total number of payments'
    },
    {
      name: 'Upfront MIP',
      formula: 'Upfront MIP = Loan Amount × Upfront MIP Rate',
      description: 'One-time mortgage insurance premium paid at closing'
    },
    {
      name: 'Monthly MIP',
      formula: 'Monthly MIP = (Loan Amount × Annual MIP Rate) ÷ 12',
      description: 'Monthly mortgage insurance premium payment'
    },
    {
      name: 'Debt-to-Income Ratio',
      formula: 'DTI = (Monthly Debt + Housing Payment) ÷ Monthly Income × 100',
      description: 'Total debt-to-income ratio including housing costs'
    },
    {
      name: 'Loan-to-Value Ratio',
      formula: 'LTV = (Loan Amount ÷ Home Price) × 100',
      description: 'Loan amount as percentage of home value'
    },
    {
      name: 'Total Monthly Payment',
      formula: 'Total Payment = P&I + MIP + Taxes + Insurance + HOA',
      description: 'Complete monthly housing payment'
    },
    {
      name: 'Cash to Close',
      formula: 'Cash to Close = Down Payment + Closing Costs + Prepaid Items - Seller Concessions - Lender Credits',
      description: 'Total cash required at closing'
    }
  ],
  examples: [
    {
      name: 'First-Time Homebuyer',
      inputs: {
        homePrice: '300000',
        downPayment: '10500',
        interestRate: '6.5',
        loanTerm: '30',
        annualIncome: '75000',
        monthlyDebt: '500',
        creditScore: '680',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'CA',
        propertyTaxes: '3000',
        homeInsurance: '1200',
        hoaFees: '0',
        floodInsurance: '0',
        loanType: 'standard',
        veteranStatus: 'none',
        firstTimeBuyer: 'yes',
        incomeType: 'w2-employment',
        employmentLength: '3',
        reserves: '10000',
        giftFunds: '5000',
        sellerConcessions: '3000',
        closingCosts: '8000',
        prepaidItems: '2000',
        rateLock: '30',
        points: '0',
        lenderCredits: '1000'
      },
      description: 'Typical first-time homebuyer with 3.5% down payment and good credit'
    },
    {
      name: 'FHA Streamline Refinance',
      inputs: {
        homePrice: '350000',
        downPayment: '0',
        interestRate: '5.5',
        loanTerm: '30',
        annualIncome: '85000',
        monthlyDebt: '400',
        creditScore: '720',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'TX',
        propertyTaxes: '3500',
        homeInsurance: '1400',
        hoaFees: '150',
        floodInsurance: '0',
        loanType: 'streamline-refinance',
        veteranStatus: 'none',
        firstTimeBuyer: 'no',
        incomeType: 'w2-employment',
        employmentLength: '5',
        reserves: '15000',
        giftFunds: '0',
        sellerConcessions: '0',
        closingCosts: '6000',
        prepaidItems: '1500',
        rateLock: '45',
        points: '1',
        lenderCredits: '2000'
      },
      description: 'FHA streamline refinance to lower interest rate'
    },
    {
      name: 'FHA 203k Rehab Loan',
      inputs: {
        homePrice: '250000',
        downPayment: '8750',
        interestRate: '7.0',
        loanTerm: '30',
        annualIncome: '65000',
        monthlyDebt: '300',
        creditScore: '650',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        state: 'FL',
        propertyTaxes: '2500',
        homeInsurance: '1000',
        hoaFees: '0',
        floodInsurance: '0',
        loanType: '203k-rehab',
        veteranStatus: 'none',
        firstTimeBuyer: 'yes',
        incomeType: 'w2-employment',
        employmentLength: '2',
        reserves: '8000',
        giftFunds: '3000',
        sellerConcessions: '2000',
        closingCosts: '10000',
        prepaidItems: '1800',
        rateLock: '60',
        points: '0',
        lenderCredits: '500'
      },
      description: 'FHA 203k loan for home purchase with renovation costs'
    }
  ]
};

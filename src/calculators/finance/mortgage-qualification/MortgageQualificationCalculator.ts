import { Calculator } from '../../types';
import { MortgageQualificationInputs, MortgageQualificationOutputs } from './types';
import { calculateMortgageQualification } from './formulas';
import { validateMortgageQualificationInputs } from './validation';

export const MortgageQualificationCalculator: Calculator<MortgageQualificationInputs, MortgageQualificationOutputs> = {
  id: 'mortgage-qualification',
  name: 'Mortgage Qualification Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage qualification, approval probability, and loan eligibility',
  longDescription: `A comprehensive mortgage qualification calculator that analyzes borrower eligibility, approval probability, and loan qualification factors. This calculator helps borrowers understand their mortgage qualification status, including debt-to-income ratios, credit score requirements, and loan program eligibility. It includes detailed analysis of qualification factors, risk assessment, and optimization recommendations for mortgage qualification.`,
  
  inputs: {
    // Borrower Information
    borrowerIncome: {
      type: 'number',
      label: 'Borrower Income ($/year)',
      description: 'Annual gross income of primary borrower',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '75000'
    },
    coBorrowerIncome: {
      type: 'number',
      label: 'Co-Borrower Income ($/year)',
      description: 'Annual gross income of co-borrower',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '50000'
    },
    borrowerCreditScore: {
      type: 'number',
      label: 'Borrower Credit Score',
      description: 'Credit score of primary borrower (300-850)',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '720'
    },
    coBorrowerCreditScore: {
      type: 'number',
      label: 'Co-Borrower Credit Score',
      description: 'Credit score of co-borrower (300-850)',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '680'
    },
    borrowerEmploymentType: {
      type: 'select',
      label: 'Borrower Employment Type',
      description: 'Employment type of primary borrower',
      required: true,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'business_owner', label: 'Business Owner' },
        { value: 'unemployed', label: 'Unemployed' }
      ],
      placeholder: 'employed'
    },
    coBorrowerEmploymentType: {
      type: 'select',
      label: 'Co-Borrower Employment Type',
      description: 'Employment type of co-borrower',
      required: true,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'business_owner', label: 'Business Owner' },
        { value: 'unemployed', label: 'Unemployed' }
      ],
      placeholder: 'employed'
    },
    borrowerEmploymentLength: {
      type: 'number',
      label: 'Borrower Employment Length (years)',
      description: 'Years of employment for primary borrower',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: '5'
    },
    coBorrowerEmploymentLength: {
      type: 'number',
      label: 'Co-Borrower Employment Length (years)',
      description: 'Years of employment for co-borrower',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: '3'
    },
    
    // Income Details
    baseSalary: {
      type: 'number',
      label: 'Base Salary ($/year)',
      description: 'Base salary income',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '60000'
    },
    overtimeIncome: {
      type: 'number',
      label: 'Overtime Income ($/year)',
      description: 'Overtime income',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '5000'
    },
    bonusIncome: {
      type: 'number',
      label: 'Bonus Income ($/year)',
      description: 'Bonus income',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '3000'
    },
    commissionIncome: {
      type: 'number',
      label: 'Commission Income ($/year)',
      description: 'Commission income',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '2000'
    },
    rentalIncome: {
      type: 'number',
      label: 'Rental Income ($/year)',
      description: 'Rental income from properties',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '0'
    },
    investmentIncome: {
      type: 'number',
      label: 'Investment Income ($/year)',
      description: 'Investment income',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '1000'
    },
    otherIncome: {
      type: 'number',
      label: 'Other Income ($/year)',
      description: 'Other sources of income',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '0'
    },
    
    // Assets and Liabilities
    borrowerAssets: {
      type: 'number',
      label: 'Borrower Assets ($)',
      description: 'Total assets of primary borrower',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '100000'
    },
    coBorrowerAssets: {
      type: 'number',
      label: 'Co-Borrower Assets ($)',
      description: 'Total assets of co-borrower',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '50000'
    },
    borrowerLiquidity: {
      type: 'number',
      label: 'Borrower Liquidity ($)',
      description: 'Liquid assets of primary borrower',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '25000'
    },
    coBorrowerLiquidity: {
      type: 'number',
      label: 'Co-Borrower Liquidity ($)',
      description: 'Liquid assets of co-borrower',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '15000'
    },
    borrowerDebts: {
      type: 'number',
      label: 'Borrower Debts ($)',
      description: 'Total debts of primary borrower',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '15000'
    },
    coBorrowerDebts: {
      type: 'number',
      label: 'Co-Borrower Debts ($)',
      description: 'Total debts of co-borrower',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '10000'
    },
    
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value ($)',
      description: 'Current market value of the property',
      required: true,
      min: 10000,
      max: 50000000,
      step: 1000,
      placeholder: '400000'
    },
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Full property address',
      required: true,
      placeholder: '123 Main St, City, State 12345'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of property',
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family' },
        { value: 'multi_family', label: 'Multi Family' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial' }
      ],
      placeholder: 'single_family'
    },
    propertySize: {
      type: 'number',
      label: 'Property Size (sq ft)',
      description: 'Total square footage',
      required: true,
      min: 100,
      max: 100000,
      step: 100,
      placeholder: '2000'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age (years)',
      description: 'Age of the property',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '15'
    },
    
    // Loan Information
    loanAmount: {
      type: 'number',
      label: 'Loan Amount ($)',
      description: 'Total loan amount',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '320000'
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      description: 'Annual interest rate',
      required: true,
      min: 0,
      max: 50,
      step: 0.001,
      placeholder: '6.5'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term (years)',
      description: 'Length of the loan in years',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    loanType: {
      type: 'select',
      label: 'Loan Type',
      description: 'Type of mortgage loan',
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
      placeholder: 'conventional'
    },
    paymentType: {
      type: 'select',
      label: 'Payment Type',
      description: 'Type of payment structure',
      required: true,
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon' },
        { value: 'arm', label: 'Adjustable Rate (ARM)' }
      ],
      placeholder: 'principal_interest'
    },
    
    // Down Payment Information
    downPayment: {
      type: 'number',
      label: 'Down Payment ($)',
      description: 'Down payment amount',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '80000'
    },
    downPaymentPercentage: {
      type: 'number',
      label: 'Down Payment (%)',
      description: 'Down payment as percentage of property value',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '20'
    },
    downPaymentSource: {
      type: 'select',
      label: 'Down Payment Source',
      description: 'Source of down payment funds',
      required: true,
      options: [
        { value: 'savings', label: 'Savings' },
        { value: 'investment_sale', label: 'Investment Sale' },
        { value: 'gift', label: 'Gift' },
        { value: 'inheritance', label: 'Inheritance' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'savings'
    },
    
    // Insurance and Taxes
    propertyInsurance: {
      type: 'number',
      label: 'Property Insurance ($/year)',
      description: 'Annual property insurance cost',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '1200'
    },
    propertyTaxes: {
      type: 'number',
      label: 'Property Taxes ($/year)',
      description: 'Annual property tax cost',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '4800'
    },
    hoaFees: {
      type: 'number',
      label: 'HOA Fees ($/year)',
      description: 'Annual HOA fees',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '0'
    },
    floodInsurance: {
      type: 'number',
      label: 'Flood Insurance ($/year)',
      description: 'Annual flood insurance cost',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '0'
    },
    mortgageInsurance: {
      type: 'number',
      label: 'Mortgage Insurance ($/year)',
      description: 'Annual mortgage insurance cost',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '0'
    },
    mortgageInsuranceRate: {
      type: 'number',
      label: 'Mortgage Insurance Rate (%)',
      description: 'Annual mortgage insurance rate',
      required: true,
      min: 0,
      max: 10,
      step: 0.001,
      placeholder: '0.5'
    },
    
    // Debt Information
    creditCardDebt: {
      type: 'number',
      label: 'Credit Card Debt ($)',
      description: 'Total credit card debt',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '5000'
    },
    autoLoanDebt: {
      type: 'number',
      label: 'Auto Loan Debt ($)',
      description: 'Total auto loan debt',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '15000'
    },
    studentLoanDebt: {
      type: 'number',
      label: 'Student Loan Debt ($)',
      description: 'Total student loan debt',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '20000'
    },
    personalLoanDebt: {
      type: 'number',
      label: 'Personal Loan Debt ($)',
      description: 'Total personal loan debt',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '5000'
    },
    otherDebt: {
      type: 'number',
      label: 'Other Debt ($)',
      description: 'Other types of debt',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '0'
    },
    
    // Loan Program Requirements
    maxDebtToIncomeRatio: {
      type: 'number',
      label: 'Max Debt-to-Income Ratio (%)',
      description: 'Maximum allowed debt-to-income ratio',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '43'
    },
    maxHousingExpenseRatio: {
      type: 'number',
      label: 'Max Housing Expense Ratio (%)',
      description: 'Maximum allowed housing expense ratio',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '28'
    },
    minCreditScore: {
      type: 'number',
      label: 'Min Credit Score',
      description: 'Minimum required credit score',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '620'
    },
    minDownPayment: {
      type: 'number',
      label: 'Min Down Payment (%)',
      description: 'Minimum required down payment percentage',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '5'
    },
    maxLoanAmount: {
      type: 'number',
      label: 'Max Loan Amount ($)',
      description: 'Maximum allowed loan amount',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '800000'
    },
    
    // Market Information
    marketLocation: {
      type: 'text',
      label: 'Market Location',
      description: 'Geographic market area',
      required: true,
      placeholder: 'Los Angeles, CA'
    },
    marketCondition: {
      type: 'select',
      label: 'Market Condition',
      description: 'Current market conditions',
      required: true,
      options: [
        { value: 'declining', label: 'Declining' },
        { value: 'stable', label: 'Stable' },
        { value: 'growing', label: 'Growing' },
        { value: 'hot', label: 'Hot' }
      ],
      placeholder: 'stable'
    },
    marketGrowthRate: {
      type: 'number',
      label: 'Market Growth Rate (%)',
      description: 'Expected annual market growth',
      required: true,
      min: -20,
      max: 30,
      step: 0.1,
      placeholder: '3.0'
    },
    
    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (years)',
      description: 'Period for analysis',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    inflationRate: {
      type: 'number',
      label: 'Inflation Rate (%)',
      description: 'Expected annual inflation rate',
      required: true,
      min: -10,
      max: 20,
      step: 0.1,
      placeholder: '2.5'
    },
    propertyAppreciationRate: {
      type: 'number',
      label: 'Property Appreciation Rate (%)',
      description: 'Expected annual property appreciation',
      required: true,
      min: -20,
      max: 30,
      step: 0.1,
      placeholder: '3.0'
    },
    discountRate: {
      type: 'number',
      label: 'Discount Rate (%)',
      description: 'Discount rate for present value calculations',
      required: true,
      min: 0,
      max: 30,
      step: 0.1,
      placeholder: '5.0'
    },
    
    // Reporting Preferences
    currency: {
      type: 'select',
      label: 'Currency',
      description: 'Currency for calculations',
      required: true,
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      placeholder: 'USD'
    },
    displayFormat: {
      type: 'select',
      label: 'Display Format',
      description: 'Format for displaying results',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ],
      placeholder: 'currency'
    },
    includeCharts: {
      type: 'boolean',
      label: 'Include Charts',
      description: 'Include charts in results',
      required: false,
      placeholder: true
    }
  },
  
  calculate: calculateMortgageQualification,
  validate: validateMortgageQualificationInputs
};

import { Calculator } from '../../types';
import { MortgagePaymentInputs, MortgagePaymentOutputs } from './types';
import { calculateMortgagePayment } from './formulas';
import { validateMortgagePaymentInputs } from './validation';

export const MortgagePaymentCalculator: Calculator<MortgagePaymentInputs, MortgagePaymentOutputs> = {
  id: 'mortgage-payment',
  name: 'Mortgage Payment Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage payments, amortization, and loan analysis',
  longDescription: `A comprehensive mortgage payment calculator that analyzes loan structures, payment schedules, and financial implications. This calculator helps borrowers understand the financial impact of different mortgage options, including payment calculations, amortization schedules, and risk assessment. It includes detailed analysis of payment types, interest calculations, and optimization recommendations for mortgage decisions.`,
  
  inputs: {
    // Loan Information
    loanAmount: {
      type: 'number',
      label: 'Loan Amount ($)',
      description: 'Total loan amount',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '400000'
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
    
    // ARM Information
    armType: {
      type: 'select',
      label: 'ARM Type',
      description: 'Type of adjustable rate mortgage',
      required: false,
      options: [
        { value: '3_1', label: '3/1 ARM' },
        { value: '5_1', label: '5/1 ARM' },
        { value: '7_1', label: '7/1 ARM' },
        { value: '10_1', label: '10/1 ARM' },
        { value: 'custom', label: 'Custom' }
      ],
      placeholder: '5_1'
    },
    initialFixedPeriod: {
      type: 'number',
      label: 'Initial Fixed Period (years)',
      description: 'Number of years with fixed rate',
      required: false,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '5'
    },
    adjustmentPeriod: {
      type: 'number',
      label: 'Adjustment Period (months)',
      description: 'Frequency of rate adjustments',
      required: false,
      min: 1,
      max: 12,
      step: 1,
      placeholder: '12'
    },
    margin: {
      type: 'number',
      label: 'Margin (%)',
      description: 'Margin added to index rate',
      required: false,
      min: 0,
      max: 10,
      step: 0.001,
      placeholder: '2.5'
    },
    indexRate: {
      type: 'number',
      label: 'Index Rate (%)',
      description: 'Current index rate',
      required: false,
      min: 0,
      max: 20,
      step: 0.001,
      placeholder: '3.0'
    },
    lifetimeCap: {
      type: 'number',
      label: 'Lifetime Cap (%)',
      description: 'Maximum rate increase over loan life',
      required: false,
      min: 0,
      max: 20,
      step: 0.001,
      placeholder: '5.0'
    },
    periodicCap: {
      type: 'number',
      label: 'Periodic Cap (%)',
      description: 'Maximum rate increase per adjustment',
      required: false,
      min: 0,
      max: 10,
      step: 0.001,
      placeholder: '2.0'
    },
    floorRate: {
      type: 'number',
      label: 'Floor Rate (%)',
      description: 'Minimum interest rate',
      required: false,
      min: 0,
      max: 10,
      step: 0.001,
      placeholder: '3.0'
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
      placeholder: '500000'
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
      placeholder: '20'
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
      placeholder: '100000'
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
      placeholder: '6000'
    },
    hoaFees: {
      type: 'number',
      label: 'HOA Fees ($/year)',
      description: 'Annual HOA fees',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '2400'
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
    
    // Payment Information
    paymentFrequency: {
      type: 'select',
      label: 'Payment Frequency',
      description: 'How often payments are made',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'biweekly', label: 'Biweekly' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' }
      ],
      placeholder: 'monthly'
    },
    firstPaymentDate: {
      type: 'date',
      label: 'First Payment Date',
      description: 'Date of first payment',
      required: true,
      placeholder: '2024-02-01'
    },
    paymentDay: {
      type: 'number',
      label: 'Payment Day',
      description: 'Day of month for payments',
      required: true,
      min: 1,
      max: 31,
      step: 1,
      placeholder: '1'
    },
    
    // Points and Credits
    discountPoints: {
      type: 'number',
      label: 'Discount Points',
      description: 'Number of discount points',
      required: true,
      min: 0,
      max: 10,
      step: 0.25,
      placeholder: '0'
    },
    originationPoints: {
      type: 'number',
      label: 'Origination Points',
      description: 'Number of origination points',
      required: true,
      min: 0,
      max: 10,
      step: 0.25,
      placeholder: '1'
    },
    lenderCredits: {
      type: 'number',
      label: 'Lender Credits ($)',
      description: 'Credits from lender',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '0'
    },
    sellerCredits: {
      type: 'number',
      label: 'Seller Credits ($)',
      description: 'Credits from seller',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '0'
    },
    
    // Borrower Information
    borrowerIncome: {
      type: 'number',
      label: 'Borrower Income ($/year)',
      description: 'Annual gross income',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '100000'
    },
    borrowerCreditScore: {
      type: 'number',
      label: 'Borrower Credit Score',
      description: 'Credit score (300-850)',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '720'
    },
    borrowerDebtToIncomeRatio: {
      type: 'number',
      label: 'Debt-to-Income Ratio (%)',
      description: 'Monthly debt payments as percentage of income',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '35'
    },
    borrowerEmploymentType: {
      type: 'select',
      label: 'Employment Type',
      description: 'Type of employment',
      required: true,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'business_owner', label: 'Business Owner' }
      ],
      placeholder: 'employed'
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
  
  calculate: calculateMortgagePayment,
  validate: validateMortgagePaymentInputs
};

import { Calculator } from '../../types';
import { MortgagePointsInputs, MortgagePointsOutputs } from './types';
import { calculateMortgagePoints } from './formulas';
import { validateMortgagePointsInputs } from './validation';

export const MortgagePointsCalculator: Calculator<MortgagePointsInputs, MortgagePointsOutputs> = {
  id: 'mortgage-points',
  name: 'Mortgage Points Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage points cost, savings, and break-even analysis',
  longDescription: `A comprehensive mortgage points calculator that analyzes the cost and benefits of purchasing discount points to reduce interest rates. This calculator helps borrowers understand the financial impact of mortgage points, including break-even analysis, tax implications, and return on investment. It includes detailed analysis of different point options, sensitivity analysis, and optimization recommendations for mortgage point decisions.`,
  
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
    baseInterestRate: {
      type: 'number',
      label: 'Base Interest Rate (%)',
      description: 'Base interest rate without points',
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
    
    // Points Information
    discountPoints: {
      type: 'number',
      label: 'Discount Points',
      description: 'Number of discount points to purchase',
      required: true,
      min: 0,
      max: 10,
      step: 0.25,
      placeholder: '1'
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
    pointCost: {
      type: 'number',
      label: 'Point Cost ($)',
      description: 'Total cost of points',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '4000'
    },
    pointValue: {
      type: 'number',
      label: 'Point Value ($)',
      description: 'Value of each point',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '1000'
    },
    
    // Rate Options
    rateOptions: {
      type: 'array',
      label: 'Rate Options',
      description: 'Different rate and point combinations',
      required: false,
      placeholder: []
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
    borrowerTaxRate: {
      type: 'number',
      label: 'Borrower Tax Rate (%)',
      description: 'Marginal tax rate',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '25'
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
    taxDeductionPeriod: {
      type: 'number',
      label: 'Tax Deduction Period (years)',
      description: 'Period for tax deduction benefits',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
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
  
  calculate: calculateMortgagePoints,
  validate: validateMortgagePointsInputs
};

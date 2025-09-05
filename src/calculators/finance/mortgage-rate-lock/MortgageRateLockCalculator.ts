import { Calculator } from '../../types';
import { MortgageRateLockInputs, MortgageRateLockOutputs } from './types';
import { calculateMortgageRateLock } from './formulas';
import { validateMortgageRateLockInputs } from './validation';

export const MortgageRateLockCalculator: Calculator<MortgageRateLockInputs, MortgageRateLockOutputs> = {
  id: 'mortgage-rate-lock',
  name: 'Mortgage Rate Lock Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage rate lock value, risk, and optimization strategies',
  longDescription: `A comprehensive mortgage rate lock calculator that analyzes rate lock value, risk assessment, and optimization strategies. This calculator evaluates rate lock decisions, market conditions, and timing to provide accurate risk and value analysis. It includes rate lock analysis, risk assessment, cost optimization, and strategic recommendations to help borrowers make informed rate lock decisions.`,
  
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
    lockedRate: {
      type: 'number',
      label: 'Locked Rate (%)',
      description: 'Interest rate that was locked',
      required: true,
      min: 0,
      max: 50,
      step: 0.001,
      placeholder: '6.5'
    },
    currentMarketRate: {
      type: 'number',
      label: 'Current Market Rate (%)',
      description: 'Current market interest rate',
      required: true,
      min: 0,
      max: 50,
      step: 0.001,
      placeholder: '6.75'
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
      description: 'Type of mortgage payment',
      required: true,
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon' },
        { value: 'arm', label: 'Adjustable Rate' }
      ],
      placeholder: 'principal_interest'
    },
    
    // Rate Lock Information
    lockDate: {
      type: 'date',
      label: 'Lock Date',
      description: 'Date when rate was locked',
      required: true,
      placeholder: '2024-01-15'
    },
    lockExpirationDate: {
      type: 'date',
      label: 'Lock Expiration Date',
      description: 'Date when rate lock expires',
      required: true,
      placeholder: '2024-02-15'
    },
    lockDuration: {
      type: 'number',
      label: 'Lock Duration (days)',
      description: 'Number of days rate is locked',
      required: true,
      min: 1,
      max: 365,
      step: 1,
      placeholder: '30'
    },
    lockType: {
      type: 'select',
      label: 'Lock Type',
      description: 'Type of rate lock',
      required: true,
      options: [
        { value: 'free', label: 'Free' },
        { value: 'paid', label: 'Paid' },
        { value: 'float_down', label: 'Float Down' },
        { value: 'extended', label: 'Extended' }
      ],
      placeholder: 'free'
    },
    lockFee: {
      type: 'number',
      label: 'Lock Fee ($)',
      description: 'Fee paid for rate lock',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '0'
    },
    lockFeeType: {
      type: 'select',
      label: 'Lock Fee Type',
      description: 'Type of lock fee structure',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'fixed', label: 'Fixed' },
        { value: 'none', label: 'None' }
      ],
      placeholder: 'none'
    },
    
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value ($)',
      description: 'Current market value of the property',
      required: true,
      min: 50000,
      max: 50000000,
      step: 1000,
      placeholder: '500000'
    },
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Full address of the property',
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
      description: 'Square footage of the property',
      required: true,
      min: 100,
      max: 50000,
      step: 100,
      placeholder: '2000'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age (years)',
      description: 'Age of the property in years',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '20'
    },
    
    // Closing Information
    estimatedClosingDate: {
      type: 'date',
      label: 'Estimated Closing Date',
      description: 'Expected closing date',
      required: true,
      placeholder: '2024-02-10'
    },
    actualClosingDate: {
      type: 'date',
      label: 'Actual Closing Date',
      description: 'Actual closing date',
      required: false,
      placeholder: '2024-02-12'
    },
    closingDelay: {
      type: 'number',
      label: 'Closing Delay (days)',
      description: 'Number of days closing is delayed',
      required: true,
      min: 0,
      max: 365,
      step: 1,
      placeholder: '2'
    },
    extensionFee: {
      type: 'number',
      label: 'Extension Fee ($)',
      description: 'Fee for extending rate lock',
      required: true,
      min: 0,
      max: 5000,
      step: 100,
      placeholder: '0'
    },
    extensionFeeType: {
      type: 'select',
      label: 'Extension Fee Type',
      description: 'Type of extension fee structure',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'fixed', label: 'Fixed' },
        { value: 'daily', label: 'Daily' }
      ],
      placeholder: 'fixed'
    },
    
    // Market Information
    marketLocation: {
      type: 'text',
      label: 'Market Location',
      description: 'Geographic location of the market',
      required: true,
      placeholder: 'Los Angeles, CA'
    },
    marketCondition: {
      type: 'select',
      label: 'Market Condition',
      description: 'Current market condition',
      required: true,
      options: [
        { value: 'declining', label: 'Declining' },
        { value: 'stable', label: 'Stable' },
        { value: 'growing', label: 'Growing' },
        { value: 'volatile', label: 'Volatile' }
      ],
      placeholder: 'stable'
    },
    marketVolatility: {
      type: 'number',
      label: 'Market Volatility',
      description: 'Market volatility index (0-1)',
      required: true,
      min: 0,
      max: 1,
      step: 0.01,
      placeholder: '0.15'
    },
    rateTrend: {
      type: 'select',
      label: 'Rate Trend',
      description: 'Current interest rate trend',
      required: true,
      options: [
        { value: 'falling', label: 'Falling' },
        { value: 'stable', label: 'Stable' },
        { value: 'rising', label: 'Rising' },
        { value: 'volatile', label: 'Volatile' }
      ],
      placeholder: 'rising'
    },
    
    // Rate Forecast
    rateForecast: {
      type: 'array',
      label: 'Rate Forecast',
      description: 'Predicted interest rates over time',
      required: false,
      itemSchema: {
        date: { type: 'date', label: 'Date', required: true },
        predictedRate: { type: 'number', label: 'Predicted Rate (%)', required: true, min: 0, max: 50 },
        confidence: { type: 'number', label: 'Confidence (0-1)', required: true, min: 0, max: 1 }
      }
    },
    
    // Borrower Information
    borrowerIncome: {
      type: 'number',
      label: 'Borrower Income ($)',
      description: 'Annual income of the borrower',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '120000'
    },
    borrowerCreditScore: {
      type: 'number',
      label: 'Borrower Credit Score',
      description: 'Credit score of the borrower',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '750'
    },
    borrowerDebtToIncomeRatio: {
      type: 'number',
      label: 'Debt-to-Income Ratio',
      description: 'Debt-to-income ratio of the borrower',
      required: true,
      min: 0,
      max: 1,
      step: 0.01,
      placeholder: '0.36'
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
    
    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (years)',
      description: 'Period for analysis',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '5'
    },
    inflationRate: {
      type: 'number',
      label: 'Inflation Rate (%)',
      description: 'Expected inflation rate',
      required: true,
      min: -10,
      max: 50,
      step: 0.1,
      placeholder: '3.0'
    },
    propertyAppreciationRate: {
      type: 'number',
      label: 'Property Appreciation Rate (%)',
      description: 'Expected property appreciation rate',
      required: true,
      min: -50,
      max: 100,
      step: 0.1,
      placeholder: '4.0'
    },
    discountRate: {
      type: 'number',
      label: 'Discount Rate (%)',
      description: 'Discount rate for present value calculations',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '6.0'
    },
    
    // Risk Tolerance
    riskTolerance: {
      type: 'select',
      label: 'Risk Tolerance',
      description: 'Risk tolerance level',
      required: true,
      options: [
        { value: 'conservative', label: 'Conservative' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'aggressive', label: 'Aggressive' }
      ],
      placeholder: 'moderate'
    },
    maxRateIncrease: {
      type: 'number',
      label: 'Max Rate Increase (%)',
      description: 'Maximum acceptable rate increase',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '0.5'
    },
    minRateDecrease: {
      type: 'number',
      label: 'Min Rate Decrease (%)',
      description: 'Minimum acceptable rate decrease',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '0.25'
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
      description: 'Include charts in the analysis',
      required: true,
      placeholder: true
    }
  },
  
  outputs: {
    rateDifference: {
      type: 'number',
      label: 'Rate Difference (%)',
      description: 'Difference between locked and market rate',
      format: 'percentage'
    },
    rateSavings: {
      type: 'number',
      label: 'Rate Savings ($)',
      description: 'Savings from rate lock',
      format: 'currency'
    },
    paymentDifference: {
      type: 'number',
      label: 'Payment Difference ($)',
      description: 'Difference in monthly payment',
      format: 'currency'
    },
    paymentSavings: {
      type: 'number',
      label: 'Payment Savings ($)',
      description: 'Total payment savings',
      format: 'currency'
    },
    lockValue: {
      type: 'number',
      label: 'Lock Value ($)',
      description: 'Total value of the rate lock',
      format: 'currency'
    },
    riskScore: {
      type: 'number',
      label: 'Risk Score',
      description: 'Risk score (0-100)',
      format: 'number'
    },
    lockRemainingDays: {
      type: 'number',
      label: 'Lock Remaining Days',
      description: 'Days remaining until lock expires',
      format: 'number'
    },
    breakEvenPoint: {
      type: 'number',
      label: 'Break-Even Point',
      description: 'Number of payments to break even',
      format: 'number'
    },
    analysis: {
      type: 'object',
      label: 'Analysis',
      description: 'Comprehensive analysis of the rate lock'
    }
  },
  
  calculate: calculateMortgageRateLock,
  validate: validateMortgageRateLockInputs
};
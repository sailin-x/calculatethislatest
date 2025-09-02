import { Calculator } from '@/types/calculator';
import { MortgageRateLockCalculator } from './MortgageRateLockCalculator';

export const mortgageRateLockCalculator: Calculator = {
  id: 'mortgage-rate-lock',
  name: 'Mortgage Rate Lock Calculator',
  description: 'Analyze the value and risk of mortgage rate locks, including break-even analysis, expiration risk, and market timing recommendations.',
  category: 'finance',
  tags: ['mortgage', 'rate lock', 'interest rates', 'timing', 'risk analysis', 'break-even'],
  component: MortgageRateLockCalculator,
  inputs: {
    // Loan Information
    loanAmount: {
      label: 'Loan Amount',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '300000',
      description: 'The total loan amount in dollars'
    },
    lockedRate: {
      label: 'Locked Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 25,
      step: 0.01,
      placeholder: '4.5',
      description: 'The interest rate that has been locked'
    },
    currentMarketRate: {
      label: 'Current Market Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 25,
      step: 0.01,
      placeholder: '4.75',
      description: 'The current market interest rate'
    },
    loanTerm: {
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      description: 'The loan term in years'
    },
    loanType: {
      label: 'Loan Type',
      type: 'select',
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
      placeholder: 'conventional',
      description: 'The type of mortgage loan'
    },
    paymentType: {
      label: 'Payment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon' },
        { value: 'arm', label: 'Adjustable Rate' }
      ],
      placeholder: 'principal_interest',
      description: 'The type of payment structure'
    },

    // Rate Lock Information
    lockDate: {
      label: 'Lock Date',
      type: 'date',
      required: true,
      placeholder: '2024-01-15',
      description: 'The date when the rate was locked'
    },
    lockExpirationDate: {
      label: 'Lock Expiration Date',
      type: 'date',
      required: true,
      placeholder: '2024-02-15',
      description: 'The date when the rate lock expires'
    },
    lockDuration: {
      label: 'Lock Duration (Days)',
      type: 'number',
      required: true,
      min: 1,
      max: 365,
      step: 1,
      placeholder: '30',
      description: 'The duration of the rate lock in days'
    },
    lockType: {
      label: 'Lock Type',
      type: 'select',
      required: true,
      options: [
        { value: 'free', label: 'Free' },
        { value: 'paid', label: 'Paid' },
        { value: 'float_down', label: 'Float Down' },
        { value: 'extended', label: 'Extended' }
      ],
      placeholder: 'free',
      description: 'The type of rate lock'
    },
    lockFee: {
      label: 'Lock Fee ($)',
      type: 'number',
      required: false,
      min: 0,
      max: 10000,
      step: 10,
      placeholder: '0',
      description: 'The fee paid for the rate lock'
    },
    lockFeeType: {
      label: 'Lock Fee Type',
      type: 'select',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'fixed', label: 'Fixed Amount' },
        { value: 'none', label: 'None' }
      ],
      placeholder: 'none',
      description: 'How the lock fee is calculated'
    },

    // Property Information
    propertyValue: {
      label: 'Property Value ($)',
      type: 'number',
      required: true,
      min: 1000,
      max: 50000000,
      step: 1000,
      placeholder: '375000',
      description: 'The estimated property value'
    },
    propertyAddress: {
      label: 'Property Address',
      type: 'text',
      required: true,
      placeholder: '123 Main St, Anytown, USA',
      description: 'The property address'
    },
    propertyType: {
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family' },
        { value: 'multi_family', label: 'Multi-Family' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial' }
      ],
      placeholder: 'single_family',
      description: 'The type of property'
    },
    propertySize: {
      label: 'Property Size (sq ft)',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '2000',
      description: 'The size of the property in square feet'
    },
    propertyAge: {
      label: 'Property Age (Years)',
      type: 'number',
      required: false,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '15',
      description: 'The age of the property in years'
    },

    // Closing Information
    estimatedClosingDate: {
      label: 'Estimated Closing Date',
      type: 'date',
      required: true,
      placeholder: '2024-02-10',
      description: 'The estimated closing date'
    },
    actualClosingDate: {
      label: 'Actual Closing Date',
      type: 'date',
      required: false,
      placeholder: '',
      description: 'The actual closing date (if known)'
    },
    closingDelay: {
      label: 'Closing Delay (Days)',
      type: 'number',
      required: false,
      min: 0,
      max: 365,
      step: 1,
      placeholder: '0',
      description: 'Any delay in closing beyond the estimated date'
    },
    extensionFee: {
      label: 'Extension Fee ($)',
      type: 'number',
      required: false,
      min: 0,
      max: 10000,
      step: 10,
      placeholder: '0',
      description: 'Fee to extend the rate lock'
    },
    extensionFeeType: {
      label: 'Extension Fee Type',
      type: 'select',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'fixed', label: 'Fixed Amount' },
        { value: 'daily', label: 'Daily Rate' }
      ],
      placeholder: 'fixed',
      description: 'How the extension fee is calculated'
    },

    // Market Information
    marketLocation: {
      label: 'Market Location',
      type: 'text',
      required: true,
      placeholder: 'Anytown, USA',
      description: 'The market location for analysis'
    },
    marketCondition: {
      label: 'Market Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'declining', label: 'Declining' },
        { value: 'stable', label: 'Stable' },
        { value: 'growing', label: 'Growing' },
        { value: 'volatile', label: 'Volatile' }
      ],
      placeholder: 'stable',
      description: 'The current market condition'
    },
    marketVolatility: {
      label: 'Market Volatility (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '15',
      description: 'The market volatility percentage'
    },
    rateTrend: {
      label: 'Rate Trend',
      type: 'select',
      required: true,
      options: [
        { value: 'falling', label: 'Falling' },
        { value: 'stable', label: 'Stable' },
        { value: 'rising', label: 'Rising' },
        { value: 'volatile', label: 'Volatile' }
      ],
      placeholder: 'stable',
      description: 'The current interest rate trend'
    },

    // Rate Forecast
    rateForecast: {
      label: 'Rate Forecast',
      type: 'array',
      required: false,
      description: 'Forecasted interest rates over time',
      itemSchema: {
        date: {
          label: 'Date',
          type: 'date',
          required: true
        },
        predictedRate: {
          label: 'Predicted Rate (%)',
          type: 'number',
          required: true,
          min: 0.1,
          max: 25,
          step: 0.01
        },
        confidence: {
          label: 'Confidence (%)',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
          step: 1
        }
      }
    },

    // Borrower Information
    borrowerIncome: {
      label: 'Borrower Income ($)',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '75000',
      description: 'The borrower\'s annual income'
    },
    borrowerCreditScore: {
      label: 'Borrower Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '720',
      description: 'The borrower\'s credit score'
    },
    borrowerDebtToIncomeRatio: {
      label: 'Debt-to-Income Ratio (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '35',
      description: 'The borrower\'s debt-to-income ratio'
    },
    borrowerEmploymentType: {
      label: 'Employment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'business_owner', label: 'Business Owner' }
      ],
      placeholder: 'employed',
      description: 'The borrower\'s employment type'
    },

    // Analysis Parameters
    analysisPeriod: {
      label: 'Analysis Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      description: 'The period for analysis in years'
    },
    inflationRate: {
      label: 'Inflation Rate (%)',
      type: 'number',
      required: true,
      min: -10,
      max: 50,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected inflation rate'
    },
    propertyAppreciationRate: {
      label: 'Property Appreciation Rate (%)',
      type: 'number',
      required: true,
      min: -20,
      max: 50,
      step: 0.1,
      placeholder: '3.0',
      description: 'Expected property appreciation rate'
    },
    discountRate: {
      label: 'Discount Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '5.0',
      description: 'Discount rate for present value calculations'
    },

    // Risk Tolerance
    riskTolerance: {
      label: 'Risk Tolerance',
      type: 'select',
      required: true,
      options: [
        { value: 'conservative', label: 'Conservative' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'aggressive', label: 'Aggressive' }
      ],
      placeholder: 'moderate',
      description: 'The borrower\'s risk tolerance level'
    },
    maxRateIncrease: {
      label: 'Max Rate Increase (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '2.0',
      description: 'Maximum acceptable rate increase'
    },
    minRateDecrease: {
      label: 'Min Rate Decrease (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '1.0',
      description: 'Minimum acceptable rate decrease'
    },

    // Reporting Preferences
    currency: {
      label: 'Currency',
      type: 'select',
      required: true,
      options: [
        { value: 'USD', label: 'USD ($)' },
        { value: 'EUR', label: 'EUR (€)' },
        { value: 'GBP', label: 'GBP (£)' },
        { value: 'CAD', label: 'CAD (C$)' },
        { value: 'AUD', label: 'AUD (A$)' }
      ],
      placeholder: 'USD',
      description: 'The currency for calculations'
    },
    displayFormat: {
      label: 'Display Format',
      type: 'select',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ],
      placeholder: 'percentage',
      description: 'The format for displaying results'
    },
    includeCharts: {
      label: 'Include Charts',
      type: 'boolean',
      required: true,
      placeholder: true,
      description: 'Whether to include charts in the analysis'
    }
  },
  outputs: {
    // Core Metrics
    rateDifference: {
      label: 'Rate Difference (%)',
      type: 'number',
      description: 'Difference between locked and current market rates'
    },
    rateSavings: {
      label: 'Rate Savings ($)',
      type: 'number',
      description: 'Total savings from the rate lock'
    },
    paymentDifference: {
      label: 'Payment Difference ($)',
      type: 'number',
      description: 'Difference in monthly payments'
    },
    paymentSavings: {
      label: 'Payment Savings ($)',
      type: 'number',
      description: 'Monthly payment savings'
    },
    lockValue: {
      label: 'Lock Value ($)',
      type: 'number',
      description: 'Total value of the rate lock'
    },
    riskScore: {
      label: 'Risk Score',
      type: 'number',
      description: 'Risk assessment score (0-100)'
    },
    lockRemainingDays: {
      label: 'Lock Remaining (Days)',
      type: 'number',
      description: 'Days remaining until lock expiration'
    },
    breakEvenPoint: {
      label: 'Break-Even Point (Days)',
      type: 'number',
      description: 'Days to break even on lock costs'
    },

    // Payment Analysis
    lockedMonthlyPayment: {
      label: 'Locked Monthly Payment ($)',
      type: 'number',
      description: 'Monthly payment at locked rate'
    },
    currentMonthlyPayment: {
      label: 'Current Monthly Payment ($)',
      type: 'number',
      description: 'Monthly payment at current market rate'
    },

    // Interest Analysis
    totalInterestLocked: {
      label: 'Total Interest (Locked) ($)',
      type: 'number',
      description: 'Total interest paid at locked rate'
    },
    totalInterestCurrent: {
      label: 'Total Interest (Current) ($)',
      type: 'number',
      description: 'Total interest paid at current market rate'
    },
    interestSavings: {
      label: 'Interest Savings ($)',
      type: 'number',
      description: 'Total interest savings from lock'
    },

    // Cost Analysis
    lockCost: {
      label: 'Lock Cost ($)',
      type: 'number',
      description: 'Total cost of the rate lock'
    },
    netSavings: {
      label: 'Net Savings ($)',
      type: 'number',
      description: 'Net savings after lock costs'
    },

    // Analysis
    analysis: {
      label: 'Analysis',
      type: 'object',
      description: 'Comprehensive analysis and recommendations'
    }
  },
  features: [
    'Rate lock value analysis',
    'Break-even point calculation',
    'Expiration risk assessment',
    'Market timing recommendations',
    'Cost-benefit analysis',
    'Risk scoring',
    'Sensitivity analysis',
    'Scenario planning',
    'Timeline analysis',
    'Comparison tools'
  ],
  examples: [
    {
      name: 'Standard Rate Lock',
      description: 'Analyze a 30-day rate lock on a $300,000 conventional loan',
      inputs: {
        loanAmount: 300000,
        lockedRate: 4.5,
        currentMarketRate: 4.75,
        loanTerm: 30,
        lockDuration: 30,
        propertyValue: 375000,
        estimatedClosingDate: '2024-02-10'
      }
    },
    {
      name: 'Paid Rate Lock',
      description: 'Evaluate a paid rate lock with extension fees',
      inputs: {
        loanAmount: 500000,
        lockedRate: 4.25,
        currentMarketRate: 4.5,
        loanTerm: 30,
        lockType: 'paid',
        lockFee: 1000,
        extensionFee: 500
      }
    },
    {
      name: 'Rising Rate Environment',
      description: 'Analyze lock value in a rising rate environment',
      inputs: {
        loanAmount: 400000,
        lockedRate: 4.0,
        currentMarketRate: 4.5,
        rateTrend: 'rising',
        marketVolatility: 25
      }
    }
  ],
  relatedCalculators: [
    'mortgage-payment',
    'mortgage-qualification',
    'mortgage-refinance',
    'mortgage-comparison',
    'amortization',
    'mortgage-points'
  ]
};
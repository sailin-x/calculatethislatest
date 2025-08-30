import { Calculator } from '@/types/calculator';
import { PMICancellationCalculator } from './PMICancellationCalculator';

export const pmiCancellationCalculator: Calculator = {
  id: 'pmi-cancellation',
  name: 'PMI Cancellation Calculator',
  description: 'Calculate when you can cancel Private Mortgage Insurance (PMI) and analyze the potential savings. This calculator helps homeowners determine eligibility for PMI cancellation based on loan-to-value ratio, payment history, and property appreciation.',
  category: 'finance',
  tags: ['pmi', 'mortgage', 'insurance', 'cancellation', 'ltv', 'homeownership', 'savings'],
  component: PMICancellationCalculator,
  inputs: {
    // Loan Information
    originalLoanAmount: {
      label: 'Original Loan Amount',
      type: 'number',
      unit: 'currency',
      required: true,
      description: 'The original amount borrowed for the mortgage',
      placeholder: '300000',
      min: 1000,
      max: 10000000,
      step: 1000
    },
    currentLoanBalance: {
      label: 'Current Loan Balance',
      type: 'number',
      unit: 'currency',
      required: true,
      description: 'Current outstanding balance on the mortgage',
      placeholder: '280000',
      min: 1000,
      max: 10000000,
      step: 1000
    },
    interestRate: {
      label: 'Interest Rate',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Annual interest rate on the mortgage',
      placeholder: '4.5',
      min: 0,
      max: 20,
      step: 0.125
    },
    loanTerm: {
      label: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Length of the mortgage in years',
      placeholder: '30',
      min: 1,
      max: 50,
      step: 1
    },
    loanType: {
      label: 'Loan Type',
      type: 'select',
      required: true,
      description: 'Type of mortgage loan',
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' }
      ]
    },
    paymentType: {
      label: 'Payment Type',
      type: 'select',
      required: true,
      description: 'Type of mortgage payment structure',
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon' },
        { value: 'arm', label: 'Adjustable Rate' }
      ]
    },

    // Property Information
    originalPropertyValue: {
      label: 'Original Property Value',
      type: 'number',
      unit: 'currency',
      required: true,
      description: 'Property value at the time of purchase',
      placeholder: '375000',
      min: 1000,
      max: 10000000,
      step: 1000
    },
    currentPropertyValue: {
      label: 'Current Property Value',
      type: 'number',
      unit: 'currency',
      required: true,
      description: 'Current estimated property value',
      placeholder: '400000',
      min: 1000,
      max: 10000000,
      step: 1000
    },
    propertyType: {
      label: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of property',
      options: [
        { value: 'single_family', label: 'Single Family' },
        { value: 'multi_family', label: 'Multi-Family' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial' }
      ]
    },
    propertySize: {
      label: 'Property Size',
      type: 'number',
      unit: 'sqft',
      required: true,
      description: 'Size of the property in square feet',
      placeholder: '2000',
      min: 100,
      max: 100000,
      step: 100
    },
    propertyAge: {
      label: 'Property Age',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Age of the property in years',
      placeholder: '15',
      min: 0,
      max: 200,
      step: 1
    },

    // PMI Information
    pmiRate: {
      label: 'PMI Rate',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Annual PMI rate as a percentage',
      placeholder: '0.8',
      min: 0,
      max: 5,
      step: 0.1
    },
    pmiMonthlyPayment: {
      label: 'PMI Monthly Payment',
      type: 'number',
      unit: 'currency',
      required: true,
      description: 'Current monthly PMI payment amount',
      placeholder: '200',
      min: 0,
      max: 1000,
      step: 10
    },
    pmiStartDate: {
      label: 'PMI Start Date',
      type: 'date',
      required: true,
      description: 'Date when PMI coverage began'
    },
    pmiCancellationMethod: {
      label: 'PMI Cancellation Method',
      type: 'select',
      required: true,
      description: 'Preferred method for PMI cancellation',
      options: [
        { value: 'automatic', label: 'Automatic (LTV-based)' },
        { value: 'request', label: 'Request (Appraisal-based)' },
        { value: 'refinance', label: 'Refinance' },
        { value: 'appraisal', label: 'Appraisal Required' }
      ]
    },

    // Loan History
    loanStartDate: {
      label: 'Loan Start Date',
      type: 'date',
      required: true,
      description: 'Date when the mortgage loan began'
    },
    originalDownPayment: {
      label: 'Original Down Payment',
      type: 'number',
      unit: 'currency',
      required: true,
      description: 'Down payment amount at loan origination',
      placeholder: '75000',
      min: 0,
      max: 10000000,
      step: 1000
    },
    originalDownPaymentPercentage: {
      label: 'Original Down Payment %',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Down payment as a percentage of property value',
      placeholder: '20',
      min: 0,
      max: 100,
      step: 1
    },
    paymentsMade: {
      label: 'Payments Made',
      type: 'number',
      unit: 'payments',
      required: true,
      description: 'Number of mortgage payments made to date',
      placeholder: '36',
      min: 0,
      max: 600,
      step: 1
    },
    monthsSinceLoanStart: {
      label: 'Months Since Loan Start',
      type: 'number',
      unit: 'months',
      required: true,
      description: 'Number of months since the loan began',
      placeholder: '36',
      min: 0,
      max: 600,
      step: 1
    },

    // Appraisal Information
    appraisalValue: {
      label: 'Appraisal Value',
      type: 'number',
      unit: 'currency',
      required: false,
      description: 'Recent property appraisal value (if available)',
      placeholder: '400000',
      min: 0,
      max: 10000000,
      step: 1000
    },
    appraisalCost: {
      label: 'Appraisal Cost',
      type: 'number',
      unit: 'currency',
      required: false,
      description: 'Cost of obtaining a new appraisal',
      placeholder: '500',
      min: 0,
      max: 2000,
      step: 50
    },
    appraisalRequired: {
      label: 'Appraisal Required',
      type: 'boolean',
      required: true,
      description: 'Whether an appraisal is required for PMI cancellation'
    },

    // Market Information
    marketLocation: {
      label: 'Market Location',
      type: 'text',
      required: true,
      description: 'Property location for market analysis',
      placeholder: 'San Francisco, CA'
    },
    marketCondition: {
      label: 'Market Condition',
      type: 'select',
      required: true,
      description: 'Current market condition in the area',
      options: [
        { value: 'declining', label: 'Declining' },
        { value: 'stable', label: 'Stable' },
        { value: 'growing', label: 'Growing' },
        { value: 'hot', label: 'Hot Market' }
      ]
    },
    marketGrowthRate: {
      label: 'Market Growth Rate',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Annual property value growth rate in the market',
      placeholder: '5.2',
      min: -50,
      max: 100,
      step: 0.1
    },
    comparableSales: {
      label: 'Comparable Sales',
      type: 'array',
      required: true,
      description: 'Recent comparable property sales in the area',
      itemType: 'object',
      itemSchema: {
        address: { type: 'text', required: true },
        salePrice: { type: 'number', required: true },
        saleDate: { type: 'date', required: true },
        condition: { type: 'text', required: true }
      }
    },

    // Borrower Information
    borrowerIncome: {
      label: 'Borrower Income',
      type: 'number',
      unit: 'currency',
      required: true,
      description: 'Annual household income',
      placeholder: '85000',
      min: 1000,
      max: 10000000,
      step: 1000
    },
    borrowerCreditScore: {
      label: 'Credit Score',
      type: 'number',
      required: true,
      description: 'Current credit score',
      placeholder: '750',
      min: 300,
      max: 850,
      step: 1
    },
    borrowerDebtToIncomeRatio: {
      label: 'Debt-to-Income Ratio',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Current debt-to-income ratio',
      placeholder: '35',
      min: 0,
      max: 100,
      step: 1
    },
    borrowerEmploymentType: {
      label: 'Employment Type',
      type: 'select',
      required: true,
      description: 'Primary borrower employment status',
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'business_owner', label: 'Business Owner' }
      ]
    },

    // Cancellation Requirements
    ltvThreshold: {
      label: 'LTV Threshold',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Loan-to-value ratio threshold for PMI cancellation',
      placeholder: '80',
      min: 0,
      max: 100,
      step: 1
    },
    paymentHistory: {
      label: 'Payment History',
      type: 'array',
      required: true,
      description: 'Recent payment history for eligibility verification',
      itemType: 'object',
      itemSchema: {
        paymentNumber: { type: 'number', required: true },
        paymentDate: { type: 'date', required: true },
        paymentAmount: { type: 'number', required: true },
        principal: { type: 'number', required: true },
        interest: { type: 'number', required: true },
        balance: { type: 'number', required: true },
        onTime: { type: 'boolean', required: true }
      }
    },

    // Analysis Parameters
    analysisPeriod: {
      label: 'Analysis Period',
      type: 'number',
      unit: 'months',
      required: true,
      description: 'Period for future analysis in months',
      placeholder: '60',
      min: 1,
      max: 120,
      step: 1
    },
    inflationRate: {
      label: 'Inflation Rate',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Expected annual inflation rate',
      placeholder: '2.5',
      min: -50,
      max: 100,
      step: 0.1
    },
    propertyAppreciationRate: {
      label: 'Property Appreciation Rate',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Expected annual property appreciation rate',
      placeholder: '3.0',
      min: -50,
      max: 100,
      step: 0.1
    },
    discountRate: {
      label: 'Discount Rate',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Discount rate for present value calculations',
      placeholder: '5.0',
      min: -100,
      max: 1000,
      step: 0.1
    },

    // Reporting Preferences
    currency: {
      label: 'Currency',
      type: 'select',
      required: true,
      description: 'Currency for financial calculations',
      options: [
        { value: 'USD', label: 'US Dollar' },
        { value: 'EUR', label: 'Euro' },
        { value: 'GBP', label: 'British Pound' },
        { value: 'CAD', label: 'Canadian Dollar' },
        { value: 'AUD', label: 'Australian Dollar' }
      ]
    },
    displayFormat: {
      label: 'Display Format',
      type: 'select',
      required: true,
      description: 'Format for displaying numerical results',
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ]
    },
    includeCharts: {
      label: 'Include Charts',
      type: 'boolean',
      required: true,
      description: 'Whether to include visual charts in the analysis'
    }
  },
  outputs: {
    pmiEligibility: {
      label: 'PMI Eligibility',
      type: 'boolean',
      description: 'Whether the borrower is eligible for PMI cancellation'
    },
    currentLtvRatio: {
      label: 'Current LTV Ratio',
      type: 'number',
      unit: 'percentage',
      description: 'Current loan-to-value ratio'
    },
    monthlyPMISavings: {
      label: 'Monthly PMI Savings',
      type: 'number',
      unit: 'currency',
      description: 'Monthly savings from PMI cancellation'
    },
    totalPMISavings: {
      label: 'Total PMI Savings',
      type: 'number',
      unit: 'currency',
      description: 'Total savings over the analysis period'
    },
    breakEvenMonths: {
      label: 'Break-Even Months',
      type: 'number',
      unit: 'months',
      description: 'Number of months to break even on appraisal costs'
    },
    automaticCancellationDate: {
      label: 'Automatic Cancellation Date',
      type: 'date',
      description: 'Date when PMI will be automatically cancelled'
    },
    requestCancellationDate: {
      label: 'Request Cancellation Date',
      type: 'date',
      description: 'Earliest date to request PMI cancellation'
    },
    riskScore: {
      label: 'Risk Score',
      type: 'number',
      unit: 'score',
      description: 'Risk assessment score (0-100)'
    },
    analysis: {
      label: 'Analysis',
      type: 'object',
      description: 'Detailed analysis and recommendations',
      properties: {
        cancellationRating: {
          label: 'Cancellation Rating',
          type: 'text',
          description: 'Rating of PMI cancellation opportunity'
        },
        recommendation: {
          label: 'Recommendation',
          type: 'text',
          description: 'Detailed recommendation for PMI cancellation'
        }
      }
    },
    timelineAnalysis: {
      label: 'Timeline Analysis',
      type: 'array',
      description: 'Monthly timeline analysis of PMI status and savings',
      itemType: 'object',
      itemSchema: {
        month: { type: 'number', description: 'Month number' },
        ltvRatio: { type: 'number', description: 'LTV ratio for the month' },
        pmiStatus: { type: 'text', description: 'PMI status for the month' },
        cumulativeSavings: { type: 'number', description: 'Cumulative savings to date' }
      }
    },
    comparisonAnalysis: {
      label: 'Comparison Analysis',
      type: 'array',
      description: 'Comparison of different PMI cancellation scenarios',
      itemType: 'object',
      itemSchema: {
        scenario: { type: 'text', description: 'Scenario name' },
        savings: { type: 'number', description: 'Total savings for the scenario' },
        timeline: { type: 'text', description: 'Timeline for the scenario' }
      }
    },
    metrics: {
      label: 'Metrics',
      type: 'object',
      description: 'Detailed financial metrics',
      properties: {
        totalPMIPaid: {
          label: 'Total PMI Paid',
          type: 'number',
          unit: 'currency',
          description: 'Total PMI payments made to date'
        },
        remainingPMICost: {
          label: 'Remaining PMI Cost',
          type: 'number',
          unit: 'currency',
          description: 'Estimated remaining PMI cost if not cancelled'
        },
        monthlyPrincipalPayment: {
          label: 'Monthly Principal Payment',
          type: 'number',
          unit: 'currency',
          description: 'Monthly principal payment amount'
        },
        monthlyTotalPayment: {
          label: 'Monthly Total Payment',
          type: 'number',
          unit: 'currency',
          description: 'Monthly total payment including PMI'
        },
        totalPaymentSavings: {
          label: 'Total Payment Savings',
          type: 'number',
          unit: 'currency',
          description: 'Total savings from PMI cancellation'
        }
      }
    }
  },
  features: [
    'PMI eligibility assessment based on LTV ratio',
    'Automatic and request-based cancellation date calculation',
    'Break-even analysis for appraisal costs',
    'Timeline analysis of PMI status and savings',
    'Comparison of different cancellation scenarios',
    'Risk assessment and scoring',
    'Detailed financial metrics and analysis',
    'Market condition and property appreciation consideration',
    'Payment history verification',
    'Multiple currency support',
    'Visual charts and graphs',
    'Export and reporting capabilities'
  ],
  examples: [
    {
      name: 'Conventional Loan PMI Cancellation',
      description: 'Calculate PMI cancellation for a conventional loan with 20% down payment',
      inputs: {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        originalPropertyValue: 375000,
        currentPropertyValue: 400000,
        pmiRate: 0.8,
        pmiMonthlyPayment: 200,
        ltvThreshold: 80
      }
    },
    {
      name: 'FHA Loan PMI Analysis',
      description: 'Analyze PMI cancellation options for an FHA loan',
      inputs: {
        originalLoanAmount: 250000,
        currentLoanBalance: 240000,
        interestRate: 3.5,
        loanTerm: 30,
        loanType: 'fha',
        originalPropertyValue: 312500,
        currentPropertyValue: 350000,
        pmiRate: 1.2,
        pmiMonthlyPayment: 250,
        ltvThreshold: 78
      }
    },
    {
      name: 'High Appreciation Market',
      description: 'PMI cancellation in a high-appreciation market',
      inputs: {
        originalLoanAmount: 400000,
        currentLoanBalance: 380000,
        interestRate: 4.0,
        loanTerm: 30,
        loanType: 'conventional',
        originalPropertyValue: 500000,
        currentPropertyValue: 600000,
        pmiRate: 0.6,
        pmiMonthlyPayment: 200,
        propertyAppreciationRate: 8.0,
        ltvThreshold: 80
      }
    }
  ],
  relatedCalculators: [
    'mortgage-payment',
    'mortgage-refinance',
    'debt-to-income',
    'housing-expense-ratio',
    'mortgage-points',
    'mortgage-rate-lock'
  ]
};
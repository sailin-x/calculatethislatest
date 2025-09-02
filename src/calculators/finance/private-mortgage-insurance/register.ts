import { Calculator } from '@/types/calculator';
import { PrivateMortgageInsuranceCalculator } from './PrivateMortgageInsuranceCalculator';

export const privateMortgageInsuranceCalculator: Calculator = {
  id: 'private-mortgage-insurance',
  name: 'Private Mortgage Insurance Calculator',
  description: 'Calculate and analyze Private Mortgage Insurance (PMI) costs, cancellation eligibility, and optimization strategies for mortgage loans with less than 20% down payment.',
  category: 'finance',
  tags: ['pmi', 'mortgage-insurance', 'loan-analysis', 'cancellation', 'optimization'],
  component: PrivateMortgageInsuranceCalculator,
  inputs: {
    // Loan Information
    loanAmount: {
      type: 'number',
      label: 'Loan Amount',
      description: 'The total amount of the mortgage loan',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '300000',
      unit: 'USD'
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate',
      description: 'Annual interest rate on the loan',
      required: true,
      min: 0,
      max: 20,
      step: 0.125,
      placeholder: '4.5',
      unit: '%'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term',
      description: 'Length of the loan in years',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      unit: 'years'
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
        { value: 'jumbo', label: 'Jumbo' }
      ],
      placeholder: 'Select loan type'
    },
    paymentType: {
      type: 'select',
      label: 'Payment Type',
      description: 'Type of loan payment structure',
      required: true,
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon Payment' },
        { value: 'arm', label: 'Adjustable Rate' }
      ],
      placeholder: 'Select payment type'
    },
    
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value',
      description: 'Current market value of the property',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '375000',
      unit: 'USD'
    },
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Full address of the property',
      required: true,
      placeholder: '123 Main St, Anytown, USA'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of property being financed',
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family' },
        { value: 'multi_family', label: 'Multi-Family' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial' }
      ],
      placeholder: 'Select property type'
    },
    propertySize: {
      type: 'number',
      label: 'Property Size',
      description: 'Size of the property in square feet',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '2000',
      unit: 'sq ft'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age',
      description: 'Age of the property in years',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '15',
      unit: 'years'
    },
    
    // Down Payment Information
    downPayment: {
      type: 'number',
      label: 'Down Payment',
      description: 'Amount of down payment',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '75000',
      unit: 'USD'
    },
    downPaymentPercentage: {
      type: 'number',
      label: 'Down Payment Percentage',
      description: 'Percentage of property value as down payment',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '20',
      unit: '%'
    },
    downPaymentSource: {
      type: 'select',
      label: 'Down Payment Source',
      description: 'Source of the down payment funds',
      required: true,
      options: [
        { value: 'savings', label: 'Savings' },
        { value: 'investment_sale', label: 'Investment Sale' },
        { value: 'gift', label: 'Gift' },
        { value: 'inheritance', label: 'Inheritance' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'Select source'
    },
    
    // PMI Information
    pmiRequired: {
      type: 'boolean',
      label: 'PMI Required',
      description: 'Whether PMI is required on this loan',
      required: true,
      default: true
    },
    pmiRate: {
      type: 'number',
      label: 'PMI Rate',
      description: 'Annual PMI rate as a percentage',
      required: true,
      min: 0,
      max: 5,
      step: 0.01,
      placeholder: '0.5',
      unit: '%'
    },
    pmiType: {
      type: 'select',
      label: 'PMI Type',
      description: 'Type of PMI coverage',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly Premium' },
        { value: 'single_premium', label: 'Single Premium' },
        { value: 'split_premium', label: 'Split Premium' },
        { value: 'lender_paid', label: 'Lender Paid' }
      ],
      placeholder: 'Select PMI type'
    },
    pmiCancellationMethod: {
      type: 'select',
      label: 'PMI Cancellation Method',
      description: 'Method for PMI cancellation',
      required: true,
      options: [
        { value: 'automatic', label: 'Automatic' },
        { value: 'request', label: 'Request' },
        { value: 'refinance', label: 'Refinance' }
      ],
      placeholder: 'Select cancellation method'
    },
    
    // Borrower Information
    borrowerIncome: {
      type: 'number',
      label: 'Borrower Income',
      description: 'Annual income of the borrower',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '80000',
      unit: 'USD'
    },
    borrowerCreditScore: {
      type: 'number',
      label: 'Credit Score',
      description: 'Borrower\'s credit score',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '720'
    },
    borrowerDebtToIncomeRatio: {
      type: 'number',
      label: 'Debt-to-Income Ratio',
      description: 'Borrower\'s debt-to-income ratio',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '35',
      unit: '%'
    },
    borrowerEmploymentType: {
      type: 'select',
      label: 'Employment Type',
      description: 'Type of employment',
      required: true,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'business_owner', label: 'Business Owner' }
      ],
      placeholder: 'Select employment type'
    },
    borrowerTaxRate: {
      type: 'number',
      label: 'Tax Rate',
      description: 'Borrower\'s marginal tax rate',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '22',
      unit: '%'
    },
    
    // Loan History
    loanStartDate: {
      type: 'date',
      label: 'Loan Start Date',
      description: 'Date when the loan started',
      required: true,
      placeholder: '2024-01-01'
    },
    paymentsMade: {
      type: 'number',
      label: 'Payments Made',
      description: 'Number of payments made to date',
      required: true,
      min: 0,
      step: 1,
      placeholder: '12'
    },
    monthsSinceLoanStart: {
      type: 'number',
      label: 'Months Since Loan Start',
      description: 'Number of months since loan origination',
      required: true,
      min: 0,
      step: 1,
      placeholder: '12'
    },
    currentPrincipalBalance: {
      type: 'number',
      label: 'Current Principal Balance',
      description: 'Current outstanding principal balance',
      required: true,
      min: 0,
      step: 1000,
      placeholder: '295000',
      unit: 'USD'
    },
    
    // Market Information
    marketLocation: {
      type: 'text',
      label: 'Market Location',
      description: 'Geographic location of the property',
      required: true,
      placeholder: 'Anytown, USA'
    },
    marketCondition: {
      type: 'select',
      label: 'Market Condition',
      description: 'Current market condition in the area',
      required: true,
      options: [
        { value: 'declining', label: 'Declining' },
        { value: 'stable', label: 'Stable' },
        { value: 'growing', label: 'Growing' },
        { value: 'hot', label: 'Hot Market' }
      ],
      placeholder: 'Select market condition'
    },
    marketGrowthRate: {
      type: 'number',
      label: 'Market Growth Rate',
      description: 'Annual market growth rate',
      required: true,
      min: -50,
      max: 100,
      step: 0.1,
      placeholder: '3.0',
      unit: '%'
    },
    propertyAppreciationRate: {
      type: 'number',
      label: 'Property Appreciation Rate',
      description: 'Expected annual property appreciation rate',
      required: true,
      min: -50,
      max: 100,
      step: 0.1,
      placeholder: '3.0',
      unit: '%'
    },
    
    // PMI Requirements
    ltvThreshold: {
      type: 'number',
      label: 'LTV Threshold',
      description: 'Loan-to-value threshold for PMI cancellation',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '80',
      unit: '%'
    },
    paymentHistory: {
      type: 'array',
      label: 'Payment History',
      description: 'Historical payment records',
      required: true,
      items: {
        type: 'object',
        properties: {
          paymentNumber: { type: 'number', label: 'Payment Number' },
          paymentDate: { type: 'date', label: 'Payment Date' },
          paymentAmount: { type: 'number', label: 'Payment Amount' },
          principal: { type: 'number', label: 'Principal' },
          interest: { type: 'number', label: 'Interest' },
          balance: { type: 'number', label: 'Balance' },
          onTime: { type: 'boolean', label: 'On Time' }
        }
      }
    },
    
    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period',
      description: 'Period for analysis in months',
      required: true,
      min: 1,
      max: 360,
      step: 1,
      placeholder: '60',
      unit: 'months'
    },
    inflationRate: {
      type: 'number',
      label: 'Inflation Rate',
      description: 'Expected annual inflation rate',
      required: true,
      min: -50,
      max: 100,
      step: 0.1,
      placeholder: '2.5',
      unit: '%'
    },
    discountRate: {
      type: 'number',
      label: 'Discount Rate',
      description: 'Discount rate for present value calculations',
      required: true,
      min: -100,
      max: 1000,
      step: 0.1,
      placeholder: '6.0',
      unit: '%'
    },
    
    // Reporting Preferences
    currency: {
      type: 'select',
      label: 'Currency',
      description: 'Currency for calculations and display',
      required: true,
      options: [
        { value: 'USD', label: 'US Dollar' },
        { value: 'EUR', label: 'Euro' },
        { value: 'GBP', label: 'British Pound' },
        { value: 'CAD', label: 'Canadian Dollar' },
        { value: 'AUD', label: 'Australian Dollar' }
      ],
      placeholder: 'Select currency'
    },
    displayFormat: {
      type: 'select',
      label: 'Display Format',
      description: 'Format for displaying numerical values',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ],
      placeholder: 'Select display format'
    },
    includeCharts: {
      type: 'boolean',
      label: 'Include Charts',
      description: 'Whether to include charts in the analysis',
      required: true,
      default: true
    }
  },
  outputs: {
    // Basic PMI Information
    pmiRequired: {
      type: 'boolean',
      label: 'PMI Required',
      description: 'Whether PMI is currently required'
    },
    pmiMonthlyPayment: {
      type: 'number',
      label: 'PMI Monthly Payment',
      description: 'Monthly PMI premium amount',
      unit: 'USD'
    },
    pmiAnnualCost: {
      type: 'number',
      label: 'PMI Annual Cost',
      description: 'Annual PMI premium cost',
      unit: 'USD'
    },
    pmiTotalCost: {
      type: 'number',
      label: 'PMI Total Cost',
      description: 'Total PMI cost over the loan term',
      unit: 'USD'
    },
    
    // Loan Metrics
    loanToValueRatio: {
      type: 'number',
      label: 'Loan-to-Value Ratio',
      description: 'Current loan-to-value ratio',
      unit: '%'
    },
    currentLtvRatio: {
      type: 'number',
      label: 'Current LTV Ratio',
      description: 'Current loan-to-value ratio based on current balance',
      unit: '%'
    },
    ltvGap: {
      type: 'number',
      label: 'LTV Gap',
      description: 'Difference between current LTV and cancellation threshold',
      unit: '%'
    },
    equityPosition: {
      type: 'number',
      label: 'Equity Position',
      description: 'Current equity in the property',
      unit: 'USD'
    },
    equityPercentage: {
      type: 'number',
      label: 'Equity Percentage',
      description: 'Percentage of equity in the property',
      unit: '%'
    },
    
    // Payment Analysis
    monthlyPayment: {
      type: 'number',
      label: 'Monthly Payment (with PMI)',
      description: 'Total monthly payment including PMI',
      unit: 'USD'
    },
    monthlyPaymentWithoutPMI: {
      type: 'number',
      label: 'Monthly Payment (without PMI)',
      description: 'Monthly payment excluding PMI',
      unit: 'USD'
    },
    paymentIncrease: {
      type: 'number',
      label: 'Payment Increase',
      description: 'Additional payment due to PMI',
      unit: 'USD'
    },
    paymentIncreasePercentage: {
      type: 'number',
      label: 'Payment Increase Percentage',
      description: 'Percentage increase in payment due to PMI',
      unit: '%'
    },
    pmiSavings: {
      type: 'number',
      label: 'PMI Savings',
      description: 'Potential savings from PMI cancellation',
      unit: 'USD'
    },
    
    // Cost Analysis
    effectiveInterestRate: {
      type: 'number',
      label: 'Effective Interest Rate',
      description: 'Effective interest rate including PMI',
      unit: '%'
    },
    totalLoanCost: {
      type: 'number',
      label: 'Total Loan Cost',
      description: 'Total cost of the loan including PMI',
      unit: 'USD'
    },
    
    // Cancellation Analysis
    cancellationEligibility: {
      type: 'boolean',
      label: 'Cancellation Eligibility',
      description: 'Whether PMI can be cancelled'
    },
    automaticCancellationDate: {
      type: 'string',
      label: 'Automatic Cancellation Date',
      description: 'Date when PMI will be automatically cancelled'
    },
    requestCancellationDate: {
      type: 'string',
      label: 'Request Cancellation Date',
      description: 'Date when PMI cancellation can be requested'
    },
    monthsToAutomaticCancellation: {
      type: 'number',
      label: 'Months to Automatic Cancellation',
      description: 'Number of months until automatic cancellation',
      unit: 'months'
    },
    monthsToRequestCancellation: {
      type: 'number',
      label: 'Months to Request Cancellation',
      description: 'Number of months until cancellation can be requested',
      unit: 'months'
    },
    
    // Break-even Analysis
    breakEvenPoint: {
      type: 'number',
      label: 'Break-even Point',
      description: 'Point at which PMI cancellation becomes beneficial',
      unit: 'months'
    },
    breakEvenMonths: {
      type: 'number',
      label: 'Break-even Months',
      description: 'Number of months to break-even on PMI cancellation',
      unit: 'months'
    },
    breakEvenCost: {
      type: 'number',
      label: 'Break-even Cost',
      description: 'Cost at break-even point',
      unit: 'USD'
    },
    netSavings: {
      type: 'number',
      label: 'Net Savings',
      description: 'Net savings from PMI cancellation',
      unit: 'USD'
    },
    
    // Risk Analysis
    riskScore: {
      type: 'number',
      label: 'Risk Score',
      description: 'Overall risk assessment score',
      unit: '0-100'
    },
    probabilityOfCancellation: {
      type: 'number',
      label: 'Probability of Cancellation',
      description: 'Probability of successful PMI cancellation',
      unit: '0-1'
    },
    worstCaseScenario: {
      type: 'number',
      label: 'Worst Case Scenario',
      description: 'Worst case PMI cost scenario',
      unit: 'USD'
    },
    bestCaseScenario: {
      type: 'number',
      label: 'Best Case Scenario',
      description: 'Best case PMI cost scenario',
      unit: 'USD'
    },
    
    // Tax Analysis
    taxDeduction: {
      type: 'number',
      label: 'Tax Deduction',
      description: 'Potential tax deduction from PMI',
      unit: 'USD'
    },
    afterTaxCost: {
      type: 'number',
      label: 'After-Tax Cost',
      description: 'PMI cost after tax benefits',
      unit: 'USD'
    },
    taxBenefit: {
      type: 'number',
      label: 'Tax Benefit',
      description: 'Tax benefit from PMI deduction',
      unit: 'USD'
    },
    
    // Analysis Arrays
    timelineAnalysis: {
      type: 'array',
      label: 'Timeline Analysis',
      description: 'Monthly timeline of PMI costs and LTV changes',
      items: {
        type: 'object',
        properties: {
          month: { type: 'number', label: 'Month' },
          date: { type: 'string', label: 'Date' },
          ltvRatio: { type: 'number', label: 'LTV Ratio' },
          pmiPayment: { type: 'number', label: 'PMI Payment' },
          principalBalance: { type: 'number', label: 'Principal Balance' },
          equity: { type: 'number', label: 'Equity' }
        }
      }
    },
    sensitivityMatrix: {
      type: 'array',
      label: 'Sensitivity Matrix',
      description: 'Sensitivity analysis of key variables',
      items: {
        type: 'object',
        properties: {
          variable: { type: 'string', label: 'Variable' },
          values: { type: 'array', label: 'Values' },
          impacts: { type: 'array', label: 'Impacts' }
        }
      }
    },
    scenarios: {
      type: 'array',
      label: 'Scenarios',
      description: 'Different PMI cost scenarios',
      items: {
        type: 'object',
        properties: {
          scenario: { type: 'string', label: 'Scenario' },
          probability: { type: 'number', label: 'Probability' },
          pmiCost: { type: 'number', label: 'PMI Cost' },
          totalCost: { type: 'number', label: 'Total Cost' }
        }
      }
    },
    comparisonAnalysis: {
      type: 'array',
      label: 'Comparison Analysis',
      description: 'Comparison of different PMI options',
      items: {
        type: 'object',
        properties: {
          option: { type: 'string', label: 'Option' },
          pmiCost: { type: 'number', label: 'PMI Cost' },
          totalCost: { type: 'number', label: 'Total Cost' },
          savings: { type: 'number', label: 'Savings' }
        }
      }
    },
    marketAnalysis: {
      type: 'array',
      label: 'Market Analysis',
      description: 'Market factors affecting PMI',
      items: {
        type: 'object',
        properties: {
          factor: { type: 'string', label: 'Factor' },
          impact: { type: 'string', label: 'Impact' },
          risk: { type: 'string', label: 'Risk Level' }
        }
      }
    },
    
    // Analysis Object
    analysis: {
      type: 'object',
      label: 'Analysis',
      description: 'Comprehensive analysis and recommendations',
      properties: {
        pmiRating: { type: 'string', label: 'PMI Rating' },
        costRating: { type: 'string', label: 'Cost Rating' },
        recommendation: { type: 'string', label: 'Recommendation' },
        keyStrengths: { type: 'array', label: 'Key Strengths' },
        keyWeaknesses: { type: 'array', label: 'Key Weaknesses' },
        costFactors: { type: 'array', label: 'Cost Factors' },
        opportunities: { type: 'array', label: 'Opportunities' },
        pmiRecommendations: { type: 'array', label: 'PMI Recommendations' },
        cancellationRecommendations: { type: 'array', label: 'Cancellation Recommendations' },
        optimizationSuggestions: { type: 'array', label: 'Optimization Suggestions' },
        nextSteps: { type: 'array', label: 'Next Steps' },
        performanceBenchmarks: { type: 'array', label: 'Performance Benchmarks' },
        presentationPoints: { type: 'array', label: 'Presentation Points' },
        decisionFactors: { type: 'array', label: 'Decision Factors' }
      }
    }
  },
  features: [
    'Comprehensive PMI cost calculation and analysis',
    'Cancellation eligibility assessment and timeline',
    'Break-even analysis for PMI cancellation',
    'Risk scoring and probability assessment',
    'Tax impact analysis and benefits calculation',
    'Timeline analysis with monthly projections',
    'Sensitivity analysis for key variables',
    'Multiple scenario modeling',
    'Comparison analysis of different options',
    'Market condition impact assessment',
    'Performance benchmarking',
    'Optimization recommendations',
    'Detailed cost breakdown and analysis',
    'Equity position tracking',
    'Effective interest rate calculation',
    'Payment impact analysis',
    'Cancellation date projections',
    'Net savings calculations',
    'Worst and best case scenarios',
    'Comprehensive reporting and recommendations'
  ],
  examples: [
    {
      name: 'Conventional Loan with 10% Down',
      description: 'Analyze PMI costs for a $300,000 conventional loan with 10% down payment',
      inputs: {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: 30,
        loanType: 'conventional',
        propertyValue: 333333,
        downPayment: 33333,
        downPaymentPercentage: 10,
        pmiRate: 0.5
      }
    },
    {
      name: 'FHA Loan with 3.5% Down',
      description: 'Calculate PMI costs for an FHA loan with minimum down payment',
      inputs: {
        loanAmount: 250000,
        interestRate: 4.0,
        loanTerm: 30,
        loanType: 'fha',
        propertyValue: 259067,
        downPayment: 9067,
        downPaymentPercentage: 3.5,
        pmiRate: 0.85
      }
    },
    {
      name: 'PMI Cancellation Analysis',
      description: 'Analyze when PMI can be cancelled and potential savings',
      inputs: {
        loanAmount: 400000,
        interestRate: 4.25,
        loanTerm: 30,
        propertyValue: 500000,
        downPayment: 100000,
        downPaymentPercentage: 20,
        pmiRate: 0.4,
        monthsSinceLoanStart: 24,
        currentPrincipalBalance: 385000
      }
    },
    {
      name: 'High-Value Property Analysis',
      description: 'PMI analysis for a high-value property with jumbo loan',
      inputs: {
        loanAmount: 800000,
        interestRate: 4.75,
        loanTerm: 30,
        loanType: 'jumbo',
        propertyValue: 1000000,
        downPayment: 200000,
        downPaymentPercentage: 20,
        pmiRate: 0.6
      }
    },
    {
      name: 'Investment Property PMI',
      description: 'PMI analysis for an investment property with different requirements',
      inputs: {
        loanAmount: 350000,
        interestRate: 5.0,
        loanTerm: 30,
        propertyValue: 437500,
        downPayment: 87500,
        downPaymentPercentage: 20,
        pmiRate: 0.7,
        propertyType: 'multi_family'
      }
    }
  ],
  relatedCalculators: [
    'mortgage-payment',
    'mortgage-calculator',
    'loan-calculator',
    'debt-to-income-ratio',
    'mortgage-refinance',
    'mortgage-points',
    'mortgage-rate-lock',
    'mortgage-vs-rent',
    'pmi-cancellation',
    'home-equity',
    'refinance-calculator',
    'amortization-schedule'
  ]
};
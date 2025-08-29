import { Calculator } from '@/types/calculator';
import { MortgagePointsCalculator } from './MortgagePointsCalculator';

export const mortgagePointsCalculator: Calculator = {
  id: 'mortgage-points',
  name: 'Mortgage Points Calculator',
  description: 'Calculate the cost and benefits of mortgage points to determine if buying down your interest rate is worth it.',
  category: 'finance',
  tags: ['mortgage', 'points', 'interest rate', 'buy down', 'refinance', 'loan', 'real estate', 'home buying'],
  component: MortgagePointsCalculator,
  inputs: {
    loanAmount: {
      label: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'The total loan amount you are borrowing'
    },
    baseInterestRate: {
      label: 'Base Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'The base interest rate before any points'
    },
    loanTerm: {
      label: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'The length of the loan in years'
    },
    loanType: {
      label: 'Loan Type',
      type: 'select',
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' },
        { value: 'hard_money', label: 'Hard Money' },
        { value: 'private', label: 'Private' }
      ],
      required: true,
      description: 'The type of mortgage loan'
    },
    paymentType: {
      label: 'Payment Type',
      type: 'select',
      options: [
        { value: 'principal_interest', label: 'Principal & Interest' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon' },
        { value: 'arm', label: 'Adjustable Rate' }
      ],
      required: true,
      description: 'The type of payment structure'
    },
    discountPoints: {
      label: 'Discount Points',
      type: 'number',
      unit: 'points',
      required: true,
      description: 'Number of discount points to buy down the rate'
    },
    originationPoints: {
      label: 'Origination Points',
      type: 'number',
      unit: 'points',
      required: true,
      description: 'Number of origination points charged by lender'
    },
    pointCost: {
      label: 'Point Cost',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Cost per point (typically 1% of loan amount)'
    },
    pointValue: {
      label: 'Point Value',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Rate reduction per point (typically 0.25%)'
    },
    rateOptions: {
      label: 'Rate Options',
      type: 'array',
      required: true,
      description: 'Available rate options with different point costs'
    },
    propertyValue: {
      label: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'The appraised value of the property'
    },
    downPayment: {
      label: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'The down payment amount'
    },
    downPaymentPercentage: {
      label: 'Down Payment %',
      type: 'number',
      unit: '%',
      required: true,
      description: 'The down payment as a percentage of property value'
    },
    propertyInsurance: {
      label: 'Property Insurance',
      type: 'number',
      unit: 'USD/year',
      required: true,
      description: 'Annual property insurance cost'
    },
    propertyTaxes: {
      label: 'Property Taxes',
      type: 'number',
      unit: 'USD/year',
      required: true,
      description: 'Annual property tax cost'
    },
    hoaFees: {
      label: 'HOA Fees',
      type: 'number',
      unit: 'USD/month',
      required: true,
      description: 'Monthly HOA fees'
    },
    floodInsurance: {
      label: 'Flood Insurance',
      type: 'number',
      unit: 'USD/year',
      required: true,
      description: 'Annual flood insurance cost'
    },
    mortgageInsurance: {
      label: 'Mortgage Insurance',
      type: 'number',
      unit: 'USD/year',
      required: true,
      description: 'Annual mortgage insurance cost'
    },
    mortgageInsuranceRate: {
      label: 'Mortgage Insurance Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Annual mortgage insurance rate'
    },
    borrowerIncome: {
      label: 'Borrower Income',
      type: 'number',
      unit: 'USD/year',
      required: true,
      description: 'Annual borrower income'
    },
    borrowerCreditScore: {
      label: 'Credit Score',
      type: 'number',
      required: true,
      description: 'Borrower credit score (300-850)'
    },
    borrowerDebtToIncomeRatio: {
      label: 'Debt-to-Income Ratio',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Borrower debt-to-income ratio'
    },
    borrowerEmploymentType: {
      label: 'Employment Type',
      type: 'select',
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'business_owner', label: 'Business Owner' }
      ],
      required: true,
      description: 'Borrower employment type'
    },
    borrowerTaxRate: {
      label: 'Tax Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Borrower marginal tax rate'
    },
    marketLocation: {
      label: 'Market Location',
      type: 'text',
      required: true,
      description: 'Property market location'
    },
    marketCondition: {
      label: 'Market Condition',
      type: 'select',
      options: [
        { value: 'declining', label: 'Declining' },
        { value: 'stable', label: 'Stable' },
        { value: 'growing', label: 'Growing' },
        { value: 'hot', label: 'Hot' }
      ],
      required: true,
      description: 'Current market condition'
    },
    marketGrowthRate: {
      label: 'Market Growth Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected annual market growth rate'
    },
    analysisPeriod: {
      label: 'Analysis Period',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Period for analysis (typically loan term)'
    },
    inflationRate: {
      label: 'Inflation Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected annual inflation rate'
    },
    propertyAppreciationRate: {
      label: 'Property Appreciation Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected annual property appreciation rate'
    },
    discountRate: {
      label: 'Discount Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Discount rate for present value calculations'
    },
    taxDeductionPeriod: {
      label: 'Tax Deduction Period',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Period for tax deduction benefits'
    },
    currency: {
      label: 'Currency',
      type: 'select',
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      required: true,
      description: 'Currency for calculations'
    },
    displayFormat: {
      label: 'Display Format',
      type: 'select',
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ],
      required: true,
      description: 'Format for displaying results'
    },
    includeCharts: {
      label: 'Include Charts',
      type: 'boolean',
      required: true,
      description: 'Whether to include charts in the analysis'
    },
    propertyAddress: {
      label: 'Property Address',
      type: 'text',
      required: true,
      description: 'Property address'
    },
    propertyType: {
      label: 'Property Type',
      type: 'select',
      options: [
        { value: 'single_family', label: 'Single Family' },
        { value: 'multi_family', label: 'Multi-Family' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial' }
      ],
      required: true,
      description: 'Type of property'
    },
    propertySize: {
      label: 'Property Size',
      type: 'number',
      unit: 'sq ft',
      required: true,
      description: 'Property size in square feet'
    },
    propertyAge: {
      label: 'Property Age',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Age of the property'
    },
    downPaymentSource: {
      label: 'Down Payment Source',
      type: 'select',
      options: [
        { value: 'savings', label: 'Savings' },
        { value: 'investment_sale', label: 'Investment Sale' },
        { value: 'gift', label: 'Gift' },
        { value: 'inheritance', label: 'Inheritance' },
        { value: 'other', label: 'Other' }
      ],
      required: true,
      description: 'Source of down payment funds'
    }
  },
  outputs: {
    totalPoints: {
      label: 'Total Points',
      type: 'number',
      unit: 'points',
      description: 'Total number of points (discount + origination)'
    },
    totalPointCost: {
      label: 'Total Point Cost',
      type: 'number',
      unit: 'USD',
      description: 'Total cost of all points'
    },
    effectiveRate: {
      label: 'Effective Rate',
      type: 'number',
      unit: '%',
      description: 'Interest rate after points are applied'
    },
    monthlyPaymentSavings: {
      label: 'Monthly Payment Savings',
      type: 'number',
      unit: 'USD',
      description: 'Monthly payment savings from points'
    },
    interestSavings: {
      label: 'Interest Savings',
      type: 'number',
      unit: 'USD',
      description: 'Total interest savings over loan term'
    },
    breakEvenMonths: {
      label: 'Break-Even Months',
      type: 'number',
      unit: 'months',
      description: 'Number of months to break even on point cost'
    },
    returnOnInvestment: {
      label: 'Return on Investment',
      type: 'number',
      unit: '%',
      description: 'ROI on point investment'
    },
    netPresentValue: {
      label: 'Net Present Value',
      type: 'number',
      unit: 'USD',
      description: 'NPV of point investment'
    },
    analysis: {
      label: 'Analysis',
      type: 'object',
      description: 'Comprehensive analysis of the points decision'
    }
  },
  features: [
    'Break-even analysis',
    'Tax impact calculations',
    'ROI and NPV analysis',
    'Sensitivity analysis',
    'Scenario modeling',
    'Amortization comparison',
    'Risk assessment',
    'Market condition analysis',
    'Multiple rate options comparison',
    'Comprehensive reporting'
  ],
  examples: [
    {
      name: 'Standard 30-Year Fixed Rate',
      description: 'Calculate points for a $300,000 30-year fixed rate mortgage at 6.5%',
      inputs: {
        loanAmount: 300000,
        baseInterestRate: 6.5,
        loanTerm: 30,
        discountPoints: 2,
        originationPoints: 1,
        pointCost: 1000,
        pointValue: 0.25
      }
    },
    {
      name: 'High-Value Property',
      description: 'Points analysis for a $750,000 jumbo loan',
      inputs: {
        loanAmount: 750000,
        baseInterestRate: 7.0,
        loanTerm: 30,
        discountPoints: 3,
        originationPoints: 1,
        pointCost: 2500,
        pointValue: 0.2
      }
    },
    {
      name: 'FHA Loan with Points',
      description: 'Points calculation for FHA loan with mortgage insurance',
      inputs: {
        loanAmount: 250000,
        baseInterestRate: 6.0,
        loanTerm: 30,
        loanType: 'fha',
        discountPoints: 1,
        originationPoints: 1,
        pointCost: 800,
        pointValue: 0.25
      }
    }
  ],
  relatedCalculators: [
    'mortgage-payment',
    'mortgage-refinance',
    'mortgage-comparison',
    'amortization',
    'debt-to-income',
    'loan-to-value',
    'mortgage-insurance',
    'closing-costs'
  ]
};
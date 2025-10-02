import { Calculator } from '../../types/calculator';
import { calculateMortgageEquity } from './formulas';
import { generateMortgageEquityAnalysis } from './formulas';

export const MortgageEquityCalculator: Calculator = {
  id: 'mortgage-equity-calculator',
  name: 'Mortgage Equity Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate your home equity, loan-to-value ratio, and equity growth over time to understand your property investment and borrowing potential.',
  inputs: {
    homeValue: {
      type: 'currency',
      value: 500000,
      unit: 'USD',
      description: 'Current home value',
      placeholder: 'Enter current home value',
      validation: {
        required: true,
        min: 10000,
        max: 10000000
      }
    },
    originalPurchasePrice: {
      type: 'currency',
      value: 400000,
      unit: 'USD',
      description: 'Original purchase price',
      placeholder: 'Enter original purchase price',
      validation: {
        required: true,
        min: 10000,
        max: 10000000
      }
    },
    purchaseDate: {
      type: 'date',
      value: '2020-01-15',
      unit: '',
      description: 'Date of purchase',
      placeholder: 'Select purchase date',
      validation: {
        required: true
      }
    },
    originalLoanAmount: {
      type: 'currency',
      value: 320000,
      unit: 'USD',
      description: 'Original loan amount',
      placeholder: 'Enter original loan amount',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    currentLoanBalance: {
      type: 'currency',
      value: 280000,
      unit: 'USD',
      description: 'Current loan balance',
      placeholder: 'Enter current loan balance',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    interestRate: {
      type: 'percentage',
      value: 4.5,
      unit: '%',
      description: 'Current interest rate',
      placeholder: 'Enter current interest rate',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    },
    loanTerm: {
      type: 'number',
      value: 30,
      unit: 'years',
      description: 'Original loan term',
      placeholder: 'Enter original loan term',
      validation: {
        required: true,
        min: 1,
        max: 50
      }
    },
    monthlyPayment: {
      type: 'currency',
      value: 1620,
      unit: 'USD/month',
      description: 'Current monthly payment',
      placeholder: 'Enter current monthly payment',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    propertyTaxRate: {
      type: 'percentage',
      value: 1.2,
      unit: '%',
      description: 'Annual property tax rate',
      placeholder: 'Enter property tax rate',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    homeownersInsuranceAnnual: {
      type: 'currency',
      value: 1200,
      unit: 'USD/year',
      description: 'Annual homeowners insurance',
      placeholder: 'Enter annual insurance cost',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    homeImprovements: {
      type: 'currency',
      value: 25000,
      unit: 'USD',
      description: 'Total home improvements made',
      placeholder: 'Enter total improvements cost',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    marketAppreciationRate: {
      type: 'percentage',
      value: 3.5,
      unit: '%/year',
      description: 'Annual market appreciation rate',
      placeholder: 'Enter annual appreciation rate',
      validation: {
        required: true,
        min: -20,
        max: 20
      }
    },
    closingCosts: {
      type: 'currency',
      value: 12000,
      unit: 'USD',
      description: 'Original closing costs',
      placeholder: 'Enter original closing costs',
      validation: {
        required: true,
        min: 0,
        max: 100000
      }
    },
    downPayment: {
      type: 'currency',
      value: 80000,
      unit: 'USD',
      description: 'Original down payment',
      placeholder: 'Enter original down payment',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    pmiMonthly: {
      type: 'currency',
      value: 0,
      unit: 'USD/month',
      description: 'Monthly PMI payment',
      placeholder: 'Enter monthly PMI if applicable',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    helocBalance: {
      type: 'currency',
      value: 0,
      unit: 'USD',
      description: 'HELOC balance (if any)',
      placeholder: 'Enter HELOC balance',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    secondMortgageBalance: {
      type: 'currency',
      value: 0,
      unit: 'USD',
      description: 'Second mortgage balance (if any)',
      placeholder: 'Enter second mortgage balance',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    otherLiens: {
      type: 'currency',
      value: 0,
      unit: 'USD',
      description: 'Other liens or debts against property',
      placeholder: 'Enter other liens amount',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    rentalIncome: {
      type: 'currency',
      value: 0,
      unit: 'USD/month',
      description: 'Monthly rental income (if applicable)',
      placeholder: 'Enter monthly rental income',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    rentalExpenses: {
      type: 'currency',
      value: 0,
      unit: 'USD/month',
      description: 'Monthly rental expenses (if applicable)',
      placeholder: 'Enter monthly rental expenses',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    refinanceHistory: {
      type: 'select',
      value: 'none',
      unit: '',
      description: 'Refinance history',
      placeholder: 'Select refinance history',
      options: [
        { value: 'none', label: 'No refinances' },
        { value: 'one', label: 'One refinance' },
        { value: 'multiple', label: 'Multiple refinances' }
      ],
      validation: {
        required: true
      }
    },
    refinanceCosts: {
      type: 'currency',
      value: 0,
      unit: 'USD',
      description: 'Total refinance costs paid',
      placeholder: 'Enter total refinance costs',
      validation: {
        required: true,
        min: 0,
        max: 100000
      }
    },
    propertyType: {
      type: 'select',
      value: 'single-family',
      unit: '',
      description: 'Property type',
      placeholder: 'Select property type',
      options: [
        { value: 'single-family', label: 'Single Family Home' },
        { value: 'condo', label: 'Condo/Townhouse' },
        { value: 'multi-family', label: 'Multi-Family' },
        { value: 'investment', label: 'Investment Property' }
      ],
      validation: {
        required: true
      }
    },
    locationType: {
      type: 'select',
      value: 'urban',
      unit: '',
      description: 'Location type',
      placeholder: 'Select location type',
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'rural', label: 'Rural' }
      ],
      validation: {
        required: true
      }
    },
    propertyAge: {
      type: 'number',
      value: 15,
      unit: 'years',
      description: 'Property age in years',
      placeholder: 'Enter property age',
      validation: {
        required: true,
        min: 0,
        max: 200
      }
    },
    squareFootage: {
      type: 'number',
      value: 2000,
      unit: 'sq ft',
      description: 'Property square footage',
      placeholder: 'Enter square footage',
      validation: {
        required: true,
        min: 100,
        max: 10000
      }
    },
    bedrooms: {
      type: 'number',
      value: 3,
      unit: '',
      description: 'Number of bedrooms',
      placeholder: 'Enter number of bedrooms',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    },
    bathrooms: {
      type: 'number',
      value: 2,
      unit: '',
      description: 'Number of bathrooms',
      placeholder: 'Enter number of bathrooms',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    }
  },
  outputs: [
    {
      name: 'currentEquity',
      label: 'Current Equity',
      type: 'currency',
      unit: 'USD',
      description: 'Current equity in the property'
    },
    {
      name: 'equityPercentage',
      label: 'Equity Percentage',
      type: 'percentage',
      unit: '%',
      description: 'Equity as percentage of home value'
    },
    {
      name: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio',
      type: 'percentage',
      unit: '%',
      description: 'Current LTV ratio'
    },
    {
      name: 'totalDebt',
      label: 'Total Debt',
      type: 'currency',
      unit: 'USD',
      description: 'Total debt against the property'
    },
    {
      name: 'equityGrowth',
      label: 'Equity Growth',
      type: 'currency',
      unit: 'USD',
      description: 'Total equity growth since purchase'
    },
    {
      name: 'equityGrowthPercentage',
      label: 'Equity Growth %',
      type: 'percentage',
      unit: '%',
      description: 'Percentage growth in equity'
    },
    {
      name: 'appreciationGain',
      label: 'Appreciation Gain',
      type: 'currency',
      unit: 'USD',
      description: 'Gain from market appreciation'
    },
    {
      name: 'principalPaid',
      label: 'Principal Paid',
      type: 'currency',
      unit: 'USD',
      description: 'Total principal paid to date'
    },
    {
      name: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      unit: 'USD',
      description: 'Total amount invested in property'
    },
    {
      name: 'returnOnInvestment',
      label: 'Return on Investment',
      type: 'percentage',
      unit: '%',
      description: 'ROI on total investment'
    },
    {
      name: 'annualizedReturn',
      label: 'Annualized Return',
      type: 'percentage',
      unit: '%/year',
      description: 'Annualized return on investment'
    },
    {
      name: 'monthlyEquityBuild',
      label: 'Monthly Equity Build',
      type: 'currency',
      unit: 'USD/month',
      description: 'Average monthly equity increase'
    },
    {
      name: 'yearsToOwnership',
      label: 'Years to Full Ownership',
      type: 'number',
      unit: 'years',
      description: 'Years until mortgage is paid off'
    },
    {
      name: 'equityBreakdown',
      label: 'Equity Breakdown',
      type: 'string',
      unit: '',
      description: 'Detailed breakdown of equity sources'
    },
    {
      name: 'borrowingCapacity',
      label: 'Borrowing Capacity',
      type: 'currency',
      unit: 'USD',
      description: 'Available equity for borrowing'
    },
    {
      name: 'helocEligibility',
      label: 'HELOC Eligibility',
      type: 'string',
      unit: '',
      description: 'HELOC eligibility and terms'
    },
    {
      name: 'cashOutRefinance',
      label: 'Cash-Out Refinance',
      type: 'string',
      unit: '',
      description: 'Cash-out refinance options'
    },
    {
      name: 'investmentAnalysis',
      label: 'Investment Analysis',
      type: 'string',
      unit: '',
      description: 'Property investment performance analysis'
    },
    {
      name: 'marketComparison',
      label: 'Market Comparison',
      type: 'string',
      unit: '',
      description: 'Comparison with market performance'
    },
    {
      name: 'equityProjection',
      label: 'Equity Projection',
      type: 'string',
      unit: '',
      description: 'Future equity projections'
    },
    {
      name: 'recommendations',
      label: 'Recommendations',
      type: 'string',
      unit: '',
      description: 'Recommendations for equity optimization'
    },
    {
      name: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'string',
      unit: '',
      description: 'Risk assessment of current equity position'
    },
    {
      name: 'taxImplications',
      label: 'Tax Implications',
      type: 'string',
      unit: '',
      description: 'Tax implications of equity position'
    },
    {
      name: 'refinanceAnalysis',
      label: 'Refinance Analysis',
      type: 'string',
      unit: '',
      description: 'Refinance opportunities analysis'
    }
  ],
  calculate: calculateMortgageEquity,
  generateReport: generateMortgageEquityAnalysis
};

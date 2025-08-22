import { Calculator } from '../../../types/calculator';
import { calculateMortgageInsurance } from './formulas';
import { generateMortgageInsuranceAnalysis } from './formulas';

export const MortgageInsuranceCalculator: Calculator = {
  id: 'mortgage-insurance-calculator',
  name: 'Mortgage Insurance Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage insurance costs, PMI rates, and determine when you can cancel insurance based on your loan-to-value ratio and payment history.',
  inputs: {
    homeValue: {
      type: 'currency',
      value: 400000,
      unit: 'USD',
      description: 'Current home value',
      placeholder: 'Enter current home value',
      validation: {
        required: true,
        min: 10000,
        max: 10000000
      }
    },
    loanAmount: {
      type: 'currency',
      value: 360000,
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
      value: 340000,
      unit: 'USD',
      description: 'Current loan balance',
      placeholder: 'Enter current loan balance',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    downPayment: {
      type: 'currency',
      value: 40000,
      unit: 'USD',
      description: 'Original down payment',
      placeholder: 'Enter original down payment',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    creditScore: {
      type: 'number',
      value: 720,
      unit: '',
      description: 'Credit score',
      placeholder: 'Enter your credit score',
      validation: {
        required: true,
        min: 300,
        max: 850
      }
    },
    loanType: {
      type: 'select',
      value: 'conventional',
      unit: '',
      description: 'Loan type',
      placeholder: 'Select loan type',
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' }
      ],
      validation: {
        required: true
      }
    },
    loanTerm: {
      type: 'number',
      value: 30,
      unit: 'years',
      description: 'Loan term',
      placeholder: 'Enter loan term',
      validation: {
        required: true,
        min: 1,
        max: 50
      }
    },
    interestRate: {
      type: 'percentage',
      value: 6.5,
      unit: '%',
      description: 'Interest rate',
      placeholder: 'Enter interest rate',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    },
    monthlyPayment: {
      type: 'currency',
      value: 2275,
      unit: 'USD/month',
      description: 'Monthly payment (including insurance)',
      placeholder: 'Enter monthly payment',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    purchaseDate: {
      type: 'date',
      value: '2023-01-15',
      unit: '',
      description: 'Purchase date',
      placeholder: 'Select purchase date',
      validation: {
        required: true
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
    occupancyType: {
      type: 'select',
      value: 'primary',
      unit: '',
      description: 'Occupancy type',
      placeholder: 'Select occupancy type',
      options: [
        { value: 'primary', label: 'Primary Residence' },
        { value: 'secondary', label: 'Secondary Home' },
        { value: 'investment', label: 'Investment Property' }
      ],
      validation: {
        required: true
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
    monthlyPrincipalPayment: {
      type: 'currency',
      value: 450,
      unit: 'USD/month',
      description: 'Monthly principal payment',
      placeholder: 'Enter monthly principal payment',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    additionalPrincipalPayments: {
      type: 'currency',
      value: 0,
      unit: 'USD/month',
      description: 'Additional monthly principal payments',
      placeholder: 'Enter additional principal payments',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    homeImprovements: {
      type: 'currency',
      value: 0,
      unit: 'USD',
      description: 'Home improvements made since purchase',
      placeholder: 'Enter home improvements cost',
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
    paymentHistory: {
      type: 'select',
      value: 'perfect',
      unit: '',
      description: 'Payment history',
      placeholder: 'Select payment history',
      options: [
        { value: 'perfect', label: 'Perfect (no late payments)' },
        { value: 'good', label: 'Good (1-2 late payments)' },
        { value: 'fair', label: 'Fair (3-5 late payments)' },
        { value: 'poor', label: 'Poor (6+ late payments)' }
      ],
      validation: {
        required: true
      }
    },
    bankruptcyHistory: {
      type: 'select',
      value: 'none',
      unit: '',
      description: 'Bankruptcy history',
      placeholder: 'Select bankruptcy history',
      options: [
        { value: 'none', label: 'No bankruptcies' },
        { value: 'chapter7', label: 'Chapter 7 bankruptcy' },
        { value: 'chapter13', label: 'Chapter 13 bankruptcy' },
        { value: 'multiple', label: 'Multiple bankruptcies' }
      ],
      validation: {
        required: true
      }
    },
    foreclosureHistory: {
      type: 'select',
      value: 'none',
      unit: '',
      description: 'Foreclosure history',
      placeholder: 'Select foreclosure history',
      options: [
        { value: 'none', label: 'No foreclosures' },
        { value: 'one', label: 'One foreclosure' },
        { value: 'multiple', label: 'Multiple foreclosures' }
      ],
      validation: {
        required: true
      }
    },
    debtToIncomeRatio: {
      type: 'percentage',
      value: 35,
      unit: '%',
      description: 'Debt-to-income ratio',
      placeholder: 'Enter debt-to-income ratio',
      validation: {
        required: true,
        min: 0,
        max: 100
      }
    },
    annualIncome: {
      type: 'currency',
      value: 80000,
      unit: 'USD/year',
      description: 'Annual income',
      placeholder: 'Enter annual income',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    otherMonthlyDebts: {
      type: 'currency',
      value: 800,
      unit: 'USD/month',
      description: 'Other monthly debt payments',
      placeholder: 'Enter other monthly debts',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    state: {
      type: 'select',
      value: 'CA',
      unit: '',
      description: 'State',
      placeholder: 'Select state',
      options: [
        { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }
      ],
      validation: {
        required: true
      }
    },
    county: {
      type: 'select',
      value: 'urban',
      unit: '',
      description: 'County type',
      placeholder: 'Select county type',
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'rural', label: 'Rural' }
      ],
      validation: {
        required: true
      }
    }
  },
  outputs: [
    {
      name: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio',
      type: 'percentage',
      unit: '%',
      description: 'Current LTV ratio'
    },
    {
      name: 'originalLTV',
      label: 'Original LTV Ratio',
      type: 'percentage',
      unit: '%',
      description: 'Original LTV ratio at purchase'
    },
    {
      name: 'pmiRate',
      label: 'PMI Rate',
      type: 'percentage',
      unit: '%',
      description: 'Annual PMI rate'
    },
    {
      name: 'monthlyPMI',
      label: 'Monthly PMI',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly PMI payment'
    },
    {
      name: 'annualPMI',
      label: 'Annual PMI',
      type: 'currency',
      unit: 'USD/year',
      description: 'Annual PMI cost'
    },
    {
      name: 'totalPMICost',
      label: 'Total PMI Cost',
      type: 'currency',
      unit: 'USD',
      description: 'Total PMI cost to date'
    },
    {
      name: 'pmiCancellationDate',
      label: 'PMI Cancellation Date',
      type: 'date',
      unit: '',
      description: 'Estimated date PMI can be cancelled'
    },
    {
      name: 'monthsToCancellation',
      label: 'Months to PMI Cancellation',
      type: 'number',
      unit: 'months',
      description: 'Months until PMI can be cancelled'
    },
    {
      name: 'equityNeeded',
      label: 'Equity Needed for Cancellation',
      type: 'currency',
      unit: 'USD',
      description: 'Additional equity needed to cancel PMI'
    },
    {
      name: 'principalNeeded',
      label: 'Principal Reduction Needed',
      type: 'currency',
      unit: 'USD',
      description: 'Additional principal reduction needed'
    },
    {
      name: 'monthlySavings',
      label: 'Monthly Savings After Cancellation',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly savings after PMI cancellation'
    },
    {
      name: 'annualSavings',
      label: 'Annual Savings After Cancellation',
      type: 'currency',
      unit: 'USD/year',
      description: 'Annual savings after PMI cancellation'
    },
    {
      name: 'totalSavings',
      label: 'Total Savings Until Cancellation',
      type: 'currency',
      unit: 'USD',
      description: 'Total PMI cost until cancellation'
    },
    {
      name: 'fhaMIPRate',
      label: 'FHA MIP Rate',
      type: 'percentage',
      unit: '%',
      description: 'FHA Mortgage Insurance Premium rate'
    },
    {
      name: 'monthlyFHA',
      label: 'Monthly FHA MIP',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly FHA MIP payment'
    },
    {
      name: 'fhaCancellation',
      label: 'FHA MIP Cancellation',
      type: 'string',
      unit: '',
      description: 'FHA MIP cancellation requirements'
    },
    {
      name: 'insuranceComparison',
      label: 'Insurance Comparison',
      type: 'string',
      unit: '',
      description: 'Comparison of different insurance types'
    },
    {
      name: 'cancellationStrategies',
      label: 'Cancellation Strategies',
      type: 'string',
      unit: '',
      description: 'Strategies to cancel mortgage insurance'
    },
    {
      name: 'refinanceAnalysis',
      label: 'Refinance Analysis',
      type: 'string',
      unit: '',
      description: 'Refinance options to eliminate insurance'
    },
    {
      name: 'costBenefitAnalysis',
      label: 'Cost-Benefit Analysis',
      type: 'string',
      unit: '',
      description: 'Cost-benefit analysis of insurance cancellation'
    },
    {
      name: 'recommendations',
      label: 'Recommendations',
      type: 'string',
      unit: '',
      description: 'Recommendations for insurance management'
    },
    {
      name: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'string',
      unit: '',
      description: 'Risk assessment of current insurance position'
    },
    {
      name: 'timeline',
      label: 'Cancellation Timeline',
      type: 'string',
      unit: '',
      description: 'Detailed timeline for insurance cancellation'
    },
    {
      name: 'legalRequirements',
      label: 'Legal Requirements',
      type: 'string',
      unit: '',
      description: 'Legal requirements for insurance cancellation'
    }
  ],
  calculate: calculateMortgageInsurance,
  generateReport: generateMortgageInsuranceAnalysis
};

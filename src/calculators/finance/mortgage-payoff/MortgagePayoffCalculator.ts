import { Calculator } from '../../../types/calculator';
import { calculateMortgagePayoff } from './formulas';
import { generateMortgagePayoffAnalysis } from './formulas';

export const MortgagePayoffCalculator: Calculator = {
  id: 'mortgage-payoff-calculator',
  name: 'Mortgage Payoff Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage payoff strategies, early payoff scenarios, and determine the optimal approach to pay off your mortgage faster while saving on interest.',
  inputs: {
    loanAmount: {
      type: 'currency',
      value: 400000,
      unit: 'USD',
      description: 'Original loan amount',
      placeholder: 'Enter original loan amount',
      validation: {
        required: true,
        min: 10000,
        max: 10000000
      }
    },
    currentBalance: {
      type: 'currency',
      value: 380000,
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
      unit: '%/year',
      description: 'Annual interest rate',
      placeholder: 'Enter annual interest rate',
      validation: {
        required: true,
        min: 0.1,
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
    yearsRemaining: {
      type: 'number',
      value: 28,
      unit: 'years',
      description: 'Years remaining on loan',
      placeholder: 'Enter years remaining',
      validation: {
        required: true,
        min: 0,
        max: 50
      }
    },
    monthlyPayment: {
      type: 'currency',
      value: 2400,
      unit: 'USD/month',
      description: 'Current monthly payment',
      placeholder: 'Enter current monthly payment',
      validation: {
        required: true,
        min: 0,
        max: 50000
      }
    },
    additionalMonthlyPayment: {
      type: 'currency',
      value: 200,
      unit: 'USD/month',
      description: 'Additional monthly payment',
      placeholder: 'Enter additional monthly payment',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    lumpSumPayment: {
      type: 'currency',
      value: 10000,
      unit: 'USD',
      description: 'One-time lump sum payment',
      placeholder: 'Enter one-time payment amount',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    biweeklyPayment: {
      type: 'boolean',
      value: false,
      unit: '',
      description: 'Switch to biweekly payments',
      placeholder: 'Select if switching to biweekly',
      validation: {
        required: true
      }
    },
    extraPaymentFrequency: {
      type: 'select',
      value: 'monthly',
      unit: '',
      description: 'Frequency of extra payments',
      placeholder: 'Select payment frequency',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' },
        { value: 'one-time', label: 'One-time' }
      ],
      validation: {
        required: true
      }
    },
    annualIncome: {
      type: 'currency',
      value: 85000,
      unit: 'USD/year',
      description: 'Annual household income',
      placeholder: 'Enter annual household income',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    emergencyFund: {
      type: 'currency',
      value: 25000,
      unit: 'USD',
      description: 'Emergency fund balance',
      placeholder: 'Enter emergency fund balance',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    otherDebts: {
      type: 'currency',
      value: 15000,
      unit: 'USD',
      description: 'Other outstanding debts',
      placeholder: 'Enter other outstanding debts',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    investmentReturn: {
      type: 'percentage',
      value: 7.0,
      unit: '%/year',
      description: 'Expected investment return',
      placeholder: 'Enter expected investment return',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    },
    taxRate: {
      type: 'percentage',
      value: 22,
      unit: '%',
      description: 'Marginal tax rate',
      placeholder: 'Enter marginal tax rate',
      validation: {
        required: true,
        min: 0,
        max: 50
      }
    },
    inflationRate: {
      type: 'percentage',
      value: 2.5,
      unit: '%/year',
      description: 'Expected annual inflation rate',
      placeholder: 'Enter expected inflation rate',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    homeValue: {
      type: 'currency',
      value: 450000,
      unit: 'USD',
      description: 'Current home value',
      placeholder: 'Enter current home value',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    refinanceRate: {
      type: 'percentage',
      value: 3.5,
      unit: '%/year',
      description: 'Available refinance rate',
      placeholder: 'Enter available refinance rate',
      validation: {
        required: true,
        min: 0.1,
        max: 20
      }
    },
    refinanceCosts: {
      type: 'currency',
      value: 5000,
      unit: 'USD',
      description: 'Refinance closing costs',
      placeholder: 'Enter refinance closing costs',
      validation: {
        required: true,
        min: 0,
        max: 100000
      }
    },
    payoffGoal: {
      type: 'select',
      value: 'minimum-time',
      unit: '',
      description: 'Payoff strategy goal',
      placeholder: 'Select payoff goal',
      options: [
        { value: 'minimum-time', label: 'Pay off in minimum time' },
        { value: 'minimum-cost', label: 'Pay off with minimum cost' },
        { value: 'balanced', label: 'Balanced approach' },
        { value: 'specific-date', label: 'Pay off by specific date' }
      ],
      validation: {
        required: true
      }
    },
    targetPayoffDate: {
      type: 'date',
      value: '2030-12-31',
      unit: '',
      description: 'Target payoff date',
      placeholder: 'Select target payoff date',
      validation: {
        required: true
      }
    },
    prepaymentPenalty: {
      type: 'boolean',
      value: false,
      unit: '',
      description: 'Prepayment penalty applies',
      placeholder: 'Select if prepayment penalty applies',
      validation: {
        required: true
      }
    },
    penaltyAmount: {
      type: 'currency',
      value: 0,
      unit: 'USD',
      description: 'Prepayment penalty amount',
      placeholder: 'Enter prepayment penalty amount',
      validation: {
        required: true,
        min: 0,
        max: 100000
      }
    },
    state: {
      type: 'select',
      value: 'CA',
      unit: '',
      description: 'State of residence',
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
    }
  },
  outputs: [
    {
      name: 'standardPayoffDate',
      label: 'Standard Payoff Date',
      type: 'date',
      unit: '',
      description: 'Date when loan will be paid off with standard payments'
    },
    {
      name: 'acceleratedPayoffDate',
      label: 'Accelerated Payoff Date',
      type: 'date',
      unit: '',
      description: 'Date when loan will be paid off with accelerated payments'
    },
    {
      name: 'timeSaved',
      label: 'Time Saved',
      type: 'number',
      unit: 'years',
      description: 'Years saved with accelerated payoff'
    },
    {
      name: 'interestSaved',
      label: 'Interest Saved',
      type: 'currency',
      unit: 'USD',
      description: 'Total interest saved with accelerated payoff'
    },
    {
      name: 'totalCostSavings',
      label: 'Total Cost Savings',
      type: 'currency',
      unit: 'USD',
      description: 'Total cost savings including opportunity cost'
    },
    {
      name: 'monthlyPaymentIncrease',
      label: 'Monthly Payment Increase',
      type: 'currency',
      unit: 'USD/month',
      description: 'Additional monthly payment required'
    },
    {
      name: 'payoffStrategy',
      label: 'Payoff Strategy',
      type: 'string',
      unit: '',
      description: 'Recommended payoff strategy'
    },
    {
      name: 'refinanceAnalysis',
      label: 'Refinance Analysis',
      type: 'string',
      unit: '',
      description: 'Analysis of refinancing vs. payoff options'
    },
    {
      name: 'investmentComparison',
      label: 'Investment Comparison',
      type: 'string',
      unit: '',
      description: 'Comparison of payoff vs. investment strategies'
    },
    {
      name: 'cashFlowImpact',
      label: 'Cash Flow Impact',
      type: 'string',
      unit: '',
      description: 'Impact on monthly cash flow'
    },
    {
      name: 'taxImplications',
      label: 'Tax Implications',
      type: 'string',
      unit: '',
      description: 'Tax implications of early payoff'
    },
    {
      name: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'string',
      unit: '',
      description: 'Risk assessment of payoff strategies'
    },
    {
      name: 'opportunityCost',
      label: 'Opportunity Cost',
      type: 'currency',
      unit: 'USD',
      description: 'Opportunity cost of early payoff'
    },
    {
      name: 'breakEvenAnalysis',
      label: 'Break-Even Analysis',
      type: 'string',
      unit: '',
      description: 'Break-even analysis of payoff strategies'
    },
    {
      name: 'scenarioComparison',
      label: 'Scenario Comparison',
      type: 'string',
      unit: '',
      description: 'Comparison of different payoff scenarios'
    },
    {
      name: 'recommendations',
      label: 'Recommendations',
      type: 'string',
      unit: '',
      description: 'Specific recommendations for payoff strategy'
    },
    {
      name: 'implementationPlan',
      label: 'Implementation Plan',
      type: 'string',
      unit: '',
      description: 'Step-by-step implementation plan'
    },
    {
      name: 'milestoneTimeline',
      label: 'Milestone Timeline',
      type: 'string',
      unit: '',
      description: 'Timeline of payoff milestones'
    },
    {
      name: 'financialImpact',
      label: 'Financial Impact',
      type: 'string',
      unit: '',
      description: 'Overall financial impact analysis'
    },
    {
      name: 'nextSteps',
      label: 'Next Steps',
      type: 'string',
      unit: '',
      description: 'Recommended next steps'
    }
  ],
  calculate: calculateMortgagePayoff,
  generateReport: generateMortgagePayoffAnalysis
};

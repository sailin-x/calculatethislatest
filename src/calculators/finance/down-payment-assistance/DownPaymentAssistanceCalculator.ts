import { Calculator } from '../../types/calculator';
import { calculateDownPaymentAssistance, generateDownPaymentAssistanceAnalysis } from './formulas';
import { validateDownPaymentAssistanceInputs } from './validation';

export const DownPaymentAssistanceCalculator: Calculator = {
  id: 'DownPaymentAssistance-calculator',
  name: 'Down Payment Assistance Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate down payment assistance programs, grants, and loan options to help first-time homebuyers and low-income borrowers.',
  inputs: [
    {
      id: 'homePrice',
      name: 'Home Price',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Purchase price of the home',
      placeholder: '300000',
      min: 50000,
      max: 10000000
    },
    {
      id: 'downPaymentPercentage',
      name: 'Down Payment Percentage',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Percentage of home price for down payment',
      placeholder: '3.5',
      min: 0,
      max: 50
    },
    {
      id: 'annualIncome',
      name: 'Annual Household Income',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total annual household income',
      placeholder: '75000',
      min: 10000,
      max: 500000
    },
    {
      id: 'householdSize',
      name: 'Household Size',
      type: 'number',
      unit: 'people',
      required: true,
      description: 'Number of people in household',
      placeholder: '2',
      min: 1,
      max: 10
    },
    {
      id: 'creditScore',
      name: 'Credit Score',
      type: 'number',
      unit: 'score',
      required: true,
      description: 'FICO credit score',
      placeholder: '720',
      min: 300,
      max: 850
    },
    {
      id: 'location',
      name: 'Location',
      type: 'select',
      required: true,
      description: 'State or territory for assistance programs',
      options: [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' },
        { value: 'DC', label: 'District of Columbia' },
        { value: 'PR', label: 'Puerto Rico' },
        { value: 'VI', label: 'U.S. Virgin Islands' }
      ]
    },
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of property being purchased',
      options: [
        { value: 'single-family', label: 'Single Family Home' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'manufactured', label: 'Manufactured Home' },
        { value: 'multi-family', label: 'Multi-Family (2-4 units)' }
      ]
    },
    {
      id: 'occupancyType',
      name: 'Occupancy Type',
      type: 'select',
      required: true,
      description: 'How the property will be occupied',
      options: [
        { value: 'primary', label: 'Primary Residence' },
        { value: 'secondary', label: 'Secondary Residence' },
        { value: 'investment', label: 'Investment Property' }
      ]
    },
    {
      id: 'firstTimeBuyer',
      name: 'First-Time Homebuyer',
      type: 'select',
      required: true,
      description: 'Whether this is a first-time homebuyer',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      id: 'veteranStatus',
      name: 'Veteran Status',
      type: 'select',
      required: true,
      description: 'Veteran status for VA loan eligibility',
      options: [
        { value: 'veteran', label: 'Veteran' },
        { value: 'active-duty', label: 'Active Duty' },
        { value: 'reserves', label: 'Reserves/National Guard' },
        { value: 'spouse', label: 'Veteran Spouse' },
        { value: 'none', label: 'Not Applicable' }
      ]
    },
    {
      id: 'ruralArea',
      name: 'Rural Area',
      type: 'select',
      required: true,
      description: 'Whether the property is in a rural area',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      id: 'targetArea',
      name: 'Target Area',
      type: 'select',
      required: true,
      description: 'Whether the property is in a target area',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      id: 'existingDebt',
      name: 'Existing Monthly Debt',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total monthly debt payments',
      placeholder: '500',
      min: 0,
      max: 10000
    },
    {
      id: 'savingsAmount',
      name: 'Available Savings',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Amount available for down payment',
      placeholder: '10000',
      min: 0,
      max: 1000000
    },
    {
      id: 'loanType',
      name: 'Preferred Loan Type',
      type: 'select',
      required: true,
      description: 'Preferred mortgage loan type',
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'any', label: 'Any Available' }
      ]
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected mortgage interest rate',
      placeholder: '6.5',
      min: 1,
      max: 20
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Mortgage loan term in years',
      placeholder: '30',
      min: 10,
      max: 50
    }
  ],
  outputs: [
    {
      id: 'downPaymentRequired',
      name: 'Down Payment Required',
      type: 'number',
      unit: 'USD',
      description: 'Amount needed for down payment'
    },
    {
      id: 'downPaymentGap',
      name: 'Down Payment Gap',
      type: 'number',
      unit: 'USD',
      description: 'Additional amount needed beyond savings'
    },
    {
      id: 'availablePrograms',
      name: 'Available Programs',
      type: 'string',
      description: 'List of available assistance programs'
    },
    {
      id: 'totalAssistance',
      name: 'Total Assistance Available',
      type: 'number',
      unit: 'USD',
      description: 'Total assistance amount available'
    },
    {
      id: 'grantsAvailable',
      name: 'Grants Available',
      type: 'number',
      unit: 'USD',
      description: 'Total grant amount available'
    },
    {
      id: 'forgivableLoans',
      name: 'Forgivable Loans',
      type: 'number',
      unit: 'USD',
      description: 'Forgivable loan amount available'
    },
    {
      id: 'deferredLoans',
      name: 'Deferred Loans',
      type: 'number',
      unit: 'USD',
      description: 'Deferred loan amount available'
    },
    {
      id: 'monthlyPayment',
      name: 'Monthly Payment',
      type: 'number',
      unit: 'USD',
      description: 'Estimated monthly mortgage payment'
    },
    {
      id: 'debtToIncomeRatio',
      name: 'DebtToIncome Ratio',
      type: 'number',
      unit: '%',
      description: 'Calculated DebtToIncome ratio'
    },
    {
      id: 'loanToValueRatio',
      name: 'LoanToValue Ratio',
      type: 'number',
      unit: '%',
      description: 'Calculated LoanToValue ratio'
    },
    {
      id: 'eligibilityScore',
      name: 'Eligibility Score',
      type: 'number',
      unit: 'score',
      description: 'Overall eligibility score (0-100)'
    },
    {
      id: 'programRecommendations',
      name: 'Program Recommendations',
      type: 'string',
      description: 'Recommended assistance programs'
    },
    {
      id: 'applicationSteps',
      name: 'Application Steps',
      type: 'string',
      description: 'Steps to apply for assistance'
    },
    {
      id: 'timeline',
      name: 'Application Timeline',
      type: 'string',
      description: 'Estimated application timeline'
    },
    {
      id: 'downPaymentAssistanceAnalysis',
      name: 'Down Payment Assistance Analysis',
      type: 'string',
      description: 'Comprehensive analysis report'
    }
  ],
  calculate: (inputs) => {
    return calculateDownPaymentAssistance(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateDownPaymentAssistanceAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Down Payment Required',
      formula: 'Down Payment Required = Home Price × (Down Payment Percentage ÷ 100)',
      description: 'Calculate the required down payment amount based on home price and percentage'
    },
    {
      name: 'Down Payment Gap',
      formula: 'Down Payment Gap = Down Payment Required - Available Savings',
      description: 'Calculate the additional amount needed beyond current savings'
    },
    {
      name: 'Loan Amount',
      formula: 'Loan Amount = Home Price - Down Payment Required',
      description: 'Calculate the mortgage loan amount needed'
    },
    {
      name: 'Monthly Payment',
      formula: 'Monthly Payment = P × [r(1+r)^n] ÷ [(1+r)^n-1]\nWhere: P = Loan Amount, r = Monthly Rate, n = Total Payments',
      description: 'Calculate monthly mortgage payment using amortization formula'
    },
    {
      name: 'DebtToIncome Ratio',
      formula: 'DTI = (Monthly Debt + Monthly Payment) ÷ Monthly Income × 100',
      description: 'Calculate DebtToIncome ratio for loan qualification'
    },
    {
      name: 'LoanToValue Ratio',
      formula: 'LTV = Loan Amount ÷ Home Price × 100',
      description: 'Calculate LoanToValue ratio'
    },
    {
      name: 'Eligibility Score',
      formula: 'Score = (Credit Score Factor + Income Factor + Location Factor + Program Factor) × 25',
      description: 'Calculate overall eligibility score for assistance programs'
    }
  ],
  examples: [
    {
      name: 'First-Time Homebuyer in California',
      inputs: {
        homePrice: 450000,
        downPaymentPercentage: 3.5,
        annualIncome: 85000,
        householdSize: 2,
        creditScore: 720,
        location: 'CA',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'no',
        targetArea: 'yes',
        existingDebt: 600,
        savingsAmount: 15000,
        loanType: 'fha',
        interestRate: 6.5,
        loanTerm: 30
      },
      description: 'First-time homebuyer with good credit seeking FHA loan with down payment assistance'
    },
    {
      name: 'Veteran in Texas',
      inputs: {
        homePrice: 350000,
        downPaymentPercentage: 0,
        annualIncome: 75000,
        householdSize: 3,
        creditScore: 680,
        location: 'TX',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'no',
        veteranStatus: 'veteran',
        ruralArea: 'no',
        targetArea: 'no',
        existingDebt: 400,
        savingsAmount: 8000,
        loanType: 'va',
        interestRate: 6.0,
        loanTerm: 30
      },
      description: 'Veteran seeking VA loan with no down payment requirement'
    },
    {
      name: 'Rural USDA Borrower',
      inputs: {
        homePrice: 250000,
        downPaymentPercentage: 0,
        annualIncome: 65000,
        householdSize: 4,
        creditScore: 650,
        location: 'NC',
        propertyType: 'single-family',
        occupancyType: 'primary',
        firstTimeBuyer: 'yes',
        veteranStatus: 'none',
        ruralArea: 'yes',
        targetArea: 'yes',
        existingDebt: 300,
        savingsAmount: 5000,
        loanType: 'usda',
        interestRate: 6.25,
        loanTerm: 30
      },
      description: 'First-time homebuyer in rural area seeking USDA loan'
    }
  ]
};

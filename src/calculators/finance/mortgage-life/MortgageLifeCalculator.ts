import { Calculator } from '../../types/calculator';
import { calculateMortgageLife } from './formulas';
import { generateMortgageLifeAnalysis } from './formulas';

export const MortgageLifeCalculator: Calculator = {
  id: 'MortgageLifeCalculator',
  name: 'Mortgage Life Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage life insurance needs, coverage amounts, and determine if mortgage life insurance is the right choice for your family protection.',
  inputs: {
    loanAmount: {
      type: 'currency',
      value: 400000,
      unit: 'USD',
      description: 'Mortgage loan amount',
      placeholder: 'Enter mortgage loan amount',
      validation: {
        required: true,
        min: 10000,
        max: 10000000
      }
    },
    currentLoanBalance: {
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
    borrowerAge: {
      type: 'number',
      value: 35,
      unit: 'years',
      description: 'Primary borrower age',
      placeholder: 'Enter primary borrower age',
      validation: {
        required: true,
        min: 18,
        max: 85
      }
    },
    coBorrowerAge: {
      type: 'number',
      value: 33,
      unit: 'years',
      description: 'Co-borrower age (if applicable)',
      placeholder: 'Enter co-borrower age',
      validation: {
        required: true,
        min: 18,
        max: 85
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
      description: 'Monthly mortgage payment',
      placeholder: 'Enter monthly payment',
      validation: {
        required: true,
        min: 0,
        max: 50000
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
    otherDebts: {
      type: 'currency',
      value: 25000,
      unit: 'USD',
      description: 'Other outstanding debts',
      placeholder: 'Enter other outstanding debts',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    savings: {
      type: 'currency',
      value: 50000,
      unit: 'USD',
      description: 'Current savings and investments',
      placeholder: 'Enter current savings',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    dependents: {
      type: 'number',
      value: 2,
      unit: '',
      description: 'Number of dependents',
      placeholder: 'Enter number of dependents',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    healthStatus: {
      type: 'select',
      value: 'excellent',
      unit: '',
      description: 'Health status',
      placeholder: 'Select health status',
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'very-good', label: 'Very Good' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ],
      validation: {
        required: true
      }
    },
    smokingStatus: {
      type: 'select',
      value: 'non-smoker',
      unit: '',
      description: 'Smoking status',
      placeholder: 'Select smoking status',
      options: [
        { value: 'non-smoker', label: 'Non-Smoker' },
        { value: 'former-smoker', label: 'Former Smoker' },
        { value: 'smoker', label: 'Smoker' }
      ],
      validation: {
        required: true
      }
    },
    occupation: {
      type: 'select',
      value: 'professional',
      unit: '',
      description: 'Occupation risk level',
      placeholder: 'Select occupation risk level',
      options: [
        { value: 'low-risk', label: 'Low Risk (Office/Professional)' },
        { value: 'medium-risk', label: 'Medium Risk (Sales/Service)' },
        { value: 'high-risk', label: 'High Risk (Construction/Military)' }
      ],
      validation: {
        required: true
      }
    },
    hobbies: {
      type: 'select',
      value: 'low-risk',
      unit: '',
      description: 'Hobby risk level',
      placeholder: 'Select hobby risk level',
      options: [
        { value: 'low-risk', label: 'Low Risk (Reading/Gardening)' },
        { value: 'medium-risk', label: 'Medium Risk (Skiing/Rock Climbing)' },
        { value: 'high-risk', label: 'High Risk (Skydiving/Racing)' }
      ],
      validation: {
        required: true
      }
    },
    existingLifeInsurance: {
      type: 'currency',
      value: 100000,
      unit: 'USD',
      description: 'Existing life insurance coverage',
      placeholder: 'Enter existing life insurance amount',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    mortgageLifePremium: {
      type: 'currency',
      value: 45,
      unit: 'USD/month',
      description: 'Monthly mortgage life insurance premium',
      placeholder: 'Enter monthly premium',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    termLifePremium: {
      type: 'currency',
      value: 35,
      unit: 'USD/month',
      description: 'Monthly term life insurance premium',
      placeholder: 'Enter monthly term life premium',
      validation: {
        required: true,
        min: 0,
        max: 1000
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
    investmentReturn: {
      type: 'percentage',
      value: 7.0,
      unit: '%/year',
      description: 'Expected investment return rate',
      placeholder: 'Enter expected investment return',
      validation: {
        required: true,
        min: 0,
        max: 20
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
    },
    coverageType: {
      type: 'select',
      value: 'decreasing',
      unit: '',
      description: 'Mortgage life coverage type',
      placeholder: 'Select coverage type',
      options: [
        { value: 'decreasing', label: 'Decreasing Term (Declining Balance)' },
        { value: 'level', label: 'Level Term (Fixed Amount)' },
        { value: 'joint', label: 'Joint Life (First to Die)' },
        { value: 'survivorship', label: 'Survivorship (Second to Die)' }
      ],
      validation: {
        required: true
      }
    },
    beneficiaryType: {
      type: 'select',
      value: 'family',
      unit: '',
      description: 'Beneficiary type',
      placeholder: 'Select beneficiary type',
      options: [
        { value: 'family', label: 'Family Members' },
        { value: 'trust', label: 'Trust' },
        { value: 'estate', label: 'Estate' },
        { value: 'charity', label: 'Charity' }
      ],
      validation: {
        required: true
      }
    }
  },
  outputs: [
    {
      name: 'mortgageLifeCoverage',
      label: 'Mortgage Life Coverage',
      type: 'currency',
      unit: 'USD',
      description: 'Recommended mortgage life insurance coverage'
    },
    {
      name: 'totalLifeInsuranceNeeded',
      label: 'Total Life Insurance Needed',
      type: 'currency',
      unit: 'USD',
      description: 'Total life insurance coverage needed'
    },
    {
      name: 'additionalCoverageNeeded',
      label: 'Additional Coverage Needed',
      type: 'currency',
      unit: 'USD',
      description: 'Additional life insurance coverage needed'
    },
    {
      name: 'mortgageLifeCost',
      label: 'Mortgage Life Cost',
      type: 'currency',
      unit: 'USD/year',
      description: 'Annual cost of mortgage life insurance'
    },
    {
      name: 'termLifeCost',
      label: 'Term Life Cost',
      type: 'currency',
      unit: 'USD/year',
      description: 'Annual cost of equivalent term life insurance'
    },
    {
      name: 'costDifference',
      label: 'Cost Difference',
      type: 'currency',
      unit: 'USD/year',
      description: 'Annual cost difference between options'
    },
    {
      name: 'totalCostOverTerm',
      label: 'Total Cost Over Term',
      type: 'currency',
      unit: 'USD',
      description: 'Total cost over the remaining loan term'
    },
    {
      name: 'coverageComparison',
      label: 'Coverage Comparison',
      type: 'string',
      unit: '',
      description: 'Comparison of mortgage life vs term life insurance'
    },
    {
      name: 'benefitAnalysis',
      label: 'Benefit Analysis',
      type: 'string',
      unit: '',
      description: 'Analysis of benefits and drawbacks'
    },
    {
      name: 'recommendations',
      label: 'Recommendations',
      type: 'string',
      unit: '',
      description: 'Recommendations for life insurance coverage'
    },
    {
      name: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'string',
      unit: '',
      description: 'Risk assessment and coverage adequacy'
    },
    {
      name: 'costBenefitAnalysis',
      label: 'Cost-Benefit Analysis',
      type: 'string',
      unit: '',
      description: 'Cost-benefit analysis of insurance options'
    },
    {
      name: 'alternativeStrategies',
      label: 'Alternative Strategies',
      type: 'string',
      unit: '',
      description: 'Alternative life insurance strategies'
    },
    {
      name: 'taxImplications',
      label: 'Tax Implications',
      type: 'string',
      unit: '',
      description: 'Tax implications of different insurance types'
    },
    {
      name: 'coverageTimeline',
      label: 'Coverage Timeline',
      type: 'string',
      unit: '',
      description: 'Timeline of coverage needs and changes'
    },
    {
      name: 'familyProtection',
      label: 'Family Protection Analysis',
      type: 'string',
      unit: '',
      description: 'Analysis of family protection needs'
    },
    {
      name: 'policyFeatures',
      label: 'Policy Features',
      type: 'string',
      unit: '',
      description: 'Key policy features and riders to consider'
    },
    {
      name: 'underwritingConsiderations',
      label: 'Underwriting Considerations',
      type: 'string',
      unit: '',
      description: 'Underwriting considerations and requirements'
    },
    {
      name: 'conversionOptions',
      label: 'Conversion Options',
      type: 'string',
      unit: '',
      description: 'Conversion and renewal options'
    },
    {
      name: 'claimProcess',
      label: 'Claim Process',
      type: 'string',
      unit: '',
      description: 'Claim process and requirements'
    },
    {
      name: 'financialImpact',
      label: 'Financial Impact',
      type: 'string',
      unit: '',
      description: 'Financial impact analysis of different scenarios'
    },
    {
      name: 'estatePlanning',
      label: 'Estate Planning',
      type: 'string',
      unit: '',
      description: 'Estate planning considerations'
    },
    {
      name: 'nextSteps',
      label: 'Next Steps',
      type: 'string',
      unit: '',
      description: 'Recommended next steps for insurance planning'
    }
  ],
  calculate: calculateMortgageLife,
  generateReport: generateMortgageLifeAnalysis
};

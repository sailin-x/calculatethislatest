import { Calculator } from '../../../types/calculator';
import { lifeInsuranceCalculatorFormula } from './formulas';
import { LifeInsuranceCalculatorInputs, LifeInsuranceCalculatorResults } from './types';

/**
 * Life Insurance Calculator
 * 
 * Features:
 * - Multiple insurance types (term, whole, universal, variable)
 * - Comprehensive needs analysis
 * - Rider cost calculations
 * - Tax and inflation considerations
 * - Monte Carlo risk analysis
 * - Professional-grade calculations
 */
export const lifeInsuranceCalculator: Calculator = {
  id: 'life-insurance-calculator',
  title: 'Life Insurance Calculator',
  description: 'Comprehensive life insurance calculations including term, whole, universal, and variable life insurance with needs analysis',
  category: 'finance',
  subcategory: 'insurance',
  tags: ['life-insurance', 'insurance', 'financial-planning', 'protection', 'premiums', 'coverage'],
  
  // Input fields
  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      min: 18,
      max: 85,
      step: 1,
      placeholder: '35',
      description: 'Current age in years'
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ],
      defaultValue: 'male',
      description: 'Gender for premium calculations'
    },
    {
      id: 'healthStatus',
      label: 'Health Status',
      type: 'select',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'very-good', label: 'Very Good' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ],
      defaultValue: 'good',
      description: 'Overall health status'
    },
    {
      id: 'smokingStatus',
      label: 'Smoking Status',
      type: 'select',
      required: true,
      options: [
        { value: 'non-smoker', label: 'Non-Smoker' },
        { value: 'former-smoker', label: 'Former Smoker' },
        { value: 'smoker', label: 'Smoker' }
      ],
      defaultValue: 'non-smoker',
      description: 'Current smoking status'
    },
    {
      id: 'height',
      label: 'Height (inches)',
      type: 'number',
      required: true,
      min: 48,
      max: 84,
      step: 1,
      placeholder: '70',
      description: 'Height in inches'
    },
    {
      id: 'weight',
      label: 'Weight (pounds)',
      type: 'number',
      required: true,
      min: 80,
      max: 400,
      step: 1,
      placeholder: '160',
      description: 'Weight in pounds'
    },
    {
      id: 'insuranceType',
      label: 'Insurance Type',
      type: 'select',
      required: true,
      options: [
        { value: 'term', label: 'Term Life Insurance' },
        { value: 'whole', label: 'Whole Life Insurance' },
        { value: 'universal', label: 'Universal Life Insurance' },
        { value: 'variable', label: 'Variable Life Insurance' },
        { value: 'indexed', label: 'Indexed Universal Life' }
      ],
      defaultValue: 'term',
      description: 'Type of life insurance policy'
    },
    {
      id: 'coverageAmount',
      label: 'Coverage Amount',
      type: 'number',
      required: true,
      min: 10000,
      max: 10000000,
      step: 10000,
      placeholder: '500000',
      description: 'Death benefit amount'
    },
    {
      id: 'policyTerm',
      label: 'Policy Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '20',
      description: 'Length of policy term (for term insurance)',
      dependsOn: 'insuranceType'
    },
    {
      id: 'premiumPaymentFrequency',
      label: 'Premium Payment Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'semi-annually', label: 'Semi-Annually' },
        { value: 'annually', label: 'Annually' }
      ],
      defaultValue: 'monthly',
      description: 'How often premiums are paid'
    },
    {
      id: 'annualIncome',
      label: 'Annual Income',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '75000',
      description: 'Annual household income'
    },
    {
      id: 'currentSavings',
      label: 'Current Savings',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '50000',
      description: 'Current savings and investments'
    },
    {
      id: 'outstandingDebts',
      label: 'Outstanding Debts',
      type: 'number',
      required: true,
      min: 0,
      max: 5000000,
      step: 1000,
      placeholder: '100000',
      description: 'Total outstanding debts'
    },
    {
      id: 'funeralExpenses',
      label: 'Funeral Expenses',
      type: 'number',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '10000',
      description: 'Estimated funeral and burial expenses'
    },
    {
      id: 'childrenEducationCosts',
      label: 'Children Education Costs',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '100000',
      description: 'Estimated education costs for children'
    },
    {
      id: 'mortgageBalance',
      label: 'Mortgage Balance',
      type: 'number',
      required: true,
      min: 0,
      max: 5000000,
      step: 1000,
      placeholder: '250000',
      description: 'Current mortgage balance'
    },
    {
      id: 'includeRiders',
      label: 'Include Riders',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Include additional policy riders'
    },
    {
      id: 'accidentalDeathBenefit',
      label: 'Accidental Death Benefit',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Include accidental death benefit rider',
      dependsOn: 'includeRiders'
    },
    {
      id: 'disabilityWaiver',
      label: 'Disability Waiver',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Include disability waiver of premium rider',
      dependsOn: 'includeRiders'
    },
    {
      id: 'criticalIllnessRider',
      label: 'Critical Illness Rider',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Include critical illness rider',
      dependsOn: 'includeRiders'
    },
    {
      id: 'longTermCareRider',
      label: 'Long Term Care Rider',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Include long term care rider',
      dependsOn: 'includeRiders'
    },
    {
      id: 'includeInflation',
      label: 'Include Inflation Analysis',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      description: 'Calculate inflation-adjusted values'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'number',
      required: true,
      min: -20,
      max: 50,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected annual inflation rate'
    },
    {
      id: 'includeTaxes',
      label: 'Include Tax Analysis',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      description: 'Calculate tax implications'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '25',
      description: 'Effective tax rate'
    },
    {
      id: 'expectedReturn',
      label: 'Expected Return (%)',
      type: 'number',
      required: false,
      min: -50,
      max: 50,
      step: 0.1,
      placeholder: '7.0',
      description: 'Expected investment return (for variable policies)',
      dependsOn: 'insuranceType'
    },
    {
      id: 'volatility',
      label: 'Volatility (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '15.0',
      description: 'Investment volatility (for variable policies)',
      dependsOn: 'insuranceType'
    },
    {
      id: 'cashValueGrowth',
      label: 'Cash Value Growth (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '4.0',
      description: 'Expected cash value growth rate',
      dependsOn: 'insuranceType'
    },
    {
      id: 'familyHistory',
      label: 'Family History',
      type: 'select',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ],
      defaultValue: 'good',
      description: 'Family medical history'
    },
    {
      id: 'occupation',
      label: 'Occupation Risk',
      type: 'select',
      required: true,
      options: [
        { value: 'low-risk', label: 'Low Risk' },
        { value: 'medium-risk', label: 'Medium Risk' },
        { value: 'high-risk', label: 'High Risk' }
      ],
      defaultValue: 'low-risk',
      description: 'Occupational risk level'
    },
    {
      id: 'hobbies',
      label: 'Hobby Risk',
      type: 'select',
      required: true,
      options: [
        { value: 'low-risk', label: 'Low Risk' },
        { value: 'medium-risk', label: 'Medium Risk' },
        { value: 'high-risk', label: 'High Risk' }
      ],
      defaultValue: 'low-risk',
      description: 'Hobby risk level'
    },
    {
      id: 'travelFrequency',
      label: 'Travel Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      defaultValue: 'low',
      description: 'International travel frequency'
    },
    {
      id: 'monteCarloSamples',
      label: 'Monte Carlo Samples',
      type: 'number',
      required: false,
      min: 1000,
      max: 100000,
      step: 1000,
      placeholder: '10000',
      description: 'Number of Monte Carlo simulation samples'
    },
    {
      id: 'confidenceLevel',
      label: 'Confidence Level (%)',
      type: 'number',
      required: false,
      min: 50,
      max: 99,
      step: 1,
      placeholder: '90',
      description: 'Confidence level for risk analysis'
    }
  ],

  // Output fields
  outputs: [
    {
      id: 'basicCalculation',
      label: 'Basic Calculation',
      type: 'object',
      fields: [
        { id: 'monthlyPremium', label: 'Monthly Premium', type: 'currency' },
        { id: 'annualPremium', label: 'Annual Premium', type: 'currency' },
        { id: 'totalPremiums', label: 'Total Premiums', type: 'currency' },
        { id: 'deathBenefit', label: 'Death Benefit', type: 'currency' },
        { id: 'netDeathBenefit', label: 'Net Death Benefit', type: 'currency' },
        { id: 'costPerThousand', label: 'Cost per $1,000', type: 'currency' }
      ]
    },
    {
      id: 'policyAnalysis',
      label: 'Policy Analysis',
      type: 'object',
      fields: [
        { id: 'policyType', label: 'Policy Type', type: 'text' },
        { id: 'coveragePeriod', label: 'Coverage Period', type: 'number' },
        { id: 'premiumGuarantee', label: 'Premium Guarantee', type: 'boolean' },
        { id: 'cashValueProjection', label: 'Cash Value Projection', type: 'currency' },
        { id: 'surrenderValue', label: 'Surrender Value', type: 'currency' },
        { id: 'loanValue', label: 'Loan Value', type: 'currency' }
      ]
    },
    {
      id: 'costAnalysis',
      label: 'Cost Analysis',
      type: 'object',
      fields: [
        { id: 'totalCost', label: 'Total Cost', type: 'currency' },
        { id: 'averageAnnualCost', label: 'Average Annual Cost', type: 'currency' },
        { id: 'costPerYear', label: 'Cost per Year', type: 'currency' },
        { id: 'costPerMonth', label: 'Cost per Month', type: 'currency' },
        { id: 'costPerDay', label: 'Cost per Day', type: 'currency' },
        { id: 'breakevenPeriod', label: 'Breakeven Period', type: 'number' }
      ]
    },
    {
      id: 'cashValueAnalysis',
      label: 'Cash Value Analysis',
      type: 'object',
      fields: [
        { id: 'year1Value', label: 'Year 1 Value', type: 'currency' },
        { id: 'year5Value', label: 'Year 5 Value', type: 'currency' },
        { id: 'year10Value', label: 'Year 10 Value', type: 'currency' },
        { id: 'year20Value', label: 'Year 20 Value', type: 'currency' },
        { id: 'year30Value', label: 'Year 30 Value', type: 'currency' },
        { id: 'projectedCashValue', label: 'Projected Cash Value', type: 'currency' },
        { id: 'surrenderCharges', label: 'Surrender Charges', type: 'percentage' },
        { id: 'netCashValue', label: 'Net Cash Value', type: 'currency' }
      ]
    },
    {
      id: 'deathBenefitAnalysis',
      label: 'Death Benefit Analysis',
      type: 'object',
      fields: [
        { id: 'immediateDeathBenefit', label: 'Immediate Death Benefit', type: 'currency' },
        { id: 'deathBenefitAt65', label: 'Death Benefit at 65', type: 'currency' },
        { id: 'deathBenefitAt75', label: 'Death Benefit at 75', type: 'currency' },
        { id: 'deathBenefitAt85', label: 'Death Benefit at 85', type: 'currency' },
        { id: 'inflationAdjustedBenefit', label: 'Inflation-Adjusted Benefit', type: 'currency' },
        { id: 'realValue', label: 'Real Value', type: 'currency' }
      ]
    },
    {
      id: 'needsAnalysis',
      label: 'Needs Analysis',
      type: 'object',
      fields: [
        { id: 'incomeReplacement', label: 'Income Replacement', type: 'currency' },
        { id: 'debtPayoff', label: 'Debt Payoff', type: 'currency' },
        { id: 'educationFunding', label: 'Education Funding', type: 'currency' },
        { id: 'funeralExpenses', label: 'Funeral Expenses', type: 'currency' },
        { id: 'emergencyFund', label: 'Emergency Fund', type: 'currency' },
        { id: 'totalNeeds', label: 'Total Needs', type: 'currency' },
        { id: 'coverageGap', label: 'Coverage Gap', type: 'currency' },
        { id: 'excessCoverage', label: 'Excess Coverage', type: 'currency' }
      ]
    },
    {
      id: 'taxAnalysis',
      label: 'Tax Analysis',
      type: 'object',
      fields: [
        { id: 'premiumTaxDeductibility', label: 'Premium Tax Deductibility', type: 'currency' },
        { id: 'deathBenefitTaxFree', label: 'Death Benefit Tax Free', type: 'boolean' },
        { id: 'cashValueTaxDeferred', label: 'Cash Value Tax Deferred', type: 'boolean' },
        { id: 'surrenderTaxLiability', label: 'Surrender Tax Liability', type: 'currency' },
        { id: 'loanTaxImplications', label: 'Loan Tax Implications', type: 'currency' }
      ]
    },
    {
      id: 'inflationAnalysis',
      label: 'Inflation Analysis',
      type: 'object',
      fields: [
        { id: 'inflationAdjustedPremium', label: 'Inflation-Adjusted Premium', type: 'currency' },
        { id: 'inflationAdjustedDeathBenefit', label: 'Inflation-Adjusted Death Benefit', type: 'currency' },
        { id: 'purchasingPowerLoss', label: 'Purchasing Power Loss', type: 'percentage' },
        { id: 'realCost', label: 'Real Cost', type: 'currency' }
      ]
    },
    {
      id: 'riskAnalysis',
      label: 'Risk Analysis',
      type: 'object',
      fields: [
        { id: 'probabilityOfDeath', label: 'Probability of Death', type: 'percentage' },
        { id: 'expectedValue', label: 'Expected Value', type: 'currency' },
        { id: 'riskPremium', label: 'Risk Premium', type: 'currency' },
        { id: 'insuranceEfficiency', label: 'Insurance Efficiency', type: 'number' },
        { id: 'coverageAdequacy', label: 'Coverage Adequacy', type: 'percentage' }
      ]
    },
    {
      id: 'comparison',
      label: 'Comparison Analysis',
      type: 'object',
      fields: [
        { id: 'vsTermInsurance', label: 'vs Term Insurance', type: 'currency' },
        { id: 'vsWholeInsurance', label: 'vs Whole Insurance', type: 'currency' },
        { id: 'vsUniversalInsurance', label: 'vs Universal Insurance', type: 'currency' },
        { id: 'vsSelfInsurance', label: 'vs Self Insurance', type: 'currency' },
        { id: 'vsInvestment', label: 'vs Investment', type: 'currency' }
      ]
    },
    {
      id: 'riderAnalysis',
      label: 'Rider Analysis',
      type: 'object',
      fields: [
        { id: 'accidentalDeathCost', label: 'Accidental Death Cost', type: 'currency' },
        { id: 'disabilityWaiverCost', label: 'Disability Waiver Cost', type: 'currency' },
        { id: 'criticalIllnessCost', label: 'Critical Illness Cost', type: 'currency' },
        { id: 'longTermCareCost', label: 'Long Term Care Cost', type: 'currency' },
        { id: 'totalRiderCost', label: 'Total Rider Cost', type: 'currency' },
        { id: 'riderValue', label: 'Rider Value', type: 'currency' }
      ]
    },
    {
      id: 'summary',
      label: 'Summary',
      type: 'object',
      fields: [
        { id: 'recommendedCoverage', label: 'Recommended Coverage', type: 'currency' },
        { id: 'recommendedPolicyType', label: 'Recommended Policy Type', type: 'text' },
        { id: 'monthlyCost', label: 'Monthly Cost', type: 'currency' },
        { id: 'annualCost', label: 'Annual Cost', type: 'currency' },
        { id: 'totalLifetimeCost', label: 'Total Lifetime Cost', type: 'currency' },
        { id: 'keyRecommendations', label: 'Key Recommendations', type: 'array' }
      ]
    }
  ],

  // Calculator functions
  calculate: lifeInsuranceCalculatorFormula.calculate,

  // Examples
  examples: [
    {
      title: 'Term Life Insurance',
      description: 'Basic term life insurance calculation',
      inputs: {
        age: 35,
        gender: 'male',
        healthStatus: 'good',
        smokingStatus: 'non-smoker',
        height: 70,
        weight: 160,
        insuranceType: 'term',
        coverageAmount: 500000,
        policyTerm: 20,
        premiumPaymentFrequency: 'monthly',
        annualIncome: 75000,
        currentSavings: 50000,
        outstandingDebts: 100000,
        funeralExpenses: 10000,
        childrenEducationCosts: 100000,
        mortgageBalance: 250000,
        inflationRate: 2.5,
        taxRate: 25
      }
    },
    {
      title: 'Whole Life Insurance',
      description: 'Whole life insurance with cash value',
      inputs: {
        age: 40,
        gender: 'female',
        healthStatus: 'excellent',
        smokingStatus: 'non-smoker',
        height: 65,
        weight: 140,
        insuranceType: 'whole',
        coverageAmount: 750000,
        policyTerm: 30,
        premiumPaymentFrequency: 'monthly',
        annualIncome: 100000,
        currentSavings: 100000,
        outstandingDebts: 150000,
        funeralExpenses: 15000,
        childrenEducationCosts: 150000,
        mortgageBalance: 300000,
        includeRiders: true,
        accidentalDeathBenefit: true,
        disabilityWaiver: true,
        inflationRate: 2.5,
        taxRate: 28,
        cashValueGrowth: 4.0
      }
    },
    {
      title: 'Universal Life with Riders',
      description: 'Universal life insurance with comprehensive riders',
      inputs: {
        age: 45,
        gender: 'male',
        healthStatus: 'very-good',
        smokingStatus: 'former-smoker',
        height: 72,
        weight: 180,
        insuranceType: 'universal',
        coverageAmount: 1000000,
        policyTerm: 25,
        premiumPaymentFrequency: 'monthly',
        annualIncome: 120000,
        currentSavings: 200000,
        outstandingDebts: 200000,
        funeralExpenses: 20000,
        childrenEducationCosts: 200000,
        mortgageBalance: 400000,
        includeRiders: true,
        accidentalDeathBenefit: true,
        disabilityWaiver: true,
        criticalIllnessRider: true,
        longTermCareRider: true,
        inflationRate: 2.5,
        taxRate: 30,
        expectedReturn: 7.0,
        volatility: 15.0,
        cashValueGrowth: 5.0
      }
    }
  ],

  // Usage instructions
  usageInstructions: [
    'Enter your personal information (age, gender, health status)',
    'Select the type of life insurance you want to calculate',
    'Set the coverage amount and policy term',
    'Provide your financial information for needs analysis',
    'Choose premium payment frequency',
    'Include riders if needed for additional coverage',
    'Enable inflation and tax analysis for comprehensive results',
    'Review detailed calculations and recommendations'
  ],

  // Tips and insights
  tips: [
    'Term life insurance is typically the most affordable option',
    'Whole life insurance provides permanent coverage with cash value',
    'Universal life offers flexible premiums and death benefits',
    'Consider your family\'s needs when determining coverage amount',
    'Riders can provide additional protection but increase costs',
    'Health status significantly impacts premium rates',
    'Smoking status can double or triple your premiums',
    'Compare multiple insurance types before making a decision'
  ],

  // Related calculators
  relatedCalculators: [
    'annuity-calculator',
    'retirement-calculator',
    'social-security-calculator',
    'mortgage-calculator',
    'estate-planning-calculator'
  ]
};

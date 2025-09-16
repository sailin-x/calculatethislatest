import { Calculator, Formula } from '../../../types/calculator';
import { calculateEstatePlanning, validateEstatePlanningInputs } from './formulas';
import { getEstatePlanningValidationRules } from './validation';

/**
 * Estate planning formula implementation
 */
const estatePlanningFormula: Formula = {
  id: 'estate-planning',
  name: 'Estate Planning Analysis',
  description: 'Comprehensive estate planning analysis including tax calculations, beneficiary planning, and risk assessment',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateEstatePlanning(inputs as any);
    return {
      outputs: result,
      explanation: 'Estate planning analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading Estate Planning Calculator
 */
export const estatePlanningCalculator: Calculator = {
  id: 'estate-planning-calculator',
  title: 'Estate Planning Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Comprehensive estate planning analysis including tax calculations, beneficiary planning, risk assessment, and personalized recommendations for wealth transfer and legacy planning.',

  usageInstructions: [
    'Enter your personal and financial information',
    'Specify your estate planning goals and time horizon',
    'Review tax implications and beneficiary planning',
    'Consider the recommended actions and risk mitigation strategies'
  ],

  inputs: [
    {
      id: 'age',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Your current age',
      defaultValue: 65,
      min: 18,
      max: 120
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' }
      ],
      tooltip: 'Your current marital status',
      defaultValue: 'married'
    },
    {
      id: 'numberOfChildren',
      label: 'Number of Children',
      type: 'number',
      required: false,
      placeholder: '2',
      tooltip: 'Number of children you have',
      defaultValue: 2,
      min: 0,
      max: 20
    },
    {
      id: 'numberOfGrandchildren',
      label: 'Number of Grandchildren',
      type: 'number',
      required: false,
      placeholder: '4',
      tooltip: 'Number of grandchildren you have',
      defaultValue: 4,
      min: 0,
      max: 50
    },
    {
      id: 'totalAssets',
      label: 'Total Assets',
      type: 'currency',
      required: true,
      placeholder: '2000000',
      tooltip: 'Total value of all your assets',
      defaultValue: 2000000
    },
    {
      id: 'liquidAssets',
      label: 'Liquid Assets',
      type: 'currency',
      required: false,
      placeholder: '500000',
      tooltip: 'Cash and easily convertible assets',
      defaultValue: 500000
    },
    {
      id: 'realEstateValue',
      label: 'Real Estate Value',
      type: 'currency',
      required: false,
      placeholder: '1000000',
      tooltip: 'Value of real estate holdings',
      defaultValue: 1000000
    },
    {
      id: 'retirementAccounts',
      label: 'Retirement Accounts',
      type: 'currency',
      required: false,
      placeholder: '800000',
      tooltip: 'Value of retirement accounts (401k, IRA, etc.)',
      defaultValue: 800000
    },
    {
      id: 'businessInterests',
      label: 'Business Interests',
      type: 'currency',
      required: false,
      placeholder: '300000',
      tooltip: 'Value of business ownership interests',
      defaultValue: 300000
    },
    {
      id: 'annualIncome',
      label: 'Annual Income',
      type: 'currency',
      required: true,
      placeholder: '150000',
      tooltip: 'Your total annual income',
      defaultValue: 150000
    },
    {
      id: 'annualExpenses',
      label: 'Annual Expenses',
      type: 'currency',
      required: true,
      placeholder: '120000',
      tooltip: 'Your total annual expenses',
      defaultValue: 120000
    },
    {
      id: 'annualTaxes',
      label: 'Annual Taxes',
      type: 'currency',
      required: false,
      placeholder: '35000',
      tooltip: 'Your total annual tax payments',
      defaultValue: 35000
    },
    {
      id: 'desiredLegacy',
      label: 'Desired Legacy Amount',
      type: 'currency',
      required: false,
      placeholder: '1000000',
      tooltip: 'Amount you want to leave as legacy',
      defaultValue: 1000000
    },
    {
      id: 'educationFunding',
      label: 'Education Funding Goal',
      type: 'currency',
      required: false,
      placeholder: '200000',
      tooltip: 'Amount needed for education funding',
      defaultValue: 200000
    },
    {
      id: 'charitableGiving',
      label: 'Charitable Giving Goal',
      type: 'currency',
      required: false,
      placeholder: '100000',
      tooltip: 'Amount planned for charitable giving',
      defaultValue: 100000
    },
    {
      id: 'federalTaxBracket',
      label: 'Federal Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '24',
      tooltip: 'Your federal income tax bracket',
      defaultValue: 24,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'stateTaxBracket',
      label: 'State Tax Bracket (%)',
      type: 'percentage',
      required: false,
      placeholder: '6',
      tooltip: 'Your state income tax bracket',
      defaultValue: 6,
      min: 0,
      max: 20,
      step: 0.5
    },
    {
      id: 'estateTaxExemption',
      label: 'Estate Tax Exemption',
      type: 'currency',
      required: true,
      placeholder: '12900000',
      tooltip: 'Federal estate tax exemption amount',
      defaultValue: 12900000
    },
    {
      id: 'planningHorizon',
      label: 'Planning Horizon (Years)',
      type: 'number',
      required: true,
      placeholder: '20',
      tooltip: 'Number of years to plan for',
      defaultValue: 20,
      min: 1,
      max: 50
    },
    {
      id: 'expectedInflation',
      label: 'Expected Inflation (%)',
      type: 'percentage',
      required: false,
      placeholder: '3.0',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 3.0,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      id: 'expectedReturn',
      label: 'Expected Investment Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '7.0',
      tooltip: 'Expected annual investment return',
      defaultValue: 7.0,
      min: -10,
      max: 30,
      step: 0.1
    },
    {
      id: 'healthStatus',
      label: 'Health Status',
      type: 'select',
      required: false,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ],
      tooltip: 'Your current health status',
      defaultValue: 'good'
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy (Years)',
      type: 'number',
      required: false,
      placeholder: '85',
      tooltip: 'Your estimated life expectancy',
      defaultValue: 85,
      min: 1,
      max: 150
    },
    {
      id: 'longTermCare',
      label: 'Long-Term Care Planning',
      type: 'boolean',
      required: false,
      tooltip: 'Whether to include long-term care planning',
      defaultValue: true
    },
    {
      id: 'hasWill',
      label: 'Have a Will',
      type: 'boolean',
      required: false,
      tooltip: 'Whether you have a current will',
      defaultValue: true
    },
    {
      id: 'hasTrust',
      label: 'Have a Trust',
      type: 'boolean',
      required: false,
      tooltip: 'Whether you have a revocable living trust',
      defaultValue: false
    },
    {
      id: 'hasPowerOfAttorney',
      label: 'Have Power of Attorney',
      type: 'boolean',
      required: false,
      tooltip: 'Whether you have durable power of attorney',
      defaultValue: false
    },
    {
      id: 'hasHealthcareDirective',
      label: 'Have Healthcare Directive',
      type: 'boolean',
      required: false,
      tooltip: 'Whether you have advance healthcare directive',
      defaultValue: false
    }
  ],

  outputs: [
    {
      id: 'currentEstateValue',
      label: 'Current Estate Value',
      type: 'currency',
      explanation: 'Total value of your current estate'
    },
    {
      id: 'projectedEstateValue',
      label: 'Projected Estate Value',
      type: 'currency',
      explanation: 'Projected estate value at end of planning horizon'
    },
    {
      id: 'inflationAdjustedValue',
      label: 'Inflation-Adjusted Value',
      type: 'currency',
      explanation: 'Estate value adjusted for inflation'
    },
    {
      id: 'federalEstateTax',
      label: 'Federal Estate Tax',
      type: 'currency',
      explanation: 'Federal estate tax liability'
    },
    {
      id: 'stateEstateTax',
      label: 'State Estate Tax',
      type: 'currency',
      explanation: 'State estate tax liability'
    },
    {
      id: 'totalEstateTax',
      label: 'Total Estate Tax',
      type: 'currency',
      explanation: 'Combined federal and state estate tax'
    },
    {
      id: 'afterTaxEstate',
      label: 'After-Tax Estate',
      type: 'currency',
      explanation: 'Estate value after taxes'
    },
    {
      id: 'perChildInheritance',
      label: 'Per Child Inheritance',
      type: 'currency',
      explanation: 'Inheritance amount per child'
    },
    {
      id: 'perGrandchildInheritance',
      label: 'Per Grandchild Inheritance',
      type: 'currency',
      explanation: 'Inheritance amount per grandchild'
    },
    {
      id: 'educationFundShortfall',
      label: 'Education Fund Shortfall',
      type: 'currency',
      explanation: 'Shortfall in education funding goal'
    },
    {
      id: 'willGap',
      label: 'Will Planning Gap',
      type: 'text',
      explanation: 'Whether will planning is needed'
    },
    {
      id: 'trustGap',
      label: 'Trust Planning Gap',
      type: 'text',
      explanation: 'Whether trust planning is needed'
    },
    {
      id: 'powerOfAttorneyGap',
      label: 'Power of Attorney Gap',
      type: 'text',
      explanation: 'Whether power of attorney is needed'
    },
    {
      id: 'healthcareDirectiveGap',
      label: 'Healthcare Directive Gap',
      type: 'text',
      explanation: 'Whether healthcare directive is needed'
    },
    {
      id: 'recommendedActions',
      label: 'Recommended Actions',
      type: 'text',
      explanation: 'List of recommended estate planning actions'
    },
    {
      id: 'priorityLevel',
      label: 'Planning Priority',
      type: 'text',
      explanation: 'Urgency level for estate planning'
    },
    {
      id: 'estimatedPlanningCost',
      label: 'Estimated Planning Cost',
      type: 'currency',
      explanation: 'Estimated cost of implementing recommendations'
    },
    {
      id: 'estateRiskScore',
      label: 'Estate Risk Score',
      type: 'number',
      explanation: 'Risk score for current estate plan (0-100, higher is riskier)'
    },
    {
      id: 'riskFactors',
      label: 'Risk Factors',
      type: 'text',
      explanation: 'Identified risk factors in current plan'
    },
    {
      id: 'mitigationStrategies',
      label: 'Mitigation Strategies',
      type: 'text',
      explanation: 'Strategies to mitigate identified risks'
    },
    {
      id: 'legacyAchievement',
      label: 'Legacy Achievement (%)',
      type: 'percentage',
      explanation: 'Percentage of desired legacy achievable'
    },
    {
      id: 'charitableImpact',
      label: 'Charitable Impact (%)',
      type: 'percentage',
      explanation: 'Percentage of estate allocated to charity'
    },
    {
      id: 'familySecurityScore',
      label: 'Family Security Score',
      type: 'number',
      explanation: 'Score indicating family financial security (0-100)'
    },
    {
      id: 'annualRequiredIncome',
      label: 'Annual Required Income',
      type: 'currency',
      explanation: 'Annual income needed for lifestyle'
    },
    {
      id: 'retirementShortfall',
      label: 'Retirement Shortfall',
      type: 'currency',
      explanation: 'Projected retirement income shortfall'
    },
    {
      id: 'longTermCareCost',
      label: 'Long-Term Care Cost',
      type: 'currency',
      explanation: 'Estimated long-term care costs'
    }
  ],

  formulas: [estatePlanningFormula],

  validationRules: getEstatePlanningValidationRules(),

  examples: [
    {
      title: 'High-Net-Worth Estate Planning',
      description: 'Comprehensive estate planning for high-net-worth individual',
      inputs: {
        age: 65,
        maritalStatus: 'married',
        numberOfChildren: 2,
        numberOfGrandchildren: 4,
        totalAssets: 5000000,
        liquidAssets: 1000000,
        realEstateValue: 2000000,
        retirementAccounts: 1500000,
        businessInterests: 500000,
        annualIncome: 200000,
        annualExpenses: 150000,
        annualTaxes: 50000,
        desiredLegacy: 2000000,
        educationFunding: 400000,
        charitableGiving: 500000,
        federalTaxBracket: 32,
        stateTaxBracket: 8,
        estateTaxExemption: 12900000,
        planningHorizon: 20,
        expectedInflation: 3.0,
        expectedReturn: 7.0,
        healthStatus: 'good',
        lifeExpectancy: 85,
        longTermCare: true,
        hasWill: true,
        hasTrust: false,
        hasPowerOfAttorney: true,
        hasHealthcareDirective: false
      },
      expectedOutputs: {
        currentEstateValue: 5000000,
        projectedEstateValue: 12000000,
        inflationAdjustedValue: 8000000,
        federalEstateTax: 0,
        stateEstateTax: 400000,
        totalEstateTax: 400000,
        afterTaxEstate: 11600000,
        perChildInheritance: 5800000,
        perGrandchildInheritance: 2900000,
        educationFundShortfall: 0,
        willGap: false,
        trustGap: true,
        powerOfAttorneyGap: false,
        healthcareDirectiveGap: true,
        recommendedActions: 'Create revocable living trust, Establish healthcare directive, Review beneficiary designations',
        priorityLevel: 'medium',
        estimatedPlanningCost: 15000,
        estateRiskScore: 35,
        riskFactors: 'No trust in place, Missing healthcare directive',
        mitigationStrategies: 'Establish revocable living trust, Create advance healthcare directive',
        legacyAchievement: 100,
        charitableImpact: 8.3,
        familySecurityScore: 85,
        annualRequiredIncome: 195000,
        retirementShortfall: 0,
        longTermCareCost: 300000
      }
    }
  ]
};
import { Calculator } from '../../types/calculator';
import { DefinedBenefitPlanInputs, DefinedBenefitPlanOutputs } from './types';
import { calculateDefinedBenefitPlan } from './formulas';
import { validateDefinedBenefitPlanInputs } from './validation';

export const DefinedBenefitPlanCalculator: Calculator = {
  id: 'defined-benefit-plan-calculator',
  title: 'Defined Benefit Plan Calculator',
  category: 'finance',
  subcategory: 'Retirement',
  description: 'Calculate defined benefit pension plan values, vesting status, and retirement income projections with comprehensive risk analysis and comparison tools.',

  inputs: [
    // Personal Information
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 80,
      step: 1,
      placeholder: '45',
      tooltip: 'Your current age'
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      min: 50,
      max: 100,
      step: 1,
      placeholder: '65',
      tooltip: 'Age when you plan to retire'
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      min: 70,
      max: 120,
      step: 1,
      placeholder: '90',
      tooltip: 'Expected lifespan for benefit calculations'
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
      placeholder: 'male',
      tooltip: 'Gender for actuarial calculations'
    },

    // Employment Information
    {
      id: 'currentSalary',
      label: 'Current Salary ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 2000000,
      step: 1000,
      placeholder: '75000',
      tooltip: 'Your current annual salary'
    },
    {
      id: 'yearsOfService',
      label: 'Years of Service',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: '15',
      tooltip: 'Years worked for the employer'
    },
    {
      id: 'expectedSalaryIncrease',
      label: 'Expected Salary Increase (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '3',
      tooltip: 'Expected annual salary increase'
    },
    {
      id: 'finalAverageSalary',
      label: 'Final Average Salary ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 2000000,
      step: 1000,
      placeholder: '85000',
      tooltip: 'Final average salary for benefit calculation'
    },

    // Plan Information
    {
      id: 'planType',
      label: 'Plan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'traditional', label: 'Traditional' },
        { value: 'cash_balance', label: 'Cash Balance' },
        { value: 'hybrid', label: 'Hybrid' }
      ],
      placeholder: 'traditional',
      tooltip: 'Type of defined benefit plan'
    },
    {
      id: 'benefitFormula',
      label: 'Benefit Formula',
      type: 'select',
      required: true,
      options: [
        { value: 'final_average', label: 'Final Average' },
        { value: 'career_average', label: 'Career Average' },
        { value: 'flat_benefit', label: 'Flat Benefit' }
      ],
      placeholder: 'final_average',
      tooltip: 'Formula used to calculate benefits'
    },
    {
      id: 'vestingSchedule',
      label: 'Vesting Schedule',
      type: 'select',
      required: true,
      options: [
        { value: 'immediate', label: 'Immediate' },
        { value: 'graded', label: 'Graded' },
        { value: 'cliff', label: 'Cliff' }
      ],
      placeholder: 'graded',
      tooltip: 'How benefits become vested over time'
    },

    // Benefit Calculation
    {
      id: 'benefitMultiplier',
      label: 'Benefit Multiplier (%)',
      type: 'percentage',
      required: true,
      min: 0.5,
      max: 3,
      step: 0.1,
      placeholder: '1.5',
      tooltip: 'Multiplier for benefit calculation'
    },
    {
      id: 'yearsOfServiceRequired',
      label: 'Years of Service Required',
      type: 'number',
      required: true,
      min: 1,
      max: 40,
      step: 1,
      placeholder: '30',
      tooltip: 'Years needed for full benefit'
    },
    {
      id: 'minimumRetirementAge',
      label: 'Minimum Retirement Age',
      type: 'number',
      required: true,
      min: 50,
      max: 70,
      step: 1,
      placeholder: '55',
      tooltip: 'Earliest retirement age without reduction'
    },
    {
      id: 'earlyRetirementReduction',
      label: 'Early Retirement Reduction (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '6',
      tooltip: 'Annual reduction for early retirement'
    },

    // Financial Information
    {
      id: 'currentAccountBalance',
      label: 'Current Account Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '100000',
      tooltip: 'Current plan account balance'
    },
    {
      id: 'employerContribution',
      label: 'Annual Employer Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '10000',
      tooltip: 'Annual employer contribution'
    },
    {
      id: 'employeeContribution',
      label: 'Annual Employee Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '2000',
      tooltip: 'Annual employee contribution'
    },
    {
      id: 'expectedReturnRate',
      label: 'Expected Return Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '6',
      tooltip: 'Expected annual return on plan assets'
    },

    // Cost of Living Adjustments
    {
      id: 'colaRate',
      label: 'COLA Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      step: 0.25,
      placeholder: '2',
      tooltip: 'Annual cost of living adjustment'
    },
    {
      id: 'colaStartAge',
      label: 'COLA Start Age',
      type: 'number',
      required: true,
      min: 50,
      max: 100,
      step: 1,
      placeholder: '62',
      tooltip: 'Age when COLA begins'
    },

    // Spouse/Beneficiary Information
    {
      id: 'spouseAge',
      label: 'Spouse Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      step: 1,
      placeholder: '45',
      tooltip: 'Spouse age for survivor benefits'
    },
    {
      id: 'survivorBenefitPercentage',
      label: 'Survivor Benefit Percentage (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 5,
      placeholder: '50',
      tooltip: 'Percentage of benefit paid to survivor'
    },

    // Tax Information
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 40,
      step: 1,
      placeholder: '24',
      tooltip: 'Federal tax bracket'
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.5,
      placeholder: '5',
      tooltip: 'State tax rate'
    },

    // Analysis Parameters
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      tooltip: 'Period for analysis'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '4',
      tooltip: 'Rate used to discount future values'
    },

    // Currency
    {
      id: 'currency',
      label: 'Currency',
      type: 'select',
      required: true,
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      placeholder: 'USD',
      tooltip: 'Currency for calculations'
    }
  ],

  outputs: [
    { id: 'monthlyRetirementIncome', label: 'Monthly Retirement Income', type: 'currency', explanation: 'Expected monthly benefit payment' },
    { id: 'annualRetirementIncome', label: 'Annual Retirement Income', type: 'currency', explanation: 'Expected annual benefit payment' },
    { id: 'totalValue', label: 'Total Plan Value', type: 'currency', explanation: 'Present value of all benefits' },
    { id: 'netBenefit', label: 'Net Benefit', type: 'currency', explanation: 'Net financial benefit from the plan' },
    { id: 'metrics', label: 'Plan Metrics', type: 'text', explanation: 'Detailed plan performance metrics' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive plan analysis' }
  ],


  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Traditional Pension Plan Analysis',
      description: 'Analysis of a traditional defined benefit pension plan',
      inputs: {
        currentAge: 45,
        retirementAge: 65,
        lifeExpectancy: 90,
        gender: 'male',
        currentSalary: 75000,
        yearsOfService: 15,
        expectedSalaryIncrease: 0.03,
        finalAverageSalary: 85000,
        planType: 'traditional',
        benefitFormula: 'final_average',
        vestingSchedule: 'graded',
        benefitMultiplier: 0.015,
        yearsOfServiceRequired: 30,
        minimumRetirementAge: 55,
        earlyRetirementReduction: 0.06,
        currentAccountBalance: 100000,
        employerContribution: 10000,
        employeeContribution: 2000,
        expectedReturnRate: 0.06,
        colaRate: 0.02,
        colaStartAge: 62,
        spouseAge: 45,
        survivorBenefitPercentage: 0.5,
        taxBracket: 0.24,
        stateTaxRate: 0.05,
        analysisPeriod: 30,
        inflationRate: 0.025,
        discountRate: 0.04,
        currency: 'USD'
      },
      expectedOutputs: {
        monthlyRetirementIncome: 2125,
        annualRetirementIncome: 25500,
        totalValue: 350000,
        netBenefit: 150000,
        metrics: 'Comprehensive plan metrics calculated',
        analysis: 'Detailed pension analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter your current age and retirement plans',
    'Input salary and years of service information',
    'Specify plan type and benefit formula',
    'Review vesting status and benefit calculations',
    'Consider tax implications and survivor benefits',
    'Compare with other retirement strategies'
  ]
};
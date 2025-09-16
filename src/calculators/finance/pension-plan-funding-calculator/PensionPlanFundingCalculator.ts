import { Calculator } from '../../../types/calculator';
import { calculatePensionFunding } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const pensionPlanFundingCalculator: Calculator = {
  id: 'pension-plan-funding-calculator',
  title: 'Pension Plan Funding Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate pension plan funding requirements, track progress toward retirement goals, and optimize contribution strategies for defined benefit, defined contribution, and cash balance plans.',

  usageInstructions: [
    'Enter your current pension balance and target retirement amount',
    'Specify contribution amounts and expected investment returns',
    'Review funding progress and required adjustments',
    'Compare different funding strategies and plan types'
  ],

  inputs: [
    {
      id: 'currentPlanBalance',
      label: 'Current Plan Balance',
      type: 'currency',
      required: true,
      placeholder: '250000',
      tooltip: 'Current value of your pension plan',
      defaultValue: 250000,
      min: 0,
      max: 10000000
    },
    {
      id: 'targetRetirementBalance',
      label: 'Target Retirement Balance',
      type: 'currency',
      required: true,
      placeholder: '1000000',
      tooltip: 'Desired pension balance at retirement',
      defaultValue: 1000000,
      min: 0,
      max: 20000000
    },
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '45',
      tooltip: 'Your current age',
      defaultValue: 45,
      min: 0,
      max: 120
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Age you plan to retire',
      defaultValue: 65,
      min: 1,
      max: 120
    },
    {
      id: 'annualContribution',
      label: 'Annual Employee Contribution',
      type: 'currency',
      required: true,
      placeholder: '10000',
      tooltip: 'Your annual contribution to the plan',
      defaultValue: 10000,
      min: 0,
      max: 500000
    },
    {
      id: 'employerMatch',
      label: 'Employer Match (%)',
      type: 'percentage',
      required: true,
      placeholder: '6',
      tooltip: 'Employer matching contribution percentage',
      defaultValue: 6,
      min: 0,
      max: 100,
      step: 0.5
    },
    {
      id: 'expectedReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '7',
      tooltip: 'Expected annual investment return',
      defaultValue: 7,
      min: -20,
      max: 50,
      step: 0.5
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 2.5,
      min: -10,
      max: 20,
      step: 0.1
    },
    {
      id: 'currentSalary',
      label: 'Current Annual Salary',
      type: 'currency',
      required: true,
      placeholder: '80000',
      tooltip: 'Your current annual salary',
      defaultValue: 80000,
      min: 0,
      max: 10000000
    },
    {
      id: 'salaryGrowthRate',
      label: 'Salary Growth Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual salary increase',
      defaultValue: 3,
      min: -10,
      max: 20,
      step: 0.5
    },
    {
      id: 'planType',
      label: 'Plan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'defined_benefit', label: 'Defined Benefit' },
        { value: 'defined_contribution', label: 'Defined Contribution' },
        { value: 'cash_balance', label: 'Cash Balance' }
      ],
      tooltip: 'Type of pension plan',
      defaultValue: 'defined_contribution'
    },
    {
      id: 'fundingStrategy',
      label: 'Funding Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'conservative', label: 'Conservative' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'aggressive', label: 'Aggressive' }
      ],
      tooltip: 'Investment risk strategy',
      defaultValue: 'moderate'
    },
    {
      id: 'includeCatchUp',
      label: 'Include Catch-Up Contributions',
      type: 'boolean',
      required: false,
      tooltip: 'Include catch-up contributions for age 50+',
      defaultValue: false
    }
  ],

  outputs: [
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total employee and employer contributions'
    },
    {
      id: 'employerContributions',
      label: 'Employer Contributions',
      type: 'currency',
      explanation: 'Total employer matching contributions'
    },
    {
      id: 'investmentGrowth',
      label: 'Investment Growth',
      type: 'currency',
      explanation: 'Projected investment growth'
    },
    {
      id: 'yearsToGoal',
      label: 'Years to Goal',
      type: 'number',
      explanation: 'Years needed to reach target balance'
    },
    {
      id: 'monthlyContributionNeeded',
      label: 'Monthly Contribution Needed',
      type: 'currency',
      explanation: 'Additional monthly contribution required'
    },
    {
      id: 'projectedBalance',
      label: 'Projected Balance',
      type: 'currency',
      explanation: 'Projected balance at retirement'
    },
    {
      id: 'fundingGap',
      label: 'Funding Gap',
      type: 'currency',
      explanation: 'Difference between projected and target balance'
    },
    {
      id: 'catchUpContribution',
      label: 'Catch-Up Contribution',
      type: 'currency',
      explanation: 'Additional catch-up contribution amount'
    },
    {
      id: 'retirementReadiness',
      label: 'Retirement Readiness (%)',
      type: 'percentage',
      explanation: 'Percentage of retirement goal achieved'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('currentPlanBalance', 'Current plan balance is required'),
    ValidationRuleFactory.required('targetRetirementBalance', 'Target retirement balance is required'),
    ValidationRuleFactory.required('currentAge', 'Current age is required'),
    ValidationRuleFactory.required('retirementAge', 'Retirement age is required'),
    ValidationRuleFactory.required('annualContribution', 'Annual contribution is required'),
    ValidationRuleFactory.required('employerMatch', 'Employer match is required'),
    ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
    ValidationRuleFactory.required('currentSalary', 'Current salary is required'),
    ValidationRuleFactory.required('planType', 'Plan type is required'),
    ValidationRuleFactory.required('fundingStrategy', 'Funding strategy is required'),
    ValidationRuleFactory.range('currentPlanBalance', 0, 10000000, 'Current plan balance must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('targetRetirementBalance', 0, 20000000, 'Target retirement balance must be between $0 and $20,000,000'),
    ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
    ValidationRuleFactory.range('retirementAge', 1, 120, 'Retirement age must be between 1 and 120'),
    ValidationRuleFactory.range('annualContribution', 0, 500000, 'Annual contribution must be between $0 and $500,000'),
    ValidationRuleFactory.range('employerMatch', 0, 100, 'Employer match must be between 0% and 100%'),
    ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
    ValidationRuleFactory.range('currentSalary', 0, 10000000, 'Current salary must be between $0 and $10,000,000'),
    ValidationRuleFactory.businessRule(
      'retirementAge',
      (retirementAge, allInputs) => {
        if (!allInputs?.currentAge) return true;
        return retirementAge > allInputs.currentAge;
      },
      'Retirement age must be greater than current age'
    ),
    ValidationRuleFactory.businessRule(
      'targetRetirementBalance',
      (targetRetirementBalance, allInputs) => {
        if (!allInputs?.currentPlanBalance) return true;
        return targetRetirementBalance > allInputs.currentPlanBalance;
      },
      'Target retirement balance should be greater than current balance'
    ),
    ValidationRuleFactory.businessRule(
      'annualContribution',
      (annualContribution, allInputs) => {
        if (!allInputs?.currentSalary) return true;
        return annualContribution <= allInputs.currentSalary * 0.5; // Max 50% of salary
      },
      'Annual contribution should not exceed 50% of current salary'
    )
  ],

  examples: [
    {
      title: 'Defined Contribution Plan',
      description: 'Funding analysis for a 45-year-old in a 401(k) plan',
      inputs: {
        currentPlanBalance: 250000,
        targetRetirementBalance: 1000000,
        currentAge: 45,
        retirementAge: 65,
        annualContribution: 15000,
        employerMatch: 6,
        expectedReturn: 7,
        inflationRate: 2.5,
        currentSalary: 90000,
        salaryGrowthRate: 3,
        planType: 'defined_contribution',
        fundingStrategy: 'moderate',
        includeCatchUp: false
      },
      expectedOutputs: {
        totalContributions: 480000,
        employerContributions: 43200,
        investmentGrowth: 520000,
        yearsToGoal: 18,
        monthlyContributionNeeded: 850,
        projectedBalance: 1250000,
        fundingGap: 0,
        catchUpContribution: 0,
        retirementReadiness: 125
      }
    },
    {
      title: 'Behind Schedule - Catch-Up Needed',
      description: 'Funding analysis showing catch-up contributions needed',
      inputs: {
        currentPlanBalance: 150000,
        targetRetirementBalance: 800000,
        currentAge: 55,
        retirementAge: 65,
        annualContribution: 8000,
        employerMatch: 4,
        expectedReturn: 6,
        inflationRate: 2.5,
        currentSalary: 70000,
        salaryGrowthRate: 2,
        planType: 'defined_contribution',
        fundingStrategy: 'conservative',
        includeCatchUp: true
      },
      expectedOutputs: {
        totalContributions: 144000,
        employerContributions: 22400,
        investmentGrowth: 180000,
        yearsToGoal: 10,
        monthlyContributionNeeded: 1200,
        projectedBalance: 474000,
        fundingGap: 326000,
        catchUpContribution: 4000,
        retirementReadiness: 59
      }
    }
  ]
};
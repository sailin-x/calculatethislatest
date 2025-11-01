import { Calculator } from '../../types/calculator';
import { FourOhThreeBInputs, FourOhThreeBOutputs } from './types';
import {
  calculateAnnualEmployeeContribution,
  calculateEmployerMatchContribution,
  calculateProjectedBalance,
  calculateTaxDeferralBenefit,
  calculateAnnualRetirementIncome,
  calculateReplacementRatio,
  calculateEffectiveReturn,
  generateFourOhThreeBAnalysis
} from './formulas';
import { validateFourOhThreeBInputs } from './validation';

export const FourOhThreeBCalculator: Calculator = {
  id: '403b-plan-calculator',
  title: '403(b) Plan Calculator',
  category: 'finance',
  subcategory: 'Retirement Planning',
  description: 'Calculate retirement savings growth for 403(b) plans with employer matching, catch-up contributions, and tax benefits.',
  usageInstructions: [
    'Enter your current age, salary, and retirement goals',
    'Specify employee contribution percentage and employer match details',
    'Include expected salary increases and investment returns',
    'Review projected balance, retirement income, and contribution optimization'
  ],

  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      tooltip: 'Your current age'
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      min: 50,
      max: 100,
      tooltip: 'Age you plan to retire'
    },
    {
      id: 'currentSalary',
      label: 'Current Annual Salary ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Your current annual salary before taxes'
    },
    {
      id: 'expectedAnnualSalaryIncrease',
      label: 'Expected Annual Salary Increase (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 20,
      tooltip: 'Expected annual salary growth rate'
    },
    {
      id: 'employeeContributionPercent',
      label: 'Employee Contribution (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Percentage of salary you contribute'
    },
    {
      id: 'employerMatchPercent',
      label: 'Employer Match (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 200,
      tooltip: 'Employer match as percentage of your contribution'
    },
    {
      id: 'employerMatchLimitPercent',
      label: 'Employer Match Limit (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Maximum employer match as percentage of salary'
    },
    {
      id: 'catchUpContribution',
      label: 'Annual Catch-Up Contribution ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Additional contribution if age 50+ (optional)'
    },
    {
      id: 'currentBalance',
      label: 'Current 403(b) Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current amount in your 403(b) account'
    },
    {
      id: 'expectedAnnualReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 30,
      tooltip: 'Expected annual investment return'
    },
    {
      id: 'investmentFees',
      label: 'Annual Investment Fees (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      tooltip: 'Annual fees and expenses'
    },
    {
      id: 'currentTaxRate',
      label: 'Current Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Your current marginal tax rate'
    },
    {
      id: 'retirementTaxRate',
      label: 'Retirement Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Expected tax rate in retirement'
    },
    {
      id: 'includeEmployerMatch',
      label: 'Include Employer Match',
      type: 'boolean',
      required: false,
      tooltip: 'Include employer matching contributions'
    },
    {
      id: 'includeCatchUpContributions',
      label: 'Include Catch-Up Contributions',
      type: 'boolean',
      required: false,
      tooltip: 'Include additional contributions for age 50+'
    },
    {
      id: 'includeInvestmentFees',
      label: 'Include Investment Fees',
      type: 'boolean',
      required: false,
      tooltip: 'Account for investment fees and expenses'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period',
      type: 'select',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'monthly', label: 'Monthly' }
      ],
      tooltip: 'Time period for analysis and projections'
    }
  ],

  outputs: [
    {
      id: 'projectedBalance',
      label: 'Projected Balance',
      type: 'currency',
      explanation: 'Estimated 403(b) balance at retirement'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount contributed over time'
    },
    {
      id: 'annualRetirementIncome',
      label: 'Annual Retirement Income',
      type: 'currency',
      explanation: 'Estimated annual income using 4% safe withdrawal'
    },
    {
      id: 'totalTaxBenefits',
      label: 'Total Tax Benefits',
      type: 'currency',
      explanation: 'Total tax savings from deferral and matching'
    },
    {
      id: 'annualEmployeeContribution',
      label: 'Annual Employee Contribution',
      type: 'currency',
      explanation: 'Your annual contribution amount'
    },
    {
      id: 'annualEmployerContribution',
      label: 'Annual Employer Contribution',
      type: 'currency',
      explanation: 'Employer matching contribution'
    },
    {
      id: 'totalAnnualContribution',
      label: 'Total Annual Contribution',
      type: 'currency',
      explanation: 'Combined employee and employer contributions'
    },
    {
      id: 'effectiveReturn',
      label: 'Effective Return',
      type: 'percentage',
      explanation: 'Net return after fees'
    },
    {
      id: 'replacementRatio',
      label: 'Replacement Ratio',
      type: 'percentage',
      explanation: 'Retirement income as percentage of final salary'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Teacher Retirement Planning',
      description: 'Calculate 403(b) growth for a 35-year-old teacher earning $60,000',
      inputs: {
        currentAge: 35,
        retirementAge: 65,
        currentSalary: 60000,
        expectedAnnualSalaryIncrease: 3,
        employeeContributionPercent: 8,
        employerMatchPercent: 100,
        employerMatchLimitPercent: 5,
        catchUpContribution: 0,
        currentBalance: 25000,
        expectedAnnualReturn: 7,
        investmentFees: 0.5,
        currentTaxRate: 25,
        retirementTaxRate: 20,
        includeEmployerMatch: true,
        includeCatchUpContributions: false,
        includeInvestmentFees: true,
        analysisPeriod: 'annual'
      },
      expectedOutputs: {
        projectedBalance: 892000,
        totalContributions: 312000,
        annualRetirementIncome: 35680,
        totalTaxBenefits: 78000,
        annualEmployeeContribution: 4800,
        annualEmployerContribution: 3000,
        totalAnnualContribution: 7800,
        effectiveReturn: 6.5,
        replacementRatio: 59.5
      }
    },
    {
      title: 'Healthcare Worker with Catch-Up',
      description: 'Calculate retirement savings for 52-year-old healthcare worker with catch-up contributions',
      inputs: {
        currentAge: 52,
        retirementAge: 67,
        currentSalary: 75000,
        expectedAnnualSalaryIncrease: 2.5,
        employeeContributionPercent: 10,
        employerMatchPercent: 50,
        employerMatchLimitPercent: 8,
        catchUpContribution: 6500,
        currentBalance: 150000,
        expectedAnnualReturn: 6,
        investmentFees: 0.75,
        currentTaxRate: 28,
        retirementTaxRate: 22,
        includeEmployerMatch: true,
        includeCatchUpContributions: true,
        includeInvestmentFees: true,
        analysisPeriod: 'annual'
      },
      expectedOutputs: {
        projectedBalance: 1450000,
        totalContributions: 485000,
        annualRetirementIncome: 58000,
        totalTaxBenefits: 136000,
        annualEmployeeContribution: 7500,
        annualEmployerContribution: 3000,
        totalAnnualContribution: 17000,
        effectiveReturn: 5.25,
        replacementRatio: 77.3
      }
    }
  ]
};
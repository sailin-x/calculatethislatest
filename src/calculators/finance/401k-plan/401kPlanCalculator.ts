import { Calculator } from '../../../types/calculator';
import { calculate401kPlan } from './formulas';
import { generate401kPlanAnalysis } from './formulas';

export const FourZeroOneKPlanCalculator: Calculator = {
  id: '401k-plan-calculator',
  name: '401(k) Plan Calculator',
  category: 'finance',
  subcategory: 'retirement',
  description: 'Comprehensive 401(k) plan analysis including contribution limits, investment options, fees, and retirement projections.',
  inputs: {
    currentAge: {
      type: 'number',
      unit: 'years',
      description: 'Current age',
      placeholder: '30',
      validation: {
        required: true,
        min: 18,
        max: 100
      }
    },
    retirementAge: {
      type: 'number',
      unit: 'years',
      description: 'Planned retirement age',
      placeholder: '65',
      validation: {
        required: true,
        min: 50,
        max: 85
      }
    },
    currentSalary: {
      type: 'currency',
      unit: 'USD',
      description: 'Current annual salary',
      placeholder: '75000',
      validation: {
        required: true,
        min: 10000,
        max: 10000000
      }
    },
    current401kBalance: {
      type: 'currency',
      unit: 'USD',
      description: 'Current 401(k) balance',
      placeholder: '25000',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    employeeContribution: {
      type: 'percentage',
      unit: '%',
      description: 'Employee contribution percentage',
      placeholder: '6',
      validation: {
        required: true,
        min: 0,
        max: 100
      }
    },
    employerMatch: {
      type: 'percentage',
      unit: '%',
      description: 'Employer match percentage',
      placeholder: '3',
      validation: {
        required: true,
        min: 0,
        max: 100
      }
    },
    employerMatchLimit: {
      type: 'percentage',
      unit: '%',
      description: 'Employer match limit (percentage of salary)',
      placeholder: '6',
      validation: {
        required: true,
        min: 0,
        max: 100
      }
    },
    planFees: {
      type: 'percentage',
      unit: '%',
      description: 'Annual plan administration fees',
      placeholder: '0.5',
      validation: {
        required: true,
        min: 0,
        max: 5
      }
    },
    investmentFees: {
      type: 'percentage',
      unit: '%',
      description: 'Annual investment expense ratio',
      placeholder: '0.8',
      validation: {
        required: true,
        min: 0,
        max: 5
      }
    },
    salaryGrowthRate: {
      type: 'percentage',
      unit: '%',
      description: 'Expected annual salary growth rate',
      placeholder: '3',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    },
    investmentReturn: {
      type: 'percentage',
      unit: '%',
      description: 'Expected annual investment return',
      placeholder: '7',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    },
    inflationRate: {
      type: 'percentage',
      unit: '%',
      description: 'Expected annual inflation rate',
      placeholder: '2.5',
      validation: {
        required: true,
        min: 0,
        max: 15
      }
    },
    contributionIncrease: {
      type: 'percentage',
      unit: '%',
      description: 'Annual contribution increase rate',
      placeholder: '1',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    catchUpContribution: {
      type: 'boolean',
      description: 'Will make catch-up contributions after age 50',
      placeholder: 'false',
      validation: {
        required: true
      }
    },
    taxRate: {
      type: 'percentage',
      unit: '%',
      description: 'Current marginal tax rate',
      placeholder: '22',
      validation: {
        required: true,
        min: 0,
        max: 50
      }
    },
    retirementTaxRate: {
      type: 'percentage',
      unit: '%',
      description: 'Expected retirement tax rate',
      placeholder: '15',
      validation: {
        required: true,
        min: 0,
        max: 50
      }
    },
    lifeExpectancy: {
      type: 'number',
      unit: 'years',
      description: 'Expected life expectancy',
      placeholder: '85',
      validation: {
        required: true,
        min: 65,
        max: 120
      }
    },
    socialSecurityIncome: {
      type: 'currency',
      unit: 'USD',
      description: 'Expected annual Social Security income',
      placeholder: '25000',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    otherRetirementIncome: {
      type: 'currency',
      unit: 'USD',
      description: 'Other retirement income sources',
      placeholder: '10000',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    planType: {
      type: 'select',
      description: '401(k) plan type',
      options: [
        { value: 'traditional', label: 'Traditional 401(k)' },
        { value: 'roth', label: 'Roth 401(k)' },
        { value: 'both', label: 'Both (Split)' }
      ],
      placeholder: 'traditional',
      validation: {
        required: true
      }
    },
    rothPercentage: {
      type: 'percentage',
      unit: '%',
      description: 'Percentage allocated to Roth 401(k) (if applicable)',
      placeholder: '0',
      validation: {
        required: true,
        min: 0,
        max: 100
      }
    },
    loanBalance: {
      type: 'currency',
      unit: 'USD',
      description: 'Current 401(k) loan balance (if any)',
      placeholder: '0',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    hardshipWithdrawals: {
      type: 'currency',
      unit: 'USD',
      description: 'Total hardship withdrawals taken',
      placeholder: '0',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    investmentAllocation: {
      type: 'select',
      description: 'Investment allocation strategy',
      options: [
        { value: 'conservative', label: 'Conservative (20% stocks, 80% bonds)' },
        { value: 'moderate', label: 'Moderate (60% stocks, 40% bonds)' },
        { value: 'aggressive', label: 'Aggressive (80% stocks, 20% bonds)' },
        { value: 'custom', label: 'Custom allocation' }
      ],
      placeholder: 'moderate',
      validation: {
        required: true
      }
    },
    rebalanceFrequency: {
      type: 'select',
      description: 'Portfolio rebalancing frequency',
      options: [
        { value: 'never', label: 'Never' },
        { value: 'annually', label: 'Annually' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' }
      ],
      placeholder: 'annually',
      validation: {
        required: true
      }
    }
  },
  outputs: [
    {
      id: 'totalContributions',
      name: 'Total Contributions',
      type: 'currency',
      unit: 'USD',
      description: 'Total employee and employer contributions over career'
    },
    {
      id: 'totalEmployerMatch',
      name: 'Total Employer Match',
      type: 'currency',
      unit: 'USD',
      description: 'Total employer matching contributions'
    },
    {
      id: 'totalFees',
      name: 'Total Fees Paid',
      type: 'currency',
      unit: 'USD',
      description: 'Total fees paid over investment period'
    },
    {
      id: 'total401kBalance',
      name: 'Total 401(k) Balance',
      type: 'currency',
      unit: 'USD',
      description: 'Projected 401(k) balance at retirement'
    },
    {
      id: 'annualContribution',
      name: 'Annual Contribution',
      type: 'currency',
      unit: 'USD',
      description: 'Current annual contribution amount'
    },
    {
      id: 'annualEmployerMatch',
      name: 'Annual Employer Match',
      type: 'currency',
      unit: 'USD',
      description: 'Current annual employer match'
    },
    {
      id: 'annualFees',
      name: 'Annual Fees',
      type: 'currency',
      unit: 'USD',
      description: 'Current annual fees'
    },
    {
      id: 'taxSavings',
      name: 'Annual Tax Savings',
      type: 'currency',
      unit: 'USD',
      description: 'Annual tax savings from contributions'
    },
    {
      id: 'totalTaxSavings',
      name: 'Total Tax Savings',
      type: 'currency',
      unit: 'USD',
      description: 'Total tax savings over career'
    },
    {
      id: 'monthlyRetirementIncome',
      name: 'Monthly Retirement Income',
      type: 'currency',
      unit: 'USD',
      description: 'Monthly income from 401(k) in retirement'
    },
    {
      id: 'annualRetirementIncome',
      name: 'Annual Retirement Income',
      type: 'currency',
      unit: 'USD',
      description: 'Annual income from 401(k) in retirement'
    },
    {
      id: 'totalRetirementIncome',
      name: 'Total Retirement Income',
      type: 'currency',
      unit: 'USD',
      description: 'Total income from 401(k) during retirement'
    },
    {
      id: 'replacementRatio',
      name: 'Income Replacement Ratio',
      type: 'percentage',
      unit: '%',
      description: '401(k) income as percentage of pre-retirement salary'
    },
    {
      id: 'yearsOfIncome',
      name: 'Years of Income',
      type: 'number',
      unit: 'years',
      description: 'Number of years 401(k) will provide income'
    },
    {
      id: 'maxContribution',
      name: 'Maximum Annual Contribution',
      type: 'currency',
      unit: 'USD',
      description: 'Maximum allowed annual contribution'
    },
    {
      id: 'catchUpAmount',
      name: 'Catch-Up Contribution',
      type: 'currency',
      unit: 'USD',
      description: 'Additional catch-up contribution amount'
    },
    {
      id: 'contributionGap',
      name: 'Contribution Gap',
      type: 'currency',
      unit: 'USD',
      description: 'Difference between current and maximum contribution'
    },
    {
      id: 'retirementScore',
      name: 'Retirement Readiness Score',
      type: 'number',
      unit: 'score',
      description: 'Overall retirement readiness score (0-100)'
    },
    {
      id: 'savingsScore',
      name: 'Savings Score',
      type: 'number',
      unit: 'score',
      description: 'Savings adequacy score (0-100)'
    },
    {
      id: 'investmentScore',
      name: 'Investment Score',
      type: 'number',
      unit: 'score',
      description: 'Investment strategy score (0-100)'
    },
    {
      id: 'feeEfficiencyScore',
      name: 'Fee Efficiency Score',
      type: 'number',
      unit: 'score',
      description: 'Fee efficiency score (0-100)'
    },
    {
      id: 'projectedValue',
      name: 'Projected Value',
      type: 'currency',
      unit: 'USD',
      description: 'Projected account value at retirement'
    },
    {
      id: 'monthlyContribution',
      name: 'Monthly Contribution',
      type: 'currency',
      unit: 'USD',
      description: 'Monthly contribution amount'
    },
    {
      id: 'employerMatchRate',
      name: 'Effective Employer Match Rate',
      type: 'percentage',
      unit: '%',
      description: 'Effective employer match rate'
    },
    {
      id: 'totalGrowth',
      name: 'Total Investment Growth',
      type: 'currency',
      unit: 'USD',
      description: 'Total investment growth over time'
    },
    {
      id: 'contributionEfficiency',
      name: 'Contribution Efficiency',
      type: 'percentage',
      unit: '%',
      description: 'Percentage of maximum contribution utilized'
    },
    {
      id: 'feeImpact',
      name: 'Fee Impact',
      type: 'currency',
      unit: 'USD',
      description: 'Total impact of fees on final balance'
    },
    {
      id: 'rothBalance',
      name: 'Roth 401(k) Balance',
      type: 'currency',
      unit: 'USD',
      description: 'Projected Roth 401(k) balance'
    },
    {
      id: 'traditionalBalance',
      name: 'Traditional 401(k) Balance',
      type: 'currency',
      unit: 'USD',
      description: 'Projected traditional 401(k) balance'
    },
    {
      id: 'rothTaxFreeIncome',
      name: 'Roth Tax-Free Income',
      type: 'currency',
      unit: 'USD',
      description: 'Tax-free income from Roth portion'
    },
    {
      id: 'loanRepaymentImpact',
      name: 'Loan Repayment Impact',
      type: 'currency',
      unit: 'USD',
      description: 'Impact of loan repayment on final balance'
    },
    {
      id: 'hardshipImpact',
      name: 'Hardship Withdrawal Impact',
      type: 'currency',
      unit: 'USD',
      description: 'Impact of hardship withdrawals on final balance'
    },
    {
      id: 'rebalanceBenefit',
      name: 'Rebalancing Benefit',
      type: 'currency',
      unit: 'USD',
      description: 'Additional value from regular rebalancing'
    }
  ],
  calculate: calculate401kPlan,
  generateReport: generate401kPlanAnalysis
};

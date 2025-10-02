import { Calculator } from '../../types/calculator';
import { calculate401kRollover } from './formulas';
import { generate401kRolloverAnalysis } from './formulas';

export const FourZeroOneKRolloverCalculator: Calculator = {
  id: '401k-rollover-calculator',
  name: '401(k) Rollover Calculator',
  category: 'finance',
  subcategory: 'retirement',
  description: 'Analyze the costs, benefits, and tax implications of rolling over your 401(k) to an IRA or new employer plan.',
  inputs: {
    current401kBalance: {
      type: 'currency',
      unit: 'USD',
      description: 'Current 401(k) balance',
      placeholder: '50000',
      validation: {
        required: true,
        min: 1000,
        max: 10000000
      }
    },
    currentAge: {
      type: 'number',
      unit: 'years',
      description: 'Current age',
      placeholder: '35',
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
    currentTaxRate: {
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
    rolloverType: {
      type: 'select',
      description: 'Type of rollover',
      options: [
        { value: 'traditional-ira', label: 'Traditional IRA' },
        { value: 'roth-ira', label: 'Roth IRA (Conversion)' },
        { value: 'new-401k', label: 'New Employer 401(k)' },
        { value: 'roth-401k', label: 'Roth 401(k)' }
      ],
      placeholder: 'traditional-ira',
      validation: {
        required: true
      }
    },
    currentPlanFees: {
      type: 'percentage',
      unit: '%',
      description: 'Current 401(k) plan fees',
      placeholder: '1.2',
      validation: {
        required: true,
        min: 0,
        max: 5
      }
    },
    newPlanFees: {
      type: 'percentage',
      unit: '%',
      description: 'New plan/IRA fees',
      placeholder: '0.5',
      validation: {
        required: true,
        min: 0,
        max: 5
      }
    },
    currentInvestmentOptions: {
      type: 'select',
      description: 'Current investment options quality',
      options: [
        { value: 'excellent', label: 'Excellent (Low-cost index funds)' },
        { value: 'good', label: 'Good (Mix of options)' },
        { value: 'fair', label: 'Fair (Limited options)' },
        { value: 'poor', label: 'Poor (High-cost funds only)' }
      ],
      placeholder: 'fair',
      validation: {
        required: true
      }
    },
    newInvestmentOptions: {
      type: 'select',
      description: 'New investment options quality',
      options: [
        { value: 'excellent', label: 'Excellent (Low-cost index funds)' },
        { value: 'good', label: 'Good (Mix of options)' },
        { value: 'fair', label: 'Fair (Limited options)' },
        { value: 'poor', label: 'Poor (High-cost funds only)' }
      ],
      placeholder: 'excellent',
      validation: {
        required: true
      }
    },
    expectedReturn: {
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
    yearsToRetirement: {
      type: 'number',
      unit: 'years',
      description: 'Years until retirement',
      placeholder: '30',
      validation: {
        required: true,
        min: 1,
        max: 50
      }
    },
    rolloverFees: {
      type: 'currency',
      unit: 'USD',
      description: 'One-time rollover fees',
      placeholder: '0',
      validation: {
        required: true,
        min: 0,
        max: 10000
      }
    },
    earlyWithdrawalPenalty: {
      type: 'boolean',
      description: 'Will you need early access to funds?',
      placeholder: 'false',
      validation: {
        required: true
      }
    },
    employerMatch: {
      type: 'percentage',
      unit: '%',
      description: 'New employer match percentage',
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
      description: 'New employer match limit',
      placeholder: '6',
      validation: {
        required: true,
        min: 0,
        max: 100
      }
    },
    annualContribution: {
      type: 'currency',
      unit: 'USD',
      description: 'Annual contribution to new plan',
      placeholder: '6000',
      validation: {
        required: true,
        min: 0,
        max: 100000
      }
    },
    stateTaxRate: {
      type: 'percentage',
      unit: '%',
      description: 'State tax rate (if applicable)',
      placeholder: '5',
      validation: {
        required: true,
        min: 0,
        max: 15
      }
    },
    netUnrealizedAppreciation: {
      type: 'currency',
      unit: 'USD',
      description: 'Net Unrealized Appreciation (if applicable)',
      placeholder: '0',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    hasAfterTaxContributions: {
      type: 'boolean',
      description: 'Has after-tax contributions in current 401(k)',
      placeholder: 'false',
      validation: {
        required: true
      }
    },
    afterTaxAmount: {
      type: 'currency',
      unit: 'USD',
      description: 'Amount of after-tax contributions',
      placeholder: '0',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    hasRoth401k: {
      type: 'boolean',
      description: 'Has Roth 401(k) portion in current plan',
      placeholder: 'false',
      validation: {
        required: true
      }
    },
    roth401kAmount: {
      type: 'currency',
      unit: 'USD',
      description: 'Amount in Roth 401(k) portion',
      placeholder: '0',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    hasOutstandingLoan: {
      type: 'boolean',
      description: 'Has outstanding 401(k) loan',
      placeholder: 'false',
      validation: {
        required: true
      }
    },
    loanBalance: {
      type: 'currency',
      unit: 'USD',
      description: 'Outstanding loan balance',
      placeholder: '0',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    loanRepaymentPeriod: {
      type: 'number',
      unit: 'months',
      description: 'Loan repayment period if not rolled over',
      placeholder: '60',
      validation: {
        required: true,
        min: 1,
        max: 300
      }
    }
  },
  outputs: [
    {
      id: 'rolloverRecommendation',
      name: 'Rollover Recommendation',
      type: 'string',
      unit: 'recommendation',
      description: 'Whether to rollover or keep current plan'
    },
    {
      id: 'rolloverScore',
      name: 'Rollover Score',
      type: 'number',
      unit: 'score',
      description: 'Overall rollover recommendation score (0-100)'
    },
    {
      id: 'feeSavings',
      name: 'Annual Fee Savings',
      type: 'currency',
      unit: 'USD',
      description: 'Annual savings from lower fees'
    },
    {
      id: 'totalFeeSavings',
      name: 'Total Fee Savings',
      type: 'currency',
      unit: 'USD',
      description: 'Total fee savings over investment period'
    },
    {
      id: 'taxImpact',
      name: 'Tax Impact',
      type: 'currency',
      unit: 'USD',
      description: 'Tax impact of rollover (positive = tax cost)'
    },
    {
      id: 'conversionTax',
      name: 'Roth Conversion Tax',
      type: 'currency',
      unit: 'USD',
      description: 'Tax cost for Roth conversion (if applicable)'
    },
    {
      id: 'projectedValueDifference',
      name: 'Projected Value Difference',
      type: 'currency',
      unit: 'USD',
      description: 'Difference in projected value between options'
    },
    {
      id: 'breakEvenYears',
      name: 'Break-Even Years',
      type: 'number',
      unit: 'years',
      description: 'Years to break even on rollover costs'
    },
    {
      id: 'currentPlanValue',
      name: 'Current Plan Value',
      type: 'currency',
      unit: 'USD',
      description: 'Projected value if keeping current plan'
    },
    {
      id: 'rolloverPlanValue',
      name: 'Rollover Plan Value',
      type: 'currency',
      unit: 'USD',
      description: 'Projected value if rolling over'
    },
    {
      id: 'feeEfficiencyScore',
      name: 'Fee Efficiency Score',
      type: 'number',
      unit: 'score',
      description: 'Fee efficiency comparison score (0-100)'
    },
    {
      id: 'investmentOptionsScore',
      name: 'Investment Options Score',
      type: 'number',
      unit: 'score',
      description: 'Investment options comparison score (0-100)'
    },
    {
      id: 'taxEfficiencyScore',
      name: 'Tax Efficiency Score',
      type: 'number',
      unit: 'score',
      description: 'Tax efficiency score (0-100)'
    },
    {
      id: 'liquidityScore',
      name: 'Liquidity Score',
      type: 'number',
      unit: 'score',
      description: 'Liquidity and access score (0-100)'
    },
    {
      id: 'employerMatchValue',
      name: 'Employer Match Value',
      type: 'currency',
      unit: 'USD',
      description: 'Value of employer match in new plan'
    },
    {
      id: 'loanRepaymentImpact',
      name: 'Loan Repayment Impact',
      type: 'currency',
      unit: 'USD',
      description: 'Impact of loan repayment on rollover decision'
    },
    {
      id: 'afterTaxRolloverValue',
      name: 'After-Tax Rollover Value',
      type: 'currency',
      unit: 'USD',
      description: 'Value of after-tax contributions rollover'
    },
    {
      id: 'rothRolloverValue',
      name: 'Roth Rollover Value',
      type: 'currency',
      unit: 'USD',
      description: 'Value of Roth 401(k) rollover'
    },
    {
      id: 'nuaTaxSavings',
      name: 'NUA Tax Savings',
      type: 'currency',
      unit: 'USD',
      description: 'Tax savings from Net Unrealized Appreciation'
    },
    {
      id: 'earlyWithdrawalPenalty',
      name: 'Early Withdrawal Penalty',
      type: 'currency',
      unit: 'USD',
      description: 'Potential early withdrawal penalty'
    },
    {
      id: 'requiredMinimumDistributions',
      name: 'RMD Impact',
      type: 'currency',
      unit: 'USD',
      description: 'Impact of Required Minimum Distributions'
    },
    {
      id: 'estatePlanningBenefits',
      name: 'Estate Planning Benefits',
      type: 'currency',
      unit: 'USD',
      description: 'Estate planning benefits value'
    },
    {
      id: 'administrativeComplexity',
      name: 'Administrative Complexity',
      type: 'string',
      unit: 'complexity',
      description: 'Administrative complexity level'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'string',
      unit: 'risk',
      description: 'Overall risk assessment'
    },
    {
      id: 'timelineRecommendation',
      name: 'Timeline Recommendation',
      type: 'string',
      unit: 'timeline',
      description: 'Recommended timeline for rollover'
    },
    {
      id: 'costBenefitRatio',
      name: 'Cost-Benefit Ratio',
      type: 'number',
      unit: 'ratio',
      description: 'Cost-benefit ratio of rollover'
    },
    {
      id: 'netPresentValue',
      name: 'Net Present Value',
      type: 'currency',
      unit: 'USD',
      description: 'Net present value of rollover decision'
    },
    {
      id: 'sensitivityAnalysis',
      name: 'Sensitivity Analysis',
      type: 'string',
      unit: 'analysis',
      description: 'Sensitivity analysis results'
    }
  ],
  calculate: calculate401kRollover,
  generateReport: generate401kRolloverAnalysis
};

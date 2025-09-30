import { Calculator } from '../../../types/calculator';
import { RetirementInputs, RetirementResults } from './types';
import { calculateRetirement } from './formulas';
import { getRetirementValidationRules } from './validation';

export const retirementCalculator: Calculator = {
  id: 'retirement-calculator',
  title: 'Retirement Calculator',
  category: 'finance',
  subcategory: 'Retirement Planning',
  description: 'Comprehensive retirement planning calculator with Social Security optimization, healthcare costs, tax planning, and scenario analysis for secure retirement.',
  usageInstructions: [
    'Enter your current age, retirement age, and life expectancy',
    'Input current savings, monthly contributions, and income',
    'Specify expected returns, inflation, and risk tolerance',
    'Include Social Security benefits and pension information',
    'Review retirement projections, income sources, and recommendations',
    'Analyze different scenarios and risk factors',
    'Get personalized retirement planning advice'
  ],

  inputs: [
    // Personal Information
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '35',
      tooltip: 'Your current age',
      defaultValue: 35,
      min: 18,
      max: 80,
      step: 1
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Age you plan to retire',
      defaultValue: 65,
      min: 50,
      max: 80,
      step: 1
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      placeholder: '85',
      tooltip: 'Expected lifespan',
      defaultValue: 85,
      min: 70,
      max: 100,
      step: 1
    },

    // Current Financial Situation
    {
      id: 'currentSavings',
      label: 'Current Retirement Savings',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Current amount in retirement accounts',
      defaultValue: 100000,
      min: 0,
      max: 10000000,
      step: 1000
    },
    {
      id: 'monthlySavings',
      label: 'Monthly Retirement Savings',
      type: 'currency',
      required: true,
      placeholder: '1000',
      tooltip: 'Monthly contribution to retirement accounts',
      defaultValue: 1000,
      min: 0,
      max: 100000,
      step: 100
    },
    {
      id: 'annualIncome',
      label: 'Annual Income',
      type: 'currency',
      required: true,
      placeholder: '75000',
      tooltip: 'Current annual income before taxes',
      defaultValue: 75000,
      min: 0,
      max: 10000000,
      step: 1000
    },
    {
      id: 'annualExpenses',
      label: 'Annual Expenses',
      type: 'currency',
      required: true,
      placeholder: '50000',
      tooltip: 'Current annual expenses',
      defaultValue: 50000,
      min: 0,
      max: 10000000,
      step: 1000
    },

    // Expected Returns & Inflation
    {
      id: 'expectedAnnualReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '7',
      tooltip: 'Expected annual investment return',
      defaultValue: 7,
      min: -10,
      max: 50,
      step: 0.5
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '3',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 3,
      min: -5,
      max: 20,
      step: 0.1
    },
    {
      id: 'salaryGrowthRate',
      label: 'Salary Growth Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual salary increase',
      defaultValue: 3,
      min: -5,
      max: 15,
      step: 0.5
    },

    // Retirement Income Sources
    {
      id: 'socialSecurityBenefit',
      label: 'Monthly Social Security Benefit',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Expected monthly Social Security benefit',
      defaultValue: 2000,
      min: 0,
      max: 50000,
      step: 100
    },
    {
      id: 'socialSecurityStartAge',
      label: 'Social Security Start Age',
      type: 'number',
      required: false,
      placeholder: '67',
      tooltip: 'Age to start Social Security benefits',
      defaultValue: 67,
      min: 62,
      max: 70,
      step: 1
    },
    {
      id: 'pensionAmount',
      label: 'Monthly Pension Amount',
      type: 'currency',
      required: false,
      placeholder: '1500',
      tooltip: 'Expected monthly pension benefit',
      defaultValue: 1500,
      min: 0,
      max: 100000,
      step: 100
    },
    {
      id: 'otherIncome',
      label: 'Other Monthly Income',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Other retirement income sources',
      defaultValue: 500,
      min: 0,
      max: 100000,
      step: 100
    },

    // Retirement Expenses
    {
      id: 'retirementAnnualExpenses',
      label: 'Retirement Annual Expenses',
      type: 'currency',
      required: false,
      placeholder: '45000',
      tooltip: 'Expected annual expenses in retirement',
      defaultValue: 45000,
      min: 0,
      max: 10000000,
      step: 1000
    },
    {
      id: 'healthcareCosts',
      label: 'Annual Healthcare Costs',
      type: 'currency',
      required: false,
      placeholder: '8000',
      tooltip: 'Expected annual healthcare expenses',
      defaultValue: 8000,
      min: 0,
      max: 100000,
      step: 500
    },
    {
      id: 'longTermCareCosts',
      label: 'Annual Long-Term Care Costs',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Expected annual long-term care expenses',
      defaultValue: 0,
      min: 0,
      max: 500000,
      step: 1000
    },

    // Tax Considerations
    {
      id: 'currentTaxRate',
      label: 'Current Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Current marginal tax rate',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'retirementTaxRate',
      label: 'Retirement Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '20',
      tooltip: 'Expected tax rate in retirement',
      defaultValue: 20,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'taxDeferred',
      label: 'Tax-Deferred Accounts',
      type: 'boolean',
      required: false,
      tooltip: 'Whether savings are in tax-deferred accounts',
      defaultValue: true
    },

    // Risk Parameters
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: true,
      options: [
        { value: 'conservative', label: 'Conservative - Lower risk, stable returns' },
        { value: 'moderate', label: 'Moderate - Balanced risk and returns' },
        { value: 'aggressive', label: 'Aggressive - Higher risk, higher potential returns' }
      ],
      defaultValue: 'moderate',
      tooltip: 'Your willingness to accept investment risk'
    },
    {
      id: 'marketVolatility',
      label: 'Market Volatility (%)',
      type: 'percentage',
      required: true,
      placeholder: '12',
      tooltip: 'Expected market volatility',
      defaultValue: 12,
      min: 0,
      max: 100,
      step: 1
    },

    // Scenario Analysis
    {
      id: 'includeMarketCrash',
      label: 'Include Market Crash Scenario',
      type: 'boolean',
      required: false,
      tooltip: 'Analyze impact of market downturns',
      defaultValue: false
    },
    {
      id: 'bearMarketDuration',
      label: 'Bear Market Duration (Months)',
      type: 'number',
      required: false,
      placeholder: '24',
      tooltip: 'Expected duration of market downturn',
      defaultValue: 24,
      min: 1,
      max: 120,
      step: 1
    },
    {
      id: 'recoveryTime',
      label: 'Recovery Time (Months)',
      type: 'number',
      required: false,
      placeholder: '36',
      tooltip: 'Time for market to recover',
      defaultValue: 36,
      min: 1,
      max: 120,
      step: 1
    },

    // Advanced Options
    {
      id: 'includeInheritance',
      label: 'Include Inheritance',
      type: 'boolean',
      required: false,
      tooltip: 'Include expected inheritance in calculations',
      defaultValue: false
    },
    {
      id: 'inheritanceAmount',
      label: 'Expected Inheritance',
      type: 'currency',
      required: false,
      placeholder: '100000',
      tooltip: 'Expected inheritance amount',
      defaultValue: 100000,
      min: 0,
      max: 10000000,
      step: 10000
    },
    {
      id: 'inheritanceAge',
      label: 'Inheritance Age',
      type: 'number',
      required: false,
      placeholder: '70',
      tooltip: 'Age when inheritance will be received',
      defaultValue: 70,
      min: 18,
      max: 100,
      step: 1
    },

    // Withdrawal Strategy
    {
      id: 'withdrawalRate',
      label: 'Safe Withdrawal Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '4',
      tooltip: 'Safe annual withdrawal rate (4% rule)',
      defaultValue: 4,
      min: 2,
      max: 10,
      step: 0.5
    },
    {
      id: 'withdrawalInflationAdjusted',
      label: 'Inflation-Adjusted Withdrawals',
      type: 'boolean',
      required: false,
      tooltip: 'Increase withdrawals with inflation',
      defaultValue: true
    },

    // Healthcare Planning
    {
      id: 'medicareStartAge',
      label: 'Medicare Start Age',
      type: 'number',
      required: false,
      placeholder: '65',
      tooltip: 'Age to start Medicare coverage',
      defaultValue: 65,
      min: 65,
      max: 70,
      step: 1
    },
    {
      id: 'supplementalInsurance',
      label: 'Supplemental Insurance Cost',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Monthly supplemental insurance premium',
      defaultValue: 200,
      min: 0,
      max: 10000,
      step: 50
    },

    // Lifestyle Adjustments
    {
      id: 'retirementLocation',
      label: 'Retirement Location',
      type: 'select',
      required: false,
      options: [
        { value: 'current', label: 'Current location' },
        { value: 'lower_cost', label: 'Lower cost area' },
        { value: 'higher_cost', label: 'Higher cost area' }
      ],
      defaultValue: 'current',
      tooltip: 'Where you plan to live in retirement'
    },
    {
      id: 'lifestyleChange',
      label: 'Lifestyle Change',
      type: 'select',
      required: false,
      options: [
        { value: 'maintain', label: 'Maintain current lifestyle' },
        { value: 'reduce_20', label: 'Reduce expenses by 20%' },
        { value: 'reduce_40', label: 'Reduce expenses by 40%' },
        { value: 'luxury', label: 'Upgrade to luxury lifestyle' }
      ],
      defaultValue: 'maintain',
      tooltip: 'Expected lifestyle changes in retirement'
    },

    // Legacy Planning
    {
      id: 'leaveLegacy',
      label: 'Leave Legacy',
      type: 'boolean',
      required: false,
      tooltip: 'Plan to leave money to heirs',
      defaultValue: false
    },
    {
      id: 'legacyAmount',
      label: 'Legacy Amount',
      type: 'currency',
      required: false,
      placeholder: '500000',
      tooltip: 'Amount to leave to heirs',
      defaultValue: 500000,
      min: 0,
      max: 10000000,
      step: 10000
    }
  ],

  outputs: [
    // Basic Projections
    {
      id: 'yearsToRetirement',
      label: 'Years to Retirement',
      type: 'number',
      explanation: 'Years until you reach retirement age'
    },
    {
      id: 'totalSavingsAtRetirement',
      label: 'Total Savings at Retirement',
      type: 'currency',
      explanation: 'Projected retirement savings balance'
    },
    {
      id: 'monthlyRetirementIncome',
      label: 'Monthly Retirement Income',
      type: 'currency',
      explanation: 'Expected monthly income in retirement'
    },
    {
      id: 'annualRetirementIncome',
      label: 'Annual Retirement Income',
      type: 'currency',
      explanation: 'Expected annual income in retirement'
    },

    // Income Sources Breakdown
    {
      id: 'savingsIncome',
      label: 'Income from Savings',
      type: 'currency',
      explanation: 'Annual income from retirement savings'
    },
    {
      id: 'socialSecurityIncome',
      label: 'Social Security Income',
      type: 'currency',
      explanation: 'Annual Social Security benefits'
    },
    {
      id: 'pensionIncome',
      label: 'Pension Income',
      type: 'currency',
      explanation: 'Annual pension benefits'
    },
    {
      id: 'totalIncome',
      label: 'Total Annual Income',
      type: 'currency',
      explanation: 'Total annual retirement income from all sources'
    },

    // Expense Analysis
    {
      id: 'annualExpenses',
      label: 'Annual Expenses',
      type: 'currency',
      explanation: 'Expected annual expenses in retirement'
    },
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses',
      type: 'currency',
      explanation: 'Expected monthly expenses in retirement'
    },
    {
      id: 'expenseCoverage',
      label: 'Income to Expense Ratio',
      type: 'percentage',
      explanation: 'How well income covers expenses (100% = break even)'
    },

    // Savings Analysis
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount contributed to retirement accounts'
    },
    {
      id: 'totalGrowth',
      label: 'Total Investment Growth',
      type: 'currency',
      explanation: 'Total growth from investments'
    },
    {
      id: 'requiredMonthlySavings',
      label: 'Required Monthly Savings',
      type: 'currency',
      explanation: 'Monthly savings needed to reach goals'
    },
    {
      id: 'savingsGap',
      label: 'Savings Gap',
      type: 'currency',
      explanation: 'Additional savings needed annually'
    },

    // Risk Analysis
    {
      id: 'successProbability',
      label: 'Retirement Success Probability',
      type: 'percentage',
      explanation: 'Probability of meeting retirement goals'
    },
    {
      id: 'failureProbability',
      label: 'Failure Probability',
      type: 'percentage',
      explanation: 'Probability of not meeting retirement goals'
    },
    {
      id: 'riskAdjustedIncome',
      label: 'Risk-Adjusted Income',
      type: 'currency',
      explanation: 'Income adjusted for investment risk'
    },

    // Scenario Projections
    {
      id: 'conservativeProjection',
      label: 'Conservative Scenario',
      type: 'currency',
      explanation: 'Retirement savings in conservative scenario'
    },
    {
      id: 'moderateProjection',
      label: 'Moderate Scenario',
      type: 'currency',
      explanation: 'Retirement savings in moderate scenario'
    },
    {
      id: 'aggressiveProjection',
      label: 'Aggressive Scenario',
      type: 'currency',
      explanation: 'Retirement savings in aggressive scenario'
    },

    // Withdrawal Analysis
    {
      id: 'safeWithdrawalAmount',
      label: 'Safe Annual Withdrawal',
      type: 'currency',
      explanation: 'Safe annual withdrawal amount'
    },
    {
      id: 'sustainableWithdrawalRate',
      label: 'Sustainable Withdrawal Rate',
      type: 'percentage',
      explanation: 'Maximum safe withdrawal rate'
    },
    {
      id: 'portfolioLongevity',
      label: 'Portfolio Longevity (Years)',
      type: 'number',
      explanation: 'Years savings will last with current withdrawals'
    },

    // Tax Analysis
    {
      id: 'preTaxIncome',
      label: 'Pre-Tax Income',
      type: 'currency',
      explanation: 'Total income before taxes'
    },
    {
      id: 'afterTaxIncome',
      label: 'After-Tax Income',
      type: 'currency',
      explanation: 'Income after taxes'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Taxes saved through tax-advantaged accounts'
    },

    // Healthcare Costs
    {
      id: 'totalHealthcareCosts',
      label: 'Total Healthcare Costs',
      type: 'currency',
      explanation: 'Total healthcare expenses in retirement'
    },
    {
      id: 'medicareSavings',
      label: 'Medicare Savings',
      type: 'currency',
      explanation: 'Healthcare costs covered by Medicare'
    },
    {
      id: 'outOfPocketHealthcare',
      label: 'Out-of-Pocket Healthcare',
      type: 'currency',
      explanation: 'Healthcare costs you pay out of pocket'
    },

    // Lifestyle Analysis
    {
      id: 'locationAdjustment',
      label: 'Location Cost Adjustment',
      type: 'percentage',
      explanation: 'Cost adjustment based on retirement location'
    },
    {
      id: 'lifestyleAdjustment',
      label: 'Lifestyle Cost Adjustment',
      type: 'percentage',
      explanation: 'Cost adjustment based on lifestyle changes'
    },
    {
      id: 'adjustedExpenses',
      label: 'Adjusted Annual Expenses',
      type: 'currency',
      explanation: 'Expenses after location and lifestyle adjustments'
    },

    // Legacy Planning
    {
      id: 'legacyValue',
      label: 'Legacy Value',
      type: 'currency',
      explanation: 'Amount available for legacy at end of life'
    },
    {
      id: 'inheritanceTax',
      label: 'Inheritance Tax',
      type: 'currency',
      explanation: 'Taxes on inheritance'
    },
    {
      id: 'netLegacy',
      label: 'Net Legacy',
      type: 'currency',
      explanation: 'Amount heirs will receive after taxes'
    },

    // Milestone Analysis
    {
      id: 'age65Balance',
      label: 'Balance at Age 65',
      type: 'currency',
      explanation: 'Projected savings balance at age 65'
    },
    {
      id: 'age70Balance',
      label: 'Balance at Age 70',
      type: 'currency',
      explanation: 'Projected savings balance at age 70'
    },
    {
      id: 'age75Balance',
      label: 'Balance at Age 75',
      type: 'currency',
      explanation: 'Projected savings balance at age 75'
    },
    {
      id: 'age80Balance',
      label: 'Balance at Age 80',
      type: 'currency',
      explanation: 'Projected savings balance at age 80'
    },

    // Sensitivity Analysis
    {
      id: 'incomeSensitivity',
      label: 'Income Sensitivity Analysis',
      type: 'text',
      explanation: 'How different return rates affect retirement savings'
    },
    {
      id: 'expenseSensitivity',
      label: 'Expense Sensitivity Analysis',
      type: 'text',
      explanation: 'How different expense levels affect retirement'
    },

    // Recommendations
    {
      id: 'recommendedSavingsIncrease',
      label: 'Recommended Savings Increase',
      type: 'currency',
      explanation: 'Additional monthly savings recommended'
    },
    {
      id: 'recommendedRetirementAge',
      label: 'Recommended Retirement Age',
      type: 'number',
      explanation: 'Suggested retirement age based on calculations'
    },
    {
      id: 'riskAdjustment',
      label: 'Risk Adjustment Recommendation',
      type: 'text',
      explanation: 'Recommended changes to risk tolerance'
    },
    {
      id: 'strategyRecommendations',
      label: 'Strategy Recommendations',
      type: 'text',
      explanation: 'Personalized retirement strategy recommendations'
    },

    // Emergency Planning
    {
      id: 'emergencyFundNeeded',
      label: 'Emergency Fund Needed',
      type: 'currency',
      explanation: 'Recommended emergency fund size'
    },
    {
      id: 'emergencyFundProgress',
      label: 'Emergency Fund Progress',
      type: 'percentage',
      explanation: 'Progress toward recommended emergency fund'
    },

    // Social Security Optimization
    {
      id: 'optimalClaimingAge',
      label: 'Optimal Social Security Age',
      type: 'number',
      explanation: 'Best age to start Social Security benefits'
    },
    {
      id: 'claimingStrategy',
      label: 'Claiming Strategy',
      type: 'text',
      explanation: 'Recommended Social Security claiming strategy'
    },
    {
      id: 'benefitComparison',
      label: 'Benefit Comparison',
      type: 'text',
      explanation: 'Comparison of benefits at different claiming ages'
    },

    // Investment Allocation
    {
      id: 'recommendedAllocation',
      label: 'Recommended Allocation',
      type: 'text',
      explanation: 'Suggested asset allocation for your situation'
    },

    // Longevity Risk
    {
      id: 'longevityAdjustment',
      label: 'Longevity Adjustment',
      type: 'percentage',
      explanation: 'Additional savings needed for longer life'
    },
    {
      id: 'additionalSavingsNeeded',
      label: 'Additional Savings Needed',
      type: 'currency',
      explanation: 'Extra savings required for longevity risk'
    },

    // Inflation Impact
    {
      id: 'inflationAdjustedIncome',
      label: 'Inflation-Adjusted Income',
      type: 'currency',
      explanation: 'Retirement income adjusted for inflation'
    },
    {
      id: 'purchasingPower',
      label: 'Purchasing Power',
      type: 'percentage',
      explanation: 'Percentage of purchasing power maintained'
    },

    // Success Metrics
    {
      id: 'retirementReadinessScore',
      label: 'Retirement Readiness Score',
      type: 'number',
      explanation: 'Overall retirement preparedness score (0-100)'
    },
    {
      id: 'confidenceLevel',
      label: 'Confidence Level',
      type: 'percentage',
      explanation: 'Confidence in meeting retirement goals'
    },
    {
      id: 'actionItems',
      label: 'Action Items',
      type: 'text',
      explanation: 'Specific steps to improve retirement readiness'
    }
  ],

  formulas: [],

  validationRules: getRetirementValidationRules(),

  examples: [
    {
      title: 'Early Retirement Planning',
      description: 'Planning for retirement at age 55 with aggressive savings',
      inputs: {
        currentAge: 35,
        retirementAge: 55,
        lifeExpectancy: 85,
        currentSavings: 150000,
        monthlySavings: 2500,
        annualIncome: 90000,
        annualExpenses: 60000,
        expectedAnnualReturn: 8,
        inflationRate: 3,
        riskTolerance: 'moderate',
        marketVolatility: 12,
        currentTaxRate: 28,
        retirementTaxRate: 22,
        taxDeferred: true,
        socialSecurityBenefit: 2500,
        socialSecurityStartAge: 67,
        healthcareCosts: 10000
      },
      expectedOutputs: {
        totalSavingsAtRetirement: 2500000,
        monthlyRetirementIncome: 8500,
        successProbability: 85,
        retirementReadinessScore: 78
      }
    },
    {
      title: 'Conservative Retirement Planning',
      description: 'Traditional retirement planning with conservative assumptions',
      inputs: {
        currentAge: 45,
        retirementAge: 67,
        lifeExpectancy: 90,
        currentSavings: 300000,
        monthlySavings: 1500,
        annualIncome: 75000,
        annualExpenses: 55000,
        expectedAnnualReturn: 6,
        inflationRate: 2.5,
        riskTolerance: 'conservative',
        marketVolatility: 8,
        currentTaxRate: 24,
        retirementTaxRate: 18,
        taxDeferred: true,
        socialSecurityBenefit: 2000,
        pensionAmount: 1200,
        healthcareCosts: 8000
      },
      expectedOutputs: {
        totalSavingsAtRetirement: 1200000,
        monthlyRetirementIncome: 6200,
        successProbability: 92,
        retirementReadinessScore: 85
      }
    },
    {
      title: 'Late Retirement Planning',
      description: 'Planning for retirement at age 70 with moderate savings',
      inputs: {
        currentAge: 50,
        retirementAge: 70,
        lifeExpectancy: 95,
        currentSavings: 500000,
        monthlySavings: 1000,
        annualIncome: 80000,
        annualExpenses: 65000,
        expectedAnnualReturn: 7,
        inflationRate: 3,
        riskTolerance: 'moderate',
        marketVolatility: 10,
        currentTaxRate: 26,
        retirementTaxRate: 20,
        taxDeferred: true,
        socialSecurityBenefit: 2800,
        healthcareCosts: 12000,
        includeMarketCrash: true,
        bearMarketDuration: 24,
        recoveryTime: 36
      },
      expectedOutputs: {
        totalSavingsAtRetirement: 1800000,
        monthlyRetirementIncome: 7800,
        successProbability: 88,
        retirementReadinessScore: 82
      }
    }
  ]
};

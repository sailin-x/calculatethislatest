import { Calculator } from '../../types/calculator';
import { InvestmentInputs, InvestmentResults } from './types';
import { calculateInvestment, validateInvestmentInputs } from './formulas';
import { getInvestmentValidationRules } from './validation';

export const investmentCalculator: Calculator = {
  id: 'investment-calculator',
  title: 'Investment Calculator',
  category: 'finance',
  subcategory: 'Investment Planning',
  description: 'Comprehensive investment calculator with portfolio analysis, risk assessment, scenario modeling, and retirement planning tools for informed investment decisions.',
  usageInstructions: [
    'Enter your initial investment amount and monthly contribution',
    'Specify investment time horizon and expected annual return',
    'Set your risk tolerance and asset allocation preferences',
    'Include inflation rate and tax considerations',
    'Review performance metrics, risk analysis, and scenario projections',
    'Analyze goal achievement probability and required contributions',
    'Compare different investment strategies and benchmark performance'
  ],

  inputs: [
    // Initial Investment
    {
      id: 'initialInvestment',
      label: 'Initial Investment',
      type: 'currency',
      required: true,
      placeholder: '10000',
      tooltip: 'Amount you will invest initially',
      defaultValue: 10000,
      min: 0,
      max: 10000000,
      step: 1000
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Amount you will add each month',
      defaultValue: 500,
      min: 0,
      max: 100000,
      step: 50
    },

    // Time Horizon
    {
      id: 'investmentPeriodYears',
      label: 'Investment Period (Years)',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'How long you plan to invest',
      defaultValue: 30,
      min: 1,
      max: 100,
      step: 1
    },
    {
      id: 'investmentPeriodMonths',
      label: 'Additional Months',
      type: 'number',
      required: false,
      placeholder: '0',
      tooltip: 'Additional months beyond years',
      defaultValue: 0,
      min: 0,
      max: 11,
      step: 1
    },

    // Expected Returns
    {
      id: 'expectedAnnualReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '8',
      tooltip: 'Expected annual investment return',
      defaultValue: 8,
      min: -10,
      max: 50,
      step: 0.5
    },
    {
      id: 'expectedAnnualReturnMin',
      label: 'Conservative Return (%)',
      type: 'percentage',
      required: false,
      placeholder: '4',
      tooltip: 'Minimum expected return (conservative estimate)',
      defaultValue: 4,
      min: -10,
      max: 50,
      step: 0.5
    },
    {
      id: 'expectedAnnualReturnMax',
      label: 'Aggressive Return (%)',
      type: 'percentage',
      required: false,
      placeholder: '12',
      tooltip: 'Maximum expected return (aggressive estimate)',
      defaultValue: 12,
      min: -10,
      max: 50,
      step: 0.5
    },

    // Risk Parameters
    {
      id: 'volatility',
      label: 'Portfolio Volatility (%)',
      type: 'percentage',
      required: true,
      placeholder: '12',
      tooltip: 'Expected annual volatility of your portfolio',
      defaultValue: 12,
      min: 0,
      max: 100,
      step: 1
    },
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: true,
      options: [
        { value: 'conservative', label: 'Conservative - Lower risk, lower returns' },
        { value: 'moderate', label: 'Moderate - Balanced risk and returns' },
        { value: 'aggressive', label: 'Aggressive - Higher risk, higher returns' }
      ],
      defaultValue: 'moderate',
      tooltip: 'Your willingness to accept investment risk'
    },

    // Inflation & Taxes
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
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Your marginal tax rate',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'taxDeferred',
      label: 'Tax-Deferred Account',
      type: 'boolean',
      required: false,
      tooltip: 'Whether investments are in a tax-deferred account (401k, IRA)',
      defaultValue: false
    },

    // Investment Strategy
    {
      id: 'investmentStrategy',
      label: 'Investment Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'lump_sum', label: 'Lump Sum - One-time investment' },
        { value: 'monthly_contributions', label: 'Monthly Contributions' },
        { value: 'both', label: 'Both - Initial + Monthly' }
      ],
      defaultValue: 'both',
      tooltip: 'How you will make your investments'
    },
    {
      id: 'rebalanceFrequency',
      label: 'Rebalancing Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'never', label: 'Never - Buy and hold' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' }
      ],
      defaultValue: 'annually',
      tooltip: 'How often to rebalance your portfolio'
    },

    // Asset Allocation
    {
      id: 'stockAllocation',
      label: 'Stock Allocation (%)',
      type: 'percentage',
      required: true,
      placeholder: '60',
      tooltip: 'Percentage of portfolio in stocks',
      defaultValue: 60,
      min: 0,
      max: 100,
      step: 5
    },
    {
      id: 'bondAllocation',
      label: 'Bond Allocation (%)',
      type: 'percentage',
      required: true,
      placeholder: '30',
      tooltip: 'Percentage of portfolio in bonds',
      defaultValue: 30,
      min: 0,
      max: 100,
      step: 5
    },
    {
      id: 'cashAllocation',
      label: 'Cash Allocation (%)',
      type: 'percentage',
      required: true,
      placeholder: '10',
      tooltip: 'Percentage of portfolio in cash',
      defaultValue: 10,
      min: 0,
      max: 100,
      step: 5
    },

    // Advanced Options
    {
      id: 'includeDividends',
      label: 'Include Dividend Income',
      type: 'boolean',
      required: false,
      tooltip: 'Whether to include dividend payments in calculations',
      defaultValue: true
    },
    {
      id: 'dividendYield',
      label: 'Dividend Yield (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Expected annual dividend yield',
      defaultValue: 2.5,
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      id: 'expenseRatio',
      label: 'Expense Ratio (%)',
      type: 'percentage',
      required: false,
      placeholder: '0.5',
      tooltip: 'Annual expense ratio of your investments',
      defaultValue: 0.5,
      min: 0,
      max: 5,
      step: 0.01
    },
    {
      id: 'managementFee',
      label: 'Management Fee (%)',
      type: 'percentage',
      required: false,
      placeholder: '1.0',
      tooltip: 'Annual management fee',
      defaultValue: 1.0,
      min: 0,
      max: 5,
      step: 0.1
    },

    // Goal Setting
    {
      id: 'targetAmount',
      label: 'Target Amount',
      type: 'currency',
      required: false,
      placeholder: '1000000',
      tooltip: 'Investment goal you want to achieve',
      defaultValue: 1000000,
      min: 0,
      max: 100000000,
      step: 10000
    },
    {
      id: 'riskAdjustedTarget',
      label: 'Risk-Adjusted Target',
      type: 'boolean',
      required: false,
      tooltip: 'Adjust target based on your risk tolerance',
      defaultValue: true
    },

    // Scenario Analysis
    {
      id: 'marketCrashScenario',
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

    // Withdrawal Planning
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
      id: 'withdrawalStartYear',
      label: 'Withdrawal Start Year',
      type: 'number',
      required: false,
      placeholder: '30',
      tooltip: 'Year when you plan to start withdrawals',
      defaultValue: 30,
      min: 1,
      max: 100,
      step: 1
    },
    {
      id: 'withdrawalInflationAdjusted',
      label: 'Inflation-Adjusted Withdrawals',
      type: 'boolean',
      required: false,
      tooltip: 'Increase withdrawals with inflation',
      defaultValue: true
    },

    // Comparison Options
    {
      id: 'compareStrategies',
      label: 'Compare Investment Strategies',
      type: 'boolean',
      required: false,
      tooltip: 'Compare different investment approaches',
      defaultValue: true
    },
    {
      id: 'benchmarkIndex',
      label: 'Benchmark Index',
      type: 'select',
      required: false,
      options: [
        { value: 'sp500', label: 'S&P 500' },
        { value: 'nasdaq', label: 'NASDAQ' },
        { value: 'dow_jones', label: 'Dow Jones' },
        { value: 'custom', label: 'Custom Benchmark' }
      ],
      defaultValue: 'sp500',
      tooltip: 'Index to compare your portfolio against'
    },
    {
      id: 'customBenchmarkReturn',
      label: 'Custom Benchmark Return (%)',
      type: 'percentage',
      required: false,
      placeholder: '8',
      tooltip: 'Return rate for custom benchmark',
      defaultValue: 8,
      min: -10,
      max: 50,
      step: 0.5
    },

    // Analysis Options
    {
      id: 'prepaymentAnalysis',
      label: 'Include Prepayment Analysis',
      type: 'boolean',
      required: false,
      tooltip: 'Analyze impact of early withdrawals',
      defaultValue: false
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: false,
      placeholder: '30',
      tooltip: 'Years to analyze in projections',
      defaultValue: 30,
      min: 1,
      max: 100,
      step: 1
    }
  ],

  outputs: [
    // Basic Projections
    {
      id: 'finalBalance',
      label: 'Final Balance',
      type: 'currency',
      explanation: 'Projected portfolio value at the end of investment period'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount invested (initial + contributions)'
    },
    {
      id: 'totalGrowth',
      label: 'Total Growth',
      type: 'currency',
      explanation: 'Total investment growth from returns'
    },
    {
      id: 'totalDividends',
      label: 'Total Dividends',
      type: 'currency',
      explanation: 'Total dividend income earned'
    },

    // Performance Metrics
    {
      id: 'compoundAnnualGrowthRate',
      label: 'Compound Annual Growth Rate (CAGR)',
      type: 'percentage',
      explanation: 'Average annual growth rate of your investment'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return (IRR)',
      type: 'percentage',
      explanation: 'True rate of return considering cash flow timing'
    },
    {
      id: 'sharpeRatio',
      label: 'Sharpe Ratio',
      type: 'number',
      explanation: 'Risk-adjusted return measure (higher is better)'
    },
    {
      id: 'sortinoRatio',
      label: 'Sortino Ratio',
      type: 'number',
      explanation: 'Risk-adjusted return considering only downside volatility'
    },

    // Risk Metrics
    {
      id: 'volatility',
      label: 'Portfolio Volatility',
      type: 'percentage',
      explanation: 'Expected annual volatility of your portfolio'
    },
    {
      id: 'maximumDrawdown',
      label: 'Maximum Drawdown',
      type: 'percentage',
      explanation: 'Largest PeakToTrough decline in portfolio value'
    },
    {
      id: 'valueAtRisk',
      label: 'Value at Risk (95%)',
      type: 'currency',
      explanation: 'Maximum expected loss over one year with 95% confidence'
    },
    {
      id: 'expectedShortfall',
      label: 'Expected Shortfall',
      type: 'currency',
      explanation: 'Average loss in the worst 5% of scenarios'
    },

    // Time-Weighted Returns
    {
      id: 'timeWeightedReturn',
      label: 'Time-Weighted Return',
      type: 'percentage',
      explanation: 'Return that eliminates impact of cash flows'
    },
    {
      id: 'moneyWeightedReturn',
      label: 'Money-Weighted Return',
      type: 'percentage',
      explanation: 'Return that considers timing of cash flows'
    },

    // Scenario Analysis
    {
      id: 'conservativeProjection',
      label: 'Conservative Projection',
      type: 'currency',
      explanation: 'Projection using conservative return assumptions'
    },
    {
      id: 'moderateProjection',
      label: 'Moderate Projection',
      type: 'currency',
      explanation: 'Projection using moderate return assumptions'
    },
    {
      id: 'aggressiveProjection',
      label: 'Aggressive Projection',
      type: 'currency',
      explanation: 'Projection using aggressive return assumptions'
    },

    // Risk-Adjusted Projections
    {
      id: 'riskAdjustedReturn',
      label: 'Risk-Adjusted Return',
      type: 'percentage',
      explanation: 'Return adjusted for portfolio risk level'
    },
    {
      id: 'riskAdjustedFinalBalance',
      label: 'Risk-Adjusted Final Balance',
      type: 'currency',
      explanation: 'Final balance adjusted for risk considerations'
    },

    // Goal Achievement
    {
      id: 'goalAchievementProbability',
      label: 'Goal Achievement Probability',
      type: 'percentage',
      explanation: 'Probability of reaching your target amount'
    },
    {
      id: 'yearsToReachGoal',
      label: 'Years to Reach Goal',
      type: 'number',
      explanation: 'Years required to reach your target amount'
    },
    {
      id: 'requiredMonthlyContribution',
      label: 'Required Monthly Contribution',
      type: 'currency',
      explanation: 'Monthly amount needed to reach your goal'
    },

    // Withdrawal Analysis
    {
      id: 'safeWithdrawalAmount',
      label: 'Safe Annual Withdrawal',
      type: 'currency',
      explanation: 'Safe annual withdrawal amount based on 4% rule'
    },
    {
      id: 'sustainableWithdrawalRate',
      label: 'Sustainable Withdrawal Rate',
      type: 'percentage',
      explanation: 'Maximum safe withdrawal rate for your portfolio'
    },
    {
      id: 'portfolioLongevity',
      label: 'Portfolio Longevity (Years)',
      type: 'number',
      explanation: 'Years your portfolio can sustain withdrawals'
    },

    // Tax Analysis
    {
      id: 'taxableGrowth',
      label: 'Taxable Growth',
      type: 'currency',
      explanation: 'Investment growth subject to taxation'
    },
    {
      id: 'taxDeferredGrowth',
      label: 'Tax-Deferred Growth',
      type: 'currency',
      explanation: 'Investment growth in tax-advantaged accounts'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Taxes saved through tax-advantaged investing'
    },
    {
      id: 'afterTaxFinalBalance',
      label: 'After-Tax Final Balance',
      type: 'currency',
      explanation: 'Final balance after accounting for taxes'
    },

    // Benchmark Comparison
    {
      id: 'benchmarkReturn',
      label: 'Benchmark Return',
      type: 'percentage',
      explanation: 'Return of the selected benchmark index'
    },
    {
      id: 'outperformance',
      label: 'Outperformance vs Benchmark',
      type: 'percentage',
      explanation: 'How much your portfolio outperformed the benchmark'
    },
    {
      id: 'alpha',
      label: 'Alpha',
      type: 'percentage',
      explanation: 'Excess return over the benchmark (risk-adjusted)'
    },

    // Asset Allocation Impact
    {
      id: 'stockContribution',
      label: 'Stock Contribution to Growth',
      type: 'currency',
      explanation: 'Growth attributable to stock allocation'
    },
    {
      id: 'bondContribution',
      label: 'Bond Contribution to Growth',
      type: 'currency',
      explanation: 'Growth attributable to bond allocation'
    },
    {
      id: 'cashContribution',
      label: 'Cash Contribution to Growth',
      type: 'currency',
      explanation: 'Growth attributable to cash allocation'
    },

    // Fee Analysis
    {
      id: 'totalFees',
      label: 'Total Fees Paid',
      type: 'currency',
      explanation: 'Total expense ratio and management fees paid'
    },
    {
      id: 'feeImpact',
      label: 'Fee Impact on Returns',
      type: 'percentage',
      explanation: 'Percentage reduction in returns due to fees'
    },
    {
      id: 'feeFreeEquivalent',
      label: 'Fee-Free Equivalent Balance',
      type: 'currency',
      explanation: 'What balance would be without fees'
    },

    // Inflation Impact
    {
      id: 'inflationAdjustedBalance',
      label: 'Inflation-Adjusted Balance',
      type: 'currency',
      explanation: 'Final balance adjusted for inflation'
    },
    {
      id: 'realReturn',
      label: 'Real Return (After Inflation)',
      type: 'percentage',
      explanation: 'Return after accounting for inflation'
    },
    {
      id: 'purchasingPower',
      label: 'Purchasing Power',
      type: 'percentage',
      explanation: 'Percentage of purchasing power maintained'
    },

    // Monte Carlo Analysis
    {
      id: 'successProbability',
      label: 'Success Probability',
      type: 'percentage',
      explanation: 'Probability of reaching goal based on Monte Carlo simulation'
    },
    {
      id: 'failureProbability',
      label: 'Failure Probability',
      type: 'percentage',
      explanation: 'Probability of not reaching goal'
    },
    {
      id: 'bestCaseScenario',
      label: 'Best Case Scenario',
      type: 'currency',
      explanation: 'Best projected outcome from simulations'
    },
    {
      id: 'worstCaseScenario',
      label: 'Worst Case Scenario',
      type: 'currency',
      explanation: 'Worst projected outcome from simulations'
    },

    // Market Crash Scenarios
    {
      id: 'crashImpact',
      label: 'Crash Impact',
      type: 'currency',
      explanation: 'Portfolio value loss during market crash'
    },
    {
      id: 'recoveryProjection',
      label: 'Recovery Projection',
      type: 'currency',
      explanation: 'Projected value after market recovery'
    },
    {
      id: 'timeToRecovery',
      label: 'Time to Recovery (Months)',
      type: 'number',
      explanation: 'Months required for portfolio to recover'
    },

    // Portfolio Optimization
    {
      id: 'optimalAllocation',
      label: 'Optimal Allocation',
      type: 'text',
      explanation: 'Recommended asset allocation for your risk tolerance'
    },
    {
      id: 'efficientFrontier',
      label: 'Efficient Frontier',
      type: 'text',
      explanation: 'Optimal risk-return combinations'
    },

    // Recommendations
    {
      id: 'recommendedStrategy',
      label: 'Recommended Strategy',
      type: 'text',
      explanation: 'Investment strategy recommendation'
    },
    {
      id: 'riskAdjustment',
      label: 'Risk Adjustment',
      type: 'text',
      explanation: 'Recommended risk level adjustments'
    },
    {
      id: 'rebalancingSchedule',
      label: 'Rebalancing Schedule',
      type: 'text',
      explanation: 'Recommended portfolio rebalancing frequency'
    },
    {
      id: 'taxOptimizationTips',
      label: 'Tax Optimization Tips',
      type: 'text',
      explanation: 'Tax-efficient investment strategies'
    },

    // Milestone Projections
    {
      id: 'balanceAt5Years',
      label: 'Balance at 5 Years',
      type: 'currency',
      explanation: 'Projected portfolio value after 5 years'
    },
    {
      id: 'balanceAt10Years',
      label: 'Balance at 10 Years',
      type: 'currency',
      explanation: 'Projected portfolio value after 10 years'
    },
    {
      id: 'balanceAt15Years',
      label: 'Balance at 15 Years',
      type: 'currency',
      explanation: 'Projected portfolio value after 15 years'
    },
    {
      id: 'balanceAt20Years',
      label: 'Balance at 20 Years',
      type: 'currency',
      explanation: 'Projected portfolio value after 20 years'
    },

    // Contribution Analysis
    {
      id: 'contributionGrowth',
      label: 'Contribution Growth',
      type: 'currency',
      explanation: 'Growth from your contributions'
    },
    {
      id: 'contributionPercentage',
      label: 'Contribution Percentage',
      type: 'percentage',
      explanation: 'Percentage of final balance from contributions'
    },
    {
      id: 'requiredVsActual',
      label: 'Required vs Actual Contribution',
      type: 'currency',
      explanation: 'Difference between required and actual contributions'
    },

    // Performance Attribution
    {
      id: 'assetClassPerformance',
      label: 'Asset Class Performance',
      type: 'text',
      explanation: 'Performance breakdown by asset class'
    },
    {
      id: 'timingImpact',
      label: 'Market Timing Impact',
      type: 'percentage',
      explanation: 'Impact of market timing on returns'
    },
    {
      id: 'securitySelection',
      label: 'Security Selection Impact',
      type: 'percentage',
      explanation: 'Impact of security selection on returns'
    },

    // Sustainability Metrics
    {
      id: 'carbonFootprint',
      label: 'Carbon Footprint',
      type: 'number',
      explanation: 'Portfolio carbon footprint (tons CO2)'
    },
    {
      id: 'socialImpact',
      label: 'Social Impact Score',
      type: 'number',
      explanation: 'Portfolio social impact rating'
    },
    {
      id: 'governanceScore',
      label: 'Governance Score',
      type: 'number',
      explanation: 'Portfolio corporate governance rating'
    },

    // Future Value Calculations
    {
      id: 'futureValueAtRetirement',
      label: 'Future Value at Retirement',
      type: 'currency',
      explanation: 'Projected portfolio value at retirement'
    },
    {
      id: 'collegeFundProjection',
      label: 'College Fund Projection',
      type: 'currency',
      explanation: 'Projected value for college expenses'
    },
    {
      id: 'emergencyFundProjection',
      label: 'Emergency Fund Projection',
      type: 'currency',
      explanation: 'Projected emergency fund value'
    },
    {
      id: 'majorPurchaseProjection',
      label: 'Major Purchase Projection',
      type: 'currency',
      explanation: 'Projected value for major purchases'
    }
  ],

  formulas: [],

  validationRules: getInvestmentValidationRules(),

  examples: [
    {
      title: 'Retirement Planning',
      description: '30-year retirement investment plan with monthly contributions',
      inputs: {
        initialInvestment: 50000,
        monthlyContribution: 1000,
        investmentPeriodYears: 30,
        expectedAnnualReturn: 8,
        volatility: 12,
        riskTolerance: 'moderate',
        inflationRate: 3,
        taxRate: 25,
        taxDeferred: true,
        investmentStrategy: 'both',
        rebalanceFrequency: 'annually',
        stockAllocation: 70,
        bondAllocation: 25,
        cashAllocation: 5,
        includeDividends: true,
        dividendYield: 2.5,
        expenseRatio: 0.5,
        managementFee: 1.0,
        targetAmount: 2000000
      },
      expectedOutputs: {
        finalBalance: 3500000,
        compoundAnnualGrowthRate: 8.2,
        goalAchievementProbability: 75,
        safeWithdrawalAmount: 140000
      }
    },
    {
      title: 'College Savings',
      description: '18-year college savings plan for child',
      inputs: {
        initialInvestment: 10000,
        monthlyContribution: 300,
        investmentPeriodYears: 18,
        expectedAnnualReturn: 7,
        volatility: 10,
        riskTolerance: 'moderate',
        inflationRate: 2.5,
        taxRate: 15,
        taxDeferred: true,
        investmentStrategy: 'both',
        rebalanceFrequency: 'annually',
        stockAllocation: 60,
        bondAllocation: 35,
        cashAllocation: 5,
        includeDividends: true,
        dividendYield: 2.0,
        expenseRatio: 0.3,
        targetAmount: 150000
      },
      expectedOutputs: {
        finalBalance: 180000,
        compoundAnnualGrowthRate: 7.1,
        goalAchievementProbability: 85,
        inflationAdjustedBalance: 120000
      }
    },
    {
      title: 'Conservative Investment',
      description: 'Low-risk investment strategy for capital preservation',
      inputs: {
        initialInvestment: 100000,
        monthlyContribution: 500,
        investmentPeriodYears: 20,
        expectedAnnualReturn: 5,
        volatility: 8,
        riskTolerance: 'conservative',
        inflationRate: 2.5,
        taxRate: 20,
        taxDeferred: false,
        investmentStrategy: 'both',
        rebalanceFrequency: 'quarterly',
        stockAllocation: 30,
        bondAllocation: 55,
        cashAllocation: 15,
        includeDividends: true,
        dividendYield: 3.0,
        expenseRatio: 0.2,
        managementFee: 0.5
      },
      expectedOutputs: {
        finalBalance: 320000,
        compoundAnnualGrowthRate: 5.2,
        sharpeRatio: 0.8,
        maximumDrawdown: 12
      }
    },
    {
      title: 'Aggressive Growth',
      description: 'High-risk, high-reward investment strategy',
      inputs: {
        initialInvestment: 25000,
        monthlyContribution: 800,
        investmentPeriodYears: 25,
        expectedAnnualReturn: 10,
        volatility: 18,
        riskTolerance: 'aggressive',
        inflationRate: 3,
        taxRate: 30,
        taxDeferred: false,
        investmentStrategy: 'both',
        rebalanceFrequency: 'quarterly',
        stockAllocation: 90,
        bondAllocation: 8,
        cashAllocation: 2,
        includeDividends: false,
        expenseRatio: 0.8,
        managementFee: 1.5,
        marketCrashScenario: true,
        bearMarketDuration: 18,
        recoveryTime: 24
      },
      expectedOutputs: {
        finalBalance: 950000,
        compoundAnnualGrowthRate: 10.1,
        valueAtRisk: 95000,
        crashImpact: 285000
      }
    }
  ]
};
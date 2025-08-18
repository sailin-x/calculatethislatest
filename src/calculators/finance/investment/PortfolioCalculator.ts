import { Calculator } from '../../../types/calculator';
import { portfolioCalculatorFormula } from './formulas';
import { getPortfolioValidationRules } from './validation';

/**
 * Advanced portfolio optimization calculator with Modern Portfolio Theory
 */
export const portfolioCalculator: Calculator = {
  id: 'portfolio-calculator',
  title: 'Portfolio Optimization Calculator',
  category: 'finance',
  subcategory: 'Investment & Portfolio',
  description: 'Advanced portfolio optimization using Modern Portfolio Theory with risk-adjusted returns, Monte Carlo simulation, and rebalancing analysis.',
  
  usageInstructions: [
    'Enter your total investment amount and time horizon',
    'Select your risk tolerance level (Conservative, Moderate, or Aggressive)',
    'Add 2-20 assets with their allocations, expected returns, and volatilities',
    'Choose your preferred rebalancing frequency',
    'Set expected inflation rate and tax rate if applicable',
    'Review comprehensive portfolio metrics and Monte Carlo projections'
  ],

  inputs: [
    {
      id: 'totalInvestment',
      label: 'Total Investment Amount',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Total amount you plan to invest in this portfolio',
      defaultValue: 100000
    },
    {
      id: 'timeHorizon',
      label: 'Investment Time Horizon (Years)',
      type: 'number',
      required: true,
      placeholder: '20',
      tooltip: 'Number of years you plan to hold this portfolio',
      defaultValue: 20,
      min: 1,
      max: 50
    },
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: true,
      options: [
        { value: 'conservative', label: 'Conservative (Capital Preservation)' },
        { value: 'moderate', label: 'Moderate (Balanced Growth)' },
        { value: 'aggressive', label: 'Aggressive (Maximum Growth)' }
      ],
      tooltip: 'Your comfort level with portfolio volatility and potential losses',
      defaultValue: 'moderate'
    },
    {
      id: 'rebalanceFrequency',
      label: 'Rebalancing Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' },
        { value: 'never', label: 'Never (Buy & Hold)' }
      ],
      tooltip: 'How often you plan to rebalance your portfolio back to target allocations',
      defaultValue: 'quarterly'
    },
    {
      id: 'expectedInflation',
      label: 'Expected Annual Inflation (%)',
      type: 'percentage',
      required: true,
      placeholder: '2.5',
      tooltip: 'Expected average annual inflation rate for real return calculations',
      defaultValue: 2.5,
      step: 0.1
    },
    {
      id: 'taxRate',
      label: 'Capital Gains Tax Rate (%) - Optional',
      type: 'percentage',
      required: false,
      placeholder: '15',
      tooltip: 'Your expected capital gains tax rate for after-tax return calculations',
      step: 0.5
    },
    {
      id: 'assets',
      label: 'Portfolio Assets',
      type: 'select', // This would be a custom component for asset allocation
      required: true,
      tooltip: 'Add your portfolio assets with allocations, expected returns, and risk levels'
    }
  ],

  outputs: [
    {
      id: 'expectedReturn',
      label: 'Expected Annual Return',
      type: 'percentage',
      explanation: 'Weighted average expected return of your portfolio'
    },
    {
      id: 'volatility',
      label: 'Portfolio Volatility',
      type: 'percentage',
      explanation: 'Standard deviation of portfolio returns (risk measure)'
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
      explanation: 'Downside risk-adjusted return measure'
    },
    {
      id: 'valueAtRisk',
      label: 'Value at Risk (95%)',
      type: 'currency',
      explanation: 'Maximum expected loss in worst 5% of scenarios over 1 year'
    },
    {
      id: 'maxDrawdown',
      label: 'Estimated Max Drawdown',
      type: 'percentage',
      explanation: 'Estimated maximum peak-to-trough decline'
    },
    {
      id: 'portfolioBeta',
      label: 'Portfolio Beta',
      type: 'number',
      explanation: 'Sensitivity to market movements (1.0 = market average)'
    },
    {
      id: 'portfolioAlpha',
      label: 'Portfolio Alpha',
      type: 'percentage',
      explanation: 'Expected excess return above market-based expectations'
    },
    {
      id: 'nominalFutureValue',
      label: 'Future Value (Nominal)',
      type: 'currency',
      explanation: 'Expected portfolio value at end of time horizon (not inflation-adjusted)'
    },
    {
      id: 'realFutureValue',
      label: 'Future Value (Real)',
      type: 'currency',
      explanation: 'Expected portfolio value adjusted for inflation (purchasing power)'
    },
    {
      id: 'monteCarloMedian',
      label: 'Monte Carlo Median Outcome',
      type: 'currency',
      explanation: 'Median portfolio value from 5,000 simulated scenarios'
    },
    {
      id: 'monteCarloWorstCase',
      label: 'Monte Carlo 10th Percentile',
      type: 'currency',
      explanation: 'Portfolio value in worst 10% of simulated scenarios'
    },
    {
      id: 'monteCarloBestCase',
      label: 'Monte Carlo 90th Percentile',
      type: 'currency',
      explanation: 'Portfolio value in best 10% of simulated scenarios'
    },
    {
      id: 'probabilityOfLoss',
      label: 'Probability of Loss',
      type: 'percentage',
      explanation: 'Probability of portfolio being worth less than initial investment'
    }
  ],

  formulas: [portfolioCalculatorFormula],
  
  validationRules: getPortfolioValidationRules(),

  examples: [
    {
      title: 'Conservative Retirement Portfolio',
      description: 'Low-risk portfolio for someone nearing retirement',
      inputs: {
        totalInvestment: 500000,
        timeHorizon: 10,
        riskTolerance: 'conservative',
        rebalanceFrequency: 'quarterly',
        expectedInflation: 2.5,
        taxRate: 15,
        assets: [
          {
            symbol: 'VTI',
            name: 'Total Stock Market',
            allocation: 30,
            expectedReturn: 8.5,
            standardDeviation: 18,
            assetClass: 'stocks'
          },
          {
            symbol: 'BND',
            name: 'Total Bond Market',
            allocation: 60,
            expectedReturn: 4.0,
            standardDeviation: 6,
            assetClass: 'bonds'
          },
          {
            symbol: 'VNQ',
            name: 'Real Estate',
            allocation: 10,
            expectedReturn: 7.0,
            standardDeviation: 16,
            assetClass: 'reits'
          }
        ]
      },
      expectedOutputs: {
        expectedReturn: 5.85,
        volatility: 8.2,
        sharpeRatio: 0.35,
        nominalFutureValue: 875000
      }
    },
    {
      title: 'Aggressive Growth Portfolio',
      description: 'High-growth portfolio for young investors with long time horizon',
      inputs: {
        totalInvestment: 50000,
        timeHorizon: 30,
        riskTolerance: 'aggressive',
        rebalanceFrequency: 'annually',
        expectedInflation: 2.5,
        assets: [
          {
            symbol: 'VTI',
            name: 'US Total Market',
            allocation: 50,
            expectedReturn: 9.0,
            standardDeviation: 18,
            assetClass: 'stocks'
          },
          {
            symbol: 'VTIAX',
            name: 'International Stocks',
            allocation: 25,
            expectedReturn: 8.0,
            standardDeviation: 20,
            assetClass: 'stocks'
          },
          {
            symbol: 'VNQ',
            name: 'Real Estate',
            allocation: 15,
            expectedReturn: 7.5,
            standardDeviation: 16,
            assetClass: 'reits'
          },
          {
            symbol: 'BND',
            name: 'Bonds',
            allocation: 10,
            expectedReturn: 4.0,
            standardDeviation: 6,
            assetClass: 'bonds'
          }
        ]
      },
      expectedOutputs: {
        expectedReturn: 8.1,
        volatility: 16.5,
        sharpeRatio: 0.31,
        nominalFutureValue: 550000
      }
    },
    {
      title: 'Balanced Moderate Portfolio',
      description: 'Well-diversified portfolio balancing growth and stability',
      inputs: {
        totalInvestment: 250000,
        timeHorizon: 15,
        riskTolerance: 'moderate',
        rebalanceFrequency: 'quarterly',
        expectedInflation: 2.5,
        taxRate: 20,
        assets: [
          {
            symbol: 'VTI',
            name: 'US Stocks',
            allocation: 40,
            expectedReturn: 9.0,
            standardDeviation: 18,
            assetClass: 'stocks'
          },
          {
            symbol: 'VTIAX',
            name: 'International Stocks',
            allocation: 20,
            expectedReturn: 8.0,
            standardDeviation: 20,
            assetClass: 'stocks'
          },
          {
            symbol: 'BND',
            name: 'Bonds',
            allocation: 30,
            expectedReturn: 4.0,
            standardDeviation: 6,
            assetClass: 'bonds'
          },
          {
            symbol: 'VNQ',
            name: 'REITs',
            allocation: 10,
            expectedReturn: 7.0,
            standardDeviation: 16,
            assetClass: 'reits'
          }
        ]
      },
      expectedOutputs: {
        expectedReturn: 7.3,
        volatility: 12.8,
        sharpeRatio: 0.34,
        nominalFutureValue: 675000
      }
    }
  ]
};
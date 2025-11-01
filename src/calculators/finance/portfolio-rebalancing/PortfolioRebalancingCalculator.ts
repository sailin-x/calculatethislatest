import { Calculator } from '../../types/calculator';

export const PortfolioRebalancingCalculator: Calculator = {
  id: 'portfolio-rebalancing-calculator',
  title: 'Portfolio Rebalancing Calculator',
  category: 'finance',
  subcategory: 'Investment & Portfolio',
  description: 'Calculate optimal portfolio rebalancing trades to maintain target asset allocations, minimize transaction costs, and analyze tax implications.',
  usageInstructions: [
    'Enter current portfolio holdings and values',
    'Specify target asset allocation percentages',
    'Set rebalancing threshold and transaction costs',
    'Review recommended trades and cost analysis',
    'Analyze tax implications of rebalancing decisions'
  ],

  inputs: [
    {
      id: 'currentStocks',
      label: 'Current Stock Allocation (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Current percentage of portfolio in stocks'
    },
    {
      id: 'currentBonds',
      label: 'Current Bond Allocation (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Current percentage of portfolio in bonds'
    },
    {
      id: 'currentCash',
      label: 'Current Cash Allocation (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Current percentage of portfolio in cash'
    },
    {
      id: 'targetStocks',
      label: 'Target Stock Allocation (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Target percentage for stocks'
    },
    {
      id: 'targetBonds',
      label: 'Target Bond Allocation (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Target percentage for bonds'
    },
    {
      id: 'targetCash',
      label: 'Target Cash Allocation (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Target percentage for cash'
    },
    {
      id: 'portfolioValue',
      label: 'Total Portfolio Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total current portfolio value'
    },
    {
      id: 'rebalancingThreshold',
      label: 'Rebalancing Threshold (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 5,
      tooltip: 'Minimum deviation before rebalancing'
    },
    {
      id: 'transactionCost',
      label: 'Transaction Cost (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      defaultValue: 0.5,
      tooltip: 'Cost per transaction as percentage'
    },
    {
      id: 'taxRate',
      label: 'Capital Gains Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      defaultValue: 15,
      tooltip: 'Estimated capital gains tax rate'
    }
  ],

  outputs: [
    {
      id: 'stocksDeviation',
      label: 'Stocks Deviation (%)',
      type: 'percentage',
      explanation: 'Difference between current and target stock allocation'
    },
    {
      id: 'bondsDeviation',
      label: 'Bonds Deviation (%)',
      type: 'percentage',
      explanation: 'Difference between current and target bond allocation'
    },
    {
      id: 'cashDeviation',
      label: 'Cash Deviation (%)',
      type: 'percentage',
      explanation: 'Difference between current and target cash allocation'
    },
    {
      id: 'needsRebalancing',
      label: 'Needs Rebalancing',
      type: 'text',
      explanation: 'Whether portfolio needs rebalancing based on threshold'
    },
    {
      id: 'stocksTradeAmount',
      label: 'Stocks Trade Amount ($)',
      type: 'currency',
      explanation: 'Amount to buy/sell stocks for rebalancing'
    },
    {
      id: 'bondsTradeAmount',
      label: 'Bonds Trade Amount ($)',
      type: 'currency',
      explanation: 'Amount to buy/sell bonds for rebalancing'
    },
    {
      id: 'cashTradeAmount',
      label: 'Cash Trade Amount ($)',
      type: 'currency',
      explanation: 'Amount to add/withdraw cash for rebalancing'
    },
    {
      id: 'totalTransactionCost',
      label: 'Total Transaction Cost ($)',
      type: 'currency',
      explanation: 'Estimated cost of rebalancing trades'
    },
    {
      id: 'taxCost',
      label: 'Tax Cost ($)',
      type: 'currency',
      explanation: 'Estimated capital gains tax from rebalancing'
    },
    {
      id: 'netCost',
      label: 'Net Cost ($)',
      type: 'currency',
      explanation: 'Total cost including taxes and transaction fees'
    }
  ],

  formulas: [], // Will be implemented with calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Aggressive Portfolio Rebalancing',
      description: 'Rebalancing from 70/20/10 to 60/30/10 target allocation',
      inputs: {
        currentStocks: 70,
        currentBonds: 20,
        currentCash: 10,
        targetStocks: 60,
        targetBonds: 30,
        targetCash: 10,
        portfolioValue: 100000,
        rebalancingThreshold: 5,
        transactionCost: 0.5,
        taxRate: 15
      },
      expectedOutputs: {
        stocksDeviation: 10,
        bondsDeviation: -10,
        cashDeviation: 0,
        needsRebalancing: 'Yes',
        stocksTradeAmount: -10000,
        bondsTradeAmount: 10000,
        cashTradeAmount: 0,
        totalTransactionCost: 75,
        taxCost: 1500,
        netCost: 1575
      }
    }
  ]
};
import { Calculator } from '../../types/calculator';
import { TaxLossHarvestingInputs, TaxLossHarvestingOutputs } from './types';
import {
  calculateTaxLossHarvesting,
  generateTaxLossHarvestingAnalysis
} from './formulas';
import { validateTaxLossHarvestingInputs, validateTaxLossHarvestingBusinessRules } from './validation';

export const TaxLossHarvestingCalculator: Calculator = {
  id: 'TaxLossHarvestingCalculator',
  title: 'Tax-Loss Harvesting Calculator',
  category: 'finance',
  subcategory: 'Taxes & Investments',
  description: 'Calculate optimal tax-loss harvesting strategies, including harvestable losses, tax savings, and risk-adjusted returns with wash sale rule compliance.',
  usageInstructions: [
    'Enter your portfolio value and realized gains/losses',
    'Specify tax rate and investment parameters',
    'Select risk tolerance and harvest frequency',
    'Review optimal harvest amounts and tax savings',
    'Follow recommended actions and wash sale rules'
  ],

  inputs: [
    {
      id: 'currentPortfolioValue',
      label: 'Current Portfolio Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total current value of your investment portfolio'
    },
    {
      id: 'realizedGains',
      label: 'Realized Gains ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total realized capital gains this tax year'
    },
    {
      id: 'realizedLosses',
      label: 'Realized Losses ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total realized capital losses this tax year'
    },
    {
      id: 'shortTermGains',
      label: 'Short-Term Gains ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Gains from assets held less than 1 year'
    },
    {
      id: 'shortTermLosses',
      label: 'Short-Term Losses ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Losses from assets held less than 1 year'
    },
    {
      id: 'longTermGains',
      label: 'Long-Term Gains ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Gains from assets held more than 1 year'
    },
    {
      id: 'longTermLosses',
      label: 'Long-Term Losses ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Losses from assets held more than 1 year'
    },
    {
      id: 'taxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      tooltip: 'Your marginal federal tax rate'
    },
    {
      id: 'washSalePeriod',
      label: 'Wash Sale Period (Days)',
      type: 'number',
      required: false,
      min: 0,
      max: 365,
      defaultValue: 30,
      tooltip: 'Days to wait before repurchasing similar securities'
    },
    {
      id: 'replacementInvestment',
      label: 'Replacement Investment',
      type: 'text',
      required: false,
      tooltip: 'Type of investment to replace harvested positions'
    },
    {
      id: 'harvestFrequency',
      label: 'Harvest Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' }
      ],
      tooltip: 'How often to perform tax-loss harvesting'
    },
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: true,
      options: [
        { value: 'conservative', label: 'Conservative' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'aggressive', label: 'Aggressive' }
      ],
      tooltip: 'Your risk tolerance for investment decisions'
    },
    {
      id: 'investmentHorizon',
      label: 'Investment Horizon (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Time horizon for your investments'
    },
    {
      id: 'expectedReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: false,
      min: -20,
      max: 50,
      defaultValue: 7,
      tooltip: 'Expected annual return of your portfolio'
    },
    {
      id: 'volatility',
      label: 'Portfolio Volatility (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      defaultValue: 15,
      tooltip: 'Annual volatility of your portfolio'
    },
    {
      id: 'transactionCosts',
      label: 'Transaction Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 10,
      tooltip: 'Cost per transaction for buying/selling'
    },
    {
      id: 'minimumHarvestAmount',
      label: 'Minimum Harvest Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Minimum amount to harvest in a single transaction'
    }
  ],

  outputs: [
    {
      id: 'netTaxSavings',
      label: 'Net Tax Savings',
      type: 'currency',
      explanation: 'Total tax savings from harvesting losses'
    },
    {
      id: 'harvestableLosses',
      label: 'Harvestable Losses',
      type: 'currency',
      explanation: 'Total losses available for harvesting against gains'
    },
    {
      id: 'optimalHarvestAmount',
      label: 'Optimal Harvest Amount',
      type: 'currency',
      explanation: 'Recommended amount to harvest based on portfolio and risk factors'
    },
    {
      id: 'taxEfficiency',
      label: 'Tax Efficiency (%)',
      type: 'percentage',
      explanation: 'Portfolio tax efficiency ratio'
    },
    {
      id: 'portfolioRebalancingCost',
      label: 'Rebalancing Cost',
      type: 'currency',
      explanation: 'Total cost of rebalancing the portfolio'
    },
    {
      id: 'expectedAnnualSavings',
      label: 'Expected Annual Savings',
      type: 'currency',
      explanation: 'Annual tax savings from harvesting strategy'
    },
    {
      id: 'breakEvenPeriod',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years needed to recover harvesting costs'
    },
    {
      id: 'riskAdjustedReturn',
      label: 'Risk-Adjusted Return (%)',
      type: 'percentage',
      explanation: 'Return adjusted for portfolio volatility'
    },
    {
      id: 'harvestSchedule',
      label: 'Harvest Schedule',
      type: 'text',
      explanation: 'Recommended harvesting schedule'
    },
    {
      id: 'recommendedActions',
      label: 'Recommended Actions',
      type: 'text',
      explanation: 'Specific actions to take for tax-loss harvesting'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Moderate Portfolio with Losses',
      description: 'Balanced portfolio with harvestable tax losses',
      inputs: {
        currentPortfolioValue: 100000,
        realizedGains: 5000,
        realizedLosses: 8000,
        shortTermGains: 2000,
        shortTermLosses: 3000,
        longTermGains: 3000,
        longTermLosses: 5000,
        taxRate: 24,
        washSalePeriod: 30,
        replacementInvestment: 'S&P 500 ETF',
        harvestFrequency: 'annual',
        riskTolerance: 'moderate',
        investmentHorizon: 10,
        expectedReturn: 8,
        volatility: 12,
        transactionCosts: 15,
        minimumHarvestAmount: 1000
      },
      expectedOutputs: {
        netTaxSavings: 720,
        harvestableLosses: 3000,
        optimalHarvestAmount: 15000,
        taxEfficiency: 75,
        portfolioRebalancingCost: 30,
        expectedAnnualSavings: 720,
        breakEvenPeriod: 1,
        riskAdjustedReturn: 8,
        harvestSchedule: ['Year: $15000.00'],
        recommendedActions: ['Harvest up to $15000.00 in losses', 'Wait 30 days before repurchasing substantially identical securities']
      }
    },
    {
      title: 'Conservative Strategy',
      description: 'Conservative approach with lower risk tolerance',
      inputs: {
        currentPortfolioValue: 250000,
        realizedGains: 15000,
        realizedLosses: 12000,
        shortTermGains: 8000,
        shortTermLosses: 6000,
        longTermGains: 7000,
        longTermLosses: 6000,
        taxRate: 32,
        washSalePeriod: 30,
        replacementInvestment: 'Bond ETF',
        harvestFrequency: 'quarterly',
        riskTolerance: 'conservative',
        investmentHorizon: 15,
        expectedReturn: 5,
        volatility: 8,
        transactionCosts: 25,
        minimumHarvestAmount: 2500
      },
      expectedOutputs: {
        netTaxSavings: 960,
        harvestableLosses: 3000,
        optimalHarvestAmount: 12500,
        taxEfficiency: 80,
        portfolioRebalancingCost: 100,
        expectedAnnualSavings: 3840,
        breakEvenPeriod: 1,
        riskAdjustedReturn: 5,
        harvestSchedule: ['Q1: $3125.00', 'Q2: $3125.00', 'Q3: $3125.00', 'Q4: $3125.00'],
        recommendedActions: ['Harvest up to $12500.00 in losses', 'Wait 30 days before repurchasing substantially identical securities', 'Consider harvesting smaller amounts more frequently to reduce risk']
      }
    },
    {
      title: 'No Harvestable Losses',
      description: 'Portfolio with net gains, no harvesting opportunity',
      inputs: {
        currentPortfolioValue: 150000,
        realizedGains: 20000,
        realizedLosses: 5000,
        shortTermGains: 12000,
        shortTermLosses: 3000,
        longTermGains: 8000,
        longTermLosses: 2000,
        taxRate: 28,
        washSalePeriod: 30,
        replacementInvestment: 'Growth ETF',
        harvestFrequency: 'annual',
        riskTolerance: 'moderate',
        investmentHorizon: 20,
        expectedReturn: 9,
        volatility: 18,
        transactionCosts: 20,
        minimumHarvestAmount: 2000
      },
      expectedOutputs: {
        netTaxSavings: 0,
        harvestableLosses: 0,
        optimalHarvestAmount: 2000,
        taxEfficiency: 85,
        portfolioRebalancingCost: 20,
        expectedAnnualSavings: 0,
        breakEvenPeriod: Infinity,
        riskAdjustedReturn: 9,
        harvestSchedule: ['Year: $2000.00'],
        recommendedActions: ['No harvestable losses available. Consider tax-loss harvesting when losses exceed gains.']
      }
    }
  ]
};
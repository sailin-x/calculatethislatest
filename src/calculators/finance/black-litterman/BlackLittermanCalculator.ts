import { Calculator } from '../../../types/calculator';
import { BlackLittermanInputs, BlackLittermanOutputs } from './types';
import {
  calculatePosteriorReturns,
  calculatePosteriorCovariance,
  calculateOptimalWeights,
  calculateExpectedReturn,
  calculatePortfolioVolatility,
  calculateSharpeRatio,
  calculateViewConfidence,
  calculateMarketImpliedReturns
} from './formulas';
import { validateBlackLittermanInputs, validateBlackLittermanBusinessRules } from './validation';

export const BlackLittermanCalculator: Calculator = {
  id: 'BlackLittermanCalculator',
  title: 'Black-Litterman Calculator',
  category: 'finance',
  subcategory: 'Portfolio Optimization',
  description: 'Advanced portfolio optimization using Black-Litterman model. Combines market equilibrium with investor views for optimal asset allocation.',
  usageInstructions: [
    'Enter market weights for each asset in the portfolio',
    'Provide expected market returns for each asset',
    'Input the covariance matrix representing asset relationships',
    'Specify your investment views (asset, expected return, confidence)',
    'Set risk aversion parameter',
    'Adjust tau parameter for uncertainty in equilibrium returns',
    'Review optimized portfolio weights and risk metrics'
  ],

  inputs: [
    {
      id: 'marketWeights',
      label: 'Market Weights',
      type: 'text',
      required: true,
      tooltip: 'Current market portfolio weights as comma-separated values (must sum to 1.0)',
      placeholder: '0.4, 0.3, 0.2, 0.1...'
    },
    {
      id: 'marketReturns',
      label: 'Market Returns (%)',
      type: 'text',
      required: true,
      tooltip: 'Expected market returns as comma-separated percentages',
      placeholder: '8.5, 6.2, 9.1, 7.3...'
    },
    {
      id: 'marketCovariance',
      label: 'Covariance Matrix',
      type: 'text',
      required: true,
      tooltip: 'Asset covariance matrix as JSON array of arrays',
      placeholder: '[[0.04, 0.02], [0.02, 0.09]]'
    },
    {
      id: 'investorViews',
      label: 'Investor Views',
      type: 'text',
      required: true,
      tooltip: 'Investment views as JSON: {assets: [0,1], returns: [10.5, 7.8], confidences: [0.8, 0.6]}',
      placeholder: '{"assets": [0, 1], "returns": [10.5, 7.8], "confidences": [0.8, 0.6]}'
    },
    {
      id: 'riskAversion',
      label: 'Risk Aversion',
      type: 'number',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.1,
      defaultValue: 3.0,
      tooltip: 'Investor risk aversion coefficient (higher = more risk averse)'
    },
    {
      id: 'tau',
      label: 'Tau (Uncertainty)',
      type: 'number',
      required: true,
      min: 0.01,
      max: 1.0,
      step: 0.01,
      defaultValue: 0.05,
      tooltip: 'Uncertainty in market equilibrium returns'
    }
  ],

  outputs: [
    {
      id: 'posteriorReturns',
      label: 'Posterior Returns (%)',
      type: 'text',
      explanation: 'Expected returns after incorporating investor views'
    },
    {
      id: 'optimalWeights',
      label: 'Optimal Weights',
      type: 'text',
      explanation: 'Recommended portfolio allocation weights'
    },
    {
      id: 'expectedReturn',
      label: 'Expected Return (%)',
      type: 'percentage',
      explanation: 'Expected portfolio return'
    },
    {
      id: 'portfolioVolatility',
      label: 'Portfolio Volatility (%)',
      type: 'percentage',
      explanation: 'Expected portfolio standard deviation'
    },
    {
      id: 'sharpeRatio',
      label: 'Sharpe Ratio',
      type: 'number',
      explanation: 'Risk-adjusted return measure'
    },
    {
      id: 'viewConfidence',
      label: 'View Confidence',
      type: 'text',
      explanation: 'Confidence levels in investor views'
    },
    {
      id: 'marketImpliedReturns',
      label: 'Market Implied Returns (%)',
      type: 'text',
      explanation: 'Returns implied by market equilibrium'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Balanced Portfolio Optimization',
      description: 'Optimizing a balanced portfolio with bullish view on technology stocks',
      inputs: {
        marketWeights: [0.5, 0.3, 0.2],
        marketReturns: [7.5, 8.2, 6.8],
        marketCovariance: [[0.04, 0.02, 0.015], [0.02, 0.06, 0.025], [0.015, 0.025, 0.05]],
        investorViews: {
          assets: [0],
          returns: [10.5],
          confidences: [0.7]
        },
        riskAversion: 3.0,
        tau: 0.05
      },
      expectedOutputs: {
        posteriorReturns: [9.2, 8.2, 6.8],
        optimalWeights: [0.55, 0.25, 0.2],
        expectedReturn: 8.4,
        portfolioVolatility: 18.5,
        sharpeRatio: 1.45,
        viewConfidence: [0.7],
        marketImpliedReturns: [7.5, 8.2, 6.8]
      }
    },
    {
      title: 'Conservative Portfolio with Multiple Views',
      description: 'Conservative optimization with views on multiple assets',
      inputs: {
        marketWeights: [0.4, 0.4, 0.2],
        marketReturns: [6.2, 7.1, 5.8],
        marketCovariance: [[0.03, 0.015, 0.01], [0.015, 0.05, 0.02], [0.01, 0.02, 0.04]],
        investorViews: {
          assets: [0, 2],
          returns: [7.5, 6.2],
          confidences: [0.8, 0.6]
        },
        riskAversion: 4.0,
        tau: 0.03
      },
      expectedOutputs: {
        posteriorReturns: [7.1, 7.1, 6.0],
        optimalWeights: [0.45, 0.35, 0.2],
        expectedReturn: 7.0,
        portfolioVolatility: 15.2,
        sharpeRatio: 1.25,
        viewConfidence: [0.8, 0.6],
        marketImpliedReturns: [6.2, 7.1, 5.8]
      }
    }
  ]
};
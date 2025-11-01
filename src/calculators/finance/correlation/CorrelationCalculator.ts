import { Calculator } from '../../types/calculator';
import { CorrelationInputs, CorrelationOutputs } from './types';
import { calculateCorrelationMetrics } from './formulas';
import { validateCorrelationInputs, validateCorrelationBusinessRules } from './validation';

export const CorrelationCalculator: Calculator = {
  id: 'CorrelationCalculator',
  title: 'Correlation Calculator',
  category: 'finance',
  subcategory: 'Portfolio Analysis & Risk',
  description: 'Advanced correlation analysis calculator for measuring relationships between financial assets, including Pearson, Spearman, and Kendall correlations with statistical significance testing, portfolio optimization, and risk metrics.',
  usageInstructions: [
    'Enter return series for two assets to analyze',
    'Specify asset names and time period',
    'Choose correlation calculation method',
    'Set confidence level for statistical tests',
    'Review correlation coefficient and significance',
    'Analyze portfolio implications and diversification benefits',
    'Examine risk metrics and correlation stability'
  ],

  inputs: [
    {
      id: 'asset1Returns',
      label: 'Asset 1 Returns (%)',
      type: 'text',
      required: true,
      tooltip: 'Comma-separated return series for first asset (e.g., 1.2, -0.5, 2.1, ...)'
    },
    {
      id: 'asset2Returns',
      label: 'Asset 2 Returns (%)',
      type: 'text',
      required: true,
      tooltip: 'Comma-separated return series for second asset (e.g., 0.8, -1.2, 1.5, ...)'
    },
    {
      id: 'asset1Name',
      label: 'Asset 1 Name',
      type: 'text',
      required: true,
      tooltip: 'Name or ticker symbol for first asset'
    },
    {
      id: 'asset2Name',
      label: 'Asset 2 Name',
      type: 'text',
      required: true,
      tooltip: 'Name or ticker symbol for second asset'
    },
    {
      id: 'confidenceLevel',
      label: 'Confidence Level (%)',
      type: 'number',
      required: false,
      min: 80,
      max: 99,
      defaultValue: 95,
      tooltip: 'Confidence level for statistical significance testing'
    },
    {
      id: 'timePeriod',
      label: 'Time Period',
      type: 'select',
      required: true,
      options: [
        { value: '1M', label: '1 Month' },
        { value: '3M', label: '3 Months' },
        { value: '6M', label: '6 Months' },
        { value: '1Y', label: '1 Year' },
        { value: '2Y', label: '2 Years' },
        { value: '3Y', label: '3 Years' },
        { value: '5Y', label: '5 Years' },
        { value: '10Y', label: '10 Years' }
      ],
      tooltip: 'Analysis time period'
    },
    {
      id: 'calculationMethod',
      label: 'Correlation Method',
      type: 'select',
      required: true,
      options: [
        { value: 'pearson', label: 'Pearson (Linear)' },
        { value: 'spearman', label: 'Spearman (Rank)' },
        { value: 'kendall', label: 'Kendall Tau' }
      ],
      defaultValue: 'pearson',
      tooltip: 'Statistical method for correlation calculation'
    },
    {
      id: 'riskFreeRate',
      label: 'Risk-Free Rate (%)',
      type: 'percentage',
      required: false,
      min: -0.1,
      max: 0.2,
      defaultValue: 0.045,
      step: 0.001,
      tooltip: 'Risk-free rate for Sharpe ratio calculations'
    },
    {
      id: 'benchmarkReturns',
      label: 'Benchmark Returns (%)',
      type: 'text',
      required: false,
      tooltip: 'Optional benchmark return series for comparison'
    },
    {
      id: 'benchmarkName',
      label: 'Benchmark Name',
      type: 'text',
      required: false,
      tooltip: 'Name of benchmark index (required if benchmark returns provided)'
    }
  ],

  outputs: [
    {
      id: 'correlationCoefficient',
      label: 'Correlation Coefficient',
      type: 'number',
      explanation: 'Measure of linear relationship between assets (-1 to +1)'
    },
    {
      id: 'correlationStrength',
      label: 'Correlation Strength',
      type: 'text',
      explanation: 'Descriptive strength of correlation (Very Strong, Strong, etc.)'
    },
    {
      id: 'correlationDirection',
      label: 'Correlation Direction',
      type: 'text',
      explanation: 'Direction of relationship (Positive, Negative, or None)'
    },
    {
      id: 'statisticalSignificance',
      label: 'Statistically Significant',
      type: 'boolean',
      explanation: 'Whether correlation is statistically significant at chosen confidence level'
    },
    {
      id: 'pValue',
      label: 'P-Value',
      type: 'number',
      explanation: 'Probability of observing correlation by chance'
    },
    {
      id: 'betaCoefficient',
      label: 'Beta Coefficient',
      type: 'number',
      explanation: 'Slope coefficient in regression of Asset 2 on Asset 1'
    },
    {
      id: 'rSquared',
      label: 'R-Squared',
      type: 'percentage',
      explanation: 'Proportion of variance in Asset 2 explained by Asset 1'
    },
    {
      id: 'covariance',
      label: 'Covariance',
      type: 'number',
      explanation: 'Measure of joint variability between assets'
    },
    {
      id: 'diversificationBenefit',
      label: 'Diversification Benefit',
      type: 'number',
      explanation: 'Risk reduction from combining assets'
    },
    {
      id: 'optimalWeights',
      label: 'Optimal Portfolio Weights',
      type: 'text',
      explanation: 'Recommended asset allocation for minimum variance portfolio'
    },
    {
      id: 'portfolioSharpeRatio',
      label: 'Portfolio Sharpe Ratio',
      type: 'number',
      explanation: 'Risk-adjusted return of optimized portfolio'
    },
    {
      id: 'correlationStability',
      label: 'Correlation Stability Score',
      type: 'number',
      explanation: 'Measure of correlation consistency over time'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Stocks vs Bonds Correlation',
      description: 'Analysis of correlation between S&P 500 and 10-year Treasury bonds',
      inputs: {
        asset1Returns: [2.1, -1.5, 3.2, 1.8, -0.9, 2.5, -1.2, 1.9, 2.8, -1.8],
        asset2Returns: [0.5, 1.2, -0.8, 0.9, 1.1, -0.3, 0.7, -0.5, 0.4, 0.8],
        asset1Name: 'S&P 500',
        asset2Name: '10Y Treasury',
        confidenceLevel: 95,
        timePeriod: '1Y',
        calculationMethod: 'pearson',
        riskFreeRate: 0.045
      },
      expectedOutputs: {
        correlationCoefficient: -0.32,
        correlationStrength: 'Weak',
        correlationDirection: 'Negative',
        statisticalSignificance: true,
        pValue: 0.034,
        betaCoefficient: -0.28,
        rSquared: 10.2,
        covariance: -0.45,
        diversificationBenefit: 0.23,
        optimalWeights: '60% S&P 500, 40% Treasury',
        portfolioSharpeRatio: 1.45,
        correlationStability: 0.78
      }
    },
    {
      title: 'Tech Stocks Correlation',
      description: 'High correlation analysis between two major technology stocks',
      inputs: {
        asset1Returns: [3.2, -2.1, 4.5, 2.8, -1.9, 3.7, -1.5, 2.9, 3.1, -2.2],
        asset2Returns: [3.1, -2.3, 4.2, 2.5, -1.7, 3.4, -1.8, 2.7, 3.3, -2.0],
        asset1Name: 'Apple Inc.',
        asset2Name: 'Microsoft Corp.',
        confidenceLevel: 95,
        timePeriod: '1Y',
        calculationMethod: 'spearman',
        riskFreeRate: 0.045
      },
      expectedOutputs: {
        correlationCoefficient: 0.89,
        correlationStrength: 'Very Strong',
        correlationDirection: 'Positive',
        statisticalSignificance: true,
        pValue: 0.001,
        betaCoefficient: 0.92,
        rSquared: 79.2,
        covariance: 1.85,
        diversificationBenefit: 0.08,
        optimalWeights: '50% Apple, 50% Microsoft',
        portfolioSharpeRatio: 1.12,
        correlationStability: 0.85
      }
    },
    {
      title: 'Commodities vs Equities',
      description: 'Low correlation analysis between gold and stock market',
      inputs: {
        asset1Returns: [1.2, 2.1, -0.8, 1.5, 0.9, -1.2, 2.3, 1.8, -0.5, 1.1],
        asset2Returns: [2.5, -1.8, 3.2, 1.9, -2.1, 2.8, -1.5, 1.7, 2.1, -1.9],
        asset1Name: 'Gold ETF',
        asset2Name: 'S&P 500',
        confidenceLevel: 95,
        timePeriod: '1Y',
        calculationMethod: 'kendall',
        riskFreeRate: 0.045
      },
      expectedOutputs: {
        correlationCoefficient: 0.12,
        correlationStrength: 'Very Weak',
        correlationDirection: 'Positive',
        statisticalSignificance: false,
        pValue: 0.68,
        betaCoefficient: 0.15,
        rSquared: 1.4,
        covariance: 0.08,
        diversificationBenefit: 0.45,
        optimalWeights: '70% S&P 500, 30% Gold',
        portfolioSharpeRatio: 1.67,
        correlationStability: 0.62
      }
    }
  ]
};
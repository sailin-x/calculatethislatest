import { Calculator } from '../../types/calculator';
import { calculateAlpha, generateAlphaAnalysis } from './formulas';
import { validateAlphaInputs } from './validation';

export const AlphaCalculator: Calculator = {
  id: 'alpha-calculator',
  name: 'Alpha Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Professional investment analysis tool focused on calculating Jensen\'s Alpha (excess return) with comprehensive statistical significance testing and performance attribution.',
  
  longDescription: `
    The Alpha Calculator is a specialized investment analysis tool designed to calculate and analyze Jensen's Alpha - the excess return of a portfolio relative to its expected return based on the Capital Asset Pricing Model (CAPM). This focused calculator provides detailed alpha analysis with statistical significance testing, performance attribution, and comprehensive reporting.

    **Key Features:**
    • **Jensen's Alpha Calculation**: Precise calculation of excess return relative to CAPM
    • **Statistical Significance Testing**: T-statistics, p-values, and confidence intervals
    • **Performance Attribution**: Asset allocation, security selection, and interaction effects
    • **Risk-Adjusted Metrics**: Information ratio, Sharpe ratio, and other risk-adjusted measures
    • **Rolling Analysis**: Dynamic alpha analysis over time with trend identification
    • **Stress Testing**: Scenario analysis under different market conditions
    • **Factor Analysis**: Multi-factor risk decomposition and factor contributions
    • **Benchmark Comparison**: Comprehensive benchmark analysis and comparison
    • **Professional Reporting**: Detailed analysis reports with actionable insights

    **Use Cases:**
    • Portfolio manager performance evaluation and attribution
    • Investment manager due diligence and selection
    • Active management strategy analysis and optimization
    • Performance reporting and client communication
    • Investment strategy development and backtesting
    • Regulatory compliance and reporting requirements
    • Academic research and financial analysis
    • Risk management and portfolio optimization
  `,

  inputs: [
    // Portfolio Data
    { id: 'portfolioReturns', name: 'Portfolio Returns', type: 'array', unit: '%', required: true, description: 'Historical portfolio returns (monthly/quarterly)', placeholder: '[2.1, -1.5, 3.2, 0.8, 1.9]', min: -100, max: 100 },
    { id: 'benchmarkReturns', name: 'Benchmark Returns', type: 'array', unit: '%', required: true, description: 'Historical benchmark returns (same period)', placeholder: '[1.8, -2.1, 2.9, 0.5, 1.6]', min: -100, max: 100 },
    { id: 'riskFreeRate', name: 'Risk-Free Rate', type: 'number', unit: '%', required: true, description: 'Annualized risk-free rate', placeholder: '2.5', min: 0, max: 20 },
    
    // Analysis Parameters
    { id: 'analysisPeriod', name: 'Analysis Period', type: 'select', required: true, description: 'Frequency of return data', placeholder: 'Select analysis period', options: ['monthly', 'quarterly', 'yearly'] },
    { id: 'confidenceLevel', name: 'Confidence Level', type: 'number', unit: '%', required: true, description: 'Confidence level for statistical tests', placeholder: '95', min: 80, max: 99.9 },
    { id: 'lookbackPeriod', name: 'Lookback Period', type: 'number', unit: 'periods', required: true, description: 'Number of periods for analysis', placeholder: '60', min: 12, max: 500 },
    
    // Portfolio Information
    { id: 'portfolioValue', name: 'Portfolio Value', type: 'number', unit: 'USD', required: true, description: 'Current portfolio value', placeholder: '1000000', min: 1000, max: 10000000000 },
    { id: 'benchmarkName', name: 'Benchmark Name', type: 'text', required: true, description: 'Name of benchmark index', placeholder: 'S&P 500', maxLength: 50 },
    { id: 'portfolioName', name: 'Portfolio Name', type: 'text', required: true, description: 'Name of portfolio', placeholder: 'Growth Portfolio', maxLength: 50 },
    
    // Market Data
    { id: 'marketReturns', name: 'Market Returns', type: 'array', unit: '%', required: false, description: 'Market returns (if different from benchmark)', placeholder: '[1.9, -2.0, 3.0, 0.6, 1.7]', min: -100, max: 100 },
    
    // Risk Metrics
    { id: 'targetAlpha', name: 'Target Alpha', type: 'number', unit: '%', required: false, description: 'Target alpha level for analysis', placeholder: '2.0', min: -10, max: 20 },
    { id: 'maxTrackingError', name: 'Max Tracking Error', type: 'number', unit: '%', required: false, description: 'Maximum acceptable tracking error', placeholder: '5.0', min: 0, max: 20 },
    
    // Transaction Costs
    { id: 'tradingCosts', name: 'Trading Costs', type: 'number', unit: '%', required: false, description: 'Average trading costs as percentage', placeholder: '0.1', min: 0, max: 5 },
    { id: 'managementFees', name: 'Management Fees', type: 'number', unit: '%', required: false, description: 'Annual management fees', placeholder: '1.0', min: 0, max: 10 },
    { id: 'performanceFees', name: 'Performance Fees', type: 'number', unit: '%', required: false, description: 'Performance fees (if applicable)', placeholder: '0.0', min: 0, max: 50 },
    
    // Rebalancing
    { id: 'rebalancingFrequency', name: 'Rebalancing Frequency', type: 'select', required: false, description: 'Portfolio rebalancing frequency', placeholder: 'Select frequency', options: ['monthly', 'quarterly', 'semi-annually', 'annually'] },
    { id: 'rebalancingThreshold', name: 'Rebalancing Threshold', type: 'number', unit: '%', required: false, description: 'Threshold for rebalancing', placeholder: '5.0', min: 0, max: 20 },
    
    // Advanced Parameters
    { id: 'regressionMethod', name: 'Regression Method', type: 'select', required: false, description: 'Statistical regression method', placeholder: 'Select method', options: ['ols', 'robust', 'rolling'] },
    { id: 'rollingWindow', name: 'Rolling Window', type: 'number', unit: 'periods', required: false, description: 'Rolling window size for dynamic analysis', placeholder: '24', min: 6, max: 120 },
    { id: 'outlierTreatment', name: 'Outlier Treatment', type: 'select', required: false, description: 'Treatment of outliers in data', placeholder: 'Select treatment', options: ['include', 'exclude', 'winsorize'] },
    
    // Risk Management
    { id: 'varConfidence', name: 'VaR Confidence Level', type: 'number', unit: '%', required: false, description: 'Value at Risk confidence level', placeholder: '95', min: 80, max: 99.9 },
    
    // Reporting Preferences
    { id: 'currency', name: 'Currency', type: 'select', required: false, description: 'Display currency', placeholder: 'Select currency', options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'] },
    { id: 'displayFormat', name: 'Display Format', type: 'select', required: false, description: 'Number display format', placeholder: 'Select format', options: ['percentage', 'decimal', 'basis-points'] },
    { id: 'includeCharts', name: 'Include Charts', type: 'boolean', required: false, description: 'Include visual charts in analysis', placeholder: 'true' },
    
    // Data Quality
    { id: 'dataStartDate', name: 'Data Start Date', type: 'date', required: false, description: 'Start date for analysis', placeholder: '2020-01-01' },
    { id: 'dataEndDate', name: 'Data End Date', type: 'date', required: false, description: 'End date for analysis', placeholder: '2024-01-01' },
    { id: 'dataFrequency', name: 'Data Frequency', type: 'select', required: false, description: 'Frequency of input data', placeholder: 'Select frequency', options: ['daily', 'weekly', 'monthly', 'quarterly'] },
    { id: 'missingDataTreatment', name: 'Missing Data Treatment', type: 'select', required: false, description: 'Treatment of missing data points', placeholder: 'Select treatment', options: ['interpolate', 'exclude', 'forward-fill'] }
  ],

  outputs: [
    // Core Alpha Metrics
    { id: 'alpha', name: 'Alpha (Jensen\'s Alpha)', type: 'number', unit: '%', description: 'Excess return relative to CAPM' },
    { id: 'alphaAnnualized', name: 'Annualized Alpha', type: 'number', unit: '%', description: 'Annualized excess return' },
    { id: 'alphaTStatistic', name: 'Alpha T-Statistic', type: 'number', unit: 'ratio', description: 'T-statistic for alpha significance' },
    { id: 'alphaPValue', name: 'Alpha P-Value', type: 'number', unit: 'ratio', description: 'P-value for alpha significance' },
    { id: 'alphaStandardError', name: 'Alpha Standard Error', type: 'number', unit: '%', description: 'Standard error of alpha' },
    { id: 'alphaConfidenceIntervalLower', name: 'Alpha CI Lower', type: 'number', unit: '%', description: 'Lower bound of alpha confidence interval' },
    { id: 'alphaConfidenceIntervalUpper', name: 'Alpha CI Upper', type: 'number', unit: '%', description: 'Upper bound of alpha confidence interval' },
    
    // Supporting Metrics
    { id: 'beta', name: 'Beta', type: 'number', unit: 'ratio', description: 'Systematic risk (market sensitivity)' },
    { id: 'rSquared', name: 'R-Squared', type: 'number', unit: 'ratio', description: 'Coefficient of determination' },
    { id: 'correlation', name: 'Correlation', type: 'number', unit: 'ratio', description: 'Correlation with benchmark' },
    
    // Risk Metrics
    { id: 'portfolioVolatility', name: 'Portfolio Volatility', type: 'number', unit: '%', description: 'Portfolio standard deviation' },
    { id: 'benchmarkVolatility', name: 'Benchmark Volatility', type: 'number', unit: '%', description: 'Benchmark standard deviation' },
    { id: 'trackingError', name: 'Tracking Error', type: 'number', unit: '%', description: 'Active risk (excess return volatility)' },
    { id: 'informationRatio', name: 'Information Ratio', type: 'number', unit: 'ratio', description: 'Risk-adjusted excess return' },
    
    // Performance Metrics
    { id: 'totalReturn', name: 'Total Return', type: 'number', unit: '%', description: 'Total portfolio return over period' },
    { id: 'excessReturn', name: 'Excess Return', type: 'number', unit: '%', description: 'Return in excess of benchmark' },
    { id: 'sharpeRatio', name: 'Sharpe Ratio', type: 'number', unit: 'ratio', description: 'Risk-adjusted return' },
    { id: 'sortinoRatio', name: 'Sortino Ratio', type: 'number', unit: 'ratio', description: 'Downside risk-adjusted return' },
    
    // Advanced Metrics
    { id: 'treynorRatio', name: 'Treynor Ratio', type: 'number', unit: 'ratio', description: 'Beta-adjusted return' },
    { id: 'calmarRatio', name: 'Calmar Ratio', type: 'number', unit: 'ratio', description: 'Return to maximum drawdown' },
    { id: 'omegaRatio', name: 'Omega Ratio', type: 'number', unit: 'ratio', description: 'Probability-weighted return ratio' },
    { id: 'upCaptureRatio', name: 'Upside Capture Ratio', type: 'number', unit: '%', description: 'Upside capture ratio' },
    { id: 'downCaptureRatio', name: 'Downside Capture Ratio', type: 'number', unit: '%', description: 'Downside capture ratio' },
    
    // Risk Decomposition
    { id: 'systematicRisk', name: 'Systematic Risk', type: 'number', unit: '%', description: 'Beta-related risk component' },
    { id: 'idiosyncraticRisk', name: 'Idiosyncratic Risk', type: 'number', unit: '%', description: 'Alpha-related risk component' },
    { id: 'totalRisk', name: 'Total Risk', type: 'number', unit: '%', description: 'Total portfolio risk' },
    
    // Performance Attribution
    { id: 'allocationEffect', name: 'Allocation Effect', type: 'number', unit: '%', description: 'Asset allocation contribution' },
    { id: 'selectionEffect', name: 'Selection Effect', type: 'number', unit: '%', description: 'Security selection contribution' },
    { id: 'interactionEffect', name: 'Interaction Effect', type: 'number', unit: '%', description: 'Interaction effect contribution' },
    
    // Alpha Rating
    { id: 'alphaRating', name: 'Alpha Rating', type: 'string', description: 'Overall alpha performance rating' },
    { id: 'significanceLevel', name: 'Significance Level', type: 'string', description: 'Statistical significance of alpha' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Investment recommendation' },
    
    // Comprehensive Analysis
    { id: 'alphaAnalysis', name: 'Alpha Analysis Report', type: 'string', description: 'Comprehensive alpha analysis with recommendations' }
  ],

  calculate: (inputs) => {
    return calculateAlpha(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateAlphaAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Jensen\'s Alpha',
      formula: 'α = Rp - [Rf + β(Rm - Rf)]',
      description: 'Excess return relative to CAPM expected return'
    },
    {
      name: 'Alpha T-Statistic',
      formula: 't = α / SE(α)',
      description: 'Statistical significance test for alpha'
    },
    {
      name: 'Information Ratio',
      formula: 'IR = α / σ(α)',
      description: 'Risk-adjusted alpha using tracking error'
    },
    {
      name: 'Alpha Confidence Interval',
      formula: 'CI = α ± (t_critical × SE(α))',
      description: 'Confidence interval for alpha estimate'
    },
    {
      name: 'Annualized Alpha',
      formula: 'α_annual = α × periods_per_year',
      description: 'Annualized excess return'
    },
    {
      name: 'Alpha Standard Error',
      formula: 'SE(α) = √[σ²_ε × (1/n + x̄²/Σ(x-x̄)²)]',
      description: 'Standard error of alpha estimate'
    },
    {
      name: 'Tracking Error',
      formula: 'TE = σ(Rp - Rb)',
      description: 'Standard deviation of excess returns'
    },
    {
      name: 'R-Squared',
      formula: 'R² = (Correlation(Rp, Rm))²',
      description: 'Proportion of variance explained by market'
    }
  ],

  examples: [
    {
      name: 'Growth Portfolio Alpha Analysis',
      description: 'Active growth portfolio alpha analysis against S&P 500 benchmark',
      inputs: {
        portfolioReturns: [2.1, -1.5, 3.2, 0.8, 1.9, 2.5, -0.8, 1.2, 2.8, 0.5, 1.6, 2.3],
        benchmarkReturns: [1.8, -2.1, 2.9, 0.5, 1.6, 2.1, -1.2, 0.8, 2.2, 0.3, 1.2, 1.9],
        riskFreeRate: 2.5,
        analysisPeriod: 'monthly',
        confidenceLevel: 95,
        lookbackPeriod: 60
      }
    },
    {
      name: 'Value Portfolio Alpha Analysis',
      description: 'Value-oriented portfolio alpha analysis against Russell 1000 Value',
      inputs: {
        portfolioReturns: [1.5, -0.8, 2.1, 0.6, 1.2, 1.8, -0.5, 0.9, 1.9, 0.4, 1.1, 1.6],
        benchmarkReturns: [1.2, -1.5, 1.8, 0.3, 0.9, 1.5, -0.8, 0.6, 1.6, 0.2, 0.8, 1.3],
        riskFreeRate: 2.5,
        analysisPeriod: 'monthly',
        confidenceLevel: 95,
        lookbackPeriod: 60
      }
    }
  ],

  tags: ['Investment Analysis', 'Portfolio Management', 'Alpha', 'Jensen\'s Alpha', 'Performance Attribution', 'Statistical Analysis', 'Risk Management'],
  
  category_info: {
    name: 'Investment Analysis',
    description: 'Professional tools for portfolio analysis, risk management, and performance attribution'
  }
};

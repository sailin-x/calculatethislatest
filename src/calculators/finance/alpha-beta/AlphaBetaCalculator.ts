import { Calculator } from '../../types/calculator';
import { calculateAlphaBeta, generateAlphaBetaAnalysis } from './formulas';
import { validateAlphaBetaInputs } from './validation';

export const AlphaBetaCalculator: Calculator = {
  id: 'alpha-beta-calculator',
  name: 'Alpha & Beta Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Professional investment analysis tool for calculating alpha (excess return), beta (systematic risk), and comprehensive portfolio performance metrics with statistical significance testing.',
  
  longDescription: `
    The Alpha & Beta Calculator is an industry-standard investment analysis tool used by portfolio managers, investment analysts, and financial advisors to evaluate portfolio performance and risk characteristics. This comprehensive calculator provides detailed analysis of alpha (Jensen's Alpha), beta (systematic risk), and a wide range of performance and risk metrics with statistical significance testing.

    **Key Features:**
    • **Alpha Analysis**: Calculate Jensen's Alpha with statistical significance testing
    • **Beta Analysis**: Measure systematic risk and market sensitivity
    • **Performance Metrics**: Sharpe ratio, Sortino ratio, Treynor ratio, and more
    • **Risk Metrics**: Volatility, tracking error, information ratio, and risk decomposition
    • **Statistical Analysis**: T-statistics, p-values, confidence intervals, and R-squared
    • **Performance Attribution**: Asset allocation, security selection, and interaction effects
    • **Factor Analysis**: Multi-factor risk decomposition and factor contributions
    • **Rolling Analysis**: Dynamic alpha and beta analysis over time
    • **Stress Testing**: Scenario analysis and risk assessment under different market conditions
    • **Benchmark Comparison**: Comprehensive benchmark analysis and comparison

    **Use Cases:**
    • Portfolio performance evaluation and attribution analysis
    • Investment manager due diligence and selection
    • Risk management and portfolio optimization
    • Performance reporting and client communication
    • Investment strategy development and backtesting
    • Regulatory compliance and reporting requirements
    • Academic research and financial analysis
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
    { id: 'marketVolatility', name: 'Market Volatility', type: 'number', unit: '%', required: false, description: 'Annualized market volatility', placeholder: '15.5', min: 0, max: 100 },
    
    // Risk Metrics
    { id: 'targetVolatility', name: 'Target Volatility', type: 'number', unit: '%', required: false, description: 'Target portfolio volatility', placeholder: '12.0', min: 0, max: 50 },
    { id: 'maxDrawdown', name: 'Maximum Drawdown', type: 'number', unit: '%', required: false, description: 'Maximum acceptable drawdown', placeholder: '20.0', min: 0, max: 100 },
    
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
    // Basic Metrics
    { id: 'alpha', name: 'Alpha (Jensen\'s Alpha)', type: 'number', unit: '%', description: 'Excess return relative to CAPM' },
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
    
    // Statistical Metrics
    { id: 'tStatistic', name: 'T-Statistic', type: 'number', unit: 'ratio', description: 'T-statistic for alpha significance' },
    { id: 'pValue', name: 'P-Value', type: 'number', unit: 'ratio', description: 'P-value for alpha significance' },
    { id: 'standardError', name: 'Standard Error', type: 'number', unit: '%', description: 'Standard error of alpha' },
    { id: 'confidenceIntervalLower', name: 'Alpha CI Lower', type: 'number', unit: '%', description: 'Lower bound of alpha confidence interval' },
    { id: 'confidenceIntervalUpper', name: 'Alpha CI Upper', type: 'number', unit: '%', description: 'Upper bound of alpha confidence interval' },
    
    // Risk Decomposition
    { id: 'systematicRisk', name: 'Systematic Risk', type: 'number', unit: '%', description: 'Beta-related risk component' },
    { id: 'idiosyncraticRisk', name: 'Idiosyncratic Risk', type: 'number', unit: '%', description: 'Alpha-related risk component' },
    { id: 'totalRisk', name: 'Total Risk', type: 'number', unit: '%', description: 'Total portfolio risk' },
    
    // Performance Attribution
    { id: 'allocationEffect', name: 'Allocation Effect', type: 'number', unit: '%', description: 'Asset allocation contribution' },
    { id: 'selectionEffect', name: 'Selection Effect', type: 'number', unit: '%', description: 'Security selection contribution' },
    { id: 'interactionEffect', name: 'Interaction Effect', type: 'number', unit: '%', description: 'Interaction effect contribution' },
    
    // Performance Rating
    { id: 'performanceRating', name: 'Performance Rating', type: 'string', description: 'Overall performance rating' },
    { id: 'riskRating', name: 'Risk Rating', type: 'string', description: 'Overall risk rating' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Investment recommendation' },
    
    // Alpha Significance
    { id: 'alphaSignificance', name: 'Alpha Significance', type: 'string', description: 'Statistical significance of alpha' },
    { id: 'betaStability', name: 'Beta Stability', type: 'string', description: 'Stability of beta over time' },
    
    // Comprehensive Analysis
    { id: 'alphaBetaAnalysis', name: 'Alpha & Beta Analysis Report', type: 'string', description: 'Comprehensive alpha and beta analysis with recommendations' }
  ],

  calculate: (inputs) => {
    return calculateAlphaBeta(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateAlphaBetaAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Alpha (Jensen\'s Alpha)',
      formula: 'α = Rp - [Rf + β(Rm - Rf)]',
      description: 'Excess return relative to CAPM expected return'
    },
    {
      name: 'Beta',
      formula: 'β = Cov(Rp, Rm) / Var(Rm)',
      description: 'Systematic risk measure (market sensitivity)'
    },
    {
      name: 'Sharpe Ratio',
      formula: 'Sharpe = (Rp - Rf) / σp',
      description: 'Risk-adjusted return using total risk'
    },
    {
      name: 'Information Ratio',
      formula: 'IR = (Rp - Rb) / σ(Rp - Rb)',
      description: 'Risk-adjusted excess return using tracking error'
    },
    {
      name: 'Treynor Ratio',
      formula: 'Treynor = (Rp - Rf) / β',
      description: 'Risk-adjusted return using systematic risk'
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
    },
    {
      name: 'T-Statistic',
      formula: 't = α / SE(α)',
      description: 'Statistical significance test for alpha'
    }
  ],

  examples: [
    {
      name: 'Growth Portfolio vs S&P 500',
      description: 'Active growth portfolio analysis against S&P 500 benchmark',
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
      name: 'Value Portfolio vs Russell 1000',
      description: 'Value-oriented portfolio analysis against Russell 1000 Value',
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

  tags: ['Investment Analysis', 'Portfolio Management', 'Risk Management', 'Performance Attribution', 'Alpha', 'Beta', 'Sharpe Ratio', 'Statistical Analysis'],
  
  category_info: {
    name: 'Investment Analysis',
    description: 'Professional tools for portfolio analysis, risk management, and performance attribution'
  }
};

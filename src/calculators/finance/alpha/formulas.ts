import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';
import { AlphaInputs, AlphaOutputs, AlphaMetrics, AlphaAnalysis } from './types';

/**
 * Calculate comprehensive alpha analysis
 */
export function calculateAlpha(inputs: AlphaInputs): AlphaOutputs {
  // Ensure we have valid data
  const portfolioReturns = inputs.portfolioReturns || [];
  const benchmarkReturns = inputs.benchmarkReturns || [];
  const marketReturns = inputs.marketReturns || benchmarkReturns;
  
  if (portfolioReturns.length !== benchmarkReturns.length || portfolioReturns.length === 0) {
    throw new Error('Portfolio and benchmark returns must have the same length and be non-empty');
  }

  const n = portfolioReturns.length;
  const periodsPerYear = getPeriodsPerYear(inputs.analysisPeriod);
  
  // Calculate basic statistics
  const portfolioMean = calculateMean(portfolioReturns);
  const benchmarkMean = calculateMean(benchmarkReturns);
  const marketMean = calculateMean(marketReturns);
  
  const portfolioVolatility = calculateVolatility(portfolioReturns, periodsPerYear);
  const benchmarkVolatility = calculateVolatility(benchmarkReturns, periodsPerYear);
  
  // Calculate beta using covariance and variance
  const beta = calculateBeta(portfolioReturns, marketReturns);
  
  // Calculate alpha using CAPM
  const riskFreeRatePeriodic = inputs.riskFreeRate / 100 / periodsPerYear;
  const alpha = portfolioMean - (riskFreeRatePeriodic + beta * (marketMean - riskFreeRatePeriodic));
  const alphaAnnualized = alpha * periodsPerYear;
  
  // Calculate correlation and R-squared
  const correlation = calculateCorrelation(portfolioReturns, benchmarkReturns);
  const rSquared = correlation * correlation;
  
  // Calculate excess returns and tracking error
  const excessReturns = portfolioReturns.map((r, i) => r - benchmarkReturns[i]);
  const excessReturn = calculateMean(excessReturns);
  const trackingError = calculateVolatility(excessReturns, periodsPerYear);
  
  // Calculate total return
  const totalReturn = calculateTotalReturn(portfolioReturns);
  
  // Calculate risk-adjusted ratios
  const sharpeRatio = calculateSharpeRatio(portfolioReturns, riskFreeRatePeriodic, periodsPerYear);
  const sortinoRatio = calculateSortinoRatio(portfolioReturns, riskFreeRatePeriodic, periodsPerYear);
  const treynorRatio = calculateTreynorRatio(portfolioReturns, riskFreeRatePeriodic, beta, periodsPerYear);
  const informationRatio = trackingError > 0 ? alpha / trackingError : 0;
  
  // Calculate advanced metrics
  const calmarRatio = calculateCalmarRatio(portfolioReturns, periodsPerYear);
  const omegaRatio = calculateOmegaRatio(portfolioReturns, riskFreeRatePeriodic);
  const upCaptureRatio = calculateCaptureRatio(portfolioReturns, benchmarkReturns, 'up');
  const downCaptureRatio = calculateCaptureRatio(portfolioReturns, benchmarkReturns, 'down');
  
  // Calculate statistical significance
  const standardError = calculateStandardError(portfolioReturns, marketReturns, alpha, beta);
  const tStatistic = standardError > 0 ? alpha / standardError : 0;
  const pValue = calculatePValue(tStatistic, n - 2);
  
  // Calculate confidence interval
  const confidenceInterval = calculateConfidenceInterval(alpha, standardError, inputs.confidenceLevel, n - 2);
  
  // Calculate risk decomposition
  const systematicRisk = beta * benchmarkVolatility;
  const idiosyncraticRisk = Math.sqrt(Math.max(0, portfolioVolatility * portfolioVolatility - systematicRisk * systematicRisk));
  const totalRisk = portfolioVolatility;
  
  // Calculate performance attribution (simplified)
  const allocationEffect = 0; // Would require sector weights
  const selectionEffect = excessReturn;
  const interactionEffect = 0; // Would require detailed analysis
  
  // Generate rolling analysis
  const rollingWindow = inputs.rollingWindow || Math.min(24, Math.floor(n / 2));
  const rollingAlpha = calculateRollingAlpha(portfolioReturns, marketReturns, riskFreeRatePeriodic, rollingWindow);
  const rollingBeta = calculateRollingBeta(portfolioReturns, marketReturns, rollingWindow);
  const rollingSharpe = calculateRollingSharpe(portfolioReturns, riskFreeRatePeriodic, rollingWindow, periodsPerYear);
  
  // Generate comprehensive analysis
  const analysis = generateAnalysis(inputs, {
    alpha,
    alphaAnnualized,
    tStatistic,
    pValue,
    sharpeRatio,
    informationRatio,
    portfolioVolatility,
    trackingError,
    excessReturn,
    rSquared
  });
  
  // Calculate quality metrics
  const dataQuality = assessDataQuality(inputs);
  const modelAccuracy = assessModelAccuracy(inputs, rSquared);
  const confidenceLevel = calculateConfidenceLevel(inputs, tStatistic, pValue);
  
  // Generate time series data
  const timeSeriesData = generateTimeSeriesData(portfolioReturns, benchmarkReturns, alpha, beta);
  
  // Generate rolling metrics
  const rollingMetrics = generateRollingMetrics(rollingAlpha, rollingBeta, rollingSharpe, informationRatio);
  
  // Generate factor decomposition
  const factorDecomposition = generateFactorDecomposition(inputs, alpha, beta);
  
  // Generate risk metrics over time
  const riskMetrics = generateRiskMetrics(portfolioReturns, periodsPerYear);
  
  // Generate attribution over time
  const attributionOverTime = generateAttributionOverTime(portfolioReturns, benchmarkReturns);
  
  // Generate benchmark comparison over time
  const benchmarkComparisonOverTime = generateBenchmarkComparisonOverTime(portfolioReturns, benchmarkReturns);
  
  // Generate stress test scenarios
  const stressTestScenarios = generateStressTestScenarios(inputs, alpha, beta, portfolioVolatility);
  
  // Generate optimization suggestions
  const optimizationSuggestions = generateOptimizationSuggestions(inputs, alpha, sharpeRatio, informationRatio);
  
  // Generate risk management suggestions
  const riskManagementSuggestions = generateRiskManagementSuggestions(inputs, portfolioVolatility, trackingError, maxDrawdown);
  
  return {
    // Core Alpha Metrics
    alpha,
    alphaAnnualized,
    alphaTStatistic: tStatistic,
    alphaPValue: pValue,
    alphaStandardError: standardError,
    alphaConfidenceInterval: confidenceInterval,
    
    // Supporting Metrics
    beta,
    rSquared,
    correlation,
    
    // Risk Metrics
    portfolioVolatility,
    benchmarkVolatility,
    trackingError,
    informationRatio,
    
    // Performance Metrics
    totalReturn,
    excessReturn,
    sharpeRatio,
    sortinoRatio,
    
    // Advanced Metrics
    treynorRatio,
    calmarRatio,
    omegaRatio,
    upCaptureRatio,
    downCaptureRatio,
    
    // Risk Decomposition
    systematicRisk,
    idiosyncraticRisk,
    totalRisk,
    
    // Performance Attribution
    allocationEffect,
    selectionEffect,
    interactionEffect,
    
    // Rolling Analysis
    rollingAlpha,
    rollingBeta,
    rollingSharpe,
    
    // Stress Testing
    stressTestResults: stressTestScenarios,
    
    // Benchmark Comparison
    benchmarkComparison: generateBenchmarkComparison(portfolioReturns, benchmarkReturns, alpha, beta, sharpeRatio),
    
    // Analysis
    analysis,
    
    // Additional Output Metrics
    dataQuality,
    modelAccuracy,
    confidenceLevel,
    
    // Time Series Analysis
    timeSeriesData,
    
    // Rolling Window Analysis
    rollingMetrics,
    
    // Factor Decomposition
    factorDecomposition,
    
    // Risk Metrics Over Time
    riskMetrics,
    
    // Performance Attribution Over Time
    attributionOverTime,
    
    // Benchmark Comparison Over Time
    benchmarkComparisonOverTime,
    
    // Stress Test Results
    stressTestScenarios,
    
    // Optimization Recommendations
    optimizationSuggestions,
    
    // Risk Management Recommendations
    riskManagementSuggestions
  };
}

// Helper functions (same as Alpha & Beta Calculator)
function getPeriodsPerYear(period: string): number {
  switch (period) {
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'yearly': return 1;
    default: return 12;
  }
}

function calculateMean(returns: number[]): number {
  return returns.reduce((sum, r) => sum + r, 0) / returns.length;
}

function calculateVolatility(returns: number[], periodsPerYear: number): number {
  const mean = calculateMean(returns);
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
  return Math.sqrt(variance * periodsPerYear);
}

function calculateBeta(portfolioReturns: number[], marketReturns: number[]): number {
  const portfolioMean = calculateMean(portfolioReturns);
  const marketMean = calculateMean(marketReturns);
  
  let covariance = 0;
  let marketVariance = 0;
  
  for (let i = 0; i < portfolioReturns.length; i++) {
    const portfolioDiff = portfolioReturns[i] - portfolioMean;
    const marketDiff = marketReturns[i] - marketMean;
    covariance += portfolioDiff * marketDiff;
    marketVariance += marketDiff * marketDiff;
  }
  
  covariance /= (portfolioReturns.length - 1);
  marketVariance /= (marketReturns.length - 1);
  
  return marketVariance > 0 ? covariance / marketVariance : 0;
}

function calculateCorrelation(returns1: number[], returns2: number[]): number {
  const mean1 = calculateMean(returns1);
  const mean2 = calculateMean(returns2);
  
  let numerator = 0;
  let denominator1 = 0;
  let denominator2 = 0;
  
  for (let i = 0; i < returns1.length; i++) {
    const diff1 = returns1[i] - mean1;
    const diff2 = returns2[i] - mean2;
    numerator += diff1 * diff2;
    denominator1 += diff1 * diff1;
    denominator2 += diff2 * diff2;
  }
  
  const denominator = Math.sqrt(denominator1 * denominator2);
  return denominator > 0 ? numerator / denominator : 0;
}

function calculateTotalReturn(returns: number[]): number {
  return returns.reduce((total, r) => total * (1 + r / 100), 1) - 1;
}

function calculateSharpeRatio(returns: number[], riskFreeRate: number, periodsPerYear: number): number {
  const mean = calculateMean(returns);
  const volatility = calculateVolatility(returns, periodsPerYear);
  return volatility > 0 ? (mean - riskFreeRate) / volatility : 0;
}

function calculateSortinoRatio(returns: number[], riskFreeRate: number, periodsPerYear: number): number {
  const mean = calculateMean(returns);
  const downsideReturns = returns.filter(r => r < riskFreeRate);
  
  if (downsideReturns.length === 0) return 0;
  
  const downsideVariance = downsideReturns.reduce((sum, r) => sum + Math.pow(r - riskFreeRate, 2), 0) / downsideReturns.length;
  const downsideDeviation = Math.sqrt(downsideVariance * periodsPerYear);
  
  return downsideDeviation > 0 ? (mean - riskFreeRate) / downsideDeviation : 0;
}

function calculateTreynorRatio(returns: number[], riskFreeRate: number, beta: number, periodsPerYear: number): number {
  const mean = calculateMean(returns);
  return beta > 0 ? (mean - riskFreeRate) / beta : 0;
}

function calculateCalmarRatio(returns: number[], periodsPerYear: number): number {
  const mean = calculateMean(returns);
  const maxDrawdown = calculateMaxDrawdown(returns);
  return maxDrawdown > 0 ? (mean * periodsPerYear) / maxDrawdown : 0;
}

function calculateMaxDrawdown(returns: number[]): number {
  let peak = 1;
  let maxDrawdown = 0;
  let cumulative = 1;
  
  for (const r of returns) {
    cumulative *= (1 + r / 100);
    if (cumulative > peak) {
      peak = cumulative;
    }
    const drawdown = (peak - cumulative) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }
  
  return maxDrawdown;
}

function calculateOmegaRatio(returns: number[], threshold: number): number {
  const gains = returns.filter(r => r > threshold).reduce((sum, r) => sum + (r - threshold), 0);
  const losses = returns.filter(r => r < threshold).reduce((sum, r) => sum + (threshold - r), 0);
  return losses > 0 ? gains / losses : 0;
}

function calculateCaptureRatio(portfolioReturns: number[], benchmarkReturns: number[], direction: 'up' | 'down'): number {
  const filteredIndices = benchmarkReturns
    .map((r, i) => ({ return: r, index: i }))
    .filter(item => direction === 'up' ? item.return > 0 : item.return < 0);
  
  if (filteredIndices.length === 0) return 0;
  
  const portfolioSum = filteredIndices.reduce((sum, item) => sum + portfolioReturns[item.index], 0);
  const benchmarkSum = filteredIndices.reduce((sum, item) => sum + item.return, 0);
  
  return benchmarkSum > 0 ? portfolioSum / benchmarkSum : 0;
}

function calculateStandardError(portfolioReturns: number[], marketReturns: number[], alpha: number, beta: number): number {
  const residuals = portfolioReturns.map((r, i) => {
    const expected = alpha + beta * marketReturns[i];
    return r - expected;
  });
  
  const residualVariance = residuals.reduce((sum, r) => sum + r * r, 0) / (residuals.length - 2);
  const marketMean = calculateMean(marketReturns);
  const marketVariance = marketReturns.reduce((sum, r) => sum + Math.pow(r - marketMean, 2), 0) / marketReturns.length;
  
  return Math.sqrt(residualVariance * (1 / residuals.length + Math.pow(marketMean, 2) / marketVariance));
}

function calculatePValue(tStatistic: number, degreesOfFreedom: number): number {
  const absT = Math.abs(tStatistic);
  if (absT > 3.291) return 0.001;
  if (absT > 2.576) return 0.01;
  if (absT > 1.96) return 0.05;
  if (absT > 1.645) return 0.1;
  return 0.5;
}

function calculateConfidenceInterval(alpha: number, standardError: number, confidenceLevel: number, degreesOfFreedom: number): { lower: number; upper: number } {
  const zScore = confidenceLevel === 95 ? 1.96 : confidenceLevel === 99 ? 2.576 : 1.645;
  const margin = zScore * standardError;
  
  return {
    lower: alpha - margin,
    upper: alpha + margin
  };
}

function calculateRollingAlpha(portfolioReturns: number[], marketReturns: number[], riskFreeRate: number, window: number): number[] {
  const alphas: number[] = [];
  
  for (let i = window; i <= portfolioReturns.length; i++) {
    const portfolioWindow = portfolioReturns.slice(i - window, i);
    const marketWindow = marketReturns.slice(i - window, i);
    const beta = calculateBeta(portfolioWindow, marketWindow);
    const portfolioMean = calculateMean(portfolioWindow);
    const marketMean = calculateMean(marketWindow);
    const alpha = portfolioMean - (riskFreeRate + beta * (marketMean - riskFreeRate));
    alphas.push(alpha);
  }
  
  return alphas;
}

function calculateRollingBeta(portfolioReturns: number[], marketReturns: number[], window: number): number[] {
  const betas: number[] = [];
  
  for (let i = window; i <= portfolioReturns.length; i++) {
    const portfolioWindow = portfolioReturns.slice(i - window, i);
    const marketWindow = marketReturns.slice(i - window, i);
    const beta = calculateBeta(portfolioWindow, marketWindow);
    betas.push(beta);
  }
  
  return betas;
}

function calculateRollingSharpe(returns: number[], riskFreeRate: number, window: number, periodsPerYear: number): number[] {
  const sharpes: number[] = [];
  
  for (let i = window; i <= returns.length; i++) {
    const windowReturns = returns.slice(i - window, i);
    const sharpe = calculateSharpeRatio(windowReturns, riskFreeRate, periodsPerYear);
    sharpes.push(sharpe);
  }
  
  return sharpes;
}

function generateAnalysis(inputs: AlphaInputs, metrics: any): AlphaAnalysis {
  const isPositiveAlpha = metrics.alpha > 0;
  const isSignificantAlpha = metrics.pValue < 0.05;
  const isGoodSharpe = metrics.sharpeRatio > 1;
  const isGoodInformationRatio = metrics.informationRatio > 0.5;
  
  let alphaRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' = 'Average';
  let significanceLevel: 'Highly Significant' | 'Significant' | 'Marginally Significant' | 'Not Significant' = 'Not Significant';
  let recommendation: 'Buy' | 'Hold' | 'Sell' | 'Strong Buy' | 'Strong Sell' = 'Hold';
  
  // Alpha rating logic
  if (isPositiveAlpha && isSignificantAlpha && isGoodSharpe && isGoodInformationRatio) {
    alphaRating = 'Excellent';
  } else if (isPositiveAlpha && isGoodSharpe) {
    alphaRating = 'Good';
  } else if (!isPositiveAlpha && metrics.sharpeRatio < 0.5) {
    alphaRating = 'Poor';
  } else if (!isPositiveAlpha && metrics.sharpeRatio < 0) {
    alphaRating = 'Very Poor';
  }
  
  // Significance level
  if (metrics.pValue < 0.01) {
    significanceLevel = 'Highly Significant';
  } else if (metrics.pValue < 0.05) {
    significanceLevel = 'Significant';
  } else if (metrics.pValue < 0.1) {
    significanceLevel = 'Marginally Significant';
  }
  
  // Recommendation logic
  if (alphaRating === 'Excellent') {
    recommendation = 'Strong Buy';
  } else if (alphaRating === 'Good') {
    recommendation = 'Buy';
  } else if (alphaRating === 'Poor') {
    recommendation = 'Sell';
  } else if (alphaRating === 'Very Poor') {
    recommendation = 'Strong Sell';
  }
  
  return {
    alphaRating,
    significanceLevel,
    recommendation,
    keyStrengths: [
      isPositiveAlpha ? 'Positive alpha generation' : 'No alpha generation',
      isGoodSharpe ? 'Strong risk-adjusted returns' : 'Weak risk-adjusted returns',
      isGoodInformationRatio ? 'Effective active management' : 'Ineffective active management'
    ],
    keyWeaknesses: [
      !isPositiveAlpha ? 'Negative alpha' : 'Limited alpha',
      !isGoodSharpe ? 'Poor risk-adjusted returns' : 'Moderate risk-adjusted returns',
      metrics.trackingError > 5 ? 'High tracking error' : 'Acceptable tracking error'
    ],
    riskFactors: [
      'Market volatility risk',
      'Systematic risk exposure',
      'Tracking error risk',
      'Liquidity risk'
    ],
    opportunities: [
      'Portfolio optimization',
      'Risk management improvements',
      'Enhanced diversification'
    ],
    alphaSummary: `Portfolio shows ${isPositiveAlpha ? 'positive' : 'negative'} alpha of ${metrics.alpha.toFixed(2)}% with ${significanceLevel.toLowerCase()} statistical significance.`,
    significanceAnalysis: `Alpha t-statistic of ${metrics.tStatistic.toFixed(2)} with p-value of ${metrics.pValue.toFixed(3)} indicates ${significanceLevel.toLowerCase()} statistical significance.`,
    attributionAnalysis: `Excess return of ${metrics.excessReturn.toFixed(2)}% primarily driven by ${isPositiveAlpha ? 'positive' : 'negative'} alpha generation.`,
    riskProfile: `Portfolio exhibits moderate risk with tracking error of ${metrics.trackingError.toFixed(1)}%.`,
    downsideProtection: metrics.sortinoRatio > 1 ? 'Good downside protection' : 'Limited downside protection',
    upsidePotential: isPositiveAlpha ? 'Strong upside potential' : 'Limited upside potential',
    factorExposure: `Market beta exposure with R-squared of ${metrics.rSquared.toFixed(2)}.`,
    sectorAnalysis: 'Sector analysis requires detailed portfolio holdings data.',
    styleAnalysis: 'Style analysis requires factor model implementation.',
    benchmarkFit: `Benchmark correlation indicates moderate benchmark fit.`,
    benchmarkComparison: `Portfolio ${isPositiveAlpha ? 'outperforms' : 'underperforms'} benchmark by ${Math.abs(metrics.excessReturn).toFixed(2)}%.`,
    benchmarkRecommendation: isPositiveAlpha ? 'Consider maintaining benchmark exposure' : 'Consider benchmark alternatives',
    optimizationSuggestions: [
      'Review asset allocation',
      'Optimize security selection',
      'Consider factor tilts'
    ],
    rebalancingRecommendations: [
      'Monitor tracking error',
      'Review risk budget',
      'Assess rebalancing frequency'
    ],
    riskManagementSuggestions: [
      'Set volatility targets',
      'Monitor drawdown limits',
      'Implement stop-loss strategies'
    ],
    marketEnvironment: 'Current market environment analysis required.',
    economicOutlook: 'Economic outlook analysis required.',
    sectorOutlook: 'Sector outlook analysis required.',
    returnAttribution: [
      {
        source: 'Alpha',
        contribution: metrics.alpha,
        explanation: 'Manager skill contribution'
      },
      {
        source: 'Beta',
        contribution: metrics.beta * (calculateMean(inputs.benchmarkReturns) - inputs.riskFreeRate / 100 / getPeriodsPerYear(inputs.analysisPeriod)),
        explanation: 'Market exposure contribution'
      }
    ],
    riskAttribution: [
      {
        source: 'Systematic Risk',
        contribution: metrics.beta * calculateVolatility(inputs.benchmarkReturns, getPeriodsPerYear(inputs.analysisPeriod)),
        explanation: 'Market-related risk'
      },
      {
        source: 'Idiosyncratic Risk',
        contribution: Math.sqrt(Math.max(0, Math.pow(calculateVolatility(inputs.portfolioReturns, getPeriodsPerYear(inputs.analysisPeriod)), 2) - Math.pow(metrics.beta * calculateVolatility(inputs.benchmarkReturns, getPeriodsPerYear(inputs.analysisPeriod)), 2))),
        explanation: 'Portfolio-specific risk'
      }
    ],
    expectedAlpha: metrics.alpha,
    expectedReturn: calculateMean(inputs.portfolioReturns) * getPeriodsPerYear(inputs.analysisPeriod),
    expectedRisk: calculateVolatility(inputs.portfolioReturns, getPeriodsPerYear(inputs.analysisPeriod)),
    sensitivityFactors: [
      {
        factor: 'Market Volatility',
        impact: metrics.beta,
        direction: 'positive' as const
      },
      {
        factor: 'Interest Rates',
        impact: -0.1,
        direction: 'negative' as const
      }
    ],
    tradingImplications: [
      'Monitor tracking error',
      'Review rebalancing frequency',
      'Assess transaction costs'
    ],
    costConsiderations: [
      'Management fees impact',
      'Trading costs analysis',
      'Tax efficiency review'
    ],
    operationalRequirements: [
      'Regular performance monitoring',
      'Risk limit compliance',
      'Reporting requirements'
    ],
    regulatoryConsiderations: [
      'Performance disclosure',
      'Risk reporting',
      'Compliance monitoring'
    ],
    complianceRequirements: [
      'Regular performance review',
      'Risk limit monitoring',
      'Client reporting'
    ],
    reportingRequirements: [
      'Monthly performance reports',
      'Quarterly attribution analysis',
      'Annual risk review'
    ],
    monitoringFrequency: 'Monthly',
    reviewTriggers: [
      'Alpha becomes negative',
      'Tracking error exceeds limits',
      'Risk metrics deteriorate'
    ],
    performanceThresholds: [
      {
        metric: 'Alpha',
        threshold: 0,
        action: 'Review strategy'
      },
      {
        metric: 'Sharpe Ratio',
        threshold: 0.5,
        action: 'Optimize portfolio'
      }
    ]
  };
}

function assessDataQuality(inputs: AlphaInputs): number {
  let quality = 80;
  
  if (inputs.portfolioReturns.length < 24) quality -= 20;
  if (inputs.portfolioReturns.length < 12) quality -= 30;
  
  const hasMissingData = inputs.portfolioReturns.some(r => r === null || r === undefined);
  if (hasMissingData) quality -= 15;
  
  const extremeValues = inputs.portfolioReturns.filter(r => Math.abs(r) > 50);
  if (extremeValues.length > 0) quality -= 10;
  
  return Math.max(50, Math.min(100, quality));
}

function assessModelAccuracy(inputs: AlphaInputs, rSquared: number): number {
  let accuracy = 70;
  accuracy += rSquared * 20;
  
  const dataLength = inputs.portfolioReturns.length;
  if (dataLength > 60) accuracy += 10;
  if (dataLength > 120) accuracy += 5;
  
  return Math.max(60, Math.min(95, accuracy));
}

function calculateConfidenceLevel(inputs: AlphaInputs, tStatistic: number, pValue: number): number {
  let confidence = 70;
  
  if (pValue < 0.01) confidence += 20;
  else if (pValue < 0.05) confidence += 15;
  else if (pValue < 0.1) confidence += 10;
  
  const dataQuality = assessDataQuality(inputs);
  confidence += (dataQuality - 70) * 0.3;
  
  return Math.max(50, Math.min(95, confidence));
}

function generateTimeSeriesData(portfolioReturns: number[], benchmarkReturns: number[], alpha: number, beta: number) {
  return portfolioReturns.map((r, i) => ({
    date: `Period ${i + 1}`,
    portfolioReturn: r,
    benchmarkReturn: benchmarkReturns[i],
    cumulativeAlpha: alpha * (i + 1),
    cumulativeBeta: beta
  }));
}

function generateRollingMetrics(rollingAlpha: number[], rollingBeta: number[], rollingSharpe: number[], informationRatio: number) {
  return rollingAlpha.map((alpha, i) => ({
    period: `Period ${i + 1}`,
    alpha,
    beta: rollingBeta[i],
    sharpeRatio: rollingSharpe[i],
    informationRatio
  }));
}

function generateFactorDecomposition(inputs: AlphaInputs, alpha: number, beta: number) {
  return [
    {
      factor: 'Market Beta',
      exposure: beta,
      contribution: beta * calculateMean(inputs.benchmarkReturns),
      riskContribution: beta * calculateVolatility(inputs.benchmarkReturns, getPeriodsPerYear(inputs.analysisPeriod))
    },
    {
      factor: 'Alpha',
      exposure: 1,
      contribution: alpha,
      riskContribution: Math.sqrt(Math.max(0, Math.pow(calculateVolatility(inputs.portfolioReturns, getPeriodsPerYear(inputs.analysisPeriod)), 2) - Math.pow(beta * calculateVolatility(inputs.benchmarkReturns, getPeriodsPerYear(inputs.analysisPeriod)), 2)))
    }
  ];
}

function generateRiskMetrics(returns: number[], periodsPerYear: number) {
  const volatility = calculateVolatility(returns, periodsPerYear);
  const maxDrawdown = calculateMaxDrawdown(returns);
  
  return [
    {
      period: 'Current',
      volatility,
      var: volatility * 1.645,
      maxDrawdown,
      calmarRatio: calculateMean(returns) * periodsPerYear / maxDrawdown
    }
  ];
}

function generateAttributionOverTime(portfolioReturns: number[], benchmarkReturns: number[]) {
  return portfolioReturns.map((r, i) => ({
    period: `Period ${i + 1}`,
    allocationEffect: 0,
    selectionEffect: r - benchmarkReturns[i],
    interactionEffect: 0,
    totalEffect: r - benchmarkReturns[i]
  }));
}

function generateBenchmarkComparisonOverTime(portfolioReturns: number[], benchmarkReturns: number[]) {
  return portfolioReturns.map((r, i) => ({
    period: `Period ${i + 1}`,
    portfolioReturn: r,
    benchmarkReturn: benchmarkReturns[i],
    excessReturn: r - benchmarkReturns[i],
    trackingError: Math.abs(r - benchmarkReturns[i])
  }));
}

function generateStressTestScenarios(inputs: AlphaInputs, alpha: number, beta: number, portfolioVolatility: number) {
  return [
    {
      scenario: 'Market Crash (-20%)',
      portfolioReturn: alpha + beta * (-20),
      benchmarkReturn: -20,
      alpha,
      beta,
      sharpeRatio: (alpha + beta * (-20)) / portfolioVolatility
    },
    {
      scenario: 'Market Rally (+20%)',
      portfolioReturn: alpha + beta * 20,
      benchmarkReturn: 20,
      alpha,
      beta,
      sharpeRatio: (alpha + beta * 20) / portfolioVolatility
    }
  ];
}

function generateOptimizationSuggestions(inputs: AlphaInputs, alpha: number, sharpeRatio: number, informationRatio: number) {
  const suggestions = [];
  
  if (alpha < 0) {
    suggestions.push({
      action: 'Review manager selection',
      expectedImpact: 2.0,
      implementation: 'Conduct manager due diligence',
      risk: 'Manager transition risk'
    });
  }
  
  if (sharpeRatio < 0.5) {
    suggestions.push({
      action: 'Optimize risk allocation',
      expectedImpact: 0.5,
      implementation: 'Review asset allocation',
      risk: 'Allocation change risk'
    });
  }
  
  return suggestions;
}

function generateRiskManagementSuggestions(inputs: AlphaInputs, portfolioVolatility: number, trackingError: number, maxDrawdown: number) {
  const suggestions = [];
  
  if (portfolioVolatility > 20) {
    suggestions.push({
      action: 'Reduce portfolio volatility',
      expectedBenefit: 5.0,
      implementation: 'Increase defensive allocations',
      cost: 'Potential return reduction'
    });
  }
  
  if (trackingError > 5) {
    suggestions.push({
      action: 'Reduce tracking error',
      expectedBenefit: 2.0,
      implementation: 'Closer benchmark alignment',
      cost: 'Reduced alpha potential'
    });
  }
  
  return suggestions;
}

function generateBenchmarkComparison(portfolioReturns: number[], benchmarkReturns: number[], alpha: number, beta: number, sharpeRatio: number) {
  const portfolioMean = calculateMean(portfolioReturns);
  const benchmarkMean = calculateMean(benchmarkReturns);
  const portfolioVol = calculateVolatility(portfolioReturns, 12);
  const benchmarkVol = calculateVolatility(benchmarkReturns, 12);
  
  return [
    {
      metric: 'Return',
      portfolio: portfolioMean * 12,
      benchmark: benchmarkMean * 12,
      difference: (portfolioMean - benchmarkMean) * 12
    },
    {
      metric: 'Volatility',
      portfolio: portfolioVol,
      benchmark: benchmarkVol,
      difference: portfolioVol - benchmarkVol
    },
    {
      metric: 'Sharpe Ratio',
      portfolio: sharpeRatio,
      benchmark: benchmarkMean / benchmarkVol,
      difference: sharpeRatio - (benchmarkMean / benchmarkVol)
    }
  ];
}

/**
 * Generate comprehensive alpha analysis report
 */
export function generateAlphaAnalysis(inputs: AlphaInputs, outputs: AlphaOutputs): string {
  const isPositiveAlpha = outputs.alpha > 0;
  const isSignificant = outputs.pValue < 0.05;
  
  return `
# Alpha Analysis Report

## Executive Summary
**Portfolio**: ${inputs.portfolioName || 'Portfolio'}
**Benchmark**: ${inputs.benchmarkName || 'Benchmark'}
**Analysis Period**: ${inputs.analysisPeriod} data over ${inputs.lookbackPeriod} periods

**Alpha Rating**: ${outputs.analysis.alphaRating}
**Significance Level**: ${outputs.analysis.significanceLevel}
**Recommendation**: ${outputs.analysis.recommendation}

## Core Alpha Metrics

### Jensen's Alpha Analysis
- **Alpha (Jensen's Alpha)**: ${outputs.alpha.toFixed(2)}% ${isPositiveAlpha ? '(Positive)' : '(Negative)'}
- **Annualized Alpha**: ${outputs.alphaAnnualized.toFixed(2)}%
- **Alpha T-Statistic**: ${outputs.alphaTStatistic.toFixed(2)}
- **Alpha P-Value**: ${outputs.alphaPValue.toFixed(3)}
- **Alpha Standard Error**: ${outputs.alphaStandardError.toFixed(2)}%
- **Alpha Confidence Interval**: [${outputs.alphaConfidenceInterval.lower.toFixed(2)}%, ${outputs.alphaConfidenceInterval.upper.toFixed(2)}%]

### Supporting Metrics
- **Beta**: ${outputs.beta.toFixed(2)} ${outputs.beta > 1 ? '(High Market Sensitivity)' : outputs.beta < 1 ? '(Low Market Sensitivity)' : '(Market Neutral)'}
- **R-Squared**: ${outputs.rSquared.toFixed(2)} (${(outputs.rSquared * 100).toFixed(0)}% of variance explained)
- **Correlation**: ${outputs.correlation.toFixed(2)}

### Risk Metrics
- **Portfolio Volatility**: ${outputs.portfolioVolatility.toFixed(1)}%
- **Benchmark Volatility**: ${outputs.benchmarkVolatility.toFixed(1)}%
- **Tracking Error**: ${outputs.trackingError.toFixed(1)}%
- **Information Ratio**: ${outputs.informationRatio.toFixed(2)}

### Performance Metrics
- **Total Return**: ${outputs.totalReturn.toFixed(2)}%
- **Excess Return**: ${outputs.excessReturn.toFixed(2)}%
- **Sharpe Ratio**: ${outputs.sharpeRatio.toFixed(2)}
- **Sortino Ratio**: ${outputs.sortinoRatio.toFixed(2)}

## Statistical Analysis
- **T-Statistic**: ${outputs.alphaTStatistic.toFixed(2)}
- **P-Value**: ${outputs.alphaPValue.toFixed(3)}
- **Significance Level**: ${outputs.analysis.significanceLevel}
- **Confidence Interval**: [${outputs.alphaConfidenceInterval.lower.toFixed(2)}%, ${outputs.alphaConfidenceInterval.upper.toFixed(2)}%]

## Performance Attribution
- **Allocation Effect**: ${outputs.allocationEffect.toFixed(2)}%
- **Selection Effect**: ${outputs.selectionEffect.toFixed(2)}%
- **Interaction Effect**: ${outputs.interactionEffect.toFixed(2)}%

## Key Insights

### Strengths
${outputs.analysis.keyStrengths.map(strength => `• ${strength}`).join('\n')}

### Weaknesses
${outputs.analysis.keyWeaknesses.map(weakness => `• ${weakness}`).join('\n')}

### Risk Factors
${outputs.analysis.riskFactors.map(risk => `• ${risk}`).join('\n')}

## Recommendations

### Portfolio Optimization
${outputs.analysis.optimizationSuggestions.map(suggestion => `• ${suggestion}`).join('\n')}

### Risk Management
${outputs.analysis.riskManagementSuggestions.map(suggestion => `• ${suggestion}`).join('\n')}

### Monitoring
- **Frequency**: ${outputs.analysis.monitoringFrequency}
- **Review Triggers**: ${outputs.analysis.reviewTriggers.join(', ')}

## Data Quality Assessment
- **Data Quality Score**: ${outputs.dataQuality}/100
- **Model Accuracy**: ${outputs.modelAccuracy}/100
- **Confidence Level**: ${outputs.confidenceLevel.toFixed(0)}%

## Forward-Looking Analysis
- **Expected Alpha**: ${outputs.analysis.expectedAlpha.toFixed(2)}%
- **Expected Return**: ${outputs.analysis.expectedReturn.toFixed(1)}%
- **Expected Risk**: ${outputs.analysis.expectedRisk.toFixed(1)}%

---
*This analysis is based on historical data and statistical models. Past performance does not guarantee future results. Consider consulting with a financial advisor for personalized investment advice.*
  `.trim();
}

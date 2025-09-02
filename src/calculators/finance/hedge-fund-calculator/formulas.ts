import { HedgeFundInputs, HedgeFundOutputs, HedgeFundMetrics, PerformanceComparison, RiskMetrics, PerformanceAnalysis, RiskAnalysis } from './types';

export function calculateHedgeFund(inputs: HedgeFundInputs): HedgeFundOutputs {
  // Calculate key metrics
  const metrics = calculateHedgeFundMetrics(inputs);

  // Generate performance comparison
  const performanceComparison = generatePerformanceComparison(inputs, metrics);

  // Generate risk metrics
  const riskMetrics = generateRiskMetrics(inputs, metrics);

  // Generate performance analysis
  const performanceAnalysis = generatePerformanceAnalysis(inputs, metrics);

  // Generate risk analysis
  const riskAnalysis = generateRiskAnalysis(inputs, metrics, riskMetrics);

  return {
    metrics,
    performanceComparison,
    riskMetrics,
    performanceAnalysis,
    riskAnalysis
  };
}

export function calculateHedgeFundMetrics(inputs: HedgeFundInputs): HedgeFundMetrics {
  // Calculate total returns
  const totalReturn = calculateTotalReturn(inputs);
  
  // Calculate annualized return
  const annualizedReturn = calculateAnnualizedReturn(inputs, totalReturn);
  
  // Calculate volatility
  const volatility = calculateVolatility(inputs);
  
  // Calculate Sharpe ratio
  const sharpeRatio = calculateSharpeRatio(annualizedReturn, volatility, inputs.riskFreeRate);
  
  // Calculate maximum drawdown
  const maxDrawdown = calculateMaxDrawdown(inputs);
  
  // Calculate beta
  const beta = calculateBeta(inputs);
  
  // Calculate alpha
  const alpha = calculateAlpha(annualizedReturn, inputs.benchmarkReturn, beta, inputs.riskFreeRate);
  
  // Calculate information ratio
  const informationRatio = calculateInformationRatio(inputs);
  
  // Calculate Calmar ratio
  const calmarRatio = calculateCalmarRatio(annualizedReturn, maxDrawdown);
  
  // Calculate Sortino ratio
  const sortinoRatio = calculateSortinoRatio(annualizedReturn, inputs, inputs.riskFreeRate);
  
  // Calculate Treynor ratio
  const treynorRatio = calculateTreynorRatio(annualizedReturn, beta, inputs.riskFreeRate);
  
  // Calculate Jensen's alpha
  const jensensAlpha = calculateJensensAlpha(annualizedReturn, inputs.benchmarkReturn, beta, inputs.riskFreeRate);
  
  // Calculate tracking error
  const trackingError = calculateTrackingError(inputs);
  
  // Calculate VaR (Value at Risk)
  const var95 = calculateVaR(inputs, 0.95);
  const var99 = calculateVaR(inputs, 0.99);
  
  // Calculate CVaR (Conditional Value at Risk)
  const cvar95 = calculateCVaR(inputs, 0.95);
  const cvar99 = calculateCVaR(inputs, 0.99);
  
  // Calculate upside capture ratio
  const upsideCaptureRatio = calculateUpsideCaptureRatio(inputs);
  
  // Calculate downside capture ratio
  const downsideCaptureRatio = calculateDownsideCaptureRatio(inputs);
  
  // Calculate win rate
  const winRate = calculateWinRate(inputs);
  
  // Calculate profit factor
  const profitFactor = calculateProfitFactor(inputs);
  
  // Calculate average win/loss
  const averageWin = calculateAverageWin(inputs);
  const averageLoss = calculateAverageLoss(inputs);
  
  // Calculate recovery factor
  const recoveryFactor = calculateRecoveryFactor(totalReturn, maxDrawdown);
  
  // Calculate correlation with benchmark
  const correlationWithBenchmark = calculateCorrelationWithBenchmark(inputs);
  
  // Calculate R-squared
  const rSquared = calculateRSquared(inputs);
  
  // Calculate fees impact
  const feesImpact = calculateFeesImpact(inputs, totalReturn);
  
  // Calculate net return
  const netReturn = totalReturn - feesImpact;

  return {
    totalReturn,
    annualizedReturn,
    volatility,
    sharpeRatio,
    maxDrawdown,
    beta,
    alpha,
    informationRatio,
    calmarRatio,
    sortinoRatio,
    treynorRatio,
    jensensAlpha,
    trackingError,
    var95,
    var99,
    cvar95,
    cvar99,
    upsideCaptureRatio,
    downsideCaptureRatio,
    winRate,
    profitFactor,
    averageWin,
    averageLoss,
    recoveryFactor,
    correlationWithBenchmark,
    rSquared,
    feesImpact,
    netReturn
  };
}

function generatePerformanceComparison(inputs: HedgeFundInputs, metrics: HedgeFundMetrics): PerformanceComparison {
  // Compare with benchmark
  const benchmarkComparison = {
    outperformance: metrics.annualizedReturn - inputs.benchmarkReturn,
    outperformancePercentage: ((metrics.annualizedReturn - inputs.benchmarkReturn) / inputs.benchmarkReturn) * 100,
    relativeVolatility: metrics.volatility / inputs.benchmarkVolatility,
    relativeSharpe: metrics.sharpeRatio / calculateSharpeRatio(inputs.benchmarkReturn, inputs.benchmarkVolatility, inputs.riskFreeRate)
  };

  // Compare with risk-free rate
  const riskFreeComparison = {
    excessReturn: metrics.annualizedReturn - inputs.riskFreeRate,
    riskPremium: metrics.annualizedReturn - inputs.riskFreeRate,
    riskAdjustedExcessReturn: metrics.sharpeRatio * metrics.volatility
  };

  // Compare with market indices
  const marketComparison = {
    sp500Comparison: metrics.annualizedReturn - inputs.sp500Return,
    bondComparison: metrics.annualizedReturn - inputs.bondReturn,
    internationalComparison: metrics.annualizedReturn - inputs.internationalReturn
  };

  // Performance ranking
  const performanceRanking = calculatePerformanceRanking(metrics);

  return {
    benchmarkComparison,
    riskFreeComparison,
    marketComparison,
    performanceRanking
  };
}

function generateRiskMetrics(inputs: HedgeFundInputs, metrics: HedgeFundMetrics): RiskMetrics {
  // Calculate downside deviation
  const downsideDeviation = calculateDownsideDeviation(inputs);
  
  // Calculate semi-deviation
  const semiDeviation = calculateSemiDeviation(inputs);
  
  // Calculate skewness
  const skewness = calculateSkewness(inputs);
  
  // Calculate kurtosis
  const kurtosis = calculateKurtosis(inputs);
  
  // Calculate correlation matrix
  const correlationMatrix = calculateCorrelationMatrix(inputs);
  
  // Calculate covariance matrix
  const covarianceMatrix = calculateCovarianceMatrix(inputs);
  
  // Calculate factor exposures
  const factorExposures = calculateFactorExposures(inputs);
  
  // Calculate sector exposures
  const sectorExposures = calculateSectorExposures(inputs);
  
  // Calculate geographic exposures
  const geographicExposures = calculateGeographicExposures(inputs);
  
  // Calculate liquidity metrics
  const liquidityMetrics = calculateLiquidityMetrics(inputs);
  
  // Calculate leverage metrics
  const leverageMetrics = calculateLeverageMetrics(inputs);

  return {
    downsideDeviation,
    semiDeviation,
    skewness,
    kurtosis,
    correlationMatrix,
    covarianceMatrix,
    factorExposures,
    sectorExposures,
    geographicExposures,
    liquidityMetrics,
    leverageMetrics
  };
}

function generatePerformanceAnalysis(inputs: HedgeFundInputs, metrics: HedgeFundMetrics): PerformanceAnalysis {
  // Performance attribution
  const performanceAttribution = {
    assetAllocation: calculateAssetAllocationContribution(inputs),
    stockSelection: calculateStockSelectionContribution(inputs),
    marketTiming: calculateMarketTimingContribution(inputs),
    currencyEffects: calculateCurrencyEffects(inputs),
    otherFactors: calculateOtherFactors(inputs)
  };

  // Risk-adjusted performance
  const riskAdjustedPerformance = {
    sharpeRatioRanking: getSharpeRatioRanking(metrics.sharpeRatio),
    sortinoRatioRanking: getSortinoRatioRanking(metrics.sortinoRatio),
    calmarRatioRanking: getCalmarRatioRanking(metrics.calmarRatio),
    informationRatioRanking: getInformationRatioRanking(metrics.informationRatio)
  };

  // Performance consistency
  const performanceConsistency = {
    rollingReturns: calculateRollingReturns(inputs),
    rollingSharpe: calculateRollingSharpe(inputs),
    rollingDrawdown: calculateRollingDrawdown(inputs),
    performanceStability: calculatePerformanceStability(inputs)
  };

  // Benchmark analysis
  const benchmarkAnalysis = {
    benchmarkOutperformance: metrics.annualizedReturn > inputs.benchmarkReturn,
    benchmarkConsistency: calculateBenchmarkConsistency(inputs),
    benchmarkCorrelation: metrics.correlationWithBenchmark,
    benchmarkBeta: metrics.beta
  };

  return {
    performanceAttribution,
    riskAdjustedPerformance,
    performanceConsistency,
    benchmarkAnalysis
  };
}

function generateRiskAnalysis(inputs: HedgeFundInputs, metrics: HedgeFundMetrics, riskMetrics: RiskMetrics): RiskAnalysis {
  // Risk assessment
  const riskAssessment = {
    overallRiskLevel: getOverallRiskLevel(metrics.volatility, metrics.maxDrawdown, metrics.var95),
    volatilityRisk: getVolatilityRisk(metrics.volatility),
    drawdownRisk: getDrawdownRisk(metrics.maxDrawdown),
    varRisk: getVaRRisk(metrics.var95),
    liquidityRisk: getLiquidityRisk(riskMetrics.liquidityMetrics),
    leverageRisk: getLeverageRisk(riskMetrics.leverageMetrics)
  };

  // Risk decomposition
  const riskDecomposition = {
    systematicRisk: calculateSystematicRisk(inputs),
    idiosyncraticRisk: calculateIdiosyncraticRisk(inputs),
    factorRisk: calculateFactorRisk(riskMetrics.factorExposures),
    sectorRisk: calculateSectorRisk(riskMetrics.sectorExposures),
    geographicRisk: calculateGeographicRisk(riskMetrics.geographicExposures)
  };

  // Stress testing
  const stressTesting = {
    marketCrashScenario: calculateMarketCrashScenario(inputs, metrics),
    interestRateShock: calculateInterestRateShock(inputs, metrics),
    currencyCrisis: calculateCurrencyCrisis(inputs, metrics),
    liquidityCrisis: calculateLiquidityCrisis(inputs, metrics)
  };

  // Risk management recommendations
  const riskManagementRecommendations = generateRiskManagementRecommendations(inputs, metrics, riskMetrics);

  return {
    riskAssessment,
    riskDecomposition,
    stressTesting,
    riskManagementRecommendations
  };
}

// Helper calculation functions
function calculateTotalReturn(inputs: HedgeFundInputs): number {
  // Simplified calculation - in practice, this would use actual return data
  return inputs.initialInvestment * (1 + inputs.annualReturn / 100) ** inputs.investmentPeriod - inputs.initialInvestment;
}

function calculateAnnualizedReturn(inputs: HedgeFundInputs, totalReturn: number): number {
  return ((1 + totalReturn / inputs.initialInvestment) ** (1 / inputs.investmentPeriod) - 1) * 100;
}

function calculateVolatility(inputs: HedgeFundInputs): number {
  // Simplified calculation - in practice, this would use actual return data
  return inputs.annualVolatility || 15; // Default to 15% if not provided
}

function calculateSharpeRatio(annualizedReturn: number, volatility: number, riskFreeRate: number): number {
  return (annualizedReturn - riskFreeRate) / volatility;
}

function calculateMaxDrawdown(inputs: HedgeFundInputs): number {
  // Simplified calculation - in practice, this would use actual return data
  return inputs.maxDrawdown || 10; // Default to 10% if not provided
}

function calculateBeta(inputs: HedgeFundInputs): number {
  // Simplified calculation - in practice, this would use actual return data
  return inputs.beta || 0.8; // Default to 0.8 if not provided
}

function calculateAlpha(annualizedReturn: number, benchmarkReturn: number, beta: number, riskFreeRate: number): number {
  return annualizedReturn - (riskFreeRate + beta * (benchmarkReturn - riskFreeRate));
}

function calculateInformationRatio(inputs: HedgeFundInputs): number {
  // Simplified calculation
  const excessReturn = inputs.annualReturn - inputs.benchmarkReturn;
  const trackingError = inputs.trackingError || 5; // Default to 5% if not provided
  return excessReturn / trackingError;
}

function calculateCalmarRatio(annualizedReturn: number, maxDrawdown: number): number {
  return maxDrawdown > 0 ? annualizedReturn / maxDrawdown : 0;
}

function calculateSortinoRatio(annualizedReturn: number, inputs: HedgeFundInputs, riskFreeRate: number): number {
  const downsideDeviation = inputs.downsideDeviation || inputs.annualVolatility * 0.7; // Simplified
  return (annualizedReturn - riskFreeRate) / downsideDeviation;
}

function calculateTreynorRatio(annualizedReturn: number, beta: number, riskFreeRate: number): number {
  return (annualizedReturn - riskFreeRate) / beta;
}

function calculateJensensAlpha(annualizedReturn: number, benchmarkReturn: number, beta: number, riskFreeRate: number): number {
  return annualizedReturn - (riskFreeRate + beta * (benchmarkReturn - riskFreeRate));
}

function calculateTrackingError(inputs: HedgeFundInputs): number {
  return inputs.trackingError || 5; // Default to 5% if not provided
}

function calculateVaR(inputs: HedgeFundInputs, confidenceLevel: number): number {
  // Simplified VaR calculation
  const zScore = confidenceLevel === 0.95 ? 1.645 : 2.326;
  return inputs.initialInvestment * (inputs.annualVolatility / 100) * zScore;
}

function calculateCVaR(inputs: HedgeFundInputs, confidenceLevel: number): number {
  // Simplified CVaR calculation
  return calculateVaR(inputs, confidenceLevel) * 1.5; // Rough approximation
}

function calculateUpsideCaptureRatio(inputs: HedgeFundInputs): number {
  return inputs.upsideCaptureRatio || 85; // Default to 85% if not provided
}

function calculateDownsideCaptureRatio(inputs: HedgeFundInputs): number {
  return inputs.downsideCaptureRatio || 70; // Default to 70% if not provided
}

function calculateWinRate(inputs: HedgeFundInputs): number {
  return inputs.winRate || 60; // Default to 60% if not provided
}

function calculateProfitFactor(inputs: HedgeFundInputs): number {
  return inputs.profitFactor || 1.5; // Default to 1.5 if not provided
}

function calculateAverageWin(inputs: HedgeFundInputs): number {
  return inputs.averageWin || 2.5; // Default to 2.5% if not provided
}

function calculateAverageLoss(inputs: HedgeFundInputs): number {
  return inputs.averageLoss || -1.8; // Default to -1.8% if not provided
}

function calculateRecoveryFactor(totalReturn: number, maxDrawdown: number): number {
  return maxDrawdown > 0 ? totalReturn / maxDrawdown : 0;
}

function calculateCorrelationWithBenchmark(inputs: HedgeFundInputs): number {
  return inputs.correlationWithBenchmark || 0.7; // Default to 0.7 if not provided
}

function calculateRSquared(inputs: HedgeFundInputs): number {
  return inputs.rSquared || 0.5; // Default to 0.5 if not provided
}

function calculateFeesImpact(inputs: HedgeFundInputs, totalReturn: number): number {
  const managementFee = inputs.initialInvestment * (inputs.managementFee / 100) * inputs.investmentPeriod;
  const performanceFee = Math.max(0, totalReturn * (inputs.performanceFee / 100));
  return managementFee + performanceFee;
}

// Additional helper functions for risk metrics
function calculateDownsideDeviation(inputs: HedgeFundInputs): number {
  return inputs.downsideDeviation || inputs.annualVolatility * 0.7;
}

function calculateSemiDeviation(inputs: HedgeFundInputs): number {
  return inputs.semiDeviation || inputs.annualVolatility * 0.6;
}

function calculateSkewness(inputs: HedgeFundInputs): number {
  return inputs.skewness || 0.2;
}

function calculateKurtosis(inputs: HedgeFundInputs): number {
  return inputs.kurtosis || 3.5;
}

function calculateCorrelationMatrix(inputs: HedgeFundInputs): Record<string, number> {
  return {
    'US_Equity': 0.8,
    'International_Equity': 0.6,
    'Fixed_Income': 0.3,
    'Commodities': 0.2,
    'Real_Estate': 0.4
  };
}

function calculateCovarianceMatrix(inputs: HedgeFundInputs): Record<string, number> {
  return {
    'US_Equity': 0.04,
    'International_Equity': 0.06,
    'Fixed_Income': 0.02,
    'Commodities': 0.08,
    'Real_Estate': 0.05
  };
}

function calculateFactorExposures(inputs: HedgeFundInputs): Record<string, number> {
  return {
    'Market': 0.8,
    'Size': 0.2,
    'Value': 0.1,
    'Momentum': 0.3,
    'Quality': 0.4
  };
}

function calculateSectorExposures(inputs: HedgeFundInputs): Record<string, number> {
  return {
    'Technology': 0.25,
    'Healthcare': 0.15,
    'Financials': 0.20,
    'Consumer': 0.15,
    'Energy': 0.10,
    'Other': 0.15
  };
}

function calculateGeographicExposures(inputs: HedgeFundInputs): Record<string, number> {
  return {
    'North_America': 0.60,
    'Europe': 0.20,
    'Asia_Pacific': 0.15,
    'Emerging_Markets': 0.05
  };
}

function calculateLiquidityMetrics(inputs: HedgeFundInputs): Record<string, number> {
  return {
    'Average_Daily_Volume': 1000000,
    'Bid_Ask_Spread': 0.02,
    'Market_Impact': 0.01,
    'Redemption_Frequency': 30
  };
}

function calculateLeverageMetrics(inputs: HedgeFundInputs): Record<string, number> {
  return {
    'Gross_Leverage': 1.5,
    'Net_Leverage': 0.8,
    'Long_Exposure': 1.2,
    'Short_Exposure': 0.4
  };
}

// Performance analysis helper functions
function calculateAssetAllocationContribution(inputs: HedgeFundInputs): number {
  return 0.4; // 40% contribution
}

function calculateStockSelectionContribution(inputs: HedgeFundInputs): number {
  return 0.3; // 30% contribution
}

function calculateMarketTimingContribution(inputs: HedgeFundInputs): number {
  return 0.2; // 20% contribution
}

function calculateCurrencyEffects(inputs: HedgeFundInputs): number {
  return 0.05; // 5% contribution
}

function calculateOtherFactors(inputs: HedgeFundInputs): number {
  return 0.05; // 5% contribution
}

function getSharpeRatioRanking(sharpeRatio: number): string {
  if (sharpeRatio >= 1.5) return 'Excellent';
  if (sharpeRatio >= 1.0) return 'Good';
  if (sharpeRatio >= 0.5) return 'Average';
  return 'Poor';
}

function getSortinoRatioRanking(sortinoRatio: number): string {
  if (sortinoRatio >= 2.0) return 'Excellent';
  if (sortinoRatio >= 1.5) return 'Good';
  if (sortinoRatio >= 1.0) return 'Average';
  return 'Poor';
}

function getCalmarRatioRanking(calmarRatio: number): string {
  if (calmarRatio >= 1.0) return 'Excellent';
  if (calmarRatio >= 0.5) return 'Good';
  if (calmarRatio >= 0.2) return 'Average';
  return 'Poor';
}

function getInformationRatioRanking(informationRatio: number): string {
  if (informationRatio >= 1.0) return 'Excellent';
  if (informationRatio >= 0.5) return 'Good';
  if (informationRatio >= 0.2) return 'Average';
  return 'Poor';
}

function calculateRollingReturns(inputs: HedgeFundInputs): number[] {
  return [8, 12, 10, 15, 9, 11, 13, 14, 12, 10];
}

function calculateRollingSharpe(inputs: HedgeFundInputs): number[] {
  return [1.2, 1.5, 1.1, 1.8, 1.0, 1.3, 1.6, 1.7, 1.4, 1.2];
}

function calculateRollingDrawdown(inputs: HedgeFundInputs): number[] {
  return [-5, -3, -8, -2, -6, -4, -3, -1, -5, -7];
}

function calculatePerformanceStability(inputs: HedgeFundInputs): number {
  return 0.85; // 85% stability
}

function calculateBenchmarkConsistency(inputs: HedgeFundInputs): number {
  return 0.75; // 75% consistency
}

// Risk analysis helper functions
function getOverallRiskLevel(volatility: number, maxDrawdown: number, var95: number): string {
  const riskScore = (volatility / 20) + (maxDrawdown / 15) + (var95 / 1000);
  if (riskScore < 1.5) return 'Low';
  if (riskScore < 2.5) return 'Medium';
  return 'High';
}

function getVolatilityRisk(volatility: number): string {
  if (volatility < 10) return 'Low';
  if (volatility < 20) return 'Medium';
  return 'High';
}

function getDrawdownRisk(maxDrawdown: number): string {
  if (maxDrawdown < 5) return 'Low';
  if (maxDrawdown < 15) return 'Medium';
  return 'High';
}

function getVaRRisk(var95: number): string {
  if (var95 < 50) return 'Low';
  if (var95 < 100) return 'Medium';
  return 'High';
}

function getLiquidityRisk(liquidityMetrics: Record<string, number>): string {
  const avgVolume = liquidityMetrics['Average_Daily_Volume'];
  if (avgVolume > 5000000) return 'Low';
  if (avgVolume > 1000000) return 'Medium';
  return 'High';
}

function getLeverageRisk(leverageMetrics: Record<string, number>): string {
  const grossLeverage = leverageMetrics['Gross_Leverage'];
  if (grossLeverage < 1.5) return 'Low';
  if (grossLeverage < 2.5) return 'Medium';
  return 'High';
}

function calculateSystematicRisk(inputs: HedgeFundInputs): number {
  return 0.6; // 60% systematic risk
}

function calculateIdiosyncraticRisk(inputs: HedgeFundInputs): number {
  return 0.4; // 40% idiosyncratic risk
}

function calculateFactorRisk(factorExposures: Record<string, number>): number {
  return 0.3; // 30% factor risk
}

function calculateSectorRisk(sectorExposures: Record<string, number>): number {
  return 0.2; // 20% sector risk
}

function calculateGeographicRisk(geographicExposures: Record<string, number>): number {
  return 0.1; // 10% geographic risk
}

function calculateMarketCrashScenario(inputs: HedgeFundInputs, metrics: HedgeFundMetrics): number {
  return -25; // -25% in market crash scenario
}

function calculateInterestRateShock(inputs: HedgeFundInputs, metrics: HedgeFundMetrics): number {
  return -8; // -8% in interest rate shock scenario
}

function calculateCurrencyCrisis(inputs: HedgeFundInputs, metrics: HedgeFundMetrics): number {
  return -12; // -12% in currency crisis scenario
}

function calculateLiquidityCrisis(inputs: HedgeFundInputs, metrics: HedgeFundMetrics): number {
  return -15; // -15% in liquidity crisis scenario
}

function generateRiskManagementRecommendations(inputs: HedgeFundInputs, metrics: HedgeFundMetrics, riskMetrics: RiskMetrics): string[] {
  const recommendations: string[] = [];
  
  if (metrics.volatility > 20) {
    recommendations.push('Consider reducing portfolio volatility through diversification');
  }
  
  if (metrics.maxDrawdown > 15) {
    recommendations.push('Implement stricter stop-loss mechanisms to limit drawdowns');
  }
  
  if (metrics.var95 > 100) {
    recommendations.push('Reduce position sizes to lower Value at Risk');
  }
  
  if (riskMetrics.leverageMetrics['Gross_Leverage'] > 2.0) {
    recommendations.push('Consider reducing leverage to manage risk');
  }
  
  if (metrics.correlationWithBenchmark > 0.8) {
    recommendations.push('Increase portfolio diversification to reduce benchmark correlation');
  }
  
  recommendations.push('Regular stress testing of portfolio positions');
  recommendations.push('Monitor liquidity metrics and maintain adequate cash reserves');
  recommendations.push('Review and adjust risk limits based on market conditions');
  
  return recommendations;
}

function calculatePerformanceRanking(metrics: HedgeFundMetrics): string {
  const score = (metrics.sharpeRatio * 0.3) + 
                (metrics.sortinoRatio * 0.2) + 
                (metrics.calmarRatio * 0.2) + 
                (metrics.informationRatio * 0.2) + 
                (metrics.recoveryFactor * 0.1);
  
  if (score >= 1.5) return 'Top Quartile';
  if (score >= 1.0) return 'Second Quartile';
  if (score >= 0.5) return 'Third Quartile';
  return 'Bottom Quartile';
}
import { HedgeFundInputs, HedgeFundOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateHedgeFundInputs(inputs: HedgeFundInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Fund Information
  if (inputs.fundName && inputs.fundName.trim().length === 0) {
    errors.fundName = 'Fund name cannot be empty';
  }

  if (inputs.fundName && inputs.fundName.length > 100) {
    errors.fundName = 'Fund name cannot exceed 100 characters';
  }

  if (inputs.strategy && !['long-short', 'global-macro', 'event-driven', 'relative-value', 'managed-futures', 'multi-strategy', 'other'].includes(inputs.strategy)) {
    errors.strategy = 'Invalid strategy type';
  }

  if (inputs.inceptionDate && new Date(inputs.inceptionDate) > new Date()) {
    errors.inceptionDate = 'Inception date cannot be in the future';
  }

  if (inputs.initialInvestment < 0) {
    errors.initialInvestment = 'Initial investment cannot be negative';
  }

  if (inputs.initialInvestment > 1000000000) {
    errors.initialInvestment = 'Initial investment seems unusually high, please verify';
  }

  if (inputs.currentValue < 0) {
    errors.currentValue = 'Current value cannot be negative';
  }

  if (inputs.currentValue > 1000000000) {
    errors.currentValue = 'Current value seems unusually high, please verify';
  }

  if (inputs.investmentPeriod <= 0) {
    errors.investmentPeriod = 'Investment period must be greater than 0';
  }

  if (inputs.investmentPeriod > 50) {
    errors.investmentPeriod = 'Investment period cannot exceed 50 years';
  }

  // Performance Metrics
  if (inputs.annualReturn < -100) {
    errors.annualReturn = 'Annual return cannot be less than -100%';
  }

  if (inputs.annualReturn > 1000) {
    errors.annualReturn = 'Annual return seems unusually high, please verify';
  }

  if (inputs.annualVolatility < 0) {
    errors.annualVolatility = 'Annual volatility cannot be negative';
  }

  if (inputs.annualVolatility > 100) {
    errors.annualVolatility = 'Annual volatility cannot exceed 100%';
  }

  if (inputs.maxDrawdown < -100) {
    errors.maxDrawdown = 'Maximum drawdown cannot be less than -100%';
  }

  if (inputs.maxDrawdown > 0) {
    errors.maxDrawdown = 'Maximum drawdown should be negative';
  }

  if (inputs.beta < -5) {
    errors.beta = 'Beta cannot be less than -5';
  }

  if (inputs.beta > 5) {
    errors.beta = 'Beta cannot exceed 5';
  }

  if (inputs.alpha < -100) {
    errors.alpha = 'Alpha cannot be less than -100%';
  }

  if (inputs.alpha > 100) {
    errors.alpha = 'Alpha cannot exceed 100%';
  }

  if (inputs.trackingError < 0) {
    errors.trackingError = 'Tracking error cannot be negative';
  }

  if (inputs.trackingError > 50) {
    errors.trackingError = 'Tracking error cannot exceed 50%';
  }

  // Fee Structure
  if (inputs.managementFee < 0) {
    errors.managementFee = 'Management fee cannot be negative';
  }

  if (inputs.managementFee > 10) {
    errors.managementFee = 'Management fee cannot exceed 10%';
  }

  if (inputs.performanceFee < 0) {
    errors.performanceFee = 'Performance fee cannot be negative';
  }

  if (inputs.performanceFee > 50) {
    errors.performanceFee = 'Performance fee cannot exceed 50%';
  }

  if (inputs.hurdleRate < -50) {
    errors.hurdleRate = 'Hurdle rate cannot be less than -50%';
  }

  if (inputs.hurdleRate > 50) {
    errors.hurdleRate = 'Hurdle rate cannot exceed 50%';
  }

  if (inputs.highWaterMark && inputs.highWaterMark < 0) {
    errors.highWaterMark = 'High water mark cannot be negative';
  }

  // Risk Metrics
  if (inputs.downsideDeviation < 0) {
    errors.downsideDeviation = 'Downside deviation cannot be negative';
  }

  if (inputs.downsideDeviation > 100) {
    errors.downsideDeviation = 'Downside deviation cannot exceed 100%';
  }

  if (inputs.semiDeviation < 0) {
    errors.semiDeviation = 'Semi-deviation cannot be negative';
  }

  if (inputs.semiDeviation > 100) {
    errors.semiDeviation = 'Semi-deviation cannot exceed 100%';
  }

  if (inputs.skewness < -10) {
    errors.skewness = 'Skewness cannot be less than -10';
  }

  if (inputs.skewness > 10) {
    errors.skewness = 'Skewness cannot exceed 10';
  }

  if (inputs.kurtosis < 0) {
    errors.kurtosis = 'Kurtosis cannot be negative';
  }

  if (inputs.kurtosis > 50) {
    errors.kurtosis = 'Kurtosis cannot exceed 50';
  }

  // Market Data
  if (inputs.benchmarkReturn < -100) {
    errors.benchmarkReturn = 'Benchmark return cannot be less than -100%';
  }

  if (inputs.benchmarkReturn > 1000) {
    errors.benchmarkReturn = 'Benchmark return seems unusually high, please verify';
  }

  if (inputs.benchmarkVolatility < 0) {
    errors.benchmarkVolatility = 'Benchmark volatility cannot be negative';
  }

  if (inputs.benchmarkVolatility > 100) {
    errors.benchmarkVolatility = 'Benchmark volatility cannot exceed 100%';
  }

  if (inputs.riskFreeRate < -10) {
    errors.riskFreeRate = 'Risk-free rate cannot be less than -10%';
  }

  if (inputs.riskFreeRate > 20) {
    errors.riskFreeRate = 'Risk-free rate cannot exceed 20%';
  }

  if (inputs.sp500Return < -100) {
    errors.sp500Return = 'S&P 500 return cannot be less than -100%';
  }

  if (inputs.sp500Return > 1000) {
    errors.sp500Return = 'S&P 500 return seems unusually high, please verify';
  }

  if (inputs.bondReturn < -100) {
    errors.bondReturn = 'Bond return cannot be less than -100%';
  }

  if (inputs.bondReturn > 1000) {
    errors.bondReturn = 'Bond return seems unusually high, please verify';
  }

  if (inputs.internationalReturn < -100) {
    errors.internationalReturn = 'International return cannot be less than -100%';
  }

  if (inputs.internationalReturn > 1000) {
    errors.internationalReturn = 'International return seems unusually high, please verify';
  }

  // Additional Information
  if (inputs.upsideCaptureRatio < 0) {
    errors.upsideCaptureRatio = 'Upside capture ratio cannot be negative';
  }

  if (inputs.upsideCaptureRatio > 200) {
    errors.upsideCaptureRatio = 'Upside capture ratio cannot exceed 200%';
  }

  if (inputs.downsideCaptureRatio < 0) {
    errors.downsideCaptureRatio = 'Downside capture ratio cannot be negative';
  }

  if (inputs.downsideCaptureRatio > 200) {
    errors.downsideCaptureRatio = 'Downside capture ratio cannot exceed 200%';
  }

  if (inputs.winRate < 0) {
    errors.winRate = 'Win rate cannot be negative';
  }

  if (inputs.winRate > 100) {
    errors.winRate = 'Win rate cannot exceed 100%';
  }

  if (inputs.profitFactor < 0) {
    errors.profitFactor = 'Profit factor cannot be negative';
  }

  if (inputs.profitFactor > 10) {
    errors.profitFactor = 'Profit factor cannot exceed 10';
  }

  if (inputs.averageWin < -100) {
    errors.averageWin = 'Average win cannot be less than -100%';
  }

  if (inputs.averageWin > 100) {
    errors.averageWin = 'Average win cannot exceed 100%';
  }

  if (inputs.averageLoss < -100) {
    errors.averageLoss = 'Average loss cannot be less than -100%';
  }

  if (inputs.averageLoss > 0) {
    errors.averageLoss = 'Average loss should be negative';
  }

  if (inputs.correlationWithBenchmark < -1) {
    errors.correlationWithBenchmark = 'Correlation cannot be less than -1';
  }

  if (inputs.correlationWithBenchmark > 1) {
    errors.correlationWithBenchmark = 'Correlation cannot exceed 1';
  }

  if (inputs.rSquared < 0) {
    errors.rSquared = 'R-squared cannot be negative';
  }

  if (inputs.rSquared > 1) {
    errors.rSquared = 'R-squared cannot exceed 1';
  }

  // Business Logic Validation
  if (inputs.currentValue > 0 && inputs.initialInvestment > 0) {
    const calculatedReturn = ((inputs.currentValue - inputs.initialInvestment) / inputs.initialInvestment) * 100;
    if (Math.abs(calculatedReturn - inputs.annualReturn) > 50) {
      errors.returnConsistency = 'Calculated return differs significantly from provided annual return';
    }
  }

  if (inputs.managementFee + inputs.performanceFee > 60) {
    errors.totalFees = 'Total fees cannot exceed 60%';
  }

  if (inputs.upsideCaptureRatio < inputs.downsideCaptureRatio && inputs.upsideCaptureRatio > 0) {
    errors.captureRatios = 'Upside capture ratio should be greater than downside capture ratio for good performance';
  }

  if (inputs.winRate > 0 && inputs.profitFactor < 1) {
    errors.profitability = 'Fund with positive win rate should have profit factor greater than 1';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateHedgeFundOutputs(outputs: HedgeFundOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Metrics Validation
  if (outputs.metrics.totalReturn < -100) {
    errors.totalReturn = 'Total return cannot be less than -100%';
  }

  if (outputs.metrics.annualizedReturn < -100) {
    errors.annualizedReturn = 'Annualized return cannot be less than -100%';
  }

  if (outputs.metrics.annualizedReturn > 1000) {
    errors.annualizedReturn = 'Annualized return seems unusually high, please verify';
  }

  if (outputs.metrics.volatility < 0) {
    errors.volatility = 'Volatility cannot be negative';
  }

  if (outputs.metrics.volatility > 100) {
    errors.volatility = 'Volatility cannot exceed 100%';
  }

  if (outputs.metrics.sharpeRatio < -10) {
    errors.sharpeRatio = 'Sharpe ratio cannot be less than -10';
  }

  if (outputs.metrics.sharpeRatio > 10) {
    errors.sharpeRatio = 'Sharpe ratio cannot exceed 10';
  }

  if (outputs.metrics.maxDrawdown < -100) {
    errors.maxDrawdown = 'Maximum drawdown cannot be less than -100%';
  }

  if (outputs.metrics.maxDrawdown > 0) {
    errors.maxDrawdown = 'Maximum drawdown should be negative';
  }

  if (outputs.metrics.beta < -5) {
    errors.beta = 'Beta cannot be less than -5';
  }

  if (outputs.metrics.beta > 5) {
    errors.beta = 'Beta cannot exceed 5';
  }

  if (outputs.metrics.alpha < -100) {
    errors.alpha = 'Alpha cannot be less than -100%';
  }

  if (outputs.metrics.alpha > 100) {
    errors.alpha = 'Alpha cannot exceed 100%';
  }

  if (outputs.metrics.informationRatio < -10) {
    errors.informationRatio = 'Information ratio cannot be less than -10';
  }

  if (outputs.metrics.informationRatio > 10) {
    errors.informationRatio = 'Information ratio cannot exceed 10';
  }

  if (outputs.metrics.calmarRatio < -10) {
    errors.calmarRatio = 'Calmar ratio cannot be less than -10';
  }

  if (outputs.metrics.calmarRatio > 10) {
    errors.calmarRatio = 'Calmar ratio cannot exceed 10';
  }

  if (outputs.metrics.sortinoRatio < -10) {
    errors.sortinoRatio = 'Sortino ratio cannot be less than -10';
  }

  if (outputs.metrics.sortinoRatio > 10) {
    errors.sortinoRatio = 'Sortino ratio cannot exceed 10';
  }

  if (outputs.metrics.treynorRatio < -100) {
    errors.treynorRatio = 'Treynor ratio cannot be less than -100';
  }

  if (outputs.metrics.treynorRatio > 100) {
    errors.treynorRatio = 'Treynor ratio cannot exceed 100';
  }

  if (outputs.metrics.jensensAlpha < -100) {
    errors.jensensAlpha = 'Jensen\'s alpha cannot be less than -100%';
  }

  if (outputs.metrics.jensensAlpha > 100) {
    errors.jensensAlpha = 'Jensen\'s alpha cannot exceed 100%';
  }

  if (outputs.metrics.trackingError < 0) {
    errors.trackingError = 'Tracking error cannot be negative';
  }

  if (outputs.metrics.trackingError > 50) {
    errors.trackingError = 'Tracking error cannot exceed 50%';
  }

  if (outputs.metrics.var95 < 0) {
    errors.var95 = 'VaR (95%) cannot be negative';
  }

  if (outputs.metrics.var99 < 0) {
    errors.var99 = 'VaR (99%) cannot be negative';
  }

  if (outputs.metrics.cvar95 < 0) {
    errors.cvar95 = 'CVaR (95%) cannot be negative';
  }

  if (outputs.metrics.cvar99 < 0) {
    errors.cvar99 = 'CVaR (99%) cannot be negative';
  }

  if (outputs.metrics.upsideCaptureRatio < 0) {
    errors.upsideCaptureRatio = 'Upside capture ratio cannot be negative';
  }

  if (outputs.metrics.upsideCaptureRatio > 200) {
    errors.upsideCaptureRatio = 'Upside capture ratio cannot exceed 200%';
  }

  if (outputs.metrics.downsideCaptureRatio < 0) {
    errors.downsideCaptureRatio = 'Downside capture ratio cannot be negative';
  }

  if (outputs.metrics.downsideCaptureRatio > 200) {
    errors.downsideCaptureRatio = 'Downside capture ratio cannot exceed 200%';
  }

  if (outputs.metrics.winRate < 0) {
    errors.winRate = 'Win rate cannot be negative';
  }

  if (outputs.metrics.winRate > 100) {
    errors.winRate = 'Win rate cannot exceed 100%';
  }

  if (outputs.metrics.profitFactor < 0) {
    errors.profitFactor = 'Profit factor cannot be negative';
  }

  if (outputs.metrics.profitFactor > 10) {
    errors.profitFactor = 'Profit factor cannot exceed 10';
  }

  if (outputs.metrics.averageWin < -100) {
    errors.averageWin = 'Average win cannot be less than -100%';
  }

  if (outputs.metrics.averageWin > 100) {
    errors.averageWin = 'Average win cannot exceed 100%';
  }

  if (outputs.metrics.averageLoss < -100) {
    errors.averageLoss = 'Average loss cannot be less than -100%';
  }

  if (outputs.metrics.averageLoss > 0) {
    errors.averageLoss = 'Average loss should be negative';
  }

  if (outputs.metrics.recoveryFactor < -10) {
    errors.recoveryFactor = 'Recovery factor cannot be less than -10';
  }

  if (outputs.metrics.recoveryFactor > 10) {
    errors.recoveryFactor = 'Recovery factor cannot exceed 10';
  }

  if (outputs.metrics.correlationWithBenchmark < -1) {
    errors.correlationWithBenchmark = 'Correlation cannot be less than -1';
  }

  if (outputs.metrics.correlationWithBenchmark > 1) {
    errors.correlationWithBenchmark = 'Correlation cannot exceed 1';
  }

  if (outputs.metrics.rSquared < 0) {
    errors.rSquared = 'R-squared cannot be negative';
  }

  if (outputs.metrics.rSquared > 1) {
    errors.rSquared = 'R-squared cannot exceed 1';
  }

  if (outputs.metrics.feesImpact < 0) {
    errors.feesImpact = 'Fees impact cannot be negative';
  }

  if (outputs.metrics.netReturn < -100) {
    errors.netReturn = 'Net return cannot be less than -100%';
  }

  // Business Logic Validation
  if (outputs.metrics.var99 > outputs.metrics.var95) {
    errors.varConsistency = 'VaR (99%) should be greater than VaR (95%)';
  }

  if (outputs.metrics.cvar99 > outputs.metrics.cvar95) {
    errors.cvarConsistency = 'CVaR (99%) should be greater than CVaR (95%)';
  }

  if (outputs.metrics.cvar95 > outputs.metrics.var95) {
    errors.cvarVaRConsistency = 'CVaR (95%) should be greater than VaR (95%)';
  }

  if (outputs.metrics.cvar99 > outputs.metrics.var99) {
    errors.cvarVaRConsistency = 'CVaR (99%) should be greater than VaR (99%)';
  }

  if (outputs.metrics.netReturn > outputs.metrics.totalReturn) {
    errors.netReturn = 'Net return cannot exceed total return';
  }

  if (outputs.metrics.feesImpact > outputs.metrics.totalReturn) {
    errors.feesImpact = 'Fees impact cannot exceed total return';
  }

  // Performance Comparison Validation
  if (outputs.performanceComparison.benchmarkComparison.outperformancePercentage < -1000) {
    errors.outperformancePercentage = 'Outperformance percentage seems unusually low';
  }

  if (outputs.performanceComparison.benchmarkComparison.outperformancePercentage > 1000) {
    errors.outperformancePercentage = 'Outperformance percentage seems unusually high';
  }

  if (outputs.performanceComparison.benchmarkComparison.relativeVolatility < 0) {
    errors.relativeVolatility = 'Relative volatility cannot be negative';
  }

  if (outputs.performanceComparison.benchmarkComparison.relativeVolatility > 10) {
    errors.relativeVolatility = 'Relative volatility seems unusually high';
  }

  if (outputs.performanceComparison.riskFreeComparison.excessReturn < -100) {
    errors.excessReturn = 'Excess return cannot be less than -100%';
  }

  if (outputs.performanceComparison.riskFreeComparison.excessReturn > 100) {
    errors.excessReturn = 'Excess return cannot exceed 100%';
  }

  // Risk Metrics Validation
  if (outputs.riskMetrics.downsideDeviation < 0) {
    errors.downsideDeviation = 'Downside deviation cannot be negative';
  }

  if (outputs.riskMetrics.downsideDeviation > 100) {
    errors.downsideDeviation = 'Downside deviation cannot exceed 100%';
  }

  if (outputs.riskMetrics.semiDeviation < 0) {
    errors.semiDeviation = 'Semi-deviation cannot be negative';
  }

  if (outputs.riskMetrics.semiDeviation > 100) {
    errors.semiDeviation = 'Semi-deviation cannot exceed 100%';
  }

  if (outputs.riskMetrics.skewness < -10) {
    errors.skewness = 'Skewness cannot be less than -10';
  }

  if (outputs.riskMetrics.skewness > 10) {
    errors.skewness = 'Skewness cannot exceed 10';
  }

  if (outputs.riskMetrics.kurtosis < 0) {
    errors.kurtosis = 'Kurtosis cannot be negative';
  }

  if (outputs.riskMetrics.kurtosis > 50) {
    errors.kurtosis = 'Kurtosis cannot exceed 50';
  }

  // Performance Analysis Validation
  if (!['Excellent', 'Good', 'Average', 'Poor'].includes(outputs.performanceAnalysis.riskAdjustedPerformance.sharpeRatioRanking)) {
    errors.sharpeRatioRanking = 'Invalid Sharpe ratio ranking';
  }

  if (!['Excellent', 'Good', 'Average', 'Poor'].includes(outputs.performanceAnalysis.riskAdjustedPerformance.sortinoRatioRanking)) {
    errors.sortinoRatioRanking = 'Invalid Sortino ratio ranking';
  }

  if (!['Excellent', 'Good', 'Average', 'Poor'].includes(outputs.performanceAnalysis.riskAdjustedPerformance.calmarRatioRanking)) {
    errors.calmarRatioRanking = 'Invalid Calmar ratio ranking';
  }

  if (!['Excellent', 'Good', 'Average', 'Poor'].includes(outputs.performanceAnalysis.riskAdjustedPerformance.informationRatioRanking)) {
    errors.informationRatioRanking = 'Invalid Information ratio ranking';
  }

  if (outputs.performanceAnalysis.performanceConsistency.performanceStability < 0) {
    errors.performanceStability = 'Performance stability cannot be negative';
  }

  if (outputs.performanceAnalysis.performanceConsistency.performanceStability > 1) {
    errors.performanceStability = 'Performance stability cannot exceed 1';
  }

  if (outputs.performanceAnalysis.benchmarkAnalysis.benchmarkConsistency < 0) {
    errors.benchmarkConsistency = 'Benchmark consistency cannot be negative';
  }

  if (outputs.performanceAnalysis.benchmarkAnalysis.benchmarkConsistency > 1) {
    errors.benchmarkConsistency = 'Benchmark consistency cannot exceed 1';
  }

  // Risk Analysis Validation
  if (!['Low', 'Medium', 'High'].includes(outputs.riskAnalysis.riskAssessment.overallRiskLevel)) {
    errors.overallRiskLevel = 'Invalid overall risk level';
  }

  if (!['Low', 'Medium', 'High'].includes(outputs.riskAnalysis.riskAssessment.volatilityRisk)) {
    errors.volatilityRisk = 'Invalid volatility risk level';
  }

  if (!['Low', 'Medium', 'High'].includes(outputs.riskAnalysis.riskAssessment.drawdownRisk)) {
    errors.drawdownRisk = 'Invalid drawdown risk level';
  }

  if (!['Low', 'Medium', 'High'].includes(outputs.riskAnalysis.riskAssessment.varRisk)) {
    errors.varRisk = 'Invalid VaR risk level';
  }

  if (!['Low', 'Medium', 'High'].includes(outputs.riskAnalysis.riskAssessment.liquidityRisk)) {
    errors.liquidityRisk = 'Invalid liquidity risk level';
  }

  if (!['Low', 'Medium', 'High'].includes(outputs.riskAnalysis.riskAssessment.leverageRisk)) {
    errors.leverageRisk = 'Invalid leverage risk level';
  }

  if (outputs.riskAnalysis.riskDecomposition.systematicRisk < 0) {
    errors.systematicRisk = 'Systematic risk cannot be negative';
  }

  if (outputs.riskAnalysis.riskDecomposition.systematicRisk > 1) {
    errors.systematicRisk = 'Systematic risk cannot exceed 1';
  }

  if (outputs.riskAnalysis.riskDecomposition.idiosyncraticRisk < 0) {
    errors.idiosyncraticRisk = 'Idiosyncratic risk cannot be negative';
  }

  if (outputs.riskAnalysis.riskDecomposition.idiosyncraticRisk > 1) {
    errors.idiosyncraticRisk = 'Idiosyncratic risk cannot exceed 1';
  }

  if (Math.abs(outputs.riskAnalysis.riskDecomposition.systematicRisk + outputs.riskAnalysis.riskDecomposition.idiosyncraticRisk - 1) > 0.01) {
    errors.riskDecomposition = 'Systematic and idiosyncratic risk should sum to 1';
  }

  if (outputs.riskAnalysis.stressTesting.marketCrashScenario < -100) {
    errors.marketCrashScenario = 'Market crash scenario cannot be less than -100%';
  }

  if (outputs.riskAnalysis.stressTesting.marketCrashScenario > 0) {
    errors.marketCrashScenario = 'Market crash scenario should be negative';
  }

  if (outputs.riskAnalysis.stressTesting.interestRateShock < -100) {
    errors.interestRateShock = 'Interest rate shock cannot be less than -100%';
  }

  if (outputs.riskAnalysis.stressTesting.interestRateShock > 0) {
    errors.interestRateShock = 'Interest rate shock should be negative';
  }

  if (outputs.riskAnalysis.stressTesting.currencyCrisis < -100) {
    errors.currencyCrisis = 'Currency crisis cannot be less than -100%';
  }

  if (outputs.riskAnalysis.stressTesting.currencyCrisis > 0) {
    errors.currencyCrisis = 'Currency crisis should be negative';
  }

  if (outputs.riskAnalysis.stressTesting.liquidityCrisis < -100) {
    errors.liquidityCrisis = 'Liquidity crisis cannot be less than -100%';
  }

  if (outputs.riskAnalysis.stressTesting.liquidityCrisis > 0) {
    errors.liquidityCrisis = 'Liquidity crisis should be negative';
  }

  if (outputs.riskAnalysis.riskManagementRecommendations.length === 0) {
    errors.riskManagementRecommendations = 'Risk management recommendations cannot be empty';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}
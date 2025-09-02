import { FuturesInputs, FuturesOutputs, FuturesMetrics, TradingAnalysis, MarketAnalysis, TradingStrategy, RiskMetric } from './types';

export function calculateFutures(inputs: FuturesInputs): FuturesOutputs {
  // Calculate core metrics
  const metrics = calculateFuturesMetrics(inputs);
  
  // Calculate trading analysis
  const tradingAnalysis = calculateTradingAnalysis(inputs, metrics);
  
  // Calculate market analysis
  const marketAnalysis = calculateMarketAnalysis(inputs, metrics);
  
  // Generate trading strategies
  const tradingStrategies = generateTradingStrategies(inputs, metrics);
  
  // Calculate risk metrics
  const riskMetrics = calculateRiskMetrics(inputs, metrics);

  return {
    metrics,
    tradingAnalysis,
    marketAnalysis,
    tradingStrategies,
    riskMetrics
  };
}

function calculateFuturesMetrics(inputs: FuturesInputs): FuturesMetrics {
  // Calculate position size and margin
  const positionSize = inputs.quantity * inputs.contractSize;
  const marginUsed = positionSize / inputs.leverage;
  const freeMargin = inputs.accountBalance - marginUsed;
  const marginLevel = inputs.accountBalance > 0 ? (inputs.accountBalance / marginUsed) * 100 : 0;
  
  // Calculate P&L
  const priceChange = inputs.currentMarketPrice - inputs.entryPrice;
  const unrealizedPnL = inputs.positionType === 'long' ? priceChange : -priceChange;
  const unrealizedPnLTotal = unrealizedPnL * inputs.quantity * inputs.contractSize;
  const pnlPercentage = inputs.entryPrice > 0 ? (unrealizedPnL / inputs.entryPrice) * 100 : 0;
  
  // Calculate risk metrics
  const stopLossDistance = Math.abs(inputs.entryPrice - inputs.stopLossPrice);
  const takeProfitDistance = Math.abs(inputs.takeProfitPrice - inputs.entryPrice);
  const riskRewardRatio = takeProfitDistance > 0 ? takeProfitDistance / stopLossDistance : 0;
  
  const positionRisk = (stopLossDistance * inputs.quantity * inputs.contractSize / inputs.accountBalance) * 100;
  const accountRisk = positionRisk * (inputs.riskPerTrade / 100);
  
  // Calculate break-even analysis
  const breakEvenPrice = inputs.entryPrice + (inputs.commission / (inputs.quantity * inputs.contractSize));
  
  // Calculate days to expiration
  const daysToExpiration = calculateDaysToExpiration(inputs.expirationDate);
  
  // Calculate volatility metrics
  const dailyVolatility = inputs.volatility / Math.sqrt(252);
  const weeklyVolatility = inputs.volatility / Math.sqrt(52);
  const monthlyVolatility = inputs.volatility / Math.sqrt(12);
  
  // Calculate expected move
  const expectedDailyMove = inputs.currentPrice * (dailyVolatility / 100);
  const expectedWeeklyMove = inputs.currentPrice * (weeklyVolatility / 100);
  
  // Calculate risk-adjusted metrics
  const sharpeRatio = calculateSharpeRatio(unrealizedPnL, inputs.volatility, inputs.riskFreeRate);
  const sortinoRatio = calculateSortinoRatio(unrealizedPnL, inputs.volatility, inputs.riskFreeRate);
  
  // Calculate market metrics
  const beta = inputs.beta;
  const correlation = inputs.correlation;
  
  // Calculate margin efficiency
  const marginEfficiency = inputs.accountBalance > 0 ? (unrealizedPnLTotal / marginUsed) * 100 : 0;
  
  // Calculate time value
  const timeValue = calculateTimeValue(daysToExpiration, inputs.volatility, inputs.currentPrice);
  
  return {
    // Position metrics
    positionSize,
    marginUsed,
    freeMargin,
    marginLevel,
    unrealizedPnL: unrealizedPnLTotal,
    pnlPercentage,
    
    // Risk metrics
    positionRisk,
    accountRisk,
    riskRewardRatio,
    breakEvenPrice,
    daysToExpiration,
    
    // Volatility metrics
    volatility: inputs.volatility,
    dailyVolatility,
    weeklyVolatility,
    monthlyVolatility,
    expectedDailyMove,
    expectedWeeklyMove,
    
    // Risk-adjusted metrics
    sharpeRatio,
    sortinoRatio,
    beta,
    correlation,
    
    // Efficiency metrics
    marginEfficiency,
    timeValue
  };
}

function calculateDaysToExpiration(expirationDate: string): number {
  if (!expirationDate) return 0;
  
  const today = new Date();
  const expiration = new Date(expirationDate);
  const diffTime = expiration.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}

function calculateSharpeRatio(returnValue: number, volatility: number, riskFreeRate: number): number {
  if (volatility === 0) return 0;
  
  const excessReturn = returnValue - (riskFreeRate / 252); // Daily risk-free rate
  return excessReturn / (volatility / Math.sqrt(252));
}

function calculateSortinoRatio(returnValue: number, volatility: number, riskFreeRate: number): number {
  if (volatility === 0) return 0;
  
  const excessReturn = returnValue - (riskFreeRate / 252);
  const downsideDeviation = Math.min(0, excessReturn);
  return excessReturn / Math.abs(downsideDeviation);
}

function calculateTimeValue(daysToExpiration: number, volatility: number, currentPrice: number): number {
  if (daysToExpiration <= 0) return 0;
  
  // Simplified time value calculation
  const timeDecay = Math.sqrt(daysToExpiration / 365);
  return currentPrice * (volatility / 100) * timeDecay;
}

function calculateTradingAnalysis(inputs: FuturesInputs, metrics: FuturesMetrics): TradingAnalysis {
  let recommendation: 'buy' | 'sell' | 'hold' = 'hold';
  let confidenceLevel = 5;
  const keyFactors: string[] = [];
  const risks: string[] = [];
  const opportunities: string[] = [];
  
  // Analyze risk-reward ratio
  if (metrics.riskRewardRatio >= 2) {
    recommendation = inputs.positionType === 'long' ? 'buy' : 'sell';
    confidenceLevel += 2;
    keyFactors.push(`Attractive risk-reward ratio of ${metrics.riskRewardRatio.toFixed(2)}:1`);
    opportunities.push('Favorable risk-reward profile');
  } else if (metrics.riskRewardRatio < 1) {
    confidenceLevel -= 1;
    risks.push('Poor risk-reward ratio');
  }
  
  // Analyze margin level
  if (metrics.marginLevel >= 200) {
    confidenceLevel += 1;
    keyFactors.push('Healthy margin level');
  } else if (metrics.marginLevel < 150) {
    confidenceLevel -= 1;
    risks.push('Low margin level increases risk');
  }
  
  // Analyze position risk
  if (metrics.positionRisk <= 2) {
    confidenceLevel += 1;
    keyFactors.push('Low position risk');
    opportunities.push('Conservative position sizing');
  } else if (metrics.positionRisk > 5) {
    confidenceLevel -= 2;
    risks.push('High position risk');
  }
  
  // Analyze volatility
  if (inputs.volatility < 20) {
    confidenceLevel += 1;
    keyFactors.push('Low volatility environment');
    opportunities.push('Stable market conditions');
  } else if (inputs.volatility > 40) {
    confidenceLevel -= 1;
    risks.push('High volatility increases risk');
  }
  
  // Analyze days to expiration
  if (metrics.daysToExpiration > 30) {
    confidenceLevel += 1;
    keyFactors.push('Sufficient time to expiration');
    opportunities.push('Time for position to develop');
  } else if (metrics.daysToExpiration < 7) {
    confidenceLevel -= 2;
    risks.push('Near expiration increases time decay');
  }
  
  // Analyze market trend
  if (inputs.marketTrend === 'bullish' && inputs.positionType === 'long') {
    confidenceLevel += 1;
    keyFactors.push('Position aligned with market trend');
    opportunities.push('Trend following opportunity');
  } else if (inputs.marketTrend === 'bearish' && inputs.positionType === 'short') {
    confidenceLevel += 1;
    keyFactors.push('Position aligned with market trend');
    opportunities.push('Trend following opportunity');
  } else if (inputs.marketTrend === 'bearish' && inputs.positionType === 'long') {
    confidenceLevel -= 1;
    risks.push('Position against market trend');
  } else if (inputs.marketTrend === 'bullish' && inputs.positionType === 'short') {
    confidenceLevel -= 1;
    risks.push('Position against market trend');
  }
  
  // Analyze beta
  if (inputs.beta < 0.8) {
    confidenceLevel += 1;
    keyFactors.push('Low beta reduces market risk');
    opportunities.push('Portfolio diversification');
  } else if (inputs.beta > 1.5) {
    confidenceLevel -= 1;
    risks.push('High beta increases market sensitivity');
  }
  
  // Clamp confidence level
  confidenceLevel = Math.max(1, Math.min(10, confidenceLevel));
  
  return {
    recommendation,
    confidenceLevel,
    keyFactors,
    risks,
    opportunities
  };
}

function calculateMarketAnalysis(inputs: FuturesInputs, metrics: FuturesMetrics): MarketAnalysis {
  let marketPosition: 'bullish' | 'neutral' | 'bearish' = 'neutral';
  let marketRisk: 'low' | 'medium' | 'high' = 'medium';
  const marketFactors: string[] = [];
  const marketOutlook: string[] = [];
  
  // Determine market position based on trend
  if (inputs.marketTrend === 'bullish') {
    marketPosition = 'bullish';
    marketFactors.push('Bullish market trend');
  } else if (inputs.marketTrend === 'bearish') {
    marketPosition = 'bearish';
    marketFactors.push('Bearish market trend');
  } else {
    marketFactors.push('Neutral market trend');
  }
  
  // Assess market risk based on volatility
  if (inputs.volatility < 20) {
    marketRisk = 'low';
    marketFactors.push('Low volatility indicates stable market');
  } else if (inputs.volatility > 40) {
    marketRisk = 'high';
    marketFactors.push('High volatility indicates increased risk');
  }
  
  // Analyze open interest and volume
  if (inputs.openInterest > 10000 && inputs.volume > 5000) {
    marketFactors.push('High liquidity with significant open interest');
    marketOutlook.push('Easy entry and exit from positions');
  } else if (inputs.openInterest < 5000 || inputs.volume < 2000) {
    marketRisk = 'high';
    marketFactors.push('Low liquidity may impact trading');
    marketOutlook.push('Limited liquidity may cause slippage');
  }
  
  // Analyze price action
  if (inputs.bidPrice > 0 && inputs.askPrice > 0) {
    const spread = inputs.askPrice - inputs.bidPrice;
    const spreadPercentage = (spread / inputs.currentPrice) * 100;
    
    if (spreadPercentage < 0.1) {
      marketFactors.push('Tight bid-ask spread');
      marketOutlook.push('Efficient price discovery');
    } else if (spreadPercentage > 0.5) {
      marketRisk = 'high';
      marketFactors.push('Wide bid-ask spread');
      marketOutlook.push('Potential slippage on trades');
    }
  }
  
  // Analyze correlation
  if (Math.abs(inputs.correlation) < 0.3) {
    marketFactors.push('Low correlation with broader market');
    marketOutlook.push('Good portfolio diversification');
  } else if (Math.abs(inputs.correlation) > 0.7) {
    marketRisk = 'high';
    marketFactors.push('High correlation increases market risk');
    marketOutlook.push('Limited diversification benefits');
  }
  
  return {
    marketPosition,
    marketRisk,
    marketFactors,
    marketOutlook
  };
}

function generateTradingStrategies(inputs: FuturesInputs, metrics: FuturesMetrics): TradingStrategy[] {
  const strategies: TradingStrategy[] = [];
  
  // Trend following strategy
  if (inputs.marketTrend === 'bullish' && inputs.positionType === 'long') {
    strategies.push({
      name: 'Trend Following',
      entryPrice: inputs.entryPrice,
      exitPrice: inputs.takeProfitPrice,
      profitLoss: (inputs.takeProfitPrice - inputs.entryPrice) * inputs.quantity * inputs.contractSize,
      riskLevel: 'medium',
      timeHorizon: 'Medium-term',
      description: 'Follow bullish market trend'
    });
  }
  
  // Mean reversion strategy
  if (Math.abs(metrics.pnlPercentage) > 10) {
    strategies.push({
      name: 'Mean Reversion',
      entryPrice: inputs.currentMarketPrice,
      exitPrice: inputs.entryPrice,
      profitLoss: (inputs.entryPrice - inputs.currentMarketPrice) * inputs.quantity * inputs.contractSize,
      riskLevel: 'high',
      timeHorizon: 'Short-term',
      description: 'Bet on price returning to mean'
    });
  }
  
  // Volatility trading strategy
  if (inputs.volatility > 30) {
    strategies.push({
      name: 'Volatility Trading',
      entryPrice: inputs.currentMarketPrice,
      exitPrice: inputs.currentMarketPrice * 1.05,
      profitLoss: (inputs.currentMarketPrice * 0.05) * inputs.quantity * inputs.contractSize,
      riskLevel: 'high',
      timeHorizon: 'Short-term',
      description: 'Trade on high volatility environment'
    });
  }
  
  // Calendar spread strategy
  if (metrics.daysToExpiration > 30) {
    strategies.push({
      name: 'Calendar Spread',
      entryPrice: inputs.currentMarketPrice,
      exitPrice: inputs.currentMarketPrice * 1.02,
      profitLoss: (inputs.currentMarketPrice * 0.02) * inputs.quantity * inputs.contractSize,
      riskLevel: 'medium',
      timeHorizon: 'Medium-term',
      description: 'Benefit from time decay differences'
    });
  }
  
  // Breakout strategy
  if (inputs.volume > inputs.openInterest * 0.1) {
    strategies.push({
      name: 'Breakout Strategy',
      entryPrice: inputs.currentMarketPrice,
      exitPrice: inputs.currentMarketPrice * 1.03,
      profitLoss: (inputs.currentMarketPrice * 0.03) * inputs.quantity * inputs.contractSize,
      riskLevel: 'medium',
      timeHorizon: 'Short-term',
      description: 'Trade volume-driven breakouts'
    });
  }
  
  return strategies;
}

function calculateRiskMetrics(inputs: FuturesInputs, metrics: FuturesMetrics): RiskMetric[] {
  const riskMetrics: RiskMetric[] = [];
  
  // Position risk
  riskMetrics.push({
    name: 'Position Risk',
    value: metrics.positionRisk,
    description: 'Percentage of account at risk'
  });
  
  // Leverage risk
  const leverageRisk = (1 / inputs.leverage) * 100;
  riskMetrics.push({
    name: 'Leverage Risk',
    value: leverageRisk,
    description: 'Effective leverage risk'
  });
  
  // Volatility risk
  const volatilityRisk = inputs.volatility;
  riskMetrics.push({
    name: 'Volatility Risk',
    value: volatilityRisk,
    description: 'Annual volatility percentage'
  });
  
  // Time decay risk
  const timeDecayRisk = metrics.daysToExpiration < 30 ? 5 : 2;
  riskMetrics.push({
    name: 'Time Decay Risk',
    value: timeDecayRisk,
    description: 'Time value erosion risk'
  });
  
  // Liquidity risk
  const liquidityRisk = inputs.openInterest < 10000 ? 8 : 3;
  riskMetrics.push({
    name: 'Liquidity Risk',
    value: liquidityRisk,
    description: 'Market liquidity risk'
  });
  
  // Correlation risk
  const correlationRisk = Math.abs(inputs.correlation) * 100;
  riskMetrics.push({
    name: 'Correlation Risk',
    value: correlationRisk,
    description: 'Market correlation risk'
  });
  
  return riskMetrics;
}
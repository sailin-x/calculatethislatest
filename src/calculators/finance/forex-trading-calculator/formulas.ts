import { ForexTradingInputs, ForexTradingOutputs, ForexTradingMetrics, TradingAnalysis, MarketAnalysis, TradingStrategy, RiskMetric } from './types';

export function calculateForexTrading(inputs: ForexTradingInputs): ForexTradingOutputs {
  // Calculate core metrics
  const metrics = calculateForexMetrics(inputs);
  
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

function calculateForexMetrics(inputs: ForexTradingInputs): ForexTradingMetrics {
  // Calculate position size and leverage
  const positionSize = inputs.lotSize * 100000; // Standard lot = 100,000 units
  const leverageRatio = inputs.accountBalance > 0 ? (positionSize / inputs.accountBalance) : 0;
  const marginRequired = positionSize / inputs.leverage;
  const freeMargin = inputs.accountBalance - marginRequired;
  const marginLevel = inputs.accountBalance > 0 ? (inputs.accountBalance / marginRequired) * 100 : 0;
  
  // Calculate pip value
  const pipValue = calculatePipValue(inputs.baseCurrency, inputs.quoteCurrency, inputs.lotSize);
  
  // Calculate profit/loss scenarios
  const profitAtTarget = (inputs.targetPrice - inputs.entryPrice) * pipValue * inputs.lotSize * 100000;
  const lossAtStopLoss = (inputs.entryPrice - inputs.stopLossPrice) * pipValue * inputs.lotSize * 100000;
  
  // Calculate risk-reward ratio
  const riskRewardRatio = Math.abs(profitAtTarget / lossAtStopLoss);
  
  // Calculate position risk
  const positionRisk = (lossAtStopLoss / inputs.accountBalance) * 100;
  const accountRisk = positionRisk * inputs.riskPerTrade / 100;
  
  // Calculate break-even analysis
  const breakEvenPips = inputs.commission + inputs.swap;
  const breakEvenPrice = inputs.entryPrice + (breakEvenPips / (pipValue * inputs.lotSize * 100000));
  
  // Calculate correlation impact
  const correlationImpact = calculateCorrelationImpact(inputs.correlationPairs);
  
  // Calculate volatility metrics
  const dailyVolatility = inputs.dailyVolatility;
  const weeklyVolatility = dailyVolatility * Math.sqrt(5);
  const monthlyVolatility = dailyVolatility * Math.sqrt(21);
  
  // Calculate expected move
  const expectedDailyMove = inputs.entryPrice * (dailyVolatility / 100);
  const expectedWeeklyMove = inputs.entryPrice * (weeklyVolatility / 100);
  
  // Calculate probability metrics
  const probabilityOfProfit = calculateProbabilityOfProfit(inputs.entryPrice, inputs.targetPrice, inputs.stopLossPrice, dailyVolatility);
  const probabilityOfStopLoss = calculateProbabilityOfStopLoss(inputs.entryPrice, inputs.stopLossPrice, dailyVolatility);
  
  // Calculate time decay
  const timeDecay = calculateTimeDecay(inputs.holdingPeriod, inputs.swap);
  
  // Calculate market impact
  const marketImpact = calculateMarketImpact(inputs.lotSize, inputs.marketLiquidity);
  
  return {
    // Position metrics
    positionSize,
    leverageRatio,
    marginRequired,
    freeMargin,
    marginLevel,
    pipValue,
    
    // Profit/Loss metrics
    profitAtTarget,
    lossAtStopLoss,
    riskRewardRatio,
    positionRisk,
    accountRisk,
    
    // Break-even analysis
    breakEvenPips,
    breakEvenPrice,
    
    // Market metrics
    correlationImpact,
    dailyVolatility,
    weeklyVolatility,
    monthlyVolatility,
    expectedDailyMove,
    expectedWeeklyMove,
    
    // Probability metrics
    probabilityOfProfit,
    probabilityOfStopLoss,
    
    // Time and impact metrics
    timeDecay,
    marketImpact
  };
}

function calculatePipValue(baseCurrency: string, quoteCurrency: string, lotSize: number): number {
  // Standard pip value calculation
  // For most currency pairs, 1 pip = 0.0001
  const pipSize = 0.0001;
  
  // For JPY pairs, 1 pip = 0.01
  if (quoteCurrency === 'JPY') {
    return 0.01 * lotSize;
  }
  
  return pipSize * lotSize;
}

function calculateCorrelationImpact(correlationPairs: Array<{pair: string, correlation: number}>): number {
  if (!correlationPairs || correlationPairs.length === 0) {
    return 0;
  }
  
  const totalCorrelation = correlationPairs.reduce((sum, pair) => sum + Math.abs(pair.correlation), 0);
  return totalCorrelation / correlationPairs.length;
}

function calculateProbabilityOfProfit(entryPrice: number, targetPrice: number, stopLossPrice: number, volatility: number): number {
  const distanceToTarget = Math.abs(targetPrice - entryPrice);
  const distanceToStopLoss = Math.abs(entryPrice - stopLossPrice);
  
  // Using normal distribution approximation
  const zScore = (distanceToTarget - distanceToStopLoss) / (volatility / 100);
  const probability = 0.5 * (1 + erf(zScore / Math.sqrt(2)));
  
  return Math.max(0, Math.min(1, probability));
}

function calculateProbabilityOfStopLoss(entryPrice: number, stopLossPrice: number, volatility: number): number {
  const distanceToStopLoss = Math.abs(entryPrice - stopLossPrice);
  
  // Using normal distribution approximation
  const zScore = distanceToStopLoss / (volatility / 100);
  const probability = 0.5 * (1 - erf(zScore / Math.sqrt(2)));
  
  return Math.max(0, Math.min(1, probability));
}

function erf(x: number): number {
  // Approximation of error function
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

function calculateTimeDecay(holdingPeriod: number, swap: number): number {
  // Calculate time decay based on holding period and swap costs
  const dailySwap = swap / 365;
  return dailySwap * holdingPeriod;
}

function calculateMarketImpact(lotSize: number, marketLiquidity: number): number {
  // Estimate market impact based on lot size and liquidity
  const impactFactor = lotSize / (marketLiquidity * 1000);
  return Math.min(impactFactor, 0.1); // Cap at 10%
}

function calculateTradingAnalysis(inputs: ForexTradingInputs, metrics: ForexTradingMetrics): TradingAnalysis {
  let recommendation: 'buy' | 'sell' | 'hold' = 'hold';
  let confidenceLevel = 5;
  const keyFactors: string[] = [];
  const risks: string[] = [];
  const opportunities: string[] = [];
  
  // Analyze risk-reward ratio
  if (metrics.riskRewardRatio >= 2) {
    recommendation = inputs.direction === 'long' ? 'buy' : 'sell';
    confidenceLevel += 2;
    keyFactors.push(`Attractive risk-reward ratio of ${metrics.riskRewardRatio.toFixed(2)}:1`);
    opportunities.push('Favorable risk-reward profile');
  } else if (metrics.riskRewardRatio < 1) {
    confidenceLevel -= 1;
    risks.push('Poor risk-reward ratio');
  }
  
  // Analyze account risk
  if (metrics.accountRisk <= 2) {
    confidenceLevel += 1;
    keyFactors.push('Low account risk');
    opportunities.push('Conservative position sizing');
  } else if (metrics.accountRisk > 5) {
    confidenceLevel -= 2;
    risks.push('High account risk');
  }
  
  // Analyze margin level
  if (metrics.marginLevel >= 200) {
    confidenceLevel += 1;
    keyFactors.push('Healthy margin level');
  } else if (metrics.marginLevel < 150) {
    confidenceLevel -= 1;
    risks.push('Low margin level increases risk');
  }
  
  // Analyze volatility
  if (metrics.dailyVolatility < 1) {
    confidenceLevel += 1;
    keyFactors.push('Low volatility environment');
    opportunities.push('Stable market conditions');
  } else if (metrics.dailyVolatility > 3) {
    confidenceLevel -= 1;
    risks.push('High volatility increases risk');
  }
  
  // Analyze probability
  if (metrics.probabilityOfProfit > 0.6) {
    confidenceLevel += 1;
    keyFactors.push(`High probability of profit (${(metrics.probabilityOfProfit * 100).toFixed(1)}%)`);
    opportunities.push('Favorable probability distribution');
  } else if (metrics.probabilityOfProfit < 0.4) {
    confidenceLevel -= 1;
    risks.push('Low probability of profit');
  }
  
  // Analyze correlation
  if (metrics.correlationImpact < 0.3) {
    confidenceLevel += 1;
    keyFactors.push('Low correlation with other positions');
    opportunities.push('Good portfolio diversification');
  } else if (metrics.correlationImpact > 0.7) {
    confidenceLevel -= 1;
    risks.push('High correlation increases portfolio risk');
  }
  
  // Analyze market conditions
  if (inputs.marketCondition === 'trending') {
    confidenceLevel += 1;
    keyFactors.push('Trending market condition');
    opportunities.push('Favorable for trend following');
  } else if (inputs.marketCondition === 'ranging') {
    confidenceLevel -= 1;
    risks.push('Ranging market may limit profit potential');
  }
  
  // Analyze economic calendar
  if (inputs.highImpactNews === 'none') {
    confidenceLevel += 1;
    keyFactors.push('No high-impact news events');
    opportunities.push('Reduced event risk');
  } else {
    confidenceLevel -= 1;
    risks.push('High-impact news event may cause volatility');
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

function calculateMarketAnalysis(inputs: ForexTradingInputs, metrics: ForexTradingMetrics): MarketAnalysis {
  let marketPosition: 'bullish' | 'neutral' | 'bearish' = 'neutral';
  let marketRisk: 'low' | 'medium' | 'high' = 'medium';
  const marketFactors: string[] = [];
  const marketOutlook: string[] = [];
  
  // Determine market position based on technical analysis
  if (inputs.technicalIndicators.some(indicator => indicator.signal === 'buy')) {
    marketPosition = 'bullish';
    marketFactors.push('Technical indicators suggest bullish momentum');
  } else if (inputs.technicalIndicators.some(indicator => indicator.signal === 'sell')) {
    marketPosition = 'bearish';
    marketFactors.push('Technical indicators suggest bearish momentum');
  }
  
  // Assess market risk based on volatility
  if (metrics.dailyVolatility < 1) {
    marketRisk = 'low';
    marketFactors.push('Low volatility indicates stable market');
  } else if (metrics.dailyVolatility > 3) {
    marketRisk = 'high';
    marketFactors.push('High volatility indicates increased risk');
  }
  
  // Economic outlook impact
  if (inputs.economicOutlook === 'positive') {
    marketFactors.push('Positive economic outlook supports currency strength');
    marketOutlook.push('Economic growth may strengthen currency');
  } else if (inputs.economicOutlook === 'negative') {
    marketRisk = 'high';
    marketFactors.push('Negative economic outlook may weaken currency');
    marketOutlook.push('Economic weakness may pressure currency');
  }
  
  // Interest rate environment
  if (inputs.interestRateEnvironment === 'divergent') {
    marketFactors.push('Divergent monetary policies may create opportunities');
    marketOutlook.push('Interest rate differentials may drive currency movements');
  } else if (inputs.interestRateEnvironment === 'convergent') {
    marketFactors.push('Convergent monetary policies may reduce volatility');
    marketOutlook.push('Similar interest rate paths may limit currency movements');
  }
  
  // Liquidity analysis
  if (inputs.marketLiquidity >= 8) {
    marketFactors.push('High market liquidity');
    marketOutlook.push('Easy entry and exit from positions');
  } else if (inputs.marketLiquidity <= 4) {
    marketRisk = 'high';
    marketFactors.push('Low market liquidity may impact trading');
    marketOutlook.push('Limited liquidity may cause slippage');
  }
  
  return {
    marketPosition,
    marketRisk,
    marketFactors,
    marketOutlook
  };
}

function generateTradingStrategies(inputs: ForexTradingInputs, metrics: ForexTradingMetrics): TradingStrategy[] {
  const strategies: TradingStrategy[] = [];
  
  // Breakout strategy
  if (inputs.marketCondition === 'trending') {
    strategies.push({
      name: 'Breakout Strategy',
      entryPrice: inputs.entryPrice,
      exitPrice: inputs.targetPrice,
      profitLoss: metrics.profitAtTarget,
      riskLevel: 'medium',
      timeHorizon: 'Short-term',
      description: 'Trade breakouts in trending markets'
    });
  }
  
  // Range trading strategy
  if (inputs.marketCondition === 'ranging') {
    strategies.push({
      name: 'Range Trading',
      entryPrice: inputs.entryPrice,
      exitPrice: inputs.entryPrice + (metrics.expectedDailyMove * 0.5),
      profitLoss: metrics.expectedDailyMove * 0.5 * metrics.pipValue * inputs.lotSize * 100000,
      riskLevel: 'low',
      timeHorizon: 'Intraday',
      description: 'Trade within established range boundaries'
    });
  }
  
  // Carry trade strategy
  if (inputs.swap > 0) {
    strategies.push({
      name: 'Carry Trade',
      entryPrice: inputs.entryPrice,
      exitPrice: inputs.entryPrice + (metrics.expectedWeeklyMove * 0.3),
      profitLoss: (metrics.expectedWeeklyMove * 0.3 * metrics.pipValue * inputs.lotSize * 100000) + (inputs.swap * inputs.holdingPeriod / 365),
      riskLevel: 'medium',
      timeHorizon: 'Medium-term',
      description: 'Benefit from interest rate differentials'
    });
  }
  
  // Scalping strategy
  if (metrics.dailyVolatility > 1.5) {
    strategies.push({
      name: 'Scalping',
      entryPrice: inputs.entryPrice,
      exitPrice: inputs.entryPrice + (metrics.expectedDailyMove * 0.2),
      profitLoss: metrics.expectedDailyMove * 0.2 * metrics.pipValue * inputs.lotSize * 100000,
      riskLevel: 'high',
      timeHorizon: 'Intraday',
      description: 'Quick trades for small profits'
    });
  }
  
  // News trading strategy
  if (inputs.highImpactNews !== 'none') {
    strategies.push({
      name: 'News Trading',
      entryPrice: inputs.entryPrice,
      exitPrice: inputs.entryPrice + (metrics.expectedDailyMove * 2),
      profitLoss: metrics.expectedDailyMove * 2 * metrics.pipValue * inputs.lotSize * 100000,
      riskLevel: 'high',
      timeHorizon: 'Short-term',
      description: 'Trade around high-impact news events'
    });
  }
  
  return strategies;
}

function calculateRiskMetrics(inputs: ForexTradingInputs, metrics: ForexTradingMetrics): RiskMetric[] {
  const riskMetrics: RiskMetric[] = [];
  
  // Position risk
  riskMetrics.push({
    name: 'Position Risk',
    value: metrics.positionRisk,
    description: 'Percentage of account at risk'
  });
  
  // Leverage risk
  const leverageRisk = metrics.leverageRatio * 100;
  riskMetrics.push({
    name: 'Leverage Risk',
    value: leverageRisk,
    description: 'Effective leverage ratio'
  });
  
  // Volatility risk
  const volatilityRisk = metrics.dailyVolatility;
  riskMetrics.push({
    name: 'Volatility Risk',
    value: volatilityRisk,
    description: 'Daily volatility percentage'
  });
  
  // Correlation risk
  const correlationRisk = metrics.correlationImpact * 100;
  riskMetrics.push({
    name: 'Correlation Risk',
    value: correlationRisk,
    description: 'Portfolio correlation impact'
  });
  
  // Liquidity risk
  const liquidityRisk = (10 - inputs.marketLiquidity) / 10;
  riskMetrics.push({
    name: 'Liquidity Risk',
    value: liquidityRisk,
    description: 'Market liquidity risk'
  });
  
  // Event risk
  const eventRisk = inputs.highImpactNews !== 'none' ? 0.05 : 0;
  riskMetrics.push({
    name: 'Event Risk',
    value: eventRisk,
    description: 'News event risk'
  });
  
  return riskMetrics;
}
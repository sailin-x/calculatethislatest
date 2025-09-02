import { StockOptionsInputs, StockOptionsOutputs, StockOptionsMetrics, TradingAnalysis, MarketAnalysis, TradingStrategy, RiskMetric } from './types';

export function calculateStockOptions(inputs: StockOptionsInputs): StockOptionsOutputs {
  // Calculate core metrics
  const metrics = calculateStockOptionsMetrics(inputs);

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

function calculateStockOptionsMetrics(inputs: StockOptionsInputs): StockOptionsMetrics {
  // Calculate intrinsic value
  let intrinsicValue = 0;
  if (inputs.optionType === 'call') {
    intrinsicValue = Math.max(0, inputs.stockPrice - inputs.strikePrice);
  } else {
    intrinsicValue = Math.max(0, inputs.strikePrice - inputs.stockPrice);
  }

  // Calculate time value
  const timeValue = Math.max(0, inputs.premium - intrinsicValue);

  // Calculate unrealized P&L
  const unrealizedPnL = (inputs.currentMarketPrice - inputs.premium) * inputs.quantity * 100;
  const pnlPercentage = inputs.premium > 0 ? (unrealizedPnL / (inputs.premium * inputs.quantity * 100)) * 100 : 0;

  // Calculate break-even price
  let breakEvenPrice = 0;
  if (inputs.optionType === 'call') {
    breakEvenPrice = inputs.strikePrice + inputs.premium;
  } else {
    breakEvenPrice = inputs.strikePrice - inputs.premium;
  }

  // Calculate days to expiration
  const daysToExpiration = inputs.timeToExpiration;

  // Calculate Greeks (using provided values or calculating approximations)
  const delta = inputs.delta;
  const gamma = inputs.gamma;
  const theta = inputs.theta;
  const vega = inputs.vega;
  const rho = inputs.rho;

  // Calculate risk metrics
  const positionRisk = (inputs.premium * inputs.quantity * 100) / 10000; // Simplified risk calculation
  const accountRisk = positionRisk * 0.02; // Assuming 2% risk per trade

  // Calculate risk-reward ratio
  const maxProfit = inputs.optionType === 'call' ? 
    (inputs.stockPrice * 2 - inputs.strikePrice - inputs.premium) * inputs.quantity * 100 :
    (inputs.strikePrice - inputs.premium) * inputs.quantity * 100;
  const maxLoss = inputs.premium * inputs.quantity * 100;
  const riskRewardRatio = maxLoss > 0 ? maxProfit / maxLoss : 0;

  // Calculate probability of profit (simplified)
  const probabilityOfProfit = calculateProbabilityOfProfit(inputs);

  // Calculate volatility metrics
  const dailyVolatility = inputs.volatility / Math.sqrt(252);
  const weeklyVolatility = inputs.volatility / Math.sqrt(52);
  const monthlyVolatility = inputs.volatility / Math.sqrt(12);

  // Calculate expected moves
  const expectedDailyMove = inputs.stockPrice * (dailyVolatility / 100);
  const expectedWeeklyMove = inputs.stockPrice * (weeklyVolatility / 100);

  // Calculate time decay impact
  const timeDecayImpact = calculateTimeDecayImpact(inputs);

  // Calculate implied volatility skew
  const impliedVolatilitySkew = inputs.impliedVolatility - inputs.volatility;

  return {
    // Option metrics
    intrinsicValue,
    timeValue,
    unrealizedPnL,
    pnlPercentage,
    breakEvenPrice,
    daysToExpiration,

    // Greeks
    delta,
    gamma,
    theta,
    vega,
    rho,

    // Risk metrics
    positionRisk,
    accountRisk,
    riskRewardRatio,
    probabilityOfProfit,

    // Volatility metrics
    volatility: inputs.volatility,
    dailyVolatility,
    weeklyVolatility,
    monthlyVolatility,
    expectedDailyMove,
    expectedWeeklyMove,

    // Time and market metrics
    timeDecayImpact,
    impliedVolatilitySkew
  };
}

function calculateProbabilityOfProfit(inputs: StockOptionsInputs): number {
  // Simplified probability calculation based on moneyness and time
  const moneyness = inputs.optionType === 'call' ? 
    (inputs.stockPrice - inputs.strikePrice) / inputs.stockPrice :
    (inputs.strikePrice - inputs.stockPrice) / inputs.stockPrice;

  let baseProbability = 0.5;

  if (inputs.optionType === 'call') {
    if (moneyness > 0.1) baseProbability = 0.7; // In-the-money
    else if (moneyness < -0.1) baseProbability = 0.3; // Out-of-the-money
  } else {
    if (moneyness > 0.1) baseProbability = 0.7; // In-the-money
    else if (moneyness < -0.1) baseProbability = 0.3; // Out-of-the-money
  }

  // Adjust for time to expiration
  const timeAdjustment = Math.min(1, inputs.timeToExpiration / 365);
  baseProbability = baseProbability * (0.5 + 0.5 * timeAdjustment);

  // Adjust for volatility
  const volatilityAdjustment = Math.min(1, inputs.volatility / 50);
  baseProbability = baseProbability * (0.8 + 0.2 * volatilityAdjustment);

  return Math.max(0.1, Math.min(0.9, baseProbability));
}

function calculateTimeDecayImpact(inputs: StockOptionsInputs): number {
  // Calculate theta impact over time
  const dailyTheta = inputs.theta / 365;
  const totalThetaImpact = dailyTheta * inputs.timeToExpiration;
  
  return totalThetaImpact;
}

function calculateTradingAnalysis(inputs: StockOptionsInputs, metrics: StockOptionsMetrics): TradingAnalysis {
  let recommendation: 'buy' | 'sell' | 'hold' = 'hold';
  let confidenceLevel = 5;
  const keyFactors: string[] = [];
  const risks: string[] = [];
  const opportunities: string[] = [];

  // Analyze moneyness
  const moneyness = inputs.optionType === 'call' ? 
    (inputs.stockPrice - inputs.strikePrice) / inputs.stockPrice :
    (inputs.strikePrice - inputs.stockPrice) / inputs.stockPrice;

  if (Math.abs(moneyness) < 0.05) {
    recommendation = 'buy';
    confidenceLevel += 2;
    keyFactors.push('Option is at-the-money with balanced risk/reward');
    opportunities.push('Optimal entry point for directional trades');
  } else if (moneyness > 0.1) {
    if (inputs.optionType === 'call') {
      recommendation = 'hold';
      confidenceLevel += 1;
      keyFactors.push('Call option is in-the-money');
      opportunities.push('Consider rolling to higher strike');
    } else {
      recommendation = 'sell';
      confidenceLevel += 1;
      keyFactors.push('Put option is in-the-money');
      opportunities.push('Consider closing position');
    }
  } else if (moneyness < -0.1) {
    if (inputs.optionType === 'call') {
      recommendation = 'hold';
      confidenceLevel -= 1;
      keyFactors.push('Call option is out-of-the-money');
      risks.push('Low probability of profit');
    } else {
      recommendation = 'hold';
      confidenceLevel -= 1;
      keyFactors.push('Put option is out-of-the-money');
      risks.push('Low probability of profit');
    }
  }

  // Analyze time to expiration
  if (metrics.daysToExpiration > 60) {
    confidenceLevel += 1;
    keyFactors.push('Sufficient time for position to develop');
    opportunities.push('Time value erosion is minimal');
  } else if (metrics.daysToExpiration < 7) {
    confidenceLevel -= 2;
    risks.push('Near expiration increases time decay');
    keyFactors.push('High theta impact');
  }

  // Analyze volatility
  if (inputs.volatility > 40) {
    confidenceLevel += 1;
    keyFactors.push('High volatility environment');
    opportunities.push('Premium selling opportunities');
  } else if (inputs.volatility < 15) {
    confidenceLevel -= 1;
    risks.push('Low volatility may limit profit potential');
    keyFactors.push('Low premium environment');
  }

  // Analyze Greeks
  if (Math.abs(metrics.delta) > 0.7) {
    keyFactors.push('High delta indicates strong directional exposure');
  }
  if (metrics.gamma > 0.05) {
    keyFactors.push('High gamma indicates rapid delta changes');
    risks.push('Gamma risk in volatile markets');
  }
  if (Math.abs(metrics.theta) > 0.1) {
    keyFactors.push('High theta indicates rapid time decay');
    risks.push('Significant time value erosion');
  }

  // Analyze risk-reward ratio
  if (metrics.riskRewardRatio >= 2) {
    confidenceLevel += 1;
    keyFactors.push(`Attractive risk-reward ratio of ${metrics.riskRewardRatio.toFixed(2)}:1`);
    opportunities.push('Favorable risk profile');
  } else if (metrics.riskRewardRatio < 1) {
    confidenceLevel -= 1;
    risks.push('Poor risk-reward ratio');
  }

  // Analyze probability of profit
  if (metrics.probabilityOfProfit > 0.6) {
    confidenceLevel += 1;
    keyFactors.push('High probability of profit');
    opportunities.push('Statistical edge in favor');
  } else if (metrics.probabilityOfProfit < 0.4) {
    confidenceLevel -= 1;
    risks.push('Low probability of profit');
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

function calculateMarketAnalysis(inputs: StockOptionsInputs, metrics: StockOptionsMetrics): MarketAnalysis {
  let marketPosition: 'bullish' | 'neutral' | 'bearish' = 'neutral';
  let marketRisk: 'low' | 'medium' | 'high' = 'medium';
  const marketFactors: string[] = [];
  const marketOutlook: string[] = [];

  // Determine market position based on option type and stock price
  if (inputs.optionType === 'call' && inputs.stockPrice > inputs.strikePrice) {
    marketPosition = 'bullish';
    marketFactors.push('Call option in-the-money indicates bullish sentiment');
  } else if (inputs.optionType === 'put' && inputs.stockPrice < inputs.strikePrice) {
    marketPosition = 'bearish';
    marketFactors.push('Put option in-the-money indicates bearish sentiment');
  } else {
    marketFactors.push('Option at-the-money indicates neutral sentiment');
  }

  // Assess market risk based on volatility
  if (inputs.volatility < 20) {
    marketRisk = 'low';
    marketFactors.push('Low volatility indicates stable market');
    marketOutlook.push('Predictable price movements');
  } else if (inputs.volatility > 40) {
    marketRisk = 'high';
    marketFactors.push('High volatility indicates increased risk');
    marketOutlook.push('Unpredictable price movements');
  }

  // Analyze implied volatility skew
  if (Math.abs(metrics.impliedVolatilitySkew) > 5) {
    marketFactors.push('Significant implied volatility skew');
    if (metrics.impliedVolatilitySkew > 0) {
      marketOutlook.push('Market expects increased volatility');
    } else {
      marketOutlook.push('Market expects decreased volatility');
    }
  }

  // Analyze time decay impact
  if (Math.abs(metrics.timeDecayImpact) > 0.5) {
    marketFactors.push('Significant time decay impact');
    marketOutlook.push('Time value erosion is a major factor');
  }

  // Analyze volume and open interest
  if (inputs.volume > 1000 && inputs.openInterest > 500) {
    marketFactors.push('High liquidity with significant open interest');
    marketOutlook.push('Easy entry and exit from positions');
  } else if (inputs.volume < 100 || inputs.openInterest < 100) {
    marketRisk = 'high';
    marketFactors.push('Low liquidity may impact trading');
    marketOutlook.push('Limited liquidity may cause slippage');
  }

  return {
    marketPosition,
    marketRisk,
    marketFactors,
    marketOutlook
  };
}

function generateTradingStrategies(inputs: StockOptionsInputs, metrics: StockOptionsMetrics): TradingStrategy[] {
  const strategies: TradingStrategy[] = [];

  // Long option strategy
  if (inputs.optionType === 'call' && inputs.stockPrice > inputs.strikePrice) {
    strategies.push({
      name: 'Long Call',
      entryPrice: inputs.premium,
      exitPrice: inputs.premium * 1.5,
      profitLoss: (inputs.premium * 0.5) * inputs.quantity * 100,
      riskLevel: 'medium',
      timeHorizon: 'Medium-term',
      description: 'Bullish directional play with limited risk'
    });
  }

  // Covered call strategy
  if (inputs.optionType === 'call' && inputs.stockPrice > inputs.strikePrice) {
    strategies.push({
      name: 'Covered Call',
      entryPrice: inputs.premium,
      exitPrice: inputs.premium * 0.5,
      profitLoss: (inputs.premium * 0.5) * inputs.quantity * 100,
      riskLevel: 'low',
      timeHorizon: 'Short-term',
      description: 'Income generation with stock ownership'
    });
  }

  // Protective put strategy
  if (inputs.optionType === 'put' && inputs.stockPrice > inputs.strikePrice) {
    strategies.push({
      name: 'Protective Put',
      entryPrice: inputs.premium,
      exitPrice: inputs.premium * 0.3,
      profitLoss: (inputs.premium * 0.7) * inputs.quantity * 100,
      riskLevel: 'low',
      timeHorizon: 'Long-term',
      description: 'Downside protection for stock portfolio'
    });
  }

  // Straddle strategy
  if (Math.abs(metrics.impliedVolatilitySkew) > 5) {
    strategies.push({
      name: 'Long Straddle',
      entryPrice: inputs.premium * 2,
      exitPrice: inputs.premium * 2.5,
      profitLoss: (inputs.premium * 0.5) * inputs.quantity * 100,
      riskLevel: 'high',
      timeHorizon: 'Short-term',
      description: 'Volatility play expecting large moves'
    });
  }

  // Calendar spread strategy
  if (metrics.daysToExpiration > 30) {
    strategies.push({
      name: 'Calendar Spread',
      entryPrice: inputs.premium * 0.5,
      exitPrice: inputs.premium * 0.7,
      profitLoss: (inputs.premium * 0.2) * inputs.quantity * 100,
      riskLevel: 'medium',
      timeHorizon: 'Medium-term',
      description: 'Benefit from time decay differences'
    });
  }

  return strategies;
}

function calculateRiskMetrics(inputs: StockOptionsInputs, metrics: StockOptionsMetrics): RiskMetric[] {
  const riskMetrics: RiskMetric[] = [];

  // Position risk
  riskMetrics.push({
    name: 'Position Risk',
    value: metrics.positionRisk,
    description: 'Percentage of account at risk'
  });

  // Time decay risk
  const timeDecayRisk = Math.abs(metrics.timeDecayImpact) * 100;
  riskMetrics.push({
    name: 'Time Decay Risk',
    value: timeDecayRisk,
    description: 'Time value erosion risk'
  });

  // Volatility risk
  const volatilityRisk = inputs.volatility;
  riskMetrics.push({
    name: 'Volatility Risk',
    value: volatilityRisk,
    description: 'Annual volatility percentage'
  });

  // Gamma risk
  const gammaRisk = metrics.gamma * 1000;
  riskMetrics.push({
    name: 'Gamma Risk',
    value: gammaRisk,
    description: 'Delta change sensitivity'
  });

  // Theta risk
  const thetaRisk = Math.abs(metrics.theta) * 100;
  riskMetrics.push({
    name: 'Theta Risk',
    value: thetaRisk,
    description: 'Time decay sensitivity'
  });

  // Vega risk
  const vegaRisk = metrics.vega * 100;
  riskMetrics.push({
    name: 'Vega Risk',
    value: vegaRisk,
    description: 'Volatility sensitivity'
  });

  return riskMetrics;
}
import { BondTradingInputs, BondTradingOutputs, BondTradingMetrics, TradingAnalysis, MarketAnalysis, TradingStrategy, RiskMetric } from './types';

export function calculateBondTrading(inputs: BondTradingInputs): BondTradingOutputs {
  // Calculate core metrics
  const metrics = calculateBondMetrics(inputs);
  
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

function calculateBondMetrics(inputs: BondTradingInputs): BondTradingMetrics {
  // Calculate clean and dirty prices
  const cleanPrice = inputs.currentPrice;
  const accruedInterest = calculateAccruedInterest(inputs);
  const dirtyPrice = cleanPrice + accruedInterest;
  
  // Calculate yields
  const yieldToMaturity = inputs.yieldToMaturity;
  const currentYield = inputs.currentYield;
  const yieldToCall = inputs.callable ? inputs.yieldToCall : 0;
  const yieldToPut = inputs.putable ? inputs.yieldToPut : 0;
  const realYield = yieldToMaturity - inputs.inflationRate;
  
  // Calculate price changes
  const priceChange = cleanPrice - inputs.faceValue;
  const priceChangePercent = (priceChange / inputs.faceValue) * 100;
  
  // Calculate duration and convexity
  const duration = inputs.duration;
  const modifiedDuration = inputs.modifiedDuration;
  const convexity = inputs.convexity;
  
  // Calculate credit metrics
  const creditSpread = inputs.creditSpread;
  const liquidityScore = inputs.liquidityScore;
  
  // Calculate trading metrics
  const totalCost = (cleanPrice * inputs.quantity) + inputs.commission + inputs.fees;
  const averagePrice = totalCost / inputs.quantity;
  const marketValue = cleanPrice * inputs.quantity;
  const unrealizedGainLoss = marketValue - totalCost;
  const unrealizedGainLossPercent = (unrealizedGainLoss / totalCost) * 100;
  
  // Calculate income metrics
  const annualCouponPayment = (inputs.couponRate / 100) * inputs.faceValue;
  const couponPayment = getCouponPayment(annualCouponPayment, inputs.couponFrequency);
  const annualIncome = couponPayment * getPaymentsPerYear(inputs.couponFrequency);
  const yieldOnCost = (annualIncome / totalCost) * 100;
  
  // Calculate risk-adjusted metrics
  const sharpeRatio = (yieldToMaturity - inputs.benchmarkYield) / inputs.marketVolatility;
  const sortinoRatio = (yieldToMaturity - inputs.benchmarkYield) / Math.abs(inputs.marketVolatility);
  const calmarRatio = yieldToMaturity / Math.abs(inputs.marketVolatility);
  
  // Calculate market comparison
  const marketComparison = yieldToMaturity - inputs.benchmarkYield;
  const relativeValue = marketComparison / inputs.benchmarkYield * 100;
  
  return {
    // Price metrics
    cleanPrice,
    dirtyPrice,
    accruedInterest,
    priceChange,
    priceChangePercent,
    averagePrice,
    marketValue,
    totalCost,
    
    // Yield metrics
    yieldToMaturity,
    currentYield,
    yieldToCall,
    yieldToPut,
    realYield,
    yieldOnCost,
    
    // Duration and convexity
    duration,
    modifiedDuration,
    convexity,
    
    // Credit and liquidity
    creditSpread,
    liquidityScore,
    
    // Trading metrics
    unrealizedGainLoss,
    unrealizedGainLossPercent,
    annualIncome,
    couponPayment,
    
    // Risk-adjusted metrics
    sharpeRatio,
    sortinoRatio,
    calmarRatio,
    
    // Market comparison
    marketComparison,
    relativeValue
  };
}

function calculateAccruedInterest(inputs: BondTradingInputs): number {
  if (!inputs.issueDate || !inputs.maturityDate) return 0;
  
  const issueDate = new Date(inputs.issueDate);
  const maturityDate = new Date(inputs.maturityDate);
  const today = new Date();
  
  // Calculate days since last coupon payment
  const daysSinceIssue = Math.floor((today.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24));
  const paymentsPerYear = getPaymentsPerYear(inputs.couponFrequency);
  const daysPerPeriod = 365 / paymentsPerYear;
  const daysSinceLastCoupon = daysSinceIssue % daysPerPeriod;
  
  const annualCouponPayment = (inputs.couponRate / 100) * inputs.faceValue;
  const dailyAccrual = annualCouponPayment / 365;
  
  return dailyAccrual * daysSinceLastCoupon;
}

function getCouponPayment(annualPayment: number, frequency: string): number {
  switch (frequency) {
    case 'annual': return annualPayment;
    case 'semi-annual': return annualPayment / 2;
    case 'quarterly': return annualPayment / 4;
    case 'monthly': return annualPayment / 12;
    default: return annualPayment / 2;
  }
}

function getPaymentsPerYear(frequency: string): number {
  switch (frequency) {
    case 'annual': return 1;
    case 'semi-annual': return 2;
    case 'quarterly': return 4;
    case 'monthly': return 12;
    default: return 2;
  }
}

function calculateTradingAnalysis(inputs: BondTradingInputs, metrics: BondTradingMetrics): TradingAnalysis {
  let recommendation: 'buy' | 'hold' | 'sell' = 'hold';
  let confidenceLevel = 5;
  const keyFactors: string[] = [];
  const risks: string[] = [];
  const opportunities: string[] = [];
  
  // Analyze yield spread
  if (metrics.marketComparison > 0.5) {
    recommendation = 'buy';
    confidenceLevel += 2;
    keyFactors.push(`Attractive yield spread of ${metrics.marketComparison.toFixed(2)}% above benchmark`);
    opportunities.push('Higher yield than comparable bonds');
  } else if (metrics.marketComparison < -0.5) {
    recommendation = 'sell';
    confidenceLevel += 1;
    keyFactors.push(`Below-market yield of ${Math.abs(metrics.marketComparison).toFixed(2)}%`);
    risks.push('Lower yield than comparable bonds');
  }
  
  // Analyze credit quality
  if (inputs.creditRating === 'AAA' || inputs.creditRating === 'AA') {
    confidenceLevel += 1;
    keyFactors.push('High credit quality');
    opportunities.push('Low default risk');
  } else if (inputs.creditRating === 'BB' || inputs.creditRating === 'B') {
    confidenceLevel -= 1;
    risks.push('Below investment grade credit rating');
  }
  
  // Analyze liquidity
  if (inputs.liquidityScore >= 8) {
    confidenceLevel += 1;
    keyFactors.push('High liquidity');
    opportunities.push('Easy to trade');
  } else if (inputs.liquidityScore <= 4) {
    confidenceLevel -= 1;
    risks.push('Low liquidity may impact trading');
  }
  
  // Analyze duration risk
  if (inputs.duration > 10) {
    confidenceLevel -= 1;
    risks.push('High duration increases interest rate risk');
  } else if (inputs.duration < 3) {
    confidenceLevel += 1;
    keyFactors.push('Low duration reduces interest rate risk');
  }
  
  // Analyze call risk
  if (inputs.callable && inputs.callDate) {
    const callDate = new Date(inputs.callDate);
    const today = new Date();
    const yearsToCall = (callDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 365);
    
    if (yearsToCall < 2) {
      confidenceLevel -= 1;
      risks.push('High call risk in near term');
    }
  }
  
  // Analyze market conditions
  if (inputs.interestRateEnvironment === 'rising') {
    confidenceLevel -= 1;
    risks.push('Rising interest rates may reduce bond prices');
  } else if (inputs.interestRateEnvironment === 'falling') {
    confidenceLevel += 1;
    opportunities.push('Falling interest rates may increase bond prices');
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

function calculateMarketAnalysis(inputs: BondTradingInputs, metrics: BondTradingMetrics): MarketAnalysis {
  let marketPosition: 'undervalued' | 'fair-value' | 'overvalued' = 'fair-value';
  let marketRisk: 'low' | 'medium' | 'high' = 'medium';
  const marketFactors: string[] = [];
  const marketOutlook: string[] = [];
  
  // Determine market position based on yield spread
  if (metrics.marketComparison > 1.0) {
    marketPosition = 'undervalued';
    marketFactors.push('Significantly higher yield than benchmark');
  } else if (metrics.marketComparison < -1.0) {
    marketPosition = 'overvalued';
    marketFactors.push('Significantly lower yield than benchmark');
  } else {
    marketFactors.push('Yield in line with market expectations');
  }
  
  // Assess market risk
  if (inputs.marketVolatility > 20) {
    marketRisk = 'high';
    marketFactors.push('High market volatility');
  } else if (inputs.marketVolatility < 10) {
    marketRisk = 'low';
    marketFactors.push('Low market volatility');
  }
  
  // Economic outlook impact
  if (inputs.economicOutlook === 'positive') {
    marketFactors.push('Positive economic outlook supports credit quality');
    marketOutlook.push('Economic growth may improve credit spreads');
  } else if (inputs.economicOutlook === 'negative') {
    marketRisk = 'high';
    marketFactors.push('Negative economic outlook increases credit risk');
    marketOutlook.push('Economic weakness may widen credit spreads');
  }
  
  // Interest rate environment
  if (inputs.interestRateEnvironment === 'stable') {
    marketFactors.push('Stable interest rate environment');
    marketOutlook.push('Interest rates expected to remain stable');
  } else if (inputs.interestRateEnvironment === 'rising') {
    marketRisk = 'high';
    marketFactors.push('Rising interest rate environment');
    marketOutlook.push('Rising rates may reduce bond prices');
  } else if (inputs.interestRateEnvironment === 'falling') {
    marketFactors.push('Falling interest rate environment');
    marketOutlook.push('Falling rates may increase bond prices');
  }
  
  // Credit spread analysis
  if (inputs.creditSpread > 200) {
    marketRisk = 'high';
    marketFactors.push('Wide credit spread indicates market concern');
  } else if (inputs.creditSpread < 50) {
    marketFactors.push('Tight credit spread indicates market confidence');
  }
  
  return {
    marketPosition,
    marketRisk,
    marketFactors,
    marketOutlook
  };
}

function generateTradingStrategies(inputs: BondTradingInputs, metrics: BondTradingMetrics): TradingStrategy[] {
  const strategies: TradingStrategy[] = [];
  
  // Buy and hold strategy
  strategies.push({
    name: 'Buy and Hold',
    entryPrice: inputs.currentPrice,
    exitPrice: inputs.faceValue,
    profitLoss: inputs.faceValue - inputs.currentPrice,
    riskLevel: 'low',
    timeHorizon: 'Long-term',
    description: 'Hold bond to maturity for yield and principal repayment'
  });
  
  // Yield curve strategy
  if (metrics.yieldToMaturity > inputs.benchmarkYield + 0.5) {
    strategies.push({
      name: 'Yield Pickup',
      entryPrice: inputs.currentPrice,
      exitPrice: inputs.currentPrice * 1.02, // 2% price appreciation
      profitLoss: (inputs.currentPrice * 1.02) - inputs.currentPrice,
      riskLevel: 'medium',
      timeHorizon: 'Medium-term',
      description: 'Capture yield premium and potential price appreciation'
    });
  }
  
  // Duration trade
  if (inputs.duration > 7 && inputs.interestRateEnvironment === 'falling') {
    strategies.push({
      name: 'Duration Extension',
      entryPrice: inputs.currentPrice,
      exitPrice: inputs.currentPrice * 1.05, // 5% price appreciation
      profitLoss: (inputs.currentPrice * 1.05) - inputs.currentPrice,
      riskLevel: 'high',
      timeHorizon: 'Short-term',
      description: 'Benefit from falling rates with high duration bond'
    });
  }
  
  // Credit spread trade
  if (inputs.creditSpread > 150 && inputs.creditRating === 'BBB') {
    strategies.push({
      name: 'Credit Spread Compression',
      entryPrice: inputs.currentPrice,
      exitPrice: inputs.currentPrice * 1.03, // 3% price appreciation
      profitLoss: (inputs.currentPrice * 1.03) - inputs.currentPrice,
      riskLevel: 'medium',
      timeHorizon: 'Medium-term',
      description: 'Benefit from credit spread tightening'
    });
  }
  
  // Liquidity premium trade
  if (inputs.liquidityScore <= 5) {
    strategies.push({
      name: 'Liquidity Premium',
      entryPrice: inputs.currentPrice,
      exitPrice: inputs.currentPrice * 1.01, // 1% price appreciation
      profitLoss: (inputs.currentPrice * 1.01) - inputs.currentPrice,
      riskLevel: 'high',
      timeHorizon: 'Long-term',
      description: 'Capture liquidity premium over time'
    });
  }
  
  return strategies;
}

function calculateRiskMetrics(inputs: BondTradingInputs, metrics: BondTradingMetrics): RiskMetric[] {
  const riskMetrics: RiskMetric[] = [];
  
  // Interest rate risk
  const interestRateRisk = inputs.modifiedDuration * inputs.marketVolatility / 100;
  riskMetrics.push({
    name: 'Interest Rate Risk',
    value: interestRateRisk,
    description: 'Potential price change for 1% rate change'
  });
  
  // Credit risk
  const creditRisk = inputs.creditSpread / 100;
  riskMetrics.push({
    name: 'Credit Risk',
    value: creditRisk,
    description: 'Credit spread as percentage'
  });
  
  // Liquidity risk
  const liquidityRisk = (10 - inputs.liquidityScore) / 10;
  riskMetrics.push({
    name: 'Liquidity Risk',
    value: liquidityRisk,
    description: 'Inverse of liquidity score'
  });
  
  // Reinvestment risk
  const reinvestmentRisk = inputs.couponRate / 100;
  riskMetrics.push({
    name: 'Reinvestment Risk',
    value: reinvestmentRisk,
    description: 'Risk of reinvesting coupons at lower rates'
  });
  
  // Call risk
  const callRisk = inputs.callable ? 0.02 : 0; // 2% if callable
  riskMetrics.push({
    name: 'Call Risk',
    value: callRisk,
    description: 'Risk of early redemption'
  });
  
  // Market risk
  const marketRisk = inputs.marketVolatility / 100;
  riskMetrics.push({
    name: 'Market Risk',
    value: marketRisk,
    description: 'Overall market volatility'
  });
  
  return riskMetrics;
}
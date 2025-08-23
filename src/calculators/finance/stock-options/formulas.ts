import { StockOptionsInputs, StockOptionsResults } from './types';

export function calculateStockOptions(inputs: StockOptionsInputs, allInputs?: Record<string, any>): StockOptionsResults {
  // Basic calculations
  const totalCost = inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice;
  const totalValue = calculateOptionValue(inputs);
  const profitLoss = totalValue - totalCost;
  const returnPercentage = (profitLoss / totalCost) * 100;
  
  // Option analysis
  const intrinsicValue = calculateIntrinsicValue(inputs);
  const timeValue = inputs.optionPrice - intrinsicValue;
  const impliedVolatility = calculateImpliedVolatility(inputs);
  
  // Greeks calculation
  const greeks = calculateGreeks(inputs);
  
  // Risk metrics
  const maxLoss = calculateMaxLoss(inputs);
  const maxProfit = calculateMaxProfit(inputs);
  const breakEvenPrice = calculateBreakEvenPrice(inputs);
  const probabilityOfProfit = calculateProbabilityOfProfit(inputs);
  const expectedValue = calculateExpectedValue(inputs);
  
  // Strategy analysis
  const strategyAnalysis = analyzeStrategy(inputs);
  
  // Time decay analysis
  const timeDecay = calculateTimeDecay(inputs);
  const expirationImpact = calculateExpirationImpact(inputs);
  
  // Volatility analysis
  const volatilityAnalysis = analyzeVolatility(inputs);
  
  // Profit/Loss scenarios
  const scenarios = generateScenarios(inputs);
  
  // Risk management
  const riskManagement = calculateRiskManagement(inputs);
  
  // Generate comprehensive report
  const report = generateOptionsReport(inputs, {
    profitLoss,
    returnPercentage,
    maxLoss,
    maxProfit,
    breakEvenPrice,
    probabilityOfProfit
  });
  
  // Generate recommendations and analysis
  const recommendations = generateRecommendations(inputs, profitLoss, probabilityOfProfit);
  const riskFactors = identifyRiskFactors(inputs, maxLoss, volatilityAnalysis.volatilityRisk);
  const opportunities = identifyOpportunities(inputs, maxProfit, strategyAnalysis.strategyOutlook);
  
  // Market analysis
  const marketAnalysis = analyzeMarket(inputs);
  
  // Strategy comparison
  const strategyComparison = compareStrategies(inputs);
  
  // Sensitivity analysis
  const sensitivityAnalysis = generateSensitivityAnalysis(inputs);
  
  return {
    totalCost,
    totalValue,
    profitLoss,
    returnPercentage,
    intrinsicValue,
    timeValue,
    impliedVolatility,
    ...greeks,
    maxLoss,
    maxProfit,
    breakEvenPrice,
    probabilityOfProfit,
    expectedValue,
    ...strategyAnalysis,
    timeDecay,
    daysToExpiration: inputs.daysToExpiration,
    expirationImpact,
    ...volatilityAnalysis,
    scenarios,
    ...riskManagement,
    report,
    recommendations,
    riskFactors,
    opportunities,
    ...marketAnalysis,
    strategyComparison,
    sensitivityAnalysis
  };
}

function calculateOptionValue(inputs: StockOptionsInputs): number {
  const optionValue = inputs.optionPrice * inputs.numberOfContracts * inputs.contractsPerOption;
  
  // Adjust for strategy type
  switch (inputs.strategy) {
    case 'long-call':
    case 'long-put':
      return optionValue;
    case 'short-call':
    case 'short-put':
      return -optionValue;
    case 'covered-call':
      return optionValue;
    case 'protective-put':
      return optionValue;
    case 'bull-spread':
    case 'bear-spread':
      return calculateSpreadValue(inputs);
    default:
      return optionValue;
  }
}

function calculateIntrinsicValue(inputs: StockOptionsInputs): number {
  if (inputs.optionType === 'call') {
    return Math.max(0, inputs.currentStockPrice - inputs.strikePrice);
  } else {
    return Math.max(0, inputs.strikePrice - inputs.currentStockPrice);
  }
}

function calculateImpliedVolatility(inputs: StockOptionsInputs): number {
  // Simplified implied volatility calculation using Black-Scholes approximation
  const timeToExpiry = inputs.daysToExpiration / 365;
  const moneyness = Math.log(inputs.currentStockPrice / inputs.strikePrice);
  
  // Rough approximation based on option price and time value
  const timeValue = inputs.optionPrice - calculateIntrinsicValue(inputs);
  const volatilityEstimate = Math.sqrt((2 * Math.PI * timeValue) / (inputs.currentStockPrice * Math.sqrt(timeToExpiry)));
  
  return Math.min(Math.max(volatilityEstimate * 100, 5), 200); // Clamp between 5% and 200%
}

function calculateGreeks(inputs: StockOptionsInputs): { delta: number; gamma: number; theta: number; vega: number; rho: number } {
  const timeToExpiry = inputs.daysToExpiration / 365;
  const moneyness = Math.log(inputs.currentStockPrice / inputs.strikePrice);
  const volatility = inputs.volatility / 100;
  
  // Simplified Greeks calculations
  let delta = 0;
  let gamma = 0;
  let theta = 0;
  let vega = 0;
  let rho = 0;
  
  if (inputs.optionType === 'call') {
    // Simplified call option Greeks
    delta = Math.min(1, Math.max(0, 0.5 + (moneyness / (volatility * Math.sqrt(timeToExpiry))) * 0.3));
    gamma = Math.exp(-moneyness * moneyness / (2 * volatility * volatility * timeToExpiry)) / (inputs.currentStockPrice * volatility * Math.sqrt(timeToExpiry));
    theta = -inputs.optionPrice * volatility * volatility / (2 * Math.sqrt(timeToExpiry));
    vega = inputs.currentStockPrice * Math.sqrt(timeToExpiry) * Math.exp(-moneyness * moneyness / (2 * volatility * volatility * timeToExpiry));
    rho = inputs.strikePrice * timeToExpiry * Math.exp(-inputs.riskFreeRate * timeToExpiry) * delta;
  } else {
    // Simplified put option Greeks
    delta = Math.max(-1, Math.min(0, -0.5 + (moneyness / (volatility * Math.sqrt(timeToExpiry))) * 0.3));
    gamma = Math.exp(-moneyness * moneyness / (2 * volatility * volatility * timeToExpiry)) / (inputs.currentStockPrice * volatility * Math.sqrt(timeToExpiry));
    theta = -inputs.optionPrice * volatility * volatility / (2 * Math.sqrt(timeToExpiry));
    vega = inputs.currentStockPrice * Math.sqrt(timeToExpiry) * Math.exp(-moneyness * moneyness / (2 * volatility * volatility * timeToExpiry));
    rho = -inputs.strikePrice * timeToExpiry * Math.exp(-inputs.riskFreeRate * timeToExpiry) * Math.abs(delta);
  }
  
  return { delta, gamma, theta, vega, rho };
}

function calculateMaxLoss(inputs: StockOptionsInputs): number {
  switch (inputs.strategy) {
    case 'long-call':
    case 'long-put':
      return -inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice;
    case 'short-call':
      return -inputs.numberOfContracts * inputs.contractsPerOption * (inputs.strikePrice - inputs.optionPrice);
    case 'short-put':
      return -inputs.numberOfContracts * inputs.contractsPerOption * inputs.strikePrice;
    case 'covered-call':
      return -inputs.numberOfContracts * inputs.contractsPerOption * (inputs.currentStockPrice - inputs.strikePrice + inputs.optionPrice);
    case 'protective-put':
      return -inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice;
    default:
      return -inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice;
  }
}

function calculateMaxProfit(inputs: StockOptionsInputs): number {
  switch (inputs.strategy) {
    case 'long-call':
      return inputs.numberOfContracts * inputs.contractsPerOption * (inputs.currentStockPrice - inputs.strikePrice - inputs.optionPrice);
    case 'long-put':
      return inputs.numberOfContracts * inputs.contractsPerOption * (inputs.strikePrice - inputs.currentStockPrice - inputs.optionPrice);
    case 'short-call':
    case 'short-put':
      return inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice;
    case 'covered-call':
      return inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice;
    case 'protective-put':
      return inputs.numberOfContracts * inputs.contractsPerOption * (inputs.currentStockPrice - inputs.optionPrice);
    default:
      return inputs.numberOfContracts * inputs.contractsPerOption * (inputs.currentStockPrice - inputs.strikePrice - inputs.optionPrice);
  }
}

function calculateBreakEvenPrice(inputs: StockOptionsInputs): number {
  switch (inputs.strategy) {
    case 'long-call':
      return inputs.strikePrice + inputs.optionPrice;
    case 'long-put':
      return inputs.strikePrice - inputs.optionPrice;
    case 'short-call':
      return inputs.strikePrice + inputs.optionPrice;
    case 'short-put':
      return inputs.strikePrice - inputs.optionPrice;
    case 'covered-call':
      return inputs.currentStockPrice - inputs.optionPrice;
    case 'protective-put':
      return inputs.currentStockPrice + inputs.optionPrice;
    default:
      return inputs.strikePrice + inputs.optionPrice;
  }
}

function calculateProbabilityOfProfit(inputs: StockOptionsInputs): number {
  const timeToExpiry = inputs.daysToExpiration / 365;
  const volatility = inputs.volatility / 100;
  const moneyness = Math.log(inputs.currentStockPrice / inputs.strikePrice);
  
  // Simplified probability calculation using normal distribution approximation
  const d1 = (moneyness + (inputs.riskFreeRate + volatility * volatility / 2) * timeToExpiry) / (volatility * Math.sqrt(timeToExpiry));
  const d2 = d1 - volatility * Math.sqrt(timeToExpiry);
  
  if (inputs.optionType === 'call') {
    return Math.max(0, Math.min(100, 50 + (d2 * 20))); // Rough approximation
  } else {
    return Math.max(0, Math.min(100, 50 - (d2 * 20))); // Rough approximation
  }
}

function calculateExpectedValue(inputs: StockOptionsInputs): number {
  const probabilityOfProfit = calculateProbabilityOfProfit(inputs) / 100;
  const maxProfit = calculateMaxProfit(inputs);
  const maxLoss = calculateMaxLoss(inputs);
  
  return (probabilityOfProfit * maxProfit) + ((1 - probabilityOfProfit) * maxLoss);
}

function analyzeStrategy(inputs: StockOptionsInputs): { strategyRisk: string; strategyOutlook: string; optimalExitPrice: number } {
  let strategyRisk = 'Moderate';
  let strategyOutlook = 'Neutral';
  let optimalExitPrice = inputs.currentStockPrice;
  
  switch (inputs.strategy) {
    case 'long-call':
      strategyRisk = inputs.daysToExpiration < 30 ? 'High' : 'Moderate';
      strategyOutlook = inputs.currentStockPrice > inputs.strikePrice ? 'Bullish' : 'Speculative';
      optimalExitPrice = inputs.strikePrice + inputs.optionPrice * 2;
      break;
    case 'long-put':
      strategyRisk = inputs.daysToExpiration < 30 ? 'High' : 'Moderate';
      strategyOutlook = inputs.currentStockPrice < inputs.strikePrice ? 'Bearish' : 'Speculative';
      optimalExitPrice = inputs.strikePrice - inputs.optionPrice * 2;
      break;
    case 'short-call':
      strategyRisk = 'High';
      strategyOutlook = 'Bearish';
      optimalExitPrice = inputs.strikePrice - inputs.optionPrice;
      break;
    case 'short-put':
      strategyRisk = 'High';
      strategyOutlook = 'Bullish';
      optimalExitPrice = inputs.strikePrice + inputs.optionPrice;
      break;
    case 'covered-call':
      strategyRisk = 'Low';
      strategyOutlook = 'Neutral to Bearish';
      optimalExitPrice = inputs.strikePrice;
      break;
    case 'protective-put':
      strategyRisk = 'Low';
      strategyOutlook = 'Bullish with Protection';
      optimalExitPrice = inputs.currentStockPrice + inputs.optionPrice;
      break;
  }
  
  return { strategyRisk, strategyOutlook, optimalExitPrice };
}

function calculateTimeDecay(inputs: StockOptionsInputs): number {
  const timeToExpiry = inputs.daysToExpiration / 365;
  const theta = -inputs.optionPrice * (inputs.volatility / 100) * (inputs.volatility / 100) / (2 * Math.sqrt(timeToExpiry));
  
  return theta * 30; // Monthly time decay
}

function calculateExpirationImpact(inputs: StockOptionsInputs): number {
  const timeToExpiry = inputs.daysToExpiration / 365;
  const intrinsicValue = calculateIntrinsicValue(inputs);
  
  // Impact of expiration on option value
  return inputs.optionPrice - intrinsicValue;
}

function analyzeVolatility(inputs: StockOptionsInputs): { volatilityImpact: number; volatilityRisk: string; volatilityOpportunity: string } {
  const volatilityImpact = inputs.vega || 0;
  let volatilityRisk = 'Moderate';
  let volatilityOpportunity = 'Neutral';
  
  if (inputs.impliedVolatility && inputs.historicalVolatility) {
    const volSkew = inputs.impliedVolatility - inputs.historicalVolatility;
    
    if (volSkew > 10) {
      volatilityRisk = 'High';
      volatilityOpportunity = 'Volatility may decrease';
    } else if (volSkew < -10) {
      volatilityRisk = 'Low';
      volatilityOpportunity = 'Volatility may increase';
    }
  }
  
  return { volatilityImpact, volatilityRisk, volatilityOpportunity };
}

function generateScenarios(inputs: StockOptionsInputs): any[] {
  const scenarios = [];
  const basePrice = inputs.currentStockPrice;
  const priceChanges = [-0.2, -0.1, -0.05, 0, 0.05, 0.1, 0.2, 0.3];
  
  priceChanges.forEach(change => {
    const stockPrice = basePrice * (1 + change);
    const optionValue = calculateOptionValueAtPrice(inputs, stockPrice);
    const profitLoss = optionValue - (inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice);
    const returnValue = (profitLoss / (inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice)) * 100;
    
    scenarios.push({
      scenario: `${change >= 0 ? '+' : ''}${(change * 100).toFixed(0)}%`,
      stockPrice,
      optionValue,
      profitLoss,
      return: returnValue,
      probability: calculateScenarioProbability(change, inputs.volatility)
    });
  });
  
  return scenarios;
}

function calculateOptionValueAtPrice(inputs: StockOptionsInputs, stockPrice: number): number {
  const intrinsicValue = inputs.optionType === 'call' 
    ? Math.max(0, stockPrice - inputs.strikePrice)
    : Math.max(0, inputs.strikePrice - stockPrice);
  
  // Simplified time value calculation
  const timeValue = Math.max(0, inputs.optionPrice - calculateIntrinsicValue(inputs));
  const timeToExpiry = inputs.daysToExpiration / 365;
  
  // Adjust time value based on moneyness
  const moneyness = Math.log(stockPrice / inputs.strikePrice);
  const adjustedTimeValue = timeValue * Math.exp(-Math.abs(moneyness) * timeToExpiry);
  
  return intrinsicValue + adjustedTimeValue;
}

function calculateScenarioProbability(priceChange: number, volatility: number): number {
  // Simplified probability calculation using normal distribution
  const zScore = priceChange / (volatility / 100);
  const probability = Math.exp(-zScore * zScore / 2) / Math.sqrt(2 * Math.PI);
  return Math.max(0, Math.min(100, probability * 100));
}

function calculateRiskManagement(inputs: StockOptionsInputs): { positionSize: number; portfolioImpact: number; marginRequirement: number; riskRewardRatio: number } {
  const positionSize = inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice;
  const portfolioImpact = inputs.portfolioValue ? (positionSize / inputs.portfolioValue) * 100 : 0;
  const marginRequirement = calculateMarginRequirement(inputs);
  const riskRewardRatio = Math.abs(calculateMaxProfit(inputs) / calculateMaxLoss(inputs));
  
  return { positionSize, portfolioImpact, marginRequirement, riskRewardRatio };
}

function calculateMarginRequirement(inputs: StockOptionsInputs): number {
  switch (inputs.strategy) {
    case 'long-call':
    case 'long-put':
      return 0; // No margin for long options
    case 'short-call':
      return inputs.numberOfContracts * inputs.contractsPerOption * inputs.currentStockPrice * 0.2;
    case 'short-put':
      return inputs.numberOfContracts * inputs.contractsPerOption * inputs.strikePrice * 0.2;
    default:
      return 0;
  }
}

function calculateSpreadValue(inputs: StockOptionsInputs): number {
  if (!inputs.secondStrikePrice || !inputs.secondOptionPrice) return 0;
  
  const firstLeg = inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice;
  const secondLeg = inputs.numberOfContracts * inputs.contractsPerOption * inputs.secondOptionPrice;
  
  return firstLeg - secondLeg;
}

function generateOptionsReport(inputs: StockOptionsInputs, metrics: any): string {
  return `# Stock Options Analysis Report

## Position Overview
- **Strategy:** ${inputs.strategy.replace('-', ' ').toUpperCase()}
- **Option Type:** ${inputs.optionType.toUpperCase()}
- **Strike Price:** $${inputs.strikePrice.toLocaleString()}
- **Current Stock Price:** $${inputs.currentStockPrice.toLocaleString()}
- **Option Price:** $${inputs.optionPrice.toLocaleString()}
- **Contracts:** ${inputs.numberOfContracts} x ${inputs.contractsPerOption} shares

## Key Metrics
- **Total Cost:** $${(inputs.numberOfContracts * inputs.contractsPerOption * inputs.optionPrice).toLocaleString()}
- **Profit/Loss:** $${metrics.profitLoss.toLocaleString()}
- **Return:** ${metrics.returnPercentage.toFixed(2)}%
- **Max Loss:** $${metrics.maxLoss.toLocaleString()}
- **Max Profit:** $${metrics.maxProfit.toLocaleString()}
- **Break Even:** $${metrics.breakEvenPrice.toLocaleString()}

## Risk Analysis
- **Probability of Profit:** ${metrics.probabilityOfProfit.toFixed(1)}%
- **Risk Level:** ${inputs.daysToExpiration < 30 ? 'High' : inputs.daysToExpiration < 90 ? 'Moderate' : 'Low'}
- **Time Decay:** ${inputs.daysToExpiration} days to expiration

## Greeks Analysis
- **Delta:** ${inputs.delta?.toFixed(3) || 'N/A'}
- **Gamma:** ${inputs.gamma?.toFixed(4) || 'N/A'}
- **Theta:** ${inputs.theta?.toFixed(2) || 'N/A'}
- **Vega:** ${inputs.vega?.toFixed(2) || 'N/A'}

## Strategy Assessment
${metrics.profitLoss > 0 ? '✅ Profitable position' : '⚠️ Position at a loss'}
${metrics.probabilityOfProfit > 60 ? '✅ High probability of profit' : metrics.probabilityOfProfit > 40 ? '⚠️ Moderate probability' : '❌ Low probability of profit'}

## Recommendations
${metrics.probabilityOfProfit > 70 ? 'Consider taking profits' : metrics.probabilityOfProfit < 30 ? 'Consider closing position' : 'Monitor position closely'}
${inputs.daysToExpiration < 7 ? '⚠️ High time decay risk - consider rolling or closing' : ''}
`;
}

function generateRecommendations(inputs: StockOptionsInputs, profitLoss: number, probabilityOfProfit: number): string[] {
  const recommendations = [];
  
  if (profitLoss > 0 && probabilityOfProfit > 70) {
    recommendations.push('Consider taking partial profits to lock in gains');
  }
  
  if (profitLoss < 0 && probabilityOfProfit < 30) {
    recommendations.push('Consider closing position to limit further losses');
  }
  
  if (inputs.daysToExpiration < 7) {
    recommendations.push('High time decay risk - consider rolling to further expiration');
  }
  
  if (inputs.volatility > 50) {
    recommendations.push('High volatility environment - consider volatility strategies');
  }
  
  if (inputs.strategy.includes('short') && inputs.currentStockPrice > inputs.strikePrice) {
    recommendations.push('Short position at risk - consider hedging or closing');
  }
  
  return recommendations;
}

function identifyRiskFactors(inputs: StockOptionsInputs, maxLoss: number, volatilityRisk: string): string[] {
  const risks = [];
  
  if (maxLoss > inputs.portfolioValue * 0.1) {
    risks.push('Position size too large relative to portfolio');
  }
  
  if (inputs.daysToExpiration < 30) {
    risks.push('High time decay risk');
  }
  
  if (inputs.strategy.includes('short')) {
    risks.push('Unlimited loss potential on short options');
  }
  
  if (volatilityRisk === 'High') {
    risks.push('High volatility environment increases risk');
  }
  
  if (inputs.optionType === 'call' && inputs.currentStockPrice < inputs.strikePrice) {
    risks.push('Out-of-the-money call with low probability of profit');
  }
  
  return risks;
}

function identifyOpportunities(inputs: StockOptionsInputs, maxProfit: number, strategyOutlook: string): string[] {
  const opportunities = [];
  
  if (maxProfit > inputs.portfolioValue * 0.05) {
    opportunities.push('High profit potential relative to portfolio size');
  }
  
  if (strategyOutlook.includes('Bullish') && inputs.currentStockPrice < inputs.strikePrice) {
    opportunities.push('Stock has room to move above strike price');
  }
  
  if (inputs.impliedVolatility && inputs.historicalVolatility && inputs.impliedVolatility < inputs.historicalVolatility) {
    opportunities.push('Options may be undervalued relative to historical volatility');
  }
  
  if (inputs.daysToExpiration > 90) {
    opportunities.push('Sufficient time for position to develop');
  }
  
  return opportunities;
}

function analyzeMarket(inputs: StockOptionsInputs): { marketOutlook: string; volatilityForecast: string; timingRecommendation: string } {
  let marketOutlook = 'Neutral';
  let volatilityForecast = 'Stable';
  let timingRecommendation = 'Hold';
  
  if (inputs.currentStockPrice > inputs.strikePrice && inputs.optionType === 'call') {
    marketOutlook = 'Bullish';
  } else if (inputs.currentStockPrice < inputs.strikePrice && inputs.optionType === 'put') {
    marketOutlook = 'Bearish';
  }
  
  if (inputs.volatility > 40) {
    volatilityForecast = 'High volatility expected';
  } else if (inputs.volatility < 20) {
    volatilityForecast = 'Low volatility expected';
  }
  
  if (inputs.daysToExpiration < 7) {
    timingRecommendation = 'Close or roll position';
  } else if (inputs.daysToExpiration < 30) {
    timingRecommendation = 'Monitor closely';
  }
  
  return { marketOutlook, volatilityForecast, timingRecommendation };
}

function compareStrategies(inputs: StockOptionsInputs): any[] {
  const strategies = [
    { strategy: 'Long Call', maxProfit: Infinity, maxLoss: -inputs.optionPrice, probabilityOfProfit: 40, riskLevel: 'High' },
    { strategy: 'Long Put', maxProfit: inputs.strikePrice, maxLoss: -inputs.optionPrice, probabilityOfProfit: 40, riskLevel: 'High' },
    { strategy: 'Covered Call', maxProfit: inputs.optionPrice, maxLoss: -inputs.currentStockPrice, probabilityOfProfit: 70, riskLevel: 'Low' },
    { strategy: 'Protective Put', maxProfit: Infinity, maxLoss: -inputs.optionPrice, probabilityOfProfit: 60, riskLevel: 'Low' }
  ];
  
  return strategies;
}

function generateSensitivityAnalysis(inputs: StockOptionsInputs): any[] {
  return [
    {
      factor: 'Stock Price',
      currentValue: inputs.currentStockPrice,
      impact: inputs.delta || 0,
      direction: inputs.delta > 0 ? 'Positive' : 'Negative'
    },
    {
      factor: 'Volatility',
      currentValue: inputs.volatility,
      impact: inputs.vega || 0,
      direction: 'Positive'
    },
    {
      factor: 'Time Decay',
      currentValue: inputs.daysToExpiration,
      impact: inputs.theta || 0,
      direction: 'Negative'
    },
    {
      factor: 'Interest Rate',
      currentValue: inputs.riskFreeRate,
      impact: inputs.rho || 0,
      direction: inputs.optionType === 'call' ? 'Positive' : 'Negative'
    }
  ];
}

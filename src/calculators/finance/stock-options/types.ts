export interface StockOptionsInputs {
  // Option Details
  optionType: 'call' | 'put';
  strikePrice: number;
  currentStockPrice: number;
  optionPrice: number;
  expirationDate: string;
  
  // Position Details
  numberOfContracts: number;
  contractsPerOption: number;
  
  // Market Data
  volatility: number;
  riskFreeRate: number;
  dividendYield: number;
  
  // Greeks and Analysis
  delta?: number;
  gamma?: number;
  theta?: number;
  vega?: number;
  rho?: number;
  
  // Strategy Parameters
  strategy: 'long-call' | 'long-put' | 'short-call' | 'short-put' | 'covered-call' | 'protective-put' | 'bull-spread' | 'bear-spread' | 'iron-condor' | 'butterfly';
  
  // Additional Options (for spreads)
  secondStrikePrice?: number;
  secondOptionPrice?: number;
  secondExpirationDate?: string;
  
  // Risk Management
  maxLoss: number;
  maxProfit: number;
  breakEvenPrice: number;
  
  // Time and Expiration
  daysToExpiration: number;
  timeValue: number;
  intrinsicValue: number;
  
  // Advanced Parameters
  impliedVolatility?: number;
  historicalVolatility?: number;
  beta?: number;
  correlation?: number;
  
  // Portfolio Context
  portfolioValue?: number;
  positionSize?: number;
  marginRequirement?: number;
  
  // Scenario Analysis
  priceScenarios: {
    scenario: string;
    stockPrice: number;
    optionValue: number;
    profitLoss: number;
    return: number;
  }[];
}

export interface StockOptionsResults {
  // Basic Calculations
  totalCost: number;
  totalValue: number;
  profitLoss: number;
  returnPercentage: number;
  
  // Option Analysis
  intrinsicValue: number;
  timeValue: number;
  impliedVolatility: number;
  
  // Greeks
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  
  // Risk Metrics
  maxLoss: number;
  maxProfit: number;
  breakEvenPrice: number;
  probabilityOfProfit: number;
  expectedValue: number;
  
  // Strategy Analysis
  strategyRisk: string;
  strategyOutlook: string;
  optimalExitPrice: number;
  
  // Time Decay Analysis
  timeDecay: number;
  daysToExpiration: number;
  expirationImpact: number;
  
  // Volatility Analysis
  volatilityImpact: number;
  volatilityRisk: string;
  volatilityOpportunity: string;
  
  // Profit/Loss Scenarios
  scenarios: {
    scenario: string;
    stockPrice: number;
    optionValue: number;
    profitLoss: number;
    return: number;
    probability: number;
  }[];
  
  // Risk Management
  positionSize: number;
  portfolioImpact: number;
  marginRequirement: number;
  riskRewardRatio: number;
  
  // Comprehensive Report
  report: string;
  
  // Recommendations
  recommendations: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Market Analysis
  marketOutlook: string;
  volatilityForecast: string;
  timingRecommendation: string;
  
  // Strategy Comparison
  strategyComparison: {
    strategy: string;
    maxProfit: number;
    maxLoss: number;
    probabilityOfProfit: number;
    riskLevel: string;
  }[];
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    factor: string;
    currentValue: number;
    impact: number;
    direction: string;
  }[];
}

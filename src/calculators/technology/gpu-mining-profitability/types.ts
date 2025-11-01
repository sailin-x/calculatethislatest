export interface GPUMiningProfitabilityInputs {
  // Hardware Configuration
  gpuModel: 'rtx-4090' | 'rtx-4080' | 'Rtx4070Ti' | 'rtx-3090' | 'rtx-3080' | 'rtx-3070' | 'Rx7900Xtx' | 'Rx6900Xt' | 'custom';
  numberOfGPUs: number;
  hashrate: number;
  powerConsumption: number;
  hardwareCost: number;
  
  // Mining Configuration
  cryptocurrency: 'ethereum-classic' | 'ravencoin' | 'ergo' | 'conflux' | 'kaspa' | 'flux' | 'custom';
  coinPrice: number;
  networkHashrate: number;
  blockReward: number;
  blockTime: number;
  
  // Pool and Fees
  miningPool: 'ethermine' | 'f2pool' | 'hiveon' | 'flexpool' | '2miners' | 'nicehash' | 'solo' | 'custom';
  poolFee: number;
  
  // Operating Costs
  electricityCost: number;
  coolingCosts: number;
  internetCosts: number;
  maintenanceCosts: number;
  
  // Market Factors
  priceVolatility: number;
  difficultyIncrease: number;
}

export interface GPUMiningProfitabilityOutputs {
  // Profitability Metrics
  dailyRevenue: number;
  dailyProfit: number;
  monthlyProfit: number;
  yearlyProfit: number;
  
  // ROI Analysis
  breakEvenDays: number;
  roi12Months: number;
  
  // Power and Efficiency
  dailyPowerCost: number;
  powerEfficiency: number;
  totalPowerConsumption: number;
  
  // Mining Statistics
  dailyCoinsEarned: number;
  networkSharePercentage: number;
  
  // Risk Assessment
  profitabilityRating: string;
  riskLevel: string;
  report: string;
}

export interface GPUMiningProfitabilityMetrics {
  // Profitability Metrics
  dailyRevenue: number;
  dailyProfit: number;
  monthlyProfit: number;
  yearlyProfit: number;
  
  // ROI Analysis
  breakEvenDays: number;
  roi12Months: number;
  
  // Power and Efficiency
  dailyPowerCost: number;
  powerEfficiency: number;
  totalPowerConsumption: number;
  
  // Mining Statistics
  dailyCoinsEarned: number;
  networkSharePercentage: number;
  
  // Risk Assessment
  profitabilityRating: string;
  riskLevel: string;
  
  // Additional calculations
  totalHashrate: number;
  totalHardwareCost: number;
  dailyElectricityCost: number;
  monthlyOperatingCosts: number;
  annualOperatingCosts: number;
  totalDailyCosts: number;
  hashSharePercentage: number;
  dailyNetworkReward: number;
  dailyRewardAfterPoolFee: number;
  projectedCoinPrice: number;
  riskAdjustedProfit: number;
  efficiencyRating: string;
}

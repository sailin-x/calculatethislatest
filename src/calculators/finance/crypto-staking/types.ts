export interface CryptoStakingProfitabilityInputs {
  // Staking Configuration
  stakingAmount: number;
  cryptocurrency: 'ethereum' | 'cardano' | 'solana' | 'polkadot' | 'cosmos' | 'tezos' | 'algorand' | 'avalanche' | 'binance-coin' | 'chainlink' | 'custom';
  stakingPeriod: number;
  apyRate: number;
  
  // Compounding Configuration
  compounding: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  cryptoPrice: number;
  
  // Risk and Market Factors
  priceVolatility?: number;
  marketTrend?: 'bullish' | 'neutral' | 'bearish';
  
  // Fees and Costs
  stakingFee?: number;
  withdrawalFee?: number;
  
  // Advanced Options
  reinvestRewards?: boolean;
  lockPeriod?: number;
}

export interface CryptoStakingProfitabilityOutputs {
  // Basic Returns
  dailyRewards: number;
  monthlyRewards: number;
  yearlyRewards: number;
  
  // Portfolio Value
  totalValue: number;
  compoundedValue: number;
  
  // ROI Metrics
  roi: number;
  breakEvenDays: number;
  
  // Risk Analysis
  riskLevel: string;
  volatilityImpact: number;
  
  // Additional Metrics
  cryptoAmount: number;
  rewardCrypto: number;
  efficiencyRating: string;
  report: string;
}

export interface CryptoStakingProfitabilityMetrics {
  // Basic Returns
  dailyRewards: number;
  monthlyRewards: number;
  yearlyRewards: number;
  
  // Portfolio Value
  totalValue: number;
  compoundedValue: number;
  
  // ROI Metrics
  roi: number;
  breakEvenDays: number;
  
  // Risk Analysis
  riskLevel: string;
  volatilityImpact: number;
  
  // Additional Metrics
  cryptoAmount: number;
  rewardCrypto: number;
  efficiencyRating: string;
  
  // Internal calculations
  principal: number;
  rate: number;
  periods: number;
  compoundFreq: number;
  simpleRewards: number;
  compoundRewards: number;
  totalFees: number;
  netRewards: number;
  effectiveAPY: number;
  priceAppreciation: number;
  riskAdjustedReturn: number;
  lockPeriodImpact: number;
  marketTrendImpact: number;
  totalRiskScore: number;
}

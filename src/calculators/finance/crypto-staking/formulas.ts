import { CryptoStakingProfitabilityInputs, CryptoStakingProfitabilityOutputs, CryptoStakingProfitabilityMetrics } from './types';

export function calculateCryptoStakingProfitability(inputs: CryptoStakingProfitabilityInputs): CryptoStakingProfitabilityOutputs {
  const metrics = calculateDetailedMetrics(inputs);
  
  return {
    dailyRewards: metrics.dailyRewards,
    monthlyRewards: metrics.monthlyRewards,
    yearlyRewards: metrics.yearlyRewards,
    totalValue: metrics.totalValue,
    compoundedValue: metrics.compoundedValue,
    roi: metrics.roi,
    breakEvenDays: metrics.breakEvenDays,
    riskLevel: metrics.riskLevel,
    volatilityImpact: metrics.volatilityImpact,
    cryptoAmount: metrics.cryptoAmount,
    rewardCrypto: metrics.rewardCrypto,
    efficiencyRating: metrics.efficiencyRating,
    report: generateStakingReport(inputs, metrics)
  };
}

function calculateDetailedMetrics(inputs: CryptoStakingProfitabilityInputs): CryptoStakingProfitabilityMetrics {
  const {
    stakingAmount,
    stakingPeriod,
    apyRate,
    compounding,
    cryptoPrice,
    priceVolatility = 50,
    marketTrend = 'neutral',
    stakingFee = 0.5,
    withdrawalFee = 0,
    reinvestRewards = true,
    lockPeriod = 0
  } = inputs;

  // Basic parameters
  const principal = stakingAmount;
  const rate = apyRate / 100;
  const periods = stakingPeriod;
  
  // Compounding frequency mapping
  const compoundFreq = {
    daily: 365,
    weekly: 52,
    monthly: 12,
    quarterly: 4,
    annually: 1
  }[compounding];

  // Simple interest calculation
  const simpleRewards = principal * rate * (periods / 365);
  
  // Compound interest calculation
  const compoundedValue = principal * Math.pow(1 + rate / compoundFreq, compoundFreq * (periods / 365));
  const compoundRewards = compoundedValue - principal;

  // Calculate fees
  const stakingFeeAmount = (compoundRewards * stakingFee) / 100;
  const totalFees = stakingFeeAmount + withdrawalFee;
  const netRewards = compoundRewards - totalFees;

  // Daily and monthly calculations
  const dailyRewards = netRewards / periods;
  const monthlyRewards = dailyRewards * 30;
  const yearlyRewards = netRewards * (365 / periods);

  // ROI calculation
  const roi = (netRewards / principal) * 100;

  // Break-even calculation
  const breakEvenDays = totalFees > 0 ? (totalFees / dailyRewards) : 0;

  // Crypto amounts
  const cryptoAmount = principal / cryptoPrice;
  const rewardCrypto = netRewards / cryptoPrice;

  // Risk analysis
  const volatilityImpact = calculateVolatilityImpact(principal, priceVolatility, periods);
  const riskLevel = assessRiskLevel(apyRate, priceVolatility, lockPeriod, marketTrend);
  const totalRiskScore = calculateRiskScore(apyRate, priceVolatility, lockPeriod, marketTrend);

  // Market trend impact
  const marketTrendImpact = calculateMarketTrendImpact(netRewards, marketTrend, periods);

  // Lock period impact
  const lockPeriodImpact = calculateLockPeriodImpact(principal, lockPeriod, apyRate);

  // Efficiency rating
  const efficiencyRating = calculateEfficiencyRating(roi, totalRiskScore, compoundFreq);

  // Effective APY
  const effectiveAPY = ((compoundedValue / principal) - 1) * 100;

  // Price appreciation (conservative estimate)
  const priceAppreciation = 0; // Assuming no price appreciation for conservative estimates

  // Risk-adjusted return
  const riskAdjustedReturn = netRewards - volatilityImpact;

  // Total portfolio value
  const totalValue = principal + netRewards + priceAppreciation;

  return {
    dailyRewards,
    monthlyRewards,
    yearlyRewards,
    totalValue,
    compoundedValue,
    roi,
    breakEvenDays,
    riskLevel,
    volatilityImpact,
    cryptoAmount,
    rewardCrypto,
    efficiencyRating,
    principal,
    rate,
    periods,
    compoundFreq,
    simpleRewards,
    compoundRewards,
    totalFees,
    netRewards,
    effectiveAPY,
    priceAppreciation,
    riskAdjustedReturn,
    lockPeriodImpact,
    marketTrendImpact,
    totalRiskScore
  };
}

function calculateVolatilityImpact(principal: number, volatility: number, periods: number): number {
  // Calculate potential loss from price volatility
  const dailyVolatility = volatility / Math.sqrt(365);
  const maxPotentialLoss = principal * (dailyVolatility / 100) * Math.sqrt(periods);
  return maxPotentialLoss * 0.5; // Conservative estimate
}

function assessRiskLevel(apy: number, volatility: number, lockPeriod: number, marketTrend: string): string {
  let riskScore = 0;
  
  // APY risk (higher APY = higher risk)
  if (apy > 20) riskScore += 3;
  else if (apy > 10) riskScore += 2;
  else if (apy > 5) riskScore += 1;
  
  // Volatility risk
  if (volatility > 100) riskScore += 3;
  else if (volatility > 50) riskScore += 2;
  else if (volatility > 25) riskScore += 1;
  
  // Lock period risk
  if (lockPeriod > 180) riskScore += 2;
  else if (lockPeriod > 90) riskScore += 1;
  
  // Market trend risk
  if (marketTrend === 'bearish') riskScore += 2;
  else if (marketTrend === 'neutral') riskScore += 1;
  
  if (riskScore >= 7) return 'Very High';
  if (riskScore >= 5) return 'High';
  if (riskScore >= 3) return 'Medium';
  if (riskScore >= 1) return 'Low';
  return 'Very Low';
}

function calculateRiskScore(apy: number, volatility: number, lockPeriod: number, marketTrend: string): number {
  let score = 0;
  
  // APY component (0-30 points)
  score += Math.min(apy * 1.5, 30);
  
  // Volatility component (0-40 points)
  score += Math.min(volatility * 0.4, 40);
  
  // Lock period component (0-20 points)
  score += Math.min(lockPeriod * 0.1, 20);
  
  // Market trend component (0-10 points)
  if (marketTrend === 'bearish') score += 10;
  else if (marketTrend === 'neutral') score += 5;
  
  return Math.min(score, 100);
}

function calculateMarketTrendImpact(rewards: number, marketTrend: string, periods: number): number {
  const dailyRewards = rewards / periods;
  
  switch (marketTrend) {
    case 'bullish':
      return dailyRewards * periods * 0.2; // 20% upside potential
    case 'bearish':
      return -dailyRewards * periods * 0.3; // 30% downside risk
    default:
      return 0; // Neutral
  }
}

function calculateLockPeriodImpact(principal: number, lockPeriod: number, apy: number): number {
  if (lockPeriod === 0) return 0;
  
  // Opportunity cost of locked funds
  const alternativeReturn = 0.04; // 4% alternative investment
  const lockPeriodYears = lockPeriod / 365;
  const opportunityCost = principal * alternativeReturn * lockPeriodYears;
  
  return -opportunityCost;
}

function calculateEfficiencyRating(roi: number, riskScore: number, compoundFreq: number): string {
  // Efficiency = ROI / Risk Score (higher is better)
  const efficiency = roi / Math.max(riskScore, 1);
  
  // Compounding bonus
  const compoundingBonus = Math.log(compoundFreq) / Math.log(365);
  const adjustedEfficiency = efficiency * (1 + compoundingBonus * 0.1);
  
  if (adjustedEfficiency > 2) return 'Excellent';
  if (adjustedEfficiency > 1.5) return 'Very Good';
  if (adjustedEfficiency > 1) return 'Good';
  if (adjustedEfficiency > 0.5) return 'Fair';
  return 'Poor';
}

function generateStakingReport(inputs: CryptoStakingProfitabilityInputs, metrics: CryptoStakingProfitabilityMetrics): string {
  const {
    stakingAmount,
    cryptocurrency,
    stakingPeriod,
    apyRate,
    compounding,
    cryptoPrice
  } = inputs;

  const {
    dailyRewards,
    monthlyRewards,
    yearlyRewards,
    totalValue,
    roi,
    breakEvenDays,
    riskLevel,
    volatilityImpact,
    cryptoAmount,
    rewardCrypto,
    efficiencyRating,
    effectiveAPY,
    totalRiskScore
  } = metrics;

  const cryptoName = {
    ethereum: 'Ethereum (ETH)',
    cardano: 'Cardano (ADA)',
    solana: 'Solana (SOL)',
    polkadot: 'Polkadot (DOT)',
    cosmos: 'Cosmos (ATOM)',
    tezos: 'Tezos (XTZ)',
    algorand: 'Algorand (ALGO)',
    avalanche: 'Avalanche (AVAX)',
    'binance-coin': 'Binance Coin (BNB)',
    chainlink: 'Chainlink (LINK)',
    custom: 'Custom Token'
  }[cryptocurrency];

  return `# Crypto Staking Profitability Analysis

## 📊 Investment Summary
- **Cryptocurrency**: ${cryptoName}
- **Staking Amount**: $${stakingAmount.toLocaleString()}
- **Staking Period**: ${stakingPeriod} days
- **APY Rate**: ${apyRate}%
- **Compounding**: ${compounding.charAt(0).toUpperCase() + compounding.slice(1)}

## 💰 Returns Breakdown
- **Daily Rewards**: $${dailyRewards.toFixed(2)}
- **Monthly Rewards**: $${monthlyRewards.toFixed(2)}
- **Yearly Rewards**: $${yearlyRewards.toFixed(2)}
- **Total Portfolio Value**: $${totalValue.toLocaleString()}
- **ROI**: ${roi.toFixed(2)}%
- **Effective APY**: ${effectiveAPY.toFixed(2)}%

## 🪙 Cryptocurrency Metrics
- **Crypto Amount Staked**: ${cryptoAmount.toFixed(6)} coins
- **Rewards in Crypto**: ${rewardCrypto.toFixed(6)} coins
- **Current Price**: $${cryptoPrice.toLocaleString()}

## ⚠️ Risk Assessment
- **Risk Level**: ${riskLevel}
- **Risk Score**: ${totalRiskScore.toFixed(1)}/100
- **Volatility Impact**: $${volatilityImpact.toFixed(2)}
- **Break-Even Days**: ${breakEvenDays > 0 ? breakEvenDays.toFixed(0) : 'Immediate'}

## 📈 Efficiency Analysis
- **Efficiency Rating**: ${efficiencyRating}
- **Compounding Frequency**: ${compounding.charAt(0).toUpperCase() + compounding.slice(1)}
- **Risk-Adjusted Performance**: ${(roi / Math.max(totalRiskScore, 1)).toFixed(2)}x

## 🎯 Key Insights
${generateInsights(inputs, metrics)}

## 📋 Recommendations
${generateRecommendations(inputs, metrics)}
`;
}

function generateInsights(inputs: CryptoStakingProfitabilityInputs, metrics: CryptoStakingProfitabilityMetrics): string {
  const insights = [];
  
  if (metrics.roi > 10) {
    insights.push("- **High Return Potential**: This staking opportunity offers excellent returns compared to traditional investments");
  }
  
  if (metrics.totalRiskScore > 70) {
    insights.push("- **High Risk Warning**: This investment carries significant risk due to volatility and lock periods");
  }
  
  if (metrics.breakEvenDays > 30) {
    insights.push("- **Long Break-Even**: Consider the time needed to recover fees before seeing net profits");
  }
  
  if (inputs.compounding === 'daily') {
    insights.push("- **Optimal Compounding**: Daily compounding maximizes your returns through compound interest");
  }
  
  if (metrics.efficiencyRating === 'Excellent') {
    insights.push("- **Efficient Investment**: This staking opportunity shows excellent risk-adjusted returns");
  }
  
  return insights.length > 0 ? insights.join('\n') : "- **Balanced Opportunity**: This staking investment offers moderate returns with manageable risk";
}

function generateRecommendations(inputs: CryptoStakingProfitabilityInputs, metrics: CryptoStakingProfitabilityMetrics): string {
  const recommendations = [];
  
  if (metrics.totalRiskScore > 70) {
    recommendations.push("- **Diversify**: Consider spreading your investment across multiple cryptocurrencies to reduce risk");
  }
  
  if (inputs.stakingFee > 2) {
    recommendations.push("- **Compare Fees**: Look for platforms with lower staking fees to maximize your returns");
  }
  
  if (inputs.lockPeriod > 90) {
    recommendations.push("- **Liquidity Consideration**: Ensure you have sufficient liquid funds before committing to long lock periods");
  }
  
  if (metrics.roi < 5) {
    recommendations.push("- **Alternative Options**: Consider higher-yield staking opportunities or other investment vehicles");
  }
  
  if (inputs.priceVolatility && inputs.priceVolatility > 80) {
    recommendations.push("- **Hedging Strategy**: Consider hedging strategies to protect against price volatility");
  }
  
  return recommendations.length > 0 ? recommendations.join('\n') : "- **Monitor Performance**: Regularly review your staking performance and adjust strategy as needed";
}

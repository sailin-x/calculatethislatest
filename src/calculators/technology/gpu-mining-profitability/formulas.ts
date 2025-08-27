import { GPUMiningProfitabilityInputs, GPUMiningProfitabilityOutputs, GPUMiningProfitabilityMetrics } from './types';

// GPU specifications lookup
const GPU_SPECS = {
  'rtx-4090': { hashrate: 83, power: 450, price: 1600 },
  'rtx-4080': { hashrate: 65, power: 320, price: 1200 },
  'rtx-4070-ti': { hashrate: 50, power: 285, price: 800 },
  'rtx-3090': { hashrate: 120, power: 350, price: 1500 },
  'rtx-3080': { hashrate: 100, power: 320, price: 700 },
  'rtx-3070': { hashrate: 62, power: 220, price: 500 },
  'rx-7900-xtx': { hashrate: 85, power: 355, price: 1000 },
  'rx-6900-xt': { hashrate: 64, power: 300, price: 600 }
};

// Cryptocurrency specifications
const CRYPTO_SPECS = {
  'ethereum-classic': { name: 'Ethereum Classic', symbol: 'ETC', defaultPrice: 25, defaultHashrate: 150000000 },
  'ravencoin': { name: 'Ravencoin', symbol: 'RVN', defaultPrice: 0.02, defaultHashrate: 3000000 },
  'ergo': { name: 'Ergo', symbol: 'ERG', defaultPrice: 1.5, defaultHashrate: 500000 },
  'conflux': { name: 'Conflux', symbol: 'CFX', defaultPrice: 0.15, defaultHashrate: 2000000 },
  'kaspa': { name: 'Kaspa', symbol: 'KAS', defaultPrice: 0.05, defaultHashrate: 1000000 },
  'flux': { name: 'Flux', symbol: 'FLUX', defaultPrice: 0.8, defaultHashrate: 800000 }
};

export function calculateGPUMiningMetrics(inputs: GPUMiningProfitabilityInputs): GPUMiningProfitabilityMetrics {
  // Auto-fill GPU specs if using preset model
  let effectiveHashrate = inputs.hashrate;
  let effectivePowerConsumption = inputs.powerConsumption;
  
  if (inputs.gpuModel !== 'custom' && GPU_SPECS[inputs.gpuModel]) {
    const specs = GPU_SPECS[inputs.gpuModel];
    effectiveHashrate = specs.hashrate;
    effectivePowerConsumption = specs.power;
  }

  // Calculate total hashrate and power
  const totalHashrate = effectiveHashrate * inputs.numberOfGPUs;
  const totalPowerConsumption = effectivePowerConsumption * inputs.numberOfGPUs;
  
  // Calculate daily power cost
  const dailyPowerCost = (totalPowerConsumption / 1000) * inputs.electricityCost * 24;
  
  // Calculate daily operating costs
  const dailyOperatingCosts = dailyPowerCost + 
    (inputs.coolingCosts / 30) + 
    (inputs.internetCosts / 30) + 
    (inputs.maintenanceCosts / 30);
  
  // Calculate daily coins earned
  const dailyCoinsEarned = calculateDailyCoinsEarned(
    totalHashrate,
    inputs.networkHashrate,
    inputs.blockReward,
    inputs.blockTime,
    inputs.poolFee
  );
  
  // Calculate daily revenue
  const dailyRevenue = dailyCoinsEarned * inputs.coinPrice;
  
  // Calculate daily profit
  const dailyProfit = dailyRevenue - dailyOperatingCosts;
  
  // Calculate monthly and yearly profits
  const monthlyProfit = dailyProfit * 30;
  const yearlyProfit = dailyProfit * 365;
  
  // Calculate ROI metrics
  const breakEvenDays = inputs.hardwareCost / dailyProfit;
  const roi12Months = ((yearlyProfit - inputs.hardwareCost) / inputs.hardwareCost) * 100;
  
  // Calculate power efficiency
  const powerEfficiency = totalHashrate / totalPowerConsumption;
  
  // Calculate network share percentage
  const networkSharePercentage = (totalHashrate / inputs.networkHashrate) * 100;
  
  // Determine profitability rating
  const profitabilityRating = determineProfitabilityRating(dailyProfit, roi12Months);
  
  // Determine risk level
  const riskLevel = determineRiskLevel(inputs.priceVolatility, inputs.difficultyIncrease, roi12Months);
  
  // Calculate risk-adjusted profit
  const riskAdjustedProfit = dailyProfit * (1 - (inputs.priceVolatility / 100));
  
  // Determine efficiency rating
  const efficiencyRating = determineEfficiencyRating(powerEfficiency);
  
  return {
    // Profitability Metrics
    dailyRevenue,
    dailyProfit,
    monthlyProfit,
    yearlyProfit,
    
    // ROI Analysis
    breakEvenDays,
    roi12Months,
    
    // Power and Efficiency
    dailyPowerCost,
    powerEfficiency,
    totalPowerConsumption,
    
    // Mining Statistics
    dailyCoinsEarned,
    networkSharePercentage,
    
    // Risk Assessment
    profitabilityRating,
    riskLevel,
    
    // Additional calculations
    totalHashrate,
    totalHardwareCost: inputs.hardwareCost,
    dailyElectricityCost: dailyPowerCost,
    monthlyOperatingCosts: dailyOperatingCosts * 30,
    annualOperatingCosts: dailyOperatingCosts * 365,
    totalDailyCosts: dailyOperatingCosts,
    hashSharePercentage: networkSharePercentage,
    dailyNetworkReward: (inputs.blockReward / inputs.blockTime) * 86400,
    dailyRewardAfterPoolFee: dailyCoinsEarned * (1 - inputs.poolFee / 100),
    projectedCoinPrice: inputs.coinPrice * (1 + (inputs.priceVolatility / 100)),
    riskAdjustedProfit,
    efficiencyRating
  };
}

function calculateDailyCoinsEarned(
  hashrate: number,
  networkHashrate: number,
  blockReward: number,
  blockTime: number,
  poolFee: number
): number {
  // Calculate your share of the network
  const hashShare = hashrate / networkHashrate;
  
  // Calculate daily network rewards
  const blocksPerDay = 86400 / blockTime;
  const dailyNetworkReward = blocksPerDay * blockReward;
  
  // Calculate your daily reward before pool fees
  const dailyRewardBeforeFees = dailyNetworkReward * hashShare;
  
  // Apply pool fees
  const dailyRewardAfterFees = dailyRewardBeforeFees * (1 - poolFee / 100);
  
  return dailyRewardAfterFees;
}

function determineProfitabilityRating(dailyProfit: number, roi12Months: number): string {
  if (dailyProfit < 0) return 'Unprofitable';
  if (roi12Months < 0) return 'High Risk';
  if (roi12Months < 20) return 'Low Profit';
  if (roi12Months < 50) return 'Moderate Profit';
  if (roi12Months < 100) return 'Good Profit';
  return 'Excellent Profit';
}

function determineRiskLevel(priceVolatility: number, difficultyIncrease: number, roi12Months: number): string {
  let riskScore = 0;
  
  if (priceVolatility > 50) riskScore += 3;
  else if (priceVolatility > 30) riskScore += 2;
  else if (priceVolatility > 15) riskScore += 1;
  
  if (difficultyIncrease > 20) riskScore += 3;
  else if (difficultyIncrease > 10) riskScore += 2;
  else if (difficultyIncrease > 5) riskScore += 1;
  
  if (roi12Months < 0) riskScore += 3;
  else if (roi12Months < 20) riskScore += 2;
  else if (roi12Months < 50) riskScore += 1;
  
  if (riskScore >= 7) return 'Very High Risk';
  if (riskScore >= 5) return 'High Risk';
  if (riskScore >= 3) return 'Medium Risk';
  if (riskScore >= 1) return 'Low Risk';
  return 'Very Low Risk';
}

function determineEfficiencyRating(powerEfficiency: number): string {
  if (powerEfficiency >= 0.4) return 'Excellent';
  if (powerEfficiency >= 0.3) return 'Good';
  if (powerEfficiency >= 0.2) return 'Average';
  if (powerEfficiency >= 0.1) return 'Poor';
  return 'Very Poor';
}

export function generateGPUMiningReport(
  inputs: GPUMiningProfitabilityInputs, 
  metrics: GPUMiningProfitabilityMetrics
): string {
  const cryptoName = CRYPTO_SPECS[inputs.cryptocurrency]?.name || inputs.cryptocurrency;
  
  return `GPU Mining Profitability Analysis for ${cryptoName}

HARDWARE CONFIGURATION:
• GPU Model: ${inputs.gpuModel.toUpperCase()}
• Number of GPUs: ${inputs.numberOfGPUs}
• Total Hashrate: ${metrics.totalHashrate.toFixed(2)} MH/s
• Total Power Draw: ${metrics.totalPowerConsumption}W
• Hardware Investment: $${inputs.hardwareCost.toLocaleString()}

PROFITABILITY SUMMARY:
• Daily Revenue: $${metrics.dailyRevenue.toFixed(2)}
• Daily Profit: $${metrics.dailyProfit.toFixed(2)}
• Monthly Profit: $${metrics.monthlyProfit.toFixed(2)}
• Annual Profit: $${metrics.yearlyProfit.toFixed(2)}
• Break-even Period: ${Math.ceil(metrics.breakEvenDays)} days
• 12-Month ROI: ${metrics.roi12Months.toFixed(1)}%

EFFICIENCY METRICS:
• Power Efficiency: ${metrics.powerEfficiency.toFixed(3)} MH/W
• Daily Power Cost: $${metrics.dailyPowerCost.toFixed(2)}
• Network Share: ${metrics.networkSharePercentage.toFixed(6)}%

RISK ASSESSMENT:
• Profitability Rating: ${metrics.profitabilityRating}
• Risk Level: ${metrics.riskLevel}
• Efficiency Rating: ${metrics.efficiencyRating}

RECOMMENDATIONS:
${generateRecommendations(metrics, inputs)}

Note: This analysis assumes current market conditions. Cryptocurrency mining profitability is highly volatile and depends on coin price, network difficulty, and electricity costs.`;
}

function generateRecommendations(metrics: GPUMiningProfitabilityMetrics, inputs: GPUMiningProfitabilityInputs): string {
  const recommendations = [];
  
  if (metrics.dailyProfit < 0) {
    recommendations.push("⚠️ Currently unprofitable - consider waiting for better market conditions or switching to a more profitable coin.");
  }
  
  if (metrics.breakEvenDays > 365) {
    recommendations.push("⚠️ Long break-even period - ensure you can sustain operations for over a year.");
  }
  
  if (metrics.powerEfficiency < 0.2) {
    recommendations.push("⚠️ Low power efficiency - consider upgrading to more efficient GPUs.");
  }
  
  if (inputs.electricityCost > 0.15) {
    recommendations.push("⚠️ High electricity costs - consider relocating to areas with lower power rates.");
  }
  
  if (metrics.roi12Months > 50) {
    recommendations.push("✅ Strong ROI potential - monitor market conditions closely.");
  }
  
  if (recommendations.length === 0) {
    recommendations.push("✅ Mining setup appears viable with current market conditions.");
  }
  
  return recommendations.join('\n');
}

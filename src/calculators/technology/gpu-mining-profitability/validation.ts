import { GPUMiningProfitabilityInputs } from './types';
import { ValidationResult } from '../../../types/validation';

export function validateGPUMiningProfitabilityInputs(inputs: GPUMiningProfitabilityInputs): ValidationResult {
  const errors: string[] = [];

  // Hardware Configuration Validation
  if (!inputs.gpuModel) {
    errors.push('GPU model is required');
  }

  if (!inputs.numberOfGPUs || inputs.numberOfGPUs < 1 || inputs.numberOfGPUs > 20) {
    errors.push('Number of GPUs must be between 1 and 20');
  }

  if (!inputs.hashrate || inputs.hashrate <= 0 || inputs.hashrate > 200) {
    errors.push('Hashrate must be between 0.1 and 200 MH/s');
  }

  if (!inputs.powerConsumption || inputs.powerConsumption < 50 || inputs.powerConsumption > 600) {
    errors.push('Power consumption must be between 50 and 600 watts');
  }

  if (!inputs.hardwareCost || inputs.hardwareCost < 500 || inputs.hardwareCost > 100000) {
    errors.push('Hardware cost must be between $500 and $100,000');
  }

  // Mining Configuration Validation
  if (!inputs.cryptocurrency) {
    errors.push('Cryptocurrency selection is required');
  }

  if (!inputs.coinPrice || inputs.coinPrice <= 0) {
    errors.push('Coin price must be greater than 0');
  }

  if (!inputs.networkHashrate || inputs.networkHashrate <= 0) {
    errors.push('Network hashrate must be greater than 0');
  }

  if (!inputs.blockReward || inputs.blockReward <= 0) {
    errors.push('Block reward must be greater than 0');
  }

  if (!inputs.blockTime || inputs.blockTime <= 0) {
    errors.push('Block time must be greater than 0');
  }

  // Pool and Fees Validation
  if (!inputs.miningPool) {
    errors.push('Mining pool selection is required');
  }

  if (inputs.poolFee < 0 || inputs.poolFee > 10) {
    errors.push('Pool fee must be between 0% and 10%');
  }

  // Operating Costs Validation
  if (inputs.electricityCost < 0 || inputs.electricityCost > 1) {
    errors.push('Electricity cost must be between $0 and $1 per kWh');
  }

  if (inputs.coolingCosts < 0 || inputs.coolingCosts > 1000) {
    errors.push('Cooling costs must be between $0 and $1,000 per month');
  }

  if (inputs.internetCosts < 0 || inputs.internetCosts > 500) {
    errors.push('Internet costs must be between $0 and $500 per month');
  }

  if (inputs.maintenanceCosts < 0 || inputs.maintenanceCosts > 1000) {
    errors.push('Maintenance costs must be between $0 and $1,000 per month');
  }

  // Market Factors Validation
  if (inputs.priceVolatility < 0 || inputs.priceVolatility > 200) {
    errors.push('Price volatility must be between 0% and 200%');
  }

  if (inputs.difficultyIncrease < 0 || inputs.difficultyIncrease > 100) {
    errors.push('Difficulty increase must be between 0% and 100%');
  }

  // Business Logic Validation
  const totalPowerConsumption = inputs.powerConsumption * inputs.numberOfGPUs;
  if (totalPowerConsumption > 10000) {
    errors.push('Total power consumption exceeds 10kW limit for residential mining');
  }

  const totalCost = inputs.hardwareCost + (inputs.coolingCosts + inputs.internetCosts + inputs.maintenanceCosts) * 12;
  if (totalCost > 200000) {
    errors.push('Total investment exceeds $200,000 limit');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Additional validation rules for specific scenarios
export function validateGPUModelCompatibility(gpuModel: string, cryptocurrency: string): ValidationResult {
  const errors: string[] = [];

  // Check if GPU model is suitable for the selected cryptocurrency
  const gpuSpecs = {
    'rtx-4090': { hashrate: 83, power: 450 },
    'rtx-4080': { hashrate: 65, power: 320 },
    'rtx-4070-ti': { hashrate: 50, power: 285 },
    'rtx-3090': { hashrate: 120, power: 350 },
    'rtx-3080': { hashrate: 100, power: 320 },
    'rtx-3070': { hashrate: 62, power: 220 },
    'rx-7900-xtx': { hashrate: 85, power: 355 },
    'rx-6900-xt': { hashrate: 64, power: 300 }
  };

  if (gpuModel !== 'custom' && !gpuSpecs[gpuModel]) {
    errors.push(`GPU model ${gpuModel} is not supported`);
  }

  // Check cryptocurrency compatibility
  const supportedCryptos = ['ethereum-classic', 'ravencoin', 'ergo', 'conflux', 'kaspa', 'flux', 'custom'];
  if (!supportedCryptos.includes(cryptocurrency)) {
    errors.push(`Cryptocurrency ${cryptocurrency} is not supported`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateProfitabilityThresholds(inputs: GPUMiningProfitabilityInputs): ValidationResult {
  const errors: string[] = [];

  // Calculate estimated daily revenue
  const totalHashrate = inputs.hashrate * inputs.numberOfGPUs;
  const dailyCoinsEarned = (totalHashrate / inputs.networkHashrate) * (inputs.blockReward / inputs.blockTime) * 86400;
  const dailyRevenue = dailyCoinsEarned * inputs.coinPrice;

  // Calculate estimated daily costs
  const totalPowerConsumption = inputs.powerConsumption * inputs.numberOfGPUs;
  const dailyPowerCost = (totalPowerConsumption / 1000) * inputs.electricityCost * 24;
  const dailyOperatingCosts = dailyPowerCost + 
    (inputs.coolingCosts / 30) + 
    (inputs.internetCosts / 30) + 
    (inputs.maintenanceCosts / 30);

  const dailyProfit = dailyRevenue - dailyOperatingCosts;

  // Warn about unprofitable setups
  if (dailyProfit < -10) {
    errors.push('Warning: Setup appears to be significantly unprofitable');
  }

  if (dailyRevenue < 1) {
    errors.push('Warning: Daily revenue is very low, consider different configuration');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

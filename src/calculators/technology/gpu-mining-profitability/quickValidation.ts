import { ValidationResult } from '../../../types/validation';

// Individual field validation functions with allInputs parameter (required by completion standards)
export function validateGpuModel(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, errors: ['GPU model is required'] };
  }

  const validModels = ['rtx-4090', 'rtx-4080', 'rtx-4070-ti', 'rtx-3090', 'rtx-3080', 'rtx-3070', 'rx-7900-xtx', 'rx-6900-xt', 'custom'];
  if (!validModels.includes(value)) {
    return { isValid: false, errors: ['Invalid GPU model selected'] };
  }

  return { isValid: true, errors: [] };
}

export function validateNumberOfGPUs(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1 || value > 20) {
    return { isValid: false, errors: ['Number of GPUs must be between 1 and 20'] };
  }

  if (!Number.isInteger(value)) {
    return { isValid: false, errors: ['Number of GPUs must be a whole number'] };
  }

  return { isValid: true, errors: [] };
}

export function validateHashrate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0 || value > 200) {
    return { isValid: false, errors: ['Hashrate must be between 0.1 and 200 MH/s'] };
  }

  return { isValid: true, errors: [] };
}

export function validatePowerConsumption(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 50 || value > 600) {
    return { isValid: false, errors: ['Power consumption must be between 50 and 600 watts'] };
  }

  return { isValid: true, errors: [] };
}

export function validateHardwareCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 500 || value > 100000) {
    return { isValid: false, errors: ['Hardware cost must be between $500 and $100,000'] };
  }

  return { isValid: true, errors: [] };
}

export function validateCryptocurrency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, errors: ['Cryptocurrency selection is required'] };
  }

  const validCryptos = ['ethereum-classic', 'ravencoin', 'ergo', 'conflux', 'kaspa', 'flux', 'custom'];
  if (!validCryptos.includes(value)) {
    return { isValid: false, errors: ['Invalid cryptocurrency selected'] };
  }

  return { isValid: true, errors: [] };
}

export function validateCoinPrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: ['Coin price must be greater than 0'] };
  }

  if (value > 100000) {
    return { isValid: false, errors: ['Coin price seems unreasonably high'] };
  }

  return { isValid: true, errors: [] };
}

export function validateNetworkHashrate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: ['Network hashrate must be greater than 0'] };
  }

  return { isValid: true, errors: [] };
}

export function validateBlockReward(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: ['Block reward must be greater than 0'] };
  }

  return { isValid: true, errors: [] };
}

export function validateBlockTime(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: ['Block time must be greater than 0'] };
  }

  if (value > 3600) {
    return { isValid: false, errors: ['Block time seems unreasonably high (over 1 hour)'] };
  }

  return { isValid: true, errors: [] };
}

export function validateMiningPool(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, errors: ['Mining pool selection is required'] };
  }

  const validPools = ['ethermine', 'f2pool', 'hiveon', 'flexpool', '2miners', 'nicehash', 'solo', 'custom'];
  if (!validPools.includes(value)) {
    return { isValid: false, errors: ['Invalid mining pool selected'] };
  }

  return { isValid: true, errors: [] };
}

export function validatePoolFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 10) {
    return { isValid: false, errors: ['Pool fee must be between 0% and 10%'] };
  }

  return { isValid: true, errors: [] };
}

export function validateElectricityCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 1) {
    return { isValid: false, errors: ['Electricity cost must be between $0 and $1 per kWh'] };
  }

  return { isValid: true, errors: [] };
}

export function validateCoolingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 1000) {
    return { isValid: false, errors: ['Cooling costs must be between $0 and $1,000 per month'] };
  }

  return { isValid: true, errors: [] };
}

export function validateInternetCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 500) {
    return { isValid: false, errors: ['Internet costs must be between $0 and $500 per month'] };
  }

  return { isValid: true, errors: [] };
}

export function validateMaintenanceCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 1000) {
    return { isValid: false, errors: ['Maintenance costs must be between $0 and $1,000 per month'] };
  }

  return { isValid: true, errors: [] };
}

export function validatePriceVolatility(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 200) {
    return { isValid: false, errors: ['Price volatility must be between 0% and 200%'] };
  }

  return { isValid: true, errors: [] };
}

export function validateDifficultyIncrease(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 100) {
    return { isValid: false, errors: ['Difficulty increase must be between 0% and 100%'] };
  }

  return { isValid: true, errors: [] };
}

// Cross-field validation functions
export function validateTotalPowerConsumption(allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) {
    return { isValid: true, errors: [] };
  }

  const { powerConsumption, numberOfGPUs } = allInputs;
  if (powerConsumption && numberOfGPUs) {
    const totalPower = powerConsumption * numberOfGPUs;
    if (totalPower > 10000) {
      return { isValid: false, errors: ['Total power consumption exceeds 10kW limit for residential mining'] };
    }
  }

  return { isValid: true, errors: [] };
}

export function validateTotalInvestment(allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) {
    return { isValid: true, errors: [] };
  }

  const { hardwareCost, coolingCosts, internetCosts, maintenanceCosts } = allInputs;
  if (hardwareCost && coolingCosts !== undefined && internetCosts !== undefined && maintenanceCosts !== undefined) {
    const totalCost = hardwareCost + (coolingCosts + internetCosts + maintenanceCosts) * 12;
    if (totalCost > 200000) {
      return { isValid: false, errors: ['Total investment exceeds $200,000 limit'] };
    }
  }

  return { isValid: true, errors: [] };
}

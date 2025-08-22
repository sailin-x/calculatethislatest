export function quickValidateStakingAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Staking amount is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Staking amount must be a valid number' };
  }
  
  if (numValue <= 0) {
    return { isValid: false, message: 'Staking amount must be positive' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Staking amount must be at least $1' };
  }
  
  if (numValue > 10000000) {
    return { isValid: false, message: 'Staking amount cannot exceed $10,000,000' };
  }
  
  return { isValid: true };
}

export function quickValidateAPY(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'APY rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'APY rate must be a valid number' };
  }
  
  if (numValue <= 0) {
    return { isValid: false, message: 'APY rate must be positive' };
  }
  
  if (numValue < 0.1) {
    return { isValid: false, message: 'APY rate must be at least 0.1%' };
  }
  
  if (numValue > 100) {
    return { isValid: false, message: 'APY rate cannot exceed 100%' };
  }
  
  // Check if APY is realistic for the selected cryptocurrency
  const cryptocurrency = allInputs?.cryptocurrency;
  if (cryptocurrency) {
    const expectedRanges = {
      ethereum: { min: 3, max: 8 },
      cardano: { min: 3, max: 7 },
      solana: { min: 5, max: 12 },
      polkadot: { min: 8, max: 20 },
      cosmos: { min: 10, max: 25 },
      tezos: { min: 4, max: 10 },
      algorand: { min: 4, max: 8 },
      avalanche: { min: 6, max: 15 },
      'binance-coin': { min: 5, max: 12 },
      chainlink: { min: 4, max: 10 },
      custom: { min: 0.1, max: 100 }
    };
    
    const range = expectedRanges[cryptocurrency as keyof typeof expectedRanges];
    if (range && (numValue < range.min || numValue > range.max)) {
      return { 
        isValid: false, 
        message: `APY rate for ${cryptocurrency} should be between ${range.min}% and ${range.max}%` 
      };
    }
  }
  
  return { isValid: true };
}

export function quickValidateStakingPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Staking period is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Staking period must be a valid number' };
  }
  
  if (numValue <= 0) {
    return { isValid: false, message: 'Staking period must be positive' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Staking period must be at least 1 day' };
  }
  
  if (numValue > 3650) {
    return { isValid: false, message: 'Staking period cannot exceed 3650 days (10 years)' };
  }
  
  // Check if staking period is reasonable for the APY rate
  const apyRate = allInputs?.apyRate;
  if (apyRate) {
    if (apyRate > 20 && numValue < 30) {
      return { 
        isValid: false, 
        message: 'High APY rates (>20%) typically require staking periods of at least 30 days' 
      };
    }
    
    if (apyRate > 10 && numValue < 7) {
      return { 
        isValid: false, 
        message: 'APY rates above 10% typically require staking periods of at least 7 days' 
      };
    }
  }
  
  return { isValid: true };
}

export function quickValidateCryptoPrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Cryptocurrency price is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Cryptocurrency price must be a valid number' };
  }
  
  if (numValue <= 0) {
    return { isValid: false, message: 'Cryptocurrency price must be positive' };
  }
  
  if (numValue < 0.000001) {
    return { isValid: false, message: 'Cryptocurrency price must be at least $0.000001' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Cryptocurrency price cannot exceed $100,000' };
  }
  
  // Check if price is realistic for the selected cryptocurrency
  const cryptocurrency = allInputs?.cryptocurrency;
  if (cryptocurrency) {
    const expectedRanges = {
      ethereum: { min: 100, max: 10000 },
      cardano: { min: 0.01, max: 10 },
      solana: { min: 10, max: 500 },
      polkadot: { min: 1, max: 100 },
      cosmos: { min: 1, max: 50 },
      tezos: { min: 0.1, max: 10 },
      algorand: { min: 0.01, max: 5 },
      avalanche: { min: 5, max: 200 },
      'binance-coin': { min: 50, max: 1000 },
      chainlink: { min: 1, max: 100 },
      custom: { min: 0.000001, max: 100000 }
    };
    
    const range = expectedRanges[cryptocurrency as keyof typeof expectedRanges];
    if (range && (numValue < range.min || numValue > range.max)) {
      return { 
        isValid: false, 
        message: `Price for ${cryptocurrency} should be between $${range.min} and $${range.max}` 
      };
    }
  }
  
  return { isValid: true };
}

export function quickValidateStakingFee(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Staking fee must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Staking fee cannot be negative' };
  }
  
  if (numValue > 10) {
    return { isValid: false, message: 'Staking fee cannot exceed 10%' };
  }
  
  // Check if fee is reasonable compared to APY
  const apyRate = allInputs?.apyRate;
  if (apyRate && numValue >= apyRate) {
    return { 
      isValid: false, 
      message: 'Staking fee should be less than APY rate to ensure positive returns' 
    };
  }
  
  return { isValid: true };
}

export function quickValidateLockPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Lock period must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Lock period cannot be negative' };
  }
  
  if (numValue > 365) {
    return { isValid: false, message: 'Lock period cannot exceed 365 days' };
  }
  
  // Check if lock period doesn't exceed staking period
  const stakingPeriod = allInputs?.stakingPeriod;
  if (stakingPeriod && numValue > stakingPeriod) {
    return { 
      isValid: false, 
      message: 'Lock period cannot exceed staking period' 
    };
  }
  
  return { isValid: true };
}

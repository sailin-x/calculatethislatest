import { ValidationRule } from '../../../types/validation';
import { ValidationRuleFactory } from '../../../utils/validation';
import { CryptoStakingProfitabilityInputs } from './types';

export const cryptoStakingValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('stakingAmount', 'Staking amount is required'),
  ValidationRuleFactory.required('cryptocurrency', 'Cryptocurrency selection is required'),
  ValidationRuleFactory.required('stakingPeriod', 'Staking period is required'),
  ValidationRuleFactory.required('apyRate', 'APY rate is required'),
  ValidationRuleFactory.required('compounding', 'Compounding frequency is required'),
  ValidationRuleFactory.required('cryptoPrice', 'Cryptocurrency price is required'),

  // Numeric validations
  ValidationRuleFactory.positive('stakingAmount', 'Staking amount must be positive'),
  ValidationRuleFactory.range('stakingAmount', 1, 10000000, 'Staking amount must be between $1 and $10,000,000'),
  
  ValidationRuleFactory.positive('stakingPeriod', 'Staking period must be positive'),
  ValidationRuleFactory.range('stakingPeriod', 1, 3650, 'Staking period must be between 1 and 3650 days'),
  
  ValidationRuleFactory.positive('apyRate', 'APY rate must be positive'),
  ValidationRuleFactory.range('apyRate', 0.1, 100, 'APY rate must be between 0.1% and 100%'),
  
  ValidationRuleFactory.positive('cryptoPrice', 'Cryptocurrency price must be positive'),
  ValidationRuleFactory.range('cryptoPrice', 0.000001, 100000, 'Cryptocurrency price must be between $0.000001 and $100,000'),

  // Optional fields with defaults
  ValidationRuleFactory.range('priceVolatility', 0, 200, 'Price volatility must be between 0% and 200%'),
  ValidationRuleFactory.range('stakingFee', 0, 10, 'Staking fee must be between 0% and 10%'),
  ValidationRuleFactory.range('withdrawalFee', 0, 1000, 'Withdrawal fee must be between $0 and $1,000'),
  ValidationRuleFactory.range('lockPeriod', 0, 365, 'Lock period must be between 0 and 365 days'),

  // Cross-field validations
  ValidationRuleFactory.createRule('stakingPeriod', 'Staking period should be reasonable for the APY rate', (value: any, allInputs?: Record<string, any>) => {
    const apyRate = allInputs?.apyRate;
    if (!apyRate || !value) return true;
    
    // Higher APY rates should have longer staking periods for realistic scenarios
    if (apyRate > 20 && value < 30) return false;
    if (apyRate > 10 && value < 7) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('cryptoPrice', 'Cryptocurrency price should be realistic for the selected token', (value: any, allInputs?: Record<string, any>) => {
    const cryptocurrency = allInputs?.cryptocurrency;
    if (!cryptocurrency || !value) return true;
    
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
    if (!range) return true;
    
    return value >= range.min && value <= range.max;
  }),

  ValidationRuleFactory.createRule('apyRate', 'APY rate should be realistic for the selected cryptocurrency', (value: any, allInputs?: Record<string, any>) => {
    const cryptocurrency = allInputs?.cryptocurrency;
    if (!cryptocurrency || !value) return true;
    
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
    if (!range) return true;
    
    return value >= range.min && value <= range.max;
  }),

  // Business logic validations
  ValidationRuleFactory.createRule('stakingAmount', 'Staking amount should be sufficient for the selected cryptocurrency', (value: any, allInputs?: Record<string, any>) => {
    const cryptocurrency = allInputs?.cryptocurrency;
    const cryptoPrice = allInputs?.cryptoPrice;
    if (!cryptocurrency || !cryptoPrice || !value) return true;
    
    const minStakingAmounts = {
      ethereum: 32, // ETH2.0 minimum
      cardano: 500,
      solana: 1,
      polkadot: 1,
      cosmos: 1,
      tezos: 1,
      algorand: 1,
      avalanche: 25,
      'binance-coin': 1,
      chainlink: 1,
      custom: 1
    };
    
    const minAmount = minStakingAmounts[cryptocurrency as keyof typeof minStakingAmounts];
    if (!minAmount) return true;
    
    const cryptoAmount = value / cryptoPrice;
    return cryptoAmount >= minAmount;
  }),

  ValidationRuleFactory.createRule('lockPeriod', 'Lock period should not exceed staking period', (value: any, allInputs?: Record<string, any>) => {
    const stakingPeriod = allInputs?.stakingPeriod;
    if (!stakingPeriod || !value) return true;
    
    return value <= stakingPeriod;
  }),

  ValidationRuleFactory.createRule('stakingFee', 'Staking fee should not exceed APY rate', (value: any, allInputs?: Record<string, any>) => {
    const apyRate = allInputs?.apyRate;
    if (!apyRate || !value) return true;
    
    return value < apyRate;
  })
];

export function validateCryptoStakingInputs(inputs: CryptoStakingProfitabilityInputs, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required field validations
  if (!inputs.stakingAmount) errors.push('Staking amount is required');
  if (!inputs.cryptocurrency) errors.push('Cryptocurrency selection is required');
  if (!inputs.stakingPeriod) errors.push('Staking period is required');
  if (!inputs.apyRate) errors.push('APY rate is required');
  if (!inputs.compounding) errors.push('Compounding frequency is required');
  if (!inputs.cryptoPrice) errors.push('Cryptocurrency price is required');
  
  // Numeric validations
  if (inputs.stakingAmount <= 0) errors.push('Staking amount must be positive');
  if (inputs.stakingAmount < 1 || inputs.stakingAmount > 10000000) {
    errors.push('Staking amount must be between $1 and $10,000,000');
  }
  
  if (inputs.stakingPeriod <= 0) errors.push('Staking period must be positive');
  if (inputs.stakingPeriod < 1 || inputs.stakingPeriod > 3650) {
    errors.push('Staking period must be between 1 and 3650 days');
  }
  
  if (inputs.apyRate <= 0) errors.push('APY rate must be positive');
  if (inputs.apyRate < 0.1 || inputs.apyRate > 100) {
    errors.push('APY rate must be between 0.1% and 100%');
  }
  
  if (inputs.cryptoPrice <= 0) errors.push('Cryptocurrency price must be positive');
  if (inputs.cryptoPrice < 0.000001 || inputs.cryptoPrice > 100000) {
    errors.push('Cryptocurrency price must be between $0.000001 and $100,000');
  }
  
  // Optional field validations
  if (inputs.priceVolatility !== undefined) {
    if (inputs.priceVolatility < 0 || inputs.priceVolatility > 200) {
      errors.push('Price volatility must be between 0% and 200%');
    }
  }
  
  if (inputs.stakingFee !== undefined) {
    if (inputs.stakingFee < 0 || inputs.stakingFee > 10) {
      errors.push('Staking fee must be between 0% and 10%');
    }
  }
  
  if (inputs.withdrawalFee !== undefined) {
    if (inputs.withdrawalFee < 0 || inputs.withdrawalFee > 1000) {
      errors.push('Withdrawal fee must be between $0 and $1,000');
    }
  }
  
  if (inputs.lockPeriod !== undefined) {
    if (inputs.lockPeriod < 0 || inputs.lockPeriod > 365) {
      errors.push('Lock period must be between 0 and 365 days');
    }
  }
  
  // Cross-field validations
  if (inputs.apyRate > 20 && inputs.stakingPeriod < 30) {
    errors.push('High APY rates (>20%) typically require longer staking periods (30+ days)');
  }
  
  if (inputs.apyRate > 10 && inputs.stakingPeriod < 7) {
    errors.push('APY rates above 10% typically require staking periods of at least 7 days');
  }
  
  if (inputs.lockPeriod && inputs.stakingPeriod && inputs.lockPeriod > inputs.stakingPeriod) {
    errors.push('Lock period cannot exceed staking period');
  }
  
  if (inputs.stakingFee && inputs.apyRate && inputs.stakingFee >= inputs.apyRate) {
    errors.push('Staking fee should be less than APY rate to ensure positive returns');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

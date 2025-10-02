import { ValidationRule } from '../../types/validation';
import { ValidationRuleFactory } from '../../utils/validation';
import { NFTRoyaltyInputs } from './types';

export const nftRoyaltyValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('collectionSize', 'Collection size is required'),
  ValidationRuleFactory.required('mintPrice', 'Mint price is required'),
  ValidationRuleFactory.required('royaltyPercentage', 'Royalty percentage is required'),
  ValidationRuleFactory.required('averageResalePrice', 'Average resale price is required'),
  ValidationRuleFactory.required('monthlyTrades', 'Monthly trades is required'),
  ValidationRuleFactory.required('marketplace', 'Marketplace selection is required'),
  ValidationRuleFactory.required('collectionType', 'Collection type is required'),

  // Numeric validations
  ValidationRuleFactory.positive('collectionSize', 'Collection size must be positive'),
  ValidationRuleFactory.range('collectionSize', 1, 1000000, 'Collection size must be between 1 and 1,000,000'),
  
  ValidationRuleFactory.positive('mintPrice', 'Mint price must be positive'),
  ValidationRuleFactory.range('mintPrice', 0.001, 10000, 'Mint price must be between $0.001 and $10,000'),
  
  ValidationRuleFactory.positive('royaltyPercentage', 'Royalty percentage must be positive'),
  ValidationRuleFactory.range('royaltyPercentage', 0.1, 50, 'Royalty percentage must be between 0.1% and 50%'),
  
  ValidationRuleFactory.positive('averageResalePrice', 'Average resale price must be positive'),
  ValidationRuleFactory.range('averageResalePrice', 0.001, 100000, 'Average resale price must be between $0.001 and $100,000'),
  
  ValidationRuleFactory.nonNegative('monthlyTrades', 'Monthly trades cannot be negative'),
  ValidationRuleFactory.range('monthlyTrades', 0, 100000, 'Monthly trades must be between 0 and 100,000'),

  // Optional fields
  ValidationRuleFactory.range('floorPrice', 0.001, 100000, 'Floor price must be between $0.001 and $100,000'),
  ValidationRuleFactory.range('customMarketplaceFee', 0, 20, 'Custom marketplace fee must be between 0% and 20%'),
  ValidationRuleFactory.range('priceAppreciation', -50, 500, 'Price appreciation must be between -50% and 500%'),
  ValidationRuleFactory.range('tradingVolumeGrowth', -50, 300, 'Trading volume growth must be between -50% and 300%'),
  ValidationRuleFactory.range('activePeriod', 1, 20, 'Active period must be between 1 and 20 years'),
  ValidationRuleFactory.range('utilityRevenue', 0, 1000000, 'Utility revenue must be between $0 and $1,000,000'),

  // Business logic validations
  ValidationRuleFactory.createRule('royaltyPercentage', 'Royalty percentage should be reasonable for market acceptance', (value: any, allInputs?: Record<string, any>) => {
    if (!value) return true;
    
    // Warn about very high royalties
    if (value > 10) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('averageResalePrice', 'Resale price should be sustainable compared to mint price', (value: any, allInputs?: Record<string, any>) => {
    const mintPrice = allInputs?.mintPrice;
    if (!mintPrice || !value) return true;
    
    // Warn if resale price is significantly below mint (indicates weak demand)
    if (value < mintPrice * 0.3) return false;
    
    // Warn if resale price is unrealistically high
    if (value > mintPrice * 50) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('monthlyTrades', 'Trading volume should be realistic for collection size', (value: any, allInputs?: Record<string, any>) => {
    const collectionSize = allInputs?.collectionSize;
    if (!collectionSize || !value) return true;
    
    // Monthly trades shouldn't exceed collection size (unrealistic turnover)
    if (value > collectionSize) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('floorPrice', 'Floor price should be realistic compared to average resale price', (value: any, allInputs?: Record<string, any>) => {
    const averageResalePrice = allInputs?.averageResalePrice;
    if (!averageResalePrice || !value) return true;
    
    // Floor price should generally be lower than average resale price
    if (value > averageResalePrice * 1.5) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('customMarketplaceFee', 'Custom marketplace fee is required when marketplace is custom', (value: any, allInputs?: Record<string, any>) => {
    const marketplace = allInputs?.marketplace;
    if (marketplace !== 'custom') return true;
    
    return value !== undefined && value !== null;
  }),

  ValidationRuleFactory.createRule('utilityRevenue', 'Utility revenue requires utility revenue to be enabled', (value: any, allInputs?: Record<string, any>) => {
    const includeUtilityRevenue = allInputs?.includeUtilityRevenue;
    if (!includeUtilityRevenue) return true;
    
    return value !== undefined && value >= 0;
  }),

  // Cross-field validations for collection type
  ValidationRuleFactory.createRule('collectionSize', 'Collection size should be appropriate for collection type', (value: any, allInputs?: Record<string, any>) => {
    const collectionType = allInputs?.collectionType;
    if (!collectionType || !value) return true;
    
    // 1/1 art should have small collection sizes
    if (collectionType === 'art' && value > 100) return false;
    
    // PFP collections typically have larger sizes
    if (collectionType === 'pfp' && value < 1000) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('royaltyPercentage', 'Royalty percentage should align with collection type standards', (value: any, allInputs?: Record<string, any>) => {
    const collectionType = allInputs?.collectionType;
    if (!collectionType || !value) return true;
    
    // Art collections can justify higher royalties
    if (collectionType === 'art' && value > 15) return false;
    
    // Utility NFTs should have lower royalties to encourage usage
    if (collectionType === 'utility' && value > 5) return false;
    
    return true;
  })
];

export function validateNFTRoyaltyInputs(inputs: NFTRoyaltyInputs, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required field validations
  if (!inputs.collectionSize) errors.push('Collection size is required');
  if (!inputs.mintPrice) errors.push('Mint price is required');
  if (!inputs.royaltyPercentage) errors.push('Royalty percentage is required');
  if (!inputs.averageResalePrice) errors.push('Average resale price is required');
  if (inputs.monthlyTrades === undefined) errors.push('Monthly trades is required');
  if (!inputs.marketplace) errors.push('Marketplace selection is required');
  if (!inputs.collectionType) errors.push('Collection type is required');
  
  // Numeric validations
  if (inputs.collectionSize <= 0) errors.push('Collection size must be positive');
  if (inputs.collectionSize < 1 || inputs.collectionSize > 1000000) {
    errors.push('Collection size must be between 1 and 1,000,000');
  }
  
  if (inputs.mintPrice <= 0) errors.push('Mint price must be positive');
  if (inputs.mintPrice < 0.001 || inputs.mintPrice > 10000) {
    errors.push('Mint price must be between $0.001 and $10,000');
  }
  
  if (inputs.royaltyPercentage <= 0) errors.push('Royalty percentage must be positive');
  if (inputs.royaltyPercentage < 0.1 || inputs.royaltyPercentage > 50) {
    errors.push('Royalty percentage must be between 0.1% and 50%');
  }
  
  if (inputs.averageResalePrice <= 0) errors.push('Average resale price must be positive');
  if (inputs.averageResalePrice < 0.001 || inputs.averageResalePrice > 100000) {
    errors.push('Average resale price must be between $0.001 and $100,000');
  }
  
  if (inputs.monthlyTrades < 0) errors.push('Monthly trades cannot be negative');
  if (inputs.monthlyTrades > 100000) {
    errors.push('Monthly trades must be between 0 and 100,000');
  }
  
  // Optional field validations
  if (inputs.floorPrice !== undefined) {
    if (inputs.floorPrice <= 0) errors.push('Floor price must be positive');
    if (inputs.floorPrice < 0.001 || inputs.floorPrice > 100000) {
      errors.push('Floor price must be between $0.001 and $100,000');
    }
  }
  
  if (inputs.customMarketplaceFee !== undefined) {
    if (inputs.customMarketplaceFee < 0 || inputs.customMarketplaceFee > 20) {
      errors.push('Custom marketplace fee must be between 0% and 20%');
    }
  }
  
  if (inputs.priceAppreciation !== undefined) {
    if (inputs.priceAppreciation < -50 || inputs.priceAppreciation > 500) {
      errors.push('Price appreciation must be between -50% and 500%');
    }
  }
  
  if (inputs.tradingVolumeGrowth !== undefined) {
    if (inputs.tradingVolumeGrowth < -50 || inputs.tradingVolumeGrowth > 300) {
      errors.push('Trading volume growth must be between -50% and 300%');
    }
  }
  
  if (inputs.activePeriod !== undefined) {
    if (inputs.activePeriod < 1 || inputs.activePeriod > 20) {
      errors.push('Active period must be between 1 and 20 years');
    }
  }
  
  if (inputs.utilityRevenue !== undefined) {
    if (inputs.utilityRevenue < 0 || inputs.utilityRevenue > 1000000) {
      errors.push('Utility revenue must be between $0 and $1,000,000');
    }
  }
  
  // Business logic validations
  if (inputs.royaltyPercentage > 10) {
    errors.push('Royalty percentage above 10% may discourage trading and reduce volume');
  }
  
  if (inputs.averageResalePrice < inputs.mintPrice * 0.3) {
    errors.push('Resale price significantly below mint price indicates weak demand');
  }
  
  if (inputs.averageResalePrice > inputs.mintPrice * 50) {
    errors.push('Resale price appears unrealistically high compared to mint price');
  }
  
  if (inputs.monthlyTrades > inputs.collectionSize) {
    errors.push('Monthly trades cannot exceed collection size (unrealistic turnover)');
  }
  
  if (inputs.floorPrice && inputs.averageResalePrice && inputs.floorPrice > inputs.averageResalePrice * 1.5) {
    errors.push('Floor price should generally be lower than average resale price');
  }
  
  // Custom marketplace validation
  if (inputs.marketplace === 'custom' && inputs.customMarketplaceFee === undefined) {
    errors.push('Custom marketplace fee is required when using custom marketplace');
  }
  
  // Utility revenue validation
  if (inputs.includeUtilityRevenue && inputs.utilityRevenue === undefined) {
    errors.push('Utility revenue amount is required when utility revenue is enabled');
  }
  
  // Collection type specific validations
  if (inputs.collectionType === 'art' && inputs.collectionSize > 100) {
    errors.push('1/1 Art collections typically have smaller collection sizes (≤100)');
  }
  
  if (inputs.collectionType === 'pfp' && inputs.collectionSize < 1000) {
    errors.push('PFP collections typically have larger collection sizes (≥1,000)');
  }
  
  if (inputs.collectionType === 'art' && inputs.royaltyPercentage > 15) {
    errors.push('Even art collections rarely justify royalties above 15%');
  }
  
  if (inputs.collectionType === 'utility' && inputs.royaltyPercentage > 5) {
    errors.push('Utility NFTs should have lower royalties (≤5%) to encourage usage');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

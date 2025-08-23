import { describe, it, expect } from 'vitest';
import { calculateNFTRoyaltyProfitability } from './formulas';
import { validateNFTRoyaltyInputs } from './validation';
import { quickValidateCollectionSize, quickValidateRoyaltyPercentage, quickValidateMintPrice } from './quickValidation';
import { NFTRoyaltyInputs } from './types';

describe('NFT Royalty Calculator', () => {
  const validInputs: NFTRoyaltyInputs = {
    collectionSize: 10000,
    mintPrice: 0.1,
    royaltyPercentage: 5,
    averageResalePrice: 0.5,
    monthlyTrades: 100,
    floorPrice: 0.3,
    marketplace: 'opensea',
    collectionType: 'pfp',
    priceAppreciation: 20,
    tradingVolumeGrowth: 30,
    activePeriod: 5,
    includePrimarySales: true,
    includeSecondarySales: true,
    includeUtilityRevenue: false,
    utilityRevenue: 0
  };

  describe('calculateNFTRoyaltyProfitability', () => {
    it('should calculate basic royalty metrics correctly', () => {
      const result = calculateNFTRoyaltyProfitability(validInputs);
      
      expect(result.royaltyPerSale).toBeGreaterThan(0);
      expect(result.monthlyRoyalties).toBeGreaterThan(0);
      expect(result.yearlyRoyalties).toBeGreaterThan(0);
      expect(result.totalLifetimeRoyalties).toBeGreaterThan(result.yearlyRoyalties);
      expect(result.primarySales).toBe(1000); // 10000 * 0.1
    });

    it('should calculate marketplace comparison correctly', () => {
      const result = calculateNFTRoyaltyProfitability(validInputs);
      
      expect(result.marketplaceComparison).toHaveLength(9); // 8 predefined + custom
      expect(result.optimalMarketplace).toBeDefined();
      
      const openSeaComparison = result.marketplaceComparison.find(mp => mp.marketplace === 'OpenSea');
      expect(openSeaComparison?.fee).toBe(2.5);
    });

    it('should calculate growth scenarios', () => {
      const result = calculateNFTRoyaltyProfitability(validInputs);
      
      expect(result.conservativeGrowth).toBeGreaterThan(0);
      expect(result.moderateGrowth).toBeGreaterThan(result.conservativeGrowth);
      expect(result.optimisticGrowth).toBeGreaterThan(result.moderateGrowth);
    });

    it('should handle different collection types', () => {
      const artInputs = { ...validInputs, collectionType: 'art' as const, collectionSize: 50 };
      const pfpInputs = { ...validInputs, collectionType: 'pfp' as const };
      
      const artResult = calculateNFTRoyaltyProfitability(artInputs);
      const pfpResult = calculateNFTRoyaltyProfitability(pfpInputs);
      
      // Art collections have higher multiplier (1.5 vs 1.0)
      expect(artResult.conservativeGrowth / artResult.yearlyRoyalties).toBeGreaterThan(
        pfpResult.conservativeGrowth / pfpResult.yearlyRoyalties
      );
    });

    it('should calculate ROI correctly', () => {
      const result = calculateNFTRoyaltyProfitability(validInputs);
      
      expect(result.roi).toBeGreaterThan(0);
      expect(result.breakEvenMonths).toBeGreaterThan(0);
    });

    it('should include utility revenue when enabled', () => {
      const utilityInputs = { 
        ...validInputs, 
        includeUtilityRevenue: true, 
        utilityRevenue: 1000 
      };
      const result = calculateNFTRoyaltyProfitability(utilityInputs);
      
      // Total revenue should include utility revenue projection
      expect(result.totalRevenue).toBeGreaterThan(validInputs.collectionSize * validInputs.mintPrice);
    });

    it('should generate comprehensive report', () => {
      const result = calculateNFTRoyaltyProfitability(validInputs);
      
      expect(result.report).toContain('NFT Royalty & Revenue Analysis');
      expect(result.report).toContain('Collection Overview');
      expect(result.report).toContain('Revenue Projections');
      expect(result.report).toContain('Performance Metrics');
      expect(result.report).toContain('Marketplace Analysis');
    });

    it('should assess risk levels correctly', () => {
      const highRiskInputs = { 
        ...validInputs, 
        royaltyPercentage: 15,
        averageResalePrice: 0.05, // Below mint price
        monthlyTrades: 5 // Low volume
      };
      
      const result = calculateNFTRoyaltyProfitability(highRiskInputs);
      expect(['Medium', 'High', 'Very High']).toContain(result.riskLevel);
    });
  });

  describe('validateNFTRoyaltyInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateNFTRoyaltyInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).collectionSize;
      
      const result = validateNFTRoyaltyInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Collection size is required');
    });

    it('should reject negative values', () => {
      const invalidInputs = { ...validInputs, mintPrice: -0.1 };
      const result = validateNFTRoyaltyInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mint price must be positive');
    });

    it('should validate royalty percentage ranges', () => {
      const invalidInputs = { ...validInputs, royaltyPercentage: 60 };
      const result = validateNFTRoyaltyInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Royalty percentage must be between 0.1% and 50%');
    });

    it('should warn about high royalty percentages', () => {
      const invalidInputs = { ...validInputs, royaltyPercentage: 12 };
      const result = validateNFTRoyaltyInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Royalty percentage above 10% may discourage trading and reduce volume');
    });

    it('should validate price relationships', () => {
      const invalidInputs = { 
        ...validInputs, 
        averageResalePrice: 0.02, // Much lower than mint price
        mintPrice: 0.1 
      };
      const result = validateNFTRoyaltyInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Resale price significantly below mint price indicates weak demand');
    });

    it('should validate trading volume against collection size', () => {
      const invalidInputs = { 
        ...validInputs, 
        collectionSize: 100,
        monthlyTrades: 150 // More than collection size
      };
      const result = validateNFTRoyaltyInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Monthly trades cannot exceed collection size (unrealistic turnover)');
    });

    it('should validate collection type constraints', () => {
      const invalidInputs = { 
        ...validInputs, 
        collectionType: 'art',
        collectionSize: 5000 // Too large for art collection
      };
      const result = validateNFTRoyaltyInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('1/1 Art collections typically have smaller collection sizes (≤100)');
    });

    it('should require custom marketplace fee when marketplace is custom', () => {
      const invalidInputs = { 
        ...validInputs, 
        marketplace: 'custom',
        customMarketplaceFee: undefined
      };
      const result = validateNFTRoyaltyInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Custom marketplace fee is required when using custom marketplace');
    });
  });

  describe('Quick Validation Functions', () => {
    describe('quickValidateCollectionSize', () => {
      it('should validate correct collection size', () => {
        const result = quickValidateCollectionSize(10000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative values', () => {
        const result = quickValidateCollectionSize(-100);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('positive');
      });

      it('should validate collection type constraints', () => {
        const result = quickValidateCollectionSize(5000, { collectionType: 'art' });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Art collections');
      });
    });

    describe('quickValidateRoyaltyPercentage', () => {
      it('should validate correct royalty percentage', () => {
        const result = quickValidateRoyaltyPercentage(5);
        expect(result.isValid).toBe(true);
      });

      it('should reject high percentages', () => {
        const result = quickValidateRoyaltyPercentage(15);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('discourage trading');
      });

      it('should validate collection type specific limits', () => {
        const result = quickValidateRoyaltyPercentage(8, { collectionType: 'utility' });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Utility NFTs');
      });
    });

    describe('quickValidateMintPrice', () => {
      it('should validate correct mint price', () => {
        const result = quickValidateMintPrice(0.1);
        expect(result.isValid).toBe(true);
      });

      it('should reject values outside range', () => {
        const result = quickValidateMintPrice(15000);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('$10,000');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero trading volume', () => {
      const zeroTradesInputs = { ...validInputs, monthlyTrades: 0 };
      const result = calculateNFTRoyaltyProfitability(zeroTradesInputs);
      
      expect(result.monthlyRoyalties).toBe(0);
      expect(result.yearlyRoyalties).toBe(0);
    });

    it('should handle maximum collection size', () => {
      const maxInputs = { ...validInputs, collectionSize: 1000000 };
      const result = calculateNFTRoyaltyProfitability(maxInputs);
      
      expect(result.primarySales).toBe(100000); // 1M * 0.1
    });

    it('should handle custom marketplace', () => {
      const customInputs = { 
        ...validInputs, 
        marketplace: 'custom' as const,
        customMarketplaceFee: 1.0 
      };
      const result = calculateNFTRoyaltyProfitability(customInputs);
      
      expect(result.marketplaceComparison).toHaveLength(9);
      const customComparison = result.marketplaceComparison.find(mp => mp.marketplace === 'Custom');
      expect(customComparison?.fee).toBe(1.0);
    });

    it('should handle negative price appreciation', () => {
      const bearishInputs = { ...validInputs, priceAppreciation: -20 };
      const result = calculateNFTRoyaltyProfitability(bearishInputs);
      
      expect(result.totalLifetimeRoyalties).toBeGreaterThan(0);
    });
  });

  describe('Performance Tests', () => {
    it('should handle large collections efficiently', () => {
      const largeInputs = { ...validInputs, collectionSize: 100000, monthlyTrades: 10000 };
      const startTime = Date.now();
      
      const result = calculateNFTRoyaltyProfitability(largeInputs);
      const endTime = Date.now();
      
      expect(result.totalRevenue).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle long active periods', () => {
      const longPeriodInputs = { ...validInputs, activePeriod: 20 };
      const result = calculateNFTRoyaltyProfitability(longPeriodInputs);
      
      expect(result.totalLifetimeRoyalties).toBeGreaterThan(result.yearlyRoyalties * 10);
    });
  });

  describe('Marketplace Optimization', () => {
    it('should identify optimal marketplace correctly', () => {
      const result = calculateNFTRoyaltyProfitability(validInputs);
      
      // Should prefer marketplaces with lower fees and higher market share
      const optimalMp = result.marketplaceComparison.find(mp => mp.marketplace === result.optimalMarketplace);
      expect(optimalMp).toBeDefined();
      expect(optimalMp!.annualProjection).toBeGreaterThan(0);
    });

    it('should handle multiple marketplace scenarios', () => {
      const blurInputs = { ...validInputs, marketplace: 'blur' as const };
      const openSeaInputs = { ...validInputs, marketplace: 'opensea' as const };
      
      const blurResult = calculateNFTRoyaltyProfitability(blurInputs);
      const openSeaResult = calculateNFTRoyaltyProfitability(openSeaInputs);
      
      // Results should differ based on marketplace fees
      expect(blurResult.marketplaceComparison[1].fee).not.toBe(openSeaResult.marketplaceComparison[0].fee);
    });
  });
});

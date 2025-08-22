import { describe, it, expect } from 'vitest';
import { calculateCryptoStakingProfitability } from './formulas';
import { validateCryptoStakingInputs } from './validation';
import { quickValidateStakingAmount, quickValidateAPY, quickValidateStakingPeriod } from './quickValidation';
import { CryptoStakingProfitabilityInputs } from './types';

describe('Crypto Staking Calculator', () => {
  const validInputs: CryptoStakingProfitabilityInputs = {
    stakingAmount: 1000,
    cryptocurrency: 'ethereum',
    stakingPeriod: 365,
    apyRate: 5.2,
    compounding: 'daily',
    cryptoPrice: 2000,
    priceVolatility: 50,
    marketTrend: 'neutral',
    stakingFee: 0.5,
    withdrawalFee: 0,
    reinvestRewards: true,
    lockPeriod: 0
  };

  describe('calculateCryptoStakingProfitability', () => {
    it('should calculate basic staking returns correctly', () => {
      const result = calculateCryptoStakingProfitability(validInputs);
      
      expect(result.dailyRewards).toBeGreaterThan(0);
      expect(result.monthlyRewards).toBeGreaterThan(0);
      expect(result.yearlyRewards).toBeGreaterThan(0);
      expect(result.roi).toBeGreaterThan(0);
      expect(result.totalValue).toBeGreaterThan(validInputs.stakingAmount);
      expect(result.cryptoAmount).toBe(0.5); // 1000 / 2000
    });

    it('should handle different compounding frequencies', () => {
      const dailyCompounding = { ...validInputs, compounding: 'daily' as const };
      const monthlyCompounding = { ...validInputs, compounding: 'monthly' as const };
      const annuallyCompounding = { ...validInputs, compounding: 'annually' as const };

      const dailyResult = calculateCryptoStakingProfitability(dailyCompounding);
      const monthlyResult = calculateCryptoStakingProfitability(monthlyCompounding);
      const annuallyResult = calculateCryptoStakingProfitability(annuallyCompounding);

      // Daily compounding should yield higher returns than annual
      expect(dailyResult.yearlyRewards).toBeGreaterThan(annuallyResult.yearlyRewards);
      expect(monthlyResult.yearlyRewards).toBeGreaterThan(annuallyResult.yearlyRewards);
    });

    it('should calculate risk metrics correctly', () => {
      const result = calculateCryptoStakingProfitability(validInputs);
      
      expect(result.riskLevel).toBeDefined();
      expect(result.volatilityImpact).toBeGreaterThan(0);
      expect(result.efficiencyRating).toBeDefined();
    });

    it('should handle high APY scenarios', () => {
      const highAPYInputs = { ...validInputs, apyRate: 20 };
      const result = calculateCryptoStakingProfitability(highAPYInputs);
      
      expect(result.roi).toBeGreaterThan(10);
      expect(result.riskLevel).toBe('High' || 'Very High');
    });

    it('should calculate break-even days correctly', () => {
      const inputsWithFees = { ...validInputs, stakingFee: 2, withdrawalFee: 10 };
      const result = calculateCryptoStakingProfitability(inputsWithFees);
      
      expect(result.breakEvenDays).toBeGreaterThan(0);
    });

    it('should generate comprehensive report', () => {
      const result = calculateCryptoStakingProfitability(validInputs);
      
      expect(result.report).toContain('Crypto Staking Profitability Analysis');
      expect(result.report).toContain('Investment Summary');
      expect(result.report).toContain('Returns Breakdown');
      expect(result.report).toContain('Risk Assessment');
    });
  });

  describe('validateCryptoStakingInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateCryptoStakingInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete (invalidInputs as any).stakingAmount;
      
      const result = validateCryptoStakingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Staking amount is required');
    });

    it('should reject negative values', () => {
      const invalidInputs = { ...validInputs, stakingAmount: -100 };
      const result = validateCryptoStakingInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Staking amount must be positive');
    });

    it('should validate APY rate ranges', () => {
      const invalidInputs = { ...validInputs, apyRate: 150 };
      const result = validateCryptoStakingInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('APY rate must be between 0.1% and 100%');
    });

    it('should validate cross-field relationships', () => {
      const invalidInputs = { ...validInputs, apyRate: 25, stakingPeriod: 7 };
      const result = validateCryptoStakingInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('High APY rates (>20%) typically require longer staking periods (30+ days)');
    });

    it('should validate lock period constraints', () => {
      const invalidInputs = { ...validInputs, lockPeriod: 400, stakingPeriod: 365 };
      const result = validateCryptoStakingInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Lock period cannot exceed staking period');
    });
  });

  describe('Quick Validation Functions', () => {
    describe('quickValidateStakingAmount', () => {
      it('should validate correct staking amount', () => {
        const result = quickValidateStakingAmount(1000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative values', () => {
        const result = quickValidateStakingAmount(-100);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('positive');
      });

      it('should reject values outside range', () => {
        const result = quickValidateStakingAmount(20000000);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('$10,000,000');
      });
    });

    describe('quickValidateAPY', () => {
      it('should validate correct APY rate', () => {
        const result = quickValidateAPY(5.2);
        expect(result.isValid).toBe(true);
      });

      it('should reject rates outside range', () => {
        const result = quickValidateAPY(150);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('100%');
      });

      it('should validate cryptocurrency-specific ranges', () => {
        const result = quickValidateAPY(25, { cryptocurrency: 'ethereum' });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('ethereum');
      });
    });

    describe('quickValidateStakingPeriod', () => {
      it('should validate correct staking period', () => {
        const result = quickValidateStakingPeriod(365);
        expect(result.isValid).toBe(true);
      });

      it('should reject periods outside range', () => {
        const result = quickValidateStakingPeriod(5000);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('3650 days');
      });

      it('should validate APY-period relationships', () => {
        const result = quickValidateStakingPeriod(5, { apyRate: 25 });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('30 days');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum staking amounts', () => {
      const minInputs = { ...validInputs, stakingAmount: 1 };
      const result = calculateCryptoStakingProfitability(minInputs);
      
      expect(result.dailyRewards).toBeGreaterThan(0);
      expect(result.roi).toBeGreaterThan(0);
    });

    it('should handle maximum APY rates', () => {
      const maxAPYInputs = { ...validInputs, apyRate: 100 };
      const result = calculateCryptoStakingProfitability(maxAPYInputs);
      
      expect(result.roi).toBeGreaterThan(50);
      expect(result.riskLevel).toBe('Very High');
    });

    it('should handle zero fees', () => {
      const zeroFeesInputs = { ...validInputs, stakingFee: 0, withdrawalFee: 0 };
      const result = calculateCryptoStakingProfitability(zeroFeesInputs);
      
      expect(result.breakEvenDays).toBe(0);
    });

    it('should handle different market trends', () => {
      const bullishInputs = { ...validInputs, marketTrend: 'bullish' as const };
      const bearishInputs = { ...validInputs, marketTrend: 'bearish' as const };
      
      const bullishResult = calculateCryptoStakingProfitability(bullishInputs);
      const bearishResult = calculateCryptoStakingProfitability(bearishInputs);
      
      expect(bullishResult.riskLevel).not.toBe(bearishResult.riskLevel);
    });
  });

  describe('Performance Tests', () => {
    it('should handle large staking amounts efficiently', () => {
      const largeInputs = { ...validInputs, stakingAmount: 1000000 };
      const startTime = Date.now();
      
      const result = calculateCryptoStakingProfitability(largeInputs);
      const endTime = Date.now();
      
      expect(result.totalValue).toBeGreaterThan(largeInputs.stakingAmount);
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle long staking periods', () => {
      const longPeriodInputs = { ...validInputs, stakingPeriod: 3650 };
      const result = calculateCryptoStakingProfitability(longPeriodInputs);
      
      expect(result.yearlyRewards).toBeGreaterThan(0);
      expect(result.totalValue).toBeGreaterThan(validInputs.stakingAmount);
    });
  });
});

import { describe, it, expect } from 'vitest';
import { calculateCommodity } from './formulas';
import { validateCommodityInputs } from './validation';

describe('Commodity Calculator', () => {
  const mockInputs = {
    currentPrice: 2000,
    quantity: 10,
    purchasePrice: 1800,
    commodityType: 'gold' as const,
    leverageRatio: 2,
    marginRequirement: 18000,
    transactionCosts: 100,
    storageCosts: 50,
    insuranceCosts: 25,
    holdingPeriod: 2,
    marketVolatility: 0.15,
    taxRate: 0.15
  };

  describe('Core Calculations', () => {
    it('calculates current value correctly', () => {
      const result = calculateCommodity(mockInputs);
      expect(result.currentValue).toBe(20000);
    });

    it('calculates unrealized gain/loss correctly', () => {
      const result = calculateCommodity(mockInputs);
      expect(result.unrealizedGainLoss).toBe(2000);
    });

    it('calculates net gain/loss after costs', () => {
      const result = calculateCommodity(mockInputs);
      expect(result.netGainLoss).toBe(1825); // 2000 - 175 total costs
    });

    it('calculates ROI correctly', () => {
      const result = calculateCommodity(mockInputs);
      expect(result.roi).toBeCloseTo(10.14, 2);
    });

    it('calculates annualized return correctly', () => {
      const result = calculateCommodity(mockInputs);
      expect(result.annualizedReturn).toBeCloseTo(4.91, 2);
    });
  });

  describe('Margin and Leverage Calculations', () => {
    it('calculates margin used correctly', () => {
      const result = calculateCommodity(mockInputs);
      expect(result.marginUsed).toBe(10000); // 20000 / 2
    });

    it('calculates margin available correctly', () => {
      const result = calculateCommodity(mockInputs);
      expect(result.marginAvailable).toBe(8000); // 18000 - 10000
    });

    it('calculates leverage ratio correctly', () => {
      const result = calculateCommodity(mockInputs);
      expect(result.leverageRatio).toBe(2);
    });
  });

  describe('Risk Calculations', () => {
    it('calculates break-even price correctly', () => {
      const result = calculateCommodity(mockInputs);
      expect(result.breakEvenPrice).toBe(1817.5);
    });

    it('calculates after-tax gain/loss correctly', () => {
      const result = calculateCommodity(mockInputs);
      expect(result.afterTaxGainLoss).toBeCloseTo(1556.25, 2);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateCommodityInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required current price', () => {
      const invalidInputs = { ...mockInputs, currentPrice: 0 };
      const result = validateCommodityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates quantity range', () => {
      const invalidInputs = { ...mockInputs, quantity: -1 };
      const result = validateCommodityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates leverage ratio range', () => {
      const invalidInputs = { ...mockInputs, leverageRatio: 0.5 };
      const result = validateCommodityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero leverage (no leverage)', () => {
      const noLeverageInputs = { ...mockInputs, leverageRatio: 1 };
      const result = calculateCommodity(noLeverageInputs);
      expect(result.marginUsed).toBe(0);
      expect(result.leverageRatio).toBe(1);
    });

    it('handles loss scenarios', () => {
      const lossInputs = { ...mockInputs, currentPrice: 1500 };
      const result = calculateCommodity(lossInputs);
      expect(result.unrealizedGainLoss).toBe(-3000);
      expect(result.netGainLoss).toBe(-3175);
    });

    it('handles high volatility', () => {
      const highVolInputs = { ...mockInputs, marketVolatility: 0.5 };
      const result = calculateCommodity(highVolInputs);
      expect(result.volatilityAdjustedReturn).toBeLessThan(result.annualizedReturn);
    });
  });
});
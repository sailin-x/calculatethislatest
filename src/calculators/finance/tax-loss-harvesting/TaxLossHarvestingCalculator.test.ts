import { describe, it, expect } from 'vitest';
import {
  calculateHarvestableLosses,
  calculateTaxSavings,
  calculateOptimalHarvestAmount,
  calculateTaxEfficiency,
  calculateTaxLossHarvesting
} from './formulas';
import { validateTaxLossHarvestingInputs } from './validation';

describe('Tax-Loss Harvesting Calculator', () => {
  const mockInputs = {
    currentPortfolioValue: 100000,
    realizedGains: 5000,
    realizedLosses: 8000,
    shortTermGains: 2000,
    shortTermLosses: 3000,
    longTermGains: 3000,
    longTermLosses: 5000,
    taxRate: 24,
    washSalePeriod: 30,
    replacementInvestment: 'S&P 500 ETF',
    harvestFrequency: 'annual' as const,
    riskTolerance: 'moderate' as const,
    investmentHorizon: 10,
    expectedReturn: 8,
    volatility: 12,
    transactionCosts: 15,
    minimumHarvestAmount: 1000
  };

  describe('Loss Harvesting Calculations', () => {
    it('calculates harvestable losses correctly', () => {
      const result = calculateHarvestableLosses(mockInputs);
      expect(result).toBe(3000); // 8000 losses - 5000 gains = 3000 harvestable
    });

    it('calculates tax savings correctly', () => {
      const harvestableLosses = calculateHarvestableLosses(mockInputs);
      const result = calculateTaxSavings(harvestableLosses, mockInputs.taxRate);
      expect(result).toBe(720); // 3000 * 0.24
    });

    it('calculates optimal harvest amount correctly', () => {
      const result = calculateOptimalHarvestAmount(mockInputs);
      expect(result).toBeGreaterThanOrEqual(mockInputs.minimumHarvestAmount);
      expect(result).toBeLessThanOrEqual(mockInputs.currentPortfolioValue * 0.20); // 20% max
    });

    it('calculates tax efficiency correctly', () => {
      const result = calculateTaxEfficiency(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });
  });

  describe('Complete Harvesting Analysis', () => {
    it('calculates full harvesting scenario', () => {
      const result = calculateTaxLossHarvesting(mockInputs);
      expect(result.netTaxSavings).toBeGreaterThan(0);
      expect(result.harvestableLosses).toBeGreaterThan(0);
      expect(result.optimalHarvestAmount).toBeGreaterThan(0);
      expect(result.taxEfficiency).toBeGreaterThan(0);
      expect(result.harvestSchedule).toBeDefined();
      expect(result.recommendedActions).toBeDefined();
    });

    it('handles no harvestable losses', () => {
      const noLossInputs = {
        ...mockInputs,
        realizedLosses: 2000,
        shortTermLosses: 1000,
        longTermLosses: 1000
      };
      const result = calculateTaxLossHarvesting(noLossInputs);
      expect(result.harvestableLosses).toBe(0);
      expect(result.netTaxSavings).toBe(0);
    });

    it('handles high transaction costs', () => {
      const highCostInputs = { ...mockInputs, transactionCosts: 100 };
      const result = calculateTaxLossHarvesting(highCostInputs);
      expect(result.portfolioRebalancingCost).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateTaxLossHarvestingInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates portfolio value cannot be zero', () => {
      const invalidInputs = { ...mockInputs, currentPortfolioValue: 0 };
      const result = validateTaxLossHarvestingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates tax rate range', () => {
      const invalidInputs = { ...mockInputs, taxRate: 60 };
      const result = validateTaxLossHarvestingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates investment horizon', () => {
      const invalidInputs = { ...mockInputs, investmentHorizon: 0 };
      const result = validateTaxLossHarvestingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates minimum harvest amount', () => {
      const invalidInputs = { ...mockInputs, minimumHarvestAmount: 0 };
      const result = validateTaxLossHarvestingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero tax rate', () => {
      const zeroTaxInputs = { ...mockInputs, taxRate: 0 };
      const result = calculateTaxLossHarvesting(zeroTaxInputs);
      expect(result.netTaxSavings).toBe(0);
    });

    it('handles very small portfolio', () => {
      const smallPortfolioInputs = { ...mockInputs, currentPortfolioValue: 1000 };
      const result = calculateTaxLossHarvesting(smallPortfolioInputs);
      expect(result.optimalHarvestAmount).toBeLessThanOrEqual(200); // 20% of 1000
    });

    it('handles high volatility', () => {
      const volatileInputs = { ...mockInputs, volatility: 50 };
      const result = calculateTaxLossHarvesting(volatileInputs);
      expect(result.riskAdjustedReturn).toBeDefined();
    });

    it('handles conservative risk tolerance', () => {
      const conservativeInputs = { ...mockInputs, riskTolerance: 'conservative' as const };
      const result = calculateOptimalHarvestAmount(conservativeInputs);
      const moderateResult = calculateOptimalHarvestAmount(mockInputs);
      expect(result).toBeLessThanOrEqual(moderateResult);
    });

    it('handles quarterly harvesting', () => {
      const quarterlyInputs = { ...mockInputs, harvestFrequency: 'quarterly' as const };
      const result = calculateTaxLossHarvesting(quarterlyInputs);
      expect(result.harvestSchedule.length).toBe(4);
    });
  });

  describe('Risk and Return Calculations', () => {
    it('calculates risk-adjusted return for moderate volatility', () => {
      const result = calculateTaxLossHarvesting(mockInputs);
      expect(result.riskAdjustedReturn).toBeGreaterThan(0);
      expect(result.riskAdjustedReturn).toBeLessThanOrEqual(mockInputs.expectedReturn / 100);
    });

    it('handles negative expected returns', () => {
      const negativeReturnInputs = { ...mockInputs, expectedReturn: -5 };
      const result = calculateTaxLossHarvesting(negativeReturnInputs);
      expect(result.riskAdjustedReturn).toBeDefined();
    });

    it('calculates break-even period correctly', () => {
      const result = calculateTaxLossHarvesting(mockInputs);
      expect(result.breakEvenPeriod).toBeGreaterThan(0);
      expect(typeof result.breakEvenPeriod).toBe('number');
    });
  });
});
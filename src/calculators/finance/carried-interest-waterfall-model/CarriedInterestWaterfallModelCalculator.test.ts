import { describe, it, expect } from 'vitest';
import { CarriedInterestWaterfallModelCalculator } from './CarriedInterestWaterfallModelCalculator';
import { calculateCarriedInterestWaterfallModel } from './formulas';
import { validateCarriedInterestWaterfallModelInputs } from './validation';
import { validateAllCarriedInterestWaterfallModelInputs } from './quickValidation';

describe('Carried Interest Waterfall Model Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(CarriedInterestWaterfallModelCalculator.id).toBe('carried-interest-waterfall-model');
      expect(CarriedInterestWaterfallModelCalculator.title).toBe('Carried Interest Waterfall Model Calculator');
      expect(CarriedInterestWaterfallModelCalculator.category).toBe('finance');
      expect(CarriedInterestWaterfallModelCalculator.subcategory).toBe('private-equity');
    });

    it('should have required inputs', () => {
      const requiredInputs = CarriedInterestWaterfallModelCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'totalCapital')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = CarriedInterestWaterfallModelCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('carriedInterestEarned');
      expect(outputIds).toContain('managementFeesPaid');
      expect(outputIds).toContain('irr');
    });

    it('should have calculate function', () => {
      expect(typeof CarriedInterestWaterfallModelCalculator.calculate).toBe('function');
    });

    it('should have generateReport function', () => {
      expect(typeof CarriedInterestWaterfallModelCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateAllCarriedInterestWaterfallModelInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate total capital range', () => {
      const result = validateAllCarriedInterestWaterfallModelInputs({ totalCapital: 500000 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be between $1,000,000 and $10,000,000,000');
    });

    it('should validate carried interest range', () => {
      const result = validateAllCarriedInterestWaterfallModelInputs({
        totalCapital: 10000000,
        carriedInterest: 0.6
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be 50% or less');
    });

    it('should accept valid inputs', () => {
      const validInputs = {
        totalCapital: 100000000,
        managementFee: 0.02,
        carriedInterest: 0.20,
        hurdleRate: 0.08,
        catchUpPercentage: 1.0,
        investmentPeriod: 10,
        totalReturn: 250000000,
        preferredReturn: 0.08,
        distributionWaterfall: 'american',
        clawbackProvision: true,
        gpCommitment: 5000000,
        lpCommitment: 95000000
      };
      const result = validateAllCarriedInterestWaterfallModelInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate waterfall distribution correctly', () => {
      const inputs = {
        totalCapital: 100000000,
        managementFee: 0.02,
        carriedInterest: 0.20,
        hurdleRate: 0.08,
        catchUpPercentage: 1.0,
        investmentPeriod: 10,
        totalReturn: 250000000,
        preferredReturn: 0.08,
        distributionWaterfall: 'american',
        clawbackProvision: false,
        gpCommitment: 5000000,
        lpCommitment: 95000000
      };

      const outputs = calculateCarriedInterestWaterfallModel(inputs);

      expect(outputs.carriedInterestEarned).toBeGreaterThan(0);
      expect(outputs.managementFeesPaid).toBeGreaterThan(0);
      expect(outputs.irr).toBeGreaterThan(0);
      expect(outputs.multipleOfInvestedCapital).toBeCloseTo(2.5, 1);
    });

    it('should calculate IRR correctly', () => {
      const inputs = {
        totalCapital: 100000000,
        managementFee: 0.02,
        carriedInterest: 0.20,
        hurdleRate: 0.08,
        catchUpPercentage: 1.0,
        investmentPeriod: 5,
        totalReturn: 161051000, // Approximate 10% IRR
        preferredReturn: 0.08,
        distributionWaterfall: 'american',
        clawbackProvision: false,
        gpCommitment: 5000000,
        lpCommitment: 95000000
      };

      const outputs = calculateCarriedInterestWaterfallModel(inputs);

      expect(outputs.irr).toBeGreaterThan(0);
      expect(outputs.irr).toBeLessThan(0.5); // Reasonable IRR range
    });

    it('should handle loss scenarios', () => {
      const inputs = {
        totalCapital: 100000000,
        managementFee: 0.02,
        carriedInterest: 0.20,
        hurdleRate: 0.08,
        catchUpPercentage: 1.0,
        investmentPeriod: 10,
        totalReturn: 50000000, // Loss scenario
        preferredReturn: 0.08,
        distributionWaterfall: 'american' as const,
        clawbackProvision: false,
        gpCommitment: 5000000,
        lpCommitment: 95000000
      };

      const outputs = calculateCarriedInterestWaterfallModel(inputs);

      expect(outputs.carriedInterestEarned).toBe(0); // No carried interest in loss scenario
      expect(outputs.irr).toBe(0); // Negative or zero IRR
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive report', () => {
      const inputs = {
        totalCapital: 100000000,
        managementFee: 0.02,
        carriedInterest: 0.20,
        hurdleRate: 0.08,
        catchUpPercentage: 1.0,
        investmentPeriod: 10,
        totalReturn: 250000000,
        preferredReturn: 0.08,
        distributionWaterfall: 'american',
        clawbackProvision: true,
        gpCommitment: 5000000,
        lpCommitment: 95000000
      };

      const outputs = calculateCarriedInterestWaterfallModel(inputs);
      const report = CarriedInterestWaterfallModelCalculator.generateReport(inputs, outputs);

      expect(report).toContain('Carried Interest Waterfall Model Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Distribution Waterfall Tiers');
      expect(report).toContain('Financial Results');
    });

    it('should include key metrics in report', () => {
      const inputs = {
        totalCapital: 100000000,
        managementFee: 0.02,
        carriedInterest: 0.20,
        hurdleRate: 0.08,
        catchUpPercentage: 1.0,
        investmentPeriod: 10,
        totalReturn: 250000000,
        preferredReturn: 0.08,
        distributionWaterfall: 'american',
        clawbackProvision: false,
        gpCommitment: 5000000,
        lpCommitment: 95000000
      };

      const outputs = calculateCarriedInterestWaterfallModel(inputs);
      const report = CarriedInterestWaterfallModelCalculator.generateReport(inputs, outputs);

      expect(report).toContain('$100,000,000');
      expect(report).toContain('2.50x');
      expect(report).toContain('$20,000,000'); // Management fees for 10 years
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero carried interest', () => {
      const inputs = {
        totalCapital: 100000000,
        managementFee: 0.02,
        carriedInterest: 0,
        hurdleRate: 0.08,
        catchUpPercentage: 1.0,
        investmentPeriod: 10,
        totalReturn: 250000000,
        preferredReturn: 0.08,
        distributionWaterfall: 'american',
        clawbackProvision: false,
        gpCommitment: 5000000,
        lpCommitment: 95000000
      };

      const outputs = calculateCarriedInterestWaterfallModel(inputs);

      expect(outputs.carriedInterestEarned).toBe(0);
      expect(outputs.gpProfitShare).toBe(0);
    });

    it('should handle high hurdle rates', () => {
      const inputs = {
        totalCapital: 100000000,
        managementFee: 0.02,
        carriedInterest: 0.20,
        hurdleRate: 0.25, // High hurdle
        catchUpPercentage: 1.0,
        investmentPeriod: 10,
        totalReturn: 150000000, // Below hurdle
        preferredReturn: 0.08,
        distributionWaterfall: 'american',
        clawbackProvision: false,
        gpCommitment: 5000000,
        lpCommitment: 95000000
      };

      const outputs = calculateCarriedInterestWaterfallModel(inputs);

      expect(outputs.carriedInterestEarned).toBe(0); // No carried interest below hurdle
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const totalCapitalResult = validateAllCarriedInterestWaterfallModelInputs({ totalCapital: 500000 });
      expect(totalCapitalResult.isValid).toBe(false);

      const validInputs = {
        totalCapital: 100000000,
        managementFee: 0.02,
        carriedInterest: 0.20,
        hurdleRate: 0.08,
        catchUpPercentage: 1.0,
        investmentPeriod: 10,
        totalReturn: 250000000,
        preferredReturn: 0.08,
        distributionWaterfall: 'american',
        gpCommitment: 5000000,
        lpCommitment: 95000000
      };
      const result = validateAllCarriedInterestWaterfallModelInputs(validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should catch multiple validation errors', () => {
      const inputs = {
        totalCapital: 500000, // Too low
        carriedInterest: 0.6, // Too high
        hurdleRate: 0.35 // Too high
      };

      const result = validateAllCarriedInterestWaterfallModelInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});
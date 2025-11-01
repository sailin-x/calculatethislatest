import { describe, it, expect } from 'vitest';
import { CAPMCalculator } from './CAPMCalculator';
import { calculateCAPM } from './formulas';
import { validateCAPMInputs } from './validation';
import { validateAllCAPMInputs } from './quickValidation';

describe('CAPM Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(CAPMCalculator.id).toBe('capm');
      expect(CAPMCalculator.title).toBe('CAPM Calculator');
      expect(CAPMCalculator.category).toBe('finance');
      expect(CAPMCalculator.subcategory).toBe('asset-pricing');
    });

    it('should have required inputs', () => {
      const requiredInputs = CAPMCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'riskFreeRate')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'marketRiskPremium')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'beta')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = CAPMCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('costOfEquity');
      expect(outputIds).toContain('expectedReturn');
      expect(outputIds).toContain('riskPremium');
    });

    it('should have calculate function', () => {
      expect(typeof CAPMCalculator.calculate).toBe('function');
    });

    it('should have generateReport function', () => {
      expect(typeof CAPMCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateAllCAPMInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate risk-free rate range', () => {
      const result = validateAllCAPMInputs({ riskFreeRate: 0.25 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be 20% or less');
    });

    it('should validate beta range', () => {
      const result = validateAllCAPMInputs({
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 6
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must be 5 or less');
    });

    it('should accept valid inputs', () => {
      const validInputs = {
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2,
        companyName: 'Apple Inc.',
        industry: 'Technology',
        analysisPeriod: 5,
        historicalBeta: 1.1,
        adjustedBeta: true,
        taxRate: 0.25,
        debtRatio: 0.3
      };
      const result = validateAllCAPMInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate CAPM correctly', () => {
      const inputs = {
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2
      };

      const outputs = calculateCAPM(inputs);

      // Expected: 0.03 + 1.2 * 0.07 = 0.114 or 11.4%
      expect(outputs.costOfEquity).toBeCloseTo(0.114, 3);
      expect(outputs.expectedReturn).toBeCloseTo(0.114, 3);
      expect(outputs.riskPremium).toBeCloseTo(0.084, 3);
      expect(outputs.systematicRisk).toBe(1.2);
    });

    it('should calculate beta adjustments', () => {
      const inputs = {
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2,
        historicalBeta: 1.5,
        adjustedBeta: true,
        taxRate: 0.25,
        debtRatio: 0.4
      };

      const outputs = calculateCAPM(inputs);

      expect(outputs.betaAnalysis.adjustedBeta).toBeGreaterThan(0);
      expect(outputs.betaAnalysis.unleveredBeta).toBeGreaterThan(0);
      expect(outputs.betaAnalysis.leveredBeta).toBeGreaterThan(0);
    });

    it('should perform sensitivity analysis', () => {
      const inputs = {
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2
      };

      const outputs = calculateCAPM(inputs);

      expect(outputs.sensitivityAnalysis.betaRange).toBeDefined();
      expect(outputs.sensitivityAnalysis.costOfEquityRange).toBeDefined();
      expect(outputs.sensitivityAnalysis.expectedReturnRange).toBeDefined();
      expect(outputs.sensitivityAnalysis.betaRange.length).toBeGreaterThan(0);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive report', () => {
      const inputs = {
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2,
        companyName: 'Apple Inc.',
        industry: 'Technology'
      };

      const outputs = calculateCAPM(inputs);
      const report = CAPMCalculator.generateReport(inputs, outputs);

      expect(report).toContain('CAPM Analysis Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Apple Inc.');
      expect(report).toContain('Technology');
    });

    it('should include CAPM formula in report', () => {
      const inputs = {
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2
      };

      const outputs = calculateCAPM(inputs);
      const report = CAPMCalculator.generateReport(inputs, outputs);

      expect(report).toContain('E(Ri) = Rf + βi × (E(Rm) - Rf)');
      expect(report).toContain('3.00%');
      expect(report).toContain('7.00%');
      expect(report).toContain('1.200');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero beta', () => {
      const inputs = {
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 0
      };

      const outputs = calculateCAPM(inputs);

      expect(outputs.costOfEquity).toBe(0.03); // Should equal risk-free rate
      expect(outputs.riskPremium).toBe(0);
    });

    it('should handle high beta', () => {
      const inputs = {
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 2.5
      };

      const outputs = calculateCAPM(inputs);

      expect(outputs.costOfEquity).toBeCloseTo(0.205, 3); // 0.03 + 2.5 * 0.07
      expect(outputs.riskPremium).toBeCloseTo(0.175, 3);
    });

    it('should handle beta adjustments correctly', () => {
      const inputs = {
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2,
        historicalBeta: 1.8,
        adjustedBeta: true
      };

      const outputs = calculateCAPM(inputs);

      // Adjusted beta should be between historical and 1.0
      expect(outputs.betaAnalysis.adjustedBeta).toBeGreaterThan(1.0);
      expect(outputs.betaAnalysis.adjustedBeta).toBeLessThan(1.8);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const riskFreeRateResult = validateAllCAPMInputs({ riskFreeRate: 0.25 });
      expect(riskFreeRateResult.isValid).toBe(false);

      const validInputs = {
        riskFreeRate: 0.03,
        marketRiskPremium: 0.07,
        beta: 1.2
      };
      const result = validateAllCAPMInputs(validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should catch multiple validation errors', () => {
      const inputs = {
        riskFreeRate: 0.25, // Too high
        marketRiskPremium: 0.25, // Too high
        beta: 6 // Too high
      };

      const result = validateAllCAPMInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});
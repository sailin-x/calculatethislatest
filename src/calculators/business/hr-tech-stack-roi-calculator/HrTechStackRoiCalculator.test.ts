import { describe, it, expect } from 'vitest';
import {
  calculateResult,
  calculateSecondaryResult,
  calculatePercentageResult,
  calculateMetrics,
  generateAnalysis
} from './formulas';
import { validateHrTechStackRoiCalculatorInputs } from './validation';

describe('HrTechStackRoiCalculator Calculator', () => {
  const mockInputs = {
    primaryInput: 100,
    secondaryInput: 50,
    selectInput: 'option1' as const,
    optionalParameter: 'test',
    booleanFlag: true
  };

  describe('Core Calculations', () => {
    it('calculates primary result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(150); // 100 + 50
    });

    it('calculates secondary result correctly', () => {
      const result = calculateSecondaryResult(mockInputs);
      expect(result).toBe(150); // 100 * 1.5 for option1
    });

    it('calculates percentage result correctly', () => {
      const result = calculatePercentageResult(mockInputs);
      expect(result).toBe(150); // (150 / 100) * 100
    });

    it('calculates metrics correctly', () => {
      const result = calculateMetrics(mockInputs);
      expect(result.intermediateValue).toBe(75); // 150 * 0.5
      expect(result.calculationSteps).toContain('Calculated primary result');
      expect(result.riskLevel).toBe('Low');
    });
  });

  describe('Analysis Generation', () => {
    it('generates analysis for low values', () => {
      const metrics = calculateMetrics(mockInputs);
      const analysis = generateAnalysis(mockInputs, metrics);
      expect(analysis.riskLevel).toBe('Low');
      expect(analysis.insights).toContain('All values are within normal parameters');
    });

    it('generates analysis for high values', () => {
      const highInputs = { ...mockInputs, primaryInput: 2000 };
      const metrics = calculateMetrics(highInputs);
      const analysis = generateAnalysis(highInputs, metrics);
      expect(analysis.riskLevel).toBe('High');
      expect(analysis.warnings).toContain('Result exceeds typical thresholds');
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateHrTechStackRoiCalculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required primary input', () => {
      const invalidInputs = { ...mockInputs, primaryInput: 0 };
      const result = validateHrTechStackRoiCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('must be greater than 0');
    });

    it('validates select input options', () => {
      const invalidInputs = { ...mockInputs, selectInput: 'invalid' as any };
      const result = validateHrTechStackRoiCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates cross-field relationships', () => {
      const invalidInputs = { ...mockInputs, secondaryInput: 200 };
      const result = validateHrTechStackRoiCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('cannot exceed primary input');
    });
  });

  describe('Edge Cases', () => {
    it('handles zero secondary input', () => {
      const result = calculateResult({ ...mockInputs, secondaryInput: 0 });
      expect(result).toBe(100);
    });

    it('handles maximum primary input', () => {
      const result = calculateResult({ ...mockInputs, primaryInput: 1000000 });
      expect(result).toBe(1000050);
    });

    it('handles option2 multiplier', () => {
      const result = calculateSecondaryResult({ ...mockInputs, selectInput: 'option2' as const });
      expect(result).toBe(200); // 100 * 2.0
    });
  });

  describe('Error Handling', () => {
    it('handles undefined optional parameters', () => {
      const inputsWithoutOptional = {
        primaryInput: 100,
        selectInput: 'option1' as const
      };
      const result = calculateResult(inputsWithoutOptional as any);
      expect(result).toBe(100);
    });

    it('validates input ranges', () => {
      const invalidInputs = { ...mockInputs, primaryInput: -100 };
      const result = validateHrTechStackRoiCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
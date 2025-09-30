import { describe, it, expect } from 'vitest';
import { calculateBmiCalculatorResults } from './formulas';
import { validateBmiCalculatorInputs } from './validation';
import { BmiCalculatorInputs } from './types';

describe('BMI Calculator', () => {
  const mockInputs: BmiCalculatorInputs = {
    weight: 70,
    height: 175
  };

  describe('Calculations', () => {
    it('calculates BMI correctly', () => {
      const result = calculateBmiCalculatorResults(mockInputs);
      expect(result.bmi).toBeCloseTo(22.9, 1);
      expect(result.category).toBe('Normal weight');
      expect(result.healthyRange).toContain('kg');
    });

    it('calculates underweight BMI', () => {
      const underweightInputs: BmiCalculatorInputs = {
        weight: 50,
        height: 175
      };
      const result = calculateBmiCalculatorResults(underweightInputs);
      expect(result.bmi).toBeLessThan(18.5);
      expect(result.category).toBe('Underweight');
    });

    it('calculates overweight BMI', () => {
      const overweightInputs: BmiCalculatorInputs = {
        weight: 85,
        height: 170
      };
      const result = calculateBmiCalculatorResults(overweightInputs);
      expect(result.bmi).toBeGreaterThanOrEqual(25);
      expect(result.category).toBe('Overweight');
    });

    it('calculates obese BMI', () => {
      const obeseInputs: BmiCalculatorInputs = {
        weight: 100,
        height: 165
      };
      const result = calculateBmiCalculatorResults(obeseInputs);
      expect(result.bmi).toBeGreaterThanOrEqual(30);
      expect(result.category).toBe('Obese');
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateBmiCalculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates missing weight', () => {
      const invalidInputs = { ...mockInputs, weight: undefined };
      const result = validateBmiCalculatorInputs(invalidInputs as any);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('weight');
    });

    it('validates missing height', () => {
      const invalidInputs = { ...mockInputs, height: undefined };
      const result = validateBmiCalculatorInputs(invalidInputs as any);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('height');
    });

    it('validates negative weight', () => {
      const invalidInputs = { ...mockInputs, weight: -10 };
      const result = validateBmiCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates zero height', () => {
      const invalidInputs = { ...mockInputs, height: 0 };
      const result = validateBmiCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates extremely high weight', () => {
      const invalidInputs = { ...mockInputs, weight: 600 };
      const result = validateBmiCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles decimal inputs', () => {
      const decimalInputs: BmiCalculatorInputs = {
        weight: 67.5,
        height: 172.3
      };
      const result = calculateBmiCalculatorResults(decimalInputs);
      expect(result.bmi).toBeCloseTo(22.8, 1);
      expect(typeof result.bmi).toBe('number');
    });

    it('handles boundary height values', () => {
      const tallInputs: BmiCalculatorInputs = {
        weight: 80,
        height: 200
      };
      const result = calculateBmiCalculatorResults(tallInputs);
      expect(result.bmi).toBeCloseTo(20.0, 1);
    });

    it('provides correct healthy range', () => {
      const result = calculateBmiCalculatorResults(mockInputs);
      expect(result.healthyRange).toMatch(/\d+\.\d+ - \d+\.\d+ kg/);
      expect(result.healthyRange).toContain('175cm');
    });
  });

  describe('Medical Categories', () => {
    it('correctly identifies all BMI categories', () => {
      const testCases = [
        { weight: 45, height: 170, expected: 'Underweight' },
        { weight: 65, height: 170, expected: 'Normal weight' },
        { weight: 75, height: 170, expected: 'Overweight' },
        { weight: 90, height: 170, expected: 'Obese' }
      ];

      testCases.forEach(({ weight, height, expected }) => {
        const result = calculateBmiCalculatorResults({ weight, height });
        expect(result.category).toBe(expected);
      });
    });
  });
});

import { describe, it, expect } from 'vitest';
import { algebraCalculatorFormula, AlgebraFormulas } from './formulas';

describe('AlgebraCalculator', () => {
  describe('Linear equations', () => {
    it('should solve simple linear equation', () => {
      const result = AlgebraFormulas.solveLinear(2, -6); // 2x - 6 = 0
      expect(result).toEqual([3]);
    });

    it('should handle zero coefficient', () => {
      expect(() => AlgebraFormulas.solveLinear(0, 5)).toThrow();
    });
  });

  describe('Quadratic equations', () => {
    it('should solve quadratic with real roots', () => {
      const result = AlgebraFormulas.solveQuadratic(1, -5, 6); // x² - 5x + 6 = 0
      expect(result.solutions).toHaveLength(2);
      expect(result.solutions[0].real).toBeCloseTo(3);
      expect(result.solutions[1].real).toBeCloseTo(2);
      expect(result.discriminant).toBe(1);
    });

    it('should solve quadratic with complex roots', () => {
      const result = AlgebraFormulas.solveQuadratic(1, 0, 1); // x² + 1 = 0
      expect(result.solutions).toHaveLength(2);
      expect(result.solutions[0].real).toBeCloseTo(0);
      expect(result.solutions[0].imaginary).toBeCloseTo(1);
      expect(result.discriminant).toBe(-4);
    });
  });

  describe('Calculator formula integration', () => {
    it('should calculate quadratic equation through formula', () => {
      const inputs = {
        equationType: 'quadratic',
        coefficientA: 1,
        coefficientB: -5,
        coefficientC: 6,
        precision: 6
      };

      const result = algebraCalculatorFormula.calculate(inputs);
      expect(result.outputs.solutions).toContain('3');
      expect(result.outputs.solutions).toContain('2');
    });
  });
});
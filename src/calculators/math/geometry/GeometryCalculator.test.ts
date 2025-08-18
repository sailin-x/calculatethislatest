import { describe, it, expect } from 'vitest';
import { geometryCalculatorFormula, GeometryFormulas } from './formulas';

describe('GeometryCalculator', () => {
  describe('Triangle calculations', () => {
    it('should calculate right triangle properties', () => {
      const result = GeometryFormulas.calculateTriangle(3, 4, 5);
      expect(result.area).toBeCloseTo(6);
      expect(result.perimeter).toBeCloseTo(12);
      expect(result.type).toContain('Right');
    });
  });

  describe('Circle calculations', () => {
    it('should calculate circle properties', () => {
      const result = GeometryFormulas.calculateCircle(5);
      expect(result.area).toBeCloseTo(78.54, 1);
      expect(result.circumference).toBeCloseTo(31.42, 1);
    });
  });

  describe('Calculator formula integration', () => {
    it('should calculate triangle through formula', () => {
      const inputs = {
        calculationType: 'triangle',
        sideA: 3,
        sideB: 4,
        sideC: 5
      };

      const result = geometryCalculatorFormula.calculate(inputs);
      expect(result.outputs.area).toBe(6);
      expect(result.outputs.perimeter).toBe(12);
    });
  });
});
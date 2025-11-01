import { DividendDiscountModelCalculator } from './DividendDiscountModelCalculator';
import { calculateGordonGrowthModel, calculateTwoStageDDM, calculateDividendYield } from './formulas';
import { validateDividendDiscountModelInputs } from './validation';

describe('DividendDiscountModelCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(DividendDiscountModelCalculator.id).toBe('dividend-discount-model-calculator');
      expect(DividendDiscountModelCalculator.title).toBe('Dividend Discount Model Calculator');
      expect(DividendDiscountModelCalculator.category).toBe('finance');
      expect(DividendDiscountModelCalculator.subcategory).toBe('Valuation');
    });

    it('should have required inputs', () => {
      const requiredInputs = DividendDiscountModelCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(3);
      expect(requiredInputs.map(i => i.id)).toEqual(['currentDividend', 'expectedGrowthRate', 'discountRate']);
    });

    it('should have correct outputs', () => {
      expect(DividendDiscountModelCalculator.outputs).toHaveLength(4);
      expect(DividendDiscountModelCalculator.outputs.map(o => o.id)).toEqual([
        'intrinsicValue',
        'dividendYield',
        'growthRate',
        'discountRate'
      ]);
    });
  });

  describe('Formulas', () => {
    describe('calculateGordonGrowthModel', () => {
      it('should calculate intrinsic value correctly', () => {
        const result = calculateGordonGrowthModel(2.00, 0.03, 0.08);
        expect(result).toBeCloseTo(41.20, 2);
      });

      it('should throw error when discount rate <= growth rate', () => {
        expect(() => calculateGordonGrowthModel(2.00, 0.08, 0.08)).toThrow();
        expect(() => calculateGordonGrowthModel(2.00, 0.10, 0.08)).toThrow();
      });
    });

    describe('calculateTwoStageDDM', () => {
      it('should calculate two-stage model correctly', () => {
        const result = calculateTwoStageDDM(1.00, 0.10, 0.03, 0.12, 5);
        expect(result).toBeGreaterThan(0);
      });

      it('should throw error when discount rate <= terminal growth rate', () => {
        expect(() => calculateTwoStageDDM(1.00, 0.10, 0.03, 0.03, 5)).toThrow();
      });
    });

    describe('calculateDividendYield', () => {
      it('should calculate dividend yield correctly', () => {
        const result = calculateDividendYield(100, 5);
        expect(result).toBe(5);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs = {
        currentDividend: 2.00,
        expectedGrowthRate: 0.03,
        discountRate: 0.08
      };
      const errors = validateDividendDiscountModelInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should reject negative current dividend', () => {
      const inputs = {
        currentDividend: -1,
        expectedGrowthRate: 0.03,
        discountRate: 0.08
      };
      const errors = validateDividendDiscountModelInputs(inputs);
      expect(errors).toContainEqual({
        field: 'currentDividend',
        message: 'Current dividend must be greater than 0'
      });
    });

    it('should reject discount rate <= growth rate', () => {
      const inputs = {
        currentDividend: 2.00,
        expectedGrowthRate: 0.08,
        discountRate: 0.08
      };
      const errors = validateDividendDiscountModelInputs(inputs);
      expect(errors).toContainEqual({
        field: 'discountRate',
        message: 'Discount rate must be greater than growth rate for Gordon Growth Model'
      });
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(DividendDiscountModelCalculator.examples).toHaveLength(2);

      const stableStock = DividendDiscountModelCalculator.examples[0];
      expect(stableStock.title).toBe('Stable Dividend Stock');
      expect(stableStock.inputs.currentDividend).toBe(2.00);
      expect(stableStock.inputs.expectedGrowthRate).toBe(3);
      expect(stableStock.inputs.discountRate).toBe(8);
    });
  });
});
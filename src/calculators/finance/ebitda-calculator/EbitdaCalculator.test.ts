import { EbitdaCalculator } from './EbitdaCalculator';
import {
  calculateEBITDA,
  calculateEBITDAMargin,
  calculateAdjustedEBITDA,
  calculateEBITDAToRevenue
} from './formulas';
import { validateEbitdaCalculatorInputs } from './validation';

describe('EbitdaCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(EbitdaCalculator.id).toBe('ebitda-calculator');
      expect(EbitdaCalculator.title).toBe('EBITDA Calculator');
      expect(EbitdaCalculator.category).toBe('finance');
      expect(EbitdaCalculator.subcategory).toBe('Financial Analysis');
    });

    it('should have required inputs', () => {
      const requiredInputs = EbitdaCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(4);
      expect(requiredInputs.map(i => i.id)).toEqual(['revenue', 'operatingExpenses', 'depreciation', 'amortization']);
    });

    it('should have correct outputs', () => {
      expect(EbitdaCalculator.outputs).toHaveLength(4);
      expect(EbitdaCalculator.outputs.map(o => o.id)).toEqual([
        'ebitda',
        'ebitdaMargin',
        'adjustedEbitda',
        'ebitdaToRevenue'
      ]);
    });
  });

  describe('Formulas', () => {
    describe('calculateEBITDA', () => {
      it('should calculate EBITDA correctly', () => {
        const inputs = {
          revenue: 10000000,
          operatingExpenses: 6000000,
          depreciation: 1000000,
          amortization: 500000
        };
        const result = calculateEBITDA(inputs);
        expect(result).toBe(5500000);
      });

      it('should handle zero operating expenses', () => {
        const inputs = {
          revenue: 5000000,
          operatingExpenses: 0,
          depreciation: 1000000,
          amortization: 500000
        };
        const result = calculateEBITDA(inputs);
        expect(result).toBe(6500000);
      });
    });

    describe('calculateEBITDAMargin', () => {
      it('should calculate EBITDA margin correctly', () => {
        const result = calculateEBITDAMargin(4500000, 10000000);
        expect(result).toBe(45);
      });

      it('should return 0 for zero revenue', () => {
        const result = calculateEBITDAMargin(1000000, 0);
        expect(result).toBe(0);
      });
    });

    describe('calculateAdjustedEBITDA', () => {
      it('should calculate adjusted EBITDA correctly', () => {
        const result = calculateAdjustedEBITDA(4500000, 200000);
        expect(result).toBe(4700000);
      });
    });

    describe('calculateEBITDAToRevenue', () => {
      it('should calculate EBITDA to revenue ratio correctly', () => {
        const result = calculateEBITDAToRevenue(4500000, 10000000);
        expect(result).toBe(0.45);
      });

      it('should return 0 for zero revenue', () => {
        const result = calculateEBITDAToRevenue(1000000, 0);
        expect(result).toBe(0);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs = {
        revenue: 10000000,
        operatingExpenses: 6000000,
        depreciation: 1000000,
        amortization: 500000
      };
      const errors = validateEbitdaCalculatorInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should reject zero revenue', () => {
      const inputs = {
        revenue: 0,
        operatingExpenses: 6000000,
        depreciation: 1000000,
        amortization: 500000
      };
      const errors = validateEbitdaCalculatorInputs(inputs);
      expect(errors).toContainEqual({
        field: 'revenue',
        message: 'Revenue must be greater than 0'
      });
    });

    it('should reject negative operating expenses', () => {
      const inputs = {
        revenue: 10000000,
        operatingExpenses: -1000000,
        depreciation: 1000000,
        amortization: 500000
      };
      const errors = validateEbitdaCalculatorInputs(inputs);
      expect(errors).toContainEqual({
        field: 'operatingExpenses',
        message: 'Operating expenses cannot be negative'
      });
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(EbitdaCalculator.examples).toHaveLength(2);

      const techCompany = EbitdaCalculator.examples[0];
      expect(techCompany.title).toBe('Technology Company');
      expect(techCompany.inputs.revenue).toBe(10000000);
      expect(techCompany.inputs.operatingExpenses).toBe(6000000);
      expect(techCompany.inputs.depreciation).toBe(1000000);
      expect(techCompany.inputs.amortization).toBe(500000);
    });
  });
});

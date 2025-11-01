import { EconomicValueAddedCalculator } from './EconomicValueAddedCalculator';
import {
  calculateNOPAT,
  calculateCapitalCharge,
  calculateEVA,
  calculateEVAMargin,
  calculateCapitalProductivity
} from './formulas';
import { validateEconomicValueAddedInputs } from './validation';

describe('EconomicValueAddedCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(EconomicValueAddedCalculator.id).toBe('economic-value-added-calculator');
      expect(EconomicValueAddedCalculator.title).toBe('Economic Value Added Calculator');
      expect(EconomicValueAddedCalculator.category).toBe('finance');
      expect(EconomicValueAddedCalculator.subcategory).toBe('Performance Measurement');
    });

    it('should have required inputs', () => {
      const requiredInputs = EconomicValueAddedCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(4);
      expect(requiredInputs.map(i => i.id)).toEqual(['netOperatingProfitAfterTax', 'capitalEmployed', 'costOfCapital', 'taxRate']);
    });

    it('should have correct outputs', () => {
      expect(EconomicValueAddedCalculator.outputs).toHaveLength(6);
      expect(EconomicValueAddedCalculator.outputs.map(o => o.id)).toEqual([
        'economicValueAdded',
        'valueCreation',
        'performanceRating',
        'evaMargin',
        'capitalProductivity',
        'riskAdjustedEva'
      ]);
    });
  });

  describe('Formulas', () => {
    describe('calculateNOPAT', () => {
      it('should calculate NOPAT correctly', () => {
        const result = calculateNOPAT(2500000, 0.25);
        expect(result).toBe(1875000);
      });
    });

    describe('calculateCapitalCharge', () => {
      it('should calculate capital charge correctly', () => {
        const result = calculateCapitalCharge(0.10, 10000000);
        expect(result).toBe(1000000);
      });
    });

    describe('calculateEVA', () => {
      it('should calculate positive EVA correctly', () => {
        const result = calculateEVA(2000000, 1000000);
        expect(result).toBe(1000000);
      });

      it('should calculate negative EVA correctly', () => {
        const result = calculateEVA(800000, 1000000);
        expect(result).toBe(-200000);
      });
    });

    describe('calculateEVAMargin', () => {
      it('should calculate EVA margin correctly', () => {
        const result = calculateEVAMargin(1000000, 10000000);
        expect(result).toBe(10);
      });

      it('should return 0 for zero capital employed', () => {
        const result = calculateEVAMargin(1000000, 0);
        expect(result).toBe(0);
      });
    });

    describe('calculateCapitalProductivity', () => {
      it('should calculate capital productivity correctly', () => {
        const result = calculateCapitalProductivity(20000000, 10000000);
        expect(result).toBe(2);
      });

      it('should return 0 for zero capital employed', () => {
        const result = calculateCapitalProductivity(20000000, 0);
        expect(result).toBe(0);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs = {
        netOperatingProfitAfterTax: 2000000,
        capitalEmployed: 10000000,
        costOfCapital: 0.10,
        taxRate: 0.25
      };
      const errors = validateEconomicValueAddedInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should reject negative NOPAT', () => {
      const inputs = {
        netOperatingProfitAfterTax: -1000000,
        capitalEmployed: 10000000,
        costOfCapital: 0.10,
        taxRate: 0.25
      };
      const errors = validateEconomicValueAddedInputs(inputs);
      expect(errors).toContainEqual({
        field: 'netOperatingProfitAfterTax',
        message: 'NOPAT cannot be negative'
      });
    });

    it('should reject zero capital employed', () => {
      const inputs = {
        netOperatingProfitAfterTax: 2000000,
        capitalEmployed: 0,
        costOfCapital: 0.10,
        taxRate: 0.25
      };
      const errors = validateEconomicValueAddedInputs(inputs);
      expect(errors).toContainEqual({
        field: 'capitalEmployed',
        message: 'Capital employed must be greater than 0'
      });
    });

    it('should reject invalid cost of capital', () => {
      const inputs = {
        netOperatingProfitAfterTax: 2000000,
        capitalEmployed: 10000000,
        costOfCapital: 1.5, // 150%
        taxRate: 0.25
      };
      const errors = validateEconomicValueAddedInputs(inputs);
      expect(errors).toContainEqual({
        field: 'costOfCapital',
        message: 'Cost of capital must be between 0 and 100%'
      });
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(EconomicValueAddedCalculator.examples).toHaveLength(2);

      const valueCreating = EconomicValueAddedCalculator.examples[0];
      expect(valueCreating.title).toBe('Value-Creating Company');
      expect(valueCreating.inputs.netOperatingProfitAfterTax).toBe(2000000);
      expect(valueCreating.inputs.capitalEmployed).toBe(10000000);
      expect(valueCreating.inputs.costOfCapital).toBe(10);
      expect(valueCreating.inputs.taxRate).toBe(25);
    });
  });
});
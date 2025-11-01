import { DividendCalculator } from './DividendCalculator';
import {
  calculateDividendYield,
  calculateAnnualDividendIncome,
  calculateTotalDividendIncome,
  calculateDividendPayoutRatio,
  calculateDividendCoverageRatio
} from './formulas';
import { validateDividendCalculatorInputs } from './validation';

describe('DividendCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(DividendCalculator.id).toBe('dividend-calculator');
      expect(DividendCalculator.title).toBe('Dividend Calculator');
      expect(DividendCalculator.category).toBe('finance');
      expect(DividendCalculator.subcategory).toBe('Income Investing');
    });

    it('should have required inputs', () => {
      const requiredInputs = DividendCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(3);
      expect(requiredInputs.map(i => i.id)).toEqual(['stockPrice', 'annualDividend', 'dividendFrequency']);
    });

    it('should have correct outputs', () => {
      expect(DividendCalculator.outputs).toHaveLength(5);
      expect(DividendCalculator.outputs.map(o => o.id)).toEqual([
        'dividendYield',
        'annualDividendIncome',
        'totalDividendIncome',
        'dividendPayoutRatio',
        'dividendCoverageRatio'
      ]);
    });
  });

  describe('Formulas', () => {
    describe('calculateDividendYield', () => {
      it('should calculate dividend yield correctly', () => {
        const result = calculateDividendYield(50, 2);
        expect(result).toBe(4);
      });

      it('should return 0 for zero stock price', () => {
        const result = calculateDividendYield(0, 2);
        expect(result).toBe(0);
      });
    });

    describe('calculateAnnualDividendIncome', () => {
      it('should calculate annual income for quarterly dividends', () => {
        const result = calculateAnnualDividendIncome(2.00, 'quarterly');
        expect(result).toBe(2.00);
      });

      it('should calculate annual income for monthly dividends', () => {
        const result = calculateAnnualDividendIncome(1.00, 'monthly');
        expect(result).toBe(1.00);
      });
    });

    describe('calculateTotalDividendIncome', () => {
      it('should calculate total income over holding period', () => {
        const result = calculateTotalDividendIncome(2.00, 'quarterly', 5);
        expect(result).toBe(10.00);
      });
    });

    describe('calculateDividendPayoutRatio', () => {
      it('should calculate payout ratio correctly', () => {
        const result = calculateDividendPayoutRatio(2.00, 8.00);
        expect(result).toBe(25);
      });

      it('should return 0 for zero earnings per share', () => {
        const result = calculateDividendPayoutRatio(2.00, 0);
        expect(result).toBe(0);
      });
    });

    describe('calculateDividendCoverageRatio', () => {
      it('should calculate coverage ratio correctly', () => {
        const result = calculateDividendCoverageRatio(8.00, 2.00);
        expect(result).toBe(4);
      });

      it('should return 0 for zero dividend per share', () => {
        const result = calculateDividendCoverageRatio(8.00, 0);
        expect(result).toBe(0);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs = {
        stockPrice: 50.00,
        annualDividend: 2.00,
        dividendFrequency: 'quarterly' as const,
        holdingPeriod: 5
      };
      const errors = validateDividendCalculatorInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should reject zero stock price', () => {
      const inputs = {
        stockPrice: 0,
        annualDividend: 2.00,
        dividendFrequency: 'quarterly' as const
      };
      const errors = validateDividendCalculatorInputs(inputs);
      expect(errors).toContainEqual({
        field: 'stockPrice',
        message: 'Stock price must be greater than 0'
      });
    });

    it('should reject invalid dividend frequency', () => {
      const inputs = {
        stockPrice: 50.00,
        annualDividend: 2.00,
        dividendFrequency: 'invalid' as any
      };
      const errors = validateDividendCalculatorInputs(inputs);
      expect(errors).toContainEqual({
        field: 'dividendFrequency',
        message: 'Dividend frequency must be annual, semi-annual, quarterly, or monthly'
      });
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(DividendCalculator.examples).toHaveLength(2);

      const highYield = DividendCalculator.examples[0];
      expect(highYield.title).toBe('High-Yield Dividend Stock');
      expect(highYield.inputs.stockPrice).toBe(50.00);
      expect(highYield.inputs.annualDividend).toBe(2.00);
      expect(highYield.inputs.dividendFrequency).toBe('quarterly');
      expect(highYield.inputs.holdingPeriod).toBe(5);
    });
  });
});

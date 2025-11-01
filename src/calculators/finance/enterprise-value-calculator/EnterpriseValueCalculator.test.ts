import { EnterpriseValueCalculator } from './EnterpriseValueCalculator';
import {
  calculateEnterpriseValue,
  calculateNetDebt,
  calculateDebtToEquity,
  calculateCashToDebt
} from './formulas';
import { validateEnterpriseValueCalculatorInputs } from './validation';

describe('EnterpriseValueCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(EnterpriseValueCalculator.id).toBe('enterprise-value-calculator');
      expect(EnterpriseValueCalculator.title).toBe('Enterprise Value Calculator');
      expect(EnterpriseValueCalculator.category).toBe('finance');
      expect(EnterpriseValueCalculator.subcategory).toBe('Valuation');
    });

    it('should have required inputs', () => {
      const requiredInputs = EnterpriseValueCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(3);
      expect(requiredInputs.map(i => i.id)).toEqual(['marketCap', 'totalDebt', 'cashAndEquivalents']);
    });

    it('should have correct outputs', () => {
      expect(EnterpriseValueCalculator.outputs).toHaveLength(4);
      expect(EnterpriseValueCalculator.outputs.map(o => o.id)).toEqual([
        'enterpriseValue',
        'netDebt',
        'debtToEquity',
        'cashToDebt'
      ]);
    });
  });

  describe('Formulas', () => {
    describe('calculateEnterpriseValue', () => {
      it('should calculate enterprise value correctly', () => {
        const inputs = {
          marketCap: 50000000000,
          totalDebt: 10000000000,
          cashAndEquivalents: 15000000000,
          preferredStock: 0,
          minorityInterest: 0
        };
        const result = calculateEnterpriseValue(inputs);
        expect(result).toBe(45000000000);
      });

      it('should include preferred stock and minority interest', () => {
        const inputs = {
          marketCap: 20000000000,
          totalDebt: 15000000000,
          cashAndEquivalents: 3000000000,
          preferredStock: 1000000000,
          minorityInterest: 500000000
        };
        const result = calculateEnterpriseValue(inputs);
        expect(result).toBe(33500000000);
      });
    });

    describe('calculateNetDebt', () => {
      it('should calculate net debt correctly', () => {
        const result = calculateNetDebt(10000000000, 3000000000);
        expect(result).toBe(7000000000);
      });

      it('should handle negative net debt (net cash)', () => {
        const result = calculateNetDebt(10000000000, 15000000000);
        expect(result).toBe(-5000000000);
      });
    });

    describe('calculateDebtToEquity', () => {
      it('should calculate debt-to-equity ratio correctly', () => {
        const result = calculateDebtToEquity(10000000000, 50000000000);
        expect(result).toBe(0.2);
      });

      it('should return 0 for zero market cap', () => {
        const result = calculateDebtToEquity(10000000000, 0);
        expect(result).toBe(0);
      });
    });

    describe('calculateCashToDebt', () => {
      it('should calculate cash-to-debt ratio correctly', () => {
        const result = calculateCashToDebt(3000000000, 10000000000);
        expect(result).toBe(0.3);
      });

      it('should return 0 for zero debt', () => {
        const result = calculateCashToDebt(3000000000, 0);
        expect(result).toBe(0);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs = {
        marketCap: 50000000000,
        totalDebt: 10000000000,
        cashAndEquivalents: 15000000000
      };
      const errors = validateEnterpriseValueCalculatorInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should reject zero market cap', () => {
      const inputs = {
        marketCap: 0,
        totalDebt: 10000000000,
        cashAndEquivalents: 15000000000
      };
      const errors = validateEnterpriseValueCalculatorInputs(inputs);
      expect(errors).toContainEqual({
        field: 'marketCap',
        message: 'Market capitalization must be greater than 0'
      });
    });

    it('should reject negative total debt', () => {
      const inputs = {
        marketCap: 50000000000,
        totalDebt: -1000000000,
        cashAndEquivalents: 15000000000
      };
      const errors = validateEnterpriseValueCalculatorInputs(inputs);
      expect(errors).toContainEqual({
        field: 'totalDebt',
        message: 'Total debt cannot be negative'
      });
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(EnterpriseValueCalculator.examples).toHaveLength(2);

      const techCompany = EnterpriseValueCalculator.examples[0];
      expect(techCompany.title).toBe('Technology Company');
      expect(techCompany.inputs.marketCap).toBe(50000000000);
      expect(techCompany.inputs.totalDebt).toBe(10000000000);
      expect(techCompany.inputs.cashAndEquivalents).toBe(15000000000);
    });
  });
});

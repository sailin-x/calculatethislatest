import { NetOperatingIncomeCalculator } from './NetOperatingIncomeCalculator';
import {
  calculateGrossOperatingIncome,
  calculateEffectiveGrossIncome,
  calculateTotalOperatingExpenses,
  calculateNetOperatingIncome,
  calculateOperatingExpenseRatio,
  calculateNetIncomeRatio
} from './formulas';
import { validateNetOperatingIncomeInputs } from './validation';

describe('NetOperatingIncomeCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(NetOperatingIncomeCalculator.id).toBe('net-operating-income-calculator');
      expect(NetOperatingIncomeCalculator.title).toBe('Net Operating Income (NOI) Calculator');
      expect(NetOperatingIncomeCalculator.category).toBe('finance');
      expect(NetOperatingIncomeCalculator.subcategory).toBe('Real Estate Investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = NetOperatingIncomeCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(14); // All income and expense fields plus analysis period
      expect(requiredInputs.map(i => i.id)).toEqual([
        'rentalIncome', 'otherIncome', 'propertyManagement', 'maintenance',
        'repairs', 'utilities', 'insurance', 'propertyTaxes', 'legalFees',
        'advertising', 'supplies', 'otherExpenses', 'analysisPeriod'
      ]);
    });

    it('should have correct outputs', () => {
      expect(NetOperatingIncomeCalculator.outputs).toHaveLength(7);
      expect(NetOperatingIncomeCalculator.outputs.map(o => o.id)).toEqual([
        'grossOperatingIncome',
        'effectiveGrossIncome',
        'totalOperatingExpenses',
        'netOperatingIncome',
        'operatingExpenseRatio',
        'netIncomeRatio',
        'breakEvenRatio'
      ]);
    });
  });

  describe('Formulas', () => {
    describe('calculateGrossOperatingIncome', () => {
      it('should calculate gross operating income correctly', () => {
        const result = calculateGrossOperatingIncome(120000, 5000);
        expect(result).toBe(125000);
      });
    });

    describe('calculateEffectiveGrossIncome', () => {
      it('should calculate effective gross income with vacancy allowance', () => {
        const result = calculateEffectiveGrossIncome(125000, true, 5);
        expect(result).toBe(118750);
      });

      it('should return gross income when vacancy allowance is disabled', () => {
        const result = calculateEffectiveGrossIncome(125000, false, 5);
        expect(result).toBe(125000);
      });
    });

    describe('calculateTotalOperatingExpenses', () => {
      it('should calculate total operating expenses correctly', () => {
        const inputs = {
          rentalIncome: 120000,
          otherIncome: 5000,
          propertyManagement: 12000,
          maintenance: 8000,
          repairs: 6000,
          utilities: 0,
          insurance: 4000,
          propertyTaxes: 15000,
          legalFees: 2000,
          advertising: 1000,
          supplies: 500,
          otherExpenses: 1000,
          includeVacancyAllowance: true,
          vacancyRate: 5,
          includeReplacementReserve: true,
          replacementReserveRate: 2,
          analysisPeriod: 'annual' as const
        };
        const result = calculateTotalOperatingExpenses(inputs);
        expect(result).toBeCloseTo(39750, 0);
      });
    });

    describe('calculateNetOperatingIncome', () => {
      it('should calculate NOI correctly', () => {
        const result = calculateNetOperatingIncome(118750, 39750);
        expect(result).toBe(79000);
      });
    });

    describe('calculateOperatingExpenseRatio', () => {
      it('should calculate operating expense ratio correctly', () => {
        const result = calculateOperatingExpenseRatio(39750, 118750);
        expect(result).toBeCloseTo(33.47, 2);
      });

      it('should return 0 for zero effective gross income', () => {
        const result = calculateOperatingExpenseRatio(39750, 0);
        expect(result).toBe(0);
      });
    });

    describe('calculateNetIncomeRatio', () => {
      it('should calculate net income ratio correctly', () => {
        const result = calculateNetIncomeRatio(79000, 118750);
        expect(result).toBeCloseTo(66.53, 2);
      });

      it('should return 0 for zero effective gross income', () => {
        const result = calculateNetIncomeRatio(79000, 0);
        expect(result).toBe(0);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs = {
        rentalIncome: 120000,
        otherIncome: 5000,
        propertyManagement: 12000,
        maintenance: 8000,
        repairs: 6000,
        utilities: 0,
        insurance: 4000,
        propertyTaxes: 15000,
        legalFees: 2000,
        advertising: 1000,
        supplies: 500,
        otherExpenses: 1000,
        includeVacancyAllowance: true,
        vacancyRate: 5,
        includeReplacementReserve: true,
        replacementReserveRate: 2,
        analysisPeriod: 'annual' as const
      };
      const errors = validateNetOperatingIncomeInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should reject negative rental income', () => {
      const inputs = {
        rentalIncome: -1000,
        otherIncome: 5000,
        propertyManagement: 12000,
        maintenance: 8000,
        repairs: 6000,
        utilities: 0,
        insurance: 4000,
        propertyTaxes: 15000,
        legalFees: 2000,
        advertising: 1000,
        supplies: 500,
        otherExpenses: 1000,
        includeVacancyAllowance: true,
        vacancyRate: 5,
        includeReplacementReserve: true,
        replacementReserveRate: 2,
        analysisPeriod: 'annual' as const
      };
      const errors = validateNetOperatingIncomeInputs(inputs);
      expect(errors).toContainEqual({
        field: 'rentalIncome',
        message: 'Rental income cannot be negative'
      });
    });

    it('should reject invalid vacancy rate', () => {
      const inputs = {
        rentalIncome: 120000,
        otherIncome: 5000,
        propertyManagement: 12000,
        maintenance: 8000,
        repairs: 6000,
        utilities: 0,
        insurance: 4000,
        propertyTaxes: 15000,
        legalFees: 2000,
        advertising: 1000,
        supplies: 500,
        otherExpenses: 1000,
        includeVacancyAllowance: true,
        vacancyRate: 150, // Invalid - over 100%
        includeReplacementReserve: true,
        replacementReserveRate: 2,
        analysisPeriod: 'annual' as const
      };
      const errors = validateNetOperatingIncomeInputs(inputs);
      expect(errors).toContainEqual({
        field: 'vacancyRate',
        message: 'Vacancy rate must be between 0% and 100%'
      });
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(NetOperatingIncomeCalculator.examples).toHaveLength(2);

      const multiFamily = NetOperatingIncomeCalculator.examples[0];
      expect(multiFamily.title).toBe('Multi-Family Investment Property');
      expect(multiFamily.inputs.rentalIncome).toBe(120000);
      expect(multiFamily.inputs.otherIncome).toBe(5000);
      expect(multiFamily.expectedOutputs.netOperatingIncome).toBe(79000);
    });
  });
});
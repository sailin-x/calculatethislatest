import { describe, it, expect } from 'vitest';
import { calculateNetOperatingIncome, calculateExpenseBreakdown, calculateNOIPerSquareFoot, calculateNOIPerUnit, calculateCapRate, calculateDSCR } from './formulas';
import { validateNetOperatingIncomeInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';
import { netOperatingIncomeCalculator } from './NetOperatingIncomeCalculator';

describe('Net Operating Income Calculator', () => {
  describe('calculateNetOperatingIncome', () => {
    it('should calculate NOI correctly with basic inputs', () => {
      const inputs = {
        grossRentalIncome: 120000,
        vacancyLoss: 5,
        propertyTaxes: 8000,
        insurance: 3000,
        utilities: 6000,
        maintenance: 4000
      };

      const result = calculateNetOperatingIncome(inputs);

      expect(result.grossIncome).toBe(120000);
      expect(result.effectiveGrossIncome).toBe(114000); // 120000 - (120000 * 0.05)
      expect(result.totalOperatingExpenses).toBe(21000); // 8000 + 3000 + 6000 + 4000
      expect(result.netOperatingIncome).toBe(93000); // 114000 - 21000
      expect(result.operatingExpenseRatio).toBeCloseTo(18.42, 1); // (21000 / 114000) * 100
      expect(result.netIncomeRatio).toBeCloseTo(81.58, 1); // (93000 / 114000) * 100
      expect(result.analysis).toContain('Net Operating Income (NOI) Analysis');
    });

    it('should calculate NOI with all optional inputs', () => {
      const inputs = {
        grossRentalIncome: 200000,
        otherIncome: 10000,
        vacancyLoss: 3,
        propertyManagementFee: 8,
        propertyTaxes: 15000,
        insurance: 5000,
        utilities: 12000,
        maintenance: 8000,
        landscaping: 2000,
        cleaning: 3000,
        advertising: 1000,
        legalFees: 1500,
        accountingFees: 800,
        hoaFees: 4000,
        trashRemoval: 600,
        security: 1200,
        otherExpenses: 500
      };

      const result = calculateNetOperatingIncome(inputs);

      expect(result.grossIncome).toBe(210000); // 200000 + 10000
      expect(result.effectiveGrossIncome).toBe(203700); // 210000 - (200000 * 0.03)
      expect(result.totalOperatingExpenses).toBeGreaterThan(0);
      expect(result.netOperatingIncome).toBeGreaterThan(0);
      expect(result.operatingExpenseRatio).toBeGreaterThan(0);
      expect(result.netIncomeRatio).toBeGreaterThan(0);
    });

    it('should handle zero vacancy loss', () => {
      const inputs = {
        grossRentalIncome: 100000,
        vacancyLoss: 0,
        propertyTaxes: 5000,
        insurance: 2000,
        utilities: 4000,
        maintenance: 3000
      };

      const result = calculateNetOperatingIncome(inputs);

      expect(result.effectiveGrossIncome).toBe(100000);
      expect(result.netOperatingIncome).toBe(86000); // 100000 - 14000
    });

    it('should handle high vacancy loss', () => {
      const inputs = {
        grossRentalIncome: 100000,
        vacancyLoss: 20,
        propertyTaxes: 5000,
        insurance: 2000,
        utilities: 4000,
        maintenance: 3000
      };

      const result = calculateNetOperatingIncome(inputs);

      expect(result.effectiveGrossIncome).toBe(80000); // 100000 - (100000 * 0.20)
      expect(result.netOperatingIncome).toBe(66000); // 80000 - 14000
    });
  });

  describe('calculateExpenseBreakdown', () => {
    it('should calculate expense breakdown correctly', () => {
      const inputs = {
        grossRentalIncome: 100000,
        vacancyLoss: 5,
        propertyTaxes: 8000,
        insurance: 3000,
        utilities: 6000,
        maintenance: 4000
      };

      const breakdown = calculateExpenseBreakdown(inputs);

      expect(breakdown).toHaveLength(4);
      expect(breakdown[0].category).toBe('Property Taxes');
      expect(breakdown[0].amount).toBe(8000);
      expect(breakdown[0].percentage).toBeGreaterThan(0);
    });

    it('should sort expenses by amount in descending order', () => {
      const inputs = {
        grossRentalIncome: 100000,
        vacancyLoss: 5,
        propertyTaxes: 5000,
        insurance: 8000,
        utilities: 3000,
        maintenance: 6000
      };

      const breakdown = calculateExpenseBreakdown(inputs);

      expect(breakdown[0].amount).toBe(8000); // Insurance
      expect(breakdown[1].amount).toBe(6000); // Maintenance
      expect(breakdown[2].amount).toBe(5000); // Property Taxes
      expect(breakdown[3].amount).toBe(3000); // Utilities
    });
  });

  describe('Additional calculation functions', () => {
    it('should calculate NOI per square foot', () => {
      const noi = 50000;
      const squareFootage = 5000;
      const result = calculateNOIPerSquareFoot(noi, squareFootage);
      expect(result).toBe(10); // 50000 / 5000
    });

    it('should calculate NOI per unit', () => {
      const noi = 60000;
      const units = 4;
      const result = calculateNOIPerUnit(noi, units);
      expect(result).toBe(15000); // 60000 / 4
    });

    it('should calculate cap rate', () => {
      const noi = 50000;
      const propertyValue = 1000000;
      const result = calculateCapRate(noi, propertyValue);
      expect(result).toBe(5); // (50000 / 1000000) * 100
    });

    it('should calculate DSCR', () => {
      const noi = 60000;
      const annualDebtService = 40000;
      const result = calculateDSCR(noi, annualDebtService);
      expect(result).toBe(1.5); // 60000 / 40000
    });
  });

  describe('validateNetOperatingIncomeInputs', () => {
    it('should validate required fields', () => {
      const inputs = {
        grossRentalIncome: undefined,
        vacancyLoss: 5,
        propertyTaxes: 8000,
        insurance: 3000,
        utilities: 6000,
        maintenance: 4000
      };

      const errors = validateNetOperatingIncomeInputs(inputs);
      expect(errors).toContain('Gross Rental Income is required');
    });

    it('should validate range constraints', () => {
      const inputs = {
        grossRentalIncome: 120000,
        vacancyLoss: 150, // Invalid: > 100%
        propertyTaxes: 8000,
        insurance: 3000,
        utilities: 6000,
        maintenance: 4000
      };

      const errors = validateNetOperatingIncomeInputs(inputs);
      expect(errors).toContain('Vacancy Loss must be between 0% and 100%');
    });

    it('should validate business logic', () => {
      const inputs = {
        grossRentalIncome: 100000,
        vacancyLoss: 95, // Would make effective gross income negative
        propertyTaxes: 8000,
        insurance: 3000,
        utilities: 6000,
        maintenance: 4000
      };

      const errors = validateNetOperatingIncomeInputs(inputs);
      expect(errors).toContain('Effective Gross Income would be zero or negative with current vacancy loss');
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        grossRentalIncome: 120000,
        vacancyLoss: 5,
        propertyTaxes: 8000,
        insurance: 3000,
        utilities: 6000,
        maintenance: 4000
      };

      const errors = validateNetOperatingIncomeInputs(inputs);
      expect(errors).toHaveLength(0);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs and return results', () => {
      const inputs = {
        grossRentalIncome: 120000,
        vacancyLoss: 5,
        propertyTaxes: 8000,
        insurance: 3000,
        utilities: 6000,
        maintenance: 4000
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(17); // All input fields
      expect(results.every(result => result.isValid)).toBe(true);
    });

    it('should detect invalid inputs', () => {
      const inputs = {
        grossRentalIncome: -1000, // Invalid
        vacancyLoss: 5,
        propertyTaxes: 8000,
        insurance: 3000,
        utilities: 6000,
        maintenance: 4000
      };

      const results = quickValidateAllInputs(inputs);
      const grossRentalIncomeResult = results[0];
      expect(grossRentalIncomeResult.isValid).toBe(false);
      expect(grossRentalIncomeResult.message).toContain('must be non-negative');
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct structure', () => {
      expect(netOperatingIncomeCalculator.id).toBe('net-operating-income');
      expect(netOperatingIncomeCalculator.title).toBe('Net Operating Income (NOI) Calculator');
      expect(netOperatingIncomeCalculator.category).toBe('finance');
      expect(netOperatingIncomeCalculator.subcategory).toBe('real-estate');
      expect(netOperatingIncomeCalculator.inputs).toHaveLength(17);
      expect(netOperatingIncomeCalculator.outputs).toHaveLength(7);
      expect(netOperatingIncomeCalculator.formulas).toHaveLength(1);
      expect(netOperatingIncomeCalculator.validationRules).toBeDefined();
      expect(netOperatingIncomeCalculator.examples).toHaveLength(3);
    });

    it('should have required inputs', () => {
      const requiredInputs = netOperatingIncomeCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(6); // grossRentalIncome, vacancyLoss, propertyTaxes, insurance, utilities, maintenance
    });

    it('should have correct output structure', () => {
      const outputs = netOperatingIncomeCalculator.outputs;
      expect(outputs.find(o => o.id === 'grossIncome')).toBeDefined();
      expect(outputs.find(o => o.id === 'effectiveGrossIncome')).toBeDefined();
      expect(outputs.find(o => o.id === 'totalOperatingExpenses')).toBeDefined();
      expect(outputs.find(o => o.id === 'netOperatingIncome')).toBeDefined();
      expect(outputs.find(o => o.id === 'operatingExpenseRatio')).toBeDefined();
      expect(outputs.find(o => o.id === 'netIncomeRatio')).toBeDefined();
      expect(outputs.find(o => o.id === 'analysis')).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator examples', () => {
      const example = netOperatingIncomeCalculator.examples[0];
      const result = calculateNetOperatingIncome(example.inputs);

      expect(result.grossIncome).toBeGreaterThan(0);
      expect(result.effectiveGrossIncome).toBeGreaterThan(0);
      expect(result.totalOperatingExpenses).toBeGreaterThan(0);
      expect(result.netOperatingIncome).toBeDefined();
      expect(result.operatingExpenseRatio).toBeGreaterThan(0);
      expect(result.netIncomeRatio).toBeGreaterThan(0);
      expect(result.analysis).toContain('Net Operating Income (NOI) Analysis');
    });

    it('should validate calculator examples', () => {
      netOperatingIncomeCalculator.examples.forEach(example => {
        const errors = validateNetOperatingIncomeInputs(example.inputs);
        expect(errors).toHaveLength(0);
      });
    });

    it('should pass quick validation for all examples', () => {
      netOperatingIncomeCalculator.examples.forEach(example => {
        const results = quickValidateAllInputs(example.inputs);
        const hasErrors = results.some(result => !result.isValid);
        expect(hasErrors).toBe(false);
      });
    });
  });
});
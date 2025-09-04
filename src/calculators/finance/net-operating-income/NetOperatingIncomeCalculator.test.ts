import { describe, it, expect } from 'vitest';
import { netOperatingIncomeCalculator } from './NetOperatingIncomeCalculator';
import { netOperatingIncomeFormulas } from './formulas';
import { netOperatingIncomeValidationRules } from './validation';

describe('Net Operating Income (NOI) Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have required properties', () => {
      expect(netOperatingIncomeCalculator.id).toBe('net-operating-income');
      expect(netOperatingIncomeCalculator.title).toBe('Net Operating Income (NOI) Calculator');
      expect(netOperatingIncomeCalculator.category).toBe('finance');
      expect(netOperatingIncomeCalculator.subcategory).toBe('real-estate');
      expect(netOperatingIncomeCalculator.description).toBeTruthy();
      expect(netOperatingIncomeCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(netOperatingIncomeCalculator.inputs).toBeInstanceOf(Array);
      expect(netOperatingIncomeCalculator.outputs).toBeInstanceOf(Array);
      expect(netOperatingIncomeCalculator.formulas).toBeInstanceOf(Array);
      expect(netOperatingIncomeCalculator.validationRules).toBeInstanceOf(Array);
      expect(netOperatingIncomeCalculator.examples).toBeInstanceOf(Array);
    });

    it('should have correct number of inputs', () => {
      expect(netOperatingIncomeCalculator.inputs).toHaveLength(15);
    });

    it('should have correct number of outputs', () => {
      expect(netOperatingIncomeCalculator.outputs).toHaveLength(10);
    });

    it('should have required inputs', () => {
      const requiredInputs = netOperatingIncomeCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(6);
    });

    it('should have formulas', () => {
      expect(netOperatingIncomeCalculator.formulas).toHaveLength(1);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const requiredRule = netOperatingIncomeValidationRules.find(r => r.type === 'required' && r.field === 'baseRent');
      expect(requiredRule).toBeDefined();
      expect(requiredRule?.validator(5000, {})).toBe(true);
      expect(requiredRule?.validator(null, {})).toBe(false);
      expect(requiredRule?.validator(undefined, {})).toBe(false);
    });

    it('should validate range constraints', () => {
      const rangeRule = netOperatingIncomeValidationRules.find(r => r.type === 'range' && r.field === 'baseRent');
      expect(rangeRule).toBeDefined();
      expect(rangeRule?.validator(5000, {})).toBe(true);
      expect(rangeRule?.validator(50, {})).toBe(false);
      expect(rangeRule?.validator(150000, {})).toBe(false);
    });

    it('should validate business rules', () => {
      const businessRule = netOperatingIncomeValidationRules.find(r => r.type === 'business' && r.field === 'vacancyRate');
      expect(businessRule).toBeDefined();
      expect(businessRule?.validator(5, {})).toBe(true);
      expect(businessRule?.validator(1, {})).toBe(false);
      expect(businessRule?.validator(20, {})).toBe(false);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate gross income', () => {
      const formula = netOperatingIncomeFormulas.find(f => f.id === 'gross-income-calculation');
      expect(formula).toBeDefined();

      const inputs = {
        baseRent: 5000,
        additionalIncome: 300
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.grossIncome).toBe(5300);
      expect(result.explanation).toBeTruthy();
    });

    it('should calculate effective gross income', () => {
      const formula = netOperatingIncomeFormulas.find(f => f.id === 'effective-gross-income-calculation');
      expect(formula).toBeDefined();

      const inputs = {
        baseRent: 5000,
        additionalIncome: 300,
        vacancyRate: 5
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.effectiveGrossIncome).toBe(5035);
      expect(result.outputs.vacancyLoss).toBe(265);
      expect(result.explanation).toBeTruthy();
    });

    it('should calculate operating expenses', () => {
      const formula = netOperatingIncomeFormulas.find(f => f.id === 'operating-expenses-calculation');
      expect(formula).toBeDefined();

      const inputs = {
        baseRent: 5000,
        additionalIncome: 300,
        vacancyRate: 5,
        propertyManagementFee: 8,
        maintenanceCosts: 400,
        propertyTaxes: 7200,
        propertyInsurance: 3000,
        utilities: 200,
        hoaFees: 0,
        legalFees: 0,
        accountingFees: 150,
        advertisingCosts: 75,
        otherExpenses: 0
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.totalOperatingExpenses).toBeGreaterThan(0);
      expect(result.explanation).toBeTruthy();
    });

    it('should calculate NOI', () => {
      const formula = netOperatingIncomeFormulas.find(f => f.id === 'noi-calculation');
      expect(formula).toBeDefined();

      const inputs = {
        baseRent: 5000,
        additionalIncome: 300,
        vacancyRate: 5,
        propertyManagementFee: 8,
        maintenanceCosts: 400,
        propertyTaxes: 7200,
        propertyInsurance: 3000,
        utilities: 200,
        hoaFees: 0,
        legalFees: 0,
        accountingFees: 150,
        advertisingCosts: 75,
        otherExpenses: 0
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.netOperatingIncome).toBeDefined();
      expect(result.explanation).toBeTruthy();
    });

    it('should calculate financial metrics', () => {
      const formula = netOperatingIncomeFormulas.find(f => f.id === 'financial-metrics-calculation');
      expect(formula).toBeDefined();

      const inputs = {
        baseRent: 5000,
        additionalIncome: 300,
        vacancyRate: 5,
        propertyManagementFee: 8,
        maintenanceCosts: 400,
        propertyTaxes: 7200,
        propertyInsurance: 3000,
        utilities: 200,
        hoaFees: 0,
        legalFees: 0,
        accountingFees: 150,
        advertisingCosts: 75,
        otherExpenses: 0,
        propertyValue: 500000
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.operatingExpenseRatio).toBeGreaterThan(0);
      expect(result.outputs.profitMargin).toBeGreaterThan(0);
      expect(result.outputs.capRate).toBeGreaterThan(0);
      expect(result.explanation).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero additional income', () => {
      const formula = netOperatingIncomeFormulas.find(f => f.id === 'gross-income-calculation');
      const inputs = {
        baseRent: 5000,
        additionalIncome: 0
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.grossIncome).toBe(5000);
    });

    it('should handle zero vacancy rate', () => {
      const formula = netOperatingIncomeFormulas.find(f => f.id === 'effective-gross-income-calculation');
      const inputs = {
        baseRent: 5000,
        additionalIncome: 300,
        vacancyRate: 0
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.effectiveGrossIncome).toBe(5300);
      expect(result.outputs.vacancyLoss).toBe(0);
    });

    it('should handle missing inputs gracefully', () => {
      const formula = netOperatingIncomeFormulas.find(f => f.id === 'gross-income-calculation');
      const inputs = {};

      const result = formula!.calculate(inputs);
      expect(result.outputs.grossIncome).toBe(0);
    });
  });

  describe('Examples', () => {
    it('should have valid example inputs', () => {
      const example = netOperatingIncomeCalculator.examples[0];
      expect(example.title).toBeTruthy();
      expect(example.description).toBeTruthy();
      expect(example.inputs).toBeInstanceOf(Object);
      expect(example.expectedOutputs).toBeInstanceOf(Object);
    });

    it('should validate example calculations', () => {
      const example = netOperatingIncomeCalculator.examples[0];
      const result = netOperatingIncomeCalculator.formulas[0].calculate(example.inputs);
      
      expect(result.outputs).toBeDefined();
      expect(result.explanation).toBeTruthy();
    });
  });

  describe('Formulas Module', () => {
    it('should export all required formulas', () => {
      expect(netOperatingIncomeFormulas).toHaveLength(5);
      expect(netOperatingIncomeFormulas.find(f => f.id === 'gross-income-calculation')).toBeDefined();
      expect(netOperatingIncomeFormulas.find(f => f.id === 'effective-gross-income-calculation')).toBeDefined();
      expect(netOperatingIncomeFormulas.find(f => f.id === 'operating-expenses-calculation')).toBeDefined();
      expect(netOperatingIncomeFormulas.find(f => f.id === 'noi-calculation')).toBeDefined();
      expect(netOperatingIncomeFormulas.find(f => f.id === 'financial-metrics-calculation')).toBeDefined();
    });
  });

  describe('Validation Module', () => {
    it('should export all required validation rules', () => {
      expect(netOperatingIncomeValidationRules).toHaveLength(25);
      
      const requiredRules = netOperatingIncomeValidationRules.filter(r => r.type === 'required');
      const rangeRules = netOperatingIncomeValidationRules.filter(r => r.type === 'range');
      const businessRules = netOperatingIncomeValidationRules.filter(r => r.type === 'business');
      
      expect(requiredRules).toHaveLength(6);
      expect(rangeRules).toHaveLength(15);
      expect(businessRules).toHaveLength(4);
    });
  });
});
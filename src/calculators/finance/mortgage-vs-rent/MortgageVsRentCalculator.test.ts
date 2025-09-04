import { describe, it, expect } from 'vitest';
import { mortgageVsRentCalculator } from './MortgageVsRentCalculator';
import { mortgageVsRentFormulas } from './formulas';
import { mortgageVsRentValidationRules } from './validation';

describe('Mortgage vs. Rent Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have required properties', () => {
      expect(mortgageVsRentCalculator.id).toBe('mortgage-vs-rent');
      expect(mortgageVsRentCalculator.title).toBe('Mortgage vs. Rent Calculator');
      expect(mortgageVsRentCalculator.category).toBe('finance');
      expect(mortgageVsRentCalculator.subcategory).toBe('mortgage');
      expect(mortgageVsRentCalculator.description).toBeTruthy();
      expect(mortgageVsRentCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(mortgageVsRentCalculator.inputs).toBeInstanceOf(Array);
      expect(mortgageVsRentCalculator.outputs).toBeInstanceOf(Array);
      expect(mortgageVsRentCalculator.formulas).toBeInstanceOf(Array);
      expect(mortgageVsRentCalculator.validationRules).toBeInstanceOf(Array);
      expect(mortgageVsRentCalculator.examples).toBeInstanceOf(Array);
    });

    it('should have correct number of inputs', () => {
      expect(mortgageVsRentCalculator.inputs).toHaveLength(18);
    });

    it('should have correct number of outputs', () => {
      expect(mortgageVsRentCalculator.outputs).toHaveLength(10);
    });

    it('should have required inputs', () => {
      const requiredInputs = mortgageVsRentCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(15);
    });

    it('should have formulas', () => {
      expect(mortgageVsRentCalculator.formulas).toHaveLength(1);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const requiredRule = mortgageVsRentValidationRules.find(r => r.type === 'required' && r.field === 'currentRent');
      expect(requiredRule).toBeDefined();
      expect(requiredRule?.validator(1500, {})).toBe(true);
      expect(requiredRule?.validator(null, {})).toBe(false);
      expect(requiredRule?.validator(undefined, {})).toBe(false);
    });

    it('should validate range constraints', () => {
      const rangeRule = mortgageVsRentValidationRules.find(r => r.type === 'range' && r.field === 'currentRent');
      expect(rangeRule).toBeDefined();
      expect(rangeRule?.validator(1500, {})).toBe(true);
      expect(rangeRule?.validator(50, {})).toBe(false);
      expect(rangeRule?.validator(60000, {})).toBe(false);
    });

    it('should validate business rules', () => {
      const businessRule = mortgageVsRentValidationRules.find(r => r.type === 'business' && r.field === 'downPayment');
      expect(businessRule).toBeDefined();
      expect(businessRule?.validator(60000, { homePrice: 300000 })).toBe(true);
      expect(businessRule?.validator(40000, { homePrice: 300000 })).toBe(false);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate rent cost over time', () => {
      const formula = mortgageVsRentFormulas.find(f => f.id === 'rent-cost-calculation');
      expect(formula).toBeDefined();

      const inputs = {
        currentRent: 1500,
        rentIncreaseRate: 3,
        timeHorizon: 5
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.totalRentCost).toBeGreaterThan(1500 * 12 * 5);
      expect(result.explanation).toBeTruthy();
    });

    it('should calculate mortgage payment', () => {
      const formula = mortgageVsRentFormulas.find(f => f.id === 'mortgage-payment-calculation');
      expect(formula).toBeDefined();

      const inputs = {
        loanAmount: 240000,
        interestRate: 4.5,
        loanTerm: 30
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.monthlyPayment).toBeGreaterThan(0);
      expect(result.outputs.totalPayments).toBe(360);
      expect(result.explanation).toBeTruthy();
    });

    it('should calculate homeownership costs', () => {
      const formula = mortgageVsRentFormulas.find(f => f.id === 'homeownership-cost-calculation');
      expect(formula).toBeDefined();

      const inputs = {
        homePrice: 300000,
        propertyTaxRate: 1.2,
        homeownersInsuranceRate: 0.5,
        maintenanceRate: 1.0,
        hoaFees: 0,
        monthlyPayment: 1200
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.totalMonthlyCost).toBeGreaterThan(1200);
      expect(result.explanation).toBeTruthy();
    });

    it('should calculate break-even analysis', () => {
      const formula = mortgageVsRentFormulas.find(f => f.id === 'break-even-analysis');
      expect(formula).toBeDefined();

      const inputs = {
        currentRent: 1500,
        rentIncreaseRate: 3,
        monthlyHomeownershipCost: 2000,
        downPayment: 60000,
        closingCosts: 9000
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.breakEvenYears).toBeGreaterThan(0);
      expect(result.explanation).toBeTruthy();
    });

    it('should calculate net worth comparison', () => {
      const formula = mortgageVsRentFormulas.find(f => f.id === 'net-worth-comparison');
      expect(formula).toBeDefined();

      const inputs = {
        totalRentCost: 180000,
        totalHomeownershipCost: 200000,
        downPayment: 60000,
        investmentReturnRate: 7,
        timeHorizon: 10,
        homePrice: 300000,
        homeAppreciationRate: 3,
        remainingLoanBalance: 200000,
        totalTaxBenefits: 15000
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.netWorthDifference).toBeDefined();
      expect(result.explanation).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest rates', () => {
      const formula = mortgageVsRentFormulas.find(f => f.id === 'mortgage-payment-calculation');
      const inputs = {
        loanAmount: 240000,
        interestRate: 0,
        loanTerm: 30
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.monthlyPayment).toBe(240000 / (30 * 12));
    });

    it('should handle missing inputs gracefully', () => {
      const formula = mortgageVsRentFormulas.find(f => f.id === 'rent-cost-calculation');
      const inputs = {};

      const result = formula!.calculate(inputs);
      expect(result.outputs.totalRentCost).toBe(0);
    });

    it('should handle very high rent increases', () => {
      const formula = mortgageVsRentFormulas.find(f => f.id === 'rent-cost-calculation');
      const inputs = {
        currentRent: 1500,
        rentIncreaseRate: 15,
        timeHorizon: 5
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.totalRentCost).toBeGreaterThan(1500 * 12 * 5);
    });
  });

  describe('Examples', () => {
    it('should have valid example inputs', () => {
      const example = mortgageVsRentCalculator.examples[0];
      expect(example.title).toBeTruthy();
      expect(example.description).toBeTruthy();
      expect(example.inputs).toBeInstanceOf(Object);
      expect(example.expectedOutputs).toBeInstanceOf(Object);
    });

    it('should validate example calculations', () => {
      const example = mortgageVsRentCalculator.examples[0];
      const result = mortgageVsRentCalculator.formulas[0].calculate(example.inputs);
      
      expect(result.outputs).toBeDefined();
      expect(result.explanation).toBeTruthy();
    });
  });

  describe('Formulas Module', () => {
    it('should export all required formulas', () => {
      expect(mortgageVsRentFormulas).toHaveLength(5);
      expect(mortgageVsRentFormulas.find(f => f.id === 'rent-cost-calculation')).toBeDefined();
      expect(mortgageVsRentFormulas.find(f => f.id === 'mortgage-payment-calculation')).toBeDefined();
      expect(mortgageVsRentFormulas.find(f => f.id === 'homeownership-cost-calculation')).toBeDefined();
      expect(mortgageVsRentFormulas.find(f => f.id === 'break-even-analysis')).toBeDefined();
      expect(mortgageVsRentFormulas.find(f => f.id === 'net-worth-comparison')).toBeDefined();
    });
  });

  describe('Validation Module', () => {
    it('should export all required validation rules', () => {
      expect(mortgageVsRentValidationRules).toHaveLength(40);
      
      const requiredRules = mortgageVsRentValidationRules.filter(r => r.type === 'required');
      const rangeRules = mortgageVsRentValidationRules.filter(r => r.type === 'range');
      const businessRules = mortgageVsRentValidationRules.filter(r => r.type === 'business');
      
      expect(requiredRules).toHaveLength(15);
      expect(rangeRules).toHaveLength(20);
      expect(businessRules).toHaveLength(5);
    });
  });
});
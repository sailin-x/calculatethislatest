import { describe, it, expect } from 'vitest';
import { pmiCancellationCalculator } from './PMICancellationCalculator';
import { pmiCancellationFormulas } from './formulas';
import { pmiCancellationValidationRules } from './validation';

describe('PMI Cancellation Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(pmiCancellationCalculator.id).toBe('pmi-cancellation');
      expect(pmiCancellationCalculator.title).toBe('PMI Cancellation Calculator');
      expect(pmiCancellationCalculator.category).toBe('finance');
      expect(pmiCancellationCalculator.subcategory).toBe('mortgage');
    });

    it('should have required inputs', () => {
      const requiredInputs = pmiCancellationCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(8);
      
      const requiredFields = requiredInputs.map(input => input.id);
      expect(requiredFields).toContain('originalLoanAmount');
      expect(requiredFields).toContain('currentLoanBalance');
      expect(requiredFields).toContain('homePurchasePrice');
      expect(requiredFields).toContain('currentHomeValue');
      expect(requiredFields).toContain('loanType');
      expect(requiredFields).toContain('loanStartDate');
      expect(requiredFields).toContain('originalDownPayment');
      expect(requiredFields).toContain('monthlyPMIPayment');
    });

    it('should have correct number of outputs', () => {
      expect(pmiCancellationCalculator.outputs).toHaveLength(12);
    });

    it('should have validation rules', () => {
      expect(pmiCancellationCalculator.validationRules).toBeDefined();
      expect(pmiCancellationCalculator.validationRules.length).toBeGreaterThan(0);
    });

    it('should have examples', () => {
      expect(pmiCancellationCalculator.examples).toHaveLength(2);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const requiredRules = pmiCancellationCalculator.validationRules.filter(rule => rule.type === 'required');
      expect(requiredRules).toHaveLength(8);
      
      requiredRules.forEach(rule => {
        expect(rule.validator(null)).toBe(false);
        expect(rule.validator(undefined)).toBe(false);
      });
    });

    it('should validate range constraints', () => {
      const rangeRules = pmiCancellationCalculator.validationRules.filter(rule => rule.type === 'range');
      
      // Test original loan amount range
      const originalLoanAmountRule = rangeRules.find(rule => rule.field === 'originalLoanAmount');
      expect(originalLoanAmountRule?.validator(5000)).toBe(false); // Below minimum
      expect(originalLoanAmountRule?.validator(15000)).toBe(true); // Within range
      expect(originalLoanAmountRule?.validator(15000000)).toBe(false); // Above maximum
      
      // Test current loan balance range
      const currentBalanceRule = rangeRules.find(rule => rule.field === 'currentLoanBalance');
      expect(currentBalanceRule?.validator(-1000)).toBe(false); // Below minimum
      expect(currentBalanceRule?.validator(15000)).toBe(true); // Within range
      expect(currentBalanceRule?.validator(15000000)).toBe(false); // Above maximum
    });

    it('should validate business rules', () => {
      const businessRules = pmiCancellationCalculator.validationRules.filter(rule => rule.type === 'business');
      
      // Test current loan balance business rule
      const currentBalanceBusinessRule = businessRules.find(rule => rule.field === 'currentLoanBalance');
      expect(currentBalanceBusinessRule?.validator(350000, { originalLoanAmount: 300000 })).toBe(false); // Exceeds original
      expect(currentBalanceBusinessRule?.validator(280000, { originalLoanAmount: 300000 })).toBe(true); // Within original
      
      // Test down payment business rule
      const downPaymentBusinessRule = businessRules.find(rule => rule.field === 'originalDownPayment');
      expect(downPaymentBusinessRule?.validator(5000, { homePurchasePrice: 300000 })).toBe(false); // Too low percentage
      expect(downPaymentBusinessRule?.validator(60000, { homePurchasePrice: 300000 })).toBe(true); // Good percentage
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate LTV ratios correctly', () => {
      const inputs = {
        currentLoanBalance: 280000,
        currentHomeValue: 400000,
        originalLoanAmount: 300000,
        homePurchasePrice: 375000
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.currentLTV).toBe(70.0);
      expect(result.outputs.originalLTV).toBe(80.0);
    });

    it('should determine PMI cancellation threshold correctly', () => {
      const inputs = {
        loanType: 'conventional',
        originalLTV: 80,
        paymentHistory: 'excellent'
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      // Should return 78% for excellent payment history on conventional loan
      expect(result.outputs.pmiCancellationLTV).toBe(78.0);
    });

    it('should calculate months to cancellation correctly', () => {
      const inputs = {
        currentLTV: 75,
        pmiCancellationLTV: 78,
        appreciationRate: 3,
        currentLoanBalance: 280000,
        monthlyPMIPayment: 150
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      // Should return 0 since current LTV is already below threshold
      expect(result.outputs.monthsToCancellation).toBe(0);
    });

    it('should calculate PMI costs and savings correctly', () => {
      const inputs = {
        monthlyPMIPayment: 150,
        monthsToCancellation: 12
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.totalPMICost).toBe(1800);
      expect(result.outputs.monthlySavings).toBe(150);
      expect(result.outputs.annualSavings).toBe(1800);
    });

    it('should generate cancellation requirements correctly', () => {
      const inputs = {
        loanType: 'conventional',
        pmiCancellationLTV: 78,
        paymentHistory: 'excellent',
        propertyType: 'primary'
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.cancellationRequirements).toContain('78% LTV ratio');
      expect(result.outputs.cancellationRequirements).toContain('good payment history');
    });
  });

  describe('Edge Cases', () => {
    it('should handle already eligible PMI cancellation', () => {
      const inputs = {
        currentLTV: 75,
        pmiCancellationLTV: 78,
        appreciationRate: 3,
        currentLoanBalance: 280000,
        monthlyPMIPayment: 150
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.monthsToCancellation).toBe(0);
      expect(result.outputs.dateOfCancellation).toBeDefined();
    });

    it('should handle zero appreciation rate', () => {
      const inputs = {
        currentLTV: 80,
        pmiCancellationLTV: 78,
        appreciationRate: 0,
        currentLoanBalance: 280000,
        monthlyPMIPayment: 150
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.monthsToCancellation).toBeGreaterThan(0);
    });

    it('should handle high appreciation rates', () => {
      const inputs = {
        currentLTV: 85,
        pmiCancellationLTV: 78,
        appreciationRate: 10,
        currentLoanBalance: 280000,
        monthlyPMIPayment: 150
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.monthsToCancellation).toBeGreaterThan(0);
    });

    it('should handle missing optional inputs', () => {
      const inputs = {
        originalLoanAmount: 300000,
        currentLoanBalance: 280000,
        homePurchasePrice: 375000,
        currentHomeValue: 400000,
        loanType: 'conventional',
        loanStartDate: '2020-01-15',
        originalDownPayment: 75000,
        monthlyPMIPayment: 150
        // Missing optional inputs should default to specified values
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.currentLTV).toBe(70.0);
      expect(result.outputs.originalLTV).toBe(80.0);
    });
  });

  describe('Examples', () => {
    it('should have valid example inputs', () => {
      pmiCancellationCalculator.examples.forEach(example => {
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
        expect(example.title).toBeDefined();
        expect(example.description).toBeDefined();
      });
    });

    it('should calculate conventional loan example correctly', () => {
      const conventionalExample = pmiCancellationCalculator.examples[0];
      const result = pmiCancellationCalculator.formulas[0].calculate(conventionalExample.inputs);
      
      // Verify key outputs match expected values
      expect(result.outputs.currentLTV).toBe(conventionalExample.expectedOutputs.currentLTV);
      expect(result.outputs.originalLTV).toBe(conventionalExample.expectedOutputs.originalLTV);
      expect(result.outputs.pmiCancellationLTV).toBe(conventionalExample.expectedOutputs.pmiCancellationLTV);
      expect(result.outputs.monthlySavings).toBe(conventionalExample.expectedOutputs.monthlySavings);
    });

    it('should calculate FHA loan example correctly', () => {
      const fhaExample = pmiCancellationCalculator.examples[1];
      const result = pmiCancellationCalculator.formulas[0].calculate(fhaExample.inputs);
      
      // Verify key outputs match expected values
      expect(result.outputs.currentLTV).toBeCloseTo(fhaExample.expectedOutputs.currentLTV, 0);
      expect(result.outputs.originalLTV).toBe(fhaExample.expectedOutputs.originalLTV);
      expect(result.outputs.pmiCancellationLTV).toBe(fhaExample.expectedOutputs.pmiCancellationLTV);
      expect(result.outputs.monthlySavings).toBe(fhaExample.expectedOutputs.monthlySavings);
    });
  });

  describe('Formulas Module', () => {
    it('should export formulas array', () => {
      expect(pmiCancellationFormulas).toBeDefined();
      expect(Array.isArray(pmiCancellationFormulas)).toBe(true);
    });

    it('should have correct formula structure', () => {
      pmiCancellationFormulas.forEach(formula => {
        expect(formula.id).toBeDefined();
        expect(formula.name).toBeDefined();
        expect(formula.description).toBeDefined();
        expect(typeof formula.calculate).toBe('function');
      });
    });

    it('should calculate individual formulas correctly', () => {
      const ltvFormula = pmiCancellationFormulas.find(f => f.id === 'ltv-calculation');
      expect(ltvFormula).toBeDefined();
      
      const result = ltvFormula!.calculate({ 
        currentLoanBalance: 280000, 
        currentHomeValue: 400000,
        originalLoanAmount: 300000,
        homePurchasePrice: 375000
      });
      expect(result.outputs.currentLTV).toBe(70.0);
      expect(result.outputs.originalLTV).toBe(80.0);
    });
  });

  describe('Validation Module', () => {
    it('should export validation rules array', () => {
      expect(pmiCancellationValidationRules).toBeDefined();
      expect(Array.isArray(pmiCancellationValidationRules)).toBe(true);
    });

    it('should have correct validation rule structure', () => {
      pmiCancellationValidationRules.forEach(rule => {
        expect(rule.type).toBeDefined();
        expect(rule.field).toBeDefined();
        expect(rule.message).toBeDefined();
        expect(typeof rule.validator).toBe('function');
      });
    });

    it('should validate required fields correctly', () => {
      const requiredRules = pmiCancellationValidationRules.filter(rule => rule.type === 'required');
      requiredRules.forEach(rule => {
        expect(rule.validator(0)).toBe(false);
        expect(rule.validator(100)).toBe(true);
      });
    });
  });

  describe('Loan Type Specific Logic', () => {
    it('should handle conventional loans correctly', () => {
      const inputs = {
        loanType: 'conventional',
        paymentHistory: 'excellent',
        originalLTV: 80
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.pmiCancellationLTV).toBe(78.0);
    });

    it('should handle FHA loans correctly', () => {
      const inputs = {
        loanType: 'fha',
        paymentHistory: 'good',
        originalLTV: 80
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.pmiCancellationLTV).toBe(78.0);
    });

    it('should handle VA loans correctly', () => {
      const inputs = {
        loanType: 'va',
        paymentHistory: 'excellent',
        originalLTV: 80
      };
      
      const result = pmiCancellationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.pmiCancellationLTV).toBe(0); // No PMI for VA loans
    });
  });

  describe('Payment History Impact', () => {
    it('should adjust threshold based on payment history for conventional loans', () => {
      const excellentInputs = {
        loanType: 'conventional',
        paymentHistory: 'excellent',
        originalLTV: 80
      };
      
      const goodInputs = {
        loanType: 'conventional',
        paymentHistory: 'good',
        originalLTV: 80
      };
      
      const excellentResult = pmiCancellationCalculator.formulas[0].calculate(excellentInputs);
      const goodResult = pmiCancellationCalculator.formulas[0].calculate(goodInputs);
      
      expect(excellentResult.outputs.pmiCancellationLTV).toBe(78.0);
      expect(goodResult.outputs.pmiCancellationLTV).toBe(80.0);
    });
  });
});
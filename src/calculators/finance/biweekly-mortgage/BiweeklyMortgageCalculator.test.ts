import { describe, it, expect, beforeEach } from 'vitest';
import { BiweeklyMortgageCalculator } from './BiweeklyMortgageCalculator';
import { calculateBiweeklyMortgage, calculateSavings, generateAmortizationSchedule } from './formulas';
import { validateBiweeklyMortgageInputs } from './validation';

describe('Biweekly Mortgage Calculator', () => {
  let validInputs: Record<string, any>;

  beforeEach(() => {
    validInputs = {
      loanAmount: 300000,
      interestRate: 4.5,
      loanTerm: 30,
      startDate: '20240101',
      propertyTax: 3600,
      homeInsurance: 1200,
      pmi: 0,
      hoaFees: 0
    };
  });

  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(BiweeklyMortgageCalculator.id).toBe('BiweeklyMortgageCalculator');
      expect(BiweeklyMortgageCalculator.name).toBe('Biweekly Mortgage Calculator');
      expect(BiweeklyMortgageCalculator.category).toBe('finance');
      expect(BiweeklyMortgageCalculator.subcategory).toBe('mortgage');
    });

    it('should have all required inputs', () => {
      const inputIds = BiweeklyMortgageCalculator.inputs.map(input => input.id);
      const requiredInputs = [
        'loanAmount', 'interestRate', 'loanTerm', 'startDate',
        'propertyTax', 'homeInsurance', 'pmi', 'hoaFees'
      ];
      
      requiredInputs.forEach(inputId => {
        expect(inputIds).toContain(inputId);
      });
    });

    it('should have all required outputs', () => {
      const outputIds = BiweeklyMortgageCalculator.outputs.map(output => output.id);
      const requiredOutputs = [
        'monthlyPayment', 'biweeklyPayment', 'totalMonthlyPayment', 'totalBiweeklyPayment',
        'monthlyPaymentWithEscrow', 'biweeklyPaymentWithEscrow', 'interestSavings',
        'timeSaved', 'payoffDate', 'totalPaymentsSaved', 'annualSavings', 'monthlyVsBiweeklyComparison'
      ];
      
      requiredOutputs.forEach(outputId => {
        expect(outputIds).toContain(outputId);
      });
    });

    it('should have comprehensive examples', () => {
      expect(BiweeklyMortgageCalculator.examples.length).toBeGreaterThan(0);
      BiweeklyMortgageCalculator.examples.forEach(example => {
        expect(example.name).toBeDefined();
        expect(example.description).toBeDefined();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const incompleteInputs = { loanAmount: 300000 };
      const result = validateBiweeklyMortgageInputs(incompleteInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate loan amount range', () => {
      const lowAmountInputs = { ...validInputs, loanAmount: 5000 };
      const result = validateBiweeklyMortgageInputs(lowAmountInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('loan amount'))).toBe(true);
    });

    it('should validate interest rate range', () => {
      const highRateInputs = { ...validInputs, interestRate: 25 };
      const result = validateBiweeklyMortgageInputs(highRateInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('interest rate'))).toBe(true);
    });

    it('should validate loan term range', () => {
      const shortTermInputs = { ...validInputs, loanTerm: 0.5 };
      const result = validateBiweeklyMortgageInputs(shortTermInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('term'))).toBe(true);
    });

    it('should validate start date format', () => {
      const invalidDateInputs = { ...validInputs, startDate: 'invalid-date' };
      const result = validateBiweeklyMortgageInputs(invalidDateInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('date'))).toBe(true);
    });

    it('should provide warnings for business rule violations', () => {
      const highTaxInputs = { ...validInputs, propertyTax: 50000 };
      const result = validateBiweeklyMortgageInputs(highTaxInputs);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should accept valid inputs', () => {
      const result = validateBiweeklyMortgageInputs(validInputs);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate biweekly mortgage metrics correctly', () => {
      const metrics = calculateBiweeklyMortgage(validInputs);
      
      expect(metrics.monthlyPayment).toBeGreaterThan(0);
      expect(metrics.biweeklyPayment).toBeGreaterThan(0);
      expect(metrics.totalMonthlyPayment).toBeGreaterThan(0);
      expect(metrics.totalBiweeklyPayment).toBeGreaterThan(0);
      expect(metrics.totalInterest).toBeGreaterThan(0);
      expect(metrics.totalCost).toBeGreaterThan(0);
      
      // Verify biweekly payment is exactly half of monthly
      expect(Math.abs(metrics.biweeklyPayment - metrics.monthlyPayment / 2)).toBeLessThan(0.01);
    });

    it('should calculate savings correctly', () => {
      const biweeklyMetrics = calculateBiweeklyMortgage(validInputs);
      const savings = calculateSavings(validInputs, biweeklyMetrics);
      
      expect(savings.interestSavings).toBeGreaterThan(0);
      expect(savings.timeSaved).toBeGreaterThan(0);
      expect(savings.timeSaved).toBeLessThan(validInputs.loanTerm);
      expect(savings.totalPaymentsSaved).toBeGreaterThan(0);
      expect(savings.annualSavings).toBeGreaterThan(0);
      expect(savings.comparison).toBeDefined();
      expect(savings.payoffDate).toBeDefined();
    });

    it('should calculate escrow amounts correctly', () => {
      const metrics = calculateBiweeklyMortgage(validInputs);
      
      const expectedMonthlyEscrow = (validInputs.propertyTax + validInputs.homeInsurance) / 12;
      const actualMonthlyEscrow = metrics.monthlyPaymentWithEscrow - metrics.monthlyPayment;
      
      expect(Math.abs(actualMonthlyEscrow - expectedMonthlyEscrow)).toBeLessThan(0.01);
    });

    it('should handle zero optional values', () => {
      const zeroOptionalInputs = {
        ...validInputs,
        propertyTax: 0,
        homeInsurance: 0,
        pmi: 0,
        hoaFees: 0
      };
      
      const metrics = calculateBiweeklyMortgage(zeroOptionalInputs);
      expect(metrics.totalMonthlyPayment).toBe(metrics.monthlyPayment);
      expect(metrics.totalBiweeklyPayment).toBe(metrics.biweeklyPayment);
    });

    it('should calculate total cost correctly', () => {
      const metrics = calculateBiweeklyMortgage(validInputs);
      const expectedTotalCost = validInputs.loanAmount + metrics.totalInterest + 
        (validInputs.propertyTax * validInputs.loanTerm) + 
        (validInputs.homeInsurance * validInputs.loanTerm);
      
      expect(Math.abs(metrics.totalCost - expectedTotalCost)).toBeLessThan(1);
    });
  });

  describe('Amortization Schedule', () => {
    it('should generate amortization schedule', () => {
      const biweeklyMetrics = calculateBiweeklyMortgage(validInputs);
      const schedule = generateAmortizationSchedule(validInputs, biweeklyMetrics);
      
      expect(schedule.length).toBeGreaterThan(0);
      expect(schedule.length).toBeLessThanOrEqual(1000); // Safety limit
      
      // Check first payment
      const firstPayment = schedule[0];
      expect(firstPayment.paymentNumber).toBe(1);
      expect(firstPayment.payment).toBe(biweeklyMetrics.biweeklyPayment);
      expect(firstPayment.remainingBalance).toBeLessThan(validInputs.loanAmount);
      
      // Check last payment
      const lastPayment = schedule[schedule.length - 1];
      expect(lastPayment.remainingBalance).toBeLessThan(0.02); // Should be nearly zero
    });

    it('should have correct payment dates', () => {
      const biweeklyMetrics = calculateBiweeklyMortgage(validInputs);
      const schedule = generateAmortizationSchedule(validInputs, biweeklyMetrics);
      
      if (schedule.length >= 2) {
        const firstDate = new Date(schedule[0].paymentDate);
        const secondDate = new Date(schedule[1].paymentDate);
        const daysDifference = (secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
        
        expect(daysDifference).toBe(14); // Biweekly = 14 days
      }
    });

    it('should have cumulative interest increasing', () => {
      const biweeklyMetrics = calculateBiweeklyMortgage(validInputs);
      const schedule = generateAmortizationSchedule(validInputs, biweeklyMetrics);
      
      for (let i = 1; i < schedule.length; i++) {
        expect(schedule[i].cumulativeInterest).toBeGreaterThanOrEqual(schedule[i-1].cumulativeInterest);
      }
    });
  });

  describe('Main Calculator Function', () => {
    it('should calculate all outputs correctly', () => {
      const result = BiweeklyMortgageCalculator.calculate(validInputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.biweeklyPayment).toBeGreaterThan(0);
      expect(result.totalMonthlyPayment).toBeGreaterThan(0);
      expect(result.totalBiweeklyPayment).toBeGreaterThan(0);
      expect(result.monthlyPaymentWithEscrow).toBeGreaterThan(0);
      expect(result.biweeklyPaymentWithEscrow).toBeGreaterThan(0);
      expect(result.interestSavings).toBeGreaterThan(0);
      expect(result.timeSaved).toBeGreaterThan(0);
      expect(result.payoffDate).toBeDefined();
      expect(result.totalPaymentsSaved).toBeGreaterThan(0);
      expect(result.annualSavings).toBeGreaterThan(0);
      expect(result.monthlyVsBiweeklyComparison).toBeDefined();
    });

    it('should throw error for invalid inputs', () => {
      const invalidInputs = { ...validInputs, loanAmount: -1000 };
      
      expect(() => {
        BiweeklyMortgageCalculator.calculate(invalidInputs);
      }).toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const edgeCaseInputs = { ...validInputs, loanTerm: 1, interestRate: 0.1 };
      const result = BiweeklyMortgageCalculator.calculate(edgeCaseInputs);
      
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.biweeklyPayment).toBeGreaterThan(0);
    });

    it('should match example calculations within tolerance', () => {
      const example = BiweeklyMortgageCalculator.examples[0];
      const result = BiweeklyMortgageCalculator.calculate(example.inputs);
      
      const monthlyPaymentAccuracy = Math.abs((result.monthlyPayment - example.expectedOutputs.monthlyPayment) / example.expectedOutputs.monthlyPayment) * 100;
      const biweeklyPaymentAccuracy = Math.abs((result.biweeklyPayment - example.expectedOutputs.biweeklyPayment) / example.expectedOutputs.biweeklyPayment) * 100;
      
      expect(monthlyPaymentAccuracy).toBeLessThan(5);
      expect(biweeklyPaymentAccuracy).toBeLessThan(5);
    });
  });

  describe('Performance', () => {
    it('should complete calculations quickly', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        BiweeklyMortgageCalculator.calculate(validInputs);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / 100;
      
      expect(avgTime).toBeLessThan(10); // Should complete in less than 10ms per calculation
    });
  });

  describe('Business Logic', () => {
    it('should show biweekly payments save money', () => {
      const result = BiweeklyMortgageCalculator.calculate(validInputs);
      
      // Biweekly payments should result in savings
      expect(result.interestSavings).toBeGreaterThan(0);
      expect(result.timeSaved).toBeGreaterThan(0);
      expect(result.totalPaymentsSaved).toBeGreaterThan(0);
    });

    it('should handle different loan terms correctly', () => {
      const shortTermInputs = { ...validInputs, loanTerm: 15 };
      const longTermInputs = { ...validInputs, loanTerm: 30 };
      
      const shortTermResult = BiweeklyMortgageCalculator.calculate(shortTermInputs);
      const longTermResult = BiweeklyMortgageCalculator.calculate(longTermInputs);
      
      // Shorter terms should have higher monthly payments
      expect(shortTermResult.monthlyPayment).toBeGreaterThan(longTermResult.monthlyPayment);
      
      // But shorter terms should have less total interest
      const shortTermMetrics = calculateBiweeklyMortgage(shortTermInputs);
      const longTermMetrics = calculateBiweeklyMortgage(longTermInputs);
      expect(shortTermMetrics.totalInterest).toBeLessThan(longTermMetrics.totalInterest);
    });

    it('should handle different interest rates correctly', () => {
      const lowRateInputs = { ...validInputs, interestRate: 3.0 };
      const highRateInputs = { ...validInputs, interestRate: 7.0 };
      
      const lowRateResult = BiweeklyMortgageCalculator.calculate(lowRateInputs);
      const highRateResult = BiweeklyMortgageCalculator.calculate(highRateInputs);
      
      // Higher rates should have higher payments
      expect(highRateResult.monthlyPayment).toBeGreaterThan(lowRateResult.monthlyPayment);
      
      // Higher rates should have more interest savings from biweekly
      expect(highRateResult.interestSavings).toBeGreaterThan(lowRateResult.interestSavings);
    });

    it('should calculate payoff date correctly', () => {
      const result = BiweeklyMortgageCalculator.calculate(validInputs);
      const payoffDate = new Date(result.payoffDate);
      const startDate = new Date(validInputs.startDate);
      
      const yearsDifference = (payoffDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      const expectedYears = validInputs.loanTerm - result.timeSaved;
      
      expect(Math.abs(yearsDifference - expectedYears)).toBeLessThan(1);
    });
  });
});

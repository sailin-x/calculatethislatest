import { describe, it, expect } from 'vitest';
import { calculateAutoLoan, calculateMonthlyPayment, calculateTotalInterest } from './formulas';
import { autoLoanCalculator } from './AutoLoanCalculator';

describe('Auto Loan Calculator', () => {
  describe('calculateMonthlyPayment', () => {
    it('should calculate monthly payment correctly', () => {
      const loanAmount = 20000;
      const annualRate = 6.5;
      const loanTermMonths = 60;

      const result = calculateMonthlyPayment(loanAmount, annualRate, loanTermMonths);
      expect(result).toBeCloseTo(391.32, 2);
    });

    it('should handle zero interest rate', () => {
      const loanAmount = 15000;
      const annualRate = 0;
      const loanTermMonths = 36;

      const result = calculateMonthlyPayment(loanAmount, annualRate, loanTermMonths);
      expect(result).toBeCloseTo(416.67, 2); // 15000 / 36
    });

    it('should handle short loan terms', () => {
      const loanAmount = 5000;
      const annualRate = 8.0;
      const loanTermMonths = 12;

      const result = calculateMonthlyPayment(loanAmount, annualRate, loanTermMonths);
      expect(result).toBeCloseTo(434.94, 2);
    });
  });

  describe('calculateTotalInterest', () => {
    it('should calculate total interest paid', () => {
      const monthlyPayment = 391.32;
      const loanTermMonths = 60;
      const loanAmount = 20000;

      const result = calculateTotalInterest(monthlyPayment * loanTermMonths, loanAmount);
      expect(result).toBeCloseTo(3479.00, 0);
    });

    it('should return zero for zero interest loans', () => {
      const monthlyPayment = 416.67;
      const loanTermMonths = 36;
      const loanAmount = 15000;

      const result = calculateTotalInterest(monthlyPayment * loanTermMonths, loanAmount);
      expect(result).toBeCloseTo(0, 1);
    });
  });

  describe('calculateAutoLoan - Main Calculation', () => {
    it('should calculate complete auto loan with all inputs', () => {
      const inputs = {
        vehiclePrice: 35000,
        downPayment: 7000,
        loanTermYears: 5,
        interestRate: 6.5,
        salesTax: 8.5,
        registrationFees: 500,
        monthlyInsurance: 120
      };

      const result = calculateAutoLoan(inputs);

      expect(result.loanAmount).toBe(28000);
      expect(result.monthlyPayment).toBeCloseTo(548.00, 0);
      expect(result.totalMonthlyPayment).toBeCloseTo(916.00, 0); // Includes taxes and insurance
      expect(result.totalInterest).toBeCloseTo(4880.00, 1);
      expect(result.totalCost).toBeCloseTo(54932.00, 0);
      expect(result.loanToValueRatio).toBe(80);
      expect(result.apr).toBeCloseTo(7.2, 1);
    });

    it('should handle down payment as percentage', () => {
      const inputs = {
        vehiclePrice: 25000,
        downPaymentPercent: 20,
        loanTermYears: 4,
        interestRate: 7.0
      };

      const result = calculateAutoLoan(inputs);

      expect(result.loanAmount).toBe(20000);
      expect(result.monthlyPayment).toBeCloseTo(479.00, 0);
      expect(result.loanToValueRatio).toBe(80);
    });

    it('should handle trade-in value', () => {
      const inputs = {
        vehiclePrice: 30000,
        downPayment: 3000,
        loanTermYears: 6,
        interestRate: 5.5,
        tradeInValue: 5000
      };

      const result = calculateAutoLoan(inputs);

      expect(result.loanAmount).toBe(22000);
      expect(result.loanToValueRatio).toBeCloseTo(73.33, 2);
    });

    it('should calculate with taxes and fees', () => {
      const inputs = {
        vehiclePrice: 28000,
        downPayment: 2800,
        loanTermYears: 5,
        interestRate: 6.0,
        salesTax: 7.0,
        registrationFees: 400,
        monthlyInsurance: 100
      };

      const result = calculateAutoLoan(inputs);

      expect(result.loanAmount).toBe(25200);
      expect(result.monthlyPayment).toBeCloseTo(487.00, 0);
      expect(result.totalMonthlyPayment).toBeCloseTo(750.00, 1); // Includes taxes and insurance
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct calculator properties', () => {
      expect(autoLoanCalculator.id).toBe('auto-loan-calculator');
      expect(autoLoanCalculator.title).toBe('Auto Loan Calculator');
      expect(autoLoanCalculator.category).toBe('finance');
      expect(autoLoanCalculator.inputs).toHaveLength(9);
      expect(autoLoanCalculator.outputs).toHaveLength(7);
      expect(autoLoanCalculator.formulas).toHaveLength(1);
      expect(autoLoanCalculator.examples).toHaveLength(3);
    });

    it('should have required input fields', () => {
      const requiredInputs = autoLoanCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(3); // vehiclePrice, loanTermYears, interestRate

      const vehiclePriceInput = autoLoanCalculator.inputs.find(input => input.id === 'vehiclePrice');
      expect(vehiclePriceInput?.required).toBe(true);

      const loanTermInput = autoLoanCalculator.inputs.find(input => input.id === 'loanTermYears');
      expect(loanTermInput?.required).toBe(true);

      const interestRateInput = autoLoanCalculator.inputs.find(input => input.id === 'interestRate');
      expect(interestRateInput?.required).toBe(true);
    });

    it('should have all required output fields', () => {
      const outputIds = autoLoanCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('loanAmount');
      expect(outputIds).toContain('monthlyPayment');
      expect(outputIds).toContain('totalMonthlyPayment');
      expect(outputIds).toContain('totalInterest');
      expect(outputIds).toContain('totalCost');
      expect(outputIds).toContain('loanToValueRatio');
      expect(outputIds).toContain('apr');
    });

    it('should have validation rules', () => {
      expect(autoLoanCalculator.validationRules).toBeDefined();
      expect(Array.isArray(autoLoanCalculator.validationRules)).toBe(true);
      expect(autoLoanCalculator.validationRules.length).toBeGreaterThan(0);
    });

    it('should have example calculations', () => {
      expect(autoLoanCalculator.examples).toHaveLength(3);

      const firstExample = autoLoanCalculator.examples[0];
      expect(firstExample.title).toBe('New Car Purchase');
      expect(firstExample.inputs.vehiclePrice).toBe(35000);
      expect(firstExample.expectedOutputs.loanAmount).toBe(28000);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero down payment', () => {
      const inputs = {
        vehiclePrice: 20000,
        downPayment: 0,
        loanTermYears: 4,
        interestRate: 7.5
      };

      const result = calculateAutoLoan(inputs);

      expect(result.loanAmount).toBe(20000);
      expect(result.loanToValueRatio).toBe(100);
    });

    it('should handle 100% financing with trade-in', () => {
      const inputs = {
        vehiclePrice: 25000,
        downPayment: 0,
        loanTermYears: 5,
        interestRate: 6.0,
        tradeInValue: 5000
      };

      const result = calculateAutoLoan(inputs);

      expect(result.loanAmount).toBe(20000);
      expect(result.loanToValueRatio).toBe(80);
    });

    it('should handle very low interest rates', () => {
      const inputs = {
        vehiclePrice: 15000,
        downPayment: 1500,
        loanTermYears: 3,
        interestRate: 0.5
      };

      const result = calculateAutoLoan(inputs);

      expect(result.loanAmount).toBe(13500);
      expect(result.monthlyPayment).toBeCloseTo(378.00, 0);
    });
  });
});
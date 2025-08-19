import { describe, it, expect } from 'vitest';
import { calculatePMICancellation, calculateYearsBetween, calculateMonthsBetween } from './formulas';
import { validatePMICancellationInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';
import { pmiCancellationCalculator } from './PMICancellationCalculator';

describe('PMI Cancellation Calculator', () => {
  describe('calculatePMICancellation', () => {
    it('should calculate PMI cancellation correctly with basic inputs', () => {
      const inputs = {
        originalLoanAmount: 300000,
        currentBalance: 325000, // Higher balance to make current LTV > 80%
        originalHomeValue: 350000, // Changed to make original LTV > 80%
        currentHomeValue: 400000,
        downPayment: 50000, // Adjusted down payment
        loanTerm: 30,
        interestRate: 4.5,
        monthlyPayment: 1520,
        pmiRate: 0.5,
        loanStartDate: '2020-01-15',
        paymentHistory: 'perfect' as const,
        loanType: 'conventional' as const,
        propertyType: 'primary' as const
      };

      const result = calculatePMICancellation(inputs);

      expect(result.currentLTV).toBeCloseTo(81.3, 1); // 325000 / 400000 * 100
      expect(result.originalLTV).toBeCloseTo(85.7, 1); // 300000 / 350000 * 100
      expect(result.currentPMI).toBeCloseTo(135.42, 2); // (325000 * 0.5%) / 12
      expect(result.annualPMISavings).toBeCloseTo(1625, 0); // 135.42 * 12
      expect(result.newMonthlyPayment).toBeCloseTo(1384.58, 2); // 1520 - 135.42
      expect(result.equityGain).toBeCloseTo(100000, 0); // 400000 - 350000 + 50000
      expect(result.equityPercentage).toBeCloseTo(18.75, 2); // (400000 - 325000) / 400000 * 100
      expect(result.monthsToCancellation).toBeGreaterThan(0);
      expect(result.totalPMISavings).toBeGreaterThan(0);
      expect(result.analysis).toContain('PMI Cancellation Analysis');
    });

    it('should calculate PMI cancellation with all optional inputs', () => {
      const inputs = {
        originalLoanAmount: 400000,
        currentBalance: 450000, // Higher balance to make current LTV > 80%
        originalHomeValue: 500000,
        currentHomeValue: 520000,
        downPayment: 100000,
        loanTerm: 30,
        interestRate: 4.0,
        monthlyPayment: 1910,
        pmiRate: 0.6,
        loanStartDate: '2021-03-01',
        paymentHistory: 'perfect' as const,
        loanType: 'conventional' as const,
        propertyType: 'primary' as const,
        appreciationRate: 4.0,
        additionalPayments: 200,
        lumpSumPayment: 25000
      };

      const result = calculatePMICancellation(inputs);

      expect(result.currentLTV).toBeCloseTo(86.5, 1); // 450000 / 520000 * 100
      expect(result.originalLTV).toBeCloseTo(80.0, 1); // 400000 / 500000 * 100
      expect(result.currentPMI).toBeCloseTo(225.00, 2); // (450000 * 0.6%) / 12
      expect(result.annualPMISavings).toBeCloseTo(2700, 0); // 225 * 12
      expect(result.newMonthlyPayment).toBeCloseTo(1685.00, 2); // 1910 - 225
      expect(result.equityGain).toBeCloseTo(120000, 0); // 520000 - 500000 + 100000 (lump sum doesn't affect equity gain)
      expect(result.equityPercentage).toBeCloseTo(13.5, 1); // (520000 - 450000) / 520000 * 100
      expect(result.monthsToCancellation).toBeGreaterThan(0);
      expect(result.totalPMISavings).toBeGreaterThan(0);
    });

    it('should handle FHA loan with MIP', () => {
      const inputs = {
        originalLoanAmount: 250000,
        currentBalance: 240000,
        originalHomeValue: 312500,
        currentHomeValue: 350000,
        downPayment: 62500,
        loanTerm: 30,
        interestRate: 3.5,
        monthlyPayment: 1123,
        pmiRate: 0.85,
        loanStartDate: '2019-06-01',
        paymentHistory: 'good' as const,
        loanType: 'fha' as const,
        propertyType: 'primary' as const
      };

      const result = calculatePMICancellation(inputs);

      expect(result.currentLTV).toBeCloseTo(68.6, 1); // 240000 / 350000 * 100
      expect(result.originalLTV).toBeCloseTo(80.0, 1); // 250000 / 312500 * 100
      expect(result.currentPMI).toBeCloseTo(170.00, 2); // (240000 * 0.85%) / 12
      expect(result.annualPMISavings).toBeCloseTo(2040, 0); // 170 * 12
      expect(result.newMonthlyPayment).toBeCloseTo(953.00, 2); // 1123 - 170
      expect(result.cancellationMethod).toContain('FHA');
      expect(result.requirements).toContain('11 years');
    });

    it('should handle VA loan (no PMI)', () => {
      const inputs = {
        originalLoanAmount: 300000,
        currentBalance: 280000,
        originalHomeValue: 375000,
        currentHomeValue: 400000,
        downPayment: 75000,
        loanTerm: 30,
        interestRate: 4.5,
        monthlyPayment: 1520,
        pmiRate: 0, // VA loans don't have PMI
        loanStartDate: '2020-01-15',
        paymentHistory: 'perfect' as const,
        loanType: 'va' as const,
        propertyType: 'primary' as const
      };

      const result = calculatePMICancellation(inputs);

      expect(result.currentLTV).toBe(70.0);
      expect(result.currentPMI).toBe(0);
      expect(result.annualPMISavings).toBe(0);
      expect(result.newMonthlyPayment).toBe(1520); // Same as original
      expect(result.cancellationMethod).toContain('VA loan');
      expect(result.requirements).toContain('VA loans with 10% down payment have reduced funding fee');
    });

    it('should handle immediate PMI cancellation eligibility', () => {
      const inputs = {
        originalLoanAmount: 300000,
        currentBalance: 240000, // 80% of 300000
        originalHomeValue: 375000,
        currentHomeValue: 300000,
        downPayment: 75000,
        loanTerm: 30,
        interestRate: 4.5,
        monthlyPayment: 1520,
        pmiRate: 0.5,
        loanStartDate: '2020-01-15',
        paymentHistory: 'perfect' as const,
        loanType: 'conventional' as const,
        propertyType: 'primary' as const
      };

      const result = calculatePMICancellation(inputs);

      expect(result.currentLTV).toBe(80.0); // 240000 / 300000 * 100
      expect(result.monthsToCancellation).toBe(0);
      expect(result.cancellationMethod).toContain('Immediate');
      expect(result.requirements).toContain('80% or less');
    });
  });

  describe('Additional calculation functions', () => {
    it('should calculate years between dates', () => {
      const result = calculateYearsBetween('2020-01-01', '2023-01-01');
      expect(result).toBeCloseTo(3, 1);
    });

    it('should calculate months between dates', () => {
      const result = calculateMonthsBetween('2020-01-01', '2023-01-01');
      expect(result).toBe(36);
    });
  });

  describe('validatePMICancellationInputs', () => {
    it('should validate required fields', () => {
      const inputs = {
        originalLoanAmount: undefined,
        currentBalance: 280000,
        originalHomeValue: 375000,
        currentHomeValue: 400000,
        downPayment: 75000,
        loanTerm: 30,
        interestRate: 4.5,
        monthlyPayment: 1520,
        pmiRate: 0.5,
        loanStartDate: '2020-01-15',
        paymentHistory: 'perfect' as const,
        loanType: 'conventional' as const,
        propertyType: 'primary' as const
      };

      const errors = validatePMICancellationInputs(inputs);
      expect(errors).toContain('Original Loan Amount is required');
    });

    it('should validate range constraints', () => {
      const inputs = {
        originalLoanAmount: 300000,
        currentBalance: 280000,
        originalHomeValue: 375000,
        currentHomeValue: 400000,
        downPayment: 75000,
        loanTerm: 30,
        interestRate: 25, // Invalid: > 20%
        monthlyPayment: 1520,
        pmiRate: 0.5,
        loanStartDate: '2020-01-15',
        paymentHistory: 'perfect' as const,
        loanType: 'conventional' as const,
        propertyType: 'primary' as const
      };

      const errors = validatePMICancellationInputs(inputs);
      expect(errors).toContain('Interest Rate must be between 0.1% and 20%');
    });

    it('should validate business logic', () => {
      const inputs = {
        originalLoanAmount: 300000,
        currentBalance: 320000, // Higher than original loan amount
        originalHomeValue: 375000,
        currentHomeValue: 400000,
        downPayment: 75000,
        loanTerm: 30,
        interestRate: 4.5,
        monthlyPayment: 1520,
        pmiRate: 0.5,
        loanStartDate: '2020-01-15',
        paymentHistory: 'perfect' as const,
        loanType: 'conventional' as const,
        propertyType: 'primary' as const
      };

      const errors = validatePMICancellationInputs(inputs);
      expect(errors).toContain('Current loan balance cannot exceed original loan amount');
    });

    it('should validate PMI-specific rules', () => {
      const inputs = {
        originalLoanAmount: 300000,
        currentBalance: 280000,
        originalHomeValue: 375000,
        currentHomeValue: 400000,
        downPayment: 75000,
        loanTerm: 30,
        interestRate: 4.5,
        monthlyPayment: 1520,
        pmiRate: 0.5,
        loanStartDate: '2020-01-15',
        paymentHistory: 'perfect' as const,
        loanType: 'va' as const, // VA loan with PMI
        propertyType: 'primary' as const
      };

      const errors = validatePMICancellationInputs(inputs);
      expect(errors).toContain('VA loans do not require PMI');
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        originalLoanAmount: 300000,
        currentBalance: 280000, // Lower balance to be valid
        originalHomeValue: 350000, // Changed to make original LTV > 80%
        currentHomeValue: 400000,
        downPayment: 50000, // Adjusted down payment
        loanTerm: 30,
        interestRate: 4.5,
        monthlyPayment: 1520,
        pmiRate: 0.5,
        loanStartDate: '2020-01-15',
        paymentHistory: 'perfect' as const,
        loanType: 'conventional' as const,
        propertyType: 'primary' as const
      };

      const errors = validatePMICancellationInputs(inputs);
      expect(errors).toHaveLength(0);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs and return results', () => {
      const inputs = {
        originalLoanAmount: 300000,
        currentBalance: 280000,
        originalHomeValue: 375000,
        currentHomeValue: 400000,
        downPayment: 75000,
        loanTerm: 30,
        interestRate: 4.5,
        monthlyPayment: 1520,
        pmiRate: 0.5,
        loanStartDate: '2020-01-15',
        paymentHistory: 'perfect',
        loanType: 'conventional',
        propertyType: 'primary'
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(16); // All input fields
      expect(results.every(result => result.isValid)).toBe(true);
    });

    it('should detect invalid inputs', () => {
      const inputs = {
        originalLoanAmount: -1000, // Invalid
        currentBalance: 280000,
        originalHomeValue: 375000,
        currentHomeValue: 400000,
        downPayment: 75000,
        loanTerm: 30,
        interestRate: 4.5,
        monthlyPayment: 1520,
        pmiRate: 0.5,
        loanStartDate: '2020-01-15',
        paymentHistory: 'perfect',
        loanType: 'conventional',
        propertyType: 'primary'
      };

      const results = quickValidateAllInputs(inputs);
      const originalLoanAmountResult = results[0];
      expect(originalLoanAmountResult.isValid).toBe(false);
      expect(originalLoanAmountResult.message).toContain('must be positive');
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct structure', () => {
      expect(pmiCancellationCalculator.id).toBe('pmi-cancellation');
      expect(pmiCancellationCalculator.title).toBe('PMI Cancellation Calculator');
      expect(pmiCancellationCalculator.category).toBe('finance');
      expect(pmiCancellationCalculator.subcategory).toBe('mortgage');
      expect(pmiCancellationCalculator.inputs).toHaveLength(16);
      expect(pmiCancellationCalculator.outputs).toHaveLength(13);
      expect(pmiCancellationCalculator.formulas).toHaveLength(1);
      expect(pmiCancellationCalculator.validationRules).toBeDefined();
      expect(pmiCancellationCalculator.examples).toHaveLength(3);
    });

    it('should have required inputs', () => {
      const requiredInputs = pmiCancellationCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(13); // All required fields
    });

    it('should have correct output structure', () => {
      const outputs = pmiCancellationCalculator.outputs;
      expect(outputs.find(o => o.id === 'currentLTV')).toBeDefined();
      expect(outputs.find(o => o.id === 'originalLTV')).toBeDefined();
      expect(outputs.find(o => o.id === 'pmiCancellationDate')).toBeDefined();
      expect(outputs.find(o => o.id === 'monthsToCancellation')).toBeDefined();
      expect(outputs.find(o => o.id === 'currentPMI')).toBeDefined();
      expect(outputs.find(o => o.id === 'annualPMISavings')).toBeDefined();
      expect(outputs.find(o => o.id === 'totalPMISavings')).toBeDefined();
      expect(outputs.find(o => o.id === 'newMonthlyPayment')).toBeDefined();
      expect(outputs.find(o => o.id === 'equityGain')).toBeDefined();
      expect(outputs.find(o => o.id === 'equityPercentage')).toBeDefined();
      expect(outputs.find(o => o.id === 'cancellationMethod')).toBeDefined();
      expect(outputs.find(o => o.id === 'requirements')).toBeDefined();
      expect(outputs.find(o => o.id === 'analysis')).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator examples', () => {
      const example = pmiCancellationCalculator.examples[0];
      const result = calculatePMICancellation(example.inputs);



      expect(result.currentLTV).toBeGreaterThan(0);
      expect(result.originalLTV).toBeGreaterThan(0);
      expect(result.currentPMI).toBeGreaterThan(0);
      expect(result.annualPMISavings).toBeGreaterThan(0);
      expect(result.totalPMISavings).toBeGreaterThan(0);
      expect(result.newMonthlyPayment).toBeGreaterThan(0);
      expect(result.equityGain).toBeGreaterThan(0);
      expect(result.equityPercentage).toBeGreaterThan(0);
      expect(result.monthsToCancellation).toBeGreaterThanOrEqual(0);
      expect(result.cancellationMethod).toBeDefined();
      expect(result.requirements).toBeDefined();
      expect(result.analysis).toContain('PMI Cancellation Analysis');
    });

    it('should validate calculator examples', () => {
      pmiCancellationCalculator.examples.forEach(example => {
        const errors = validatePMICancellationInputs(example.inputs);
        expect(errors).toHaveLength(0);
      });
    });

    it('should pass quick validation for all examples', () => {
      pmiCancellationCalculator.examples.forEach(example => {
        const results = quickValidateAllInputs(example.inputs);
        const hasErrors = results.some(result => !result.isValid);
        expect(hasErrors).toBe(false);
      });
    });
  });
});
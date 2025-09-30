import { describe, it, expect } from 'vitest';
import {
  calculateFederalIncomeTax,
  calculateStateIncomeTax,
  calculateSocialSecurityTax,
  calculateMedicareTax,
  calculateTotalDeductions,
  calculateNetPay,
  calculateTakeHomePercentage
} from './formulas';
import { validatePaycheckCalculatorInputs } from './validation';

describe('Paycheck Calculator', () => {
  const mockInputs = {
    grossPay: 5000,
    payFrequency: 'monthly' as const,
    filingStatus: 'single' as const,
    dependents: 0,
    state: 'CA',
    preTaxDeductions: 500,
    retirementContributions: 200,
    healthInsurance: 150,
    additionalDeductions: 50
  };

  describe('Core Tax Calculations', () => {
    it('calculates federal income tax correctly', () => {
      const result = calculateFederalIncomeTax(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(mockInputs.grossPay);
    });

    it('calculates state income tax correctly', () => {
      const result = calculateStateIncomeTax(mockInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('calculates Social Security tax correctly', () => {
      const result = calculateSocialSecurityTax(mockInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('calculates Medicare tax correctly', () => {
      const result = calculateMedicareTax(mockInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('calculates total deductions correctly', () => {
      const result = calculateTotalDeductions(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(mockInputs.grossPay);
    });

    it('calculates net pay correctly', () => {
      const result = calculateNetPay(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(mockInputs.grossPay);
    });

    it('calculates take-home percentage correctly', () => {
      const result = calculateTakeHomePercentage(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(100);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatePaycheckCalculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates gross pay cannot be zero', () => {
      const invalidInputs = { ...mockInputs, grossPay: 0 };
      const result = validatePaycheckCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates pay frequency is required', () => {
      const invalidInputs = { ...mockInputs, payFrequency: '' as any };
      const result = validatePaycheckCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero deductions', () => {
      const noDeductionsInputs = {
        ...mockInputs,
        preTaxDeductions: 0,
        retirementContributions: 0,
        healthInsurance: 0,
        additionalDeductions: 0
      };
      const result = calculateNetPay(noDeductionsInputs);
      expect(result).toBeLessThan(noDeductionsInputs.grossPay);
    });

    it('handles high deductions', () => {
      const highDeductionsInputs = {
        ...mockInputs,
        preTaxDeductions: 1000,
        retirementContributions: 500,
        healthInsurance: 300,
        additionalDeductions: 200
      };
      const result = calculateNetPay(highDeductionsInputs);
      expect(result).toBeGreaterThan(0);
    });
  });
});
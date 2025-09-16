import { describe, it, expect } from 'vitest';
import { paycheckCalculator } from './PaycheckCalculator';
import {
  calculateHourlyGrossPay,
  calculateSalaryGrossPay,
  calculateFederalIncomeTax,
  calculateSocialSecurityTax,
  calculateMedicareTax,
  calculateStateIncomeTax,
  calculateTotalDeductions,
  calculateNetPay,
  calculatePaycheck
} from './formulas';

describe('Paycheck Calculator', () => {
  describe('calculateHourlyGrossPay', () => {
    it('should calculate regular pay correctly', () => {
      const result = calculateHourlyGrossPay(20, 40, 0);
      expect(result).toBe(800); // 20 * 40
    });

    it('should calculate overtime pay correctly', () => {
      const result = calculateHourlyGrossPay(20, 45, 5);
      expect(result).toBe(950); // (20 * 40) + (20 * 5 * 1.5)
    });

    it('should handle zero overtime', () => {
      const result = calculateHourlyGrossPay(25, 40, 0);
      expect(result).toBe(1000);
    });
  });

  describe('calculateSalaryGrossPay', () => {
    it('should calculate weekly salary correctly', () => {
      const result = calculateSalaryGrossPay(52000, 'weekly');
      expect(result).toBeCloseTo(1000, 0); // 52000 / 52
    });

    it('should calculate biweekly salary correctly', () => {
      const result = calculateSalaryGrossPay(52000, 'biweekly');
      expect(result).toBeCloseTo(2000, 0); // 52000 / 26
    });

    it('should calculate monthly salary correctly', () => {
      const result = calculateSalaryGrossPay(52000, 'monthly');
      expect(result).toBeCloseTo(4333.33, 0); // 52000 / 12
    });
  });

  describe('calculateFederalIncomeTax', () => {
    it('should calculate federal tax for single filer', () => {
      const result = calculateFederalIncomeTax(2000, 'biweekly', 'single', 0, 0);
      expect(result).toBeGreaterThan(0);
    });

    it('should handle additional withholding', () => {
      const result = calculateFederalIncomeTax(2000, 'biweekly', 'single', 0, 50);
      expect(result).toBeGreaterThan(50);
    });
  });

  describe('calculateSocialSecurityTax', () => {
    it('should calculate Social Security tax correctly', () => {
      const result = calculateSocialSecurityTax(2000, 'biweekly');
      expect(result).toBeCloseTo(124, 0); // 2000 * 0.062
    });

    it('should handle different pay periods', () => {
      const result = calculateSocialSecurityTax(4000, 'monthly');
      expect(result).toBeCloseTo(248, 0); // 4000 * 0.062
    });
  });

  describe('calculateMedicareTax', () => {
    it('should calculate regular Medicare tax', () => {
      const result = calculateMedicareTax(2000, 'biweekly', 0);
      expect(result).toBeCloseTo(29, 0); // 2000 * 0.0145
    });

    it('should handle additional Medicare tax for high earners', () => {
      const result = calculateMedicareTax(10000, 'biweekly', 0);
      expect(result).toBeGreaterThan(145); // Should include additional tax
    });
  });

  describe('calculateStateIncomeTax', () => {
    it('should calculate state tax correctly', () => {
      const result = calculateStateIncomeTax(2000, 'biweekly', 5);
      expect(result).toBe(100); // 2000 * 0.05
    });

    it('should handle zero state tax rate', () => {
      const result = calculateStateIncomeTax(2000, 'biweekly', 0);
      expect(result).toBe(0);
    });
  });

  describe('calculateTotalDeductions', () => {
    it('should sum all deductions correctly', () => {
      const result = calculateTotalDeductions(200, 124, 29, 100, 50);
      expect(result).toBe(503);
    });
  });

  describe('calculateNetPay', () => {
    it('should calculate net pay correctly', () => {
      const result = calculateNetPay(2000, 503);
      expect(result).toBe(1497);
    });
  });

  describe('calculatePaycheck - Main Calculation', () => {
    it('should calculate complete paycheck for hourly employee', () => {
      const inputs = {
        payType: 'hourly',
        hourlyRate: 25,
        hoursWorked: 40,
        overtimeHours: 0,
        payPeriod: 'biweekly',
        filingStatus: 'single',
        dependents: 0,
        additionalWithholding: 0,
        additionalMedicareTax: 0,
        stateTaxRate: 5,
        otherDeductions: 0
      };

      const result = calculatePaycheck(inputs);

      expect(result).toHaveProperty('grossPay');
      expect(result).toHaveProperty('federalTax');
      expect(result).toHaveProperty('socialSecurityTax');
      expect(result).toHaveProperty('medicareTax');
      expect(result).toHaveProperty('stateTax');
      expect(result).toHaveProperty('totalDeductions');
      expect(result).toHaveProperty('netPay');

      expect(result.grossPay).toBe(1000); // 25 * 40
      expect(result.netPay).toBeLessThan(result.grossPay);
    });

    it('should calculate complete paycheck for salaried employee', () => {
      const inputs = {
        payType: 'salary',
        annualSalary: 60000,
        payPeriod: 'biweekly',
        filingStatus: 'married',
        dependents: 1,
        additionalWithholding: 0,
        additionalMedicareTax: 0,
        stateTaxRate: 0,
        otherDeductions: 0
      };

      const result = calculatePaycheck(inputs);

      expect(result.grossPay).toBeCloseTo(2307.69, 0); // 60000 / 26
      expect(result.netPay).toBeLessThan(result.grossPay);
    });

    it('should handle overtime calculations', () => {
      const inputs = {
        payType: 'hourly',
        hourlyRate: 20,
        hoursWorked: 45,
        overtimeHours: 5,
        payPeriod: 'biweekly',
        filingStatus: 'single',
        dependents: 0,
        additionalWithholding: 0,
        additionalMedicareTax: 0,
        stateTaxRate: 0,
        otherDeductions: 0
      };

      const result = calculatePaycheck(inputs);

      expect(result.grossPay).toBe(950); // (20 * 40) + (20 * 5 * 1.5)
      expect(result.netPay).toBeLessThan(result.grossPay);
    });

    it('should handle additional deductions', () => {
      const inputs = {
        payType: 'salary',
        annualSalary: 50000,
        payPeriod: 'monthly',
        filingStatus: 'single',
        dependents: 0,
        additionalWithholding: 50,
        additionalMedicareTax: 0,
        stateTaxRate: 0,
        otherDeductions: 100
      };

      const result = calculatePaycheck(inputs);

      expect(result.grossPay).toBeCloseTo(4166.67, 0); // 50000 / 12
      expect(result.totalDeductions).toBeGreaterThan(150); // federal + SS + Medicare + additional
      expect(result.netPay).toBe(result.grossPay - result.totalDeductions);
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct calculator properties', () => {
      expect(paycheckCalculator.id).toBe('paycheck-calculator');
      expect(paycheckCalculator.title).toBe('Paycheck Calculator');
      expect(paycheckCalculator.category).toBe('business');
      expect(paycheckCalculator.subcategory).toBe('payroll');
    });

    it('should have required input fields', () => {
      const requiredInputs = paycheckCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);

      const payTypeInput = paycheckCalculator.inputs.find(input => input.id === 'payType');
      expect(payTypeInput?.required).toBe(true);
    });

    it('should have all required output fields', () => {
      const outputIds = paycheckCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('grossPay');
      expect(outputIds).toContain('netPay');
      expect(outputIds).toContain('federalTax');
      expect(outputIds).toContain('socialSecurityTax');
      expect(outputIds).toContain('medicareTax');
    });

    it('should have validation rules', () => {
      expect(paycheckCalculator.validationRules).toBeDefined();
      expect(paycheckCalculator.validationRules.length).toBeGreaterThan(0);
    });

    it('should have example calculations', () => {
      expect(paycheckCalculator.examples).toBeDefined();
      expect(paycheckCalculator.examples.length).toBeGreaterThan(0);

      const example = paycheckCalculator.examples[0];
      expect(example).toHaveProperty('inputs');
      expect(example).toHaveProperty('expectedOutputs');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero hours worked', () => {
      const inputs = {
        payType: 'hourly',
        hourlyRate: 20,
        hoursWorked: 0,
        overtimeHours: 0,
        payPeriod: 'weekly',
        filingStatus: 'single',
        dependents: 0,
        additionalWithholding: 0,
        additionalMedicareTax: 0,
        stateTaxRate: 0,
        otherDeductions: 0
      };

      const result = calculatePaycheck(inputs);
      expect(result.grossPay).toBe(0);
      expect(result.netPay).toBe(0);
    });

    it('should handle high salary with additional Medicare tax', () => {
      const inputs = {
        payType: 'salary',
        annualSalary: 250000,
        payPeriod: 'monthly',
        filingStatus: 'single',
        dependents: 0,
        additionalWithholding: 0,
        additionalMedicareTax: 0,
        stateTaxRate: 0,
        otherDeductions: 0
      };

      const result = calculatePaycheck(inputs);
      expect(result.medicareTax).toBeGreaterThan(result.grossPay * 0.0145); // Should include additional tax
    });

    it('should handle maximum dependents', () => {
      const inputs = {
        payType: 'salary',
        annualSalary: 60000,
        payPeriod: 'biweekly',
        filingStatus: 'married',
        dependents: 10,
        additionalWithholding: 0,
        additionalMedicareTax: 0,
        stateTaxRate: 0,
        otherDeductions: 0
      };

      const result = calculatePaycheck(inputs);
      expect(result.federalTax).toBeGreaterThan(0);
      expect(result.netPay).toBeLessThan(result.grossPay);
    });
  });
});
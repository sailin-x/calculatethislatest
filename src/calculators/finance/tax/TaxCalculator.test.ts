import { describe, it, expect } from 'vitest';
import { TaxCalculator } from './TaxCalculator';
import { validateTaxInputs } from './validation';
import { validateAllTaxInputs } from './quickValidation';
import { calculateTax, generateTaxAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

describe('TaxCalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(TaxCalculator.id).toBe('tax-calculator');
      expect(TaxCalculator.name).toBe('Tax Calculator');
      expect(TaxCalculator.category).toBe('finance');
      expect(TaxCalculator.subcategory).toBe('taxes');
    });

    it('should have required inputs', () => {
      const requiredInputs = TaxCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      expect(requiredInputs.some(input => input.id === 'filingStatus')).toBe(true);
      expect(requiredInputs.some(input => input.id === 'taxYear')).toBe(true);
    });

    it('should have expected outputs', () => {
      const outputIds = TaxCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('grossIncome');
      expect(outputIds).toContain('adjustedGrossIncome');
      expect(outputIds).toContain('taxableIncome');
      expect(outputIds).toContain('federalTax');
      expect(outputIds).toContain('totalTax');
      expect(outputIds).toContain('effectiveTaxRate');
      expect(outputIds).toContain('marginalTaxRate');
      expect(outputIds).toContain('federalRefund');
      expect(outputIds).toContain('totalRefund');
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof TaxCalculator.calculate).toBe('function');
      expect(typeof TaxCalculator.generateReport).toBe('function');
    });
  });

  describe('Input Validation', () => {
    describe('Comprehensive Validation', () => {
      it('should validate required fields', () => {
        const inputs: CalculatorInputs = {};
        const result = validateTaxInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Filing status is required');
        expect(result.errors).toContain('Tax year is required');
      });

      it('should validate valid inputs', () => {
        const inputs: CalculatorInputs = {
          filingStatus: 'single',
          taxYear: '2024',
          wages: 75000
        };
        const result = validateTaxInputs(inputs);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should validate income ranges', () => {
        const inputs: CalculatorInputs = {
          filingStatus: 'single',
          taxYear: '2024',
          wages: -1000
        };
        const result = validateTaxInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Wages cannot be negative');
      });

      it('should validate deduction limits', () => {
        const inputs: CalculatorInputs = {
          filingStatus: 'single',
          taxYear: '2024',
          stateLocalTaxes: 15000
        };
        const result = validateTaxInputs(inputs);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('State and local taxes cannot exceed $10,000 (SALT cap)');
      });

      it('should provide warnings for optimization opportunities', () => {
        const inputs: CalculatorInputs = {
          filingStatus: 'single',
          taxYear: '2024',
          iraContribution: 3000
        };
        const result = validateTaxInputs(inputs);
        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Consider maximizing IRA contribution for additional tax savings');
      });
    });

    describe('Quick Validation', () => {
      it('should validate individual fields', () => {
        const { validateFilingStatus, validateWages, validateIraContribution } = require('./quickValidation');
        
        expect(validateFilingStatus('single')).toBeNull();
        expect(validateFilingStatus('invalid')).toContain('Filing status must be one of');
        
        expect(validateWages(50000)).toBeNull();
        expect(validateWages(-1000)).toContain('Wages cannot be negative');
        
        expect(validateIraContribution(6000)).toBeNull();
        expect(validateIraContribution(8000)).toContain('IRA contribution cannot exceed $7,000');
      });

      it('should validate all inputs together', () => {
        const inputs: CalculatorInputs = {
          filingStatus: 'single',
          taxYear: '2024',
          wages: 75000,
          iraContribution: 3000
        };
        const result = validateAllTaxInputs(inputs);
        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Consider maximizing IRA contribution for additional tax savings');
      });
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic tax for single filer', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024',
        wages: 75000
      };
      const outputs = calculateTax(inputs);
      
      expect(outputs.grossIncome).toBe(75000);
      expect(outputs.adjustedGrossIncome).toBe(75000);
      expect(outputs.taxableIncome).toBe(75000 - 14600); // Standard deduction
      expect(outputs.federalTax).toBeGreaterThan(0);
      expect(outputs.effectiveTaxRate).toBeGreaterThan(0);
      expect(outputs.marginalTaxRate).toBeGreaterThan(0);
    });

    it('should calculate tax with itemized deductions', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024',
        wages: 100000,
        standardDeduction: 'itemized',
        stateLocalTaxes: 8000,
        mortgageInterest: 12000,
        charitableContributions: 2000
      };
      const outputs = calculateTax(inputs);
      
      expect(outputs.itemizedDeductions).toBe(22000);
      expect(outputs.taxableIncome).toBe(100000 - 22000);
    });

    it('should calculate tax with credits', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'married-filing-jointly',
        taxYear: '2024',
        wages: 80000,
        childTaxCredit: 2
      };
      const outputs = calculateTax(inputs);
      
      expect(outputs.totalCredits).toBeGreaterThan(0);
      expect(outputs.federalTax).toBeGreaterThanOrEqual(0);
    });

    it('should calculate refund/amount owed', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024',
        wages: 75000,
        federalWithholding: 15000
      };
      const outputs = calculateTax(inputs);
      
      expect(outputs.federalRefund).toBeDefined();
      expect(outputs.totalRefund).toBeDefined();
    });

    it('should handle zero income', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024'
      };
      const outputs = calculateTax(inputs);
      
      expect(outputs.grossIncome).toBe(0);
      expect(outputs.federalTax).toBe(0);
      expect(outputs.effectiveTaxRate).toBe(0);
    });

    it('should calculate state taxes', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024',
        wages: 75000,
        stateOfResidence: 'ca',
        stateIncome: 75000
      };
      const outputs = calculateTax(inputs);
      
      expect(outputs.stateTax).toBeGreaterThan(0);
      expect(outputs.totalTax).toBe(outputs.federalTax + outputs.stateTax);
    });

    it('should handle above-the-line deductions', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024',
        wages: 75000,
        studentLoanInterest: 2500,
        iraContribution: 6000
      };
      const outputs = calculateTax(inputs);
      
      expect(outputs.adjustedGrossIncome).toBe(75000 - 2500 - 6000);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very high income', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024',
        wages: 1000000
      };
      const outputs = calculateTax(inputs);
      
      expect(outputs.federalTax).toBeGreaterThan(0);
      expect(outputs.effectiveTaxRate).toBeLessThan(40);
    });

    it('should handle AMT', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024',
        wages: 500000,
        amtIncome: 500000,
        amtPreferences: 100000
      };
      const outputs = calculateTax(inputs);
      
      expect(outputs.alternativeMinimumTax).toBeGreaterThanOrEqual(0);
    });

    it('should handle multiple income sources', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024',
        wages: 75000,
        selfEmployment: 25000,
        interest: 1000,
        dividends: 2000,
        capitalGains: 5000
      };
      const outputs = calculateTax(inputs);
      
      expect(outputs.grossIncome).toBe(108000);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024',
        wages: 75000,
        iraContribution: 6000,
        federalWithholding: 12000
      };
      const outputs = calculateTax(inputs);
      const report = generateTaxAnalysis(inputs, outputs);
      
      expect(report).toContain('Tax Analysis Report');
      expect(report).toContain('Income Summary');
      expect(report).toContain('Tax Calculation');
      expect(report).toContain('Refund Analysis');
      expect(report).toContain('Recommendations');
    });

    it('should include optimization suggestions', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024',
        wages: 75000,
        iraContribution: 3000
      };
      const outputs = calculateTax(inputs);
      const report = generateTaxAnalysis(inputs, outputs);
      
      expect(report).toContain('Optimization');
    });

    it('should handle different filing statuses in report', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'married-filing-jointly',
        taxYear: '2024',
        wages: 150000
      };
      const outputs = calculateTax(inputs);
      const report = generateTaxAnalysis(inputs, outputs);
      
      expect(report).toContain('Married Filing Jointly');
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator interface', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'single',
        taxYear: '2024',
        wages: 75000
      };
      
      const outputs = TaxCalculator.calculate(inputs);
      const report = TaxCalculator.generateReport(inputs, outputs);
      
      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
    });

    it('should handle validation errors gracefully', () => {
      const inputs: CalculatorInputs = {
        filingStatus: 'invalid',
        taxYear: '2024'
      };
      
      const result = validateTaxInputs(inputs);
      expect(result.isValid).toBe(false);
    });
  });
});

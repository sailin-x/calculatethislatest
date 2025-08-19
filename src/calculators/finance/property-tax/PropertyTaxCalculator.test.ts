import { describe, it, expect } from 'vitest';
import { propertyTaxCalculator } from './PropertyTaxCalculator';
import { calculatePropertyTax, calculateYearsBetween, calculateMonthsBetween } from './formulas';
import { validatePropertyTaxInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

describe('Property Tax Calculator', () => {
  describe('calculatePropertyTax', () => {
    it('should calculate property tax correctly with basic inputs', () => {
      const inputs = {
        propertyValue: 500000,
        assessedValue: 450000,
        taxRate: 1.2,
        propertyType: 'residential' as const,
        homesteadExemption: 50000,
        paymentFrequency: 'annual' as const,
        escrowIncluded: 'yes' as const,
        latePaymentPenalty: 5,
        earlyPaymentDiscount: 0,
        specialAssessments: 0,
        taxYear: 2024
      };

      const result = calculatePropertyTax(inputs);

      expect(result.taxableValue).toBe(400000); // 450000 - 50000
      expect(result.annualTaxAmount).toBe(4800); // 400000 * 1.2%
      expect(result.monthlyTaxPayment).toBe(400); // 4800 / 12
      expect(result.quarterlyTaxPayment).toBe(1200); // 4800 / 4
      expect(result.semiAnnualTaxPayment).toBe(2400); // 4800 / 2
      expect(result.totalExemptions).toBe(50000);
      expect(result.exemptionSavings).toBe(600); // 50000 * 1.2%
      expect(result.effectiveTaxRate).toBeCloseTo(0.96, 2); // 4800 / 500000 * 100
      expect(result.taxToValueRatio).toBeCloseTo(0.96, 2); // 4800 / 500000 * 100
      expect(result.latePaymentAmount).toBe(240); // 4800 * 5%
      expect(result.earlyPaymentSavings).toBe(0);
      expect(result.totalAnnualCost).toBe(4800);
      expect(result.paymentSchedule).toContain('Annual payment of $4,800');
    });

    it('should calculate property tax with multiple exemptions', () => {
      const inputs = {
        propertyValue: 350000,
        assessedValue: 315000,
        taxRate: 1.5,
        propertyType: 'residential' as const,
        homesteadExemption: 50000,
        seniorExemption: 25000,
        veteranExemption: 10000,
        paymentFrequency: 'quarterly' as const,
        escrowIncluded: 'no' as const,
        latePaymentPenalty: 5,
        earlyPaymentDiscount: 2,
        specialAssessments: 500,
        taxYear: 2024
      };

      const result = calculatePropertyTax(inputs);

      expect(result.taxableValue).toBe(230000); // 315000 - 85000
      expect(result.annualTaxAmount).toBe(3450); // 230000 * 1.5%
      expect(result.monthlyTaxPayment).toBe(287.5); // 3450 / 12
      expect(result.quarterlyTaxPayment).toBe(862.5); // 3450 / 4
      expect(result.semiAnnualTaxPayment).toBe(1725); // 3450 / 2
      expect(result.totalExemptions).toBe(85000);
      expect(result.exemptionSavings).toBe(1275); // 85000 * 1.5%
      expect(result.effectiveTaxRate).toBeCloseTo(0.99, 2); // 3450 / 350000 * 100
      expect(result.taxToValueRatio).toBeCloseTo(0.99, 2); // 3450 / 350000 * 100
      expect(result.latePaymentAmount).toBe(172.5); // 3450 * 5%
      expect(result.earlyPaymentSavings).toBe(69); // 3450 * 2%
      expect(result.totalAnnualCost).toBe(3950); // 3450 + 500
      expect(result.paymentSchedule).toContain('Quarterly payments');
    });

    it('should handle commercial property with green energy exemption', () => {
      const inputs = {
        propertyValue: 1200000,
        assessedValue: 1080000,
        taxRate: 2.1,
        propertyType: 'commercial' as const,
        homesteadExemption: 0,
        greenEnergyExemption: 200000,
        paymentFrequency: 'semi_annual' as const,
        escrowIncluded: 'no' as const,
        latePaymentPenalty: 8,
        earlyPaymentDiscount: 0,
        specialAssessments: 2000,
        taxYear: 2024
      };

      const result = calculatePropertyTax(inputs);

      expect(result.taxableValue).toBe(880000); // 1080000 - 200000
      expect(result.annualTaxAmount).toBe(18480); // 880000 * 2.1%
      expect(result.monthlyTaxPayment).toBe(1540); // 18480 / 12
      expect(result.quarterlyTaxPayment).toBe(4620); // 18480 / 4
      expect(result.semiAnnualTaxPayment).toBe(9240); // 18480 / 2
      expect(result.totalExemptions).toBe(200000);
      expect(result.exemptionSavings).toBe(4200); // 200000 * 2.1%
      expect(result.effectiveTaxRate).toBeCloseTo(1.54, 2); // 18480 / 1200000 * 100
      expect(result.taxToValueRatio).toBeCloseTo(1.54, 2); // 18480 / 1200000 * 100
      expect(result.latePaymentAmount).toBe(1478.4); // 18480 * 8%
      expect(result.earlyPaymentSavings).toBe(0);
      expect(result.totalAnnualCost).toBe(20480); // 18480 + 2000
      expect(result.paymentSchedule).toContain('Semi-annual payments');
    });

    it('should handle zero exemptions', () => {
      const inputs = {
        propertyValue: 300000,
        taxRate: 1.0,
        propertyType: 'residential' as const,
        paymentFrequency: 'annual' as const,
        escrowIncluded: 'yes' as const
      };

      const result = calculatePropertyTax(inputs);

      expect(result.taxableValue).toBe(300000);
      expect(result.annualTaxAmount).toBe(3000);
      expect(result.totalExemptions).toBe(0);
      expect(result.exemptionSavings).toBe(0);
      expect(result.effectiveTaxRate).toBe(1.0);
      expect(result.taxToValueRatio).toBe(1.0);
    });

    it('should handle exemptions exceeding assessed value', () => {
      const inputs = {
        propertyValue: 200000,
        assessedValue: 150000,
        taxRate: 1.5,
        propertyType: 'residential' as const,
        homesteadExemption: 200000, // Exceeds assessed value
        paymentFrequency: 'annual' as const,
        escrowIncluded: 'yes' as const
      };

      const result = calculatePropertyTax(inputs);

      expect(result.taxableValue).toBe(0); // Cannot be negative
      expect(result.annualTaxAmount).toBe(0);
      expect(result.totalExemptions).toBe(200000);
      expect(result.exemptionSavings).toBe(3000); // 200000 * 1.5%
    });
  });

  describe('Additional calculation functions', () => {
    it('should calculate years between dates', () => {
      const years = calculateYearsBetween('2020-01-01', '2024-01-01');
      expect(years).toBeCloseTo(4, 1);
    });

    it('should calculate months between dates', () => {
      const months = calculateMonthsBetween('2023-01-01', '2024-06-01');
      expect(months).toBe(17);
    });
  });

  describe('validatePropertyTaxInputs', () => {
    it('should validate required fields', () => {
      const inputs = {};
      const errors = validatePropertyTaxInputs(inputs);
      expect(errors).toContain('Property Value is required');
      expect(errors).toContain('Property Tax Rate is required');
      expect(errors).toContain('Property Type is required');
      expect(errors).toContain('Payment Frequency is required');
      expect(errors).toContain('Escrow Inclusion is required');
    });

    it('should validate range constraints', () => {
      const inputs = {
        propertyValue: -1000,
        taxRate: 15,
        homesteadExemption: 150000,
        latePaymentPenalty: 30,
        earlyPaymentDiscount: 15,
        specialAssessments: 60000,
        taxYear: 2019
      };
      const errors = validatePropertyTaxInputs(inputs);
      expect(errors).toContain('Property Value must be positive');
      expect(errors).toContain('Tax Rate must be between 0.1% and 10%');
      expect(errors).toContain('Homestead Exemption must be between $0 and $100,000');
      expect(errors).toContain('Late Payment Penalty must be between 0% and 25%');
      expect(errors).toContain('Early Payment Discount must be between 0% and 10%');
      expect(errors).toContain('Special Assessments must be between $0 and $50,000');
      expect(errors).toContain('Tax Year must be between 2020 and 2030');
    });

    it('should validate business logic', () => {
      const inputs = {
        propertyValue: 500000,
        assessedValue: 800000, // Exceeds 150% of property value
        taxRate: 1.2,
        propertyType: 'residential' as const,
        homesteadExemption: 200000, // Exceeds 30% of property value
        paymentFrequency: 'annual' as const,
        escrowIncluded: 'yes' as const
      };
      const errors = validatePropertyTaxInputs(inputs);
      expect(errors).toContain('Assessed value should not exceed 150% of property value');
      expect(errors).toContain('Homestead exemption should not exceed 30% of property value');
    });

    it('should validate property type specific rules', () => {
      const inputs = {
        propertyValue: 500000,
        taxRate: 1.2,
        propertyType: 'commercial' as const,
        homesteadExemption: 50000, // Not applicable to commercial
        paymentFrequency: 'annual' as const,
        escrowIncluded: 'yes' as const
      };
      const errors = validatePropertyTaxInputs(inputs);
      expect(errors).toContain('Homestead exemption is not applicable to commercial properties');
    });

    it('should validate total exemptions', () => {
      const inputs = {
        propertyValue: 500000,
        assessedValue: 400000,
        taxRate: 1.2,
        propertyType: 'residential' as const,
        homesteadExemption: 200000,
        seniorExemption: 150000,
        veteranExemption: 100000, // Total: 450000 > 400000
        paymentFrequency: 'annual' as const,
        escrowIncluded: 'yes' as const
      };
      const errors = validatePropertyTaxInputs(inputs);
      expect(errors).toContain('Total exemptions cannot exceed assessed value');
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        propertyValue: 500000,
        assessedValue: 450000,
        taxRate: 1.2,
        propertyType: 'residential' as const,
        homesteadExemption: 50000,
        paymentFrequency: 'annual' as const,
        escrowIncluded: 'yes' as const,
        latePaymentPenalty: 5,
        earlyPaymentDiscount: 0,
        specialAssessments: 0,
        taxYear: 2024
      };

      const errors = validatePropertyTaxInputs(inputs);
      expect(errors).toHaveLength(0);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs and return results', () => {
      const inputs = {
        propertyValue: 500000,
        assessedValue: 450000,
        taxRate: 1.2,
        propertyType: 'residential' as const,
        homesteadExemption: 50000,
        paymentFrequency: 'annual' as const,
        escrowIncluded: 'yes' as const
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(16); // All input fields
      expect(results.every(result => result.isValid)).toBe(true);
    });

    it('should detect invalid inputs', () => {
      const inputs = {
        propertyValue: -1000, // Invalid
        taxRate: 1.2,
        propertyType: 'residential' as const,
        paymentFrequency: 'annual' as const,
        escrowIncluded: 'yes' as const
      };

      const results = quickValidateAllInputs(inputs);
      const propertyValueResult = results[0];
      expect(propertyValueResult.isValid).toBe(false);
      expect(propertyValueResult.message).toContain('must be positive');
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct structure', () => {
      expect(propertyTaxCalculator.id).toBe('property-tax');
      expect(propertyTaxCalculator.title).toBe('Property Tax Calculator');
      expect(propertyTaxCalculator.category).toBe('finance');
      expect(propertyTaxCalculator.subcategory).toBe('tax');
      expect(propertyTaxCalculator.inputs).toHaveLength(16);
      expect(propertyTaxCalculator.outputs).toHaveLength(13);
      expect(propertyTaxCalculator.formulas).toHaveLength(1);
      expect(propertyTaxCalculator.validationRules).toBeDefined();
      expect(propertyTaxCalculator.examples).toHaveLength(3);
    });

    it('should have required inputs', () => {
      const requiredInputs = propertyTaxCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(5); // propertyValue, taxRate, propertyType, paymentFrequency, escrowIncluded
    });

    it('should have correct output structure', () => {
      const outputs = propertyTaxCalculator.outputs;
      expect(outputs.find(o => o.id === 'taxableValue')).toBeDefined();
      expect(outputs.find(o => o.id === 'annualTaxAmount')).toBeDefined();
      expect(outputs.find(o => o.id === 'monthlyTaxPayment')).toBeDefined();
      expect(outputs.find(o => o.id === 'quarterlyTaxPayment')).toBeDefined();
      expect(outputs.find(o => o.id === 'semiAnnualTaxPayment')).toBeDefined();
      expect(outputs.find(o => o.id === 'totalExemptions')).toBeDefined();
      expect(outputs.find(o => o.id === 'exemptionSavings')).toBeDefined();
      expect(outputs.find(o => o.id === 'effectiveTaxRate')).toBeDefined();
      expect(outputs.find(o => o.id === 'taxToValueRatio')).toBeDefined();
      expect(outputs.find(o => o.id === 'latePaymentAmount')).toBeDefined();
      expect(outputs.find(o => o.id === 'earlyPaymentSavings')).toBeDefined();
      expect(outputs.find(o => o.id === 'totalAnnualCost')).toBeDefined();
      expect(outputs.find(o => o.id === 'paymentSchedule')).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator examples', () => {
      const example = propertyTaxCalculator.examples[0];
      const result = calculatePropertyTax(example.inputs);

      expect(result.taxableValue).toBeGreaterThan(0);
      expect(result.annualTaxAmount).toBeGreaterThan(0);
      expect(result.monthlyTaxPayment).toBeGreaterThan(0);
      expect(result.quarterlyTaxPayment).toBeGreaterThan(0);
      expect(result.semiAnnualTaxPayment).toBeGreaterThan(0);
      expect(result.totalExemptions).toBeGreaterThanOrEqual(0);
      expect(result.exemptionSavings).toBeGreaterThanOrEqual(0);
      expect(result.effectiveTaxRate).toBeGreaterThanOrEqual(0);
      expect(result.taxToValueRatio).toBeGreaterThanOrEqual(0);
      expect(result.latePaymentAmount).toBeGreaterThanOrEqual(0);
      expect(result.earlyPaymentSavings).toBeGreaterThanOrEqual(0);
      expect(result.totalAnnualCost).toBeGreaterThan(0);
      expect(result.paymentSchedule).toBeDefined();
    });

    it('should validate calculator examples', () => {
      propertyTaxCalculator.examples.forEach(example => {
        const errors = validatePropertyTaxInputs(example.inputs);
        expect(errors).toHaveLength(0);
      });
    });

    it('should pass quick validation for all examples', () => {
      propertyTaxCalculator.examples.forEach(example => {
        const results = quickValidateAllInputs(example.inputs);
        const hasErrors = results.some(result => !result.isValid);
        expect(hasErrors).toBe(false);
      });
    });
  });
});
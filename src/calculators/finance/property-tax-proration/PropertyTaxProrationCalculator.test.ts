import { describe, it, expect } from 'vitest';
import { propertyTaxProrationCalculator } from './PropertyTaxProrationCalculator';
import { calculatePropertyTaxProration, calculateYearsBetween, calculateMonthsBetween, calculateDaysBetween } from './formulas';
import { validatePropertyTaxProrationInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

describe('Property Tax Proration Calculator', () => {
  describe('calculatePropertyTaxProration', () => {
    it('should calculate basic proration correctly', () => {
      const inputs = {
        annualPropertyTax: 6000,
        closingDate: '2024-06-15',
        taxYear: 2024,
        taxPaymentSchedule: 'annual' as const,
        prorationMethod: '365_day' as const,
        calculationType: 'basic' as const
      };

      const result = calculatePropertyTaxProration(inputs);

      expect(result.sellerDays).toBe(166); // Jan 1 to Jun 15 (leap year)
      expect(result.buyerDays).toBe(199); // Jun 16 to Dec 31
      expect(result.dailyTaxRate).toBeCloseTo(16.44, 2); // 6000 / 365
      expect(result.sellerTaxObligation).toBeCloseTo(2728.77, 2); // 166 * 16.44
      expect(result.buyerTaxObligation).toBeCloseTo(3271.23, 2); // 199 * 16.44
      expect(result.sellerCredit).toBeCloseTo(2728.77, 2); // sellerTaxObligation - sellerPaidTaxes
      expect(result.buyerDebit).toBeCloseTo(3271.23, 2); // buyerTaxObligation
      expect(result.netProration).toBeCloseTo(2728.77, 2); // sellerCredit
      expect(result.nextTaxPayment).toBe(6000);
      expect(result.nextPaymentDate).toBe('2025-04-15');
      expect(result.escrowMonthlyPayment).toBe(500); // 6000 / 12
    });

    it('should calculate proration with seller paid taxes', () => {
      const inputs = {
        annualPropertyTax: 4800,
        closingDate: '2024-08-01',
        taxYear: 2024,
        taxPaymentSchedule: 'semi_annual' as const,
        prorationMethod: '365_day' as const,
        sellerPaidTaxes: 2400,
        calculationType: 'detailed' as const
      };

      const result = calculatePropertyTaxProration(inputs);

      expect(result.sellerDays).toBe(213); // Jan 1 to Aug 1
      expect(result.buyerDays).toBe(152); // Aug 2 to Dec 31
      expect(result.dailyTaxRate).toBeCloseTo(13.15, 2); // 4800 / 365
      expect(result.sellerTaxObligation).toBeCloseTo(2801.10, 2); // 213 * 13.15
      expect(result.buyerTaxObligation).toBeCloseTo(1998.90, 2); // 152 * 13.15
      expect(result.sellerCredit).toBeCloseTo(401.10, 2); // 2801.10 - 2400
      expect(result.buyerDebit).toBeCloseTo(1998.90, 2);
      expect(result.netProration).toBeCloseTo(401.10, 2);
      expect(result.nextTaxPayment).toBe(2400);
      expect(result.nextPaymentDate).toBe('2024-10-15');
      expect(result.escrowMonthlyPayment).toBe(400); // 4800 / 12
    });

    it('should handle 360-day proration method', () => {
      const inputs = {
        annualPropertyTax: 3600,
        closingDate: '2024-09-30',
        taxYear: 2024,
        taxPaymentSchedule: 'quarterly' as const,
        prorationMethod: '360_day' as const,
        calculationType: 'basic' as const
      };

      const result = calculatePropertyTaxProration(inputs);

      expect(result.sellerDays).toBe(273); // Jan 1 to Sep 30
      expect(result.buyerDays).toBe(87); // Oct 1 to Dec 31
      expect(result.dailyTaxRate).toBe(10); // 3600 / 360
      expect(result.sellerTaxObligation).toBe(2730); // 273 * 10
      expect(result.buyerTaxObligation).toBe(870); // 87 * 10
      expect(result.sellerCredit).toBe(2730);
      expect(result.buyerDebit).toBe(870);
      expect(result.netProration).toBe(2730);
      expect(result.nextTaxPayment).toBe(900);
      expect(result.nextPaymentDate).toBe('2024-12-31');
      expect(result.escrowMonthlyPayment).toBe(300); // 3600 / 12
    });

    it('should handle actual days proration method', () => {
      const inputs = {
        annualPropertyTax: 3650,
        closingDate: '2024-06-15',
        taxYear: 2024,
        taxPaymentSchedule: 'annual' as const,
        prorationMethod: 'actual_days' as const,
        calculationType: 'basic' as const
      };

      const result = calculatePropertyTaxProration(inputs);

      expect(result.sellerDays).toBe(166); // Jan 1 to Jun 15 (leap year)
      expect(result.buyerDays).toBe(200); // Jun 16 to Dec 31
      expect(result.dailyTaxRate).toBeCloseTo(9.97, 2); // 3650 / 366 (leap year)
      expect(result.sellerTaxObligation).toBeCloseTo(1655.46, 2); // 166 * 9.97
      expect(result.buyerTaxObligation).toBeCloseTo(1994.54, 2); // 200 * 9.97
      expect(result.sellerCredit).toBeCloseTo(1655.46, 2);
      expect(result.buyerDebit).toBeCloseTo(1994.54, 2);
      expect(result.netProration).toBeCloseTo(1655.46, 2);
    });

    it('should handle custom tax payment dates', () => {
      const inputs = {
        annualPropertyTax: 4000,
        closingDate: '2024-07-01',
        taxYear: 2024,
        taxPaymentSchedule: 'quarterly' as const,
        prorationMethod: '365_day' as const,
        taxPaymentDates: '2024-03-31, 2024-06-30, 2024-09-30, 2024-12-31',
        calculationType: 'escrow' as const
      };

      const result = calculatePropertyTaxProration(inputs);

      expect(result.sellerDays).toBe(182); // Jan 1 to Jul 1
      expect(result.buyerDays).toBe(183); // Jul 2 to Dec 31
      expect(result.dailyTaxRate).toBeCloseTo(10.96, 2); // 4000 / 365
      expect(result.nextTaxPayment).toBe(1000); // 4000 / 4
      expect(result.nextPaymentDate).toBe('2024-09-30');
      expect(result.escrowMonthlyPayment).toBeCloseTo(333.33, 2); // 4000 / 12
    });

    it('should handle no escrow account', () => {
      const inputs = {
        annualPropertyTax: 5000,
        closingDate: '2024-05-15',
        taxYear: 2024,
        taxPaymentSchedule: 'annual' as const,
        prorationMethod: '365_day' as const,
        escrowAccount: 'no' as const,
        calculationType: 'basic' as const
      };

      const result = calculatePropertyTaxProration(inputs);

      expect(result.escrowMonthlyPayment).toBe(0); // No escrow
      expect(result.sellerDays).toBe(135); // Jan 1 to May 15
      expect(result.buyerDays).toBe(230); // May 16 to Dec 31
      expect(result.dailyTaxRate).toBeCloseTo(13.70, 2); // 5000 / 365
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

    it('should calculate days between dates', () => {
      const days = calculateDaysBetween('2024-01-01', '2024-01-15');
      expect(days).toBe(14);
    });
  });

  describe('validatePropertyTaxProrationInputs', () => {
    it('should validate required fields', () => {
      const inputs = {};
      const errors = validatePropertyTaxProrationInputs(inputs);
      expect(errors).toContain('Annual Property Tax is required');
      expect(errors).toContain('Closing Date is required');
      expect(errors).toContain('Tax Year is required');
      expect(errors).toContain('Tax Payment Schedule is required');
      expect(errors).toContain('Proration Method is required');
      expect(errors).toContain('Calculation Type is required');
    });

    it('should validate range constraints', () => {
      const inputs = {
        annualPropertyTax: -100,
        taxYear: 2019,
        sellerPaidTaxes: 150000,
        propertyValue: 5000,
        taxRate: 15,
        exemptions: 150000,
        specialAssessments: 60000,
        latePaymentPenalty: 30
      };
      const errors = validatePropertyTaxProrationInputs(inputs);
      expect(errors).toContain('Annual Property Tax must be positive');
      expect(errors).toContain('Tax Year must be between 2020 and 2030');
      expect(errors).toContain('Seller Paid Taxes must be between $0 and $100,000');
      expect(errors).toContain('Property Value must be between $10,000 and $10,000,000');
      expect(errors).toContain('Tax Rate must be between 0.1% and 10%');
      expect(errors).toContain('Exemptions must be between $0 and $100,000');
      expect(errors).toContain('Special Assessments must be between $0 and $50,000');
      expect(errors).toContain('Late Payment Penalty must be between 0% and 25%');
    });

    it('should validate business logic', () => {
      const inputs = {
        annualPropertyTax: 6000,
        closingDate: '2024-06-15',
        taxYear: 2024,
        taxPaymentSchedule: 'annual' as const,
        prorationMethod: '365_day' as const,
        sellerPaidTaxes: 7000, // Exceeds annual property tax
        calculationType: 'basic' as const
      };
      const errors = validatePropertyTaxProrationInputs(inputs);
      expect(errors).toContain('Seller paid taxes cannot exceed annual property tax amount');
    });

    it('should validate date formats', () => {
      const inputs = {
        annualPropertyTax: 5000,
        closingDate: 'invalid-date',
        taxYear: 2024,
        taxPaymentSchedule: 'annual' as const,
        prorationMethod: '365_day' as const,
        calculationType: 'basic' as const
      };
      const errors = validatePropertyTaxProrationInputs(inputs);
      expect(errors).toContain('Closing Date must be a valid date');
    });

    it('should validate tax payment dates', () => {
      const inputs = {
        annualPropertyTax: 5000,
        closingDate: '2024-06-15',
        taxYear: 2024,
        taxPaymentSchedule: 'annual' as const,
        prorationMethod: '365_day' as const,
        taxPaymentDates: '2024-04-15, invalid-date, 2024-10-15',
        calculationType: 'basic' as const
      };
      const errors = validatePropertyTaxProrationInputs(inputs);
      expect(errors).toContain('Invalid tax payment date: invalid-date');
    });

    it('should validate date consistency', () => {
      const inputs = {
        annualPropertyTax: 5000,
        closingDate: '2024-06-15',
        taxYear: 2024,
        taxPaymentSchedule: 'annual' as const,
        prorationMethod: '365_day' as const,
        assessmentDate: '2024-12-01', // After closing date
        calculationType: 'basic' as const
      };
      const errors = validatePropertyTaxProrationInputs(inputs);
      expect(errors).toContain('Assessment date cannot be after closing date');
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        annualPropertyTax: 5000,
        closingDate: '2024-06-15',
        taxYear: 2024,
        taxPaymentSchedule: 'annual' as const,
        prorationMethod: '365_day' as const,
        sellerPaidTaxes: 2000,
        propertyValue: 500000,
        taxRate: 1.0,
        calculationType: 'basic' as const
      };

      const errors = validatePropertyTaxProrationInputs(inputs);
      expect(errors).toHaveLength(0);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs and return results', () => {
      const inputs = {
        annualPropertyTax: 5000,
        closingDate: '2024-06-15',
        taxYear: 2024,
        taxPaymentSchedule: 'annual' as const,
        prorationMethod: '365_day' as const,
        calculationType: 'basic' as const
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(16); // All input fields
      expect(results.every(result => result.isValid)).toBe(true);
    });

    it('should detect invalid inputs', () => {
      const inputs = {
        annualPropertyTax: -100, // Invalid
        closingDate: '2024-06-15',
        taxYear: 2024,
        taxPaymentSchedule: 'annual' as const,
        prorationMethod: '365_day' as const,
        calculationType: 'basic' as const
      };

      const results = quickValidateAllInputs(inputs);
      const annualPropertyTaxResult = results[0];
      expect(annualPropertyTaxResult.isValid).toBe(false);
      expect(annualPropertyTaxResult.message).toContain('must be positive');
    });

    it('should validate date consistency', () => {
      const inputs = {
        annualPropertyTax: 5000,
        closingDate: '2024-06-15',
        taxYear: 2024,
        taxPaymentSchedule: 'annual' as const,
        prorationMethod: '365_day' as const,
        assessmentDate: '2024-01-01',
        calculationType: 'basic' as const
      };

      const results = quickValidateAllInputs(inputs);
      const dateConsistencyResult = results[15]; // Date consistency check
      expect(dateConsistencyResult.isValid).toBe(true);
      expect(dateConsistencyResult.message).toContain('Dates are consistent');
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct structure', () => {
      expect(propertyTaxProrationCalculator.id).toBe('property-tax-proration');
      expect(propertyTaxProrationCalculator.title).toBe('Property Tax Proration Calculator');
      expect(propertyTaxProrationCalculator.category).toBe('finance');
      expect(propertyTaxProrationCalculator.subcategory).toBe('tax');
      expect(propertyTaxProrationCalculator.inputs).toHaveLength(15);
      expect(propertyTaxProrationCalculator.outputs).toHaveLength(12);
      expect(propertyTaxProrationCalculator.formulas).toHaveLength(1);
      expect(propertyTaxProrationCalculator.validationRules).toBeDefined();
      expect(propertyTaxProrationCalculator.examples).toHaveLength(3);
    });

    it('should have required inputs', () => {
      const requiredInputs = propertyTaxProrationCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(6); // annualPropertyTax, closingDate, taxYear, taxPaymentSchedule, prorationMethod, calculationType
    });

    it('should have correct output structure', () => {
      const outputs = propertyTaxProrationCalculator.outputs;
      expect(outputs.find(o => o.id === 'sellerCredit')).toBeDefined();
      expect(outputs.find(o => o.id === 'buyerDebit')).toBeDefined();
      expect(outputs.find(o => o.id === 'sellerDays')).toBeDefined();
      expect(outputs.find(o => o.id === 'buyerDays')).toBeDefined();
      expect(outputs.find(o => o.id === 'dailyTaxRate')).toBeDefined();
      expect(outputs.find(o => o.id === 'sellerTaxObligation')).toBeDefined();
      expect(outputs.find(o => o.id === 'buyerTaxObligation')).toBeDefined();
      expect(outputs.find(o => o.id === 'netProration')).toBeDefined();
      expect(outputs.find(o => o.id === 'nextTaxPayment')).toBeDefined();
      expect(outputs.find(o => o.id === 'nextPaymentDate')).toBeDefined();
      expect(outputs.find(o => o.id === 'escrowMonthlyPayment')).toBeDefined();
      expect(outputs.find(o => o.id === 'prorationSummary')).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator examples', () => {
      const example = propertyTaxProrationCalculator.examples[0];
      const result = calculatePropertyTaxProration(example.inputs);

      expect(result.sellerCredit).toBeGreaterThanOrEqual(0);
      expect(result.buyerDebit).toBeGreaterThanOrEqual(0);
      expect(result.sellerDays).toBeGreaterThan(0);
      expect(result.buyerDays).toBeGreaterThan(0);
      expect(result.dailyTaxRate).toBeGreaterThan(0);
      expect(result.sellerTaxObligation).toBeGreaterThanOrEqual(0);
      expect(result.buyerTaxObligation).toBeGreaterThanOrEqual(0);
      expect(result.netProration).toBeGreaterThanOrEqual(-10000);
      expect(result.nextTaxPayment).toBeGreaterThan(0);
      expect(result.nextPaymentDate).toBeDefined();
      expect(result.escrowMonthlyPayment).toBeGreaterThanOrEqual(0);
      expect(result.prorationSummary).toBeDefined();
    });

    it('should validate calculator examples', () => {
      propertyTaxProrationCalculator.examples.forEach(example => {
        const errors = validatePropertyTaxProrationInputs(example.inputs);
        expect(errors).toHaveLength(0);
      });
    });

    it('should pass quick validation for all examples', () => {
      propertyTaxProrationCalculator.examples.forEach(example => {
        const results = quickValidateAllInputs(example.inputs);
        const hasErrors = results.some(result => !result.isValid);
        expect(hasErrors).toBe(false);
      });
    });
  });
});
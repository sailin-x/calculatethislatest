import { describe, it, expect } from 'vitest';
import { GroundLeaseValuationCalculator } from './GroundLeaseValuationCalculator';
import { calculateGroundLeaseValuation } from './formulas';
import { validateGroundLeaseInputs } from './validation';
import { validateAllGroundLeaseInputs } from './quickValidation';

describe('Ground Lease Valuation Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(GroundLeaseValuationCalculator.id).toBe('ground-lease-valuation-calculator');
      expect(GroundLeaseValuationCalculator.name).toBe('Ground Lease Valuation Calculator');
      expect(GroundLeaseValuationCalculator.category).toBe('finance');
      expect(GroundLeaseValuationCalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = ['landValue', 'leaseTerm', 'annualRent', 'rentEscalation', 'discountRate', 'landAppreciation', 'leaseType', 'propertyType', 'location', 'marketType'];
      requiredInputs.forEach(inputId => {
        const input = GroundLeaseValuationCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have expected outputs', () => {
      const expectedOutputs = ['presentValue', 'netPresentValue', 'internalRateOfReturn', 'cashOnCashReturn', 'capRate', 'totalIncome', 'totalExpenses', 'netIncome'];
      expectedOutputs.forEach(outputId => {
        const output = GroundLeaseValuationCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateGroundLeaseInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Land value is required');
      expect(result.errors).toContain('Lease term is required');
      expect(result.errors).toContain('Annual rent is required');
      expect(result.errors).toContain('Rent escalation rate is required');
      expect(result.errors).toContain('Discount rate is required');
      expect(result.errors).toContain('Land appreciation rate is required');
      expect(result.errors).toContain('Lease type is required');
      expect(result.errors).toContain('Property type is required');
      expect(result.errors).toContain('Location is required');
      expect(result.errors).toContain('Market type is required');
    });

    it('should validate data types', () => {
      const result = validateGroundLeaseInputs({
        landValue: 'invalid' as any,
        leaseTerm: 'invalid' as any,
        annualRent: 'invalid' as any,
        rentEscalation: 'invalid' as any,
        discountRate: 'invalid' as any,
        landAppreciation: 'invalid' as any,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'urban',
        marketType: 'stable'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Land value must be a number');
      expect(result.errors).toContain('Lease term must be a number');
      expect(result.errors).toContain('Annual rent must be a number');
      expect(result.errors).toContain('Rent escalation rate must be a number');
      expect(result.errors).toContain('Discount rate must be a number');
      expect(result.errors).toContain('Land appreciation rate must be a number');
    });

    it('should validate ranges', () => {
      const result = validateGroundLeaseInputs({
        landValue: 5000, // Too low
        leaseTerm: 1000, // Too high
        annualRent: 500, // Too low
        rentEscalation: 25, // Too high
        discountRate: 30, // Too high
        landAppreciation: 20, // Too high
        leaseType: 'net',
        propertyType: 'residential',
        location: 'urban',
        marketType: 'stable'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Land value must be between $10,000 and $100,000,000');
      expect(result.errors).toContain('Lease term must be between 1 and 999 years');
      expect(result.errors).toContain('Annual rent must be between $1,000 and $10,000,000');
      expect(result.errors).toContain('Rent escalation rate must be between 0% and 20%');
      expect(result.errors).toContain('Discount rate must be between 1% and 25%');
      expect(result.errors).toContain('Land appreciation rate must be between -10% and 15%');
    });

    it('should validate logical relationships', () => {
      const result = validateGroundLeaseInputs({
        landValue: 200000,
        leaseTerm: 50,
        annualRent: 250000, // Exceeds land value
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'urban',
        marketType: 'stable'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual rent cannot exceed land value');
    });

    it('should validate enum values', () => {
      const result = validateGroundLeaseInputs({
        landValue: 200000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'INVALID',
        propertyType: 'INVALID',
        location: 'INVALID',
        marketType: 'INVALID'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid lease type');
      expect(result.errors).toContain('Invalid property type');
      expect(result.errors).toContain('Invalid location');
      expect(result.errors).toContain('Invalid market type');
    });

    it('should pass validation with valid inputs', () => {
      const result = validateGroundLeaseInputs({
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable',
        reversionaryValue: 1000000
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic ground lease metrics correctly', () => {
      const inputs = {
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable'
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      expect(outputs.presentValue).toBeGreaterThan(0);
      expect(outputs.netPresentValue).toBeDefined();
      expect(outputs.capRate).toBe(5.0); // 25000 / 500000 * 100
      expect(outputs.totalIncome).toBeGreaterThan(0);
      expect(outputs.totalExpenses).toBeGreaterThanOrEqual(0);
      expect(outputs.netIncome).toBeDefined();
    });

    it('should calculate IRR correctly', () => {
      const inputs = {
        landValue: 500000,
        leaseTerm: 30,
        annualRent: 30000,
        rentEscalation: 2.5,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'triple-net',
        propertyType: 'commercial',
        location: 'urban',
        marketType: 'hot',
        operatingExpenses: 5000,
        propertyTaxes: 10000,
        insurance: 2000,
        maintenance: 1000,
        managementFees: 500
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      expect(outputs.internalRateOfReturn).toBeGreaterThan(0);
      expect(outputs.internalRateOfReturn).toBeLessThan(50); // Reasonable IRR range
    });

    it('should calculate cash-on-cash return correctly', () => {
      const inputs = {
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable',
        operatingExpenses: 5000,
        propertyTaxes: 8000,
        insurance: 2000,
        maintenance: 1000,
        managementFees: 500
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      const expectedCoC = ((25000 - 5000 - 8000 - 2000 - 1000 - 500) / 500000) * 100;
      expect(outputs.cashOnCashReturn).toBeCloseTo(expectedCoC, 1);
    });

    it('should calculate reversionary value correctly', () => {
      const inputs = {
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable'
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      const expectedReversionaryValue = 500000 * Math.pow(1 + 3.0 / 100, 50);
      expect(outputs.reversionaryValue).toBeCloseTo(expectedReversionaryValue, -3); // Within $1000
    });

    it('should calculate break-even analysis correctly', () => {
      const inputs = {
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable',
        operatingExpenses: 5000,
        propertyTaxes: 8000,
        insurance: 2000,
        maintenance: 1000,
        managementFees: 500
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      expect(outputs.breakEvenYears).toBeGreaterThan(0);
      expect(outputs.paybackPeriod).toBeGreaterThan(0);
      expect(outputs.breakEvenYears).toBeLessThanOrEqual(inputs.leaseTerm);
      expect(outputs.paybackPeriod).toBeLessThanOrEqual(inputs.leaseTerm);
    });

    it('should calculate profitability index correctly', () => {
      const inputs = {
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable'
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      expect(outputs.profitabilityIndex).toBeGreaterThan(0);
      expect(outputs.profitabilityIndex).toBe(outputs.presentValue / inputs.landValue);
    });
  });

  describe('Ground Lease Analysis', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = {
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable',
        tenantCredit: 'A',
        paymentFrequency: 'monthly'
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      const analysis = GroundLeaseValuationCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Ground Lease Valuation Analysis');
      expect(analysis).toContain('Executive Summary');
      expect(analysis).toContain('Investment Analysis');
      expect(analysis).toContain('Cash Flow Analysis');
      expect(analysis).toContain('Return Analysis');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('Market Analysis');
      expect(analysis).toContain('Break-Even Analysis');
      expect(analysis).toContain('Tax and Benefits Analysis');
      expect(analysis).toContain('Recommendations');
    });

    it('should include investment grade assessment', () => {
      const inputs = {
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable'
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      const analysis = GroundLeaseValuationCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Investment Grade:');
      expect(['A', 'B', 'C', 'D']).toContain(outputs.investmentGrade);
    });

    it('should include recommended action', () => {
      const inputs = {
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable'
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      const analysis = GroundLeaseValuationCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Recommended Action:');
      expect(outputs.recommendedAction).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum values', () => {
      const inputs = {
        landValue: 10000,
        leaseTerm: 1,
        annualRent: 1000,
        rentEscalation: 0,
        discountRate: 1,
        landAppreciation: -10,
        leaseType: 'gross',
        propertyType: 'agricultural',
        location: 'rural',
        marketType: 'declining'
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      expect(outputs.presentValue).toBeGreaterThan(0);
      expect(outputs.netPresentValue).toBeDefined();
      expect(outputs.capRate).toBe(10.0); // 1000 / 10000 * 100
    });

    it('should handle maximum values', () => {
      const inputs = {
        landValue: 100000000,
        leaseTerm: 999,
        annualRent: 10000000,
        rentEscalation: 20,
        discountRate: 25,
        landAppreciation: 15,
        leaseType: 'triple-net',
        propertyType: 'commercial',
        location: 'urban',
        marketType: 'hot'
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      expect(outputs.presentValue).toBeGreaterThan(0);
      expect(outputs.netPresentValue).toBeDefined();
      expect(outputs.capRate).toBe(10.0); // 10000000 / 100000000 * 100
    });

    it('should handle zero optional values', () => {
      const inputs = {
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable',
        operatingExpenses: 0,
        propertyTaxes: 0,
        insurance: 0,
        maintenance: 0,
        managementFees: 0
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      expect(outputs.totalExpenses).toBe(0);
      expect(outputs.yearlyCashFlow).toBe(25000);
      expect(outputs.monthlyCashFlow).toBe(25000 / 12);
    });

    it('should handle custom reversionary value', () => {
      const inputs = {
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable',
        reversionaryValue: 800000
      };

      const outputs = calculateGroundLeaseValuation(inputs);
      expect(outputs.reversionaryValue).toBe(800000);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const result = validateAllGroundLeaseInputs({
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable'
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch individual field errors', () => {
      const result = validateAllGroundLeaseInputs({
        landValue: 5000, // Too low
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'INVALID',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Land value must be between $10,000 and $100,000,000');
      expect(result.errors).toContain('Invalid lease type');
    });

    it('should validate logical relationships', () => {
      const result = validateAllGroundLeaseInputs({
        landValue: 200000,
        leaseTerm: 50,
        annualRent: 250000, // Exceeds land value
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual rent cannot exceed land value');
    });

    it('should validate date format', () => {
      const result = validateAllGroundLeaseInputs({
        landValue: 500000,
        leaseTerm: 50,
        annualRent: 25000,
        rentEscalation: 2.0,
        discountRate: 8.0,
        landAppreciation: 3.0,
        leaseType: 'net',
        propertyType: 'residential',
        location: 'suburban',
        marketType: 'stable',
        leaseStartDate: '2024-13-01' // Invalid date
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid lease start date');
    });
  });
});

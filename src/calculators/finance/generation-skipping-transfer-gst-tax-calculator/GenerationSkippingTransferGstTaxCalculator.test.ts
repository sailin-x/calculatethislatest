import { describe, it, expect } from 'vitest';
import {
  calculateGstTaxDue,
  calculateAfterTaxTransferAmount,
  calculateTaxSavingsFromExemption,
  calculateEffectiveTaxRate,
  calculateRemainingGstExemption
} from './formulas';
import { validateGenerationSkippingTransferGstTaxCalculatorInputs } from './validation';

describe('Generation-Skipping Transfer (GST) Tax Calculator', () => {
  const mockInputs = {
    transferAmount: 5000000,
    relationship: 'grandchild' as const,
    gstExemptionUsed: 0,
    gstTaxRate: 40,
    isDirectSkip: false,
    isTrustDistribution: false
  };

  describe('Core GST Tax Calculations', () => {
    it('calculates GST tax due correctly for transfer within exemption', () => {
      const result = calculateGstTaxDue(mockInputs);
      expect(result).toBe(0); // Within $13.61M exemption
    });

    it('calculates GST tax due correctly for transfer exceeding exemption', () => {
      const largeTransferInputs = { ...mockInputs, transferAmount: 15000000 };
      const result = calculateGstTaxDue(largeTransferInputs);
      expect(result).toBe(1444000); // (15000000 - 13610000) * 0.40
    });

    it('calculates after-tax transfer amount correctly', () => {
      const result = calculateAfterTaxTransferAmount(mockInputs);
      expect(result).toBe(5000000); // No tax due
    });

    it('calculates tax savings from exemption correctly', () => {
      const result = calculateTaxSavingsFromExemption(mockInputs);
      expect(result).toBe(2000000); // 5000000 * 0.40
    });

    it('calculates effective tax rate correctly', () => {
      const result = calculateEffectiveTaxRate(mockInputs);
      expect(result).toBe(0); // No tax due
    });

    it('calculates remaining GST exemption correctly', () => {
      const result = calculateRemainingGstExemption(mockInputs);
      expect(result).toBe(8610000); // 13610000 - 5000000
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateGenerationSkippingTransferGstTaxCalculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates transfer amount cannot be zero', () => {
      const invalidInputs = { ...mockInputs, transferAmount: 0 };
      const result = validateGenerationSkippingTransferGstTaxCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('greater than 0');
    });

    it('validates GST tax rate range', () => {
      const invalidInputs = { ...mockInputs, gstTaxRate: 150 };
      const result = validateGenerationSkippingTransferGstTaxCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero exemption used', () => {
      const result = calculateGstTaxDue(mockInputs);
      expect(result).toBe(0);
    });

    it('handles partial exemption utilization', () => {
      const partialInputs = { ...mockInputs, gstExemptionUsed: 10000000, transferAmount: 5000000 };
      const result = calculateGstTaxDue(partialInputs);
      expect(result).toBe(0); // Still within remaining exemption
    });

    it('handles full exemption utilization', () => {
      const fullInputs = { ...mockInputs, gstExemptionUsed: 13610000, transferAmount: 1000000 };
      const result = calculateGstTaxDue(fullInputs);
      expect(result).toBe(400000); // 1000000 * 0.40
    });

    it('handles direct skip transfers', () => {
      const directSkipInputs = { ...mockInputs, isDirectSkip: true, gstExemptionUsed: 13610000 };
      const result = calculateGstTaxDue(directSkipInputs);
      expect(result).toBe(2000000); // 5000000 * 0.40 (no exemption)
    });
  });

  describe('Business Rules', () => {
    it('validates large transfer warnings', () => {
      const largeTransferInputs = { ...mockInputs, transferAmount: 15000000 };
      const result = validateGenerationSkippingTransferGstTaxCalculatorInputs(largeTransferInputs);
      expect(result.length).toBe(0); // Should validate but may have warnings
    });

    it('handles trust distribution considerations', () => {
      const trustInputs = { ...mockInputs, isTrustDistribution: true };
      const result = validateGenerationSkippingTransferGstTaxCalculatorInputs(trustInputs);
      expect(result.length).toBe(0);
    });
  });
});
import { describe, it, expect } from 'vitest';
import { calculateAssetBasedLendingResults } from './formulas';
import { validateAssetBasedLendingInputs } from './validation';
import { AssetBasedLendingCalculatorInputs } from './types';

describe('AssetBasedLendingCalculator', () => {
  describe('calculateAssetBasedLendingResults', () => {
    it('should calculate results correctly for basic scenario', () => {
      const inputs: AssetBasedLendingCalculatorInputs = {
        assetValue: 1000000,
        advanceRate: 70,
        interestRate: 8,
        loanTerm: 60,
        originationFee: 1,
        monitoringFee: 0.5
      };

      const result = calculateAssetBasedLendingResults(inputs);

      expect(result.maximumLoanAmount).toBe(700000);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterestPaid).toBeGreaterThan(0);
      expect(result.totalFees).toBeGreaterThan(0);
      expect(result.totalCost).toBeGreaterThan(0);
      expect(result.effectiveInterestRate).toBeGreaterThan(0);
    });

    it('should handle zero fees correctly', () => {
      const inputs: AssetBasedLendingCalculatorInputs = {
        assetValue: 500000,
        advanceRate: 80,
        interestRate: 6,
        loanTerm: 36,
        originationFee: 0,
        monitoringFee: 0
      };

      const result = calculateAssetBasedLendingResults(inputs);

      expect(result.maximumLoanAmount).toBe(400000);
      expect(result.totalFees).toBe(0);
      expect(result.totalCost).toBe(result.totalInterestPaid);
    });

    it('should calculate high advance rate correctly', () => {
      const inputs: AssetBasedLendingCalculatorInputs = {
        assetValue: 2000000,
        advanceRate: 90,
        interestRate: 10,
        loanTerm: 120,
        originationFee: 2,
        monitoringFee: 1
      };

      const result = calculateAssetBasedLendingResults(inputs);

      expect(result.maximumLoanAmount).toBe(1800000);
      expect(result.monthlyPayment).toBeGreaterThan(0);
    });
  });

  describe('validateAssetBasedLendingInputs', () => {
    it('should validate valid inputs', () => {
      const inputs: AssetBasedLendingCalculatorInputs = {
        assetValue: 1000000,
        advanceRate: 70,
        interestRate: 8,
        loanTerm: 60,
        originationFee: 1,
        monitoringFee: 0.5
      };

      const errors = validateAssetBasedLendingInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should reject negative asset value', () => {
      const inputs: AssetBasedLendingCalculatorInputs = {
        assetValue: -1000,
        advanceRate: 70,
        interestRate: 8,
        loanTerm: 60,
        originationFee: 1,
        monitoringFee: 0.5
      };

      const errors = validateAssetBasedLendingInputs(inputs);
      expect(errors).toContainEqual({
        field: 'assetValue',
        message: 'Asset value must be greater than 0'
      });
    });

    it('should reject advance rate over 100%', () => {
      const inputs: AssetBasedLendingCalculatorInputs = {
        assetValue: 1000000,
        advanceRate: 110,
        interestRate: 8,
        loanTerm: 60,
        originationFee: 1,
        monitoringFee: 0.5
      };

      const errors = validateAssetBasedLendingInputs(inputs);
      expect(errors).toContainEqual({
        field: 'advanceRate',
        message: 'Advance rate must be between 0 and 100 percent'
      });
    });

    it('should reject loan term over 360 months', () => {
      const inputs: AssetBasedLendingCalculatorInputs = {
        assetValue: 1000000,
        advanceRate: 70,
        interestRate: 8,
        loanTerm: 400,
        originationFee: 1,
        monitoringFee: 0.5
      };

      const errors = validateAssetBasedLendingInputs(inputs);
      expect(errors).toContainEqual({
        field: 'loanTerm',
        message: 'Loan term must be between 1 and 360 months'
      });
    });
  });
});

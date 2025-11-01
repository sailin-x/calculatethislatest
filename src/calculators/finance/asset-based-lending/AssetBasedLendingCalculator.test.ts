import { describe, it, expect } from 'vitest';
import {
  calculateMaximumLoanAmount,
  calculateBorrowingBase,
  calculateLoanToValueRatio,
  calculateMonthlyPayment,
  calculateDebtServiceCoverageRatio,
  calculateRiskRating
} from './formulas';
import { validateAssetBasedLendingInputs } from './validation';

describe('Asset-Based Lending Calculator', () => {
  const mockInputs = {
    totalAssetValue: 1000000,
    assetType: 'accounts_receivable' as const,
    advanceRate: 0.8,
    borrowingBase: 800000,
    outstandingDebt: 200000,
    interestRate: 8,
    loanTerm: 5,
    monthlyRevenue: 150000,
    monthlyExpenses: 120000,
    debtServiceCoverageRatio: 1.5,
    collateralCoverageRatio: 2.0,
    industry: 'manufacturing',
    creditRating: 'BBB' as const
  };

  describe('Core Calculations', () => {
    it('calculates borrowing base correctly', () => {
      const result = calculateBorrowingBase(mockInputs);
      expect(result).toBe(mockInputs.totalAssetValue * mockInputs.advanceRate);
    });

    it('calculates maximum loan amount correctly', () => {
      const result = calculateMaximumLoanAmount(mockInputs);
      const expected = calculateBorrowingBase(mockInputs) - mockInputs.outstandingDebt;
      expect(result).toBe(expected);
    });

    it('calculates loan-to-value ratio correctly', () => {
      const result = calculateLoanToValueRatio(mockInputs);
      const maxLoan = calculateMaximumLoanAmount(mockInputs);
      const expected = (maxLoan / mockInputs.totalAssetValue) * 100;
      expect(result).toBe(expected);
    });

    it('calculates monthly payment correctly', () => {
      const result = calculateMonthlyPayment(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(calculateMaximumLoanAmount(mockInputs) / 12);
    });

    it('calculates debt service coverage ratio correctly', () => {
      const result = calculateDebtServiceCoverageRatio(mockInputs);
      const netIncome = mockInputs.monthlyRevenue - mockInputs.monthlyExpenses;
      const monthlyPayment = calculateMonthlyPayment(mockInputs);
      const expected = netIncome / monthlyPayment;
      expect(result).toBeCloseTo(expected, 1);
    });

    it('calculates risk rating correctly', () => {
      const result = calculateRiskRating(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateAssetBasedLendingInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates asset value requirements', () => {
      const invalidInputs = { ...mockInputs, totalAssetValue: 0 };
      const result = validateAssetBasedLendingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates advance rate range', () => {
      const invalidInputs = { ...mockInputs, advanceRate: 1.5 };
      const result = validateAssetBasedLendingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates interest rate range', () => {
      const invalidInputs = { ...mockInputs, interestRate: 60 };
      const result = validateAssetBasedLendingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates loan term range', () => {
      const invalidInputs = { ...mockInputs, loanTerm: 0 };
      const result = validateAssetBasedLendingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero outstanding debt', () => {
      const result = calculateMaximumLoanAmount({ ...mockInputs, outstandingDebt: 0 });
      expect(result).toBe(calculateBorrowingBase(mockInputs));
    });

    it('handles high advance rate', () => {
      const result = calculateBorrowingBase({ ...mockInputs, advanceRate: 0.95 });
      expect(result).toBe(mockInputs.totalAssetValue * 0.95);
    });

    it('handles low credit rating', () => {
      const result = calculateRiskRating({ ...mockInputs, creditRating: 'CCC' as const });
      expect(result).toBeLessThan(calculateRiskRating(mockInputs));
    });

    it('handles different asset types', () => {
      const equipmentResult = calculateBorrowingBase({ ...mockInputs, assetType: 'equipment' as const });
      const securitiesResult = calculateBorrowingBase({ ...mockInputs, assetType: 'securities' as const });
      expect(equipmentResult).toBe(mockInputs.totalAssetValue * 0.8); // Uses provided advance rate
      expect(securitiesResult).toBe(mockInputs.totalAssetValue * 0.8);
    });

    it('handles negative cash flow', () => {
      const result = calculateDebtServiceCoverageRatio({
        ...mockInputs,
        monthlyRevenue: 100000,
        monthlyExpenses: 150000
      });
      expect(result).toBeLessThan(1);
    });
  });

  describe('Business Logic', () => {
    it('higher credit rating improves risk score', () => {
      const aaaResult = calculateRiskRating({ ...mockInputs, creditRating: 'AAA' as const });
      const bbbResult = calculateRiskRating(mockInputs);
      expect(aaaResult).toBeGreaterThan(bbbResult);
    });

    it('accounts receivable typically has higher advance rate than inventory', () => {
      // This would be tested with default advance rates, but we use provided rates
      const arResult = calculateBorrowingBase(mockInputs);
      const inventoryResult = calculateBorrowingBase({
        ...mockInputs,
        assetType: 'inventory' as const,
        advanceRate: 0.5
      });
      expect(arResult).toBeGreaterThan(inventoryResult);
    });

    it('longer loan terms reduce monthly payments', () => {
      const shortTerm = calculateMonthlyPayment(mockInputs);
      const longTerm = calculateMonthlyPayment({ ...mockInputs, loanTerm: 10 });
      expect(longTerm).toBeLessThan(shortTerm);
    });
  });
});
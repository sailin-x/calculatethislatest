import { describe, it, expect } from 'vitest';
import {
  calculateStructuredSettlementPayout,
  calculatePeriodicPayment,
  calculateNetPresentValue,
  calculateBreakEvenPeriod
} from './formulas';
import { validateStructuredSettlementPayoutInputs } from './validation';

describe('Structured Settlement Payout Calculator', () => {
  const mockInputs = {
    settlementAmount: 1000000,
    payoutPeriod: 20,
    paymentFrequency: 'monthly' as const,
    discountRate: 3,
    inflationRate: 2.5,
    taxRate: 25,
    lumpSumOffer: 650000,
    currentAge: 45,
    lifeExpectancy: 85,
    riskTolerance: 'medium' as const,
    investmentReturn: 7,
    analysisPeriod: 30
  };

  describe('Payment Calculations', () => {
    it('calculates periodic payment correctly', () => {
      const payment = calculatePeriodicPayment(1000000, 20, 'monthly');
      expect(payment).toBeCloseTo(4166.67, 0);
    });

    it('calculates net present value correctly', () => {
      const npv = calculateNetPresentValue(4166.67, 20, 3, 'monthly');
      expect(npv).toBeGreaterThan(0);
      expect(npv).toBeLessThan(1000000);
    });

    it('calculates break-even period correctly', () => {
      const breakEven = calculateBreakEvenPeriod(4166.67, 650000, 3, 'monthly');
      expect(breakEven).toBeGreaterThan(0);
      expect(breakEven).toBeLessThan(50);
    });
  });

  describe('Structured Settlement Calculations', () => {
    it('calculates structured settlement payout correctly', () => {
      const result = calculateStructuredSettlementPayout(mockInputs);
      expect(result.totalStructuredPayments).toBe(1000000);
      expect(result.lumpSumEquivalent).toBe(650000);
      expect(result.netPresentValueStructured).toBeGreaterThan(0);
      expect(result.netPresentValueLumpSum).toBeGreaterThan(0);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.annualPayment).toBeGreaterThan(0);
    });

    it('generates payment schedule', () => {
      const result = calculateStructuredSettlementPayout(mockInputs);
      expect(result.paymentSchedule).toBeDefined();
      expect(result.paymentSchedule.length).toBeGreaterThan(0);
    });

    it('provides comparison analysis', () => {
      const result = calculateStructuredSettlementPayout(mockInputs);
      expect(result.comparisonAnalysis).toBeDefined();
      expect(result.comparisonAnalysis.recommendation).toBeDefined();
      expect(result.comparisonAnalysis.riskAssessment).toBeDefined();
    });

    it('generates sensitivity analysis', () => {
      const result = calculateStructuredSettlementPayout(mockInputs);
      expect(result.sensitivityAnalysis).toBeDefined();
      expect(result.sensitivityAnalysis.length).toBe(3); // Conservative, Moderate, Aggressive
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateStructuredSettlementPayoutInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates settlement amount', () => {
      const invalidInputs = { ...mockInputs, settlementAmount: 0 };
      const result = validateStructuredSettlementPayoutInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates payout period', () => {
      const invalidInputs = { ...mockInputs, payoutPeriod: 0 };
      const result = validateStructuredSettlementPayoutInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates lump sum offer', () => {
      const invalidInputs = { ...mockInputs, lumpSumOffer: 2000000 };
      const result = validateStructuredSettlementPayoutInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles lump sum payment frequency', () => {
      const result = calculateStructuredSettlementPayout({
        ...mockInputs,
        paymentFrequency: 'lump_sum' as const
      });
      expect(result.monthlyPayment).toBeCloseTo(1000000 / 12, 0);
    });

    it('handles annual payments', () => {
      const result = calculateStructuredSettlementPayout({
        ...mockInputs,
        paymentFrequency: 'annually' as const
      });
      expect(result.annualPayment).toBe(50000);
    });

    it('handles high discount rates', () => {
      const result = calculateStructuredSettlementPayout({
        ...mockInputs,
        discountRate: 10
      });
      expect(result.netPresentValueStructured).toBeLessThan(result.totalStructuredPayments);
    });

    it('handles zero discount rate', () => {
      const result = calculateStructuredSettlementPayout({
        ...mockInputs,
        discountRate: 0
      });
      expect(result.netPresentValueStructured).toBe(result.totalStructuredPayments);
    });

    it('handles short life expectancy', () => {
      const result = calculateStructuredSettlementPayout({
        ...mockInputs,
        lifeExpectancy: 50
      });
      expect(result.totalPaymentsOverLife).toBeLessThan(result.totalStructuredPayments);
    });
  });

  describe('Business Rules', () => {
    it('validates age relationships', () => {
      const result = validateStructuredSettlementPayoutInputs({
        ...mockInputs,
        lifeExpectancy: 30 // Less than current age
      });
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles large settlements', () => {
      const result = calculateStructuredSettlementPayout({
        ...mockInputs,
        settlementAmount: 50000000
      });
      expect(result.totalStructuredPayments).toBe(50000000);
    });
  });
});
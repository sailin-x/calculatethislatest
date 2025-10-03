import { describe, it, expect } from 'vitest';
import {
  calculateLoanPayment,
  calculateTotalInterestPaid,
  calculateAmortizationSchedule,
  calculateEarlyPayoffAnalysis,
  calculateLoanResult,
  generateLoanAnalysis
} from './formulas';
import { validateLoanCalculatorInputs, validateLoanCalculatorBusinessRules } from './validation';

describe('Loan Calculator', () => {
  const mockInputs = {
    loanAmount: 25000,
    interestRate: 8.5,
    loanTerm: 5,
    paymentFrequency: 'monthly' as const,
    loanType: 'personal' as const,
    extraPayment: 0
  };

  describe('Core Payment Calculations', () => {
    it('calculates monthly payment correctly', () => {
      const result = calculateLoanPayment(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(510, 0); // Approximate expected value
    });

    it('calculates total interest paid correctly', () => {
      const monthlyPayment = calculateLoanPayment(mockInputs);
      const paymentsPerYear = 12;
      const totalPayments = mockInputs.loanTerm * paymentsPerYear;
      const result = calculateTotalInterestPaid(mockInputs.loanAmount, monthlyPayment, totalPayments);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(5600, 0); // Approximate expected value
    });

    it('calculates amortization schedule correctly', () => {
      const result = calculateAmortizationSchedule(mockInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThanOrEqual(60); // 5 years * 12 months

      // Check first payment
      const firstPayment = result[0];
      expect(firstPayment.period).toBe(1);
      expect(firstPayment.payment).toBeGreaterThan(0);
      expect(firstPayment.principal).toBeGreaterThan(0);
      expect(firstPayment.interest).toBeGreaterThan(0);
      expect(firstPayment.balance).toBeLessThan(mockInputs.loanAmount);

      // Check last payment
      const lastPayment = result[result.length - 1];
      expect(lastPayment.balance).toBeCloseTo(0, 2);
    });

    it('calculates early payoff analysis correctly', () => {
      const inputsWithExtra = { ...mockInputs, extraPayment: 50 };
      const result = calculateEarlyPayoffAnalysis(inputsWithExtra);
      expect(result.originalTerm).toBeGreaterThan(result.newTerm);
      expect(result.totalSavings).toBeGreaterThan(0);
      expect(result.timeSaved).toBeGreaterThan(0);
    });
  });

  describe('Payment Frequency Variations', () => {
    it('calculates quarterly payments correctly', () => {
      const quarterlyInputs = { ...mockInputs, paymentFrequency: 'quarterly' as const };
      const result = calculateLoanPayment(quarterlyInputs);
      expect(result).toBeGreaterThan(0);
      // Quarterly payment should be higher than monthly
      const monthlyResult = calculateLoanPayment(mockInputs);
      expect(result).toBeGreaterThan(monthlyResult);
    });

    it('calculates annual payments correctly', () => {
      const annualInputs = { ...mockInputs, paymentFrequency: 'annually' as const };
      const result = calculateLoanPayment(annualInputs);
      expect(result).toBeGreaterThan(0);
      // Annual payment should be much higher
      const monthlyResult = calculateLoanPayment(mockInputs);
      expect(result).toBeGreaterThan(monthlyResult * 10);
    });
  });

  describe('Loan Result Integration', () => {
    it('calculates complete loan result correctly', () => {
      const result = calculateLoanResult(mockInputs);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterestPaid).toBeGreaterThan(0);
      expect(result.totalAmountPaid).toBeGreaterThan(mockInputs.loanAmount);
      expect(result.numberOfPayments).toBeGreaterThan(0);
      expect(result.payoffDate).toBeDefined();
      expect(result.amortizationSchedule.length).toBeGreaterThan(0);
    });

    it('includes early payoff analysis when extra payment is provided', () => {
      const inputsWithExtra = { ...mockInputs, extraPayment: 25 };
      const result = calculateLoanResult(inputsWithExtra);
      expect(result.earlyPayoffAnalysis).toBeDefined();
      expect(result.earlyPayoffAnalysis?.totalSavings).toBeGreaterThan(0);
    });
  });

  describe('Analysis Generation', () => {
    it('generates analysis with recommendations', () => {
      const outputs = calculateLoanResult(mockInputs);
      const result = generateLoanAnalysis(mockInputs, outputs);
      expect(result.recommendation).toBeDefined();
      expect(result.riskLevel).toBeDefined();
      expect(['Low', 'Medium', 'High']).toContain(result.riskLevel);
      expect(result.insights.length).toBeGreaterThan(0);
    });

    it('provides high risk warning for high interest loans', () => {
      const highInterestInputs = { ...mockInputs, interestRate: 25 };
      const outputs = calculateLoanResult(highInterestInputs);
      const result = generateLoanAnalysis(highInterestInputs, outputs);
      expect(result.riskLevel).toBe('High');
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateLoanCalculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates loan amount requirements', () => {
      const invalidInputs = { ...mockInputs, loanAmount: 0 };
      const result = validateLoanCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('loanAmount');
    });

    it('validates interest rate requirements', () => {
      const invalidInputs = { ...mockInputs, interestRate: undefined };
      const result = validateLoanCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('interestRate');
    });

    it('validates loan term requirements', () => {
      const invalidInputs = { ...mockInputs, loanTerm: 0 };
      const result = validateLoanCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('loanTerm');
    });

    it('validates payment frequency options', () => {
      const invalidInputs = { ...mockInputs, paymentFrequency: 'invalid' as any };
      const result = validateLoanCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('paymentFrequency');
    });

    it('validates loan type options', () => {
      const invalidInputs = { ...mockInputs, loanType: 'invalid' as any };
      const result = validateLoanCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('loanType');
    });

    it('validates extra payment constraints', () => {
      const invalidInputs = { ...mockInputs, extraPayment: mockInputs.loanAmount + 1 };
      const result = validateLoanCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].field).toBe('extraPayment');
    });
  });

  describe('Business Rules Validation', () => {
    it('provides warnings for high interest rates', () => {
      const highInterestInputs = { ...mockInputs, interestRate: 20 };
      const result = validateLoanCalculatorBusinessRules(highInterestInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(w => w.message.includes('interest rate'))).toBe(true);
    });

    it('provides warnings for long loan terms', () => {
      const longTermInputs = { ...mockInputs, loanTerm: 25 };
      const result = validateLoanCalculatorBusinessRules(longTermInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(w => w.message.includes('term'))).toBe(true);
    });

    it('provides warnings for annual payments', () => {
      const annualInputs = { ...mockInputs, paymentFrequency: 'annually' as const };
      const result = validateLoanCalculatorBusinessRules(annualInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(w => w.message.includes('cash flow'))).toBe(true);
    });

    it('provides warnings for large loan amounts', () => {
      const largeLoanInputs = { ...mockInputs, loanAmount: 750000 };
      const result = validateLoanCalculatorBusinessRules(largeLoanInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(w => w.message.includes('documentation'))).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero interest rate correctly', () => {
      const zeroInterestInputs = { ...mockInputs, interestRate: 0 };
      const result = calculateLoanPayment(zeroInterestInputs);
      expect(result).toBe(mockInputs.loanAmount / (mockInputs.loanTerm * 12));
    });

    it('handles very short loan terms', () => {
      const shortTermInputs = { ...mockInputs, loanTerm: 1 };
      const result = calculateLoanPayment(shortTermInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeGreaterThan(calculateLoanPayment(mockInputs));
    });

    it('handles very long loan terms', () => {
      const longTermInputs = { ...mockInputs, loanTerm: 30 };
      const result = calculateLoanPayment(longTermInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(calculateLoanPayment(mockInputs));
    });

    it('handles large extra payments', () => {
      const largeExtraInputs = { ...mockInputs, extraPayment: 200 };
      const result = calculateEarlyPayoffAnalysis(largeExtraInputs);
      expect(result.timeSaved).toBeGreaterThan(0);
      expect(result.totalSavings).toBeGreaterThan(0);
    });

    it('handles different loan types', () => {
      const businessInputs = { ...mockInputs, loanType: 'business' as const };
      const result = calculateLoanResult(businessInputs);
      expect(result.monthlyPayment).toBeGreaterThan(0);
    });
  });

  describe('Integration Tests', () => {
    it('end-to-end calculation matches expected values', () => {
      const result = calculateLoanResult(mockInputs);
      expect(result.monthlyPayment).toBeCloseTo(510, 0);
      expect(result.totalInterestPaid).toBeCloseTo(5600, 0);
      expect(result.totalAmountPaid).toBeCloseTo(30600, 0);
      expect(result.numberOfPayments).toBe(60);
    });

    it('amortization schedule sums correctly', () => {
      const result = calculateLoanResult(mockInputs);
      const schedule = result.amortizationSchedule;

      // Sum of all principal payments should equal loan amount
      const totalPrincipal = schedule.reduce((sum, payment) => sum + payment.principal, 0);
      expect(totalPrincipal).toBeCloseTo(mockInputs.loanAmount, 2);

      // Sum of all interest payments should equal total interest
      const totalInterest = schedule.reduce((sum, payment) => sum + payment.interest, 0);
      expect(totalInterest).toBeCloseTo(result.totalInterestPaid, 2);
    });
  });
});

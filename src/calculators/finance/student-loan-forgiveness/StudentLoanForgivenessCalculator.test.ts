import { describe, it, expect } from 'vitest';
import {
  calculateStudentLoanForgiveness,
  calculateAmortizationPayment,
  checkForgivenessEligibility
} from './formulas';
import { validateStudentLoanForgivenessInputs } from './validation';

describe('Student Loan Forgiveness Calculator', () => {
  const mockInputs = {
    loanBalance: 80000,
    interestRate: 5.5,
    monthlyPayment: 400,
    forgivenessProgram: 'public_service' as const,
    employmentType: 'teacher' as const,
    yearsOfService: 7,
    requiredYearsForForgiveness: 10,
    income: 55000,
    familySize: 2,
    state: 'California',
    currentAge: 32,
    expectedSalaryGrowth: 3,
    taxBracket: 22,
    alternativePayment: 600
  };

  describe('Loan Calculations', () => {
    it('calculates amortization payment correctly', () => {
      const payment = calculateAmortizationPayment(80000, 5.5, 10);
      expect(payment).toBeGreaterThan(0);
      expect(payment).toBeCloseTo(866, 0); // Approximate expected value
    });

    it('calculates student loan forgiveness correctly', () => {
      const result = calculateStudentLoanForgiveness(mockInputs);
      expect(result.totalPaymentsMade).toBeGreaterThan(0);
      expect(result.amountForgiven).toBeGreaterThan(0);
      expect(result.netSavings).toBeDefined();
      expect(result.timeToForgiveness).toBe(3); // 10 - 7 years
    });

    it('checks forgiveness eligibility correctly', () => {
      const eligibility = checkForgivenessEligibility('public_service', 'teacher', 7, 10);
      expect(eligibility.isEligible).toBe(true);
      expect(eligibility.requirementsMet).toContain('Employment type');
      expect(eligibility.requirementsNotMet).toHaveLength(1); // Years requirement not met
    });
  });

  describe('Payment Schedule', () => {
    it('generates payment schedule', () => {
      const result = calculateStudentLoanForgiveness(mockInputs);
      expect(result.paymentSchedule).toBeDefined();
      expect(result.paymentSchedule.length).toBeGreaterThan(0);
      expect(result.paymentSchedule[0]).toHaveProperty('year');
      expect(result.paymentSchedule[0]).toHaveProperty('beginningBalance');
    });
  });

  describe('Eligibility Analysis', () => {
    it('determines eligibility status', () => {
      const result = calculateStudentLoanForgiveness(mockInputs);
      expect(result.forgivenessEligibility).toBeDefined();
      expect(result.forgivenessEligibility.isEligible).toBe(true);
      expect(result.forgivenessEligibility.estimatedForgivenessDate).toBe('2027');
    });

    it('handles ineligible cases', () => {
      const ineligibleInputs = {
        ...mockInputs,
        employmentType: 'other' as const,
        forgivenessProgram: 'teacher' as const
      };
      const result = calculateStudentLoanForgiveness(ineligibleInputs);
      expect(result.forgivenessEligibility.isEligible).toBe(false);
    });
  });

  describe('Alternative Scenarios', () => {
    it('provides alternative repayment scenarios', () => {
      const result = calculateStudentLoanForgiveness(mockInputs);
      expect(result.alternativeScenarios).toBeDefined();
      expect(result.alternativeScenarios.length).toBe(3); // 10-year, 20-year, 25-year options
      expect(result.alternativeScenarios[0]).toHaveProperty('scenario');
      expect(result.alternativeScenarios[0]).toHaveProperty('totalPayments');
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateStudentLoanForgivenessInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates loan balance', () => {
      const invalidInputs = { ...mockInputs, loanBalance: 0 };
      const result = validateStudentLoanForgivenessInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates years of service', () => {
      const invalidInputs = { ...mockInputs, yearsOfService: -1 };
      const result = validateStudentLoanForgivenessInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero interest rate', () => {
      const result = calculateStudentLoanForgiveness({
        ...mockInputs,
        interestRate: 0
      });
      expect(result.totalInterestPaid).toBe(0);
    });

    it('handles already eligible borrowers', () => {
      const result = calculateStudentLoanForgiveness({
        ...mockInputs,
        yearsOfService: 12
      });
      expect(result.timeToForgiveness).toBe(0);
    });

    it('handles high tax brackets', () => {
      const result = calculateStudentLoanForgiveness({
        ...mockInputs,
        taxBracket: 37
      });
      expect(result.taxImplications).toBeGreaterThan(0);
    });

    it('handles different forgiveness programs', () => {
      const pslfResult = calculateStudentLoanForgiveness({
        ...mockInputs,
        forgivenessProgram: 'public_service' as const
      });
      const idrResult = calculateStudentLoanForgiveness({
        ...mockInputs,
        forgivenessProgram: 'income_driven' as const,
        requiredYearsForForgiveness: 20
      });
      expect(pslfResult.timeToForgiveness).not.toBe(idrResult.timeToForgiveness);
    });
  });

  describe('Business Rules', () => {
    it('validates program-specific requirements', () => {
      const result = validateStudentLoanForgivenessInputs({
        ...mockInputs,
        forgivenessProgram: 'teacher' as const,
        employmentType: 'nurse' as const
      });
      // Should pass basic validation but have business rule warnings
      expect(result.length).toBe(0);
    });

    it('handles large loan balances', () => {
      const result = calculateStudentLoanForgiveness({
        ...mockInputs,
        loanBalance: 200000
      });
      expect(result.amountForgiven).toBeGreaterThan(mockInputs.loanBalance);
    });
  });
});
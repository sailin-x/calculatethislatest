import { describe, it, expect } from 'vitest';
import {
  calculateStandardPayment,
  calculateIBRPayment,
  calculatePAYEPayment,
  calculateAffordabilityScore,
  calculateStudentLoanRepayment
} from './formulas';
import { validateStudentLoanRepaymentInputs } from './validation';

describe('Student Loan Repayment Calculator', () => {
  const mockInputs = {
    loanBalance: 30000,
    interestRate: 5.5,
    loanTermYears: 10,
    monthlyIncome: 5000,
    monthlyExpenses: 3500,
    repaymentPlan: 'standard' as const,
    familySize: 1,
    stateOfResidence: 'CA',
    employmentStatus: 'employed' as const,
    maritalStatus: 'single' as const,
    dependents: 0,
    currentAge: 25
  };

  describe('Repayment Plan Calculations', () => {
    it('calculates standard payment correctly', () => {
      const result = calculateStandardPayment(30000, 5.5, 10);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(332, 0); // Approximate expected value
    });

    it('calculates IBR payment correctly', () => {
      const ibrInputs = { ...mockInputs, repaymentPlan: 'income_based' as const };
      const result = calculateIBRPayment(ibrInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(calculateStandardPayment(30000, 5.5, 10));
    });

    it('calculates PAYE payment correctly', () => {
      const payeInputs = { ...mockInputs, repaymentPlan: 'pay_as_you_earn' as const };
      const result = calculatePAYEPayment(payeInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(calculateStandardPayment(30000, 5.5, 10));
    });

    it('calculates affordability score correctly', () => {
      const result = calculateAffordabilityScore(mockInputs, 332);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });
  });

  describe('Complete Repayment Analysis', () => {
    it('calculates full standard repayment scenario', () => {
      const result = calculateStudentLoanRepayment(mockInputs);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalPayments).toBeGreaterThan(result.monthlyPayment);
      expect(result.totalInterest).toBeGreaterThan(0);
      expect(result.affordabilityScore).toBeGreaterThan(0);
      expect(result.recommendedPlan).toBeDefined();
    });

    it('calculates income-based repayment scenario', () => {
      const ibrInputs = { ...mockInputs, repaymentPlan: 'income_based' as const };
      const result = calculateStudentLoanRepayment(ibrInputs);
      expect(result.monthlyPayment).toBeLessThan(calculateStudentLoanRepayment(mockInputs).monthlyPayment);
      expect(result.estimatedMonthlySavings).toBeGreaterThan(0);
    });

    it('handles high debt-to-income ratio', () => {
      const highDtiInputs = { ...mockInputs, monthlyExpenses: 4500 };
      const result = calculateStudentLoanRepayment(highDtiInputs);
      expect(result.affordabilityScore).toBeLessThan(50);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateStudentLoanRepaymentInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates loan balance cannot be zero', () => {
      const invalidInputs = { ...mockInputs, loanBalance: 0 };
      const result = validateStudentLoanRepaymentInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates monthly income', () => {
      const invalidInputs = { ...mockInputs, monthlyIncome: 0 };
      const result = validateStudentLoanRepaymentInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates family size', () => {
      const invalidInputs = { ...mockInputs, familySize: 0 };
      const result = validateStudentLoanRepaymentInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates age range', () => {
      const invalidInputs = { ...mockInputs, currentAge: 16 };
      const result = validateStudentLoanRepaymentInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero interest rate', () => {
      const zeroRateInputs = { ...mockInputs, interestRate: 0 };
      const result = calculateStudentLoanRepayment(zeroRateInputs);
      expect(result.monthlyPayment).toBeCloseTo(30000 / (10 * 12), 0);
    });

    it('handles large family size', () => {
      const largeFamilyInputs = { ...mockInputs, familySize: 8, repaymentPlan: 'income_based' as const };
      const result = calculateStudentLoanRepayment(largeFamilyInputs);
      expect(result.monthlyPayment).toBeDefined();
    });

    it('handles very low income', () => {
      const lowIncomeInputs = { ...mockInputs, monthlyIncome: 1500, repaymentPlan: 'income_based' as const };
      const result = calculateStudentLoanRepayment(lowIncomeInputs);
      expect(result.affordabilityScore).toBeLessThan(30);
    });

    it('handles high income', () => {
      const highIncomeInputs = { ...mockInputs, monthlyIncome: 15000 };
      const result = calculateStudentLoanRepayment(highIncomeInputs);
      expect(result.affordabilityScore).toBeGreaterThan(80);
    });

    it('handles extended repayment', () => {
      const extendedInputs = { ...mockInputs, repaymentPlan: 'extended' as const };
      const result = calculateStudentLoanRepayment(extendedInputs);
      expect(result.monthlyPayment).toBeLessThan(calculateStudentLoanRepayment(mockInputs).monthlyPayment);
    });
  });

  describe('Income-Driven Plans', () => {
    it('IBR provides lower payment for low income', () => {
      const ibrInputs = {
        ...mockInputs,
        monthlyIncome: 2500,
        repaymentPlan: 'income_based' as const
      };
      const ibrResult = calculateStudentLoanRepayment(ibrInputs);
      const standardResult = calculateStudentLoanRepayment(mockInputs);
      expect(ibrResult.monthlyPayment).toBeLessThan(standardResult.monthlyPayment);
    });

    it('PAYE considers family size', () => {
      const payeInputs = {
        ...mockInputs,
        monthlyIncome: 3500,
        familySize: 3,
        repaymentPlan: 'pay_as_you_earn' as const
      };
      const result = calculateStudentLoanRepayment(payeInputs);
      expect(result.monthlyPayment).toBeDefined();
    });

    it('REPAYE includes spouse income', () => {
      const repayInputs = {
        ...mockInputs,
        monthlyIncome: 3000,
        spouseIncome: 40000,
        repaymentPlan: 'revised_pay_as_you_earn' as const
      };
      const result = calculateStudentLoanRepayment(repayInputs);
      expect(result.monthlyPayment).toBeDefined();
    });
  });
});
import { describe, it, expect } from 'vitest';
import {
  calculateNewMonthlyPayment,
  calculateTotalInterest,
  calculateBreakEvenMonths,
  calculateEligibilityScore,
  assessRefinanceRisk,
  calculateStudentLoanRefinancing
} from './formulas';
import { validateStudentLoanRefinancingInputs } from './validation';

describe('Student Loan Refinancing Calculator', () => {
  const mockInputs = {
    currentLoanBalance: 45000,
    currentInterestRate: 5.25,
    currentMonthlyPayment: 242,
    remainingTermMonths: 120,
    creditScore: 750,
    annualIncome: 85000,
    debtToIncomeRatio: 25,
    employmentStatus: 'employed' as const,
    loanType: 'federal' as const,
    cosignerAvailable: false,
    targetInterestRate: 3.75,
    targetTermYears: 10,
    closingCosts: 1500,
    monthlyIncome: 7083,
    monthlyDebts: 1500
  };

  describe('Core Refinancing Calculations', () => {
    it('calculates new monthly payment correctly', () => {
      const result = calculateNewMonthlyPayment(45000, 3.75, 120);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(477, 0); // Approximate expected value
    });

    it('calculates total interest correctly', () => {
      const result = calculateTotalInterest(45000, 242, 120);
      expect(result).toBeGreaterThan(0);
      expect(result).toBe(45000 - (242 * 120)); // Should be negative? Wait, no:
      // Actually: total paid = payment * months, interest = total paid - principal
      expect(result).toBe((242 * 120) - 45000);
    });

    it('calculates break-even months correctly', () => {
      const result = calculateBreakEvenMonths(242, 200, 1500);
      expect(result).toBeGreaterThan(0);
      expect(result).toBe(Math.ceil(1500 / (242 - 200)));
    });

    it('calculates eligibility score correctly', () => {
      const result = calculateEligibilityScore(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
      expect(result).toBe(85); // High credit score + employed = high score
    });

    it('assesses refinance risk correctly', () => {
      const result = assessRefinanceRisk(mockInputs);
      expect(['Low', 'Medium', 'High']).toContain(result);
    });
  });

  describe('Complete Refinancing Analysis', () => {
    it('calculates full refinancing scenario', () => {
      const result = calculateStudentLoanRefinancing(mockInputs);
      expect(result.newMonthlyPayment).toBeGreaterThan(0);
      expect(result.totalSavings).toBeDefined();
      expect(result.breakEvenMonths).toBeGreaterThan(0);
      expect(result.eligibilityScore).toBeGreaterThan(0);
      expect(['Low', 'Medium', 'High']).toContain(result.riskAssessment);
      expect(typeof result.recommendedRefinance).toBe('boolean');
    });

    it('handles high savings scenario', () => {
      const highSavingsInputs = {
        ...mockInputs,
        currentInterestRate: 7.5,
        targetInterestRate: 3.5
      };
      const result = calculateStudentLoanRefinancing(highSavingsInputs);
      expect(result.totalSavings).toBeGreaterThan(0);
      expect(result.recommendedRefinance).toBe(true);
    });

    it('handles no savings scenario', () => {
      const noSavingsInputs = {
        ...mockInputs,
        currentInterestRate: 3.75,
        targetInterestRate: 5.25
      };
      const result = calculateStudentLoanRefinancing(noSavingsInputs);
      expect(result.totalSavings).toBeLessThan(0);
      expect(result.recommendedRefinance).toBe(false);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateStudentLoanRefinancingInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates loan balance cannot be zero', () => {
      const invalidInputs = { ...mockInputs, currentLoanBalance: 0 };
      const result = validateStudentLoanRefinancingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('greater than 0');
    });

    it('validates credit score range', () => {
      const invalidInputs = { ...mockInputs, creditScore: 200 };
      const result = validateStudentLoanRefinancingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates interest rate range', () => {
      const invalidInputs = { ...mockInputs, currentInterestRate: 20 };
      const result = validateStudentLoanRefinancingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates annual income', () => {
      const invalidInputs = { ...mockInputs, annualIncome: 0 };
      const result = validateStudentLoanRefinancingInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero closing costs', () => {
      const result = calculateBreakEvenMonths(242, 200, 0);
      expect(result).toBe(0);
    });

    it('handles same payment amounts', () => {
      const result = calculateBreakEvenMonths(242, 242, 1500);
      expect(result).toBe(Infinity);
    });

    it('handles very high credit score', () => {
      const highCreditInputs = { ...mockInputs, creditScore: 800 };
      const result = calculateEligibilityScore(highCreditInputs);
      expect(result).toBeGreaterThan(calculateEligibilityScore(mockInputs));
    });

    it('handles unemployed status', () => {
      const unemployedInputs = { ...mockInputs, employmentStatus: 'unemployed' as const };
      const result = calculateEligibilityScore(unemployedInputs);
      expect(result).toBeLessThan(calculateEligibilityScore(mockInputs));
    });

    it('handles cosigner boost', () => {
      const cosignerInputs = {
        ...mockInputs,
        cosignerAvailable: true,
        cosignerCreditScore: 780
      };
      const result = calculateEligibilityScore(cosignerInputs);
      expect(result).toBeGreaterThan(calculateEligibilityScore(mockInputs));
    });
  });

  describe('Risk Assessment', () => {
    it('assesses low risk for good profile', () => {
      const result = assessRefinanceRisk(mockInputs);
      expect(result).toBe('Low');
    });

    it('assesses high risk for poor profile', () => {
      const highRiskInputs = {
        ...mockInputs,
        creditScore: 580,
        employmentStatus: 'unemployed' as const,
        debtToIncomeRatio: 55
      };
      const result = assessRefinanceRisk(highRiskInputs);
      expect(result).toBe('High');
    });

    it('assesses medium risk for moderate profile', () => {
      const mediumRiskInputs = {
        ...mockInputs,
        creditScore: 650,
        debtToIncomeRatio: 45
      };
      const result = assessRefinanceRisk(mediumRiskInputs);
      expect(result).toBe('Medium');
    });
  });
});
import { describe, it, expect } from 'vitest';
import { calculateMortgageLife } from './formulas';
import { validateAllMortgageLifeInputs } from './quickValidation';

describe('Mortgage Life Calculator', () => {
  const mockInputs = {
    loanAmount: 400000,
    currentLoanBalance: 380000,
    borrowerAge: 35,
    coBorrowerAge: 33,
    loanTerm: 30,
    yearsRemaining: 28,
    monthlyPayment: 2400,
    annualIncome: 85000,
    otherDebts: 25000,
    savings: 50000,
    dependents: 2,
    healthStatus: 'excellent' as const,
    smokingStatus: 'non-smoker' as const,
    occupation: 'low-risk' as const,
    hobbies: 'low-risk' as const,
    existingLifeInsurance: 100000,
    mortgageLifePremium: 45,
    termLifePremium: 35,
    inflationRate: 2.5,
    investmentReturn: 7.0,
    state: 'CA',
    coverageType: 'decreasing' as const,
    beneficiaryType: 'family' as const
  };

  describe('calculateMortgageLife', () => {
    it('should calculate basic mortgage life coverage correctly', () => {
      const result = calculateMortgageLife(mockInputs);
      
      expect(result.mortgageLifeCoverage).toBe(380000);
      expect(result.totalLifeInsuranceNeeded).toBeGreaterThan(0);
      expect(result.additionalCoverageNeeded).toBeGreaterThanOrEqual(0);
    });

    it('should calculate cost comparisons correctly', () => {
      const result = calculateMortgageLife(mockInputs);
      
      expect(result.mortgageLifeCost).toBe(540); // 45 * 12
      expect(result.termLifeCost).toBe(420); // 35 * 12
      expect(result.costDifference).toBe(120); // 540 - 420
      expect(result.totalCostOverTerm).toBe(15120); // 540 * 28
    });

    it('should generate comprehensive analysis reports', () => {
      const result = calculateMortgageLife(mockInputs);
      
      expect(result.coverageComparison).toContain('Coverage Comparison Analysis');
      expect(result.benefitAnalysis).toContain('Benefit Analysis');
      expect(result.recommendations).toContain('Recommendations');
      expect(result.riskAssessment).toContain('Risk Assessment');
      expect(result.costBenefitAnalysis).toContain('Cost-Benefit Analysis');
    });

    it('should handle edge case with zero equity', () => {
      const inputsWithZeroEquity = {
        ...mockInputs,
        currentLoanBalance: 400000, // Equal to loan amount
        existingLifeInsurance: 0
      };
      
      const result = calculateMortgageLife(inputsWithZeroEquity);
      
      expect(result.mortgageLifeCoverage).toBe(400000);
      expect(result.additionalCoverageNeeded).toBeGreaterThan(0);
    });

    it('should handle high-risk scenarios', () => {
      const highRiskInputs = {
        ...mockInputs,
        healthStatus: 'poor' as const,
        smokingStatus: 'smoker' as const,
        occupation: 'high-risk' as const,
        hobbies: 'high-risk' as const
      };
      
      const result = calculateMortgageLife(highRiskInputs);
      
      expect(result.riskAssessment).toContain('poor');
      expect(result.riskAssessment).toContain('smoker');
      expect(result.riskAssessment).toContain('high-risk');
    });

    it('should calculate total life insurance needs correctly', () => {
      const result = calculateMortgageLife(mockInputs);
      
      // Expected calculation: mortgage + debts + income replacement + education + final expenses
      const expectedComponents = [
        380000, // mortgage obligation
        25000,  // other debts
        850000, // income replacement (10x annual income)
        100000, // education funds (2 dependents * 50000)
        15000   // final expenses
      ];
      const expectedTotal = expectedComponents.reduce((sum, component) => sum + component, 0);
      
      expect(result.totalLifeInsuranceNeeded).toBe(expectedTotal);
    });

    it('should handle different coverage types', () => {
      const levelTermInputs = {
        ...mockInputs,
        coverageType: 'level' as const
      };
      
      const result = calculateMortgageLife(levelTermInputs);
      
      expect(result.coverageComparison).toContain('Level Term');
    });

    it('should generate appropriate recommendations based on coverage gap', () => {
      const inputsWithLargeGap = {
        ...mockInputs,
        existingLifeInsurance: 50000 // Much less than needed
      };
      
      const result = calculateMortgageLife(inputsWithLargeGap);
      
      expect(result.additionalCoverageNeeded).toBeGreaterThan(0);
      expect(result.recommendations).toContain('additional');
    });

    it('should handle different beneficiary types', () => {
      const trustInputs = {
        ...mockInputs,
        beneficiaryType: 'trust' as const
      };
      
      const result = calculateMortgageLife(trustInputs);
      
      expect(result.taxImplications).toContain('trust');
    });
  });

  describe('validation', () => {
    it('should validate required fields', () => {
      const invalidInputs = {
        ...mockInputs,
        loanAmount: undefined
      };
      
      const errors = validateAllMortgageLifeInputs(invalidInputs);
      
      expect(errors.loanAmount).toBeDefined();
    });

    it('should validate numeric ranges', () => {
      const invalidInputs = {
        ...mockInputs,
        borrowerAge: 15, // Too young
        loanAmount: 5000 // Too small
      };
      
      const errors = validateAllMortgageLifeInputs(invalidInputs);
      
      expect(errors.borrowerAge).toBeDefined();
      expect(errors.loanAmount).toBeDefined();
    });

    it('should validate select field options', () => {
      const invalidInputs = {
        ...mockInputs,
        healthStatus: 'invalid-status',
        smokingStatus: 'invalid-smoking'
      };
      
      const errors = validateAllMortgageLifeInputs(invalidInputs);
      
      expect(errors.healthStatus).toBeDefined();
      expect(errors.smokingStatus).toBeDefined();
    });

    it('should validate cross-field relationships', () => {
      const invalidInputs = {
        ...mockInputs,
        currentLoanBalance: 500000, // Exceeds loan amount
        yearsRemaining: 35 // Exceeds loan term
      };
      
      const errors = validateAllMortgageLifeInputs(invalidInputs);
      
      expect(errors.currentLoanBalance).toBeDefined();
      expect(errors.yearsRemaining).toBeDefined();
    });

    it('should validate reasonable age differences', () => {
      const invalidInputs = {
        ...mockInputs,
        borrowerAge: 25,
        coBorrowerAge: 60 // 35 year difference
      };
      
      const errors = validateAllMortgageLifeInputs(invalidInputs);
      
      expect(errors.coBorrowerAge).toBeDefined();
    });

    it('should validate state codes', () => {
      const invalidInputs = {
        ...mockInputs,
        state: 'XX' // Invalid state
      };
      
      const errors = validateAllMortgageLifeInputs(invalidInputs);
      
      expect(errors.state).toBeDefined();
    });

    it('should validate premium reasonableness', () => {
      const invalidInputs = {
        ...mockInputs,
        mortgageLifePremium: 5000, // Unreasonably high
        termLifePremium: 0.01 // Unreasonably low
      };
      
      const errors = validateAllMortgageLifeInputs(invalidInputs);
      
      expect(errors.mortgageLifePremium).toBeDefined();
      expect(errors.termLifePremium).toBeDefined();
    });

    it('should pass validation with valid inputs', () => {
      const errors = validateAllMortgageLifeInputs(mockInputs);
      
      expect(Object.keys(errors)).toHaveLength(0);
    });
  });

  describe('edge cases', () => {
    it('should handle maximum values', () => {
      const maxInputs = {
        ...mockInputs,
        loanAmount: 10000000,
        currentLoanBalance: 10000000,
        annualIncome: 10000000,
        savings: 10000000
      };
      
      const result = calculateMortgageLife(maxInputs);
      
      expect(result.mortgageLifeCoverage).toBe(10000000);
      expect(result.totalLifeInsuranceNeeded).toBeGreaterThan(10000000);
    });

    it('should handle minimum values', () => {
      const minInputs = {
        ...mockInputs,
        loanAmount: 10000,
        currentLoanBalance: 10000,
        annualIncome: 0,
        savings: 0,
        dependents: 0
      };
      
      const result = calculateMortgageLife(minInputs);
      
      expect(result.mortgageLifeCoverage).toBe(10000);
      expect(result.totalLifeInsuranceNeeded).toBeGreaterThan(10000);
    });

    it('should handle zero dependents', () => {
      const noDependentsInputs = {
        ...mockInputs,
        dependents: 0
      };
      
      const result = calculateMortgageLife(noDependentsInputs);
      
      // Should not include education funds
      const educationComponent = 0; // 0 dependents * 50000
      expect(result.totalLifeInsuranceNeeded).toBeLessThan(
        mockInputs.currentLoanBalance + mockInputs.otherDebts + (mockInputs.annualIncome * 10) + 50000 + 15000
      );
    });

    it('should handle maximum dependents', () => {
      const maxDependentsInputs = {
        ...mockInputs,
        dependents: 10
      };
      
      const result = calculateMortgageLife(maxDependentsInputs);
      
      // Should include maximum education funds
      const educationComponent = 500000; // 10 dependents * 50000
      expect(result.totalLifeInsuranceNeeded).toBeGreaterThan(
        mockInputs.currentLoanBalance + mockInputs.otherDebts + (mockInputs.annualIncome * 10) + 400000 + 15000
      );
    });
  });
});

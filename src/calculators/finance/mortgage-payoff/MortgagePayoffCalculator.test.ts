import { describe, it, expect } from 'vitest';
import { calculateMortgagePayoff } from './formulas';
import { validateMortgagePayoffInputs } from './validation';
import { validateAllMortgagePayoffInputs } from './quickValidation';

describe('Mortgage Payoff Calculator', () => {
  describe('calculateMortgagePayoff', () => {
    it('should calculate standard payoff scenario correctly', () => {
      const inputs = {
        loanAmount: 400000,
        currentBalance: 380000,
        interestRate: 4.5,
        loanTerm: 30,
        yearsRemaining: 28,
        monthlyPayment: 2400,
        additionalMonthlyPayment: 200,
        lumpSumPayment: 10000,
        biweeklyPayment: false,
        extraPaymentFrequency: 'monthly' as const,
        annualIncome: 85000,
        emergencyFund: 25000,
        otherDebts: 15000,
        investmentReturn: 7.0,
        taxRate: 22,
        inflationRate: 2.5,
        homeValue: 450000,
        refinanceRate: 3.5,
        refinanceCosts: 5000,
        payoffGoal: 'minimum-time' as const,
        targetPayoffDate: '2030-12-31',
        prepaymentPenalty: false,
        penaltyAmount: 0,
        state: 'CA'
      };

      const result = calculateMortgagePayoff(inputs);

      expect(result.standardPayoffDate).toBeDefined();
      expect(result.acceleratedPayoffDate).toBeDefined();
      expect(result.timeSaved).toBeGreaterThan(0);
      expect(result.interestSaved).toBeGreaterThan(0);
      expect(result.totalCostSavings).toBeDefined();
      expect(result.monthlyPaymentIncrease).toBe(200);
      expect(result.payoffStrategy).toContain('Payoff Strategy Analysis');
      expect(result.refinanceAnalysis).toContain('Refinance Analysis');
      expect(result.investmentComparison).toContain('Investment vs. Payoff');
      expect(result.cashFlowImpact).toContain('Cash Flow Impact');
      expect(result.taxImplications).toContain('Tax Implications');
      expect(result.riskAssessment).toContain('Risk Assessment');
      expect(result.opportunityCost).toBeDefined();
      expect(result.breakEvenAnalysis).toContain('Break-Even Analysis');
      expect(result.scenarioComparison).toContain('Scenario Comparison');
      expect(result.recommendations).toContain('Recommendations');
      expect(result.implementationPlan).toContain('Implementation Plan');
      expect(result.milestoneTimeline).toContain('Milestone Timeline');
      expect(result.financialImpact).toContain('Financial Impact');
      expect(result.nextSteps).toContain('Next Steps');
    });

    it('should handle biweekly payments correctly', () => {
      const inputs = {
        loanAmount: 400000,
        currentBalance: 380000,
        interestRate: 4.5,
        loanTerm: 30,
        yearsRemaining: 28,
        monthlyPayment: 2400,
        additionalMonthlyPayment: 0,
        lumpSumPayment: 0,
        biweeklyPayment: true,
        extraPaymentFrequency: 'monthly' as const,
        annualIncome: 85000,
        emergencyFund: 25000,
        otherDebts: 15000,
        investmentReturn: 7.0,
        taxRate: 22,
        inflationRate: 2.5,
        homeValue: 450000,
        refinanceRate: 3.5,
        refinanceCosts: 5000,
        payoffGoal: 'minimum-time' as const,
        targetPayoffDate: '2030-12-31',
        prepaymentPenalty: false,
        penaltyAmount: 0,
        state: 'CA'
      };

      const result = calculateMortgagePayoff(inputs);

      expect(result.monthlyPaymentIncrease).toBe(100); // 2400/24 = 100
      expect(result.timeSaved).toBeGreaterThan(0);
      expect(result.interestSaved).toBeGreaterThan(0);
    });

    it('should handle lump sum payments correctly', () => {
      const inputs = {
        loanAmount: 400000,
        currentBalance: 380000,
        interestRate: 4.5,
        loanTerm: 30,
        yearsRemaining: 28,
        monthlyPayment: 2400,
        additionalMonthlyPayment: 0,
        lumpSumPayment: 50000,
        biweeklyPayment: false,
        extraPaymentFrequency: 'one-time' as const,
        annualIncome: 85000,
        emergencyFund: 25000,
        otherDebts: 15000,
        investmentReturn: 7.0,
        taxRate: 22,
        inflationRate: 2.5,
        homeValue: 450000,
        refinanceRate: 3.5,
        refinanceCosts: 5000,
        payoffGoal: 'minimum-time' as const,
        targetPayoffDate: '2030-12-31',
        prepaymentPenalty: false,
        penaltyAmount: 0,
        state: 'CA'
      };

      const result = calculateMortgagePayoff(inputs);

      expect(result.timeSaved).toBeGreaterThan(0);
      expect(result.interestSaved).toBeGreaterThan(0);
      expect(result.acceleratedPayoffDate).toBeDefined();
    });

    it('should handle edge cases correctly', () => {
      const inputs = {
        loanAmount: 200000,
        currentBalance: 50000,
        interestRate: 3.0,
        loanTerm: 30,
        yearsRemaining: 5,
        monthlyPayment: 1200,
        additionalMonthlyPayment: 500,
        lumpSumPayment: 10000,
        biweeklyPayment: false,
        extraPaymentFrequency: 'monthly' as const,
        annualIncome: 100000,
        emergencyFund: 50000,
        otherDebts: 0,
        investmentReturn: 8.0,
        taxRate: 25,
        inflationRate: 2.0,
        homeValue: 250000,
        refinanceRate: 2.5,
        refinanceCosts: 3000,
        payoffGoal: 'balanced' as const,
        targetPayoffDate: '2028-12-31',
        prepaymentPenalty: false,
        penaltyAmount: 0,
        state: 'NY'
      };

      const result = calculateMortgagePayoff(inputs);

      expect(result.timeSaved).toBeGreaterThan(0);
      expect(result.interestSaved).toBeGreaterThan(0);
      expect(result.totalCostSavings).toBeDefined();
    });
  });

  describe('validation', () => {
    it('should validate required fields', () => {
      const rules = validateMortgagePayoffInputs();
      const requiredFields = [
        'loanAmount', 'currentBalance', 'interestRate', 'loanTerm',
        'yearsRemaining', 'monthlyPayment', 'additionalMonthlyPayment',
        'lumpSumPayment', 'biweeklyPayment', 'extraPaymentFrequency',
        'annualIncome', 'emergencyFund', 'otherDebts', 'investmentReturn',
        'taxRate', 'inflationRate', 'homeValue', 'refinanceRate',
        'refinanceCosts', 'payoffGoal', 'targetPayoffDate',
        'prepaymentPenalty', 'penaltyAmount', 'state'
      ];

      const requiredRules = rules.filter(rule => rule.type === 'required');
      expect(requiredRules.length).toBe(requiredFields.length);
    });

    it('should validate numeric ranges', () => {
      const rules = validateMortgagePayoffInputs();
      const rangeRules = rules.filter(rule => rule.type === 'range');
      expect(rangeRules.length).toBeGreaterThan(0);
    });

    it('should validate cross-field relationships', () => {
      const rules = validateMortgagePayoffInputs();
      const customRules = rules.filter(rule => rule.type === 'custom');
      expect(customRules.length).toBeGreaterThan(0);
    });

    it('should validate individual fields correctly', () => {
      const validInputs = {
        loanAmount: 400000,
        currentBalance: 380000,
        interestRate: 4.5,
        loanTerm: 30,
        yearsRemaining: 28,
        monthlyPayment: 2400,
        additionalMonthlyPayment: 200,
        lumpSumPayment: 10000,
        biweeklyPayment: false,
        extraPaymentFrequency: 'monthly',
        annualIncome: 85000,
        emergencyFund: 25000,
        otherDebts: 15000,
        investmentReturn: 7.0,
        taxRate: 22,
        inflationRate: 2.5,
        homeValue: 450000,
        refinanceRate: 3.5,
        refinanceCosts: 5000,
        payoffGoal: 'minimum-time',
        targetPayoffDate: '2030-12-31',
        prepaymentPenalty: false,
        penaltyAmount: 0,
        state: 'CA'
      };

      const errors = validateAllMortgagePayoffInputs(validInputs);
      expect(Object.keys(errors).length).toBe(0);
    });

    it('should catch validation errors', () => {
      const invalidInputs = {
        loanAmount: 5000, // Too low
        currentBalance: 500000, // Exceeds loan amount
        interestRate: 25, // Too high
        loanTerm: 60, // Too high
        yearsRemaining: 35, // Exceeds loan term
        monthlyPayment: 60000, // Too high
        additionalMonthlyPayment: 15000, // Too high
        lumpSumPayment: 500000, // Exceeds balance
        biweeklyPayment: false,
        extraPaymentFrequency: 'invalid',
        annualIncome: 15000000, // Too high
        emergencyFund: 2000000, // Too high
        otherDebts: 2000000, // Too high
        investmentReturn: 25, // Too high
        taxRate: 60, // Too high
        inflationRate: 15, // Too high
        homeValue: 15000000, // Too high
        refinanceRate: 6.0, // Higher than current rate
        refinanceCosts: 200000, // Too high
        payoffGoal: 'invalid',
        targetPayoffDate: '2020-01-01', // Past date
        prepaymentPenalty: false,
        penaltyAmount: 200000, // Too high
        state: 'XX' // Invalid state
      };

      const errors = validateAllMortgagePayoffInputs(invalidInputs);
      expect(Object.keys(errors).length).toBeGreaterThan(0);
    });
  });
});

import { describe, it, expect } from 'vitest';
import {
  calculateSimpleIRA,
  calculateSimpleContributionLimit,
  calculateEmployerMatch
} from './formulas';
import { validateSimpleIRAInputs } from './validation';

describe('SIMPLE IRA Calculator', () => {
  const mockInputs = {
    annualSalary: 60000,
    employeeContribution: 14000,
    employerMatch: 50,
    expectedAnnualReturn: 7,
    yearsToContribute: 25,
    currentBalance: 0,
    taxBracket: 22,
    filingStatus: 'single' as const,
    numberOfEmployees: 15,
    vestingSchedule: 'graded' as const
  };

  describe('Core Calculations', () => {
    it('calculates contribution limit correctly', () => {
      const result = calculateSimpleContributionLimit(60000);
      expect(result).toBe(16000);
    });

    it('calculates employer match correctly', () => {
      const result = calculateEmployerMatch(14000, 50);
      expect(result).toBe(7000);
    });

    it('calculates SIMPLE IRA future value correctly', () => {
      const result = calculateSimpleIRA(mockInputs);
      expect(result.futureValue).toBeGreaterThan(0);
      expect(result.totalContributions).toBe(525000); // 14k * 25 + 7k * 25
      expect(result.totalEarnings).toBe(result.futureValue - result.totalContributions);
    });

    it('calculates tax savings correctly', () => {
      const result = calculateSimpleIRA(mockInputs);
      const expectedTaxSavings = 21000 * 25 * 0.22; // Total contributions * years * tax rate
      expect(result.taxSavings).toBe(expectedTaxSavings);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateSimpleIRAInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates employee contribution limits', () => {
      const invalidInputs = { ...mockInputs, employeeContribution: 20000 };
      const result = validateSimpleIRAInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates employer match percentage', () => {
      const invalidInputs = { ...mockInputs, employerMatch: 150 };
      const result = validateSimpleIRAInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates employee count limits', () => {
      const invalidInputs = { ...mockInputs, numberOfEmployees: 150 };
      const result = validateSimpleIRAInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero employer match', () => {
      const result = calculateSimpleIRA({ ...mockInputs, employerMatch: 0 });
      expect(result.totalEmployerContribution).toBe(0);
      expect(result.employerMatchAmount).toBe(0);
    });

    it('handles maximum employee contribution', () => {
      const result = calculateSimpleIRA({ ...mockInputs, employeeContribution: 16000 });
      expect(result.totalEmployeeContribution).toBe(16000 * 25);
    });

    it('handles catch-up contributions for age 50+', () => {
      const result = calculateSimpleContributionLimit(60000, 55);
      expect(result).toBe(19500); // 16k + 3.5k catch-up
    });

    it('handles existing balance', () => {
      const result = calculateSimpleIRA({ ...mockInputs, currentBalance: 50000 });
      expect(result.futureValue).toBeGreaterThan(50000);
    });
  });

  describe('Business Rules', () => {
    it('validates eligibility for small businesses', () => {
      const result = calculateSimpleIRA({ ...mockInputs, numberOfEmployees: 50 });
      expect(result.eligibilityStatus).toContain('Eligible');
    });

    it('flags businesses with too many employees', () => {
      const result = calculateSimpleIRA({ ...mockInputs, numberOfEmployees: 150 });
      expect(result.eligibilityStatus).toContain('limited to businesses');
    });
  });
});
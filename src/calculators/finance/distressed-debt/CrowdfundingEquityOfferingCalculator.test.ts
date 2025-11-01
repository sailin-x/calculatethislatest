import { describe, it, expect } from 'vitest';
import {
  calculateTotalEquityOffered,
  calculatePricePerShare,
  calculateSharesOffered,
  calculateFundingProgress,
  calculateRemainingFundingNeeded,
  calculateAverageInvestmentPerInvestor,
  calculateTotalFees,
  calculateNetProceeds,
  calculatePostMoneyValuation,
  calculateOwnershipDilution,
  calculateBreakEvenInvestors,
  calculateProjectedROI,
  calculateRiskAdjustedReturn,
  calculateSuccessProbability
} from './formulas';
import { validatedistressed_debtCalculatorInputs } from './validation';

describe('Crowdfunding Equity Offering Calculator', () => {
  const mockInputs = {
    totalFundingGoal: 500000,
    minimumInvestment: 1000,
    maximumInvestment: 25000,
    currentFunding: 150000,
    numberOfInvestors: 45,
    valuation: 4000000,
    equityPercentageOffered: 12.5,
    platformFees: 15000,
    legalFees: 25000,
    marketingFees: 30000,
    campaignDuration: 60,
    expectedReturn: 25,
    riskLevel: 'medium' as const,
    industry: 'technology',
    companyStage: 'seed' as const,
    investorAccreditationRequired: false
  };

  describe('Core Calculations', () => {
    it('calculates total equity offered correctly', () => {
      const result = calculateTotalEquityOffered(mockInputs);
      expect(result).toBe(12.5);
    });

    it('calculates price per share correctly', () => {
      const result = calculatePricePerShare(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(8, 0); // Approximate expected value
    });

    it('calculates shares offered correctly', () => {
      const result = calculateSharesOffered(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(62500, 0);
    });

    it('calculates funding progress correctly', () => {
      const result = calculateFundingProgress(mockInputs);
      expect(result).toBe(30); // 150000 / 500000 * 100
    });

    it('calculates remaining funding needed correctly', () => {
      const result = calculateRemainingFundingNeeded(mockInputs);
      expect(result).toBe(350000); // 500000 - 150000
    });

    it('calculates average investment per investor correctly', () => {
      const result = calculateAverageInvestmentPerInvestor(mockInputs);
      expect(result).toBeCloseTo(3333.33, 2); // 150000 / 45
    });

    it('calculates total fees correctly', () => {
      const result = calculateTotalFees(mockInputs);
      expect(result).toBe(70000); // 15000 + 25000 + 30000
    });

    it('calculates net proceeds correctly', () => {
      const result = calculateNetProceeds(mockInputs);
      expect(result).toBe(80000); // 150000 - 70000
    });

    it('calculates post-money valuation correctly', () => {
      const result = calculatePostMoneyValuation(mockInputs);
      expect(result).toBe(4150000); // 4000000 + 150000
    });

    it('calculates ownership dilution correctly', () => {
      const result = calculateOwnershipDilution(mockInputs);
      expect(result).toBeCloseTo(3.61, 2); // (150000 / 4150000) * 100
    });

    it('calculates break-even investors correctly', () => {
      const result = calculateBreakEvenInvestors(mockInputs);
      expect(result).toBe(150); // ceil(500000 / 3333.33)
    });

    it('calculates projected ROI correctly', () => {
      const result = calculateProjectedROI(mockInputs);
      expect(result).toBe(25);
    });

    it('calculates risk-adjusted return correctly', () => {
      const result = calculateRiskAdjustedReturn(mockInputs);
      expect(result).toBe(25); // medium risk = 1.0 multiplier
    });

    it('calculates success probability correctly', () => {
      const result = calculateSuccessProbability(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatedistressed_debtCalculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates funding goal cannot be zero', () => {
      const invalidInputs = { ...mockInputs, totalFundingGoal: 0 };
      const result = validatedistressed_debtCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('greater than 0');
    });

    it('validates minimum investment cannot exceed funding goal', () => {
      const invalidInputs = { ...mockInputs, minimumInvestment: 600000 };
      const result = validatedistressed_debtCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates equity percentage range', () => {
      const invalidInputs = { ...mockInputs, equityPercentageOffered: 150 };
      const result = validatedistressed_debtCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates campaign duration range', () => {
      const invalidInputs = { ...mockInputs, campaignDuration: 400 };
      const result = validatedistressed_debtCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero current funding', () => {
      const result = calculateFundingProgress({ ...mockInputs, currentFunding: 0 });
      expect(result).toBe(0);
    });

    it('handles 100% funding progress', () => {
      const result = calculateFundingProgress({ ...mockInputs, currentFunding: 500000 });
      expect(result).toBe(100);
    });

    it('handles zero investors', () => {
      const result = calculateAverageInvestmentPerInvestor({ ...mockInputs, numberOfInvestors: 0 });
      expect(result).toBe(0);
    });

    it('handles high risk level', () => {
      const result = calculateRiskAdjustedReturn({ ...mockInputs, riskLevel: 'high' as const });
      expect(result).toBe(37.5); // 25 * 1.5
    });

    it('handles low risk level', () => {
      const result = calculateRiskAdjustedReturn({ ...mockInputs, riskLevel: 'low' as const });
      expect(result).toBe(20); // 25 * 0.8
    });
  });
});
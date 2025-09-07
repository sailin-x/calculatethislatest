import { describe, it, expect } from 'vitest';
import { calculateLoanToCostRatio, calculateEquityContribution, calculateRiskScore } from './formulas';
import { validateLoanToCostInputs } from './validation';

describe('Loan to Cost Calculator', () => {
  const mockInputs = {
    loanAmount: 1500000,
    interestRate: 7.5,
    loanTerm: 24,
    loanType: 'construction' as const,
    paymentType: 'interest_only' as const,
    projectType: 'residential' as const,
    projectSize: 10000,
    projectAddress: '123 Main St',
    projectDescription: 'Residential development',
    landCost: 400000,
    constructionCost: 1200000,
    softCosts: 300000,
    contingencyCost: 100000,
    totalProjectCost: 2000000,
    siteWorkCost: 50000,
    foundationCost: 100000,
    structuralCost: 200000,
    exteriorCost: 150000,
    interiorCost: 250000,
    mechanicalCost: 100000,
    electricalCost: 80000,
    plumbingCost: 60000,
    finishCost: 150000,
    architecturalFees: 50000,
    engineeringFees: 30000,
    permitFees: 20000,
    legalFees: 25000,
    insuranceCost: 15000,
    appraisalFees: 10000,
    surveyFees: 8000,
    environmentalFees: 12000,
    otherSoftCosts: 5000,
    constructionStartDate: '2024-01-01',
    constructionEndDate: '2024-07-01',
    constructionDuration: 18,
    drawSchedule: [
      { draw: 1, percentage: 20, amount: 400000, date: '2024-01-15' },
      { draw: 2, percentage: 30, amount: 600000, date: '2024-03-15' },
      { draw: 3, percentage: 30, amount: 600000, date: '2024-05-15' },
      { draw: 4, percentage: 20, amount: 400000, date: '2024-07-01' }
    ],
    borrowerEquity: 500000,
    borrowerExperience: 'moderate' as const,
    borrowerCreditScore: 750,
    borrowerNetWorth: 2000000,
    borrowerLiquidity: 800000,
    marketLocation: 'Suburban',
    marketCondition: 'growing' as const,
    marketGrowthRate: 4,
    comparableProjects: [
      { project: 'Project A', cost: 1800000, completionDate: '2023-01-01', performance: 'Good' },
      { project: 'Project B', cost: 2200000, completionDate: '2023-06-01', performance: 'Excellent' }
    ],
    exitStrategy: 'sell' as const,
    expectedExitValue: 2800000,
    expectedExitDate: '2024-12-01',
    exitTimeline: 24,
    constructionRisk: 'medium' as const,
    marketRisk: 'low' as const,
    borrowerRisk: 'low' as const,
    projectRisk: 'medium' as const,
    personalGuarantee: true,
    completionGuarantee: true,
    additionalCollateral: 0,
    crossCollateralization: false,
    analysisPeriod: 5,
    inflationRate: 3,
    constructionInflationRate: 5,
    discountRate: 8,
    currency: 'USD' as const,
    displayFormat: 'percentage' as const,
    includeCharts: true
  };

  describe('Core Calculations', () => {
    it('calculates loan-to-cost ratio correctly', () => {
      const result = calculateLoanToCostRatio(mockInputs);
      expect(result).toBe(75); // 1,500,000 / 2,000,000 * 100
    });

    it('calculates equity contribution correctly', () => {
      const result = calculateEquityContribution(mockInputs);
      expect(result).toBe(500000); // 2,000,000 - 1,500,000
    });

    it('calculates risk score correctly', () => {
      const result = calculateRiskScore(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(400);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateLoanToCostInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates loan amount cannot exceed total project cost', () => {
      const invalidInputs = { ...mockInputs, loanAmount: 2500000 };
      const result = validateLoanToCostInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('cannot exceed');
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, totalProjectCost: 0 };
      const result = validateLoanToCostInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero loan amount', () => {
      const result = calculateLoanToCostRatio({ ...mockInputs, loanAmount: 0 });
      expect(result).toBe(0);
    });

    it('handles maximum loan amount', () => {
      const result = calculateLoanToCostRatio({
        ...mockInputs,
        loanAmount: mockInputs.totalProjectCost
      });
      expect(result).toBe(100);
    });

    it('handles high risk scenario', () => {
      const highRiskInputs = {
        ...mockInputs,
        constructionRisk: 'high' as const,
        marketRisk: 'high' as const,
        borrowerRisk: 'high' as const,
        projectRisk: 'high' as const
      };
      const result = calculateRiskScore(highRiskInputs);
      expect(result).toBeGreaterThan(200);
    });
  });
});
import { describe, it, expect } from 'vitest';
import { calculateCostOfDebtMetrics } from './formulas';
import { validateCostOfDebtInputs } from './validation';

describe('Cost of Debt Calculator', () => {
  const mockInputs = {
    bondFaceValue: 1000,
    bondCouponRate: 5,
    bondMarketPrice: 1020,
    bondYearsToMaturity: 10,
    bondCouponFrequency: 2,
    bankLoanAmount: 500,
    bankLoanInterestRate: 4.5,
    bankLoanTerm: 5,
    bankLoanFees: 10,
    creditFacilityLimit: 200,
    creditFacilityRate: 4.25,
    creditFacilityCommitmentFee: 0.5,
    creditFacilityUtilization: 60,
    preferredStockDividend: 2.5,
    preferredStockPrice: 25,
    preferredStockParValue: 100,
    taxRate: 30,
    taxLossCarryforwards: 0,
    riskFreeRate: 4.0,
    marketRiskPremium: 6.0,
    companyBeta: 1.0,
    creditRating: 'BBB',
    industry: 'industrials',
    totalDebt: 2000,
    totalAssets: 5000,
    ebitda: 800,
    interestExpense: 85,
    debtToEquityRatio: 1.2,
    debtToEbitdaRatio: 2.5,
    calculationMethod: 'weighted_average' as const,
    weightingMethod: 'book_value' as const
  };

  describe('Cost of Debt Calculations', () => {
    it('calculates weighted average cost of debt correctly', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.weightedAverageCostOfDebt).toBeGreaterThan(0);
      expect(result.weightedAverageCostOfDebt).toBeLessThan(20);
    });

    it('calculates after-tax cost of debt correctly', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.afterTaxWeightedAverageCostOfDebt).toBeLessThan(result.weightedAverageCostOfDebt);
    });

    it('calculates credit spread correctly', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.creditSpread).toBeGreaterThanOrEqual(0);
    });

    it('calculates tax shield value correctly', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.taxShieldValue).toBeGreaterThan(0);
    });

    it('calculates bond yield to maturity correctly', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.bondYieldToMaturity).toBeGreaterThan(0);
    });
  });

  describe('Component Calculations', () => {
    it('calculates bank loan effective rate correctly', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.bankLoanEffectiveRate).toBeGreaterThan(mockInputs.bankLoanInterestRate);
    });

    it('calculates credit facility cost correctly', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.creditFacilityEffectiveCost).toBeGreaterThan(0);
    });

    it('calculates preferred stock cost correctly', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.preferredStockCost).toBeGreaterThan(0);
    });
  });

  describe('Financial Ratios', () => {
    it('calculates break-even leverage ratio correctly', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.breakEvenLeverageRatio).toBeGreaterThan(0);
    });

    it('calculates interest coverage ratio correctly', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.breakEvenInterestCoverage).toBeGreaterThan(0);
    });

    it('calculates debt capacity utilization correctly', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.debtCapacityUtilization).toBeGreaterThanOrEqual(0);
      expect(result.debtCapacityUtilization).toBeLessThanOrEqual(100);
    });
  });

  describe('Scenario Analysis', () => {
    it('provides base case cost of debt', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.baseCaseCostOfDebt).toBe(result.weightedAverageCostOfDebt);
    });

    it('provides optimistic case cost of debt', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.optimisticCaseCostOfDebt).toBeLessThan(result.baseCaseCostOfDebt);
    });

    it('provides pessimistic case cost of debt', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.pessimisticCaseCostOfDebt).toBeGreaterThan(result.baseCaseCostOfDebt);
    });
  });

  describe('Compliance Checks', () => {
    it('checks debt-to-equity compliance', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(typeof result.debtToEquityCompliance).toBe('boolean');
    });

    it('checks interest coverage compliance', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(typeof result.interestCoverageCompliance).toBe('boolean');
    });
  });

  describe('Projections', () => {
    it('provides 1-year cost projection', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.projectedCostOfDebt1yr).toBeGreaterThan(0);
    });

    it('provides 3-year cost projection', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.projectedCostOfDebt3yr).toBeGreaterThan(result.projectedCostOfDebt1yr);
    });

    it('provides 5-year cost projection', () => {
      const result = calculateCostOfDebtMetrics(mockInputs);
      expect(result.projectedCostOfDebt5yr).toBeGreaterThan(result.projectedCostOfDebt3yr);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateCostOfDebtInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates tax rate range', () => {
      const invalidInputs = { ...mockInputs, taxRate: 150 };
      const result = validateCostOfDebtInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates credit rating', () => {
      const invalidInputs = { ...mockInputs, creditRating: 'INVALID' };
      const result = validateCostOfDebtInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates total debt cannot be negative', () => {
      const invalidInputs = { ...mockInputs, totalDebt: -100 };
      const result = validateCostOfDebtInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates calculation method', () => {
      const invalidInputs = { ...mockInputs, calculationMethod: 'invalid_method' as any };
      const result = validateCostOfDebtInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates weighting method', () => {
      const invalidInputs = { ...mockInputs, weightingMethod: 'invalid_weight' as any };
      const result = validateCostOfDebtInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero tax rate', () => {
      const zeroTaxInputs = { ...mockInputs, taxRate: 0 };
      const result = calculateCostOfDebtMetrics(zeroTaxInputs);
      expect(result.afterTaxWeightedAverageCostOfDebt).toBe(result.weightedAverageCostOfDebt);
    });

    it('handles high tax rate', () => {
      const highTaxInputs = { ...mockInputs, taxRate: 50 };
      const result = calculateCostOfDebtMetrics(highTaxInputs);
      expect(result.afterTaxWeightedAverageCostOfDebt).toBeLessThan(result.weightedAverageCostOfDebt * 0.5);
    });

    it('handles junk bond rating', () => {
      const junkBondInputs = { ...mockInputs, creditRating: 'CCC' };
      const result = calculateCostOfDebtMetrics(junkBondInputs);
      expect(result.syntheticRatingCost).toBeGreaterThan(10);
    });

    it('handles investment grade rating', () => {
      const igInputs = { ...mockInputs, creditRating: 'AAA' };
      const result = calculateCostOfDebtMetrics(igInputs);
      expect(result.syntheticRatingCost).toBeLessThan(3);
    });

    it('handles high leverage ratios', () => {
      const highLeverageInputs = { ...mockInputs, debtToEquityRatio: 5, debtToEbitdaRatio: 8 };
      const result = calculateCostOfDebtMetrics(highLeverageInputs);
      expect(result.debtCapacityUtilization).toBeGreaterThan(100);
    });

    it('handles low leverage ratios', () => {
      const lowLeverageInputs = { ...mockInputs, debtToEquityRatio: 0.2, debtToEbitdaRatio: 0.5 };
      const result = calculateCostOfDebtMetrics(lowLeverageInputs);
      expect(result.debtCapacityUtilization).toBeLessThan(50);
    });
  });

  describe('Industry Analysis', () => {
    it('calculates industry average for technology', () => {
      const techInputs = { ...mockInputs, industry: 'technology' };
      const result = calculateCostOfDebtMetrics(techInputs);
      expect(result.industryAverageCostOfDebt).toBeDefined();
    });

    it('calculates industry average for utilities', () => {
      const utilityInputs = { ...mockInputs, industry: 'utilities' };
      const result = calculateCostOfDebtMetrics(utilityInputs);
      expect(result.industryAverageCostOfDebt).toBeDefined();
    });

    it('calculates industry average for financials', () => {
      const financialInputs = { ...mockInputs, industry: 'financials' };
      const result = calculateCostOfDebtMetrics(financialInputs);
      expect(result.industryAverageCostOfDebt).toBeDefined();
    });
  });
});
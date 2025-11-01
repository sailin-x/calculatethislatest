import { describe, it, expect } from 'vitest';
import {
  calculateStretchIRA,
  getLifeExpectancy,
  calculateRequiredMinimumDistribution
} from './formulas';
import { validateStretchIRAInputs } from './validation';

describe('Stretch IRA Calculator', () => {
  const mockInputs = {
    initialBalance: 1000000,
    expectedAnnualReturn: 7,
    inflationRate: 2.5,
    taxBracket: 25,
    filingStatus: 'single' as const,
    numberOfBeneficiaries: 1,
    beneficiaryAges: [25],
    lifeExpectancyMethod: 'single_life' as const,
    withdrawalStrategy: 'required_minimum' as const,
    analysisPeriod: 30,
    currentAge: 65
  };

  describe('Life Expectancy Calculations', () => {
    it('calculates life expectancy correctly', () => {
      expect(getLifeExpectancy(70)).toBe(27.4);
      expect(getLifeExpectancy(80)).toBe(18.7);
      expect(getLifeExpectancy(90)).toBe(11.4);
    });

    it('handles boundary ages', () => {
      expect(getLifeExpectancy(69)).toBe(27.4); // Under 70 gets max
      expect(getLifeExpectancy(116)).toBe(1.9); // Over 115 gets min
    });
  });

  describe('Required Minimum Distribution', () => {
    it('calculates RMD correctly', () => {
      const rmd = calculateRequiredMinimumDistribution(100000, 25);
      expect(rmd).toBe(4000);
    });
  });

  describe('Stretch IRA Calculations', () => {
    it('calculates stretch IRA projections correctly', () => {
      const result = calculateStretchIRA(mockInputs);
      expect(result.totalDistributions).toBeGreaterThan(0);
      expect(result.totalTaxesPaid).toBeGreaterThan(0);
      expect(result.netDistributions).toBe(result.totalDistributions - result.totalTaxesPaid);
      expect(result.stretchDuration).toBeGreaterThan(0);
    });

    it('generates beneficiary analysis', () => {
      const result = calculateStretchIRA(mockInputs);
      expect(result.beneficiaryAnalysis).toHaveLength(1);
      expect(result.beneficiaryAnalysis[0].age).toBe(25);
    });

    it('generates year-by-year projections', () => {
      const result = calculateStretchIRA(mockInputs);
      expect(result.yearByYearProjections).toHaveLength(mockInputs.analysisPeriod);
    });

    it('provides optimization recommendations', () => {
      const result = calculateStretchIRA(mockInputs);
      expect(result.optimizationRecommendations.length).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateStretchIRAInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates initial balance', () => {
      const invalidInputs = { ...mockInputs, initialBalance: 0 };
      const result = validateStretchIRAInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates number of beneficiaries', () => {
      const invalidInputs = { ...mockInputs, numberOfBeneficiaries: 0 };
      const result = validateStretchIRAInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates analysis period', () => {
      const invalidInputs = { ...mockInputs, analysisPeriod: 0 };
      const result = validateStretchIRAInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles multiple beneficiaries', () => {
      const result = calculateStretchIRA({
        ...mockInputs,
        numberOfBeneficiaries: 3,
        beneficiaryAges: [25, 30, 35]
      });
      expect(result.beneficiaryAnalysis).toHaveLength(3);
    });

    it('handles different withdrawal strategies', () => {
      const fixedAmountResult = calculateStretchIRA({
        ...mockInputs,
        withdrawalStrategy: 'fixed_amount' as const,
        fixedWithdrawalAmount: 30000
      });
      expect(fixedAmountResult.totalDistributions).toBeGreaterThan(0);

      const fixedPercentResult = calculateStretchIRA({
        ...mockInputs,
        withdrawalStrategy: 'fixed_percentage' as const,
        fixedWithdrawalPercentage: 4
      });
      expect(fixedPercentResult.totalDistributions).toBeGreaterThan(0);
    });

    it('handles high tax brackets', () => {
      const result = calculateStretchIRA({
        ...mockInputs,
        taxBracket: 37
      });
      expect(result.effectiveTaxRate).toBe(37);
    });

    it('handles zero returns', () => {
      const result = calculateStretchIRA({
        ...mockInputs,
        expectedAnnualReturn: 0
      });
      expect(result.totalDistributions).toBeGreaterThan(0);
    });
  });

  describe('Business Rules', () => {
    it('validates beneficiary ages', () => {
      const result = validateStretchIRAInputs({
        ...mockInputs,
        beneficiaryAges: [-5, 150] // Invalid ages
      });
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles large balances', () => {
      const result = calculateStretchIRA({
        ...mockInputs,
        initialBalance: 5000000
      });
      expect(result.totalDistributions).toBeGreaterThan(mockInputs.initialBalance);
    });
  });
});
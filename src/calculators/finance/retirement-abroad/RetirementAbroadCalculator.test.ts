import { describe, it, expect } from 'vitest';
import { calculateRetirementAbroad } from './formulas';
import { validateRetirementAbroadInputs } from './validation';

describe('Retirement Abroad Calculator', () => {
  describe('Retirement Calculations', () => {
    it('calculates retirement abroad for Portugal scenario', () => {
      const inputs = {
        currentAnnualIncome: 80000,
        currentAnnualExpenses: 50000,
        targetCountry: 'Portugal',
        currentCountry: 'United States',
        yearsToRetirement: 15,
        expectedInflationRate: 3,
        expectedInvestmentReturn: 7,
        currentSavings: 200000,
        monthlyRetirementContribution: 1500,
        healthcareCosts: 4000,
        housingCosts: 12000,
        transportationCosts: 3000,
        foodCosts: 8000,
        entertainmentCosts: 6000,
        taxRate: 25,
        exchangeRate: 0.85,
        costOfLivingAdjustment: 1
      };
      const result = calculateRetirementAbroad(inputs);
      expect(result.totalSavingsAtRetirement).toBeGreaterThan(700000);
      expect(result.annualRetirementIncome).toBeGreaterThan(28000);
      expect(result.feasibilityScore).toBeGreaterThan(80);
    });

    it('calculates retirement abroad for Thailand scenario', () => {
      const inputs = {
        currentAnnualIncome: 70000,
        currentAnnualExpenses: 45000,
        targetCountry: 'Thailand',
        currentCountry: 'Canada',
        yearsToRetirement: 10,
        expectedInflationRate: 3.5,
        expectedInvestmentReturn: 6,
        currentSavings: 150000,
        monthlyRetirementContribution: 1200,
        healthcareCosts: 3000,
        housingCosts: 6000,
        transportationCosts: 2000,
        foodCosts: 4000,
        entertainmentCosts: 3000,
        taxRate: 30,
        exchangeRate: 27,
        costOfLivingAdjustment: 1
      };
      const result = calculateRetirementAbroad(inputs);
      expect(result.totalSavingsAtRetirement).toBeGreaterThan(350000);
      expect(result.annualRetirementIncome).toBeGreaterThan(14000);
      expect(result.costOfLivingComparison).toBeCloseTo(0.55, 2);
    });

    it('handles zero savings scenario', () => {
      const inputs = {
        currentAnnualIncome: 60000,
        currentAnnualExpenses: 40000,
        targetCountry: 'Mexico',
        currentCountry: 'United States',
        yearsToRetirement: 20,
        expectedInflationRate: 3,
        expectedInvestmentReturn: 7,
        currentSavings: 0,
        monthlyRetirementContribution: 1000,
        healthcareCosts: 3000,
        housingCosts: 8000,
        transportationCosts: 2000,
        foodCosts: 5000,
        entertainmentCosts: 4000,
        taxRate: 25,
        exchangeRate: 18,
        costOfLivingAdjustment: 1
      };
      const result = calculateRetirementAbroad(inputs);
      expect(result.totalSavingsAtRetirement).toBeGreaterThan(200000);
      expect(result.feasibilityScore).toBeGreaterThan(0);
    });
  });

  describe('Cost of Living Adjustments', () => {
    it('correctly adjusts for higher cost countries', () => {
      const inputs = {
        currentAnnualIncome: 100000,
        currentAnnualExpenses: 60000,
        targetCountry: 'Singapore',
        currentCountry: 'United States',
        yearsToRetirement: 10,
        expectedInflationRate: 3,
        expectedInvestmentReturn: 7,
        currentSavings: 300000,
        monthlyRetirementContribution: 2000,
        healthcareCosts: 5000,
        housingCosts: 20000,
        transportationCosts: 4000,
        foodCosts: 10000,
        entertainmentCosts: 8000,
        taxRate: 30,
        exchangeRate: 1.35,
        costOfLivingAdjustment: 1
      };
      const result = calculateRetirementAbroad(inputs);
      expect(result.costOfLivingComparison).toBeGreaterThan(1);
      expect(result.feasibilityScore).toBeLessThan(90);
    });

    it('correctly adjusts for lower cost countries', () => {
      const inputs = {
        currentAnnualIncome: 80000,
        currentAnnualExpenses: 50000,
        targetCountry: 'Vietnam',
        currentCountry: 'United States',
        yearsToRetirement: 15,
        expectedInflationRate: 3,
        expectedInvestmentReturn: 7,
        currentSavings: 200000,
        monthlyRetirementContribution: 1500,
        healthcareCosts: 2000,
        housingCosts: 4000,
        transportationCosts: 1500,
        foodCosts: 3000,
        entertainmentCosts: 2000,
        taxRate: 25,
        exchangeRate: 23000,
        costOfLivingAdjustment: 1
      };
      const result = calculateRetirementAbroad(inputs);
      expect(result.costOfLivingComparison).toBeLessThan(0.5);
      expect(result.feasibilityScore).toBeGreaterThan(85);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const inputs = {
        currentAnnualIncome: 80000,
        currentAnnualExpenses: 50000,
        targetCountry: 'Portugal',
        currentCountry: 'United States',
        yearsToRetirement: 15,
        expectedInflationRate: 3,
        expectedInvestmentReturn: 7,
        currentSavings: 200000,
        monthlyRetirementContribution: 1500,
        healthcareCosts: 4000,
        housingCosts: 12000,
        transportationCosts: 3000,
        foodCosts: 8000,
        entertainmentCosts: 6000,
        taxRate: 25,
        exchangeRate: 0.85,
        costOfLivingAdjustment: 1
      };
      const result = validateRetirementAbroadInputs(inputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const inputs = {
        currentAnnualIncome: 0,
        currentAnnualExpenses: 50000,
        targetCountry: 'Portugal',
        currentCountry: 'United States',
        yearsToRetirement: 15,
        expectedInflationRate: 3,
        expectedInvestmentReturn: 7,
        currentSavings: 200000,
        monthlyRetirementContribution: 1500,
        healthcareCosts: 4000,
        housingCosts: 12000,
        transportationCosts: 3000,
        foodCosts: 8000,
        entertainmentCosts: 6000,
        taxRate: 25,
        exchangeRate: 0.85,
        costOfLivingAdjustment: 1
      };
      const result = validateRetirementAbroadInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('greater than 0');
    });

    it('validates country selection', () => {
      const inputs = {
        currentAnnualIncome: 80000,
        currentAnnualExpenses: 50000,
        targetCountry: '',
        currentCountry: 'United States',
        yearsToRetirement: 15,
        expectedInflationRate: 3,
        expectedInvestmentReturn: 7,
        currentSavings: 200000,
        monthlyRetirementContribution: 1500,
        healthcareCosts: 4000,
        housingCosts: 12000,
        transportationCosts: 3000,
        foodCosts: 8000,
        entertainmentCosts: 6000,
        taxRate: 25,
        exchangeRate: 0.85,
        costOfLivingAdjustment: 1
      };
      const result = validateRetirementAbroadInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('required');
    });

    it('validates rate ranges', () => {
      const inputs = {
        currentAnnualIncome: 80000,
        currentAnnualExpenses: 50000,
        targetCountry: 'Portugal',
        currentCountry: 'United States',
        yearsToRetirement: 15,
        expectedInflationRate: 25, // Too high
        expectedInvestmentReturn: 7,
        currentSavings: 200000,
        monthlyRetirementContribution: 1500,
        healthcareCosts: 4000,
        housingCosts: 12000,
        transportationCosts: 3000,
        foodCosts: 8000,
        entertainmentCosts: 6000,
        taxRate: 25,
        exchangeRate: 0.85,
        costOfLivingAdjustment: 1
      };
      const result = validateRetirementAbroadInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('20%');
    });
  });

  describe('Edge Cases', () => {
    it('handles very short retirement timeline', () => {
      const inputs = {
        currentAnnualIncome: 100000,
        currentAnnualExpenses: 60000,
        targetCountry: 'Portugal',
        currentCountry: 'United States',
        yearsToRetirement: 2,
        expectedInflationRate: 3,
        expectedInvestmentReturn: 7,
        currentSavings: 500000,
        monthlyRetirementContribution: 0,
        healthcareCosts: 4000,
        housingCosts: 12000,
        transportationCosts: 3000,
        foodCosts: 8000,
        entertainmentCosts: 6000,
        taxRate: 25,
        exchangeRate: 0.85,
        costOfLivingAdjustment: 1
      };
      const result = calculateRetirementAbroad(inputs);
      expect(result.feasibilityScore).toBeGreaterThan(90);
    });

    it('handles negative retirement gap', () => {
      const inputs = {
        currentAnnualIncome: 150000,
        currentAnnualExpenses: 80000,
        targetCountry: 'Portugal',
        currentCountry: 'United States',
        yearsToRetirement: 10,
        expectedInflationRate: 3,
        expectedInvestmentReturn: 8,
        currentSavings: 1000000,
        monthlyRetirementContribution: 3000,
        healthcareCosts: 3000,
        housingCosts: 8000,
        transportationCosts: 2000,
        foodCosts: 6000,
        entertainmentCosts: 4000,
        taxRate: 30,
        exchangeRate: 0.85,
        costOfLivingAdjustment: 1
      };
      const result = calculateRetirementAbroad(inputs);
      expect(result.retirementGap).toBeLessThan(0);
      expect(result.monthlyShortfall).toBe(0);
      expect(result.feasibilityScore).toBe(100);
    });
  });
});
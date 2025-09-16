import { describe, it, expect } from 'vitest';
import { retirementAbroadCalculator } from './RetirementAbroadCalculator';
import { calculateRetirementAbroad, calculateRetirementAbroadMetrics, validateRetirementAbroadInputs } from './formulas';

describe('Retirement Abroad Calculator', () => {
  describe('calculateRetirementAbroad', () => {
    it('should calculate retirement abroad costs for Portugal', () => {
      const inputs = {
        currentAge: 55,
        retirementAge: 65,
        currentSavings: 500000,
        monthlyRetirementIncome: 3000,
        targetCountry: 'portugal' as const,
        residencyType: 'temporary' as const,
        includeHealthcare: true,
        healthcareCost: 400,
        housingCost: 1200,
        costOfLivingAdjustment: 20,
        expectedReturn: 6,
        inflationRate: 2.5,
        currencyExchangeRate: 0.9,
        taxRate: 25
      };

      const result = calculateRetirementAbroad(inputs);

      expect(result.totalRetirementSavings).toBeGreaterThan(0);
      expect(result.annualRetirementCost).toBeGreaterThan(0);
      expect(result.monthlyRetirementCost).toBeGreaterThan(0);
      expect(result.yearsOfRetirement).toBeGreaterThan(0);
      expect(typeof result.retirementReadiness).toBe('string');
    });

    it('should handle different countries with different costs', () => {
      const baseInputs = {
        currentAge: 60,
        retirementAge: 65,
        currentSavings: 300000,
        monthlyRetirementIncome: 2000,
        residencyType: 'temporary' as const,
        includeHealthcare: true,
        healthcareCost: 300,
        housingCost: 800,
        costOfLivingAdjustment: 10,
        expectedReturn: 5,
        inflationRate: 3,
        currencyExchangeRate: 1,
        taxRate: 20
      };

      const portugalResult = calculateRetirementAbroad({ ...baseInputs, targetCountry: 'portugal' });
      const thailandResult = calculateRetirementAbroad({ ...baseInputs, targetCountry: 'thailand' });

      expect(portugalResult.annualRetirementCost).toBeGreaterThan(thailandResult.annualRetirementCost);
    });
  });

  describe('validateRetirementAbroadInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        currentAge: 55,
        retirementAge: 65,
        currentSavings: 500000,
        monthlyRetirementIncome: 3000,
        targetCountry: 'portugal' as const,
        residencyType: 'temporary' as const,
        includeHealthcare: true,
        healthcareCost: 400,
        housingCost: 1200,
        costOfLivingAdjustment: 20,
        expectedReturn: 6,
        inflationRate: 2.5,
        currencyExchangeRate: 0.9,
        taxRate: 25
      };

      const errors = validateRetirementAbroadInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate retirement age greater than current age', () => {
      const inputs = {
        currentAge: 70,
        retirementAge: 65,
        currentSavings: 500000,
        monthlyRetirementIncome: 3000,
        targetCountry: 'portugal' as const,
        residencyType: 'temporary' as const,
        includeHealthcare: true,
        healthcareCost: 400,
        housingCost: 1200,
        costOfLivingAdjustment: 20,
        expectedReturn: 6,
        inflationRate: 2.5,
        currencyExchangeRate: 0.9,
        taxRate: 25
      };

      const errors = validateRetirementAbroadInputs(inputs);
      expect(errors).toContain('Retirement age must be greater than current age');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(retirementAbroadCalculator.id).toBe('retirement-abroad-calculator');
      expect(retirementAbroadCalculator.title).toBe('Retirement Abroad Calculator');
      expect(retirementAbroadCalculator.category).toBe('finance');
      expect(retirementAbroadCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = retirementAbroadCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(9);
    });

    it('should have expected outputs', () => {
      expect(retirementAbroadCalculator.outputs).toHaveLength(10);
      const outputIds = retirementAbroadCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalRetirementSavings');
      expect(outputIds).toContain('annualRetirementCost');
      expect(outputIds).toContain('retirementReadiness');
    });

    it('should have validation rules', () => {
      expect(retirementAbroadCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(retirementAbroadCalculator.examples).toHaveLength(2);
    });
  });
});
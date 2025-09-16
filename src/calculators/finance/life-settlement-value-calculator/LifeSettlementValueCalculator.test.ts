import { describe, it, expect } from 'vitest';
import { lifeSettlementValueCalculator } from './LifeSettlementValueCalculator';
import { calculateLifeSettlement, calculateLifeSettlementMetrics, validateLifeSettlementInputs } from './formulas';

describe('Life Settlement Value Calculator', () => {
  describe('calculateLifeSettlement', () => {
    it('should calculate life settlement value for whole life policy', () => {
      const inputs = {
        currentAge: 75,
        lifeExpectancy: 85,
        deathBenefit: 500000,
        annualPremium: 8000,
        policyType: 'whole' as const,
        healthStatus: 'fair' as const,
        settlementOffer: 200000,
        discountRate: 5,
        inflationRate: 2.5,
        taxRate: 25,
        settlementCosts: 5000,
        remainingTerm: 10
      };

      const result = calculateLifeSettlement(inputs);

      expect(result.netSettlementValue).toBeGreaterThan(0);
      expect(result.presentValueOfPremiums).toBeGreaterThan(0);
      expect(result.settlementEfficiency).toBeGreaterThan(0);
      expect(result.internalRateOfReturn).toBeGreaterThan(0);
    });

    it('should calculate different results for different health statuses', () => {
      const baseInputs = {
        currentAge: 70,
        lifeExpectancy: 80,
        deathBenefit: 300000,
        annualPremium: 6000,
        policyType: 'whole' as const,
        settlementOffer: 150000,
        discountRate: 5,
        inflationRate: 2.5,
        taxRate: 25,
        settlementCosts: 3000,
        remainingTerm: 10
      };

      const excellentResult = calculateLifeSettlement({ ...baseInputs, healthStatus: 'excellent' });
      const poorResult = calculateLifeSettlement({ ...baseInputs, healthStatus: 'poor' });

      expect(excellentResult.riskAssessment).toBe('Low');
      expect(poorResult.riskAssessment).toBe('High');
    });
  });

  describe('validateLifeSettlementInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        currentAge: 75,
        lifeExpectancy: 85,
        deathBenefit: 500000,
        annualPremium: 8000,
        policyType: 'whole' as const,
        healthStatus: 'fair' as const,
        settlementOffer: 200000,
        discountRate: 5,
        inflationRate: 2.5,
        taxRate: 25,
        settlementCosts: 5000,
        remainingTerm: 10
      };

      const errors = validateLifeSettlementInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate life expectancy greater than current age', () => {
      const inputs = {
        currentAge: 80,
        lifeExpectancy: 75,
        deathBenefit: 500000,
        annualPremium: 8000,
        policyType: 'whole' as const,
        healthStatus: 'fair' as const,
        settlementOffer: 200000,
        discountRate: 5,
        inflationRate: 2.5,
        taxRate: 25,
        settlementCosts: 5000,
        remainingTerm: 10
      };

      const errors = validateLifeSettlementInputs(inputs);
      expect(errors).toContain('Life expectancy must be greater than current age');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(lifeSettlementValueCalculator.id).toBe('life-settlement-value-calculator');
      expect(lifeSettlementValueCalculator.title).toBe('Life Settlement Value Calculator');
      expect(lifeSettlementValueCalculator.category).toBe('finance');
      expect(lifeSettlementValueCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = lifeSettlementValueCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(10);
    });

    it('should have expected outputs', () => {
      expect(lifeSettlementValueCalculator.outputs).toHaveLength(9);
      const outputIds = lifeSettlementValueCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('netSettlementValue');
      expect(outputIds).toContain('internalRateOfReturn');
      expect(outputIds).toContain('riskAssessment');
    });

    it('should have validation rules', () => {
      expect(lifeSettlementValueCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(lifeSettlementValueCalculator.examples).toHaveLength(2);
    });
  });
});